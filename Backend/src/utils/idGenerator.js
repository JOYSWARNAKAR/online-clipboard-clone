import { randomInt } from 'crypto'
import { CLIPBOARD_ID_MIN, CLIPBOARD_ID_MAX } from '../constants/clipboard.js'

export function generateClipboardId(existingIds) {
  let id
  do {
    id = String(randomInt(CLIPBOARD_ID_MIN, CLIPBOARD_ID_MAX + 1))
  } while (existingIds.has(id))
  return id
}
