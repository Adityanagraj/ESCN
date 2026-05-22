import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Returns true when cursor-driven micro-interactions should be enabled —
 * i.e. fine pointer + user has not opted into reduced motion. Used to gate
 * parallax, magnetic buttons, 3D tilt, and cursor-following glows so mobile
 * touch users (and accessibility-sensitive users) get a clean, static
 * experience.
 */
export function useInteractive(): boolean {
  const reduce = useReducedMotion()
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return !reduce && !coarse
}
