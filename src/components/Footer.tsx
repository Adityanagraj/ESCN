import { useState } from 'react'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { BRAND, PRODUCTS } from '../data/brand'
import { MagneticButton } from './MagneticButton'
import { buildOrderInquiryUrl, buildSupportUrl } from '../lib/whatsapp'

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: wire to your newsletter provider (Klaviyo / Mailchimp / Beehiiv).
    setDone(true)
    setEmail('')
    window.setTimeout(() => setDone(false), 4000)
  }

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer id="contact" className="relative bg-rcb-bg border-t border-white/10">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.45em] uppercase text-rcb-red">
              Stay on the wall
            </p>
            <h3
              className="mt-3 font-display tracking-tight text-white leading-[0.95]"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
            >
              Early drops. Restock alerts. <br className="hidden sm:block" />
              <span className="text-rcb-red">No spam, ever.</span>
            </h3>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-5 flex flex-col sm:flex-row gap-3 w-full"
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="
                flex-1 rounded-full bg-white/[0.04] border border-white/15
                px-5 py-3.5 text-white placeholder:text-rcb-muted
                focus:outline-none focus:border-rcb-red transition-colors
              "
            />
            <MagneticButton
              type="submit"
              strength={0.3}
              reach={1.6}
              className="
                inline-flex items-center justify-center gap-2
                rounded-full bg-rcb-red px-6 py-3.5
                text-sm font-semibold text-white hover:bg-rcb-red-deep transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red focus-visible:ring-offset-2 focus-visible:ring-offset-rcb-bg
              "
              aria-label={done ? 'Thanks for subscribing' : 'Subscribe to newsletter'}
            >
              {done ? 'Thanks!' : 'Subscribe'}
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-10 sm:gap-10">
        {/* Brand */}
        <div className="sm:col-span-3 lg:col-span-5">
          <div className="flex items-center">
            <img
              src="/brand/logo.png"
              alt={BRAND.name}
              width={240}
              height={240}
              decoding="async"
              loading="lazy"
              className="h-16 sm:h-20 w-auto select-none drop-shadow-[0_4px_20px_rgba(236,28,36,0.35)]"
              draggable={false}
            />
          </div>
          <p className="mt-4 text-sm text-rcb-muted max-w-md leading-relaxed">
            {BRAND.tagline} — premium, hand-finished RCB tribute frames, built
            in {BRAND.city} since {BRAND.established}.
          </p>

          <div className="mt-6 space-y-2 text-sm text-rcb-muted">
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="inline-flex items-center gap-2 hover:text-rcb-red transition-colors"
            >
              <Mail className="w-4 h-4 text-rcb-gold" /> {BRAND.supportEmail}
            </a>
            <a
              href={buildSupportUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-rcb-red transition-colors"
            >
              <Phone className="w-4 h-4 text-rcb-gold" /> {BRAND.supportPhone}
            </a>
            <p className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rcb-gold" /> Indiranagar Studio, Bengaluru 560038
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={BRAND.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex w-11 h-11 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-white hover:border-rcb-red active:scale-95 transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div className="lg:col-span-3">
          <p className="text-[10px] tracking-[0.35em] uppercase text-rcb-muted">Shop</p>
          <ul className="mt-3 sm:mt-4 -mx-2 sm:mx-0">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <a
                  href={buildOrderInquiryUrl(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center min-h-[44px] px-2 sm:px-0 text-sm text-white/85 hover:text-rcb-red active:text-rcb-red transition-colors"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="lg:col-span-2">
          <p className="text-[10px] tracking-[0.35em] uppercase text-rcb-muted">Help</p>
          <ul className="mt-3 sm:mt-4 -mx-2 sm:mx-0">
            <li><a className="flex items-center min-h-[44px] px-2 sm:px-0 text-sm text-white/85 hover:text-rcb-red active:text-rcb-red transition-colors" href="#faq" onClick={go('#faq')}>FAQ</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="lg:col-span-2">
          <p className="text-[10px] tracking-[0.35em] uppercase text-rcb-muted">Brand</p>
          <ul className="mt-3 sm:mt-4 -mx-2 sm:mx-0">
            <li><a className="flex items-center min-h-[44px] px-2 sm:px-0 text-sm text-white/85 hover:text-rcb-red active:text-rcb-red transition-colors" href="#about" onClick={go('#about')}>Our story</a></li>
          </ul>
        </div>
      </div>

      {/* Trust seals + copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rcb-muted text-center sm:text-left">
          <p className="leading-relaxed">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            <br className="sm:hidden" />
            <span className="sm:ml-1">Not affiliated with Royal Challengers Bengaluru or the BCCI.</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 tracking-[0.25em] uppercase">
            <span>WhatsApp orders</span>
            <span className="w-px h-3 bg-white/15" />
            <span>UPI</span>
            <span className="w-px h-3 bg-white/15" />
            <span>Bank transfer</span>
            <span className="w-px h-3 bg-white/15" />
            <span>Partial COD</span>
            <span className="w-px h-3 bg-white/15" />
            <span>Delhivery</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
