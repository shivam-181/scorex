'use client';
import Link from 'next/link';
import { Home, Heart, Newspaper, Trophy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolledDeep, setIsScrolledDeep] = useState(false);
  const [isFooterIntersecting, setIsFooterIntersecting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledDeep(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    // Intersection Observer for Footer
    let observer: IntersectionObserver | null = null;
    
    const initObserver = () => {
      const footer = document.getElementById('main-footer');
      if (footer) {
        observer = new IntersectionObserver(
          (entries) => {
            setIsFooterIntersecting(entries[0].isIntersecting);
          },
          { threshold: 0.1 } // Trigger as soon as 10% of footer is visible
        );
        observer.observe(footer);
        return true;
      }
      return false;
    };

    // Try to find footer immediately, then poll if not found
    if (!initObserver()) {
      const intervalId = setInterval(() => {
        if (initObserver()) {
          clearInterval(intervalId);
        }
      }, 500);
      
      // Cleanup interval on unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(intervalId);
        if (observer) observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  // Only render on homepage
  if (pathname !== '/') return null;

  // Hide if not scrolled enough OR if footer is visible
  if (!isScrolledDeep || isFooterIntersecting) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-10 duration-300">
      <div className="glass-panel px-6 py-3 rounded-full flex gap-6 items-center shadow-2xl shadow-crimson/20">
        
        <Link href="/">
          <div className="p-2 rounded-full transition-colors bg-crimson text-white">
            <Home size={24} />
          </div>
        </Link>

        <Link href="/news">
          <div className="p-2 rounded-full transition-colors text-gray-400 hover:text-white">
            <Newspaper size={24} />
          </div>
        </Link>

        <Link href="/leagues">
          <div className="p-2 rounded-full transition-colors text-gray-400 hover:text-white">
            <Trophy size={24} />
          </div>
        </Link>

        <div className="w-px h-6 bg-white/10"></div>

        <Link href="/my-feed">
          <div className="p-2 rounded-full transition-colors text-gray-400 hover:text-white">
            <Heart size={24} />
          </div>
        </Link>
        
      </div>
    </div>
  );
}
