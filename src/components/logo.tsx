import { cn } from '@/lib/utils'

interface LogoProps {
  size?: number
  color?: string
  className?: string
}

export function Logo({ size = 20, color = 'var(--ink)', className }: LogoProps) {
  return (
    <div
      className={cn('inline-flex items-center gap-2 font-display font-bold', className)}
      style={{ color, fontSize: size, letterSpacing: '-0.02em' }}
    >
      <span
        className="relative shrink-0 rounded-full bg-terra"
        style={{ width: size * 1.2, height: size * 1.2 }}
      >
        <span className="absolute inset-[22%] rounded-full bg-bg" />
      </span>
      autaventura
    </div>
  )
}
