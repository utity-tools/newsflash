import { vi } from 'vitest'
import '@testing-library/jest-dom'

const mockGeolocation = {
  getCurrentPosition: vi.fn().mockImplementation((success) => {
    success({
      coords: {
        latitude: 40.4168,
        longitude: -3.7038,
        accuracy: 1,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    })
  }),
  watchPosition: vi.fn(),
  clearWatch: vi.fn()
}

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  configurable: true,
  writable: true
})

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: [], meta: { found: 0, returned: 0, limit: 10, page: 1 } })
})
