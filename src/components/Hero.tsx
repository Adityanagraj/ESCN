import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { HERO_IMAGE, HERO_IMAGE_MOBILE } from '../data/brand'
import { EASE } from '../lib/motion'
import { MagneticButton } from './MagneticButton'

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const [isCoarse, setIsCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    const update = () => setIsCoarse(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const interactive = !reduceMotion && !isCoarse

  // Scroll-driven layer: as the hero scrolls out of view, Kohli subtly
  // rotates and lifts — like he's tracking you as you scroll away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  // Mouse position, normalised to -1..1 around section centre.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.7 })
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.7 })

  // Banner: subtle parallax drift only — no 3D rotation, which would distort
  // the baked-in typography on the artwork.
  const figX = useTransform(sx, [-1, 1], ['-2.5%', '2.5%'])
  const figY = useTransform(sy, [-1, 1], ['-2%', '2%'])

  // Glow drifts opposite to the figure to fake depth.
  const glowX = useTransform(sx, [-1, 1], ['3.5%', '-3.5%'])
  const glowY = useTransform(sy, [-1, 1], ['2.5%', '-2.5%'])

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    mx.set(Math.max(-1, Math.min(1, nx)))
    my.set(Math.max(-1, Math.min(1, ny)))
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label="ShopforMost X PlayBold hero"
      className="
        rcb-section relative overflow-hidden bg-rcb-bg
        flex items-center justify-center
        pt-24 pb-20 sm:pt-20 sm:pb-16
      "
      style={{ perspective: 1400 }}
    >
      {/* Ambient red glow (opposite parallax for depth) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={interactive ? { x: glowX, y: glowY } : undefined}
      >
        <div
          className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[140vmin] h-[140vmin] rcb-red-glow
          "
        />
      </motion.div>

      {/* Grain */}
      <div className="absolute inset-0 rcb-noise opacity-35 pointer-events-none" aria-hidden />

      {/* Floor fade so the figure rises out of pure black */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 sm:h-48 bg-gradient-to-b from-transparent to-rcb-bg pointer-events-none"
      />

      {/*
        Banner container.
        The hero art is a pair of pre-composed banners with baked-in typography:
        a tall portrait (485×1024) for mobile and a landscape (1024×682) for
        tablet/desktop. The <picture> below swaps the source at the 640px (sm)
        breakpoint, and the container's aspect ratio + sizing flip to match so
        each banner fills its box edge-to-edge with no crop and no letterbox.
        - Mobile: height-driven (fills the vertical space), aspect 485/1024.
        - sm+:    width-driven, aspect 1024/682, capped on huge screens.
      */}
      <motion.div
        className="
          relative z-10
          h-[74dvh] w-auto max-w-[94vw] aspect-[485/1024]
          sm:h-auto sm:w-[88vw] sm:max-w-[1200px] sm:aspect-[1024/682]
          md:w-[80vw] lg:w-[72vw]
        "
        style={
          interactive
            ? { y: scrollY, scale: scrollScale }
            : undefined
        }
      >
        <picture className="absolute inset-0 w-full h-full">
          <source media="(min-width: 640px)" srcSet={HERO_IMAGE} />
          <motion.img
            src={HERO_IMAGE_MOBILE}
            alt="ShopforMost X PlayBold — your memories, framed forever. Collectible RCB frames that keep the legacy alive."
            draggable={false}
            decoding="async"
            loading="eager"
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
            style={
              interactive
                ? { x: figX, y: figY, willChange: 'transform' }
                : undefined
            }
            className="
              w-full h-full object-contain
              rounded-xl sm:rounded-2xl
              pointer-events-none select-none
              drop-shadow-[0_30px_70px_rgba(236,28,36,0.30)]
            "
          />
        </picture>
      </motion.div>

      {/* Scroll cue — magnetic, never crosses the figure */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20"
      >
        <MagneticButton
          href="#story"
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById('story')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          aria-label="Scroll to story"
          strength={0.4}
          reach={2}
          className="
            flex flex-col items-center gap-2
            text-[10px] tracking-[0.45em] uppercase text-rcb-muted
            hover:text-white transition-colors
            focus:outline-none focus-visible:text-white rounded
            px-6 py-2
          "
        >
          <span className="flex flex-col items-center gap-2">
            <span>Scroll</span>
            <span className="block w-px h-10 bg-gradient-to-b from-rcb-muted to-transparent" />
          </span>
        </MagneticButton>
      </motion.div>
    </section>
  )
}
