import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Package, X } from 'lucide-react'
import { SHIPMENTS, type Shipment } from '../data/brand'
import { EASE } from '../lib/motion'

const APPEAR_DELAY_MS = 7000
const ROTATE_MS = 5500
const STORAGE_KEY = 'rcb_ticker_dismissed_v1'

function formatAgo(min: number): string {
  if (min < 1) return 'just now'
  if (min < 60) return `${min} min ago`
  const hours = Math.round(min / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.round(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

function pickShipment(index: number): Shipment {
  return SHIPMENTS[index % SHIPMENTS.length]
}

export function LiveTicker() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [index, setIndex] = useState(0)

  // Check session-state on mount.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') {
        setDismissed(true)
      }
    } catch {
      // sessionStorage can throw in privacy / SSR modes — fail open.
    }
    setMounted(true)
  }, [])

  // Delayed appear.
  useEffect(() => {
    if (!mounted || dismissed) return
    const id = window.setTimeout(() => setVisible(true), APPEAR_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [mounted, dismissed])

  // Rotate entries.
  useEffect(() => {
    if (!visible) return
    const id = window.setInterval(
      () => setIndex((prev) => (prev + 1) % SHIPMENTS.length),
      ROTATE_MS
    )
    return () => window.clearInterval(id)
  }, [visible])

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  if (!mounted || dismissed) return null

  const shipment = pickShipment(index)

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="live-ticker"
          initial={{ x: -40, y: 20, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          aria-live="polite"
          aria-label="Recent shipment"
          style={{
            bottom: 'max(1rem, env(safe-area-inset-bottom))',
          }}
          className="
            fixed left-3 sm:left-6 z-[100]
            right-3 sm:right-auto
            sm:max-w-sm
            rounded-2xl border border-white/10 bg-rcb-bg/85
            backdrop-blur-xl
            shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)]
          "
        >
          <div className="flex items-start gap-3 p-3.5 sm:p-4">
            <div className="relative flex-shrink-0">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-rcb-red/15 text-rcb-red">
                <Package className="w-4 h-4" />
              </span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.3em] uppercase text-rcb-muted">
                Just shipped
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={shipment.city + shipment.product}
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -6, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mt-1"
                >
                  <p className="text-sm text-white leading-snug">
                    <span className="font-semibold">{shipment.product}</span>
                    <span className="text-rcb-muted"> to </span>
                    <span className="font-semibold">{shipment.city}</span>
                  </p>
                  <p className="text-[11px] text-rcb-muted mt-0.5">
                    {formatAgo(shipment.minutesAgo)} · verified order
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss shipment notifications"
              className="
                flex-shrink-0 inline-flex w-9 h-9 -m-1.5 items-center justify-center rounded-full
                text-rcb-muted hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red
              "
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress bar for next rotation */}
          <div className="h-0.5 bg-white/5 overflow-hidden rounded-b-2xl">
            <motion.div
              key={index}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
              className="h-full bg-rcb-red/70"
            />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
