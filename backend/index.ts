import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import footballRoutes from './routes/football.js';
import connectDB from './config/db.js';
import favoriteRoutes from './routes/favorites.js';
import chatRoutes from './routes/chat.js';
import newsRoutes from './routes/news.js';
import leagueRoutes from './routes/leagues.js';
import subscribeRoutes from './routes/subscribe.js';
import playerRoutes from './routes/players.js';
import searchRoutes from './routes/search.js';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/football', footballRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/leagues', leagueRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
  res.send('ScoreX Backend is Live ⚽');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});