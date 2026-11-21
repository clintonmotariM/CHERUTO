import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useMemorialData from '../hooks/useMemorialData'
import { supabase } from '../lib/supabaseClient'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import QuoteCard from '../components/ui/QuoteCard'

export default function HerHomePage() {
  const { memories, loading } = useMemorialData()
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ name: '', relationship: '', memory: '' })
  const [localMemories, setLocalMemories] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cheruto-memories') || '[]')
    } catch {
      return []
    }
  })
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const submitMemory = async (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' })
      return
    }
    if (!form.memory.trim()) {
      setStatus({ type: 'error', message: 'Please share a memory.' })
      return
    }
    if (form.memory.trim().length > 5000) {
      setStatus({ type: 'error', message: 'Please keep your memory within 5000 characters.' })
      return
    }

    setStatus({ type: 'loading', message: 'Sharing your memory…' })

    const record = {
      id: `local-${Date.now()}`,
      author_name: form.name.trim(),
      relationship: form.relationship.trim() || 'Friend',
      memory: form.memory.trim(),
      is_approved: false,
    }

    if (supabase) {
      const { error } = await supabase.from('guestbook_memories').insert({
        author_name: record.author_name,
        relationship: record.relationship,
        memory: record.memory,
        is_approved: false,
      })
      if (error) {
        setStatus({ type: 'error', message: 'Could not share your memory. Please try again.' })
        return
      }
    } else {
      try {
        const existing = JSON.parse(localStorage.getItem('cheruto-memories') || '[]')
        localStorage.setItem('cheruto-memories', JSON.stringify([record, ...existing]))
      } catch {}
    }

    setLocalMemories((current) => [record, ...current])
    setForm({ name: '', relationship: '', memory: '' })
    setStatus({ type: 'success', message: 'Shared — pending family blessing' })
  }

  const visibleMemories = [...localMemories, ...(memories || [])]

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px', color: 'var(--text-brown)' }}>Her Home</h2>

      <div style={{ width: '100%', maxWidth: '460px', padding: '20px', background: 'var(--white)', borderRadius: '22px', boxShadow: '0 8px 24px rgba(93,64,55,.08)' }}>
        <p style={{ fontSize: '16px', lineHeight: 1.65 }}>Leave a remembrance, share a photo, or carry a message of love for Cheruto and her family.</p>
        <Button type="button" onClick={() => setFormOpen((open) => !open)} aria-expanded={formOpen} style={{ width: '100%', marginTop: '14px', borderRadius: '999px' }}>{formOpen ? 'Close Tribute Form' : 'Leave a Memory'}</Button>
      </div>

      <AnimatePresence initial={false}>
        {formOpen && (
          <motion.form
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            onSubmit={submitMemory}
            style={{ width: '100%', maxWidth: '460px', overflow: 'hidden', display: 'grid', gap: '12px', padding: '20px', background: 'var(--white)', borderRadius: '22px', boxShadow: '0 10px 28px rgba(93,64,55,.10)', textAlign: 'left' }}
          >
            <label style={{ fontSize: '15px', fontWeight: 700 }}>Your Name <span aria-hidden="true">*</span><InputField required name="name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" /></label>
            <label style={{ fontSize: '15px', fontWeight: 700 }}>Relationship <span style={{ fontWeight: 400 }}>(optional)</span><InputField name="relationship" value={form.relationship} onChange={(event) => update('relationship', event.target.value)} placeholder="Family, Friend, Classmate…" /></label>
            <label style={{ fontSize: '15px', fontWeight: 700 }}>Your Memory <span aria-hidden="true">*</span><textarea name="memory" required value={form.memory} maxLength={5000} onChange={(event) => update('memory', event.target.value)} rows={5} placeholder="Share a memory" style={{ width: '100%', minHeight: '44px', marginTop: '8px', border: '1px solid var(--text-brown)', borderRadius: '10px', background: 'var(--bg-cream)', color: 'var(--text-brown)', padding: '10px', fontSize: '16px', resize: 'vertical' }} /></label>
            <p style={{ color: 'var(--text-brown)', fontSize: '12px', textAlign: 'right' }}>{form.memory.length}/5000</p>
            {status.message && <p role="status" style={{ color: status.type === 'error' ? '#9C2F46' : 'var(--accent-purple)', fontSize: '15px', fontWeight: 700 }}>{status.message}</p>}
            <Button type="submit" disabled={status.type === 'loading'} style={{ width: '100%', borderRadius: '999px' }}>{status.type === 'loading' ? 'Sharing…' : 'Share Memory'}</Button>
          </motion.form>
        )}
      </AnimatePresence>

      {loading && <p style={{ fontSize: '15px' }}>Loading shared memories…</p>}

      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px' }}>
        {visibleMemories.map((memory) => (
          <QuoteCard key={memory.id} style={{ width: '100%', borderRadius: '16px', textAlign: 'left', fontSize: '16px', lineHeight: 1.55 }}>
            “{memory.memory}”
            {!memory.is_approved && <span style={{ display: 'inline-block', marginTop: '10px', padding: '5px 9px', borderRadius: '999px', background: 'var(--accent-purple)', color: 'var(--white)', fontSize: '11px', fontWeight: 700 }}>Shared — pending family blessing</span>}
            <strong style={{ display: 'block', marginTop: '8px', color: 'var(--accent-purple)', fontSize: '15px' }}>— {memory.author_name || 'Friend'}{memory.relationship ? ` · ${memory.relationship}` : ''}</strong>
          </QuoteCard>
        ))}
      </div>
    </motion.section>
  )
}
