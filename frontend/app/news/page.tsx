'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

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

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?limit=30`);
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
    <main className="min-h-screen bg-dark pt-24 pb-20 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <img 
          src="https://images.pexels.com/photos/1657332/pexels-photo-1657332.jpeg?_gl=1*i3j6ra*_ga*NDYyOTUzNDg2LjE3NjMyMDA4NTc.*_ga_8JE65Q40S6*czE3NjQ0OTIyMzQkbzQkZzEkdDE3NjQ0OTI0NTQkajU5JGwwJGgw" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Latest <span className="text-crimson">News</span></h1>
          <p className="text-gray-400 text-lg">Breaking stories, transfer updates, and tactical analysis.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crimson"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((article, index) => (
              <motion.a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel overflow-hidden rounded-xl group hover:border-crimson transition-colors duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src={article.urlToImage || '/placeholder.jpg'} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 z-20 text-[10px] font-bold bg-crimson text-white px-2 py-1 rounded">
                    {article.source.name}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-crimson transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                    <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
                    <span className="text-white hover:text-crimson transition-colors font-bold">Read More →</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
