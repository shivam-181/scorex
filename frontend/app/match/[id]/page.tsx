"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import MatchHeader from "./components/MatchHeader";
import MatchTabs from "./components/MatchTabs";

export default function MatchDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [matchData, setMatchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/football/match/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMatchData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-crimson"></div>
      </div>
    );

  return (
    <main className="min-h-screen bg-dark pb-20 relative">
      {/* Background Watermark */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />
      {/* Navbar Back Button */}
      <div className="p-4 absolute top-0 left-0 z-50">
        <button
          onClick={() => router.push('/#live-scores')}
          className="p-2 bg-glass rounded-full text-white hover:bg-white/10 transition"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Hero Header */}
      <MatchHeader match={matchData} />

      {/* Content Tabs (Lineups, Stats, etc) */}
      <div className="container mx-auto px-4 -mt-6 relative z-20">
        <MatchTabs match={matchData} initialTab={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('tab') : 'overview'} />
      </div>
    </main>
  );
}
