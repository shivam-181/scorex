import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6;
    const cacheKey = 'football_news_v3'; // Updated cache key
    let articles = cache.get<any[]>(cacheKey);

    if (!articles) {
      if (!process.env.NEWS_API_KEY) {
        return res.status(500).json({ message: "News API Key missing" });
      }

      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: '(football AND (soccer OR "premier league" OR "champions league" OR "la liga" OR "bundesliga" OR "serie a" OR "ligue 1" OR "uefa" OR "fifa" OR "world cup" OR "international football")) AND NOT (nfl OR "american football" OR rugby OR cricket OR ipl OR t20 OR tennis OR nba OR basketball OR baseball)',
          language: 'en',
          sortBy: 'publishedAt',
          apiKey: process.env.NEWS_API_KEY,
          pageSize: 60 // Fetch a large batch to serve all requests
        }
      });

      articles = response.data.articles.filter((article: any) => 
        article.urlToImage && article.title && article.description
      );

      cache.set(cacheKey, articles);
    }

    res.json(articles?.slice(0, limit));
  } catch (error) {
    console.error("News Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

export default router;
