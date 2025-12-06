'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Zap, Target, Users, Loader2, BrainCircuit } from 'lucide-react';

export default function PlayerProfile() {
  const { id } = useParams(); // 'id' is actually the player name in this implementation
  const router = useRouter();
  const playerName = decodeURIComponent(id as string);

  const [playerData, setPlayerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlayerReport = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players/${encodeURIComponent(playerName)}`);
        if (!res.ok) throw new Error("Failed to generate report");
        const data = await res.json();
        setPlayerData(data);
      } catch (err) {
        console.error(err);
        setError("Could not load scout report.");
      } finally {
        setLoading(false);
      }
    };

    if (playerName) {
      fetchPlayerReport();
    }
  }, [playerName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-crimson blur-xl opacity-20 animate-pulse"></div>
          <Loader2 className="text-crimson animate-spin relative z-10" size={48} />
        </div>
        <p className="text-gray-400 animate-pulse">Scouting {playerName}...</p>
      </div>
    );
  }

  if (error || !playerData) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error || "Player not found"}</p>
        <button onClick={() => router.back()} className="text-white hover:text-crimson">Go Back</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-dark pb-20 relative overflow-hidden">
      {/* Background Watermark */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />

      {/* Header */}
      <div className="relative z-10 pt-24 px-4 container mx-auto">
        <button 
          onClick={() => router.back()}
          className="mb-8 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors flex items-center gap-2 w-fit"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-8 items-end"
        >
          {/* Avatar Placeholder */}
          <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-crimson to-red-900 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,20,60,0.4)] border-4 border-dark overflow-hidden relative">
            {playerData.image ? (
              <img src={playerData.image} alt={playerData.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl md:text-6xl font-bold text-white">
                {playerData.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 mb-4">
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-crimson text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                 AI Scout Report
               </span>
               <BrainCircuit size={16} className="text-crimson animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              {playerData.name}
            </h1>
            <div className="flex gap-4 text-gray-400 mt-2 text-lg">
              <span className="flex items-center gap-1"><Target size={18} /> {playerData.position}</span>
              <span className="w-px h-6 bg-white/10"></span>
              <span className="flex items-center gap-1"><Users size={18} /> {playerData.nationality}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bio Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 glass-panel p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="text-crimson" /> Scout Summary
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {playerData.bio}
            </p>
          </motion.div>

          {/* Similar Players */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="text-blue-400" /> Similar Profiles
            </h2>
            <ul className="space-y-3">
              {playerData.similar_players?.map((player: string, idx: number) => (
                <li key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold">
                    {player.charAt(0)}
                  </div>
                  <span className="text-gray-300">{player}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Strengths */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 border-l-4 border-l-green-500"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-green-500" /> Strengths
            </h2>
            <div className="flex flex-wrap gap-2">
              {playerData.strengths?.map((str: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  {str}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Weaknesses */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-8 border-l-4 border-l-red-500"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="text-red-500" /> Areas to Improve
            </h2>
            <div className="flex flex-wrap gap-2">
              {playerData.weaknesses?.map((wk: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-sm font-medium">
                  {wk}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
