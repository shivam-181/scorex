'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { awards } from '../../data/awards/collection';
import AwardCard from '../../components/awards/AwardCard';

import { Search, Trophy, Globe, Award, Filter } from 'lucide-react';

export default function AwardsLanding() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAwards = awards.filter(award => {
    const matchesCategory = activeCategory === 'All' || award.category === activeCategory;
    const matchesSearch = award.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Global', 'FIFA', 'UEFA', 'Europe', 'Youth', 'Goalkeeper'];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-500/30">


      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden pt-32">
        <div className="absolute inset-0 z-0">
             <Image 
                src="https://cdn.ericchurch.com/uploads/news/GqkESMz4kusvP8pogYNJUsM4zaL66WiaA2VeJajG.jpg" 
                alt="Royal Albert Hall" 
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/30 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-2xl shadow-[#BBFCDD]/5">
                    <Trophy size={14} className="text-[#BBFCDD]" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#BBFCDD]">The Trophy Room</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tight mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent drop-shadow-2xl leading-[0.9]">
                    Football's<br/>Greatest Honors
                </h1>
                
                <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
                    Explore the history, meaning, and legends behind the most prestigious individual awards in the beautiful game.
                </p>

                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-white/30"
                >
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto" />
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-y border-white/5 py-4 px-6 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                            activeCategory === cat 
                            ? 'bg-white text-black border-white' 
                            : 'bg-white/5 text-white/40 border-transparent hover:border-white/20 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input 
                    type="text" 
                    placeholder="Find an award..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
            </div>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <AnimatePresence>
                {filteredAwards.map((award) => (
                    <AwardCard key={award.id} award={award} />
                ))}
            </AnimatePresence>
        </motion.div>

        {filteredAwards.length === 0 && (
            <div className="text-center py-20 text-white/30">
                <Filter size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-xl font-serif">No awards found.</p>
            </div>
        )}
      </section>
    </div>
  );
}
