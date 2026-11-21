export default function ExitButton({ children = '×', style, ...props }) {
  return (
    <button
      type="button"
      aria-label="Exit"
      style={{
        position: 'fixed',
        top: 'max(var(--safe-top), 16px)',
        right: '16px',
        zIndex: 100,
        width: 'var(--touch-target)',
        height: 'var(--touch-target)',
        minWidth: 'var(--touch-target)',
        minHeight: 'var(--touch-target)',
        border: 0,
        borderRadius: '50%',
        background: 'var(--overlay-brown)',
        color: 'var(--white)',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
