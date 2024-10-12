export const NAV_ITEMS = [
  {
    href: '/degustaciones',
    label: 'Degustaciones'
  },
  {
    href: '/faqs',
    label: 'FAQs'
  },
  {
    href: '/contacto',
    label: 'Contacto'
  }
]

export const FEATURES = [
  {
    icon: 'wine',
    title: 'Vinos seleccionados',
    description:
      'Ofrecemos tres paquetes exclusivos de cata de vinos, cada uno diseñado para proporcionar un viaje único a través de los vinos de Mendoza, conocidos por su calidad excepcional y sabores distintivos.'
  },
  {
    icon: 'experience',
    title: 'Experiencia única',
    description:
      'Nuestra experiencia de cata va más allá de los vinos. Cada paquete incluye una guía de cata completa, accesorios esenciales y sorpresas ocasionales.'
  },
  {
    icon: 'delivery',
    title: 'Entrega directa',
    description:
      'Nuestro exclusivo servicio de entrega directa garantiza una experiencia de cata de vinos sin inconvenientes y conveniente, con programación flexible y servicio personalizado.'
  }
]

export const STEPS = [
  {
    icon: 'search',
    title: 'Elige tu Paquete',
    description:
      'Selecciona entre nuestras experiencias de cata Standard, Premium o Deluxe.'
  },
  {
    icon: 'schedule',
    title: 'Programa la Entrega',
    description: 'Ofrecemos programación flexible a tu alojamiento.'
  },
  {
    icon: 'tasting',
    title: 'Disfruta de la Cata',
    description:
      'Sigue nuestra guía experta y saborea cada vino cuidadosamente seleccionado.'
  },
  {
    icon: 'rate',
    title: 'Comparte tu Experiencia',
    description:
      'Califica los vinos y comparte tus opiniones con nuestra comunidad.'
  }
]

export const EXPERIENCE_FEATURES = [
  {
    icon: 'clock',
    title: 'Horario Flexible',
    description: 'Elige un horario de entrega que se adapte a tus planes.'
  },
  {
    icon: 'map-pin',
    title: 'Directo a Tu Puerta',
    description: 'Entregamos directamente a tu alojamiento.'
  },
  {
    icon: 'gift',
    title: 'Montaje de Cortesía',
    description: 'Nos encargamos de crear el ambiente perfecto para tu cata.'
  },
  {
    icon: 'sparkles',
    title: 'Experiencia de Lujo',
    description: 'Eleva tu estancia con nuestro servicio premium.'
  }
]

export const IS_DEV_ENVIRONMENT = process.env.IS_DEV_MODE === 'true'
