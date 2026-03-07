import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, RadarSeries } from 'recharts';
import { Bot, FileText, Zap, Upload, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Sample initial data for the "Wow" factor
const initialData = [
  { subject: 'Python', A: 120, fullMark: 150 },
  { subject: 'ML', A: 98, fullMark: 150 },
  { subject: 'Data Science', A: 86, fullMark: 150 },
  { subject: 'Logic', A: 99, fullMark: 150 },
];

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      // Connects to your FastAPI endpoint
      const response = await axios.post('http://localhost:8000/upload', formData);
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              VidyaGuide AI
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Your Agentic Career Orchestrator</p>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3 rounded-2xl flex items-center gap-3 transition-all active:scale-95">
              <Upload size={20} className="text-blue-400" />
              <span className="font-semibold">{file ? file.name : "Upload Resume"}</span>
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf" />
            </label>
            <button className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold transition-all active:scale-95">
              <Zap size={20}/> Launch Agent
            </button>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Skill Radar Section */}
          <motion.div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-2xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Bot className="text-blue-400" /> Cognitive Skill Mapping
            </h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={initialData}>
                  <PolarGrid stroke="#334155" strokeWidth={0.5} />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 14, fontWeight: 600}} />
                  <Radar name="Candidate" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AI Insights & Status */}
          <div className="space-y-8">
            <motion.div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 rounded-[2rem] border border-indigo-500/20 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="text-emerald-400" size={20} /> Agent Status
              </h3>
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-400 leading-relaxed italic">
                    Agent is currently reasoning through your profile using IBM Granite-3.0...
                  </motion.p>
                ) : (
                  <p className="text-slate-300 leading-relaxed">
                    {analysis ? analysis : "Ready to analyze. Upload your resume to begin your tailored path for GATE 2026."}
                  </p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Progress Card */}
            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800">
              <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Readiness Score</h3>
              <div className="text-6xl font-black text-white">84<span className="text-blue-500 text-3xl">%</span></div>
              <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[84%] shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}