/** @type {Map<string, import('../types/clipboard.js').ClipboardRecord>} */
const clipboards = new Map()

export const clipboardStore = {
  get(id) {
    return clipboards.get(id) ?? null
  },

  set(id, record) {
    clipboards.set(id, record)
    return record
  },

  delete(id) {
    return clipboards.delete(id)
  },

  has(id) {
    return clipboards.has(id)
  },

  getAllEntries() {
    return clipboards.entries()
  },
}
