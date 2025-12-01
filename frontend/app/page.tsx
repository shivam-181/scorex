"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "../components/Hero";
import MatchCard from "../components/MatchCard";
import LeagueFilter from "../components/LeagueFilter";
import FeaturesSection from "../components/FeaturesSection";
import NewsPreview from "../components/NewsPreview";
import { Search, Zap, Calendar } from "lucide-react";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  // 1. Add Filter State
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [showRecentOnly, setShowRecentOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Matches
        const matchesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/football/live`
        );
        const matchesData = await matchesRes.json();
        setMatches(matchesData.matches || []);

        // 2. Fetch Favorites
        const deviceId = localStorage.getItem("scorex_device_id");
        if (deviceId) {
          const favRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${deviceId}`
          );
          const favData = await favRes.json();
          // Extract match IDs from favorites
          setFavorites(favData.map((fav: any) => fav.matchId));
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();

    // Re-fetch on focus to keep favorites in sync
    const handleFocus = () => {
      fetchData();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Scroll Restoration Effect
  useEffect(() => {
    if (!loading && matches.length > 0) {
      const scrollMatchId = sessionStorage.getItem('scorex_scroll_match_id');
      if (scrollMatchId) {
        // Small timeout to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(`match-card-${scrollMatchId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Optional: Clear it so it doesn't scroll on random refreshes, 
            // but keeping it might be better for "back" behavior consistency.
            // sessionStorage.removeItem('scorex_scroll_match_id'); 
          }
        }, 100);
      }
    }
  }, [loading, matches]);

  // 2. The Filter Logic
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
    if (showRecentOnly) {
      return new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime();
    }
    return 0;
  });

  return (
    <main className="min-h-screen bg-dark">
      <Hero />

      <div
        className="container mx-auto px-4 py-20 relative overflow-hidden"
        id="live-scores"
      >
        {/* Background Watermark */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <img
            src="https://images.unsplash.com/photo-1570498839593-e565b39455fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbGwlMjBwaXRjaHxlbnwwfDF8MHx8fDA%3D"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
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
            </div>
          </div>

          {/* 3. Render the Filter Bar */}
          <LeagueFilter
            activeFilter={activeFilter}
            setFilter={setActiveFilter}
          />

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crimson"></div>
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
