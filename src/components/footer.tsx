import Link from 'next/link'
import { Logo } from '@/components/logo'
import { getSiteConfig } from '@/lib/data'

export function Footer({ compact = false }: { compact?: boolean }) {
  const site = getSiteConfig()

  return (
    <footer className="bg-ink text-bg-3 text-sm" style={{ padding: compact ? '40px 20px 24px' : '64px 64px 32px' }}>
      <div
        className="grid gap-8 mb-12"
        style={{ gridTemplateColumns: compact ? '1fr' : '1.5fr 1fr 1fr 1fr' }}
      >
        <div>
          <Logo size={20} color="var(--paper)" />
          <p className="mt-4 max-w-[280px] text-ink-4 leading-relaxed">
            Autocaravanas honestas. Desde Valencia, para toda España y Europa.
          </p>
        </div>

        <FooterCol title="Explorar">
          <FooterLink href="/flota">Flota</FooterLink>
          <FooterLink href="/como">Cómo funciona</FooterLink>
          <FooterLink href="/preguntas">Preguntas</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
        </FooterCol>

        <FooterCol title="Contacto">
          <span>{site.phone}</span>
          <span>{site.email}</span>
          <span>{site.address.street}</span>
          <span>{site.address.zip} {site.address.city}</span>
        </FooterCol>

        <FooterCol title="Legal">
          <FooterLink href="#">Aviso Legal</FooterLink>
          <FooterLink href="#">Política de Privacidad</FooterLink>
          <FooterLink href="#">Política de Cookies</FooterLink>
          <FooterLink href="#">Términos del alquiler</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between gap-4 text-ink-4 text-xs">
        <span>NIF {site.nif} · {site.legalName}</span>
        <span>© {new Date().getFullYear()} {site.name} · Hecho con cariño en Valencia</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 className="font-display text-[13px] font-semibold text-paper mb-3.5 tracking-[0.06em] uppercase">
        {title}
      </h5>
      <ul className="flex flex-col gap-2 text-bg-3">
        {children}
      </ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-paper transition-colors">
        {children}
      </Link>
    </li>
  )
}
