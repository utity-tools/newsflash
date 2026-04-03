import { vi } from 'vitest'
import '@testing-library/jest-dom'

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: [], meta: { found: 0, returned: 0, limit: 10, page: 1 } })
})
