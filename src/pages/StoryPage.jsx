import { motion } from 'framer-motion'
import useMemorialData from '../hooks/useMemorialData'
import PolaroidFrame from '../components/ui/PolaroidFrame'

const chapterDefaults = [
  { title: 'Her Beginning', era: 'Roots', description: 'A bright spirit from the very start.' },
  { title: 'Her Passions', era: 'Joy', description: 'The things that brought her purpose and delight.' },
  { title: 'Her People', era: 'Love', description: 'A heart that gathered family and friends close.' },
  { title: 'Cherished Moments', era: 'Forever', description: 'Laughter, kindness, and memories held safely in time.' },
]

const relationshipDefaults = {
  Family: [{ id: 'family-fallback', name: 'Family', relationship_type: 'Cheruto was deeply rooted in the love, strength, and stories shared by family.' }],
  Friends: [{ id: 'friends-fallback', name: 'Friends', relationship_type: 'Cheru made space for joy, laughter, honest conversation, and lifelong friendship.' }],
  Community: [{ id: 'community-fallback', name: 'Community', relationship_type: 'Her warmth reached beyond close circles and touched everyone she met.' }],
}

export default function StoryPage() {
  const { timeline, relationships, loading } = useMemorialData()
  const chapters = timeline?.length ? timeline.map((event, index) => ({
    title: event.title || chapterDefaults[index]?.title || 'Cherished Moment',
    era: event.event_date
      ? new Date(`${event.event_date}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
      : chapterDefaults[index]?.era || 'Memory',
    description: event.description || chapterDefaults[index]?.description,
    image_url: event.image_url,
  })) : chapterDefaults

  const relationshipSections = ['Family', 'Friends', 'Community'].map((sectionName) => {
    const matching = (relationships || []).filter((relationship) => {
      const name = (relationship.name || '').toLowerCase()
      if (sectionName === 'Family') return name.includes('family')
      if (sectionName === 'Friends') return name.includes('friend')
      return name.includes('community')
    })
    return { name: sectionName, cards: matching.length ? matching : relationshipDefaults[sectionName] }
  })

  const sectionHeaderStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '18px auto 10px auto',
    padding: '6px 20px',
    borderRadius: '999px',
    backgroundColor: 'var(--white)',
    border: '1px solid rgba(157, 78, 221, 0.18)',
    boxShadow: '0 4px 14px rgba(93, 64, 55, 0.06)',
    fontFamily: 'var(--font-script)',
    fontSize: 'clamp(1.35rem, 4.5vw, 1.6rem)',
    lineHeight: 1.15,
    color: 'var(--text-brown)',
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        paddingTop: 'max(20px, calc(var(--safe-top) + 14px))',
        paddingBottom: '24px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <header
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          padding: '8px 24px',
          borderRadius: '999px',
          backgroundColor: 'var(--white)',
          border: '1px solid rgba(93, 64, 55, 0.10)',
          boxShadow: '0 6px 20px rgba(93, 64, 55, 0.08)',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.85rem, 6vw, 2.25rem)',
            lineHeight: 1.15,
            color: 'var(--text-brown)',
            whiteSpace: 'nowrap',
          }}
        >
          Her Story
        </h2>
      </header>

      {loading && <p style={{ fontSize: '14px', margin: '-6px 0 6px' }}>Gathering memories…</p>}

      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '12px', position: 'relative' }}>
        {chapters.slice(0, 4).map((chapter, index) => (
          <motion.article
            key={`${chapter.title}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.36 }}
            style={{
              display: 'grid',
              gridTemplateColumns: index % 2 ? '1fr 72px' : '72px 1fr',
              alignItems: 'center',
              gap: '8px',
              textAlign: index % 2 ? 'right' : 'left',
            }}
          >
            {index % 2 === 0 && (
              <PolaroidFrame style={{ width: '72px', height: '82px', padding: '6px', borderRadius: '6px', transform: 'rotate(-2deg)' }}>
                {chapter.image_url ? (
                  <img src={chapter.image_url} alt={chapter.title} style={{ width: '100%', height: '70px', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '70px', borderRadius: '3px', background: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' }} />
                )}
              </PolaroidFrame>
            )}

            <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '12px 14px', boxShadow: '0 6px 18px rgba(93,64,55,.07)' }}>
              <span style={{ display: 'inline-block', marginBottom: '4px', padding: '4px 8px', borderRadius: '999px', background: 'var(--accent-purple)', color: 'var(--white)', fontSize: '11px', fontWeight: 700 }}>
                {chapter.era}
              </span>
              <h3 style={{ fontSize: '15px', marginBottom: '2px', color: 'var(--text-brown)' }}>{chapter.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.4, color: 'var(--text-brown)' }}>{chapter.description}</p>
            </div>

            {index % 2 !== 0 && (
              <PolaroidFrame style={{ width: '72px', height: '82px', padding: '6px', borderRadius: '6px', transform: 'rotate(2deg)' }}>
                {chapter.image_url ? (
                  <img src={chapter.image_url} alt={chapter.title} style={{ width: '100%', height: '70px', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '70px', borderRadius: '3px', background: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' }} />
                )}
              </PolaroidFrame>
            )}
          </motion.article>
        ))}
      </div>

      {relationshipSections.map((section) => (
        <div key={section.name} style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <h3 style={sectionHeaderStyle}>{section.name}</h3>
          {section.cards.map((relationship) => (
            <article
              key={relationship.id}
              style={{
                width: '100%',
                borderRadius: '16px',
                padding: '12px 16px',
                background: 'var(--white)',
                boxShadow: '0 6px 18px rgba(93,64,55,.07)',
                textAlign: 'left',
              }}
            >
              <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--accent-purple)', fontSize: '15px' }}>{relationship.name}</strong>
              <p style={{ fontSize: '14px', lineHeight: 1.4, color: 'var(--text-brown)' }}>{relationship.relationship_type || `${section.name} stories and shared memories are part of Cheruto's lasting legacy.`}</p>
            </article>
          ))}
        </div>
      ))}
    </motion.section>
  )
}
