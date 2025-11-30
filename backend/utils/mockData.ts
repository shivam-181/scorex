// A helper to generate realistic looking stats if the API returns null
export const generateMockStats = () => {
  const possession = Math.floor(Math.random() * (65 - 35 + 1) + 35);
  return {
    possession: { home: possession, away: 100 - possession },
    shots: { home: Math.floor(Math.random() * 15), away: Math.floor(Math.random() * 12) },
    fouls: { home: Math.floor(Math.random() * 10), away: Math.floor(Math.random() * 12) },
    corners: { home: Math.floor(Math.random() * 8), away: Math.floor(Math.random() * 6) },
  };
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
