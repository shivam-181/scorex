import express from 'express';
import { fetchData } from '../utils/apiClient.js';
import { generateMockStats, getMockLineup } from '../utils/mockData.js';

const router = express.Router();

// Helper: Get local date string YYYY-MM-DD to avoid UTC lags
const getLocalDateString = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
};

// GET /live - Matches for Today (+/- 3 days)
router.get('/live', async (req, res) => {
    try {
        const today = new Date();
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 3);
        
        const toDate = new Date(today);
        toDate.setDate(today.getDate() + 3);

        // FIX: Use local time string, not UTC
        const fromStr = getLocalDateString(fromDate);
        const toStr = getLocalDateString(toDate);

        console.log(`Fetching matches from ${fromStr} to ${toStr}`);

        const data = await fetchData(`/matches?dateFrom=${fromStr}&dateTo=${toStr}`);

        if (data?.matches) {
            data.matches = data.matches.map((match) => {
                // INJECT LIVE MINUTE (Heuristic)
                if (match.status === 'IN_PLAY' || match.status === 'PAUSED') {
                    const matchTime = new Date(match.utcDate).getTime();
                    const now = new Date().getTime();
                    const diffMs = now - matchTime;
                    let minute = Math.floor(diffMs / 60000);

                    // FIX: Handle negative time (clock skew)
                    if (minute < 0) minute = 0;

                    // Logic for Halftime adjustment
                    if (minute > 45) {
                        if (minute > 60) {
                             // Assume 15 min halftime break
                            minute = 45 + (minute - 60);
                        } else {
                            return { ...match, minute: "HT" };
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

// GET /match/:id - Single Match Details
router.get('/match/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Fetch Basic Data
        const matchData = await fetchData(`/matches/${id}`);

        // 2. Normalize Lineups (Crucial for Frontend consistency)
        // If Real API has data, it might not be in { home, away } format. 
        // We force it here or use mocks.
        let lineups = null;

        if (matchData.lineup && matchData.lineup.length > 0) {
            // If API returns valid data, pass it (Frontend must handle API format)
            lineups = matchData.lineup;
        } else {
            // Fallback to Mocks
            lineups = {
                home: getMockLineup(matchData.homeTeam.name),
                away: getMockLineup(matchData.awayTeam.name)
            };
        }

        const enrichedData = {
            ...matchData,
            stats: matchData.statistics || generateMockStats(), // Fallback to mock stats
            lineups: lineups
        };

        res.json(enrichedData);
    } catch (error) {
        console.error("Error fetching match details:", error);
        res.status(500).json({ error: 'Failed to fetch match details' });
    }
});

export default router;