import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const fallbackProfile = {
  full_name: 'Cheruto',
  preferred_name: 'Cheruto',
  birth_date: null,
  passing_date: null,
  biography: 'A life remembered with love, laughter, and the many moments that made her unforgettable.',
}

const fallbackTimeline = [
  { id: '1', title: 'Her Beginning', start_date: null, end_date: null, event_date: null, description: 'A bright spirit from the very start.', image_url: null },
  { id: '2', title: 'Her Passions', start_date: null, end_date: null, event_date: null, description: 'The things that brought her joy and purpose.', image_url: null },
  { id: '3', title: 'Her People', start_date: null, end_date: null, event_date: null, description: 'A heart that gathered everyone close.', image_url: null },
  { id: '4', title: 'Cherished Moments', start_date: null, end_date: null, event_date: null, description: 'Love and laughter held safely in memory.', image_url: null },
]

const fallbackRelationships = [
  { id: 'r1', name: 'Family', relationship_type: 'Loved and supported' },
  { id: 'r2', name: 'Friends', relationship_type: 'Shared in joy' },
  { id: 'r3', name: 'Community', relationship_type: 'Touched many lives' },
]

const fallbackSchedule = [
  { id: 's1', event_name: 'Memorial Gathering', starts_at: null, location_name: 'Venue details to be confirmed', address: '', notes: 'Celebrate with color', display_order: 1 },
]

const fallbackAwareness = [
  { id: 'a1', name: 'Shared Legacy', relationship_or_context: 'Family and friends', memorial_note: 'Cheruto’s warmth lives on through every act of kindness shared in her name.' },
]

const fallbackMemories = [
  { id: 'm1', author_name: 'Family', relationship: 'Family', memory: 'We carry Cheruto’s joy, strength, and laughter with us always.', is_approved: true, memory_tag: 'Family', photo_url: null },
]

export default function useMemorialData() {
  const [data, setData] = useState({
    profile: fallbackProfile,
    timeline: fallbackTimeline,
    relationships: fallbackRelationships,
    schedule: fallbackSchedule,
    awareness: fallbackAwareness,
    memories: fallbackMemories,
  })
  const [loading, setLoading] = useState(Boolean(supabase))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let active = true

    async function load() {
      setLoading(true)
      setError(null)

      const requests = await Promise.allSettled([
        supabase.from('deceased_profile').select('*').limit(1).maybeSingle(),
        supabase.from('timeline_events').select('*').order('position', { ascending: true }),
        supabase.from('relationships').select('*').order('display_order', { ascending: true }),
        supabase.from('funeral_schedule').select('*').order('display_order', { ascending: true }),
        supabase.from('awareness_profiles').select('*').order('display_order', { ascending: true }),
        supabase.from('guestbook_memories').select('*').eq('is_approved', true).order('created_at', { ascending: false }),
      ])

      if (!active) return

      const [profile, timeline, relationships, schedule, awareness, memories] = requests.map((result) =>
        result.status === 'fulfilled' ? result.value : { data: null, error: result.reason }
      )

      const firstError = [profile.error, timeline.error, relationships.error, schedule.error, awareness.error, memories.error].find(Boolean)

      setData({
        profile: profile.data || fallbackProfile,
        timeline: timeline.data?.length ? timeline.data : fallbackTimeline,
        relationships: relationships.data?.length ? relationships.data : fallbackRelationships,
        schedule: schedule.data?.length ? schedule.data : fallbackSchedule,
        awareness: awareness.data?.length ? awareness.data : fallbackAwareness,
        memories: memories.data?.length ? memories.data : fallbackMemories,
      })
      setError(firstError?.message || null)
      setLoading(false)
    }

    load()
    return () => { active = false }
  }, [])

  return { ...data, loading, error, isConfigured: Boolean(supabase) }
}
