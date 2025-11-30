"use client";
import { useState, useEffect } from "react";
import MatchCard from "@/components/MatchCard";
import { useRouter } from "next/navigation";

export default function MyFeed() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const deviceId = localStorage.getItem("scorex_device_id");

      if (!deviceId) {
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch Favorites
        const favRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${deviceId}`
        );
        const favData = await favRes.json();

        // 2. Fetch Live Matches to get real-time scores
        const matchesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/football/live`
        );
        const matchesData = await matchesRes.json();
        const liveMatches = matchesData.matches || [];

        // 3. Merge Data
        console.log("Fav Data:", favData);
        console.log("Live Matches:", liveMatches);

        const mergedFavorites = favData.map((fav: any) => {
          // Use toString() to ensure we match string vs number correctly
          const liveMatch = liveMatches.find((m: any) => m.id.toString() === fav.matchId.toString());

          if (liveMatch) {
            console.log("Found live match for:", fav.matchId);
            return liveMatch;
          }

          console.log("No live match found for:", fav.matchId);
          // Fallback for matches not in the current live feed
          return {
            id: fav.matchId,
            status: "SCHEDULED",
            utcDate: fav.date,
            homeTeam: { name: fav.homeTeam },
            awayTeam: { name: fav.awayTeam },
            score: { fullTime: { home: null, away: null } },
          };
        });

        setFavorites(mergedFavorites);
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-dark p-6 pt-24 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <img
          src="https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white tracking-tighter">
              MY <span className="text-crimson">FEED</span>
            </h1>
            <button
              onClick={() => router.push("/#live-scores")}
              className="text-sm text-gray-400 hover:text-white underline"
            >
              Back to Live Scores
            </button>
          </div>

          {loading ? (
            <p className="text-apricot animate-pulse">
              Syncing your watchlist...
            </p>
          ) : favorites.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-700 rounded-xl">
              <p className="text-gray-400 mb-4">
                You haven't followed any matches yet.
              </p>
              <button
                onClick={() => router.push("/#live-scores")}
                className="bg-crimson text-white px-6 py-2 rounded-full font-bold"
              >
                Explore Matches
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((match: any) => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  initialIsFav={true}
                  showRemoveOption={true}
                  onRemove={(id) => {
                    setFavorites(prev => prev.filter((m: any) => m.id !== id));
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
