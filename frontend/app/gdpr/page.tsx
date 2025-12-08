'use client';
import { motion } from 'framer-motion';
import { Shield, FileText, Lock, Eye, Download, Trash2, AlertCircle, CheckCircle, Scale, Globe, Siren, UserX, Server } from 'lucide-react';

export default function GDPRPage() {
  const definitions = [
     { term: "Personal Data", def: "Any information relating to an identified or identifiable natural person ('data subject')." },
     { term: "Processing", def: "Any operation performed on personal data, such as collection, recording, storage, adaptation, or destruction." },
     { term: "Consent", def: "Freely given, specific, informed and unambiguous indication of the data subject's wishes." },
     { term: "Controller", def: "The natural or legal person who determines the purposes and means of the processing of personal data." }
  ];

  const rights = [
    {
      icon: <Eye className="w-6 h-6 text-crimson" />,
      title: "Right to Access (Art. 15)",
      description: "You have the right to request a copy of the personal data we hold about you. We will provide this in a structured, commonly used format."
    },
    {
      icon: <Trash2 className="w-6 h-6 text-crimson" />,
      title: "Right to Erasure (Art. 17)",
      description: "Also known as the 'Right to be Forgotten'. You can request that we delete your personal data when it is no longer necessary for the purpose it was collected."
    },
    {
      icon: <Download className="w-6 h-6 text-crimson" />,
      title: "Data Portability (Art. 20)",
      description: "You have the right to receive your personal data in a machine-readable format to transfer it to another service provider."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-crimson" />,
      title: "Right to Rectification (Art. 16)",
      description: "If your data is inaccurate or incomplete, you have the right to ask us to correct or update it immediately."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-crimson blur-[150px] opacity-20"></div>
         <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-white blur-[150px] opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-20 border-b border-white/10 pb-12">
            <div className="flex items-center gap-4 mb-6">
               <Shield className="w-12 h-12 text-crimson" />
               <div className="h-8 w-[1px] bg-white/20"></div>
               <span className="text-gray-400 font-mono text-sm tracking-widest">EU REGULATION 2016/679</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
              GDPR <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-600 opacity-90">Compliance</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              ScoreX is committed to the highest standards of data protection. We align our data processing activities with the General Data Protection Regulation (GDPR).
            </p>
          </header>

          <div className="space-y-24">
            
            {/* Principles & Definitions */}
            <section className="bg-white/5 border border-white/10 p-10 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <FileText size={150} />
               </div>
               <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-crimson pl-4">Key Definitions (Art. 4)</h2>
               <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  {definitions.map((def, i) => (
                     <div key={i} className="space-y-2">
                        <h4 className="text-crimson font-bold uppercase tracking-wider text-sm">{def.term}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{def.def}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* Rights of the Data Subject */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-crimson pl-6">
                Your Rights Under GDPR (Chapter III)
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                 {rights.map((right, idx) => (
                    <motion.div 
                       key={idx}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: idx * 0.1 }}
                       className="bg-zinc-900 border border-white/5 p-8 rounded-xl hover:border-crimson/30 transition-colors group"
                    >
                       <div className="mb-6 bg-black w-12 h-12 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-crimson/50 transition-colors">
                          {right.icon}
                       </div>
                       <h3 className="text-xl font-bold mb-3 group-hover:text-crimson transition-colors">{right.title}</h3>
                       <p className="text-gray-400 text-sm leading-relaxed">{right.description}</p>
                    </motion.div>
                 ))}
              </div>
            </section>

            {/* Security & Breaches */}
            <section>
               <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-crimson pl-6">
                 Security & Breach Protocols
               </h2>
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                     <div className="flex items-center gap-4 mb-4">
                        <Lock className="text-white w-6 h-6" />
                        <h3 className="text-xl font-bold">Security of Processing (Art. 32)</h3>
                     </div>
                     <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
                     </p>
                     <ul className="list-disc pl-5 space-y-2 text-sm text-gray-500">
                        <li>Pseudonymisation and encryption of personal data.</li>
                        <li>Ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems.</li>
                        <li>Regular testing, assessing and evaluating the effectiveness of technical measures.</li>
                     </ul>
                  </div>
                  
                  <div className="bg-crimson/5 p-8 rounded-xl border border-crimson/20">
                     <div className="flex items-center gap-4 mb-4">
                        <Siren className="text-crimson w-6 h-6" />
                        <h3 className="text-xl font-bold text-crimson">Data Breach Notification (Art. 33)</h3>
                     </div>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        In the case of a personal data breach, ScoreX shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the supervisory authority competent in accordance with Article 55, unless the personal data breach is unlikely to result in a risk to the rights and freedoms of natural persons.
                     </p>
                  </div>
               </div>
            </section>

             {/* International Transfers */}
             <section className="border-t border-white/10 pt-16">
               <div className="flex flex-col md:flex-row items-start gap-8">
                  <Globe className="w-16 h-16 text-gray-600 shrink-0" />
                  <div>
                     <h2 className="text-2xl font-bold text-white mb-4">Transfers to Third Countries (Chapter V)</h2>
                     <p className="text-gray-400 leading-relaxed mb-6">
                        Transfers of personal data to a third country or an international organisation may take place where the Commission has decided that the third country, a territory or one or more specified sectors within that third country, or the international organisation in question ensures an adequate level of protection. Such a transfer shall not require any specific authorisation.
                     </p>
                     <div className="flex gap-4">
                        <span className="px-3 py-1 bg-white/10 rounded text-xs text-gray-300 font-mono">Standard Contractual Clauses (SCCs)</span>
                        <span className="px-3 py-1 bg-white/10 rounded text-xs text-gray-300 font-mono">Adequacy Decisions</span>
                     </div>
                  </div>
               </div>
            </section>

            {/* Data Controller Details */}
            <section>
               <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-crimson pl-6">
                 Contact Information
               </h2>
               <div className="bg-zinc-900 border border-white/10 p-10 rounded-2xl">
                  <div className="grid md:grid-cols-2 gap-12">
                     <div>
                        <h3 className="text-crimson text-sm uppercase tracking-widest mb-6 font-bold">Data Controller</h3>
                        <div className="space-y-4">
                           <div>
                              <div className="text-white font-bold text-lg">ScoreX Inc.</div>
                              <div className="text-gray-400 text-sm">Entity Determining Purposes</div>
                           </div>
                           <div>
                              <div className="text-white font-bold text-lg">New Delhi, India</div>
                              <div className="text-gray-400 text-sm">Main Establishment</div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <h3 className="text-crimson text-sm uppercase tracking-widest mb-6 font-bold">Data Protection Officer</h3>
                        <div className="space-y-4">
                           <p className="text-gray-400 text-sm">
                              For request regarding your rights or data processing reporting:
                           </p>
                           <a href="mailto:dpo@scorex.com" className="inline-flex items-center gap-2 text-white font-bold hover:text-crimson transition-colors border border-white/20 px-6 py-3 rounded-full hover:bg-white/5">
                              <FileText size={18} /> Contact DPO
                           </a>
                        </div>
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
