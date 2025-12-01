'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function MatchHypePage() {
  const { id } = useParams();
  const router = useRouter();
  const [match, setMatch] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    // Fetch match details
    const fetchMatch = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/football/match/${id}`);
        const data = await res.json();
        setMatch(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMatch();
  }, [id]);

  useEffect(() => {
    if (!match) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const matchTime = new Date(match.utcDate).getTime();
      const distance = matchTime - now;

      if (distance < 0) {
        setTimeLeft("LIVE NOW");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [match]);

  if (!match) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Hype...</div>;

  return (
    <main className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2831&auto=format&fit=crop" 
          alt="Stadium" 
          className="w-full h-full object-cover opacity-40 animate-pulse-slow"
        />
      </div>

      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-8 left-8 z-20 text-white/50 hover:text-white transition-colors flex items-center gap-2"
      >
        <ArrowLeft size={24} /> Back
      </button>

      <div className="z-10 w-full max-w-6xl px-4">
        {/* Competition Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="px-4 py-1 border border-white/20 rounded-full text-sm font-bold text-white/60 uppercase tracking-widest">
            {match.competition?.name || "Upcoming Match"}
          </span>
        </motion.div>

        {/* Teams VS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 mb-16">
          {/* Home Team */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 relative mb-6">
              <div className="absolute inset-0 bg-crimson/20 blur-3xl rounded-full" />
              <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{match.homeTeam.name}</h2>
          </motion.div>

          {/* VS */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-crimson to-apricot italic"
          >
            VS
          </motion.div>

          {/* Away Team */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 relative mb-6">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
              <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{match.awayTeam.name}</h2>
          </motion.div>
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-panel p-8 md:p-12 inline-block border-crimson/30"
        >
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4 font-bold">Kickoff In</p>
          <div className="text-4xl md:text-7xl font-mono font-bold text-white tabular-nums tracking-tight">
            {timeLeft}
          </div>
          <div className="mt-4 text-white/60 flex items-center justify-center gap-2">
            <Calendar size={16} />
            <span>{format(new Date(match.utcDate), "EEEE, MMMM do, yyyy 'at' HH:mm")}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex justify-center gap-4"
        >
          <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Share2 size={18} /> Share Hype
          </button>
        </motion.div>
      </div>
    </main>
  );
}
