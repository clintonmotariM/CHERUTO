export default function OutlineButton({ children, style, ...props }) {
  return (
    <button
      type="button"
      style={{
        minHeight: 'var(--touch-target)',
        minWidth: 'var(--touch-target)',
        padding: '12px 18px',
        border: '1px solid var(--btn-pink)',
        borderRadius: '8px',
        background: 'transparent',
        color: 'var(--btn-pink)',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
