'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on homepage
    if (pathname !== '/') return;

    const saveScrollPos = () => {
      sessionStorage.setItem('scrollPos', window.scrollY.toString());
    };

    // Debounce scroll event
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(saveScrollPos, 100);
    };

    window.addEventListener('scroll', handleScroll);

    // Restore scroll position on mount
    const savedPos = sessionStorage.getItem('scrollPos');
    if (savedPos) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPos),
          behavior: 'smooth', // Optional: 'auto' for instant jump
        });
      }, 100);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}
