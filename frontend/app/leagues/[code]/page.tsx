'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Loader2, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

// Static Config for Visuals (Colors/Logos)
const leagueConfig: any = {
  PL: { 
    name: "Premier League", 
    country: "England", 
    color: "from-purple-600 to-blue-600", 
    logo: "http://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png",
  },
  PD: { 
    name: "La Liga", 
    country: "Spain", 
    color: "from-orange-500 to-red-600", 
    logo: "https://assets.laliga.com/assets/2023/06/05/hl/823498d5841735b9b824018eea71df33.jpeg",
  },
  BL1: { 
    name: "Bundesliga", 
    country: "Germany", 
    color: "from-red-600 to-yellow-500", 
    logo: "https://sp-static-images.s3.amazonaws.com/logos/germanleague/Bundesliga/c_pad_630x1200/Bundesliga.png",
  },
  SA: { 
    name: "Serie A", 
    country: "Italy", 
    color: "from-blue-400 to-cyan-500", 
    logo: "https://sp-static-images.s3.amazonaws.com/logos/Serie_A_logo/c_pad_630x1200/Serie_A_logo.png",
  },
  FL1: { 
    name: "Ligue 1", 
    country: "France", 
    color: "from-blue-800 to-red-500", 
    logo: "https://s2.dmcdn.net/v/XaUSs1dQvCscSCXmD/x1080",
  },
  CL: { 
    name: "Champions League", 
    country: "Europe", 
    color: "from-blue-900 to-indigo-900", 
    logo: "https://www.logo.wine/a/logo/UEFA_Champions_League/UEFA_Champions_League-Logo.wine.svg",
  },
};

export default function LeagueDetails() {
  const { code } = useParams();
  const router = useRouter(); // Initialize router
  const leagueCode = code as string;
  const config = leagueConfig[leagueCode];
  
  const [showFullTable, setShowFullTable] = useState(false);
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!config) return;

    const fetchStandings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leagues/${leagueCode}/standings`);
        if (!res.ok) throw new Error("Failed to fetch standings");
        const data = await res.json();
        
        // Extract the 'TOTAL' table
        const totalStandings = data.standings.find((s: any) => s.type === 'TOTAL')?.table || [];
        setStandings(totalStandings);
      } catch (err) {
        console.error(err);
        setError("Could not load live standings.");
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [leagueCode, config]);

  if (!config) return <div className="text-white text-center pt-40">League not found</div>;

  return (
    <main className="min-h-screen bg-dark pb-20">
      {/* Hero Header */}
      <div className={`relative h-80 bg-gradient-to-br ${config.color} flex items-center justify-center overflow-hidden`}>
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="hidden md:block absolute top-28 left-6 z-30 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Watermark Logo */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <img 
            src={config.logo} 
            alt={config.name} 
            className="w-full h-full object-cover grayscale"
           />
        </div>
        
        <div className="z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2"
          >
            {config.name}
          </motion.h1>
          <p className="text-white/80 text-xl font-bold">{config.country}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 z-20 relative">
        {/* Stats Grid - Placeholder for now as API doesn't give top scorer easily in this endpoint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 flex items-center gap-4">
            <div className="p-3 bg-crimson/20 rounded-full text-crimson"><Trophy size={32} /></div>
            <div>
              <p className="text-gray-400 text-sm">Current Leader</p>
              <p className="text-white font-bold text-lg">{standings[0]?.team.name || "Loading..."}</p>
            </div>
          </div>
          <div className="glass-panel p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-full text-blue-400"><Users size={32} /></div>
            <div>
              <p className="text-gray-400 text-sm">Teams</p>
              <p className="text-white font-bold text-lg">{standings.length || "-"}</p>
            </div>
          </div>
          <div className="glass-panel p-6 flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-full text-green-400"><Calendar size={32} /></div>
            <div>
              <p className="text-gray-400 text-sm">Season</p>
              <p className="text-white font-bold text-lg">2024/25</p>
            </div>
          </div>
        </div>

        {/* Standings Table */}
        <div className="glass-panel p-8 min-h-[400px]">
          <h2 className="text-2xl font-bold text-white mb-6">Live Standings</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin text-crimson" size={40} />
            </div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : (
            <>
              <div className="space-y-4">
                {standings.slice(0, showFullTable ? undefined : 5).map((team: any) => (
                  <div key={team.position} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${team.position <= 4 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
                        {team.position}
                      </span>
                      <div className="flex items-center gap-3">
                         <img src={team.team.crest} alt={team.team.name} className="w-6 h-6 object-contain" />
                         <span className="text-white font-bold">{team.team.name}</span>
                      </div>
                    </div>
                    <div className="flex gap-4 md:gap-8 text-gray-400 text-sm">
                      <span className="hidden md:inline">MP: {team.playedGames}</span>
                      <span className="hidden md:inline">W: {team.won}</span>
                      <span className="hidden md:inline">D: {team.draw}</span>
                      <span className="hidden md:inline">L: {team.lost}</span>
                      <span className="hidden md:inline">GD: {team.goalDifference}</span>
                      <span className="font-bold text-white w-8 text-right">Pts: {team.points}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setShowFullTable(!showFullTable)}
                  className="text-crimson font-bold hover:text-white transition-colors"
                >
                  {showFullTable ? "Show Less" : "View Full Table →"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
