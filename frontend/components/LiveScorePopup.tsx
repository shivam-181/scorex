"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, Trophy } from "lucide-react";

interface Match {
  id: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  score: { fullTime: { home: number; away: number } };
  status: string;
  minute?: string | number;
  competition?: { name: string; emblem: string };
}

export default function LiveScorePopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/football/live`);
      const data = await res.json();
      // Filter only live matches
      const live = data.matches?.filter((m: any) => m.status === "IN_PLAY" || m.status === "PAUSED") || [];
      setMatches(live);
    } catch (error) {
      console.error("Failed to fetch live scores", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLiveMatches();
      // Poll every 60 seconds
      const interval = setInterval(fetchLiveMatches, 60000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full mt-4 right-0 w-full md:w-[450px] bg-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              <h3 className="font-bold text-white tracking-wide">LIVE MATCHES</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={fetchLiveMatches} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                title="Refresh"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {loading && matches.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <div className="animate-spin w-6 h-6 border-2 border-crimson border-t-transparent rounded-full mx-auto mb-2" />
                Loading live scores...
              </div>
            ) : matches.length === 0 ? (
              <div className="p-8 text-center text-gray-400 flex flex-col items-center">
                <Trophy size={32} className="mb-2 opacity-50" />
                <p>No matches currently live.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {matches.map((match) => (
                  <div key={match.id} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-crimson uppercase tracking-wider">
                        {match.competition?.name || "LEAGUE"}
                      </span>
                      <span className="text-[10px] font-mono text-crimson animate-pulse">
                        {match.minute ? `${match.minute}'` : "LIVE"}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {/* Home */}
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-sm font-bold text-white truncate max-w-[100px]">
                          {match.homeTeam.name}
                        </span>
                      </div>

                      {/* Score */}
                      <div className="px-4 py-1 bg-black/40 rounded-lg border border-white/5 font-mono font-bold text-white mx-2 min-w-[60px] text-center">
                        {match.score.fullTime.home ?? 0} - {match.score.fullTime.away ?? 0}
                      </div>

                      {/* Away */}
                      <div className="flex items-center gap-3 flex-1 justify-end">
                        <span className="text-sm font-bold text-white truncate max-w-[100px] text-right">
                          {match.awayTeam.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-3 bg-crimson/10 border-t border-white/5 text-center">
            <span className="text-[10px] text-crimson font-bold tracking-widest uppercase">
              Real-time Updates
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
