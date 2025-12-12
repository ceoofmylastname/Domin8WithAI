import React, { useEffect } from 'react';
import { X, Shield, Lock, Eye, Server, Mail, Phone } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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

  const sections = [
    {
      icon: Eye,
      title: "Data Ingestion Protocols",
      content: "We collect information you provide directly via our interface, specifically when using our 'Liquid Audit', 'Marcus Chatbot', or 'Lead Forms'. This includes identity signals (Name, Email, Phone) and business logic inputs (Revenue, Friction Points). We also utilize passive telemetry (Cookies, IP Address) to optimize system latency and security."
    },
    {
      icon: Server,
      title: "AI Processing & Gemini Integration",
      content: "Domin8WithAI utilizes Google's Gemini API and other Large Language Models (LLMs) to process your data. By using our services, you acknowledge that your inputs may be processed by these third-party neural networks to generate insights, audits, and content. We employ enterprise-grade encryption during transit."
    },
    {
      icon: Lock,
      title: "Data Sovereignty & Security",
      content: "We implement rigorous security measures designed to protect your data from unauthorized access, exfiltration, or modification. However, no digital transmission is impervious. We operate on a principle of 'Least Privilege'—access to your data is restricted to essential personnel and automated agents required to fulfill the service."
    },
    {
      icon: Shield,
      title: "Compliance & User Rights",
      content: "You retain the right to request an export of your data or a complete system purge (Deletion). To initiate a data subject request, please transmit a signal to our support channel. We adhere to applicable digital privacy frameworks."
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center md:px-4 md:py-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(5,5,5,0.95)] backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Full width sheet on mobile, centered card on desktop */}
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border-t md:border border-white/10 rounded-t-[32px] md:rounded-[32px] shadow-2xl flex flex-col h-[90vh] md:h-[85vh] animate-slide-up overflow-hidden">
        
        {/* Header - Fixed */}
        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-start bg-[#0f0f0f] flex-shrink-0 z-20">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-domin8-cyan animate-pulse"></div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-domin8-cyan">Legal Protocol 01</span>
             </div>
             <h2 className="text-2xl md:text-4xl font-display font-black uppercase text-white tracking-tight">
               Privacy <span className="text-gray-500">Protocol.</span>
             </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto cyber-scrollbar bg-[#0a0a0a] relative z-10">
           <div className="p-6 md:p-12 space-y-12 pb-32"> {/* Extra padding bottom */}
             <div className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
                <p className="font-mono text-sm text-gray-300 leading-relaxed">
                  <strong className="text-white">Domin8WithAI, LLC</strong> ("we", "our", or "us") is committed to protecting your digital footprint. 
                  Founded by Bonita Wilson, Esq., we operate at the intersection of aggressive growth and rigorous compliance. 
                  This protocol outlines how we handle your data within our ecosystem.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                     <div className="w-10 h-10 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center text-white">
                        <section.icon className="w-5 h-5" />
                     </div>
                     <h3 className="text-white font-bold font-mono text-sm uppercase">{section.title}</h3>
                     <p className="text-xs text-gray-500 font-mono leading-relaxed text-justify">
                        {section.content}
                     </p>
                  </div>
                ))}
             </div>

             {/* Contact Section */}
             <div className="border-t border-white/10 pt-8">
                <h3 className="text-white font-bold font-mono text-sm uppercase mb-6">Transmission Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="flex items-center gap-4 p-4 rounded-xl bg-[#111] border border-white/5 hover:border-domin8-cyan/30 transition-colors group">
                      <Mail className="w-5 h-5 text-gray-500 group-hover:text-domin8-cyan transition-colors" />
                      <div>
                         <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Digital Support</div>
                         <div className="text-white font-mono text-sm">support@domin8withai.com</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 rounded-xl bg-[#111] border border-white/5 hover:border-domin8-cyan/30 transition-colors group">
                      <Phone className="w-5 h-5 text-gray-500 group-hover:text-domin8-cyan transition-colors" />
                      <div>
                         <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Voice Line</div>
                         <div className="text-white font-mono text-sm">504-208-2121 <span className="text-gray-600 text-[10px]">(504-208-A1A1)</span></div>
                      </div>
                   </div>
                </div>
                <p className="mt-8 text-[10px] text-gray-600 font-mono uppercase tracking-widest text-center">
                   Last Updated: {new Date().toLocaleDateString()}
                </p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;