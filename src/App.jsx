import { useState } from 'react'
import Navigation from './components/layout/Navigation'
import ExitButton from './components/ui/ExitButton'

const sections = {
  Home: {
    eyebrow: 'In loving memory',
    title: 'A quiet place to remember',
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
  const [activeItem, setActiveItem] = useState('Home')
  const section = sections[activeItem]

  return (
    <div className="app-shell">
      <ExitButton />

      <main className="quiet-gallery safe-top" id="main-content">
        <header className="gallery-header">
          <p className="gallery-eyebrow">{section.eyebrow}</p>
          <h1>{section.title}</h1>
        </header>

        <section className="gallery-section" aria-live="polite">
          <p>Content will appear here.</p>
        </section>
      </main>

      <Navigation activeItem={activeItem} onNavigate={setActiveItem} />
    </div>
  )
}
