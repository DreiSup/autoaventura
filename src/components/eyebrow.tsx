import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 font-display text-xs font-semibold tracking-[0.16em] uppercase text-terra',
        'before:content-[""] before:w-6 before:h-px before:bg-current',
        className,
      )}
    >
      {children}
    </div>
  )
}
