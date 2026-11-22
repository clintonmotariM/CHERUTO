import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ExpandableReveal({ isOpen, children, skeleton, delay = 500 }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setRevealed(false)
      return
    }
    const timer = setTimeout(() => setRevealed(true), delay)
    return () => clearTimeout(timer)
  }, [isOpen, delay])

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
      exit={{ opacity: 0, height: 0 }}
      style={{ width: '100%' }}
    >
      {isOpen && (
        <AnimatePresence mode="wait">
          {revealed ? (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {children}
            </motion.div>
          ) : (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {skeleton}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}
