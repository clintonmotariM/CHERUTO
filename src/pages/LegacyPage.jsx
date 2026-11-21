import { motion } from 'framer-motion'

export default function LegacyPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px' }}>Her Legacy</h2>
      <blockquote style={{ width: '100%', maxWidth: '460px', padding: '24px', background: 'var(--white)', borderLeft: '4px solid var(--accent-green)', borderRadius: '16px', fontSize: '18px', lineHeight: 1.7 }}>“What we keep in our hearts is never lost.”</blockquote>
      <p style={{ maxWidth: '460px', lineHeight: 1.8 }}>Cherono’s warmth lives on in every kindness shared, every story retold, and every gathering held in her honor.</p>
    </motion.section>
  )
}
