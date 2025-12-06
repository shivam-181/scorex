// A helper to generate realistic looking stats if the API returns null
export const generateMockStats = () => {
  const possession = Math.floor(Math.random() * (65 - 35 + 1) + 35);
  return {
    possession: { home: possession, away: 100 - possession },
    shots: { home: Math.floor(Math.random() * 15) + 5, away: Math.floor(Math.random() * 12) + 3 },
    shotsOnTarget: { home: Math.floor(Math.random() * 8) + 2, away: Math.floor(Math.random() * 6) + 1 },
    fouls: { home: Math.floor(Math.random() * 15) + 5, away: Math.floor(Math.random() * 15) + 5 },
    corners: { home: Math.floor(Math.random() * 10) + 1, away: Math.floor(Math.random() * 8) + 1 },
    offsides: { home: Math.floor(Math.random() * 5), away: Math.floor(Math.random() * 5) },
    yellowCards: { home: Math.floor(Math.random() * 4), away: Math.floor(Math.random() * 4) },
    redCards: { home: 0, away: 0 }, // Keep red cards rare
    saves: { home: Math.floor(Math.random() * 5), away: Math.floor(Math.random() * 8) },
  };
};

export const generateMockTimeline = (homeName: string, awayName: string, score: { home: number, away: number }) => {
  const events = [];
  
  // Generate Goals
  for (let i = 0; i < score.home; i++) {
    events.push({
      type: 'GOAL',
      minute: Math.floor(Math.random() * 90) + 1,
      team: { name: homeName },
      scorer: { name: `Home Player ${i + 1}` },
    });
  }
  for (let i = 0; i < score.away; i++) {
    events.push({
      type: 'GOAL',
      minute: Math.floor(Math.random() * 90) + 1,
      team: { name: awayName },
      scorer: { name: `Away Player ${i + 1}` },
    });
  }

  // Add some random cards
  const cardsCount = Math.floor(Math.random() * 5);
  for (let i = 0; i < cardsCount; i++) {
    events.push({
      type: 'CARD',
      minute: Math.floor(Math.random() * 90) + 1,
      card: Math.random() > 0.9 ? 'RED' : 'YELLOW',
      team: { name: Math.random() > 0.5 ? homeName : awayName },
      player: { name: `Player ${i + 1}` },
    });
  }

  // Add substitutions
  const subCount = Math.floor(Math.random() * 6);
  for (let i = 0; i < subCount; i++) {
     events.push({
      type: 'SUB',
      minute: Math.floor(Math.random() * 45) + 45, // 2nd half subs
      team: { name: Math.random() > 0.5 ? homeName : awayName },
      playerOut: { name: `Out Player ${i}` },
      playerIn: { name: `In Player ${i}` },
    });
  }

  return events.sort((a, b) => a.minute - b.minute);
};

// A generic 4-3-3 formation mock for development
export const getMockLineup = (teamName: string) => {
  return [
    { position: 'GK', name: 'Goalkeeper', number: 1 },
    { position: 'DF', name: 'Defender 1', number: 2 },
    { position: 'DF', name: 'Defender 2', number: 3 },
    { position: 'DF', name: 'Defender 3', number: 4 },
    { position: 'DF', name: 'Defender 4', number: 5 },
    { position: 'MF', name: 'Midfielder 1', number: 6 },
    { position: 'MF', name: 'Midfielder 2', number: 8 },
    { position: 'MF', name: 'Midfielder 3', number: 10 },
    { position: 'FW', name: 'Winger L', number: 7 },
    { position: 'FW', name: 'Striker', number: 9 },
    { position: 'FW', name: 'Winger R', number: 11 },
  ];
};
