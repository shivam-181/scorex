"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Globe, Activity, Users } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock Data for Regions
const REGION_STATS = [
  { region: "South America", topClub: "Flamengo", viewers: 42000, color: "text-red-500" },
  { region: "Europe", topClub: "Real Madrid", viewers: 85000, color: "text-blue-400" },
  { region: "Asia", topClub: "Al Nassr", viewers: 67000, color: "text-yellow-400" },
  { region: "North America", topClub: "Inter Miami", viewers: 31000, color: "text-pink-400" },
  { region: "Africa", topClub: "Al Ahly", viewers: 28000, color: "text-green-500" },
];

export default function GlobalHeatmap() {
  const [activePulse, setActivePulse] = useState(0);

  // Simulate random pulses
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-crimson/30 pb-48">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-24 px-4">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-col gap-2">
            <Link 
                href="/fan-zone"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider w-fit"
            >
                <ArrowLeft size={16} /> Back to Fan Zone
            </Link>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">Heatmap</span>
            </h1>
            <p className="text-gray-400 max-w-xl text-lg">
                Live activity from ScoreX users around the world. See which clubs are dominating the globe right now.
            </p>
          </div>
          
          {/* Global Stats Badge */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex items-center gap-4">
              <div className="bg-green-500/20 p-3 rounded-full text-green-400 animate-pulse">
                <Activity size={24} />
              </div>
              <div>
                  <div className="text-3xl font-bold font-mono">253,892</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Live Users</div>
              </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[600px]">
             
             {/* LEFT: The Map Visualizer */}
             <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-3xl relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] opacity-50" />
                
                {/* Simplified Dot World Map (CSS Logic or SVG) */}
                <div className="relative w-full h-full max-w-[800px] aspect-video opacity-80 scale-90 md:scale-100 transition-transform duration-1000 group-hover:scale-105">
                     {/* Base Map Image - Using a stylized dotted map image if available, or simpler SVG construction. 
                         For this demo, I'll construct a simple abstract representation with pulsing dots.
                     */}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                            src="https://i.pinimg.com/1200x/d2/ff/79/d2ff7947a88679fef9cdc595507d94a4.jpg" 
                            alt="World Map" 
                            className="w-full h-full object-contain opacity-40"
                        />
                     </div>

                     {/* Pulse Points (Simulated Lat/Lon) */}
                     {/* SA - Brazil/Argentina */}
                     <MovingPulse x="30%" y="55%" color="bg-red-500" delay={0} label="Flamengo Focus" />
                     {/* EU - Spain/UK */}
                     <MovingPulse x="45%" y="40%" color="bg-blue-400" delay={0.5} label="Madrid Surge" />
                     {/* NA - USA */}
                     <MovingPulse x="20%" y="40%" color="bg-pink-400" delay={1.2} label="Miami Hype" />
                     {/* AS - Saudi/India */}
                     <MovingPulse x="65%" y="45%" color="bg-yellow-400" delay={2} label="Ronaldo Effect" />
                     {/* AF - Egypt */}
                     <MovingPulse x="52%" y="55%" color="bg-green-500" delay={2.5} label="Cairo Live" />

                </div>
             </div>

             {/* RIGHT: Top Clubs by Region */}
             <div className="bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Globe size={20} className="text-blue-500" /> Regional Dominance
                </h3>
                
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                    {REGION_STATS.map((stat, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">{stat.region}</span>
                                <span className={`text-xs font-bold ${stat.color} bg-white/5 px-2 py-1 rounded`}>Trending</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <h4 className="text-lg font-bold">{stat.topClub}</h4>
                                <div className="text-sm font-mono text-gray-400 flex items-center gap-1">
                                    <Users size={12} /> {(stat.viewers / 1000).toFixed(1)}k
                                </div>
                            </div>
                            {/* Simple Bar */}
                            <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stat.viewers / 100000) * 100}%` }}
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                    className={`h-full ${stat.color.replace('text-', 'bg-')}`} 
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-xs text-gray-500">Data updates in real-time based on page views.</p>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
}

function MovingPulse({ x, y, color, delay, label }: { x: string, y: string, color: string, delay: number, label: string }) {
    return (
        <div 
            className="absolute group"
            style={{ left: x, top: y }}
        >
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                {label}
            </span>
            <div className={`w-3 h-3 ${color} rounded-full relative`}>
                <div className={`absolute inset-0 ${color} rounded-full animate-ping opacity-75 duration-[3s]`} style={{ animationDelay: `${delay}s` }} />
                <div className={`absolute -inset-2 ${color} rounded-full opacity-20 animate-pulse`} />
            </div>
        </div>
    )
}
