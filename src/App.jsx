import { useState } from 'react'
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
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div style={{ height: '100dvh', backgroundColor: 'var(--bg-cream)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <main style={{ flex: 1, width: '100%', maxWidth: '600px', margin: '0 auto', overflowY: 'auto', padding: '32px 24px 128px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <header style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(3rem, 14vw, 4.5rem)', lineHeight: 1 }}>Cherono</h1>
          <p style={{ marginTop: '10px', color: 'var(--text-brown)' }}>A lively celebration of life</p>
        </header>
        {pages[activeTab]}
      </main>

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  )
}
