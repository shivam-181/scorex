'use client';
import { motion } from 'framer-motion';

interface FilterProps {
  activeFilter: string;
  setFilter: (filter: string) => void;
}

const LEAGUES = [
  { id: 'ALL', name: '🔥 All' },
  { id: 'PL', name: '🇬🇧 Premier League' },
  { id: 'PD', name: '🇪🇸 La Liga' },
  { id: 'CL', name: '🇪🇺 Champions League' },
  { id: 'SA', name: '🇮🇹 Serie A' },
  { id: 'BL1', name: '🇩🇪 Bundesliga' },
  { id: 'FL1', name: '🇫🇷 Ligue 1' }, // Added nice to have
  { id: 'MLS', name: '🇺🇸 MLS' },     // Major League Soccer
  { id: 'SPL', name: '🇸🇦 Saudi Pro League' }, // Saudi League
];

export default function LeagueFilter({ activeFilter, setFilter }: FilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar mb-6">
      {LEAGUES.map((league) => (
        <button
          key={league.id}
          onClick={() => setFilter(league.id)}
          className={`
            px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all duration-300 border
            ${activeFilter === league.id 
              ? 'bg-crimson border-crimson text-white shadow-[0_0_15px_#DC143C]' 
              : 'bg-glass border-white/10 text-gray-400 hover:border-white/30'
            }
          `}
        >
          {league.name}
        </button>
      ))}
    </div>
  );
}
