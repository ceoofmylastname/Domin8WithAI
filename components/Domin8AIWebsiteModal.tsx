import React, { useEffect } from 'react';
import { X, Code, Network, Cpu, ArrowRight, FileJson, Layout } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface Domin8AIWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
}

const Domin8AIWebsiteModal: React.FC<Domin8AIWebsiteModalProps> = ({ isOpen, onClose, onApply }) => {
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
              WEBSITES WERE BUILT FOR HUMANS. <br/>
              <span className="text-gradient-domin8">DOMIN8 AI WEBSITES ARE BUILT FOR MACHINES.</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xl mx-auto">
              If AI can’t understand your site, it can’t trust it. <br/>
              And if it can’t trust you — it won’t recommend you.
            </p>
          </div>

          {/* SECTION 1: VISUAL COMPARISON */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
             {/* LEFT: Traditional Website */}
             <div className="space-y-4 opacity-60 hover:opacity-100 transition-opacity duration-500 group">
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 h-64 relative overflow-hidden flex flex-col items-center justify-center space-y-3 transition-colors group-hover:border-white/20">
                   {/* Mock UI */}
                   <div className="w-32 h-4 bg-white/20 rounded"></div>
                   <div className="w-48 h-24 bg-white/5 rounded flex items-center justify-center border border-white/5">
                      <Layout className="w-8 h-8 text-white/20" />
                   </div>
                   <div className="w-24 h-2 bg-white/10 rounded"></div>
                   
                   {/* Floating Label */}
                   <div className="absolute top-4 left-4 bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wide">Front-End Only</div>
                   <div className="absolute bottom-4 right-4 bg-white/5 px-2 py-1 rounded text-[10px] font-mono text-gray-500">AI Status: Guessing</div>
                </div>
                <div className="text-center space-y-2">
                   <h3 className="text-white font-bold font-mono text-sm uppercase">Traditional Website</h3>
                   <p className="text-xs text-gray-500 font-mono">Most websites stop at visuals. <br/>AI sees content — not meaning.</p>
                </div>
             </div>

             {/* RIGHT: Domin8 AI Website */}
             <div className="space-y-4">
                <div className="bg-[#111] border border-electric-blue/30 rounded-2xl p-6 h-64 relative overflow-hidden flex flex-col items-center justify-center space-y-3 shadow-[0_0_30px_rgba(0,123,255,0.1)] hover:shadow-[0_0_40px_rgba(0,123,255,0.2)] transition-shadow group">
                   {/* Background Layer: Code/Nodes */}
                   <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                   <div className="absolute inset-0 flex items-center justify-center z-0">
                      <Network className="w-48 h-48 text-electric-blue/10 absolute animate-pulse-slow" />
                   </div>
                   
                   {/* Mock UI (Same as left but highlighted) */}
                   <div className="w-32 h-4 bg-electric-blue/40 rounded z-10 border border-electric-blue/20"></div>
                   <div className="w-48 h-24 bg-[#050505] rounded flex items-center justify-center z-10 border border-electric-blue/20">
                      <div className="grid grid-cols-2 gap-2 w-full p-2">
                         <div className="h-full bg-electric-blue/10 rounded"></div>
                         <div className="flex flex-col gap-2">
                            <div className="h-2 bg-white/10 rounded"></div>
                            <div className="h-2 bg-white/10 rounded"></div>
                         </div>
                      </div>
                   </div>
                   <div className="w-24 h-2 bg-white/20 rounded z-10"></div>
                   
                   {/* Indicators */}
                   <div className="absolute top-4 left-4 bg-neon-lime/10 text-neon-lime border border-neon-lime/20 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wide z-20">AI-Readable Infrastructure</div>
                   <div className="absolute bottom-4 right-4 bg-electric-blue/20 text-electric-blue border border-electric-blue/30 px-2 py-1 rounded text-[10px] font-mono z-20 flex items-center gap-2">
                      <Code className="w-3 h-3" /> Structured Data: Active
                   </div>
                </div>
                <div className="text-center space-y-2">
                   <h3 className="text-white font-bold font-mono text-sm uppercase text-gradient-domin8">Domin8 AI Website</h3>
                   <p className="text-xs text-gray-500 font-mono">AI doesn’t guess. <br/>It reads structure.</p>
                </div>
             </div>
          </div>

          {/* SECTION 2: WHAT MAKES IT AI-FIRST (BENTO) */}
          <div className="space-y-8">
             <div className="text-center">
                <h3 className="text-xl font-display font-bold uppercase text-white">Your Website Becomes a Knowledge Source.</h3>
                <p className="text-gray-400 font-mono text-xs mt-2">A Domin8 AI Website explains your business to machines — clearly, explicitly, and consistently.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                   <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mb-4 text-white">
                      <FileJson className="w-5 h-5" />
                   </div>
                   <h4 className="text-white font-bold font-mono text-sm mb-2">JSON-LD Schema</h4>
                   <p className="text-xs text-gray-500 font-mono leading-relaxed">
                      We explicitly tell AI who you are, what you do, and why you’re authoritative.
                   </p>
                </div>
                 {/* Card 2 */}
                <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                   <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mb-4 text-white">
                      <Network className="w-5 h-5" />
                   </div>
                   <h4 className="text-white font-bold font-mono text-sm mb-2">Entity Mapping</h4>
                   <p className="text-xs text-gray-500 font-mono leading-relaxed">
                      Your site becomes an entity, not a webpage. Services, locations, and FAQs are interlinked.
                   </p>
                </div>
                 {/* Card 3 */}
                <div className="bg-[#080808] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                   <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mb-4 text-white">
                      <Cpu className="w-5 h-5" />
                   </div>
                   <h4 className="text-white font-bold font-mono text-sm mb-2">AI Trust Signals</h4>
                   <p className="text-xs text-gray-500 font-mono leading-relaxed">
                      This is how AI decides who gets cited — and who gets ignored.
                   </p>
                </div>
             </div>
          </div>

          {/* SECTION 3: FLOW DIAGRAM (UPDATED: Horizontal Layout) */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
                {/* Connector Line for Desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10"></div>
                
                {/* Steps */}
                {[
                  { label: "Domin8 AI Website", highlight: false },
                  { label: "Structured Data", highlight: false },
                  { label: "Clear Meaning", highlight: false },
                  { label: "Trust Signals", highlight: false },
                  { label: "AI Recommendations", highlight: true }
                ].map((step, i) => (
                   <div key={i} className={`relative z-10 w-full md:w-auto text-center px-4 py-3 rounded-xl border text-[10px] font-mono font-bold uppercase transition-transform hover:scale-105 ${
                      step.highlight 
                      ? "bg-electric-blue/10 border-electric-blue/30 text-electric-blue shadow-[0_0_15px_rgba(0,123,255,0.2)]" 
                      : "bg-[#080808] border-white/10 text-gray-300"
                   }`}>
                      {step.label}
                   </div>
                ))}
             </div>
             <p className="mt-8 text-center text-xs font-mono text-gray-500 uppercase tracking-widest">
                Rankings are temporary. Understanding is permanent.
             </p>
          </div>

          {/* SECTION 4: TIMELINE */}
          <div className="border-t border-white/5 pt-12">
             <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                {/* Line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10"></div>
                
                <div className="bg-[#111] px-4 py-2 rounded-full border border-white/5 text-gray-600 text-[10px] font-mono uppercase">2010: SEO Era</div>
                <div className="bg-[#111] px-4 py-2 rounded-full border border-white/5 text-gray-500 text-[10px] font-mono uppercase">2023: AI Overview Era</div>
                <div className="bg-[#111] px-6 py-3 rounded-full border border-neon-lime/30 text-neon-lime text-xs font-mono uppercase font-bold shadow-[0_0_15px_rgba(204,255,0,0.1)]">Now: Citation Era</div>
             </div>
             <p className="text-center mt-6 text-gray-400 font-mono text-sm max-w-lg mx-auto">
                The web is moving from links to answers. <br/>
                Domin8 AI Websites are how you stay visible when clicks disappear.
             </p>
          </div>

          {/* FOOTER CTA */}
          <div className="text-center pt-8 border-t border-white/10">
            <MagneticButton 
                onClick={handleCTA}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl hover:scale-105 duration-300 transform"
                strength={0.2}
            >
                <span className="text-sm font-mono uppercase tracking-widest">See if your site is a Domin8 AI Website</span>
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

export default Domin8AIWebsiteModal;