interface SparklineProps {
  data: number[]
  positive: boolean
  width?: number
  height?: number
}

export function Sparkline({ data, positive, width = 80, height = 32 }: SparklineProps) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  })

  const color = positive ? '#4ade80' : '#ff716c'
  const fillId = `fill-${positive ? 'pos' : 'neg'}`

  const pathD = `M ${points.join(' L ')}`
  const fillD = `${pathD} L ${width},${height} L 0,${height} Z`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#${fillId})`} />
      <path d={pathD} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
