import React, { useState } from 'react';
import { Bot, Globe, Zap, Database } from 'lucide-react';
import Domin8AdsModal from './Domin8AdsModal';
import Domin8AIWebsiteModal from './Domin8AIWebsiteModal';
import Domin8ChatbotModal from './Domin8ChatbotModal';
import Domin8MemoryModal from './Domin8MemoryModal';

interface StorySectionProps {
  onApply?: () => void;
}

const StorySection: React.FC<StorySectionProps> = ({ onApply }) => {
  const [isAdsModalOpen, setIsAdsModalOpen] = useState(false);
  const [isWebModalOpen, setIsWebModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);

  // Phase 2: Deep Glassmorphism (bg-black/60, blur-24px, gradient border hint)
  const glassCardClasses = "relative bg-[rgba(10,10,10,0.6)] backdrop-blur-2xl rounded-[32px] overflow-hidden p-8 md:p-12 border border-white/5 hover:border-electric-blue/30 shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-500 group transform-gpu";
  
  // Ambient Glow for individual cards
  // OPTIMIZATION: Added translate-z-0 and will-change-transform
  const glowClasses = "absolute -inset-10 bg-gradient-to-br from-electric-blue/20 via-domin8-magenta/10 to-transparent opacity-0 blur-[50px] transition-opacity duration-500 group-hover:opacity-100 pointer-events-none translate-z-0 will-change-transform";

  return (
    <>
      <div className="md:col-span-12 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-black font-stretch-ultra uppercase text-white leading-tight">
          WELCOME TO THE ERA OF THE <br/>
          <span className="text-gradient-domin8">DIGITAL EMPLOYEE.</span>
        </h2>
      </div>

      {/* Card 1: The Marcus Chatbot */}
      <div className={`${glassCardClasses} md:col-span-8 pb-20 md:pb-12`}>
        <div className={glowClasses}></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
           <div className="p-4 bg-electric-blue/10 border border-electric-blue/20 rounded-2xl shadow-[0_0_15px_rgba(0,123,255,0.2)]">
             <Bot className="w-8 h-8 text-electric-blue" />
           </div>
           <div className="space-y-4">
             <h3 className="text-2xl md:text-3xl font-display font-black font-stretch-ultra uppercase text-white">
               The <span className="text-electric-blue">Marcus</span> Chatbot.
             </h3>
             <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-2xl">
               An OpenAI Brain with a GoHighLevel Body. Marcus qualifies leads, books appointments, and retrieves data—<span className="text-white font-bold">zero humans required.</span>
             </p>
           </div>
        </div>

        {/* INSIDE-CARD MICRO-CTA for Chatbot */}
        <button 
           onClick={() => setIsChatbotModalOpen(true)}
           className="absolute bottom-6 right-8 z-20 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-300 group/cta cursor-pointer flex items-center gap-2"
        >
           Domin8 Chatbot 
           <span className="transform group-hover/cta:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </div>

      {/* Spacer for Zig Zag Effect */}
      <div className="hidden md:block md:col-span-4"></div>

      {/* Spacer for Zig Zag Effect */}
      <div className="hidden md:block md:col-span-4"></div>

      {/* Card 2: Domin8 Memory (RAG) */}
      <div className={`${glassCardClasses} md:col-span-8 pb-20 md:pb-12`}>
        <div className="absolute -inset-10 bg-gradient-to-br from-domin8-cyan/20 via-blue-900/10 to-transparent opacity-0 blur-[50px] transition-opacity duration-500 group-hover:opacity-100 pointer-events-none translate-z-0 will-change-transform"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
           <div className="p-4 bg-domin8-cyan/10 border border-domin8-cyan/20 rounded-2xl shadow-[0_0_15px_rgba(0,255,255,0.2)]">
             <Database className="w-8 h-8 text-domin8-cyan" />
           </div>
           <div className="space-y-4">
             <h3 className="text-2xl md:text-3xl font-display font-black font-stretch-ultra uppercase text-white">
               Domin8 <span className="text-domin8-cyan">Memory™.</span>
             </h3>
             <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-2xl">
               Your AI’s Brain. Trained on <span className="text-white font-bold italic">Your</span> Business. Turn documents and data into an AI system that answers instantly—without hallucinations.
             </p>
           </div>
        </div>

        {/* INSIDE-CARD MICRO-CTA for Memory */}
        <button 
           onClick={() => setIsMemoryModalOpen(true)}
           className="absolute bottom-6 right-8 z-20 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-300 group/cta cursor-pointer flex items-center gap-2"
        >
           Explore Domin8 Memory 
           <span className="transform group-hover/cta:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </div>

      {/* Card 3: AI-First Websites */}
      <div className={`${glassCardClasses} md:col-span-8 pb-20 md:pb-12`}>
         <div className={glowClasses}></div>
         <div className="relative z-10 flex flex-col md:flex-row-reverse items-start gap-6 text-right md:text-left">
           <div className="p-4 bg-domin8-magenta/10 border border-domin8-magenta/20 rounded-2xl self-end md:self-start shadow-[0_0_15px_rgba(255,0,255,0.2)]">
             <Globe className="w-8 h-8 text-domin8-magenta" />
           </div>
           <div className="space-y-4 w-full">
             <h3 className="text-2xl md:text-3xl font-display font-black font-stretch-ultra uppercase text-white">
               AI-First <span className="text-domin8-magenta">Websites.</span>
             </h3>
             <p className="text-gray-400 font-mono text-sm leading-relaxed">
               Websites designed for the AI Age. Optimized for AI Citation and Structured Data so tools like ChatGPT recommend you first.
             </p>
           </div>
        </div>

        {/* INSIDE-CARD MICRO-CTA for AI Website */}
         <button 
           onClick={() => setIsWebModalOpen(true)}
           className="absolute bottom-6 left-8 md:left-auto md:right-8 z-20 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-300 group/cta cursor-pointer flex items-center gap-2"
         >
           Domin8 AI Website 
           <span className="transform group-hover/cta:translate-x-1 transition-transform duration-300">→</span>
         </button>
      </div>

       {/* Spacer for Zig Zag Effect */}
      <div className="hidden md:block md:col-span-4"></div>

      {/* Card 4: The Ad Launcher (Full Width) */}
      <div className={`${glassCardClasses} md:col-span-12 flex flex-col items-center text-center pb-20 md:pb-12`}>
         <div className={glowClasses}></div>
         <div className="relative z-10 max-w-3xl space-y-6">
            <div className="mx-auto p-4 bg-neon-lime/10 border border-neon-lime/20 rounded-2xl w-fit shadow-[0_0_15px_rgba(204,255,0,0.2)]">
              <Zap className="w-8 h-8 text-neon-lime" />
            </div>
            <h3 className="text-2xl md:text-4xl font-display font-black font-stretch-ultra uppercase text-white">
              The Ad <span className="text-neon-lime">Launcher.</span>
            </h3>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              Launch ads on Google, Meta, and TikTok in seconds with AI-generated targeting and creatives.
            </p>
         </div>

         {/* INSIDE-CARD MICRO-CTA for Domin8 Ads */}
         <button 
           onClick={() => setIsAdsModalOpen(true)}
           className="absolute bottom-6 right-8 z-20 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 group/cta cursor-pointer flex items-center gap-2"
         >
           Domin8 Ads™ 
           <span className="transform group-hover/cta:translate-x-1 transition-transform duration-300">→</span>
         </button>
      </div>

      <Domin8AdsModal 
        isOpen={isAdsModalOpen} 
        onClose={() => setIsAdsModalOpen(false)} 
        onApply={onApply}
      />

      <Domin8AIWebsiteModal 
        isOpen={isWebModalOpen} 
        onClose={() => setIsWebModalOpen(false)} 
        onApply={onApply}
      />

      <Domin8ChatbotModal
        isOpen={isChatbotModalOpen}
        onClose={() => setIsChatbotModalOpen(false)}
        onApply={onApply}
      />

      <Domin8MemoryModal
        isOpen={isMemoryModalOpen}
        onClose={() => setIsMemoryModalOpen(false)}
        onApply={onApply}
      />
    </>
  );
};

export default StorySection;