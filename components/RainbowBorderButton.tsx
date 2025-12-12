import React from 'react';

interface RainbowBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const RainbowBorderButton: React.FC<RainbowBorderButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button 
      className={`relative group flex items-center justify-center px-0.5 py-0.5 rounded-full text-white cursor-pointer transition-transform duration-200 active:scale-95 ${className}`}
      {...props}
    >
      {/* The Rainbow Border & Glow */}
      <div className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,#fb0094,#0000ff,#00ff00,#ffff00,#ff0000,#fb0094,#0000ff,#00ff00,#ffff00,#ff0000)] bg-[length:400%] animate-rainbow blur-[1px] opacity-100"></div>
      
      {/* Outer Glow (Simulating the ::after in original) */}
      <div className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,#fb0094,#0000ff,#00ff00,#ffff00,#ff0000,#fb0094,#0000ff,#00ff00,#ffff00,#ff0000)] bg-[length:400%] animate-rainbow blur-[12px] opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>

      {/* The Glass Inner Button */}
      <div className="relative h-full w-full bg-[#0a0a0a]/80 backdrop-blur-xl rounded-full border border-white/5 px-5 py-2.5 flex items-center gap-2 group-hover:bg-[#0a0a0a]/60 transition-colors">
        {children}
      </div>
    </button>
  );
};

export default RainbowBorderButton;