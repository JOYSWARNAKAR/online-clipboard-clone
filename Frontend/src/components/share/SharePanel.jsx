import { useState } from 'react'
import { clipboardApi } from '../../api/clipboardApi.js'
import { useClipboardSync } from '../../hooks/useClipboardSync.js'
import TextArea from '../common/TextArea.jsx'
import Button from '../common/Button.jsx'
import ErrorAlert from '../common/ErrorAlert.jsx'
import SelfDestructToggle from '../common/SelfDestructToggle.jsx'
import LiveSyncBadge from '../common/LiveSyncBadge.jsx'
import ShareResult from './ShareResult.jsx'

export default function SharePanel() {
  const [content, setContent] = useState('')
  const [selfDestruct, setSelfDestruct] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const { onContentChange } = useClipboardSync(result?.id, setContent, Boolean(result?.id))

  const handleSend = async () => {
    if (!content.trim()) {
      setError('Please enter some text to share')
      return
    }
    setError('')
    setLoading(true)
    try {
      const data = await clipboardApi.create(content, selfDestruct)
      setResult({ id: data.id, selfDestruct: data.selfDestruct })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleNew = () => {
    setResult(null)
    setContent('')
    setSelfDestruct(false)
    setError('')
  }

  if (result) {
    return (
      <div className="space-y-4">
        <TextArea
          value={content}
          onChange={(e) => onContentChange(e.target.value, setContent)}
          placeholder="Live sync enabled — edits update for all viewers"
          minHeight="140px"
        />
        <LiveSyncBadge />
        <ShareResult
          clipboardId={result.id}
          selfDestruct={result.selfDestruct}
          onNew={handleNew}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type or paste text here..."
        showCount
      />

      <SelfDestructToggle checked={selfDestruct} onChange={setSelfDestruct} />
      <ErrorAlert message={error} />

      <Button
        className="w-full py-3 font-semibold"
        disabled={loading}
        onClick={handleSend}
      >
        {loading ? 'Sending...' : 'Send to Online Clipboard'}
      </Button>
    </div>
  )
}
