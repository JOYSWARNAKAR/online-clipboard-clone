import { getClipboardIdFromUrl } from '../utils/url.js'
import { isValidClipboardId } from '../utils/validation.js'
import { TABS } from '../constants/clipboard.js'

export function useClipboardUrl() {
  const id = getClipboardIdFromUrl()
  const hasValidId = isValidClipboardId(id)

  return {
    initialTab: hasValidId ? TABS.RETRIEVE : TABS.SHARE,
    initialId: hasValidId ? id : '',
  }
}
