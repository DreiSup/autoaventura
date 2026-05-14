import type { VanId } from '@/lib/types'

const ICON_MAP: Record<VanId, string> = {
  valle:  'compact',
  sierra: 'offroad',
  mar:    'premium',
  costa:  'family',
}

interface VanSilhouetteProps {
  vanId: VanId
  w?: number
  color?: string
}

export function VanSilhouette({ vanId, w = 220, color = 'var(--ink)' }: VanSilhouetteProps) {
  const h = w * 0.55
  const flavour = ICON_MAP[vanId] ?? 'family'
  const stroke = 'var(--line)'

  if (flavour === 'compact') {
    return (
      <svg width={w} height={h} viewBox="0 0 220 120" fill="none">
        <path d="M 40 36 Q 44 22 60 22 L 132 22 Q 150 22 156 36 L 176 38 Q 188 40 188 56 L 188 88 Q 188 94 182 94 L 168 94 Q 166 84 156 84 Q 146 84 144 94 L 70 94 Q 68 84 58 84 Q 48 84 46 94 L 38 94 Q 32 94 32 88 L 32 50 Q 32 38 40 36 Z"
              fill={color} />
        <path d="M 50 32 L 130 32 L 142 44 L 50 44 Z" fill="var(--bg-2)" />
        <rect x="146" y="44" width="32" height="22" fill="var(--bg-2)" />
        <circle cx="58" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
        <circle cx="58" cy="94" r="5" fill={color} />
        <circle cx="156" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
        <circle cx="156" cy="94" r="5" fill={color} />
      </svg>
    )
  }

  if (flavour === 'offroad') {
    return (
      <svg width={w} height={h} viewBox="0 0 220 120" fill="none">
        <path d="M 28 40 Q 30 24 50 24 L 110 24 L 122 38 L 184 40 Q 198 42 198 60 L 198 82 Q 198 88 192 88 L 178 88 Q 176 78 166 78 Q 156 78 154 88 L 62 88 Q 60 78 50 78 Q 40 78 38 88 L 26 88 Q 20 88 20 82 L 20 56 Q 20 42 28 40 Z"
              fill={color} />
        <path d="M 42 34 L 108 34 L 118 46 L 42 46 Z" fill="var(--bg-2)" />
        <rect x="128" y="46" width="34" height="20" fill="var(--bg-2)" />
        <rect x="166" y="46" width="22" height="20" fill="var(--bg-2)" />
        <rect x="60" y="20" width="110" height="3" fill={color} />
        <circle cx="50" cy="92" r="14" fill="var(--bg)" stroke={stroke} />
        <circle cx="50" cy="92" r="7" fill={color} />
        <circle cx="166" cy="92" r="14" fill="var(--bg)" stroke={stroke} />
        <circle cx="166" cy="92" r="7" fill={color} />
      </svg>
    )
  }

  if (flavour === 'premium') {
    return (
      <svg width={w} height={h} viewBox="0 0 220 120" fill="none">
        <path d="M 24 36 Q 28 22 48 22 L 124 22 Q 140 22 150 32 L 196 38 Q 208 40 208 56 L 208 88 Q 208 94 202 94 L 184 94 Q 182 84 172 84 Q 162 84 160 94 L 60 94 Q 58 84 48 84 Q 38 84 36 94 L 22 94 Q 16 94 16 88 L 16 50 Q 16 38 24 36 Z"
              fill={color} />
        <path d="M 38 30 L 124 30 L 138 44 L 38 44 Z" fill="var(--bg-2)" />
        <rect x="148" y="46" width="54" height="26" fill="var(--bg-2)" />
        <circle cx="48" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
        <circle cx="48" cy="94" r="5" fill={color} />
        <circle cx="172" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
        <circle cx="172" cy="94" r="5" fill={color} />
      </svg>
    )
  }

  // family / Costa
  return (
    <svg width={w} height={h} viewBox="0 0 220 120" fill="none">
      <path d="M 28 38 L 28 22 L 92 22 L 96 38 Z" fill={color} />
      <path d="M 28 38 L 96 38 L 100 34 L 204 36 Q 212 38 212 52 L 212 88 Q 212 94 206 94 L 188 94 Q 186 84 176 84 Q 166 84 164 94 L 60 94 Q 58 84 48 84 Q 38 84 36 94 L 24 94 Q 18 94 18 88 L 18 50 Q 18 38 28 38 Z"
            fill={color} />
      <path d="M 102 40 L 200 40 L 200 60 L 102 60 Z" fill="var(--bg-2)" />
      <line x1="148" y1="40" x2="148" y2="60" stroke={color} strokeWidth="2" />
      <rect x="42" y="44" width="44" height="14" fill="var(--bg-2)" />
      <circle cx="48" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
      <circle cx="48" cy="94" r="5" fill={color} />
      <circle cx="176" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
      <circle cx="176" cy="94" r="5" fill={color} />
    </svg>
  )
}
