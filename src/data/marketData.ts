export interface Ticker {
  label: string
  symbol: string
  value: number
  change: number
  changePct: number
  sparkline: number[]
}

export const MARKET_TICKERS: Ticker[] = [
  {
    label: 'S&P 500',
    symbol: 'SPX',
    value: 5204.34,
    change: -12.58,
    changePct: -0.24,
    sparkline: [5230, 5218, 5225, 5210, 5220, 5215, 5208, 5204],
  },
  {
    label: 'BTC/USD',
    symbol: 'BTC',
    value: 68432.10,
    change: 4421.5,
    changePct: 6.65,
    sparkline: [63100, 64200, 63800, 65000, 66200, 67100, 67800, 68432],
  },
]

export const CRYPTO_PULSE_ITEMS = [
  {
    id: 'cp1',
    badge: 'LIVE ALERT',
    time: '3 MINS AGO',
    title: 'Bitcoin reclaims $68k as Whale shows massive movement from exchanges.',
    image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=120&q=80',
  },
  {
    id: 'cp2',
    badge: 'UPDATE',
    time: '18 MINS AGO',
    title: "Ethereum's Dencun upgrade results in significant gas fee reduction for L2s.",
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=120&q=80',
  },
]
