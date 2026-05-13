export type Season = 'low' | 'mid' | 'high'

export interface SeasonDef {
  id:        Season
  label_es:  string
  label_en:  string
  months_es: string
  months_en: string
}

export const SEASONS: SeasonDef[] = [
  { id: 'low',  label_es: 'Temporada baja',  label_en: 'Low season',  months_es: 'Nov–Mar',              months_en: 'Nov–Mar'           },
  { id: 'mid',  label_es: 'Temporada media', label_en: 'Mid season',  months_es: 'Abr, May, Sep, Oct',   months_en: 'Apr, May, Sep, Oct' },
  { id: 'high', label_es: 'Temporada alta',  label_en: 'High season', months_es: 'Jun–Ago, Semana Santa', months_en: 'Jun–Aug, Easter'   },
]

export interface RentalItem {
  key:      string
  label_es: string
  label_en: string
}

export const INCLUDED: RentalItem[] = [
  { key: 'linen',   label_es: 'Sábanas y toallas',           label_en: 'Bed linen & towels'        },
  { key: 'kitchen', label_es: 'Menaje y batería de cocina',   label_en: 'Full kitchen kit'           },
  { key: 'gas',     label_es: 'Bombona de gas llena',         label_en: 'Full gas bottle'            },
  { key: 'water',   label_es: 'Depósitos llenos',             label_en: 'Full water tanks'           },
  { key: 'km',      label_es: 'Kilometraje ilimitado',        label_en: 'Unlimited mileage'          },
  { key: 'ins',     label_es: 'Seguro a todo riesgo',         label_en: 'Full insurance'             },
  { key: 'assist',  label_es: 'Asistencia en carretera 24 h', label_en: '24h roadside assistance'   },
  { key: 'driver2', label_es: 'Segundo conductor sin coste',  label_en: 'Second driver, free'        },
  { key: 'table',   label_es: 'Mesa y sillas de exterior',    label_en: 'Outdoor table & chairs'    },
  { key: 'awning',  label_es: 'Toldo lateral',                label_en: 'Side awning'               },
]

export const NOT_INCLUDED: RentalItem[] = [
  { key: 'fuel',   label_es: 'Gasoil (devuélvela como te la entregamos)', label_en: 'Diesel (return as you got it)'  },
  { key: 'tolls',  label_es: 'Peajes y parkings',                         label_en: 'Tolls & paid parking'          },
  { key: 'camp',   label_es: 'Camping y áreas',                           label_en: 'Campsites & van areas'         },
  { key: 'ferry',  label_es: 'Ferries y eurotúnel',                       label_en: 'Ferries & Eurotunnel'          },
  { key: 'excess', label_es: 'Reducción de franquicia (opcional)',         label_en: 'Excess reduction (optional)'   },
  { key: 'pets',   label_es: 'Mascotas (+30€/viaje, avisa al reservar)',  label_en: 'Pets (+€30/trip, tell us)'    },
]

export const POLICY = {
  deposit:          1200,
  depositReturnDays: { min: 7, max: 10 },
  excessDefault:    1200,
  excessReduced:    300,
  excessReduceCost: 12,
  cancelFreeDays:   30,
  cancelHalfDays:   14,
} as const
