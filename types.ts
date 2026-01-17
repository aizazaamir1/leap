
export interface PlotData {
  id: string;
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  area: number; 
  currentImperviousness: number; 
  floodRiskScore: number;
  beforeState: string;
  conversionType: string;
  benefits: {
    runoff: number;
    cooling: number;
    carbon: number;
  };
}

export interface SOPRequirement {
  id: string;
  label: string;
  status: 'passed' | 'failed' | 'pending';
  description: string;
}

export interface DatasetEntry {
  name: string;
  path: string;
  type: 'Raster' | 'Vector' | 'Timeseries';
  lastUpdated: string;
}
