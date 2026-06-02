import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

const LINKS = [
  { label: 'Shop', href: '#shop' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      className="fixed top-3 sm:top-5 left-0 right-0 z-[120] flex justify-center px-3 sm:px-6"
    >
      <nav
        className={[
          'w-full max-w-6xl flex items-center justify-between',
          'rounded-full border border-white/10 px-3 sm:px-5 py-2 sm:py-2.5',
          'backdrop-blur-xl transition-colors duration-300',
          scrolled ? 'bg-black/70' : 'bg-black/40',
        ].join(' ')}
        aria-label="Primary"
      >
        <a
          href="#hero"
          onClick={go('#hero')}
          className="flex items-center gap-2 pl-1 pr-3"
          aria-label="ShopforMost X PlayBold home"
        >
          <img
            src="/brand/logo.png"
            alt="ShopforMost X PlayBold"
            width={144}
            height={144}
            decoding="async"
            className="h-9 sm:h-10 w-auto select-none drop-shadow-[0_2px_8px_rgba(236,28,36,0.35)]"
            draggable={false}
          />
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={go(link.href)}
                className="px-4 py-2 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#shop"
            onClick={go('#shop')}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-rcb-red px-4 py-2 text-sm font-semibold text-white hover:bg-rcb-red-deep transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop now or Never
          </a>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/5 text-white border border-white/10 active:scale-95 transition-transform"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden absolute top-[72px] left-3 right-3 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-xl p-4"
        >
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={go(link.href)}
                  className="flex items-center min-h-[48px] px-4 rounded-xl text-base text-white/85 hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#shop"
            onClick={go('#shop')}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rcb-red min-h-[48px] px-4 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop now or Never
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
