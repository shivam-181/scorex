'use client';
import { useState, useEffect } from 'react';
import MatchCard from '@/components/MatchCard';
import { useRouter } from 'next/navigation';

export default function MyFeed() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      const deviceId = localStorage.getItem('scorex_device_id');
      
      if (!deviceId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5001/api/favorites/${deviceId}`);
        const data = await res.json();
        
        // We need to transform the MongoDB data to match the MatchCard props
        // Note: MongoDB stores: { homeTeam: "Name", awayTeam: "Name", date: "..." }
        // MatchCard expects deeper structure. Let's map it manually or adjust MatchCard.
        // For this tutorial, we format it to look like the API response:
        const formattedData = data.map((fav: any) => ({
          id: fav.matchId,
          status: 'SCHEDULED', // We assume scheduled/finished based on date in a real app
          utcDate: fav.date,
          homeTeam: { name: fav.homeTeam },
          awayTeam: { name: fav.awayTeam },
          score: { fullTime: { home: null, away: null } }
        }));

        setFavorites(formattedData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-dark p-6 pt-24 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <img 
          src="https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white tracking-tighter">
              MY <span className="text-crimson">FEED</span>
            </h1>
            <button 
              onClick={() => router.push('/')}
              className="text-sm text-gray-400 hover:text-white underline"
            >
              Back to Live Scores
            </button>
        </div>

        {loading ? (
           <p className="text-apricot animate-pulse">Syncing your watchlist...</p>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-700 rounded-xl">
            <p className="text-gray-400 mb-4">You haven't followed any matches yet.</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-crimson text-white px-6 py-2 rounded-full font-bold"
            >
              Explore Matches
            </button>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((match: any) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
