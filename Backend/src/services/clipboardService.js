import { config } from '../config/index.js'
import { clipboardStore } from '../store/clipboardStore.js'
import { generateClipboardId } from '../utils/idGenerator.js'
import { NotFoundError, ValidationError } from '../utils/errors.js'

function validateContent(content) {
  if (typeof content !== 'string') {
    throw new ValidationError('Content must be a string')
  }
  if (content.length > config.maxContentLength) {
    throw new ValidationError(`Content exceeds ${config.maxContentLength} characters`)
  }
}

export const clipboardService = {
  create({ content = '', selfDestruct = false }) {
    validateContent(content)

    const id = generateClipboardId(clipboardStore)
    const now = Date.now()

    clipboardStore.set(id, {
      content,
      selfDestruct: Boolean(selfDestruct),
      createdAt: now,
      updatedAt: now,
    })

    return { id, selfDestruct: Boolean(selfDestruct) }
  },

  getById(id, { consumeSelfDestruct = true } = {}) {
    const clip = clipboardStore.get(id)
    if (!clip) {
      throw new NotFoundError('Clipboard not found or expired')
    }

    const response = {
      id,
      content: clip.content,
      selfDestruct: clip.selfDestruct,
      updatedAt: clip.updatedAt,
    }

    if (consumeSelfDestruct && clip.selfDestruct) {
      clipboardStore.delete(id)
    }

    return response
  },

  update(id, content) {
    validateContent(content)

    const clip = clipboardStore.get(id)
    if (!clip) {
      throw new NotFoundError('Clipboard not found or expired')
    }

    clip.content = content
    clip.updatedAt = Date.now()

    return { id, content: clip.content, updatedAt: clip.updatedAt }
  },

  cleanupExpired() {
    const now = Date.now()
    for (const [id, clip] of clipboardStore.getAllEntries()) {
      if (now - clip.createdAt > config.clipboardTtlMs) {
        clipboardStore.delete(id)
      }
    }
  },
}
