import React, { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: ''
  });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const triggerConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ['#007BFF', '#9D00FF', '#CCFF00', '#00FFFF']; // Brand colors

    (function frame() {
      // Launch from left
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        zIndex: 9999, // Ensure it sits on top of the modal
        disableForReducedMotion: false // Force confetti even if motion reduced (high impact app)
      });
      // Launch from right
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        zIndex: 9999, // Ensure it sits on top of the modal
        disableForReducedMotion: false
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await fetch('https://services.leadconnectorhq.com/hooks/hNLjScx6SvqNnn2a3o2P/webhook-trigger/b408faf0-a266-4064-9309-f6e5cb547aef', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      setStatus('success');
      // Added slight delay for better visual impact
      setTimeout(() => triggerConfetti(), 150);

    } catch (error) {
      console.error('Submission error:', error);
      // Fallback success state for UX if CORS blocks the webhook response but request was sent
      setStatus('success'); 
      // Added slight delay for better visual impact
      setTimeout(() => triggerConfetti(), 150);
    }
  };

  const inputClasses = "w-full bg-[rgba(255,255,255,0.03)] border border-white/10 p-3 text-white focus:border-electric-blue focus:bg-[rgba(255,255,255,0.05)] outline-none transition-all duration-300 font-mono text-sm rounded-2xl";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-cyber-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card - Deep Glass */}
      <div className="relative w-full max-w-md bg-[rgba(10,10,10,0.8)] backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(157,0,255,0.2)] p-8 overflow-hidden animate-slide-up rounded-[32px]">
        
        {/* Glow Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue via-domin8-magenta to-neon-lime"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-neon-lime/10 flex items-center justify-center border border-neon-lime/20 shadow-[0_0_20px_rgba(204,255,0,0.3)] animate-bounce">
              <CheckCircle className="w-8 h-8 text-neon-lime" />
            </div>
            <div>
               <h3 className="text-2xl font-serif text-white mb-2">Application Received</h3>
               <p className="text-gray-400 font-mono text-sm">Marcus is analyzing your data. Check your inbox in 5 minutes for the preliminary report.</p>
            </div>
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono uppercase tracking-widest transition-colors rounded-full"
            >
              Close System
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-serif italic text-white mb-2">Secure Your Spot</h3>
              <p className="text-gray-400 font-mono text-xs">Enter your details to initiate the AI Audit protocol.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1 pl-2">First Name</label>
                  <input 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    required 
                    type="text" 
                    className={inputClasses} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1 pl-2">Last Name</label>
                  <input 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    required 
                    type="text" 
                    className={inputClasses} 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1 pl-2">Email</label>
                <input 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  type="email" 
                  className={inputClasses} 
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1 pl-2">Phone</label>
                <input 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  type="tel" 
                  className={inputClasses} 
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1 pl-2">Business Name</label>
                <input 
                  name="businessName" 
                  value={formData.businessName} 
                  onChange={handleChange} 
                  required 
                  type="text" 
                  className={inputClasses} 
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-white text-black font-bold py-4 mt-4 hover:bg-neon-lime hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-mono rounded-xl group"
              >
                {status === 'submitting' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Submit Application
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadFormModal;