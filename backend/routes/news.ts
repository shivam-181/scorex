import express from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

router.get('/', async (req, res) => {
  try {
    const cacheKey = 'football_news';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    if (!process.env.NEWS_API_KEY) {
      return res.status(500).json({ message: "News API Key missing" });
    }

    const limit = parseInt(req.query.limit as string) || 6;

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: '"premier league" OR "la liga" OR "serie a" OR "bundesliga" OR "champions league" OR "soccer"',
        language: 'en',
        sortBy: 'publishedAt',
        apiKey: process.env.NEWS_API_KEY,
        pageSize: limit * 2 // Fetch more to filter valid ones
      }
    });

    const articles = response.data.articles.filter((article: any) => 
      article.urlToImage && article.title && article.description
    ).slice(0, limit); // Take requested number of valid articles

    cache.set(cacheKey, articles);
    res.json(articles);
  } catch (error) {
    console.error("News Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

export default router;
