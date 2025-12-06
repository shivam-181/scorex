'use client';
import React from 'react';

import Link from 'next/link';

// Helper to group players based on their defined position
const getFormation = (players: any[]) => {
  if (!Array.isArray(players) || players.length === 0) return { GK: [], DF: [], MF: [], FW: [] };
  
  // Filter by position
  const gk = players.filter(p => p.position === 'GK');
  const df = players.filter(p => p.position === 'DF');
  const mf = players.filter(p => p.position === 'MF');
  const fw = players.filter(p => p.position === 'FW');

  return { GK: gk, DF: df, MF: mf, FW: fw };
};

// Helper: Ensure we only show 11 players on pitch, move rest to substitutes
// Also handles missing positions by defaulting to MF
const optimizeLineup = (players: any[]) => {
  if (!Array.isArray(players)) return { xi: [], overflow: [] };

  // Normalize positions with robust mapping
  const normalizePosition = (pos: string) => {
    if (!pos) return 'MF';
    const upper = pos.toString().toUpperCase().trim();
    if (['GK', 'GOALKEEPER'].includes(upper)) return 'GK';
    if (['DF', 'DEFENDER', 'CB', 'LB', 'RB', 'RWB', 'LWB', 'BACK', 'CENTRE-BACK'].some(s => upper.includes(s))) return 'DF';
    if (['MF', 'MIDFIELDER', 'DM', 'CM', 'AM', 'LM', 'RM', 'CDM', 'CAM'].some(s => upper.includes(s))) return 'MF';
    if (['FW', 'FORWARD', 'ST', 'STRIKER', 'WINGER', 'LW', 'RW', 'CF', 'ATTACKER'].some(s => upper.includes(s))) return 'FW';
    return upper.length <= 2 ? upper : 'MF'; // Fallback
  };

  const normalized = players.map(p => ({
    ...p,
    position: normalizePosition(p.position)
  }));

  // 1. Find GK
  // We prefer the first player marked as GK.
  const gkIndex = normalized.findIndex(p => p.position === 'GK');
  
  let xi: any[] = [];
  let overflow: any[] = [];

  if (gkIndex !== -1) {
    xi.push(normalized[gkIndex]);
    // Remove from candidate pool
    const others = [...normalized];
    others.splice(gkIndex, 1);
    
    // 2. Take next 10 players for outfield
    xi.push(...others.slice(0, 10));
    overflow.push(...others.slice(10));
  } else {
    // If no GK, just take first 11 players?
    // Or take first 11, force first one to be GK visually? 
    // Let's just take first 11.
    xi = normalized.slice(0, 11);
    overflow = normalized.slice(11);
  }

  return { xi, overflow };
};

const PlayerDot = ({ player, color }: { player: any, color: string }) => {
  if (!player) return null;
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link href={`/player/${encodeURIComponent(player.name)}`} className="flex flex-col items-center justify-center mx-2 md:mx-4 group cursor-pointer">
      <div 
        className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg group-hover:scale-110 transition-transform overflow-hidden relative`}
        style={{ backgroundColor: color }}
      >
        {player.image && !imgError ? (
          <img 
            src={player.image} 
            alt={player.name} 
            className="w-full h-full object-cover" 
            onError={() => setImgError(true)}
          />
        ) : (
          player.number || '-'
        )}
      </div>
      <span className="text-[10px] text-white bg-black/50 px-1 rounded mt-1 truncate max-w-[60px] group-hover:bg-crimson transition-colors">
        {player.name ? player.name.split(' ').pop() : ''} {/* Show Last Name only */}
      </span>
    </Link>
  );
};

export default function LineupView({ lineups }: { lineups: any }) {
  if (!lineups || !lineups.home || !lineups.away) {
    return <div className="text-white text-center py-10">Lineup data unavailable</div>;
  }

  // Handle both new { starting, bench } structure and potential older/API structures
  const getPlayers = (teamData: any) => {
    if (Array.isArray(teamData)) return teamData; // Old/Flat structure
    if (teamData.starting && Array.isArray(teamData.starting)) return teamData.starting; // New structure
    if (teamData.startingXI && Array.isArray(teamData.startingXI)) return teamData.startingXI; // API structure fallback
    return [];
  };

  const getBench = (teamData: any) => {
     if (teamData.bench && Array.isArray(teamData.bench)) return teamData.bench;
     if (teamData.substitutes && Array.isArray(teamData.substitutes)) return teamData.substitutes;
     return [];
  };

  // Get raw starting lineups
  const homeStartingRaw = getPlayers(lineups.home);
  const awayStartingRaw = getPlayers(lineups.away);
  
  // Optimize: Limit to 11, get overflow
  const { xi: homeXI, overflow: homeOverflow } = optimizeLineup(homeStartingRaw);
  const { xi: awayXI, overflow: awayOverflow } = optimizeLineup(awayStartingRaw);

  console.log('DEBUG LINEUP FIX:', {
    homeRaw: homeStartingRaw?.length,
    homeXI: homeXI?.length,
    homeOverflow: homeOverflow?.length,
    awayRaw: awayStartingRaw?.length,
    awayXI: awayXI?.length,
    awayOverflow: awayOverflow?.length
  });
  
  // Combine official bench with our overflow
  const homeBench = [...getBench(lineups.home), ...homeOverflow];
  const awayBench = [...getBench(lineups.away), ...awayOverflow];

  const homeFormation = getFormation(homeXI);
  const awayFormation = getFormation(awayXI);

  return (
    <div className="w-full flex flex-col items-center py-4">
      {/* THE PITCH CONTAINER */}
      <div className="relative w-full max-w-[400px] h-[600px] bg-green-800 rounded-xl border-4 border-white/10 overflow-hidden shadow-2xl">
        
        {/* CSS Field Markings */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/grass.png')] opacity-30"></div>
        
        {/* Halfway Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/30"></div>
        
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/30 rounded-full"></div>

        {/* --- AWAY TEAM (Top) --- */}
        <div className="absolute top-0 w-full h-1/2 flex flex-col justify-start pt-4 pb-2">
          {/* GK */}
          <div className="flex justify-center mb-2">
            {awayFormation.GK[0] && <PlayerDot player={awayFormation.GK[0]} color="#fbceb1" />}
          </div>
          {/* DF */}
          <div className="flex justify-center mb-4">{awayFormation.DF.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#fbceb1" />)}</div>
          {/* MF */}
          <div className="flex justify-center mb-4">{awayFormation.MF.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#fbceb1" />)}</div>
          {/* FW */}
          <div className="flex justify-center">{awayFormation.FW.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#fbceb1" />)}</div>
        </div>

        {/* --- HOME TEAM (Bottom) --- */}
        <div className="absolute bottom-0 w-full h-1/2 flex flex-col justify-end pb-4 pt-2">
           {/* FW */}
           <div className="flex justify-center mb-4">{homeFormation.FW.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#DC143C" />)}</div>
           {/* MF */}
           <div className="flex justify-center mb-4">{homeFormation.MF.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#DC143C" />)}</div>
           {/* DF */}
           <div className="flex justify-center mb-2">{homeFormation.DF.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#DC143C" />)}</div>
           {/* GK */}
           <div className="flex justify-center">
             {homeFormation.GK[0] && <PlayerDot player={homeFormation.GK[0]} color="#DC143C" />}
           </div>
        </div>

      </div>

      {/* Substitutes Section */}
      <div className="w-full max-w-4xl mt-8 grid grid-cols-2 gap-8">
        {/* Home Subs */}
        <div>
          <h4 className="text-crimson font-bold mb-4 uppercase text-sm tracking-wider border-b border-white/10 pb-2">Home Substitutes</h4>
          <div className="space-y-2">
            {homeBench.map((p: any, i: number) => (
              <Link href={`/player/${encodeURIComponent(p.name)}`} key={i} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 p-1 rounded transition-colors cursor-pointer">
                <span className="w-6 text-right text-gray-500 font-mono">{p.number || '-'}</span>
                <span>{p.name}</span>
                <span className="text-xs text-gray-500 ml-auto">{p.position}</span>
              </Link>
            ))}
            {homeBench.length === 0 && <p className="text-gray-500 text-sm italic">No substitutes available</p>}
          </div>
        </div>

        {/* Away Subs */}
        <div>
          <h4 className="text-apricot font-bold mb-4 uppercase text-sm tracking-wider border-b border-white/10 pb-2">Away Substitutes</h4>
          <div className="space-y-2">
            {awayBench.map((p: any, i: number) => (
              <Link href={`/player/${encodeURIComponent(p.name)}`} key={i} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 p-1 rounded transition-colors cursor-pointer">
                <span className="w-6 text-right text-gray-500 font-mono">{p.number || '-'}</span>
                <span>{p.name}</span>
                <span className="text-xs text-gray-500 ml-auto">{p.position}</span>
              </Link>
            ))}
            {awayBench.length === 0 && <p className="text-gray-500 text-sm italic">No substitutes available</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
