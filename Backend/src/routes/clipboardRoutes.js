import { Router } from 'express'
import { clipboardController } from '../controllers/clipboardController.js'
import { validateClipboardId } from '../middleware/validateClipboardId.js'
import { asyncHandler } from '../middleware/errorHandler.js'

const router = Router()

router.post('/clipboard', asyncHandler(clipboardController.create))
router.get(
  '/clipboard/:id',
  validateClipboardId,
  asyncHandler(clipboardController.getById)
)
router.patch(
  '/clipboard/:id',
  validateClipboardId,
  asyncHandler(clipboardController.update)
)

export default router
