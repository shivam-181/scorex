import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { sleep } from './apiClient.js';

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

// List of models to try in order of preference (Fastest/Cheapest first)
const MODELS = [
  "gemini-flash-latest",
  "gemini-2.0-flash",
  "gemini-2.5-flash", 
  "gemini-1.5-flash",
  "gemini-pro-latest"
];

/**
 * Generates content using Google Gemini with automatic fallback to other models
 * if the primary model fails (429 Rate Limit, 503 Overloaded, 404 Not Found).
 */
export const generateAIContent = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    console.error("❌ Google API Key is missing");
    throw new Error("Google API Key is missing");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  let lastError: any = null;

  for (const modelName of MODELS) {
    try {
      // console.log(`🤖 Trying AI Model: ${modelName}...`); 
      // Commented out to reduce log noise, uncomment for debugging
      
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      if (text) return text;
      
    } catch (error: any) {
      const msg = error.message || '';
      const isRateLimit = msg.includes('429') || msg.includes('Quota') || msg.includes('quota');
      const isRetryable = isRateLimit || msg.includes('503') || msg.includes('404') || msg.includes('Overloaded');
      
      console.warn(`⚠️ Model ${modelName} failed: ${msg.split('\n')[0]}`);
      lastError = error;

      if (isRateLimit) {
        console.log("⏳ Rate Limit detected. Initiating Smart Wait (10s) before trying next model...");
        await sleep(10000); // 10 second cooling off period
      } else {
        // Standard small delay for other errors
        await sleep(1000); 
      } 
    }
  }

  throw new Error(`All AI models failed. Last error: ${lastError?.message}`);
};
