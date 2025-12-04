import { format } from 'date-fns';

export default function MatchHeader({ match }: { match: any }) {
  const isLive = match.status === 'IN_PLAY';
  
  // Debug: Check if goals exist
  console.log("Match Goals Data:", match.goals);

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
          {isLive ? (
             <span className="bg-crimson px-3 py-1 rounded text-xs font-bold text-white animate-pulse mb-2">
               LIVE • {match.minute}'
             </span>
          ) : (
            <span className="bg-white/10 px-3 py-1 rounded text-xs font-bold text-gray-300 mb-2">
              {format(new Date(match.utcDate), 'MMM d, HH:mm')}
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


      {/* Goal Scorers Section */}
      {(match.status === 'FINISHED' || match.status === 'IN_PLAY') && match.goals && match.goals.length > 0 && (
        <div className="absolute bottom-8 w-full max-w-4xl px-6 flex justify-between text-sm text-gray-300 font-mono">
          {/* Home Scorers */}
          <div className="flex-1 text-right pr-8 md:pr-16">
            {match.goals
              .filter((g: any) => g.team.id === match.homeTeam.id)
              .map((g: any, i: number) => (
                <div key={i} className="mb-1">
                  {g.scorer.name} <span className="text-crimson">{g.minute}'</span>
                </div>
              ))}
          </div>

          {/* Goal Icon Center */}
          <div className="w-8 flex justify-center items-start text-gray-500">
            ⚽
          </div>

          {/* Away Scorers */}
          <div className="flex-1 text-left pl-8 md:pl-16">
            {match.goals
              .filter((g: any) => g.team.id === match.awayTeam.id)
              .map((g: any, i: number) => (
                <div key={i} className="mb-1">
                  <span className="text-crimson">{g.minute}'</span> {g.scorer.name}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
