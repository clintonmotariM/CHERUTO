import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

const box = { width: '100%', maxWidth: '460px', padding: '18px', background: 'var(--white)', borderRadius: '20px', boxShadow: '0 8px 24px rgba(93,64,55,.08)', textAlign: 'left' }
const field = { width: '100%', boxSizing: 'border-box', minHeight: '44px', padding: '10px 14px', fontSize: '16px', fontFamily: 'inherit', color: 'var(--text-brown)', background: 'var(--white)', border: '1.5px solid var(--accent-purple)', borderRadius: '14px', outline: 'none' }

export default function HerHomePage() {
  const [memories, setMemories] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')

  const load = async () => {
    if (!supabase) return
    const { data, error } = await supabase
      .from('memories')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(100)
    if (error) console.error(error)
    else setMemories(data || [])
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!supabase || sending) return
    setSending(true)
    setStatus('')
    const { error } = await supabase
      .from('memories')
      .insert({ name: name.trim(), message: message.trim() })
    setSending(false)
    if (error) {
      console.error(error)
      setStatus('Something went wrong. Please try again.')
      return
    }
    setName('')
    setMessage('')
    setStatus('Thank you for sharing.')
    load()
  }

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px' }}>Her Home</h2>
      <p style={{ maxWidth: '460px', lineHeight: 1.8 }}>Leave a remembrance or a message of love for Cheruto and her family.</p>

      <form onSubmit={submit} style={{ ...box, display: 'grid', gap: '12px' }}>
        <input style={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={80} required />
        <textarea style={{ ...field, minHeight: '120px', resize: 'vertical' }} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your memory or message" maxLength={1000} required />
        <button type="submit" disabled={sending} style={{ minHeight: '44px', padding: '12px 24px', border: 'none', borderRadius: '40px', background: 'var(--btn-pink)', color: 'var(--white)', fontWeight: 700, fontSize: '16px', opacity: sending ? 0.6 : 1 }}>
          {sending ? 'Sending...' : 'Leave a Memory'}
        </button>
        {status && <p role="status" style={{ margin: 0 }}>{status}</p>}
      </form>

      {memories.map((m) => (
        <article key={m.id} style={box}>
          <strong style={{ color: 'var(--accent-purple)' }}>{m.name}</strong>
          <p style={{ marginTop: '6px', lineHeight: 1.6, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{m.message}</p>
        </article>
      ))}
    </motion.section>
  )
}