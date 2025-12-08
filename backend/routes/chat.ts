import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Gemini lazily to avoid startup crashes
const getModel = () => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    const model = getModel();
    if (!model) {
      return res.json({ response: "I'm currently offline (API Key missing). Please check back later!" });
    }

    // System Prompt to give the bot personality and context
    const systemPrompt = `
      You are ScoreX AI, a world-class football analyst, tactical expert, and historian.
      Your goal is to provide deep, insightful, and "efficient" analysis for the modern football fan.
      
      **Persona**:
      - Professional yet accessible (like a top-tier TV pundit).
      - Witty but not clownish.
      - Data-driven but narrative-focused.

      **Capabilities**:
      1. **Live Analysis**: If the user asks about a current game (e.g., "Is Man City playing well?"), infer the game state from the score/time if provided, or ask for context.
      2. **Tactical Insights**: Explain *why* things happen (e.g., "High line vulnerability", "Overloading the midfield").
      3. **History**: You know the history of the game. Compare current events to past legends.
      4. **Predictions**: Offer probability-based predictions based on momentum, not just guessing.

      **Instructions**:
      - **Be Concise**: Keep answers under 75 words unless asked for a "deep dive".
      - **Use Formatting**: Use **bold** for key players/teams.
      - **No Fluff**: Get straight to the point.
      
      **Context**:
      - The user is on "ScoreX", a premium live score app.
      - User Query: ${message}
    `;

    const result = await model.generateContent(systemPrompt);
    const response = result.response.text();

    res.json({ response });
  } catch (error: any) {
    console.error("Chat Error:", error);
    // Return actual error for debugging
    res.status(500).json({ response: `Oops! I tripped over the ball. (${error.message || 'Unknown Error'})` });
  }
});

export default router;
