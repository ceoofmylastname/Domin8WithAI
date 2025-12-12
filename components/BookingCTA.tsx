import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Quote } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface BookingCTAProps {
  onApply: () => void;
}

const testimonials = [
  {
    text: "Revenue doubled in 30 days. The AI appointment setter is terrifyingly good.",
    author: "Alex V., SaaS Founder",
    role: "Scale: $50k/mo → $110k/mo"
  },
  {
    text: "We fired our lead gen agency. Domin8's ads perform better and cost zero management fees.",
    author: "Sarah J., E-com Director",
    role: "Saved: $5k/mo in fees"
  },
  {
    text: "The liquid audit found $40k/mo in leaked leads. Fixed it in a week.",
    author: "Marcus R., Agency Owner",
    role: "Recovered: 15% Conversion Rate"
  }
];

const BookingCTA: React.FC<BookingCTAProps> = ({ onApply }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stackItems = [
    "Custom Automation Pipelines (N8N + Supabase)",
    "Marcus Chatbot Integration",
    "AI Ad Launcher Setup",
    "24/7 Lead Gen Architecture"
  ];

  return (
    <section className="relative z-10 py-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-5xl space-y-12 w-full">
        
        {/* Headline */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black font-stretch-ultra uppercase text-white leading-[0.9]">
          READY TO <br/>
          <span className="text-gradient-domin8 distort-hover">
            BUILD YOUR MACHINE?
          </span>
        </h2>

        {/* The Offer Container - Clean Glass Card */}
        <div className="relative group">
          {/* Ambient glow removed as per request */}
          
          <div className="relative bg-[rgba(10,10,10,0.9)] p-8 md:p-10 rounded-[32px] backdrop-blur-md max-w-2xl mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 hover:border-white/20 transition-colors">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold mb-8 border-b border-white/10 pb-4">
              /// Domin8WithAI Consulting + Buildouts
            </h3>
            <ul className="space-y-6 text-left">
              {stackItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4 group/item">
                  <div className="mt-1 w-5 h-5 rounded-full bg-neon-lime/20 flex items-center justify-center text-neon-lime group-hover/item:bg-neon-lime group-hover/item:text-black transition-colors shadow-[0_0_10px_rgba(204,255,0,0.2)]">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm md:text-lg font-mono text-gray-200 group-hover/item:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-2xl mx-auto relative h-36 md:h-28 mt-4 mb-4">
             {testimonials.map((t, i) => (
                 <div 
                    key={i} 
                    className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center ${i === current ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
                 >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/5 px-6 py-6 rounded-2xl relative w-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-default group">
                        <Quote className="absolute top-3 left-3 w-4 h-4 text-white/10 group-hover:text-white/20 transition-colors" />
                        <Quote className="absolute bottom-3 right-3 w-4 h-4 text-white/10 rotate-180 group-hover:text-white/20 transition-colors" />
                        
                        <p className="text-sm text-gray-300 font-mono italic leading-relaxed group-hover:text-white transition-colors">"{t.text}"</p>
                        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest border-t border-white/5 pt-3 w-fit mx-auto group-hover:border-white/10 transition-colors">
                            <span className="text-white font-bold">{t.author}</span>
                            <span className="text-gray-600">|</span>
                            <span className="text-neon-lime">{t.role}</span>
                        </div>
                    </div>
                 </div>
             ))}
             {/* Indicators */}
             <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {testimonials.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'bg-neon-lime w-6' : 'bg-white/20 w-1.5 hover:bg-white/40'}`}
                    />
                ))}
             </div>
        </div>
        
        {/* Pulsing CTA - Rounded Button with Heavy Glow */}
        <div className="pt-8">
          <MagneticButton 
            onClick={onApply}
            strength={0.5}
            className="relative group px-16 py-8 bg-white text-black font-bold overflow-hidden transition-all hover:scale-105 duration-300 rounded-full shadow-[0_0_40px_rgba(0,123,255,0.6)] hover:shadow-[0_0_60px_rgba(157,0,255,0.8)] animate-pulse-slow"
          >
            <span className="relative z-10 flex items-center gap-3 text-sm uppercase tracking-widest font-mono font-extrabold">
              <Sparkles className="w-4 h-4" /> APPLY FOR DOMIN8 STRATEGY
            </span>
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-lime group-hover:w-full transition-all duration-300 opacity-100 mix-blend-multiply"></div>
          </MagneticButton>
          
          <p className="text-[10px] text-gray-500 mt-6 font-mono uppercase tracking-widest">
            /// Application required. Strict qualification criteria.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;