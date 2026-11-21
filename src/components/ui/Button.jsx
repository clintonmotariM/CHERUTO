export default function Button({ children, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`lively-button ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
