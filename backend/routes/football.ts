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
    if (data?.matches?.length > 0) {
      console.log('Sample Match Data:', JSON.stringify(data.matches[0], null, 2));
    }
    
    // Inject calculated minute for live matches
    if (data?.matches) {
      data.matches = data.matches.map((match: any) => {
        if (match.status === 'IN_PLAY') {
          const matchTime = new Date(match.utcDate).getTime();
          const now = new Date().getTime();
          const diffMs = now - matchTime;
          let calculatedMinute = Math.floor(diffMs / 60000);
          let minute: number | string = calculatedMinute;
          
          // Simple heuristic for half-time
          if (calculatedMinute > 45) {
             if (calculatedMinute > 60) {
               minute = 45 + (calculatedMinute - 60);
             } else {
               minute = "HT";
             }
          }
          if (calculatedMinute > 90) minute = "90+";
          
          return { ...match, minute };
        }
        return match;
      });
    }

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
    let matchData = await fetchData(`/matches/${id}`);

    // Inject calculated minute for live matches
    if (matchData.status === 'IN_PLAY') {
      const matchTime = new Date(matchData.utcDate).getTime();
      const now = new Date().getTime();
      const diffMs = now - matchTime;
      let calculatedMinute = Math.floor(diffMs / 60000);
      let minute: number | string = calculatedMinute;
      
      if (calculatedMinute > 45) {
          if (calculatedMinute > 60) {
            minute = 45 + (calculatedMinute - 60);
          } else {
            minute = "HT";
          }
      }
      if (calculatedMinute > 90) minute = "90+";
      
      matchData = { ...matchData, minute };
    }
    
    // 2. Fetch H2H (Head to Head) if available
    let h2hData = null;
    try {
      h2hData = await fetchData(`/matches/${id}/head2head`);
      console.log('H2H Data Fetched:', h2hData?.aggregates ? 'Success' : 'No Aggregates');
    } catch (err) {
      console.warn('Failed to fetch H2H data:', err);
      // Continue without H2H
    }
    
    // 3. Check if Lineups/Stats exist. If not, Inject Mock Data.
    // Real API sends specific structure, we normalize it here.
    const enrichedData = {
      ...matchData,
      h2h: h2hData, // Include H2H data
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