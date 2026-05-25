import { createServer } from 'http'
import { createApp } from './app.js'
import { config } from './config/index.js'
import { clipboardService } from './services/clipboardService.js'
import { attachClipboardSocket } from './websocket/clipboardSocket.js'

const app = createApp()
const httpServer = createServer(app)

attachClipboardSocket(httpServer)

setInterval(() => clipboardService.cleanupExpired(), config.cleanupIntervalMs)

httpServer.listen(config.port, () => {
  console.log(`Backend running at http://localhost:${config.port}`)
})
