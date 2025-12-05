"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "../components/Hero";
import MatchCard from "../components/MatchCard";
import LeagueFilter from "../components/LeagueFilter";
import FeaturesSection from "../components/FeaturesSection";
import NewsPreview from "../components/NewsPreview";
import { Search, Zap, Calendar, ArrowUpDown } from "lucide-react";
import ScrollRestoration from "@/components/ScrollRestoration";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [error, setError] = useState("");

  // 1. Add Filter & Sort State
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [showRecentOnly, setShowRecentOnly] = useState(false);
  const [sortOption, setSortOption] = useState<"TIME" | "LEAGUE" | "STATUS">("TIME");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // 1. Data Fetching Effect
  useEffect(() => {
    const fetchData = async () => {
      console.log("Page: Starting fetch...");
      try {
        // Fetch Matches
        console.log("Page: Fetching matches from", process.env.NEXT_PUBLIC_API_URL);
        const matchesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/football/live`
        );
        console.log("Page: Matches response status:", matchesRes.status);
        
        if (!matchesRes.ok) throw new Error(`Failed to fetch matches: ${matchesRes.status}`);

        const matchesData = await matchesRes.json();
        console.log("Page: Matches data received:", matchesData);
        
        setMatches(matchesData.matches || []);

        // Fetch Favorites
        const deviceId = localStorage.getItem("scorex_device_id");
        if (deviceId) {
          console.log("Page: Fetching favorites for", deviceId);
          try {
            const favRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${deviceId}`
            );
            const favData = await favRes.json();
            setFavorites(favData.map((fav: any) => fav.matchId));
          } catch (favErr) {
            console.error("Page: Error fetching favorites:", favErr);
            // Don't block main loading for favorites
          }
        }

        console.log("Page: Fetch complete, turning off loading.");
        setLoading(false);
      } catch (err: any) {
        console.error("Page: Error in fetchData:", err);
        setError(err.message);
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

  // 2. Scroll Restoration Effect
  useEffect(() => {
    // Check for Hash (Prioritize specific section navigation)
    if (window.location.hash === '#live-scores') {
       setTimeout(() => {
         const element = document.getElementById('live-scores');
         if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
         }
       }, 100);
       return; // Skip restoring saved position if hash is present
    }

    // Restore position on load
    const savedPosition = sessionStorage.getItem('scorex_scroll_position');
    if (savedPosition) {
       window.scrollTo(0, parseInt(savedPosition));
    }

    // Save position on scroll (debounced)
    const handleScroll = () => {
      sessionStorage.setItem('scorex_scroll_position', window.scrollY.toString());
    };
    
    // Debounce scroll event
    let timeoutId: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedScroll);

    // Match Card Scroll (Specific navigation fallback)
    if (!loading && matches.length > 0) {
      const scrollMatchId = sessionStorage.getItem('scorex_scroll_match_id');
      if (scrollMatchId) {
        setTimeout(() => {
          const element = document.getElementById(`match-card-${scrollMatchId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            sessionStorage.removeItem('scorex_scroll_match_id'); 
          }
        }, 500); // Increased delay to ensure rendering
      }
    }
    
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(timeoutId);
    };
  }, [loading, matches]);

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
    if (sortOption === 'LEAGUE') {
      const leagueA = a.competition?.name || "";
      const leagueB = b.competition?.name || "";
      return leagueA.localeCompare(leagueB);
    }
    
    if (sortOption === 'STATUS') {
      // Priority: Live (1) > Upcoming (2) > Finished (3)
      const getPriority = (status: string) => {
        if (['IN_PLAY', 'PAUSED'].includes(status)) return 1;
        if (['SCHEDULED', 'TIMED'].includes(status)) return 2;
        return 3; 
      };
      return getPriority(a.status) - getPriority(b.status);
    }
    
    // Default: TIME (Chronological)
    // If showing recent, we want newest first.
    if (showRecentOnly) {
      return new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime();
    }
    
    // Otherwise (Upcoming/Live/All), we usually want earliest first.
    return new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();
  });

  // Debug Sort Option
  useEffect(() => {
    console.log("Sort Option Changed:", sortOption);
  }, [sortOption]);

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
              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${isSortOpen ? 'bg-crimson border-crimson text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                >
                  <ArrowUpDown size={18} />
                </button>
                
                {/* Dropdown Menu */}
                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/5">
                      <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/5 bg-white/5">
                        Sort By
                      </div>
                      <button 
                        onClick={() => { setSortOption('TIME'); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortOption === 'TIME' ? 'text-crimson font-bold' : 'text-gray-400'}`}
                      >
                        Time
                      </button>
                      <button 
                        onClick={() => { setSortOption('LEAGUE'); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortOption === 'LEAGUE' ? 'text-crimson font-bold' : 'text-gray-400'}`}
                      >
                        League
                      </button>
                      <button 
                        onClick={() => { setSortOption('STATUS'); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortOption === 'STATUS' ? 'text-crimson font-bold' : 'text-gray-400'}`}
                      >
                        Status
                      </button>
                    </div>
                    
                    {/* Backdrop to close on click outside (Invisible) */}
                    <div 
                      className="fixed inset-0 z-[-1]" 
                      onClick={() => setIsSortOpen(false)}
                    />
                  </div>
                )}
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
          ) : error ? (
            <div className="col-span-full text-center py-20 text-red-500">
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-white/10 rounded hover:bg-white/20 text-white text-sm">Retry</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match: any) => (
                  <div 
                    key={match.id}
                    id={`match-card-${match.id}`} // Add ID for scrolling
                    className="contents" // Use contents to let MatchCard be the grid item, or just let div be the item
                  >
                    <MatchCard
                      match={match}
                      initialIsFav={favorites.includes(match.id.toString())}
                    />
                  </div>
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
