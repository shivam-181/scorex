import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  deviceId: { type: String, required: true }, // Simple guest auth
  matchId: { type: String, required: true },
  homeTeam: String,
  awayTeam: String,
  date: Date,
}, { timestamps: true });

// Prevent duplicate favorites for same user/match
favoriteSchema.index({ deviceId: 1, matchId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);
