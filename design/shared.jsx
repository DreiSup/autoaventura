// shared.jsx — i18n, primitives, data, shared components for Autaventura

/* ─────────── i18n ─────────── */
const DICT = {
  es: {
    nav: { fleet: 'Flota', how: 'Cómo funciona', faq: 'Preguntas', contact: 'Contacto', book: 'Reservar' },
    hero: {
      h1a: 'Autocaravanas',
      h1b: 'desde Valencia',
      h1c: 'para 4 personas',
      sub: 'Todo incluido. Sin sorpresas, sin letra pequeña.',
      pickup: 'Recogida',
      dropoff: 'Devolución',
      dates: 'Fechas',
      van: 'Autocaravana',
      any: 'Cualquiera',
      search: 'Ver disponibilidad',
      from: 'desde',
      to: 'hasta',
      catarroja: 'Catarroja · Valencia',
    },
    trust: {
      reviews: 'reseñas en Google',
      rating: 'sobre 5',
      years: 'años en Valencia',
      yearsSub: 'desde 2019',
      rentals: 'viajes completados',
      rentalsSub: 'y los que vendrán',
      ins: 'A todo riesgo',
      insSub: 'Allianz + asistencia 24h',
    },
    fleet: {
      eyebrow: 'La flota',
      title: 'Cuatro autocaravanas, cuatro maneras de viajar.',
      sub: 'Cada una con su carácter. Elige la que encaja con tu plan, no al revés.',
      cta: 'Ver detalles',
      compareCta: 'Comparar las cuatro →',
      from: 'desde',
      perDay: '€/día',
      sleeps: 'plazas',
      license: 'carnet',
      length: 'eslora',
      bath: 'baño',
      nobath: 'sin baño',
      kitchen: 'cocina',
      offroad: '4x4',
      auto: 'automático',
    },
    how: {
      eyebrow: 'Cómo funciona',
      title: 'Reservar es de un café.',
      step1n: '01',
      step1t: 'Busca',
      step1d: 'Elige fechas y autocaravana. Sin pago aún, sin compromiso.',
      step2n: '02',
      step2t: 'Confirma por WhatsApp',
      step2d: 'Te respondemos en menos de 2 horas. Resolvemos dudas y bloqueamos las fechas.',
      step3n: '03',
      step3t: 'Recoge en Catarroja',
      step3d: 'Te enseñamos la furgo en 30 minutos. Lleno de gasoil. Y a viajar.',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que todo el mundo nos pregunta.',
      sub: 'Si tienes otra duda, escríbenos por WhatsApp. Respondemos como personas.',
      allCta: 'Ver todas las preguntas →',
    },
    cta: {
      eyebrow: 'Hablemos',
      title: '¿Listo para coger la carretera?',
      sub: 'WhatsApp es la forma más rápida. Nuestro equipo (humano, en Valencia) responde en menos de 2 horas en horario laboral.',
      wa: 'Escribir por WhatsApp',
      waSub: 'Respuesta < 2 h',
      call: 'Llamar al 962 12 34 56',
      callSub: 'Lun–Sáb 9:00–19:00',
    },
    map: {
      eyebrow: 'Dónde estamos',
      title: 'Nos ves desde la A-7.',
      sub: 'Recogida y entrega en nuestro local de Catarroja, a 10 minutos del centro de Valencia y de la playa de El Saler.',
      addr: 'Carrer del Forn, 24',
      city: '46470 Catarroja, Valencia',
      hours1: 'Lun–Vie · 9:00–13:00, 16:00–19:00',
      hours2: 'Sábados · 9:00–13:00',
      hours3: 'Domingos · cerrado (recogidas concertadas)',
      directions: 'Cómo llegar',
      parking: 'Parking gratuito para tu coche durante el viaje',
    },
    footer: {
      tag: 'Autocaravanas honestas. Desde Valencia, para toda España y Europa.',
      explore: 'Explorar',
      legal: 'Legal',
      contact: 'Contacto',
      aviso: 'Aviso Legal',
      privacidad: 'Política de Privacidad',
      cookies: 'Política de Cookies',
      terminos: 'Términos del alquiler',
      nif: 'NIF B-12345678 · Autaventura Valencia S.L.',
      rights: '© 2026 Autaventura · Hecho con cariño en Valencia',
    },
    wa: {
      online: 'En línea',
      typing: 'escribiendo…',
      placeholder: 'Escribe un mensaje',
      autoreply: '¡Hola! 👋 Soy Marta. Te responderé personalmente en cuanto pueda — normalmente en menos de 2 horas en horario laboral.',
      hi: 'Hola, quería preguntar por la disponibilidad de Costa para finales de julio para 4 personas. ¡Gracias!',
      cta: 'Abrir WhatsApp',
    },
    veh: {
      back: '← Volver a la flota',
      sleeps: 'duerme',
      seats: 'cinturones',
      license: 'carnet',
      transmission: 'cambio',
      consumption: 'consumo',
      length: 'eslora',
      gallery: 'Galería',
      walkthrough: 'Vídeo del interior',
      walkthroughSub: '90 segundos · sin música chunga',
      videoTag: 'pulsa play (no autoplay)',
      specs: 'Ficha técnica',
      included: 'Lo que llevas incluido',
      notincluded: 'Lo que no está incluido',
      pricing: 'Precios y temporadas',
      pricingSub: 'Todo IVA incluido. Sin extras escondidos.',
      day: 'día',
      days: 'días',
      lowSeason: 'Temporada baja',
      midSeason: 'Temporada media',
      highSeason: 'Temporada alta',
      lowMonths: 'Nov–Mar',
      midMonths: 'Abr, May, Sep, Oct',
      highMonths: 'Jun–Ago, Semana Santa',
      offers: 'Cuanto más tiempo, menos €/día.',
      checkAvail: 'Ver disponibilidad',
      ask: 'Preguntar por WhatsApp',
      from: 'Desde',
      perNight: 'por noche',
      total: 'Total estimado',
      nights: 'noches',
      cancel: 'Cancelación flexible',
      cancelSub: 'Gratis hasta 30 días antes. 50% hasta 14 días.',
      deposit: 'Fianza',
      depositSub: '1.200 € · devolución 7–10 días',
      kms: 'Kilometraje',
      kmsSub: 'Ilimitado',
      insurance: 'Seguro',
      insuranceSub: 'A todo riesgo con franquicia',
      reduceCta: 'Reducir franquicia → +12€/día',
      checkin: 'Recogida desde 16:00',
      checkout: 'Devolución hasta 11:00',
      perfectFor: 'Perfecta para',
      notFor: 'No es lo tuyo si',
    },
    inc: {
      linen: 'Sábanas y toallas',
      kitchen: 'Menaje y batería de cocina',
      gas: 'Bombona de gas llena',
      water: 'Depósitos llenos',
      km: 'Kilometraje ilimitado',
      ins: 'Seguro a todo riesgo',
      assist: 'Asistencia en carretera 24 h',
      driver2: 'Segundo conductor sin coste',
      itinerary: 'Mapa de rutas y consejos',
      table: 'Mesa y sillas de exterior',
      awning: 'Toldo lateral',
      chemicals: 'Producto para WC químico',
    },
    notinc: {
      fuel: 'Gasoil (devuélvela como te la entregamos)',
      tolls: 'Peajes y parkings',
      camp: 'Camping y áreas',
      ferry: 'Ferries y eurotúnel',
      excess: 'Reducción de franquicia (opcional)',
      pets: 'Mascotas (+30€/viaje, avisa al reservar)',
    },
    pol: {
      b: 'Carnet B (coche normal)',
      c1: 'Carnet C1 (vehículo pesado)',
      bExp: 'Vale el carnet de coche de toda la vida.',
      c1Exp: 'Por encima de 3,5 toneladas. Si tienes carnet de antes de 1997, también vale.',
    },
  },
  en: {
    nav: { fleet: 'Fleet', how: 'How it works', faq: 'FAQ', contact: 'Contact', book: 'Book' },
    hero: {
      h1a: 'Campervans',
      h1b: 'from Valencia',
      h1c: 'for four',
      sub: 'Everything included. No surprises, no fine print.',
      pickup: 'Pick-up',
      dropoff: 'Return',
      dates: 'Dates',
      van: 'Van',
      any: 'Any',
      search: 'Check availability',
      from: 'from',
      to: 'to',
      catarroja: 'Catarroja · Valencia',
    },
    trust: {
      reviews: 'Google reviews',
      rating: 'out of 5',
      years: 'years in Valencia',
      yearsSub: 'since 2019',
      rentals: 'trips completed',
      rentalsSub: 'and counting',
      ins: 'Full coverage',
      insSub: 'Allianz + 24h roadside',
    },
    fleet: {
      eyebrow: 'The fleet',
      title: 'Four vans. Four ways to travel.',
      sub: 'Each one has its own character. Pick the one that fits your trip — not the other way around.',
      cta: 'See details',
      compareCta: 'Compare all four →',
      from: 'from',
      perDay: '€/day',
      sleeps: 'sleeps',
      license: 'license',
      length: 'length',
      bath: 'bathroom',
      nobath: 'no bathroom',
      kitchen: 'kitchen',
      offroad: '4x4',
      auto: 'automatic',
    },
    how: {
      eyebrow: 'How it works',
      title: 'Booking takes one coffee.',
      step1n: '01',
      step1t: 'Search',
      step1d: 'Pick dates and a van. No payment yet, no strings attached.',
      step2n: '02',
      step2t: 'Confirm by WhatsApp',
      step2d: 'We reply in under 2 hours. We answer your questions and lock the dates.',
      step3n: '03',
      step3t: 'Pick up in Catarroja',
      step3d: 'We show you the van in 30 minutes. Full tank. And off you go.',
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'The questions everyone asks.',
      sub: 'Got another one? Write us on WhatsApp. Real people, real answers.',
      allCta: 'See all questions →',
    },
    cta: {
      eyebrow: 'Let’s talk',
      title: 'Ready to hit the road?',
      sub: 'WhatsApp is the fastest way. Our (human, Valencia-based) team replies in under 2 hours on workdays.',
      wa: 'Chat on WhatsApp',
      waSub: 'Reply < 2 h',
      call: 'Call +34 962 12 34 56',
      callSub: 'Mon–Sat 9:00–19:00',
    },
    map: {
      eyebrow: 'Where we are',
      title: 'You can see us from the A-7.',
      sub: 'Pick-up and drop-off at our shop in Catarroja, 10 minutes from central Valencia and El Saler beach.',
      addr: 'Carrer del Forn, 24',
      city: '46470 Catarroja, Valencia',
      hours1: 'Mon–Fri · 9:00–13:00, 16:00–19:00',
      hours2: 'Saturdays · 9:00–13:00',
      hours3: 'Sundays · closed (pre-arranged pick-ups)',
      directions: 'Get directions',
      parking: 'Free parking for your car while you travel',
    },
    footer: {
      tag: 'Honest campervans. From Valencia, across Spain and Europe.',
      explore: 'Explore',
      legal: 'Legal',
      contact: 'Contact',
      aviso: 'Legal Notice',
      privacidad: 'Privacy Policy',
      cookies: 'Cookie Policy',
      terminos: 'Rental terms',
      nif: 'NIF B-12345678 · Autaventura Valencia S.L.',
      rights: '© 2026 Autaventura · Made with care in Valencia',
    },
    wa: {
      online: 'Online',
      typing: 'typing…',
      placeholder: 'Type a message',
      autoreply: 'Hi there! 👋 I’m Marta. I’ll get back to you personally as soon as I can — usually within 2 hours on workdays.',
      hi: 'Hi, I’d like to ask about availability of Costa for the end of July, 4 people. Thanks!',
      cta: 'Open WhatsApp',
    },
    veh: {
      back: '← Back to fleet',
      sleeps: 'sleeps',
      seats: 'seatbelts',
      license: 'license',
      transmission: 'gearbox',
      consumption: 'consumption',
      length: 'length',
      gallery: 'Gallery',
      walkthrough: 'Interior walkthrough',
      walkthroughSub: '90 seconds · no cheesy music',
      videoTag: 'press play (no autoplay)',
      specs: 'Spec sheet',
      included: 'What’s included',
      notincluded: 'What’s not included',
      pricing: 'Pricing & seasons',
      pricingSub: 'Tax included. No hidden extras.',
      day: 'day',
      days: 'days',
      lowSeason: 'Low season',
      midSeason: 'Mid season',
      highSeason: 'High season',
      lowMonths: 'Nov–Mar',
      midMonths: 'Apr, May, Sep, Oct',
      highMonths: 'Jun–Aug, Easter',
      offers: 'The longer you go, the less per day.',
      checkAvail: 'Check availability',
      ask: 'Ask on WhatsApp',
      from: 'From',
      perNight: 'per night',
      total: 'Estimated total',
      nights: 'nights',
      cancel: 'Flexible cancellation',
      cancelSub: 'Free up to 30 days before. 50% up to 14 days.',
      deposit: 'Deposit',
      depositSub: '€1,200 · refund 7–10 days',
      kms: 'Mileage',
      kmsSub: 'Unlimited',
      insurance: 'Insurance',
      insuranceSub: 'Full cover with excess',
      reduceCta: 'Reduce excess → +€12/day',
      checkin: 'Pick-up from 16:00',
      checkout: 'Return by 11:00',
      perfectFor: 'Perfect for',
      notFor: 'Not for you if',
    },
    inc: {
      linen: 'Bed linen & towels',
      kitchen: 'Full kitchen kit',
      gas: 'Full gas bottle',
      water: 'Full water tanks',
      km: 'Unlimited mileage',
      ins: 'Full insurance',
      assist: '24h roadside assistance',
      driver2: 'Second driver, free',
      itinerary: 'Route map & local tips',
      table: 'Outdoor table & chairs',
      awning: 'Side awning',
      chemicals: 'Chemical WC product',
    },
    notinc: {
      fuel: 'Diesel (return as you got it)',
      tolls: 'Tolls & paid parking',
      camp: 'Campsites & van areas',
      ferry: 'Ferries & Eurotunnel',
      excess: 'Excess reduction (optional)',
      pets: 'Pets (+€30/trip, tell us)',
    },
    pol: {
      b: 'B license (regular car)',
      c1: 'C1 license (heavy vehicle)',
      bExp: 'Your normal driving license is fine.',
      c1Exp: 'For over 3.5 tonnes. If your B license is from before 1997, it counts too.',
    },
  },
};

const LangCtx = React.createContext({ lang: 'es', setLang: () => {} });
const useT = () => {
  const { lang } = React.useContext(LangCtx);
  return DICT[lang];
};

/* ─────────── DATA: 4 distinct vans ─────────── */
const VANS = [
  {
    id: 'costa',
    name: 'Costa',
    tagline_es: 'La familiar grande',
    tagline_en: 'The family flagship',
    descr_es: 'Espacio para cuatro de verdad. Cama fija arriba, cama doble abajo, baño completo. Para padres que quieren un viaje, no una excursión.',
    descr_en: 'Real room for four. Fixed bed up top, double bed below, full bathroom. For parents who want a trip, not an expedition.',
    perfect_es: ['Familias con dos niños', 'Viajes de 7+ días', 'No te apetece montar la cama cada noche'],
    perfect_en: ['Families with two kids', 'Trips of 7+ days', 'You don\'t want to make the bed every night'],
    not_es: ['Buscas algo ágil para aparcar', 'No tienes carnet C1 o B antiguo'],
    not_en: ['You want something nimble', 'No C1 or pre-1997 B license'],
    sleeps: 4, seats: 4, license: 'C1', length: '6.94 m', transmission_es: 'Automático', transmission_en: 'Automatic', consumption: '8.2 L/100',
    bath: true, kitchen: 'full', offroad: false,
    base: { name: 'Mercedes-style', kind_es: 'Capuchina grande', kind_en: 'Coachbuilt' },
    price: { low: 110, mid: 125, high: 140 },
    tiers: [
      { d_es: '1 día',           d_en: '1 day',         per: 140 },
      { d_es: '2 días',          d_en: '2 days',        per: 130 },
      { d_es: '3 a 6 días',      d_en: '3 to 6 days',   per: 125 },
      { d_es: '7 a 13 días',     d_en: '7 to 13 days',  per: 115 },
      { d_es: '14 días o más',   d_en: '14+ days',      per: 110 },
    ],
    color: 'terra',
  },
  {
    id: 'sierra',
    name: 'Sierra',
    tagline_es: 'La 4x4 aventurera',
    tagline_en: 'The 4x4 adventurer',
    descr_es: 'Tracción a las cuatro ruedas, suspensión elevada y ducha exterior. Donde acaba el asfalto, ella empieza.',
    descr_en: 'All-wheel drive, raised suspension and an outdoor shower. Where the tarmac ends, she starts.',
    perfect_es: ['Pareja aventurera', 'Pirineos, Picos, Sierra Nevada', 'Acampada libre y pistas forestales'],
    perfect_en: ['Adventurous couple', 'Pyrenees, Picos, Sierra Nevada', 'Wild camping and forest tracks'],
    not_es: ['Vas con niños pequeños', 'Necesitas comodidad de hotel'],
    not_en: ['Travelling with small kids', 'You want hotel-level comfort'],
    sleeps: 2, seats: 3, license: 'B', length: '5.90 m', transmission_es: 'Manual', transmission_en: 'Manual', consumption: '9.1 L/100',
    bath: true, kitchen: 'compact', offroad: true,
    base: { name: 'Sprinter 4x4', kind_es: 'Camperizada', kind_en: 'Camper conversion' },
    price: { low: 100, mid: 115, high: 130 },
    tiers: [
      { d_es: '1 día',           d_en: '1 day',         per: 130 },
      { d_es: '2 días',          d_en: '2 days',        per: 120 },
      { d_es: '3 a 6 días',      d_en: '3 to 6 days',   per: 115 },
      { d_es: '7 a 13 días',     d_en: '7 to 13 days',  per: 105 },
      { d_es: '14 días o más',   d_en: '14+ days',      per: 100 },
    ],
    color: 'sage',
  },
  {
    id: 'valle',
    name: 'Valle',
    tagline_es: 'La compacta de dos',
    tagline_en: 'The compact two-seater',
    descr_es: 'Aparcas en cualquier sitio. Conduces como un coche. Sin baño a bordo: vives en la calle, duermes dentro.',
    descr_en: 'You can park it anywhere. Drives like a car. No on-board bathroom: live outside, sleep inside.',
    perfect_es: ['Pareja jóven', 'Escapada de fin de semana', 'Te vas a campings o áreas con baño'],
    perfect_en: ['Young couple', 'Weekend getaway', 'You\'re going to campsites with bathrooms'],
    not_es: ['Más de dos personas', 'No quieres depender de áreas'],
    not_en: ['More than two people', 'You don\'t want to depend on van areas'],
    sleeps: 2, seats: 4, license: 'B', length: '4.99 m', transmission_es: 'Automático', transmission_en: 'Automatic', consumption: '7.4 L/100',
    bath: false, kitchen: 'compact', offroad: false,
    base: { name: 'VW California-style', kind_es: 'Camper compacta', kind_en: 'Compact camper' },
    price: { low: 80, mid: 90, high: 100 },
    tiers: [
      { d_es: '1 día',           d_en: '1 day',         per: 100 },
      { d_es: '2 días',          d_en: '2 days',        per: 95 },
      { d_es: '3 a 6 días',      d_en: '3 to 6 days',   per: 90 },
      { d_es: '7 a 13 días',     d_en: '7 to 13 days',  per: 85 },
      { d_es: '14 días o más',   d_en: '14+ days',      per: 80 },
    ],
    color: 'ink',
  },
  {
    id: 'mar',
    name: 'Mar',
    tagline_es: 'La premium de la costa',
    tagline_en: 'The coastal premium',
    descr_es: 'Cocina amplia, ducha de spa, ventanal panorámico para ver el amanecer desde la cama. Para viajes lentos.',
    descr_en: 'Big kitchen, spa-style shower, panoramic window to watch the sunrise from bed. For slow trips.',
    perfect_es: ['Pareja que se mima', 'Costa Brava, Algarve, Côte d\'Azur', 'Viajes largos y tranquilos'],
    perfect_en: ['Couples who treat themselves', 'Costa Brava, Algarve, Côte d\'Azur', 'Long, slow trips'],
    not_es: ['Vas con prisa', 'Buscas el precio más bajo'],
    not_en: ['You\'re in a hurry', 'You\'re looking for the cheapest'],
    sleeps: 2, seats: 4, license: 'B', length: '6.36 m', transmission_es: 'Automático', transmission_en: 'Automatic', consumption: '8.0 L/100',
    bath: true, kitchen: 'premium', offroad: false,
    base: { name: 'Ducato premium', kind_es: 'Perfilada premium', kind_en: 'Low-profile premium' },
    price: { low: 120, mid: 135, high: 150 },
    tiers: [
      { d_es: '1 día',           d_en: '1 day',         per: 150 },
      { d_es: '2 días',          d_en: '2 days',        per: 140 },
      { d_es: '3 a 6 días',      d_en: '3 to 6 days',   per: 135 },
      { d_es: '7 a 13 días',     d_en: '7 to 13 days',  per: 125 },
      { d_es: '14 días o más',   d_en: '14+ days',      per: 120 },
    ],
    color: 'terra',
  },
];

/* ─────────── FAQs ─────────── */
const FAQS = {
  es: [
    { q: '¿Qué carnet necesito? ¿Vale el de coche?',
      a: 'Para Valle, Sierra y Mar te vale el carnet B (el normal de coche). Para Costa, que pesa más de 3.500 kg, necesitas carnet C1 — o el carnet B si lo sacaste antes de 1997, que llevaba el C1 incluido. Si no estás seguro, mándanos foto del tuyo por WhatsApp y lo miramos.' },
    { q: '¿Puedo viajar con mi perro?',
      a: 'Sí, los perros son bienvenidos en todas nuestras autocaravanas (con un suplemento de 30 € por viaje para limpieza extra). Avísanos al reservar para que dejemos todo preparado. Solo te pedimos que no suban a las camas y que vayan atados durante la conducción.' },
    { q: '¿Cuántos kilómetros puedo hacer?',
      a: 'Kilometraje ilimitado en todas las autocaravanas y en todos los precios. Punto. Sin sorpresas al devolverla.' },
    { q: '¿Qué seguro lleva incluido?',
      a: 'Todas nuestras furgos llevan seguro a todo riesgo con Allianz, asistencia en carretera 24/7 y segundo conductor sin coste. La franquicia base es de 1.200 €, y la puedes reducir a 300 € por 12 €/día extra.' },
    { q: '¿Cuánto es la fianza y cuándo la devolvéis?',
      a: '1.200 € que se bloquean en tu tarjeta cuando recoges la furgo. La devolvemos en 7–10 días tras la entrega, una vez revisado todo. Si la dejas como te la entregamos (limpia y con el depósito lleno), recibes el 100%.' },
  ],
  en: [
    { q: 'What driving license do I need? Does my car license work?',
      a: 'For Valle, Sierra and Mar a regular B (car) license is fine. For Costa, which weighs over 3,500 kg, you need a C1 license — or a B license issued before 1997, which used to include C1. Not sure? Send us a photo on WhatsApp and we’ll check.' },
    { q: 'Can I bring my dog?',
      a: 'Yes — dogs are welcome in all our vans (€30/trip extra for cleaning). Tell us when you book so we can prepare. Just two rules: no jumping on the beds, and dogs ride secured.' },
    { q: 'How many kilometers can I drive?',
      a: 'Unlimited mileage on every van and every booking. Period. No surprises on return.' },
    { q: 'What insurance is included?',
      a: 'Every van has full Allianz insurance, 24/7 roadside assistance and a free second driver. The default excess is €1,200 — you can reduce it to €300 for €12/day extra.' },
    { q: 'How much is the deposit and when do you return it?',
      a: '€1,200 held on your card at pick-up. We refund it in 7–10 days after return, once everything has been checked. If you bring her back how we gave her (clean, full tank), you get 100% back.' },
  ],
};

/* ─────────── Components ─────────── */

function Stripe({ kind = '', label, style, children, ...rest }) {
  // kind: '' | 'dark' | 'terra' | 'sage'
  return (
    <div className={`stripe ${kind}`} style={style} {...rest}>
      {label && <div className="label">{label}</div>}
      {children}
    </div>
  );
}

function Btn({ kind = 'primary', size, children, style, ...rest }) {
  return <button className={`btn btn-${kind} ${size ? 'btn-' + size : ''}`} style={style} {...rest}>{children}</button>;
}

function LangSwitch({ small }) {
  const { lang, setLang } = React.useContext(LangCtx);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontFamily: 'var(--f-display)', fontSize: small ? 12 : 13, fontWeight: 500 }}>
      <button onClick={() => setLang('es')}
        style={{ padding: '4px 6px', color: lang === 'es' ? 'var(--ink)' : 'var(--ink-3)', fontWeight: lang === 'es' ? 600 : 500 }}>ES</button>
      <span style={{ color: 'var(--ink-4)' }}>·</span>
      <button onClick={() => setLang('en')}
        style={{ padding: '4px 6px', color: lang === 'en' ? 'var(--ink)' : 'var(--ink-3)', fontWeight: lang === 'en' ? 600 : 500 }}>EN</button>
    </div>
  );
}

/* WhatsApp icon */
function IconWA({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 14.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.9-1-3.2-1.7-4.5-3.9-.4-.6.4-.5 1-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3.1 1.3 3.3.2.3 2.2 3.5 5.4 4.9 2 .8 2.8.9 3.8.8.6-.1 1.7-.7 2-1.4.3-.7.3-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z" />
    </svg>
  );
}

/* ─────────── Logo (wordmark) ─────────── */
function Logo({ size = 18, color = 'var(--ink)' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color, fontFamily: 'var(--f-display)' }}>
      <span style={{
        width: size * 1.2, height: size * 1.2, borderRadius: '50%',
        background: 'var(--terra)', position: 'relative', flexShrink: 0,
      }}>
        <span style={{
          position: 'absolute', inset: '22%', borderRadius: '50%',
          background: 'var(--bg)',
        }} />
      </span>
      <span style={{ fontSize: size, fontWeight: 700, letterSpacing: '-0.02em' }}>autaventura</span>
    </div>
  );
}

/* ─────────── TopNav (desktop) ─────────── */
function TopNav({ active = 'home' }) {
  const t = useT();
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 64px', background: 'var(--bg)',
      borderBottom: '1px solid transparent',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <a href="#/" style={{ textDecoration: 'none' }}><Logo size={20} /></a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 500 }}>
        <a href="#/" style={{ color: active === 'fleet' ? 'var(--terra)' : 'var(--ink)', cursor: 'pointer' }}>{t.nav.fleet}</a>
        <a href="#/" style={{ color: 'var(--ink)', cursor: 'pointer' }}>{t.nav.how}</a>
        <a href="#/" style={{ color: 'var(--ink)', cursor: 'pointer' }}>{t.nav.faq}</a>
        <a href="#/" style={{ color: 'var(--ink)', cursor: 'pointer' }}>{t.nav.contact}</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <LangSwitch />
        <Btn kind="dark" size="sm">{t.nav.book}</Btn>
      </div>
    </nav>
  );
}

/* ─────────── Mobile nav ─────────── */
function MobileNav() {
  const t = useT();
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 20px', background: 'var(--bg)',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <a href="#/" style={{ textDecoration: 'none' }}><Logo size={17} /></a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <LangSwitch small />
        <button style={{
          width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--ink)', color: 'var(--bg)'
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 4h12M1 10h12"/></svg>
        </button>
      </div>
    </nav>
  );
}

/* ─────────── Date Picker (interactive) ─────────── */
const ES_MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const EN_MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const ES_DOW = ['L','M','X','J','V','S','D'];
const EN_DOW = ['M','T','W','T','F','S','S'];

function fmtShort(d, lang) {
  if (!d) return '—';
  const m = (lang === 'es' ? ES_MONTHS : EN_MONTHS)[d.getMonth()].slice(0, 3);
  return `${d.getDate()} ${m}`;
}

function CalendarMonth({ year, month, lang, start, end, hover, onPick, onHover }) {
  const months = lang === 'es' ? ES_MONTHS : EN_MONTHS;
  const dow = lang === 'es' ? ES_DOW : EN_DOW;
  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date(); today.setHours(0,0,0,0);

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const endish = end || hover;
  const inRange = (d) => start && endish && d > start && d < endish;
  const isStart = (d) => start && d.getTime() === start.getTime();
  const isEnd   = (d) => end && d.getTime() === end.getTime();

  return (
    <div>
      <div className="dp-month-title">
        <span>{months[month]} {year}</span>
      </div>
      <div className="dp-grid">
        {dow.map((d, i) => <div key={i} className="dp-dow">{d}</div>)}
        {cells.map((c, i) => {
          if (!c) return <div key={i} />;
          const past = c < today;
          const cls = ['dp-d'];
          if (past) cls.push('muted');
          else cls.push('in');
          if (isStart(c)) cls.push('start');
          else if (isEnd(c)) cls.push('end');
          else if (inRange(c)) cls.push('range');
          return (
            <div key={i} className={cls.join(' ')}
              onClick={() => !past && onPick(c)}
              onMouseEnter={() => !past && onHover(c)}
            >{c.getDate()}</div>
          );
        })}
      </div>
    </div>
  );
}

function DatePicker({ value, onChange, lang, monthOffset = 0 }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [start, setStart] = React.useState(value?.start || null);
  const [end, setEnd]     = React.useState(value?.end   || null);
  const [hover, setHover] = React.useState(null);

  const pick = (d) => {
    if (!start || (start && end)) {
      setStart(d); setEnd(null);
      onChange && onChange({ start: d, end: null });
    } else if (d <= start) {
      setStart(d);
      onChange && onChange({ start: d, end });
    } else {
      setEnd(d);
      onChange && onChange({ start, end: d });
    }
  };

  const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const next = new Date(base.getFullYear(), base.getMonth() + 1, 1);

  return (
    <div className="dp">
      <CalendarMonth year={base.getFullYear()} month={base.getMonth()} lang={lang}
        start={start} end={end} hover={hover}
        onPick={pick} onHover={setHover} />
      <CalendarMonth year={next.getFullYear()} month={next.getMonth()} lang={lang}
        start={start} end={end} hover={hover}
        onPick={pick} onHover={setHover} />
    </div>
  );
}

/* ─────────── FAQ accordion ─────────── */
function FAQ({ items, defaultOpen = 0 }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <span className="plus" />
          </button>
          <div className="faq-a">
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────── WhatsApp FAB (with fake chat preview) ─────────── */
function WhatsAppFAB({ contained = true }) {
  const t = useT();
  const { lang } = React.useContext(LangCtx);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [sent, setSent] = React.useState([]);
  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setTyping(false), 1400);
    setTyping(true);
    return () => clearTimeout(t);
  }, [open, lang]);

  const send = () => {
    if (!msg.trim()) return;
    setSent(s => [...s, msg]);
    setMsg('');
    setTyping(true);
    setTimeout(() => setTyping(false), 1600);
  };

  return (
    <div style={{ position: contained ? 'absolute' : 'fixed', bottom: 24, right: 24, zIndex: 50 }}>
      {open && (
        <div style={{
          position: 'absolute', bottom: 76, right: 0, width: 320,
          background: '#fff', borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(35,33,30,.18), 0 2px 6px rgba(35,33,30,.08)',
          animation: 'av-slide-up .25s ease',
        }}>
          {/* header */}
          <div style={{ background: 'var(--wa-dk)', color: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#a3d2bc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-display)', fontWeight: 700, color: 'var(--wa-dk)' }}>M</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14 }}>Marta · Autaventura</div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>{typing ? t.wa.typing : t.wa.online}</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ width: 28, height: 28, borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
          {/* body */}
          <div style={{
            padding: '16px 12px', minHeight: 200, maxHeight: 240, overflowY: 'auto',
            background: '#ece5dd', backgroundImage: 'radial-gradient(rgba(0,0,0,.04) 1px, transparent 1px)', backgroundSize: '12px 12px',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ alignSelf: 'flex-start', background: '#fff', borderRadius: '4px 12px 12px 12px', padding: '8px 12px', fontSize: 13.5, maxWidth: '85%', boxShadow: '0 1px 1px rgba(0,0,0,.05)', lineHeight: 1.4 }}>
              {t.wa.autoreply}
              <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: 2 }}>9:41</div>
            </div>
            {sent.map((m, i) => (
              <div key={i} style={{ alignSelf: 'flex-end', background: '#d9fdd3', borderRadius: '12px 4px 12px 12px', padding: '8px 12px', fontSize: 13.5, maxWidth: '85%', boxShadow: '0 1px 1px rgba(0,0,0,.05)', lineHeight: 1.4 }}>
                {m}
                <div style={{ fontSize: 10, color: '#677', textAlign: 'right', marginTop: 2 }}>9:42 ✓✓</div>
              </div>
            ))}
            {typing && (
              <div style={{ alignSelf: 'flex-start', background: '#fff', borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 4 }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#999', opacity: 0.4 + i*0.2, animation: `av-slide-up .8s ${i*0.15}s infinite alternate ease-in-out` }} />
                ))}
              </div>
            )}
          </div>
          {/* input */}
          <div style={{ display: 'flex', gap: 8, padding: 10, background: '#f0f0f0', alignItems: 'center' }}>
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={t.wa.placeholder}
              style={{ flex: 1, border: 'none', background: '#fff', borderRadius: 20, padding: '9px 14px', fontFamily: 'inherit', fontSize: 13, outline: 'none' }}
            />
            <button onClick={send} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--wa-dk)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M1 7l12-6-4 13-3-5-5-2z"/></svg>
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'var(--wa)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37,211,102,.4), 0 2px 6px rgba(0,0,0,.15)',
          position: 'relative',
        }}>
        <IconWA size={28} />
        {!open && (
          <span style={{
            position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderRadius: '50%',
            background: 'var(--terra)', color: '#fff', fontSize: 10, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-display)',
          }}>1</span>
        )}
      </button>
    </div>
  );
}

/* ─────────── Footer ─────────── */
function Footer({ compact }) {
  const t = useT();
  return (
    <footer style={{
      background: 'var(--ink)', color: 'var(--bg-3)',
      padding: compact ? '40px 20px 24px' : '64px 64px 32px',
      fontSize: 14,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1.5fr 1fr 1fr 1fr', gap: compact ? 32 : 48, marginBottom: 48 }}>
        <div>
          <Logo size={20} color="var(--paper)" />
          <p style={{ marginTop: 16, maxWidth: 280, color: 'var(--ink-4)', lineHeight: 1.6 }}>{t.footer.tag}</p>
        </div>
        <div>
          <h5 style={{ fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, color: 'var(--paper)', marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.footer.explore}</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li><a>{t.nav.fleet}</a></li>
            <li><a>{t.nav.how}</a></li>
            <li><a>{t.nav.faq}</a></li>
            <li><a>Blog</a></li>
          </ul>
        </div>
        <div>
          <h5 style={{ fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, color: 'var(--paper)', marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.footer.contact}</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>+34 962 12 34 56</li>
            <li>hola@autaventura.es</li>
            <li>Carrer del Forn, 24</li>
            <li>46470 Catarroja</li>
          </ul>
        </div>
        <div>
          <h5 style={{ fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 600, color: 'var(--paper)', marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.footer.legal}</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li><a>{t.footer.aviso}</a></li>
            <li><a>{t.footer.privacidad}</a></li>
            <li><a>{t.footer.cookies}</a></li>
            <li><a>{t.footer.terminos}</a></li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, color: 'var(--ink-4)', fontSize: 12 }}>
        <span>{t.footer.nif}</span>
        <span>{t.footer.rights}</span>
      </div>
    </footer>
  );
}

/* ─────────── Cookie banner (decorative) ─────────── */
function CookieBanner({ contained = true }) {
  const [shown, setShown] = React.useState(true);
  const t = useT();
  const { lang } = React.useContext(LangCtx);
  if (!shown) return null;
  return (
    <div style={{
      position: contained ? 'absolute' : 'fixed', left: 24, bottom: 24, zIndex: 40,
      background: 'var(--ink)', color: 'var(--paper)', padding: '16px 18px',
      borderRadius: 4, maxWidth: 380, fontSize: 13, lineHeight: 1.45,
      boxShadow: '0 12px 36px rgba(0,0,0,.18)',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 14 }}>
        {lang === 'es' ? 'Cookies, las justas.' : 'Cookies, just the necessary.'}
      </div>
      <div style={{ color: 'var(--ink-4)' }}>
        {lang === 'es'
          ? 'Usamos cookies para que la web funcione y para entender qué páginas son útiles. Sin terceros raros.'
          : 'We use cookies to run the site and understand which pages help. No weird third parties.'}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setShown(false)} style={{ flex: 1, padding: '8px 12px', background: 'var(--bg)', color: 'var(--ink)', borderRadius: 999, fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 12 }}>
          {lang === 'es' ? 'Solo necesarias' : 'Only necessary'}
        </button>
        <button onClick={() => setShown(false)} style={{ flex: 1, padding: '8px 12px', background: 'var(--terra)', color: '#fff', borderRadius: 999, fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 12 }}>
          {lang === 'es' ? 'Aceptar todas' : 'Accept all'}
        </button>
      </div>
    </div>
  );
}

/* ─────────── Map placeholder (stylized) ─────────── */
function MapBlock({ compact, height = 360 }) {
  const t = useT();
  return (
    <div style={{
      position: 'relative', borderRadius: 4, overflow: 'hidden',
      height,
      background: '#e8e0cf',
      boxShadow: 'var(--shadow-1)',
    }}>
      {/* faux map: roads + parks + water */}
      <svg width="100%" height="100%" viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0v20" fill="none" stroke="rgba(35,33,30,.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="800" height="360" fill="url(#grid)" />
        {/* water (right edge — Albufera/coast) */}
        <path d="M620 0 L800 0 L800 360 L640 360 Q605 300 625 220 Q635 130 620 0 Z" fill="#cdd9c7" opacity="0.7" />
        {/* parks */}
        <path d="M0 80 Q80 60 160 90 Q180 130 140 160 Q60 175 30 150 Q0 130 0 80 Z" fill="#cbd2bd" opacity="0.7" />
        <circle cx="320" cy="60" r="40" fill="#cbd2bd" opacity="0.6" />
        {/* roads */}
        <path d="M0 200 L800 220" stroke="#fff" strokeWidth="14" />
        <path d="M0 200 L800 220" stroke="#e8e0cf" strokeWidth="11" />
        <path d="M180 0 L220 360" stroke="#fff" strokeWidth="9" />
        <path d="M180 0 L220 360" stroke="#e8e0cf" strokeWidth="6.5" />
        <path d="M0 100 Q400 130 800 90" stroke="#fff" strokeWidth="6" fill="none" />
        <path d="M0 100 Q400 130 800 90" stroke="#e8e0cf" strokeWidth="4" fill="none" />
        <path d="M300 0 Q380 180 500 360" stroke="#fff" strokeWidth="5" fill="none" />
        <path d="M300 0 Q380 180 500 360" stroke="#e8e0cf" strokeWidth="3.5" fill="none" />
        {/* small roads */}
        <path d="M0 280 L580 290" stroke="#fff" strokeWidth="3" />
        <path d="M120 360 L130 0" stroke="#fff" strokeWidth="2" />
        <path d="M450 360 L460 0" stroke="#fff" strokeWidth="2" />
        {/* labels */}
        <text x="40" y="40" fontFamily="var(--f-mono)" fontSize="11" fill="#8b8470">CATARROJA</text>
        <text x="560" y="40" fontFamily="var(--f-mono)" fontSize="11" fill="#8b8470">VALENCIA</text>
        <text x="700" y="290" fontFamily="var(--f-mono)" fontSize="11" fill="#7a8870">L'ALBUFERA</text>
      </svg>
      {/* pin */}
      <div style={{
        position: 'absolute', left: compact ? '32%' : '38%', top: '54%',
        transform: 'translate(-50%, -100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <div style={{
          background: 'var(--paper)', padding: '8px 12px', borderRadius: 4, fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 13,
          color: 'var(--ink)', boxShadow: '0 6px 14px rgba(0,0,0,.15)', whiteSpace: 'nowrap',
        }}>
          autaventura
          <span style={{ display: 'block', fontFamily: 'var(--f-mono)', fontWeight: 400, fontSize: 10, color: 'var(--ink-2)' }}>Carrer del Forn 24</span>
        </div>
        <svg width="22" height="30" viewBox="0 0 22 30">
          <path d="M11 0 C4.9 0 0 4.9 0 11 c0 8 11 19 11 19 s11-11 11-19 C22 4.9 17.1 0 11 0 Z" fill="var(--terra)" />
          <circle cx="11" cy="11" r="4" fill="#fff" />
        </svg>
      </div>
      {/* attribution like maps */}
      <div style={{
        position: 'absolute', bottom: 6, right: 8, fontFamily: 'var(--f-mono)', fontSize: 9,
        color: 'rgba(35,33,30,.4)',
      }}>google maps · placeholder</div>
    </div>
  );
}

/* expose */
Object.assign(window, {
  LangCtx, DICT, useT, VANS, FAQS,
  Stripe, Btn, LangSwitch, IconWA, Logo, TopNav, MobileNav,
  DatePicker, FAQ, WhatsAppFAB, Footer, CookieBanner, MapBlock,
  fmtShort,
});
