import { useEffect, useRef } from 'react'

export default function useImmersiveMode(enabled = true) {
  const activatedRef = useRef(false)

  const enterFullscreen = async () => {
    if (!enabled || activatedRef.current) return
    if (!document.documentElement.requestFullscreen) return

    try {
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' })
      activatedRef.current = true
    } catch {
      // Browsers can deny fullscreen; the hook remains idle for a later gesture.
    }
  }

  useEffect(() => {
    if (!enabled) return undefined

    const activateOnGesture = () => {
      enterFullscreen()
    }

    document.addEventListener('touchstart', activateOnGesture, { passive: true, once: true })
    document.addEventListener('click', activateOnGesture, { once: true })

    return () => {
      document.removeEventListener('touchstart', activateOnGesture)
      document.removeEventListener('click', activateOnGesture)
    }
  }, [enabled])

  return { enterFullscreen }
}
