export default function Button({ children, style, type = 'button', ...props }) {
  return (
    <button
      type={type}
      style={{
        minHeight: 'var(--touch-target)',
        minWidth: 'var(--touch-target)',
        padding: '12px 18px',
        border: 0,
        borderRadius: '8px',
        background: 'var(--btn-pink)',
        color: 'var(--white)',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
