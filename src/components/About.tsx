import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useInteractive } from '../lib/useInteractive'
import {
  ArrowUpRight,
  Box,
  Clock,
  Hammer,
  Heart,
  MapPin,
  Plus,
  Quote,
  Sparkles,
  X,
} from 'lucide-react'
import { EASE } from '../lib/motion'

type CardIcon = typeof Hammer

type ChapterCard = {
  id: string
  eyebrow: string
  title: string
  body: string
  icon: CardIcon
  highlight?: string
  meta?: { label: string; value: string }[]
  size: 'wide' | 'narrow'
  /** Long-form copy shown when the card is opened. */
  extended: {
    headline: string
    paragraphs: string[]
    facts?: { label: string; value: string }[]
  }
}

const CARDS: ChapterCard[] = [
  {
    id: 'origin',
    eyebrow: 'Origin · 2024',
    title: 'Eleven hands. One workshop. One question.',
    body:
      'PLAY BOLD started in a 400 sq-ft loft in Indiranagar, with eleven carpenters, illustrators and electronics tinkerers asking the same thing — why does memorabilia worth memorising still look so cheap?',
    icon: MapPin,
    meta: [
      { label: 'Est', value: '2024' },
      { label: 'Studio', value: 'Indiranagar' },
      { label: 'Team', value: '11 craftspeople' },
    ],
    size: 'wide',
    extended: {
      headline: 'The first frame was a Christmas gift.',
      paragraphs: [
        'It was supposed to be a one-off — a hand-built tribute frame for a cousin who had spent eighteen years cheering for a team that kept breaking his heart. Three weekends in a Bengaluru car park. Two rebuilds. One broken LED strip.',
        'When we hung it on his wall, his three-year-old daughter pointed at the figurine and said, “Virat uncle.” That was the moment this stopped being a side project.',
        'We rented a 400 sq-ft loft on a quiet road in Indiranagar, bought a band saw on credit, and started building. A year later, eleven of us share the same workshop — and the same belief that this team deserves something heavier than a poster.',
      ],
      facts: [
        { label: 'Founded', value: '2024' },
        { label: 'Address', value: 'Indiranagar, Bengaluru' },
        { label: 'Team', value: '11 craftspeople, all full-time' },
        { label: 'Tools', value: 'Hand-cut · hand-painted · hand-wired' },
      ],
    },
  },
  {
    id: 'materials',
    eyebrow: 'Materials',
    title: 'Nothing is printed and called a trophy.',
    body:
      'Mini MRF bat replicas. Genuine stitched leather balls. Diecast trophy castings. Hand-painted action portraits on premium giclée canvas. Real, hold-able craftsmanship — never wallpaper.',
    icon: Box,
    highlight: '0 stock photos · 100% hand-assembled',
    size: 'narrow',
    extended: {
      headline: 'Where every part comes from.',
      paragraphs: [
        'The bats are real — Genio MRF replicas, sanded and stained in our studio. The leather cricket balls are stitched in Meerut, the same workshops the BCCI uses. The trophies are diecast zinc alloy, gold-electroplated in Sivakasi.',
        'The portraits are hand-painted in four colour passes on giclée canvas, signed by the artist on the reverse. The LED edge lighting is hand-soldered, every wire trimmed and heat-shrunk before assembly.',
        'Nothing here ships from Yiwu. Nothing is printed onto MDF and called premium. Every part has a maker — and most of them are on our payroll.',
      ],
      facts: [
        { label: 'Bats', value: 'Genio MRF replicas, sanded in-house' },
        { label: 'Balls', value: 'Meerut-stitched genuine leather' },
        { label: 'Trophies', value: 'Sivakasi diecast · gold electroplated' },
        { label: 'Portraits', value: 'Hand-painted on giclée canvas' },
      ],
    },
  },
  {
    id: 'hours',
    eyebrow: 'Process',
    title: '32 hours of work, per frame.',
    body:
      'From the first cut to the final LED wire, every frame absorbs 32+ hours — carpentry, painting, gilding, assembly, and a mandatory 48-hour soak-test of the lights before it sees a box.',
    icon: Clock,
    highlight: 'Numbered · Signed · Soak-tested',
    size: 'narrow',
    extended: {
      headline: 'How a frame becomes a frame.',
      paragraphs: [
        'Day 1: carpentry. Solid mango wood is cut, mitred, sanded, stained, sealed and rested overnight. Day 2: layout — the centrepiece is placed, photographed, adjusted, photographed again. We send those photos to you before we lock anything down.',
        'Day 3: painting and gilding. Portrait detailing. Gold foil hot-stamped on the lettering. Day 4: electronics — LEDs soldered, hidden behind a diffuser strip, USB-C port flush-mounted in the back panel.',
        'Day 5: a 48-hour soak-test runs the lights continuously to catch any flicker, hot solder joint or driver weakness. Only after that does the frame get numbered, signed, certificated, and packed into a foam-fit crate.',
      ],
      facts: [
        { label: 'Total hours', value: '28 — 52 per frame' },
        { label: 'Soak-test', value: '48 hours continuous LED run' },
        { label: 'Sign-off', value: 'Numbered + signed certificate' },
        { label: 'Packaging', value: 'Custom foam-fit crate · 100% insured' },
      ],
    },
  },
  {
    id: 'belief',
    eyebrow: 'Belief',
    title: 'Fans first. Always fans.',
    body:
      'We are not affiliated with the Royal Challengers Bengaluru franchise or the BCCI — we are tribute makers, the same fans singing “Ee Sala Cup Namde” since 2008. Every piece here is what we wanted on our own walls before we sold one.',
    icon: Heart,
    meta: [
      { label: 'Status', value: 'Independent fan studio' },
      { label: 'Warranty', value: '12-month craftsmanship' },
    ],
    size: 'wide',
    extended: {
      headline: 'Where we stand.',
      paragraphs: [
        'We are not affiliated with Royal Challengers Bengaluru, the BCCI, or the IPL. We are an independent fan studio. The word marks, logos, and player likenesses you see in these frames are used as fair-use tribute, not as licensed merchandise.',
        'We hold ourselves to a stricter line than the law requires: nothing we sell impersonates official RCB merchandise, every frame ships with a disclaimer card, and we will pull a SKU on twenty-four hours notice if the franchise ever objects.',
        'But the reason we make them is simple — we are the same fans who have been in the Chinnaswamy since 2008, singing the same five words every May. Every piece here is what we wanted on our own walls before we sold a single frame.',
      ],
      facts: [
        { label: 'Status', value: 'Independent · fan-run · self-funded' },
        { label: 'Disclaimer', value: 'Unofficial tribute · not licensed RCB merch' },
        { label: 'Warranty', value: '12 months on craftsmanship' },
        { label: 'Returns', value: '14 days, no questions asked' },
      ],
    },
  },
]

const STATS = [
  { value: '11', label: 'Studio craftspeople' },
  { value: '500+', label: 'Frames delivered' },
  { value: '< 0.3%', label: 'Damage rate' },
  { value: '4.9 / 5', label: 'Verified rating' },
]

/** Per-card initial offsets so each card flies in from a slightly different angle. */
const DEAL_VARIANTS = [
  { rotate: -9, x: -55, y: 50 },
  { rotate: 8, x: 60, y: 70 },
  { rotate: -5, x: -55, y: 90 },
  { rotate: 11, x: 55, y: 55 },
]

function CardDetailDialog({
  card,
  index,
  onClose,
}: {
  card: ChapterCard
  index: number
  onClose: () => void
}) {
  // Lock body scroll while open + close on ESC.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`chapter-${card.id}-title`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Panel */}
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 130, damping: 18, mass: 0.7 }}
        className="
          relative w-full sm:max-w-2xl
          max-h-[88dvh] overflow-y-auto
          rounded-3xl border border-white/10
          bg-rcb-bg/95 backdrop-blur-xl
          shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]
        "
      >
        {/* Ghost numeral */}
        <span
          aria-hidden
          className="
            pointer-events-none select-none absolute -top-3 -right-2
            font-display leading-none tracking-tight text-white/[0.05]
          "
          style={{ fontSize: 'clamp(7rem, 18vw, 13rem)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chapter"
          className="
            absolute top-4 right-4 z-10 inline-flex w-9 h-9 items-center justify-center
            rounded-full border border-white/10 bg-white/[0.04] text-white/70
            hover:bg-white/[0.08] hover:text-white transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red
          "
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-[1] p-6 sm:p-10">
          <div className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-rcb-red">
            <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-rcb-red/15">
              <Icon className="w-3.5 h-3.5" />
            </span>
            {card.eyebrow}
          </div>

          <h3
            id={`chapter-${card.id}-title`}
            className="mt-5 font-display tracking-tight text-white leading-[0.96]"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)' }}
          >
            {card.extended.headline}
          </h3>

          <div className="mt-7 space-y-5 text-white/85 leading-relaxed text-[15px] sm:text-base">
            {card.extended.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {card.extended.facts && (
            <dl className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t border-white/10 text-sm">
              {card.extended.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-rcb-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href="#shop"
              onClick={(e) => {
                e.preventDefault()
                onClose()
                // Defer scroll until dialog exit animation has had a tick.
                window.setTimeout(() => {
                  document
                    .getElementById('shop')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 100)
              }}
              className="
                inline-flex items-center justify-center gap-2 rounded-full
                bg-rcb-red px-5 py-3 text-sm font-semibold text-white
                hover:bg-rcb-red-deep transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red focus-visible:ring-offset-2 focus-visible:ring-offset-rcb-bg
              "
            >
              See the collection
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="
                inline-flex items-center justify-center gap-2 rounded-full
                border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white/85
                hover:bg-white/[0.08] hover:text-white transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              "
            >
              Close chapter
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function AboutCard({
  card,
  index,
  sectionScroll,
  onOpen,
}: {
  card: ChapterCard
  index: number
  sectionScroll: MotionValue<number>
  onOpen: () => void
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const interactive = useInteractive()
  const deal = DEAL_VARIANTS[index % DEAL_VARIANTS.length]
  const inView = useInView(ref, { amount: 0.3, once: true })

  // Cursor position (0..1) inside the card. Defaults to centre so the spotlight
  // doesn't appear off-screen the first time it fades in.
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 90, damping: 20, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 90, damping: 20, mass: 0.5 })

  // 3D tilt
  const rotateX = useTransform(sy, [0, 1], [6, -6])
  const rotateY = useTransform(sx, [0, 1], [-8, 8])

  // Cursor-following radial glow
  const sxPct = useTransform(sx, (v) => `${v * 100}%`)
  const syPct = useTransform(sy, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${sxPct} ${syPct}, rgba(236,28,36,0.22), transparent 55%)`
  const borderGlow = useMotionTemplate`radial-gradient(260px circle at ${sxPct} ${syPct}, rgba(236,28,36,0.55), transparent 60%)`

  // Scroll parallax — alternates per card so the deck breathes.
  const direction = index % 2 === 0 ? 1 : -1
  const parallaxY = useTransform(
    sectionScroll,
    [0, 1],
    [direction * 40, -direction * 40]
  )

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  const Icon = card.icon
  const colSpan = card.size === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5'

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ x: deal.x, y: deal.y, rotate: deal.rotate, opacity: 0 }}
      animate={
        inView
          ? { x: 0, y: 0, rotate: 0, opacity: 1 }
          : { x: deal.x, y: deal.y, rotate: deal.rotate, opacity: 0 }
      }
      transition={{
        type: 'spring',
        stiffness: 55,
        damping: 13,
        mass: 0.9,
        delay: index * 0.13,
        opacity: { duration: 0.7, ease: EASE, delay: index * 0.13 },
      }}
      style={
        interactive
          ? {
              rotateX,
              rotateY,
              y: parallaxY,
              transformStyle: 'preserve-3d',
              transformPerspective: 1200,
              willChange: 'transform',
            }
          : undefined
      }
      className={`
        group relative isolate ${colSpan}
        rounded-3xl border border-white/10 bg-white/[0.025]
        p-6 sm:p-8 md:p-10
        backdrop-blur-[1px]
        transition-colors duration-300
        hover:border-rcb-red/40
      `}
    >
      {/* Border glow (cursor-following) — sits just inside the edge */}
      {interactive && (
        <motion.div
          aria-hidden
          className="
            pointer-events-none absolute inset-0 rounded-3xl
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
          style={{
            background: borderGlow,
            mixBlendMode: 'plus-lighter',
            mask: 'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
            WebkitMask:
              'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: 1,
          }}
        />
      )}

      {/* Inside spotlight */}
      {interactive && (
        <motion.div
          aria-hidden
          className="
            pointer-events-none absolute inset-0 rounded-3xl
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
          style={{ background: spotlight }}
        />
      )}

      {/* Ghost numeral */}
      <span
        aria-hidden
        className="
          pointer-events-none select-none
          absolute -top-3 -right-2 sm:-top-5 sm:-right-3
          font-display leading-none tracking-tight
          text-white/[0.05]
        "
        style={{ fontSize: 'clamp(6rem, 12vw, 11rem)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        <div className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-rcb-red">
          <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-rcb-red/15">
            <Icon className="w-3.5 h-3.5" />
          </span>
          {card.eyebrow}
        </div>

        <h3
          className="mt-5 font-display tracking-tight text-white leading-[0.96]"
          style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.5rem)' }}
        >
          {card.title}
        </h3>

        <p className="mt-5 text-rcb-muted leading-relaxed text-[15px] sm:text-base">
          {card.body}
        </p>

        {card.highlight && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-rcb-gold/30 bg-rcb-gold/[0.06] px-3.5 py-1.5 text-[11px] sm:text-xs text-rcb-gold tracking-[0.15em]">
            <Sparkles className="w-3.5 h-3.5" />
            {card.highlight}
          </div>
        )}

        {card.meta && (
          <dl className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 pt-5 border-t border-white/10 text-sm">
            {card.meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-rcb-muted">
                  {m.label}
                </dt>
                <dd className="mt-1 text-white">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Read-more affordance */}
        <button
          type="button"
          onClick={onOpen}
          className="
            mt-7 inline-flex items-center gap-2
            text-sm text-white/80 hover:text-white transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red focus-visible:ring-offset-2 focus-visible:ring-offset-rcb-bg rounded-full
          "
          aria-label={`Read more about ${card.eyebrow}`}
        >
          <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]">
            <Plus className="w-3.5 h-3.5" />
          </span>
          Read the full chapter
        </button>
      </div>
    </motion.article>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openCard = openIndex !== null ? CARDS[openIndex] : null

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-rcb-bg overflow-hidden"
    >
      <div
        className="absolute inset-0 rcb-noise opacity-25 pointer-events-none"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
        {/* Header */}
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-xs tracking-[0.45em] uppercase text-rcb-red text-center"
        >
          About PLAY BOLD
        </motion.p>
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          className="mt-4 font-display tracking-tight text-white leading-[0.92] text-center"
          style={{ fontSize: 'clamp(2.25rem, 7vw, 5rem)' }}
        >
          Built by fans. <br className="hidden sm:block" />
          <span className="text-rcb-red">For fans.</span>
        </motion.h2>
        <motion.p
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          className="mt-6 max-w-2xl mx-auto text-center text-rcb-muted leading-relaxed"
        >
          Four chapters. Four reasons every frame on your wall lives up to the
          team it celebrates.
        </motion.p>

        {/* Card deck */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 lg:gap-8">
          {CARDS.map((card, i) => (
            <AboutCard
              key={card.id}
              card={card}
              index={i}
              sectionScroll={scrollYProgress}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>

        {/* Dialog overlay (portal-equivalent via fixed positioning) */}
        <AnimatePresence>
          {openCard && openIndex !== null && (
            <CardDetailDialog
              card={openCard}
              index={openIndex}
              onClose={() => setOpenIndex(null)}
            />
          )}
        </AnimatePresence>

        {/* Founder quote — closing beat */}
        <motion.figure
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-24 sm:mt-32 max-w-3xl mx-auto text-center relative"
        >
          <Quote className="mx-auto w-10 h-10 text-rcb-red" />
          <blockquote
            className="mt-6 font-display text-white tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            &ldquo;If you&apos;re going to put something on your wall for the
            next ten years, it should feel like it earned its place.&rdquo;
          </blockquote>
          <figcaption className="mt-7 flex items-center justify-center gap-3 text-sm text-rcb-muted">
            <span className="w-11 h-11 rounded-full bg-rcb-red/20 inline-flex items-center justify-center text-rcb-red font-display text-base">
              AK
            </span>
            <span className="text-left">
              <span className="block text-white">TODO: Founder name</span>
              <span className="text-[10px] uppercase tracking-[0.3em]">
                Founder &amp; Studio Lead · Bengaluru
              </span>
            </span>
          </figcaption>
        </motion.figure>

        {/* Stats */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-center"
            >
              <p className="font-display text-2xl sm:text-3xl text-white tracking-tight">
                {s.value}
              </p>
              <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-rcb-muted">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Hammer footnote */}
        <p className="mt-10 text-center text-xs text-rcb-muted inline-flex items-center justify-center gap-2 w-full">
          <Hammer className="w-3.5 h-3.5 text-rcb-gold" />
          Hand-built · Bengaluru · est. 2024
        </p>
      </div>
    </section>
  )
}
