'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ArrowRight, Globe, Trophy } from 'lucide-react';
import BrandName from '@/components/BrandName';

const features = [
  {
    title: "Manager Mode",
    description: "Build your dream squad, tactically arrange your formation, and manage your ultimate team lineup.",
    icon: <Briefcase className="w-12 h-12 text-blue-500 mb-4" />,
    link: "/manager",
    color: "from-blue-500/20 to-blue-900/10",
    hoverColor: "group-hover:border-blue-500/50"
  },
  {
    title: "On This Day",
    description: "Travel back in time. Relive the most iconic moments in football history that happened on this very date.",
    icon: <Calendar className="w-12 h-12 text-orange-500 mb-4" />,
    link: "/on-this-day",
    color: "from-orange-500/20 to-orange-900/10",
    hoverColor: "group-hover:border-orange-500/50"
  },
  {
    title: "Global Heatmap",
    description: "See where the beautiful game is being followed right now. Live activity map of the ScoreX community.",
    icon: <Globe className="w-12 h-12 text-purple-500 mb-4" />,
    link: "/fan-zone/heatmap",
    color: "from-purple-500/20 to-purple-900/10",
    hoverColor: "group-hover:border-purple-500/50"
  }
];

export default function FanZonePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-crimson/10 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
            <header className="mb-16 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
                >
                    FAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-600">ZONE</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto"
                >
                    The ultimate hub for football enthusiasts. deep dive into history or take charge of the future.
                </motion.p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <Link href={feature.link} key={index}>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            className={`group relative h-full bg-gradient-to-br ${feature.color} backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-300 ${feature.hoverColor} hover:scale-[1.02]`}
                        >
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                            
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-3 group-hover:text-white transition-colors">{feature.title}</h2>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>
                                
                                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm opacity-60 group-hover:opacity-100 group-hover:gap-3 transition-all">
                                    <span>Enter Zone</span>
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  );
}
