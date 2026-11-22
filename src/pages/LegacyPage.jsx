import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useMemorialData from '../hooks/useMemorialData'
import QuoteCard from '../components/ui/QuoteCard'

export default function LegacyPage() {
  const { awareness, memories } = useMemorialData()
  const [selectedValue, setSelectedValue] = useState(null)
  const [toast, setToast] = useState('')

  const values = [
    {
      title: 'Lead with Love',
      color: 'var(--accent-purple)',
      reflection: 'Cheru never let anyone feel like a stranger—she remembered the little details and showed up when it mattered most.',
    },
    {
      title: 'Choose Joy',
      color: 'var(--btn-pink)',
      reflection: 'Cheruto found reasons to laugh, celebrate, and make ordinary moments feel bright enough to remember.',
    },
    {
      title: 'Grow Together',
      color: 'var(--accent-green)',
      reflection: 'She believed people were stronger together, encouraging family, friends, and community to keep learning and caring side by side.',
    },
  ]

  const shareMemorial = async () => {
    const shareData = {
      title: 'Cheruto — Celebration of Life',
      text: 'Remember and celebrate Cheruto’s life.',
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href)
        setToast('Link Copied')
        window.setTimeout(() => setToast(''), 2200)
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setToast('Link could not be shared')
        window.setTimeout(() => setToast(''), 2200)
      }
    }
  }

  const selected = values.find((value) => value.title === selectedValue)

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        paddingTop: 'max(14px, calc(var(--safe-top) + 10px))',
        paddingBottom: '24px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <header
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto',
          padding: '4px 22px',
          borderRadius: '999px',
          backgroundColor: 'var(--white)',
          border: '1px solid rgba(93, 64, 55, 0.10)',
          boxShadow: '0 6px 20px rgba(93, 64, 55, 0.08)',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.6rem, 5vw, 1.9rem)',
            lineHeight: 1,
            color: 'var(--text-brown)',
            whiteSpace: 'nowrap',
          }}
        >
          Her Legacy
        </h2>
      </header>

      <QuoteCard
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '12px 16px',
          borderRadius: '16px',
          textAlign: 'left',
          borderLeftColor: 'var(--accent-purple)',
          fontSize: '16px',
          lineHeight: 1.55,
        }}
      >
        “What we keep in our hearts is never lost.”
      </QuoteCard>

      {awareness?.slice(0, 2).map((item) => (
        <QuoteCard
          key={item.id}
          style={{
            width: '100%',
            maxWidth: '460px',
            padding: '12px 16px',
            borderRadius: '16px',
            textAlign: 'left',
            borderLeftColor: 'var(--accent-green)',
          }}
        >
          <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--text-brown)', fontSize: '15px' }}>{item.name}</strong>
          <span style={{ color: 'var(--text-brown)', fontSize: '14.5px', lineHeight: 1.55 }}>{item.memorial_note}</span>
        </QuoteCard>
      ))}

      <div style={{ width: '100%', maxWidth: '460px' }}>
        <h3
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '12px auto 8px auto',
            padding: '3px 18px',
            borderRadius: '999px',
            backgroundColor: 'var(--white)',
            border: '1px solid rgba(157, 78, 221, 0.18)',
            boxShadow: '0 4px 14px rgba(93, 64, 55, 0.06)',
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.25rem, 4.2vw, 1.45rem)',
            lineHeight: 1,
            color: 'var(--text-brown)',
          }}
        >
          What She Taught Us
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '8px',
          }}
        >
          {values.map((value) => {
            const isSelected = selectedValue === value.title
            return (
              <button
                key={value.title}
                type="button"
                aria-expanded={isSelected}
                onClick={() => setSelectedValue(isSelected ? null : value.title)}
                style={{
                  minHeight: '56px',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid var(--white)' : 'none',
                  cursor: 'pointer',
                  outline: 'none',
                  background: value.color,
                  color: 'var(--white)',
                  padding: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  lineHeight: 1.25,
                  fontWeight: 700,
                  boxShadow: isSelected ? '0 8px 22px rgba(93, 64, 55, 0.16)' : '0 4px 12px rgba(93, 64, 55, 0.08)',
                  transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'all 0.28s ease',
                }}
                onFocus={(event) => { event.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-green)' }}
                onBlur={(event) => { event.currentTarget.style.boxShadow = isSelected ? '0 8px 22px rgba(93, 64, 55, 0.16)' : '0 4px 12px rgba(93, 64, 55, 0.08)' }}
              >
                {value.title}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.title}
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              role="status"
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '12px 16px',
                borderRadius: '16px',
                background: 'var(--white)',
                borderLeft: `4px solid ${selected.color}`,
                boxShadow: '0 6px 18px rgba(93, 64, 55, 0.08)',
                color: 'var(--text-brown)',
                fontSize: '14.5px',
                lineHeight: 1.55,
                textAlign: 'left',
              }}
            >
              {selected.reflection}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {memories?.slice(0, 2).map((memory) => (
        <QuoteCard
          key={memory.id}
          style={{
            width: '100%',
            maxWidth: '460px',
            padding: '12px 16px',
            borderRadius: '16px',
            textAlign: 'left',
            borderLeftColor: 'var(--accent-purple)',
            fontSize: '14.5px',
            lineHeight: 1.55,
          }}
        >
          “{memory.memory}”
          <strong style={{ display: 'block', marginTop: '6px', color: 'var(--accent-purple)', fontSize: '14px' }}>— {memory.author_name || 'Family and friends'}</strong>
        </QuoteCard>
      ))}

      <button
        type="button"
        onClick={shareMemorial}
        style={{
          minHeight: '46px',
          padding: '10px 26px',
          borderRadius: '999px',
          backgroundColor: 'var(--btn-pink)',
          color: 'var(--white)',
          border: 'none',
          fontSize: '14.5px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}
      >
        Share Memorial
      </button>

      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            bottom: 'calc(var(--nav-height) + var(--safe-bottom) + 28px)',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 16px',
            borderRadius: '999px',
            background: 'var(--text-brown)',
            color: 'var(--white)',
            fontSize: '14.5px',
            zIndex: 120,
          }}
        >
          {toast}
        </div>
      )}
    </motion.section>
  )
}
