'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Trophy, Users, Newspaper, ArrowRight, Loader2, Zap } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { legends } from '../../data/legends';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any>({ leagues: [], teams: [], news: [], legends: [] });
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce Query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch Results
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults({ leagues: [], teams: [], news: [], legends: [] });
        return;
      }

      setLoading(true);
      
      // Local Search: Legends
      const matchedLegends = legends.filter(l => 
        l.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || 
        l.fullName.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults({ ...data, legends: matchedLegends });
      } catch (error) {
        console.error("Search failed:", error);
        // Still show legends even if API fails
        setResults({ leagues: [], teams: [], news: [], legends: matchedLegends });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <main className="min-h-screen bg-dark pt-4 pb-20 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0YWRpdW18ZW58MHx8MHx8fDA%3D" 
          alt="Background" 
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          
          {loading && (
            <div className="flex justify-center mb-8">
              <Loader2 className="animate-spin text-crimson" size={32} />
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="space-y-12 max-w-5xl mx-auto">
          
          {/* Legends Section (New) */}
          {results.legends && results.legends.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="text-yellow-500" /> Legends Hall
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.legends.map((legend: any) => (
                  <Link href={`/legacy/${legend.id}`} key={legend.id}>
                    <div className="glass-panel p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group border border-yellow-500/20">
                      <img src={legend.image} alt={legend.name} className="w-12 h-12 object-cover rounded-full border border-yellow-500/50" />
                      <div>
                        <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors">{legend.name}</h3>
                        <p className="text-xs text-yellow-500/60 uppercase tracking-wider">Legend · {legend.nationality}</p>
                      </div>
                      <ArrowRight className="ml-auto text-yellow-500/50 group-hover:translate-x-1 transition-transform" size={16} />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Leagues Section */}
          {results.leagues.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="text-blue-500" /> Competitions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.leagues.map((league: any) => (
                  <Link href={`/leagues/${league.code}`} key={league.code}>
                    <div className="glass-panel p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
                      <img src={league.logo} alt={league.name} className="w-10 h-10 object-contain" />
                      <div>
                        <h3 className="font-bold text-white group-hover:text-crimson transition-colors">{league.name}</h3>
                        <p className="text-xs text-gray-400">Competition</p>
                      </div>
                      <ArrowRight className="ml-auto text-gray-500 group-hover:translate-x-1 transition-transform" size={16} />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Teams Section */}
          {results.teams.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="text-crimson" /> Teams
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.teams.map((team: any) => (
                  <div key={team.id} className="glass-panel p-4 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group">
                    <img src={team.logo} alt={team.name} className="w-10 h-10 object-contain" />
                    <div>
                      <h3 className="font-bold text-white group-hover:text-crimson transition-colors">{team.name}</h3>
                      <p className="text-xs text-gray-400">Football Club</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* News Section */}
          {results.news.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Newspaper className="text-green-500" /> Latest News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.news.map((article: any, idx: number) => (
                  <a href={article.url} target="_blank" rel="noopener noreferrer" key={idx} className="glass-panel p-4 flex gap-4 hover:bg-white/10 transition-colors group">
                    <img src={article.image || '/placeholder.jpg'} alt={article.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-crimson transition-colors">{article.title}</h3>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>{article.source}</span>
                        <span>Read More →</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.section>
          )}

          {/* Empty State / Trending */}
          {!loading && debouncedQuery.length < 2 && (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-2">
                <Zap className="text-yellow-400" /> Trending Now
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Topic 1 */}
                <div className="glass-panel p-6 hover:bg-white/10 transition-colors cursor-pointer group text-left">
                  <div className="text-crimson font-bold text-xs mb-2 uppercase tracking-wider">Transfer Market</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-crimson transition-colors">Mbappé's Next Move?</h3>
                  <p className="text-gray-400 text-sm">Rumors swirling about a potential shock exit.</p>
                </div>
                {/* Topic 2 */}
                <div className="glass-panel p-6 hover:bg-white/10 transition-colors cursor-pointer group text-left">
                  <div className="text-blue-400 font-bold text-xs mb-2 uppercase tracking-wider">Champions League</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Quarter-Final Draw</h3>
                  <p className="text-gray-400 text-sm">Predicting the biggest clashes of the round.</p>
                </div>
                {/* Topic 3 */}
                <div className="glass-panel p-6 hover:bg-white/10 transition-colors cursor-pointer group text-left">
                  <div className="text-green-400 font-bold text-xs mb-2 uppercase tracking-wider">Tactics</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">The Rise of the False 9</h3>
                  <p className="text-gray-400 text-sm">How modern managers are rethinking strikers.</p>
                </div>
              </div>
            </div>
          )}

          {/* No Results State */}
          {!loading && debouncedQuery.length >= 2 && results.leagues.length === 0 && results.teams.length === 0 && results.news.length === 0 && (
            <div className="text-center py-20 opacity-50">
              <p className="text-xl text-gray-400">No results found for "{debouncedQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
