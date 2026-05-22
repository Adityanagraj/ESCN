import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Check, ShieldCheck, Truck } from 'lucide-react'
import { PRODUCTS, type Product } from '../data/brand'
import { EASE } from '../lib/motion'
import { MagneticButton } from './MagneticButton'

type Props = {
  product: Product
  index: number
}

const easeOut = EASE

function ProductRow({ product, index }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { amount: 0.25, once: true })
  const reverse = index % 2 === 1

  return (
    <div
      ref={ref}
      className={[
        'relative grid items-center gap-10 lg:gap-16',
        'grid-cols-1 lg:grid-cols-12',
        'py-14 sm:py-24 lg:py-28',
      ].join(' ')}
    >
      {/* Chapter marker */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3 text-rcb-muted text-xs tracking-[0.4em] uppercase">
        <span className="font-display text-rcb-red text-xl">
          CH · {String(index + 1).padStart(2, '0')}
        </span>
        / 03
      </div>

      {/* Image column */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: easeOut }}
        className={[
          'relative lg:col-span-7',
          reverse ? 'lg:order-2' : 'lg:order-1',
        ].join(' ')}
      >
        <div className="relative">
          <div
            className="absolute -inset-10 rcb-red-glow opacity-70 pointer-events-none"
            aria-hidden
          />
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-rcb-surface">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-6 sm:p-8"
              draggable={false}
            />
            {/* Numbered edition tag */}
            <div className="absolute top-5 right-5 rounded-full border border-rcb-gold/50 bg-black/40 backdrop-blur px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase text-rcb-gold">
              {product.specs.find((s) => s.label === 'Edition')?.value ?? 'Limited'}
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[11px] text-white/70 uppercase tracking-[0.25em]">
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                In stock
              </span>
              <span className="hidden sm:inline">Studio render · actual frame may vary</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Text column */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.0, ease: easeOut, delay: 0.1 }}
        className={[
          'relative lg:col-span-5 px-1 sm:px-2',
          reverse ? 'lg:order-1' : 'lg:order-2',
        ].join(' ')}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-rcb-red">
          Chapter {String(index + 1).padStart(2, '0')} · {product.chapter}
        </p>
        <h3
          className="mt-3 font-display leading-[0.95] tracking-tight text-white"
          style={{ fontSize: 'clamp(2.25rem, 6vw, 4.25rem)' }}
        >
          {product.name}
        </h3>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-rcb-muted">
          {product.subtitle}
        </p>

        <p className="mt-6 font-display tracking-wide text-rcb-gold text-lg sm:text-xl leading-snug">
          &ldquo;{product.tagline}&rdquo;
        </p>

        <p className="mt-6 text-base text-white/85 leading-relaxed max-w-xl">
          {product.hook}
        </p>

        <p className="mt-4 text-sm text-rcb-muted leading-relaxed max-w-xl">
          {product.description}
        </p>

        {/* Highlights */}
        <ul className="mt-7 grid gap-3">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-sm sm:text-base text-white/85">
              <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-rcb-red/20 text-rcb-red">
                <Check className="w-3.5 h-3.5" />
              </span>
              {h}
            </li>
          ))}
        </ul>

        {/* Specs (collapsible feel via simple list) */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-[10px] tracking-[0.35em] uppercase text-rcb-muted">
            Specifications
          </p>
          <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {product.specs.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-3">
                <dt className="text-rcb-muted">{s.label}</dt>
                <dd className="text-white/90 text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Price + CTA */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-rcb-muted">
              Price
            </p>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-display text-3xl sm:text-4xl text-white tracking-tight">
                {product.price}
              </span>
              {product.compareAt && (
                <span className="text-rcb-muted line-through text-base">
                  {product.compareAt}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-rcb-muted">
              Inclusive of GST. EMI from TODO: ₹ 1,499/mo.
            </p>
          </div>

          <MagneticButton
            href={product.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.32}
            reach={1.6}
            className="
              group inline-flex items-center justify-center gap-2
              rounded-full bg-rcb-red px-6 py-4 sm:px-7
              text-sm sm:text-base font-semibold text-white
              shadow-[0_18px_40px_-12px_rgba(236,28,36,0.7)]
              hover:bg-rcb-red-deep transition-colors
              focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red focus-visible:ring-offset-2 focus-visible:ring-offset-rcb-bg
            "
          >
            Shop {product.name.split(' ')[0]}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>

        {/* Mini trust line */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-rcb-muted">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-rcb-gold" />
            Numbered + certified
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-rcb-gold" />
            Ships in 48 hr · insured
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export function ProductShowcase() {
  return (
    <section id="shop" className="relative bg-rcb-bg">
      <div className="absolute inset-0 rcb-noise opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-14 sm:pt-28">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-xs tracking-[0.45em] uppercase text-rcb-red"
        >
          The Collection · 03 Frames
        </motion.p>
        <motion.h2
          initial={{ y: 26, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.05 }}
          className="mt-4 font-display tracking-tight text-white leading-[0.9]"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)' }}
        >
          OWN THE <span className="text-rcb-red">LEGACY</span>
        </motion.h2>
        <p className="mt-5 max-w-2xl text-rcb-muted leading-relaxed">
          Three pieces. Each one numbered, signed off, and built by hand in our
          Bengaluru studio. Pick the one that lives on your wall for the next
          twenty years.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {PRODUCTS.map((product, i) => (
          <ProductRow key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
