import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function ExpandableReveal({ isOpen, children, skeleton, delay = 500 }) {
  const [phase, setPhase] = useState(isOpen ? 'ready' : 'closed')
  const shouldReduceMotion = useReducedMotion()
  const openDuration = shouldReduceMotion ? 0 : 390
  const closeDuration = shouldReduceMotion ? 0 : 330

  useEffect(() => {
    if (isOpen) {
      setPhase('expanding')
      const timer = setTimeout(() => setPhase('ready'), openDuration)
      return () => clearTimeout(timer)
    }
    setPhase('expanding')
    const timer = setTimeout(() => setPhase('closed'), closeDuration)
    return () => clearTimeout(timer)
  }, [isOpen, openDuration, closeDuration])

  const isExpandingOrReady = phase === 'expanding' || phase === 'ready'
  const showChildren = phase === 'ready'

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: `grid-template-rows ${isOpen ? 0.38 : 0.32}s cubic-bezier(0.22, 1, 0.36, 1)`,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          overflow: 'hidden',
          opacity: isExpandingOrReady ? 1 : 0,
          transition: 'opacity 0.28s ease',
          width: '100%',
        }}
      >
        {isExpandingOrReady && skeleton && !showChildren && (
          <div style={{ padding: '10px 4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>{skeleton}</div>
        )}
        {showChildren && (
          <div
            style={{
              opacity: phase === 'ready' ? 1 : 0,
              transition: 'opacity 0.24s ease',
              width: '100%',
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
