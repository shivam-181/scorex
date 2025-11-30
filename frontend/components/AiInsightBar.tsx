'use client';
import { motion } from 'framer-motion';

interface AiInsightProps {
  homeProb: number;
  awayProb: number;
  insightText: React.ReactNode;
}

export default function AiInsightBar({ homeProb, awayProb, insightText }: AiInsightProps) {
  return (
    <div className="mt-4 w-full">
      {/* The Text Insight */}
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-gradient-to-r from-crimson to-orange-500 text-[10px] font-bold px-2 py-0.5 rounded text-white animate-pulse">
          AI INSIGHT
        </span>
        <p className="text-xs text-gray-300 italic">{insightText}</p>
      </div>

      {/* The Probability Bar */}
      <div className="relative h-2 w-full bg-gray-800 rounded-full overflow-hidden flex">
        {/* Home Team Bar (Crimson) */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${homeProb}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-crimson shadow-[0_0_10px_#DC143C]"
        />
        
        {/* Away Team Bar (Apricot/White) */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${awayProb}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-apricot shadow-[0_0_10px_#FBCEB1]"
        />
      </div>

      {/* Percentages below */}
      <div className="flex justify-between text-[10px] font-mono mt-1 text-gray-400">
        <span>Win {homeProb}%</span>
        <span>Win {awayProb}%</span>
      </div>
    </div>
  );
}