import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const CARD_SKELETON = (
  <div style={{ width: '100%', height: '68px', borderRadius: '18px', className: 'cheruto-skeleton' }} />
)

const FORM_SKELETON = (
  <div style={{ width: '180px', height: '44px', borderRadius: '999px', margin: '0 auto', className: 'cheruto-skeleton' }} />
)

export default function ExpandableReveal({ isOpen, collapsed, expanded, variant = 'card' }) {
  const wasOpenRef = useRef(false)
  const [phase, setPhase] = useState(isOpen ? 'revealed' : 'collapsed')
  const shouldReduceMotion = useReducedMotion()
  const skeletonDuration = shouldReduceMotion ? 0 : 180
  const rowSkeleton = variant === 'form' ? FORM_SKELETON : CARD_SKELETON

  useEffect(() => {
    wasOpenRef.current = wasOpenRef.current || isOpen

    if (!isOpen) {
      // Contracting: skeleton first, then collapsed content
      if (wasOpenRef.current) {
        setPhase('contracting')
        const timer = setTimeout(() => setPhase('collapsed'), skeletonDuration)
        return () => clearTimeout(timer)
      }
      // Initial mount: show collapsed content immediately
      setPhase('collapsed')
      return
    }

    // Expanding: skeleton first, then expanded content
    setPhase('expanding')
    const timer = setTimeout(() => setPhase('revealed'), skeletonDuration)
    return () => clearTimeout(timer)
  }, [isOpen, skeletonDuration])

  const isExpanding = phase === 'expanding'
  const isContracting = phase === 'contracting'
  const showSkeleton = (isExpanding || isContracting) && rowSkeleton
  const showExpanded = phase === 'revealed' && expanded
  const showCollapsed = phase === 'collapsed' && collapsed

  const fadeStyle = { opacity: 1, transition: 'opacity 0.22s ease', width: '100%', animation: 'cherutoFadeIn 0.22s ease' }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {showSkeleton && (
        <div style={{ opacity: 1, transition: 'opacity 0.18s ease', width: '100%' }}>{rowSkeleton}</div>
      )}
      {showExpanded && <div style={{ ...fadeStyle }}>{expanded}</div>}
      {showCollapsed && <div style={{ ...fadeStyle, width: '100%' }}>{collapsed}</div>}
    </div>
  )
}
