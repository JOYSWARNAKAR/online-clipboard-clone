export const config = {
  port: Number(process.env.PORT) || 3001,
  corsOrigin:
    process.env.CORS_ORIGIN ||
    process.env.RENDER_EXTERNAL_URL ||
    'http://localhost:5173',
  maxContentLength: Number(process.env.MAX_CONTENT_LENGTH) || 50000,
  clipboardTtlMs: Number(process.env.CLIPBOARD_TTL_MS) || 24 * 60 * 60 * 1000,
  cleanupIntervalMs: Number(process.env.CLEANUP_INTERVAL_MS) || 60 * 60 * 1000,
}
