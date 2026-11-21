export default function PolaroidFrame({ children, style, ...props }) {
  return (
    <figure
      style={{
        margin: 0,
        padding: '10px',
        background: 'var(--white)',
        boxShadow: '0 10px 24px rgba(93, 64, 55, 0.16)',
        transform: 'rotate(-2deg)',
        ...style,
      }}
      {...props}
    >
      {children}
    </figure>
  )
}
