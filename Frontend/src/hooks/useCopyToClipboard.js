import { useCallback, useState } from 'react'

export function useCopyToClipboard(resetMs = 2000) {
  const [copiedKey, setCopiedKey] = useState(null)

  const copy = useCallback(
    async (text, key) => {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), resetMs)
    },
    [resetMs]
  )

  return { copiedKey, copy }
}
