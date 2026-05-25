import { clipboardService } from '../services/clipboardService.js'
import { roomService } from '../services/roomService.js'

export const clipboardController = {
  create(req, res) {
    const { content, selfDestruct } = req.body ?? {}
    const result = clipboardService.create({ content, selfDestruct })
    res.status(201).json(result)
  },

  getById(req, res) {
    const result = clipboardService.getById(req.params.id)
    if (result.selfDestruct) {
      roomService.removeRoom(req.params.id)
    }
    res.json(result)
  },

  update(req, res) {
    const { content } = req.body ?? {}
    const result = clipboardService.update(req.params.id, content)
    roomService.broadcast(req.params.id, {
      type: 'update',
      content: result.content,
      updatedAt: result.updatedAt,
    })
    res.json({ id: result.id, updatedAt: result.updatedAt })
  },
}
