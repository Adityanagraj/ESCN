import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { EASE } from '../lib/motion'
import { Lightbox } from './Lightbox'

type Props = {
  images: string[]
  alt: string
  /** "Limited", "Champions edition", etc. — pulled from the Edition spec. */
  editionTag?: string
}

/**
 * In-page product gallery. Renders the active image inside the existing
 * aspect frame, with prev/next + dot pagination + a thumbnail rail (desktop).
 * Tapping the image opens the full-screen zoomable Lightbox.
 *
 * Handles the single-image case gracefully: chrome (arrows / dots / rail) is
 * hidden so it looks identical to the previous static image card.
 */
export function ProductGallery({ images, alt, editionTag }: Props) {
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const hasMany = images.length > 1
  const railRef = useRef<HTMLDivElement | null>(null)

  // Preload neighbours so swiping feels instant.
  useEffect(() => {
    if (!hasMany) return
    const next = images[(index + 1) % images.length]
    const prev = images[(index - 1 + images.length) % images.length]
    ;[next, prev].forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [index, images, hasMany])

  // Keep the active thumbnail visible in the rail as user navigates.
  useEffect(() => {
    if (!hasMany) return
    const rail = railRef.current
    if (!rail) return
    const child = rail.children[index] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [index, hasMany])

  const go = (next: number) =>
    setIndex(((next % images.length) + images.length) % images.length)

  return (
    <>
      <div className="relative">
        <div
          className="absolute -inset-10 rcb-red-glow opacity-70 pointer-events-none"
          aria-hidden
        />

        <div
          className="
            relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4]
            w-full overflow-hidden rounded-3xl border border-white/10
            bg-rcb-surface
            group
          "
        >
          {/* The cover image — clickable to zoom */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Open ${alt} gallery — image ${index + 1} of ${images.length}`}
            className="
              absolute inset-0 cursor-zoom-in
              focus:outline-none
              focus-visible:ring-2 focus-visible:ring-rcb-red focus-visible:ring-offset-2 focus-visible:ring-offset-rcb-bg
            "
          >
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={alt}
              loading="lazy"
              draggable={false}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 w-full h-full object-contain p-6 sm:p-8"
            />
          </button>

          {/* Edition tag — top right, same as before */}
          {editionTag && (
            <div className="absolute top-5 right-5 rounded-full border border-rcb-gold/50 bg-black/40 backdrop-blur px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase text-rcb-gold pointer-events-none">
              {editionTag}
            </div>
          )}

          {/* Zoom-hint chip — top left */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Open full-screen gallery with zoom"
            className="
              absolute top-5 left-5
              inline-flex items-center gap-2
              rounded-full border border-white/15 bg-black/45 backdrop-blur
              px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase text-white/85
              hover:bg-black/65 active:scale-95
              transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red
            "
          >
            <Expand className="w-3.5 h-3.5" />
            Tap to zoom
          </button>

          {/* Prev / Next — only when multiple */}
          {hasMany && (
            <>
              <GalleryArrow side="left" onClick={() => go(index - 1)} />
              <GalleryArrow side="right" onClick={() => go(index + 1)} />
            </>
          )}

          {/* Footer strip (in-stock + counter) */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[11px] text-white/70 uppercase tracking-[0.25em] pointer-events-none">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              In stock
            </span>
            {hasMany ? (
              <span className="hidden sm:inline">
                {index + 1} / {images.length}
              </span>
            ) : (
              <span className="hidden sm:inline">
                Studio render · actual frame may vary
              </span>
            )}
          </div>

          {/* Dot pagination — mobile, only when multiple */}
          {hasMany && (
            <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={[
                    'h-1.5 rounded-full transition-all',
                    i === index
                      ? 'w-5 bg-rcb-red'
                      : 'w-1.5 bg-white/30 hover:bg-white/50',
                  ].join(' ')}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail rail — desktop, only when multiple */}
        {hasMany && (
          <div
            ref={railRef}
            className="
              hidden sm:flex gap-2 mt-3
              overflow-x-auto scrollbar-none
              pb-1
            "
          >
            {images.map((src, i) => {
              const active = i === index
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={active}
                  className={[
                    'relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red',
                    active
                      ? 'border-rcb-red ring-1 ring-rcb-red/60 scale-[1.02]'
                      : 'border-white/10 opacity-65 hover:opacity-100 hover:border-white/25',
                  ].join(' ')}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        images={images}
        index={index}
        alt={alt}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  )
}

function GalleryArrow({
  side,
  onClick,
}: {
  side: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous image' : 'Next image'}
      className={[
        'absolute top-1/2 -translate-y-1/2',
        side === 'left' ? 'left-3' : 'right-3',
        'w-10 h-10 inline-flex items-center justify-center',
        'rounded-full border border-white/15 bg-black/45 backdrop-blur',
        'text-white/85 hover:bg-black/65 active:scale-95',
        'opacity-0 group-hover:opacity-100 sm:opacity-100',
        'transition-opacity duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-rcb-red',
      ].join(' ')}
    >
      {side === 'left' ? (
        <ChevronLeft className="w-5 h-5" />
      ) : (
        <ChevronRight className="w-5 h-5" />
      )}
    </button>
  )
}
