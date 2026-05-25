import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown, ShieldCheck, Truck } from 'lucide-react'
import { PRODUCTS, type Product } from '../data/brand'
import { EASE } from '../lib/motion'
import { MagneticButton } from './MagneticButton'
import { ProductGallery } from './ProductGallery'
import { buildOrderInquiryUrl } from '../lib/whatsapp'

type Props = {
  product: Product
  index: number
}

const easeOut = EASE

/**
 * Glassy collapsible that hides the long-form story + specs behind a single
 * tap, keeping the visible card to name / chapter / one-liner only.
 *
 * Default-open for the first product so the pattern is discoverable on land;
 * subsequent products stay collapsed for a clean scroll.
 */
function ProductDetailsAccordion({
  product,
  defaultOpen = false,
}: {
  product: Product
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = `product-details-${product.id}`

  return (
    <div className="mt-7 relative">
      {/* Soft outer glow so the glass plate feels lit, not floating */}
      <div
        aria-hidden
        className={[
          'absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500',
          'bg-gradient-to-br from-rcb-red/25 via-transparent to-rcb-gold/15 blur-md',
          open ? 'opacity-80' : 'opacity-40',
        ].join(' ')}
      />
      <div
        className="
          relative rounded-2xl overflow-hidden
          border border-white/15
          bg-white/[0.045] backdrop-blur-xl
          shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]
        "
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="
            w-full min-h-[56px]
            flex items-center justify-between gap-4
            px-5 py-4 text-left
            transition-colors hover:bg-white/[0.04]
            focus:outline-none
            focus-visible:ring-2 focus-visible:ring-rcb-red
            focus-visible:ring-offset-2 focus-visible:ring-offset-rcb-bg
          "
        >
          <span className="flex items-center gap-3">
            <span
              className={[
                'w-1.5 h-1.5 rounded-full transition-all duration-300',
                open
                  ? 'bg-rcb-red shadow-[0_0_10px_rgba(236,28,36,0.85)]'
                  : 'bg-rcb-muted',
              ].join(' ')}
            />
            <span className="text-[11px] tracking-[0.35em] uppercase text-white/85">
              {open ? 'Hide details' : 'The full story · specs'}
            </span>
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="text-white/70"
            aria-hidden
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: easeOut }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-6 pt-1 space-y-6 border-t border-white/10">
                <div className="pt-5 space-y-4">
                  <p className="text-base text-white/85 leading-relaxed">
                    {product.hook}
                  </p>
                  <p className="text-sm text-rcb-muted leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-rcb-red mb-3">
                    What&rsquo;s inside the frame
                  </p>
                  <ul className="grid gap-3">
                    {product.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-sm text-white/85"
                      >
                        <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-rcb-red/20 text-rcb-red shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-rcb-red mb-3">
                    Specifications
                  </p>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 text-sm">
                    {product.specs.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-baseline justify-between gap-3 py-2 border-b border-white/5 last:border-0 sm:last:border-b sm:[&:nth-last-child(-n+2)]:border-0"
                      >
                        <dt className="text-rcb-muted">{s.label}</dt>
                        <dd className="text-white/90 text-right">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

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
        <ProductGallery
          images={product.images}
          alt={product.name}
          editionTag={
            product.specs.find((s) => s.label === 'Edition')?.value ?? 'Limited'
          }
        />
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

        <p className="mt-6 font-display tracking-wide text-rcb-gold text-lg sm:text-xl leading-snug max-w-xl">
          &ldquo;{product.tagline}&rdquo;
        </p>

        <ProductDetailsAccordion product={product} defaultOpen={index === 0} />

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
            href={buildOrderInquiryUrl(product)}
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
