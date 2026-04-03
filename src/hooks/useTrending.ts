import { TOPICS } from '../data/topics'
import type { Topic } from '../types'

export function useTrending(): { topics: Topic[]; loading: boolean } {
  return { topics: TOPICS, loading: false }
}
