export const SITE = {
  name:      'Autoaventura',
  legalName: 'Autoaventura Barcelona S.L.',
  nif:       'B-12345678',
  email:     'info@autoaventuras.com.',
  phone:     '+34 609 856 049',
  whatsapp:  '+34609856049',
  founding:  2019,

  address: {
    street:   'Carrer del Forn, 24',
    zip:      '08620',
    city:     'Sant Vicenç dels Horts',
    province: 'Barcelona',
    full_es:  'Carrer Santander 44-48 · 08620 Sant Vicenç dels Horts, Barcelona',
    full_en:  'Carrer Santander 44-48 · 08620 Sant Vicenç dels Horts, Barcelona',
  },

  coords: {
    lat: 39.4028,
    lng: -0.4010,
  },

  hours: {
    weekdays_es: 'Lun–Vie · 9:00–13:00, 16:00–19:00',
    weekdays_en: 'Mon–Fri · 9:00–13:00, 16:00–19:00',
    saturday_es: 'Sábados · 9:00–13:00',
    saturday_en: 'Saturdays · 9:00–13:00',
    sunday_es:   'Domingos · cerrado (recogidas concertadas)',
    sunday_en:   'Sundays · closed (pre-arranged pick-ups)',
  },

  pickup: {
    from: '16:00',
    to:   '11:00',
  },
} as const
