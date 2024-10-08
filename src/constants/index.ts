export const NAV_ITEMS = [
  {
    href: '/tastings',
    label: 'Tastings'
  },
  {
    href: '/faqs',
    label: 'FAQs'
  },
  {
    href: '/contact',
    label: 'Contact'
  }
]

export const FEATURES = [
  {
    icon: 'wine',
    title: 'Selected wines',
    description:
      'We offer three exclusive wine tasting packages each designed to provide a unique journey through the wines of Mendoza, renowned for their exceptional quality and distinct flavors.'
  },
  {
    icon: 'experience',
    title: 'Unique experience',
    description:
      'Our tasting experience goes beyond just the wines. Each package includes a comprehensive tasting guide, essential accessories, and occasional surprises.'
  },
  {
    icon: 'delivery',
    title: 'Direct delivery',
    description:
      'Our exclusive direct delivery service ensures a seamless and convenient wine tasting experience, with flexible scheduling and personalized service.'
  }
]

export const TASTINGS = [
  {
    title: 'Standard',
    description:
      'Our Standard Tasting is perfect for newcomers, featuring a delightful selection of three wines.',
    wines: 3
  },
  {
    title: 'Premium',
    description:
      'The Premium Tasting elevates your experience with four exceptional wines, ideal for expanding your wine knowledge.',
    wines: 4
  },
  {
    title: 'Deluxe',
    description:
      'For the ultimate indulgence, our Deluxe Tasting includes five of the finest wines, perfect for connoisseurs and special occasions.',
    wines: 5
  }
]

export const STEPS = [
  {
    icon: 'search',
    title: 'Choose Your Package',
    description:
      'Select from our Standard, Premium, or Deluxe tasting experiences.'
  },
  {
    icon: 'schedule',
    title: 'Schedule Delivery',
    description: 'We offer flexible scheduling to your accommodation.'
  },
  {
    icon: 'tasting',
    title: 'Enjoy the Tasting',
    description:
      'Follow our expert guide and savor each carefully selected wine.'
  },
  {
    icon: 'rate',
    title: 'Share Your Experience',
    description: 'Rate the wines and share your thoughts with our community.'
  }
]

export const EXPERIENCE_FEATURES = [
  {
    icon: 'clock',
    title: 'Flexible Scheduling',
    description: 'Choose a delivery time that suits your plans.'
  },
  {
    icon: 'map-pin',
    title: 'Direct to Your Door',
    description: 'We deliver right to your accommodation.'
  },
  {
    icon: 'gift',
    title: 'Complimentary Setup',
    description: "We'll set up the perfect tasting environment for you."
  },
  {
    icon: 'sparkles',
    title: 'Luxury Experience',
    description: 'Elevate your stay with our premium service.'
  }
]

export const IS_DEV_ENVIRONMENT = process.env.IS_DEV_MODE === 'true'
