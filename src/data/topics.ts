import type { Topic } from '../types'

export const TOPICS: (Topic & { color: string })[] = [
  { id: 'general', label: '🌍 Geopolítica', category: 'general', color: '#8B5CF6' },
  { id: 'business', label: '📊 Negocios', category: 'business', color: '#10B981' },
  { id: 'tech', label: '💻 Tecnología', category: 'tech', color: '#3B82F6' },
  { id: 'science', label: '🔬 Ciencia', category: 'science', color: '#EC4899' },
  { id: 'sports', label: '⚽ Deportes', category: 'sports', color: '#14B8A6' },
  { id: 'entertainment', label: '🎬 Cultura', category: 'entertainment', color: '#F59E0B' },
  { id: 'health', label: '❤️ Salud', category: 'health', color: '#EF4444' },
  { id: 'climate', label: '🌊 Clima', category: 'climate', color: '#06B6D4' },
]
