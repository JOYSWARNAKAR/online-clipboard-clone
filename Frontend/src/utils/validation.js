import { CLIPBOARD_ID_PATTERN } from '../constants/clipboard.js'

export function isValidClipboardId(id) {
  return CLIPBOARD_ID_PATTERN.test(String(id).trim())
}

export function normalizeClipboardId(id) {
  return String(id).trim()
}
