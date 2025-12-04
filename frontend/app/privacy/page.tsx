'use client';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-black mb-8 text-white tracking-tight">
            Privacy <span className="text-crimson">Policy</span>
          </h1>
          <p className="text-gray-400 mb-12 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-12 text-gray-300 leading-relaxed font-light text-lg">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                1. Introduction
              </h2>
              <p className="mb-4">
                Welcome to ScoreX ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
              </p>
              <p>
                When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                2. Information We Collect
              </h2>
              <div className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5">
                <p className="mb-4">
                  We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the Website or otherwise contacting us.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-400">
                  <li><strong className="text-white">Personal Data:</strong> Name, email address, contact preferences.</li>
                  <li><strong className="text-white">Derivative Data:</strong> IP address, browser type, operating system, access times.</li>
                  <li><strong className="text-white">Mobile Device Data:</strong> Device ID, model, manufacturer, and location information.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                3. How We Use Your Information
              </h2>
              <p>
                We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                4. Data Security
              </h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                5. Your Privacy Rights
              </h2>
              <p className="mb-4">
                In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                6. Contact Us
              </h2>
              <p>
                If you have questions or comments about this policy, you may email us at support@scorex.com or by post to:
              </p>
              <address className="mt-4 not-italic text-gray-400">
                ScoreX Inc.<br />
                123 Football Lane<br />
                London, UK SW1A 1AA
              </address>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
