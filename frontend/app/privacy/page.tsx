'use client';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-400">
              At ScoreX, trust is our currency. Here is precisely how we handle yours.
            </p>
            <p className="text-sm text-gray-600 mt-4 font-mono">
              LAST EFFECTIVE: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </header>

          <div className="space-y-16 text-gray-300 font-light leading-relaxed text-lg">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                WHO is Responsible for the Processing of Your Personal Data?
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-4">
                <p>
                  ScoreX Inc. (referred to as "ScoreX", "we", "our" or "us" in this privacy policy). We are the entity responsible for the processing of your personal data and determining the means and purposes of processing your personal data.
                </p>
                <p>
                  We operate globally, but our core data infrastructure adheres to the strictest standards of digital privacy, including GDPR and CCPA compliance frameworks where applicable.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                WHAT Personal Data Do We Collect and WHEN?
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-6">
                <p>
                  We ask you for certain personal data to provide you with the products or services you request. For example, when you request to receive communications, create an account, or participate in our events.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/5 p-6 rounded-sm">
                    <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Active Collection</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                      <li>Contact details including name, email, and telephone number.</li>
                      <li>Login and account information, including user ID and password.</li>
                      <li>Personal preferences including your favorite teams, leagues, and players.</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-6 rounded-sm">
                    <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Passive Collection</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                      <li>Device IDs, call state, network access, storage information, and battery information.</li>
                      <li>Cookies, IP addresses, referrer headers, data identifying your web browser and version, and web beacons and tags.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                WHY and HOW Do We Use Your Personal Data?
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-6">
                <p>
                  We use your personal data for the following purposes:
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">1. To Provide the Features of the Service</h3>
                    <p className="text-gray-400">
                       When you use our App, we use your data to provide the selected product or service. For example, if you track a match on ScoreX, we use your data to send you push notifications about goals, cards, and final scores.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">2. To Protect Our or Others' Rights, Property or Safety</h3>
                    <p className="text-gray-400">
                       We may also use data about how you use our Site to prevent, detect, or investigate fraud, abuse, illegal use, violations of our Terms of Use, and to comply with court orders, governmental requests or applicable law.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">3. For General Research and Analysis</h3>
                    <p className="text-gray-400">
                       We use data about how our visitors use our Site and App to understand customer behavior or preferences. For example, we may use information about how visitors to ScoreX.com search for and find products to understand the best ways to organize and present our data.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                SHARING of Your Personal Data
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-4">
                <p>
                  We do not sell your personal data. We share your personal data with:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-400">
                   <li><strong>Service Providers:</strong> Cloud processing (AWS/Vercel), email delivery systems, and analytics providers processing personal data on our behalf.</li>
                   <li><strong>Third Parties:</strong> To the extent necessary to: (1) comply with a government request, a court order or applicable law; (2) prevent illegal uses of our Site; (3) defend ourselves against third party claims; and (4) assist in fraud prevention.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-crimson pl-6 py-2">
                PROTECTION and MANAGEMENT of Your Personal Data
              </h2>
              <div className="pl-6 md:pl-8 border-l border-white/5 space-y-4">
                <p>
                   Encryption & Security: We use a variety of technical and organizational security measures, including encryption and authentication tools, to maintain the safety of your personal data.
                </p>
                <p>
                   International Transfers: The personal data we collect (or process) in the context of our Site and App will be stored in the USA and other countries.
                </p>

                <div className="mt-8">
                   <h3 className="text-xl font-bold text-white mb-4">Data Retention Schedule</h3>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                         <thead>
                            <tr className="border-b border-white/10 text-gray-500 text-sm uppercase">
                               <th className="py-3 px-4">Data Type</th>
                               <th className="py-3 px-4">Retention Period</th>
                               <th className="py-3 px-4">Reason</th>
                            </tr>
                         </thead>
                         <tbody className="text-gray-300 text-sm">
                            <tr className="border-b border-white/5 bg-white/5">
                               <td className="py-3 px-4">User Account Data</td>
                               <td className="py-3 px-4">Lifetime of account + 2 years inactivity</td>
                               <td className="py-3 px-4">Service maintenance</td>
                            </tr>
                            <tr className="border-b border-white/5">
                               <td className="py-3 px-4">Usage Analytics</td>
                               <td className="py-3 px-4">26 Months</td>
                               <td className="py-3 px-4">Trend analysis</td>
                            </tr>
                            <tr className="border-b border-white/5 bg-white/5">
                               <td className="py-3 px-4">Support Messages</td>
                               <td className="py-3 px-4">5 Years</td>
                               <td className="py-3 px-4">Legal & quality audits</td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                </div>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </main>
  );
}
