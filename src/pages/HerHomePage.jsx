import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, ChevronDown, Check, Share2, X } from 'lucide-react'
import useMemorialData from '../hooks/useMemorialData'
import { supabase } from '../lib/supabaseClient'
import InputField from '../components/ui/InputField'
import ExpandableReveal from '../components/ExpandableReveal'

const memoryTags = [
  'Family',
  'Close Friend',
  'MKU Classmate',
  "Saint John's Red Cross",
  'Childhood / School',
  'Cherished Moment',
]

const curatedFallbackPhotos = [
  { gradient: 'linear-gradient(145deg, #9D4EDD 0%, #FF4D85 100%)' },
  { gradient: 'linear-gradient(145deg, #FF4D85 0%, #F5B7A7 100%)' },
  { gradient: 'linear-gradient(145deg, #9D4EDD 0%, #2ECC71 100%)' },
  { gradient: 'linear-gradient(145deg, #F5B7A7 0%, #9D4EDD 100%)' },
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

export default function HerHomePage({ onNavigateHome }) {
  const { memories = [], loading } = useMemorialData()
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ name: '', memoryTag: '', selectedPhotos: [], memory: '' })
  const [localMemories, setLocalMemories] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cheruto-memories') || '[]')
    } catch {
      return []
    }
  })
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [navigateHome, setNavigateHome] = useState(false)
  const fileInputRef = useRef(null)

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const handlePhotoSelect = async (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return

    const nonImage = files.find((f) => !f.type.startsWith('image/'))
    if (nonImage) {
      setStatus({ type: 'error', message: 'Please select image files only.' })
      return
    }

    const maxAdditional = 3 - form.selectedPhotos.length
    const toAdd = files.slice(0, maxAdditional)
    if (toAdd.length === 0) {
      setStatus({ type: 'error', message: 'You can add up to 3 photos per memory.' })
      return
    }

    const previews = await Promise.all(
      toAdd.map((file) => new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve({ file, preview: reader.result })
        reader.readAsDataURL(file)
      }))
    )

    setForm((current) => ({
      ...current,
      selectedPhotos: [...current.selectedPhotos, ...previews].slice(0, 3),
    }))
  }

  const removePhoto = (index) => {
    setForm((current) => ({
      ...current,
      selectedPhotos: current.selectedPhotos.filter((_, i) => i !== index),
    }))
  }

  const clearPhotos = () => {
    setForm((current) => ({ ...current, selectedPhotos: [] }))
  }

  const openDropdown = (field) => setActiveDropdown(field)
  const closeDropdown = () => setActiveDropdown(null)

  const selectDropdownOption = (field, value) => {
    if (field === 'memoryTag') setForm((current) => ({ ...current, memoryTag: value }))
    closeDropdown()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') closeDropdown()
  }

  const submitMemory = async (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' })
      return
    }
    if (!form.memoryTag) {
      setStatus({ type: 'error', message: 'Please select a memory tag.' })
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

    const photoUrls = []
    if (supabase) {
      for (const photo of form.selectedPhotos) {
        try {
          const fileName = `memories/${Date.now()}-${photo.file.name.replace(/\s+/g, '_')}`
          const { error: uploadError } = await supabase.storage.from('guestbook-photos').upload(fileName, photo.file)
          if (!uploadError) {
            const { data: urlData } = supabase.storage.from('guestbook-photos').getPublicUrl(fileName)
            photoUrls.push(urlData.publicUrl)
          } else {
            photoUrls.push(photo.preview)
          }
        } catch {
          photoUrls.push(photo.preview)
        }
      }
    } else {
      form.selectedPhotos.forEach((photo) => photoUrls.push(photo.preview))
    }

    const record = {
      id: `local-${Date.now()}`,
      author_name: form.name.trim(),
      memory_tag: form.memoryTag,
      memory: form.memory.trim(),
      photo_url: photoUrls[0] || null,
      photo_urls: photoUrls,
      is_approved: false,
    }

    if (supabase) {
      const { error } = await supabase.from('guestbook_memories').insert({
        author_name: record.author_name,
        memory_tag: record.memory_tag,
        memory: record.memory,
        photo_url: record.photo_url,
        photo_urls: record.photo_urls,
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
    setForm({ name: '', memoryTag: '', selectedPhotos: [], memory: '' })
    setStatus({ type: 'success', message: 'Memory shared to Cheruto’s Home' })
    setFormOpen(false)
    setNavigateHome(true)
  }

  useEffect(() => {
    if (navigateHome && onNavigateHome) {
      const timer = setTimeout(() => {
        onNavigateHome()
        setNavigateHome(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [navigateHome, onNavigateHome])

  const visibleMemories = [...localMemories, ...memories]

  const renderSelectorInput = (field, label, placeholder, value) => {
    const options = memoryTags
    const isOpen = activeDropdown === field
    const isFilled = Boolean(value && String(value).trim())
    const selectedValue = value

    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }} onKeyDown={handleKeyDown}>
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
              const isSelected = selectedValue === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => selectDropdownOption(field, opt)}
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
                    <span>{opt}</span>
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
      <header style={{ position: 'sticky', top: '12px', zIndex: 25, width: 'fit-content', margin: '0 auto 12px auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '6px 22px', borderRadius: '999px', backgroundColor: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(157, 78, 221, 0.16)', boxShadow: '0 6px 20px rgba(93, 64, 55, 0.10)' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-header)', fontStyle: 'italic', fontWeight: 700, letterSpacing: '0.01em', fontSize: 'clamp(1.6rem, 5vw, 1.9rem)', lineHeight: 1, color: 'var(--text-brown)', whiteSpace: 'nowrap' }}>Her Home</h2>
      </header>

      {loading && <p style={{ fontSize: '15px', color: 'var(--text-brown)' }}>Loading shared memories…</p>}

      <div style={{ width: '100%', maxWidth: '440px', padding: '14px 16px', borderRadius: '18px', backgroundColor: 'var(--white)', border: '1px solid rgba(93, 64, 55, 0.10)', boxShadow: '0 6px 20px rgba(93, 64, 55, 0.08)', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'var(--text-brown)' }}>Leave a remembrance, share a photo, or carry a message of love for Cheruto and her family.</p>
      </div>

      <button
        role="button"
        tabIndex={0}
        onClick={() => setFormOpen((open) => !open)}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setFormOpen((open) => !open) } }}
        style={{
          width: 'fit-content',
          margin: '8px auto 0 auto',
          padding: '10px 24px',
          minHeight: '44px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, var(--accent-purple), var(--btn-pink))',
          color: 'var(--white)',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 700,
        }}
      >
        {formOpen ? 'Close Tribute Form' : <><Share2 size={16} style={{ flexShrink: 0 }} aria-hidden="true" /><span>Leave a Memory</span></>}
      </button>

      {formOpen ? (
        <ExpandableReveal
          isOpen={formOpen}
          delay={400}
          skeleton={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px 18px' }}>
              <div style={{ width: '30%', height: '24px', borderRadius: '12px', className: 'cheruto-skeleton' }} />
              <div style={{ width: '100%', height: '40px', borderRadius: '12px', className: 'cheruto-skeleton' }} />
              <div style={{ width: '100%', height: '46px', borderRadius: '999px', className: 'cheruto-skeleton' }} />
              <div style={{ width: '100%', height: '40px', borderRadius: '12px', className: 'cheruto-skeleton' }} />
              <div style={{ width: '30%', height: '40px', borderRadius: '12px', className: 'cheruto-skeleton' }} />
              <div style={{ width: '70%', height: '40px', borderRadius: '12px', className: 'cheruto-skeleton' }} />
              <div style={{ width: '100%', height: '80px', borderRadius: '12px', className: 'cheruto-skeleton' }} />
            </div>
          }
          collapsedSkeleton={
            <div style={{ width: '180px', height: '44px', borderRadius: '999px', margin: '0 auto', className: 'cheruto-skeleton' }} />
          }
          collapsedChildren={
            <button
              role="button"
              tabIndex={0}
              onClick={() => setFormOpen((open) => !open)}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setFormOpen((open) => !open) } }}
              style={{
                margin: '6px auto 0 auto',
                alignSelf: 'center',
                width: 'fit-content',
                minHeight: '44px',
                padding: '10px 24px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, var(--accent-purple), var(--btn-pink))',
                color: 'var(--white)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              <Share2 size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
              <span>Leave a Memory</span>
            </button>
          }
        />
      ) : (
        <button
          role="button"
          tabIndex={0}
          onClick={() => setFormOpen((open) => !open)}
          onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setFormOpen((open) => !open) } }}
          style={{
            margin: '6px auto 0 auto',
            alignSelf: 'center',
            width: 'fit-content',
            minHeight: '44px',
            padding: '10px 24px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--btn-pink))',
            color: 'var(--white)',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          <Share2 size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
          <span>Leave a Memory</span>
        </button>
      )}

      <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {visibleMemories.map((memory, index) => {
          const photoUrls = Array.isArray(memory.photo_urls) && memory.photo_urls.length > 0 ? memory.photo_urls : (memory.photo_url ? [memory.photo_url] : [])
          const hasUploadedPhotos = photoUrls.length > 0
          const fallbackGradient = curatedFallbackPhotos[index % curatedFallbackPhotos.length].gradient
          return (
            <article key={memory.id} style={{ width: '100%', padding: '12px 14px', borderRadius: '16px', backgroundColor: 'var(--white)', border: '1px solid rgba(93, 64, 55, 0.08)', boxShadow: '0 6px 20px rgba(93, 64, 55, 0.07)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ width: '100%', height: '160px', borderRadius: '14px', overflow: 'hidden', position: 'relative', background: hasUploadedPhotos ? '#f0f0f0' : fallbackGradient }}>
                {hasUploadedPhotos && photoUrls[0] ? (
                  <img src={photoUrls[0]} alt="Memory photo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : null}
              </div>
              {memory.author_name && memory.memory_tag && memory.author_name.trim().toLowerCase() === memory.memory_tag.trim().toLowerCase() ? null : (
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-brown)' }}>{memory.author_name || 'Friend'}</div>
              )}
              <span style={{ display: 'inline-flex', alignItems: 'center', width: 'fit-content', alignSelf: 'flex-start', marginLeft: '4px', padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(157, 78, 221, 0.10)', border: '1px solid rgba(157, 78, 221, 0.22)', color: 'var(--accent-purple)', fontSize: '12px', fontWeight: 700 }}>{memory.memory_tag || 'Cherished Moment'}</span>
              <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.5, color: 'var(--text-brown)' }}>"{memory.memory}"</p>
              {!memory.is_approved && <span style={{ display: 'inline-block', marginTop: '6px', padding: '4px 8px', borderRadius: '999px', background: 'var(--accent-purple)', color: 'var(--white)', fontSize: '10px', fontWeight: 700 }}>Shared — pending family blessing</span>}
            </article>
          )
        })}
      </div>

      {visibleMemories.length === 0 && !loading && (
        <p style={{ fontSize: '14px', color: 'rgba(93, 64, 55, 0.7)', textAlign: 'center', padding: '20px' }}>No memories shared yet. Be the first to leave one.</p>
      )}
    </motion.section>
  )
}
