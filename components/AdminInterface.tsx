import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, MessageSquare, Radio, Bell, ChevronDown, Plus, 
  Zap, ArrowUpRight, Loader2, Database, Upload, Wand2, Download, Image as ImageIcon, RefreshCw, X,
  BrainCircuit, Cpu, Film, Play, Video, Scan, FileText, Receipt, ScrollText, Layers, Activity, Search,
  Terminal, ShieldCheck, Globe, Smartphone, Send
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

declare global {
  interface AIStudio {
    openSelectKey: () => Promise<void>;
    hasSelectedApiKey: () => Promise<boolean>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

interface AdminInterfaceProps {
    onLogout: () => void;
}

interface Log {
    id: string;
    type: 'user' | 'system';
    content: string;
    timestamp: string;
}

// THEME CONFIGURATION FOR VIBRANCY
const THEME_COLORS = {
    blue: {
        text: 'text-electric-blue',
        bg: 'bg-electric-blue',
        border: 'border-electric-blue',
        shadow: 'shadow-[0_0_30px_-5px_rgba(0,123,255,0.3)]',
        glow: 'from-electric-blue/30',
        iconBg: 'bg-electric-blue/10'
    },
    lime: {
        text: 'text-neon-lime',
        bg: 'bg-neon-lime',
        border: 'border-neon-lime',
        shadow: 'shadow-[0_0_30px_-5px_rgba(204,255,0,0.25)]',
        glow: 'from-neon-lime/30',
        iconBg: 'bg-neon-lime/10'
    },
    magenta: {
        text: 'text-domin8-magenta',
        bg: 'bg-domin8-magenta',
        border: 'border-domin8-magenta',
        shadow: 'shadow-[0_0_30px_-5px_rgba(255,0,255,0.25)]',
        glow: 'from-domin8-magenta/30',
        iconBg: 'bg-domin8-magenta/10'
    },
    cyan: {
        text: 'text-domin8-cyan',
        bg: 'bg-domin8-cyan',
        border: 'border-domin8-cyan',
        shadow: 'shadow-[0_0_30px_-5px_rgba(0,255,255,0.25)]',
        glow: 'from-domin8-cyan/30',
        iconBg: 'bg-domin8-cyan/10'
    }
};

const AdminInterface: React.FC<AdminInterfaceProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    
    // --- RAG STATE ---
    const [ragQuery, setRagQuery] = useState('');
    const [isRagLoading, setIsRagLoading] = useState(false);
    const [ragLogs, setRagLogs] = useState<Log[]>([
        { id: '1', type: 'system', content: 'Domin8 Neural Core Online. Ready for queries.', timestamp: 'Now' }
    ]);
    const ragEndRef = useRef<HTMLDivElement>(null);

    // --- DOMIN8 IMAGES STATE ---
    const [sourceImage, setSourceImage] = useState<string | null>(null); // Base64
    const [imagePrompt, setImagePrompt] = useState('');
    const [isMutating, setIsMutating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null); // Base64

    // --- DOMIN8 MOTION LAB STATE ---
    const [veoSource, setVeoSource] = useState<string | null>(null); // Base64
    const [veoPrompt, setVeoPrompt] = useState('');
    const [isVeoRendering, setIsVeoRendering] = useState(false);
    const [generatedVideo, setGeneratedVideo] = useState<string | null>(null); // Blob URL
    const [veoProgress, setVeoProgress] = useState(0); 

    // --- DOMIN8 VISION STATE ---
    const [visionSource, setVisionSource] = useState<string | null>(null);
    const [visionPrompt, setVisionPrompt] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [visionResult, setVisionResult] = useState<string | null>(null);

    // Scroll to bottom of RAG chat
    useEffect(() => {
        ragEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [ragLogs, activeTab]);

    // --- HELPER: ROBUST FETCH (RAG) ---
    const robustFetch = async (url: string, options: RequestInit) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.warn("Network request failed (likely CORS). Switching to Simulation Mode.", error);
            return null; // Return null to trigger fallback
        }
    };

    // --- HELPER: FORMAT RAG RESPONSE ---
    const formatRagResponse = (text: string) => {
        if (!text) return null;

        if ((text.trim().startsWith('{') || text.trim().startsWith('[')) && !text.includes('\n')) {
            try {
                 const parsed = JSON.parse(text);
                 if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
                     return (
                         <div className="space-y-3">
                             {Object.entries(parsed).map(([key, value]) => (
                                 <div key={key} className="border-l-2 border-[#CCFF00]/30 pl-3">
                                     <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{key.replace(/_/g, ' ')}</div>
                                     <div className="text-sm text-[#CCFF00]">{String(value)}</div>
                                 </div>
                             ))}
                         </div>
                     );
                 }
            } catch (e) { }
        }

        const lines = text.split('\n');

        return (
            <div className="space-y-2 text-sm font-mono">
                {lines.map((line, idx) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={idx} className="h-2"></div>;
                    const renderWithBold = (str: string) => {
                        return str.split(/(\*\*.*?\*\*)/).map((part, i) => 
                            part.startsWith('**') && part.endsWith('**') 
                                ? <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong> 
                                : part
                        );
                    };
                    if (trimmed.endsWith(':') && trimmed.length < 60) {
                        return <h4 key={idx} className="text-white font-bold mt-4 mb-2 uppercase tracking-wide text-xs">{renderWithBold(trimmed)}</h4>;
                    }
                    if (['-', '*', '•'].some(char => trimmed.startsWith(char + ' '))) {
                        return (
                            <div key={idx} className="flex gap-3 pl-1">
                                <div className="min-w-[6px] h-[6px] mt-1.5 rounded-full bg-[#CCFF00]/50" />
                                <div className="leading-relaxed text-[#CCFF00]/90">{renderWithBold(trimmed.replace(/^[-*•]\s+/, ''))}</div>
                            </div>
                        );
                    }
                    if (/^\d+\.\s/.test(trimmed)) {
                        const parts = trimmed.match(/^(\d+\.)\s+(.*)/);
                        if (parts) {
                            return (
                                <div key={idx} className="flex gap-3 pl-1">
                                    <span className="text-[#CCFF00] font-bold min-w-[20px]">{parts[1]}</span>
                                    <div className="leading-relaxed text-[#CCFF00]/90">{renderWithBold(parts[2])}</div>
                                </div>
                            );
                        }
                    }
                    return <p key={idx} className="leading-relaxed text-[#CCFF00]/80">{renderWithBold(trimmed)}</p>;
                })}
            </div>
        );
    };

    // --- HANDLER: RAG SYSTEM ---
    const handleRagQuery = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ragQuery.trim()) return;

        const currentQuery = ragQuery;
        setRagQuery('');
        setRagLogs(prev => [...prev, { id: Date.now().toString(), type: 'user', content: currentQuery, timestamp: 'Now' }]);
        setIsRagLoading(true);

        try {
            const data = await robustFetch('https://n8n2.a3innercircle.com/webhook/7a03e778-a2de-4fc9-be49-30bac015286f', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: currentQuery }),
            });
            
            let outputText = "";
            if (data) {
                if (Array.isArray(data) && data.length > 0) {
                    const item = data[0];
                    outputText = item.output || item.text || item.response || item.message || item.answer || item.reply || JSON.stringify(item);
                } else if (typeof data === 'object' && data !== null) {
                    outputText = data.output || data.text || data.response || data.message || data.answer || data.reply || JSON.stringify(data);
                } else if (typeof data === 'string') {
                    outputText = data;
                } else {
                    outputText = "Data received but format unrecognized.";
                }
            } else {
                await new Promise(r => setTimeout(r, 1500)); 
                outputText = `[SIMULATION MODE] Connection Restricted (CORS).\n\nBased on: "${currentQuery}"\n\nRECOMMENDED ACTION PLAN:\n- Analyze current lead velocity metrics\n- Implement 3-step automated follow-up sequence\n- Target 15% recovery of lost leads\n\nStatus: Pending Approval`;
            }
            setRagLogs(prev => [...prev, { id: Date.now().toString(), type: 'system', content: outputText, timestamp: 'Now' }]);
        } catch (error) {
            setRagLogs(prev => [...prev, { id: Date.now().toString(), type: 'system', content: "System Critical. Manual override required.", timestamp: 'Now' }]);
        } finally {
            setIsRagLoading(false);
        }
    };

    // --- HANDLER: DOMIN8 IMAGES ---
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setSourceImage(reader.result as string); setGeneratedImage(null); };
            reader.readAsDataURL(file);
        }
    };

    const handleMutateImage = async () => {
        if (!sourceImage || !imagePrompt.trim()) return;
        setIsMutating(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64Data = sourceImage.split(',')[1];
            const mimeType = sourceImage.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0] || 'image/png';
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ inlineData: { data: base64Data, mimeType: mimeType } }, { text: imagePrompt }] }
            });
            let foundImage = false;
            if (response.candidates && response.candidates[0].content.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
                        foundImage = true;
                        break;
                    }
                }
            }
            if (!foundImage) alert("The model responded with text instead of an image. Try a different prompt.");
        } catch (error) {
            alert("Image generation failed. Check API Key or try a different image.");
        } finally {
            setIsMutating(false);
        }
    };

    const handleDownload = (url: string, name: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- HANDLER: DOMIN8 MOTION LAB ---
    const handleVeoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setVeoSource(reader.result as string); setGeneratedVideo(null); };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateVideo = async () => {
        if (!veoSource) return;
        setIsVeoRendering(true);
        setVeoProgress(5);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64Data = veoSource.split(',')[1];
            const mimeType = veoSource.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0] || 'image/png';
            let operation = await ai.models.generateVideos({
                model: 'veo-3.1-fast-generate-preview',
                image: { imageBytes: base64Data, mimeType: mimeType },
                prompt: veoPrompt || "Animate this scene naturally, cinematic lighting.",
                config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
            });
            const progressInterval = setInterval(() => { setVeoProgress(prev => Math.min(prev + 5, 90)); }, 2000);
            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                operation = await ai.operations.getVideosOperation({operation: operation});
            }
            clearInterval(progressInterval);
            setVeoProgress(100);
            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (downloadLink) {
                const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                const blob = await response.blob();
                setGeneratedVideo(URL.createObjectURL(blob));
            } else { throw new Error("No video URI returned."); }
        } catch (error: any) {
            const errMsg = error.message || error.toString();
            if (errMsg.includes("Requested entity was not found") || errMsg.includes("404")) {
                alert("Veo requires a specific paid API key. Please select a valid key.");
                if (window.aistudio) await window.aistudio.openSelectKey();
            } else {
                alert("Video generation failed. Please try again.");
            }
            setVeoProgress(0);
        } finally {
            setIsVeoRendering(false);
        }
    };

    // --- HANDLER: DOMIN8 VISION ---
    const handleVisionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setVisionSource(reader.result as string); setVisionResult(null); };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyzeImage = async () => {
        if (!visionSource) return;
        setIsAnalyzing(true);
        setVisionResult(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64Data = visionSource.split(',')[1];
            const mimeType = visionSource.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0] || 'image/png';
            const defaultPrompt = "Analyze this image and extract all visible data. If it's a receipt, list items and totals. If it's a chart, summarize key trends. If it's text, transcribe it. Format the output cleanly with bullet points and sections.";
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [{ inlineData: { data: base64Data, mimeType: mimeType } }, { text: visionPrompt.trim() || defaultPrompt }] }
            });
            setVisionResult(response.text || "No readable text found.");
        } catch (error) {
            setVisionResult("Error processing image. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    // --- RENDER HELPERS ---
    const StatusCard = ({ icon: Icon, title, status, sub, theme }: { icon: any, title: string, status: string, sub: string, theme: keyof typeof THEME_COLORS }) => {
        const colors = THEME_COLORS[theme] || THEME_COLORS.blue;
        
        return (
            <div className={`relative overflow-hidden bg-[#0a0a0a] backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 md:p-8 flex flex-col justify-between h-auto min-h-[180px] md:h-56 group transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:-translate-y-1 ${colors.shadow}`}>
                
                {/* Vibrant Back Shadow / Glow - Adjusted for perfect containment */}
                <div className={`absolute top-0 right-0 w-[140px] md:w-[180px] h-[140px] md:h-[180px] bg-gradient-to-br ${colors.glow} to-transparent opacity-20 group-hover:opacity-40 blur-[40px] rounded-full -mr-8 -mt-8 md:-mr-12 md:-mt-12 transition-all duration-700`}></div>
                
                <div className="flex justify-between items-start relative z-10">
                    <div className={`p-3 md:p-4 rounded-2xl ${colors.iconBg} border border-white/5 ${colors.text} group-hover:bg-white/10 transition-colors shadow-inner`}>
                        <Icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                        <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${colors.bg} animate-pulse shadow-[0_0_12px_currentColor]`}></span>
                        <span className="text-[9px] md:text-[10px] font-mono uppercase text-gray-300 tracking-wider font-bold">{status}</span>
                    </div>
                </div>
                
                <div className="relative z-10 mt-6 md:mt-auto">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-none mb-2">{title}</h3>
                    <p className={`text-[10px] md:text-xs font-mono font-medium opacity-80 ${colors.text} tracking-wide`}>{sub}</p>
                </div>
            </div>
        );
    };

    const ToolHeader = ({ title, desc, theme }: { title: string, desc: string, theme: keyof typeof THEME_COLORS }) => {
        const colors = THEME_COLORS[theme] || THEME_COLORS.blue;
        return (
            <div className={`mb-8 md:mb-10 p-6 md:p-8 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-[32px] relative overflow-hidden ${colors.shadow}`}>
                 <div className={`absolute left-0 top-0 bottom-0 w-2 ${colors.bg}`}></div>
                 <div className={`absolute -right-10 -top-10 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br ${colors.glow} to-transparent opacity-10 blur-[60px] rounded-full pointer-events-none`}></div>
                 <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase mb-4 tracking-tight leading-[0.9]">{title}</h2>
                    <p className="text-gray-400 font-mono text-xs md:text-sm max-w-3xl leading-relaxed">{desc}</p>
                 </div>
            </div>
        );
    };

    // --- MAIN RENDER LOGIC ---
    return (
        <div className="flex flex-col h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-[#CCFF00] selection:text-black">
            
            {/* BACKGROUND AMBIENCE */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] md:w-[900px] h-[500px] md:h-[900px] bg-[#007BFF]/5 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#9D00FF]/5 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            {/* TOP NAVIGATION ISLAND */}
            <header className="relative z-50 pt-4 md:pt-8 px-4 md:px-6 flex justify-center w-full">
                <div className="flex items-center gap-1 md:gap-2 p-1.5 md:p-2 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-x-auto no-scrollbar max-w-full">
                    {[
                        { id: 'dashboard', label: 'Command', icon: LayoutDashboard },
                        { id: 'rag', label: 'Knowledge', icon: Database },
                        { id: 'images', label: 'Images', icon: ImageIcon },
                        { id: 'video', label: 'Motion', icon: Film },
                        { id: 'vision', label: 'Vision', icon: Scan },
                        { id: 'live_bot', label: 'Live Bot', icon: Smartphone },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)]' 
                                : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <tab.icon className={`w-3 h-3 md:w-4 md:h-4 relative z-10 ${activeTab === tab.id ? 'text-black' : 'text-current'}`} />
                            <span className="relative z-10">{tab.label}</span>
                            {activeTab === tab.id && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 opacity-50 animate-shimmer-slide"></div>}
                        </button>
                    ))}
                    <div className="w-px h-4 md:h-6 bg-white/10 mx-1 md:mx-2 flex-shrink-0"></div>
                    <button onClick={onLogout} className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20">
                        <Radio className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 relative z-10 p-4 md:p-10 overflow-hidden">
                <div className="h-full max-w-[1800px] mx-auto overflow-y-auto no-scrollbar pb-20 px-1 md:px-2">
                    
                    {/* DASHBOARD VIEW */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6 md:space-y-10 animate-slide-up">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-6 gap-4">
                                <div>
                                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-black uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-[0.9] md:leading-[0.85] tracking-tighter">
                                        COMMAND <br/> CENTER
                                    </h1>
                                    <div className="flex items-center gap-3 mt-4">
                                        <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse"></div>
                                        <p className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">System Status: Optimal</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
                                    {['Date: Now', 'Product: All', 'Profile: Demo User'].map((label, i) => (
                                        <button key={i} className="px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-[#111] border border-white/5 text-[9px] md:text-[10px] font-mono font-bold uppercase text-gray-400 flex items-center gap-2 hover:border-white/20 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                            {label} <ChevronDown className="w-3 h-3" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                                <StatusCard icon={BrainCircuit} title="Neural Core" sub="Domin8 Knowledge Base" status="Online" theme="blue" />
                                <StatusCard icon={Cpu} title="Visual Cortex" sub="Gemini 2.5 Flash Image" status="Idle" theme="lime" />
                                <StatusCard icon={Activity} title="System Load" sub="34ms Latency" status="Stable" theme="magenta" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                {/* Shortcut: RAG */}
                                <div onClick={() => setActiveTab('rag')} className="cursor-pointer group relative bg-[#0a0a0a] border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-10 hover:border-[#CCFF00]/50 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(204,255,0,0.15)] hover:shadow-[0_0_60px_-10px_rgba(204,255,0,0.3)] overflow-hidden">
                                    {/* Watermark Icon - Fixed positioning to avoid overflow */}
                                    <div className="absolute -right-8 -top-8 md:-right-10 md:-top-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rotate-12">
                                        <Database className="w-40 h-40 md:w-64 md:h-64 text-[#CCFF00]" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 md:p-4 bg-[#CCFF00]/10 rounded-2xl border border-[#CCFF00]/20 text-[#CCFF00]">
                                                <Database className="w-6 h-6 md:w-8 md:h-8" />
                                            </div>
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase italic">Knowledge Base</h3>
                                        <p className="text-gray-400 font-mono text-xs md:text-sm max-w-md leading-relaxed">Access the Neural Core. Query your business data, SOPs, and strategies instantly with RAG technology.</p>
                                    </div>
                                </div>

                                {/* Shortcut: Live Bot */}
                                <div onClick={() => setActiveTab('live_bot')} className="cursor-pointer group relative bg-[#0a0a0a] border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-10 hover:border-electric-blue/50 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(0,123,255,0.15)] hover:shadow-[0_0_60px_-10px_rgba(0,123,255,0.3)] overflow-hidden">
                                    {/* Watermark Icon - Fixed positioning to avoid overflow */}
                                    <div className="absolute -right-8 -top-8 md:-right-10 md:-top-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rotate-12">
                                        <Smartphone className="w-40 h-40 md:w-64 md:h-64 text-electric-blue" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 md:p-4 bg-electric-blue/10 rounded-2xl border border-electric-blue/20 text-electric-blue">
                                                <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />
                                            </div>
                                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-3 uppercase italic">Live SMS Demo</h3>
                                        <p className="text-gray-400 font-mono text-xs md:text-sm max-w-md leading-relaxed">Text Marcus in real-time. Give it your URL, watch it scrub your site, and sell to you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TOOL: KNOWLEDGE BASE (RAG) */}
                    {activeTab === 'rag' && (
                        <div className="h-full flex flex-col animate-slide-up">
                            <ToolHeader 
                                title="Domin8 Knowledge Base" 
                                desc="The Neural Core of your operation. Ask complex questions about your data, generate strategies, or retrieve specific information from the vector database."
                                theme="blue"
                            />
                            <div className="flex-1 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col shadow-[0_0_60px_-15px_rgba(0,123,255,0.15)] relative">
                                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(0,123,255,0.1),transparent_40%)]"></div>
                                
                                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:space-y-8 scroll-smooth">
                                    {ragLogs.map((log) => (
                                        <div key={log.id} className={`flex ${log.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[90%] md:max-w-[85%] p-6 md:p-8 rounded-[2rem] text-sm leading-relaxed shadow-lg ${
                                                log.type === 'user' 
                                                ? 'bg-[#151515] text-white rounded-tr-sm border border-white/10' 
                                                : 'bg-[#007BFF]/10 border border-[#007BFF]/20 text-blue-100 rounded-tl-sm shadow-[0_0_30px_rgba(0,123,255,0.05)]'
                                            }`}>
                                                {log.type === 'system' ? formatRagResponse(log.content) : log.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isRagLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-[#007BFF]/10 border border-[#007BFF]/20 p-4 md:p-6 rounded-[2rem] rounded-tl-sm flex items-center gap-4 shadow-[0_0_30px_rgba(0,123,255,0.1)]">
                                                <Loader2 className="w-5 h-5 text-electric-blue animate-spin" />
                                                <span className="text-xs text-electric-blue font-mono tracking-widest uppercase font-bold">Processing Neural Query...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={ragEndRef} />
                                </div>

                                <div className="p-6 md:p-8 bg-[#050505] border-t border-white/10 relative z-20">
                                    <form onSubmit={handleRagQuery} className="relative max-w-5xl mx-auto">
                                        <div className="absolute inset-0 bg-electric-blue/5 blur-xl rounded-full"></div>
                                        <input 
                                            type="text" 
                                            value={ragQuery}
                                            onChange={(e) => setRagQuery(e.target.value)}
                                            placeholder="Enter query for Neural Core..."
                                            className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-full pl-6 md:pl-8 pr-14 md:pr-16 py-4 md:py-6 text-sm text-white focus:outline-none focus:border-electric-blue focus:shadow-[0_0_30px_rgba(0,123,255,0.3)] transition-all font-mono"
                                        />
                                        <button 
                                            type="submit"
                                            disabled={!ragQuery.trim() || isRagLoading}
                                            className="absolute right-2 md:right-3 top-2 md:top-3 bottom-2 md:bottom-3 w-10 md:w-12 bg-[#1a1a1a] hover:bg-electric-blue hover:text-white text-gray-400 rounded-full flex items-center justify-center transition-all disabled:opacity-50 border border-white/5"
                                        >
                                            <ArrowUpRight className="w-5 h-5" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TOOL: DOMIN8 IMAGES */}
                    {activeTab === 'images' && (
                        <div className="h-full flex flex-col animate-slide-up">
                            <ToolHeader 
                                title="Domin8 Images" 
                                desc="Rapid image mutation engine using Gemini 2.5 Flash. Upload a source asset and describe changes (e.g., 'Add neon lights', 'Cyberpunk style')."
                                theme="lime"
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[600px]">
                                {/* Control Panel */}
                                <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col gap-6 md:gap-8 shadow-[0_0_40px_-10px_rgba(204,255,0,0.1)]">
                                    <div className="flex-1 border-2 border-dashed border-[#222] rounded-3xl flex flex-col items-center justify-center gap-6 hover:border-[#CCFF00]/50 hover:bg-[#CCFF00]/5 transition-all group cursor-pointer relative overflow-hidden bg-[#050505] min-h-[200px]">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                        {sourceImage ? (
                                            <img src={sourceImage} className="w-full h-full object-contain p-4" />
                                        ) : (
                                            <>
                                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#111] border border-[#222] flex items-center justify-center group-hover:scale-110 group-hover:border-[#CCFF00] transition-all shadow-lg">
                                                    <Upload className="w-6 h-6 md:w-8 md:h-8 text-gray-500 group-hover:text-[#CCFF00]" />
                                                </div>
                                                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Upload Source</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="space-y-4 md:space-y-6">
                                        <div className="space-y-2 md:space-y-3">
                                            <label className="text-[10px] uppercase tracking-widest text-[#CCFF00] font-mono font-bold flex items-center gap-2">
                                                <Wand2 className="w-3 h-3" /> Mutation Prompt
                                            </label>
                                            <textarea 
                                                value={imagePrompt}
                                                onChange={(e) => setImagePrompt(e.target.value)}
                                                placeholder="Describe the aesthetic changes..."
                                                className="w-full h-24 md:h-32 bg-[#111] border border-white/10 rounded-2xl p-4 md:p-5 text-sm text-white focus:outline-none focus:border-[#CCFF00] transition-all font-mono resize-none focus:shadow-[0_0_20px_rgba(204,255,0,0.1)]"
                                            />
                                        </div>
                                        <button 
                                            onClick={handleMutateImage}
                                            disabled={!sourceImage || !imagePrompt || isMutating}
                                            className="w-full py-4 md:py-5 bg-[#CCFF00] text-black font-black text-sm rounded-2xl hover:bg-white transition-all disabled:opacity-50 font-mono uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                                        >
                                            {isMutating ? <Loader2 className="w-5 h-5 animate-spin"/> : <Wand2 className="w-5 h-5" />}
                                            {isMutating ? 'Mutating...' : 'Generate Variation'}
                                        </button>
                                    </div>
                                </div>

                                {/* Result Panel */}
                                <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-[32px] md:rounded-[40px] p-2 flex items-center justify-center relative overflow-hidden shadow-[0_0_60px_-10px_rgba(204,255,0,0.05)] min-h-[300px]">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
                                    <div className="w-full h-full rounded-[32px] bg-[#050505] overflow-hidden flex items-center justify-center relative">
                                        {generatedImage ? (
                                            <div className="relative w-full h-full flex items-center justify-center group bg-[#020202]">
                                                <img src={generatedImage} className="max-w-full max-h-full object-contain shadow-2xl" />
                                                <button 
                                                    onClick={() => handleDownload(generatedImage!, `domin8-img-${Date.now()}.png`)}
                                                    className="absolute bottom-6 right-6 md:bottom-10 md:right-10 px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
                                                >
                                                    Download Asset
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center text-gray-700 space-y-4 md:space-y-6">
                                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#0a0a0a] border border-[#111] flex items-center justify-center mx-auto shadow-inner">
                                                    <ImageIcon className="w-8 h-8 md:w-10 md:h-10 opacity-20" />
                                                </div>
                                                <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-50">Waiting for data stream...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TOOL: MOTION LAB (VIDEO) */}
                    {activeTab === 'video' && (
                        <div className="h-full flex flex-col animate-slide-up">
                            <ToolHeader 
                                title="Domin8 Motion Lab" 
                                desc="Generative video engine powered by Veo. Upload a static frame to bring it to life with cinematic motion."
                                theme="magenta"
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                                {/* Input Column */}
                                <div className="space-y-6 md:space-y-8">
                                    <div className="relative aspect-video border-2 border-dashed border-[#222] rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center bg-[#0a0a0a] hover:border-[#FF00FF]/50 transition-all group overflow-hidden shadow-[0_0_40px_-10px_rgba(255,0,255,0.05)]">
                                        <input type="file" accept="image/*" onChange={handleVeoUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                        {veoSource ? (
                                            <img src={veoSource} className="w-full h-full object-cover opacity-60" />
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:border-[#FF00FF] group-hover:shadow-[0_0_30px_rgba(255,0,255,0.2)] transition-all">
                                                    <Film className="w-8 h-8 md:w-10 md:h-10 text-gray-600 group-hover:text-[#FF00FF] transition-colors" />
                                                </div>
                                                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Drop Static Frame</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-4 p-2 bg-[#0a0a0a] rounded-[24px] border border-white/10 shadow-lg">
                                        <input 
                                            value={veoPrompt}
                                            onChange={(e) => setVeoPrompt(e.target.value)}
                                            placeholder="Motion Prompt (e.g. 'Slow pan right')"
                                            className="flex-1 bg-transparent border-none px-4 md:px-6 text-sm text-white focus:outline-none font-mono placeholder-gray-600"
                                            disabled={!veoSource || isVeoRendering}
                                        />
                                        <button 
                                            onClick={handleGenerateVideo}
                                            disabled={!veoSource || isVeoRendering}
                                            className="px-6 md:px-10 py-3 md:py-4 bg-[#FF00FF] hover:bg-white hover:text-black text-white font-black rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                                        >
                                            {isVeoRendering ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> : <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Output Column */}
                                <div className="aspect-video bg-[#050505] rounded-[32px] md:rounded-[40px] border border-white/10 overflow-hidden relative flex items-center justify-center shadow-[0_0_60px_-10px_rgba(255,0,255,0.15)]">
                                    {isVeoRendering ? (
                                        <div className="text-center">
                                            <div className="w-20 h-20 md:w-24 md:h-24 border-4 border-[#111] border-t-[#FF00FF] rounded-full animate-spin mx-auto mb-4 md:mb-6 shadow-[0_0_40px_rgba(255,0,255,0.3)]"></div>
                                            <div className="text-[#FF00FF] font-mono text-sm animate-pulse uppercase tracking-widest font-bold">Rendering Sequence... {veoProgress}%</div>
                                        </div>
                                    ) : generatedVideo ? (
                                        <div className="relative w-full h-full group">
                                            <video src={generatedVideo} controls autoPlay loop className="w-full h-full object-contain" />
                                            <button 
                                                onClick={() => handleDownload(generatedVideo!, `domin8-motion-${Date.now()}.mp4`)}
                                                className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/50 backdrop-blur hover:bg-white text-white hover:text-black p-3 md:p-4 rounded-full transition-all border border-white/10"
                                            >
                                                <Download className="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-gray-800 font-mono text-xs uppercase tracking-[0.5em]">Awaiting Render</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TOOL: DOMIN8 VISION */}
                    {activeTab === 'vision' && (
                        <div className="h-full flex flex-col animate-slide-up">
                            <ToolHeader 
                                title="Domin8 Vision" 
                                desc="Optical Character Recognition & Data Mining. Upload receipts, charts, or documents to extract clean, structured JSON data."
                                theme="cyan"
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 h-auto md:h-[700px]">
                                {/* Scanner Input */}
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col shadow-[0_0_40px_-10px_rgba(0,255,255,0.1)] min-h-[400px]">
                                    <div className="flex-1 border-2 border-dashed border-[#222] rounded-3xl relative overflow-hidden group hover:border-domin8-cyan/50 transition-colors bg-[#050505]">
                                        <input type="file" accept="image/*" onChange={handleVisionUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                                        {visionSource ? (
                                            <>
                                                <img src={visionSource} className="w-full h-full object-contain p-6 opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
                                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.1)_50%)] bg-[length:100%_4px] pointer-events-none animate-scan"></div>
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mb-6 group-hover:border-domin8-cyan group-hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all">
                                                    <Scan className="w-8 h-8 md:w-10 md:h-10 text-gray-600 group-hover:text-domin8-cyan transition-colors" />
                                                </div>
                                                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Upload Document</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-6 md:mt-8 flex gap-4 p-2 bg-[#111] rounded-[24px] border border-white/5">
                                        <input 
                                            value={visionPrompt}
                                            onChange={(e) => setVisionPrompt(e.target.value)}
                                            placeholder="Extraction instructions..."
                                            className="flex-1 bg-transparent border-none px-4 md:px-6 text-sm text-white focus:outline-none font-mono placeholder-gray-600"
                                            disabled={!visionSource || isAnalyzing}
                                        />
                                        <button 
                                            onClick={handleAnalyzeImage}
                                            disabled={!visionSource || isAnalyzing}
                                            className="px-6 md:px-10 bg-white hover:bg-domin8-cyan hover:text-black text-black font-black rounded-2xl transition-all disabled:opacity-50 uppercase tracking-wider text-xs shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
                                        >
                                            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Extract"}
                                        </button>
                                    </div>
                                </div>

                                {/* Data Output */}
                                <div className="bg-[#050505] border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-10 overflow-hidden flex flex-col relative shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] min-h-[400px]">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-domin8-cyan to-transparent opacity-30"></div>
                                    <div className="flex justify-between items-center mb-6 md:mb-8 pb-6 border-b border-white/5">
                                        <div className="flex gap-3">
                                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase text-domin8-cyan/50 tracking-widest">Extracted_Data.json</span>
                                    </div>
                                    <div className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed text-gray-300 pr-2">
                                        {isAnalyzing ? (
                                            <div className="h-full flex flex-col items-center justify-center gap-6 text-domin8-cyan">
                                                <Search className="w-10 h-10 md:w-12 md:h-12 animate-bounce" />
                                                <span className="text-xs animate-pulse uppercase tracking-widest font-bold">Scanning Visual Patterns...</span>
                                            </div>
                                        ) : visionResult ? (
                                            formatRagResponse(visionResult)
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-800 text-xs uppercase tracking-[0.2em] font-bold">
                                                No Data Extracted
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TOOL: LIVE BOT (SMS DEMO) */}
                    {activeTab === 'live_bot' && (
                        <div className="h-full flex flex-col animate-slide-up">
                            <ToolHeader 
                                title="Live SMS Experience" 
                                desc="Experience Marcus in the wild. Text 'Demo' to our dedicated line, providing any website URL. Watch it instantly learn and sell."
                                theme="blue"
                            />
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-[0_0_60px_-15px_rgba(0,123,255,0.15)] relative overflow-hidden">
                                
                                {/* Background glow */}
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

                                {/* Left: Instructions */}
                                <div className="flex flex-col justify-center space-y-8 relative z-10">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-[10px] font-mono tracking-widest uppercase text-electric-blue mb-2">
                                            <Zap className="w-3 h-3" /> Real-Time Scrubbing Active
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase italic leading-tight">
                                            Don't just watch.<br/>
                                            <span className="text-electric-blue">Interact.</span>
                                        </h3>
                                        <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-md">
                                            The bot will scrub that site in real time, learn about that business, and become a professional associate that can answer questions, close deals, and book appointments.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { icon: Smartphone, text: "Open your SMS app" },
                                            { icon: Globe, text: "Send your website URL" },
                                            { icon: BrainCircuit, text: "Marcus learns it instantly" },
                                            { icon: MessageSquare, text: "Start asking questions" }
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-electric-blue/30 transition-colors">
                                                <step.icon className="w-6 h-6 text-electric-blue" />
                                                <span className="text-sm font-mono text-gray-300">{step.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: CTA & Visual */}
                                <div className="flex flex-col items-center justify-center relative z-10">
                                    <div className="relative w-full max-w-sm bg-black border border-white/10 rounded-[40px] p-6 shadow-2xl">
                                        {/* Phone Notch */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111] rounded-b-2xl border-b border-x border-white/10"></div>
                                        
                                        <div className="mt-8 space-y-6 text-center">
                                            <div className="w-20 h-20 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto border border-electric-blue/20 animate-pulse">
                                                <Smartphone className="w-10 h-10 text-electric-blue" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold font-display uppercase text-2xl">504-208-2121</h4>
                                                <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-widest">Domin8 Demo Line</p>
                                            </div>
                                            
                                            <div className="p-4 bg-[#111] rounded-2xl border border-white/5 text-left space-y-2">
                                                <div className="flex justify-end">
                                                    <div className="bg-electric-blue text-black px-4 py-2 rounded-2xl rounded-tr-sm text-xs font-bold">
                                                        Demo
                                                    </div>
                                                </div>
                                                <div className="flex justify-start">
                                                    <div className="bg-[#222] text-gray-300 px-4 py-2 rounded-2xl rounded-tl-sm text-xs">
                                                        <span className="animate-pulse">...</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <a 
                                                href="sms:5042082121?body=Demo"
                                                className="block w-full py-4 bg-electric-blue hover:bg-white text-black font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_30px_rgba(0,123,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:scale-105"
                                            >
                                                Text "Demo" Now
                                            </a>
                                            <p className="text-[10px] text-gray-600 font-mono">
                                                On mobile? Tap button to auto-fill SMS.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default AdminInterface;