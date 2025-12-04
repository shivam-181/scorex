import Link from 'next/link';

export default function SitemapPage() {
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
    { name: 'Leagues', path: '/leagues' },
    { name: 'About Us', path: '/about' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Contact Support', path: '/contact' },
    { name: 'My Feed', path: '/my-feed' },
  ];

  return (
    <main className="min-h-screen bg-dark text-white pt-24 pb-20 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <img 
          src="https://images.pexels.com/photos/8455350/pexels-photo-8455350.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <h1 className="text-5xl font-black mb-12 text-white tracking-tight text-center">
          Site<span className="text-crimson">map</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <Link 
              key={route.path} 
              href={route.path}
              className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group flex items-center justify-between"
            >
              <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                {route.name}
              </span>
              <span className="w-2 h-2 rounded-full bg-crimson opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
