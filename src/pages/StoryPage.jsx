import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import useMemorialData from '../hooks/useMemorialData'
import PolaroidFrame from '../components/ui/PolaroidFrame'
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
      fullStory: event.description ? `${event.description} These memories continue to reveal Cheruto’s light, love, and lasting impact on everyone who knew Cheru.` : fallback.fullStory,
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

  const collapsedInlineHeader = (item, era, badgeColor, isRightAligned) => (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px', justifyContent: isRightAligned ? 'flex-end' : 'flex-start' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: '20px', padding: '3px 8px', borderRadius: '999px', background: badgeColor, color: 'var(--white)', fontSize: '11px', fontWeight: 700 }}>{era}</span>
      <h3 style={{ fontSize: '15px', margin: 0, color: 'var(--text-brown)' }}>{item.title}</h3>
      <ChevronDown size={15} aria-hidden="true" />
    </div>
  )

  const renderChapterCard = (chapter, index) => {
    const isExpanded = expandedId === chapter.id
    const polaroidLeft = index % 2 === 0

    return (
      <motion.article className="story-card" layout key={chapter.id} role="button" tabIndex={0} aria-expanded={isExpanded} onClick={() => toggleExpanded(chapter.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleExpanded(chapter.id) } }} style={{ width: '100%', minHeight: '44px', cursor: 'pointer' }}>
        <ExpandableReveal
          isOpen={isExpanded}
          variant="card"
          collapsed={
            <div className="ch-fade-in" style={{ display: 'grid', gridTemplateColumns: polaroidLeft ? '66px 1fr' : '1fr 66px', alignItems: 'center', gap: '8px', textAlign: polaroidLeft ? 'left' : 'right', background: 'var(--white)', borderRadius: '16px', padding: '10px 12px', boxShadow: '0 6px 18px rgba(93,64,55,.07)' }}>
              {polaroidLeft && <PolaroidFrame style={{ width: '66px', height: '74px', padding: '5px', borderRadius: '6px', transform: 'rotate(-2deg)' }}>{chapter.image_url || chapter.photos[0].src ? <img className="cheruto-photo-img" src={chapter.image_url || chapter.photos[0].src} alt={chapter.title} /> : <div style={{ width: '100%', height: '64px', borderRadius: '3px', background: chapter.photos[0].fallbackGradient }} />}</PolaroidFrame>}
              <div>
                {collapsedInlineHeader(chapter, chapter.era, 'var(--accent-purple)', !polaroidLeft)}
                <p style={{ fontSize: '13.5px', lineHeight: 1.38, color: 'var(--text-brown)', margin: 0 }}>{chapter.description}</p>
              </div>
              {!polaroidLeft && <PolaroidFrame style={{ width: '66px', height: '74px', padding: '5px', borderRadius: '6px', transform: 'rotate(2deg)' }}>{chapter.image_url || chapter.photos[0].src ? <img className="cheruto-photo-img" src={chapter.image_url || chapter.photos[0].src} alt={chapter.title} /> : <div style={{ width: '100%', height: '64px', borderRadius: '3px', background: chapter.photos[0].fallbackGradient }} />}</PolaroidFrame>}
            </div>
          }
          expanded={expandedCard(chapter)}
        />
      </motion.article>
    )
  }

  const renderRelationshipCard = (relationship, sectionIndex, cardIndex) => {
    const isExpanded = expandedId === relationship.id
    const polaroidLeft = (sectionIndex * 2 + cardIndex) % 2 === 0
    const badgeColor = sectionIndex === 0 ? 'var(--accent-purple)' : sectionIndex === 1 ? 'var(--btn-pink)' : 'var(--accent-green)'

    return (
      <motion.article className="story-card" layout key={relationship.id} role="button" tabIndex={0} aria-expanded={isExpanded} onClick={() => toggleExpanded(relationship.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleExpanded(relationship.id) } }} style={{ width: '100%', minHeight: '44px', cursor: 'pointer' }}>
        <ExpandableReveal
          isOpen={isExpanded}
          variant="card"
          collapsed={
            <div className="ch-fade-in" style={{ display: 'grid', gridTemplateColumns: polaroidLeft ? '66px 1fr' : '1fr 66px', alignItems: 'center', gap: '8px', textAlign: polaroidLeft ? 'left' : 'right', background: 'var(--white)', borderRadius: '16px', padding: '10px 12px', boxShadow: '0 6px 18px rgba(93,64,55,.07)' }}>
              {polaroidLeft && <PolaroidFrame style={{ width: '66px', height: '74px', padding: '5px', borderRadius: '6px', transform: 'rotate(-2deg)' }}>{relationship.photos[0].src ? <img className="cheruto-photo-img" src={relationship.photos[0].src} alt={relationship.title} /> : <div style={{ width: '100%', height: '64px', borderRadius: '3px', background: relationship.photos[0].fallbackGradient }} />}</PolaroidFrame>}
              <div>
                {collapsedInlineHeader(relationship, relationship.badge, badgeColor, !polaroidLeft)}
                <p style={{ fontSize: '13.5px', lineHeight: 1.38, color: 'var(--text-brown)', margin: 0 }}>{relationship.relationship_type}</p>
              </div>
              {!polaroidLeft && <PolaroidFrame style={{ width: '66px', height: '74px', padding: '5px', borderRadius: '6px', transform: 'rotate(2deg)' }}>{relationship.photos[0].src ? <img className="cheruto-photo-img" src={relationship.photos[0].src} alt={relationship.title} /> : <div style={{ width: '100%', height: '64px', borderRadius: '3px', background: relationship.photos[0].fallbackGradient }} />}</PolaroidFrame>}
            </div>
          }
          expanded={expandedCard(relationship)}
        />
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

      {loading && <p style={{ fontSize: '14px', margin: '-6px 0 6px' }}>Gathering memories…</p>}

      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px', position: 'relative' }}>
        {chapters.slice(0, 4).map((chapter, index) => renderChapterCard(chapter, index))}
      </div>

      {relationshipSections.map((section, sectionIndex) => (
        <div key={section.name} style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div className="sticky-header-band sticky-subheader-band"><h3 className="sticky-header-band-title">{section.name}</h3></div>
          {section.cards.map((relationship, cardIndex) => renderRelationshipCard(relationship, sectionIndex, cardIndex))}
        </div>
      ))}
    </motion.section>
    </>
  )
}
