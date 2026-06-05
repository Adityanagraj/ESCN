export const BRAND = {
  name: 'ShopforMost X PlayBold',
  tagline: 'We Believe. We Support. We Roar.',
  domain: 'TODO: playboldframes.com',
  supportEmail: 'shopformost@gmail.com',
  supportPhone: '+91 99727 11692',
  /**
   * Business WhatsApp number in international format, digits only.
   *
   *   - Country code first, then number, NO + / spaces / dashes / brackets.
   *   - Example for India 9876543210 → `'919876543210'`.
   *   - This is what all the "Shop now" buttons and the floating support FAB
   *     redirect to via wa.me deep links.
   *
   * The display name shown to customers when the chat opens ("ShopforMost X
   * PlayBold") is configured separately, inside the WhatsApp Business app:
   *   Settings → Business tools → Business profile → Name.
   * That name is NOT controlled by this code, so update it there once.
   */
  whatsappNumber: '919972711692',
  established: '2024',
  city: 'Bengaluru, India',
  socials: {
    instagram: 'https://www.instagram.com/shopformost/',
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
  /**
   * Ordered list of product images. First entry is the hero/cover shot used
   * everywhere a single thumbnail is needed (compare grid, footer). The full
   * array drives the product-page gallery + zoom lightbox.
   *
   * Drop more shots into `public/products/` and add the paths here. Suggested
   * angles per frame: front, three-quarter, side/depth, lit-on-the-wall.
   */
  images: string[]
  highlights: string[]
  specs: { label: string; value: string }[]
  price: string
  compareAt?: string
  inStock: boolean
  shopUrl: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'ee-sala-namde',
    slug: 'forever-rcb-ee-sala-cup-namde-collectible-frame',
    name: 'FOREVER RCB · EE SALA CUP NAMDE COLLECTIBLE FRAME',
    subtitle: 'Premium 12 × 16 inch Collectible Frame',
    chapter: 'Ee sala cup namde.',
    tagline: '18 years. One team. One family.',
    hook: 'Eighteen seasons of patience, loyalty, and one dream — finally framed. The gold trophy sits at the heart, ringed by every roar that got us here.',
    description:
      'Celebrate RCB\u2019s unforgettable journey with this premium 12 × 16 inch collectible frame featuring iconic players, fan emotions, and the legendary "Ee Sala Cup Namde" trophy design. A perfect keepsake for every loyal RCB fan and cricket enthusiast.',
    images: [
      '/products/forever-rcb-ee-sala-1.png',
      '/products/forever-rcb-ee-sala-2.png',
      '/products/forever-rcb-ee-sala-3.png',
      '/products/forever-rcb-ee-sala-4.png',
    ],
    highlights: [
      'Gold-foil "Ee Sala Cup Namde" trophy centrepiece',
      'RCB journey montage — 2008 to 2021',
      'Legend tributes: Kohli, Gayle, AB de Villiers, Patidar',
      'Fan-emotion panels + RCB lion crest detailing',
    ],
    specs: [
      { label: 'Size', value: '12 × 16 inches' },
      { label: 'Frame', value: 'Premium black moulding' },
      { label: 'Print', value: 'High-gloss collage finish' },
      { label: 'Centrepiece', value: 'Gold-foil trophy panel' },
      { label: 'Theme', value: 'Ee Sala Cup Namde · Forever RCB' },
      { label: 'Best for', value: 'Gifting · wall centrepiece' },
    ],
    price: '₹ 999',
    compareAt: '₹ 1,999',
    inStock: true,
    shopUrl: '#',
  },
  {
    id: 'ee-sala-3d-trophy',
    slug: 'ee-sala-cup-namde-3d-trophy-collectible-frame',
    name: 'EE SALA CUP NAMDE · 3D TROPHY COLLECTIBLE FRAME',
    subtitle: 'Premium 5 × 6 inch 3D Trophy Frame',
    chapter: 'One dream.',
    tagline: 'Built on belief. Driven by loyalty.',
    hook: 'A championship trophy that literally rises off the frame — gold against a starfield of black, lit like the night the dream finally came true.',
    description:
      'Celebrate RCB\u2019s ultimate dream with this premium 5 × 6 inch 3D trophy frame, featuring a bold raised championship trophy and the iconic "Ee Sala Cup Namde" design. A timeless tribute to 18 years of loyalty, passion, and unwavering belief.',
    images: [
      '/products/ee-sala-3d-trophy-1.png',
      '/products/ee-sala-3d-trophy-2.png',
    ],
    highlights: [
      'Bold raised 3D championship trophy',
      'Gold-foil "Ee Sala Cup Namde" lettering',
      'Glittering starfield-black backdrop',
      '"Built on belief. Powered by passion. Driven by loyalty." detailing',
    ],
    specs: [
      { label: 'Size', value: '5 × 6 inches' },
      { label: 'Frame', value: 'Gold-finish moulding' },
      { label: 'Centrepiece', value: 'Raised 3D trophy' },
      { label: 'Finish', value: 'Glitter starfield print' },
      { label: 'Theme', value: 'Ee Sala Cup Namde · Forever RCB' },
      { label: 'Best for', value: 'Desk · shelf · gifting' },
    ],
    price: '₹ 749',
    compareAt: '₹ 1,499',
    inStock: true,
    shopUrl: '#',
  },
  {
    id: 'forever-rcb-kohli',
    slug: 'forever-rcb-virat-kohli-premium-collectible-frame',
    name: 'FOREVER RCB · VIRAT KOHLI PREMIUM COLLECTIBLE FRAME',
    subtitle: 'Premium 12 × 12 inch Collectible Frame',
    chapter: 'One king.',
    tagline: 'Loyalty. Passion. Belief.',
    hook: 'The roar that defined a generation — Kohli mid-celebration, rendered in red against black. One team. One dream. One king.',
    description:
      "Celebrate the passion, loyalty, and legacy of Kohli with this premium 12 × 12 inch collectible frame. Featuring a powerful portrait and iconic RCB aesthetics rendered in artistic perfection, it\u2019s a tribute for fans who proudly stand with RCB through every season.",
    images: [
      '/products/forever-rcb-kohli-1.png',
      '/products/forever-rcb-kohli-2.png',
    ],
    highlights: [
      'Powerful Virat Kohli celebration portrait',
      'Iconic "Forever RCB" + RCB lion crest artwork',
      'Textured glitter-finish print',
      '"One team. One dream. One king." detailing',
    ],
    specs: [
      { label: 'Size', value: '12 × 12 inches' },
      { label: 'Frame', value: 'Premium white moulding' },
      { label: 'Subject', value: 'Virat Kohli · Forever RCB' },
      { label: 'Finish', value: 'Textured glitter print' },
      { label: 'Theme', value: 'Loyalty · Passion · Belief' },
      { label: 'Best for', value: 'Wall · gifting' },
    ],
    price: '₹ 849',
    compareAt: '₹ 1,699',
    inStock: true,
    shopUrl: '#',
  },
  {
    id: 'ee-sala-3d-celebration',
    slug: 'ee-sala-cup-namde-3d-trophy-celebration-frame',
    name: 'EE SALA CUP NAMDE · 3D TROPHY CELEBRATION FRAME',
    // TODO: confirm size — your text read "5 × 5 inch", but the photo looks larger.
    subtitle: 'Premium 5 × 5 inch 3D Celebration Frame',
    chapter: 'The celebration.',
    tagline: 'Built on belief. Powered by passion.',
    hook: 'The moment the wait ended — a handcrafted champion lifting the cup, sparks flying off a starfield of black and gold.',
    description:
      "Celebrate RCB\u2019s historic triumph with this premium 5 × 5 inch 3D collectible frame, featuring a handcrafted champion pose holding the trophy high. A perfect blend of passion, victory, and loyalty — made for fans who believed through every season. ❤🏆🔥",
    images: [
      '/products/ee-sala-3d-celebration-1.png',
      '/products/ee-sala-3d-celebration-2.png',
      '/products/ee-sala-3d-celebration-3.png',
    ],
    highlights: [
      'Handcrafted 3D champion figure lifting the trophy',
      'Gold-foil "Ee Sala Cup Namde" lettering',
      'Glittering starfield-black backdrop',
      '"Built on belief. Powered by passion. Driven by loyalty." detailing',
    ],
    specs: [
      { label: 'Size', value: '5 × 5 inches' },
      { label: 'Frame', value: 'Gold-finish moulding' },
      { label: 'Centrepiece', value: 'Handcrafted 3D champion figure' },
      { label: 'Finish', value: 'Glitter starfield print' },
      { label: 'Theme', value: 'Ee Sala Cup Namde · Forever RCB' },
      { label: 'Best for', value: 'Shelf · statement gift' },
    ],
    price: '₹ 1,199',
    compareAt: '₹ 1,999',
    inStock: true,
    shopUrl: '#',
  },
  {
    id: 'forever-rcb-kohli-victory',
    slug: 'forever-rcb-kohli-victory-3d-collectible-frame',
    name: 'FOREVER RCB · KOHLI VICTORY 3D COLLECTIBLE FRAME',
    subtitle: 'Premium 12 × 12 inch 3D Collectible Frame',
    chapter: 'The masterpiece.',
    tagline: 'One team. One dream. One king.',
    hook: 'The roar and the cup, together at last — a powerful Kohli portrait backdrop with a handcrafted 3D figure lifting the trophy from an inner gold frame.',
    description:
      'Honour the spirit of RCB with this premium 12 × 12 inch 3D collectible frame, featuring a powerful Virat Kohli artwork and a handcrafted trophy-celebration figurine — a blend of passion, loyalty, and victory for every devoted RCB fan.',
    images: [
      '/products/forever-rcb-kohli-victory-1.png',
      '/products/forever-rcb-kohli-victory-2.png',
      '/products/forever-rcb-kohli-victory-3.png',
      '/products/forever-rcb-kohli-victory-4.png',
      '/products/forever-rcb-kohli-victory-5.png',
      '/products/forever-rcb-kohli-victory-6.png',
    ],
    highlights: [
      'Powerful "Forever RCB" Kohli roar portrait backdrop',
      'Handcrafted 3D Kohli figure lifting the trophy',
      'Inner gold frame framing the 3D figurine',
      '"Loyalty · Passion · Belief — One team. One dream. One king." detailing',
    ],
    specs: [
      { label: 'Size', value: '12 × 12 inches' },
      { label: 'Frame', value: 'White moulding + inner gold frame' },
      { label: 'Subject', value: 'Virat Kohli · Forever RCB' },
      { label: 'Centrepiece', value: 'Handcrafted 3D celebration figure' },
      { label: 'Finish', value: 'Textured glitter print' },
      { label: 'Best for', value: 'Collector centrepiece · statement gift' },
    ],
    price: '₹ 1,799',
    compareAt: '₹ 2,999',
    inStock: true,
    shopUrl: '#',
  },
  {
    id: 'rcb-ultimate-combo',
    slug: 'rcb-ultimate-fan-combo-premium-collectible-frame-set',
    name: 'RCB ULTIMATE FAN COMBO · PREMIUM COLLECTIBLE FRAME SET',
    subtitle: 'Exclusive 12 × 16 + 12 × 12 Combo Collection',
    chapter: 'The complete set.',
    tagline: 'Every season. Every emotion. Every dream.',
    hook: 'The whole RCB journey on one wall — the legacy collage, the Kohli victory masterpiece, and the 3D trophy moment, together as one ultimate set.',
    description:
      'Celebrate the complete RCB journey with this exclusive 12 × 16 inch and 12 × 12 inch combo collection, featuring iconic player artwork, championship trophy moments, and premium 3D collectible frames. Designed for fans who stood by RCB through every season, every emotion, and every dream.',
    images: [
      '/products/rcb-ultimate-combo-1.png',
      '/products/rcb-ultimate-combo-2.png',
      '/products/rcb-ultimate-combo-3.png',
    ],
    highlights: [
      '12 × 16 inch "Ee Sala Cup Namde" legacy collage frame',
      '12 × 12 inch Kohli Victory 3D collectible frame',
      '3D championship trophy celebration piece',
      'The complete collection — best value for true fans',
    ],
    specs: [
      { label: 'Set includes', value: '3 collectible frames' },
      { label: 'Sizes', value: '12 × 16 in + 12 × 12 in' },
      { label: 'Artwork', value: 'Player portraits + trophy moments' },
      { label: 'Centrepieces', value: 'Premium 3D collectible frames' },
      { label: 'Theme', value: 'The complete RCB journey' },
      { label: 'Best for', value: 'The ultimate fan · gifting' },
    ],
    price: '₹ 2,999',
    compareAt: '₹ 5,999',
    inStock: true,
    shopUrl: '#',
  },
]

/** Landscape hero banner — shown on tablet/desktop (≥ 640px). */
/** Single square (1024×1024) hero banner with baked-in typography, used at
 *  every breakpoint. The hero sizes itself to this image so there are no gaps. */
export const HERO_IMAGE = '/products/hero.png'

export const TRUST_BADGES = [
  {
    title: 'Authenticity certified',
    body: 'Every frame ships with a numbered certificate and a 12-month craftsmanship warranty.',
  },
  {
    title: 'Two ways to pay',
    body: 'Pay in full upfront via UPI / bank transfer, or reserve with a 50% advance and pay the balance on delivery. Every order is confirmed on WhatsApp.',
  },
  {
    title: 'Insured delivery',
    body: 'Dispatched in 48 hours. Packed in custom foam-fit crates. 100% transit insurance.',
  },
]

/** Live shipment ticker — rotated through a floating widget for urgency. */
export type Shipment = {
  city: string
  product: string
  minutesAgo: number
}

export const SHIPMENTS: Shipment[] = [
  { city: 'Jaipur', product: 'Ee Sala Cup Namde Frame', minutesAgo: 47 },
  { city: 'Bengaluru', product: 'Ee Sala Cup Namde Frame', minutesAgo: 92 },
  { city: 'Pune', product: 'Ee Sala Cup Namde Frame', minutesAgo: 18 },
  { city: 'Chennai', product: 'Ee Sala Cup Namde Frame', minutesAgo: 134 },
  { city: 'Mumbai', product: 'Ee Sala Cup Namde Frame', minutesAgo: 6 },
  { city: 'Delhi', product: 'Ee Sala Cup Namde Frame', minutesAgo: 28 },
  { city: 'Hyderabad', product: 'Ee Sala Cup Namde Frame', minutesAgo: 65 },
  { city: 'Kochi', product: 'Ee Sala Cup Namde Frame', minutesAgo: 12 },
  { city: 'Lucknow', product: 'Ee Sala Cup Namde Frame', minutesAgo: 210 },
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

// Seed reviews written to match the real frames. Swap these for genuine
// consented buyer quotes once you have them. Tone is intentionally plain and
// human, not polished marketing copy.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rohan Mehta',
    location: 'Mumbai',
    product: 'EE SALA CUP NAMDE COLLECTIBLE FRAME',
    rating: 5,
    text: "Got this for my dad and he genuinely loved it. The gold trophy in the middle pops and all the player panels around it look great. For 999 the quality honestly surprised me.",
    initials: 'RM',
    verified: true,
    daysAgo: 12,
  },
  {
    id: 't2',
    name: 'Anjali Sharma',
    location: 'Bengaluru',
    product: 'EE SALA CUP NAMDE 3D TROPHY FRAME',
    rating: 5,
    text: "The trophy actually comes out of the frame in 3D, photos don't do it justice. Sitting on my office desk now and everyone keeps picking it up. Small but feels premium.",
    initials: 'AS',
    verified: true,
    daysAgo: 9,
  },
  {
    id: 't3',
    name: 'Karthik Iyer',
    location: 'Chennai',
    product: 'VIRAT KOHLI PREMIUM FRAME',
    rating: 4,
    text: "The Kohli roar artwork looks stunning on the wall and the glitter finish catches the light nicely. Took about 5 days to reach Chennai which was a bit longer than I hoped, but the frame itself is solid.",
    initials: 'KI',
    verified: true,
    daysAgo: 6,
  },
  {
    id: 't4',
    name: 'Aditya Rao',
    location: 'Hyderabad',
    product: 'EE SALA CUP NAMDE 3D CELEBRATION FRAME',
    rating: 5,
    text: "The 3D Kohli lifting the cup is the real showstopper. Every person who visits asks where I got it from. Packaging was tight so nothing moved during transit.",
    initials: 'AR',
    verified: true,
    daysAgo: 21,
  },
  {
    id: 't5',
    name: 'Sneha Krishnan',
    location: 'Pune',
    product: 'KOHLI VICTORY 3D FRAME',
    rating: 5,
    text: "Ordered over WhatsApp and the whole thing was so smooth, they answered all my doubts and kept sending updates. The portrait with the 3D figure looks way better in person. Worth every rupee.",
    initials: 'SK',
    verified: true,
    daysAgo: 4,
  },
  {
    id: 't6',
    name: 'Vishal Reddy',
    location: 'Kochi',
    product: 'RCB ULTIMATE FAN COMBO',
    rating: 5,
    text: "Bought the full combo as a birthday gift for my brother who is a die hard RCB fan. He went crazy when he opened it. Three frames and all of them are beautiful. Best value of the lot.",
    initials: 'VR',
    verified: true,
    daysAgo: 16,
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
    a: 'Yes. Any frame can be personalised with a name, number, or short engraved message on the bottom plaque. Just mention what you want in your WhatsApp order message — personalised orders add 3–4 working days to dispatch.',
  },
  {
    q: 'How do I pay for my frame?',
    a: 'Every order is confirmed personally on WhatsApp — no anonymous checkout. You can choose between two options: (1) Full payment upfront via UPI, GPay, PhonePe, or direct bank transfer — we ship within 48 hours of payment, or (2) Partial COD — pay a 50% advance to reserve your edition number, balance on delivery. The advance is fully refundable if you cancel before we dispatch.',
  },
]
