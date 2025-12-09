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
            // Import the AI model utility safely
            const { generateAIContent } = await import('../utils/aiModel.js');
            
            // Context for the AI
            // We increase the slice limit to give AI more context
            const rawInfoboxStr = JSON.stringify(info).slice(0, 3000); 
            
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
            console.error("AI Cleaning Failed, falling back to manual cleanup", e);
            
            // MANUAL FALLBACK: If AI fails, try to give somewhat clean data
             // @ts-ignore
            cleanInfobox = {
                // @ts-ignore
                "Full Name": info.fullname || info.name || decodedName,
                 // @ts-ignore
                "Date of Birth": info.birthDate ? (typeof info.birthDate === 'object' ? (info.birthDate.date || JSON.stringify(info.birthDate)) : info.birthDate) : "Unknown",
                 // @ts-ignore
                "Place of Birth": info.birthPlace || "Unknown",
                 // @ts-ignore
                "Height": info.height || "Unknown",
                 // @ts-ignore
                "Position": info.position || "Unknown",
            };
        }

        // Structure the response
        const legendData = {
            name: decodedName,
            bio: summary,
            image: mainImage,
            infobox: Object.keys(cleanInfobox).length > 0 ? cleanInfobox : info,
            sections: content ? content.map((c: any) => c.title) : [], 
        };

        // Aggressive Sanitization: Ensure NO objects remain in the infobox
        // This fixes the issue where Date objects or Image objects show up as JSON
        if (legendData.infobox) {
            const sanitized: any = {};
            for (const [key, value] of Object.entries(legendData.infobox)) {
                sanitized[key] = sanitizeWikiValue(value);
            }
            legendData.infobox = sanitized;
        }

        res.json(legendData);

    } catch (error: any) {
        console.error("WikiJS Error:", error.message);
        res.status(500).json({ 
            error: "Failed to fetch legend data", 
            details: error.message 
        });
    }
});


/**
 * Helper to force-clean typical complex Wikipedia objects into human-readable strings.
 * Recursively digs for the best string representation.
 */
function sanitizeWikiValue(value: any): string {
    if (value === null || value === undefined) return "N/A";
    
    // 1. Primitives: Return as string
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value ? "Yes" : "No";

    // 2. Arrays: Join them (e.g., lists of teams)
    if (Array.isArray(value)) {
        return value.map(v => sanitizeWikiValue(v)).filter(v => v !== "N/A").join(', ');
    }

    // 3. Objects: Try to find a meaningful property
    if (typeof value === 'object') {
        // Common WikiJS Date object: { date: "1987-06-24T00:00:00...", age: 36 }
        if (value.date) {
            return sanitizeWikiValue(value.date).split('T')[0] || "N/A"; // Recursively clean the date value itself
        }
        
        // Common WikiJS Label/Text wrappers
        if (value.label) return sanitizeWikiValue(value.label);
        if (value.text) return sanitizeWikiValue(value.text);
        if (value.name) return sanitizeWikiValue(value.name);

        // If it's a generic object with values, try to grab the first string value
        // This is a "Hail Mary" to avoid showing JSON to the user
        const values = Object.values(value);
        for (const v of values) {
             const clean = sanitizeWikiValue(v);
             if (clean !== "N/A" && clean.length < 50) return clean; // simplistic heuristic
        }
    }

    // Last resort: If we still have an object we don't understand, return N/A rather than [object Object]
    return "N/A"; 
}



export default router;
