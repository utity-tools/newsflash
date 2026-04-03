import { describe, it, expect } from 'vitest'
import { DEFAULT_COUNTRY } from '../data/countries'
import { TOPICS } from '../data/topics'

describe('App data', () => {
  it('DEFAULT_COUNTRY is Spain', () => {
    expect(DEFAULT_COUNTRY.code).toBe('es')
  })

  it('TOPICS has 6 items', () => {
    expect(TOPICS.length).toBe(6)
  })
})
