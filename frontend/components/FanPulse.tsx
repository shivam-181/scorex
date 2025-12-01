"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FanPulseProps {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
}

export default function FanPulse({ matchId, homeTeam, awayTeam }: FanPulseProps) {
  const [voted, setVoted] = useState<"home" | "away" | null>(null);
  
  // Mock initial percentages (randomized slightly for realism)
  const [stats] = useState(() => {
    const home = 40 + Math.floor(Math.random() * 20); // 40-60%
    return { home, away: 100 - home };
  });

  useEffect(() => {
    const savedVote = localStorage.getItem(`fan_pulse_vote_${matchId}`);
    if (savedVote === "home" || savedVote === "away") {
      setVoted(savedVote);
    }
  }, [matchId]);

  const handleVote = (e: React.MouseEvent, team: "home" | "away") => {
    e.preventDefault();
    e.stopPropagation();
    if (voted) return;
    
    setVoted(team);
    localStorage.setItem(`fan_pulse_vote_${matchId}`, team);
  };

  if (voted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-3"
      >
        <div className="flex justify-between text-xs font-bold text-white mb-1">
          <span>{stats.home}%</span>
          <span className="text-gray-400">Fan Pulse</span>
          <span>{stats.away}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
          <motion.div 
            initial={{ width: "50%" }}
            animate={{ width: `${stats.home}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-crimson"
          />
          <motion.div 
            initial={{ width: "50%" }}
            animate={{ width: `${stats.away}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gray-600"
          />
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-1">
          You voted for {voted === "home" ? homeTeam : awayTeam}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mt-3 flex gap-2">
      <button
        onClick={(e) => handleVote(e, "home")}
        className="flex-1 py-1.5 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-lg hover:bg-crimson hover:border-crimson transition-all"
      >
        {homeTeam}
      </button>
      <div className="flex items-center justify-center">
        <span className="text-[10px] font-bold text-gray-500 uppercase">Vote</span>
      </div>
      <button
        onClick={(e) => handleVote(e, "away")}
        className="flex-1 py-1.5 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-lg hover:bg-gray-600 hover:border-gray-500 transition-all"
      >
        {awayTeam}
      </button>
    </div>
  );
}
