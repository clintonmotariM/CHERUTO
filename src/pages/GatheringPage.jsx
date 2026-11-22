import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MapPin, Award, ChevronDown, Flame, Bus, HeartHandshake, Calendar } from 'lucide-react'
import useMemorialData from '../hooks/useMemorialData'
import { supabase } from '../lib/supabaseClient'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'

const saintJohnsSlides = [
  { caption: 'Campus First-Aid Drives', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
  { caption: 'Community Outreach', gradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
  { caption: "Saint John's Humanitarian Service", gradient: 'linear-gradient(145deg, #F5B7A7, var(--accent-purple))' },
]

const scheduleEvents = [
  {
    id: 'vigil',
    icon: <Flame size={18} style={{ color: 'var(--accent-purple)', flexShrink: 0 }} aria-hidden="true" />,
    iconColor: 'var(--accent-purple)',
    title: 'MKU Candle Lighting Vigil',
    timeBadge: '7:00 – 9:00 PM',
    day: 'Monday Night',
    location: 'MKU Campus',
    description: 'Join us in light and remembrance as we gather around the flame to honor Cheruto’s life.',
  },
  {
    id: 'departure',
    icon: <Bus size={18} style={{ color: 'var(--btn-pink)', flexShrink: 0 }} aria-hidden="true" />,
    iconColor: 'var(--btn-pink)',
    title: 'Eldoret School Transport',
    timeBadge: 'Same-Day Return',
    day: 'Wednesday',
    location: 'MKU Main Gate → Eldoret',
    description: 'Complimentary MKU student bus to Eldoret returning the same day on the same bus.',
  },
  {
    id: 'burial',
    icon: <HeartHandshake size={18} style={{ color: '#5C343D', flexShrink: 0 }} aria-hidden="true" />,
    iconColor: '#5C343D',
    title: 'Burial Service at Home',
    timeBadge: 'Home Service',
    day: 'Thursday',
    location: 'Eldoret (Her Family Home)',
    description: 'Final farewell surrounded by family and friends at her home place.',
  },
]

export default function GatheringPage() {
  const { schedule = [] } = useMemorialData()
  const [form, setForm] = useState({ name: '', contact: '', partySize: 1, note: '' })
  const [memberRole, setMemberRole] = useState('Student')
  const [needsBusTransport, setNeedsBusTransport] = useState(false)
  const [studentRegPhone, setStudentRegPhone] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const timer = window.setInterval(() => {
      setPhotoIndex((current) => (current + 1) % saintJohnsSlides.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [shouldReduceMotion])

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
      member_role: memberRole,
      needs_school_transport: needsBusTransport,
      student_reg_phone: needsBusTransport ? studentRegPhone.trim() || null : null,
      note: form.note.trim() || null,
    }

    if (!supabase) {
      try {
        const existing = JSON.parse(localStorage.getItem('cheruto-rsvp') || '[]')
        localStorage.setItem('cheruto-rsvp', JSON.stringify([...existing, record]))
      } catch {}
      setStatus({ type: 'success', message: needsBusTransport ? 'Eldoret Wednesday School Bus seat reserved.' : 'We look forward to celebrating with you' })
      setForm({ name: '', contact: '', partySize: 1, note: '' })
      setIsFormOpen(false)
      return
    }

    const { error } = await supabase.from('funeral_attendance').insert(record)
    if (error) {
      setStatus({ type: 'error', message: 'Could not save your RSVP. Please try again.' })
      return
    }

    setStatus({ type: 'success', message: needsBusTransport ? 'Eldoret Wednesday School Bus seat reserved.' : 'We look forward to celebrating with you' })
    setForm({ name: '', contact: '', partySize: 1, note: '' })
    setIsFormOpen(false)
  }

  const liveSchedule = (schedule || []).filter((item) => item.title && item.location)
  const allEvents = [...scheduleEvents, ...liveSchedule]

  const attendeeCounts = { Family: 0, Friends: 0, Students: 0, busSeats: 0 }

  return (
    <motion.section
      className="no-scrollbar"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        width: '100%',
        paddingTop: 'max(18px, calc(var(--safe-top) + 12px))',
        paddingBottom: 'calc(var(--nav-height) + 48px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        boxSizing: 'border-box',
      }}
    >
      {/* Section 1: Saint John's Hero */}
      <div style={{ width: '100%', maxWidth: '430px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <span style={{ alignSelf: 'center', margin: '0 auto 12px auto', display: 'inline-flex', alignItems: 'center', padding: '6px 22px', borderRadius: '999px', backgroundColor: 'rgba(139, 26, 43, 0.12)', border: '1px solid rgba(139, 26, 43, 0.24)', color: '#8B1A2B', fontSize: '13.5px', fontWeight: 700, letterSpacing: '0.03em' }}>Saint John's</span>

        <div style={{ width: '100%', height: '68vh', minHeight: '380px', maxHeight: '620px', borderRadius: '20px', overflow: 'hidden', position: 'relative', boxShadow: '0 12px 32px rgba(93, 64, 55, 0.12)', background: saintJohnsSlides[photoIndex].gradient }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              style={{ width: '100%', height: '100%', background: saintJohnsSlides[photoIndex].gradient }}
            >
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontSize: '14px', fontWeight: 600, opacity: 0.9 }}>
                {saintJohnsSlides[photoIndex].caption}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ width: '100%', maxWidth: '490px', backgroundColor: 'var(--white)', borderRadius: '18px', padding: '16px 20px', boxShadow: '0 8px 24px rgba(93, 64, 55, 0.08)', textAlign: 'left' }}>
          <p style={{ margin: '0 0 14px 0', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-brown)' }}>
            Cheruto gave herself wholeheartedly to the Saint John's Red Cross Community. She showed up for campus first-aid drives, community outreach missions, and peer care with quiet courage and steady hands—always among the first to respond and the last to leave. Her selfless service and unwavering dedication earned her recognition as a Community Service Award Recipient, a reflection of the compassion she carried in everything she did.
          </p>
          <div style={{ backgroundColor: 'rgba(255, 249, 242, 0.95)', border: '1px solid rgba(212, 163, 67, 0.35)', borderRadius: '14px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={20} style={{ color: '#C58B2A', flexShrink: 0 }} aria-hidden="true" />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-brown)', fontSize: '13px' }}>Community Service Award Recipient</div>
              <div style={{ fontSize: '12px', color: 'rgba(93, 64, 55, 0.75)', lineHeight: 1.4 }}>Honored for her dedicated leadership and active service in Saint John's Red Cross activities.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Schedule Cards */}
      <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <span style={{ margin: '6px auto 4px auto', padding: '4px 20px', borderRadius: '999px', backgroundColor: 'var(--white)', border: '1px solid rgba(157, 78, 221, 0.18)', boxShadow: '0 4px 14px rgba(93, 64, 55, 0.06)', fontFamily: 'var(--font-script)', fontSize: 'clamp(1.35rem, 4.5vw, 1.6rem)', lineHeight: 1, color: 'var(--text-brown)' }}>Farewell Schedule</span>
        {allEvents.map((item, index) => {
          const Icon = item.icon
          return (
            <article key={item.id || index} style={{ width: '100%', maxWidth: '460px', backgroundColor: 'var(--white)', borderRadius: '18px', padding: '14px 16px', boxShadow: '0 6px 20px rgba(93, 64, 55, 0.07)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(93, 64, 55, 0.05)' }}>{Icon}</div>
                  <h3 style={{ margin: 0, fontWeight: 700, fontSize: '15.5px', color: 'var(--text-brown)' }}>{item.title}</h3>
                </div>
                <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '3px 9px', borderRadius: '999px', backgroundColor: 'rgba(93, 64, 55, 0.06)', color: 'var(--text-brown)' }}>{item.timeBadge}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', padding: '6px 10px', borderRadius: '10px', backgroundColor: 'rgba(255, 249, 242, 0.9)', marginBottom: '8px', fontSize: '12.5px', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(93, 64, 55, 0.8)' }}><Calendar size={13} aria-hidden="true" /><strong>{item.day}</strong></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(93, 64, 55, 0.8)' }}><MapPin size={13} aria-hidden="true" /><strong>{item.location}</strong></span>
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.45, color: 'rgba(93, 64, 55, 0.85)' }}>{item.description}</p>
            </article>
          )
        })}
      </div>

      {/* Section 3: Collapsible Attendance & Student Transport Form */}
      <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <motion.article
          layout
          key="attendance-trigger"
          role="button"
          tabIndex={0}
          style={{
            width: '100%',
            minHeight: '54px',
            background: 'var(--white)',
            borderRadius: '16px',
            padding: '12px 16px',
            boxShadow: '0 6px 18px rgba(93,64,55,.07)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onClick={() => setIsFormOpen((open) => !open)}
          onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setIsFormOpen((open) => !open) } }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: '22px', padding: '3px 10px', borderRadius: '999px', background: 'var(--btn-pink)', color: 'var(--white)', fontSize: '11px', fontWeight: 700 }}>Sign In</span>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-brown)', fontSize: '15px' }}>Record Attendance & Eldoret Bus Seat</div>
              <div style={{ fontSize: '12.5px', color: 'rgba(93, 64, 55, 0.7)' }}>Tap to sign in for MKU Vigil & reserve student transport</div>
            </div>
          </div>
          <ChevronDown size={16} style={{ transition: 'transform 0.3s ease', transform: isFormOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </motion.article>

        {isFormOpen && (
          <AnimatePresence initial={false}>
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={submitAttendance}
              style={{
                width: '100%',
                maxWidth: '460px',
                display: 'grid',
                gap: '12px',
                padding: '20px',
                background: 'var(--white)',
                borderRadius: '22px',
                boxShadow: '0 10px 28px rgba(93,64,55,.10)',
                textAlign: 'left',
              }}
            >
              <h3 style={{ textAlign: 'center', color: 'var(--text-brown)', fontSize: '20px' }}>Confirm Attendance</h3>

              <label style={{ fontSize: '15px', fontWeight: 700 }}>Guest Full Name <span aria-hidden="true">*</span><InputField required name="name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Your full name" /></label>

              <label style={{ fontSize: '15px', fontWeight: 700, marginTop: '4px' }}>Member Relationship</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['Student', 'Friend', 'Family'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => { setMemberRole(role); setNeedsBusTransport(role === 'Student' ? false : false) }}
                    style={{
                      minHeight: '44px',
                      border: `1px solid ${memberRole === role ? 'var(--btn-pink)' : 'rgba(93, 64, 55, 0.25)'}`,
                      borderRadius: '12px',
                      background: memberRole === role ? 'var(--btn-pink)' : 'transparent',
                      color: memberRole === role ? 'var(--white)' : 'var(--text-brown)',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {memberRole === 'Student' && (
                <div style={{ backgroundColor: 'rgba(255, 249, 242, 0.9)', border: '1px solid rgba(212, 163, 67, 0.25)', borderRadius: '14px', padding: '12px 16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-brown)' }}>MKU School Transport to Eldoret</div>
                  <div style={{ fontSize: '12.5px', color: 'rgba(93, 64, 55, 0.8)', lineHeight: 1.5 }}>School-sponsored transport departs Wednesday to Eldoret and returns the same day on the same bus.</div>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-brown)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={needsBusTransport}
                      onChange={(event) => setNeedsBusTransport(event.target.checked)}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--btn-pink)' }}
                    />
                    Yes, assign me a seat on the MKU school bus to Eldoret (Wednesday — same-day return)
                  </label>
                  {needsBusTransport && (
                    <label style={{ fontSize: '15px', fontWeight: 700 }}>Student Reg / Phone Number <span style={{ fontWeight: 400 }}>(optional)</span><InputField name="studentRegPhone" value={studentRegPhone} onChange={(event) => setStudentRegPhone(event.target.value)} placeholder="Reg number or phone" /></label>
                  )}
                </div>
              )}

              <label style={{ fontSize: '15px', fontWeight: 700 }}>Phone / Email <span style={{ fontWeight: 400 }}>(optional)</span><InputField name="contact" value={form.contact} onChange={(event) => update('contact', event.target.value)} placeholder="Phone or email" /></label>

              <label style={{ fontSize: '15px', fontWeight: 700 }}>Party Size<select name="partySize" value={form.partySize} onChange={(event) => update('partySize', event.target.value)} style={{ width: '100%', minHeight: '44px', marginTop: '8px', border: '1px solid var(--text-brown)', borderRadius: '10px', background: 'var(--bg-cream)', color: 'var(--text-brown)', padding: '8px', fontSize: '16px' }}>{Array.from({ length: 20 }, (_, index) => index + 1).map((size) => <option key={size} value={size}>{size}</option>)}</select></label>

              <label style={{ fontSize: '15px', fontWeight: 700 }}>Attendance Note<textarea name="note" value={form.note} onChange={(event) => update('note', event.target.value)} rows={3} placeholder="Anything you would like to add" style={{ width: '100%', minHeight: '44px', marginTop: '8px', border: '1px solid var(--text-brown)', borderRadius: '10px', background: 'var(--bg-cream)', color: 'var(--text-brown)', padding: '10px', fontSize: '16px', resize: 'vertical' }} /></label>

              {status.message && <p role="status" style={{ minHeight: '20px', color: status.type === 'error' ? '#9C2F46' : 'var(--accent-purple)', fontSize: '15px', fontWeight: 700 }}>{status.message}</p>}

              <Button type="submit" disabled={status.type === 'loading'} style={{ width: '100%', borderRadius: '999px', minHeight: '48px' }}>{status.type === 'loading' ? 'Saving…' : needsBusTransport ? 'Reserve Bus Seat' : 'Confirm Attendance'}</Button>
            </motion.form>
          </AnimatePresence>
        )}
      </div>

      <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(93, 64, 55, 0.75)' }}>
          <span style={{ fontWeight: 700, color: 'var(--accent-purple)' }}>{attendeeCounts.Family}</span> Family ·
          <span style={{ fontWeight: 700, color: 'var(--btn-pink)' }}>{attendeeCounts.Friends}</span> Friends ·
          <span style={{ fontWeight: 700, color: 'var(--accent-green)' }}>{attendeeCounts.Students}</span> Students ·
          <span style={{ fontWeight: 700, color: '#5C343D' }}>{attendeeCounts.busSeats}</span> Bus Seats Reserved
        </div>
      </div>
    </motion.section>
  )
}
