import { TOPICS } from '../data/topics'
import type { Topic } from '../types'

interface UseTrendingProps {
  country: string
}

export function useTrending(_props: UseTrendingProps): { topics: Topic[]; loading: boolean } {
  return { topics: TOPICS, loading: false }
}
