import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInteractive } from '../lib/useInteractive'

type SharedProps = {
  children: ReactNode
  className?: string
  /** How strongly the button is pulled toward the cursor. 0..0.5 sensible. */
  strength?: number
  /** How far the magnetic effect reaches around the button, as a multiplier of the button's own size. */
  reach?: number
  /** Inner content drifts slightly against the pull for depth (0 disables it). */
  counterDrift?: number
}

type AnchorProps = SharedProps & {
  href: string
  type?: never
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  target?: string
  rel?: string
  'aria-label'?: string
}

type ButtonProps = SharedProps & {
  href?: never
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  'aria-label'?: string
  disabled?: boolean
}

export type MagneticButtonProps = AnchorProps | ButtonProps

/**
 * Cursor-attracted CTA. On a fine pointer device with motion enabled, the
 * button magnetises toward the cursor when nearby and snaps back on leave.
 * Inner content drifts slightly opposite to add depth. On touch / reduced
 * motion it degrades to a plain link/button — same DOM, no transforms.
 */
export function MagneticButton(props: MagneticButtonProps) {
  const {
    children,
    className,
    strength = 0.28,
    reach = 1.4,
    counterDrift = 0.35,
    ...rest
  } = props

  const ref = useRef<HTMLElement | null>(null)
  const interactive = useInteractive()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 210, damping: 18, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 210, damping: 18, mass: 0.35 })

  const innerX = useTransform(sx, (v) => v * -counterDrift)
  const innerY = useTransform(sy, (v) => v * -counterDrift)

  const onMove = (e: React.MouseEvent) => {
    if (!interactive || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy

    // Only pull if cursor is within `reach * half-size` of the centre on each axis.
    const limitX = (rect.width / 2) * reach
    const limitY = (rect.height / 2) * reach
    if (Math.abs(dx) > limitX || Math.abs(dy) > limitY) {
      x.set(0)
      y.set(0)
      return
    }

    x.set(dx * strength)
    y.set(dy * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const style = interactive ? { x: sx, y: sy, willChange: 'transform' } : undefined
  const innerStyle = interactive ? { x: innerX, y: innerY } : undefined

  const inner = (
    <motion.span
      style={innerStyle}
      className="pointer-events-none inline-flex items-center justify-center gap-2 w-full h-full"
    >
      {children}
    </motion.span>
  )

  // Anchor variant
  if ('href' in rest && rest.href !== undefined) {
    const { href, onClick, target, rel, ...anchorRest } = rest
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileTap={{ scale: 0.96 }}
        target={target}
        rel={rel}
        style={style}
        className={className}
        {...anchorRest}
      >
        {inner}
      </motion.a>
    )
  }

  // Button variant
  const { type = 'button', onClick, disabled, ...buttonRest } = rest as ButtonProps
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      disabled={disabled}
      style={style}
      className={className}
      {...buttonRest}
    >
      {inner}
    </motion.button>
  )
}
