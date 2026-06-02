import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { EASE } from '../lib/motion'
import { useAnthem } from '../lib/useAnthem'

type LoadingSplashProps = {
  onDone: () => void
}

export function LoadingSplash({ onDone }: LoadingSplashProps) {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)
  const { enabled: anthemOn, toggle: toggleAnthem } = useAnthem()

  useEffect(() => {
    const start = performance.now()
    const duration = 2000
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        window.setTimeout(() => {
          setHidden(true)
          window.setTimeout(onDone, 600)
        }, 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.6, 0, 0.3, 1] as [number, number, number, number] } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-rcb-bg"
        >
          <div className="absolute inset-0 rcb-noise pointer-events-none opacity-40" />
          <div className="absolute inset-0 rcb-red-glow opacity-50 pointer-events-none" />

          {/* Sound toggle — top right, deliberately understated so it doesn't
              compete with the percentage counter. Once a returning visitor has
              opted in, the audio autoplays and this button still lets them mute. */}
          <motion.button
            type="button"
            onClick={toggleAnthem}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
            whileTap={{ scale: 0.94 }}
            aria-label={anthemOn ? 'Mute RCB anthem' : 'Play RCB anthem'}
            aria-pressed={anthemOn}
            className="
              absolute top-5 right-5 sm:top-7 sm:right-7 z-10
              inline-flex items-center gap-2
              rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md
              pl-3 pr-4 sm:pl-3.5 sm:pr-5 h-11
              text-[10px] sm:text-[11px] tracking-[0.35em] uppercase
              text-white/80 hover:text-white hover:border-rcb-red/70
              transition-colors
              focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red
            "
          >
            <span className="relative inline-flex items-center justify-center w-5 h-5">
              {anthemOn ? (
                <Volume2 className="w-4 h-4 text-rcb-red" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              {anthemOn && (
                <span className="absolute inset-0 inline-flex h-full w-full rounded-full bg-rcb-red/40 animate-ping" />
              )}
            </span>
            <span>{anthemOn ? 'Anthem on' : 'Tap for sound'}</span>
          </motion.button>

          <div className="relative flex flex-col items-center gap-10 px-6 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.45em] text-rcb-muted uppercase"
            >
              <span className="inline-block w-8 h-px bg-rcb-red" />
              For The Loyal Fans Who Never Left
              <span className="inline-block w-8 h-px bg-rcb-red" />
            </motion.div>

            <div className="relative">
              <motion.span
                key={count}
                initial={{ y: 8, opacity: 0.4 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="font-display text-[22vw] sm:text-[14vw] md:text-[10rem] leading-[0.85] tracking-tight"
                style={{ color: '#f5f5f5' }}
              >
                {String(count).padStart(3, '0')}
              </motion.span>
              <span className="absolute -right-6 sm:-right-10 top-2 sm:top-4 text-rcb-red font-display text-2xl sm:text-4xl">
                %
              </span>
            </div>

            <div className="w-[min(80vw,420px)] h-[2px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-rcb-red"
                style={{ width: `${count}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <img
              src="/brand/logo.png"
              alt="ShopforMost X PlayBold"
              width={420}
              height={420}
              decoding="async"
              fetchPriority="high"
              className="h-24 sm:h-32 w-auto select-none drop-shadow-[0_4px_24px_rgba(236,28,36,0.45)]"
              draggable={false}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
