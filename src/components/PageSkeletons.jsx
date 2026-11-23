import ExpandableReveal from './ExpandableReveal'

const line = (width) => (
  <div style={{ width, height: '16px', borderRadius: '999px', className: 'cheruto-skeleton' }} />
)

const row = (height, width = '100%') => (
  <div style={{ width, height, borderRadius: '12px', className: 'cheruto-skeleton' }} />
)

const pill = (width, height, radius = '999px') => (
  <div style={{ width, height, borderRadius: radius, className: 'cheruto-skeleton' }} />
)

export function HomePageSkeleton() {
  return (
    <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', paddingTop: 'max(14px, calc(var(--safe-top) + 10px))' }}>
      <div style={{ width: '260px', height: '340px', borderRadius: '140px 140px 22px 22px', className: 'cheruto-skeleton' }} />
      <div style={{ width: '180px', height: '20px', borderRadius: '999px', className: 'cheruto-skeleton' }} />
      <div style={{ width: '140px', height: '16px', borderRadius: '999px', className: 'cheruto-skeleton' }} />
      <div style={{ width: '160px', height: '40px', borderRadius: '999px', className: 'cheruto-skeleton' }} />
    </div>
  )
}

export function StoryPageSkeleton() {
  return (
    <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', paddingTop: 0 }}>
      <pill width="140px" height="36px" />
      {[1, 2, 3, 4, 5].map((i) => (
        <row key={i} height="68px" width="460px" />
      ))}
    </div>
  )
}

export function TimelinePageSkeleton() {
  return (
    <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', paddingTop: 0 }}>
      <pill width="150px" height="36px" />
      <div style={{ width: '100%', borderRadius: '20px', className: 'cheruto-skeleton', height: '200px' }} />
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ width: '100%', height: '20px', borderRadius: '999px', className: 'cheruto-skeleton' }} />
      ))}
      {[1, 2, 3, 4].map((i) => (
        <row key={`row-${i}`} height="66px" />
      ))}
    </div>
  )
}

export function GatheringPageSkeleton() {
  return (
    <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', paddingTop: 0 }}>
      <pill width="130px" height="32px" />
      <div style={{ width: '100%', height: '48vh', minHeight: '380px', maxHeight: '620px', borderRadius: '20px', className: 'cheruto-skeleton' }} />
      <div style={{ width: '100%', maxWidth: '490px', borderRadius: '18px', className: 'cheruto-skeleton', height: '120px' }} />
      {[1, 2, 3].map((i) => (
        <row key={`schedule-${i}`} height="72px" />
      ))}
    </div>
  )
}

export function HerHomePageSkeleton() {
  return (
    <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', paddingTop: 0 }}>
      <pill width="140px" height="36px" />
      <div style={{ width: '100%', maxWidth: '440px', borderRadius: '18px', className: 'cheruto-skeleton', height: '80px' }} />
      <div style={{ width: '100%', borderRadius: '20px', className: 'cheruto-skeleton', height: '60px' }} />
      <div style={{ width: '100%', borderRadius: '14px', className: 'cheruto-skeleton', height: '160px' }} />
      {[1, 2, 3].map((i) => (
        <row key={`memory-${i}`} height="64px" />
      ))}
    </div>
  )
}
