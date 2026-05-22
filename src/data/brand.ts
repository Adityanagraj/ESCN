export const BRAND = {
  name: 'PLAY BOLD',
  tagline: 'We Believe. We Support. We Roar.',
  domain: 'TODO: playboldframes.com',
  supportEmail: 'TODO: care@playboldframes.com',
  supportPhone: 'TODO: +91 80 0000 0000',
  established: '2024',
  city: 'Bengaluru, India',
  socials: {
    instagram: 'TODO: https://instagram.com/playboldframes',
    youtube: 'TODO: https://youtube.com/@playboldframes',
    twitter: 'TODO: https://x.com/playboldframes',
  },
}

export type Product = {
  id: string
  slug: string
  name: string
  subtitle: string
  chapter: string
  tagline: string
  hook: string
  description: string
  image: string
  highlights: string[]
  specs: { label: string; value: string }[]
  price: string
  compareAt?: string
  inStock: boolean
  shopUrl: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'king-kohli',
    slug: 'king-kohli-shadow-box',
    name: 'KING KOHLI SHADOW BOX',
    subtitle: 'Signature Series · No. 18',
    chapter: 'The vow.',
    tagline: 'Commitment is a lifestyle.',
    hook: 'It started with a bat, a ball, and a kid who refused to leave the nets after dark. Our first frame is a tribute to the work — not the trophies. Just the cricket.',
    description:
      'A vertical shadow box dedicated to the King. Pairs a mini Genio MRF bat replica with the official RCB crest, a hand-painted action portrait, and a stitched leather ball — all set against a deep matte black panel with soft red LED edge lighting.',
    image: '/products/king-kohli-frame.png',
    highlights: [
      'Mini MRF bat replica with Virat Kohli signature print',
      'Hand-painted 4-colour action portrait',
      'Genuine stitched leather cricket ball',
      'Edge-lit acrylic with soft red LED (USB-C powered)',
    ],
    specs: [
      { label: 'Dimensions', value: 'TODO: 60 × 45 × 6 cm' },
      { label: 'Frame', value: 'Solid wood · matte black' },
      { label: 'Glass', value: 'Anti-reflective acrylic' },
      { label: 'Lighting', value: 'USB-C · 5V · warm red LED' },
      { label: 'Weight', value: 'TODO: 3.8 kg' },
      { label: 'Edition', value: 'Limited · numbered 1 of 500' },
    ],
    price: 'TODO: ₹ 12,499',
    compareAt: 'TODO: ₹ 16,499',
    inStock: true,
    shopUrl: 'TODO: https://your-shop.example/king-kohli-shadow-box',
  },
  {
    id: 'champions',
    slug: 'ee-sala-cup-namde-frame',
    name: 'EE SALA CUP NAMDE FRAME',
    subtitle: 'IPL Champions 2025 · Wide Edition',
    chapter: 'The wait ends.',
    tagline: 'For life. For pride.',
    hook: 'Eighteen seasons. One sentence whispered every May. In 2025 it stopped being a joke and started being a fact. This frame is built for the wall where that night gets retold for the next forty years.',
    description:
      'A widescreen tribute to the championship season. Centred around the iconic No. 18 back-jersey portrait, flanked by twin shadow boxes — one cradling the IPL trophy replica, the other a Kohli-signed MRF mini bat. Hand-applied gold foil "18 PLAY BOLD" lettering at the corner.',
    image: '/products/champions-frame.png',
    highlights: [
      '24K-style gold foil "18 PLAY BOLD" hot-stamped lettering',
      'IPL 2025 Champions trophy replica (diecast metal)',
      'Kohli action portrait printed on premium giclée canvas',
      'Triple-pane shadow box with individual LED accents',
    ],
    specs: [
      { label: 'Dimensions', value: 'TODO: 90 × 70 × 7 cm' },
      { label: 'Frame', value: 'Solid wood · piano-finish black' },
      { label: 'Trophy', value: 'Diecast zinc alloy · gold electroplated' },
      { label: 'Lighting', value: 'USB-C · 3 zones · warm red LED' },
      { label: 'Weight', value: 'TODO: 6.4 kg' },
      { label: 'Edition', value: 'Champions edition · numbered 1 of 250' },
    ],
    price: 'TODO: ₹ 18,999',
    compareAt: 'TODO: ₹ 24,999',
    inStock: true,
    shopUrl: 'TODO: https://your-shop.example/ee-sala-cup-namde-frame',
  },
  {
    id: 'play-bold',
    slug: 'play-bold-bobblehead-frame',
    name: 'PLAY BOLD BOBBLEHEAD FRAME',
    subtitle: 'Centrepiece Edition · Hand-Sculpted',
    chapter: 'The flagship.',
    tagline: 'For the crest. For the fans. Forever RCB.',
    hook: 'Our largest, loudest piece — a hand-sculpted Kohli bobblehead in full kit, flanked by the trophy and the helmet, wrapped in a glow-up red LED bezel. One wall. One season. One legacy.',
    description:
      'Our flagship piece. A hand-sculpted, hand-painted Kohli bobblehead in full RCB kit takes centre stage, framed by individual showcase compartments for the IPL Champions trophy, the matte-gold RCB helmet, and a signed Genio MRF mini bat. Glow-up red LED bezel wraps the entire frame.',
    image: '/products/play-bold-frame.png',
    highlights: [
      'Hand-sculpted polyresin bobblehead with painted-detail kit',
      'Gold-finish RCB helmet replica with branded crest',
      'IPL Champions trophy + signed MRF mini bat included',
      'Programmable LED bezel · 4 modes (static, pulse, breathe, off)',
    ],
    specs: [
      { label: 'Dimensions', value: 'TODO: 100 × 80 × 9 cm' },
      { label: 'Bobblehead', value: 'Polyresin · hand-painted · 22 cm tall' },
      { label: 'Frame', value: 'Solid wood · piano-finish black' },
      { label: 'Lighting', value: 'USB-C · 4-mode programmable red LED' },
      { label: 'Weight', value: 'TODO: 8.2 kg' },
      { label: 'Edition', value: 'Flagship · numbered 1 of 100' },
    ],
    price: 'TODO: ₹ 28,999',
    compareAt: 'TODO: ₹ 36,999',
    inStock: true,
    shopUrl: 'TODO: https://your-shop.example/play-bold-bobblehead-frame',
  },
]

export const HERO_IMAGE = '/products/hero-virat.png'

export const TRUST_BADGES = [
  {
    title: 'Authenticity certified',
    body: 'Every frame ships with a numbered certificate and a 12-month craftsmanship warranty.',
  },
  {
    title: 'Secure checkout',
    body: 'Razorpay & Stripe. UPI · Cards · Net Banking · EMI on orders above ₹ 9,999.',
  },
  {
    title: 'Insured delivery',
    body: 'Dispatched in 48 hours. Packed in custom foam-fit crates. 100% transit insurance.',
  },
  {
    title: '14-day returns',
    body: 'Not in love? Send it back within 14 days for a full refund, no questions asked.',
  },
]

/** Side-by-side comparison table rows. Keys match the three product ids. */
export type CompareValue = {
  text: string
  /** Optional bullet under the main text — kept short for the grid layout. */
  hint?: string
  /** Mark the "winner" for this row to render a small badge. */
  winner?: boolean
}

export type CompareRow = {
  label: string
  values: Record<'king-kohli' | 'champions' | 'play-bold', CompareValue>
}

export const COMPARE_ROWS: CompareRow[] = [
  {
    label: 'Edition size',
    values: {
      'king-kohli': { text: '500 numbered' },
      'champions': { text: '250 numbered' },
      'play-bold': { text: '100 numbered', hint: 'Flagship — smallest run', winner: true },
    },
  },
  {
    label: 'Frame size',
    values: {
      'king-kohli': { text: 'TODO: 60 × 45 cm', hint: 'Compact · single wall mount' },
      'champions': { text: 'TODO: 90 × 70 cm', hint: 'Wide · statement piece' },
      'play-bold': { text: 'TODO: 100 × 80 cm', hint: 'Largest · centrepiece' },
    },
  },
  {
    label: 'Centrepiece',
    values: {
      'king-kohli': { text: 'Mini MRF bat + leather ball' },
      'champions': { text: 'Diecast trophy + bat + back-jersey portrait' },
      'play-bold': { text: 'Hand-sculpted bobblehead + trophy + helmet' },
    },
  },
  {
    label: 'Lighting',
    values: {
      'king-kohli': { text: 'Single-zone red LED' },
      'champions': { text: '3-zone red LED', hint: 'Independent dimming' },
      'play-bold': { text: '4-mode programmable LED', hint: 'Static · pulse · breathe · off', winner: true },
    },
  },
  {
    label: 'Hours of work',
    values: {
      'king-kohli': { text: '28 hours' },
      'champions': { text: '36 hours' },
      'play-bold': { text: '52 hours', winner: true },
    },
  },
  {
    label: 'Best for',
    values: {
      'king-kohli': { text: 'First buy · gift', hint: 'Signature series' },
      'champions': { text: 'Champions year tribute', hint: 'Wide statement wall' },
      'play-bold': { text: 'Collector centrepiece', hint: 'Largest, loudest piece' },
    },
  },
  {
    label: 'Price',
    values: {
      'king-kohli': { text: 'TODO: ₹ 12,499' },
      'champions': { text: 'TODO: ₹ 18,999' },
      'play-bold': { text: 'TODO: ₹ 28,999' },
    },
  },
]

/** Live shipment ticker — rotated through a floating widget for urgency. */
export type Shipment = {
  city: string
  product: string
  minutesAgo: number
}

export const SHIPMENTS: Shipment[] = [
  { city: 'Jaipur', product: 'King Kohli Shadow Box', minutesAgo: 47 },
  { city: 'Bengaluru', product: 'Ee Sala Cup Namde Frame', minutesAgo: 92 },
  { city: 'Pune', product: 'Play Bold Bobblehead Frame', minutesAgo: 18 },
  { city: 'Chennai', product: 'King Kohli Shadow Box', minutesAgo: 134 },
  { city: 'Mumbai', product: 'Ee Sala Cup Namde Frame', minutesAgo: 6 },
  { city: 'Delhi', product: 'Play Bold Bobblehead Frame', minutesAgo: 28 },
  { city: 'Hyderabad', product: 'King Kohli Shadow Box', minutesAgo: 65 },
  { city: 'Kochi', product: 'Ee Sala Cup Namde Frame', minutesAgo: 12 },
  { city: 'Lucknow', product: 'Play Bold Bobblehead Frame', minutesAgo: 210 },
]

export type Testimonial = {
  id: string
  name: string
  location: string
  product: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  initials: string
  verified: boolean
  daysAgo: number
}

// All names below are placeholders. Replace with real verified-buyer
// quotes (with permission) before launch. Keep the disclaimer-safe
// language — these are tribute pieces, not licensed RCB merchandise.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'TODO: Rohan Mehta',
    location: 'Mumbai',
    product: 'EE SALA CUP NAMDE FRAME',
    rating: 5,
    text: "Mounted it the same evening it arrived. The LED bezel alone is worth the price — feels like a slice of the Chinnaswamy on my living-room wall.",
    initials: 'RM',
    verified: true,
    daysAgo: 12,
  },
  {
    id: 't2',
    name: 'TODO: Anjali Sharma',
    location: 'Bengaluru',
    product: 'KING KOHLI SHADOW BOX',
    rating: 5,
    text: "Bought this as a wedding gift for my husband. He has not stopped talking about it. The mini bat is detailed down to the grain on the handle.",
    initials: 'AS',
    verified: true,
    daysAgo: 28,
  },
  {
    id: 't3',
    name: 'TODO: Karthik Iyer',
    location: 'Chennai',
    product: 'PLAY BOLD BOBBLEHEAD FRAME',
    rating: 5,
    text: "Skeptical at first because the price felt high. After holding it: this is museum-grade. The crate it shipped in had foam cut to the millimetre.",
    initials: 'KI',
    verified: true,
    daysAgo: 5,
  },
  {
    id: 't4',
    name: 'TODO: Priya Nair',
    location: 'Kochi',
    product: 'KING KOHLI SHADOW BOX',
    rating: 5,
    text: "Customer service was a different level. They sent me build photos before dispatch. I felt like I was watching my own piece being made.",
    initials: 'PN',
    verified: true,
    daysAgo: 41,
  },
  {
    id: 't5',
    name: 'TODO: Aditya Rao',
    location: 'Hyderabad',
    product: 'EE SALA CUP NAMDE FRAME',
    rating: 5,
    text: "Reached me in three days. Foam-fit crate, certificate, numbered plaque — they actually mean it when they say handmade.",
    initials: 'AR',
    verified: true,
    daysAgo: 19,
  },
  {
    id: 't6',
    name: 'TODO: Sneha Krishnan',
    location: 'Pune',
    product: 'PLAY BOLD BOBBLEHEAD FRAME',
    rating: 5,
    text: "The LED modes are a brilliant touch — we keep it on 'breathe' during match nights. Family room is now the RCB room.",
    initials: 'SK',
    verified: true,
    daysAgo: 7,
  },
]

export const FAQ = [
  {
    q: 'Are these officially licensed RCB products?',
    a: 'No — these are fan-made tribute frames inspired by RCB. We are independent collectors and craftspeople, not affiliated with the Royal Challengers Bengaluru franchise. All trademarks belong to their respective owners.',
  },
  {
    q: 'How long does shipping take?',
    a: 'We dispatch every order within 48 hours. Pan-India delivery typically lands in 4–7 business days via Blue Dart / Delhivery Premium. International shipping (DHL / FedEx) takes 7–14 days.',
  },
  {
    q: 'What if my frame arrives damaged?',
    a: 'Every shipment is 100% transit-insured. Send us a photo within 48 hours of receipt and we will replace the piece at no cost. We have a less-than-0.3% damage rate thanks to our custom foam-fit crating.',
  },
  {
    q: 'Can I customise the frame (name, jersey number, message)?',
    a: 'Yes. Any frame can be personalised with a name, number, or short engraved message on the bottom plaque. Add a note at checkout — personalised orders add 3–4 working days to dispatch.',
  },
  {
    q: 'Do you offer EMI or COD?',
    a: 'EMI is available on cards for orders above ₹ 9,999 (3 / 6 / 9 month plans). Cash on Delivery is available across India with a refundable ₹ 500 advance.',
  },
]
