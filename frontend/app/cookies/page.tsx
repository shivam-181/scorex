'use client';
import { motion } from 'framer-motion';
import { Cookie, Shield, Eye, Settings, Clock, CheckCircle } from 'lucide-react';

export default function CookiesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const cookieTypes = [
     {
        name: "Essential",
        icon: <Shield className="text-green-500" size={24} />,
        desc: "These are non-negotiable. They keep your login secure and the scoreboard live.",
        status: "Always Active"
     },
     {
        name: "Analytics",
        icon: <Eye className="text-blue-500" size={24} />,
        desc: "We track aggregate patterns, not individuals. This helps us know which leagues to add next.",
        status: "Optional"
     },
     {
        name: "Functionality",
        icon: <Settings className="text-purple-500" size={24} />,
        desc: "Remembers your favorite team so you don't have to search for them every time.",
        status: "Optional"
     },
     {
        name: "Marketing",
        icon: <Cookie className="text-crimson" size={24} />,
        desc: "Used to show you relevant offers. We keep this minimal—football first, ads second.",
        status: "Optional"
     }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-900/10 to-black pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Hero */}
        <motion.div 
           className="text-center mb-24 pt-12"
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
        >
           <motion.div 
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 12, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block mb-6"
           >
              <Cookie size={80} className="text-crimson/80 drop-shadow-[0_0_30px_rgba(220,20,60,0.5)]" />
           </motion.div>
           <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-600">Policy</span>
           </h1>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
             We use digital cookies to make your ScoreX experience tastier. Here is the full recipe of what we bake into your browser.
           </p>
        </motion.div>

        <div className="space-y-20">
            
            {/* The Breakdown Grid */}
            <section>
               <motion.h2 {...fadeInUp} className="text-3xl font-bold mb-10 text-center">The Cookie Jar Breakdown</motion.h2>
               <div className="grid md:grid-cols-2 gap-6">
                  {cookieTypes.map((type, i) => (
                     <motion.div
                        key={type.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="bg-white/5 border border-white/5 rounded-2xl p-8 hover:bg-white/10 transition-colors group"
                     >
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-3 bg-black/50 rounded-lg group-hover:scale-110 transition-transform">
                              {type.icon}
                           </div>
                           <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${type.status === "Always Active" ? "bg-green-500/20 text-green-500" : "bg-gray-700/50 text-gray-400"}`}>
                              {type.status}
                           </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{type.name}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{type.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* In Depth Content */}
            <div className="max-w-4xl mx-auto space-y-16 text-gray-300 font-light leading-relaxed text-lg border-l border-white/10 pl-8 md:pl-12">
               
               <motion.section {...fadeInUp}>
                  <h3 className="text-white font-bold text-2xl mb-4 flex items-center gap-3">
                     <Clock className="text-crimson" /> Retention Periods
                  </h3>
                  <p>
                     Cookies typically fall into two categories for duration:
                  </p>
                  <ul className="mt-4 space-y-4">
                     <li className="bg-white/5 p-4 rounded-r-xl border-l-2 border-crimson">
                        <strong className="text-white block mb-1">Session Cookies</strong>
                        Temporary files that are erased when you close your browser. They are the short-term memory of our site.
                     </li>
                     <li className="bg-white/5 p-4 rounded-r-xl border-l-2 border-blue-500">
                        <strong className="text-white block mb-1">Persistent Cookies</strong>
                        These stay in one of your browser's subfolders until you delete them manually or your browser deletes them based on the duration period contained within the persistent cookie's file.
                     </li>
                  </ul>
               </motion.section>

               <motion.section {...fadeInUp}>
                  <h3 className="text-white font-bold text-2xl mb-4 flex items-center gap-3">
                     <CheckCircle className="text-crimson" /> Your Control
                  </h3>
                  <p className="mb-4">
                     You have the ultimate power. Most modern browsers allow you to control cookies through their settings preferences.
                  </p>
                  <p>
                     However, please note that if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
                  </p>
               </motion.section>

               <motion.section {...fadeInUp}>
                  <div className="bg-gradient-to-r from-crimson/20 to-transparent p-8 rounded-2xl border border-crimson/20">
                     <h3 className="text-white font-bold text-xl mb-2">Questions about our Recipe?</h3>
                     <p className="text-sm">
                        If you want to know exactly which chocolate chips (data points) go into our cookies, email our Data Protection Officer at <span className="text-white font-mono">privacy@scorex.com</span>.
                     </p>
                  </div>
               </motion.section>

            </div>

        </div>
      </div>
    </main>
  );
}
