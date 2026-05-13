import type { FaqItem, Lang } from '@/lib/types'

export const FAQS: Record<Lang, FaqItem[]> = {
  es: [
    {
      q: '¿Qué carnet necesito? ¿Vale el de coche?',
      a: 'Para Valle, Sierra y Mar te vale el carnet B (el normal de coche). Para Costa, que pesa más de 3.500 kg, necesitas carnet C1 — o el carnet B si lo sacaste antes de 1997, que llevaba el C1 incluido. Si no estás seguro, mándanos foto del tuyo por WhatsApp y lo miramos.',
    },
    {
      q: '¿Puedo viajar con mi perro?',
      a: 'Sí, los perros son bienvenidos en todas nuestras autocaravanas (con un suplemento de 30 € por viaje para limpieza extra). Avísanos al reservar para que dejemos todo preparado. Solo te pedimos que no suban a las camas y que vayan atados durante la conducción.',
    },
    {
      q: '¿Cuántos kilómetros puedo hacer?',
      a: 'Kilometraje ilimitado en todas las autocaravanas y en todos los precios. Punto. Sin sorpresas al devolverla.',
    },
    {
      q: '¿Qué seguro lleva incluido?',
      a: 'Todas nuestras furgos llevan seguro a todo riesgo con Allianz, asistencia en carretera 24/7 y segundo conductor sin coste. La franquicia base es de 1.200 €, y la puedes reducir a 300 € por 12 €/día extra.',
    },
    {
      q: '¿Cuánto es la fianza y cuándo la devolvéis?',
      a: '1.200 € que se bloquean en tu tarjeta cuando recoges la furgo. La devolvemos en 7–10 días tras la entrega, una vez revisado todo. Si la dejas como te la entregamos (limpia y con el depósito lleno), recibes el 100%.',
    },
  ],
  en: [
    {
      q: 'What driving license do I need? Does my car license work?',
      a: "For Valle, Sierra and Mar a regular B (car) license is fine. For Costa, which weighs over 3,500 kg, you need a C1 license — or a B license issued before 1997, which used to include C1. Not sure? Send us a photo on WhatsApp and we'll check.",
    },
    {
      q: 'Can I bring my dog?',
      a: "Yes — dogs are welcome in all our vans (€30/trip extra for cleaning). Tell us when you book so we can prepare. Just two rules: no jumping on the beds, and dogs ride secured.",
    },
    {
      q: 'How many kilometers can I drive?',
      a: 'Unlimited mileage on every van and every booking. Period. No surprises on return.',
    },
    {
      q: 'What insurance is included?',
      a: "Every van has full Allianz insurance, 24/7 roadside assistance and a free second driver. The default excess is €1,200 — you can reduce it to €300 for €12/day extra.",
    },
    {
      q: 'How much is the deposit and when do you return it?',
      a: "€1,200 held on your card at pick-up. We refund it in 7–10 days after return, once everything has been checked. If you bring her back how we gave her (clean, full tank), you get 100% back.",
    },
  ],
}
