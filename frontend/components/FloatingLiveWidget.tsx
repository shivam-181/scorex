"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Match {
  id: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  score: { fullTime: { home: number; away: number } };
  status: string;
  minute?: string | number;
  competition?: { name: string; emblem: string };
}

export default function FloatingLiveWidget() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveMatches = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/football/live`);
      const data = await res.json();
      // Filter only live matches and take top 3
      const live = data.matches?.filter((m: any) => m.status === "IN_PLAY" || m.status === "PAUSED") || [];
      setMatches(live.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch live scores", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!loading && matches.length === 0) return null;

  return (
    <AnimatePresence>
      {matches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: [0, 10, 0],
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            y: { 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }
          }}
          className="absolute top-52 left-4 md:left-8 z-40 w-[300px] md:w-[350px] bg-dark/80 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-2 bg-crimson/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-xs font-bold text-white tracking-wider">LIVE ACTION</span>
            </div>
            <span className="text-[10px] text-white/80 font-mono">
              {matches.length} Active
            </span>
          </div>

          {/* Matches List */}
          <div className="divide-y divide-white/5">
            {matches.map((match) => (
              <div key={match.id} className="p-3 hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-crimson uppercase tracking-wider truncate max-w-[150px]">
                    {match.competition?.name || "LEAGUE"}
                  </span>
                  <span className="text-[9px] font-mono text-crimson animate-pulse">
                    {match.minute ? `${match.minute}'` : "LIVE"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white truncate max-w-[100px]">
                    {match.homeTeam.name}
                  </span>
                  <div className="px-2 py-0.5 bg-black/40 rounded border border-white/5 font-mono font-bold text-white text-xs">
                    {match.score.fullTime.home ?? 0} - {match.score.fullTime.away ?? 0}
                  </div>
                  <span className="font-bold text-white truncate max-w-[100px] text-right">
                    {match.awayTeam.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
