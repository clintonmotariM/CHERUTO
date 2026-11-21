import { motion } from 'framer-motion'

export default function SplashScreen({ onEnter }) {
  return (
    <section
      className="splash-screen"
      aria-label="Cherono memorial entrance"
    >
      <motion.h1
        className="splash-kicker"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        Cherono
      </motion.h1>

      <motion.button
        type="button"
        onClick={onEnter}
        aria-label="Say Bye — Enter the Cherono memorial"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
        style={{
          minHeight: '52px',
          padding: '14px 36px',
          borderRadius: '999px',
          backgroundColor: 'var(--btn-pink)',
          color: 'var(--white)',
          fontSize: '17px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          boxShadow: '0 10px 28px rgba(255, 77, 133, 0.28)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}
      >
        Say Bye
      </motion.button>
    </section>
  )
}
