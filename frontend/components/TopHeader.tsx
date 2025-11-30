'use client';
import Link from 'next/link';
import { Heart } from 'lucide-react';

import { usePathname } from 'next/navigation';

import BrandName from './BrandName';

export default function TopHeader() {
  const pathname = usePathname();
  if (pathname.startsWith('/match/')) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
      {/* Logo - Pointer events auto to allow clicking */}
      <Link href="/" className="pointer-events-auto">
        <h1 className="text-2xl font-bold tracking-tighter text-white">
          <BrandName />
        </h1>
      </Link>

      {/* Top Right Actions - Pointer events auto */}
      <div className="pointer-events-auto flex items-center gap-6">
        <nav className="hidden md:flex gap-6 text-sm font-bold text-white/80">
          <Link href="/news" className="hover:text-crimson transition-colors">News</Link>
          <Link href="/leagues" className="hover:text-crimson transition-colors">Leagues</Link>
          <Link href="/about" className="hover:text-crimson transition-colors">About</Link>
        </nav>
        <Link href="/my-feed" className="flex items-center gap-2 text-sm font-bold text-white hover:text-crimson transition-colors">
          <span>My Feed</span>
          <Heart size={18} />
        </Link>
      </div>
    </header>
  );
}
