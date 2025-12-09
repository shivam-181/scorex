'use client';
import { useState, useEffect, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { legends } from '../../../data/legends'; 
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Trophy, Star, Medal, BookOpen, Activity, Loader2, Quote, Clock, MapPin, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import axios from 'axios';

interface WikiData {
    name: string;
    bio: string;
    image: string;
    infobox: any;
    sections: string[];
}

export default function LegendProfile({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const staticLegend = legends.find(l => l.id === resolvedParams.slug);

    const [wikiData, setWikiData] = useState<WikiData | null>(null);
    const [loadingWiki, setLoadingWiki] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'achievements' | 'bio'>('overview');

    useEffect(() => {
        const fetchLegendData = async () => {
             if (!staticLegend) return;
             
             try {
                 const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/legends/${encodeURIComponent(staticLegend.name)}`);
                 setWikiData(response.data);
             } catch (error) {
                 console.error("Failed to fetch wiki data", error);
             } finally {
                 setLoadingWiki(false);
             }
        };

        fetchLegendData();
    }, [staticLegend]);

    if (!staticLegend) {
        return notFound();
    }

    // We prioritize our "Premium" hardcoded data for the overview/bio because it is curated. 
    const displayImage = staticLegend.image || wikiData?.image || staticLegend.coverImage;
    const premiumBio = staticLegend.bio; 

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-yellow-500/30 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    {/* [USER UPDATE]: Change Cover Image here or in legends.ts */}
                    <img 
                        src={staticLegend.coverImage} 
                        alt={staticLegend.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-[50%_15%] grayscale opacity-80 contrast-125 transition-transform duration-[30s] hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 md:px-12 max-w-7xl mx-auto">
                    <button 
                        onClick={() => router.back()}
                        className="mb-6 inline-flex items-center gap-2 text-white/50 hover:text-yellow-400 transition-colors group w-fit bg-transparent border-none cursor-pointer"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Return to Hall</span>
                    </button>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                         {/* Player badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-4 py-1 bg-yellow-500 text-black font-bold uppercase tracking-widest text-[10px] rounded-full">
                                {staticLegend.nationality}
                            </span>
                            <span className="px-4 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white font-mono uppercase tracking-widest text-[10px] rounded-full">
                                {staticLegend.position}
                            </span>
                            <span className="px-4 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white font-mono uppercase tracking-widest text-[10px] rounded-full">
                                {staticLegend.era}
                            </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-white mb-6 tracking-tighter drop-shadow-2xl leading-none">
                            {staticLegend.name}
                        </h1>

                        <div className="max-w-2xl">
                             <p className="text-xl md:text-2xl text-white/80 font-serif italic border-l-4 border-yellow-500 pl-6 mb-8">
                                "{staticLegend.quote}"
                             </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Tabs - REMOVED STICKY as requested */}
            <div className="z-40 bg-[#050505] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center md:justify-start gap-12 overflow-x-auto no-scrollbar">
                    {['overview', 'timeline', 'achievements', 'bio'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all relative ${
                                activeTab === tab ? 'text-yellow-500' : 'text-white/40 hover:text-white'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div 
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 min-h-[60vh]">
                
                {/* TAB: OVERVIEW */}
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Left: Summary & Stats */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-serif text-white mb-4">Legendary Status</h3>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                {premiumBio}
                            </p>

                            {/* Key Stats */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="bg-[#111] p-6 rounded-xl border border-white/5 hover:border-yellow-500/20 transition-all">
                                     <div className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Career Goals</div>
                                     <div className="text-3xl font-bold text-white">{staticLegend.stats.goals}</div>
                                </div>
                                <div className="bg-[#111] p-6 rounded-xl border border-white/5 hover:border-yellow-500/20 transition-all">
                                     <div className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Matches</div>
                                     <div className="text-3xl font-bold text-white">{staticLegend.stats.matches}</div>
                                </div>
                                <div className="bg-[#111] p-6 rounded-xl border border-white/5 hover:border-yellow-500/20 transition-all">
                                     <div className="text-yellow-500 text-xs uppercase tracking-widest mb-1">Ballon d'Ors</div>
                                     <div className="text-3xl font-bold text-white">{staticLegend.stats.ballonDOr}</div>
                                </div>
                                <div className="bg-[#111] p-6 rounded-xl border border-white/5 hover:border-yellow-500/20 transition-all">
                                     <div className="text-yellow-500 text-xs uppercase tracking-widest mb-1">World Cups</div>
                                     <div className="text-3xl font-bold text-white">{staticLegend.stats.worldCups}</div>
                                </div>
                            </div>

                            {/* Club Stats - New Micro Table */}
                            {staticLegend.clubStats && (
                                <div className="mt-8">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">Club Breakdown</h4>
                                    <div className="space-y-2">
                                        {staticLegend.clubStats.map((club, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 text-sm">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white">{club.club}</span>
                                                    <span className="text-[10px] text-white/40">{club.years}</span>
                                                </div>
                                                <div className="flex gap-4 text-right">
                                                    <div>
                                                        <div className="text-white font-mono">{club.goals}</div>
                                                        <div className="text-[10px] text-white/30 uppercase">Goals</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-mono">{club.matches}</div>
                                                        <div className="text-[10px] text-white/30 uppercase">Apps</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Golden Moment */}
                        <div className="bg-[#111] p-10 rounded-3xl border border-white/10 relative overflow-hidden group h-full flex flex-col justify-end min-h-[400px]">
                             {/* Background Image */}
                             <div className="absolute inset-0 z-0">
                                <img 
                                    src={staticLegend.goldenMoment.image} 
                                    alt={staticLegend.goldenMoment.title}
                                    className="w-full h-full object-cover object-[50%_20%] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                             </div>


                             
                             <div className="relative z-10">
                                 <div className="inline-block px-3 py-1 bg-yellow-500 text-black rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                                     Defining Moment &bull; {staticLegend.goldenMoment.year}
                                 </div>
                                 <h3 className="text-3xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                                     {staticLegend.goldenMoment.title}
                                 </h3>
                                 <p className="text-gray-300 leading-relaxed text-lg drop-shadow-md">
                                     {staticLegend.goldenMoment.description}
                                 </p>
                             </div>
                        </div>
                    </motion.div>
                )}

                {/* TAB: TIMELINE (NEW) */}
                {activeTab === 'timeline' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-serif text-white mb-8 text-center">Career Milestones</h3>
                        <div className="relative border-l border-white/10 ml-6 md:ml-0 space-y-12">
                            {staticLegend.timeline?.map((event, i) => (
                                <div key={i} className="relative pl-8 md:pl-12">
                                    {/* Dot */}
                                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
                                    
                                    <div className="bg-[#111] border border-white/5 p-6 rounded-xl hover:border-yellow-500/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Calendar size={14} className="text-yellow-500" />
                                            <span className="text-yellow-500 text-xs font-bold tracking-widest">{event.year}</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* TAB: ACHIEVEMENTS */}
                {activeTab === 'achievements' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <h3 className="text-2xl font-serif text-white mb-6">Major Honours</h3>
                            <ul className="space-y-4">
                                {staticLegend.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                                            <Medal size={18} className="text-yellow-500" />
                                        </div>
                                        <span className="text-white font-medium">{ach}</span>
                                    </li>
                                ))}
                            </ul>
                         </div>

                         {/* Archive Data (Meticulously Hardcoded) */}
                         <div className="space-y-6">
                             <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-2">
                                 Archive Records
                             </h3>
                             {staticLegend.archive ? (
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="p-4 rounded-lg border border-white/5 bg-[#0a0a0a]">
                                          <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Full Name</div>
                                          <div className="text-white text-sm font-medium">{staticLegend.fullName}</div>
                                     </div>
                                     <div className="p-4 rounded-lg border border-white/5 bg-[#0a0a0a]">
                                          <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Date of Birth</div>
                                          <div className="text-white text-sm font-medium">{staticLegend.archive.birthDate}</div>
                                     </div>
                                     <div className="p-4 rounded-lg border border-white/5 bg-[#0a0a0a]">
                                          <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Place of Birth</div>
                                          <div className="text-white text-sm font-medium">{staticLegend.archive.birthPlace}</div>
                                     </div>
                                      <div className="p-4 rounded-lg border border-white/5 bg-[#0a0a0a]">
                                          <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Height</div>
                                          <div className="text-white text-sm font-medium">{staticLegend.archive.height}</div>
                                     </div>
                                     <div className="p-4 rounded-lg border border-white/5 bg-[#0a0a0a]">
                                          <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Position Specifics</div>
                                          <div className="text-white text-sm font-medium">{staticLegend.archive.positionDetail}</div>
                                     </div>
                                     <div className="p-4 rounded-lg border border-white/5 bg-[#0a0a0a]">
                                          <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Career Span</div>
                                          <div className="text-white text-sm font-medium">{staticLegend.archive.careerSpan}</div>
                                     </div>
                                 </div>
                             ) : (
                                 <div className="text-gray-500 italic border border-dashed border-white/10 p-6 rounded-lg">
                                     Archive records are currently being digitized.
                                 </div>
                             )}
                         </div>
                    </motion.div>
                )}

                {/* TAB: BIO */}
                {activeTab === 'bio' && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                        <div className="bg-[#0a0a0a] border border-white/5 p-10 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden">
                            <Quote className="absolute top-10 right-10 text-white/5 transform scale-x-[-1]" size={100} />
                            
                            <h3 className="text-3xl font-serif text-white mb-10 flex items-center gap-4 relative z-10">
                                <BookOpen className="text-yellow-500" size={24} />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Full Biography</span>
                            </h3>
                            
                            <div className="prose prose-invert prose-lg max-w-none text-gray-400 font-light relative z-10">
                                 <p className="text-white text-xl leading-relaxed mb-8 font-serif">
                                     {premiumBio}
                                 </p>
                                 
                                 {wikiData?.bio && wikiData.bio !== premiumBio && (
                                     <div className="mt-8 pt-8 border-t border-white/10">
                                         <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Extended Archive</h4>
                                         {wikiData.bio.split('\n').map((para, i) => (
                                             <p key={i} className="mb-6 leading-relaxed text-base">{para}</p>
                                         ))}
                                     </div>
                                 )}
                            </div>
                        </div>
                     </motion.div>
                )}

            </div>
        </div>
    );
}
