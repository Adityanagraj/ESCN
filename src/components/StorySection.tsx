import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { EASE } from '../lib/motion'

const PARAGRAPHS = [
"Every RCB fan has something on their wall. A jersey from a memorable season. A fading poster. A moment from Chinnaswamy that still feels louder in your head than it ever did on TV But somehow, the passion never matched the quality.",
    
"We built ShopforMost X PlayBold because the roar from Chinnaswamy deserved something heavier. Something handcrafted. Something worthy of the fans who stayed loyal through every season. ❤️🖤",
"So we spent hundreds of hours designing, sculpting, carving, and hand-painting every piece by hand. No shortcuts. No factory feel. Every artwork is individually numbered, signed off, and made to own one wall yours",

"And maybe… it’s also a subtle reminder to the #WhistleArmy 🔊 and #MIPaltan that loyalty looks better in red and black🔥"

]

export function StorySection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax on the giant background word.
  const wordY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])
  const wordOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.07, 0.07, 0])

  return (
    <section
      id="story"
      ref={ref}
      className="relative bg-rcb-bg overflow-hidden border-b border-white/5"
    >
      {/* Ghost word in the background */}
      <motion.span
        aria-hidden
        style={{ y: wordY, opacity: wordOpacity }}
        className="
          pointer-events-none select-none
          absolute inset-x-0 top-1/2 -translate-y-1/2
          text-center font-display tracking-tight text-white
          leading-[0.85] whitespace-nowrap
        "
      >
        <span className="block" style={{ fontSize: 'clamp(6rem, 24vw, 24rem)' }}>
          BELIEVE
        </span>
      </motion.span>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 py-20 sm:py-40">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-xs tracking-[0.45em] uppercase text-rcb-red text-center"
        >
          Chapter 18 · Why we built this
        </motion.p>

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          className="mt-5 font-display tracking-tight text-white text-center leading-[0.9]"
          style={{ fontSize: 'clamp(2.25rem, 7vw, 5rem)' }}
        >
          Memorabilia <br />
          worth <span className="text-rcb-red">memorising.</span>
        </motion.h2>

        <div className="mt-12 sm:mt-16 space-y-7 sm:space-y-9 max-w-2xl mx-auto">
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              className="text-base sm:text-lg leading-relaxed text-white/85"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Signature mark */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          style={{ transformOrigin: 'left' }}
          className="mt-14 sm:mt-20 mx-auto max-w-2xl flex items-center gap-4 text-rcb-muted text-xs sm:text-sm tracking-[0.4em] uppercase"
        >
          <span className="block flex-1 h-px bg-gradient-to-r from-rcb-red/60 via-white/15 to-transparent" />
          <span>The collection follows</span>
        </motion.div>
      </div>
    </section>
  )
}
