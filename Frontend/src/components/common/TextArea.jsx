export default function TextArea({
  value,
  onChange,
  placeholder,
  minHeight = '200px',
  showCount = false,
  className = '',
  ...props
}) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ minHeight }}
        className={`w-full rounded-xl bg-slate-900/80 border border-slate-700/50 px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y ${className}`}
        {...props}
      />
      {showCount && (
        <span className="absolute bottom-3 right-3 text-xs text-slate-500">
          {value.length} characters
        </span>
      )}
    </div>
  )
}
