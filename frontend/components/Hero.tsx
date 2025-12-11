'use client';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import BrandName from './BrandName';
import FloatingLiveWidget from './FloatingLiveWidget';
import WorldCupCountdown from './WorldCupCountdown';

export default function Hero() {
  return (
    <section className="h-[calc(100vh+4.7rem)] flex flex-col justify-start items-center text-center relative overflow-hidden -mt-28 pt-28">
      
      {/* World Cup Countdown Bar - Attached to Top Navbar */}
      <div className="w-full mt-13 mb-auto z-20 animate-in fade-in slide-in-from-top-10 duration-1000 delay-300">
         <WorldCupCountdown />
      </div>

      
      {/* Centered Hero Content */}
      <div className="flex-1 flex flex-col justify-center items-center w-full z-10 pb-20">
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

      <div className="flex gap-4 mt-16 z-10 relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex flex-col items-center gap-6 cursor-pointer transition-all"
          onClick={() => document.getElementById('live-scores')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white drop-shadow-[0_0_15px_rgba(220,20,60,0.9)] group-hover:text-crimson transition-all duration-300 group-hover:drop-shadow-[0_0_35px_rgba(220,20,60,1)]">
             Check Live Scores
          </span>
          <div className="relative">
              <div className="absolute inset-0 bg-crimson/40 blur-2xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <ArrowDown className="text-white drop-shadow-[0_0_15px_rgba(220,20,60,0.9)] group-hover:text-crimson transition-colors duration-300 animate-bounce" size={20} />
          </div>
        </motion.button>


      </div>
      </div>
      
      {/* Floating Live Widget - Positioned Top Left */}
      <FloatingLiveWidget />

      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-dark z-10" />
        <img 
          src="/Dwt.jpeg" 
          alt="Stadium Background" 
          className="w-full h-full object-cover object-[0%_35%] scale-115 translate-x-10"
        />
      </div>


    </section>
  );
}