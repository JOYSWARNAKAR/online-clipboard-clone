/** @type {Map<string, Set<import('ws').WebSocket>>} */
const rooms = new Map()

export const roomService = {
  join(roomId, ws) {
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set())
    }
    rooms.get(roomId).add(ws)
    ws.roomId = roomId
  },

  leave(ws) {
    if (!ws.roomId) return

    const clients = rooms.get(ws.roomId)
    if (clients) {
      clients.delete(ws)
      if (clients.size === 0) {
        rooms.delete(ws.roomId)
      }
    }
    ws.roomId = undefined
  },

  removeRoom(roomId) {
    rooms.delete(roomId)
  },

  broadcast(roomId, message, exclude) {
    const clients = rooms.get(roomId)
    if (!clients) return

    const payload = JSON.stringify(message)
    for (const client of clients) {
      if (client !== exclude && client.readyState === 1) {
        client.send(payload)
      }
    }
  },
}
