'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, CheckCircle, AlertCircle, Send, MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    'General Feedback',
    'Report a Bug',
    'Feature Request',
    'Data Accuracy',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !message) return;

    setStatus('submitting');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, message }),
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          // Reset form after closing
          setTimeout(() => {
            setStatus('idle');
            setCategory('');
            setMessage('');
            setErrorMessage('');
          }, 300);
        }, 2000);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to send feedback');
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed z-50 w-full max-w-lg bg-black/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
               
               <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                     Send Us Feedback
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Help us make ScoreX better for you.</p>
               </div>
               <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
               >
                  <X size={20} />
               </button>
            </div>

            {/* Content */}
            <div className="p-6">
               {status === 'success' ? (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="py-12 text-center"
                  >
                     <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                     <p className="text-gray-400">Your feedback has been sent to our team.</p>
                  </motion.div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                     {/* Category Selector */}
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">
                           What would you like to tell us about? <span className="text-crimson">*</span>
                        </label>
                        <div className="relative">
                           <select 
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-crimson transition-colors cursor-pointer"
                              required
                           >
                              <option value="" disabled>Select a topic</option>
                              {categories.map(cat => (
                                 <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                              ))}
                           </select>
                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                        </div>
                     </div>

                     {/* Message Area */}
                     <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-300 ml-1">
                           Your Message <span className="text-crimson">*</span>
                        </label>
                        <textarea
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                           placeholder="Tell us the details..."
                           className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-crimson transition-colors min-h-[150px] resize-none"
                           required
                        />
                     </div>

                     {/* Error Message */}
                     {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                           <AlertCircle size={16} />
                           <span>{errorMessage || "Something went wrong. Please try again."}</span>
                        </div>
                     )}

                     {/* Submit Button */}
                     <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                     >
                        {status === 'submitting' ? (
                           <>Processing...</>
                        ) : (
                           <>Submit Feedback <Send size={18} /></>
                        )}
                     </button>
                  </form>
               )}
            </div>

            {/* Footer Note */}
            {status !== 'success' && (
               <div className="p-4 bg-white/5 border-t border-white/10 text-xs text-gray-500 text-center">
                  We review every piece of feedback, though we can't reply to everyone personally.
               </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
