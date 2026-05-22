import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

const METRICS = [
  { k: '4.9★', v: 'Avg. customer rating' },
  { k: '500+', v: 'Frames shipped' },
  { k: '48 hr', v: 'Dispatch window' },
  { k: '100%', v: 'Transit insured' },
]

export function TrustBand() {
  return (
    <section
      aria-label="Trust metrics"
      className="relative bg-rcb-bg border-b border-white/5"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 text-center">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.v}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
            className="flex flex-col items-center"
          >
            <span className="font-display text-2xl sm:text-3xl text-white tracking-tight inline-flex items-center gap-1.5">
              {m.k.includes('★') ? (
                <>
                  {m.k.replace('★', '')}
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-rcb-gold text-rcb-gold" />
                </>
              ) : (
                m.k
              )}
            </span>
            <span className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-rcb-muted">
              {m.v}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
