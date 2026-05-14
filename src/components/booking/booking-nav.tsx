import Link from 'next/link'
import { Logo } from '@/components/logo'

export function BookingNav() {
  return (
    <nav className="flex items-center justify-between px-8 md:px-16 py-5 bg-bg border-b border-line sticky top-0 z-20">
      <Link href="/"><Logo size={20} /></Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-display text-[13px] text-ink-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ok" />
          Reserva segura
        </div>
        <span className="w-px h-4 bg-line" />
        <a href="https://wa.me/34600000000" className="font-display text-[13px] font-medium text-ink-2 hover:text-ink transition-colors">
          ¿Dudas? <span className="underline underline-offset-[3px]">Escríbenos</span>
        </a>
      </div>
    </nav>
  )
}
