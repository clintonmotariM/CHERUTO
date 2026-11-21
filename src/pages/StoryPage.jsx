import { motion } from 'framer-motion'
import useMemorialData from '../hooks/useMemorialData'
import PolaroidFrame from '../components/ui/PolaroidFrame'

const chapterDefaults = [
  { title: 'Her Beginning', era: 'Roots', description: 'A bright spirit from the very start.' },
  { title: 'Her Passions', era: 'Joy', description: 'The things that brought her purpose and delight.' },
  { title: 'Her People', era: 'Love', description: 'A heart that gathered family and friends close.' },
  { title: 'Cherished Moments', era: 'Forever', description: 'Laughter, kindness, and memories held safely in time.' },
]

export default function StoryPage() {
  const { timeline, relationships, loading } = useMemorialData()
  const chapters = timeline?.length ? timeline.map((event, index) => ({
    title: event.title || chapterDefaults[index]?.title || 'Cherished Moment',
    era: event.event_date ? new Date(`${event.event_date}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : chapterDefaults[index]?.era || 'Memory',
    description: event.description || chapterDefaults[index]?.description,
    image_url: event.image_url,
  })) : chapterDefaults

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
      <header>
        <h2 style={{ fontFamily: 'var(--font-script)', fontSize: '42px', color: 'var(--text-brown)' }}>Her Story</h2>
        {loading && <p style={{ fontSize: '13px', marginTop: '6px' }}>Gathering memories…</p>}
      </header>

      <div style={{ width: '100%', maxWidth: '460px', display: 'grid', gap: '20px', position: 'relative' }}>
        {chapters.slice(0, 4).map((chapter, index) => (
          <motion.article
            key={`${chapter.title}-${index}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.09, duration: 0.42 }}
            style={{ display: 'grid', gridTemplateColumns: index % 2 ? '1fr 132px' : '132px 1fr', alignItems: 'center', gap: '12px', textAlign: index % 2 ? 'right' : 'left' }}
          >
            {index % 2 === 0 && (
              <PolaroidFrame style={{ width: '132px', borderRadius: '6px', transform: index % 2 ? 'rotate(2deg)' : 'rotate(-2deg)' }}>
                {chapter.image_url ? <img src={chapter.image_url} alt={chapter.title} style={{ width: '112px', height: '112px', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '112px', height: '112px', borderRadius: '3px', background: index % 2 ? 'linear-gradient(145deg, var(--accent-green), var(--accent-purple))' : 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' }} />}
              </PolaroidFrame>
            )}

            <div style={{ background: 'var(--white)', borderRadius: '18px', padding: '16px', boxShadow: '0 8px 24px rgba(93,64,55,.08)' }}>
              <span style={{ display: 'inline-block', marginBottom: '8px', padding: '5px 10px', borderRadius: '999px', background: 'var(--accent-purple)', color: 'var(--white)', fontSize: '11px', fontWeight: 700 }}>{chapter.era}</span>
              <h3 style={{ fontSize: '18px', color: 'var(--text-brown)', marginBottom: '6px' }}>{chapter.title}</h3>
              <p style={{ fontSize: '16px', lineHeight: 1.55, color: 'var(--text-brown)' }}>{chapter.description}</p>
            </div>

            {index % 2 !== 0 && (
              <PolaroidFrame style={{ width: '132px', borderRadius: '6px', transform: 'rotate(2deg)' }}>
                {chapter.image_url ? <img src={chapter.image_url} alt={chapter.title} style={{ width: '112px', height: '112px', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '112px', height: '112px', borderRadius: '3px', background: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' }} />}
              </PolaroidFrame>
            )}
          </motion.article>
        ))}
      </div>

      {relationships?.length > 0 && (
        <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
          {relationships.map((relationship) => (
            <span key={relationship.id} style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center', padding: '8px 12px', borderRadius: '999px', background: 'var(--white)', color: 'var(--text-brown)', boxShadow: '0 4px 14px rgba(93,64,55,.07)', fontSize: '15px' }}>{relationship.name}</span>
          ))}
        </div>
      )}
    </motion.section>
  )
}
