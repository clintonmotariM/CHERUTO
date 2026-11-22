import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function ExpandableReveal({ isOpen, children, collapsedChildren, skeleton, collapsedSkeleton, delay = 500 }) {
  const wasOpenRef = useRef(false)
  const [phase, setPhase] = useState(isOpen ? 'revealed' : 'closed')
  const shouldReduceMotion = useReducedMotion()
  const skeletonDuration = shouldReduceMotion ? 0 : 180

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
  const showSkeleton = (isExpanding || isContracting) && skeleton
  const showCollapsedSkeleton = isContracting && collapsedSkeleton
  const showChildren = phase === 'revealed' && children
  const showCollapsed = phase === 'collapsed' && collapsedChildren

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {showSkeleton && skeleton && (
        <div style={{ opacity: 1, transition: 'opacity 0.18s ease', width: '100%' }}>{skeleton}</div>
      )}
      {showCollapsedSkeleton && collapsedSkeleton && (
        <div style={{ opacity: 1, transition: 'opacity 0.18s ease', width: '100%' }}>{collapsedSkeleton}</div>
      )}
      {showChildren && (
        <div style={{ opacity: 1, transition: 'opacity 0.22s ease', width: '100%' }}>{children}</div>
      )}
      {showCollapsed && (
        <div style={{ opacity: 1, transition: 'opacity 0.22s ease', width: '100%', animation: 'cherutoFadeIn 0.22s ease' }}>{collapsedChildren}</div>
      )}
    </div>
  )
}
