
import React from 'react';
import { Activity, Layers, Droplets, Info } from 'lucide-react';

interface SidebarProps {
  showFloodMap: boolean;
  setShowFloodMap: (val: boolean) => void;
  isGreenEnabled: boolean;
  setIsGreenEnabled: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  showFloodMap, 
  setShowFloodMap, 
  isGreenEnabled, 
  setIsGreenEnabled 
}) => {
  return (
    <div className="p-6 space-y-6 bg-transparent">
      <section>
        <div className="flex items-center gap-2 mb-4 px-2">
          <Activity className="w-3.5 h-3.5 text-white/40" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">Visual Layers</h3>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={() => setShowFloodMap(!showFloodMap)}
            className={`w-full group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
              showFloodMap 
                ? 'bg-orange-500/10 border-orange-500/30' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors duration-300 ${showFloodMap ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                <Droplets className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className={`text-[10px] font-black uppercase tracking-tight ${showFloodMap ? 'text-orange-400' : 'text-slate-400'}`}>Live Flood Map</span>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">SFINCS Overlay</span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setIsGreenEnabled(!isGreenEnabled)}
            className={`w-full group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
              isGreenEnabled 
                ? 'bg-emerald-500/10 border-emerald-500/30' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors duration-300 ${isGreenEnabled ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className={`text-[10px] font-black uppercase tracking-tight ${isGreenEnabled ? 'text-emerald-400' : 'text-slate-400'}`}>Green Spaces</span>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Target Conversions</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-3 h-3 text-slate-500" />
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Dashboard Info</span>
        </div>
        <p className="text-[10px] leading-tight text-slate-400 font-bold italic opacity-70">
          Blue corridors indicate high-risk street ponding. Select any diamond node to evaluate site-specific green infrastructure.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
