const icons = {
  Home: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5M9.5 20v-6h5v6"/></svg>
  ),
  Story: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h16v13H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>
  ),
  Guestbook: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
  ),
  Details: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>
  ),
}

export default function Navigation({ activeItem = 'Home', onNavigate }) {
  const items = ['Home', 'Story', 'Guestbook', 'Details']

  return (
    <nav className="bottom-navigation safe-bottom" aria-label="Primary navigation">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={`navigation-item${activeItem === item ? ' is-active' : ''}`}
          aria-current={activeItem === item ? 'page' : undefined}
          onClick={() => onNavigate?.(item)}
        >
          <span className="navigation-icon">{icons[item]}</span>
          <span>{item}</span>
        </button>
      ))}
    </nav>
  )
}
