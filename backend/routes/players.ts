import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { getPlayerImage } from '../utils/realLineups.js';
import NodeCache from 'node-cache';

dotenv.config();

const router = express.Router();

// Initialize Cache (StdTTL: 24 hours = 86400 seconds)
const playerCache = new NodeCache({ stdTTL: 86400 });

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
// Switch to 1.5-flash for better stability (15 RPM limit vs 2 RPM for Pro)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Get Player Scout Report (AI Generated)
router.get('/:name', async (req, res) => {
  let decodedName = "";
  try {
    const { name } = req.params;
    decodedName = decodeURIComponent(name);

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(503).json({ error: "AI Service Unavailable" });
    }

    // CHECK CACHE FIRST
    const cachedReport = playerCache.get(decodedName);
    if (cachedReport) {
        console.log("Serving from CACHE:", decodedName);
        return res.json(cachedReport);
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

      If the player is famous, be accurate. 
      If the player is lesser known, infer from their position/nationality but keep the bio generic and plausible based on their role. 
      Do NOT invent specific false career facts. 
      Ensure 'position' and 'nationality' are accurate.
      Do not include markdown formatting like \`\`\`json. Just raw JSON.
    `;

    console.log("Generating report for:", decodedName);
    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    
    let responseText = "";
    if (jsonStart !== -1 && jsonEnd !== -1) {
      responseText = text.substring(jsonStart, jsonEnd + 1);
    } else {
      responseText = text; // Fallback to raw text (likely to fail parse, but worth a try if clean)
    }
    
    console.log("Gemini Response:", responseText);

    let playerData;
    try {
        playerData = JSON.parse(responseText);
    } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.error("Failed JSON content:", responseText);
        throw new Error("Invalid JSON from AI");
    }
    
    // Inject Real Image if available
    const image = getPlayerImage(decodedName);
    if (image) {
      playerData.image = image;
    }

    // SAVE TO CACHE
    playerCache.set(decodedName, playerData);

    res.json(playerData);
  } catch (error) {
    console.error("Player API Error Details:", error);
    console.log("API Key Present:", !!process.env.GOOGLE_API_KEY);
    
    // Fallback Mock Data if AI fails
    console.log("Serving fallback data for:", decodedName);
    const fallbackData: any = {
      name: decodedName || "Unknown Player",
      position: "Forward (Est.)",
      nationality: "Global",
      bio: "AI analysis is currently processing. This player's full scout report will be available shortly.",
      strengths: ["Technical Ability", "Tactical Awareness"],
      weaknesses: ["Physicality"],
      similar_players: ["N/A"]
    };

    // Inject Image into fallback
    const image = getPlayerImage(decodedName);
    if (image) {
      fallbackData.image = image;
    }

    res.json(fallbackData);
  }
});

export default router;
