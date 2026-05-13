import Link from 'next/link'
import { Logo } from '@/components/logo'

export function MobileNav() {
  return (
    <nav className="sticky top-0 z-20 bg-bg flex items-center justify-between py-4 px-5">
      <Link href="/" aria-label="Autaventura — inicio">
        <Logo size={17} />
      </Link>

      <button
        aria-label="Abrir menú"
        className="w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M1 4h12M1 10h12" />
        </svg>
      </button>
    </nav>
  )
}
