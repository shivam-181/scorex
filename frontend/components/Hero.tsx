'use client';
import { motion } from 'framer-motion';
import BrandName from './BrandName';
import FloatingLiveWidget from './FloatingLiveWidget';

export default function Hero() {
  return (
    <section className="h-[calc(100vh+1rem)] flex flex-col justify-center items-center text-center relative overflow-hidden -mt-28 pt-28">
      {/* Floating Live Widget - Positioned Top Left */}
      <FloatingLiveWidget />

      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-dark z-10" />
        <img 
          src="/Dt.jpeg" 
          alt="Stadium Background" 
          className="w-full h-full object-cover object-[0%_35%] scale-115 translate-x-10"
        />
      </div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-bold tracking-tighter z-10"
      >
        <BrandName />
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-xl text-apricot z-10"
      >
        Football Scores. Reimagined.
      </motion.p>

      <div className="flex gap-4 mt-8 z-10 relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white/5 text-white rounded-full font-bold text-base tracking-wide border border-white/20 shadow-[0_0_30px_rgba(220,20,60,0.3)] backdrop-blur-md hover:bg-white/10 hover:shadow-[0_0_50px_rgba(220,20,60,0.6)] hover:border-crimson/50 transition-all"
          onClick={() => document.getElementById('live-scores')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Check Live Scores
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 text-white/50 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </motion.div>
    </section>
  );
}