'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import BrandName from './BrandName';

export default function TopHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname.startsWith('/match/')) return null;

  return (
    <>
      <header 
        className={`${
          pathname === '/' ? 'sticky' : 'fixed'
        } top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none`}
      >
        {/* Logo */}
        <Link href="/" className="pointer-events-auto">
          <h1 className="text-2xl font-bold tracking-tighter text-white">
            <BrandName />
          </h1>
        </Link>

        {/* Desktop Nav & Actions */}
        <div className="pointer-events-auto flex items-center gap-6">
          <nav className="hidden md:flex gap-6 text-sm font-bold text-white/80">
            <Link href="/news" className="hover:text-crimson transition-colors">News</Link>
            <Link href="/leagues" className="hover:text-crimson transition-colors">Leagues</Link>
            <Link href="/about" className="hover:text-crimson transition-colors">About</Link>
            <Link href="/legacy" className="hover:text-yellow-400 text-yellow-500 transition-colors uppercase tracking-wider">Legends</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/my-feed" className="hidden md:flex items-center gap-2 text-sm font-bold text-white hover:text-crimson transition-colors">
              <span>My Feed</span>
              <Heart size={18} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-white hover:text-crimson transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
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
