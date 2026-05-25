import { CLIPBOARD_ID_PATTERN } from '../constants/clipboard.js'
import { ValidationError } from '../utils/errors.js'

export function validateClipboardId(req, _res, next) {
  const id = req.params.id
  if (!CLIPBOARD_ID_PATTERN.test(id)) {
    return next(new ValidationError('Invalid clipboard ID'))
  }
  next()
}
