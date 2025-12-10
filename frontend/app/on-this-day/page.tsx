'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { historyEvents } from '../../data/history';
import { Calendar, ArrowRight, Share2, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function OnThisDay() {
  const today = new Date();
  // robust date formatting
  const dateString = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

  // State
  const [apiEvents, setApiEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOnThisDay() {
        try {
            const mm = (today.getMonth() + 1).toString().padStart(2, '0');
            const dd = today.getDate().toString().padStart(2, '0');
            
            // 1. Fetch from Wikipedia
            const res = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${mm}/${dd}`);
            const data = await res.json();
            
            // 2. Filter for Football Keywords
            const keywords = ['football', 'soccer', 'FIFA', 'World Cup', 'Premier League', 'UEFA', 'Champions League', 'Bundesliga', 'La Liga', 'Serie A', 'stadium', 'cup final'];
            
            // 3. Define Fallback Images
            const FALLBACK_IMAGES = [
                'https://upload.wikimedia.org/wikipedia/commons/1/1d/West_Brom_The_Hawthorns.jpg', // Stadium
                'https://upload.wikimedia.org/wikipedia/commons/b/b9/Football_iu_1996.jpg', // Action
                'https://upload.wikimedia.org/wikipedia/commons/d/d1/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg', // Modern
                'https://upload.wikimedia.org/wikipedia/commons/c/c8/Lionel_Messi_2012.jpg', // Icon
                'https://upload.wikimedia.org/wikipedia/commons/5/52/Alfredo_Di_St%C3%A9fano_1959.jpg', // Vintage
                'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg' // Trophy
            ];

            const relevant = data.events.filter((e: any) => 
                keywords.some(k => e.text.toLowerCase().includes(k))
            ).map((e: any) => ({
                id: `wiki-${e.year}`,
                year: e.year,
                title: `Historic Moment (${e.year})`,
                description: e.text,
                image: FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)], 
                type: 'history'
            }));

            setApiEvents(relevant);
        } catch (err) {
            console.error("Wiki API failed", err);
        } finally {
            setLoading(false);
        }
    }

    fetchOnThisDay();
  }, []);

  // Filter Local DB for Today
  const localToday = historyEvents.filter(e => 
      e.day === today.getDate().toString() && e.month === (today.getMonth()+1).toString()
  );

  // Fallback / Classics (Show all non-today events randomized or just listed)
  const classics = historyEvents.filter(e => !localToday.includes(e));

  // Combine Today's stuff
  const todaysContent = [...localToday, ...apiEvents];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-500/30">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 overflow-hidden pt-32">
         <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#050505] to-[#050505]" />
             {/* Abstract Clock/Calendar Visual */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20 animate-[spin_60s_linear_infinite]" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-20 animate-[spin_40s_linear_infinite_reverse]" />
         </div>

         <div className="relative z-10 text-center max-w-4xl mx-auto">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
             >
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                     <Calendar size={14} className="text-yellow-500" />
                     <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-yellow-500">Time Capsule</span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tight mb-6 leading-none">
                    <span className="block text-white">ON THIS DAY</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-700">{dateString}</span>
                </h1>
                
                <p className="text-xl text-white/50 max-w-xl mx-auto">
                    Relive the goals, the glory, and the moments that defined football history on this specific date.
                </p>
             </motion.div>
         </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 pb-32 relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500 via-white/10 to-transparent md:-translate-x-1/2" />

          <div className="space-y-24">
          <div className="space-y-24">
              
              {/* LOADING STATE */}
              {loading && (
                  <div className="text-center py-20">
                      <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white/40">Scanning history books...</p>
                  </div>
              )}

              {/* TODAY'S EVENTS (API + Local) */}
              {!loading && todaysContent.length > 0 && (
                  <div className="mb-20">
                      <div className="flex items-center gap-4 mb-12 py-4 bg-[#050505] relative z-10">
                          <div className="h-px bg-yellow-500/50 flex-1"></div>
                          <h2 className="text-2xl font-serif text-yellow-500 font-bold uppercase tracking-widest">Happened Today</h2>
                          <div className="h-px bg-yellow-500/50 flex-1"></div>
                      </div>
                      
                      {todaysContent.map((event, index) => (
                        <HistoryCard key={event.id} event={event} index={index} today={today} />
                      ))}
                  </div>
              )}

              {/* CLASSICS FALLBACK */}
              {!loading && (
                   <div>
                      <div className="flex items-center gap-4 mb-12 py-4 bg-[#050505] relative z-10">
                          <div className="h-px bg-white/10 flex-1"></div>
                          <h2 className="text-xl font-serif text-white/40 font-bold uppercase tracking-widest">Featured Classics</h2>
                          <div className="h-px bg-white/10 flex-1"></div>
                      </div>

                      {classics.map((event, index) => (
                          <HistoryCard key={event.id} event={event} index={index} today={today} />
                      ))}
                   </div>
              )}
          </div>
          </div>
          
          <div className="text-center mt-32">
              <Link href="/legacy" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 rounded-full hover:bg-white/10 transition-all group">
                  <span className="font-bold text-sm tracking-widest uppercase">Explore Full Archives</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
      </section>
    </div>
  );
}

const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80', // Stadium Night
    'https://images.unsplash.com/photo-1579952363873-27f3bde9be51?auto=format&fit=crop&q=80', // Ball in Net
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80', // Action Blur
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80', // Classic Pitch
    'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&q=80', // Fans
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80', // Player Shadow
    'https://images.unsplash.com/photo-1574629810360-7efbbe43f42d?auto=format&fit=crop&q=80', // Goal Celebration
    'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&q=80', // Referee Card
    'https://images.unsplash.com/photo-1575361204480-aadea25d46f3?auto=format&fit=crop&q=80', // Goalkeeper Save
    'https://images.unsplash.com/photo-1600679472829-3044539ce8ed?auto=format&fit=crop&q=80', // Jersey Detail
    'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80', // Night Rain Match
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80', // Crowd Cheering
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80', // Player Dribbling
    'https://images.unsplash.com/photo-1510051640316-54084b11492e?auto=format&fit=crop&q=80', // Tactic Board / Training
    'https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80', // Captain Armband / Detail
    'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?auto=format&fit=crop&q=80', // Boots on Grass
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80', // Tactical View
    'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80', // Trophy Lift vibe
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80'  // Gym / Fitness
];

function HistoryCard({ event, index, today }: { event: any, index: number, today: Date }) {
    const [imgSrc, setImgSrc] = useState(event.image || FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-24`}
        >
            {/* Date Bubble (Center) */}
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-[#050505] border-2 border-yellow-500 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    <span className="text-[10px] font-black text-white">{event.year}</span>
                </div>
            </div>

            {/* Content Card */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                <div className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-900">
                        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                            {event.type}
                        </div>
                        {event.image ? (
                             <img 
                                src={imgSrc} 
                                alt={event.title}
                                onError={() => setImgSrc(FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)])}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                        ) : (
                             <img 
                                src={FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)]}
                                alt="Football History"
                                className="w-full h-full object-cover opacity-60 grayscale"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                    </div>
                    
                    <div className="p-6 relative">
                        <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                            {event.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {event.description}
                        </p>
                        
                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                            <div className="flex items-center gap-2 text-white/30 text-xs">
                                <Clock size={12} />
                                <span>{today.getFullYear() - event.year} years ago</span>
                            </div>
                            <button className="text-white/30 hover:text-white transition-colors">
                                <Share2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Spacer for the other side */}
            <div className="hidden md:block w-1/2" />
        </motion.div>
    );
}
