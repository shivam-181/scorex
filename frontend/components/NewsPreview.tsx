'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import NewsBanner from './NewsBanner';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export default function NewsPreview() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?limit=6`);
        const data = await res.json();
        setNewsItems(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Watermark */}
      {/* Background Watermark/Texture */}
      <div className="absolute inset-0 bg-[#020617] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-50"></div>
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

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-crimson"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <a href={item.url} target="_blank" rel="noopener noreferrer" key={index} className="group block h-full">
                <div className="glass-panel overflow-hidden rounded-xl h-full group-hover:border-crimson transition-all duration-300 flex flex-col">
                  <div className="h-48 overflow-hidden relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-60" />
                    <img 
                      src={item.urlToImage || '/placeholder.jpg'} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <span className="absolute bottom-3 left-3 z-20 text-[10px] font-bold bg-crimson text-white px-2 py-1 rounded">
                      {item.source.name}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-crimson transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-auto">
                      {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        
        {/* Promotional Banner */}
        <NewsBanner />
      </div>
    </section>
  );
}
