import React, { useEffect } from 'react';
import { X, Brain, Database, Calendar, MessageSquare, Mail, UserCheck, GitBranch, ArrowRight, Zap, Check, Smartphone } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface Domin8ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
}

const Domin8ChatbotModal: React.FC<Domin8ChatbotModalProps> = ({ isOpen, onClose, onApply }) => {
  // SCROLLING RULE: Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCTA = () => {
    onClose();
    if (onApply) {
      setTimeout(() => onApply(), 100);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop: Heavy blur, no ambient color bleed */}
      <div 
        className="absolute inset-0 bg-[rgba(10,10,10,0.75)] backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container: Deep Glass, isolated styles */}
      <div className="relative w-full max-w-5xl bg-[rgba(10,10,10,0.9)] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh] my-4">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto no-scrollbar flex-1 p-8 md:p-12 space-y-16">
          
          {/* HERO SECTION */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white leading-[0.95]">
              MEET YOUR <br/>
              <span className="text-gradient-domin8">DIGITAL EMPLOYEE.</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xl mx-auto">
              The Domin8 Chatbot doesn’t just chat. <br/>
              It thinks, acts, remembers, and executes — automatically.
            </p>
          </div>

          {/* SMS LIVE DEMO SECTION */}
          <div className="relative bg-electric-blue/5 border border-electric-blue/20 rounded-[24px] p-8 md:p-10 overflow-hidden group">
             {/* Animated Glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/10 rounded-full blur-[80px] group-hover:bg-electric-blue/20 transition-all duration-700 pointer-events-none"></div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                <div className="space-y-4">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue text-black text-[10px] font-bold font-mono uppercase tracking-widest animate-pulse">
                      <Zap className="w-3 h-3 fill-black" /> Live System Access
                   </div>
                   <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase italic">
                      Test Marcus In The Wild.
                   </h3>
                   <p className="text-gray-300 font-mono text-xs leading-relaxed">
                      Experience the raw power of our Zero-Shot Learning engine. Text "Demo" to our number and provide any website URL. Marcus will instantly scrub the site, learn the business, and begin selling to you.
                   </p>
                   <ul className="space-y-2 text-xs font-mono text-electric-blue">
                      <li className="flex items-center gap-2"><Check className="w-3 h-3" /> Real-time Website Scrubbing</li>
                      <li className="flex items-center gap-2"><Check className="w-3 h-3" /> Instant Personality Adaptation</li>
                   </ul>
                </div>

                <div className="flex flex-col items-center justify-center text-center space-y-4">
                   <a 
                      href="sms:5042082121?body=Demo"
                      className="group/btn relative w-full md:w-auto px-8 py-4 bg-white hover:bg-electric-blue text-black font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,123,255,0.6)] flex items-center justify-center gap-3"
                   >
                      <Smartphone className="w-5 h-5" />
                      Text "Demo" to 504-208-2121
                   </a>
                   <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                      Tap above to auto-open SMS
                   </p>
                </div>
             </div>
          </div>

          {/* SECTION 1: BRAIN & BODY (VISUAL CORE) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* LEFT: THE BRAIN */}
            <div className="bg-[#111] border border-electric-blue/30 rounded-2xl p-6 relative overflow-hidden h-80 flex flex-col justify-between group shadow-[0_0_30px_rgba(0,123,255,0.05)] hover:shadow-[0_0_40px_rgba(0,123,255,0.1)] transition-shadow">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Brain className="w-32 h-32 text-electric-blue" />
               </div>
               <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 bg-electric-blue/10 rounded-xl flex items-center justify-center border border-electric-blue/20">
                     <Zap className="w-8 h-8 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white">THE BRAIN</h3>
                    <span className="text-sm font-mono text-electric-blue font-bold">(OpenAI)</span>
                  </div>
                  <div className="space-y-3">
                     {['Natural Language', 'Context Awareness', 'Decision Logic', 'Reasoning Engine'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs font-mono text-gray-400">
                           <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div> {item}
                        </div>
                     ))}
                  </div>
               </div>
               <div className="mt-auto pt-4 border-t border-white/5">
                  <p className="text-[10px] text-gray-500 font-mono">Powers intelligence & understanding.</p>
               </div>
            </div>

            {/* CENTER: CONNECTOR */}
            <div className="flex flex-col items-center justify-center gap-4 text-center">
               <div className="w-px h-16 bg-gradient-to-b from-electric-blue to-domin8-magenta/50"></div>
               <div className="p-4 bg-white/5 rounded-full border border-white/10 relative">
                  <GitBranch className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse-slow"></div>
               </div>
               <div className="w-px h-16 bg-gradient-to-b from-domin8-magenta/50 to-domin8-magenta"></div>
               <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest max-w-[150px]">Intelligence without execution is useless.</p>
            </div>

            {/* RIGHT: THE BODY */}
            <div className="bg-[#111] border border-domin8-magenta/30 rounded-2xl p-6 relative overflow-hidden h-80 flex flex-col justify-between group shadow-[0_0_30px_rgba(255,0,255,0.05)] hover:shadow-[0_0_40px_rgba(255,0,255,0.1)] transition-shadow">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Database className="w-32 h-32 text-domin8-magenta" />
               </div>
               <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 bg-domin8-magenta/10 rounded-xl flex items-center justify-center border border-domin8-magenta/20">
                     <Calendar className="w-8 h-8 text-domin8-magenta" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white">THE BODY</h3>
                    <span className="text-sm font-mono text-domin8-magenta font-bold">(GoHighLevel)</span>
                  </div>
                   <div className="space-y-3">
                     {['CRM & Pipelines', 'Calendar Booking', 'Email/SMS Automation', 'Data Storage'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs font-mono text-gray-400">
                           <div className="w-1.5 h-1.5 bg-domin8-magenta rounded-full"></div> {item}
                        </div>
                     ))}
                  </div>
               </div>
               <div className="mt-auto pt-4 border-t border-white/5">
                  <p className="text-[10px] text-gray-500 font-mono">Executes actions in reality.</p>
               </div>
            </div>
          </div>

          {/* SECTION 2: BENTO GRID (FEATURES) */}
          <div className="space-y-8">
             <div className="text-center">
                <h3 className="text-xl font-display font-bold uppercase text-white">What Domin8 Chatbot Actually Does</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                   { icon: MessageSquare, title: 'Answers Questions', desc: 'Instantly answers FAQs using your business knowledge.', color: 'text-blue-400' },
                   { icon: UserCheck, title: 'Nurtures Leads', desc: 'Follows up intelligently based on user intent — not scripts.', color: 'text-green-400' },
                   { icon: Calendar, title: 'Books Appointments', desc: 'Checks availability and books only open time slots.', color: 'text-purple-400' },
                   { icon: Mail, title: 'Sends Verification', desc: 'Sends confirmations, reminders, and follow-ups automatically.', color: 'text-yellow-400' },
                   { icon: Database, title: 'Saves & Uses Data', desc: 'Saves conversation data and uses it in future interactions.', color: 'text-red-400' }
                ].map((item, i) => (
                   <div key={i} className="bg-[#080808] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group">
                      <div className={`w-10 h-10 rounded bg-white/5 flex items-center justify-center mb-4 ${item.color} group-hover:bg-white/10 transition-colors`}>
                         <item.icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-white font-bold font-mono text-sm mb-2">{item.title}</h4>
                      <p className="text-xs text-gray-500 font-mono leading-relaxed">{item.desc}</p>
                   </div>
                ))}
             </div>
          </div>

          {/* SECTION 3: FLOW DIAGRAM */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12">
             <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10"></div>

                {['Visitor Message', 'Domin8 Chatbot', 'Understands Intent', 'Takes Action', 'Saves Data', 'Follows Up'].map((step, i) => (
                   <div key={i} className="flex flex-col items-center gap-4 bg-[#080808] p-4 rounded-xl border border-white/5 z-10 w-full md:w-auto shadow-lg">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-mono text-white font-bold border border-white/10">
                         {i + 1}
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 uppercase text-center">{step}</span>
                   </div>
                ))}
             </div>
             <p className="text-center mt-12 text-xs font-mono text-gray-500 uppercase tracking-widest">
                This is not a chatbot. It’s a self-operating sales and support rep.
             </p>
          </div>

          {/* SECTION 4: COMPARISON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/5 pt-12">
             <div className="bg-[#050505] p-8 rounded-2xl border border-white/5 opacity-50 grayscale hover:opacity-75 transition-opacity">
                <h4 className="text-gray-400 font-bold font-mono uppercase mb-6 flex items-center gap-3">
                   <X className="w-5 h-5 text-gray-600" /> Basic Chat Widget
                </h4>
                <ul className="space-y-3 text-xs font-mono text-gray-600">
                   <li>• Static scripted answers</li>
                   <li>• Cannot book meetings</li>
                   <li>• Does not remember context</li>
                   <li>• Requires human takeover</li>
                </ul>
             </div>
             <div className="bg-[#111] p-8 rounded-2xl border border-electric-blue/30 shadow-[0_0_30px_rgba(0,123,255,0.1)]">
                <h4 className="text-white font-bold font-mono uppercase mb-6 flex items-center gap-3">
                   <Check className="w-5 h-5 text-neon-lime" /> Domin8 Chatbot
                </h4>
                <ul className="space-y-3 text-xs font-mono text-gray-300">
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-neon-lime rounded-full"></div> Dynamic AI reasoning</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-neon-lime rounded-full"></div> Real-time calendar booking</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-neon-lime rounded-full"></div> Infinite context memory</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-neon-lime rounded-full"></div> Fully autonomous</li>
                </ul>
             </div>
          </div>

          {/* CTA SECTION */}
          <div className="text-center pt-8 border-t border-white/10">
            <MagneticButton 
                onClick={handleCTA}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl hover:scale-105 duration-300 transform"
                strength={0.2}
            >
                <span className="text-sm font-mono uppercase tracking-widest">See if Domin8 Chatbot fits your business</span>
                <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <p className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest font-mono">
              Built inside the Domin8WithAI ecosystem
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Domin8ChatbotModal;