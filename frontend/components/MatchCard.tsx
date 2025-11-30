import { format } from 'date-fns';
import AiInsightBar from './AiInsightBar';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface MatchProps {
  id: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  score: { fullTime: { home: number; away: number } };
  status: string;
  utcDate: string;
}

export default function MatchCard({ match, initialIsFav = false }: { match: MatchProps; initialIsFav?: boolean }) {
  const isLive = match.status === 'IN_PLAY';
  
  // Mocking the data here because our real backend might not send it yet
  const mockAiData = {
    home: 55,
    away: 45,
    text: "Home team pressing high, high goal probability."
  };

  const [isFav, setIsFav] = useState(initialIsFav);

  // Sync state if prop changes (e.g. after fetching favorites)
  useEffect(() => {
    setIsFav(initialIsFav);
  }, [initialIsFav]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const deviceId = localStorage.getItem('scorex_device_id');
    if (!deviceId) return;

    // Optimistic UI Update
    const previousState = isFav;
    setIsFav(!isFav);

    const endpoint = 'http://localhost:5001/api/favorites';

    try {
      if (!previousState) {
        // Add to favorites
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deviceId,
            matchId: match.id,
            homeTeam: match.homeTeam.name,
            awayTeam: match.awayTeam.name,
            date: match.utcDate
          })
        });
      } else {
        // Remove
        await fetch(`${endpoint}/${deviceId}/${match.id}`, { method: 'DELETE' });
      }
    } catch (error) {
      // Revert if error
      setIsFav(previousState);
      console.error("Failed to toggle favorite");
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col hover:border-crimson transition-colors duration-300 relative group">
      
      {/* Absolute Position Heart Icon */}
      <button 
        onClick={toggleFavorite}
        className="absolute top-4 right-4 text-white hover:text-crimson transition-colors z-20"
      >
        <Heart 
          size={20} 
          fill={isFav ? '#DC143C' : 'transparent'} 
          color={isFav ? '#DC143C' : 'white'} 
        />
      </button>

      {/* Top Row: Teams & Score */}
      <div className="flex items-center justify-between mb-4">
        {/* Home Team */}
        <div className="flex flex-col items-center w-1/3">
          <span className="font-bold text-white text-lg text-center">{match.homeTeam.name}</span>
        </div>

        {/* Score / Time */}
        <div className="flex flex-col items-center w-1/3">
          {isLive && <span className="text-crimson text-xs font-bold animate-pulse">● LIVE</span>}
          {match.status === 'FINISHED' && <span className="text-gray-400 text-xs font-bold">FT</span>}
          
          <div className="text-4xl font-black text-white my-2">
            {match.score.fullTime.home ?? 0} - {match.score.fullTime.away ?? 0}
          </div>
          
          <span className="text-gray-400 text-sm">
            {isLive ? "45'" : format(new Date(match.utcDate), 'MMM d, HH:mm')}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center w-1/3">
          <span className="font-bold text-white text-lg text-center">{match.awayTeam.name}</span>
        </div>
      </div>

      {/* Bottom Row: AI Bar */}
      {/* Only show AI insights for Live or Upcoming games */}
      {match.status !== 'FINISHED' && (
        <div className="border-t border-white/10 pt-3">
          <AiInsightBar 
            homeProb={mockAiData.home} 
            awayProb={mockAiData.away} 
            insightText={mockAiData.text} 
          />
        </div>
      )}
    </div>
  );
}