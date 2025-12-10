'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trophy, Medal } from 'lucide-react';
import { YearEntry } from '../../data/awards/history';

export default function WinnerCard({ yearEntry, colorHex }: { yearEntry: YearEntry; colorHex: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { winner, runnerUp, thirdPlace } = yearEntry;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden mb-8"
    >
        {/* Main Card Content */}
        <div className="flex flex-col md:flex-row">
            
            {/* Left: Year & Image */}
            <div className="relative w-full md:w-1/3 min-h-[300px] md:min-h-0 bg-black">
                <img 
                    src={winner.image} 
                    alt={winner.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    style={{ objectPosition: winner.imagePosition || 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-900/90" />
                
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                     <span className="text-5xl font-black text-white/10 tracking-tighter" style={{ textShadow: `0 0 20px ${colorHex}40` }}>{yearEntry.year}</span>
                </div>
            </div>

            {/* Right: Winner Info */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative">
                 <div className="absolute top-0 right-0 p-32 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-20 pointer-events-none" />

                 <div className="flex items-center gap-3 mb-2">
                     <span className="px-2 py-1 bg-yellow-500 text-black text-[10px] font-bold uppercase rounded">Winner</span>
                     <span className="text-sm text-gray-400">{winner.country}</span>
                 </div>

                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-none">
                    {winner.name}
                 </h2>
                 
                 <p className="text-lg text-white/60 mb-6 font-light">{winner.club}</p>
                 
                 {/* Stats Grid */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {winner.stats.goals !== undefined && (
                        <div className="bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                            <div className="text-2xl font-bold text-white">{winner.stats.goals}</div>
                            <div className="text-[10px] uppercase tracking-wider text-white/40">Goals</div>
                        </div>
                    )}
                    {winner.stats.assists !== undefined && (
                         <div className="bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                            <div className="text-2xl font-bold text-white">{winner.stats.assists}</div>
                            <div className="text-[10px] uppercase tracking-wider text-white/40">Assists</div>
                        </div>
                    )}
                    <div className="col-span-2 bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                        <div className="text-sm font-bold text-white line-clamp-1">{winner.stats.trophies.join(', ')}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/40">Key Trophies</div>
                    </div>
                 </div>

                 {/* Podium (Small) */}
                 <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-300/20 flex items-center justify-center text-slate-300 font-bold text-xs ring-1 ring-white/10">2</div>
                        <div className="text-xs">
                            <div className="text-white font-bold">{runnerUp.name}</div>
                            <div className="text-white/40">{runnerUp.club}</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-700/20 flex items-center justify-center text-amber-700 font-bold text-xs ring-1 ring-white/10">3</div>
                        <div className="text-xs">
                            <div className="text-white font-bold">{thirdPlace.name}</div>
                            <div className="text-white/40">{thirdPlace.club}</div>
                        </div>
                     </div>
                     
                     <div className="ml-auto">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-white/40 hover:text-white transition-colors"
                        >
                            {isOpen ? 'Close Shortlist' : 'View Shortlist'}
                            <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} size={14} />
                        </button>
                     </div>
                 </div>
            </div>
        </div>

        {/* Accordion: Nominees */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-black/50 border-t border-white/5"
                >
                    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {yearEntry.nominees.map((nominee, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-white/70">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                {nominee}
                            </div>
                        ))}
                         {yearEntry.nominees.length === 0 && <div className="text-white/30 text-xs italic">No additional nominees record available.</div>}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
  );
}
