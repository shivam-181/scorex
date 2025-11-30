'use client';
import Link from 'next/link';
import { Home, Heart, Newspaper, Trophy } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === '/about' || pathname.startsWith('/match/')) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
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
