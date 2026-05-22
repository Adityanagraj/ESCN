import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { COMPARE_ROWS, PRODUCTS } from '../data/brand'
import { EASE } from '../lib/motion'

type ProductId = 'king-kohli' | 'champions' | 'play-bold'

const SHORT_NAMES: Record<ProductId, string> = {
  'king-kohli': 'KING KOHLI',
  'champions': 'EE SALA',
  'play-bold': 'PLAY BOLD',
}

export function CompareFrames() {
  const [highlight, setHighlight] = useState<ProductId | null>('champions')

  return (
    <section
      id="compare"
      className="relative bg-rcb-bg border-b border-white/5"
    >
      <div className="absolute inset-0 rcb-noise opacity-20 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <motion.p
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-xs tracking-[0.45em] uppercase text-rcb-red"
        >
          Pick yours
        </motion.p>
        <motion.h2
          initial={{ y: 22, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          className="mt-3 font-display tracking-tight text-white leading-[0.92]"
          style={{ fontSize: 'clamp(2rem, 6vw, 4.25rem)' }}
        >
          Three frames. <span className="text-rcb-red">One wall.</span>
        </motion.h2>
        <p className="mt-5 max-w-2xl text-rcb-muted leading-relaxed">
          Tap any column to highlight it — pick the frame that fits your wall,
          your story, and your roar.
        </p>

        {/* The table */}
        <div className="mt-12 sm:mt-16 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
          <div
            role="table"
            aria-label="Compare PLAY BOLD frames"
            className="
              min-w-[760px]
              grid
              grid-cols-[160px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]
              sm:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]
            "
          >
            {/* Header row */}
            <div role="row" className="contents">
              <div
                role="columnheader"
                className="sticky left-0 z-10 bg-rcb-bg/95 backdrop-blur-sm px-5 py-5 text-[10px] tracking-[0.35em] uppercase text-rcb-muted border-b border-white/10"
              >
                Specification
              </div>
              {PRODUCTS.map((p) => {
                const id = p.id as ProductId
                const active = highlight === id
                return (
                  <button
                    key={id}
                    role="columnheader"
                    type="button"
                    onClick={() => setHighlight(active ? null : id)}
                    aria-pressed={active}
                    className={`
                      relative px-4 sm:px-5 py-5 text-left
                      border-b transition-colors
                      ${active ? 'bg-rcb-red/[0.07] border-rcb-red/60' : 'border-white/10 hover:bg-white/[0.02]'}
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red
                    `}
                  >
                    <span className={`block text-[10px] tracking-[0.35em] uppercase ${active ? 'text-rcb-red' : 'text-rcb-muted'}`}>
                      Frame {String(PRODUCTS.indexOf(p) + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-1.5 block font-display text-lg sm:text-xl text-white tracking-tight">
                      {SHORT_NAMES[id]}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="compare-pill"
                        className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-rcb-red px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase text-white"
                      >
                        <Check className="w-2.5 h-2.5" />
                        Picked
                      </motion.span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Body rows */}
            {COMPARE_ROWS.map((row, rowIdx) => (
              <div role="row" key={row.label} className="contents">
                <div
                  role="rowheader"
                  className={`
                    sticky left-0 z-10 bg-rcb-bg/95 backdrop-blur-sm
                    px-5 py-5 text-sm text-rcb-muted
                    ${rowIdx === COMPARE_ROWS.length - 1 ? '' : 'border-b border-white/5'}
                  `}
                >
                  {row.label}
                </div>
                {PRODUCTS.map((p) => {
                  const id = p.id as ProductId
                  const v = row.values[id]
                  const active = highlight === id
                  const isPrice = row.label === 'Price'
                  return (
                    <div
                      role="cell"
                      key={id}
                      className={`
                        relative px-4 sm:px-5 py-5
                        ${rowIdx === COMPARE_ROWS.length - 1 ? '' : 'border-b border-white/5'}
                        ${active ? 'bg-rcb-red/[0.04]' : ''}
                        transition-colors
                      `}
                    >
                      <div className={`text-sm sm:text-base ${isPrice ? 'font-display text-lg sm:text-xl tracking-tight' : ''} text-white`}>
                        {v.text}
                      </div>
                      {v.hint && (
                        <div className="mt-1 text-[11px] text-rcb-muted leading-relaxed">
                          {v.hint}
                        </div>
                      )}
                      {v.winner && (
                        <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-rcb-gold/40 bg-rcb-gold/[0.06] px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase text-rcb-gold">
                          <Sparkles className="w-2.5 h-2.5" />
                          Best in class
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}

            {/* Footer row with CTAs */}
            <div role="row" className="contents">
              <div
                role="rowheader"
                className="sticky left-0 z-10 bg-rcb-bg/95 backdrop-blur-sm px-5 py-5 text-[10px] tracking-[0.35em] uppercase text-rcb-muted border-t border-white/10"
              >
                Take it home
              </div>
              {PRODUCTS.map((p) => (
                <div
                  role="cell"
                  key={p.id}
                  className="px-4 sm:px-5 py-5 border-t border-white/10"
                >
                  <a
                    href={p.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group inline-flex items-center justify-center gap-2 w-full
                      rounded-full bg-rcb-red px-4 py-3
                      text-sm font-semibold text-white
                      hover:bg-rcb-red-deep transition-colors
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red focus-visible:ring-offset-2 focus-visible:ring-offset-rcb-bg
                    "
                  >
                    Shop {SHORT_NAMES[p.id as ProductId].split(' ')[0]}
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 sm:hidden text-[11px] text-rcb-muted text-center">
          ← Scroll horizontally to see all frames →
        </p>
      </div>
    </section>
  )
}
