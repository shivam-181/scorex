'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Zap, Shield, Smartphone, Heart, Users, Trophy } from 'lucide-react';
import BrandName from '../../components/BrandName';

export default function AboutPage() {
  const [textStage, setTextStage] = React.useState(0); // 0=Typing, 1=Deleting, 2=Finished
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState("");
  
  const words = ["PLAYERS", "CLUBS", "SCOUTS", "AGENTS", "ATHLETES", "FANS"];
  const finalWord = "FANS*"; // The one with the asterisk
  
  const [hasStarted, setHasStarted] = React.useState(false);

  React.useEffect(() => {
    // Delay the start of the dynamic typing to allow "WE SERVE" to appear first
    const timer = setTimeout(() => setHasStarted(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  React.useEffect(() => {
    if (!hasStarted) return;

    const word = words[currentWordIndex];
    if (currentWordIndex === words.length - 1) {
       // Final word logic (FANS)
       if (displayedText !== finalWord) {
          const timeout = setTimeout(() => {
             setDisplayedText(finalWord.slice(0, displayedText.length + 1));
          }, 100); // Slower for final word emphasis
          return () => clearTimeout(timeout);
       }
       return;
    }

    // Typing Phase
    if (textStage === 0) {
       if (displayedText !== word) {
          const timeout = setTimeout(() => {
             setDisplayedText(word.slice(0, displayedText.length + 1));
          }, 25); // Ultra fast typing for cycling words
          return () => clearTimeout(timeout);
       } else {
          // Finished typing, wait then delete
          const timeout = setTimeout(() => setTextStage(1), 500);
          return () => clearTimeout(timeout);
       }
    }

    // Deleting Phase
    if (textStage === 1) {
       if (displayedText !== "") {
          const timeout = setTimeout(() => {
             setDisplayedText(displayedText.slice(0, -1));
          }, 10); // Blink-and-you-miss-it deleting
          return () => clearTimeout(timeout);
       } else {
          // Finished deleting, move to next word
          setTextStage(0);
          setCurrentWordIndex((prev) => prev + 1);
       }
    }
  }, [textStage, currentWordIndex, displayedText, words, hasStarted]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-crimson selection:text-white pt-24 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-6rem)] flex flex-col items-start justify-center pb-20 text-left pl-2 md:pl-8 z-10">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0 opacity-40">
           
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-crimson/5 rounded-full blur-[120px] -z-10" />
        
        <motion.h1 
           className="relative z-10 text-8xl md:text-[10rem] font-black tracking-tighter mb-8 uppercase drop-shadow-2xl leading-[0.8] mt-12 text-left max-w-[90%]"
           initial="hidden"
           animate="visible"
           variants={{
             visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } // Slower typing for dramatic effect
           }}
        >
          {[
            { text: "WE", type: "text" },
            { text: "BR", type: "br" },
            { text: "SERVE", type: "text" },
            { text: "BR", type: "br" },
          ].flatMap((segment, i): any[] => {
            if (segment.type === "br") return [{ key: `br-${i}`, char: <br key={`br-${i}`} />, type: "br", className: "" }];
            return segment.text.split('').map((char, charIndex) => ({
               key: `${i}-${charIndex}`,
               char,
               type: segment.type,
               className: "text-white inline-block mx-1"
            }));
          }).map((item) => (
             item.type === "br" ? item.char :
             <motion.span
                key={item.key}
                className={item.className}
                variants={{
                   hidden: { opacity: 0, display: "none" },
                   visible: { opacity: 1, display: "inline" }
                }}
             >
                {item.char}
             </motion.span>
          ))}
          
          {/* Dynamic 3rd Row */}
          {displayedText.split('').map((char, i) => (
             <motion.span
                key={`dyn-${i}`}
                className={char === "*" ? "text-crimson inline-block ml-1" : "text-white inline-block mx-1"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
             >
                {char}
             </motion.span>
          ))}
          
          {/* Blinking Cursor */}
          <motion.span
             initial={{ opacity: 0 }}
             animate={{ opacity: [0, 1, 0] }}
             transition={{ repeat: Infinity, duration: 0.8 }}
             className="inline-block w-4 h-[0.7em] bg-crimson ml-2 align-middle mb-4"
          />
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed italic"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          *If you have a screen, you are a fan.
        </motion.p>
      </section>

      {/* Our Mission */}
      <section id="vision" className="py-24 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <h4 className="text-crimson font-bold tracking-widest uppercase mb-4 text-sm">Our Mission</h4>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Democratizing The Beautiful Game's Data.</h2>
            <div className="space-y-6 text-lg text-gray-300 font-light">
              <p>
                Professional clubs have had access to elite-level analytics for decades. They know where a player looks before they pass, how much ground they cover in a sprint, and the probability of a goal from 30 yards out.
              </p>
              <p>
                <BrandName /> exists to bring that power to <strong>you</strong>. To the fan in the pub debate, to the fantasy manager obsessing over lineups, and to the student of the game who sees the patterns others miss.
              </p>
              <p>
                We are building the world's most accessible, yet deepest, football intelligence platform. Because when you understand the game better, you love it more.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            {...fadeInUp}
          >
             <div className="aspect-square bg-black/40 p-8 flex flex-col justify-between border border-white/5 hover:border-crimson/50 transition-colors group">
                <Globe className="w-12 h-12 text-gray-500 group-hover:text-white transition-colors" />
                <div>
                   <span className="text-4xl font-bold block mb-1">150+</span>
                   <span className="text-gray-500 text-sm uppercase tracking-wider">Leagues Covered</span>
                </div>
             </div>
             <div className="aspect-square bg-white p-8 flex flex-col justify-between text-black">
                <Zap className="w-12 h-12" />
                <div>
                   <span className="text-4xl font-bold block mb-1">0.5s</span>
                   <span className="font-bold text-sm uppercase tracking-wider">Latency</span>
                </div>
             </div>
             <div className="aspect-square bg-white p-8 flex flex-col justify-between text-black">
                <Users className="w-12 h-12" />
                <div>
                   <span className="text-4xl font-bold block mb-1">1M+</span>
                   <span className="font-bold text-sm uppercase tracking-wider">Monthly Users</span>
                </div>
             </div>
             <div className="aspect-square bg-black/40 p-8 flex flex-col justify-between border border-white/5 hover:border-crimson/50 transition-colors group">
                <Database className="w-12 h-12 text-gray-500 group-hover:text-white transition-colors" />
                <div>
                   <span className="text-4xl font-bold block mb-1">5Bn</span>
                   <span className="text-gray-500 text-sm uppercase tracking-wider">Data Points</span>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* The Innovation */}
      <section className="py-32 container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.h2 className="text-5xl md:text-7xl font-black mb-8" {...fadeInUp}>THE <span className="text-crimson">SCORE<span className="text-[#DC143C]">X</span></span> ENGINE</motion.h2>
          <motion.p className="text-xl text-gray-400" {...fadeInUp}>
             It's not just a database. It's a living, breathing neural network of footballing events.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
              {
                 icon: <Zap size={32} />,
                 title: "Real-Time Syntax",
                 desc: "Our proprietary websocket infrastructure delivers events to your device faster than the TV broadcast signal."
              },
              {
                 icon: <Code size={32} />,
                 title: "Predictive AI",
                 desc: "Our machine learning models analyze 10,000 historic matches to predict momentum shifts before they happen."
              },
              {
                 icon: <Shield size={32} />,
                 title: "Data Integrity",
                 desc: "Triple-verified stats from official league sources ensure that what you see is the absolute truth."
              }
           ].map((item, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1, duration: 0.5 }}
                 className="bg-zinc-900/30 p-10 border-t border-white/10 hover:bg-zinc-900/50 transition-all group"
              >
                 <div className="bg-crimson/10 w-16 h-16 rounded-full flex items-center justify-center text-crimson mb-8 group-hover:bg-crimson group-hover:text-white transition-all">
                    {item.icon}
                 </div>
                 <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                 <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
           ))}
        </div>
      </section>

      {/* Sustainable Impact */}
      <section className="py-24 bg-gradient-to-br from-zinc-900 to-black text-center border-t border-white/5">
         <div className="container mx-auto px-4 max-w-4xl">
            <Heart className="w-16 h-16 text-crimson mx-auto mb-8 animate-pulse" />
            <motion.h2 className="text-4xl font-bold mb-8" {...fadeInUp}>For The Love of The Game</motion.h2>
            <motion.p className="text-lg text-gray-400 mb-12" {...fadeInUp}>
               We are committed to the grassroots. A portion of our annual revenue is dedicated to equipping local youth academies with basic data tools, helping the next generation of talent understand their own game.
            </motion.p>
            <div className="inline-flex gap-8 border-t border-white/10 pt-8">
               <div className="text-left">
                  <div className="text-3xl font-bold text-white">12</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Academies Supported</div>
               </div>
               <div className="text-left">
                  <div className="text-3xl font-bold text-white">450+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">Young Players Tracked</div>
               </div>
            </div>
         </div>
      </section>

      {/* Global Footprint */}
      <section className="py-24 container mx-auto px-4">
         <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="flex-1 space-y-6">
                <h3 className="text-crimson font-bold uppercase tracking-widest">Our Footprint</h3>
                <h2 className="text-4xl font-black text-white">From Delhi to London. <br/>Data Moves Speedily.</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                   Our distributed cloud infrastructure ensures that a goal scored in Tokyo is received in Toronto in milliseconds. We operate edge nodes in 14 strategic locations globally.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {['Delhi (HQ)', 'Singapore', 'Mumbai', 'New York', 'Frankfurt', 'São Paulo'].map(city => (
                       <div key={city} className="flex items-center gap-2 text-gray-500">
                          <span className="w-2 h-2 rounded-full bg-crimson" /> {city}
                       </div>
                    ))}
                </div>
            </div>
             <div className="flex-1 w-full h-[400px] bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden relative group shadow-2xl">
                <img 
                   src="/holographic_globe.png" 
                   alt="Holographic Data Network" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                />
                
                {/* Data Points Animation Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 text-left">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-500 text-xs font-mono uppercase">System Active</span>
                   </div>
                   <div className="text-5xl font-black text-white tracking-tighter">99.99%</div>
                   <div className="text-gray-400 text-sm font-mono uppercase tracking-widest mt-1">Global Uptime</div>
                </div>
             </div>
          </div>
       </section>

      {/* Careers Teaser */}
      <section id="careers" className="py-32 relative text-white text-center overflow-hidden">
          <div className="absolute inset-0">
             <img 
                src="/tech_team.png" 
                alt="ScoreX Design Team" 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
               <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Join The Squad</h2>
               <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-10 font-light">
                  We are always scouting for world-class engineers, designers, and football nerds. <br/>
                  If you dream in code and breathe offside traps, we want you.
               </p>
               <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-crimson hover:text-black transition-all transform hover:scale-105 shadow-xl">
                  View Open Positions (Coming Soon)
               </button>
          </div>
      </section>

      {/* Leadership Footer */}
      <section className="py-24 container mx-auto px-4 text-center">
         <h3 className="text-gray-500 uppercase tracking-widest mb-4 text-xs font-bold">Leadership</h3>
         <p className="text-xl text-white font-medium">Built with obsession by <span className="text-crimson">Shivam</span>.</p>
         <p className="text-sm text-gray-600 mt-2">ScoreX Headquarters • Digital Sphere</p>
      </section>

    </main>
  );
}
