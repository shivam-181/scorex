'use client';
import { motion } from 'framer-motion';

export default function CookiesPage() {
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
            Cookie <span className="text-crimson">Policy</span>
          </h1>
          <p className="text-gray-400 mb-12 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-12 text-gray-300 leading-relaxed font-light text-lg">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                1. What Are Cookies
              </h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                2. How We Use Cookies
              </h2>
              <div className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5">
                <p className="mb-4">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-400">
                  <li><strong className="text-white">Essential Cookies:</strong> Necessary for the website to function properly.</li>
                  <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with the website.</li>
                  <li><strong className="text-white">Marketing Cookies:</strong> Used to track visitors across websites to display relevant ads.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                3. Managing Cookies
              </h2>
              <p>
                Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-crimson"></span>
                4. Third-Party Cookies
              </h2>
              <p>
                In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-3 text-gray-400">
                <li><strong className="text-white">Google Analytics:</strong> This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience.</li>
                <li><strong className="text-white">Social Media Buttons:</strong> We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways.</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
