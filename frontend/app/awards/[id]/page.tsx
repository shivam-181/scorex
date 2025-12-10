'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Globe, Award as AwardIcon } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { awards } from '../../../data/awards/collection';
import { allAwardHistories } from '../../../data/awards/history';
import WinnerCard from '../../../components/awards/WinnerCard';

export default function IndividualAwardPage() {
  const params = useParams();
  const id = params.id as string;
  const award = awards.find(a => a.id === id);
  const history = allAwardHistories[id];

  if (!award) {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
            <h1 className="text-2xl font-serif">Award not found.</h1>
        </div>
    );
  }

  const glowColor = award.colorCode || '#ffffff';

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
         {/* Dynamic Background */}
         <div className="absolute inset-0 bg-black">
             <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] blur-[150px] rounded-full opacity-20 pointer-events-none"
                style={{ backgroundColor: glowColor }}
             />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
         </div>

         <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
             >
                 <Link href="/awards" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm uppercase font-bold tracking-widest">
                    <ArrowLeft size={16} /> Back to Trophy Room
                 </Link>
                 
                 <div className="flex items-center gap-4 mb-6">
                     <img src={award.logo} alt="Logo" className="w-16 h-16 object-contain drop-shadow-lg bg-white/5 p-2 rounded-full border border-white/10" />
                     <div className="flex flex-col">
                         <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Governing Body</span>
                         <span className="text-sm font-bold text-white">{award.category}</span>
                     </div>
                 </div>

                 <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-[0.9]">
                    {award.name}
                 </h1>

                 <p className="text-xl text-white/60 font-light mb-8 max-w-lg leading-relaxed border-l-2 pl-6" style={{ borderColor: glowColor }}>
                    {award.description}
                 </p>

                 <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 text-sm font-mono text-white/60">
                         <Calendar size={16} style={{ color: glowColor }} /> Est. {award.established}
                     </div>
                     <div className="flex items-center gap-2 text-sm font-mono text-white/60">
                         <Globe size={16} style={{ color: glowColor }} /> {award.category} Reach
                     </div>
                 </div>
             </motion.div>

             {/* Trophy Image (Right) */}
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center items-center"
             >
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
                 <img 
                    src={award.image} 
                    alt="Trophy" 
                    className="max-h-[500px] object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 hover:scale-105 transition-transform duration-700"
                    style={{ filter: `drop-shadow(0 0 30px ${glowColor}30)` }}
                 />
             </motion.div>
         </div>
      </section>

      {/* History Feed */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
         <div className="flex items-center gap-3 mb-12">
             <AwardIcon size={24} style={{ color: glowColor }} />
             <h2 className="text-2xl font-serif font-bold text-white">Awards History</h2>
             <div className="h-px bg-white/10 flex-1 ml-4" />
         </div>

         {history ? (
             <div className="space-y-4">
                 {history.years.map((yearEntry) => (
                     <WinnerCard key={yearEntry.year} yearEntry={yearEntry} colorHex={glowColor} />
                 ))}
             </div>
         ) : (
             <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                 <div className="flex justify-center mb-6">
                     <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <Calendar size={32} className="text-white/20" />
                     </div>
                 </div>
                 <h3 className="text-xl font-serif text-white mb-2">Detailed History Coming Soon</h3>
                 <p className="text-white/40 max-w-md mx-auto">
                     We are currently curating the data for {award.name}. Check back later for the complete archive.
                 </p>
             </div>
         )}
      </section>

    </div>
  );
}
