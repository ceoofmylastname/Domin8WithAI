import React, { useRef, useState, useEffect } from 'react';
import BackgroundMesh from './components/BackgroundMesh';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import LiquidAudit from './components/LiquidAudit';
import BookingCTA from './components/BookingCTA';
import CustomCursor from './components/CustomCursor';
import MarcusChat from './components/MarcusChat';
import LeadFormModal from './components/LeadFormModal';
import AdminInterface from './components/AdminInterface';
import RainbowBorderButton from './components/RainbowBorderButton';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsModal from './components/TermsModal';
import { Section } from './types';
import { Sparkles, ArrowRight, Lock, Terminal, Zap } from 'lucide-react';
import Lenis from 'lenis';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Legal Modals State
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const storyRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const auditRef = useRef<HTMLDivElement>(null);

  // Initialize Liquid Scrolling (Lenis)
  useEffect(() => {
    // Only run Lenis if not in admin mode (Admin has its own internal scrolling)
    if (isAdminMode) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isAdminMode]);

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  // Phase 2: Deep Glassmorphism + Cyber Glow
  const glassCardClasses = "relative bg-[rgba(10,10,10,0.6)] backdrop-blur-2xl rounded-[40px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)] border border-white/5 hover:border-electric-blue/30 transition-colors duration-500 transform-gpu";
  
  // Ambient Light
  const glowClasses = "absolute -inset-10 bg-gradient-to-r from-electric-blue via-domin8-magenta to-domin8-cyan opacity-10 blur-[60px] animate-pulse-slow pointer-events-none rounded-[40px] translate-z-0 will-change-transform";

  // ADMIN MODE RENDER
  if (isAdminMode) {
    return (
      <>
        <CustomCursor />
        <AdminInterface onLogout={() => setIsAdminMode(false)} />
      </>
    );
  }

  // LANDING PAGE RENDER
  return (
    <div className="relative min-h-screen font-mono selection:bg-neon-lime selection:text-black bg-cyber-black text-gray-200">
      <CustomCursor />
      <BackgroundMesh />
      <MarcusChat />
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

      {/* Sticky Navigation / Brand */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-8 md:py-8 flex justify-between items-center pointer-events-none">
        <div className="text-xl md:text-2xl font-black tracking-tighter pointer-events-auto font-display font-stretch-ultra italic cursor-hover mix-blend-difference text-white">
          Domin8WithAI<span className="text-neon-lime not-italic font-sans">.</span>
        </div>

        {/* Launch Interactive Demo Button - Top Right */}
        <div className="pointer-events-auto">
          <RainbowBorderButton onClick={() => setIsAdminMode(true)}>
             <div className="flex items-center gap-2.5">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-lime"></span>
               </span>
               <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-gray-200 group-hover:text-white transition-colors">
                 Launch Interactive Demo
               </span>
               <Terminal className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-neon-lime transition-colors" />
             </div>
          </RainbowBorderButton>
        </div>
      </nav>

      <main className="relative z-10 p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 max-w-[1800px] mx-auto">
        
        {/* SECTION 1: TOFU (Hero) - Full Width */}
        <div className={`md:col-span-12 ${glassCardClasses} min-h-[92vh] flex flex-col justify-center group`}>
          <div className={glowClasses}></div>
          <div className="relative z-10">
            <Hero onStart={scrollToStory} onApply={handleApplyClick} />
          </div>
        </div>

        {/* SECTION 2: MOFU (Story/Method) - Zig Zag Grid */}
        <div ref={storyRef} className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 pb-4">
           <StorySection onApply={handleApplyClick} />
        </div>

        {/* SECTION 3: BOFU (Offer) - Full Width */}
        <div ref={offerRef} className={`md:col-span-12 ${glassCardClasses} group py-12`}>
          <div className={glowClasses}></div>
          <BookingCTA onApply={handleApplyClick} />
        </div>

        {/* SECTION 4: DEMO SHOWCASE (Formerly Audit Tool) - Full Width */}
        <div ref={auditRef} className={`md:col-span-12 ${glassCardClasses} group mt-4 mb-8`}>
           <div className={glowClasses}></div>
           <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
           {/* Transformed LiquidAudit into Demo Launcher */}
           <LiquidAudit onLaunchDemo={() => setIsAdminMode(true)} />
        </div>

        <footer className="md:col-span-12 py-16 text-center text-gray-600 relative">
          
          <div className="flex items-center justify-center gap-2 mb-2 text-[10px] uppercase tracking-widest">
             <Sparkles className="w-3 h-3 text-neon-lime" />
             <span>Powered by Gemini 2.5 Flash</span>
          </div>
          <div className="mb-6 text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Domin8WithAI. All Rights Reserved.
          </div>
          
          {/* Legal Links */}
          <div className="flex items-center justify-center gap-6 mb-12 text-[10px] font-mono uppercase tracking-widest text-gray-500">
             <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors cursor-pointer hover:underline decoration-neon-lime underline-offset-4">Privacy Protocol</button>
             <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors cursor-pointer hover:underline decoration-neon-lime underline-offset-4">Terms of Engagement</button>
          </div>
          
          {/* Interactive Tools Access - Updated */}
          <div className="max-w-xl mx-auto border-t border-white/5 pt-12 space-y-6">
            <p className="text-[11px] font-mono text-gray-400 leading-relaxed max-w-md mx-auto">
              Try the interactive tools below. <br/>
              <span className="text-gray-500">We can build pretty much anything and make it as custom as needed.</span>
            </p>

            <button 
              onClick={() => setIsAdminMode(true)}
              className="group flex items-center gap-3 mx-auto px-6 py-3 bg-[#0a0a0a] hover:bg-[#111] border border-white/10 hover:border-neon-lime/30 rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(204,255,0,0.1)]"
            >
              <div className="p-1.5 bg-white/5 rounded-full group-hover:bg-neon-lime/10 transition-colors">
                 <Terminal className="w-3 h-3 text-gray-400 group-hover:text-neon-lime transition-colors" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                Launch Interactive Demo
              </span>
              <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-neon-lime group-hover:translate-x-1 transition-all" />
            </button>
          </div>

        </footer>
      </main>
    </div>
  );
};

export default App;