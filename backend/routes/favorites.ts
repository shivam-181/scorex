import express from 'express';
import Favorite from '../models/Favorite.js';

const router = express.Router();

// GET all favorites for a user
router.get('/:deviceId', async (req, res) => {
  try {
    const favs = await Favorite.find({ deviceId: req.params.deviceId });
    res.json(favs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ADD a favorite
router.post('/', async (req, res) => {
  const { deviceId, matchId, homeTeam, awayTeam, date } = req.body;
  try {
    const newFav = await Favorite.create({ deviceId, matchId, homeTeam, awayTeam, date });
    res.status(201).json(newFav);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Already favorited' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// REMOVE a favorite
router.delete('/:deviceId/:matchId', async (req, res) => {
  try {
    console.log(`Attempting to remove favorite: deviceId=${req.params.deviceId}, matchId=${req.params.matchId}`);
    const result = await Favorite.findOneAndDelete({ 
      deviceId: req.params.deviceId, 
      matchId: req.params.matchId 
    });
    console.log('Delete result:', result);
    if (!result) {
      console.log('Favorite not found to delete');
    }
    res.json({ message: 'Removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
