import { QRCodeSVG } from 'qrcode.react'
import { getShareUrl } from '../../utils/url.js'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard.js'
import CopyButton from '../common/CopyButton.jsx'
import Button from '../common/Button.jsx'

export default function ShareResult({ clipboardId, selfDestruct, onNew }) {
  const shareUrl = getShareUrl(clipboardId)
  const { copiedKey, copy } = useCopyToClipboard()

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-emerald-400 text-sm">
        Clipboard created successfully
        {selfDestruct && ' — self-destruct enabled (one view only)'}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Retrieve ID</p>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-mono font-bold tracking-[0.3em] text-indigo-400">
              {clipboardId}
            </span>
            <CopyButton
              label="Copy"
              isCopied={copiedKey === 'id'}
              onCopy={() => copy(clipboardId, 'id')}
              className="ml-auto"
            />
          </div>
        </div>

        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Shareable URL</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-300 truncate flex-1">{shareUrl}</p>
            <CopyButton
              label="Copy"
              isCopied={copiedKey === 'url'}
              onCopy={() => copy(shareUrl, 'url')}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center rounded-xl bg-slate-800/50 border border-slate-700/50 p-6">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">Scan QR Code</p>
        <div className="bg-white p-3 rounded-xl">
          <QRCodeSVG value={shareUrl} size={160} level="M" />
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Open this link on another device to retrieve the clipboard
        </p>
      </div>

      <Button variant="secondary" className="w-full py-2.5 text-sm" onClick={onNew}>
        Create another clipboard
      </Button>
    </div>
  )
}
