import { useState } from 'react'
import useImmersiveMode from './hooks/useImmersiveMode'
import SplashScreen from './components/SplashScreen'
import ExitButton from './components/ui/ExitButton'
import BottomNav from './components/layout/BottomNav'
import HomePage from './pages/HomePage'
import StoryPage from './pages/StoryPage'
import LegacyPage from './pages/LegacyPage'
import GatheringPage from './pages/GatheringPage'
import HerHomePage from './pages/HerHomePage'

const pages = {
  home: <HomePage />,
  story: <StoryPage />,
  legacy: <LegacyPage />,
  gathering: <GatheringPage />,
  residence: <HerHomePage />,
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const { enterFullscreen } = useImmersiveMode(true)

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
    <div
      style={{
        height: '100dvh',
        backgroundColor: 'var(--bg-cream)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <ExitButton />

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          overflowY: 'auto',
          padding: '32px 24px calc(var(--nav-height) + var(--safe-bottom) + 72px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <header className="safe-top" style={{ marginBottom: '28px', width: '100%' }}>
          <h1 style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(3rem, 14vw, 4.5rem)', lineHeight: 1 }}>
            Cherono
          </h1>
          <p style={{ marginTop: '10px', color: 'var(--text-brown)' }}>
            A lively celebration of life
          </p>
        </header>

        {pages[activeTab]}
      </main>

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  )
}
