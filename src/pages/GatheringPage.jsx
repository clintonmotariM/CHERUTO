import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MapPin, Award, ChevronDown, Check, Flame, Bus, HeartHandshake, Share2 } from 'lucide-react'
import useMemorialData from '../hooks/useMemorialData'
import { supabase } from '../lib/supabaseClient'
import InputField from '../components/ui/InputField'
import ExpandableReveal from '../components/ExpandableReveal'

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
    dayTime: 'MONDAY NIGHT • 7:00 – 9:00 PM',
    description: 'Join us in light and remembrance as we gather around the flame to honor Cheruto’s life.',
    expandedDescription: 'The MKU Candle Lighting Vigil brings family, friends, and classmates together on Monday night to share stories, light candles, and carry Cheruto’s light forward. A quiet, sacred moment of remembrance on campus grounds.',
    locationSlides: [
      { caption: 'Mount Kenya University Campus Grounds', gradient: 'linear-gradient(145deg, var(--accent-purple), #5C343D)' },
      { caption: 'Evening Vigil Square', gradient: 'linear-gradient(145deg, #5C343D, var(--btn-pink))' },
      { caption: 'Candlelight Gathering Spot', gradient: 'linear-gradient(145deg, var(--btn-pink), var(--accent-purple))' },
    ],
  },
  {
    id: 'departure',
    icon: <Bus size={18} style={{ color: 'var(--btn-pink)', flexShrink: 0 }} aria-hidden="true" />,
    iconColor: 'var(--btn-pink)',
    title: 'Eldoret School Transport',
    timeBadge: 'Same-Day Return',
    day: 'Wednesday',
    location: 'MKU Main Gate → Eldoret',
    dayTime: 'WEDNESDAY • SAME-DAY RETURN',
    description: 'Complimentary MKU student bus to Eldoret returning the same day on the same bus.',
    expandedDescription: 'A school-sponsored coach departs MKU Main Gate on Wednesday, carrying students to Eldoret for the burial service and returning the same day on the same bus. Reserved seats for students.',
    locationSlides: [
      { caption: 'MKU Main Gate Departure Point', gradient: 'linear-gradient(145deg, var(--btn-pink), #5C343D)' },
      { caption: 'Rift Valley Highway Journey to Eldoret', gradient: 'linear-gradient(145deg, #5C343D, var(--accent-purple))' },
      { caption: 'Student Coach Assembly', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
    ],
  },
  {
    id: 'burial',
    icon: <HeartHandshake size={18} style={{ color: '#5C343D', flexShrink: 0 }} aria-hidden="true" />,
    iconColor: '#5C343D',
    title: 'Burial Service at Home',
    timeBadge: 'Home Service',
    day: 'Thursday',
    location: 'Eldoret — Her Family Home',
    dayTime: 'THURSDAY • HOME SERVICE',
    description: 'Final farewell surrounded by family and friends at her home place.',
    expandedDescription: 'The burial service takes place at Cheruto’s family home in Eldoret on Thursday, surrounded by loved ones. A solemn farewell in the place she called home.',
    locationSlides: [
      { caption: "Cheruto's Family Home in Eldoret", gradient: 'linear-gradient(145deg, #5C343D, var(--accent-purple))' },
      { caption: 'Homestead Compound & Grounds', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { caption: 'Final Resting Place', gradient: 'linear-gradient(145deg, var(--btn-pink), #5C343D)' },
    ],
  },
]

const getFieldSurfaceStyle = (isFilled) => ({
  backgroundColor: isFilled ? 'rgba(157, 78, 221, 0.10)' : 'rgba(255, 255, 255, 0.92)',
  background: isFilled ? 'linear-gradient(135deg, rgba(157, 78, 221, 0.10), rgba(255, 77, 133, 0.12))' : undefined,
  border: isFilled ? '1.5px solid rgba(255, 77, 133, 0.42)' : '1px solid rgba(157, 78, 221, 0.22)',
  borderRadius: '12px',
  padding: '10px 12px',
  fontSize: '14px',
  color: 'var(--text-brown)',
  width: '100%',
  boxSizing: 'border-box',
  boxShadow: isFilled ? '0 2px 8px rgba(157, 78, 221, 0.08)' : undefined,
})

export default function GatheringPage() {
  const { schedule = [] } = useMemorialData()
  const [form, setForm] = useState({ name: '', contact: '', gender: '', studentId: '', emergencyContact: '', note: '' })
  const [gender, setGender] = useState('')
  const [memberRole, setMemberRole] = useState('')
  const [needsSchoolTransport, setNeedsSchoolTransport] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [expandedEventId, setExpandedEventId] = useState(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [slideIndexByEvent, setSlideIndexByEvent] = useState({})
  const [activeDropdown, setActiveDropdown] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const openDropdown = (field) => setActiveDropdown(field)
  const closeDropdown = () => setActiveDropdown(null)

  const selectDropdownOption = (field, value) => {
    if (field === 'gender') setGender(value)
    if (field === 'relationship') setMemberRole(value)
    if (field === 'transport') setNeedsSchoolTransport(value)
    closeDropdown()
  }

  const getTransportLabel = () => {
    if (!needsSchoolTransport) return 'Select school bus transport'
    return needsSchoolTransport === 'yes' ? 'Yes — Assign MKU Bus Seat (Same-Day Return)' : 'No — Own Transport'
  }

  const getDropdownOptions = (field) => {
    const options = {
      gender: ['Female', 'Male'],
      relationship: ['Student', 'Friend', 'Family'],
      transport: [
        { value: 'yes', label: 'Yes — Assign MKU Bus Seat', sub: 'Departs Wednesday to Eldoret, returns same day' },
        { value: 'no', label: 'No — Own Transport', sub: 'Attending without school bus seat' },
      ],
    }
    return options[field] || []
  }

  const getSelectedValue = (field) => {
    if (field === 'gender') return gender
    if (field === 'relationship') return memberRole
    if (field === 'transport') return needsSchoolTransport
    return ''
  }

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const timer = window.setInterval(() => {
      setPhotoIndex((current) => (current + 1) % saintJohnsSlides.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (shouldReduceMotion || !expandedEventId) return undefined
    const activeEvent = scheduleEvents.find((e) => e.id === expandedEventId)
    if (!activeEvent || !activeEvent.locationSlides || activeEvent.locationSlides.length <= 1) return undefined
    const timer = window.setInterval(() => {
      setSlideIndexByEvent((current) => {
        const currentIndex = current[expandedEventId] || 0
        return { ...current, [expandedEventId]: (currentIndex + 1) % activeEvent.locationSlides.length }
      })
    }, 5200)
    return () => window.clearInterval(timer)
  }, [shouldReduceMotion, expandedEventId, scheduleEvents])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') closeDropdown()
  }

  const getSlideIndex = (eventId, count) => ((slideIndexByEvent[eventId] || 0) < count ? (slideIndexByEvent[eventId] || 0) : 0)

  const submitAttendance = async (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your full name.' })
      return
    }
    if (!gender) {
      setStatus({ type: 'error', message: 'Please select your gender.' })
      return
    }
    if (!memberRole) {
      setStatus({ type: 'error', message: 'Please select your relationship.' })
      return
    }
    if (memberRole === 'Student' && !needsSchoolTransport) {
      setStatus({ type: 'error', message: 'Please select your school bus transport option.' })
      return
    }
    if (memberRole === 'Student' && !form.studentId.trim()) {
      setStatus({ type: 'error', message: 'Please enter your MKU Student ID Number.' })
      return
    }
    if (memberRole === 'Student' && !form.emergencyContact.trim()) {
      setStatus({ type: 'error', message: 'Please enter a parent / next-of-kin phone number.' })
      return
    }
    if (!form.contact.trim()) {
      setStatus({ type: 'error', message: 'Please enter your phone number.' })
      return
    }

    setStatus({ type: 'loading', message: 'Saving your attendance…' })

    const record = {
      attendee_name: form.name.trim(),
      attendee_email: null,
      party_size: 1,
      attendance_status: 'attending',
      gender,
      member_role: memberRole,
      needs_school_transport: needsSchoolTransport === 'yes',
      student_id: form.studentId.trim() || null,
      emergency_contact: form.emergencyContact.trim() || null,
      note: form.note.trim() || null,
    }

    if (!supabase) {
      try {
        const existing = JSON.parse(localStorage.getItem('cheruto-rsvp') || '[]')
        localStorage.setItem('cheruto-rsvp', JSON.stringify([...existing, record]))
      } catch {}
      setStatus({ type: 'success', message: needsSchoolTransport === 'yes' ? 'Eldoret Wednesday School Bus seat reserved.' : 'We look forward to celebrating with you' })
      setForm({ name: '', contact: '', gender: '', studentId: '', emergencyContact: '', note: '' })
      setGender('')
      setMemberRole('')
      setNeedsSchoolTransport('')
      setIsFormOpen(false)
      return
    }

    const { error } = await supabase.from('funeral_attendance').insert(record)
    if (error) {
      setStatus({ type: 'error', message: 'Could not save your RSVP. Please try again.' })
      return
    }

    setStatus({ type: 'success', message: needsSchoolTransport === 'yes' ? 'Eldoret Wednesday School Bus seat reserved.' : 'We look forward to celebrating with you' })
    setForm({ name: '', contact: '', gender: '', studentId: '', emergencyContact: '', note: '' })
    setGender('')
    setMemberRole('')
    setNeedsSchoolTransport('')
    setIsFormOpen(false)
  }

  const handleInvite = () => {
    const text = `You're invited to celebrate Cheruto's life.\n\n🕯️ MKU Candle Lighting Vigil\nMonday Night • 7:00 – 9:00 PM\nMount Kenya University (MKU) Campus\n\n🚌 Eldoret School Transport\nWednesday • Same-Day Return\nMKU Main Gate → Eldoret\n\n⚰️ Burial Service at Home\nThursday • Home Service\nEldoret — Her Family Home\n\nWalk with us.`
    if (navigator.share) {
      navigator.share({ title: 'Celebrate Cheruto’s Life', text })
        .then(() => setStatus({ type: 'success', message: 'Invitation shared' }))
        .catch(() => {})
    } else {
      navigator.clipboard.writeText(text)
        .then(() => setStatus({ type: 'success', message: 'Invitation copied to clipboard' }))
        .catch(() => {})
    }
  }

  const renderSelectorInput = (field, label, placeholder, value) => {
    const options = getDropdownOptions(field)
    const isOpen = activeDropdown === field
    const isFilled = Boolean(value && String(value).trim())
    const selectedValue = getSelectedValue(field)

    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}
        onKeyDown={handleKeyDown}
      >
        <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-brown)', display: 'block', width: '100%', textAlign: 'left' }}>{label}</label>
        <button
          role="button"
          tabIndex={0}
          type="button"
          onClick={() => { if (!isOpen) openDropdown(field) }}
          onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDropdown(field) } }}
          style={{
            ...getFieldSurfaceStyle(isFilled),
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            minHeight: '44px',
            cursor: 'pointer',
          }}
        >
          <span>{value || placeholder}</span>
          <ChevronDown size={14} style={{ color: isFilled ? 'var(--accent-purple)' : 'rgba(157, 78, 221, 0.5)', flexShrink: 0 }} aria-hidden="true" />
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              zIndex: 30,
              backgroundColor: 'var(--white)',
              borderRadius: '14px',
              border: '1.5px solid rgba(157, 78, 221, 0.28)',
              boxShadow: '0 12px 28px rgba(157, 78, 221, 0.16)',
              overflow: 'hidden',
              padding: '4px',
            }}
            onClick={(event) => { if (event.target === event.currentTarget) closeDropdown() }}
          >
            {options.map((opt) => {
              const optValue = typeof opt === 'string' ? opt : opt.value
              const optLabel = typeof opt === 'string' ? opt : opt.label
              const optSub = typeof opt === 'string' ? null : opt.sub
              const isSelected = selectedValue === optValue

              return (
                <button
                  key={optValue}
                  type="button"
                  onClick={() => selectDropdownOption(field, optValue)}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    borderBottom: isSelected ? 'none' : '1px solid rgba(157, 78, 221, 0.08)',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    background: isSelected ? 'linear-gradient(135deg, rgba(157, 78, 221, 0.14), rgba(255, 77, 133, 0.14))' : 'transparent',
                    border: 'none',
                    color: isSelected ? 'var(--btn-pink)' : 'var(--text-brown)',
                    fontSize: '14px',
                    fontWeight: isSelected ? 700 : 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span>{optLabel}</span>
                    {optSub && <span style={{ fontSize: '11px', color: 'rgba(93, 64, 55, 0.7)', fontWeight: 400 }}>{optSub}</span>}
                  </div>
                  {isSelected && <Check size={14} style={{ color: 'var(--accent-purple)', flexShrink: 0 }} aria-hidden="true" />}
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const renderInputField = (label, required, name, placeholder, value, extraStyle) => {
    const isFilled = Boolean(value && String(value).trim())
    return (
      <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-brown)', marginTop: required ? 0 : '8px', display: 'block', width: '100%', textAlign: 'left', marginBottom: '6px' }}>
        {label} {required && <span style={{ color: '#C58B2A', fontWeight: 700 }}>*</span>}
        <InputField
          required={required}
          name={name}
          value={value}
          onChange={(event) => update(name, event.target.value)}
          placeholder={placeholder}
          style={{ ...getFieldSurfaceStyle(isFilled), ...extraStyle }}
        />
      </label>
    )
  }

  const renderScheduleCard = (item, index) => {
    const isExpanded = expandedEventId === item.id
    const Icon = item.icon
    const slideIndex = getSlideIndex(item.id, item.locationSlides?.length || 1)
    const slide = item.locationSlides?.[slideIndex] || { caption: '', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' }

    return (
      <div key={item.id || index} style={{ width: '100%' }}>
        <div style={{ margin: '0 auto 7px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '6px' }}>
        <span style={{ padding: '4px 13px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 700, color: 'var(--white)', boxShadow: '0 4px 12px rgba(93, 64, 55, 0.10)', backgroundColor: item.iconColor || 'var(--accent-purple)' }}>{item.day}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 12px', borderRadius: '999px', backgroundColor: 'var(--white)', border: '1px solid rgba(157, 78, 221, 0.24)', boxShadow: '0 4px 12px rgba(93, 64, 55, 0.06)', fontSize: '11.5px', fontWeight: 700, color: 'var(--text-brown)' }}>
          <MapPin size={11} style={{ color: item.iconColor || 'var(--accent-purple)', flexShrink: 0 }} aria-hidden="true" />
          <span>{item.location}</span>
        </span>
      </div>
      <ExpandableReveal
        isOpen={isExpanded}
        variant="card"
        collapsed={
          <div className="ch-fade-in" onClick={() => setExpandedEventId(item.id)} style={{ width: '100%', backgroundColor: 'var(--white)', borderRadius: '18px', padding: '12px 14px', border: '1px solid rgba(93, 64, 55, 0.08)', boxShadow: '0 6px 18px rgba(93, 64, 55, 0.06)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: slide.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {Icon}
            </div>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap', marginBottom: '3px' }}>
                <h3 style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: 'var(--text-brown)' }}>{item.title}</h3>
                <span style={{ fontSize: '11px', fontWeight: 700, color: item.iconColor || 'var(--accent-purple)' }}>{item.timeBadge}</span>
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.38, color: 'rgba(93, 64, 55, 0.80)' }}>{item.description}</p>
            </div>
            <ChevronDown size={15} style={{ alignSelf: 'flex-start', marginTop: '4px', color: 'rgba(93, 64, 55, 0.55)', flexShrink: 0 }} onClick={(e) => { e.stopPropagation(); setExpandedEventId(item.id); }} />
          </div>
        }
        expanded={
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', onClick: () => setExpandedEventId(null) }}>
            <div style={{ width: '100%', height: '240px', borderRadius: '14px', overflow: 'hidden', position: 'relative', background: slide.gradient }}>
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${item.id}-${slideIndex}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.15, ease: 'easeInOut' }}
                    style={{ width: '100%', height: '100%', background: slide.gradient }}
                  >
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontSize: '13px', fontWeight: 600, opacity: 0.85, padding: '10px', textAlign: 'center', boxSizing: 'border-box' }}>
                      {slide.caption}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '11px', fontWeight: 700, color: 'var(--white)', backgroundColor: 'rgba(0,0,0,0.35)', padding: '4px 8px', borderRadius: '999px', backdropFilter: 'blur(4px)' }}>{item.day}</div>
              </>
            </div>
            <span style={{ alignSelf: 'flex-start', marginTop: '10px', display: 'inline-flex', alignItems: 'center', padding: '6px 14px', borderRadius: '999px', backgroundColor: 'rgba(157, 78, 221, 0.10)', color: 'var(--accent-purple)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.dayTime}</span>
            <div style={{ margin: '10px 4px 0', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-brown)', textAlign: 'left', fontWeight: 600 }}>{item.expandedDescription}</div>
            <div style={{ alignSelf: 'center', margin: '4px auto 0 auto', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', borderRadius: '999px', backgroundColor: 'rgba(92, 52, 61, 0.08)', border: '1px solid rgba(92, 52, 61, 0.20)' }}>
              <MapPin size={13} style={{ color: '#5C343D', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-brown)' }}>{item.location}</span>
            </div>
          </div>
        }
      />
      {index < allEvents.length - 1 && (
        <div style={{ width: '2px', height: '20px', backgroundColor: 'rgba(157, 78, 221, 0.22)', marginLeft: '23px', alignSelf: 'flex-start' }} />
      )}
    </div>
    )
  }

  const renderWalkWithUsButton = () => {
    const isExpanded = isFormOpen

    return (
      <ExpandableReveal
        isOpen={isExpanded}
        variant="form"
        collapsed={
          <button
            role="button"
            tabIndex={0}
            onClick={() => setIsFormOpen((open) => !open)}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setIsFormOpen((open) => !open) } }}
            style={{
              margin: '6px auto 0 auto',
              alignSelf: 'center',
              width: 'fit-content',
              minHeight: '48px',
              padding: '12px 26px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--btn-pink))',
              color: 'var(--white)',
              boxShadow: '0 8px 22px rgba(157, 78, 221, 0.26)',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14.5px',
              fontWeight: 700,
            }}
          >
            <HeartHandshake size={17} style={{ flexShrink: 0 }} aria-hidden="true" />
            <span>Walk With Us</span>
            <ChevronDown size={15} style={{ transition: 'transform 0.3s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>
        }
        expanded={
          <form onSubmit={submitAttendance} style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '18px 18px 20px', backgroundColor: 'var(--white)', borderRadius: '20px', border: '1px solid rgba(157, 78, 221, 0.16)', boxShadow: '0 12px 32px rgba(157, 78, 221, 0.12)' }}>
            <h3 style={{ margin: 0, color: 'var(--text-brown)', fontSize: '20px', textAlign: 'center' }}>Confirm Attendance</h3>

            {renderInputField('Full Name', true, 'name', 'Your full name', form.name)}

            {renderSelectorInput('gender', 'Gender *', 'Select gender', gender)}

            {renderSelectorInput('relationship', 'Relationship *', 'Select relationship', memberRole)}

            {memberRole === 'Student' && (
              <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: 'rgba(255, 77, 133, 0.05)', border: '1px solid rgba(255, 77, 133, 0.22)', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                {renderSelectorInput('transport', 'School Bus Transport (Eldoret — Wed)', 'Select transport option', needsSchoolTransport)}
                <span style={{ fontSize: '12px', color: '#C58B2A', fontWeight: 600, marginTop: '2px', textAlign: 'left', alignSelf: 'flex-start' }}>All MKU students must carry their Student ID card.</span>
                {renderInputField('MKU Student ID Number', true, 'studentId', 'BCOM/2023/12345', form.studentId)}
                {renderInputField('Parent / Next-of-Kin Phone', true, 'emergencyContact', 'Emergency backup phone number', form.emergencyContact)}
              </div>
            )}

            {renderInputField('Your Phone Number', true, 'contact', '07XX XXX XXX', form.contact)}

            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-brown)', marginTop: '8px', display: 'block', width: '100%', textAlign: 'left', marginBottom: '6px' }}>
              Note (optional)
              <textarea
                name="note"
                value={form.note}
                onChange={(event) => update('note', event.target.value)}
                rows={2}
                placeholder="Optional note or message"
                style={{
                  ...getFieldSurfaceStyle(Boolean(form.note && String(form.note).trim())),
                  width: '100%',
                  minHeight: '70px',
                  marginTop: '4px',
                  color: 'var(--text-brown)',
                  padding: '8px',
                  fontSize: '15px',
                  resize: 'vertical',
                }}
              />
              <span style={{ fontSize: '12px', color: 'rgba(93, 64, 55, 0.7)', display: 'block', marginTop: '4px', textAlign: 'right' }}>{form.note.length}/5000</span>
            </label>

            {status.message && <p role="status" style={{ minHeight: '20px', color: status.type === 'error' ? '#9C2F46' : 'var(--accent-purple)', fontSize: '14px', fontWeight: 700 }}>{status.message}</p>}

            <button
              type="submit"
              disabled={status.type === 'loading'}
              style={{
                width: '100%',
                borderRadius: '999px',
                minHeight: '46px',
                background: status.type === 'loading' ? 'rgba(157, 78, 221, 0.5)' : 'linear-gradient(135deg, var(--btn-pink), var(--accent-purple))',
                color: 'var(--white)',
                border: 'none',
                cursor: status.type === 'loading' ? 'default' : 'pointer',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              {status.type === 'loading' ? 'Saving…' : 'Confirm Attendance'}
            </button>
            <button
              type="button"
              onClick={handleInvite}
              style={{
                width: '100%',
                minHeight: '42px',
                borderRadius: '999px',
                backgroundColor: 'rgba(157, 78, 221, 0.08)',
                border: '1px solid rgba(157, 78, 221, 0.24)',
                color: 'var(--accent-purple)',
                fontSize: '13px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                marginTop: '8px',
              }}
            >
              <Share2 size={15} style={{ flexShrink: 0 }} aria-hidden="true" />
              <span>Invite Someone to Farewell</span>
            </button>
          </form>
        }
      />
    )
  }

  const liveSchedule = (schedule || []).filter((item) => item.title && item.location)
  const allEvents = [...scheduleEvents, ...liveSchedule]

  return (
    <motion.section
      className="no-scrollbar"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        width: '100%',
        paddingTop: 'max(18px, calc(var(--safe-top) + 12px))',
        paddingBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        boxSizing: 'border-box',
      }}
    >
      {/* Section 1: Saint John's Hero */}
      <div style={{ width: '100%', maxWidth: '430px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <span style={{ position: 'sticky', top: '12px', zIndex: 24, width: 'fit-content', alignSelf: 'center', margin: '0 auto 12px auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '6px 22px', borderRadius: '999px', backgroundColor: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(157, 78, 221, 0.16)', boxShadow: '0 6px 20px rgba(93, 64, 55, 0.10)', fontFamily: 'var(--font-header)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.25rem, 4.2vw, 1.48rem)', lineHeight: 1.15, color: 'var(--text-brown)' }}>Saint John's</span>

        <div style={{ width: '100%', height: '68vh', minHeight: '380px', maxHeight: '620px', borderRadius: '20px', overflow: 'hidden', position: 'relative', boxShadow: '0 12px 32px rgba(157, 78, 221, 0.12)', background: saintJohnsSlides[photoIndex].gradient }}>
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

        <div style={{ width: '100%', maxWidth: '490px', backgroundColor: 'var(--white)', borderRadius: '18px', padding: '16px 20px', boxShadow: '0 8px 24px rgba(157, 78, 221, 0.12)', textAlign: 'left' }}>
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
        <span style={{ position: 'sticky', top: '12px', zIndex: 25, width: 'fit-content', margin: '0 auto 12px auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '6px 22px', borderRadius: '999px', backgroundColor: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(157, 78, 221, 0.16)', boxShadow: '0 6px 20px rgba(93, 64, 55, 0.10)', fontFamily: 'var(--font-header)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.25rem, 4.2vw, 1.48rem)', lineHeight: 1.15, color: 'var(--text-brown)' }}>Farewell Schedule</span>
        {allEvents.map((item, index) => renderScheduleCard(item, index))}
      </div>

      {/* Section 3: Walk With Us — Attendance & Transport */}
      {renderWalkWithUsButton()}
    </motion.section>
  )
}
