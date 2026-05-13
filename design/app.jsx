// app.jsx — Autaventura production app
// Hash-based routing: #/ → Home, #/van/:id → Vehicle detail
// Responsive: auto-switch desktop/mobile based on viewport width

/* ── Responsive hook ── */
function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = React.useState(window.innerWidth < breakpoint);
  React.useEffect(() => {
    const obs = new ResizeObserver(() => setMobile(window.innerWidth < breakpoint));
    obs.observe(document.documentElement);
    return () => obs.disconnect();
  }, [breakpoint]);
  return mobile;
}

/* ── Hash router ── */
function useRoute() {
  const [hash, setHash] = React.useState(window.location.hash || '#/');
  React.useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  // parse: #/van/:id
  const vanMatch = hash.match(/^#\/van\/([a-z]+)/);
  if (vanMatch) return { page: 'vehicle', vanId: vanMatch[1] };
  return { page: 'home' };
}

/* ── App ── */
function App() {
  const [lang, setLang] = React.useState('es');
  const langApi = React.useMemo(() => ({ lang, setLang }), [lang]);
  const isMobile = useIsMobile();
  const route = useRoute();

  // Inject navigation into van cards
  React.useEffect(() => {
    window.__navigate = (path) => {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
  }, []);

  return (
    <LangCtx.Provider value={langApi}>
      {route.page === 'home' && (
        isMobile ? <HomeMobile /> : <HomeDesktop />
      )}
      {route.page === 'vehicle' && (
        isMobile
          ? <VehicleMobile vanId={route.vanId} />
          : <VehicleDesktop vanId={route.vanId} />
      )}
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
