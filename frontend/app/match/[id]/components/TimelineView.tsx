'use client';
import { motion } from 'framer-motion';

export default function TimelineView({ match }: { match: any }) {
  // Combine all events: Goals, Cards, Substitutions (if available)
  // The API structure for goals is `match.goals`.
  // Cards and substitutions might be in `match.bookings` or `match.substitutions` if the API provides them.
  // For now, we'll focus on goals and mock/check for others.

  const events = [
    ...(match.goals || []).map((g: any) => ({ ...g, type: 'GOAL' })),
    ...(match.bookings || []).map((b: any) => ({ ...b, type: 'CARD' })),
    ...(match.substitutions || []).map((s: any) => ({ ...s, type: 'SUB' })),
  ].sort((a, b) => a.minute - b.minute);

  if (events.length === 0) {
    return (
      <div className="glass-panel p-8 text-center text-gray-400">
        <p>No match events available yet.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6">
      <h3 className="text-white font-bold mb-6 text-lg">Match Timeline</h3>
      <div className="relative border-l-2 border-white/10 ml-4 space-y-8">
        {events.map((event: any, i: number) => {
          const isHome = event.team.id === match.homeTeam.id;
          
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8"
            >
              {/* Dot on the line */}
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-dark ${
                event.type === 'GOAL' ? 'bg-crimson' : 
                event.type === 'CARD' ? (event.card === 'RED' ? 'bg-red-600' : 'bg-yellow-400') : 
                'bg-blue-500'
              }`} />

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-crimson font-bold text-lg mr-3">{event.minute}'</span>
                  <span className="text-white font-medium text-lg">
                    {event.type === 'GOAL' && '⚽ Goal'}
                    {event.type === 'CARD' && (event.card === 'RED' ? '🟥 Red Card' : '🟨 Yellow Card')}
                    {event.type === 'SUB' && '🔄 Substitution'}
                  </span>
                  <p className="text-gray-400 mt-1">
                    {event.scorer && event.scorer.name}
                    {event.player && event.player.name}
                    {event.type === 'SUB' && `${event.playerOut.name} ➔ ${event.playerIn.name}`}
                  </p>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-gray-400">
                  {isHome ? match.homeTeam.tla : match.awayTeam.tla}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
