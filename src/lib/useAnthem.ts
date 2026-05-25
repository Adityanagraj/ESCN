import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'rcb_anthem_enabled_v1'
const FADE_MS = 600

/**
 * Drop these three files in `public/audio/`. On every fresh page load we pick
 * one at random — same chosen track is then shared between the splash button
 * and the floating toggle so they never play overlapping audio. A hard reload
 * re-rolls the pick, so returning visitors hear variety.
 */
const TRACKS = [
  '/audio/anthem-1.mp3',
  '/audio/anthem-2.mp3',
  '/audio/anthem-3.mp3',
] as const

const CHOSEN_TRACK = TRACKS[Math.floor(Math.random() * TRACKS.length)]

/**
 * Cross-component anthem controller.
 *
 *   - Owns a single shared HTMLAudioElement (created once per session).
 *   - Persists the user's on/off preference in localStorage.
 *   - On mount, if the preference is "on", attempts to autoplay. Browsers
 *     will block this on the very first visit (no user gesture yet) — that's
 *     fine, we silently swallow the rejection and wait for the toggle.
 *   - Exposes `enable()` / `disable()` / `toggle()` with smooth volume fades.
 *
 * Designed for the LoadingSplash + a persistent floating toggle to share the
 * same underlying audio element so they never fight each other.
 */
function fadeTo(audio: HTMLAudioElement, target: number, ms: number): Promise<void> {
  return new Promise((resolve) => {
    const start = audio.volume
    const t0 = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / ms)
      audio.volume = start + (target - start) * t
      if (t < 1) {
        requestAnimationFrame(step)
      } else {
        audio.volume = target
        resolve()
      }
    }
    requestAnimationFrame(step)
  })
}

// Module-level singleton so all `useAnthem()` hook consumers share the same
// HTMLAudioElement — otherwise multiple toggles would create overlapping
// playback streams.
let sharedAudio: HTMLAudioElement | null = null
function getAudio(): HTMLAudioElement {
  if (sharedAudio) return sharedAudio
  const el = new Audio(CHOSEN_TRACK)
  el.preload = 'auto'
  el.loop = false
  el.volume = 0
  sharedAudio = el
  return el
}

export function useAnthem() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    audioRef.current = getAudio()

    let saved: string | null = null
    try {
      saved = localStorage.getItem(STORAGE_KEY)
    } catch {
      // localStorage can throw in privacy mode — fail closed (muted).
    }

    if (saved === '1') {
      // Optimistically reflect the saved preference so the button shows "Mute"
      // immediately. If the autoplay attempt is then rejected by the browser,
      // we revert to disabled so the UI doesn't lie about what's actually
      // playing — the user can re-tap to enable with a real gesture.
      setEnabled(true)
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true)
          if (audioRef.current) {
            void fadeTo(audioRef.current, 0.8, FADE_MS)
          }
        })
        .catch(() => {
          setEnabled(false)
          setPlaying(false)
        })
    }

    const onEnded = () => setPlaying(false)
    audioRef.current.addEventListener('ended', onEnded)
    return () => {
      audioRef.current?.removeEventListener('ended', onEnded)
    }
  }, [])

  const enable = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    setEnabled(true)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }

    audio.volume = 0
    try {
      await audio.play()
      setPlaying(true)
      await fadeTo(audio, 0.8, FADE_MS)
    } catch {
      // Even with a gesture, play() can fail if the file is missing
      // (eg. placeholder anthem.mp3 not yet uploaded). Don't crash.
      setPlaying(false)
    }
  }, [])

  const disable = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    setEnabled(false)
    try {
      localStorage.setItem(STORAGE_KEY, '0')
    } catch {
      // ignore
    }
    if (!audio.paused) {
      await fadeTo(audio, 0, FADE_MS)
      audio.pause()
      audio.currentTime = 0
    }
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (enabled) {
      void disable()
    } else {
      void enable()
    }
  }, [enabled, enable, disable])

  return { enabled, playing, enable, disable, toggle }
}
