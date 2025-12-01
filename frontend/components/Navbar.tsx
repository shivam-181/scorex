'use client';
import Link from 'next/link';
import { Home, Heart, Newspaper, Trophy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar if scrolled past 600px (approx hero height)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only render on homepage
  if (pathname !== '/') return null;

  // Hide if not scrolled enough
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-10 duration-300">
      <div className="glass-panel px-6 py-3 rounded-full flex gap-6 items-center shadow-2xl shadow-crimson/20">
        
        <Link href="/">
          <div className={`p-2 rounded-full transition-colors ${pathname === '/' ? 'bg-crimson text-white' : 'text-gray-400 hover:text-white'}`}>
            <Home size={24} />
          </div>
        </Link>

        <Link href="/news">
          <div className={`p-2 rounded-full transition-colors ${pathname === '/news' ? 'bg-crimson text-white' : 'text-gray-400 hover:text-white'}`}>
            <Newspaper size={24} />
          </div>
        </Link>

        <Link href="/leagues">
          <div className={`p-2 rounded-full transition-colors ${pathname === '/leagues' ? 'bg-crimson text-white' : 'text-gray-400 hover:text-white'}`}>
            <Trophy size={24} />
          </div>
        </Link>

        <div className="w-px h-6 bg-white/10"></div>

        <Link href="/my-feed">
          <div className={`p-2 rounded-full transition-colors ${pathname === '/my-feed' ? 'bg-crimson text-white' : 'text-gray-400 hover:text-white'}`}>
            <Heart size={24} />
          </div>
        </Link>
        
      </div>
    </div>
  );
}
