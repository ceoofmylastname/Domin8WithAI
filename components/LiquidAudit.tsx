import React from 'react';
import { Terminal, Database, Image as ImageIcon, Film, MessageSquare, Mic, ArrowRight, Cpu, Layers } from 'lucide-react';
import RainbowBorderButton from './RainbowBorderButton';

interface LiquidAuditProps {
  onLaunchDemo: () => void;
  onComplete?: () => void; // Kept for type compatibility if needed
}

const LiquidAudit: React.FC<LiquidAuditProps> = ({ onLaunchDemo }) => {
  
  const features = [
    { icon: Database, label: "Knowledge RAG", desc: "Chat with your business data" },
    { icon: ImageIcon, label: "Image Mutation", desc: "Generative brand assets" },
    { icon: Film, label: "Motion Lab", desc: "Text-to-Video synthesis" },
    { icon: MessageSquare, label: "Sales Agents", desc: "Autonomous closing bots" },
    { icon: Mic, label: "Voice Synthesis", desc: "Human-like voice interaction" },
    { icon: Terminal, label: "Custom Tools", desc: "Engineered for your workflow" },
  ];

  return (
    <section className="relative z-10 py-12 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left: The Pitch */}
        <div className="space-y-8 md:space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-lime/10 border border-neon-lime/20 text-[10px] md:text-xs font-mono tracking-widest uppercase text-neon-lime animate-pulse-slow">
             <div className="w-1.5 h-1.5 bg-neon-lime rounded-full"></div>
             Domin8 Demo Environment
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase text-white leading-[0.9]">
            WE BUILD <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">THE IMPOSSIBLE.</span>
          </h2>
          
          <div className="space-y-6">
            <p className="text-gray-400 text-sm md:text-base font-mono leading-relaxed max-w-xl border-l-2 border-electric-blue pl-6">
              This isn't just a website. It's a preview of a <strong>Custom AI Operating System</strong>. 
              We engineer bespoke tools that allow you to write copy, generate studio-quality images, render video, and query your database—all from one command center.
            </p>
            <p className="text-gray-500 text-xs md:text-sm font-mono leading-relaxed max-w-xl pl-6">
              Click below to access the <strong>Admin Interface</strong> and test our generative engines live.
            </p>
          </div>

          <div className="pt-4">
             <RainbowBorderButton onClick={onLaunchDemo} className="w-full md:w-auto">
                 <div className="flex items-center gap-3 px-4 md:px-8 py-2">
                   <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-white">
                     Launch Interactive Demo
                   </span>
                   <ArrowRight className="w-4 h-4 text-neon-lime group-hover:translate-x-1 transition-transform" />
                 </div>
             </RainbowBorderButton>
          </div>
        </div>

        {/* Right: The Grid Visualization */}
        <div className="relative">
           {/* Decorative Background Elements */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-electric-blue/10 via-domin8-magenta/10 to-transparent blur-[60px] rounded-full pointer-events-none"></div>
           
           <div className="grid grid-cols-2 gap-4 relative z-10">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="group bg-[#0a0a0a]/40 backdrop-blur-md border border-white/5 hover:border-white/20 p-6 rounded-3xl flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-mono text-sm uppercase mb-1">{feature.label}</h3>
                    <p className="text-[10px] text-gray-500 font-mono leading-tight">{feature.desc}</p>
                  </div>
                </div>
              ))}

              {/* Central Processor Node (Visual Only) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-black border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,123,255,0.3)] z-20 hidden md:flex animate-pulse-slow">
                 <Cpu className="w-10 h-10 text-white" />
                 <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-20"></div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default LiquidAudit;