import { useState } from 'react'
import useImmersiveMode from './hooks/useImmersiveMode'
import SplashScreen from './components/SplashScreen'
import BottomNav from './components/layout/BottomNav'
import HomePage from './pages/HomePage'
import StoryPage from './pages/StoryPage'
import GatheringPage from './pages/GatheringPage'
import HerHomePage from './pages/HerHomePage'
import TimelinePage from './pages/TimelinePage'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const { enterFullscreen } = useImmersiveMode(true)

  const pages = {
    home: <HomePage />,
    story: <StoryPage />,
    legacy: <TimelinePage />,
    gathering: <GatheringPage />,
    residence: <HerHomePage onNavigateHome={() => setActiveTab('home')} />,
  }

  const handleExit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {})
    }
    setEntered(false)
  }

  if (!entered) {
    return (
      <SplashScreen
        onEnter={() => {
          enterFullscreen()
          setEntered(true)
        }}
      />
    )
  }

  return (
    <div style={{ height: '100dvh', backgroundColor: 'var(--bg-cream)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <main
        className="no-scrollbar"
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          overflowY: 'auto',
          paddingTop: 'var(--safe-top)',
          paddingRight: '18px',
          paddingLeft: '18px',
          paddingBottom: 'calc(var(--nav-height) + var(--safe-bottom) + 32px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {pages[activeTab]}
      </main>

      <BottomNav activeTab={activeTab} onChange={setActiveTab} onExit={handleExit} />
    </div>
  )
}
