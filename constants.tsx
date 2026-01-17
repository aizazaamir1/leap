
import React from 'react';
import { PlotData } from './types';
import { CheckCircle2, Clock } from 'lucide-react';

export const TARGET_PLOTS: PlotData[] = [
  {
    id: 'story-1410',
    address: '1410 Story Ave',
    neighborhood: 'Soundview Central',
    lat: 40.8228,
    lng: -73.8795,
    area: 1250,
    currentImperviousness: 0.92,
    floodRiskScore: 88,
    beforeState: 'Industrial Asphalt Parking',
    conversionType: 'Green Space & Bioswale',
    analysisPoints: [
      "Permeable soil captures 40% more runoff than current asphalt.",
      "Reduces immediate pressure on Soundview Ave CSO outfall.",
      "Naturally filters heavy metals before they reach Bronx River."
    ],
    benefits: { runoff: 45, cooling: 3.2, carbon: 120 }
  },
  {
    id: 'bronx-1165',
    address: '1165 Bronx Ave',
    neighborhood: 'Bronx River',
    lat: 40.8285,
    lng: -73.8820,
    area: 900,
    currentImperviousness: 0.85,
    floodRiskScore: 82,
    beforeState: 'Unused paved lot',
    conversionType: 'Green Community Space',
    analysisPoints: [
      "Deep root systems stabilize soil against heavy storm surges.",
      "Local depression storage prevents street ponding on Bronx Ave.",
      "Lowers surface temperature by 4°C during extreme heat events."
    ],
    benefits: { runoff: 55, cooling: 3.8, carbon: 140 }
  },
  {
    id: 'bruckner-zerega',
    address: 'Bruckner Blvd & Zerega',
    neighborhood: 'Bruckner Expressway',
    lat: 40.8256,
    lng: -73.8475,
    area: 5000,
    currentImperviousness: 0.99,
    floodRiskScore: 94,
    beforeState: 'At-grade service road',
    conversionType: 'Elevated Highway Segment',
    analysisPoints: [
      "Subsurface detention slows highway runoff entering local sewers.",
      "Raised geometry prevents vehicle stranding in low-point pockets.",
      "Directs peak flows to specialized heavy-duty pump stations."
    ],
    benefits: { runoff: 95, cooling: 1.5, carbon: 50 }
  },
  {
    id: 'bruckner-hunts-point',
    address: 'Bruckner & Hunts Point',
    neighborhood: 'Hunts Point',
    lat: 40.8205,
    lng: -73.8912,
    area: 4200,
    currentImperviousness: 0.97,
    floodRiskScore: 91,
    beforeState: 'Exposed surface lanes',
    conversionType: 'Subsurface Drainage + Pumps',
    analysisPoints: [
      "New drainage culverts handle 3.66 in/hr precipitation intensity.",
      "Prevents hazardous ponding at critical freight transport junctions.",
      "Backup pump arrays ensure operation during grid failure events."
    ],
    benefits: { runoff: 82, cooling: 2.1, carbon: 45 }
  },
  {
    id: 'bruckner-river-pkwy',
    address: 'Bruckner & Bronx River Pkwy',
    neighborhood: 'Bronx River Transition',
    lat: 40.8300,
    lng: -73.8860,
    area: 4500,
    currentImperviousness: 0.98,
    floodRiskScore: 89,
    beforeState: 'Chronic flood corridor',
    conversionType: 'Subsurface Detention Vaults',
    analysisPoints: [
      "Stores 10,000 cubic ft of water during tidal lock events.",
      "Prevents backflow from Bronx River into neighborhood sewers.",
      "Modular design integrates with existing expressway utilities."
    ],
    benefits: { runoff: 80, cooling: 1.2, carbon: 30 }
  },
  {
    id: 'story-metcalf',
    address: 'Story Ave & Metcalf',
    neighborhood: 'Soundview West',
    lat: 40.8235,
    lng: -73.8712,
    area: 3100,
    currentImperviousness: 0.94,
    floodRiskScore: 86,
    beforeState: 'Asphalt roadside embankment',
    conversionType: 'Floodable Park Design',
    analysisPoints: [
      "Tiered landscape design safely holds excess creek overflow.",
      "Increases neighborhood green canopy by 15% in sector 4.",
      "Native wetland grasses provide high-efficiency water uptake."
    ],
    benefits: { runoff: 70, cooling: 4.5, carbon: 210 }
  },
  {
    id: 'soundview-park-south',
    address: 'Soundview Park Edge',
    neighborhood: 'Clason Point',
    lat: 40.8115,
    lng: -73.8655,
    area: 5800,
    currentImperviousness: 0.98,
    floodRiskScore: 95,
    beforeState: 'Concrete shoreline area',
    conversionType: 'Floodable Bio-retention',
    analysisPoints: [
      "Dissipates energy from wave surge before it reaches inland.",
      "Acts as a buffer for sea-level rise predicted for 2080.",
      "Restores local hydro-connectivity with the Bronx River estuary."
    ],
    benefits: { runoff: 62, cooling: 4.1, carbon: 520 }
  }
];

export const STATUS_ICONS = {
  passed: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
  failed: <Clock className="w-4 h-4 text-rose-400" />,
  pending: <Clock className="w-4 h-4 text-amber-400" />
};
