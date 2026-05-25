import { useCallback, useEffect, useRef } from 'react'
import { clipboardApi } from '../api/clipboardApi.js'
import { getWsUrl } from '../utils/url.js'

const DEBOUNCE_MS = 400

export function useClipboardSync(clipboardId, setContent, enabled = true) {
  const wsRef = useRef(null)
  const debounceRef = useRef(null)
  const isRemoteUpdate = useRef(false)

  useEffect(() => {
    if (!enabled || !clipboardId) return

    const ws = new WebSocket(getWsUrl(clipboardId))
    wsRef.current = ws

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if ((msg.type === 'sync' || msg.type === 'update') && typeof msg.content === 'string') {
          isRemoteUpdate.current = true
          setContent(msg.content)
        }
      } catch {
        /* ignore malformed messages */
      }
    }

    return () => {
      ws.close()
      wsRef.current = null
    }
  }, [clipboardId, enabled, setContent])

  const pushUpdate = useCallback(
    (newContent) => {
      if (!clipboardId || !enabled) return

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'update', content: newContent }))
      }

      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        clipboardApi.update(clipboardId, newContent).catch(() => {})
      }, DEBOUNCE_MS)
    },
    [clipboardId, enabled]
  )

  const onContentChange = useCallback(
    (newContent, setLocalContent) => {
      setLocalContent(newContent)
      if (isRemoteUpdate.current) {
        isRemoteUpdate.current = false
        return
      }
      pushUpdate(newContent)
    },
    [pushUpdate]
  )

  return { onContentChange }
}
