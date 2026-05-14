'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'

const LINKS = [
  { href: '/flota',     label: 'Flota' },
  { href: '/como',      label: 'Cómo funciona' },
  { href: '/preguntas', label: 'Preguntas' },
  { href: '/contacto',  label: 'Contacto' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-30 bg-bg flex items-center justify-between py-4 px-5 border-b border-line">
        <Link href="/" aria-label="Autoaventura — inicio" onClick={() => setOpen(false)}>
          <Logo size={17} />
        </Link>

        <button
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(o => !o)}
          className="w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
        >
          {open ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
              <path d="M1 4h12M1 10h12" />
            </svg>
          )}
        </button>
      </nav>

      {/* Drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-ink/40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer panel */}
      <div className={[
        'fixed top-0 right-0 z-40 h-full w-[280px] bg-bg shadow-float flex flex-col transition-transform duration-300',
        open ? 'translate-x-0' : 'translate-x-full',
      ].join(' ')}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <Logo size={17} />
          <button
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-2"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-5 pt-6 gap-1">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-display font-medium text-[18px] text-ink py-3 border-b border-line hover:text-terra transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-5 pb-8 pt-6 flex flex-col gap-3">
          <Link
            href="/reservar"
            onClick={() => setOpen(false)}
            className="bg-terra text-[#fff7ef] font-display font-semibold text-base px-5 py-3.5 rounded-full text-center hover:bg-terra-dk transition-colors"
          >
            Reservar
          </Link>
          <a
            href="https://wa.me/34962123456"
            className="border border-line font-display font-medium text-sm text-ink-2 px-5 py-3 rounded-full text-center hover:bg-bg-2 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
