import { Home, BookOpen, Heart, Users, MapPin } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'legacy', label: 'Legacy', icon: Heart },
  { id: 'gathering', label: 'Gathering', icon: Users },
  { id: 'residence', label: 'Her Home', icon: MapPin },
]

export default function BottomNav({ activeTab = 'home', onChange }) {
  return (
    <nav
      aria-label="Primary navigation"
      style={{
        position: 'fixed',
        bottom: 'max(var(--safe-bottom), 20px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 24px)',
        maxWidth: '500px',
        height: 'var(--nav-height)',
        backgroundColor: 'var(--white)',
        borderRadius: '50px',
        border: '1px solid rgba(93, 64, 55, 0.08)',
        boxShadow: '0 8px 30px rgba(93, 64, 55, 0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px',
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            type="button"
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onChange?.(tab.id)}
            style={{
              flex: 1,
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '7px 2px',
              border: 'none',
              borderRadius: '40px',
              backgroundColor: isActive ? 'var(--btn-pink)' : 'transparent',
              color: isActive ? 'var(--white)' : 'var(--text-brown)',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: isActive ? 700 : 500, whiteSpace: 'nowrap' }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
