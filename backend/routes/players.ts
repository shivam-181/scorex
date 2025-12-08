import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { getPlayerImage } from '../utils/realLineups.js';
import NodeCache from 'node-cache';
import { generateAIContent } from '../utils/aiModel.js';

dotenv.config();

const router = express.Router();

// Initialize Cache (StdTTL: 24 hours = 86400 seconds)
const playerCache = new NodeCache({ stdTTL: 86400 });

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
    const text = await generateAIContent(systemPrompt);
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
    
    // === WIKIPEDIA FALLBACK ===
    try {
        console.log("Attempting Wikipedia Fallback for:", decodedName);
        const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(decodedName.replace(/ /g, '_'))}`;
        const wikiRes = await axios.get(wikiUrl, {
            headers: { 'User-Agent': 'ScoreX/1.0 (Education Project; shivam@scorex.dev)' }
        });
        
        if (wikiRes.data && wikiRes.data.extract) {
            const extract = wikiRes.data.extract;
            
            // Simple parsing for Position and Nationality
            // Regex for "is a [Nationality] professional footballer who plays as a [Position]"
            const natRegex = /\b(Argentine|Brazilian|French|German|Spanish|English|Italian|Portuguese|Dutch|Belgian|Croatian|Uruguayan|Colombian|Senegalese|Moroccan|Egyptian|Japanese|South Korean|American|Canadian|Mexican|Australian|Nigerian|Ghanaian|Greek|Turkish|Russian|Ukrainian|Polish|Swedish|Danish|Norwegian|Austrian|Swiss|Serbian|Chilean|Peruvian|Ecuadorian)\b/i;
            const posRegex = /\b(forward|striker|winger|midfielder|defender|goalkeeper|full-back|centre-back|defensive midfielder|attacking midfielder)\b/i;

            const detectedNat = extract.match(natRegex)?.[0];
            const detectedPos = extract.match(posRegex)?.[0];

            const wikiData = {
                name: wikiRes.data.title,
                position: detectedPos ? detectedPos.charAt(0).toUpperCase() + detectedPos.slice(1) : "Professional Footballer",
                nationality: detectedNat ? detectedNat.charAt(0).toUpperCase() + detectedNat.slice(1) : "Unknown",
                bio: extract, 
                strengths: ["Career Experience", "Professionalism"], // Placeholders as Wiki doesn't list these
                weaknesses: ["Data unavailable in fallback"],
                similar_players: ["N/A"],
                image: wikiRes.data.thumbnail?.source || getPlayerImage(decodedName)
            };
            
            playerCache.set(decodedName, wikiData); 
            return res.json(wikiData);
        }
    } catch (wikiError: any) {
        console.error("Wikipedia Fallback Failed:", wikiError.message);
    }
    
    // === FINAL FALLBACK (If both AI and Wiki fail) ===
    console.log("Serving generic fallback data for:", decodedName);
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
