"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "../components/Hero";
import MatchCard from "../components/MatchCard";
import LeagueFilter from "../components/LeagueFilter";
import FeaturesSection from "../components/FeaturesSection";
import NewsPreview from "../components/NewsPreview";
import { Search, Zap, Calendar } from "lucide-react";
import ScrollRestoration from "@/components/ScrollRestoration";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  // 1. Add Filter & Sort State
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [showRecentOnly, setShowRecentOnly] = useState(false);
  const [sortOption, setSortOption] = useState<"DATE" | "LEAGUE" | "HOME_TEAM">("DATE");

  // ... (useEffect remains same) ...

  // 3. The Filter Logic
  const filteredMatches = matches.filter((match: any) => {
    // League Filter
    if (activeFilter !== "ALL" && match.competition.code !== activeFilter) return false;

    // Live Filter
    if (showLiveOnly && match.status !== "IN_PLAY" && match.status !== "PAUSED") return false;

    // Upcoming Filter
    if (showUpcomingOnly && match.status !== "SCHEDULED" && match.status !== "TIMED") return false;

    // Recent Filter
    if (showRecentOnly && match.status !== "FINISHED") return false;

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const home = match.homeTeam.name.toLowerCase();
      const away = match.awayTeam.name.toLowerCase();
      return home.includes(query) || away.includes(query);
    }

    return true;
  }).sort((a: any, b: any) => {
    // 1. Priority: Live matches always on top unless sorting by specific criteria that overrides it? 
    // Actually, let's keep live on top for DATE sort, but maybe strict sort for others.
    // For now, let's just sort the filtered list.

    if (sortOption === 'LEAGUE') {
      return a.competition.name.localeCompare(b.competition.name);
    }
    if (sortOption === 'HOME_TEAM') {
      return a.homeTeam.name.localeCompare(b.homeTeam.name);
    }
    
    // Default: DATE (and Status priority)
    // If showing recent, we want newest first.
    if (showRecentOnly) {
      return new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime();
    }
    
    // Otherwise (Upcoming/Live/All), we usually want earliest first.
    return new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();
  });

  return (
    <main className="min-h-screen bg-dark">
      <Hero />

      <div className="relative w-full py-20 overflow-hidden" id="live-scores">
        {/* Background Watermark - Full Width */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <img
            src="https://images.unsplash.com/photo-1570498839593-e565b39455fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbGwlMjBwaXRjaHxlbnwwfDF8MHx8fDA%3D"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container - Centered */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
            <h2 className="text-3xl font-bold text-white border-l-4 border-crimson pl-4">
              Live Center
            </h2>

            {/* Search and Live Toggle */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-crimson transition-colors"
                />
              </div>

              {/* Live Toggle */}
              <button
                onClick={() => {
                  setShowLiveOnly(!showLiveOnly);
                  if (!showLiveOnly) {
                    setShowUpcomingOnly(false);
                    setShowRecentOnly(false);
                  }
                }}
                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                  showLiveOnly
                    ? "bg-crimson border-crimson text-white shadow-[0_0_15px_#DC143C]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                <Zap size={16} className={showLiveOnly ? "fill-white" : ""} />
                LIVE
              </button>

              {/* Upcoming Toggle */}
              <button
                onClick={() => {
                  setShowUpcomingOnly(!showUpcomingOnly);
                  if (!showUpcomingOnly) {
                    setShowLiveOnly(false);
                    setShowRecentOnly(false);
                  }
                }}
                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                  showUpcomingOnly
                    ? "bg-[#DC143C]/10 border-white text-white shadow-[0_0_15px_#DC143C]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                <Calendar size={16} className={showUpcomingOnly ? "text-white" : ""} />
                UPCOMING
              </button>

              {/* Recent Toggle */}
              <button
                onClick={() => {
                  setShowRecentOnly(!showRecentOnly);
                  if (!showRecentOnly) {
                    setShowLiveOnly(false);
                    setShowUpcomingOnly(false);
                  }
                }}
                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                  showRecentOnly
                    ? "bg-[#DC143C]/10 border-white text-white shadow-[0_0_15px_#DC143C]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                <Calendar size={16} className={showRecentOnly ? "text-white" : ""} />
                RECENT
              </button>

              {/* Sort Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm font-bold">
                  <span className="uppercase">Sort: {sortOption.replace('_', ' ')}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-40 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden hidden group-hover:block z-50">
                  <button 
                    onClick={() => setSortOption('DATE')}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortOption === 'DATE' ? 'text-crimson font-bold' : 'text-gray-400'}`}
                  >
                    Date
                  </button>
                  <button 
                    onClick={() => setSortOption('LEAGUE')}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortOption === 'LEAGUE' ? 'text-crimson font-bold' : 'text-gray-400'}`}
                  >
                    League
                  </button>
                  <button 
                    onClick={() => setSortOption('HOME_TEAM')}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortOption === 'HOME_TEAM' ? 'text-crimson font-bold' : 'text-gray-400'}`}
                  >
                    Home Team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Render the Filter Bar */}
          <LeagueFilter
            activeFilter={activeFilter}
            setFilter={setActiveFilter}
          />

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crimson"></div>
              <p className="text-gray-400 text-sm animate-pulse">
                Loading live scores...
              </p>
              {/* Show "Waking up" message after 3 seconds */}
              <div className="text-xs text-gray-500 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-3000 fill-mode-forwards opacity-0" style={{ animationDelay: '3s' }}>
                (Waking up server, this might take a moment...)
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match: any) => (
                  <Link 
                    href={`/match/${match.id}`} 
                    key={match.id}
                    onClick={() => {
                      // Save scroll position marker
                      sessionStorage.setItem('scorex_scroll_match_id', match.id);
                    }}
                    id={`match-card-${match.id}`} // Add ID for scrolling
                  >
                    <MatchCard
                      match={match}
                      initialIsFav={favorites.includes(match.id.toString())}
                    />
                  </Link>
                ))
              ) : (
                // 4. Empty State
                <div className="col-span-full text-center py-10 opacity-50">
                  <p>No matches found matching your filters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* News Preview Section */}
      <NewsPreview />

      {/* Features Section */}
      <FeaturesSection />
    </main>
  );
}
