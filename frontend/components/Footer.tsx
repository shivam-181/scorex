'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight, MessageSquare } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <footer id="main-footer" className="bg-gradient-to-b from-dark to-black border-t border-white/10 pt-16 pb-8 relative z-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-crimson to-transparent opacity-50"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-crimson/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-2xl font-bold text-white tracking-tight">
                  Score<span className="text-[#DC143C]">X</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Experience football like never before. Real-time scores, AI-powered insights, and breaking news right at your fingertips.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-crimson hover:text-white transition-all duration-300">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-crimson hover:text-white transition-all duration-300">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-crimson hover:text-white transition-all duration-300">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-crimson hover:text-white transition-all duration-300">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/#live-scores" className="text-gray-400 hover:text-crimson transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Live Scores
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-gray-400 hover:text-crimson transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/leagues" className="text-gray-400 hover:text-crimson transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Leagues
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-crimson transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-crimson transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-crimson transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-400 hover:text-crimson transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => setIsFeedbackOpen(true)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"
                  >
                    <MessageSquare size={16} className="text-crimson group-hover:scale-110 transition-transform" />
                    Send Us Feedback
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for the latest updates and exclusive features.
              </p>
              <form className="space-y-3" onSubmit={handleSubscribe}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-crimson transition-colors disabled:opacity-50"
                    required
                  />
                </div>
                <button 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group
                    ${status === 'success' ? 'bg-green-600 text-white' : 'bg-crimson hover:bg-red-600 text-white'}
                    disabled:opacity-70
                  `}
                >
                  {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                  {status !== 'loading' && status !== 'success' && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
                {status === 'error' && <p className="text-red-500 text-xs">Failed to subscribe. Try again.</p>}
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ScoreX. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
      
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
}
