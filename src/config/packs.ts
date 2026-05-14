import type { Pack } from '@/lib/types'

export const PACKS: Pack[] = [
  {
    id: 'aventurero',
    name: 'Pack Aventurero',
    sub: 'Base',
    addPerDay: 0,
    tagline: 'Para quien ya sabe lo que hace.',
    bullets: [
      { ok: true,  text: 'Hasta 250 km/día incluidos' },
      { ok: true,  text: 'Seguro a todo riesgo' },
      { ok: true,  text: 'Asistencia 24 h en carretera' },
      { ok: false, text: 'Devuélvela limpia' },
      { ok: false, text: 'Devuélvela con el depósito lleno' },
    ],
  },
  {
    id: 'sinpreo',
    name: 'Pack Sin Preocupaciones',
    sub: 'Recomendado',
    addPerDay: 18,
    tagline: 'Sube, conduce, disfruta.',
    bullets: [
      { ok: true,  text: 'Kilometraje ilimitado' },
      { ok: true,  text: 'Seguro a todo riesgo' },
      { ok: true,  text: 'Asistencia 24 h en carretera' },
      { ok: true,  text: 'Limpieza al devolver — incluida' },
      { ok: true,  text: 'Depósito lleno al devolver — incluido' },
    ],
  },
]

export const COMPARE_ROWS = [
  { feat: 'Seguro a todo riesgo',   a: true,          b: true },
  { feat: 'Asistencia 24 h',        a: true,          b: true },
  { feat: 'Kilómetros',             a: '250 km/día',  b: 'Ilimitados' },
  { feat: 'Limpieza al devolver',   a: 'A tu cargo',  b: 'Incluida' },
  { feat: 'Depósito al devolver',   a: 'Lleno',       b: 'Incluido' },
  { feat: 'Segundo conductor',      a: true,          b: true },
  { feat: 'Cancelación flexible',   a: true,          b: true },
] as const
