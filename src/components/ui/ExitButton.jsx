export default function ExitButton({ onExit }) {
  const handleExit = () => {
    if (typeof onExit === 'function') {
      onExit()
      return
    }

    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else if (window.history.length > 1) {
      window.history.back()
    }
  }

  return (
    <button
      type="button"
      className="exit-button"
      aria-label="Exit fullscreen memorial"
      title="Exit"
      style={{ position: 'fixed', top: 'max(var(--safe-top), 16px)', right: '16px', zIndex: 100 }}
      onClick={handleExit}
    >
      <span aria-hidden="true">×</span>
    </button>
  )
}
