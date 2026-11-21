import { useState } from 'react'
import { Home, BookOpen, Heart, Users, MapPin } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'legacy', label: 'Legacy', icon: Heart },
  { id: 'gathering', label: 'Gathering', icon: Users },
  { id: 'residence', label: 'Her Home', icon: MapPin },
]

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 'max(var(--safe-bottom), 20px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '500px',
        height: 'var(--nav-height)',
        backgroundColor: 'var(--white)',
        borderRadius: '50px',
        boxShadow: '0 8px 30px rgba(93, 64, 55, 0.12)',
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
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '8px 0',
              border: 'none',
              borderRadius: '40px',
              backgroundColor: isActive ? 'var(--btn-pink)' : 'transparent',
              color: isActive ? 'var(--white)' : 'var(--text-brown)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minHeight: '44px',
            }}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
            <span
              style={{
                fontSize: '10px',
                fontWeight: isActive ? 700 : 500,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
