// home.jsx — Home page (desktop + mobile)

/* ─────────── FleetCard (used in Home) ─────────── */
function FleetCard({ van, variant = 'photo', t, lang, compact }) {
  const tagline = lang === 'es' ? van.tagline_es : van.tagline_en;
  const stripeKind = van.color === 'sage' ? 'sage' : van.color === 'ink' ? 'dark' : van.color === 'terra' ? '' : '';
  const kindLabel = lang === 'es' ? van.base.kind_es : van.base.kind_en;
  const spotlight = van.id === 'sierra' ? '4x4' : van.id === 'costa' ? '4 plazas' : van.id === 'valle' ? '<5m' : 'Premium';

  const navigate = () => window.__navigate && window.__navigate(`#/van/${van.id}`);

  if (variant === 'spec') {
    /* spec-led: prominent specs, smaller image, price tag prominent */
    return (
      <div className="veh-card" onClick={navigate} style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}>
        <div style={{ position: 'relative', height: compact ? 140 : 160 }}>
          <Stripe kind={stripeKind} label={`${van.name.toLowerCase()} · exterior`} style={{ width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <span className="tag tag-ink">{van.id.toUpperCase()}</span>
          </div>
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <span className="tag tag-line" style={{ background: 'var(--paper)' }}>{spotlight}</span>
          </div>
        </div>
        <div style={{ padding: '18px 20px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: compact ? 22 : 24, fontWeight: 600, marginBottom: 2 }}>{van.name}</h3>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 16 }}>{kindLabel} · {van.base.name}</div>
          {/* spec grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 13, marginBottom: 16 }}>
            <SpecRow icon="bed"   label={`${van.sleeps} ${t.fleet.sleeps}`} />
            <SpecRow icon="card"  label={`${t.fleet.license} ${van.license}`} />
            <SpecRow icon="ruler" label={van.length} />
            <SpecRow icon={van.bath ? 'bath' : 'nobath'} label={van.bath ? t.fleet.bath : t.fleet.nobath} />
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 14, borderTop: '1px solid var(--line)' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--f-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.fleet.from}</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700, lineHeight: 1, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                {van.price.low}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink-3)' }}> {t.fleet.perDay}</span>
              </div>
            </div>
            <Btn kind="dark" size="sm">{t.fleet.cta}</Btn>
          </div>
        </div>
      </div>
    );
  }

  /* photo-led (default): big photo, name + price overlay-ish, minimal specs */
  return (
    <div className="veh-card" onClick={navigate} style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: compact ? 220 : 280 }}>
        <Stripe kind={stripeKind} label={`${van.name.toLowerCase()} · hero shot`} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6 }}>
          <span className="tag tag-ink">{van.id.toUpperCase()}</span>
          {van.offroad && <span className="tag tag-sage">4×4</span>}
          {van.id === 'valle' && <span className="tag tag-line" style={{ background: 'var(--paper)' }}>{lang === 'es' ? 'sin baño' : 'no bath'}</span>}
          {van.id === 'mar' && <span className="tag tag-terra">{lang === 'es' ? 'premium' : 'premium'}</span>}
        </div>
        <div style={{ position: 'absolute', right: 14, bottom: 14, background: 'var(--paper)', padding: '10px 14px', borderRadius: 4, boxShadow: '0 4px 12px rgba(0,0,0,.1)' }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--f-mono)', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.fleet.from}</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 700, lineHeight: 1, color: 'var(--ink)' }}>
            {van.price.low}<span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-3)' }}> {t.fleet.perDay}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: compact ? 24 : 28, fontWeight: 600, marginBottom: 6, letterSpacing: '-0.02em' }}>{van.name}</h3>
        <div style={{ fontSize: 14, color: 'var(--ink-2)', fontStyle: 'italic', marginBottom: 14 }}>“{tagline}”</div>
        <div style={{ display: 'flex', gap: 14, marginBottom: 18, fontSize: 13, color: 'var(--ink-2)', flexWrap: 'wrap' }}>
          <SpecChip>{van.sleeps} {t.fleet.sleeps}</SpecChip>
          <SpecChip>{t.fleet.license} {van.license}</SpecChip>
          <SpecChip>{van.length}</SpecChip>
        </div>
        <button style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--line)', fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14 }}>
          <span>{t.fleet.cta}</span>
          <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 6h8M7 2l4 4-4 4"/></svg>
          </span>
        </button>
      </div>
    </div>
  );
}

function SpecChip({ children }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--terra)' }} />
    {children}
  </span>;
}

function SpecRow({ icon, label }) {
  const Icons = {
    bed:   <path d="M2 11h10M2 11V5h6v3h4v3M4 8h2" />,
    card:  <path d="M2 4h10v6H2zM4 7h3" />,
    ruler: <path d="M2 6h10v3H2zM4 6v2M6 6v3M8 6v2M10 6v3" />,
    bath:  <path d="M2 8h10v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8zM4 8V4a1 1 0 0 1 2 0M3 12v1M11 12v1" />,
    nobath:<path d="M3 3l8 8M2 8h10v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8z" />,
    fuel:  <path d="M3 11V3h5v8M3 11h5M9 5l2 1v5a1 1 0 0 1-2 0" />,
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink-2)' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-3)' }}>{Icons[icon] || null}</svg>
      <span>{label}</span>
    </div>
  );
}

/* ─────────── How-it-works step (shared) ─────────── */
function HowStep({ n, title, body, lang }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, color: 'var(--terra)', letterSpacing: '0.08em' }}>
        {n}
      </div>
      <div style={{ height: 1, background: 'var(--line-2)' }} />
      <h3 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</h3>
      <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.55, maxWidth: 320 }}>{body}</p>
    </div>
  );
}

/* ─────────── Hero search bar (desktop) ─────────── */
function HeroSearch({ t, lang, vans }) {
  const [open, setOpen] = React.useState(null); // 'dates' | 'van' | null
  const [dates, setDates] = React.useState({ start: null, end: null });
  const [van, setVan] = React.useState(null);
  const wrap = React.useRef(null);

  React.useEffect(() => {
    const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(null); };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, []);

  return (
    <div ref={wrap} style={{ position: 'relative', maxWidth: 900, margin: '0 auto', width: '100%' }}>
      <div style={{
        background: 'var(--paper)', borderRadius: 4, padding: 8, display: 'flex', alignItems: 'center', gap: 0,
        boxShadow: '0 12px 40px rgba(0,0,0,.15), 0 2px 8px rgba(0,0,0,.08)',
      }}>
        <SearchField icon="pin" label={t.hero.pickup} value="Catarroja, Valencia"
          onClick={() => setOpen(null)} />
        <Divider />
        <SearchField icon="cal" label={t.hero.dates} active={open === 'dates'}
          value={dates.start ? `${fmtShort(dates.start, lang)} → ${dates.end ? fmtShort(dates.end, lang) : '…'}` : (lang === 'es' ? 'Selecciona fechas' : 'Pick dates')}
          onClick={() => setOpen(open === 'dates' ? null : 'dates')} />
        <Divider />
        <SearchField icon="van" label={t.hero.van} active={open === 'van'}
          value={van ? van.name : t.hero.any}
          onClick={() => setOpen(open === 'van' ? null : 'van')} />
        <button style={{
          background: 'var(--terra)', color: '#fff7ef',
          fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 15,
          padding: '0 28px', height: 60, borderRadius: 2,
          display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8,
          letterSpacing: '-0.005em',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="6" cy="6" r="4"/><path d="M9 9l4 4"/></svg>
          {t.hero.search}
        </button>
      </div>

      {open === 'dates' && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 80, marginTop: 8,
          background: 'var(--paper)', borderRadius: 4, padding: 24,
          boxShadow: '0 12px 36px rgba(0,0,0,.18)',
          zIndex: 30,
        }}>
          <DatePicker value={dates} onChange={setDates} lang={lang} />
        </div>
      )}

      {open === 'van' && (
        <div style={{
          position: 'absolute', top: '100%', right: 100, marginTop: 8,
          background: 'var(--paper)', borderRadius: 4, padding: 8, minWidth: 260,
          boxShadow: '0 12px 36px rgba(0,0,0,.18)',
          zIndex: 30,
        }}>
          <button onClick={() => { setVan(null); setOpen(null); }}
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px 12px', borderRadius: 2, fontSize: 14, color: 'var(--ink-2)' }}>
            <span>{t.hero.any}</span>
            {!van && <Check />}
          </button>
          {vans.map(v => (
            <button key={v.id} onClick={() => { setVan(v); setOpen(null); }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px 12px', borderRadius: 2, fontSize: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 36, height: 24, borderRadius: 2, background: v.color === 'sage' ? 'var(--sage)' : v.color === 'ink' ? 'var(--ink)' : 'var(--terra)' }} />
                <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{v.name}</span>
                <span style={{ color: 'var(--ink-3)', fontSize: 12 }}>{v.sleeps} {t.fleet.sleeps}</span>
              </span>
              {van?.id === v.id && <Check />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--terra)" strokeWidth="2" strokeLinecap="round"><path d="M2 7l3 3 7-7"/></svg>
  );
}

function SearchField({ icon, label, value, onClick, active }) {
  const Icons = {
    pin: <path d="M7 1a5 5 0 0 0-5 5c0 4 5 7 5 7s5-3 5-7a5 5 0 0 0-5-5zM7 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />,
    cal: <path d="M2 4h10v8H2zM2 6h10M5 2v3M9 2v3" />,
    van: <path d="M1 5h7v5H1zM8 7h4l1 2v1H8zM3 10v1M11 10v1" />,
  };
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '12px 20px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14,
      background: active ? 'var(--bg-2)' : 'transparent',
      borderRadius: 2,
      transition: 'background .12s',
    }}>
      <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-2)', flexShrink: 0 }}>{Icons[icon]}</svg>
      <span style={{ display: 'block', minWidth: 0 }}>
        <span style={{ display: 'block', fontFamily: 'var(--f-display)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{label}</span>
        <span style={{ display: 'block', fontSize: 14.5, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
      </span>
    </button>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 36, background: 'var(--line)' }} />;
}

/* ═════════════════════════════════════════════════════════════
   HOME — DESKTOP
   ═════════════════════════════════════════════════════════════ */
function HomeDesktop({ cardVariant = 'photo' }) {
  const t = useT();
  const { lang } = React.useContext(LangCtx);

  return (
    <div className="av">
      <TopNav active="home" />

      {/* HERO */}
      <section style={{ position: 'relative', padding: '40px 64px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center', marginBottom: 56 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 22 }}>{t.hero.catarroja}</div>
            <h1 style={{ fontSize: 86, fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.035em', marginBottom: 24 }}>
              {t.hero.h1a}<br/>
              <em style={{ fontStyle: 'normal', color: 'var(--terra)' }}>{t.hero.h1b}</em><br/>
              <span style={{ color: 'var(--ink-2)' }}>{t.hero.h1c}</span>.
            </h1>
            <p style={{ fontSize: 20, color: 'var(--ink-2)', maxWidth: 480, lineHeight: 1.5 }}>{t.hero.sub}</p>
          </div>
          <div style={{ position: 'relative', height: 480, display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1.4fr 1fr', gap: 12 }}>
            <Stripe kind="terra" label="hero · van + sunset · costa brava"
              style={{ gridRow: '1 / span 2', gridColumn: '1 / 2', borderRadius: 4 }} />
            <Stripe kind="dark" label="interior · costa"
              style={{ borderRadius: 4 }} />
            <Stripe kind="sage" label="map detail"
              style={{ borderRadius: 4 }} />
          </div>
        </div>

        {/* search bar — pulled up slightly */}
        <div style={{ marginBottom: 56 }}>
          <HeroSearch t={t} lang={lang} vans={VANS} />
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ padding: '0 64px 64px' }}>
        <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '32px 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <TrustItem big="4,9" sub={<>★★★★★&nbsp;&nbsp;312&nbsp;{t.trust.reviews}</>} extra={lang === 'es' ? 'verificadas en Google' : 'verified on Google'} />
          <TrustItem big="7" sub={t.trust.years} extra={t.trust.yearsSub} />
          <TrustItem big="2 140" sub={t.trust.rentals} extra={t.trust.rentalsSub} />
          <TrustItem big={
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M21 4l16 6v10c0 9-7 16-16 18C12 36 5 29 5 20V10l16-6z" />
              <path d="M14 21l5 5 9-10" />
            </svg>
          } sub={t.trust.ins} extra={t.trust.insSub} bigSize={42} />
        </div>
      </section>

      {/* FLEET */}
      <section style={{ padding: '40px 64px 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t.fleet.eyebrow}</div>
            <h2 style={{ fontSize: 56, letterSpacing: '-0.03em', lineHeight: 1.02, maxWidth: 720 }}>
              {t.fleet.title}
            </h2>
            <p style={{ fontSize: 18, color: 'var(--ink-2)', marginTop: 16, maxWidth: 540 }}>{t.fleet.sub}</p>
          </div>
          <a style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', borderBottom: '1.5px solid var(--ink)', paddingBottom: 4, marginBottom: 8 }}>
            {t.fleet.compareCta}
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {VANS.map(v => <FleetCard key={v.id} van={v} variant={cardVariant} t={t} lang={lang} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--bg-2)', padding: '100px 64px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 2fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t.how.eyebrow}</div>
            <h2 style={{ fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.02 }}>{t.how.title}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56 }}>
            <HowStep n={t.how.step1n} title={t.how.step1t} body={t.how.step1d} lang={lang} />
            <HowStep n={t.how.step2n} title={t.how.step2t} body={t.how.step2d} lang={lang} />
            <HowStep n={t.how.step3n} title={t.how.step3t} body={t.how.step3d} lang={lang} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.5fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t.faq.eyebrow}</div>
            <h2 style={{ fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: 18 }}>{t.faq.title}</h2>
            <p style={{ fontSize: 16, color: 'var(--ink-2)', marginBottom: 24, maxWidth: 380 }}>{t.faq.sub}</p>
            <a style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14, color: 'var(--terra)', borderBottom: '1.5px solid var(--terra)', paddingBottom: 4 }}>{t.faq.allCta}</a>
          </div>
          <div>
            <FAQ items={FAQS[lang]} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '100px 64px', background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -80, top: -40, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(194,85,58,.5) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--terra)', marginBottom: 22 }}>{t.cta.eyebrow}</div>
            <h2 style={{ fontSize: 72, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'var(--paper)' }}>{t.cta.title}</h2>
            <p style={{ fontSize: 18, color: 'var(--ink-4)', marginTop: 22, maxWidth: 520, lineHeight: 1.5 }}>{t.cta.sub}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <button style={{
              background: 'var(--wa)', color: '#fff', padding: '22px 28px',
              borderRadius: 4, display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
              fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 18,
            }}>
              <IconWA size={28} />
              <span style={{ flex: 1 }}>
                {t.cta.wa}
                <span style={{ display: 'block', fontSize: 13, opacity: 0.85, fontWeight: 500 }}>{t.cta.waSub}</span>
              </span>
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
            </button>
            <button style={{
              background: 'transparent', color: 'var(--paper)', padding: '22px 28px',
              borderRadius: 4, border: '1px solid rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
              fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 18,
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor"><path d="M3 5c0-1 1-2 2-2h2l2 4-2 1c1 2 3 4 5 5l1-2 4 2v2c0 1-1 2-2 2C9 17 5 13 5 7v0z"/></svg>
              <span style={{ flex: 1 }}>
                {t.cta.call}
                <span style={{ display: 'block', fontSize: 13, color: 'var(--ink-4)', fontWeight: 500 }}>{t.cta.callSub}</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section style={{ padding: '100px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.6fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t.map.eyebrow}</div>
            <h2 style={{ fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>{t.map.title}</h2>
            <p style={{ fontSize: 17, color: 'var(--ink-2)', marginBottom: 28, lineHeight: 1.55 }}>{t.map.sub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              <MapLine icon={<path d="M7 1a5 5 0 0 0-5 5c0 4 5 7 5 7s5-3 5-7a5 5 0 0 0-5-5z M7 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />}>
                <strong style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{t.map.addr}</strong>
                <div style={{ color: 'var(--ink-2)', fontSize: 14 }}>{t.map.city}</div>
              </MapLine>
              <MapLine icon={<path d="M7 3v4l3 2 M7 13a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />}>
                <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                  {t.map.hours1}<br/>{t.map.hours2}<br/>{t.map.hours3}
                </div>
              </MapLine>
              <MapLine icon={<path d="M2 8l5 4 5-4 M2 8V4l5-3 5 3v4" />}>
                <div style={{ fontSize: 14 }}>{t.map.parking}</div>
              </MapLine>
            </div>
            <Btn kind="ghost" size="sm">{t.map.directions} →</Btn>
          </div>
          <MapBlock height={460} />
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
      <CookieBanner />
    </div>
  );
}

function TrustItem({ big, sub, extra, bigSize = 52 }) {
  return (
    <div style={{ padding: '0 28px', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: bigSize, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1, display: 'flex', alignItems: 'center', gap: 6 }}>{big}</div>
      <div style={{ fontFamily: 'var(--f-display)', fontWeight: 500, fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>{sub}</div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{extra}</div>
    </div>
  );
}

function MapLine({ icon, children }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 4, background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--terra)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </span>
      <div style={{ flex: 1, paddingTop: 2 }}>{children}</div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   HOME — MOBILE
   ═════════════════════════════════════════════════════════════ */
function HomeMobile({ cardVariant = 'photo' }) {
  const t = useT();
  const { lang } = React.useContext(LangCtx);
  const [searchOpen, setSearchOpen] = React.useState(null);
  const [dates, setDates] = React.useState({ start: null, end: null });

  return (
    <div className="av">
      <MobileNav />

      {/* HERO */}
      <section style={{ padding: '24px 20px 32px', position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>{t.hero.catarroja}</div>
        <h1 style={{ fontSize: 44, fontWeight: 600, lineHeight: 0.98, letterSpacing: '-0.035em', marginBottom: 18 }}>
          {t.hero.h1a}<br/>
          <em style={{ fontStyle: 'normal', color: 'var(--terra)' }}>{t.hero.h1b}</em><br/>
          <span style={{ color: 'var(--ink-2)' }}>{t.hero.h1c}</span>.
        </h1>
        <p style={{ fontSize: 17, color: 'var(--ink-2)', marginBottom: 22, lineHeight: 1.5 }}>{t.hero.sub}</p>
        <Stripe kind="terra" label="hero photo · van + landscape" style={{ borderRadius: 4, height: 220, marginBottom: 22 }} />
        {/* search bar — mobile vertical */}
        <div style={{ background: 'var(--paper)', borderRadius: 4, padding: 6, boxShadow: '0 8px 24px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06)' }}>
          <MobileSearchRow icon="pin" label={t.hero.pickup} value="Catarroja, Valencia" />
          <div style={{ height: 1, background: 'var(--line)' }} />
          <MobileSearchRow icon="cal" label={t.hero.dates}
            value={dates.start ? `${fmtShort(dates.start, lang)} → ${dates.end ? fmtShort(dates.end, lang) : '…'}` : (lang === 'es' ? 'Seleccionar' : 'Pick dates')}
            onClick={() => setSearchOpen(searchOpen === 'dates' ? null : 'dates')} />
          <div style={{ height: 1, background: 'var(--line)' }} />
          <MobileSearchRow icon="van" label={t.hero.van} value={t.hero.any} />
          <div style={{ padding: 6, paddingTop: 10 }}>
            <Btn kind="primary" size="lg" style={{ width: '100%' }}>{t.hero.search}</Btn>
          </div>
        </div>
        {searchOpen === 'dates' && (
          <div style={{ background: 'var(--paper)', marginTop: 8, padding: 16, borderRadius: 4, boxShadow: 'var(--shadow-1)' }}>
            <DatePicker value={dates} onChange={setDates} lang={lang} />
          </div>
        )}
      </section>

      {/* TRUST */}
      <section style={{ padding: '20px 20px 40px' }}>
        <div style={{
          background: 'var(--paper)', borderRadius: 4, padding: 20,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
          boxShadow: 'var(--shadow-1)',
        }}>
          <MobileTrust big="4,9" star sub={`312 ${t.trust.reviews}`} />
          <MobileTrust big="7" sub={t.trust.years} />
          <MobileTrust big="2 140" sub={t.trust.rentals} />
          <MobileTrust big={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--terra)" strokeWidth="1.5"><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/><path d="M8 12l3 3 5-6"/></svg>} sub={t.trust.ins} />
        </div>
      </section>

      {/* FLEET */}
      <section style={{ padding: '32px 20px 56px' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{t.fleet.eyebrow}</div>
        <h2 style={{ fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 12 }}>{t.fleet.title}</h2>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', marginBottom: 28, lineHeight: 1.55 }}>{t.fleet.sub}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {VANS.map(v => <FleetCard key={v.id} van={v} variant={cardVariant} t={t} lang={lang} compact />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--bg-2)', padding: '56px 20px' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{t.how.eyebrow}</div>
        <h2 style={{ fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 36 }}>{t.how.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <HowStep n={t.how.step1n} title={t.how.step1t} body={t.how.step1d} lang={lang} />
          <HowStep n={t.how.step2n} title={t.how.step2t} body={t.how.step2d} lang={lang} />
          <HowStep n={t.how.step3n} title={t.how.step3t} body={t.how.step3d} lang={lang} />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '56px 20px' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{t.faq.eyebrow}</div>
        <h2 style={{ fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}>{t.faq.title}</h2>
        <FAQ items={FAQS[lang]} defaultOpen={0} />
        <div style={{ marginTop: 28 }}>
          <a style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14, color: 'var(--terra)', borderBottom: '1.5px solid var(--terra)', paddingBottom: 4 }}>{t.faq.allCta}</a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '56px 20px', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="eyebrow" style={{ color: 'var(--terra)', marginBottom: 16 }}>{t.cta.eyebrow}</div>
        <h2 style={{ fontSize: 38, letterSpacing: '-0.03em', lineHeight: 1.0, color: 'var(--paper)', marginBottom: 16 }}>{t.cta.title}</h2>
        <p style={{ fontSize: 16, color: 'var(--ink-4)', marginBottom: 24, lineHeight: 1.55 }}>{t.cta.sub}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button style={{ background: 'var(--wa)', color: '#fff', padding: '18px 22px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 16, textAlign: 'left' }}>
            <IconWA size={24} />
            <span style={{ flex: 1 }}>
              {t.cta.wa}
              <span style={{ display: 'block', fontSize: 12, opacity: 0.85, fontWeight: 500 }}>{t.cta.waSub}</span>
            </span>
          </button>
          <button style={{ background: 'transparent', color: 'var(--paper)', padding: '18px 22px', borderRadius: 4, border: '1px solid rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 16, textAlign: 'left' }}>
            <svg width="20" height="20" viewBox="0 0 22 22" fill="currentColor"><path d="M3 5c0-1 1-2 2-2h2l2 4-2 1c1 2 3 4 5 5l1-2 4 2v2c0 1-1 2-2 2C9 17 5 13 5 7v0z"/></svg>
            <span style={{ flex: 1 }}>
              {t.cta.call}
              <span style={{ display: 'block', fontSize: 12, color: 'var(--ink-4)', fontWeight: 500 }}>{t.cta.callSub}</span>
            </span>
          </button>
        </div>
      </section>

      {/* MAP */}
      <section style={{ padding: '56px 20px' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{t.map.eyebrow}</div>
        <h2 style={{ fontSize: 30, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 14 }}>{t.map.title}</h2>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', marginBottom: 22, lineHeight: 1.5 }}>{t.map.sub}</p>
        <MapBlock height={280} compact />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
          <MapLine icon={<path d="M7 1a5 5 0 0 0-5 5c0 4 5 7 5 7s5-3 5-7a5 5 0 0 0-5-5z"/>}>
            <strong style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{t.map.addr}</strong>
            <div style={{ color: 'var(--ink-2)', fontSize: 14 }}>{t.map.city}</div>
          </MapLine>
          <MapLine icon={<path d="M7 3v4l3 2 M7 13a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>}>
            <div style={{ fontSize: 14, lineHeight: 1.6 }}>
              {t.map.hours1}<br/>{t.map.hours2}
            </div>
          </MapLine>
        </div>
      </section>

      <Footer compact />
      <WhatsAppFAB />
      <CookieBanner />
    </div>
  );
}

function MobileSearchRow({ icon, label, value, onClick }) {
  const Icons = {
    pin: <path d="M7 1a5 5 0 0 0-5 5c0 4 5 7 5 7s5-3 5-7a5 5 0 0 0-5-5z M7 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />,
    cal: <path d="M2 4h10v8H2z M2 6h10 M5 2v3 M9 2v3" />,
    van: <path d="M1 5h7v5H1z M8 7h4l1 2v1H8z M3 10v1 M11 10v1" />,
  };
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 12px', width: '100%', textAlign: 'left' }}>
      <svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="var(--ink-2)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{Icons[icon]}</svg>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontFamily: 'var(--f-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{label}</span>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{value}</span>
      </span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round"><path d="M3 1l4 4-4 4"/></svg>
    </button>
  );
}

function MobileTrust({ big, sub, star }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1 }}>{big}</span>
        {star && <span style={{ color: 'var(--terra)', fontSize: 14, letterSpacing: '-2px' }}>★★★★★</span>}
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 6 }}>{sub}</div>
    </div>
  );
}

Object.assign(window, { HomeDesktop, HomeMobile, FleetCard });
