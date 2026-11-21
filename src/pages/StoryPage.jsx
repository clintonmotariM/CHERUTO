import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import useMemorialData from '../hooks/useMemorialData'
import PolaroidFrame from '../components/ui/PolaroidFrame'

const chapterDefaults = [
  {
    id: 'chapter-beginning', title: 'Her Beginning', era: 'Roots',
    description: 'A bright spirit from the very start.',
    fullStory: 'Cheruto began a life marked by warmth, curiosity, and an open heart. Her beginning was shaped by the people and places that taught her to notice beauty, care deeply, and make others feel at home.',
    photos: [{ src: '', caption: 'Her Beginning', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' }],
  },
  {
    id: 'chapter-passions', title: 'Her Passions', era: 'Joy',
    description: 'The things that brought her purpose and delight.',
    fullStory: 'Cheruto found joy in the things that let her create, serve, laugh, and connect. Her passions were never only hobbies; they were the gifts she shared generously with the people around her.',
    photos: [{ src: '', caption: 'Her Passions', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' }],
  },
  {
    id: 'chapter-people', title: 'Her People', era: 'Love',
    description: 'A heart that gathered family and friends close.',
    fullStory: 'Cheruto made people feel seen. Her friendships and family relationships were built through presence, honesty, celebration, and an uncommon ability to turn ordinary moments into lasting memories.',
    photos: [{ src: '', caption: 'Her People', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' }],
  },
  {
    id: 'chapter-moments', title: 'Cherished Moments', era: 'Forever',
    description: 'Laughter, kindness, and memories held safely in time.',
    fullStory: 'The moments that meant most were often the simplest: a shared meal, a quiet conversation, a celebration, or a spontaneous burst of laughter. Those memories now carry Cheruto’s presence forward.',
    photos: [{ src: '', caption: 'Cherished Moments', fallbackGradient: 'linear-gradient(145deg, var(--accent-green), var(--btn-pink))' }],
  },
]

const relationshipDefaults = {
  Family: [{ id: 'family-fallback', name: 'Family', relationship_type: 'Cheruto was deeply rooted in the love, strength, and stories shared by family.', fullStory: 'Within her family, Cheruto gave and received a lasting kind of love: patient, playful, honest, and enduring. Her place in the family story remains a source of comfort and courage.', photos: [{ src: '', caption: 'Family', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' }] }],
  Friends: [{ id: 'friends-fallback', name: 'Friends', relationship_type: 'Cheru made space for joy, laughter, honest conversation, and lifelong friendship.', fullStory: 'Cheru’s friendships were generous and real. She celebrated milestones, listened closely, shared laughter, and made every friend feel as though they belonged.', photos: [{ src: '', caption: 'Friends', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' }] }],
  Community: [{ id: 'community-fallback', name: 'Community', relationship_type: 'Her warmth reached beyond close circles and touched everyone she met.', fullStory: 'Cheruto’s kindness extended outward through the community. Her example continues to remind us that a caring word, an open hand, and an inclusive heart can leave a lasting legacy.', photos: [{ src: '', caption: 'Community', fallbackGradient: 'linear-gradient(145deg, var(--accent-green), var(--accent-purple))' }] }],
}

export default function StoryPage() {
  const [expandedId, setExpandedId] = useState(null)
  const [photoIndexById, setPhotoIndexById] = useState({})
  const { timeline, relationships, loading } = useMemorialData()

  const chapters = timeline?.length ? timeline.map((event, index) => {
    const fallback = chapterDefaults[index] || chapterDefaults[chapterDefaults.length - 1]
    return {
      ...fallback,
      id: event.id || fallback.id,
      title: event.title || fallback.title,
      era: event.event_date
        ? new Date(`${event.event_date}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
        : fallback.era,
      description: event.description || fallback.description,
      fullStory: event.description ? `${event.description} These memories continue to reveal Cheruto’s light, love, and lasting impact on everyone who knew Cheru.` : fallback.fullStory,
      photos: event.image_url ? [{ src: event.image_url, caption: event.title || fallback.title, fallbackGradient: fallback.photos[0].fallbackGradient }] : fallback.photos,
    }
  }) : chapterDefaults

  const relationshipSections = ['Family', 'Friends', 'Community'].map((sectionName) => {
    const nameMatches = (relationships || []).filter((relationship) => {
      const name = (relationship.name || '').toLowerCase()
      if (sectionName === 'Family') return name.includes('family')
      if (sectionName === 'Friends') return name.includes('friend')
      return name.includes('community')
    })

    return {
      name: sectionName,
      cards: nameMatches.length ? nameMatches.map((relationship, index) => {
        const fallback = relationshipDefaults[sectionName][0]
        return {
          ...fallback,
          ...relationship,
          id: relationship.id || `${sectionName.toLowerCase()}-${index}`,
          fullStory: relationship.relationship_type
            ? `${relationship.relationship_type} Cheruto’s place in this circle remains a treasured part of Cheru’s living legacy.`
            : fallback.fullStory,
          photos: relationship.image_url
            ? [{ src: relationship.image_url, caption: relationship.name, fallbackGradient: fallback.photos[0].fallbackGradient }]
            : fallback.photos,
        }
      }) : relationshipDefaults[sectionName],
    }
  })

  const toggleExpanded = (id) => setExpandedId((current) => current === id ? null : id)

  const getPhotoIndex = (id, count) => {
    const index = photoIndexById[id] || 0
    return index < count ? index : 0
  }

  const setPhotoIndex = (id, index) => {
    setPhotoIndexById((current) => ({ ...current, [id]: index }))
  }

  const sectionHeaderStyle = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    margin: '12px auto 6px auto', padding: '3px 18px', borderRadius: '999px',
    backgroundColor: 'var(--white)', border: '1px solid rgba(157, 78, 221, 0.18)',
    boxShadow: '0 4px 14px rgba(93, 64, 55, 0.06)',
    fontFamily: 'var(--font-script)', fontSize: 'clamp(1.25rem, 4.2vw, 1.45rem)',
    lineHeight: 1, color: 'var(--text-brown)',
  }

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
        <div style={{ width: '100%', height: '210px', borderRadius: '14px', overflow: 'hidden', position: 'relative', background: photo.fallbackGradient }}>
          {photo.src && <img src={photo.src} alt={item.title || item.name || 'Cheruto memory'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}

          <button
            type="button"
            aria-label="Collapse story card"
            title="Collapse"
            onClick={(event) => { event.stopPropagation(); toggleExpanded(item.id) }}
            style={{
              position: 'absolute', top: '8px', right: '8px',
              width: '44px', height: '44px', minWidth: '44px', minHeight: '44px',
              display: 'grid', placeItems: 'center', padding: 0,
              border: '1px solid rgba(255,255,255,.35)', borderRadius: '50%',
              background: 'rgba(93,64,55,.72)', color: 'var(--white)', cursor: 'pointer',
              backdropFilter: 'blur(6px)',
            }}
          >
            <ChevronUp size={32} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        {photos.length > 1 && (
          <div className="no-scrollbar" style={{ width: '100%', display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '8px', paddingBottom: '2px' }}>
            {photos.map((thumbnail, index) => (
              <button
                key={`${item.id}-photo-${index}`}
                type="button"
                aria-label={`View photo ${index + 1} for ${item.title || item.name}`}
                onClick={(event) => { event.stopPropagation(); setPhotoIndex(item.id, index) }}
                style={{ flex: '0 0 48px', width: '48px', height: '48px', minWidth: '44px', minHeight: '44px', padding: 0, border: photoIndex === index ? '2px solid var(--btn-pink)' : '1px solid rgba(93,64,55,.10)', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', background: thumbnail.fallbackGradient }}
              >
                {thumbnail.src && <img src={thumbnail.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
              </button>
            ))}
          </div>
        )}

        <p style={{ margin: '10px 0 2px', padding: '0 4px', textAlign: 'left', fontSize: '14.5px', lineHeight: 1.55, color: 'var(--text-brown)' }}>
          {item.fullStory || item.relationship_type || item.description}
        </p>
      </motion.div>
    )
  }

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ paddingTop: 'max(14px, calc(var(--safe-top) + 10px))', paddingBottom: '24px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', padding: '4px 22px', borderRadius: '999px', backgroundColor: 'var(--white)', border: '1px solid rgba(93,64,55,.10)', boxShadow: '0 6px 20px rgba(93,64,55,.08)' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-script)', fontSize: 'clamp(1.6rem, 5vw, 1.9rem)', lineHeight: 1, color: 'var(--text-brown)', whiteSpace: 'nowrap' }}>Her Story</h2>
      </header>

      {loading && <p style={{ fontSize: '14px', margin: '-6px 0 6px' }}>Gathering memories…</p>}

      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px', position: 'relative' }}>
        {chapters.slice(0, 4).map((chapter, index) => {
          const isExpanded = expandedId === chapter.id
          return (
            <motion.article layout key={chapter.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07, duration: 0.36 }} role="button" tabIndex={0} aria-expanded={isExpanded} onClick={() => toggleExpanded(chapter.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleExpanded(chapter.id) } }} style={{ width: '100%', minHeight: '44px', cursor: 'pointer' }}>
              {isExpanded ? (
                <AnimatePresence initial={false}>{expandedCard(chapter)}</AnimatePresence>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: index % 2 ? '1fr 72px' : '72px 1fr', alignItems: 'center', gap: '8px', textAlign: index % 2 ? 'right' : 'left', background: 'var(--white)', borderRadius: '16px', padding: '12px 14px', boxShadow: '0 6px 18px rgba(93,64,55,.07)' }}>
                  {index % 2 === 0 && (
                    <PolaroidFrame style={{ width: '72px', height: '82px', padding: '6px', borderRadius: '6px', transform: 'rotate(-2deg)' }}>
                      {chapter.image_url ? <img src={chapter.image_url} alt={chapter.title} style={{ width: '100%', height: '70px', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '70px', borderRadius: '3px', background: chapter.photos[0].fallbackGradient }} />}
                    </PolaroidFrame>
                  )}
                  <div>
                    <span style={{ display: 'inline-block', marginBottom: '4px', padding: '4px 8px', borderRadius: '999px', background: 'var(--accent-purple)', color: 'var(--white)', fontSize: '11px', fontWeight: 700 }}>{chapter.era}</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: index % 2 ? 'flex-end' : 'flex-start', gap: '6px' }}>
                      <h3 style={{ fontSize: '15px', margin: '0 0 2px', color: 'var(--text-brown)' }}>{chapter.title}</h3>
                      <ChevronDown size={16} aria-hidden="true" />
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.4, color: 'var(--text-brown)', margin: 0 }}>{chapter.description}</p>
                  </div>
                  {index % 2 !== 0 && (
                    <PolaroidFrame style={{ width: '72px', height: '82px', padding: '6px', borderRadius: '6px', transform: 'rotate(2deg)' }}>
                      {chapter.image_url ? <img src={chapter.image_url} alt={chapter.title} style={{ width: '100%', height: '70px', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '70px', borderRadius: '3px', background: chapter.photos[0].fallbackGradient }} />}
                    </PolaroidFrame>
                  )}
                </div>
              )}
            </motion.article>
          )
        })}
      </div>

      {relationshipSections.map((section) => (
        <div key={section.name} style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <h3 style={sectionHeaderStyle}>{section.name}</h3>
          {section.cards.map((relationship) => {
            const isExpanded = expandedId === relationship.id
            return (
              <motion.article layout key={relationship.id} role="button" tabIndex={0} aria-expanded={isExpanded} onClick={() => toggleExpanded(relationship.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleExpanded(relationship.id) } }} style={{ width: '100%', minHeight: '44px', cursor: 'pointer' }}>
                {isExpanded ? (
                  <AnimatePresence initial={false}>{expandedCard(relationship)}</AnimatePresence>
                ) : (
                  <div style={{ width: '100%', borderRadius: '16px', padding: '12px 16px', background: 'var(--white)', boxShadow: '0 6px 18px rgba(93,64,55,.07)', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <strong style={{ color: 'var(--accent-purple)', fontSize: '15px' }}>{relationship.name}</strong>
                      <ChevronDown size={16} aria-hidden="true" />
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.4, color: 'var(--text-brown)', marginTop: '4px' }}>{relationship.relationship_type}</p>
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      ))}
    </motion.section>
  )
}
