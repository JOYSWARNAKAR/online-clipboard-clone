import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from './config/index.js'
import healthRoutes from './routes/healthRoutes.js'
import clipboardRoutes from './routes/clipboardRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frontendDist = path.join(__dirname, '../../Frontend/dist')

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: config.corsOrigin,
    })
  )
  app.use(express.json({ limit: '100kb' }))

  app.use('/api', healthRoutes)
  app.use('/api', clipboardRoutes)

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(frontendDist))
    app.get(/^(?!\/api).*/, (_req, res) => {
      res.sendFile(path.join(frontendDist, 'index.html'))
    })
  }

  app.use(errorHandler)

  return app
}
