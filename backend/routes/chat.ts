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
      You are ScoreX AI, a passionate and knowledgeable football assistant.
      Your goal is to help users with football stats, live scores, and general queries.
      
      Tone: Enthusiastic, professional, slightly witty.
      
      Context:
      - The user is on "ScoreX", a modern football scores app.
      - If asked about live scores, you can say "I can see the live matches on the dashboard!" (Mocking awareness for now).
      - Keep answers concise (under 50 words usually).
      
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
