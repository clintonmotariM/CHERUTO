export default function SplashScreen({ onEnter }) {
  return (
    <button
      type="button"
      className="splash-screen"
      onClick={onEnter}
      aria-label="Enter the Cherono memorial"
    >
      <span className="splash-kicker">Cherono</span>
      <span className="splash-prompt">Tap anywhere to enter the memorial.</span>
    </button>
  )
}
