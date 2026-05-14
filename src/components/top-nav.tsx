import Link from 'next/link'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

type NavSection = 'home' | 'fleet' | 'how' | 'faq' | 'contact'

interface TopNavProps {
  active?: NavSection
}

const LINKS: { href: string; label: string; section: NavSection }[] = [
  { href: '/flota',    label: 'Flota',           section: 'fleet'   },
  { href: '/como',     label: 'Cómo funciona',   section: 'how'     },
  { href: '/preguntas',label: 'Preguntas',        section: 'faq'     },
  { href: '/contacto', label: 'Contacto',         section: 'contact' },
]

export function TopNav({ active = 'home' }: TopNavProps) {
  return (
    <nav className="sticky top-0 z-20 bg-bg flex items-center justify-between py-5 px-16">
      <Link href="/" aria-label="Autoaventura — inicio">
        <Logo size={20} />
      </Link>

      <div className="flex items-center gap-9 font-display text-sm font-medium">
        {LINKS.map(({ href, label, section }) => (
          <Link
            key={section}
            href={href}
            className={cn(
              'transition-colors',
              active === section ? 'text-terra' : 'text-ink hover:text-terra',
            )}
          >
            {label}
          </Link>
        ))}
      </div>

      <Link
        href="/reservar"
        className="bg-ink text-paper font-display text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors"
      >
        Reservar
      </Link>
    </nav>
  )
}
