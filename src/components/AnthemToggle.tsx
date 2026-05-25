import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useAnthem } from '../lib/useAnthem'

/**
 * Floating sound toggle that sits in the bottom-right corner of every page.
 * Shares the same audio element as the LoadingSplash via the useAnthem hook,
 * so they never play overlapping streams or fight over the on/off state.
 */
export function AnthemToggle() {
  const { enabled, toggle } = useAnthem()

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileTap={{ scale: 0.92 }}
      aria-label={enabled ? 'Mute RCB anthem' : 'Play RCB anthem'}
      aria-pressed={enabled}
      style={{
        // Stack neatly above the WhatsApp FAB on every viewport. The FAB is
        // 56px tall and bottoms-out at safe-area-inset; lift the anthem
        // toggle by FAB height + 12px breathing room.
        bottom: 'calc(max(1rem, env(safe-area-inset-bottom)) + 4.25rem)',
      }}
      className="
        fixed z-[90]
        right-5 sm:right-7
        inline-flex items-center justify-center
        w-11 h-11
        rounded-full border border-white/15
        bg-rcb-bg/85 backdrop-blur-xl
        text-white/80 hover:text-white hover:border-rcb-red
        shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)]
        transition-colors
        focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red focus-visible:ring-offset-2 focus-visible:ring-offset-rcb-bg
      "
    >
      <span className="relative inline-flex items-center justify-center w-5 h-5">
        {enabled ? (
          <Volume2 className="w-5 h-5 text-rcb-red" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
        {enabled && (
          <span className="absolute inset-0 inline-flex rounded-full bg-rcb-red/30 animate-ping" />
        )}
      </span>
    </motion.button>
  )
}
