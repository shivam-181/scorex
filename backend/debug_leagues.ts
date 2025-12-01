import 'dotenv/config';
import axios from 'axios';

const API_KEY = process.env.FOOTBALL_API_KEY || process.env.FOOTBALL_DATA_API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

console.log("--- DEBUG INFO ---");
console.log("FOOTBALL_API_KEY:", process.env.FOOTBALL_API_KEY ? "Set" : "Unset");
console.log("FOOTBALL_DATA_API_KEY:", process.env.FOOTBALL_DATA_API_KEY ? "Set" : "Unset");
console.log("Using Key:", API_KEY ? "Yes" : "No");

async function testLeague(code: string, id: number) {
  console.log(`\nTesting League: ${code} (ID: ${id})`);
  try {
    const url = `${BASE_URL}/competitions/${id}/standings`;
    console.log(`Fetching: ${url}`);
    
    const response = await axios.get(url, {
      headers: { 'X-Auth-Token': API_KEY },
    });

    console.log("Status:", response.status);
    console.log("Data Type:", response.data.standings ? "Standings Found" : "No Standings");
    if (response.data.standings && response.data.standings.length > 0) {
        console.log("Table Rows:", response.data.standings[0].table?.length);
    }
  } catch (error: any) {
    console.error("Error:", error.response?.status, error.response?.statusText);
    if (error.response?.data) {
        console.error("API Message:", JSON.stringify(error.response.data));
    }
  }
}

// Test Premier League
testLeague('PL', 2021);
