import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds
const API_KEY = process.env.FOOTBALL_API_KEY || process.env.FOOTBALL_DATA_API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData = async (endpoint: string) => {
  // Check cache first
  const cachedData = cache.get(endpoint);
  if (cachedData) {
    console.log(`⚡ Serving ${endpoint} from cache`);
    return cachedData;
  }

  // If not in cache, fetch from API
  try {
    console.log(`🌐 Fetching ${endpoint} from API`);
    console.log(`Using API Key: ${API_KEY ? 'Present' : 'Missing'}`);
    
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: { 'X-Auth-Token': API_KEY },
    });
    
    // Save to cache
    cache.set(endpoint, response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};