// booking.jsx — Onboarding / booking flow for Autoaventura
// Four steps: Vehículo → Fechas → Pack → Resumen
// Renders each step on its own artboard so the whole flow is visible side-by-side.

/* ─────────── Pack data (es only — brief says copy in Spanish) ─────────── */
const PACKS = [
  {
    id: 'aventurero',
    name: 'Pack Aventurero',
    sub: 'Base',
    addPerDay: 0,
    tagline: 'Para quien ya sabe lo que hace.',
    bullets: [
      { ok: true,  text: 'Hasta 250 km/día incluidos' },
      { ok: true,  text: 'Seguro a todo riesgo' },
      { ok: true,  text: 'Asistencia 24 h en carretera' },
      { ok: false, text: 'Devuélvela limpia' },
      { ok: false, text: 'Devuélvela con el depósito lleno' },
    ],
  },
  {
    id: 'sinpreo',
    name: 'Pack Sin Preocupaciones',
    sub: 'Recomendado',
    addPerDay: 18,
    tagline: 'Sube, conduce, disfruta.',
    bullets: [
      { ok: true,  text: 'Kilometraje ilimitado' },
      { ok: true,  text: 'Seguro a todo riesgo' },
      { ok: true,  text: 'Asistencia 24 h en carretera' },
      { ok: true,  text: 'Limpieza al devolver — incluida' },
      { ok: true,  text: 'Depósito lleno al devolver — incluido' },
    ],
  },
];

/* ─────────── Tier label per van (Compact / Mid / Premium / Family) ─────────── */
const BOOK_TIER = {
  valle:  { tier: 'Compacta',   size: 'Pequeña', icon: 'compact'  },
  sierra: { tier: 'Aventurera', size: 'Mediana', icon: 'offroad'  },
  mar:    { tier: 'Premium',    size: 'Mediana', icon: 'premium'  },
  costa:  { tier: 'Familiar',   size: 'Grande',  icon: 'family'   },
};

/* ─────────── Helpers ─────────── */
const BK_MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const fmtFull = (d) => d ? `${d.getDate()} ${BK_MONTHS[d.getMonth()].slice(0,3)}` : '—';
const fmtLong = (d) => d ? `${d.getDate()} de ${BK_MONTHS[d.getMonth()]} de ${d.getFullYear()}` : '—';

function nightsBetween(a, b) {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((b - a) / 86400000));
}
function hasHighSeason(start, end) {
  if (!start || !end) return false;
  const cur = new Date(start);
  while (cur <= end) {
    const m = cur.getMonth();
    if (m >= 5 && m <= 7) return true; // jun-aug = 5,6,7
    cur.setDate(cur.getDate() + 1);
  }
  return false;
}

/* ─────────── Van silhouette (svg, side view) ─────────── */
function VanSilhouette({ vanId = 'costa', w = 220, color = 'var(--ink)' }) {
  // four broad outlines: family (big with roof bunk), compact (small), offroad (raised), premium (long low-profile)
  const h = w * 0.55;
  const flavour = BOOK_TIER[vanId]?.icon || 'family';
  const stroke = 'var(--line)';

  if (flavour === 'compact') {
    return (
      <svg width={w} height={h} viewBox="0 0 220 120" fill="none">
        <path d="M 40 36 Q 44 22 60 22 L 132 22 Q 150 22 156 36 L 176 38 Q 188 40 188 56 L 188 88 Q 188 94 182 94 L 168 94 Q 166 84 156 84 Q 146 84 144 94 L 70 94 Q 68 84 58 84 Q 48 84 46 94 L 38 94 Q 32 94 32 88 L 32 50 Q 32 38 40 36 Z"
              fill={color} />
        <path d="M 50 32 L 130 32 L 142 44 L 50 44 Z" fill="var(--bg-2)" />
        <rect x="146" y="44" width="32" height="22" fill="var(--bg-2)" />
        <circle cx="58" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
        <circle cx="58" cy="94" r="5" fill={color} />
        <circle cx="156" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
        <circle cx="156" cy="94" r="5" fill={color} />
      </svg>
    );
  }
  if (flavour === 'offroad') {
    return (
      <svg width={w} height={h} viewBox="0 0 220 120" fill="none">
        <path d="M 28 40 Q 30 24 50 24 L 110 24 L 122 38 L 184 40 Q 198 42 198 60 L 198 82 Q 198 88 192 88 L 178 88 Q 176 78 166 78 Q 156 78 154 88 L 62 88 Q 60 78 50 78 Q 40 78 38 88 L 26 88 Q 20 88 20 82 L 20 56 Q 20 42 28 40 Z"
              fill={color} />
        <path d="M 42 34 L 108 34 L 118 46 L 42 46 Z" fill="var(--bg-2)" />
        <rect x="128" y="46" width="34" height="20" fill="var(--bg-2)" />
        <rect x="166" y="46" width="22" height="20" fill="var(--bg-2)" />
        {/* roof rack */}
        <rect x="60" y="20" width="110" height="3" fill={color} />
        <circle cx="50" cy="92" r="14" fill="var(--bg)" stroke={stroke} />
        <circle cx="50" cy="92" r="7" fill={color} />
        <circle cx="166" cy="92" r="14" fill="var(--bg)" stroke={stroke} />
        <circle cx="166" cy="92" r="7" fill={color} />
      </svg>
    );
  }
  if (flavour === 'premium') {
    return (
      <svg width={w} height={h} viewBox="0 0 220 120" fill="none">
        <path d="M 24 36 Q 28 22 48 22 L 124 22 Q 140 22 150 32 L 196 38 Q 208 40 208 56 L 208 88 Q 208 94 202 94 L 184 94 Q 182 84 172 84 Q 162 84 160 94 L 60 94 Q 58 84 48 84 Q 38 84 36 94 L 22 94 Q 16 94 16 88 L 16 50 Q 16 38 24 36 Z"
              fill={color} />
        <path d="M 38 30 L 124 30 L 138 44 L 38 44 Z" fill="var(--bg-2)" />
        <rect x="148" y="46" width="54" height="26" fill="var(--bg-2)" />
        <circle cx="48" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
        <circle cx="48" cy="94" r="5" fill={color} />
        <circle cx="172" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
        <circle cx="172" cy="94" r="5" fill={color} />
      </svg>
    );
  }
  // family / Costa (coachbuilt, has the over-cab bunk)
  return (
    <svg width={w} height={h} viewBox="0 0 220 120" fill="none">
      {/* over-cab bunk */}
      <path d="M 28 38 L 28 22 L 92 22 L 96 38 Z" fill={color} />
      {/* main body */}
      <path d="M 28 38 L 96 38 L 100 34 L 204 36 Q 212 38 212 52 L 212 88 Q 212 94 206 94 L 188 94 Q 186 84 176 84 Q 166 84 164 94 L 60 94 Q 58 84 48 84 Q 38 84 36 94 L 24 94 Q 18 94 18 88 L 18 50 Q 18 38 28 38 Z"
            fill={color} />
      <path d="M 102 40 L 200 40 L 200 60 L 102 60 Z" fill="var(--bg-2)" />
      <line x1="148" y1="40" x2="148" y2="60" stroke={color} strokeWidth="2" />
      <rect x="42" y="44" width="44" height="14" fill="var(--bg-2)" />
      <circle cx="48" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
      <circle cx="48" cy="94" r="5" fill={color} />
      <circle cx="176" cy="94" r="11" fill="var(--bg)" stroke={stroke} />
      <circle cx="176" cy="94" r="5" fill={color} />
    </svg>
  );
}

/* ─────────── Step indicator (top of flow) ─────────── */
function StepIndicator({ step, onJump }) {
  const labels = ['Vehículo', 'Fechas', 'Pack', 'Resumen'];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 0,
      padding: '20px 0',
    }}>
      {labels.map((label, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <React.Fragment key={i}>
            <button onClick={() => onJump && i <= step && onJump(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                cursor: i <= step ? 'pointer' : 'default',
                opacity: 1,
              }}>
              <span style={{
                width: 26, height: 26, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--f-display)', fontSize: 12, fontWeight: 600,
                background: done ? 'var(--ink)' : (current ? 'var(--terra)' : 'transparent'),
                color: done || current ? '#fff7ef' : 'var(--ink-3)',
                border: done || current ? 'none' : '1px solid var(--line-2)',
                transition: 'all .25s ease',
              }}>
                {done ? (
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1.5 5.5 L4.5 8.5 L9.5 2.5" />
                  </svg>
                ) : i + 1}
              </span>
              <span style={{
                fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: current ? 600 : 500,
                color: done ? 'var(--ink-2)' : (current ? 'var(--ink)' : 'var(--ink-3)'),
              }}>{label}</span>
            </button>
            {i < labels.length - 1 && (
              <span style={{
                flex: 1, height: 1, margin: '0 14px',
                background: done ? 'var(--ink)' : 'var(--line)',
                transition: 'background .25s ease',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─────────── Section heading for each step ─────────── */
function StepHead({ eyebrow, title, sub }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div className="eyebrow" style={{ color: 'var(--terra)' }}>{eyebrow}</div>
      <h2 style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 12 }}>{title}</h2>
      {sub && <p style={{ marginTop: 10, color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.55, maxWidth: 540 }}>{sub}</p>}
    </div>
  );
}

/* ─────────── Surface (paper card, shadcn-clean) ─────────── */
function Surface({ children, style, padded = true }) {
  return (
    <div style={{
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      borderRadius: 6,
      padding: padded ? 28 : 0,
      ...style,
    }}>{children}</div>
  );
}

/* ─────────── STEP 1 · Vehículo ─────────── */
function StepVehicle({ van, basePrice, tier }) {
  return (
    <div>
      <StepHead
        eyebrow="Paso 1 de 4"
        title="Confirma tu autocaravana."
        sub="Esta es la que has elegido. Si quieres comparar antes de seguir, puedes volver a la flota sin perder tu reserva."
      />

      <Surface>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <div style={{
            width: 240, height: 140,
            background: 'var(--bg)',
            border: '1px solid var(--line)',
            borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <VanSilhouette vanId={van.id} w={210} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="tag tag-terra">{tier.tier}</span>
              <span className="tag tag-line">Tamaño {tier.size.toLowerCase()}</span>
            </div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 2 }}>
              {van.name}
            </div>
            <div style={{ color: 'var(--ink-2)', fontSize: 15, marginBottom: 16 }}>
              {van.tagline_es}
            </div>

            <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', color: 'var(--ink-2)', fontSize: 14 }}>
              <SpecRow label="Plazas para dormir" value={`${van.sleeps}`} />
              <SpecRow label="Cinturones" value={`${van.seats}`} />
              <SpecRow label="Eslora" value={van.length} />
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--line)', margin: '24px 0' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', marginBottom: 4 }}>Precio base</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>desde</span>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>{basePrice}€</span>
              <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>/día</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>El precio varía según la temporada.</div>
          </div>
          <a style={{ fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', textDecoration: 'underline', textDecorationColor: 'var(--line-2)', textUnderlineOffset: 4 }}>
            ← Cambiar autocaravana
          </a>
        </div>
      </Surface>
    </div>
  );
}

function SpecRow({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>{value}</div>
    </div>
  );
}

/* ─────────── STEP 2 · Fechas ─────────── */
function StepDates({ dates, setDates, basePrice }) {
  const [open, setOpen] = React.useState(true);
  const nights = nightsBetween(dates.start, dates.end);
  const high = hasHighSeason(dates.start, dates.end);
  const ratePerDay = high ? Math.round(basePrice * 1.25) : basePrice;
  const subtotal = nights * ratePerDay;
  const tooShort = nights > 0 && nights < 2;

  return (
    <div>
      <StepHead
        eyebrow="Paso 2 de 4"
        title="Elige tus fechas."
        sub="Mínimo 2 días. El precio se actualiza al instante — sin tarifas ocultas."
      />

      <Surface>
        {/* Date range trigger */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
          border: '1px solid var(--line)', borderRadius: 4,
          overflow: 'hidden', marginBottom: 18,
        }}>
          <DateField label="Recogida" date={dates.start} onClick={() => setOpen(true)} active={open} />
          <DateField label="Devolución" date={dates.end} onClick={() => setOpen(true)} active={open} borderLeft />
        </div>

        {open && (
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 4,
            padding: 18, marginBottom: 16,
          }}>
            <DatePicker
              value={dates}
              onChange={setDates}
              lang="es"
              monthOffset={0}
            />
          </div>
        )}

        {/* Inline note */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5,
          marginBottom: 16,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ marginTop: 2, flexShrink: 0 }}>
            <circle cx="7" cy="7" r="5.5" />
            <path d="M7 4v3.5M7 9.5v.5" />
          </svg>
          <span>El conductor principal debe tener al menos 30 años y 5 años de carnet.</span>
        </div>

        {/* Live calc */}
        <div style={{
          background: nights > 0 ? 'var(--bg)' : 'transparent',
          border: '1px dashed var(--line-2)',
          borderRadius: 4, padding: 18,
          transition: 'background .2s',
        }}>
          {nights === 0 ? (
            <div style={{ color: 'var(--ink-3)', fontSize: 14, textAlign: 'center', padding: '8px 0' }}>
              Selecciona fechas para ver el cálculo.
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: 'var(--ink-2)', fontSize: 14 }}>
                  {nights} {nights === 1 ? 'día' : 'días'} · {ratePerDay}€/día
                </span>
                <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                  {subtotal}€
                </span>
              </div>
              {high && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--terra-dk)', marginTop: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--terra)' }} />
                  Tus fechas caen en temporada alta (junio–agosto). Tarifa +25%.
                </div>
              )}
              {tooShort && (
                <div style={{ fontSize: 12, color: 'var(--terra-dk)', marginTop: 4 }}>
                  La estancia mínima es de 2 días.
                </div>
              )}
            </div>
          )}
        </div>
      </Surface>
    </div>
  );
}

function DateField({ label, date, onClick, active, borderLeft }) {
  return (
    <button onClick={onClick} style={{
      padding: '16px 18px', textAlign: 'left',
      background: active ? 'var(--bg)' : 'transparent',
      borderLeft: borderLeft ? '1px solid var(--line)' : 'none',
      transition: 'background .15s',
    }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', marginBottom: 4 }}>{label}</div>
      <div style={{
        fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 600,
        color: date ? 'var(--ink)' : 'var(--ink-4)',
        letterSpacing: '-0.01em',
      }}>{date ? fmtLong(date) : '— elegir —'}</div>
    </button>
  );
}

/* ─────────── STEP 3 · Pack ─────────── */
function StepPack({ pack, setPack }) {
  const [showCompare, setShowCompare] = React.useState(false);
  return (
    <div>
      <StepHead
        eyebrow="Paso 3 de 4"
        title="Elige tu pack."
        sub="Lo básico ya está cubierto en ambos. La diferencia es cuánto quieres pensar al volver."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {PACKS.map(p => {
          const selected = pack === p.id;
          const recommended = p.id === 'sinpreo';
          return (
            <button key={p.id} onClick={() => setPack(p.id)}
              style={{
                textAlign: 'left',
                background: 'var(--paper)',
                border: selected ? '2px solid var(--terra)' : '1px solid var(--line)',
                borderRadius: 6,
                padding: selected ? 23 : 24,
                boxShadow: recommended && !selected ? '0 2px 6px rgba(35,33,30,.06), 0 8px 24px rgba(35,33,30,.04)' : (selected ? '0 2px 6px rgba(194,85,58,.12)' : 'none'),
                transition: 'all .15s',
                cursor: 'pointer',
                position: 'relative',
              }}>
              {recommended && (
                <span style={{
                  position: 'absolute', top: -10, right: 18,
                  background: 'var(--ink)', color: 'var(--paper)',
                  fontFamily: 'var(--f-display)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '4px 9px', borderRadius: 2,
                }}>Más popular</span>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {/* Radio */}
                <span style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: selected ? '6px solid var(--terra)' : '1.5px solid var(--line-2)',
                  background: 'var(--paper)',
                  flexShrink: 0, marginTop: 2,
                  transition: 'all .15s',
                }} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{p.tagline}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {p.addPerDay === 0 ? (
                        <div style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 600, color: 'var(--ok)' }}>Incluido</div>
                      ) : (
                        <>
                          <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>+{p.addPerDay}€</span>
                          <span style={{ fontSize: 12, color: 'var(--ink-3)', marginLeft: 4 }}>/día</span>
                        </>
                      )}
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'grid', gap: 7 }}>
                    {p.bullets.map((b, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: b.ok ? 'var(--ink-2)' : 'var(--ink-3)' }}>
                        <span style={{
                          width: 16, height: 16, borderRadius: '50%',
                          background: b.ok ? 'var(--sage-tn)' : 'var(--bg-2)',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: 2,
                          color: b.ok ? '#43523c' : 'var(--ink-3)',
                        }}>
                          {b.ok ? (
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 4.5 L3.5 7 L8 1.5" /></svg>
                          ) : (
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 2 L7 7 M7 2 L2 7" /></svg>
                          )}
                        </span>
                        <span style={{ textDecoration: b.ok ? 'none' : 'none' }}>{b.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expandable comparison */}
      <button onClick={() => setShowCompare(!showCompare)}
        style={{
          width: '100%', marginTop: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          background: 'transparent', border: '1px solid var(--line)', borderRadius: 4,
          fontFamily: 'var(--f-display)', fontWeight: 500, fontSize: 14, color: 'var(--ink-2)',
        }}>
        <span>¿Qué incluye cada pack? Compara línea a línea</span>
        <span style={{ transform: showCompare ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4 L6 8 L10 4" /></svg>
        </span>
      </button>
      {showCompare && (
        <div style={{
          marginTop: 0,
          background: 'var(--paper)',
          border: '1px solid var(--line)', borderTop: 'none',
          borderRadius: '0 0 4px 4px',
          overflow: 'hidden',
        }}>
          <CompareTable />
        </div>
      )}

      {/* Autoaventura Pass banner */}
      <div style={{
        marginTop: 24,
        background: 'var(--sage-tn)', borderRadius: 6,
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: 'var(--sage)', color: 'var(--paper)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em',
        }}>A+</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14, color: '#3b4a35' }}>
            Autoaventura Pass
          </div>
          <div style={{ fontSize: 13, color: '#4d5d44', lineHeight: 1.45, marginTop: 2 }}>
            ¿Viajas más de 3 veces al año? Tarifa reducida y <em>Sin Preocupaciones</em> siempre incluido. <a style={{ textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 600 }}>Saber más →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareTable() {
  const rows = [
    { feat: 'Seguro a todo riesgo', a: true,  b: true },
    { feat: 'Asistencia 24 h',       a: true,  b: true },
    { feat: 'Kilómetros',            a: '250 km/día', b: 'Ilimitados' },
    { feat: 'Limpieza al devolver',  a: 'A tu cargo', b: 'Incluida' },
    { feat: 'Depósito al devolver',  a: 'Lleno',      b: 'Incluido' },
    { feat: 'Segundo conductor',     a: true,  b: true },
    { feat: 'Cancelación flexible',  a: true,  b: true },
  ];
  const cell = (v, accent) => {
    if (v === true) return (
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', background: accent ? 'var(--sage)' : 'var(--sage-tn)', color: accent ? '#fff' : '#43523c' }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1.5 5 L4 7.5 L8.5 2" /></svg>
      </span>
    );
    return <span style={{ fontSize: 13, fontWeight: accent ? 600 : 400, color: accent ? 'var(--ink)' : 'var(--ink-2)' }}>{v}</span>;
  };
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ background: 'var(--bg)' }}>
          <th style={{ textAlign: 'left', padding: '12px 18px', fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-3)', fontWeight: 500 }}>Característica</th>
          <th style={{ textAlign: 'center', padding: '12px 14px', fontFamily: 'var(--f-display)', fontWeight: 600, color: 'var(--ink-2)' }}>Aventurero</th>
          <th style={{ textAlign: 'center', padding: '12px 14px', fontFamily: 'var(--f-display)', fontWeight: 600, color: 'var(--ink)' }}>Sin Preocupaciones</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} style={{ borderTop: '1px solid var(--line)' }}>
            <td style={{ padding: '12px 18px', color: 'var(--ink-2)' }}>{r.feat}</td>
            <td style={{ padding: '12px 14px', textAlign: 'center' }}>{cell(r.a, false)}</td>
            <td style={{ padding: '12px 14px', textAlign: 'center', background: 'rgba(122,136,112,.06)' }}>{cell(r.b, true)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ─────────── STEP 4 · Resumen ─────────── */
function StepSummary({ van, basePrice, dates, pack, tier }) {
  const nights = nightsBetween(dates.start, dates.end);
  const high = hasHighSeason(dates.start, dates.end);
  const ratePerDay = high ? Math.round(basePrice * 1.25) : basePrice;
  const baseTotal = nights * ratePerDay;
  const packObj = PACKS.find(p => p.id === pack) || PACKS[0];
  const packTotal = nights * packObj.addPerDay;
  const total = baseTotal + packTotal;

  return (
    <div>
      <StepHead
        eyebrow="Paso 4 de 4"
        title="Repasa y confirma."
        sub="Bloqueamos las fechas al momento. Cobramos solo cuando confirmamos la disponibilidad — normalmente en menos de 2 horas."
      />

      <Surface padded={false}>
        {/* Vehicle */}
        <Row
          label="Autocaravana"
          edit="Cambiar"
          right={<><strong style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{van.name}</strong> · {tier.tier.toLowerCase()} · {van.sleeps} plazas</>}
        />
        <Row
          label="Fechas"
          edit="Cambiar"
          right={<><strong style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{fmtFull(dates.start)} → {fmtFull(dates.end)}</strong> · {nights} {nights === 1 ? 'día' : 'días'}{high ? ' · temp. alta' : ''}</>}
        />
        <Row
          label="Pack"
          edit="Cambiar"
          right={<><strong style={{ fontFamily: 'var(--f-display)', fontWeight: 600 }}>{packObj.name}</strong></>}
        />

        {/* Price breakdown */}
        <div style={{ padding: '20px 24px', background: 'var(--bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--ink-2)', marginBottom: 8 }}>
            <span>Base · {ratePerDay}€/día × {nights} {nights === 1 ? 'día' : 'días'}</span>
            <span>{baseTotal}€</span>
          </div>
          {packObj.addPerDay > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--ink-2)', marginBottom: 8 }}>
              <span>{packObj.name} · +{packObj.addPerDay}€/día × {nights}</span>
              <span>+{packTotal}€</span>
            </div>
          )}
          {high && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>
              <span>Recargo de temporada alta (jun–ago) incluido en la base</span>
              <span>—</span>
            </div>
          )}
          <div style={{ height: 1, background: 'var(--line)', margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 15 }}>Total</span>
            <span>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>{total}€</span>
              <span style={{ fontSize: 12, color: 'var(--ink-3)', marginLeft: 6 }}>IVA incl.</span>
            </span>
          </div>
        </div>
      </Surface>

      {/* Trust signals */}
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 18, padding: '16px 4px', justifyContent: 'space-between' }}>
        {[
          { i: 'shield', t: 'Seguro incluido' },
          { i: 'road',   t: 'Asistencia 24 h' },
          { i: 'cal',    t: 'Cancelación flexible' },
          { i: 'lock',   t: 'Pago seguro' },
        ].map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-2)', fontFamily: 'var(--f-display)', fontWeight: 500 }}>
            <TrustIcon kind={b.i} />
            <span>{b.t}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn kind="primary" size="lg" style={{ width: '100%' }}>Confirmar y pagar — {total}€</Btn>
        <a style={{ textAlign: 'center', fontFamily: 'var(--f-display)', fontSize: 13, color: 'var(--ink-3)', fontWeight: 500 }}>
          ← Volver y modificar
        </a>
      </div>

      <p style={{ marginTop: 14, fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', lineHeight: 1.5 }}>
        Al confirmar aceptas los <a style={{ textDecoration: 'underline' }}>términos del alquiler</a> y la <a style={{ textDecoration: 'underline' }}>política de privacidad</a>.<br />
        Cancela gratis hasta 30 días antes. 50% hasta 14 días.
      </p>
    </div>
  );
}

function Row({ label, right, edit }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--line)', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>{label}</span>
        <span style={{ fontSize: 15, color: 'var(--ink)' }}>{right}</span>
      </div>
      <a style={{ fontFamily: 'var(--f-display)', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', textDecoration: 'underline', textDecorationColor: 'var(--line-2)', textUnderlineOffset: 4, flexShrink: 0 }}>{edit}</a>
    </div>
  );
}

function TrustIcon({ kind }) {
  const props = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'var(--sage)', strokeWidth: 1.4 };
  if (kind === 'shield')   return <svg {...props}><path d="M8 1.5 L13.5 4 V8 Q13.5 12 8 14.5 Q2.5 12 2.5 8 V4 Z" /><path d="M5.5 8 L7.5 10 L10.5 6" /></svg>;
  if (kind === 'road')     return <svg {...props}><path d="M5 2 L4 14 M11 2 L12 14" /><path d="M8 4 V6 M8 8 V10 M8 12 V13" strokeDasharray="0 0"/></svg>;
  if (kind === 'cal')      return <svg {...props}><rect x="2.5" y="3.5" width="11" height="10" rx="1" /><path d="M2.5 6.5 H13.5 M5.5 2 V5 M10.5 2 V5" /></svg>;
  if (kind === 'lock')     return <svg {...props}><rect x="3.5" y="7" width="9" height="7" rx="1" /><path d="M5.5 7 V5 Q5.5 2.5 8 2.5 Q10.5 2.5 10.5 5 V7" /></svg>;
  return null;
}

/* ─────────── Sidebar summary (sticky, desktop) ─────────── */
function SideSummary({ van, basePrice, dates, pack, tier, step }) {
  const nights = nightsBetween(dates.start, dates.end);
  const high = hasHighSeason(dates.start, dates.end);
  const ratePerDay = high ? Math.round(basePrice * 1.25) : basePrice;
  const baseTotal = nights * ratePerDay;
  const packObj = PACKS.find(p => p.id === pack) || PACKS[0];
  const packTotal = nights * packObj.addPerDay;
  const total = baseTotal + packTotal;

  return (
    <aside style={{
      position: 'sticky', top: 100,
      background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 6,
      padding: 22, fontSize: 14,
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)' }}>Tu reserva</div>

      {/* Van mini */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 72, height: 48, background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <VanSilhouette vanId={van.id} w={62} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>{van.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{tier.tier} · {van.sleeps} plazas</div>
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--line)' }} />

      {/* Fields */}
      <SideRow label="Fechas" done={step >= 1 && nights > 0}
        value={nights > 0 ? `${fmtFull(dates.start)} → ${fmtFull(dates.end)}` : 'pendiente'}
        sub={nights > 0 ? `${nights} ${nights === 1 ? 'día' : 'días'}${high ? ' · temp. alta' : ''}` : null}
      />
      <SideRow label="Pack" done={step >= 2}
        value={step >= 2 ? packObj.name : 'pendiente'}
        sub={step >= 2 ? (packObj.addPerDay === 0 ? 'Incluido' : `+${packObj.addPerDay}€/día`) : null}
      />

      <div style={{ height: 1, background: 'var(--line)' }} />

      {/* Total */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-3)', marginBottom: 4 }}>
          <span>Base</span><span>{nights > 0 ? `${baseTotal}€` : '—'}</span>
        </div>
        {packObj.addPerDay > 0 && step >= 2 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-3)', marginBottom: 4 }}>
            <span>Pack</span><span>+{packTotal}€</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10 }}>
          <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14 }}>Total</span>
          <span>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{nights > 0 ? `${total}€` : '—'}</span>
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>IVA incluido · sin extras escondidos</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--ink-3)', paddingTop: 6, borderTop: '1px solid var(--line)' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }} />
        Las fechas se bloquean al confirmar
      </div>
    </aside>
  );
}

function SideRow({ label, value, sub, done }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <span style={{
        width: 14, height: 14, borderRadius: '50%', marginTop: 3, flexShrink: 0,
        background: done ? 'var(--ok)' : 'transparent',
        border: done ? 'none' : '1.5px solid var(--line-2)',
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {done && <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 4 L3 6 L7 2" /></svg>}
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>{label}</div>
        <div style={{ fontSize: 13, color: done ? 'var(--ink)' : 'var(--ink-3)', fontWeight: done ? 500 : 400, lineHeight: 1.4 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ─────────── Desktop layout ─────────── */
function BookingDesktop({ vanId = 'costa', step = 0, dates: datesProp, pack: packProp }) {
  const van = VANS.find(v => v.id === vanId) || VANS[0];
  const tier = BOOK_TIER[van.id];
  const basePrice = van.price.low;

  // Sample data — different for each step preview
  const sampleDates = datesProp ?? sampleDatesForStep(step);
  const samplePack = packProp ?? (step >= 2 ? 'sinpreo' : 'aventurero');

  const [dates, setDates] = React.useState(sampleDates);
  const [pack, setPack] = React.useState(samplePack);

  React.useEffect(() => { setDates(sampleDates); }, [step, vanId]);
  React.useEffect(() => { setPack(samplePack); }, [step]);

  const nights = nightsBetween(dates.start, dates.end);
  const canContinue =
    step === 0 ? true :
    step === 1 ? nights >= 2 :
    step === 2 ? !!pack :
    true;

  return (
    <div className="av" style={{ minHeight: '100%', background: 'var(--bg)' }}>
      <PromoBanner />
      <BookingNav step={step} />

      <main style={{ padding: '32px 64px 64px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <StepIndicator step={step} />

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 340px',
            gap: 40, marginTop: 28,
          }}>
            <div>
              {step === 0 && <StepVehicle van={van} basePrice={basePrice} tier={tier} />}
              {step === 1 && <StepDates dates={dates} setDates={setDates} basePrice={basePrice} />}
              {step === 2 && <StepPack pack={pack} setPack={setPack} />}
              {step === 3 && <StepSummary van={van} basePrice={basePrice} dates={dates} pack={pack} tier={tier} />}

              {step < 3 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
                  <a style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 500, color: 'var(--ink-3)' }}>
                    {step > 0 ? '← Atrás' : ' '}
                  </a>
                  <Btn kind="primary" size="lg" style={{ opacity: canContinue ? 1 : 0.4, pointerEvents: canContinue ? 'auto' : 'none' }}>
                    Continuar →
                  </Btn>
                </div>
              )}
            </div>

            <SideSummary van={van} basePrice={basePrice} dates={dates} pack={pack} tier={tier} step={step} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ─────────── Mobile layout ─────────── */
function BookingMobile({ vanId = 'costa', step = 0, dates: datesProp, pack: packProp }) {
  const van = VANS.find(v => v.id === vanId) || VANS[0];
  const tier = BOOK_TIER[van.id];
  const basePrice = van.price.low;

  const sampleDates = datesProp ?? sampleDatesForStep(step);
  const samplePack = packProp ?? (step >= 2 ? 'sinpreo' : 'aventurero');

  const [dates, setDates] = React.useState(sampleDates);
  const [pack, setPack] = React.useState(samplePack);
  const [drawerOpen, setDrawerOpen] = React.useState(step === 3);

  React.useEffect(() => { setDates(sampleDates); setDrawerOpen(step === 3); }, [step, vanId]);
  React.useEffect(() => { setPack(samplePack); }, [step]);

  const nights = nightsBetween(dates.start, dates.end);
  const high = hasHighSeason(dates.start, dates.end);
  const ratePerDay = high ? Math.round(basePrice * 1.25) : basePrice;
  const packObj = PACKS.find(p => p.id === pack) || PACKS[0];
  const total = nights * ratePerDay + nights * packObj.addPerDay;

  const canContinue =
    step === 0 ? true :
    step === 1 ? nights >= 2 :
    step === 2 ? !!pack :
    true;

  return (
    <div className="av" style={{ minHeight: '100%', background: 'var(--bg)', paddingBottom: 130 }}>
      <PromoBanner compact />
      <MobileNav />

      <div style={{ padding: '12px 20px 0' }}>
        <StepIndicatorMobile step={step} />
      </div>

      <main style={{ padding: '12px 20px 32px' }}>
        {step === 0 && <StepVehicle van={van} basePrice={basePrice} tier={tier} />}
        {step === 1 && <StepDates dates={dates} setDates={setDates} basePrice={basePrice} />}
        {step === 2 && <StepPack pack={pack} setPack={setPack} />}
        {step === 3 && <StepSummary van={van} basePrice={basePrice} dates={dates} pack={pack} tier={tier} />}
      </main>

      {/* Bottom drawer summary */}
      <div style={{
        position: 'sticky', bottom: 0, left: 0, right: 0,
        background: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        boxShadow: '0 -8px 24px rgba(35,33,30,.08)',
        zIndex: 30,
      }}>
        {drawerOpen && (
          <div style={{ padding: '18px 20px 0', borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: 12 }}>Tu reserva</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16, fontSize: 13 }}>
              <Mline label="Vehículo" v={`${van.name} · ${tier.tier}`} />
              <Mline label="Fechas" v={nights > 0 ? `${fmtFull(dates.start)} → ${fmtFull(dates.end)} · ${nights} ${nights===1?'día':'días'}` : '—'} />
              <Mline label="Pack" v={step >= 2 ? packObj.name : '—'} />
            </div>
          </div>
        )}
        <button onClick={() => setDrawerOpen(!drawerOpen)}
          style={{
            width: '100%', padding: '14px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            background: 'transparent', textAlign: 'left',
          }}>
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
              Total estimado
            </div>
            <div>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{nights > 0 ? `${total}€` : '—'}</span>
              {nights > 0 && <span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 4 }}>IVA incl.</span>}
            </div>
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--f-display)', fontSize: 12, fontWeight: 500, color: 'var(--ink-3)' }}>
            {drawerOpen ? 'Ocultar' : 'Detalle'}
            <span style={{ transform: drawerOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 7 L5 3 L9 7" /></svg>
            </span>
          </span>
        </button>
        <div style={{ padding: '0 20px 16px' }}>
          <Btn kind="primary" size="lg" style={{ width: '100%', opacity: canContinue ? 1 : 0.4, pointerEvents: canContinue ? 'auto' : 'none' }}>
            {step === 3 ? `Confirmar y pagar — ${total}€` : 'Continuar →'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

function Mline({ label, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ color: 'var(--ink-3)' }}>{label}</span>
      <span style={{ color: 'var(--ink)', fontWeight: 500, textAlign: 'right', minWidth: 0, flex: 1 }}>{v}</span>
    </div>
  );
}

function StepIndicatorMobile({ step }) {
  const labels = ['Vehículo', 'Fechas', 'Pack', 'Resumen'];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)' }}>
          Paso {step + 1} de 4
        </div>
        <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
          {labels[step]}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {labels.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= step ? (i < step ? 'var(--ink)' : 'var(--terra)') : 'var(--line)',
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────── Slim top nav for booking ─────────── */
function BookingNav({ step }) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 64px', background: 'var(--bg)',
      borderBottom: '1px solid var(--line)',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <Logo size={20} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-display)', fontSize: 13, color: 'var(--ink-2)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }} />
          Reserva segura
        </div>
        <span style={{ width: 1, height: 16, background: 'var(--line)' }} />
        <a style={{ fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 500, color: 'var(--ink-2)' }}>
          ¿Dudas? <span style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>Escríbenos</span>
        </a>
      </div>
    </nav>
  );
}

/* ─────────── Sample data per step (for previewing) ─────────── */
function sampleDatesForStep(step) {
  if (step < 1) return { start: null, end: null };
  // Use July 2026 as the demo window (so users see high-season note)
  const start = new Date(2026, 6, 18);
  const end   = new Date(2026, 6, 25);
  return { start, end };
}

/* ─────────── Expose ─────────── */
Object.assign(window, {
  BookingDesktop, BookingMobile, PACKS, BOOK_TIER,
});
