export const calculateWinProbability = (homeTeam: any, awayTeam: any) => {
  // 1. Base logic: Home advantage (+10%)
  let homeScore = 50 + 10; 
  let awayScore = 50;

  // 2. Logic: League Standing (Mock logic since we might not have full table in this endpoint)
  // In a real app, you'd fetch the standings and compare ranks.
  
  // 3. Logic: Random "Form" factor for demo purposes (or use last 5 matches if API provides)
  const homeForm = Math.random() * 20; 
  const awayForm = Math.random() * 20;

  homeScore += homeForm;
  awayScore += awayForm;

  const total = homeScore + awayScore;
  const homeProb = Math.round((homeScore / total) * 100);
  
  return {
    home: homeProb,
    away: 100 - homeProb,
    insight: homeProb > 60 
      ? `AI Analysis: ${homeTeam.name} dominates possession potential.` 
      : `AI Analysis: Tight match expected.`
  };
};