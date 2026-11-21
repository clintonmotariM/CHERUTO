export default function QuoteCard({ children, style, ...props }) {
  return (
    <blockquote
      style={{
        margin: 0,
        padding: '16px',
        background: 'var(--white)',
        borderLeft: '4px solid var(--accent-purple)',
        ...style,
      }}
      {...props}
    >
      {children}
    </blockquote>
  )
}
