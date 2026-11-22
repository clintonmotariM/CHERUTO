import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ExpandableReveal from '../components/ExpandableReveal'
import useMemorialData from '../hooks/useMemorialData'

const stages = [
  {
    id: 'birth',
    match: ['birth', 'born', 'beginning'],
    badge: 'Beginning',
    title: 'Born into Love',
    preview: 'The day Cheruto arrived and brought new light into the world.',
    year: 'Birth',
    place: 'A new beginning',
    biography: 'Cheruto arrived surrounded by love and possibility. From the beginning, she brought a warmth that would grow into a source of joy and comfort for everyone whose life she touched.',
    memory: 'The first page of a life that would mean so much to so many.',
    gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))',
  },
  {
    id: 'preschool',
    match: ['pre-school', 'preschool', 'nursery', 'early years'],
    badge: 'Early Years',
    title: 'Pre-School Days',
    preview: 'Curiosity, bright smiles, and her earliest friendships.',
    year: 'Early years',
    place: 'First friendships',
    biography: 'Cheruto met each new day with curiosity and a bright smile. Her earliest friendships and discoveries hinted at the generous, open-hearted person she would become.',
    memory: 'Little moments of wonder became the beginning of a beautiful story.',
    gradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)',
  },
  {
    id: 'primary',
    match: ['primary', 'childhood', 'elementary'],
    badge: 'Childhood',
    title: 'Primary School',
    preview: 'Learning, laughter, and discovering her voice and kindness.',
    year: 'School years',
    place: 'Learning and growing',
    biography: 'In her primary years, Cheruto learned with enthusiasm and shared laughter freely. Kindness came naturally, and she began discovering the voice and confidence that made her uniquely Cheru.',
    memory: 'She made room for learning, laughter, and everyone around her.',
    gradient: 'linear-gradient(145deg, var(--accent-green), var(--accent-purple))',
  },
  {
    id: 'high-school',
    match: ['high school', 'secondary', 'youth'],
    badge: 'Youth',
    title: 'High School Years',
    preview: 'Growing into confidence, lifelong friendships, and bold dreams.',
    year: 'Youth',
    place: 'New horizons',
    biography: 'Cheruto grew into her confidence, built friendships that would last, and began imagining bold possibilities for her future. Her spirit brought energy and encouragement to the people sharing those years with her.',
    memory: 'Her dreams grew, and so did the circle of people who believed in her.',
    gradient: 'linear-gradient(145deg, #F5B7A7, var(--accent-purple))',
  },
  {
    id: 'campus',
    match: ['campus', 'college', 'university'],
    badge: 'Chapter',
    title: 'Campus Life',
    preview: 'Stepping into independence, passion, and unforgettable memories.',
    year: 'A new chapter',
    place: 'Campus years',
    biography: 'Campus life opened a chapter of independence, discovery, and new possibilities. Cheruto followed her interests, formed meaningful connections, and gathered memories that her loved ones continue to treasure.',
    memory: 'A season of growing into herself and making every day count.',
    gradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))',
  },
  {
    id: 'final-place',
    match: ['final known place', 'last alive', 'final chapter'],
    badge: 'Final Chapter',
    title: 'Where She Was Last Alive',
    preview: 'The final place Cheruto walked, remembered with tenderness and peace.',
    year: 'Held in memory',
    place: 'A place remembered',
    biography: 'This place is remembered with tenderness and peace. It marks the final chapter of Cheruto’s physical journey, while the love she gave and the memories she made continue to live among us.',
    memory: 'May this place be held gently, with love for the life that came before it.',
    gradient: 'linear-gradient(145deg, #5C343D, var(--accent-purple))',
  },
]

const stageDateRanges = {
  0: { from: 'Date of Birth', to: 'Early Infancy' },
  1: { from: 'Start Year', to: 'End Year' },
  2: { from: 'Start Year', to: 'End Year' },
  3: { from: 'Form 1', to: 'Form 4' },
  4: { from: 'Year 1', to: 'Final Year' },
  5: { from: 'Final Days', to: 'Date of Rest' },
}

function findEvent(stage, index, events) {
  const terms = stage.match.map((term) => term.toLowerCase())
  return events.find((event) => {
    const title = (event.title || '').toLowerCase()
    return terms.some((term) => title.includes(term))
  }) || events[index]
}

export default function TimelinePage() {
  const { timeline = [], loading } = useMemorialData()
  const [expandedId, setExpandedId] = useState(null)

  const items = stages.map((stage, index) => {
    const event = findEvent(stage, index, timeline)
    const title = event?.title && stage.match.some((term) => event.title.toLowerCase().includes(term))
      ? stage.title
      : stage.title

    return {
      ...stage,
      title,
      preview: stage.preview,
      photoUrl: event?.image_url || null,
      biography: event?.description
        ? `${event.description} ${stage.biography}`
        : stage.biography,
      year: event?.event_date
        ? new Date(`${event.event_date}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric' })
        : stage.year,
      place: event?.location_name || stage.place,
    }
  })

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        width: '100%',
        paddingTop: 0,
        paddingBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <header className="sticky-header-band">
        <h2 className="sticky-header-band-title">Her Timeline</h2>
      </header>
      {loading && <p style={{ margin: '0 0 8px', fontSize: '14px' }}>Gathering Cheruto’s milestones…</p>}

      <div style={{ width: '100%', maxWidth: '460px', position: 'relative', display: 'grid', gap: '12px' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '34px', bottom: '34px', left: '32px', width: '2px', borderRadius: '2px', zIndex: 0, background: 'linear-gradient(180deg, rgba(157,78,221,.35), rgba(255,77,133,.34), rgba(92,52,61,.38))' }} />

        {items.map((item, index) => {
          const isExpanded = expandedId === item.id
          const badgeColor = index === 0 || index === 3 ? 'var(--accent-purple)' : index === 1 || index === 4 ? 'var(--btn-pink)' : index === 2 ? 'var(--accent-green)' : '#5C343D'

          return (
            <motion.article
              layout
              key={item.id}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onClick={() => setExpandedId((current) => current === item.id ? null : item.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setExpandedId((current) => current === item.id ? null : item.id)
                }
              }}
              style={{ width: '100%', minHeight: '44px', position: 'relative', zIndex: 1, cursor: 'pointer', outline: 'none' }}
            >
              <ExpandableReveal
                isOpen={isExpanded}
                variant="card"
                collapsed={
                  <div className="ch-fade-in" style={{ display: 'grid', gridTemplateColumns: '66px 1fr', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '16px', backgroundColor: 'var(--white)', boxShadow: '0 6px 18px rgba(93,64,55,.07)', border: '1px solid rgba(93, 64, 55, 0.07)', textAlign: 'left', position: 'relative', zIndex: 2 }}>
                    <div style={{ width: '66px', height: '74px', padding: '5px', borderRadius: '6px', background: 'var(--white)', boxShadow: '0 6px 15px rgba(93,64,55,.14)', transform: 'rotate(-2deg)' }}>
                      {item.photoUrl ? <img src={item.photoUrl} alt={item.title} style={{ width: '100%', height: '64px', display: 'block', objectFit: 'cover', borderRadius: '3px' }} /> : <div style={{ width: '100%', height: '64px', borderRadius: '3px', background: item.gradient }} />}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '7px', marginBottom: '4px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: '22px', padding: '3px 8px', borderRadius: '999px', background: badgeColor, color: 'var(--white)', fontSize: '11px', fontWeight: 700 }}>{item.badge}</span>
                        <h3 style={{ margin: 0, color: 'var(--text-brown)', fontSize: '15px' }}>{item.title}</h3>
                        <ChevronDown size={16} aria-hidden="true" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                      </div>
                      <p style={{ margin: 0, color: 'var(--text-brown)', fontSize: '13.5px', lineHeight: 1.38 }}>{item.preview}</p>
                    </div>
                  </div>
                }
                expanded={
                  <div style={{ width: '100%', maxWidth: '460px', backgroundColor: 'var(--white)', borderRadius: '20px', padding: '12px 12px 16px', border: '1px solid rgba(93, 64, 55, 0.08)', boxShadow: '0 12px 32px rgba(93, 64, 55, 0.10)', position: 'relative', zIndex: 2 }}>
                    <div style={{ width: '100%', height: '240px', overflow: 'hidden', position: 'relative', borderRadius: '14px', background: item.gradient }}>
                      {item.photoUrl && <img src={item.photoUrl} alt={item.title} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />}
                    </div>
                    <div style={{ padding: '12px 6px 4px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', backgroundColor: 'rgba(157, 78, 221, 0.10)', border: '1px solid rgba(157, 78, 221, 0.22)' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.07em', color: 'var(--accent-purple)' }}>FROM</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-brown)' }}>{item.start_date || stageDateRanges[index]?.from || 'Start'}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-brown)', textAlign: 'left' }}>{item.biography}</p>
                      <div style={{ alignSelf: 'center', margin: '2px auto 0 auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', backgroundColor: 'rgba(92, 52, 61, 0.08)', border: '1px solid rgba(92, 52, 61, 0.20)' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.07em', color: '#5C343D' }}>TO</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-brown)' }}>{item.end_date || 'Saturday, 14 Nov 2026'}</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </motion.article>
          )
        })}
      </div>
    </motion.section>
  )
}
