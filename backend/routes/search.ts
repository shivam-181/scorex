import express from 'express';
import { fetchData } from '../utils/apiClient.js';

const router = express.Router();

// Mock Data for Search (In a real app, this would be in a DB)
const TOP_TEAMS = [
  { id: 65, name: "Manchester City", logo: "https://crests.football-data.org/65.png" },
  { id: 66, name: "Manchester United", logo: "https://crests.football-data.org/66.png" },
  { id: 64, name: "Liverpool", logo: "https://crests.football-data.org/64.png" },
  { id: 57, name: "Arsenal", logo: "https://crests.football-data.org/57.png" },
  { id: 61, name: "Chelsea", logo: "https://crests.football-data.org/61.png" },
  { id: 86, name: "Real Madrid", logo: "https://crests.football-data.org/86.png" },
  { id: 81, name: "Barcelona", logo: "https://crests.football-data.org/81.png" },
  { id: 78, name: "Atletico Madrid", logo: "https://crests.football-data.org/78.png" },
  { id: 5, name: "Bayern Munich", logo: "https://crests.football-data.org/5.png" },
  { id: 4, name: "Borussia Dortmund", logo: "https://crests.football-data.org/4.png" },
  { id: 524, name: "PSG", logo: "https://crests.football-data.org/524.png" },
  { id: 109, name: "Juventus", logo: "https://crests.football-data.org/109.png" },
  { id: 98, name: "AC Milan", logo: "https://crests.football-data.org/98.png" },
  { id: 108, name: "Inter Milan", logo: "https://crests.football-data.org/108.png" },
];

const LEAGUES = [
  { name: "Premier League", code: "PL", logo: "http://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png" },
  { name: "La Liga", code: "PD", logo: "https://assets.laliga.com/assets/2023/06/05/hl/823498d5841735b9b824018eea71df33.jpeg" },
  { name: "Bundesliga", code: "BL1", logo: "https://sp-static-images.s3.amazonaws.com/logos/germanleague/Bundesliga/c_pad_630x1200/Bundesliga.png" },
  { name: "Serie A", code: "SA", logo: "https://sp-static-images.s3.amazonaws.com/logos/Serie_A_logo/c_pad_630x1200/Serie_A_logo.png" },
  { name: "Ligue 1", code: "FL1", logo: "https://s2.dmcdn.net/v/XaUSs1dQvCscSCXmD/x1080" },
  { name: "Champions League", code: "CL", logo: "https://www.logo.wine/a/logo/UEFA_Champions_League/UEFA_Champions_League-Logo.wine.svg" },
];

router.get('/', async (req, res) => {
  try {
    const query = (req.query.q as string || '').toLowerCase();
    
    if (!query || query.length < 2) {
      return res.json({ leagues: [], teams: [], news: [] });
    }

    // 1. Search Leagues
    const leagues = LEAGUES.filter(l => l.name.toLowerCase().includes(query));

    // 2. Search Teams (Mock List)
    const teams = TOP_TEAMS.filter(t => t.name.toLowerCase().includes(query));

    // 3. Search News (Fetch from News API and filter)
    // Note: In a real app, we'd search our DB or pass query to News API if supported.
    // Here we fetch top headlines and filter locally for simplicity.
    let news = [];
    try {
      const newsRes = await fetch(`https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=relevancy&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`);
      const newsData = await newsRes.json();
      if (newsData.articles) {
        news = newsData.articles.map((a: any) => ({
          title: a.title,
          url: a.url,
          image: a.urlToImage,
          source: a.source.name,
          date: a.publishedAt
        }));
      }
    } catch (err) {
      console.error("News Search Error:", err);
    }

    res.json({
      leagues,
      teams,
      news
    });

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
