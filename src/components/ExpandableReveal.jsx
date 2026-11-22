import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function ExpandableReveal({ isOpen, children, skeleton, delay = 500 }) {
  const [phase, setPhase] = useState(isOpen ? 'revealed' : 'closed')
  const [openReady, setOpenReady] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) {
      setPhase('closed')
      setOpenReady(false)
      return
    }
    setPhase('skeleton')
    const skeletonTimer = setTimeout(() => {
      setOpenReady(true)
      const contentTimer = setTimeout(() => setPhase('revealed'), shouldReduceMotion ? 0 : 260)
      return () => clearTimeout(contentTimer)
    }, shouldReduceMotion ? 0 : 260)
    return () => clearTimeout(skeletonTimer)
  }, [isOpen, delay, shouldReduceMotion])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.42s cubic-bezier(0.25, 0.1, 0.25, 1)',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.34s ease',
          width: '100%',
        }}
      >
        {isOpen && phase === 'skeleton' && skeleton && (
          <div style={{ padding: '10px 4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>{skeleton}</div>
        )}
        {openReady && phase === 'revealed' && children && (
          <div style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.26s ease', width: '100%' }}>{children}</div>
        )}
      </div>
    </div>
  )
}
