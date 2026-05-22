import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { FAQ } from '../data/brand'
import { EASE } from '../lib/motion'
import { useInteractive } from '../lib/useInteractive'

type Item = { q: string; a: string }

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: Item
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLLIElement | null>(null)
  const interactive = useInteractive()

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 110, damping: 22, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 110, damping: 22, mass: 0.4 })

  const sxPct = useTransform(sx, (v) => `${v * 100}%`)
  const syPct = useTransform(sy, (v) => `${v * 100}%`)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${sxPct} ${syPct}, rgba(236,28,36,0.18), transparent 55%)`
  const borderGlow = useMotionTemplate`radial-gradient(220px circle at ${sxPct} ${syPct}, rgba(236,28,36,0.55), transparent 60%)`

  const onMove = (e: React.MouseEvent<HTMLLIElement>) => {
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
    <motion.li
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.05 }}
      className="group relative isolate"
    >
      {/* Cursor-following spotlight inside the item (only when open or hovered) */}
      {interactive && (
        <>
          <motion.div
            aria-hidden
            className="
              pointer-events-none absolute inset-0
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            "
            style={{ background: glow }}
          />
          <motion.div
            aria-hidden
            className="
              pointer-events-none absolute inset-0
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
        </>
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="
          relative w-full flex items-start gap-4 text-left
          px-5 sm:px-7 py-5 sm:py-6
          transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red
        "
      >
        <span className="font-display text-rcb-red text-sm sm:text-base pt-1 tracking-widest">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 text-base sm:text-lg text-white font-medium">
          {item.q}
        </span>
        <span
          className={`
            mt-1 inline-flex w-8 h-8 items-center justify-center rounded-full
            border transition-colors
            ${isOpen ? 'border-rcb-red bg-rcb-red text-white' : 'border-white/15 text-white/80'}
          `}
          aria-hidden
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative overflow-hidden"
          >
            <p className="px-5 sm:px-7 pb-6 pl-12 sm:pl-16 text-rcb-muted leading-relaxed max-w-3xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-rcb-bg">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-28">
        <div className="text-center">
          <p className="text-xs tracking-[0.45em] uppercase text-rcb-red">
            Questions, answered honestly
          </p>
          <h2
            className="mt-4 font-display tracking-tight text-white leading-[0.95]"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            Before you buy.
          </h2>
        </div>

        <ul className="mt-12 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {FAQ.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-rcb-muted">
          Still have questions? Write to{' '}
          <a className="text-white underline underline-offset-4 hover:text-rcb-red transition-colors" href="#contact">
            TODO: care@playboldframes.com
          </a>{' '}
          — we reply within 12 hours, every day.
        </p>
      </div>
    </section>
  )
}
