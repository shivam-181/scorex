'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award } from '../../data/awards/collection';
import { Calendar } from 'lucide-react';

export default function AwardCard({ award }: { award: Award }) {
  const glowColor = award.colorCode;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
        {/* Dynamic Hover Border & Shadow via Inline Styles */}
      <div 
        className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--glow-color)] transition-colors duration-300 pointer-events-none z-20 opacity-50"
      />
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{ boxShadow: `0 0 30px ${glowColor}40` }}
      />

      <Link href={`/awards/${award.id}`} className="block h-full p-6 flex flex-col items-center text-center relative z-10">
        
        {/* Glow Effect Blob */}
        <div 
            className="absolute -top-10 -right-10 w-32 h-32 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: `${glowColor}30` }}  
        />
        
        {/* Logo Section */}
        <div className="relative z-10 w-32 h-32 mb-6 flex items-center justify-center bg-white/5 rounded-full border border-white/5 group-hover:border-white/20 transition-colors p-1">
            <img 
                src={award.logo} 
                alt={award.name} 
                className="w-full h-full object-cover rounded-full drop-shadow-lg"
                style={{ objectPosition: award.logoPosition || 'center' }} 
            />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center">
            <h3 className={`text-xl font-serif font-bold text-white mb-2 transition-colors`}
                style={{ color: 'white' }} /* Hover color handled by group-hover logic if specific, or just white */
            >
                <span className="group-hover:text-[var(--glow-color)] transition-colors duration-300">{award.name}</span>
            </h3>
            
            <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-4 uppercase tracking-widest">
                <Calendar size={12} />
                <span>Est. {award.established}</span>
            </div>
            
            <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-3">
                {award.description}
            </p>
        </div>

        {/* Category Tag */}
        <div className="mt-6">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold tracking-wider text-white/60">
                {award.category}
            </span>
        </div>
      </Link>
    </motion.div>
  );
}
