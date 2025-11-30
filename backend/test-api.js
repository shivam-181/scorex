import axios from 'axios';

const API_KEY = '1a2831608a1b459e9297c6c6313711ae';
const BASE_URL = 'https://api.football-data.org/v4';

const testApi = async () => {
  try {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 3);
    const toDate = new Date(today);
    toDate.setDate(today.getDate() + 3);

    const fromStr = fromDate.toISOString().split('T')[0];
    const toStr = toDate.toISOString().split('T')[0];

    console.log(`Fetching matches from ${fromStr} to ${toStr}`);

    const url = `${BASE_URL}/matches?dateFrom=${fromStr}&dateTo=${toStr}`;
    console.log(`URL: ${url}`);

    const response = await axios.get(url, {
      headers: { 'X-Auth-Token': API_KEY },
    });

    console.log('Response status:', response.status);
    console.log('Matches found:', response.data.matches.length);
    if (response.data.matches.length > 0) {
      console.log('First match:', response.data.matches[0].homeTeam.name, 'vs', response.data.matches[0].awayTeam.name);
    }
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
  }
};

testApi();
