import React, { useEffect } from 'react';
import { X, Globe, Facebook, Instagram, Video, ArrowRight, Target, Zap, TrendingUp, Layers } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface Domin8AdsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
}

const Domin8AdsModal: React.FC<Domin8AdsModalProps> = ({ isOpen, onClose, onApply }) => {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-white leading-[0.9]">
                STOP GUESSING. <br/>
                <span className="text-gray-500">START SCALING.</span>
              </h2>
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                Launch pro-level campaigns across every major platform in seconds. <br/>
                No media buyer required. Just pure, algorithmic dominance.
              </p>
            </div>

            {/* VISUAL PLATFORM SECTION */}
            <div className="relative h-64 flex items-center justify-center perspective-1000">
                <div className="grid grid-cols-2 gap-4 transform rotate-y-6 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-500 ease-out">
                    {/* Google */}
                    <div className="w-32 h-24 bg-[#151515] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/5 transition-colors shadow-lg">
                        <Globe className="w-6 h-6 text-white" />
                        <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
                           <div className="w-2/3 h-full bg-blue-500"></div>
                        </div>
                    </div>
                     {/* Meta */}
                    <div className="w-32 h-24 bg-[#151515] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/5 transition-colors shadow-lg mt-8">
                        <Facebook className="w-6 h-6 text-white" />
                        <div className="flex gap-1">
                           <div className="w-2 h-2 rounded-full bg-white/10"></div>
                           <div className="w-2 h-2 rounded-full bg-white/10"></div>
                        </div>
                    </div>
                     {/* Instagram */}
                    <div className="w-32 h-24 bg-[#151515] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/5 transition-colors shadow-lg -mt-8">
                        <Instagram className="w-6 h-6 text-white" />
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/5"></div>
                    </div>
                     {/* TikTok */}
                    <div className="w-32 h-24 bg-[#151515] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/5 transition-colors shadow-lg">
                        <Video className="w-6 h-6 text-white" />
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 mx-auto"></div>
                    </div>
                </div>
            </div>
          </div>

          {/* WHAT IS IT SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/[0.02] rounded-3xl p-8 border border-white/5">
             {/* Visual Dashboard Mock */}
             <div className="order-2 lg:order-1 relative group">
                <div className="bg-black border border-white/10 rounded-xl p-6 shadow-2xl space-y-4 relative z-10">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                        </div>
                        <div className="text-[9px] font-mono text-neon-lime uppercase tracking-widest">Live</div>
                    </div>
                    <div className="flex items-end gap-3 h-32 px-2">
                        {[35, 60, 45, 80, 50, 95, 75].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/10 rounded-t-sm hover:bg-white/20 transition-colors relative group/bar" style={{height: `${h}%`}}>
                               <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-white opacity-0 group-hover/bar:opacity-100 transition-opacity font-mono">{h}%</div>
                            </div>
                        ))}
                    </div>
                    <div className="h-px w-full bg-white/10"></div>
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                       <span>Ad Spend</span>
                       <span>Revenue</span>
                    </div>
                </div>
             </div>

             <div className="order-1 lg:order-2 space-y-6">
                <h3 className="text-2xl font-display font-bold text-white uppercase">Marketing Superpowers <br/><span className="text-gray-500">on Autopilot.</span></h3>
                <p className="text-gray-400 font-mono text-xs leading-relaxed">
                    Domin8 Ads is your unfair advantage.
                    It’s not just a tool — it’s an AI Media Buyer that launches, tests, and optimizes campaigns 24/7.
                </p>
                <ul className="space-y-3">
                    {['Launch Instantly', 'No Experience Needed', 'Unified "God Mode" Dashboard'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-mono text-white">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            {item}
                        </li>
                    ))}
                </ul>
             </div>
          </div>

          {/* AI STACK SECTION */}
          <div className="space-y-8">
            <h3 className="text-center text-xl font-display font-bold uppercase text-white">The Domin8 AI Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { title: 'AI-Generated Targeting 🎯', desc: 'Predictive audience matching visuals', icon: Target },
                    { title: 'Instant Creative Generation 🎨', desc: 'Ad copy & creative variants visualized', icon: Layers },
                    { title: 'Dynamic Testing (A/B/Z) 🧪', desc: 'Branching test paths with winners highlighted', icon: Zap },
                    { title: 'Smart Budget Optimization 💰', desc: 'Budget flowing toward top performers', icon: TrendingUp },
                ].map((item, i) => (
                    <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-6 flex items-start gap-4 hover:border-white/20 transition-colors">
                        <div className="p-3 rounded-xl bg-white/5 text-white">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold font-mono text-sm">{item.title}</h4>
                            <p className="text-xs text-gray-500 font-mono mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* CTA SECTION */}
          <div className="text-center pt-8 border-t border-white/10">
            <MagneticButton 
                onClick={handleCTA}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl hover:scale-105 duration-300 transform"
                strength={0.2}
            >
                <span className="text-sm font-mono uppercase tracking-widest">See if Domin8 Ads fits your business</span>
                <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Domin8AdsModal;