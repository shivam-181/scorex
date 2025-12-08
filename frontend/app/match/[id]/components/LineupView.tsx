'use client';
import React from 'react';
import Link from 'next/link';

// === COORDINATE SYSTEM (Standard % from top-left) ===
// 'home' represents the team playing 'up' the pitch (bottom half) or just standard orientation.
// We will flip these for the away team.

const FORMATIONS: any = {
  '4-4-2': {
    GK: { top: 90, left: 50 },
    LB: { top: 70, left: 15 }, LCB: { top: 75, left: 38 }, RCB: { top: 75, left: 62 }, RB: { top: 70, left: 85 },
    LM: { top: 45, left: 15 }, LCM: { top: 50, left: 38 }, RCM: { top: 50, left: 62 }, RM: { top: 45, left: 85 },
    LST: { top: 20, left: 35 }, RST: { top: 20, left: 65 }
  },
  '4-3-3': {
    GK: { top: 92, left: 50 },
    LB: { top: 75, left: 12 }, LCB: { top: 78, left: 36 }, RCB: { top: 78, left: 64 }, RB: { top: 75, left: 88 },
    LCM: { top: 52, left: 30 }, CM: { top: 55, left: 50 }, RCM: { top: 52, left: 70 },
    LW: { top: 25, left: 15 }, ST: { top: 20, left: 50 }, RW: { top: 25, left: 85 }
  },
  '3-5-2': {
    GK: { top: 92, left: 50 },
    LCB: { top: 75, left: 25 }, CB: { top: 80, left: 50 }, RCB: { top: 75, left: 75 },
    LWB: { top: 50, left: 10 }, LCM: { top: 55, left: 35 }, CM: { top: 60, left: 50 }, RCM: { top: 55, left: 65 }, RWB: { top: 50, left: 90 },
    LST: { top: 20, left: 35 }, RST: { top: 20, left: 65 }
  },
  'fallback': {
    // Generic spots if formation is unknown
    GK: { top: 90, left: 50 },
    DF: [{top: 75, left: 20}, {top: 75, left: 40}, {top: 75, left: 60}, {top: 75, left: 80}],
    MF: [{top: 50, left: 20}, {top: 50, left: 40}, {top: 50, left: 60}, {top: 50, left: 80}],
    FW: [{top: 25, left: 30}, {top: 25, left: 70}]
  }
};

// Helper: Normalize position string to generic role
const normalizePosition = (pos: string) => {
  if (!pos) return 'MF';
  const upper = pos.toString().toUpperCase().trim();
  if (['GK', 'GOALKEEPER'].includes(upper)) return 'GK';
  if (upper.includes('BACK') || upper.includes('DF') || upper.includes('CB')) return 'DF';
  if (upper.includes('MID') || upper.includes('MF') || upper.includes('CM')) return 'MF';
  if (upper.includes('FOR') || upper.includes('FW') || upper.includes('ST') || upper.includes('WING')) return 'FW';
  return 'MF'; // Default
};

// Helper: Assign coordinate based on role index
const getCoordinates = (role: string, index: number, totalInRole: number) => {
  // Simple dynamic spread for generic roles
  const rowMap: any = { GK: 90, DF: 75, MF: 50, FW: 20 };
  const top = rowMap[role] || 50;
  
  // Calculate horizontal spread
  // e.g. 2 players: 33%, 66% | 3 players: 25%, 50%, 75% | 4 players: 20%, 40%, 60%, 80%
  const segment = 100 / (totalInRole + 1);
  const left = segment * (index + 1);
  
  return { top, left };
};

const PlayerDot = ({ player, color, style, isAway }: { player: any, color: string, style?: any, isAway?: boolean }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link 
      href={`/player/${encodeURIComponent(player.name)}`} 
      className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 hover:z-50 transition-all duration-300 w-16"
      style={style}
    >
      <div className="relative group cursor-pointer">
        <div 
          className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white flex items-center justify-center text-[10px] md:text-sm font-bold text-white shadow-lg group-hover:scale-110 transition-transform overflow-hidden relative bg-gray-800`}
          style={{ backgroundColor: color }}
        >
          {player.image && !imgError ? (
            <img 
              src={player.image} 
              alt={player.name} 
              className="w-full h-full object-cover transform transition-transform group-hover:scale-110" 
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="opacity-90">{player.number || '•'}</span>
          )}
        </div>
        
        {/* Name Tag */}
        <div className={`absolute left-1/2 -translate-x-1/2 ${isAway ? '-top-6' : 'bottom-[-20px]'} opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity`}>
          <span className="text-[9px] md:text-[10px] text-white font-bold bg-black/60 px-2 py-0.5 rounded-full whitespace-nowrap backdrop-blur-sm border border-white/10 uppercase tracking-widest shadow-md truncate block max-w-[80px]">
            {player.name ? player.name.split(' ').pop() : 'Player'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default function LineupView({ lineups }: { lineups: any }) {
  if (!lineups || !lineups.home || !lineups.away) {
    return <div className="text-white text-center py-10 font-mono text-sm opacity-50">Data unavailable</div>;
  }

  const getStartingXI = (team: any) => {
    let list = [];
    if (Array.isArray(team)) list = team;
    else if (team.starting && Array.isArray(team.starting)) list = team.starting;
    else if (team.startingXI && Array.isArray(team.startingXI)) list = team.startingXI;
    return list.slice(0, 11);
  };

  const getBench = (team: any) => {
     if (team.bench && Array.isArray(team.bench)) return team.bench;
     if (team.substitutes && Array.isArray(team.substitutes)) return team.substitutes;
     return [];
  };

  const homeXI = getStartingXI(lineups.home);
  const awayXI = getStartingXI(lineups.away);
  const homeBench = getBench(lineups.home);
  const awayBench = getBench(lineups.away);

  // Group by Role for simpler mapping fallback
  const processTeam = (players: any[]) => {
    const grouped: any = { GK: [], DF: [], MF: [], FW: [] };
    players.forEach(p => {
        const role = normalizePosition(p.position);
        grouped[role].push(p);
    });
    return grouped;
  };

  const homeGrouped = processTeam(homeXI);
  const awayGrouped = processTeam(awayXI);

  // Render Logic
  const renderTeam = (grouped: any, isAway: boolean, color: string) => {
    // Determine formations? For now, we use dynamic row spacing which is robust.
    // 1 GK + X DF + Y MF + Z FW
    
    return (
      <>
        {/* GK */}
        {grouped.GK.map((p: any, i: number) => (
           <PlayerDot 
             key={`gk-${i}`} 
             player={p} 
             color={color} 
             isAway={isAway}
             style={{ 
               top: isAway ? '10%' : '90%', 
               left: '50%' 
             }} 
            />
        ))}

        {/* DF */}
        {grouped.DF.map((p: any, i: number) => {
           const coords = getCoordinates('DF', i, grouped.DF.length);
           return <PlayerDot key={`df-${i}`} player={p} color={color} isAway={isAway} style={{ top: isAway ? `${100-coords.top}%` : `${coords.top}%`, left: `${coords.left}%` }} />;
        })}

        {/* MF */}
        {grouped.MF.map((p: any, i: number) => {
           const coords = getCoordinates('MF', i, grouped.MF.length);
           return <PlayerDot key={`mf-${i}`} player={p} color={color} isAway={isAway} style={{ top: isAway ? `${100-coords.top}%` : `${coords.top}%`, left: `${coords.left}%` }} />;
        })}

        {/* FW */}
        {grouped.FW.map((p: any, i: number) => {
           const coords = getCoordinates('FW', i, grouped.FW.length);
           return <PlayerDot key={`fw-${i}`} player={p} color={color} isAway={isAway} style={{ top: isAway ? `${100-coords.top}%` : `${coords.top}%`, left: `${coords.left}%` }} />;
        })}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      
      {/* --- THE PITCH --- */}
      {/* Aspect Ratio Container for Responsiveness */}
      <div className="w-full max-w-[500px] aspect-[2/3] relative bg-[#1a4a1c] rounded-lg border-[3px] border-white/20 shadow-2xl overflow-hidden select-none">
        
        {/* Pitch Textures */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_5%,rgba(0,0,0,0.05)_5%,rgba(0,0,0,0.05)_10%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>

        {/* Pitch Lines */}
        <div className="absolute top-4 bottom-4 left-4 right-4 border-2 border-white/40 opacity-70"></div> {/* Touchline */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/40 opacity-70"></div> {/* Halfway Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border-2 border-white/40 rounded-full opacity-70"></div> {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></div> {/* Center Spot */}
        
        {/* Penalty Areas */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-24 border-2 border-t-0 border-white/40 opacity-70"></div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-24 border-2 border-b-0 border-white/40 opacity-70"></div>

        {/* --- PLAYERS --- */}
        {/* AWAY (Top) */}
        {renderTeam(awayGrouped, true, "#fbceb1")}
        
        {/* HOME (Bottom) */}
        {renderTeam(homeGrouped, false, "#DC143C")}

      </div>


      {/* --- BENCH --- */}
      <div className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Home Subs */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <h4 className="flex items-center gap-2 text-crimson font-black mb-6 uppercase text-xs tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-crimson"></span> Home Subs
          </h4>
          <div className="space-y-3">
            {homeBench.map((p: any, i: number) => (
              <Link href={`/player/${encodeURIComponent(p.name)}`} key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 font-mono text-xs w-6">{p.number}</span>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-gray-200 group-hover:text-white">{p.name}</span>
                     <span className="text-[10px] text-gray-600 uppercase tracking-wider">{p.position}</span>
                  </div>
                </div>
                {p.image && <img src={p.image} className="w-8 h-8 rounded-full object-cover opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all" alt="" />}
              </Link>
            ))}
            {homeBench.length === 0 && <p className="text-gray-600 text-xs text-center py-4">No substitutes listed.</p>}
          </div>
        </div>

        {/* Away Subs */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
           <h4 className="flex items-center gap-2 text-apricot font-black mb-6 uppercase text-xs tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-apricot"></span> Away Subs
          </h4>
          <div className="space-y-3">
            {awayBench.map((p: any, i: number) => (
              <Link href={`/player/${encodeURIComponent(p.name)}`} key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 font-mono text-xs w-6">{p.number}</span>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-gray-200 group-hover:text-white">{p.name}</span>
                     <span className="text-[10px] text-gray-600 uppercase tracking-wider">{p.position}</span>
                  </div>
                </div>
                {p.image && <img src={p.image} className="w-8 h-8 rounded-full object-cover opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all" alt="" />}
              </Link>
            ))}
             {awayBench.length === 0 && <p className="text-gray-600 text-xs text-center py-4">No substitutes listed.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
