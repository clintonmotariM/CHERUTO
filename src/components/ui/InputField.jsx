export default function InputField({ style, ...props }) {
  return (
    <input
      style={{
        width: '100%',
        minHeight: 'var(--touch-target)',
        padding: '8px 0',
        border: 0,
        borderBottom: '1px solid var(--text-brown)',
        borderRadius: 0,
        background: 'transparent',
        color: 'var(--text-brown)',
        fontSize: 'var(--base-font)',
        outline: 'none',
        ...style,
      }}
      {...props}
    />
  )
}
