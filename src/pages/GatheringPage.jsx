import { motion } from 'framer-motion'

export default function GatheringPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px' }}>The Gathering</h2>
      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px' }}>
        {[
          ['Service', 'Details coming soon'],
          ['Date', 'A date to remember'],
          ['Attire', 'Celebrate with color'],
        ].map(([title, detail]) => (
          <article key={title} style={{ padding: '18px', background: 'var(--white)', borderRadius: '18px', boxShadow: '0 8px 24px rgba(93,64,55,.08)' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>{title}</strong>
            <p style={{ marginTop: '6px' }}>{detail}</p>
          </article>
        ))}
      </div>
    </motion.section>
  )
}
