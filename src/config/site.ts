export const SITE = {
  name:      'Autaventura',
  legalName: 'Autaventura Valencia S.L.',
  nif:       'B-12345678',
  email:     'hola@autaventura.es',
  phone:     '+34 962 12 34 56',
  whatsapp:  '+34962123456',
  founding:  2019,

  address: {
    street:   'Carrer del Forn, 24',
    zip:      '46470',
    city:     'Catarroja',
    province: 'Valencia',
    full_es:  'Carrer del Forn, 24 · 46470 Catarroja, Valencia',
    full_en:  'Carrer del Forn, 24 · 46470 Catarroja, Valencia',
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
