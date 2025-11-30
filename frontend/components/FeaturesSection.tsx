'use client';
import { motion } from 'framer-motion';
import { Cpu, Zap, UserCheck } from 'lucide-react';
import BrandName from './BrandName';

const features = [
  {
    icon: <Cpu size={40} className="text-crimson" />,
    title: "AI Powered Insights",
    description: "Our advanced algorithms predict match outcomes and analyze team performance in real-time."
  },
  {
    icon: <Zap size={40} className="text-apricot" />,
    title: "Lightning Fast Data",
    description: "Get live scores, stats, and lineup updates milliseconds after they happen on the pitch."
  },
  {
    icon: <UserCheck size={40} className="text-blue-400" />,
    title: "Personalized Feed",
    description: "Follow your favorite teams and leagues. We curate a custom feed just for you."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose <BrandName />?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Experience football like never before with our cutting-edge platform designed for the modern fan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors duration-300"
            >
              <div className="mb-6 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
