import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import useMemorialData from '../hooks/useMemorialData'
import ExpandableReveal from '../components/ExpandableReveal'
import { STORY_CHAPTERS, STORY_FAMILY, STORY_FRIENDS, STORY_COMMUNITY } from '../data/fallbackData'

export default function StoryPage() {
  const [expandedId, setExpandedId] = useState(null)
  const [photoIndexById, setPhotoIndexById] = useState({})
  const shouldReduceMotion = useReducedMotion()
  const { timeline, relationships, loading } = useMemorialData()

  const chapters = timeline?.length ? timeline.map((event, index) => {
    const fallback = STORY_CHAPTERS[index] || STORY_CHAPTERS[STORY_CHAPTERS.length - 1]
    return {
      ...fallback,
      id: event.id || fallback.id,
      title: event.title || fallback.title,
      era: event.event_date ? new Date(`${event.event_date}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : fallback.era,
      description: event.description || fallback.description,
      fullStory: event.description ? `${event.description} These memories continue to reveal Cheruto's light, love, and lasting impact on everyone who knew Cheru.` : fallback.fullStory,
      photos: event.image_url ? [{ src: event.image_url, caption: event.title || fallback.title, fallbackGradient: fallback.photos[0].fallbackGradient }, ...fallback.photos.slice(1)] : fallback.photos,
    }
  }) : STORY_CHAPTERS

  const relationshipSections = [
    { name: 'Family', cards: STORY_FAMILY },
    { name: 'Friends', cards: STORY_FRIENDS },
    { name: 'Community', cards: STORY_COMMUNITY },
  ]

  const toggleExpanded = (id) => setExpandedId((current) => current === id ? null : id)

  useEffect(() => {
    if (!expandedId || shouldReduceMotion) return undefined

    const activeItem = [...chapters, ...relationshipSections.flatMap((section) => section.cards)]
      .find((item) => item.id === expandedId)

    if (!activeItem || !activeItem.photos || activeItem.photos.length <= 1) return undefined

    const timer = window.setInterval(() => {
      setPhotoIndexById((current) => {
        const currentIndex = current[expandedId] || 0
        return { ...current, [expandedId]: (currentIndex + 1) % activeItem.photos.length }
      })
    }, 4200)

    return () => window.clearInterval(timer)
  }, [expandedId, shouldReduceMotion, chapters, relationshipSections])

  const getPhotoIndex = (id, count) => ((photoIndexById[id] || 0) < count ? (photoIndexById[id] || 0) : 0)

  const expandedCard = (item) => {
    const photos = item.photos?.length ? item.photos : [{ src: '', caption: '', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' }]
    const photoIndex = getPhotoIndex(item.id, photos.length)
    const photo = photos[photoIndex]

    return (
      <motion.div
        key={`expanded-${item.id}`}
        initial={{ opacity: 0, height: 0, y: -6 }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        exit={{ opacity: 0, height: 0, y: -6 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
        style={{ width: '100%', overflow: 'hidden', background: 'var(--white)', borderRadius: '18px', padding: '12px', boxShadow: '0 10px 28px rgba(93, 64, 55, 0.12)', position: 'relative' }}
      >
        <div className="cheruto-photo-frame">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${item.id}-${photoIndex}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', background: photo.src ? 'transparent' : photo.fallbackGradient }}
            >
              {photo.src ? (
                <>
                  <img className="cheruto-photo-img" src={photo.src} alt={item.title || item.name || 'Cheruto memory'} />
                  <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '13.5px', fontWeight: 700, color: 'var(--text-brown)' }}>
                    {photo.caption}
                  </div>
                </>
              ) : (
                <div style={{ width: '100%', height: '100%', background: photo.fallbackGradient }} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p style={{ margin: '12px 0 2px', padding: '0 4px', textAlign: 'left', fontSize: '14.5px', lineHeight: 1.55, color: 'var(--text-brown)' }}>
          {item.fullStory || item.relationship_type || item.description}
        </p>
      </motion.div>
    )
  }

  const StoryCollapsedRow = ({ item, badgeColor, isExpanded }) => {
    const photoSrc = item.image_url || (item.photos?.[0]?.src) || null
    const photoFallbackGradient = item.photos?.[0]?.fallbackGradient || item.fallbackGradient || 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))'
    const title = item.title || item.name || 'Untitled'
    const subtitle = item.summary || item.description || item.relationship_type || ''

    return (
      <ExpandableReveal
        isOpen={isExpanded}
        variant="card"
        collapsed={
          <div className="ch-fade-in" style={{
            width: '100%',
            minHeight: '72px',
            height: 'auto',
            padding: '10px 14px',
            backgroundColor: 'var(--white)',
            borderRadius: '18px',
            border: '1px solid rgba(93, 64, 55, 0.08)',
            boxShadow: '0 6px 18px rgba(93, 64, 55, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            position: 'relative',
            zIndex: 2,
            cursor: 'pointer',
            overflow: 'hidden',
          }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '11px', flexShrink: 0, overflow: 'hidden', background: item.gradient }}>
              {photoSrc ? (
                <img className="cheruto-photo-img" src={photoSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '11px' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: photoFallbackGradient }} />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'nowrap', minWidth: 0, marginBottom: '3px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: '22px', padding: '2px 8px', borderRadius: '999px', background: badgeColor || 'var(--accent-purple)', color: 'var(--white)', fontSize: '10.5px', fontWeight: 700 }}>{item.badge || 'Cherished Moment'}</span>
                <h3 style={{ margin: 0, color: 'var(--text-brown)', fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{title}</h3>
                <ChevronDown size={13} style={{ marginLeft: '4px', flexShrink: 0 }} />
              </div>
              <p style={{ margin: 0, color: 'var(--text-brown)', fontSize: '12.5px', lineHeight: 1.45, color: 'var(--text-brown)', marginTop: '3px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {subtitle}
              </p>
            </div>
          </div>
        }
        expanded={expandedCard(item)}
      />
    )
  }

  const renderChapterCard = (chapter) => {
    const isExpanded = expandedId === chapter.id

    return (
      <motion.article className="story-card" layout key={chapter.id} role="button" tabIndex={0} aria-expanded={isExpanded} onClick={() => toggleExpanded(chapter.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleExpanded(chapter.id) } }} style={{ width: '100%', minHeight: '72px', cursor: 'pointer' }}>
        <StoryCollapsedRow item={chapter} badgeColor={chapter.badgeColor || 'var(--accent-purple)'} isExpanded={isExpanded} />
      </motion.article>
    )
  }

  const renderRelationshipCard = (relationship, sectionIndex, cardIndex) => {
    const isExpanded = expandedId === relationship.id
    const badgeColor = sectionIndex === 0 ? 'var(--accent-purple)' : sectionIndex === 1 ? 'var(--btn-pink)' : 'var(--accent-green)'

    return (
      <motion.article className="story-card" layout key={relationship.id} role="button" tabIndex={0} aria-expanded={isExpanded} onClick={() => toggleExpanded(relationship.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleExpanded(relationship.id) } }} style={{ width: '100%', minHeight: '72px', cursor: 'pointer' }}>
        <StoryCollapsedRow item={relationship} badgeColor={badgeColor} isExpanded={isExpanded} />
      </motion.article>
    )
  }

  return (
    <>
      <style>{`
        .story-card:focus { outline: none; }
        .story-card:focus-visible { outline: 3px solid var(--accent-green); outline-offset: 3px; }
      `}</style>
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ paddingTop: 0, paddingBottom: '24px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header className="sticky-header-band">
        <h2 className="sticky-header-band-title">Her Story</h2>
      </header>

      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px', position: 'relative' }}>
        {chapters.slice(0, 4).map((chapter, index) => (
          <>
            {renderChapterCard(chapter)}
            {index < chapters.slice(0, 4).length - 1 && (
              <div aria-hidden="true" style={{ position: 'absolute', top: '34px', bottom: '34px', left: '40px', width: '2px', borderRadius: '2px', zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(157,78,221,.35), rgba(255,77,133,.34), rgba(92,52,61,.38))' }} />
            )}
          </>
        ))}
      </div>

      {relationshipSections.map((section, sectionIndex) => (
        <div key={section.name} style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div className="sticky-header-band sticky-subheader-band"><h3 className="sticky-header-band-title">{section.name}</h3></div>
          <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px', position: 'relative' }}>
            {section.cards.map((relationship, cardIndex) => (
              <>
                {renderRelationshipCard(relationship, sectionIndex, cardIndex)}
                {cardIndex < section.cards.length - 1 && (
                  <div aria-hidden="true" style={{ position: 'absolute', top: '34px', bottom: '34px', left: '40px', width: '2px', borderRadius: '2px', zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(157,78,221,.35), rgba(255,77,133,.34), rgba(92,52,61,.38))' }} />
                )}
              </>
            ))}
          </div>
        </div>
      ))}
    </motion.section>
    </>
  )
}
