'use client';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-20 border-b border-white/10 pb-12">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-600">Service</span>
            </h1>
            <p className="text-xl text-gray-400">
              The rules of the game. Please read these terms carefully before using our digital platforms.
            </p>
            <p className="text-sm text-gray-600 mt-4 font-mono">
              LAST UPDATED: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </header>

          <div className="space-y-16 text-gray-300 font-light leading-relaxed text-lg">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                1. Agreement to Terms
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-4">
                <p>
                  These Terms of Use ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and ScoreX Inc. ("ScoreX", "we", "us", or "our"), concerning your access to and use of the ScoreX website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Platform").
                </p>
                <p>
                  You agree that by accessing the Platform, you have read, understood, and accept to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                2. Intellectual Property Rights
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-4">
                <p>
                  Unless otherwise indicated, the Platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
                </p>
                <div className="bg-white/5 p-6 border-l-2 border-crimson">
                   <p className="text-white italic">
                      "ScoreX", the ScoreX Swosh logo, and other ScoreX trademarks are intellectual property of ScoreX Inc. You may not use these without express written permission.
                   </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                3. User Representations & Code of Conduct
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-4">
                <p>
                  By using the Platform, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                   <li>All registration information you submit will be true, accurate, current, and complete.</li>
                   <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                   <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
                   <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
                   <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                4. Prohibited Activities
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-4">
                <p>
                  You may not access or use the Platform for any purpose other than that for which we make the Platform available. The Platform may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Platform, you agree not to:
                </p>
                <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-400 mt-4">
                   <li className="bg-white/5 p-4 rounded-lg">Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                   <li className="bg-white/5 p-4 rounded-lg">Make any unauthorized use of the Platform, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
                   <li className="bg-white/5 p-4 rounded-lg">Circumvent, disable, or otherwise interfere with security-related features of the Platform.</li>
                   <li className="bg-white/5 p-4 rounded-lg">Engage in unauthorized framing of or linking to the Site.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                5. Subscription Services & Payments
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-4">
                <p>
                   Certain premium features of the ScoreX platform may require a paid subscription ("ScoreX PRO").
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-400">
                   <li><strong>Billing Cycle:</strong> The subscription fee for the ScoreX PRO service and any other charges you may incur in connection with your use of the service, such as taxes and possible transaction fees, will be charged to your Payment Method on the specific payment date indicated on the "Account" page.</li>
                   <li><strong>Cancellation:</strong> You can cancel your ScoreX subscription at any time, and you will continue to have access to the service through the end of your billing period. To the extent permitted by the applicable law, payments are non-refundable and we do not provide refunds or credits for any partial membership periods.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                6. Disclaimer of Liability
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-4">
                <p className="uppercase tracking-widest text-sm font-bold text-white mb-2">Read this carefully</p>
                <p>
                  THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF.
                </p>
                <p>
                  We strive for 100% accuracy in our live scores and statistics, but we cannot guarantee that all data is error-free at the millisecond of transmission. Reliance on any information provided by ScoreX is solely at your own risk.
                </p>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </main>
  );
}
