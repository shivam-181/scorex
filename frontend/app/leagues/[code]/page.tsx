'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar } from 'lucide-react';
import { useState } from 'react';

// Mock Data for League Details
const leagueData: any = {
  PL: { 
    name: "Premier League", 
    country: "England", 
    color: "from-purple-600 to-blue-600", 
    logo: "http://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png",
    champion: "Liverpool",
    topScorer: "Mohamed Salah (29)",
    nextMatch: "Dec 6, 2025",
    standings: [
      { pos: 1, team: "Liverpool", mp: 38, pts: 92 },
      { pos: 2, team: "Arsenal", mp: 38, pts: 89 },
      { pos: 3, team: "Man City", mp: 38, pts: 85 },
      { pos: 4, team: "Chelsea", mp: 38, pts: 74 },
      { pos: 5, team: "Newcastle", mp: 38, pts: 70 },
      { pos: 6, team: "Man Utd", mp: 38, pts: 68 },
      { pos: 7, team: "Tottenham", mp: 38, pts: 65 },
      { pos: 8, team: "Aston Villa", mp: 38, pts: 60 },
      { pos: 9, team: "Brighton", mp: 38, pts: 55 },
      { pos: 10, team: "West Ham", mp: 38, pts: 52 }
    ]
  },
  PD: { 
    name: "La Liga", 
    country: "Spain", 
    color: "from-orange-500 to-red-600", 
    logo: "https://assets.laliga.com/assets/2023/06/05/hl/823498d5841735b9b824018eea71df33.jpeg",
    champion: "Barcelona",
    topScorer: "Kylian Mbappé (31)",
    nextMatch: "Dec 7, 2025",
    standings: [
      { pos: 1, team: "Barcelona", mp: 38, pts: 88 },
      { pos: 2, team: "Real Madrid", mp: 38, pts: 84 },
      { pos: 3, team: "Atlético Madrid", mp: 38, pts: 76 },
      { pos: 4, team: "Athletic Bilbao", mp: 38, pts: 70 },
      { pos: 5, team: "Villarreal", mp: 38, pts: 70 }
    ]
  },
  BL1: { 
    name: "Bundesliga", 
    country: "Germany", 
    color: "from-red-600 to-yellow-500", 
    logo: "https://sp-static-images.s3.amazonaws.com/logos/germanleague/Bundesliga/c_pad_630x1200/Bundesliga.png",
    champion: "Bayern Munich",
    topScorer: "Harry Kane (26)",
    nextMatch: "Dec 5, 2025",
    standings: [
      { pos: 1, team: "Bayern Munich", mp: 34, pts: 82 },
      { pos: 2, team: "Bayer Leverkusen", mp: 34, pts: 69 },
      { pos: 3, team: "Eintracht Frankfurt", mp: 34, pts: 60 },
      { pos: 4, team: "Dortmund", mp: 34, pts: 57 },
      { pos: 5, team: "Freiburg", mp: 34, pts: 55 }
    ]
  },
  SA: { 
    name: "Serie A", 
    country: "Italy", 
    color: "from-blue-400 to-cyan-500", 
    logo: "https://sp-static-images.s3.amazonaws.com/logos/Serie_A_logo/c_pad_630x1200/Serie_A_logo.png",
    champion: "Napoli",
    topScorer: "Mateo Retegui (25)",
    nextMatch: "Dec 6, 2025",
    standings: [
      { pos: 1, team: "Napoli", mp: 38, pts: 89 },
      { pos: 2, team: "Inter Milan", mp: 38, pts: 82 },
      { pos: 3, team: "Atalanta", mp: 38, pts: 75 },
      { pos: 4, team: "Juventus", mp: 38, pts: 71 },
      { pos: 5, team: "AS Roma", mp: 38, pts: 68 }
    ]
  },
  FL1: { 
    name: "Ligue 1", 
    country: "France", 
    color: "from-blue-800 to-red-500", 
    logo: "https://s2.dmcdn.net/v/XaUSs1dQvCscSCXmD/x1080",
    champion: "PSG",
    topScorer: "Ousmane Dembélé (21)",
    nextMatch: "Dec 5, 2025",
    standings: [
      { pos: 1, team: "PSG", mp: 34, pts: 84 },
      { pos: 2, team: "Marseille", mp: 34, pts: 65 },
      { pos: 3, team: "Monaco", mp: 34, pts: 61 },
      { pos: 4, team: "Nice", mp: 34, pts: 60 },
      { pos: 5, team: "Lille", mp: 34, pts: 60 }
    ]
  },
  CL: { 
    name: "Champions League", 
    country: "Europe", 
    color: "from-blue-900 to-indigo-900", 
    logo: "https://www.logo.wine/a/logo/UEFA_Champions_League/UEFA_Champions_League-Logo.wine.svg",
    champion: "PSG",
    topScorer: "Raphinha (13)",
    nextMatch: "Dec 9, 2025",
    standings: [
      { pos: 1, team: "Liverpool", mp: 8, pts: 24 },
      { pos: 2, team: "Barcelona", mp: 8, pts: 21 },
      { pos: 3, team: "Arsenal", mp: 8, pts: 19 },
      { pos: 4, team: "Inter Milan", mp: 8, pts: 18 },
      { pos: 5, team: "Atlético Madrid", mp: 8, pts: 17 }
    ]
  },
};

export default function LeagueDetails() {
  const { code } = useParams();
  const league = leagueData[code as string];
  const [showFullTable, setShowFullTable] = useState(false);

  if (!league) return <div className="text-white text-center pt-40">League not found</div>;

  return (
    <main className="min-h-screen bg-dark pb-20">
      {/* Hero Header */}
      <div className={`relative h-80 bg-gradient-to-br ${league.color} flex items-center justify-center overflow-hidden`}>
        {/* Watermark Logo */}
        {/* Watermark Logo */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <img 
            src={league.logo} 
            alt={league.name} 
            className="w-full h-full object-cover grayscale"
           />
        </div>
        
        <div className="z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2"
          >
            {league.name}
          </motion.h1>
          <p className="text-white/80 text-xl font-bold">{league.country}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 z-20 relative">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 flex items-center gap-4">
            <div className="p-3 bg-crimson/20 rounded-full text-crimson"><Trophy size={32} /></div>
            <div>
              <p className="text-gray-400 text-sm">Current Champion</p>
              <p className="text-white font-bold text-lg">{league.champion}</p>
            </div>
          </div>
          <div className="glass-panel p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-full text-blue-400"><Users size={32} /></div>
            <div>
              <p className="text-gray-400 text-sm">Top Scorer</p>
              <p className="text-white font-bold text-lg">{league.topScorer}</p>
            </div>
          </div>
          <div className="glass-panel p-6 flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-full text-green-400"><Calendar size={32} /></div>
            <div>
              <p className="text-gray-400 text-sm">Next Matchday</p>
              <p className="text-white font-bold text-lg">{league.nextMatch}</p>
            </div>
          </div>
        </div>

        {/* Standings Placeholder */}
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Live Standings (2024/25)</h2>
          <div className="space-y-4">
            {league.standings.slice(0, showFullTable ? undefined : 5).map((team: any) => (
              <div key={team.pos} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0">
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${team.pos <= 4 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
                    {team.pos}
                  </span>
                  <span className="text-white font-bold">{team.team}</span>
                </div>
                <div className="flex gap-8 text-gray-400 text-sm">
                  <span>MP: {team.mp}</span>
                  <span className="font-bold text-white">Pts: {team.pts}</span>
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
        </div>
      </div>
    </main>
  );
}
