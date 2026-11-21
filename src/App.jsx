import { useState } from 'react'
import Navigation from './components/layout/Navigation'
import ExitButton from './components/ui/ExitButton'
import Button from './components/ui/Button'
import BottomNav from './components/layout/BottomNav'
import useImmersiveMode from './hooks/useImmersiveMode'

const sections = {
  Home: {
    eyebrow: 'In loving memory',
    title: 'A lively celebration of life',
  },
  Story: {
    eyebrow: 'The life remembered',
    title: 'Stories and shared moments',
  },
  Guestbook: {
    eyebrow: 'With gratitude',
    title: 'Leave a memory',
  },
  Details: {
    eyebrow: 'Gathering together',
    title: 'Service details',
  },
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')
  const { enterFullscreen } = useImmersiveMode(true)
  const section = sections[activeItem]

  const enterMemorial = async () => {
    await enterFullscreen()
    setEntered(true)
  }

  if (!entered) {
    return null
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
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
          overflowY: 'auto',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '24px',
          paddingBottom: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '3rem',
            marginTop: '40px',
          }}
        >
          Cherono
        </h1>
        <p style={{ marginTop: '16px', color: 'var(--text-brown)' }}>
          A lively celebration of life.
        </p>

        <section className="gallery-section" aria-live="polite">
          <p>Content will appear here.</p>
          <Button onClick={() => setActiveItem('Guestbook')}>Share a memory</Button>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
