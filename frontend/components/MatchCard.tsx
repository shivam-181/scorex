import { useRouter } from "next/navigation";
import { format } from "date-fns";
import AiInsightBar from "./AiInsightBar";
import { useState } from "react";
import { Heart, Trash2, Pin } from "lucide-react";
import FanPulse from "./FanPulse";
import { usePinnedMatch } from "../context/PinnedMatchContext";

interface MatchProps {
  id: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  score: { fullTime: { home: number; away: number } };
  status: string;
  utcDate: string;
  minute?: number | string;
  competition?: { name: string; emblem: string };
}

export default function MatchCard({
  match,
  initialIsFav = false,
  showRemoveOption = false,
  onRemove,
}: {
  match: MatchProps;
  initialIsFav?: boolean;
  showRemoveOption?: boolean;
  onRemove?: (id: string) => void;
}) {
  const isLive = match.status === "IN_PLAY";
  const router = useRouter();
  const { pinMatch, pinnedMatch } = usePinnedMatch();

  // Mocking the data here because our real backend might not send it yet
  const mockAiData = {
    home: 55,
    away: 45,
    text: "Home team pressing high, high goal probability.",
  };

  const [isFav, setIsFav] = useState(initialIsFav);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const deviceId = localStorage.getItem("scorex_device_id");
    if (!deviceId) return;

    // Optimistic UI Update
    const previousState = isFav;
    setIsFav(!isFav);
    
    // If we are removing, call the callback immediately for UI responsiveness
    if (showRemoveOption && onRemove) {
        onRemove(match.id);
    }

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/favorites`;

    try {
      if (!previousState) {
        // Add to favorites
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deviceId,
            matchId: match.id,
            homeTeam: match.homeTeam.name,
            awayTeam: match.awayTeam.name,
            date: match.utcDate,
          }),
        });
      } else {
        // Remove
        await fetch(`${endpoint}/${deviceId}/${match.id}`, {
          method: "DELETE",
        });
      }
    } catch (error) {
      // Revert if error
      setIsFav(previousState);
      console.error("Failed to toggle favorite");
    }
  };

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    pinMatch({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      score: { home: match.score.fullTime.home ?? 0, away: match.score.fullTime.away ?? 0 },
      status: match.status,
      minute: match.minute
    });
  };

  const isPinned = pinnedMatch?.id === match.id;

  return (
    <div className="glass-panel p-6 flex flex-col hover:border-crimson transition-colors duration-300 relative group">
      {/* Absolute Position Icons */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        {/* Pin Button */}
        <button
          onClick={handlePin}
          className={`transition-colors ${isPinned ? "text-apricot" : "text-gray-600 hover:text-white"}`}
          title="Pin Score"
        >
          <Pin size={20} fill={isPinned ? "currentColor" : "none"} />
        </button>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-white hover:text-crimson"
        >
          {showRemoveOption ? (
             <Trash2 size={20} className="text-gray-400 hover:text-crimson" />
          ) : (
            <Heart
              size={20}
              fill={isFav ? "#DC143C" : "transparent"}
              color={isFav ? "#DC143C" : "white"}
            />
          )}
        </button>
      </div>

      {/* Top Row: Teams & Score */}
      <div className="flex items-center justify-between mb-4">
        {/* Home Team */}
        <div className="flex flex-col items-center w-1/3">
          <span className="font-bold text-white text-lg text-center">
            {match.homeTeam.name}
          </span>
        </div>

        {/* Score / Time */}
        <div className="flex flex-col items-center w-1/3">
          {isLive && (
            <span className="text-xs font-bold flex items-center gap-1">
              <span className="text-[#DC143C] animate-pulse">●</span>
              <span className="text-white">LIVE</span>
            </span>
          )}
          {match.status === "FINISHED" && (
            <span className="text-gray-400 text-xs font-bold">FT</span>
          )}

          <div className="text-4xl font-black text-white my-2">
            {match.score.fullTime.home ?? 0} - {match.score.fullTime.away ?? 0}
          </div>

          <span className="text-gray-400 text-xs uppercase tracking-wider font-bold text-center">
            {match.status === "SCHEDULED" || match.status === "TIMED" 
              ? format(new Date(match.utcDate), "MMM d, HH:mm")
              : (match.competition?.name || (isLive ? "LIVE" : format(new Date(match.utcDate), "MMM d, HH:mm")))
            }
          </span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center w-1/3">
          <span className="font-bold text-white text-lg text-center">
            {match.awayTeam.name}
          </span>
        </div>
      </div>

      {/* Bottom Row: AI Bar & Fan Pulse */}
      {/* Only show AI insights for Live or Upcoming games */}
      {match.status !== "FINISHED" && (
        <div className="border-t border-white/10 pt-3 flex flex-col gap-3">
          <AiInsightBar
            homeProb={mockAiData.home}
            awayProb={mockAiData.away}
            insightText={mockAiData.text}
          />
          <FanPulse matchId={match.id} homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name} />
        </div>
      )}

      {/* Hype Mode Button for Upcoming Matches */}
      {(match.status === "SCHEDULED" || match.status === "TIMED") && (
        <div className="mt-4 flex justify-center">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/match/${match.id}/hype`);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-crimson to-apricot text-white text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(220,20,60,0.4)]"
          >
            <span className="animate-pulse">🔥</span> Hype Mode
          </button>
        </div>
      )}
    </div>
  );
}
