import { httpClient } from './httpClient.js'

export const clipboardApi = {
  create(content, selfDestruct) {
    return httpClient('/clipboard', {
      method: 'POST',
      body: JSON.stringify({ content, selfDestruct }),
    })
  },

  getById(id) {
    return httpClient(`/clipboard/${id}`)
  },

  update(id, content) {
    return httpClient(`/clipboard/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  },
}
