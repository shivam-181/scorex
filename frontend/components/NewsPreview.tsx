'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "Foden Saves City: Late Winner Stuns Leeds",
    category: "Premier League",
    image: "https://www.irishtimes.com/resizer/v2/3H3DVUP33FUAXZGSADKH5CW2FE.jpg?auth=9867ac6e947707e77678bf04633515fc5efc35bccfa153d6675f722eb4929fce&smart=true&width=1600&height=1065",
    date: "2 hours ago"
  },
  {
    id: 2,
    title: "Barcelona Top La Liga: Olmo Brace Sinks Alaves",
    category: "La Liga",
    image: "https://static.toiimg.com/thumb/msid-125662255,imgsize-120232,width-400,resizemode-4/spain-la-liga-soccer.jpg",
    date: "4 hours ago"
  },
  {
    id: 3,
    title: "Leao Decisive: Milan Edge Lazio to Go Top",
    category: "Serie A",
    image: "https://assets-eu-01.kc-usercontent.com/1293c890-579f-01b7-8480-902cca7de55e/4469564d-644e-4c78-adb6-7038fea980b0/2025.11.29-Report-MilanLazio-WebHP.png?w=2048&auto=format",
    date: "6 hours ago"
  }
];

export default function NewsPreview() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Watermark - REPLACE src WITH YOUR IMAGE LINK */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Watermark" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Trending News</h2>
            <p className="text-gray-400">Stay updated with the latest headlines.</p>
          </div>
          <Link href="/news" className="flex items-center gap-2 text-crimson font-bold hover:text-white transition-colors">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Link href={`/news`} key={item.id} className="group">
              <div className="glass-panel overflow-hidden rounded-xl h-full hover:border-crimson transition-colors duration-300">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 z-20 text-[10px] font-bold bg-crimson text-white px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-crimson transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
