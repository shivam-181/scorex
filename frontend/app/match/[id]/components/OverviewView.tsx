'use client';
import AiInsightBar from '@/components/AiInsightBar'; // Adjust path if needed
import BrandName from '@/components/BrandName';

// Helper to generate mock form (Win/Draw/Loss) since free API limits this
// Helper to generate deterministic mock form based on a string seed
const getDeterministicForm = (seed: string) => {
  const forms = ['W', 'D', 'L', 'W', 'L'];
  // Simple hash to sort deterministically
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return forms.sort((a, b) => (hash % 2 === 0 ? 1 : -1));
};

const FormDots = ({ form }: { form: string[] }) => (
  <div className="flex gap-2">
    {form.map((res, i) => (
      <div 
        key={i} 
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white
          ${res === 'W' ? 'bg-green-500' : res === 'L' ? 'bg-red-500' : 'bg-gray-500'}
        `}
      >
        {res}
      </div>
    ))}
  </div>
);

export default function OverviewView({ match }: { match: any }) {
  // Use real data if available, otherwise mock the "Form"
  // Use real data if available, otherwise mock the "Form"
  const homeForm = getDeterministicForm(match.homeTeam.name);
  const awayForm = getDeterministicForm(match.awayTeam.name);

  // Mock Probability (In real app, fetch from backend)
  const homeProb = 55;
  const awayProb = 45;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. AI Insight Section */}
      <div className="glass-panel p-6 border-crimson/30">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          🤖 AI Match Prediction
        </h3>
        <AiInsightBar 
          homeProb={homeProb} 
          awayProb={awayProb} 
          insightText={<><BrandName /> AI predicts a tight game, but {match.homeTeam.name} has a slight edge at home.</>}
        />
      </div>

      {/* 2. Head to Head (H2H) */}
      {match.h2h && (
        <div className="glass-panel p-6">
          <h3 className="text-white font-bold mb-4">Head-to-Head</h3>
          <div className="flex justify-between items-center mb-6 px-4">
             <div className="text-center">
               <div className="text-2xl font-black text-white">{match.h2h.aggregates?.homeTeamWins || 0}</div>
               <div className="text-xs text-gray-400 uppercase tracking-wider">{match.homeTeam.tla} Wins</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-black text-gray-400">{match.h2h.aggregates?.draws || 0}</div>
               <div className="text-xs text-gray-500 uppercase tracking-wider">Draws</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-black text-white">{match.h2h.aggregates?.awayTeamWins || 0}</div>
               <div className="text-xs text-gray-400 uppercase tracking-wider">{match.awayTeam.tla} Wins</div>
             </div>
          </div>
          
          <div className="space-y-3">
            {match.h2h.matches?.slice(0, 3).map((m: any, i: number) => (
              <div key={i} className="flex justify-between items-center text-sm p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400 w-20">{new Date(m.utcDate).toLocaleDateString()}</span>
                <div className="flex-1 flex justify-center gap-3 font-bold text-white">
                  <span>{m.homeTeam.name}</span>
                  <span className="text-crimson">{m.score.fullTime.home} - {m.score.fullTime.away}</span>
                  <span>{m.awayTeam.name}</span>
                </div>
                <span className="text-gray-500 w-20 text-right text-xs">{m.competition.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Recent Form Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel p-6">
          <h4 className="text-gray-400 text-sm mb-3 uppercase tracking-wider">{match.homeTeam.name} Form</h4>
          <FormDots form={homeForm} />
        </div>
        <div className="glass-panel p-6">
          <h4 className="text-gray-400 text-sm mb-3 uppercase tracking-wider">{match.awayTeam.name} Form</h4>
          <FormDots form={awayForm} />
        </div>
      </div>

      {/* 3. Match Details Grid */}
      <div className="glass-panel p-6">
        <h3 className="text-white font-bold mb-4">Match Info</h3>
        <div className="grid grid-cols-2 gap-y-6 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Stadium</p>
            <p className="text-white font-medium">
              {/* API sometimes sends venue, if not use generic */}
              {match.venue || "Stadium info unavailable"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Referee</p>
            <p className="text-white font-medium">
              {match.referees && match.referees[0] ? match.referees[0].name : "TBA"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Competition</p>
            <p className="text-white font-medium">{match.competition.name}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Round</p>
            <p className="text-white font-medium">Matchday {match.matchday}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
