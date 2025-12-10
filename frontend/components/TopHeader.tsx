'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Menu, X, Briefcase, Calendar, ChevronDown, Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import BrandName from './BrandName';

export default function TopHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
     const handleScroll = () => {
          const currentScrollY = window.scrollY;
          // Toggle blur/background immediately on scroll
          const scrollThreshold = 10;
          setIsScrolled(currentScrollY > scrollThreshold);

          if (pathname === '/awards') {
              const threshold = window.innerHeight ? window.innerHeight - 100 : 800;
              setIsVisible(currentScrollY < threshold);
          } else {
              setIsVisible(true);
          }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (pathname.startsWith('/match/')) return null;

  return (
    <>
      <header 
        className={`${
          pathname === '/' 
            ? isScrolled 
              ? 'fixed top-0 bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-lg' 
              : 'fixed top-[1.35rem] bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-lg'
            : 'fixed top-0 bg-black/80 backdrop-blur-md'
        } left-0 w-full z-50 px-6 py-4 grid grid-cols-3 items-center pointer-events-none transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Left: Logo */}
        <div className="flex justify-start pointer-events-auto">
            <Link href="/">
              <h1 className="text-2xl font-bold tracking-tighter text-white">
                <BrandName />
              </h1>
            </Link>
        </div>

        {/* Center: Navigation */}
        <div className="flex justify-center pointer-events-auto">
            <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-white/90">
                <Link href="/news" className="hover:text-crimson transition-colors">News</Link>
                <Link href="/leagues" className="hover:text-crimson transition-colors">Leagues</Link>
                <Link href="/legacy" className="hover:text-yellow-400 transition-colors">Legends</Link>
                <Link href="/awards" className="hover:text-[#BBFCDD] transition-colors">Awards</Link>
                
                {/* Fan Zone Link */}
                <Link href="/fan-zone" className="flex items-center gap-1 hover:text-apricot transition-colors py-2 group uppercase tracking-wider font-bold">
                    Fan Zone
                </Link>
            </nav>
        </div>

        {/* Right: Actions (Search & Icons) */}
        <div className="flex justify-end items-center gap-4 pointer-events-auto">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 w-48 hover:bg-white/20 transition-colors group focus-within:w-64 focus-within:bg-white/20 duration-300">
                <Search size={16} className="text-white/50 group-hover:text-white transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none outline-none text-sm text-white ml-2 w-full placeholder:text-white/50"
                />
            </div>

            <Link href="/my-feed" className="hidden md:flex text-white hover:text-crimson transition-colors">
              <Heart size={20} />
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-white hover:text-crimson transition-colors"
            >
              <Menu size={24} />
            </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white"><BrandName /></h2>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-xl font-bold text-white">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-crimson transition-colors">Home</Link>
              <Link href="/news" onClick={() => setIsMenuOpen(false)} className="hover:text-crimson transition-colors">News</Link>
              <Link href="/leagues" onClick={() => setIsMenuOpen(false)} className="hover:text-crimson transition-colors">Leagues</Link>
              <Link href="/legacy" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 text-yellow-500 transition-colors">Legends Hall</Link>
              <Link href="/manager" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-500 text-blue-400 transition-colors">Manager Mode</Link>
              <Link href="/on-this-day" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 text-orange-400 transition-colors">On This Day</Link>
              <Link href="/my-feed" onClick={() => setIsMenuOpen(false)} className="hover:text-crimson transition-colors">My Feed</Link>
              <div className="h-px bg-white/10 my-2"></div>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-crimson hover:text-white transition-colors">About ScoreX</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
