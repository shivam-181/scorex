'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Hero from '../components/Hero';
import MatchCard from '../components/MatchCard';
import LeagueFilter from '../components/LeagueFilter';
import FeaturesSection from '../components/FeaturesSection';
import NewsPreview from '../components/NewsPreview';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // 1. Add Filter State
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Matches
        const matchesRes = await fetch('http://localhost:5001/api/football/live');
        const matchesData = await matchesRes.json();
        setMatches(matchesData.matches || []);

        // 2. Fetch Favorites
        const deviceId = localStorage.getItem('scorex_device_id');
        if (deviceId) {
          const favRes = await fetch(`http://localhost:5001/api/favorites/${deviceId}`);
          const favData = await favRes.json();
          // Extract match IDs from favorites
          setFavorites(favData.map((fav: any) => fav.matchId));
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. The Filter Logic
  const filteredMatches = matches.filter((match: any) => {
    if (activeFilter === 'ALL') return true;
    return match.competition.code === activeFilter;
  });

  return (
    <main className="min-h-screen bg-dark">
      <Hero />
      
      {/* Features Section */}
      <FeaturesSection />

      <div className="container mx-auto px-4 py-20 relative overflow-hidden" id="live-scores">
        {/* Background Watermark */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <img 
            src="https://images.unsplash.com/photo-1570498839593-e565b39455fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbGwlMjBwaXRjaHxlbnwwfDF8MHx8fDA%3D" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-crimson pl-4">Live Center</h2>
        
        {/* 3. Render the Filter Bar */}
        <LeagueFilter activeFilter={activeFilter} setFilter={setActiveFilter} />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crimson"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match: any) => (
                <Link href={`/match/${match.id}`} key={match.id}>
                  <MatchCard match={match} initialIsFav={favorites.includes(match.id.toString())} />
                </Link>
              ))
            ) : (
              // 4. Empty State
              <div className="col-span-full text-center py-10 opacity-50">
                <p>No matches found in this league today.</p>
              </div>
            )}
          </div>
        )}
        </div>
      </div>

      {/* News Preview Section */}
      <NewsPreview />
    </main>
  );
}