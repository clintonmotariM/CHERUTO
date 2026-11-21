import { useState } from 'react'
import Navigation from './components/layout/Navigation'
import ExitButton from './components/ui/ExitButton'
import Button from './components/ui/Button'
import SplashScreen from './components/SplashScreen'
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
    return <SplashScreen onEnter={enterMemorial} />
  }

  return (
    <div className="app-shell edge-to-edge">
      <ExitButton />

      <main className="quiet-gallery safe-top" id="main-content">
        <header className="gallery-header">
          <p className="gallery-eyebrow">{section.eyebrow}</p>
          <h1>{section.title}</h1>
        </header>

        <section className="gallery-section" aria-live="polite">
          <p>Content will appear here.</p>
          <Button onClick={() => setActiveItem('Guestbook')}>Share a memory</Button>
        </section>
      </main>

      <Navigation activeItem={activeItem} onNavigate={setActiveItem} />
    </div>
  )
}
