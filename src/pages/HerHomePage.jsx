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
        setStatus({ type: 'error', message: 'Could not save your memory. Please try again.' })
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

  const renderMemoryForm = () => (
    <form onSubmit={submitMemory} style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px 18px', backgroundColor: 'var(--white)', borderRadius: '20px', border: '1px solid rgba(157, 78, 221, 0.16)', boxShadow: '0 12px 32px rgba(157, 78, 221, 0.12)' }}>
      <h3 style={{ margin: 0, color: 'var(--text-brown)', fontSize: '20px', textAlign: 'center' }}>Share a Memory</h3>

      {renderInputField('Your Name', true, 'name', 'Your name', form.name)}

      {renderSelectorInput('memoryTag', 'Memory Tag / Relationship *', 'Select memory tag', form.memoryTag)}

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
        <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-brown)', display: 'block', width: '100%', textAlign: 'left' }}>Photo with Cheruto (Optional)</label>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (fileInputRef.current) { fileInputRef.current.value = ''; fileInputRef.current.click() } }}
          style={{
            ...getFieldSurfaceStyle(Boolean(form.selectedPhotos.length)),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 12px',
            minHeight: '46px',
            borderRadius: '12px',
            border: '1.5px dashed rgba(157, 78, 221, 0.42)',
            cursor: 'pointer',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Camera size={14} style={{ flexShrink: 0 }} aria-hidden="true" />
          <span style={{ fontSize: '13px', color: form.selectedPhotos.length ? 'var(--text-brown)' : 'rgba(93, 64, 55, 0.7)' }}>
            {form.selectedPhotos.length ? `Photos: ${form.selectedPhotos.length}/3` : 'Add up to 3 photos of you & Cheruto (optional)'}
          </span>
        </button>
        <input
          ref={fileInputRef}
          id="cheruto-memory-photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoSelect}
          style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, overflow: 'hidden', zIndex: -1 }}
        />
        {form.selectedPhotos.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
            {form.selectedPhotos.map((photo, i) => (
              <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={photo.preview} alt={`Photo ${i + 1}`} style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                <button type="button" onClick={() => removePhoto(i)} style={{ position: 'absolute', top: '-2px', right: '-2px', background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%', width: '18px', height: '18px', color: 'var(--white)', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={10} style={{ flexShrink: 0 }} aria-hidden="true" />
                </button>
              </div>
            ))}
            {form.selectedPhotos.length < 3 && (
              <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (fileInputRef.current) { fileInputRef.current.value = ''; fileInputRef.current.click() } }} style={{ width: '52px', height: '52px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px dashed rgba(157, 78, 221, 0.42)', color: 'rgba(157, 78, 221, 0.6)', fontSize: '10px', cursor: 'pointer', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <span>+ {3 - form.selectedPhotos.length}</span>
              </button>
            )}
          </div>
        )}
      </div>

      <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-brown)', marginTop: '8px', display: 'block', width: '100%', textAlign: 'left', marginBottom: '6px' }}>
        Your Memory <span aria-hidden="true">*</span>
        <textarea
          name="memory"
          required
          value={form.memory}
          maxLength={5000}
          onChange={(event) => update('memory', event.target.value)}
          rows={3}
          placeholder="Write a favorite memory, story, or prayer for Cheruto…"
          style={{
            ...getFieldSurfaceStyle(Boolean(form.memory && String(form.memory).trim())),
            width: '100%',
            minHeight: '88px',
            marginTop: '4px',
            color: 'var(--text-brown)',
            padding: '8px',
            fontSize: '15px',
            resize: 'vertical',
          }}
        />
        <span style={{ fontSize: '12px', color: 'rgba(93, 64, 55, 0.7)', display: 'block', marginTop: '4px', textAlign: 'right' }}>{form.memory.length}/5000</span>
      </label>

      {status.message && <p role="status" style={{ minHeight: '20px', color: status.type === 'error' ? '#9C2F46' : 'var(--accent-purple)', fontSize: '14px', fontWeight: 700 }}>{status.message}</p>}

      <button
        type="submit"
        disabled={status.type === 'loading'}
        style={{
          width: 'fit-content',
          minWidth: '185px',
          margin: '4px auto 0 auto',
          padding: '11px 28px',
          borderRadius: '999px',
          background: status.type === 'loading' ? 'rgba(157, 78, 221, 0.5)' : 'linear-gradient(135deg, var(--btn-pink), var(--accent-purple))',
          color: 'var(--white)',
          border: 'none',
          cursor: status.type === 'loading' ? 'default' : 'pointer',
          fontSize: '14px',
          fontWeight: 700,
        }}
      >
        {status.type === 'loading' ? 'Sharing…' : 'Share Memory'}
      </button>
    </form>
  )

  const renderLeaveAMemoryButton = () => (
    <button
      role="button"
      tabIndex={0}
      onClick={() => setFormOpen((open) => !open)}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setFormOpen((open) => !open) } }}
      style={{
        margin: '8px auto 0 auto',
        alignSelf: 'center',
        width: 'fit-content',
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
  )

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

      <ExpandableReveal
        isOpen={formOpen}
        variant="form"
        collapsed={renderLeaveAMemoryButton()}
        expanded={renderMemoryForm()}
      />

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
