export default function Header() {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center gap-2 mb-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 text-lg">
          📋
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Online Clipboard
        </h1>
      </div>
      <p className="text-slate-400 text-sm max-w-md mx-auto">
        Copy and paste text between devices with live sync. Share with a 6-digit PIN or link.
      </p>
    </header>
  )
}
