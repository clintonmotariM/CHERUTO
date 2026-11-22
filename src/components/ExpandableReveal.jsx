import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function ExpandableReveal({ isOpen, children, skeleton, delay = 500 }) {
  const [phase, setPhase] = useState(isOpen ? 'revealed' : 'closed')
  const shouldReduceMotion = useReducedMotion()
  const skeletonDuration = shouldReduceMotion ? 0 : 180

  useEffect(() => {
    if (!isOpen) {
      setPhase('closed')
      return
    }
    setPhase('skeleton')
    const timer = setTimeout(() => setPhase('revealed'), skeletonDuration)
    return () => clearTimeout(timer)
  }, [isOpen, skeletonDuration])

  if (!isOpen && phase === 'closed') return null

  const showSkeleton = phase === 'skeleton'
  const showContent = phase === 'revealed'

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {showSkeleton && skeleton && (
        <div
          style={{
            opacity: 1,
            transition: 'opacity 0.18s ease',
            width: '100%',
          }}
        >
          {skeleton}
        </div>
      )}
      {showContent && children && (
        <div
          style={{
            opacity: phase === 'revealed' ? 1 : 0,
            transition: 'opacity 0.22s ease',
            width: '100%',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
