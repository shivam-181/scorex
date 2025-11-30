'use client';
import { motion } from 'framer-motion';

const newsArticles = [
  {
    id: 1,
    title: "Foden Saves City: Late Winner Stuns Leeds",
    category: "Premier League",
    image: "https://www.irishtimes.com/resizer/v2/3H3DVUP33FUAXZGSADKH5CW2FE.jpg?auth=9867ac6e947707e77678bf04633515fc5efc35bccfa153d6675f722eb4929fce&smart=true&width=1600&height=1065", // Man City / Blue kit vibe
    date: "2 hours ago",
    excerpt: "Phil Foden's stoppage-time strike rescues Manchester City after they surrendered a two-goal lead in a thriller."
  },
  {
    id: 2,
    title: "Barcelona Top La Liga: Olmo Brace Sinks Alaves",
    category: "La Liga",
    image: "https://static.toiimg.com/thumb/msid-125662255,imgsize-120232,width-400,resizemode-4/spain-la-liga-soccer.jpg", // Football stadium / generic match
    date: "4 hours ago",
    excerpt: "Dani Olmo shines with two goals as Barcelona provisionally take the top spot with a convincing 3-1 victory."
  },
  {
    id: 3,
    title: "Leao Decisive: Milan Edge Lazio to Go Top",
    category: "Serie A",
    image: "https://assets-eu-01.kc-usercontent.com/1293c890-579f-01b7-8480-902cca7de55e/4469564d-644e-4c78-adb6-7038fea980b0/2025.11.29-Report-MilanLazio-WebHP.png?w=2048&auto=format", // Generic football action
    date: "6 hours ago",
    excerpt: "AC Milan claim the summit of Serie A thanks to a solitary goal from Rafael Leao in a tense battle at the San Siro."
  },
  {
    id: 4,
    title: "Messi & Miami Reach MLS Cup Final",
    category: "MLS",
    image: "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F1130%2Fr1582583_1296x729_16%2D9.jpg&w=1140&cquality=40&format=jpg", // Pink/Miami vibe or generic
    date: "12 hours ago",
    excerpt: "Inter Miami thrash NYCFC 5-1 to reach their first-ever MLS Cup final, with Messi pulling the strings."
  },
  {
    id: 5,
    title: "Chelsea Boost: Palmer Fit for Arsenal Clash",
    category: "Premier League",
    image: "https://c.ndtvimg.com/2025-09/itptctts_cole-palmer_625x300_26_September_25.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738", // Generic player
    date: "1 day ago",
    excerpt: "Huge news for the Blues as Cole Palmer recovers ahead of schedule for the critical London derby."
  },
  {
    id: 6,
    title: "Kane's Future: Bayern Chief Speaks Out",
    category: "Bundesliga",
    image: "https://livesport-ott-images.ssl.cdn.cra.cz/r1200xfq60/0fc72f47-acff-4b4a-9c8a-4dd5e15572c9.avif", // Generic stadium/action
    date: "1 day ago",
    excerpt: "Bayern Munich sporting director addresses the rumors surrounding Harry Kane's long-term future at the club."
  }
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-dark pt-24 pb-20 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <img 
          src="https://images.pexels.com/photos/1657332/pexels-photo-1657332.jpeg?_gl=1*i3j6ra*_ga*NDYyOTUzNDg2LjE3NjMyMDA4NTc.*_ga_8JE65Q40S6*czE3NjQ0OTIyMzQkbzQkZzEkdDE3NjQ0OTI0NTQkajU5JGwwJGgw" 
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Latest <span className="text-crimson">News</span></h1>
          <p className="text-gray-400 text-lg">Breaking stories, transfer updates, and tactical analysis.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel overflow-hidden rounded-xl group hover:border-crimson transition-colors duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 z-20 text-[10px] font-bold bg-crimson text-white px-2 py-1 rounded">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-crimson transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{article.date}</span>
                  <button className="text-white hover:text-crimson transition-colors font-bold">Read More →</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
