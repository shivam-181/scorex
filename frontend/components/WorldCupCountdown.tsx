"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Assuming we might want to link the button

export default function WorldCupCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // FIFA World Cup 2026 Start Date. Adjusted to match user request: 182d 11h 2m from Dec 11 14:30.
    const targetDate = new Date("2026-06-12T01:30:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        // Countdown finished
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black text-white py-1 md:py-2 border-b border-white/10 relative z-20">
      <div className="w-full px-2 md:px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        
        {/* Left: Logo Area */}
        <div className="flex items-center gap-4">
           {/* 
              Using Wikimedia URL which is already allowed in next.config.ts.
              This is the official 2026 style text/logo representation if available, 
              or we use a placeholder text if image fails/is blocked.
              For now, using a high-quality SVG from generic source or just styled text if specific URL not found.
              Let's try a Wikimedia Commons URL for a generic trophy or just Text "26" as per the user image style.
              
              Actually, I'll use the specific trophy image if I can, but to be safe and avoid 403s on new domains,
              I will use a local style construction or a known safe host.
              
              Let's use a nice text representation for "26" with a trophy icon from lucide if image not critical,
              BUT user asked for "Logo".
              I'll use the FIFA styled text.
           */}
            <div className="relative w-8 h-10 md:w-12 md:h-14">
               <Image 
                 src="https://i.pinimg.com/1200x/4a/7e/44/4a7e44a4a840b860c88ee3fb3776f9b0.jpg"
                 alt="FIFA 26 Logo"
                 fill
                 className="object-contain"
               />
            </div>
        </div>

        {/* Center/Right: Countdown & Button */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          
          {/* Timer */}
          <div className="flex items-start gap-6 md:gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold tabular-nums tracking-tight">
                {timeLeft.days}
              </span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Days
              </span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold tabular-nums tracking-tight">
                {timeLeft.hours}
              </span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Hours
              </span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold tabular-nums tracking-tight">
                {timeLeft.minutes}
              </span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Mins
              </span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-bold tabular-nums tracking-tight">
                {timeLeft.seconds}
              </span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Secs
              </span>
            </div>
          </div>

          {/* Button */}
          <Link 
            href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures?country=IN&wtw-filter=ALL"
            target="_blank"
            className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            View the groups
          </Link>

        </div>
      </div>
    </div>
  );
}
