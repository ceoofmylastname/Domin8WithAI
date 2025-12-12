import React, { useEffect } from 'react';
import { X, Database, BrainCircuit, Search, FileText, ArrowRight, ShieldCheck, Server, Layers, Lightbulb } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface Domin8MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
}

const Domin8MemoryModal: React.FC<Domin8MemoryModalProps> = ({ isOpen, onClose, onApply }) => {
  // Disable background scroll when modal is open
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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(10,10,10,0.85)] backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[rgba(10,10,10,0.95)] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh] my-4">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto no-scrollbar flex-1 p-8 md:p-12 space-y-16">
          
          {/* HERO */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-domin8-cyan/10 border border-domin8-cyan/20 text-[10px] md:text-xs font-mono tracking-widest uppercase text-domin8-cyan mb-2">
              <BrainCircuit className="w-3 h-3" /> Retrieval-Augmented Generation (RAG)
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white leading-[0.95]">
              AI THAT ACTUALLY <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-domin8-cyan to-blue-600">KNOWS YOUR BUSINESS.</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xl mx-auto">
              Domin8 Memory is a <strong>RAG System</strong>. It reads, understands, and retrieves answers directly from your real business data in real time.
            </p>
          </div>

          {/* EDUCATION SECTION: PROBLEM VS SOLUTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="bg-[#151111] border border-red-500/10 rounded-2xl p-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <X className="w-32 h-32 text-red-500" />
               </div>
               <h3 className="text-red-400 font-bold font-mono uppercase mb-4 flex items-center gap-2">
                  <X className="w-4 h-4" /> The Problem With Normal AI
               </h3>
               <p className="text-gray-400 text-xs font-mono mb-4">Most AI tools are amnesiacs. They guess, hallucinate, and forget context.</p>
               <ul className="space-y-3">
                  {['Guesses Answers', 'Hallucinates Facts', 'No Access to Private Data', 'Inconsistent Responses'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-mono text-gray-500">
                      <div className="w-1.5 h-1.5 bg-red-900 rounded-full"></div> {item}
                    </li>
                  ))}
               </ul>
            </div>

            {/* The Solution */}
            <div className="bg-[#051115] border border-domin8-cyan/20 rounded-2xl p-8 relative overflow-hidden group shadow-[0_0_30px_rgba(0,255,255,0.05)]">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Database className="w-32 h-32 text-domin8-cyan" />
               </div>
               <h3 className="text-domin8-cyan font-bold font-mono uppercase mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> What Domin8 Memory Does
               </h3>
               <p className="text-gray-400 text-xs font-mono mb-4">RAG = Retrieval + Generation. We index your brain.</p>
               <ul className="space-y-3">
                  {[
                    'Uploads Data (PDFs, SOPs)', 
                    'Indexes Meaning (Not Keywords)', 
                    'Retrieves Exact Info', 
                    'Zero Hallucinations'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-mono text-gray-300">
                      <div className="w-1.5 h-1.5 bg-domin8-cyan rounded-full"></div> {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* VISUAL DIAGRAM */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-center text-xl font-display font-bold uppercase text-white">The Logic Flow</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Traditional Flow */}
               <div className="flex flex-col items-center justify-center gap-4 opacity-50 grayscale">
                  <span className="text-[10px] font-mono uppercase text-gray-500 mb-2">Traditional AI</span>
                  <div className="flex items-center gap-2 w-full justify-center">
                     <div className="bg-[#111] px-3 py-2 rounded border border-white/10 text-xs font-mono text-gray-400">User</div>
                     <ArrowRight className="w-4 h-4 text-gray-600" />
                     <div className="bg-[#111] px-3 py-2 rounded border border-white/10 text-xs font-mono text-gray-400">AI Model</div>
                     <ArrowRight className="w-4 h-4 text-gray-600" />
                     <div className="bg-red-900/20 px-3 py-2 rounded border border-red-500/20 text-xs font-mono text-red-400">Guess ❓</div>
                  </div>
               </div>

               {/* Domin8 Flow */}
               <div className="flex flex-col items-center justify-center gap-4">
                  <span className="text-[10px] font-mono uppercase text-domin8-cyan mb-2">Domin8 Memory (RAG)</span>
                  <div className="flex items-center gap-2 w-full justify-center flex-wrap">
                     <div className="bg-[#111] px-3 py-2 rounded border border-white/10 text-xs font-mono text-white">User</div>
                     <ArrowRight className="w-4 h-4 text-gray-500" />
                     <div className="bg-[#111] px-3 py-2 rounded border border-white/10 text-xs font-mono text-white">AI Model</div>
                     <ArrowRight className="w-4 h-4 text-domin8-cyan" />
                     <div className="bg-domin8-cyan/10 px-3 py-2 rounded border border-domin8-cyan/30 text-xs font-mono text-domin8-cyan flex items-center gap-2">
                        <Database className="w-3 h-3" /> Your Data
                     </div>
                     <ArrowRight className="w-4 h-4 text-domin8-cyan" />
                     <div className="bg-green-900/20 px-3 py-2 rounded border border-green-500/20 text-xs font-mono text-green-400">Fact ✅</div>
                  </div>
               </div>
            </div>
          </div>

          {/* FEATURES / WHY WE CALL IT MEMORY */}
          <div className="space-y-8">
             <div className="text-center">
                <h3 className="text-xl font-display font-bold uppercase text-white">Why "Memory"?</h3>
                <p className="text-gray-400 font-mono text-xs mt-2">It's not just storage. It's active intelligence.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                   { icon: Layers, title: 'Context Aware', desc: 'Remembers past interactions and policies.' },
                   { icon: FileText, title: 'Doc Trained', desc: 'Reads PDFs, CSVs, and internal wikis.' },
                   { icon: Server, title: 'Live Update', desc: 'Update a doc, and the AI knows instantly.' },
                   { icon: Lightbulb, title: 'On Brand', desc: 'Speaks using your specific terminology.' },
                ].map((item, i) => (
                   <div key={i} className="bg-[#080808] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors text-center">
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mb-4 text-white mx-auto">
                         <item.icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-white font-bold font-mono text-sm mb-2">{item.title}</h4>
                      <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
                         {item.desc}
                      </p>
                   </div>
                ))}
             </div>
          </div>

          {/* ECOSYSTEM CONNECTION */}
          <div className="border-t border-white/5 pt-12">
             <h3 className="text-sm font-mono uppercase text-gray-500 mb-6 text-center">Domin8 Memory Powers The Entire Ecosystem</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-electric-blue/5 border border-electric-blue/10">
                   <h4 className="text-electric-blue font-bold font-mono text-xs mb-2">Marcus Chatbot</h4>
                   <p className="text-[10px] text-gray-400 font-mono">Answers leads using real company knowledge, pricing, and FAQs.</p>
                </div>
                <div className="p-4 rounded-xl bg-domin8-magenta/5 border border-domin8-magenta/10">
                   <h4 className="text-domin8-magenta font-bold font-mono text-xs mb-2">AI Websites</h4>
                   <p className="text-[10px] text-gray-400 font-mono">Provides structured knowledge for AI citation and SEO.</p>
                </div>
                <div className="p-4 rounded-xl bg-neon-lime/5 border border-neon-lime/10">
                   <h4 className="text-neon-lime font-bold font-mono text-xs mb-2">Ad Launcher</h4>
                   <p className="text-[10px] text-gray-400 font-mono">Trains ad copy on your best performing offers and objections.</p>
                </div>
             </div>
          </div>

          {/* ENTERPRISE & USE CASES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
             <div className="space-y-4">
                <h4 className="text-white font-bold font-mono text-sm uppercase flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4 text-gray-400" /> Enterprise Grade
                </h4>
                <ul className="space-y-2 text-xs font-mono text-gray-500">
                   <li>• Private Data (Never Public)</li>
                   <li>• No Training OpenAI on your content</li>
                   <li>• Version-controlled memory</li>
                   <li>• Instant updates</li>
                </ul>
             </div>
             <div className="space-y-4">
                <h4 className="text-white font-bold font-mono text-sm uppercase flex items-center gap-2">
                   <Search className="w-4 h-4 text-gray-400" /> Use Cases
                </h4>
                <div className="flex flex-wrap gap-2">
                   {['Customer Support', 'Sales Enablement', 'SOP Bot', 'Compliance AI', 'Legal/Medical'].map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] font-mono text-gray-400">
                         {tag}
                      </span>
                   ))}
                </div>
             </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8 border-t border-white/10">
            <MagneticButton 
                onClick={handleCTA}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl hover:scale-105 duration-300 transform"
                strength={0.2}
            >
                <span className="text-sm font-mono uppercase tracking-widest">Activate Domin8 Memory</span>
                <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <p className="mt-4 text-[10px] text-gray-600 font-mono italic">
              "AI without memory is noise. Domin8 Memory is intelligence."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Domin8MemoryModal;