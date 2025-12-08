'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const leagues = [
  { name: "Premier League", country: "England", code: "PL", color: "from-purple-600 to-blue-600", logo: "http://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png" },
  { name: "La Liga", country: "Spain", code: "PD", color: "from-orange-500 to-red-600", logo: "https://assets.laliga.com/assets/2023/06/05/hl/823498d5841735b9b824018eea71df33.jpeg" },
  { name: "Bundesliga", country: "Germany", code: "BL1", color: "from-red-600 to-yellow-500", logo: "https://sp-static-images.s3.amazonaws.com/logos/germanleague/Bundesliga/c_pad_630x1200/Bundesliga.png" },
  { name: "Serie A", country: "Italy", code: "SA", color: "from-blue-400 to-cyan-500", logo: "https://sp-static-images.s3.amazonaws.com/logos/Serie_A_logo/c_pad_630x1200/Serie_A_logo.png" },
  { name: "Ligue 1", country: "France", code: "FL1", color: "from-blue-800 to-red-500", logo: "https://s2.dmcdn.net/v/XaUSs1dQvCscSCXmD/x1080" },
  { name: "Champions League", country: "Europe", code: "CL", color: "from-blue-900 to-indigo-900", logo: "https://www.logo.wine/a/logo/UEFA_Champions_League/UEFA_Champions_League-Logo.wine.svg" },
];

export default function LeaguesPage() {
  return (
    <main className="min-h-screen bg-dark pt-24 pb-20 relative overflow-hidden">
      {/* Background Watermark - REPLACE src WITH YOUR IMAGE LINK */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1628936274131-de999fec20dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzI0fHxmb290YmFsbHxlbnwwfHwwfHx8MA%3D%3D" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
<h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-600">Leagues</span>
            </h1>            <p className="text-gray-400 text-lg">Follow the world's biggest leagues.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leagues.map((league, index) => (
            <Link href={`/leagues/${league.code}`} key={league.code}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative h-40 rounded-2xl overflow-hidden cursor-pointer group`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${league.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Watermark Logo - REPLACE 'logo' IN DATA ABOVE WITH YOUR LINKS */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                   <img 
                    src={league.logo} 
                    alt={league.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                   />
                </div>

                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center z-10">
                  <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-1 group-hover:scale-110 transition-transform duration-300">
                    {league.name}
                  </h2>
                  <span className="text-white/80 font-bold text-sm">{league.country}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
