import React from 'react';

const BackgroundMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-cyber-black"></div>
      
      {/* Liquid Blobs - Opacity reduced for cleaner aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyber-violet/20 rounded-full mix-blend-screen filter blur-[100px] md:blur-[120px] opacity-30 animate-blob will-change-transform translate-z-0"></div>
      
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-electric-blue/20 rounded-full mix-blend-screen filter blur-[80px] md:blur-[100px] opacity-20 animate-blob animation-delay-2000 will-change-transform translate-z-0"></div>
      
      <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-indigo-900/30 rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px] opacity-30 animate-blob animation-delay-4000 will-change-transform translate-z-0"></div>
      
      {/* Subtle Lime Highlight */}
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-neon-lime/5 rounded-full mix-blend-overlay filter blur-[60px] md:blur-[80px] opacity-40 will-change-transform translate-z-0"></div>

      {/* Noise Overlay for texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default BackgroundMesh;