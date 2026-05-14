import Link from 'next/link'
import { TopNav } from '@/components/top-nav'
import { MobileNav } from '@/components/mobile-nav'
import { Eyebrow } from '@/components/eyebrow'
import { Stripe } from '@/components/stripe'
import { FleetCard } from '@/components/fleet-card'
import { FaqAccordion } from '@/components/faq-accordion'
import { Footer } from '@/components/footer'
import { getVans, getFaqs } from '@/lib/data'

export default function HomePage() {
  const vans = getVans()
  const faqs = getFaqs('es')

  return (
    <>
      {/* ── Nav ── */}
      <div className="hidden md:block"><TopNav active="home" /></div>
      <div className="md:hidden"><MobileNav /></div>

      {/* ── Hero ── */}
      <section className="px-5 pt-6 pb-10 md:px-16 md:pt-10">
        <div className="grid md:grid-cols-[1.05fr_1fr] md:gap-14 md:items-center md:mb-14">
          <div>
            <Eyebrow className="mb-4 md:mb-5">Catarroja · Valencia</Eyebrow>
            <h1 className="font-display font-semibold leading-[0.95] tracking-[-0.035em] text-[44px] mb-4 md:text-[86px] md:mb-6">
              Autocaravanas<br />
              <em className="not-italic text-terra">desde Valencia</em><br />
              <span className="text-ink-2">para 4 personas</span>.
            </h1>
            <p className="text-lg text-ink-2 leading-relaxed mb-6 max-w-[480px] md:text-xl">
              Todo incluido. Sin sorpresas, sin letra pequeña.
            </p>
            <Link
              href="/flota"
              className="inline-flex items-center gap-2.5 bg-terra text-[#fff7ef] font-display font-semibold text-base px-6 py-3.5 rounded-full hover:bg-terra-dk transition-colors"
            >
              Ver disponibilidad
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="6" cy="6" r="4" /><path d="M9 9l4 4" />
              </svg>
            </Link>
          </div>

          {/* image grid — desktop only */}
          <div className="hidden md:grid grid-cols-[2fr_1fr] grid-rows-[1.4fr_1fr] gap-3 h-[480px] mt-6 md:mt-0">
            <Stripe kind="terra" label="van + atardecer · costa brava" className="row-span-2 rounded" />
            <Stripe kind="dark"  label="interior · costa"              className="rounded" />
            <Stripe kind="sage"  label="detalle del mapa"              className="rounded" />
          </div>
          {/* image — mobile */}
          <Stripe kind="terra" label="van · foto hero" className="md:hidden rounded h-[220px] mt-5 mb-6" />
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="px-5 pb-10 md:px-16 md:pb-16">
        <div className="border-y border-line py-8 grid grid-cols-2 md:grid-cols-4">
          <TrustItem big="4,9" sub="★★★★★ · 312 reseñas" extra="verificadas en Google" />
          <TrustItem big="7"   sub="años en Valencia"     extra="desde 2019" />
          <TrustItem big="2.140" sub="viajes completados" extra="y los que vendrán" />
          <TrustItem
            big={
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M21 4l16 6v10c0 9-7 16-16 18C12 36 5 29 5 20V10l16-6z" />
                <path d="M14 21l5 5 9-10" />
              </svg>
            }
            sub="A todo riesgo"
            extra="Allianz + asistencia 24h"
          />
        </div>
      </section>

      {/* ── Fleet ── */}
      <section className="px-5 pb-14 md:px-16 md:pb-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-12">
          <div>
            <Eyebrow className="mb-4">La flota</Eyebrow>
            <h2 className="font-display font-semibold tracking-tight leading-tight text-3xl md:text-[56px] max-w-[720px]">
              Cuatro autocaravanas, cuatro maneras de viajar.
            </h2>
            <p className="text-base text-ink-2 mt-4 max-w-[540px] md:text-lg">
              Cada una con su carácter. Elige la que encaja con tu plan, no al revés.
            </p>
          </div>
          <Link href="/flota" className="hidden md:inline-block font-display font-semibold text-sm text-ink border-b-[1.5px] border-ink pb-1 mt-4 hover:text-terra hover:border-terra transition-colors">
            Comparar las cuatro →
          </Link>
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:gap-5">
          {vans.map(v => <FleetCard key={v.id} van={v} compact />)}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-bg-2 px-5 py-14 md:px-16 md:py-24">
        <div className="grid md:grid-cols-[0.7fr_2fr] md:gap-20 md:items-start">
          <div className="mb-9 md:mb-0">
            <Eyebrow className="mb-4">Cómo funciona</Eyebrow>
            <h2 className="font-display font-semibold tracking-tight text-3xl md:text-[52px] leading-tight">
              Reservar es de un café.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-14">
            <HowStep n="01" title="Busca" body="Elige fechas y autocaravana. Sin pago aún, sin compromiso." />
            <HowStep n="02" title="Confirma por WhatsApp" body="Te respondemos en menos de 2 horas. Resolvemos dudas y bloqueamos las fechas." />
            <HowStep n="03" title="Recoge en Catarroja" body="Te enseñamos la furgo en 30 minutos. Lleno de gasoil. Y a viajar." />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-5 py-14 md:px-16 md:py-24">
        <div className="grid md:grid-cols-[0.7fr_1.5fr] md:gap-20 md:items-start">
          <div className="mb-8 md:mb-0">
            <Eyebrow className="mb-4">Preguntas frecuentes</Eyebrow>
            <h2 className="font-display font-semibold tracking-tight text-3xl md:text-[52px] leading-tight mb-4">
              Lo que todo el mundo nos pregunta.
            </h2>
            <p className="text-ink-2 mb-6 max-w-[380px]">
              Si tienes otra duda, escríbenos por WhatsApp. Respondemos como personas.
            </p>
            <Link href="/preguntas" className="font-display font-semibold text-sm text-terra border-b-[1.5px] border-terra pb-1 hover:opacity-80 transition-opacity">
              Ver todas las preguntas →
            </Link>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ── CTA dark ── */}
      <section className="bg-ink text-paper px-5 py-14 md:px-16 md:py-24 relative overflow-hidden">
        <div className="absolute right-[-80px] top-[-40px] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(194,85,58,.5)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative grid md:grid-cols-[1.4fr_1fr] md:gap-20 md:items-center">
          <div className="mb-8 md:mb-0">
            <Eyebrow className="mb-5 text-terra">Hablemos</Eyebrow>
            <h2 className="font-display font-semibold tracking-tight leading-[1.0] text-[30px] text-paper mb-4 md:text-[72px]">
              ¿Listo para coger la carretera?
            </h2>
            <p className="text-ink-4 leading-relaxed max-w-[520px] md:text-lg">
              WhatsApp es la forma más rápida. Nuestro equipo responde en menos de 2 horas en horario laboral.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/34962123456"
              className="bg-wa text-white px-6 py-5 rounded flex items-center gap-4 font-display font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              <WaIcon size={24} />
              <span className="flex-1">
                Escribir por WhatsApp
                <span className="block text-[13px] font-medium opacity-85">Respuesta &lt; 2 h</span>
              </span>
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4" /></svg>
            </a>
            <a
              href="tel:+34962123456"
              className="border border-white/20 text-paper px-6 py-5 rounded flex items-center gap-4 font-display font-semibold text-lg hover:bg-white/5 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
                <path d="M3 5c0-1 1-2 2-2h2l2 4-2 1c1 2 3 4 5 5l1-2 4 2v2c0 1-1 2-2 2C9 17 5 13 5 7v0z" />
              </svg>
              <span className="flex-1">
                Llamar al 962 12 34 56
                <span className="block text-[13px] text-ink-4 font-medium">Lun–Sáb 9:00–19:00</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

/* ── Helpers ── */

function TrustItem({ big, sub, extra }: { big: React.ReactNode; sub: string; extra: string }) {
  return (
    <div className="px-4 border-l border-line flex flex-col gap-0.5 md:px-7">
      <div className="font-display text-[24px] font-semibold text-ink tracking-tight leading-none flex items-center gap-1.5 md:text-[52px]">
        {big}
      </div>
      <div className="font-display font-medium text-xs text-ink mt-1.5 md:text-[13px]">{sub}</div>
      <div className="text-[11px] text-ink-3">{extra}</div>
    </div>
  )
}

function HowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="font-display text-[13px] font-semibold text-terra tracking-[0.08em]">{n}</div>
      <div className="h-px bg-line-2" />
      <h3 className="font-display font-semibold text-[28px] tracking-tight leading-tight">{title}</h3>
      <p className="text-ink-2 leading-relaxed max-w-[320px]">{body}</p>
    </div>
  )
}

function WaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 14.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.9-1-3.2-1.7-4.5-3.9-.4-.6.4-.5 1-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3.1 1.3 3.3.2.3 2.2 3.5 5.4 4.9 2 .8 2.8.9 3.8.8.6-.1 1.7-.7 2-1.4.3-.7.3-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
    </svg>
  )
}
