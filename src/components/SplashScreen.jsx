import { motion, useReducedMotion } from 'framer-motion'

export default function SplashScreen({ onEnter }) {
  const shouldReduceMotion = useReducedMotion()

  const breathingAnimation = shouldReduceMotion
    ? { opacity: 1, y: 0, scale: 1 }
    : {
        y: [0, 3.5, 0],
        opacity: [0.84, 1, 0.84],
        scale: [0.99, 1.015, 0.99],
        boxShadow: [
          '0 8px 20px rgba(92, 52, 61, 0.14)',
          '0 14px 32px rgba(92, 52, 61, 0.26)',
          '0 8px 20px rgba(92, 52, 61, 0.14)',
        ],
      }

  const breathingTransition = shouldReduceMotion
    ? undefined
    : {
        duration: 4.8,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }

  return (
    <section className="splash-screen" aria-label="Cheruto memorial entrance">
      <motion.h1
        className="splash-kicker"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(4.2rem, 18vw, 6.5rem)',
          color: 'var(--text-brown)',
          lineHeight: 1,
        }}
      >
        Cheruto
      </motion.h1>

      <motion.button
        type="button"
        onClick={onEnter}
        aria-label="Say Bye — Enter the Cheruto memorial"
        initial={{ opacity: 0, y: 12 }}
        animate={shouldReduceMotion ? { opacity: 1, y: 0 } : breathingAnimation}
        whileTap={{ scale: 0.97 }}
        transition={shouldReduceMotion
          ? { duration: 0.55, delay: 0.12, ease: 'easeOut' }
          : { ...breathingTransition, delay: 0.12 }}
        style={{
          minHeight: '50px',
          padding: '13px 36px',
          borderRadius: '999px',
          backgroundColor: '#5C343D',
          color: 'rgba(255, 249, 242, 0.92)',
          fontSize: '16px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          border: '1px solid rgba(92, 52, 61, 0.35)',
          boxShadow: '0 10px 26px rgba(93, 64, 55, 0.18)',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}
      >
        Say Bye
      </motion.button>
    </section>
  )
}
