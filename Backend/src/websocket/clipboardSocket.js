import { WebSocketServer } from 'ws'
import { CLIPBOARD_ID_PATTERN } from '../constants/clipboard.js'
import { config } from '../config/index.js'
import { clipboardService } from '../services/clipboardService.js'
import { roomService } from '../services/roomService.js'

export function attachClipboardSocket(httpServer) {
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' })

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url ?? '', `http://${req.headers.host}`)
    const roomId = url.searchParams.get('room')

    if (!roomId || !CLIPBOARD_ID_PATTERN.test(roomId)) {
      ws.close(1008, 'Invalid room')
      return
    }

    roomService.join(roomId, ws)

    try {
      const clip = clipboardService.getById(roomId, { consumeSelfDestruct: false })
      ws.send(
        JSON.stringify({
          type: 'sync',
          content: clip.content,
          updatedAt: clip.updatedAt,
        })
      )
    } catch {
      /* room may exist before first fetch */
    }

    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString())
        if (msg.type !== 'update' || typeof msg.content !== 'string') return
        if (msg.content.length > config.maxContentLength) return

        const result = clipboardService.update(roomId, msg.content)
        roomService.broadcast(
          roomId,
          { type: 'update', content: result.content, updatedAt: result.updatedAt },
          ws
        )
      } catch {
        /* ignore malformed or missing clipboard */
      }
    })

    ws.on('close', () => roomService.leave(ws))
  })

  return wss
}
