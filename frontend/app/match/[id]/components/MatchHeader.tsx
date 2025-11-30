import { format } from 'date-fns';

export default function MatchHeader({ match }: { match: any }) {
  const isLive = match.status === 'IN_PLAY';

  return (
    <div className="relative min-h-[45vh] w-full flex items-center justify-center overflow-hidden py-12">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 via-dark to-dark z-0" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 flex justify-between items-center text-center">
        
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-20 h-20 md:w-32 md:h-32 bg-white/5 rounded-full p-4 mb-4 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center">
            {match.homeTeam.crest ? (
              <img 
                src={match.homeTeam.crest} 
                alt={match.homeTeam.name} 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            ) : (
              <span className="text-2xl">⚽</span>
            )}
          </div>
          <h2 className="text-xl md:text-3xl font-black text-white tracking-tight uppercase">
            {match.homeTeam.name}
          </h2>
        </div>

        {/* Scoreboard */}
        <div className="flex flex-col items-center mx-4 md:mx-12">
          {isLive && (
             <span className="bg-crimson px-3 py-1 rounded text-xs font-bold text-white animate-pulse mb-2">
               LIVE • {match.minute}'
             </span>
          )}
          
          <div className="text-5xl md:text-7xl font-black text-white tracking-widest font-mono">
            {match.score.fullTime.home ?? 0}-{match.score.fullTime.away ?? 0}
          </div>
          
          <div className="text-gray-400 mt-2 text-sm font-bold uppercase tracking-widest">
            {match.competition.name}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1">
           <div className="w-20 h-20 md:w-32 md:h-32 bg-white/5 rounded-full p-4 mb-4 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center">
             {match.awayTeam.crest ? (
              <img 
                src={match.awayTeam.crest} 
                alt={match.awayTeam.name} 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            ) : (
              <span className="text-2xl">⚽</span>
            )}
          </div>
          <h2 className="text-xl md:text-3xl font-black text-white tracking-tight uppercase">
            {match.awayTeam.name}
          </h2>
        </div>
        
      </div>
    </div>
  );
}
