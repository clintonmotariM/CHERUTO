import { useState } from 'react'
import { Home, BookOpen, Heart, Users, MapPin } from 'lucide-react'

const tabs = [
  { label: 'Home', icon: Home },
  { label: 'Story', icon: BookOpen },
  { label: 'Legacy', icon: Heart },
  { label: 'Gathering', icon: Users },
  { label: 'Her Home', icon: MapPin },
]

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('Home')

  return (
    <nav
      aria-label="Primary navigation"
      style={{
        position: 'fixed',
        bottom: 'max(var(--safe-bottom), 20px)',
        left: '16px',
        width: 'calc(100% - 32px)',
        minHeight: 'var(--nav-height)',
        borderRadius: '50px',
        background: 'var(--white)',
        boxShadow: '0 8px 30px rgba(93, 64, 55, 0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 90,
        padding: '8px',
      }}
    >
      {tabs.map(({ label, icon: Icon }) => {
        const isActive = activeTab === label

        return (
          <button
            key={label}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => setActiveTab(label)}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              flex: '1',
              padding: isActive ? '8px 16px' : '8px 4px',
              border: 'none',
              borderRadius: '40px',
              background: isActive ? 'var(--btn-pink)' : 'transparent',
              color: isActive ? 'var(--white)' : 'var(--text-brown)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              fontSize: '10px',
              lineHeight: 1,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
