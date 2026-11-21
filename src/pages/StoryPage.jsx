import { motion } from 'framer-motion'

const moments = [
  ['Her beginning', 'A bright spirit from the very start.'],
  ['Her passions', 'The things that brought her joy and purpose.'],
  ['Her people', 'A heart that gathered everyone close.'],
  ['Her legacy', 'Love that continues through the lives she touched.'],
]

export default function StoryPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px', color: 'var(--text-brown)' }}>Her Story</h2>
      {moments.map(([title, text]) => (
        <article key={title} style={{ width: '100%', maxWidth: '460px', padding: '18px', background: 'var(--white)', borderRadius: '20px', boxShadow: '0 8px 24px rgba(93,64,55,.08)', textAlign: 'left' }}>
          <h3 style={{ color: 'var(--accent-purple)', marginBottom: '6px' }}>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </motion.section>
  )
}
