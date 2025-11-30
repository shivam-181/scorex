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
          let minute = Math.floor(diffMs / 60000);
          
          // Simple heuristic for half-time
          // If > 45, we assume it's 2nd half or HT. 
          // Realistically, without "half started" time, this is best guess.
          if (minute > 45) {
             // If it's been running for > 60 mins, assume 2nd half started approx 15 mins after 45.
             // So minute = 45 + (minute - 60). 
             // This is very rough but better than "45'".
             if (minute > 60) {
               minute = 45 + (minute - 60);
             } else {
               // Between 45 and 60, likely HT
               return { ...match, minute: "HT" as any };
             }
          }
          // Cap at 90+
          if (minute > 90) minute = "90+";
          
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