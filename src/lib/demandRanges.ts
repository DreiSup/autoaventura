export type DemandLevel = 'low' | 'mid' | 'high' | 'especial';

export interface DemandRange {
  from: string; // 'MM-DD'
  to: string;   // 'MM-DD'
  level: DemandLevel;
  label_es: string;
  label_en: string;
}

export const DEMAND_RANGES: DemandRange[] = [
  { from: '03-28', to: '04-06', level: 'especial', label_es: 'Semana Santa', label_en: 'Easter' },
  { from: '07-01', to: '08-31', level: 'high',     label_es: 'Verano',       label_en: 'Summer' },
  { from: '12-22', to: '01-06', level: 'high',     label_es: 'Navidades',    label_en: 'Christmas' },
  { from: '06-01', to: '06-30', level: 'mid',      label_es: 'Junio',        label_en: 'June' },
  { from: '09-01', to: '09-30', level: 'mid',      label_es: 'Septiembre',   label_en: 'September' },
  // El resto cae en 'low' por defecto
];


export function getDemandLevel(date: Date): DemandLevel {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day   = String(date.getDate()).padStart(2, '0');
    const md    = `${month}-${day}`;
}