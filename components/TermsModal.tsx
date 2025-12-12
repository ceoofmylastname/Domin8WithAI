import React, { useEffect } from 'react';
import { X, Scale, AlertTriangle, Zap, Copyright, CheckCircle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
                <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse"></div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neon-lime">Legal Protocol 02</span>
             </div>
             <h2 className="text-2xl md:text-4xl font-display font-black uppercase text-white tracking-tight">
               Terms of <span className="text-gray-500">Engagement.</span>
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
        <div className="flex-1 overflow-y-auto cyber-scrollbar bg-[#0a0a0a] relative z-10 font-mono">
           <div className="p-6 md:p-12 space-y-10 pb-32"> {/* Extra padding bottom */}
             
             {/* Intro Clause */}
             <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-white font-bold text-sm uppercase">
                   <Scale className="w-4 h-4 text-neon-lime" /> 1. The Agreement
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed text-justify">
                   By accessing the Domin8WithAI ecosystem, utilizing our "Liquid Audit" tools, or engaging our AI agents, you agree to be bound by these Terms. 
                   These services are provided by <strong>Domin8WithAI, LLC</strong>. If you do not agree to these protocols, you must disconnect immediately.
                </p>
             </div>

             {/* AI Disclaimer - Critical given the Lawyer Founder */}
             <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6 space-y-3">
                <h3 className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase">
                   <AlertTriangle className="w-4 h-4" /> 2. AI Disclaimer & No Legal Advice
                </h3>
                <p className="text-xs text-red-200/70 leading-relaxed text-justify">
                   While Domin8WithAI is founded by Bonita Wilson, Esq., <strong>this platform provides technological solutions, not legal advice.</strong> 
                   Our AI agents (including Marcus), audits, and generated content are outputs of probabilistic machine learning models. 
                   They should not be relied upon as a substitute for professional legal, financial, or business advice. 
                   Implementation of AI systems within your business is at your own risk.
                </p>
             </div>

             {/* Services */}
             <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-white font-bold text-sm uppercase">
                   <Zap className="w-4 h-4 text-neon-lime" /> 3. Nature of Services
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed text-justify">
                   We provide "Applied AI" consulting, automation architecture, and software integration. 
                   Results (Revenue, ROI, Conversion Rates) presented in case studies are illustrative of specific client outcomes and are not guaranteed. 
                   Your results will vary based on your business logic, market conditions, and execution.
                </p>
             </div>

             {/* IP Rights */}
             <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-white font-bold text-sm uppercase">
                   <Copyright className="w-4 h-4 text-neon-lime" /> 4. Intellectual Property
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed text-justify">
                   The architecture, code, design ("Cyber-Liquid" UI), and proprietary prompting methodologies contained within this site are the exclusive property of Domin8WithAI, LLC. 
                   Unauthorized replication of our system logic or interface is strictly prohibited.
                </p>
             </div>

             {/* Termination */}
             <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-white font-bold text-sm uppercase">
                   <CheckCircle className="w-4 h-4 text-neon-lime" /> 5. Termination & Access
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed text-justify">
                   We reserve the right to terminate access to our tools (including API-connected services) for any user attempting to reverse-engineer our models, inject malicious prompts, or use our systems for unethical purposes.
                </p>
             </div>

             <div className="pt-8 border-t border-white/10 text-center">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                   Domin8WithAI, LLC <br/>
                   New Orleans, LA <br/>
                   <span className="text-neon-lime">System Operational</span>
                </p>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;