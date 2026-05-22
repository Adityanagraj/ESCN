import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion'

type LoadingSplashProps = {
  onDone: () => void
}

export function LoadingSplash({ onDone }: LoadingSplashProps) {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1800
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

          <div className="relative flex flex-col items-center gap-10 px-6 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.45em] text-rcb-muted uppercase"
            >
              <span className="inline-block w-8 h-px bg-rcb-red" />
              Loading the legacy
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

            <div className="font-display text-rcb-red tracking-[0.4em] text-sm sm:text-base">
              PLAY BOLD
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
