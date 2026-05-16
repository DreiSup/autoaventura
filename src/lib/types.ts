export type Lang = 'es' | 'en'
export type VanId = 'costa' | 'sierra' | 'valle' | 'mar'
export type VanColor = 'terra' | 'sage' | 'ink'
export type LicenseType = 'B' | 'C1'
export type KitchenType = 'full' | 'compact' | 'premium' | 'else'
export type StripeKind = '' | 'dark' | 'terra' | 'sage'


export interface VanBase {
    name:    string   // 'Sprinter 4x4'
    kind_es: string   // 'Camperizada'
    kind_en: string   // 'Camper conversion'
  }

export interface VanPrice {
    low:  number
    especial: number
    mid:  number
    high: number
    extra: number
    bond: number
}

export interface PriceTier {
    d_es: string   // '3 a 6 días'
    d_en: string   // '3 to 6 days'
    per:  number   // €/día para este tramo
  }


export interface Van {
    id:              VanId
    model:           string        // 'Roller Team 2024 Kronos Advance 284 TL'
    name:            string
    tagline_es:      string
    tagline_en:      string
    descr_es:        string
    descr_en:        string
    perfect_es:      string[]
    perfect_en:      string[]
    not_es:          string[]
    not_en:          string[]
    sleeps:          number
    seats:           number
    license:         LicenseType
    length:          string        // '6.94 m'
    transmission_es: string
    transmission_en: string
    consumption:     string        // '8.2 L/100'
    bath:            boolean
    kitchen:         KitchenType
    offroad:         boolean
    base:            VanBase
    price:           VanPrice
    tiers:           PriceTier[]
    color:           VanColor
    mma?:            number
    widthXlength?:   string
    motor?:          string
    deposit?:        number
    cleanWater?:     number
    grayWater?:      number
    images?:         string[]   // primer elemento = hero

  }


export interface DateRange {
    start: Date | null
    end:   Date | null
}

export interface FaqItem {
    q: string
    a: string
}

export interface GalleryShot {
    kind:  StripeKind
    label: string
}

export type PackId = 'aventurero' | 'sinpreo'

export interface PackBullet {
  ok:   boolean
  text: string
}

export interface Pack {
  id:         PackId
  name:       string
  sub:        string
  addPerDay:  number
  tagline:    string
  bullets:    PackBullet[]
}