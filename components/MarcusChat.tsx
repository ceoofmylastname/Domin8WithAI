import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageSquare, Loader2 } from 'lucide-react';
import { sendMessageToMarcus } from '../services/chatService';
import MagneticButton from './MagneticButton';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const MarcusChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Systems online. I am Marcus. Domin8WithAI is ready. What is your current revenue bottleneck?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    // Format history for the API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await sendMessageToMarcus(history, userMsg);
    
    setIsTyping(false);
    if (response) {
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-mono flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Chat Window - Rounded 32px + Deep Glass */}
      <div className={`pointer-events-auto transition-all duration-500 ease-out origin-bottom-right transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none absolute'}`}>
        <div className="w-[90vw] md:w-[350px] h-[500px] bg-[rgba(10,10,10,0.85)] backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse shadow-[0_0_10px_#ccff00]"></div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Marcus AI</h3>
                <span className="text-[10px] text-electric-blue uppercase tracking-widest">Sales Logic Core</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div 
                  className={`max-w-[85%] p-3 text-xs leading-relaxed rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-electric-blue/20 border border-electric-blue/30 text-white rounded-tr-none shadow-[0_0_15px_rgba(0,123,255,0.1)]' 
                      : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/5">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Marcus..."
                className="w-full bg-[rgba(0,0,0,0.5)] border border-white/10 p-3 pr-10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-neon-lime transition-colors rounded-2xl"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 text-gray-400 hover:text-neon-lime disabled:opacity-50 transition-colors p-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toggle Button - Glassmorphism Pill Shape */}
      {/* Hidden when chat is open to avoid clutter, fades out */}
      <div className={`pointer-events-auto transition-all duration-500 transform ${isOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <MagneticButton 
          onClick={() => setIsOpen(true)}
          strength={0.2}
          className="group flex items-center gap-4 pl-3 pr-6 py-3 rounded-full border border-white/10 bg-cyber-black/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,123,255,0.4)] hover:border-electric-blue/50 transition-all duration-300"
        >
          {/* Avatar / Icon Container */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:from-electric-blue/20 group-hover:to-cyber-violet/20 transition-all duration-300">
            <Bot className="w-5 h-5 text-white group-hover:text-electric-blue transition-colors" />
            
            {/* Ping animation to show activity */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-lime shadow-[0_0_10px_#ccff00]"></span>
            </span>
          </div>
          
          {/* Text Container */}
          <div className="flex flex-col items-start">
             <span className="text-xs font-black text-white uppercase tracking-wider font-display leading-tight group-hover:text-electric-blue transition-colors">
               Marcus AI
             </span>
             <span className="text-[9px] text-gray-400 uppercase tracking-widest font-mono leading-tight group-hover:text-white transition-colors">
               Qualify Leads
             </span>
          </div>
        </MagneticButton>
      </div>

    </div>
  );
};

export default MarcusChat;