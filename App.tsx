import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import AnalysisPanel from './components/AnalysisPanel';
import Header from './components/Header';
import { PlotData } from './types';
import { Droplets, Power, Activity, Shield, Database } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);
  const [isGreenEnabled, setIsGreenEnabled] = useState(false);
  const [showFloodMap, setShowFloodMap] = useState(true);
  const [appState, setAppState] = useState<'IDLE' | 'SCANNING' | 'READY'>('IDLE');
  const [scanStep, setScanStep] = useState(0);
  const [isCorrDiffActive, setIsCorrDiffActive] = useState(false);

  const steps = [
    "Locating Terrain Grids...",
    "Syncing Elevation Data...",
    "Loading Water Level History...",
    "Mapping Local Drainage...",
    "Finalizing Interface..."
  ];

  const startInitialScan = () => {
    setAppState('SCANNING');
    let step = 0;
    const interval = setInterval(() => {
      setScanStep(s => s + 1);
      step++;
      if (step >= 100) {
        clearInterval(interval);
        setTimeout(() => setAppState('READY'), 500);
      }
    }, 40);
  };

  const handlePlotSelect = (plot: PlotData | null) => {
    if (!plot || (selectedPlot && selectedPlot.id === plot.id)) {
      setSelectedPlot(null);
      setIsCorrDiffActive(false);
    } else {
      setSelectedPlot(plot);
      setIsCorrDiffActive(false);
    }
  };

  return (
    <div className={`relative h-screen w-screen overflow-hidden font-['Outfit'] transition-colors duration-1000 ${isGreenEnabled ? 'bg-[#020a05]' : 'bg-[#050505]'}`}>
      {/* High-Impact Startup */}
      {appState === 'IDLE' && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-[#050505]">
          <div className="w-full max-w-lg p-12 text-center space-y-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-orange-400/20 to-orange-600/20 border border-orange-500/30 rounded-[2rem] flex items-center justify-center shadow-2xl">
                <Droplets className="w-12 h-12 text-orange-400" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Soundview Flood Map</h2>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-[0.3em]">Soundview • Bronx River Monitoring</p>
            </div>
            <button 
              onClick={startInitialScan}
              className="group relative px-12 py-6 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl transition-all shadow-2xl shadow-orange-900/40 flex items-center gap-4 mx-auto overflow-hidden active:scale-95"
            >
              <Power className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span className="font-black text-base uppercase tracking-widest">Enter Dashboard</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
      )}

      {/* Sophisticated Loading */}
      {appState === 'SCANNING' && (
        <div className="absolute inset-0 z-[150] flex flex-col items-center justify-center bg-[#050505]">
          <div className="w-96 space-y-8">
            <div className="flex justify-between items-end mb-2">
              <div className="space-y-1">
                <p className="text-[10px] text-orange-500 font-black tracking-widest uppercase">Initializing System</p>
                <h3 className="text-lg font-bold text-white transition-all duration-300">
                  {steps[Math.min(Math.floor(scanStep / 20), steps.length - 1)]}
                </h3>
              </div>
              <span className="text-3xl font-black text-white font-mono">{scanStep}%</span>
            </div>
            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]" style={{ width: `${scanStep}%` }} />
            </div>
            <div className="grid grid-cols-3 gap-4 opacity-40">
              <div className="h-1 bg-slate-800 rounded-full" />
              <div className="h-1 bg-slate-800 rounded-full" />
              <div className="h-1 bg-slate-800 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Main UI */}
      <div className="absolute inset-0 z-0">
        <MapComponent 
          selectedPlot={selectedPlot}
          onPlotSelect={handlePlotSelect}
          isGreenEnabled={isGreenEnabled}
          showFloodMap={showFloodMap}
          isScanning={appState === 'SCANNING'}
          isCorrDiffActive={isCorrDiffActive}
        />
      </div>

      <div className={`transition-all duration-1000 ${appState !== 'READY' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="absolute top-0 left-0 right-0 z-50 p-6 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-between items-start">
            <Header isRunning={appState === 'READY'} isGreen={isGreenEnabled} />
          </div>
        </div>

        <div className="absolute top-24 left-6 z-40 w-80 pointer-events-auto">
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
            <Sidebar 
              showFloodMap={showFloodMap}
              setShowFloodMap={setShowFloodMap}
              isGreenEnabled={isGreenEnabled}
              setIsGreenEnabled={setIsGreenEnabled}
            />
          </div>
        </div>

        <div className={`absolute top-24 right-6 z-40 w-96 transition-all duration-500 ease-out transform ${selectedPlot ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'}`}>
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[calc(100vh-10rem)]">
            <AnalysisPanel 
              selectedPlot={selectedPlot}
              isGreenEnabled={isGreenEnabled}
              setIsCorrDiffActive={setIsCorrDiffActive}
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
          <div className={`glass-panel px-8 py-3 rounded-full flex items-center gap-6 border transition-colors duration-1000 ${isGreenEnabled ? 'border-emerald-500/30 shadow-emerald-900/20' : 'border-orange-500/30 shadow-orange-900/20'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isGreenEnabled ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-orange-500 shadow-[0_0_10px_#f97316]'}`} />
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isGreenEnabled ? 'text-emerald-400' : 'text-orange-400'}`}>
                {isGreenEnabled ? 'Optimized Grid Active' : 'Baseline Monitoring'}
              </span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex gap-4">
              <Activity className="w-4 h-4 text-slate-500" />
              <Shield className="w-4 h-4 text-slate-500" />
              <Database className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;