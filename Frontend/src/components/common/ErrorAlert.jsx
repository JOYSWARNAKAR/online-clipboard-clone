export default function ErrorAlert({ message }) {
  if (!message) return null

  return (
    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
      {message}
    </p>
  )
}
