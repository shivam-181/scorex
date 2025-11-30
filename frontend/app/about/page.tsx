'use client';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Zap, Shield, Smartphone } from 'lucide-react';
import BrandName from '../../components/BrandName';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark pt-24 pb-20 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
         <img 
          src="https://images.pexels.com/photos/8455350/pexels-photo-8455350.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter"
          >
            WE ARE <BrandName />
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-2xl text-gray-300 leading-relaxed font-light">
              Football isn't just a game. It's a religion. A lifestyle. A global heartbeat.
              <br /><br />
              At <BrandName />, we believe the digital experience should match the intensity of the match itself. 
              We are not just another score app. We are a <span className="text-white font-bold">cinematic data experience</span>.
            </p>
          </motion.div>
        </div>

        {/* The Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white border-l-4 border-crimson pl-6">The Vision</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We stripped away the clutter. No ads, no noise, no distractions. Just pure, unadulterated football data delivered with lightning speed and stunning aesthetics.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our mission is to bridge the gap between complex analytics and casual fandom. Whether you're a tactician analyzing heatmaps or a fan checking the score, <BrandName /> is your home.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="glass-panel p-6 aspect-square flex flex-col justify-center items-center text-center">
                <Zap size={40} className="text-apricot mb-4" />
                <h3 className="text-white font-bold">Lightning Fast</h3>
             </div>
             <div className="glass-panel p-6 aspect-square flex flex-col justify-center items-center text-center mt-8">
                <Shield size={40} className="text-crimson mb-4" />
                <h3 className="text-white font-bold">Reliable Data</h3>
             </div>
             <div className="glass-panel p-6 aspect-square flex flex-col justify-center items-center text-center -mt-8">
                <Smartphone size={40} className="text-blue-400 mb-4" />
                <h3 className="text-white font-bold">Mobile First</h3>
             </div>
             <div className="glass-panel p-6 aspect-square flex flex-col justify-center items-center text-center">
                <Globe size={40} className="text-green-400 mb-4" />
                <h3 className="text-white font-bold">Global Reach</h3>
             </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-32">
           <h2 className="text-4xl font-bold text-white text-center mb-16">Powered By Modern Tech</h2>
           <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'MongoDB', 'Express'].map((tech) => (
                <span key={tech} className="px-6 py-3 rounded-full border border-white/10 text-white/60 font-mono hover:border-crimson hover:text-white transition-colors cursor-default">
                  {tech}
                </span>
              ))}
           </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-2">Built with ❤️ by Shivam</h2>
          <p className="text-gray-600 text-sm">
            © 2025 <BrandName />. Redefining the Game.
          </p>
        </div>

      </div>
    </main>
  );
}
