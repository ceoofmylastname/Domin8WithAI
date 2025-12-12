import React from 'react';
import { ArrowRight, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface HeroProps {
  onStart: () => void;
  onApply: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onApply }) => {
  return (
    <section className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 md:px-6 py-20 overflow-hidden">
      
      <div className="space-y-10 max-w-[1200px] relative z-10 flex flex-col items-center">
        {/* Top Tag - High Tech Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-mono tracking-widest uppercase text-neon-lime animate-slide-up opacity-0">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-lime"></span>
            </span>
            System Online: AI-First Architecture
        </div>

        {/* Headline - Category Defining */}
        <h1 className="flex flex-col items-center justify-center font-display font-black font-stretch-ultra uppercase text-white tracking-tight text-center">
          
          {/* LINE 1: DOMIN8 THE MARKET - Massive + Animated Slash */}
          <div className="relative inline-block opacity-0 animate-slide-up delay-100">
             <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] relative z-10">
               Domin8 the Market.
             </span>
             
             {/* Modern Precision Cut Slash (SVG) - Rounded & Faded - STRAIGHTENED & LOWERED */}
             <div className="absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2 w-[115%] h-32 z-0 pointer-events-none mix-blend-screen flex items-center justify-center">
                <svg 
                  viewBox="0 0 600 120" 
                  preserveAspectRatio="none" 
                  className="w-full h-full overflow-visible opacity-90"
                >
                  <defs>
                    <linearGradient id="slashGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                       <stop offset="0%" stopColor="#007BFF" />
                       <stop offset="50%" stopColor="#FF00FF" />
                       <stop offset="100%" stopColor="#CCFF00" />
                    </linearGradient>
                    
                    {/* Soft Taper Mask - Extended Fade for Seamless Blend */}
                    <mask id="taperMask">
                       <rect x="0" y="0" width="100%" height="100%" fill="black" />
                       <linearGradient id="lFade" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0%" stopColor="black" />
                          <stop offset="10%" stopColor="black" />
                          <stop offset="40%" stopColor="white" />
                          <stop offset="60%" stopColor="white" />
                          <stop offset="90%" stopColor="black" />
                          <stop offset="100%" stopColor="black" />
                       </linearGradient>
                       <rect x="0" y="0" width="100%" height="100%" fill="url(#lFade)" />
                    </mask>

                    {/* Noise Filter */}
                    <filter id="grainyNoise">
                       <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                       <feColorMatrix type="saturate" values="0" />
                       <feComponentTransfer>
                           <feFuncA type="linear" slope="0.4" />
                       </feComponentTransfer>
                       <feComposite operator="in" in2="SourceGraphic" result="monoNoise"/>
                       <feBlend in="SourceGraphic" in2="monoNoise" mode="overlay" />
                    </filter>
                  </defs>

                  {/* Horizontal Group (No Rotation) */}
                  <g>
                      {/* The Slash Shape - Horizontal Swell */}
                      <path 
                        d="M 20,60 Q 300,48 580,60 Q 300,72 20,60 Z" 
                        fill="url(#slashGradient)"
                        mask="url(#taperMask)"
                        filter="url(#grainyNoise)"
                        className="animate-slash-in origin-center drop-shadow-[0_0_15px_rgba(0,123,255,0.5)]"
                      />
                      
                      {/* Shimmer Overlay - Single Pass */}
                      <rect 
                         x="0" y="40" width="200" height="40" 
                         fill="white" 
                         opacity="0.6"
                         mask="url(#taperMask)"
                         className="animate-shimmer-slide delay-[1000ms]"
                         style={{ 
                            mixBlendMode: 'overlay', 
                            filter: 'blur(8px)',
                            clipPath: 'path("M 20,60 Q 300,48 580,60 Q 300,72 20,60 Z")'
                         }}
                      />
                  </g>
                </svg>
             </div>
          </div>

          {/* LINE 2: MIXED SIZING */}
          <div className="block mt-6 md:mt-8 opacity-0 animate-slide-up delay-300">
             <span className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-400 mr-2 md:mr-3 align-baseline tracking-widest">
               BECOME THE
             </span>
             <span className="text-4xl md:text-6xl lg:text-7xl text-gradient-domin8 animate-flow bg-[length:200%_auto] distort-hover align-baseline">
               AUTHORITY
             </span>
             <span className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-400 ml-2 md:ml-3 align-baseline tracking-widest">
               AI TRUSTS.
             </span>
          </div>
        </h1>

        {/* Subheadline - High Trust & Clarity */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-sans font-light leading-relaxed opacity-0 animate-slide-up delay-500 mt-2">
          AI-First Websites, Ads, and Chatbots engineered to rank higher, convert faster,
          and train AI systems to trust your brand as the source.
        </p>

        {/* Buttons - Primary & Secondary Hierarchy */}
        <div className="flex flex-col md:flex-row items-center gap-6 pt-8 opacity-0 animate-slide-up delay-500 w-full justify-center">
          {/* Primary CTA: Action */}
          <MagneticButton 
            onClick={onApply}
            strength={0.3}
            className="group relative px-10 py-5 bg-white text-black overflow-hidden transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,123,255,0.5)] hover:scale-105"
          >
            <span className="relative z-10 text-sm font-bold uppercase tracking-widest font-sans flex items-center gap-2">
              Domin8 the Market
            </span>
          </MagneticButton>

          {/* Secondary CTA: Discovery */}
          <button 
            onClick={onStart}
            className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors px-6 py-4 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5"
          >
            See the Ecosystem 
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust Signals - Social Proof */}
        <div className="pt-12 flex flex-wrap justify-center gap-6 md:gap-12 opacity-0 animate-slide-up delay-500 text-gray-500">
           <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide">
              <Zap className="w-4 h-4 text-electric-blue" />
              <span>AI-Optimized Speed</span>
           </div>
           <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-neon-lime" />
              <span>Verified Trust Signals</span>
           </div>
           <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wide">
              <CheckCircle className="w-4 h-4 text-domin8-magenta" />
              <span>Conversion Focused</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;