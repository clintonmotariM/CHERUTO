import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, CalendarDays, Shirt } from 'lucide-react'
import useMemorialData from '../hooks/useMemorialData'
import { supabase } from '../lib/supabaseClient'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import OutlineButton from '../components/ui/OutlineButton'

export default function GatheringPage() {
  const { schedule, loading } = useMemorialData()
  const [form, setForm] = useState({ name: '', contact: '', partySize: 1, note: '' })
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const submitAttendance = async (event) => {
    event.preventDefault()

    const partySize = Number(form.partySize)
    if (!form.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your full name.' })
      return
    }
    if (!Number.isInteger(partySize) || partySize < 1 || partySize > 20) {
      setStatus({ type: 'error', message: 'Party size must be between 1 and 20.' })
      return
    }

    setStatus({ type: 'loading', message: 'Saving your attendance…' })

    const record = {
      attendee_name: form.name.trim(),
      attendee_email: form.contact.trim() || null,
      party_size: partySize,
      attendance_status: 'attending',
      note: form.note.trim() || null,
    }

    if (!supabase) {
      try {
        const existing = JSON.parse(localStorage.getItem('cherono-rsvp') || '[]')
        localStorage.setItem('cherono-rsvp', JSON.stringify([...existing, record]))
      } catch {}
      setStatus({ type: 'success', message: 'We look forward to celebrating with you' })
      setForm({ name: '', contact: '', partySize: 1, note: '' })
      return
    }

    const { error } = await supabase.from('funeral_attendance').insert(record)
    if (error) {
      setStatus({ type: 'error', message: 'Could not save your RSVP. Please try again.' })
      return
    }

    setStatus({ type: 'success', message: 'We look forward to celebrating with you' })
    setForm({ name: '', contact: '', partySize: 1, note: '' })
  }

  const formatSchedule = (item) => {
    if (!item.starts_at) return 'Time to be confirmed'
    return new Date(item.starts_at).toLocaleString(undefined, { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px', color: 'var(--text-brown)' }}>The Gathering</h2>
      {loading && <p style={{ fontSize: '15px' }}>Loading gathering details…</p>}

      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px' }}>
        {schedule.map((item, index) => (
          <article key={item.id || index} style={{ width: '100%', padding: '18px', background: 'var(--white)', borderRadius: '18px', boxShadow: '0 8px 24px rgba(93,64,55,.08)', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)' }}><CalendarDays size={18} aria-hidden="true" /><strong>{formatSchedule(item)}</strong></div>
            <h3 style={{ margin: '12px 0 6px', color: 'var(--text-brown)', fontSize: '18px' }}>{item.event_name}</h3>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '16px', lineHeight: 1.55 }}><MapPin size={18} style={{ flex: '0 0 18px', marginTop: '3px' }} aria-hidden="true" /><span>{item.location_name || 'Venue details to be confirmed'}{item.address ? ` — ${item.address}` : ''}</span></div>
            {item.notes && <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '10px', fontSize: '16px', lineHeight: 1.55 }}><Shirt size={18} style={{ flex: '0 0 18px', marginTop: '3px' }} aria-hidden="true" /><span>{item.notes}</span></div>}
            {item.address && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.location_name || ''} ${item.address}`)}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', marginTop: '12px', textDecoration: 'none' }}><OutlineButton>Open Map / Directions</OutlineButton></a>}
          </article>
        ))}
      </div>

      <form onSubmit={submitAttendance} style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px', padding: '20px', background: 'var(--white)', borderRadius: '22px', boxShadow: '0 10px 28px rgba(93,64,55,.10)', textAlign: 'left' }}>
        <h3 style={{ textAlign: 'center', color: 'var(--text-brown)', fontSize: '20px' }}>Confirm Attendance</h3>
        <label style={{ fontSize: '15px', fontWeight: 700 }}>Guest Full Name <span aria-hidden="true">*</span><InputField required name="name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Your full name" /></label>
        <label style={{ fontSize: '15px', fontWeight: 700 }}>Phone / Email <span style={{ fontWeight: 400 }}>(optional)</span><InputField name="contact" value={form.contact} onChange={(event) => update('contact', event.target.value)} placeholder="Phone or email" /></label>
        <label style={{ fontSize: '15px', fontWeight: 700 }}>Party Size<select name="partySize" value={form.partySize} onChange={(event) => update('partySize', event.target.value)} style={{ width: '100%', minHeight: '44px', marginTop: '8px', border: '1px solid var(--text-brown)', borderRadius: '10px', background: 'var(--bg-cream)', color: 'var(--text-brown)', padding: '8px', fontSize: '16px' }}>{Array.from({ length: 20 }, (_, index) => index + 1).map((size) => <option key={size} value={size}>{size}</option>)}</select></label>
        <label style={{ fontSize: '15px', fontWeight: 700 }}>Attendance Note<textarea name="note" value={form.note} onChange={(event) => update('note', event.target.value)} rows={3} placeholder="Anything you would like to add" style={{ width: '100%', minHeight: '44px', marginTop: '8px', border: '1px solid var(--text-brown)', borderRadius: '10px', background: 'var(--bg-cream)', color: 'var(--text-brown)', padding: '10px', fontSize: '16px', resize: 'vertical' }} /></label>
        {status.message && <p role="status" style={{ minHeight: '20px', color: status.type === 'error' ? '#9C2F46' : 'var(--accent-purple)', fontSize: '15px', fontWeight: 700 }}>{status.message}</p>}
        <Button type="submit" disabled={status.type === 'loading'} style={{ width: '100%', borderRadius: '999px' }}>{status.type === 'loading' ? 'Saving…' : 'Confirm Attendance'}</Button>
      </form>
    </motion.section>
  )
}
