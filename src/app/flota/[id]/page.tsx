import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TopNav }        from '@/components/top-nav'
import { MobileNav }     from '@/components/mobile-nav'
import { Stripe }        from '@/components/stripe'
import { Eyebrow }       from '@/components/eyebrow'
import { Footer }        from '@/components/footer'
import { BookingSidebar } from '@/components/vehicle/booking-sidebar'
import { getVan, getVans } from '@/lib/data'
import { INCLUDED, NOT_INCLUDED } from '@/config/offers'
import type { Van, VanId, VanColor, StripeKind } from '@/lib/types'

const colorToKind: Record<VanColor, StripeKind> = {
  terra: 'terra',
  sage:  'sage',
  ink:   'dark',
}

export function generateStaticParams() {
  return [
    { id: 'costa' },
    { id: 'sierra' },
    { id: 'valle' },
    { id: 'mar' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const van = getVan(id as VanId)
  if (!van) return {}
  return {
    title:       `${van.name} — desde ${van.price.low}€/día · Autoaventura`,
    description: van.descr_es,
  }
}

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const van = getVan(id as VanId)
  if (!van) notFound()

  const allVans  = getVans()
  const vanIndex = allVans.findIndex(v => v.id === van.id) + 1
  const others   = allVans.filter(v => v.id !== van.id)
  const heroKind = colorToKind[van.color]
  const images   = van.images ?? []

  return (
    <>
      {/* ── Nav ── */}
      <div className="hidden md:block"><TopNav active="fleet" /></div>
      <div className="md:hidden"><MobileNav /></div>

      {/* ── Breadcrumb (desktop) ── */}
      <div className="hidden md:flex items-center gap-1.5 px-16 pt-5 text-[13px] text-ink-3 font-display">
        <Link href="/flota" className="hover:text-ink transition-colors">Flota</Link>
        <span>/</span>
        <span className="text-ink">{van.name}</span>
      </div>

      {/* ── Header ── */}
      <section className="px-5 pt-5 pb-0 md:px-16 md:pt-5 md:pb-0">
        <div className="md:flex md:justify-between md:items-end md:mb-7 mb-5">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-ink text-paper font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
                {van.id.toUpperCase()} · {String(vanIndex).padStart(2, '0')} de 04
              </span>
              {van.offroad && (
                <span className="bg-sage-tn text-[#43523c] font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
                  4×4
                </span>
              )}
              {van.kitchen === 'premium' && (
                <span className="bg-terra-tn text-terra font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
                  premium
                </span>
              )}
              <span className="border border-line text-ink-2 font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
                {van.base.kind_es}
              </span>
            </div>

            <h1 className="font-display font-semibold leading-[0.95] tracking-[-0.035em] text-[48px] mb-3 md:text-[86px] md:mb-4">
              {van.name}<span className="text-terra">.</span>
            </h1>
            <p className="text-lg text-ink-2 italic md:text-[22px]">"{van.tagline_es}"</p>
          </div>

          {/* Price (desktop) */}
          <div className="hidden md:block text-right shrink-0 ml-8">
            <div className="font-mono text-[10px] text-ink-3 uppercase tracking-[0.08em]">Desde</div>
            <div className="font-display text-[44px] font-bold tracking-[-0.03em] leading-none">{van.price.low}€</div>
            <div className="text-[13px] text-ink-3 mt-1">/ día · todo incluido</div>
          </div>
        </div>

        {/* Price (mobile) */}
        <div className="flex items-baseline gap-2 pb-5 border-b border-line md:hidden">
          <span className="font-mono text-[11px] text-ink-3 uppercase tracking-[0.08em]">Desde</span>
          <span className="font-display text-[30px] font-bold tracking-[-0.02em]">{van.price.low}€</span>
          <span className="text-sm text-ink-3">/ día</span>
        </div>

        {/* Gallery — desktop: 5-slot grid */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] grid-rows-[1fr_1fr] gap-1.5 h-[480px] mt-7 rounded overflow-hidden">
          <Stripe src={images[0]} kind={heroKind} label="exterior" className="row-span-2" />
          <Stripe src={images[1]} kind="dark"  label="interior" />
          <Stripe src={images[2]} kind="terra" label="detalle" />
          <Stripe src={images[3]} kind="sage"  label="interior" />
          {images.length > 5 ? (
            <div className="relative cursor-pointer group">
              <Stripe src={images[4]} kind="" label="" className="absolute inset-0" />
              <div className="absolute inset-0 bg-ink/55 group-hover:bg-ink/65 transition-colors flex flex-col items-center justify-center">
                <span className="font-display text-[22px] font-semibold text-paper leading-none">+{images.length - 5}</span>
                <span className="font-mono text-[11px] text-paper/85 mt-1.5">ver galería</span>
              </div>
            </div>
          ) : (
            <Stripe src={images[4]} kind="" label="detalle" />
          )}
        </div>

        {/* Gallery — mobile: hero */}
        <div className="relative mt-5 md:hidden h-[280px] rounded overflow-hidden">
          <Stripe src={images[0]} kind={heroKind} label={`${van.name.toLowerCase()} · hero`} className="absolute inset-0" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="bg-ink text-paper font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
              {van.id.toUpperCase()}
            </span>
            {van.offroad && (
              <span className="bg-sage-tn text-[#43523c] font-display text-[11px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm">
                4×4
              </span>
            )}
          </div>
          <div className="absolute right-3 bottom-3 bg-paper px-3 py-1.5 rounded font-mono text-[11px]">
            1 / {images.length || 1}
          </div>
        </div>
      </section>

      {/* ── Main: content + sidebar ── */}
      <section className="px-5 pt-10 pb-14 md:px-16 md:pt-14 md:pb-24">
        <div className="md:grid md:grid-cols-[1.5fr_1fr] md:gap-14 md:items-start">

          {/* Left: main content */}
          <div className="flex flex-col gap-14">

            {/* Overview */}
            <div>
              <p className="text-[17px] md:text-[20px] text-ink leading-relaxed mb-7">{van.descr_es}</p>
              <div className="grid grid-cols-2 gap-5 bg-bg-2 rounded p-5 md:p-7">
                <div>
                  <div className="font-mono text-[10px] text-ok uppercase tracking-[0.08em] mb-3">Perfecta para</div>
                  <ul className="flex flex-col gap-2">
                    {van.perfect_es.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink">
                        <span className="text-ok shrink-0">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-ink-3 uppercase tracking-[0.08em] mb-3">No es lo tuyo si</div>
                  <ul className="flex flex-col gap-2">
                    {van.not_es.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink-2">
                        <span className="text-ink-3 shrink-0">×</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div>
              <Eyebrow className="mb-4">Ficha técnica</Eyebrow>
              <h2 className="font-display font-semibold tracking-tight leading-tight text-[26px] md:text-[36px] mb-7">
                Datos honestos. Nada escondido.
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <SpecCard label="duerme" value={String(van.sleeps)} sub="plazas dormir" icon="bed" />
                <SpecCard label="cinturones" value={String(van.seats)} sub="durante la conducción" icon="seat" />
                <SpecCard label="carnet" value={van.license}
                  sub={van.license === 'C1'
                    ? 'Por encima de 3,5t. Carnet pre-1997 también.'
                    : 'Vale el carnet de coche normal.'}
                  icon="card"
                />
                <SpecCard label="eslora" value={van.length} sub="aparcamiento estándar" icon="ruler" />
                <SpecCard label="cambio" value={van.transmission_es} icon="gear" />
                <SpecCard label="consumo" value={van.consumption} sub="diésel · media" icon="fuel" />
              </div>
            </div>

            {/* Video */}
            <div>
              <Eyebrow className="mb-4">Vídeo del interior</Eyebrow>
              <h2 className="font-display font-semibold tracking-tight leading-tight text-[26px] md:text-[36px] mb-1.5">
                Te la enseña Marta, en 90 segundos.
              </h2>
              <p className="text-[15px] text-ink-3 mb-5">90 segundos · sin música chunga</p>
              <div className="relative h-[220px] md:h-[380px] rounded overflow-hidden">
                <Stripe kind="dark" label={`vídeo · ${van.name.toLowerCase()} walkthrough`} className="absolute inset-0" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 md:w-[76px] md:h-[76px] rounded-full bg-[rgba(255,247,239,0.95)] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 22 22" fill="var(--ink)">
                      <path d="M5 3l13 8-13 8z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[11px] text-bg-3/90">pulsa play · no autoplay</span>
                </div>
                <div className="absolute left-4 bottom-4 font-mono text-[11px] text-bg-3">0:00 / 1:32</div>
              </div>
            </div>

            {/* Included / Not included */}
            <div>
              <Eyebrow className="mb-4">Lo que llevas incluido</Eyebrow>
              <h2 className="font-display font-semibold tracking-tight leading-tight text-[26px] md:text-[36px] mb-7">
                Lo que llevas. Y lo que no.
              </h2>
              <div className="grid md:grid-cols-2 md:gap-12 gap-8">
                <div>
                  <h4 className="font-display text-[11px] font-semibold text-ok uppercase tracking-[0.08em] mb-3">Incluido</h4>
                  <ul>
                    {INCLUDED.map(item => (
                      <CheckLine key={item.key} ok>{item.label_es}</CheckLine>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display text-[11px] font-semibold text-ink-3 uppercase tracking-[0.08em] mb-3">No incluido</h4>
                  <ul>
                    {NOT_INCLUDED.map(item => (
                      <CheckLine key={item.key} ok={false}>{item.label_es}</CheckLine>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Pricing tiers + seasons */}
            <div>
              <Eyebrow className="mb-4">Precios y temporadas</Eyebrow>
              <h2 className="font-display font-semibold tracking-tight leading-tight text-[26px] md:text-[36px] mb-1.5">
                Cuanto más tiempo, menos €/día.
              </h2>
              <p className="text-[15px] text-ink-3 mb-7">Todo IVA incluido. Sin extras escondidos.</p>

              <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
                {/* Tiers */}
                <div>
                  <h4 className="font-display text-[11px] font-semibold text-ink-2 uppercase tracking-[0.08em] mb-3">
                    Cuanto más, mejor precio
                  </h4>
                  <div className="flex flex-col gap-px overflow-hidden rounded border border-line">
                    {van.tiers.map((tier, i) => {
                      const best = i === van.tiers.length - 1
                      return (
                        <div
                          key={i}
                          className={`flex justify-between items-center px-4 py-3.5 ${best ? 'bg-[#1f2c1e] text-paper' : 'bg-paper text-ink'}`}
                        >
                          <div>
                            <div className="font-display font-semibold text-[14px]">{tier.d_es}</div>
                            {best && <div className="font-mono text-[10px] text-sage/70 mt-0.5">el mejor precio</div>}
                          </div>
                          <div className="text-right">
                            <span className="font-display text-[20px] font-bold tracking-[-0.02em]">{tier.per}€</span>
                            <span className={`text-[11px] ml-1 ${best ? 'text-ink-4' : 'text-ink-3'}`}>/día</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Seasons */}
                <div>
                  <h4 className="font-display text-[11px] font-semibold text-ink-2 uppercase tracking-[0.08em] mb-3">
                    Por temporada (7+ días)
                  </h4>
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {[
                      { label: 'Baja',  months: 'Nov–Mar',           price: van.price.low,  bg: 'bg-bg-2'     },
                      { label: 'Media', months: 'Abr, May, Sep, Oct', price: van.price.mid,  bg: 'bg-bg-3'     },
                      { label: 'Alta',  months: 'Jun–Ago · S.Santa', price: van.price.high, bg: 'bg-terra-tn' },
                    ].map((s, i) => (
                      <div key={i} className={`${s.bg} px-3 py-3.5 rounded`}>
                        <div className="font-display text-[11px] font-semibold text-ink-2 uppercase tracking-[0.06em]">{s.label}</div>
                        <div className="font-mono text-[10px] text-ink-3 mt-0.5 mb-2.5">{s.months}</div>
                        <div>
                          <span className="font-display text-[20px] font-bold text-ink tracking-[-0.02em]">{s.price}€</span>
                          <span className="text-[10px] text-ink-3"> /día</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-3 py-3 bg-bg-2 rounded text-[13px] text-ink-2 leading-relaxed">
                    Los precios son base. La temporada multiplica sobre el precio del tramo.
                  </div>
                </div>
              </div>
            </div>

            {/* Compare strip */}
            <div>
              <Eyebrow className="mb-4">O quizá otra</Eyebrow>
              <h2 className="font-display font-semibold tracking-tight leading-tight text-[26px] md:text-[36px] mb-6">
                Si {van.name} no es lo tuyo…
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {others.map(v => (
                  <Link
                    key={v.id}
                    href={`/flota/${v.id}`}
                    className="group bg-paper rounded overflow-hidden shadow-card hover:shadow-float transition-shadow"
                  >
                    <Stripe src={v.images?.[0]} kind={colorToKind[v.color]} label={`${v.name.toLowerCase()} · thumbnail`} className="h-[130px]" />
                    <div className="px-4 py-3.5">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-display font-semibold text-[18px]">{v.name}</h3>
                        <div className="font-display text-[14px] font-semibold">
                          {v.price.low}€<span className="text-ink-3 font-normal text-[12px]">/d</span>
                        </div>
                      </div>
                      <p className="text-[13px] text-ink-3 italic">"{v.tagline_es}"</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking sidebar (desktop) */}
          <div className="hidden md:block">
            <BookingSidebar van={van} />
          </div>
        </div>
      </section>

      {/* ── Map section ── */}
      <section className="bg-bg-2 px-5 py-14 md:px-16 md:py-24">
        <div className="md:grid md:grid-cols-[0.85fr_1.6fr] md:gap-14 md:items-center">
          <div className="mb-8 md:mb-0">
            <Eyebrow className="mb-4">Dónde estamos</Eyebrow>
            <h2 className="font-display font-semibold tracking-tight leading-tight text-[26px] md:text-[44px] mb-4">
              Nos ves desde la A-7.
            </h2>
            <p className="text-[15px] md:text-[16px] text-ink-2 mb-6 leading-relaxed">
              Recogida y entrega en nuestro local de Sant Vicenç dels Horts, a 10 minutos del centro de Barcelona y de la playa de El Saler.
            </p>
            <div className="flex flex-col gap-2 mb-6 text-sm">
              <div className="font-display font-semibold">Carrer del Forn, 24 · 46470 Sant Vicenç dels Horts, Barcelona</div>
              <div className="text-ink-2">Lun–Vie · 9:00–13:00, 16:00–19:00</div>
              <div className="text-ink-2">Sábados · 9:00–13:00</div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-display font-semibold text-sm border-b-[1.5px] border-ink pb-0.5 hover:text-terra hover:border-terra transition-colors"
            >
              Cómo llegar →
            </a>
          </div>
          <div className="h-[220px] md:h-[400px] rounded overflow-hidden">
            <Stripe kind="sage" label="mapa · Sant Vicenç dels Horts, Barcelona" className="w-full h-full" />
          </div>
        </div>
      </section>

      <Footer />

      {/* Spacer for mobile sticky bar */}
      <div className="h-[72px] md:hidden" />

      {/* ── Mobile sticky CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-paper border-t border-line px-4 py-3 flex items-center gap-3 shadow-float">
        <div className="shrink-0">
          <div className="font-mono text-[9px] text-ink-3 uppercase tracking-[0.08em] leading-none mb-1">Desde</div>
          <div className="leading-none">
            <span className="font-display text-[22px] font-bold tracking-[-0.02em]">{van.price.low}€</span>
            <span className="font-mono text-[11px] text-ink-3"> / día</span>
          </div>
        </div>
        <Link
          href={`/reservar?van=${van.id}`}
          className="flex-1 bg-terra text-[#fff7ef] font-display font-semibold text-sm py-3.5 rounded-full text-center hover:bg-terra-dk transition-colors"
        >
          Ver disponibilidad
        </Link>
      </div>
    </>
  )
}

/* ── SpecCard ── */

const SPEC_ICONS: Record<string, React.ReactNode> = {
  bed:  <path d="M2 13h14M2 13V8h7v3h7v2M3 11h3" />,
  seat: <><path d="M6 2v8M10 2v8" /><path d="M3 10h8v4H3z" /></>,
  card: <><rect x="2" y="4" width="14" height="10" /><path d="M5 8h4M5 11h2" /></>,
  ruler:<path d="M2 6h14v6H2zM4 6v3M6 6v4M8 6v3M10 6v4M12 6v3M14 6v4" />,
  gear: <><circle cx="9" cy="9" r="3" /><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3 3l1.4 1.4M13.6 13.6L15 15M3 15l1.4-1.4M13.6 4.4L15 3" /></>,
  fuel: <path d="M3 14V4h6v10M3 14h6M10 6l3 1v6a1.5 1.5 0 0 1-3 0" />,
}

function SpecCard({ label, value, sub, icon }: { label: string; value: string; sub?: string; icon: string }) {
  return (
    <div className="p-5 bg-paper rounded border border-line">
      <div className="flex items-center justify-between mb-3.5">
        <span className="font-mono text-[10px] text-ink-3 uppercase tracking-[0.08em]">{label}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--terra)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          {SPEC_ICONS[icon]}
        </svg>
      </div>
      <div className="font-display text-[22px] font-semibold text-ink tracking-[-0.02em] leading-tight">{value}</div>
      {sub && <div className="text-[12px] text-ink-3 mt-1 leading-snug">{sub}</div>}
    </div>
  )
}

/* ── CheckLine ── */

function CheckLine({ ok = true, children }: { ok?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start py-2.5 border-b border-dashed border-line last:border-0">
      {ok ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
          <circle cx="9" cy="9" r="7" fill="var(--sage-tn)" stroke="var(--sage-tn)" />
          <path d="M5 9l3 3 6-6" stroke="var(--ok)" strokeWidth="1.5" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" strokeLinecap="round" className="shrink-0 mt-0.5">
          <circle cx="9" cy="9" r="7" fill="var(--bg-3)" stroke="var(--bg-3)" />
          <path d="M5 5l8 8M13 5l-8 8" stroke="var(--ink-3)" strokeWidth="1.5" />
        </svg>
      )}
      <span className="text-[15px] text-ink">{children}</span>
    </li>
  )
}
