import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import footballRoutes from './routes/football.js';
import connectDB from './config/db.js';
import favoriteRoutes from './routes/favorites.js';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/football', footballRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/', (req, res) => {
  res.send('ScoreX Backend is Live ⚽');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});