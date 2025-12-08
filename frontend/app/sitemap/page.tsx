'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Home, FileText, Globe, MessageSquare, Shield, Info, Map } from 'lucide-react';

export default function SitemapPage() {
  const sections = [
    {
      title: "Main Platform",
      color: "text-white",
      bg: "bg-white/5",
      icon: <Home size={20} />,
      links: [
        { name: 'Home / Live Scores', path: '/' },
        { name: 'News Feed', path: '/news' },
        { name: 'Leagues Explorer', path: '/leagues' },
        { name: 'My Personalized Feed', path: '/my-feed' }
      ]
    },
    {
      title: "Company",
      color: "text-crimson",
      bg: "bg-crimson/5",
      icon: <Info size={20} />,
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Vision', path: '/about#vision' }, // Conceptual anchor
        { name: 'Careers', path: '/about#careers' }, // Placeholder for future
        { name: 'Contact Support', path: '/contact' }
      ]
    },
    {
      title: "Legal & Privacy",
      color: "text-red-400",
      bg: "bg-red-500/5",
      icon: <Shield size={20} />,
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'GDPR Compliance', path: '/gdpr' }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      
      {/* Constellation Background */}
      <div className="absolute inset-0 opacity-20" style={{ 
         backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(220, 20, 60, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)' 
      }}></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <header className="mb-20 text-center">
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-6 font-mono"
           >
              <Map size={14} /> SYSTEM ARCHITECTURE
           </motion.div>
           <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase"
           >
              Site<span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-[#DC143C]">map</span>
           </motion.h1>
           <p className="text-gray-500 max-w-xl mx-auto">
             Navigate the entire neural network of ScoreX. Every node connected, every path optimized.
           </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {sections.map((section, sIndex) => (
              <motion.div 
                 key={section.title}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 + (sIndex * 0.1) }}
                 className="relative group"
              >
                 <div className={`absolute -inset-0.5 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur ${section.bg.replace('/5', '/50')}`}></div>
                 <div className="relative bg-black rounded-2xl border border-white/10 p-8 h-full hover:border-white/20 transition-colors">
                    <div className={`flex items-center gap-3 mb-8 ${section.color}`}>
                       {section.icon}
                       <h2 className="font-bold text-xl uppercase tracking-wider">{section.title}</h2>
                    </div>
                    
                    <ul className="space-y-4">
                       {section.links.map((link, lIndex) => (
                          <li key={link.name}>
                             <Link 
                                href={link.path}
                                className="flex items-center justify-between text-gray-400 hover:text-white group/link transition-colors py-2 border-b border-white/5 hover:border-white/20"
                             >
                                <span className="group-hover/link:translate-x-2 transition-transform">{link.name}</span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                             </Link>
                          </li>
                       ))}
                    </ul>
                 </div>
              </motion.div>
           ))}
        </div>
        
        {/* Footer Decoration */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-32 border-t border-white/5 pt-12 flex justify-center text-gray-700 font-mono text-xs"
        >
           [ END OF TRANSMISSION ]
        </motion.div>

      </div>
    </main>
  );
}
