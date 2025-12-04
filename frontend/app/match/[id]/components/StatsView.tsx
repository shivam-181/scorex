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
      
      <StatRow label="Possession %" homeValue={stats.possession?.home ?? 50} awayValue={stats.possession?.away ?? 50} />
      <StatRow label="Shots" homeValue={stats.shots?.home ?? 0} awayValue={stats.shots?.away ?? 0} />
      <StatRow label="Shots on Target" homeValue={stats.shotsOnTarget?.home ?? 0} awayValue={stats.shotsOnTarget?.away ?? 0} />
      <StatRow label="Fouls" homeValue={stats.fouls?.home ?? 0} awayValue={stats.fouls?.away ?? 0} />
      <StatRow label="Corners" homeValue={stats.corners?.home ?? 0} awayValue={stats.corners?.away ?? 0} />
      <StatRow label="Offsides" homeValue={stats.offsides?.home ?? 0} awayValue={stats.offsides?.away ?? 0} />
      <StatRow label="Yellow Cards" homeValue={stats.yellowCards?.home ?? 0} awayValue={stats.yellowCards?.away ?? 0} />
      <StatRow label="Red Cards" homeValue={stats.redCards?.home ?? 0} awayValue={stats.redCards?.away ?? 0} />
      <StatRow label="Saves" homeValue={stats.saves?.home ?? 0} awayValue={stats.saves?.away ?? 0} />
    </div>
  );
}
