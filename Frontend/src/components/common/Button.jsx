const variants = {
  primary:
    'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25',
  secondary:
    'border border-slate-600 text-slate-300 hover:bg-slate-800/50',
  ghost: 'text-slate-300 hover:bg-slate-700/50 bg-slate-700',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
