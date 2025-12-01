'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { usePathname } from 'next/navigation';

export default function BreakingNewsTicker() {
  const pathname = usePathname();
  const [headlines, setHeadlines] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?limit=5`);
        const data = await res.json();
        // Filter out articles with removed content or empty titles
        const validHeadlines = data
          .map((item: any) => item.title)
          .filter((title: string) => title && title !== '[Removed]');
        setHeadlines(validHeadlines);
      } catch (error) {
        console.error("Failed to fetch breaking news");
      }
    };
    fetchNews();
  }, []);

  if (pathname !== '/') return null;
  if (headlines.length === 0) return null;

  return (
    <div className="relative w-full z-[60] bg-crimson/80 backdrop-blur-md text-white text-xs font-bold h-9 flex items-center shadow-md overflow-hidden">
      <div className="bg-crimson/90 backdrop-blur-md z-10 px-4 h-full flex items-center shrink-0 shadow-[5px_0_10px_rgba(220,20,60,0.5)] relative">
        <span className="animate-pulse mr-2">●</span> BREAKING
      </div>
      <div className="flex overflow-hidden w-full items-center">
        <motion.div
          className="flex gap-12 whitespace-nowrap pl-4"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 120,
          }}
        >
          {/* Repeat headlines 3 times to ensure smooth loop on wide screens */}
          {[...headlines, ...headlines, ...headlines].map((headline, i) => (
            <span key={i} className="inline-block uppercase tracking-wide">
              {headline}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
