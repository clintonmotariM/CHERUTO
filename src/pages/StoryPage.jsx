import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import useMemorialData from '../hooks/useMemorialData'
import PolaroidFrame from '../components/ui/PolaroidFrame'
import ExpandableReveal from '../components/ExpandableReveal'

const chapterDefaults = [
  { id: 'chapter-beginning', title: 'Her Beginning', era: 'Roots', description: 'A bright spirit from the very start.', fullStory: 'Cheruto began a life marked by warmth, curiosity, and an open heart. Her beginning was shaped by the people and places that taught her to notice beauty, care deeply, and make others feel at home.', photos: [
    { src: '', caption: 'Her Beginning', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
    { src: '', caption: 'Roots', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
  ] },
  { id: 'chapter-passions', title: 'Her Passions', era: 'Joy', description: 'The things that brought her purpose and delight.', fullStory: 'Cheruto found joy in the things that let her create, serve, laugh, and connect. Her passions were never only hobbies; they were the gifts she shared generously with the people around her.', photos: [
    { src: '', caption: 'Her Passions', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
    { src: '', caption: 'Joy', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
  ] },
  { id: 'chapter-people', title: 'Her People', era: 'Love', description: 'A heart that gathered family and friends close.', fullStory: 'Cheruto made people feel seen. Her friendships and family relationships were built through presence, honesty, celebration, and an uncommon ability to turn ordinary moments into lasting memories.', photos: [
    { src: '', caption: 'Her People', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
    { src: '', caption: 'Love', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), var(--accent-purple))' },
  ] },
  { id: 'chapter-moments', title: 'Cherished Moments', era: 'Forever', description: 'Laughter, kindness, and memories held safely in time.', fullStory: 'The moments that meant most were often the simplest: a shared meal, a quiet conversation, a celebration, or a spontaneous burst of laughter. Those memories now carry Cheruto’s presence forward.', photos: [
    { src: '', caption: 'Cherished Moments', fallbackGradient: 'linear-gradient(145deg, var(--accent-green), var(--btn-pink))' },
    { src: '', caption: 'Forever', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), #F5B7A7)' },
  ] },
]

const relationshipDefaults = {
  Family: [
    { id: 'family-home', name: 'Family', badge: 'Roots', title: 'Home & Kin', relationship_type: 'The laughter, guidance, and unconditional love that shaped Cheruto.', fullStory: 'Home was a place of rooted love and honest belonging. Cheruto carried the laughter, guidance, traditions, and quiet strength of family with her wherever she went.', photos: [
      { src: '', caption: 'Home & Kin', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { src: '', caption: 'Roots', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
    ] },
    { id: 'family-sunday', name: 'Family', badge: 'Tradition', title: 'Sunday Gatherings', relationship_type: 'Shared meals, stories, and quiet moments around the family table.', fullStory: 'The family table held ordinary moments that became lasting treasures: shared meals, familiar stories, gentle laughter, and the comfort of being together.', photos: [
      { src: '', caption: 'Sunday Gatherings', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), var(--accent-purple))' },
      { src: '', caption: 'Tradition', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), #F5B7A7)' },
    ] },
  ],
  Friends: [
    { id: 'friends-kindred', name: 'Friends', badge: 'Circle', title: 'Kindred Spirits', relationship_type: 'Late-night talks, spontaneous adventures, and steadfast loyalty.', fullStory: 'Cheru made room for kindred spirits. Their friendships were strengthened by late-night conversations, spontaneous adventures, honest support, and steadfast loyalty.', photos: [
      { src: '', caption: 'Kindred Spirits', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
      { src: '', caption: 'Circle', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
    ] },
    { id: 'friends-laughter', name: 'Friends', badge: 'Laughter', title: 'Unforgettable Days', relationship_type: 'The inside jokes and celebrations that lit up every room Cheru entered.', fullStory: 'The days with Cheru seemed brighter because of her humor and joy. Inside jokes, celebrations, and spontaneous laughter became memories her friends will always carry.', photos: [
      { src: '', caption: 'Unforgettable Days', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { src: '', caption: 'Laughter', fallbackGradient: 'linear-gradient(145deg, #F5B7A7, var(--accent-purple))' },
    ] },
  ],
  Community: [
    { id: 'community-heart', name: 'Community', badge: 'Grace', title: 'A Welcoming Heart', relationship_type: 'Always making space for newcomers and lifting those around her.', fullStory: 'Cheruto welcomed people with grace. She made newcomers feel seen, lifted others with encouragement, and helped community spaces feel warmer and more inclusive.', photos: [
      { src: '', caption: 'A Welcoming Heart', fallbackGradient: 'linear-gradient(145deg, var(--accent-green), var(--accent-purple))' },
      { src: '', caption: 'Grace', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
    ] },
    { id: 'community-kindness', name: 'Community', badge: 'Legacy', title: 'Shared Kindness', relationship_type: 'Small everyday acts of care that left a lasting mark on everyone she met.', fullStory: 'Cheruto’s legacy in the community was built through small, everyday acts of care. A kind word, a thoughtful gesture, or a willingness to help could change someone’s whole day.', photos: [
      { src: '', caption: 'Shared Kindness', fallbackGradient: 'linear-gradient(145deg, var(--accent-green), var(--btn-pink))' },
      { src: '', caption: 'Legacy', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
    ] },
  ],
}

export default function StoryPage() {
  const [expandedId, setExpandedId] = useState(null)
  const [photoIndexById, setPhotoIndexById] = useState({})
  const shouldReduceMotion = useReducedMotion()
  const { timeline, relationships, loading } = useMemorialData()

  const chapters = timeline?.length ? timeline.map((event, index) => {
    const fallback = chapterDefaults[index] || chapterDefaults[chapterDefaults.length - 1]
    return {
      ...fallback,
      id: event.id || fallback.id,
      title: event.title || fallback.title,
      era: event.event_date ? new Date(`${event.event_date}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : fallback.era,
      description: event.description || fallback.description,
      fullStory: event.description ? `${event.description} These memories continue to reveal Cheruto’s light, love, and lasting impact on everyone who knew Cheru.` : fallback.fullStory,
      photos: event.image_url ? [{ src: event.image_url, caption: event.title || fallback.title, fallbackGradient: fallback.photos[0].fallbackGradient }, ...fallback.photos.slice(1)] : fallback.photos,
    }
  }) : chapterDefaults

  const relationshipSections = ['Family', 'Friends', 'Community'].map((sectionName) => {
    const nameMatches = (relationships || []).filter((relationship) => {
      const name = (relationship.name || '').toLowerCase()
      if (sectionName === 'Family') return name.includes('family')
      if (sectionName === 'Friends') return name.includes('friend')
      return name.includes('community')
    })

    const cards = relationshipDefaults[sectionName].map((fallback, index) => {
      const live = nameMatches[index]
      return {
        ...fallback,
        id: live?.id || fallback.id,
        photos: live?.image_url
          ? [{ src: live.image_url, caption: fallback.title, fallbackGradient: fallback.photos[0].fallbackGradient }, ...fallback.photos.slice(1)]
          : fallback.photos,
      }
    })

    return { name: sectionName, cards }
  })

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
        <div style={{ width: '100%', height: '285px', borderRadius: '14px', overflow: 'hidden', position: 'relative', background: photo.fallbackGradient }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${item.id}-${photoIndex}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              style={{ width: '100%', height: '100%', background: photo.fallbackGradient }}
            >
              {photo.src && <img src={photo.src} alt={item.title || item.name || 'Cheruto memory'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
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
              {polaroidLeft && <PolaroidFrame style={{ width: '66px', height: '74px', padding: '5px', borderRadius: '6px', transform: 'rotate(-2deg)' }}>{chapter.image_url ? <img src={chapter.image_url} alt={chapter.title} style={{ width: '100%', height: '64px', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '64px', borderRadius: '3px', background: chapter.photos[0].fallbackGradient }} />}</PolaroidFrame>}
              <div>
                {collapsedInlineHeader(chapter, chapter.era, 'var(--accent-purple)', !polaroidLeft)}
                <p style={{ fontSize: '13.5px', lineHeight: 1.38, color: 'var(--text-brown)', margin: 0 }}>{chapter.description}</p>
              </div>
              {!polaroidLeft && <PolaroidFrame style={{ width: '66px', height: '74px', padding: '5px', borderRadius: '6px', transform: 'rotate(2deg)' }}>{chapter.image_url ? <img src={chapter.image_url} alt={chapter.title} style={{ width: '100%', height: '64px', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '64px', borderRadius: '3px', background: chapter.photos[0].fallbackGradient }} />}</PolaroidFrame>}
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
              {polaroidLeft && <PolaroidFrame style={{ width: '66px', height: '74px', padding: '5px', borderRadius: '6px', transform: 'rotate(-2deg)' }}>{relationship.photos[0].src ? <img src={relationship.photos[0].src} alt={relationship.title} style={{ width: '100%', height: '64px', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '64px', borderRadius: '3px', background: relationship.photos[0].fallbackGradient }} />}</PolaroidFrame>}
              <div>
                {collapsedInlineHeader(relationship, relationship.badge, badgeColor, !polaroidLeft)}
                <p style={{ fontSize: '13.5px', lineHeight: 1.38, color: 'var(--text-brown)', margin: 0 }}>{relationship.relationship_type}</p>
              </div>
              {!polaroidLeft && <PolaroidFrame style={{ width: '66px', height: '74px', padding: '5px', borderRadius: '6px', transform: 'rotate(2deg)' }}>{relationship.photos[0].src ? <img src={relationship.photos[0].src} alt={relationship.title} style={{ width: '100%', height: '64px', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '64px', borderRadius: '3px', background: relationship.photos[0].fallbackGradient }} />}</PolaroidFrame>}
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
          <div className="sticky-header-band"><h3 className="sticky-header-band-title">{section.name}</h3></div>
          {section.cards.map((relationship, cardIndex) => renderRelationshipCard(relationship, sectionIndex, cardIndex))}
        </div>
      ))}
    </motion.section>
    </>
  )
}
