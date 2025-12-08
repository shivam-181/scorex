import express from 'express';
// @ts-ignore
import wiki from 'wikijs';

const router = express.Router();

/**
 * GET /api/legends/:name
 * Fetches detailed legend data from Wikipedia using wikijs
 */
router.get('/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const decodedName = decodeURIComponent(name);

        console.log(`Fetching Wiki data for legend: ${decodedName}`);

        // Initialize wiki (default to English Wikipedia)
        const page = await (wiki() as any).page(decodedName);

        // Fetch parallel data for speed
        const [summary, images, info, content] = await Promise.all([
            page.summary().catch(() => ""),
            page.images().catch(() => []),
            page.info().catch(() => ({})), // The structured infobox
            page.content().catch(() => []) // Full content sections
        ]);

        // Find a valid main image (filter out svg/icons)
        const mainImage = images.find((img: string) => 
            !img.includes('.svg') && (img.includes('.jpg') || img.includes('.png'))
        ) || images[0] || "";

        // Use AI to clean and structure the data (The user wants it to look authentic and clean)
        let cleanInfobox = {};
        try {
            const { generateAIContent } = await import('../utils/aiModel.js');
            
            // Context for the AI
            const rawInfoboxStr = JSON.stringify(info).slice(0, 1000); // Limit length
            const prompt = `
                You are a football historian. I have raw Wikipedia data for "${decodedName}".
                Your task is to extract/verify key details and return a CLEAN, flat JSON object for display.
                
                Raw Data Snippet: ${rawInfoboxStr}
                
                Requirements:
                1. Return a JSON object with these exact keys:
                   "Full Name", "Date of Birth", "Place of Birth", "Height", "Position", "National Team", "Total Career Goals", "Years Active"
                2. Use the "Raw Data Snippet" as the primary source.
                3. **CRITICAL**: If the raw data is missing, incomplete, or contains placeholders like "nobold" or "refn", **USE YOUR OWN INTERNAL KNOWLEDGE** to fill in the correct facts for ${decodedName}. Do NOT return "N/A" or "Unknown" if you know the answer.
                4. "Full Name" must be the real full name.
                5. "Date of Birth" must be "DD Mon YYYY".
                6. "Place of Birth" must be City, Country.
                7. "Total Career Goals" should be a specific number (Club + Country). Estimate if exact is debated, but provide a number.
                8. Remove ALL citations ([1], [a]) and formatting artifacts.
                
                Output JSON ONLY. No markdown.
            `;
            
            const aiJson = await generateAIContent(prompt);
            cleanInfobox = JSON.parse(aiJson.replace(/```json/g, '').replace(/```/g, '').trim());
            console.log("AI Cleaned Data:", cleanInfobox);
            
        } catch (e) {
            console.error("AI Cleaning Failed, falling back to raw info", e);
            cleanInfobox = info; // Fallback
        }

        // Structure the response
        const legendData = {
            name: decodedName,
            bio: summary,
            image: mainImage,
            infobox: Object.keys(cleanInfobox).length > 0 ? cleanInfobox : info,
            sections: content ? content.map((c: any) => c.title) : [], 
        };

        res.json(legendData);

    } catch (error: any) {
        console.error("WikiJS Error:", error.message);
        res.status(500).json({ 
            error: "Failed to fetch legend data", 
            details: error.message 
        });
    }
});

export default router;
