'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { legends } from '../../data/legends';
import Link from 'next/link';
import { ArrowDown, Trophy, Search, Filter, Quote, Award, Sparkles, Crown } from 'lucide-react';


export default function LegacyHall() {
  const [filterEra, setFilterEra] = useState<string>('All');
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const [filterPos, setFilterPos] = useState<string>('All');

  // Filter Logic
  const filteredLegends = legends.filter(l => {
    if (filterEra !== 'All' && l.era !== filterEra) return false;
    if (filterRegion !== 'All' && l.region !== filterRegion) return false;
    if (filterPos !== 'All' && l.position !== filterPos) return false;
    return true;
  });

  const featuredLegends = legends.slice(0, 4); 

  const records = [
    { title: "All-Time Top Scorer", value: "Cristiano Ronaldo", sub: "910+ Goals" },
    { title: "Most Ballon d'Ors", value: "Lionel Messi", sub: "8 Titles" },
    { title: "Most World Cups", value: "Pelé", sub: "3 Trophies" },
    { title: "Most Goals in a Calendar Year", value: "Lionel Messi", sub: "91 Goals" },
  ];

  /* [USER UPDATE]: Add more quotes here as you wish */
  const quotes = [
    { text: "Talent without working hard is nothing.", author: "Cristiano Ronaldo" },
    { text: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.", author: "Pelé" },
    { text: "I am not a god, I am just a footballer. But if God exists, he plays for Barcelona.", author: "Hristo Stoichkov" },
    { text: "When you win, you don't get carried away. But if you go step by step, with confidence, you can go far.", author: "Diego Maradona" },
    { text: "I don't need the Golden Ball to know that I'm the best. I know when I do things wrong and when I do things right.", author: "Zlatan Ibrahimović" },
    { text: "I learned all about life with a ball at my feet.", author: "Ronaldinho" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30 font-sans">

      
      {/* (A) Hero Section: Resized to fit perfectly on screen (viewport minus navbar approximately) */}
      <section className="relative h-[calc(100vh-80px)] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* [USER UPDATE]: Change hero background image here */}
           <div className="absolute inset-0 bg-[url('https://media.gettyimages.com/id/1754209918/photo/fbl-award-ballon-dor-2023.jpg?s=2048x2048&w=gi&k=20&c=WPH_irszz5pM3cyWAxRBLKlAS5bqvU87nPH745ySAoQ=')] bg-cover bg-center opacity-60 grayscale" />
           <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/70 to-[#050505]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             className="flex flex-col items-center" 
          >
            <div className="mb-6 flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                <Crown size={14} className="text-yellow-500" />
                <span className="text-yellow-500 text-[10px] font-bold tracking-[0.3em] uppercase">The Pantheon</span>
            </div>
            
            {/* Adjusted Font Size for Perfect Fit */}
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 drop-shadow-2xl text-center leading-[0.9]">
              LEGACY HALL
            </h1>
            
            <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-center mb-12">
              A curated sanctuary for the icons who defined the beautiful game.
            </p>
            
            <button 
              onClick={() => document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center gap-6 mt-8 cursor-pointer transition-all duration-500 hover:scale-105"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-yellow-400 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]">
                  Enter the Archives
              </span>
              <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <ArrowDown className="text-white/30 group-hover:text-yellow-500 transition-colors duration-300 animate-bounce" size={20} />
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* (B) Introduction Block */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
             <Quote className="mx-auto text-white/5 mb-6 transform scale-x-[-1]" size={48} />
             <p className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed italic">
              "History is written by the victors, but legends are remembered by the people."
             </p>
        </div>
      </section>

      {/* (G) Hall of Records */}
      <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
             <div className="flex items-center gap-3 mb-10 justify-center">
                <Trophy className="text-yellow-500" />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Hall of Records</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {records.map((rec, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 text-center hover:border-yellow-500/30 transition-all hover:-translate-y-1">
                        <Award className="mx-auto text-yellow-500/50 mb-4" size={32} />
                        <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-2">{rec.title}</h4>
                        <div className="text-xl font-bold text-white mb-1">{rec.value}</div>
                        <div className="text-yellow-500 font-mono text-xs">{rec.sub}</div>
                    </div>
                ))}
             </div>
          </div>
      </section>

       {/* (D) Featured Legends - "Browse" Anchor */}
       <section id="browse" className="py-20 border-y border-white/5 bg-white/[0.02]">
         <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-serif text-white mb-10 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-yellow-500"></span> Featured Icons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredLegends.map((legend, i) => (
                    <Link key={legend.id} href={`/legacy/${legend.id}`}>
                        <div className="relative h-[400px] group rounded-sm overflow-hidden cursor-pointer border-none bg-[#111]">
                            {/* [USER UPDATE]: Image for Featured Card */}
                            <img src={legend.image} referrerPolicy="no-referrer" className={`w-full h-full object-cover ${legend.imagePosition || 'object-center'} transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100`} alt={legend.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h4 className="text-2xl font-serif font-bold text-white group-hover:text-yellow-400 transition-colors mb-2 leading-none">{legend.name}</h4>
                                <p className="text-[10px] text-white/60 uppercase tracking-widest">{legend.goldenMoment.title}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
         </div>
       </section>

      {/* (C) & (E) Gallery & Filters - REMOVED STICKY from Filters as requested */}
      <section className="py-12 px-4 md:px-12 max-w-[90rem] mx-auto min-h-screen">
        
        {/* Filter Bar - Standard relative positioning now */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0a0a0a] border border-white/10 py-6 px-4 md:px-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 text-yellow-500 font-bold uppercase tracking-widest text-[10px]">
                <Filter size={14} /> 
                <span className="hidden md:inline">Filter Archives</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
                 {/* Eras */}
                <div className="flex flex-wrap justify-center gap-2">
                    {['All', '1950s', '1970s', '1990s', '2000s', 'Modern Era'].map(era => (
                        <button
                            key={era}
                            onClick={() => setFilterEra(era)}
                            className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all border ${
                                filterEra === era ? 'bg-white text-black border-white' : 'bg-transparent text-white/40 border-transparent hover:border-white/20 hover:text-white'
                            }`}
                        >
                            {era}
                        </button>
                    ))}
                </div>
                
                <div className="w-px h-6 bg-white/10 hidden md:block" />

                {/* Positions */}
                <div className="flex flex-wrap justify-center gap-2">
                    {['All', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'].map(pos => (
                        <button
                            key={pos}
                            onClick={() => setFilterPos(pos)}
                            className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all border ${
                                filterPos === pos ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50' : 'bg-transparent text-white/40 border-transparent hover:border-white/20 hover:text-white'
                            }`}
                        >
                            {pos}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
          <AnimatePresence mode='popLayout'>
            {filteredLegends.map((legend) => (
                <motion.div
                key={legend.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[3/4] cursor-pointer"
                >
                <Link href={`/legacy/${legend.id}`} className="block h-full w-full">
                    {/* Glass Card */}
                    <div className="relative h-full w-full bg-[#111] rounded-xl overflow-hidden border border-white/5 group-hover:border-yellow-500/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    
                    {/* [USER UPDATE]: Image for Grid Card */}
                    <img 
                        src={legend.image} 
                        referrerPolicy="no-referrer"
                        alt={legend.name}
                        className={`w-full h-full object-cover ${legend.imagePosition || 'object-center'} transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                    
                    {/* Nationality Badge */}
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                        {legend.nationality}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-8">
                        <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                            <p className="text-yellow-500 text-[10px] font-mono mb-2 tracking-widest">{legend.era}</p>
                            <h3 className="text-3xl font-serif font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors leading-none">
                                {legend.name}
                            </h3>
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 border-t border-white/10 pt-3 mt-3">{legend.bio}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </Link>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredLegends.length === 0 && (
            <div className="text-center py-24 text-gray-500">
                <Search className="mx-auto mb-4 opacity-50" size={48} />
                <p>No legends found for this criteria.</p>
            </div>
        )}

      </section>

      {/* (H) Legacy Quotes Section - Resized fonts */}
      <section className="py-20 bg-[#080808] border-t border-white/5 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 text-center">
             <div className="relative">
                 <div className="flex gap-12 overflow-x-auto no-scrollbar snap-x py-8">
                     {quotes.map((q, i) => (
                         <div key={i} className="min-w-[300px] md:min-w-[600px] snap-center flex-shrink-0 bg-white/5 p-8 md:p-10 rounded-2xl border border-white/5 backdrop-blur-sm">
                             <p className="text-lg md:text-xl font-serif text-white/80 mb-6 leading-relaxed italic">"{q.text}"</p>
                             <p className="text-yellow-500/80 font-bold tracking-widest uppercase text-xs">— {q.author}</p>
                         </div>
                     ))}
                 </div>
             </div>
         </div>
      </section>

    </div>
  );
}
