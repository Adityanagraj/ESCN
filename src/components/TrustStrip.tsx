import { BadgeCheck, Lock, ShieldCheck, Undo2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { TRUST_BADGES } from '../data/brand'
import { EASE } from '../lib/motion'

const ICONS = [BadgeCheck, Lock, ShieldCheck, Undo2]

export function TrustStrip() {
  return (
    <section
      aria-label="Why customers trust PLAY BOLD"
      className="relative bg-rcb-bg border-y border-white/5"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TRUST_BADGES.map((b, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={b.title}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="
                  group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6
                  hover:bg-white/[0.04] hover:border-rcb-red/40 transition-colors
                "
              >
                <div className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-rcb-red/15 text-rcb-red mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-display text-lg sm:text-xl tracking-wide text-white">
                  {b.title}
                </h4>
                <p className="mt-2 text-sm text-rcb-muted leading-relaxed">
                  {b.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
