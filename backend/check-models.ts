import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
    console.error("❌ GOOGLE_API_KEY is missing in .env");
    process.exit(1);
}

console.log("Checking available Gemini models...");

async function check() {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
        const res = await axios.get(url);
        
        console.log("\n✅ Available Models:");
        const models = res.data.models || [];
        
        const generateModels = models
            .filter(m => m.supportedGenerationMethods.includes('generateContent'))
            .map(m => m.name.replace('models/', ''));

        if (generateModels.length === 0) {
            console.log("No models found that support 'generateContent'.");
        } else {
            generateModels.forEach(name => console.log(`- ${name}`));
        }
        
        console.log("\nTry using one of the above names in your code.");

    } catch (e: any) {
        console.error("❌ Error fetching models:", e.response ? JSON.stringify(e.response.data, null, 2) : e.message);
    }
}

check();
