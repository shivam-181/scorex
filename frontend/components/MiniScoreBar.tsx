'use client';
import { useRef } from 'react';
import { usePinnedMatch } from '../context/PinnedMatchContext';
import { X, Pin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MiniScoreBar() {
  const { pinnedMatch, unpinMatch } = usePinnedMatch();
  const constraintsRef = useRef(null);

  if (!pinnedMatch) return null;

  return (
    <>
      {/* Invisible constraint container covering the viewport */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40" />
      
      <AnimatePresence>
        <motion.div
          drag
          dragMomentum={false}
          dragConstraints={constraintsRef}
          whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 right-4 z-50 w-full max-w-xs md:max-w-sm cursor-grab active:cursor-grabbing pointer-events-auto"
        >
        <div className="bg-dark/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 flex items-center justify-between relative overflow-hidden">
          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-crimson to-apricot" />

          {/* Content */}
          <div className="flex items-center gap-4 w-full">
            {/* Status Indicator */}
            <div className="flex flex-col items-center min-w-[40px]">
              {pinnedMatch.status === 'IN_PLAY' ? (
                <span className="text-crimson animate-pulse text-xs font-bold">● LIVE</span>
              ) : (
                <span className="text-gray-400 text-xs font-bold">{pinnedMatch.status}</span>
              )}
              <span className="text-white font-mono text-sm">{pinnedMatch.minute}'</span>
            </div>

            {/* Score */}
            <div className="flex-1 flex justify-between items-center px-2">
              <span className="text-white font-bold truncate max-w-[80px] text-right">{pinnedMatch.homeTeam}</span>
              <div className="px-3 py-1 bg-white/5 rounded-lg font-mono font-black text-white">
                {pinnedMatch.score.home} - {pinnedMatch.score.away}
              </div>
              <span className="text-white font-bold truncate max-w-[80px] text-left">{pinnedMatch.awayTeam}</span>
            </div>
          </div>

          {/* Unpin Button */}
          <button 
            onClick={unpinMatch}
            className="ml-3 p-1.5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
    </>
  );
}
