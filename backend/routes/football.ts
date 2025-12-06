import express from 'express';
import { fetchData } from '../utils/apiClient.js';
import { generateMockStats, getMockLineup, generateMockTimeline } from '../utils/mockData.js';
import { getHardcodedLineup } from '../utils/realLineups.js';

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
    console.log(`\n--- Fetching Match Details for ID: ${id} ---`);

    // 1. Parallel Fetch: Real basic data + H2H
    const [matchData, h2hData] = await Promise.all([
      fetchData(`/matches/${id}`),
      fetchData(`/matches/${id}/head2head`).catch(err => {
         console.warn('Failed to fetch H2H data:', err);
         return null; 
      })
    ]);

    console.log(`Basic Data Fetched. Status: ${matchData.status}`);

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
      
      matchData.minute = minute;
    }
    
    // 3. Check if Lineups/Stats exist. If not, Inject Mock Data or AI Data.
    console.log(`Lineup Check: matchData.lineup is ${matchData.lineup ? 'Present' : 'Missing'}, Length: ${matchData.lineup?.length}`);
    
    // Check for Hardcoded Lineups individually
    console.log(`TEAM NAMES FROM API: Home='${matchData.homeTeam?.name}', Away='${matchData.awayTeam?.name}'`);
    const hardcodedHome = getHardcodedLineup(matchData.homeTeam.name);
    const hardcodedAway = getHardcodedLineup(matchData.awayTeam.name);
    
    console.log(`Hardcoded Check: Home (${matchData.homeTeam.name}) -> ${hardcodedHome ? 'Found' : 'Missing'}, Away (${matchData.awayTeam.name}) -> ${hardcodedAway ? 'Found' : 'Missing'}`);

    // Helper to get lineup for a specific team
    const getTeamLineup = async (side: 'home' | 'away', teamName: string, hardcoded: any[] | null | undefined) => {
      // 1. Priority: Hardcoded
      if (hardcoded) {
        console.log(`Using Hardcoded lineup for ${teamName}`);
        return hardcoded;
      }

      // 2. Priority: AI Generation
      try {
         if (!process.env.GOOGLE_API_KEY) throw new Error("No API Key");
         
         console.log(`Generating AI lineup for ${teamName}...`);
         const { GoogleGenerativeAI } = await import('@google/generative-ai');
         const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
         const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
         
         const prompt = `Generate a realistic starting XI for ${teamName}. Return JSON ONLY: [{ "name": "Player Name", "number": 1, "position": "GK" }, ...]`;
         const result = await model.generateContent(prompt);
         const text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
         return JSON.parse(text);
      } catch (e) {
        console.error(`AI Error for ${teamName}:`, e);
        // 3. Priority: Mock
        return getMockLineup(teamName);
      }
    };

    const enrichedData = {
      ...matchData,
      h2h: h2hData, // Include H2H data
      stats: matchData.statistics || generateMockStats(), 
      // Inject Mock Timeline if empty, but ONLY for live/finished matches
      ...(() => {
        const isLiveOrFinished = matchData.status === 'IN_PLAY' || matchData.status === 'PAUSED' || matchData.status === 'FINISHED';
        // If we have no goals and no bookings, AND it's a game that should have stats, assume we need mock timeline
        if (isLiveOrFinished && (!matchData.goals || matchData.goals.length === 0) && (!matchData.bookings || matchData.bookings.length === 0)) {
           const timeline = generateMockTimeline(matchData.homeTeam.name, matchData.awayTeam.name, matchData.score.fullTime);
           return {
             goals: timeline.filter((e: any) => e.type === 'GOAL'),
             bookings: timeline.filter((e: any) => e.type === 'CARD'),
             substitutions: timeline.filter((e: any) => e.type === 'SUB'),
           };
        }
        return {};
      })(),
      lineups: await (async () => {
        // If API has lineup AND we don't have ANY hardcoded, use API?
        // But user complains about placeholders. So let's force our logic if ANY hardcoded exists,
        // OR if API lineup is missing.

        /* 
           Refactoring for better frontend display:
           Instead of sending flat arrays, we send { starting: [], bench: [] }
           We assume the first 11 are starters if it's a flat list.
        */
        
        let homeAll = [];
        let awayAll = [];

        if (matchData.lineup && matchData.lineup.length > 0 && !hardcodedHome && !hardcodedAway) {
           // Normalize API data if it exists but is flat? 
           // Usually API returns { home: { starting: [], bench: [] } } structure if it is good data
           // But if we are falling back to our manual logic:
           return matchData.lineup; 
        }

        // Otherwise, build it manually
        homeAll = await getTeamLineup('home', matchData.homeTeam.name, hardcodedHome);
        awayAll = await getTeamLineup('away', matchData.awayTeam.name, hardcodedAway);
        
         // Helper to ensure 11 starters
         const padToEleven = (players: any[]) => {
            const starters = players.slice(0, 11);
            if (starters.length >= 11) return starters;
            
            const needed = 11 - starters.length;
            for (let i = 0; i < needed; i++) {
               starters.push({
                 name: `Player ${(starters.length + 1)}`,
                 number: '-',
                 position: 'MF', // Default to MF to fill midfield
                 isMock: true
               });
            }
            return starters;
         };

         return { 
           home: {
              starting: padToEleven(homeAll),
              bench: homeAll.slice(11)
           }, 
           away: {
              starting: padToEleven(awayAll),
              bench: awayAll.slice(11)
           }
         };
      })()
    };

    res.json(enrichedData);
  } catch (error) {
    console.error("Error in /match/:id:", error);
    res.status(500).json({ error: 'Failed to fetch match details' });
  }
});

export default router;