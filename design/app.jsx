// app.jsx — canvas composition + tweaks + i18n root

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "vehCard": "photo",
  "vanFocus": "costa",
  "darkHero": false,
  "bookingVan": "sierra",
  "bookingMobileStep": 1,
  "bookingPack": "sinpreo"
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = React.useState('es');
  const langApi = React.useMemo(() => ({ lang, setLang }), [lang]);
  const [tweaks, setTweak] = useTweaks(DEFAULTS);

  return (
    <LangCtx.Provider value={langApi}>
      <DesignCanvas>
        <DCSection id="home" title="Home" subtitle="Hero · Trust · Fleet · How it works · FAQ · Mapa · Footer">
          <DCArtboard id="home-desk" label="Home · Desktop · 1440" width={1440} height={3800}>
            <HomeDesktop cardVariant={tweaks.vehCard} />
          </DCArtboard>
          <DCArtboard id="home-mob" label="Home · Mobile · 390" width={390} height={5400}>
            <HomeMobile cardVariant={tweaks.vehCard} />
          </DCArtboard>
        </DCSection>

        <DCSection id="vehicle" title="Vehicle detail" subtitle="Costa · familiar grande · una de cuatro autocaravanas distintas">
          <DCArtboard id="veh-desk" label="Vehicle · Desktop · 1440" width={1440} height={4400}>
            <VehicleDesktop vanId={tweaks.vanFocus} />
          </DCArtboard>
          <DCArtboard id="veh-mob" label="Vehicle · Mobile · 390" width={390} height={5800}>
            <VehicleMobile vanId={tweaks.vanFocus} />
          </DCArtboard>
        </DCSection>

        <DCSection id="booking" title="Onboarding · /reservar" subtitle="Flujo de cuatro pasos · Vehículo → Fechas → Pack → Resumen">
          <DCArtboard id="book-d-1" label="01 · Vehículo · 1440" width={1440} height={1100}>
            <BookingDesktop vanId={tweaks.bookingVan} step={0} pack={tweaks.bookingPack} />
          </DCArtboard>
          <DCArtboard id="book-d-2" label="02 · Fechas · 1440" width={1440} height={1500}>
            <BookingDesktop vanId={tweaks.bookingVan} step={1} pack={tweaks.bookingPack} />
          </DCArtboard>
          <DCArtboard id="book-d-3" label="03 · Pack · 1440" width={1440} height={1700}>
            <BookingDesktop vanId={tweaks.bookingVan} step={2} pack={tweaks.bookingPack} />
          </DCArtboard>
          <DCArtboard id="book-d-4" label="04 · Resumen · 1440" width={1440} height={1400}>
            <BookingDesktop vanId={tweaks.bookingVan} step={3} pack={tweaks.bookingPack} />
          </DCArtboard>
          <DCArtboard id="book-m" label={`Mobile · paso ${tweaks.bookingMobileStep + 1} · 390`} width={390} height={1700}>
            <BookingMobile vanId={tweaks.bookingVan} step={tweaks.bookingMobileStep} pack={tweaks.bookingPack} />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Idioma global">
          <TweakRadio
            label="Idioma del diseño"
            value={lang}
            onChange={setLang}
            options={[
              { value: 'es', label: 'Español' },
              { value: 'en', label: 'English' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Tarjeta de vehículo">
          <TweakRadio
            label="Estilo de la tarjeta"
            value={tweaks.vehCard}
            onChange={(v) => setTweak('vehCard', v)}
            options={[
              { value: 'photo', label: 'Foto-led' },
              { value: 'spec',  label: 'Spec-led' },
            ]}
          />
          <div style={{ fontSize: 12, color: 'var(--om-mute, #807a70)', marginTop: 6, lineHeight: 1.45 }}>
            Foto-led: imagen grande, precio en overlay. Spec-led: imagen menor, ficha técnica compacta y precio destacado.
          </div>
        </TweakSection>

        <TweakSection label="Onboarding">
          <TweakSelect
            label="Autocaravana en la reserva"
            value={tweaks.bookingVan}
            onChange={(v) => setTweak('bookingVan', v)}
            options={[
              { value: 'costa',  label: 'Costa · familiar (C1)' },
              { value: 'sierra', label: 'Sierra · 4x4' },
              { value: 'valle',  label: 'Valle · compacta' },
              { value: 'mar',    label: 'Mar · premium' },
            ]}
          />
          <TweakRadio
            label="Pack seleccionado"
            value={tweaks.bookingPack}
            onChange={(v) => setTweak('bookingPack', v)}
            options={[
              { value: 'aventurero', label: 'Aventurero' },
              { value: 'sinpreo',    label: 'Sin Preo.' },
            ]}
          />
          <TweakSelect
            label="Paso visible en mobile"
            value={tweaks.bookingMobileStep}
            onChange={(v) => setTweak('bookingMobileStep', Number(v))}
            options={[
              { value: 0, label: '01 · Vehículo' },
              { value: 1, label: '02 · Fechas' },
              { value: 2, label: '03 · Pack' },
              { value: 3, label: '04 · Resumen' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Página de vehículo">
          <TweakSelect
            label="Autocaravana en detalle"
            value={tweaks.vanFocus}
            onChange={(v) => setTweak('vanFocus', v)}
            options={[
              { value: 'costa', label: 'Costa · familiar grande (C1)' },
              { value: 'sierra', label: 'Sierra · 4x4 aventurera (B)' },
              { value: 'valle',  label: 'Valle · compacta de dos (B)' },
              { value: 'mar',    label: 'Mar · premium de costa (B)' },
            ]}
          />
          <div style={{ fontSize: 12, color: 'var(--om-mute, #807a70)', marginTop: 6, lineHeight: 1.45 }}>
            Cambia qué autocaravana muestra la página de detalle — para ver que las cuatro tienen su propio carácter.
          </div>
        </TweakSection>
      </TweaksPanel>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
