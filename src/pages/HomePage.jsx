import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Images } from 'lucide-react'
import useMemorialData from '../hooks/useMemorialData'

const curatedPhotos = [
  {
    id: 'curated-purple-pink',
    caption: 'A life remembered with love, laughter, and the many moments that made her unforgettable.',
    fallbackGradient: 'linear-gradient(145deg, #9D4EDD 0%, #FF4D85 100%)',
  },
  {
    id: 'curated-pink-peach',
    caption: 'Her warmth lives in every kindness shared and every story we carry forward.',
    fallbackGradient: 'linear-gradient(145deg, #FF4D85 0%, #F5B7A7 100%)',
  },
  {
    id: 'curated-purple-green',
    caption: 'Forever held close in the hearts of all who loved her.',
    fallbackGradient: 'linear-gradient(145deg, #9D4EDD 0%, #2ECC71 100%)',
  },
  {
    id: 'curated-peach-purple',
    caption: 'Her light continues to shine through every story told in her name.',
    fallbackGradient: 'linear-gradient(145deg, #F5B7A7 0%, #9D4EDD 100%)',
  },
]

export default function HomePage() {
  const { memories = [], loading } = useMemorialData()
  const [activeIndex, setActiveIndex] = useState(0)

  const submittedMemories = (memories || []).filter((m) => m.id && m.id.startsWith('local-'))
  const curatedCount = curatedPhotos.length
  const totalSlides = curatedCount + submittedMemories.length

  const activeSlide = () => {
    if (activeIndex < curatedCount) {
      return { type: 'curated', ...curatedPhotos[activeIndex] }
    }
    const memory = submittedMemories[activeIndex - curatedCount]
    return { type: 'memory', ...memory }
  }

  const slide = activeSlide()
  const isMemorySlide = slide.type === 'memory'

  const photoUrls = isMemorySlide && Array.isArray(slide.photo_urls) && slide.photo_urls.length > 0
    ? slide.photo_urls
    : (isMemorySlide && slide.photo_url ? [slide.photo_url] : [])

  const activePhotoUrl = photoUrls.length > 0 ? photoUrls[0] : null
  const gradient = photoUrl ? null : slide.fallbackGradient || curatedPhotos[activeIndex % curatedCount].fallbackGradient

  const showNextPhoto = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % totalSlides)
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
          background: gradient || '#f0f0f0',
          boxShadow: '0 18px 44px rgba(93,64,55,.18)',
          cursor: 'pointer',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {activePhotoUrl ? (
              <img
                src={activePhotoUrl}
                alt={slide.alt || 'A shared memory photo'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: gradient }} />
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

      {isMemorySlide && (
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            style={{
              maxWidth: '340px',
              margin: 0,
              color: 'var(--text-brown)',
              fontSize: '14px',
              lineHeight: 1.5,
              textAlign: 'center',
              padding: '0 12px',
            }}
          >
            <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: 700, color: 'var(--accent-purple)' }}>{slide.author_name || 'Friend'}</p>
            <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: '22px', padding: '3px 10px', borderRadius: '999px', backgroundColor: 'rgba(157, 78, 221, 0.10)', border: '1px solid rgba(157, 78, 221, 0.22)', color: 'var(--accent-purple)', fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>{slide.memory_tag || 'Cherished Moment'}</span>
            <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.55, color: 'var(--text-brown)' }}>"{slide.memory}"</p>
          </motion.div>
        </AnimatePresence>
      )}

      {!isMemorySlide && (
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.id}
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
            {slide.caption || 'A life remembered with love, laughter, and the many moments that made her unforgettable.'}
          </motion.p>
        </AnimatePresence>
      )}

      <button
        type="button"
        onClick={showNextPhoto}
        aria-label={`Next memory, showing ${activeIndex + 1} of ${totalSlides}`}
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
        <span>Next Memory ({activeIndex + 1}/{totalSlides})</span>
      </button>

      {loading && <p style={{ fontSize: '13px', color: 'rgba(93, 64, 55, 0.6)' }}>Loading shared memories…</p>}
    </motion.section>
  )
}
