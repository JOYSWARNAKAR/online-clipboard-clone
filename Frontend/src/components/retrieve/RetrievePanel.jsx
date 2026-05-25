import { useCallback, useEffect, useState } from 'react'
import { clipboardApi } from '../../api/clipboardApi.js'
import { useClipboardSync } from '../../hooks/useClipboardSync.js'
import { isValidClipboardId, normalizeClipboardId } from '../../utils/validation.js'
import TextArea from '../common/TextArea.jsx'
import Button from '../common/Button.jsx'
import ErrorAlert from '../common/ErrorAlert.jsx'
import LiveSyncBadge from '../common/LiveSyncBadge.jsx'

export default function RetrievePanel({ initialId = '' }) {
  const [pin, setPin] = useState(initialId)
  const [content, setContent] = useState('')
  const [clipboardId, setClipboardId] = useState(null)
  const [selfDestruct, setSelfDestruct] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { onContentChange } = useClipboardSync(clipboardId, setContent, Boolean(clipboardId))

  const fetchClipboard = useCallback(async (id) => {
    const normalized = normalizeClipboardId(id)
    if (!isValidClipboardId(normalized)) {
      setError('Enter a valid 6-digit clipboard ID')
      return
    }

    setError('')
    setLoading(true)
    try {
      const data = await clipboardApi.getById(normalized)
      setContent(data.content)
      setSelfDestruct(data.selfDestruct)
      setClipboardId(data.selfDestruct ? null : data.id)
    } catch (err) {
      setError(err.message)
      setContent('')
      setClipboardId(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialId && isValidClipboardId(initialId)) {
      fetchClipboard(initialId)
    }
  }, [initialId, fetchClipboard])

  const handleRetrieve = () => fetchClipboard(pin)

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setPin(value)
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="retrieve-pin" className="block text-sm text-slate-400 mb-2">
          Enter 6-digit Retrieve ID
        </label>
        <input
          id="retrieve-pin"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={handlePinChange}
          placeholder="000000"
          className="w-full rounded-xl bg-slate-900/80 border border-slate-700/50 px-4 py-3 text-2xl font-mono tracking-[0.4em] text-center text-indigo-400 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
      </div>

      <ErrorAlert message={error} />

      <Button className="w-full py-3 font-semibold" disabled={loading} onClick={handleRetrieve}>
        {loading ? 'Retrieving...' : 'Retrieve Clipboard'}
      </Button>

      {content !== '' && (
        <div className="space-y-3 pt-2">
          {selfDestruct && (
            <p className="text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
              This was a self-destruct clipboard — it has been deleted after this view.
            </p>
          )}
          {clipboardId && <LiveSyncBadge />}
          <TextArea
            value={content}
            onChange={(e) =>
              clipboardId
                ? onContentChange(e.target.value, setContent)
                : setContent(e.target.value)
            }
            placeholder="Retrieved content"
            minHeight="200px"
            readOnly={!clipboardId}
          />
        </div>
      )}
    </div>
  )
}
