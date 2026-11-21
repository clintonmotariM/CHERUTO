import { useState } from 'react'
import { motion } from 'framer-motion'
import useMemorialData from '../hooks/useMemorialData'
import QuoteCard from '../components/ui/QuoteCard'
import Button from '../components/ui/Button'

export default function LegacyPage() {
  const { awareness, memories } = useMemorialData()
  const [toast, setToast] = useState('')

  const shareMemorial = async () => {
    const shareData = { title: 'Cherono — Celebration of Life', text: 'Remember and celebrate Cherono’s life.', url: window.location.href }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href)
        setToast('Link Copied')
        window.setTimeout(() => setToast(''), 2200)
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setToast('Link could not be shared')
    }
  }

  const values = [
    { title: 'Lead with Love', color: 'var(--accent-purple)' },
    { title: 'Choose Joy', color: 'var(--btn-pink)' },
    { title: 'Grow Together', color: 'var(--accent-green)' },
  ]

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px', color: 'var(--text-brown)' }}>Her Legacy</h2>

      <QuoteCard style={{ width: '100%', maxWidth: '460px', textAlign: 'left', borderRadius: '16px', fontSize: '18px', lineHeight: 1.7 }}>
        “What we keep in our hearts is never lost.”
      </QuoteCard>

      {awareness?.slice(0, 2).map((item) => (
        <QuoteCard key={item.id} style={{ width: '100%', maxWidth: '460px', textAlign: 'left', borderRadius: '16px', borderLeftColor: 'var(--accent-green)' }}>
          <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--text-brown)' }}>{item.name}</strong>
          <span style={{ color: 'var(--text-brown)', fontSize: '16px', lineHeight: 1.55 }}>{item.memorial_note}</span>
        </QuoteCard>
      ))}

      <div style={{ width: '100%', maxWidth: '460px' }}>
        <h3 style={{ marginBottom: '10px', color: 'var(--text-brown)' }}>What She Taught Us</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {values.map((value) => (
            <div key={value.title} style={{ minHeight: '94px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '18px', background: value.color, color: 'var(--white)', fontSize: '15px', fontWeight: 700 }}>{value.title}</div>
          ))}
        </div>
      </div>

      {memories?.slice(0, 2).map((memory) => (
        <QuoteCard key={memory.id} style={{ width: '100%', maxWidth: '460px', textAlign: 'left', borderRadius: '16px', fontSize: '16px', lineHeight: 1.55 }}>
          “{memory.memory}”
          <strong style={{ display: 'block', marginTop: '8px', color: 'var(--accent-purple)', fontSize: '15px' }}>— {memory.author_name || 'Family and friends'}</strong>
        </QuoteCard>
      ))}

      <Button type="button" onClick={shareMemorial} style={{ borderRadius: '999px', marginTop: '4px' }}>Share Memorial</Button>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 'calc(var(--nav-height) + var(--safe-bottom) + 28px)', left: '50%', transform: 'translateX(-50%)', padding: '10px 16px', borderRadius: '999px', background: 'var(--text-brown)', color: 'var(--white)', fontSize: '15px', zIndex: 120 }}>{toast}</div>}
    </motion.section>
  )
}
