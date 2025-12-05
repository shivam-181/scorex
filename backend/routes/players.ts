import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Get Player Scout Report (AI Generated)
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const decodedName = decodeURIComponent(name);

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(503).json({ error: "AI Service Unavailable" });
    }

    // System Prompt for Scout Report
    const systemPrompt = `
      You are a professional football scout.
      Generate a concise "Scout Report" for the football player: "${decodedName}".
      
      **Return JSON format ONLY**:
      {
        "name": "${decodedName}",
        "position": "Likely Position (e.g. Forward)",
        "nationality": "Likely Nationality",
        "bio": "A 2-sentence summary of their career/style.",
        "strengths": ["Strength 1", "Strength 2", "Strength 3"],
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "similar_players": ["Player A", "Player B"]
      }

      If the player is unknown or generic, invent a plausible profile but mention it's a "Generated Profile".
      Do not include markdown formatting like \`\`\`json. Just raw JSON.
    `;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    
    const playerData = JSON.parse(responseText);

    res.json(playerData);
  } catch (error) {
    console.error("Player API Error:", error);
    res.status(500).json({ error: "Failed to generate scout report" });
  }
});

export default router;
