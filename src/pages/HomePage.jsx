import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Images } from 'lucide-react'

const photos = [
  {
    id: 'purple-pink',
    src: '',
    alt: 'A purple to pink memorial memory',
    caption: 'A life remembered with love, laughter, and the many moments that made her unforgettable.',
    fallbackGradient: 'linear-gradient(145deg, #9D4EDD 0%, #FF4D85 100%)',
  },
  {
    id: 'pink-peach',
    src: '',
    alt: 'A pink to peach memorial memory',
    caption: 'Her warmth lives in every kindness shared and every story we carry forward.',
    fallbackGradient: 'linear-gradient(145deg, #FF4D85 0%, #F5B7A7 100%)',
  },
  {
    id: 'purple-green',
    src: '',
    alt: 'A purple to green memorial memory',
    caption: 'Forever held close in the hearts of all who loved her.',
    fallbackGradient: 'linear-gradient(145deg, #9D4EDD 0%, #2ECC71 100%)',
  },
]

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photos[activeIndex]

  const showNextPhoto = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % photos.length)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        minHeight: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      <button
        type="button"
        onClick={showNextPhoto}
        aria-label="Show next Cheruto memory"
        style={{
          width: 'clamp(290px, 76vw, 350px)',
          aspectRatio: '4 / 5',
          padding: 0,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '999px 999px 28px 28px',
          border: 'none',
          background: activePhoto.fallbackGradient,
          boxShadow: '0 18px 44px rgba(93,64,55,.18)',
          cursor: 'pointer',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhoto.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {activePhoto.src ? (
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: activePhoto.fallbackGradient }} />
            )}

            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '38%',
                background: 'linear-gradient(to top, rgba(93,64,55,.58), rgba(93,64,55,0))',
              }}
            />

            <span
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '28px',
                zIndex: 2,
                color: '#FFFFFF',
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(2.4rem, 9vw, 3rem)',
                lineHeight: 1,
                textShadow: '0 2px 12px rgba(93,64,55,.48)',
              }}
            >
              Cheruto
            </span>
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence mode="wait">
        <motion.p
          key={activePhoto.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
          style={{
            maxWidth: '340px',
            margin: 0,
            color: 'var(--text-brown)',
            fontSize: '16px',
            lineHeight: 1.55,
          }}
        >
          {activePhoto.caption || 'A life remembered with love, laughter, and the many moments that made her unforgettable.'}
        </motion.p>
      </AnimatePresence>

      <button
        type="button"
        onClick={showNextPhoto}
        aria-label={`Next memory, showing ${activeIndex + 1} of ${photos.length}`}
        style={{
          minHeight: '44px',
          padding: '10px 22px',
          borderRadius: '999px',
          backgroundColor: 'var(--white)',
          border: '1.5px solid var(--btn-pink)',
          color: 'var(--btn-pink)',
          fontWeight: 600,
          fontSize: '15px',
          boxShadow: '0 6px 18px rgba(93,64,55,.10)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <Images size={18} aria-hidden="true" />
        <span>Next Memory ({activeIndex + 1}/{photos.length})</span>
      </button>
    </motion.section>
  )
}
