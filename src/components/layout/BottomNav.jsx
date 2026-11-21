import { Home, BookOpen, Heart, Users, MapPin, X } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'legacy', label: 'Legacy', icon: Heart },
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
        width: 'calc(100% - 24px)',
        maxWidth: '520px',
        height: 'var(--nav-height)',
        backgroundColor: 'var(--white)',
        borderRadius: '50px',
        border: '1px solid rgba(93, 64, 55, 0.08)',
        boxShadow: '0 8px 30px rgba(93, 64, 55, 0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2px',
        padding: '6px 8px',
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon
        const isHome = tab.id === 'home'

        return (
          <button
            key={tab.id}
            type="button"
            aria-label={tab.label}
            title={tab.label}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onChange?.(tab.id)}
            style={{
              flex: isHome ? '0 0 44px' : '1 1 0',
              width: isHome ? '44px' : 'auto',
              minWidth: '44px',
              minHeight: '44px',
              height: '44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: isHome ? '0' : '7px 2px',
              border: 'none',
              borderRadius: isActive ? '40px' : '50%',
              backgroundColor: isActive ? 'var(--btn-pink)' : 'transparent',
              color: isActive ? 'var(--white)' : 'var(--text-brown)',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
            }}
          >
            <Icon
              size={isHome ? 20 : 18}
              strokeWidth={isActive ? 2.5 : 2}
              aria-hidden="true"
            />
            {!isHome && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: isActive ? 700 : 500, whiteSpace: 'nowrap' }}>
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
        <X size={18} aria-hidden="true" />
      </button>
    </nav>
  )
}
