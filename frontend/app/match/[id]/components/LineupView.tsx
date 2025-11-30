'use client';

// Helper to group players by position (GK, DF, MF, FW)
const getFormation = (players: any[]) => {
  return {
    GK: players.filter(p => p.position === 'GK'),
    DF: players.filter(p => p.position === 'DF'),
    MF: players.filter(p => p.position === 'MF'),
    FW: players.filter(p => p.position === 'FW'),
  };
};

const PlayerDot = ({ player, color }: { player: any, color: string }) => (
  <div className="flex flex-col items-center justify-center mx-2 md:mx-4">
    <div 
      className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg`}
      style={{ backgroundColor: color }}
    >
      {player.number}
    </div>
    <span className="text-[10px] text-white bg-black/50 px-1 rounded mt-1 truncate max-w-[60px]">
      {player.name.split(' ').pop()} {/* Show Last Name only */}
    </span>
  </div>
);

export default function LineupView({ lineups }: { lineups: any }) {
  const home = getFormation(lineups.home);
  const away = getFormation(lineups.away);

  return (
    <div className="w-full flex justify-center py-4">
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
          <div className="flex justify-center mb-2"><PlayerDot player={away.GK[0]} color="#fbceb1" /></div>
          {/* DF */}
          <div className="flex justify-center mb-4">{away.DF.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#fbceb1" />)}</div>
          {/* MF */}
          <div className="flex justify-center mb-4">{away.MF.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#fbceb1" />)}</div>
          {/* FW */}
          <div className="flex justify-center">{away.FW.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#fbceb1" />)}</div>
        </div>

        {/* --- HOME TEAM (Bottom) --- */}
        <div className="absolute bottom-0 w-full h-1/2 flex flex-col justify-end pb-4 pt-2">
           {/* FW */}
           <div className="flex justify-center mb-4">{home.FW.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#DC143C" />)}</div>
           {/* MF */}
           <div className="flex justify-center mb-4">{home.MF.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#DC143C" />)}</div>
           {/* DF */}
           <div className="flex justify-center mb-2">{home.DF.map((p: any, i: number) => <PlayerDot key={i} player={p} color="#DC143C" />)}</div>
           {/* GK */}
           <div className="flex justify-center"><PlayerDot player={home.GK[0]} color="#DC143C" /></div>
        </div>

      </div>
    </div>
  );
}
