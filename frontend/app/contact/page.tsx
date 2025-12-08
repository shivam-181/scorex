'use client';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark text-white pt-24 pb-20 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <img 
          src="https://images.pexels.com/photos/8455350/pexels-photo-8455350.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black mb-6 text-white tracking-tight">
            Get in <span className="text-crimson">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you. 
            Our team is ready to answer all your questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-crimson/10 rounded-2xl flex items-center justify-center text-crimson shrink-0 group-hover:bg-crimson group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Email Us</h4>
                    <p className="text-gray-400 font-light">support@scorex.com</p>
                    <p className="text-gray-400 font-light">partnerships@scorex.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-crimson/10 rounded-2xl flex items-center justify-center text-crimson shrink-0 group-hover:bg-crimson group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Visit Us</h4>
                    <p className="text-gray-400 font-light">123 Football Lane</p>
                    <p className="text-gray-400 font-light">New Delhi, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-crimson/10 rounded-2xl flex items-center justify-center text-crimson shrink-0 group-hover:bg-crimson group-hover:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Call Us</h4>
                    <p className="text-gray-400 font-light">+91 1234 5678</p>
                    <p className="text-gray-400 font-light">Mon-Fri, 9am-6pm IST</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6"
                >
                  <CheckCircle size={48} />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-gray-400 mb-8 max-w-xs mx-auto">Thank you for reaching out. We'll get back to you shortly.</p>
                <button 
                  onClick={() => setSent(false)}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                      placeholder="Cristiano Ronaldo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                      placeholder="cr7@scorex.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-crimson hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(220,20,60,0.3)] hover:shadow-[0_0_30px_rgba(220,20,60,0.5)]"
                >
                  {sending ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
