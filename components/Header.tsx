import React from 'react';
import { Droplets, Info } from 'lucide-react';

interface HeaderProps {
  isRunning: boolean;
  isGreen: boolean;
}

const Header: React.FC<HeaderProps> = ({ isRunning, isGreen }) => {
  return (
    <div className="flex items-center justify-between w-full pointer-events-auto">
      <div className="glass-panel px-8 py-5 rounded-[2.5rem] flex items-center gap-6 border-white/5 shadow-2xl">
        <div className={`p-3 rounded-2xl shadow-xl transition-all duration-1000 ${
          isGreen ? 'bg-emerald-500 rotate-12' : 'bg-orange-500'
        }`}>
          <Droplets className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase leading-none">Soundview Flood Map</h1>
          <div className="flex items-center gap-3 mt-1.5">
            <span className={`text-[10px] font-black uppercase tracking-widest ${isGreen ? 'text-emerald-400' : 'text-orange-400'}`}>
              Interactive Drainage Map
            </span>
          </div>
        </div>
      </div>

      <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-6 border-white/5">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Active Status</span>
          <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Live Updates Available</p>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white">
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;