import React, { useState } from 'react';
import { api } from './api/api';
import { 
  LayoutDashboard, FileText, Map, Sparkles, 
  Loader2, LogIn, ChevronRight, Zap 
} from 'lucide-react';

function App() {
  const [userName, setUserName] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const data = await api.uploadResume(file);
      setAnalysis(data.analysis);
      setActiveTab("analysis");
    } catch (err) { alert("Backend offline! Check Python terminal."); }
    setLoading(false);
  };

  const generateRoadmap = async () => {
    setLoading(true);
    try {
      const data = await api.getRoadmap({ skills: "Data Science, Python", goal: "GATE 2026" });
      setRoadmap(data.roadmap);
      setActiveTab("roadmap");
    } catch (err) { alert("Gemini logic failed."); }
    setLoading(false);
  };

  // --- SCREEN 1: WELCOME/LOGIN ---
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0f172a] to-[#0f172a]">
        <div className="bg-[#1e293b] p-10 rounded-[2.5rem] border border-slate-700 shadow-2xl max-w-md w-full text-center border-t-blue-500/50">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] animate-pulse">
            <Sparkles className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">VidyaGuide <span className="text-blue-500">AI</span></h1>
          <p className="text-slate-400 mb-8 font-medium">Your Agentic Career Mentor</p>
          <input 
            type="text" 
            placeholder="What is your name?" 
            className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-6 py-4 text-white mb-6 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button 
            onClick={() => userName && setIsAuth(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40"
          >
            Enter Dashboard <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // --- SCREEN 2: MAIN DASHBOARD ---
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-300 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-[#111827] border-r border-slate-800 p-8 flex flex-col h-screen sticky top-0">
         <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-blue-600 rounded-lg"><Sparkles size={20} className="text-white"/></div>
            <span className="text-xl font-bold text-white tracking-tighter">VidyaGuide</span>
         </div>
         <nav className="space-y-2 flex-1">
            <SidebarBtn label="Dashboard" icon={<LayoutDashboard size={18}/>} active={activeTab==='dashboard'} onClick={()=>setActiveTab('dashboard')}/>
            <SidebarBtn label="Resume Mentor" icon={<FileText size={18}/>} active={activeTab==='analysis'} onClick={()=>setActiveTab('analysis')}/>
            <SidebarBtn label="Career Roadmap" icon={<Map size={18}/>} active={activeTab==='roadmap'} onClick={()=>setActiveTab('roadmap')}/>
         </nav>
         <div className="mt-auto p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Authenticated As</p>
            <p className="text-white font-bold truncate">{userName}</p>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome, {userName}!</h2>
              <p className="text-slate-500 font-medium italic">Gemini Agent is active and ready for GATE 2026.</p>
            </div>
            <div className="flex gap-4">
               <label className="cursor-pointer bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
                  <FileText size={18}/> Upload Resume
                  <input type="file" className="hidden" onChange={handleFileUpload} />
               </label>
               <button onClick={generateRoadmap} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-500 transition-all flex items-center gap-2">
                  <Zap size={18}/> Smart Roadmap
               </button>
            </div>
        </header>

        {/* Dynamic Display Area */}
        <div className="grid gap-8">
            {activeTab === "dashboard" && (
              <div className="grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <KPICard label="Skill Status" val="Advanced" sub="Python & AI" />
                <KPICard label="Resume Score" val="--" sub="Upload PDF to start" />
                <KPICard label="Goal" val="GATE 2026" sub="Study Roadmap" />
              </div>
            )}

            {(analysis || roadmap) ? (
              <div className="bg-[#1e293b] p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={100}/></div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  {activeTab === "analysis" ? <FileText className="text-blue-500"/> : <Map className="text-blue-500"/>}
                  {activeTab === "analysis" ? "Agentic Resume Analysis" : "Personalized Career Path"}
                </h3>
                {loading ? (
                   <div className="flex flex-col items-center py-20 text-slate-500">
                      <Loader2 className="animate-spin mb-4" size={40}/>
                      <p>AI Agent is processing your request...</p>
                   </div>
                ) : (
                  <div className="text-slate-300 leading-relaxed text-lg bg-[#0f172a]/50 p-8 rounded-3xl border border-slate-700 whitespace-pre-wrap">
                    {activeTab === "analysis" ? analysis : roadmap}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-80 border-2 border-dashed border-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-600 italic">
                Awaiting input... Upload your resume or click "Smart Roadmap" to begin.
              </div>
            )}
        </div>
      </main>
    </div>
  );
}

// --- SMALL COMPONENTS ---
const SidebarBtn = ({ label, icon, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'}`}>
    {icon} {label}
  </button>
);

const KPICard = ({ label, val, sub }) => (
  <div className="bg-[#1e293b] p-8 rounded-[2rem] border border-slate-800 shadow-xl">
    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-500 mb-2">{label}</p>
    <h4 className="text-3xl font-bold text-white mb-1">{val}</h4>
    <p className="text-sm text-slate-500">{sub}</p>
  </div>
);

export default App;