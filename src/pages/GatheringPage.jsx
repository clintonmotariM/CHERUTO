import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

const fallback = [
  { id: 'service', title: 'Service', detail: 'Details coming soon' },
  { id: 'date', title: 'Date', detail: 'A date to remember' },
  { id: 'attire', title: 'Attire', detail: 'Celebrate with color' },
]

export default function GatheringPage() {
  const [items, setItems] = useState(fallback)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('gathering_details')
      .select('id, title, detail')
      .order('sort_order')
      .then(({ data, error }) => {
        if (error) console.error(error)
        else if (data && data.length) setItems(data)
      })
  }, [])

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px' }}>The Gathering</h2>
      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px' }}>
        {items.map(({ id, title, detail }) => (
          <article key={id} style={{ padding: '18px', background: 'var(--white)', borderRadius: '18px', boxShadow: '0 8px 24px rgba(93,64,55,.08)' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>{title}</strong>
            <p style={{ marginTop: '6px' }}>{detail}</p>
          </article>
        ))}
      </div>
    </motion.section>
  )
}