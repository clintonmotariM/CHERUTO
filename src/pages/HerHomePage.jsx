import { motion } from 'framer-motion'

export default function HerHomePage() {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px' }}>Her Home</h2>
      <div style={{ width: '100%', maxWidth: '460px', padding: '22px', background: 'var(--white)', borderRadius: '22px', boxShadow: '0 8px 24px rgba(93,64,55,.08)' }}>
        <p style={{ lineHeight: 1.8 }}>Leave a remembrance, share a photo, or carry a message of love for Cherono and her family.</p>
      </div>
      <button type="button" style={{ minHeight: '44px', padding: '12px 24px', border: 'none', borderRadius: '40px', background: 'var(--btn-pink)', color: 'var(--white)', fontWeight: 700 }}>Leave a Memory</button>
    </motion.section>
  )
}
