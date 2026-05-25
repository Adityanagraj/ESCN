import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch'
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from 'lucide-react'
import { EASE } from '../lib/motion'

type Props = {
  open: boolean
  images: string[]
  index: number
  alt: string
  onClose: () => void
  onIndexChange: (i: number) => void
}

/**
 * Fullscreen image lightbox with pinch / wheel / double-tap zoom, click-drag
 * pan, keyboard navigation, and image-to-image swipe. Body scroll is locked
 * while the overlay is open.
 */
export function Lightbox({
  open,
  images,
  index,
  alt,
  onClose,
  onIndexChange,
}: Props) {
  const total = images.length
  const hasMany = total > 1
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null)

  // Reset zoom whenever the user swipes to a different image inside the
  // lightbox. Using a ref instead of remounting the TransformWrapper keeps
  // the motion smoother (no flash, no re-init).
  useEffect(() => {
    transformRef.current?.resetTransform()
  }, [index])

  // Lock body scroll while open + bind global keys.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && hasMany)
        onIndexChange((index + 1) % total)
      else if (e.key === 'ArrowLeft' && hasMany)
        onIndexChange((index - 1 + total) % total)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, index, total, hasMany, onClose, onIndexChange])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — gallery viewer`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-sm"
        >
          {/* Zoom canvas — full viewport. Close is done via the X button
              (top right) or the ESC key. We deliberately don't add a
              "tap-outside-image-to-close" handler here — that would require
              another full-viewport pointer-events:auto layer that fights
              with the prev/next arrows for click priority. The X button
              and ESC are unambiguous. The ref-based API lets the zoom
              buttons live outside TransformWrapper's React subtree without
              needing the buggy useControls() hook. */}
          <div className="absolute inset-0 z-[5]">
            <TransformWrapper
              ref={transformRef}
              minScale={1}
              maxScale={5}
              initialScale={1}
              centerOnInit
              doubleClick={{ mode: 'toggle', step: 1.6 }}
              wheel={{ step: 0.15 }}
              pinch={{ step: 5 }}
              panning={{ velocityDisabled: true }}
            >
              <LightboxStage
                src={images[index]}
                alt={`${alt} — image ${index + 1} of ${total}`}
              />
            </TransformWrapper>
          </div>

          {/* Top bar — counter + close */}
          <div
            className="
              absolute top-0 left-0 right-0 z-10
              flex items-center justify-between gap-3
              px-4 sm:px-6 py-4
              text-white
              pointer-events-none
            "
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          >
            <div className="pointer-events-auto rounded-full border border-white/15 bg-black/40 backdrop-blur px-3.5 py-1.5 text-[11px] tracking-[0.25em] uppercase">
              {index + 1} / {total}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="
                pointer-events-auto
                w-11 h-11 inline-flex items-center justify-center
                rounded-full border border-white/15 bg-black/40 backdrop-blur
                text-white/90 hover:bg-white/10 active:scale-95
                transition
              "
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Side arrows (only if multiple) */}
          {hasMany && (
            <>
              <NavButton
                side="left"
                onClick={() =>
                  onIndexChange((index - 1 + total) % total)
                }
                ariaLabel="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </NavButton>
              <NavButton
                side="right"
                onClick={() => onIndexChange((index + 1) % total)}
                ariaLabel="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </NavButton>
            </>
          )}

          {/* Bottom controls — zoom in / out / reset + hint */}
          <div
            className="
              absolute bottom-0 left-0 right-0 z-10
              flex flex-col items-center gap-3
              px-4 sm:px-6 pb-5
              pointer-events-none
            "
            style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          >
            <ZoomControls
              onZoomIn={() => transformRef.current?.zoomIn()}
              onZoomOut={() => transformRef.current?.zoomOut()}
              onReset={() => transformRef.current?.resetTransform()}
            />
            <p className="pointer-events-none text-[10px] tracking-[0.3em] uppercase text-white/55">
              <span className="hidden sm:inline">
                Scroll / double-click to zoom · drag to pan · esc to close
              </span>
              <span className="sm:hidden">
                Pinch to zoom · drag to pan · tap × to close
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * The actual image inside the TransformWrapper. Kept separate so it can read
 * the transform context if needed — for now it just renders the image with
 * pointer events re-enabled (parent disables them so the backdrop catches
 * taps everywhere except on the image / chrome).
 */
function LightboxStage({ src, alt }: { src: string; alt: string }) {
  return (
    <TransformComponent
      wrapperStyle={{
        width: '100%',
        height: '100%',
        cursor: 'grab',
      }}
      contentStyle={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="max-w-[92vw] max-h-[78vh] sm:max-h-[82vh] object-contain select-none"
      />
    </TransformComponent>
  )
}

function ZoomControls({
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}) {
  return (
    <div
      className="
        pointer-events-auto
        inline-flex items-center gap-1
        rounded-full border border-white/15 bg-black/45 backdrop-blur-md
        px-1.5 py-1
      "
    >
      <ZoomBtn onClick={onZoomOut} ariaLabel="Zoom out">
        <Minus className="w-4 h-4" />
      </ZoomBtn>
      <ZoomBtn onClick={onReset} ariaLabel="Reset zoom">
        <RotateCcw className="w-4 h-4" />
      </ZoomBtn>
      <ZoomBtn onClick={onZoomIn} ariaLabel="Zoom in">
        <Plus className="w-4 h-4" />
      </ZoomBtn>
    </div>
  )
}

function ZoomBtn({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode
  onClick: () => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        w-9 h-9 inline-flex items-center justify-center
        rounded-full text-white/85
        hover:bg-white/10 active:scale-95
        transition
      "
    >
      {children}
    </button>
  )
}

function NavButton({
  side,
  onClick,
  ariaLabel,
  children,
}: {
  side: 'left' | 'right'
  onClick: () => void
  ariaLabel: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        'absolute top-1/2 -translate-y-1/2 z-10',
        side === 'left' ? 'left-2 sm:left-5' : 'right-2 sm:right-5',
        'w-11 h-11 sm:w-12 sm:h-12 inline-flex items-center justify-center',
        'rounded-full border border-white/15 bg-black/40 backdrop-blur',
        'text-white/90 hover:bg-white/10 active:scale-95',
        'transition',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
