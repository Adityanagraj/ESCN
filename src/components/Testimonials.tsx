import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star } from 'lucide-react'
import { TESTIMONIALS, type Testimonial } from '../data/brand'
import { EASE } from '../lib/motion'
import { useInteractive } from '../lib/useInteractive'

const AUTO_ADVANCE_MS = 6500
const AVATAR_GRADIENTS = [
  'from-rcb-red to-rose-700',
  'from-amber-500 to-rcb-red',
  'from-rcb-red-deep to-fuchsia-700',
  'from-orange-500 to-rcb-red-deep',
  'from-rcb-red to-amber-600',
  'from-rose-700 to-rcb-red-deep',
]

function Stars({ rating }: { rating: Testimonial['rating'] }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`w-3.5 h-3.5 ${i < rating ? 'fill-rcb-gold text-rcb-gold' : 'text-white/15'}`}
        />
      ))}
    </div>
  )
}

function relativeDays(days: number): string {
  if (days <= 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.round(days / 7)} ${Math.round(days / 7) === 1 ? 'week' : 'weeks'} ago`
  return `${Math.round(days / 30)} ${Math.round(days / 30) === 1 ? 'month' : 'months'} ago`
}

function TestimonialCard({
  t,
  gradient,
  isActive,
}: {
  t: Testimonial
  gradient: string
  isActive: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const interactive = useInteractive()

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 90, damping: 20, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 90, damping: 20, mass: 0.5 })

  const rotateX = useTransform(sy, [0, 1], [4, -4])
  const rotateY = useTransform(sx, [0, 1], [-5, 5])
  const sxPct = useTransform(sx, (v) => `${v * 100}%`)
  const syPct = useTransform(sy, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${sxPct} ${syPct}, rgba(236,28,36,0.18), transparent 55%)`

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

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        interactive
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              transformPerspective: 1000,
            }
          : undefined
      }
      className={`
        group relative isolate flex-shrink-0
        w-[85vw] sm:w-[60vw] md:w-[440px] lg:w-[460px]
        snap-center
        rounded-3xl border bg-white/[0.025]
        p-6 sm:p-8
        backdrop-blur-[1px]
        transition-[border-color,opacity,transform] duration-500
        ${isActive ? 'border-rcb-red/40 opacity-100' : 'border-white/10 opacity-70 hover:opacity-100'}
      `}
    >
      {interactive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
        />
      )}

      <Quote
        className="absolute top-6 right-6 w-8 h-8 text-rcb-red/40"
        aria-hidden
      />

      <div className="relative z-10">
        <Stars rating={t.rating} />

        <p className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed">
          &ldquo;{t.text}&rdquo;
        </p>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-rcb-muted">
          <span className="block w-1.5 h-1.5 rounded-full bg-rcb-gold" />
          {t.product}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3 pt-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span
              className={`
                inline-flex w-10 h-10 items-center justify-center
                rounded-full bg-gradient-to-br ${gradient}
                font-display text-sm text-white tracking-wider
                shadow-[0_8px_20px_-8px_rgba(236,28,36,0.6)]
              `}
              aria-hidden
            >
              {t.initials}
            </span>
            <div className="text-left">
              <p className="text-sm text-white flex items-center gap-1.5">
                {t.name}
                {t.verified && (
                  <BadgeCheck
                    className="w-3.5 h-3.5 text-rcb-gold"
                    aria-label="Verified buyer"
                  />
                )}
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-rcb-muted">
                {t.location} · {relativeDays(t.daysAgo)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = TESTIMONIALS.length

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[i] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft - 16,
      behavior: 'smooth',
    })
  }, [])

  const go = useCallback(
    (delta: number) => {
      setActive((prev) => {
        const next = (prev + delta + total) % total
        scrollToIndex(next)
        return next
      })
    },
    [scrollToIndex, total]
  )

  // Auto-advance, paused on hover / when tab hidden / when user is scrolling.
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => go(1), AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused, go])

  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // Sync active dot with manual scroll (drag / trackpad).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const centre = track.scrollLeft + track.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        Array.from(track.children).forEach((node, i) => {
          const el = node as HTMLElement
          const elCentre = el.offsetLeft + el.offsetWidth / 2
          const dist = Math.abs(elCentre - centre)
          if (dist < bestDist) {
            bestDist = dist
            best = i
          }
        })
        setActive(best)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative bg-rcb-bg overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 rcb-noise opacity-25 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-14 sm:pt-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <motion.p
              initial={{ y: 14, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs tracking-[0.45em] uppercase text-rcb-red"
            >
              Reviews · From the wall
            </motion.p>
            <motion.h2
              initial={{ y: 22, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
              className="mt-3 font-display tracking-tight text-white leading-[0.92]"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.25rem)' }}
            >
              500+ frames. <span className="text-rcb-red">4.9 stars.</span>
            </motion.h2>
            <p className="mt-4 max-w-xl text-rcb-muted leading-relaxed">
              Real notes from real customers — verified buyers, real names withheld for privacy and used with permission.
            </p>
          </div>

          {/* Desktop controls */}
          <div className="hidden sm:flex items-center gap-2 self-end">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="
                inline-flex w-11 h-11 items-center justify-center rounded-full
                border border-white/15 bg-white/[0.02]
                text-white/80 hover:text-white hover:border-rcb-red transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red
              "
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="
                inline-flex w-11 h-11 items-center justify-center rounded-full
                border border-white/15 bg-white/[0.02]
                text-white/80 hover:text-white hover:border-rcb-red transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red
              "
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="
          relative mt-10 sm:mt-14
          flex gap-5 sm:gap-6 overflow-x-auto
          snap-x snap-mandatory
          px-5 sm:px-8 pb-2
          [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
        aria-roledescription="carousel"
        aria-label="Customer reviews"
      >
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard
            key={t.id}
            t={t}
            gradient={AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]}
            isActive={i === active}
          />
        ))}
        {/* Trailing spacer so the last card can snap-centre */}
        <div className="flex-shrink-0 w-4 sm:w-8" aria-hidden />
      </div>

      {/* Dots */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-12 sm:pb-20 mt-6 flex items-center justify-center gap-2.5">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setActive(i)
              scrollToIndex(i)
            }}
            aria-label={`Go to review ${i + 1} of ${total}`}
            className={`
              h-1.5 rounded-full transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red
              ${i === active ? 'w-8 bg-rcb-red' : 'w-1.5 bg-white/20 hover:bg-white/40'}
            `}
          />
        ))}
      </div>
    </section>
  )
}
