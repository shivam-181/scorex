import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
  try {
      // @ts-ignore
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      console.log("Testing gemini-1.5-flash...");
      const result = await model.generateContent("Hello");
      console.log("Success! Response:", result.response.text());
  } catch (error: any) {
      console.error("Error with gemini-1.5-flash:", error.message);
  }
}

listModels();
