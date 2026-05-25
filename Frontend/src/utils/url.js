export function getShareUrl(clipboardId) {
  const base = `${window.location.origin}${window.location.pathname}`
  return `${base}?id=${clipboardId}`
}

export function getWsUrl(roomId) {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${protocol}//${window.location.host}/ws?room=${roomId}`
}

export function getClipboardIdFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('id')?.trim() ?? ''
}
