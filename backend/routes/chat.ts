import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GOOGLE_API_KEY) {
      return res.json({ response: "I'm currently offline (API Key missing). Please check back later!" });
    }

    // System Prompt to give the bot personality and context
    const systemPrompt = `
      You are ScoreX AI, a world-class football analyst and assistant.
      Your goal is to provide deep, insightful, and "efficient" analysis even with limited data.
      
      Tone: Professional, analytical, yet accessible and slightly witty.
      
      Instructions:
      1. **Analyze the Context**: Look at the teams, the score, and the time. 
         - If it's 0-0 at 80', mention "defensive deadlock" or "lack of clinical finishing".
         - If a big team is losing to a small team, call it a "potential upset".
      2. **Simulate Depth**: Even if you don't have possession stats, *infer* them from the score and team reputation.
         - Example: "Man City (winning 2-0) is likely controlling the tempo..."
      3. **Be Predictive**: Offer probabilities based on game state.
         - "With 10 mins left, the trailing team will likely push high, leaving gaps for a counter."
      
      Context:
      - The user is on "ScoreX", a modern football app.
      - Keep answers concise (under 75 words) but packed with value.
      
      User Query: ${message}
    `;

    const result = await model.generateContent(systemPrompt);
    const response = result.response.text();

    res.json({ response });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ response: "Oops! I tripped over the ball. Try again." });
  }
});

export default router;
