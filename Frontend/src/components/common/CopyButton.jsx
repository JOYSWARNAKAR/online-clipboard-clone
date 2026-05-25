import Button from './Button.jsx'

export default function CopyButton({ label, copiedLabel = 'Copied!', isCopied, onCopy }) {
  return (
    <Button variant="ghost" className="text-xs px-3 py-1.5 shrink-0" onClick={onCopy}>
      {isCopied ? copiedLabel : label}
    </Button>
  )
}
