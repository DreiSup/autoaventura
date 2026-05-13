// vehicle.jsx — Vehicle detail page (desktop + mobile)

const GALLERY_SHOTS = [
  { kind: '',     label: 'exterior · 3/4 front'   },
  { kind: 'dark', label: 'interior · noche'       },
  { kind: 'terra',label: 'cama doble configurada' },
  { kind: 'sage', label: 'cocina · plano abierto' },
  { kind: '',     label: 'baño · ducha'           },
  { kind: 'dark', label: 'asientos delanteros'    },
  { kind: 'sage', label: 'mesa exterior + toldo'  },
  { kind: 'terra',label: 'garaje · bicis'         },
  { kind: '',     label: 'detalle · puerta'       },
  { kind: 'dark', label: 'interior · día'         },
  { kind: 'sage', label: 'depósito agua'          },
  { kind: '',     label: 'mando + salpicadero'    },
  { kind: 'terra',label: 'amanecer · costa'       },
  { kind: 'dark', label: 'detalle iluminación'    },
  { kind: 'sage', label: 'almacenaje · bajo cama' },
  { kind: '',     label: 'ducha exterior'         },
  { kind: 'terra',label: 'frigo + nevera'         },
  { kind: 'dark', label: 'cama elevable'          },
];

/* ─────────── Pricing tiers display ─────────── */
function PriceTiers({ van, t, lang }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--line)', borderRadius: 4, overflow: 'hidden' }}>
      {van.tiers.map((tier, i) => {
        const label = lang === 'es' ? tier.d_es : tier.d_en;
        const best = i === van.tiers.length - 1;
        return (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 18px', background: best ? '#1f2c1e' : 'var(--paper)',
            color: best ? 'var(--bg)' : 'var(--ink)',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 15 }}>{label}</div>
              {best && <div style={{ fontSize: 11, color: 'var(--sage-tn)', fontFamily: 'var(--f-mono)', marginTop: 2 }}>{lang === 'es' ? 'el mejor precio' : 'best price'}</div>}
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{tier.per}€</span>
              <span style={{ fontSize: 12, color: best ? 'var(--ink-4)' : 'var(--ink-3)', marginLeft: 4 }}>/ {lang === 'es' ? 'día' : 'day'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────── Booking sidebar (desktop) ─────────── */
function BookingSidebar({ van, t, lang, calOpen, setCalOpen }) {
  const [dates, setDates] = React.useState({ start: null, end: null });
  const nights = (dates.start && dates.end) ? Math.max(0, Math.round((dates.end - dates.start) / 86400000)) : 0;

  // Determine effective per-night based on nights
  let per = van.tiers[0].per;
  for (const tier of van.tiers) {
    if (nights >= 14 && tier.per === van.tiers[4].per) per = tier.per;
    else if (nights >= 7 && nights < 14 && tier.per === van.tiers[3].per) per = tier.per;
    else if (nights >= 3 && nights < 7 && tier.per === van.tiers[2].per) per = tier.per;
    else if (nights === 2 && tier.per === van.tiers[1].per) per = tier.per;
  }
  if (nights >= 14) per = van.tiers[4].per;
  else if (nights >= 7) per = van.tiers[3].per;
  else if (nights >= 3) per = van.tiers[2].per;
  else if (nights === 2) per = van.tiers[1].per;
  else if (nights === 1) per = van.tiers[0].per;

  const total = nights * per;

  return (
    <div style={{ background: 'var(--paper)', borderRadius: 4, padding: 24, boxShadow: 'var(--shadow-1)', position: 'sticky', top: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--f-mono)', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{t.veh.from}</div>
          <div>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: 36, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{van.price.low}€</span>
            <span style={{ fontSize: 14, color: 'var(--ink-3)' }}> / {t.veh.day}</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{lang === 'es' ? 'temporada baja · todo incluido' : 'low season · all-inclusive'}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 14, border: '1px solid var(--line)', borderRadius: 4, overflow: 'hidden' }}>
        <button onClick={() => setCalOpen(!calOpen)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', textAlign: 'left', background: calOpen ? 'var(--bg-2)' : 'transparent',
        }}>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{t.veh.checkin.split(' ')[0]}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{dates.start ? fmtShort(dates.start, lang) : '—'}</div>
            </div>
            <span style={{ color: 'var(--ink-3)' }}>→</span>
            <div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{t.hero.dropoff}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{dates.end ? fmtShort(dates.end, lang) : '—'}</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ transform: calOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}><path d="M3 5l4 4 4-4"/></svg>
        </button>
        {calOpen && (
          <div style={{ padding: 16, borderTop: '1px solid var(--line)' }}>
            <DatePicker value={dates} onChange={setDates} lang={lang} />
          </div>
        )}
      </div>

      {nights > 0 && (
        <div style={{ background: 'var(--bg-2)', borderRadius: 4, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: 'var(--ink-2)' }}>{per}€ × {nights} {nights === 1 ? t.veh.day : t.veh.days}</span>
            <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{per * nights}€</span>
          </div>
          <div style={{ height: 1, background: 'var(--line)', margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14 }}>{t.veh.total}</span>
            <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>{total}€</span>
          </div>
        </div>
      )}

      <Btn kind="primary" size="lg" style={{ width: '100%', marginBottom: 8 }}>
        {dates.start && dates.end ? (lang === 'es' ? 'Reservar ahora' : 'Book now') : t.veh.checkAvail}
      </Btn>
      <button style={{ background: 'var(--wa)', color: '#fff', width: '100%', padding: 14, borderRadius: 999, fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <IconWA size={16} /> {t.veh.ask}
      </button>

      <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PolicyLine icon={<><path d="M2 6l2 2 4-5"/><path d="M9 8h3M9 11h3"/></>} title={t.veh.cancel} sub={t.veh.cancelSub} />
        <PolicyLine icon={<><circle cx="7" cy="7" r="5"/><path d="M7 4v3l2 1"/></>} title={t.veh.kms} sub={t.veh.kmsSub} />
        <PolicyLine icon={<><path d="M7 1l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6V3l5-2z"/></>} title={t.veh.insurance} sub={t.veh.insuranceSub} />
        <PolicyLine icon={<><path d="M2 7h10M9 4l3 3-3 3"/></>} title={t.veh.deposit} sub={t.veh.depositSub} />
      </div>
    </div>
  );
}

function PolicyLine({ icon, title, sub }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--terra)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>{icon}</svg>
      <div style={{ flex: 1, fontSize: 13 }}>
        <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, color: 'var(--ink)' }}>{title}</div>
        <div style={{ color: 'var(--ink-3)' }}>{sub}</div>
      </div>
    </div>
  );
}

/* ─────────── Included list item ─────────── */
function CheckLine({ ok = true, children }) {
  return (
    <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px dashed var(--line)' }}>
      {ok ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--ok)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
          <circle cx="9" cy="9" r="7" stroke="var(--sage-tn)" fill="var(--sage-tn)"/>
          <path d="M5 9l3 3 6-6" stroke="var(--ok)" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}>
          <circle cx="9" cy="9" r="7" stroke="var(--bg-3)" fill="var(--bg-3)"/>
          <path d="M5 5l8 8M13 5l-8 8" />
        </svg>
      )}
      <span style={{ flex: 1, fontSize: 15, color: 'var(--ink)' }}>{children}</span>
    </li>
  );
}

/* ─────────── Spec card item ─────────── */
function SpecCard({ label, value, sub, ico }) {
  return (
    <div style={{ padding: '20px 22px', background: 'var(--paper)', borderRadius: 4, border: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--terra)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">{ico}</svg>
      </div>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: 24, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

const SpecIcons = {
  bed: <><path d="M2 13h14M2 13V8h7v3h7v2M3 11h3"/></>,
  card: <><rect x="2" y="4" width="14" height="10"/><path d="M5 8h4M5 11h2"/></>,
  ruler: <><path d="M2 6h14v6H2zM4 6v3M6 6v4M8 6v3M10 6v4M12 6v3M14 6v4"/></>,
  gear: <><circle cx="9" cy="9" r="3"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3 3l1.4 1.4M13.6 13.6L15 15M3 15l1.4-1.4M13.6 4.4L15 3"/></>,
  fuel: <><path d="M3 14V4h6v10M3 14h6M10 6l3 1v6a1.5 1.5 0 0 1-3 0"/></>,
  shower: <><path d="M9 2v4M5 6h8M3 9c0 1.5 1.5 3 3 3s3-1.5 3-3M9 9c0 1.5 1.5 3 3 3s3-1.5 3-3M3 14v1M6 14v1M9 14v1M12 14v1M15 14v1"/></>,
};

/* ─────────── Gallery (lightbox style) ─────────── */
function Gallery({ shots }) {
  const [active, setActive] = React.useState(0);
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 6, height: 480 }}>
        <Stripe kind={shots[0].kind} label={shots[0].label}
          onClick={() => setActive(0)}
          style={{ gridRow: '1 / span 2', borderRadius: '4px 0 0 4px', cursor: 'pointer' }} />
        <Stripe kind={shots[1].kind} label={shots[1].label} style={{ cursor: 'pointer' }} />
        <Stripe kind={shots[2].kind} label={shots[2].label} style={{ borderRadius: '0 4px 0 0', cursor: 'pointer' }} />
        <Stripe kind={shots[3].kind} label={shots[3].label} style={{ cursor: 'pointer' }} />
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Stripe kind={shots[4].kind} label={shots[4].label} style={{ width: '100%', height: '100%', borderRadius: '0 0 4px 0' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(35,33,30,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', borderRadius: '0 0 4px 0', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>+{shots.length - 5}</span>
            <span style={{ fontSize: 11, fontFamily: 'var(--f-mono)', opacity: 0.85, marginTop: 2 }}>ver galería</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   VEHICLE — DESKTOP
   ═════════════════════════════════════════════════════════════ */
function VehicleDesktop({ vanId = 'costa' }) {
  const t = useT();
  const { lang } = React.useContext(LangCtx);
  const van = VANS.find(v => v.id === vanId) || VANS[0];
  const desc = lang === 'es' ? van.descr_es : van.descr_en;
  const perfect = lang === 'es' ? van.perfect_es : van.perfect_en;
  const not = lang === 'es' ? van.not_es : van.not_en;
  const [calOpen, setCalOpen] = React.useState(false);

  return (
    <div className="av">
      <TopNav active="fleet" />

      {/* breadcrumb */}
      <div style={{ padding: '20px 64px 0', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--f-display)' }}>
        <a href="#/" style={{ cursor: 'pointer' }}>{t.nav.fleet}</a>
        <span>/</span>
        <span style={{ color: 'var(--ink)' }}>{van.name}</span>
      </div>

      {/* HEADER */}
      <section style={{ padding: '20px 64px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <span className="tag tag-ink">{van.id.toUpperCase()} · 01 of 04</span>
              {van.offroad && <span className="tag tag-sage">4×4</span>}
              {van.id === 'mar' && <span className="tag tag-terra">{lang === 'es' ? 'premium' : 'premium'}</span>}
              <span className="tag tag-line">{lang === 'es' ? van.base.kind_es : van.base.kind_en}</span>
            </div>
            <h1 style={{ fontSize: 86, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 14 }}>
              {van.name}<span style={{ color: 'var(--terra)' }}>.</span>
            </h1>
            <p style={{ fontSize: 22, color: 'var(--ink-2)', maxWidth: 640, lineHeight: 1.4, fontStyle: 'italic' }}>“{lang === 'es' ? van.tagline_es : van.tagline_en}”</p>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.veh.from}</div>
              <div>
                <span style={{ fontFamily: 'var(--f-display)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em' }}>{van.price.low}€</span>
                <span style={{ fontSize: 16, color: 'var(--ink-3)' }}> / {t.veh.day}</span>
              </div>
            </div>
          </div>
        </div>

        {/* gallery */}
        <Gallery shots={GALLERY_SHOTS.slice(0, 18)} />
      </section>

      {/* MAIN: 2 columns with sticky sidebar */}
      <section style={{ padding: '40px 64px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {/* OVERVIEW */}
            <div>
              <p style={{ fontSize: 20, color: 'var(--ink)', lineHeight: 1.55, marginBottom: 32, maxWidth: 640 }}>{desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: '24px 28px', background: 'var(--bg-2)', borderRadius: 4 }}>
                <div>
                  <div className="eyebrow" style={{ color: 'var(--ok)', marginBottom: 12 }}>{t.veh.perfectFor}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {perfect.map((p, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink)' }}>
                        <span style={{ color: 'var(--ok)' }}>✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="eyebrow" style={{ color: 'var(--ink-3)', marginBottom: 12 }}>{t.veh.notFor}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {not.map((p, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink-2)' }}>
                        <span style={{ color: 'var(--ink-3)' }}>×</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* SPECS */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>{t.veh.specs}</div>
              <h2 style={{ fontSize: 36, letterSpacing: '-0.03em', marginBottom: 28 }}>
                {lang === 'es' ? 'Datos honestos. Nada escondido.' : 'Honest numbers. Nothing hidden.'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <SpecCard label={t.veh.sleeps} value={van.sleeps} sub={lang === 'es' ? 'plazas dormir' : 'sleeping spots'} ico={SpecIcons.bed} />
                <SpecCard label={t.veh.seats}  value={van.seats}  sub={lang === 'es' ? 'durante la conducción' : 'while driving'} ico={SpecIcons.bed} />
                <SpecCard label={t.veh.license} value={van.license} sub={van.license === 'C1' ? t.pol.c1Exp : t.pol.bExp} ico={SpecIcons.card} />
                <SpecCard label={t.veh.length} value={van.length} sub={lang === 'es' ? 'aparcamiento estándar' : 'standard parking'} ico={SpecIcons.ruler} />
                <SpecCard label={t.veh.transmission} value={lang === 'es' ? van.transmission_es : van.transmission_en} ico={SpecIcons.gear} />
                <SpecCard label={t.veh.consumption} value={van.consumption} sub={lang === 'es' ? 'diésel · medio' : 'diesel · avg.'} ico={SpecIcons.fuel} />
              </div>
            </div>

            {/* VIDEO */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{t.veh.walkthrough}</div>
              <h2 style={{ fontSize: 36, letterSpacing: '-0.03em', marginBottom: 6 }}>
                {lang === 'es' ? 'Te la enseña Marta, en 90 segundos.' : 'Marta walks you through her, in 90 seconds.'}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--ink-3)', marginBottom: 22 }}>{t.veh.walkthroughSub}</p>
              <div style={{ position: 'relative', height: 380, borderRadius: 4, overflow: 'hidden' }}>
                <Stripe kind="dark" label={`video · ${van.name.toLowerCase()} walkthrough`} style={{ width: '100%', height: '100%' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
                  <button style={{
                    width: 76, height: 76, borderRadius: '50%', background: 'rgba(255,247,239,.95)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor"><path d="M5 3l13 8-13 8z"/></svg>
                  </button>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--bg-3)', opacity: 0.9 }}>{t.veh.videoTag}</div>
                </div>
                <div style={{ position: 'absolute', left: 16, bottom: 16, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--bg-3)' }}>0:00 / 1:32</div>
              </div>
            </div>

            {/* INCLUDED */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{t.veh.included}</div>
              <h2 style={{ fontSize: 36, letterSpacing: '-0.03em', marginBottom: 24 }}>
                {lang === 'es' ? 'Lo que llevas. Y lo que no.' : 'What you get. And what you don\'t.'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 600, color: 'var(--ok)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{t.veh.included}</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <CheckLine>{t.inc.linen}</CheckLine>
                    <CheckLine>{t.inc.kitchen}</CheckLine>
                    <CheckLine>{t.inc.gas}</CheckLine>
                    <CheckLine>{t.inc.water}</CheckLine>
                    <CheckLine>{t.inc.km}</CheckLine>
                    <CheckLine>{t.inc.ins}</CheckLine>
                    <CheckLine>{t.inc.assist}</CheckLine>
                    <CheckLine>{t.inc.driver2}</CheckLine>
                    <CheckLine>{t.inc.table}</CheckLine>
                    <CheckLine>{t.inc.awning}</CheckLine>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{t.veh.notincluded}</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <CheckLine ok={false}>{t.notinc.fuel}</CheckLine>
                    <CheckLine ok={false}>{t.notinc.tolls}</CheckLine>
                    <CheckLine ok={false}>{t.notinc.camp}</CheckLine>
                    <CheckLine ok={false}>{t.notinc.ferry}</CheckLine>
                    <CheckLine ok={false}>{t.notinc.excess}</CheckLine>
                    <CheckLine ok={false}>{t.notinc.pets}</CheckLine>
                  </ul>
                </div>
              </div>
            </div>

            {/* PRICING TIERS */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{t.veh.pricing}</div>
              <h2 style={{ fontSize: 36, letterSpacing: '-0.03em', marginBottom: 6 }}>{t.veh.offers}</h2>
              <p style={{ fontSize: 15, color: 'var(--ink-3)', marginBottom: 24 }}>{t.veh.pricingSub}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24 }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                    {lang === 'es' ? 'Cuanto más, mejor precio' : 'Longer = cheaper'}
                  </h4>
                  <PriceTiers van={van} t={t} lang={lang} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                    {lang === 'es' ? 'Por temporada (sobre 7+ días)' : 'By season (7+ days)'}
                  </h4>
                  <SeasonStrip van={van} t={t} lang={lang} />
                  <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--bg-2)', borderRadius: 4, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                    {lang === 'es'
                      ? 'Los precios mostrados son base. La temporada multiplica sobre el precio del tramo.'
                      : 'Listed prices are base. Season multiplies on top of the tier price.'}
                  </div>
                </div>
              </div>
            </div>

            {/* COMPARE */}
            <CompareStrip van={van} t={t} lang={lang} />
          </div>

          {/* SIDEBAR */}
          <BookingSidebar van={van} t={t} lang={lang} calOpen={calOpen} setCalOpen={setCalOpen} />
        </div>
      </section>

      {/* MAP */}
      <section style={{ padding: '60px 64px 100px', background: 'var(--bg-2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.6fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>{t.map.eyebrow}</div>
            <h2 style={{ fontSize: 44, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18 }}>{t.map.title}</h2>
            <p style={{ fontSize: 16, color: 'var(--ink-2)', marginBottom: 24, lineHeight: 1.5 }}>{t.map.sub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{t.map.addr}, {t.map.city}</div>
              <div style={{ color: 'var(--ink-2)', fontSize: 14 }}>{t.map.hours1}</div>
              <div style={{ color: 'var(--ink-2)', fontSize: 14 }}>{t.map.hours2}</div>
            </div>
            <Btn kind="ghost" size="sm">{t.map.directions} →</Btn>
          </div>
          <MapBlock height={400} />
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
      <CookieBanner />
    </div>
  );
}

function SeasonStrip({ van, t, lang }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
      {[
        { name: t.veh.lowSeason, months: t.veh.lowMonths, price: van.price.low, bg: 'var(--bg-2)' },
        { name: t.veh.midSeason, months: t.veh.midMonths, price: van.price.mid, bg: 'var(--bg-3)' },
        { name: t.veh.highSeason, months: t.veh.highMonths, price: van.price.high, bg: 'var(--terra-tn)' },
      ].map((s, i) => (
        <div key={i} style={{ background: s.bg, padding: '14px 14px 16px', borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.name}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--f-mono)', marginTop: 2, marginBottom: 10 }}>{s.months}</div>
          <div>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{s.price}€</span>
            <span style={{ fontSize: 11, color: 'var(--ink-3)' }}> / día</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompareStrip({ van, t, lang }) {
  const others = VANS.filter(v => v.id !== van.id);
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 14 }}>{lang === 'es' ? 'O quizá otra' : 'Or maybe another one'}</div>
      <h2 style={{ fontSize: 36, letterSpacing: '-0.03em', marginBottom: 20 }}>
        {lang === 'es' ? `Si ${van.name} no es lo tuyo…` : `If ${van.name} isn’t for you…`}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {others.map(v => (
          <div key={v.id} onClick={() => window.__navigate && window.__navigate(`#/van/${v.id}`)} style={{ background: 'var(--paper)', borderRadius: 4, overflow: 'hidden', boxShadow: 'var(--shadow-1)', cursor: 'pointer' }}>
            <Stripe kind={v.color === 'sage' ? 'sage' : v.color === 'ink' ? 'dark' : v.color === 'terra' ? 'terra' : ''}
              label={`${v.name.toLowerCase()} · thumbnail`} style={{ height: 130 }} />
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600 }}>{v.name}</h3>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 600 }}>
                  {v.price.low}€<span style={{ color: 'var(--ink-3)', fontWeight: 500 }}>/d</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-3)', fontStyle: 'italic' }}>“{lang === 'es' ? v.tagline_es : v.tagline_en}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   VEHICLE — MOBILE
   ═════════════════════════════════════════════════════════════ */
function VehicleMobile({ vanId = 'costa' }) {
  const t = useT();
  const { lang } = React.useContext(LangCtx);
  const van = VANS.find(v => v.id === vanId) || VANS[0];
  const desc = lang === 'es' ? van.descr_es : van.descr_en;
  const perfect = lang === 'es' ? van.perfect_es : van.perfect_en;
  const not = lang === 'es' ? van.not_es : van.not_en;

  return (
    <div className="av" style={{ paddingBottom: 80 }}>
      <MobileNav />

      {/* Hero image with overlay */}
      <div style={{ position: 'relative', height: 320, marginBottom: 20 }}>
        <Stripe kind="terra" label={`${van.name.toLowerCase()} · hero`} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 6 }}>
          <span className="tag tag-ink">{van.id.toUpperCase()}</span>
          {van.offroad && <span className="tag tag-sage">4×4</span>}
        </div>
        <div style={{ position: 'absolute', right: 16, bottom: 16, background: 'var(--paper)', padding: '8px 12px', borderRadius: 4, fontFamily: 'var(--f-mono)', fontSize: 11 }}>
          1 / 18
        </div>
      </div>

      <section style={{ padding: '0 20px 32px' }}>
        <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 0.98, marginBottom: 10 }}>
          {van.name}<span style={{ color: 'var(--terra)' }}>.</span>
        </h1>
        <p style={{ fontSize: 17, color: 'var(--ink-2)', fontStyle: 'italic', marginBottom: 20 }}>“{lang === 'es' ? van.tagline_es : van.tagline_en}”</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.veh.from}</span>
          <span style={{ fontFamily: 'var(--f-display)', fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' }}>{van.price.low}€</span>
          <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>/ {t.veh.day}</span>
        </div>
        <p style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.55, marginTop: 20 }}>{desc}</p>
      </section>

      {/* perfect/not */}
      <section style={{ padding: '0 20px 32px' }}>
        <div style={{ background: 'var(--bg-2)', borderRadius: 4, padding: 18 }}>
          <div className="eyebrow" style={{ color: 'var(--ok)', marginBottom: 12, fontSize: 11 }}>{t.veh.perfectFor}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {perfect.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 14 }}><span style={{ color: 'var(--ok)' }}>✓</span> {p}</li>
            ))}
          </ul>
          <div className="eyebrow" style={{ color: 'var(--ink-3)', marginTop: 16, marginBottom: 12, fontSize: 11 }}>{t.veh.notFor}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {not.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--ink-2)' }}><span style={{ color: 'var(--ink-3)' }}>×</span> {p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* specs */}
      <section style={{ padding: '0 20px 32px' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{t.veh.specs}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <SpecCard label={t.veh.sleeps} value={van.sleeps} ico={SpecIcons.bed} />
          <SpecCard label={t.veh.seats} value={van.seats} ico={SpecIcons.bed} />
          <SpecCard label={t.veh.license} value={van.license} ico={SpecIcons.card} />
          <SpecCard label={t.veh.length} value={van.length} ico={SpecIcons.ruler} />
          <SpecCard label={t.veh.transmission} value={lang === 'es' ? van.transmission_es : van.transmission_en} ico={SpecIcons.gear} />
          <SpecCard label={t.veh.consumption} value={van.consumption} ico={SpecIcons.fuel} />
        </div>
      </section>

      {/* video */}
      <section style={{ padding: '0 20px 32px' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{t.veh.walkthrough}</div>
        <div style={{ position: 'relative', height: 220, borderRadius: 4, overflow: 'hidden' }}>
          <Stripe kind="dark" label="video · interior 90s" style={{ width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,247,239,.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 22 22" fill="var(--ink)"><path d="M5 3l13 8-13 8z"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section style={{ padding: '0 20px 32px' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{t.veh.pricing}</div>
        <h2 style={{ fontSize: 26, letterSpacing: '-0.03em', marginBottom: 4 }}>{t.veh.offers}</h2>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 16 }}>{t.veh.pricingSub}</p>
        <PriceTiers van={van} t={t} lang={lang} />
        <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 11, fontWeight: 600, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 20, marginBottom: 10 }}>
          {lang === 'es' ? 'Por temporada' : 'By season'}
        </h4>
        <SeasonStrip van={van} t={t} lang={lang} />
      </section>

      {/* INCLUDED */}
      <section style={{ padding: '0 20px 32px' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{t.veh.included}</div>
        <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 12, fontWeight: 600, color: 'var(--ok)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{t.veh.included}</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px' }}>
          <CheckLine>{t.inc.linen}</CheckLine>
          <CheckLine>{t.inc.kitchen}</CheckLine>
          <CheckLine>{t.inc.km}</CheckLine>
          <CheckLine>{t.inc.ins}</CheckLine>
          <CheckLine>{t.inc.driver2}</CheckLine>
          <CheckLine>{t.inc.awning}</CheckLine>
        </ul>
        <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{t.veh.notincluded}</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <CheckLine ok={false}>{t.notinc.fuel}</CheckLine>
          <CheckLine ok={false}>{t.notinc.tolls}</CheckLine>
          <CheckLine ok={false}>{t.notinc.pets}</CheckLine>
        </ul>
      </section>

      {/* compare */}
      <section style={{ padding: '0 20px 32px' }}>
        <CompareStrip van={van} t={t} lang={lang} />
      </section>

      {/* MAP */}
      <section style={{ padding: '24px 20px' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{t.map.eyebrow}</div>
        <h2 style={{ fontSize: 26, letterSpacing: '-0.03em', marginBottom: 14 }}>{t.map.title}</h2>
        <MapBlock height={220} compact />
      </section>

      <Footer compact />

      {/* sticky bottom CTA bar */}
      <div style={{
        position: 'sticky', bottom: 0, left: 0, right: 0,
        background: 'var(--paper)', borderTop: '1px solid var(--line)',
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 -8px 24px rgba(0,0,0,.08)', zIndex: 30,
      }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.veh.from}</div>
          <div>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{van.price.low}€</span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>/ {t.veh.day}</span>
          </div>
        </div>
        <Btn kind="primary" style={{ flex: 1 }}>{t.veh.checkAvail}</Btn>
      </div>

      <WhatsAppFAB />
      <CookieBanner />
    </div>
  );
}

Object.assign(window, { VehicleDesktop, VehicleMobile });
