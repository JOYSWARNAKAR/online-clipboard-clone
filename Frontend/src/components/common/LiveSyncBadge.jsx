export default function LiveSyncBadge() {
  return (
    <p className="text-xs text-indigo-400/80 flex items-center gap-1.5">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
      Live sync active
    </p>
  )
}
