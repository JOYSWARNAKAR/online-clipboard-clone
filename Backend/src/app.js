import express from 'express'
import cors from 'cors'
import { config } from './config/index.js'
import healthRoutes from './routes/healthRoutes.js'
import clipboardRoutes from './routes/clipboardRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

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

  app.use(errorHandler)

  return app
}
