import React, { useState } from 'react';
import { PlotData } from '../types';
import { Droplets, Sparkles, Loader2, ArrowDown, ChevronRight, Zap, EyeOff, TreePine, Info } from 'lucide-react';

interface AnalysisPanelProps {
  selectedPlot: PlotData | null;
  isGreenEnabled: boolean;
  setIsCorrDiffActive: (val: boolean) => void;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ selectedPlot, isGreenEnabled, setIsCorrDiffActive }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const runAnalysis = () => {
    setIsProcessing(true);
    setIsCorrDiffActive(true);
    setTimeout(() => setIsProcessing(false), 1500);
  };

  if (!selectedPlot) return null;

  return (
    <div className="p-8 space-y-8 flex flex-col overflow-y-auto flex-grow custom-scrollbar bg-transparent">
      <header className="space-y-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-white/10 text-white/60`}>
            {selectedPlot.neighborhood}
          </span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tighter leading-none">{selectedPlot.address}</h2>
      </header>

      {/* Strategy focus - Unlocked via Green Spaces */}
      <section className={`p-6 rounded-2xl border transition-all duration-700 shrink-0 ${
        isGreenEnabled ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.05)]' : 'bg-white/5 border-white/10 shadow-none'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          {isGreenEnabled ? <TreePine className="w-5 h-5 text-emerald-400" /> : <EyeOff className="w-5 h-5 text-slate-500" />}
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {isGreenEnabled ? 'Target Conversion' : 'Potential Conversion'}
          </h3>
        </div>
        
        {isGreenEnabled ? (
          <div className="animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
            <p className="text-xl font-black leading-tight text-white mb-2">
              {selectedPlot.conversionType}
            </p>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              SFINCS Optimized Design
            </div>
          </div>
        ) : (
          <div className="py-2">
            <p className="text-xs text-slate-500 font-bold leading-relaxed italic opacity-60">
              Toggle "Green Spaces" to reveal the engineering strategy for this sector.
            </p>
          </div>
        )}
      </section>

      <div className="grid grid-cols-2 gap-4 shrink-0">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">Water Retention</span>
          <div className="flex items-center gap-2">
            <span className={`text-xl font-black ${isGreenEnabled ? 'text-emerald-400' : 'text-slate-200'}`}>
              {isGreenEnabled ? `+${selectedPlot.benefits.runoff}%` : 'Standard'}
            </span>
            {isGreenEnabled && <ArrowDown className="w-3 h-3 text-emerald-500 rotate-180" />}
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">Impact Level</span>
          <span className={`text-xl font-black ${isGreenEnabled ? 'text-emerald-400' : 'text-orange-500'}`}>
            {isGreenEnabled ? 'OPTIMAL' : 'CRITICAL'}
          </span>
        </div>
      </div>

      {/* Hydrological Profile - Insights unlock with Green Spaces */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden shrink-0">
        <div className="flex items-center gap-3 mb-5">
          <Droplets className={`w-4 h-4 ${isGreenEnabled ? 'text-emerald-400' : 'text-orange-400'}`} />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hydrological Profile</h3>
        </div>
        
        {isGreenEnabled ? (
          <ul className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {selectedPlot.analysisPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="w-3 h-3 mt-1 shrink-0 text-emerald-500" />
                <p className="text-[11px] leading-tight text-slate-300 font-bold">{p}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-3 py-4 text-slate-600">
            <Info className="w-4 h-4 shrink-0" />
            <p className="text-[11px] font-bold italic">Scientific profiling requires "Green Space" activation.</p>
          </div>
        )}
      </div>

      <button 
        onClick={runAnalysis}
        disabled={isProcessing}
        className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border shrink-0 ${
          isProcessing 
            ? 'bg-slate-800/50 border-white/5 text-slate-500' 
            : isGreenEnabled 
              ? 'bg-emerald-600/20 border-emerald-500/40 hover:bg-emerald-600/40 text-emerald-400 shadow-emerald-500/10'
              : 'bg-orange-600/20 border-orange-500/40 hover:bg-orange-600/40 text-orange-400 shadow-orange-500/10 active:scale-95'
        } shadow-xl`}
      >
        {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
        {isProcessing ? 'Processing Model...' : 'Simulate Flood Runoff'}
      </button>
      
      {/* Spacer to ensure last element is visible when scrolling */}
      <div className="h-4 shrink-0" />
    </div>
  );
};

export default AnalysisPanel;