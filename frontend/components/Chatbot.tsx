"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi! I'm ScoreX AI. Ask me anything about football!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const [isFooterVisible, setIsFooterVisible] = useState(false);
  
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const initObserver = () => {
      const footer = document.getElementById('main-footer');
      if (footer) {
        observer = new IntersectionObserver(
          (entries) => {
            setIsFooterVisible(entries[0].isIntersecting);
          },
          { threshold: 0.1 }
        );
        observer.observe(footer);
        return true;
      }
      return false;
    };

    if (!initObserver()) {
      const intervalId = setInterval(() => {
        if (initObserver()) {
          clearInterval(intervalId);
        }
      }, 500);

      return () => {
        clearInterval(intervalId);
        if (observer) observer.disconnect();
      };
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();
      
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: data.response || "Sorry, I couldn't process that.", 
        sender: "bot" 
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: "Network error. Try again.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          y: [0, -10, 0], // Floating animation
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 md:bottom-6 right-6 z-50 group flex items-center justify-center p-4 rounded-full shadow-[0_0_20px_rgba(220,20,60,0.6)] transition-all ${
          isOpen || isFooterVisible ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100 bg-gradient-to-r from-crimson to-red-600 text-white"
        }`}
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-crimson opacity-75 animate-ping group-hover:animate-none"></span>
        
        <div className="relative">
          <MessageSquare size={28} className="drop-shadow-md" />
          {/* Notification Dot */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-crimson"></span>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 md:bottom-6 right-6 z-50 w-[350px] h-[500px] bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-crimson/80 backdrop-blur-md flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-white" />
                <span className="font-bold text-white">ScoreX AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm backdrop-blur-sm ${
                      msg.sender === "user"
                        ? "bg-crimson/80 text-white rounded-tr-none border border-white/10"
                        : "bg-white/10 text-white rounded-tl-none border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl rounded-tl-none flex gap-1 border border-white/5">
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-75" />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about football..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-crimson transition-colors placeholder-gray-500"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="p-2 bg-crimson rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-crimson/80 transition-colors shadow-lg shadow-crimson/20"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
