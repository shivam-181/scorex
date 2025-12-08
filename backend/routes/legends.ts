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

        // Structure the response
        const legendData = {
            name: decodedName,
            bio: summary,
            image: mainImage,
            infobox: info, // Raw infobox data (goals, caps, etc)
            sections: content ? content.map((c: any) => c.title) : [], // Available sections for UI
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
