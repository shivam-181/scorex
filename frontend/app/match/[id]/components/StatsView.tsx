'use client';
import { motion } from 'framer-motion';

// Reusable Stat Row Component
const StatRow = ({ label, homeValue, awayValue }: { label: string, homeValue: number, awayValue: number }) => {
  const total = homeValue + awayValue;
  // Prevent division by zero if game hasn't started
  const homePercent = total === 0 ? 50 : (homeValue / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm font-bold text-gray-400 mb-2 px-1">
        <span className="text-crimson">{homeValue}</span>
        <span className="uppercase tracking-wider text-[10px]">{label}</span>
        <span className="text-apricot">{awayValue}</span>
      </div>
      
      {/* The Bar */}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden flex relative">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${homePercent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-crimson"
        />
        {/* The gap is automatically filled by the background, creating a visual split */}
      </div>
    </div>
  );
};

export default function StatsView({ stats }: { stats: any }) {
  if (!stats) return <div className="text-white text-center">No stats available</div>;

  return (
    <div className="glass-panel p-6">
      <h3 className="text-white font-bold mb-6 text-lg">Match Statistics</h3>
      
      <StatRow label="Possession %" homeValue={stats.possession.home} awayValue={stats.possession.away} />
      <StatRow label="Shots" homeValue={stats.shots.home} awayValue={stats.shots.away} />
      <StatRow label="Fouls" homeValue={stats.fouls.home} awayValue={stats.fouls.away} />
      <StatRow label="Corners" homeValue={stats.corners.home} awayValue={stats.corners.away} />
    </div>
  );
}
