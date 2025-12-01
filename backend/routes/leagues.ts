import express from 'express';
import { fetchData } from '../utils/apiClient.js';

const router = express.Router();

// Map our internal codes to API IDs
const LEAGUE_MAP: { [key: string]: number } = {
  'PL': 2021,  // Premier League
  'PD': 2014,  // La Liga
  'BL1': 2002, // Bundesliga
  'SA': 2019,  // Serie A
  'FL1': 2015, // Ligue 1
  'CL': 2001,  // Champions League
};

router.get('/:code/standings', async (req, res) => {
  const { code } = req.params;
  const leagueId = LEAGUE_MAP[code.toUpperCase()];

  if (!leagueId) {
    return res.status(404).json({ error: 'League not found' });
  }

  try {
    // Fetch standings from API using shared client
    const data = await fetchData(`/competitions/${leagueId}/standings`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).json({ error: 'Failed to fetch standings' });
  }
});

export default router;
