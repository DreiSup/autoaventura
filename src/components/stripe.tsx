import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { StripeKind } from '@/lib/types'

const GRADIENTS: Record<StripeKind, string> = {
  '':      'repeating-linear-gradient(135deg, #e8dec9 0 14px, #ddd1b7 14px 28px)',
  dark:    'repeating-linear-gradient(135deg, #3a342c 0 14px, #2c2722 14px 28px)',
  terra:   'repeating-linear-gradient(135deg, #d27258 0 14px, #c2553a 14px 28px)',
  sage:    'repeating-linear-gradient(135deg, #8b9882 0 14px, #7a8870 14px 28px)',
}

const LABEL_COLORS: Record<StripeKind, string> = {
  '':    'text-ink-2 bg-[rgba(243,237,226,0.88)]',
  dark:  'text-bg-2 bg-[rgba(35,33,30,0.7)]',
  terra: 'text-white bg-[rgba(35,33,30,0.45)]',
  sage:  'text-white bg-[rgba(35,33,30,0.4)]',
}

interface StripeProps {
  kind?: StripeKind
  label?: string
  className?: string
  src?: string
  alt?: string
}

export function Stripe({ kind = '', label, className, src, alt }: StripeProps) {
  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden', className)}
      style={src ? undefined : { background: GRADIENTS[kind] }}
    >
      {src && (
        <Image src={src} alt={alt ?? label ?? ''} fill className="object-cover" />
      )}
      {!src && label && (
        <span
          className={cn(
            'relative font-mono text-[11px] tracking-[0.04em] lowercase text-center px-2.5 py-1.5 rounded-sm max-w-[80%]',
            LABEL_COLORS[kind],
          )}
        >
          {label}
        </span>
      )}
    </div>
  )
}
