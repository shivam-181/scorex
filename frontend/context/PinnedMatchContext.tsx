'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PinnedMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  score: { home: number; away: number };
  status: string;
  minute?: string | number;
}

interface PinnedMatchContextType {
  pinnedMatch: PinnedMatch | null;
  pinMatch: (match: PinnedMatch) => void;
  unpinMatch: () => void;
}

const PinnedMatchContext = createContext<PinnedMatchContextType | undefined>(undefined);

export function PinnedMatchProvider({ children }: { children: ReactNode }) {
  const [pinnedMatch, setPinnedMatch] = useState<PinnedMatch | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('scorex_pinned_match');
    if (saved) {
      try {
        setPinnedMatch(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse pinned match", e);
      }
    }
  }, []);

  const pinMatch = (match: PinnedMatch) => {
    setPinnedMatch(match);
    localStorage.setItem('scorex_pinned_match', JSON.stringify(match));
  };

  const unpinMatch = () => {
    setPinnedMatch(null);
    localStorage.removeItem('scorex_pinned_match');
  };

  return (
    <PinnedMatchContext.Provider value={{ pinnedMatch, pinMatch, unpinMatch }}>
      {children}
    </PinnedMatchContext.Provider>
  );
}

export function usePinnedMatch() {
  const context = useContext(PinnedMatchContext);
  if (context === undefined) {
    throw new Error('usePinnedMatch must be used within a PinnedMatchProvider');
  }
  return context;
}
