
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { PlotData } from '../types';
import { TARGET_PLOTS } from '../constants';

interface MapComponentProps {
  selectedPlot: PlotData | null;
  onPlotSelect: (plot: PlotData | null) => void;
  isGreenEnabled: boolean;
  showFloodMap: boolean;
  isScanning: boolean;
  isCorrDiffActive: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  selectedPlot, 
  onPlotSelect, 
  isGreenEnabled,
  showFloodMap,
  isScanning,
  isCorrDiffActive
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{ [key: string]: L.Layer }>({});
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [40.824, -73.868],
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png').addTo(map);
    mapRef.current = map;

    // Deselect logic for background clicks
    map.on('click', (e) => {
      onPlotSelect(null);
    });

    // AQUATIC BLUE FLOOD SHAPES
    const floodZones = L.layerGroup();
    const aquaticStyle = { 
      color: '#0ea5e9', 
      fillColor: '#0ea5e9', 
      fillOpacity: 0.2, 
      weight: 1.2,
      className: 'flood-pulse-active'
    };
    
    // Detailed corridor flooding (Hunts Point to Soundview)
    L.polygon([[40.828, -73.885], [40.825, -73.880], [40.820, -73.885], [40.822, -73.890]], aquaticStyle).addTo(floodZones);
    L.polygon([[40.832, -73.865], [40.828, -73.860], [40.825, -73.868], [40.830, -73.872]], aquaticStyle).addTo(floodZones);
    L.polygon([[40.810, -73.865], [40.805, -73.855], [40.808, -73.850], [40.815, -73.860]], aquaticStyle).addTo(floodZones);
    L.polygon([[40.824, -73.850], [40.820, -73.840], [40.815, -73.845], [40.822, -73.855]], aquaticStyle).addTo(floodZones);
    L.polygon([[40.840, -73.890], [40.835, -73.880], [40.830, -73.885], [40.835, -73.895]], aquaticStyle).addTo(floodZones);

    layersRef.current['flood'] = floodZones;

    // Rounded Diamond Markers
    TARGET_PLOTS.forEach(plot => {
      const icon = L.divIcon({
        className: 'marker-diamond-wrapper',
        html: `
          <div class="diamond-pin opacity-0 transition-all duration-700 transform scale-0" id="pin-${plot.id}" style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
            <div class="diamond-inner bg-orange-500 border-[1.5px] border-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-500 rounded-[3px]" style="width: 14px; height: 14px; transform: rotate(45deg);"></div>
          </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([plot.lat, plot.lng], { icon }).addTo(map);
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onPlotSelect(plot);
      });
      markersRef.current[plot.id] = marker;
    });

    return () => { map.remove(); };
  }, []);

  // Post-scan marker animation
  useEffect(() => {
    if (!isScanning && mapRef.current) {
      TARGET_PLOTS.forEach((plot, index) => {
        setTimeout(() => {
          const marker = markersRef.current[plot.id];
          if (marker) {
            const pin = marker.getElement()?.querySelector('.diamond-pin');
            if (pin) pin.classList.remove('opacity-0', 'scale-0');
          }
        }, index * 100);
      });
    }
  }, [isScanning]);

  // Handle Layer Visibilty and Mode Toggles
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const fg = layersRef.current['flood'] as L.LayerGroup;
    if (showFloodMap) {
      fg.addTo(map);
      fg.getLayers().forEach((l: any) => {
        if (isGreenEnabled) {
          l.setStyle({ fillColor: '#10b981', fillOpacity: 0.1, color: '#10b981', weight: 0.5 });
        } else {
          l.setStyle({ fillColor: '#0ea5e9', fillOpacity: 0.2, color: '#0ea5e9', weight: 1.2 });
        }
      });
    } else {
      if (map.hasLayer(fg)) map.removeLayer(fg);
    }

    // Refresh Marker Styling
    TARGET_PLOTS.forEach(plot => {
      const marker = markersRef.current[plot.id];
      const inner = marker?.getElement()?.querySelector('.diamond-inner') as HTMLElement;
      const isSelected = selectedPlot?.id === plot.id;
      
      if (inner) {
        if (isGreenEnabled) {
          inner.classList.replace('bg-orange-500', 'bg-emerald-500');
          inner.style.boxShadow = isSelected ? '0 0 30px #10b981' : '0 0 10px rgba(16,185,129,0.2)';
        } else {
          inner.classList.replace('bg-emerald-500', 'bg-orange-500');
          inner.style.boxShadow = isSelected ? '0 0 30px #f97316' : '0 0 10px rgba(249,115,22,0.2)';
        }
        
        if (isSelected) {
          inner.classList.add('scale-150');
          inner.style.zIndex = '100';
        } else {
          inner.classList.remove('scale-150');
          inner.style.zIndex = '0';
        }
      }
    });
  }, [showFloodMap, isGreenEnabled, selectedPlot]);

  useEffect(() => {
    if (selectedPlot && mapRef.current && !isScanning) {
      mapRef.current.flyTo([selectedPlot.lat, selectedPlot.lng], 16, { duration: 1.2, easeLinearity: 0.25 });
    }
  }, [selectedPlot, isScanning]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapComponent;
