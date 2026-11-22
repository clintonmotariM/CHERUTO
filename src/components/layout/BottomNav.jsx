import { Home, BookOpen, Clock, Users, MapPin, X } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'legacy', label: 'Timeline', icon: Clock },
  { id: 'gathering', label: 'Gathering', icon: Users },
  { id: 'residence', label: 'Her Home', icon: MapPin },
]

export default function BottomNav({ activeTab = 'home', onChange, onExit }) {
  return (
    <nav
      aria-label="Primary navigation"
      style={{
        position: 'fixed',
        bottom: 'max(var(--safe-bottom), 20px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content',
        minWidth: '320px',
        maxWidth: '460px',
        height: 'var(--nav-height)',
        backgroundColor: 'var(--white)',
        borderRadius: '50px',
        border: '1px solid rgba(93, 64, 55, 0.08)',
        boxShadow: '0 8px 30px rgba(93, 64, 55, 0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '6px 10px',
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
            title={tab.label}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onChange?.(tab.id)}
            style={{
              height: '44px',
              minWidth: '44px',
              minHeight: '44px',
              padding: isActive ? '0 16px' : '0',
              border: isActive ? '1px solid rgba(255, 77, 133, 0.25)' : 'none',
              borderRadius: isActive ? '999px' : '50%',
              backgroundColor: isActive ? 'rgba(255, 77, 133, 0.13)' : 'transparent',
              color: isActive ? 'var(--btn-pink)' : 'var(--text-brown)',
              display: 'flex',
              flexDirection: isActive ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isActive ? '8px' : '0',
              cursor: 'pointer',
              transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
              whiteSpace: 'nowrap',
            }}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.4 : 1.9}
              aria-hidden="true"
              style={{ color: isActive ? 'var(--btn-pink)' : 'var(--text-brown)' }}
            />
            {isActive && (
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: 'var(--btn-pink)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </span>
            )}
          </button>
        )
      })}

      <button
        type="button"
        aria-label="Exit fullscreen memorial"
        title="Exit"
        onClick={() => onExit?.()}
        style={{
          flex: '0 0 44px',
          width: '44px',
          minWidth: '44px',
          minHeight: '44px',
          height: '44px',
          display: 'grid',
          placeItems: 'center',
          padding: 0,
          border: 'none',
          borderRadius: '50%',
          backgroundColor: 'rgba(93, 64, 55, 0.08)',
          color: 'var(--text-brown)',
          cursor: 'pointer',
        }}
      >
        <X size={20} aria-hidden="true" />
      </button>
    </nav>
  )
}
