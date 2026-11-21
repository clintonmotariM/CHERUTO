import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div style={{ width: 'min(280px, 82vw)', aspectRatio: '4 / 5', borderRadius: '160px 160px 24px 24px', background: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))', boxShadow: '0 16px 40px rgba(93,64,55,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontFamily: 'var(--font-script)', fontSize: '38px' }}>Cherono</div>
      <p style={{ maxWidth: '460px', lineHeight: 1.8 }}>A life remembered with love, laughter, and the many moments that made her unforgettable.</p>
      <p style={{ fontWeight: 700, color: 'var(--accent-purple)' }}>Forever held close</p>
    </motion.section>
  )
}
