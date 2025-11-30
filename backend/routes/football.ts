import express from 'express';
import { fetchData } from '../utils/apiClient.js';
import { generateMockStats, getMockLineup } from '../utils/mockData.js';

const router = express.Router();

// Get Matches for Today (Live, Scheduled, Finished)
router.get('/live', async (req, res) => {
  try {
    // Get today's date
    const today = new Date();
    
    // Calculate date range (-3 days to +3 days) to ensure we show something
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 3);
    
    const toDate = new Date(today);
    toDate.setDate(today.getDate() + 3);

    const fromStr = fromDate.toISOString().split('T')[0];
    const toStr = toDate.toISOString().split('T')[0];
    
    console.log(`Fetching matches from ${fromStr} to ${toStr}`);
    
    // Fetch matches for the date range
    const data = await fetchData(`/matches?dateFrom=${fromStr}&dateTo=${toStr}`); 
    
    console.log(`Fetched ${data?.matches?.length} matches`);
    
    res.json(data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Get Single Match Details
router.get('/match/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // 1. Fetch real basic data (Score, Status, Teams)
    const matchData = await fetchData(`/matches/${id}`);
    
    // 2. Fetch H2H (Head to Head) if available
    // const h2hData = await fetchData(`/matches/${id}/head2head`); // Optional, creates extra API call
    
    // 3. Check if Lineups/Stats exist. If not, Inject Mock Data.
    // Real API sends specific structure, we normalize it here.
    const enrichedData = {
      ...matchData,
      stats: matchData.statistics || generateMockStats(), 
      lineups: matchData.lineup?.length > 0 ? matchData.lineup : {
        home: getMockLineup(matchData.homeTeam.name),
        away: getMockLineup(matchData.awayTeam.name)
      }
    };

    res.json(enrichedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match details' });
  }
});

export default router;