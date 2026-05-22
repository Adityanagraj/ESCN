import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { HERO_IMAGE } from '../data/brand'
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
  const scrollRotY = useTransform(scrollYProgress, [0, 1], [0, -10])
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  // Mouse position, normalised to -1..1 around section centre.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.7 })
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.7 })

  // Figure: meaningful travel + real 3D tilt.
  const figX = useTransform(sx, [-1, 1], ['-4%', '4%'])
  const figY = useTransform(sy, [-1, 1], ['-3%', '3%'])
  const figRotY = useTransform(sx, [-1, 1], [-9, 9])
  const figRotX = useTransform(sy, [-1, 1], [6, -6])

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
      aria-label="PLAY BOLD hero"
      className="
        rcb-section relative overflow-hidden bg-rcb-bg
        flex items-end sm:items-center justify-center
        pt-20 pb-16 sm:pt-0 sm:pb-0
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
        Image container.
        Fixed footprint (capped by both viewport width and viewport height),
        with the actual <img> set to w-full h-full + object-contain.
        => image NEVER crops. It just letterboxes inside its box.
      */}
      <motion.div
        className="
          relative z-10
          w-[96vw] h-[68dvh]
          sm:w-[80vw] sm:h-[80dvh]
          md:w-[68vw] md:h-[86dvh]
          lg:w-[58vw] lg:h-[90dvh]
          max-w-[1100px]
        "
        style={
          interactive
            ? {
                y: scrollY,
                scale: scrollScale,
                rotateY: scrollRotY,
                transformStyle: 'preserve-3d',
                transformPerspective: 1400,
              }
            : { transformStyle: 'preserve-3d', transformPerspective: 1400 }
        }
      >
        <motion.img
          src={HERO_IMAGE}
          alt="Virat Kohli celebrating with the IPL trophy"
          draggable={false}
          decoding="async"
          loading="eager"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          style={
            interactive
              ? {
                  x: figX,
                  y: figY,
                  rotateX: figRotX,
                  rotateY: figRotY,
                  willChange: 'transform',
                }
              : undefined
          }
          className="
            absolute inset-0 w-full h-full object-contain
            pointer-events-none select-none
            drop-shadow-[0_40px_80px_rgba(236,28,36,0.45)]
          "
        />
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
