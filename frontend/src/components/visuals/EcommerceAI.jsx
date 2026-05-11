export default function EcommerceAI({ className = '' }) {
  const PRODUCTS = [
    { label: 'Running Pro X', price: '$129', score: 97, color: '#7C3AED', tag: 'Top Pick' },
    { label: 'Urban Sneaker', price: '$89',  score: 84, color: '#3B82F6', tag: 'Trending' },
    { label: 'Trail Blazer',  price: '$149', score: 91, color: '#06B6D4', tag: 'New' },
    { label: 'Classic Runner', price: '$74', score: 78, color: '#A78BFA', tag: 'Popular' },
  ]

  const FUNNEL = [
    { label: 'Impressions',  value: '124k', pct: 100, color: '#7C3AED' },
    { label: 'Clicks',       value: '38.4k', pct: 72,  color: '#3B82F6' },
    { label: 'Add to Cart',  value: '12.1k', pct: 48,  color: '#06B6D4' },
    { label: 'Conversions',  value: '6.8k',  pct: 28,  color: '#22D3EE' },
  ]

  const SPARKLINE = [38, 45, 42, 55, 50, 62, 58, 71, 65, 80, 74, 88]
  const minS = Math.min(...SPARKLINE), maxS = Math.max(...SPARKLINE)
  const sparkPts = SPARKLINE.map((v, i) => {
    const x = 2 + (i / (SPARKLINE.length - 1)) * 96
    const y = 28 - ((v - minS) / (maxS - minS)) * 24
    return `${x},${y}`
  }).join(' ')

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg,#060A12 0%,#080D18 100%)', aspectRatio: '16/9' }}
    >
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="ec-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ec-grid)" />
      </svg>

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── Left: AI Recommendation Panel ── */}
        <rect x="2%" y="4%" width="45%" height="92%" rx="2"
          fill="rgba(0,0,0,0.45)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.3" />
        <text x="24.5%" y="10%" textAnchor="middle" fontSize="2.4"
          fill="#A78BFA" fontFamily="Inter,sans-serif" fontWeight="700">AI RECOMMENDATIONS</text>
        <line x1="4%" y1="12.5%" x2="45.5%" y2="12.5%" stroke="rgba(124,58,237,0.15)" strokeWidth="0.3" />

        {PRODUCTS.map((p, i) => (
          <g key={p.label}>
            {/* Card */}
            <rect x="4%" y={`${16 + i * 19}%`} width="41%" height="16%" rx="1.5"
              fill={i === 0 ? `${p.color}10` : 'rgba(255,255,255,0.02)'}
              stroke={i === 0 ? `${p.color}40` : 'rgba(255,255,255,0.05)'} strokeWidth="0.3" />

            {/* Color swatch */}
            <rect x="5.5%" y={`${18.5 + i * 19}%`} width="5%" height="9%" rx="1"
              fill={p.color} fillOpacity="0.18" stroke={p.color} strokeWidth="0.25" strokeOpacity="0.4" />
            <circle cx="8%" cy={`${23 + i * 19}%`} r="1.5" fill={p.color} fillOpacity="0.7" />

            {/* Info */}
            <text x="12%" y={`${20.5 + i * 19}%`} fontSize="2.1"
              fill="rgba(255,255,255,0.75)" fontFamily="Inter,sans-serif" fontWeight="600">{p.label}</text>
            <text x="12%" y={`${24 + i * 19}%`} fontSize="1.8"
              fill="rgba(255,255,255,0.35)" fontFamily="Inter,sans-serif">{p.price}</text>

            {/* Tag */}
            <rect x="29%" y={`${17.5 + i * 19}%`} width="8%" height="4%" rx="1"
              fill={p.color} fillOpacity="0.15" stroke={p.color} strokeWidth="0.2" strokeOpacity="0.5" />
            <text x="33%" y={`${20.3 + i * 19}%`} textAnchor="middle" fontSize="1.6"
              fill={p.color} fontFamily="Inter,sans-serif" fontWeight="600">{p.tag}</text>

            {/* Score bar */}
            <text x="38.5%" y={`${20.5 + i * 19}%`} textAnchor="end" fontSize="1.7"
              fill="rgba(255,255,255,0.3)" fontFamily="Inter,sans-serif">Match</text>
            <rect x="39%" y={`${22 + i * 19}%`} width="5%" height="1.5%" rx="0.75"
              fill="rgba(255,255,255,0.06)" />
            <rect x="39%" y={`${22 + i * 19}%`} width={`${p.score * 0.05}%`} height="1.5%" rx="0.75"
              fill={p.color} fillOpacity="0.8" />
            <text x="44.5%" y={`${23.3 + i * 19}%`} fontSize="1.6"
              fill={p.color} fontFamily="Inter,sans-serif" fontWeight="700">{p.score}%</text>
          </g>
        ))}

        {/* ── Right top: Revenue sparkline ── */}
        <rect x="48%" y="4%" width="50%" height="34%" rx="2"
          fill="rgba(0,0,0,0.45)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.3" />
        <text x="73%" y="9.5%" textAnchor="middle" fontSize="2.2"
          fill="#3B82F6" fontFamily="Inter,sans-serif" fontWeight="700">REVENUE TREND</text>
        <line x1="50%" y1="12%" x2="96.5%" y2="12%" stroke="rgba(59,130,246,0.12)" strokeWidth="0.3" />

        {/* Sparkline chart */}
        <polyline
          points={SPARKLINE.map((v, i) => {
            const x = 50 + 2 + (i / (SPARKLINE.length - 1)) * 45
            const y = 16 + 18 - ((v - minS) / (maxS - minS)) * 14
            return `${x},${y}`
          }).join(' ')}
          fill="none" stroke="#3B82F6" strokeWidth="0.7" strokeOpacity="0.9"
          style={{ filter: 'drop-shadow(0 0 2px rgba(59,130,246,0.8))' }}
        />
        {/* Area fill */}
        <polyline
          points={[
            `50,34`,
            ...SPARKLINE.map((v, i) => {
              const x = 50 + 2 + (i / (SPARKLINE.length - 1)) * 45
              const y = 16 + 18 - ((v - minS) / (maxS - minS)) * 14
              return `${x},${y}`
            }),
            `95,34`
          ].join(' ')}
          fill="rgba(59,130,246,0.08)"
        />

        <text x="73%" y="32%" textAnchor="middle" fontSize="1.6"
          fill="rgba(255,255,255,0.2)" fontFamily="Inter,sans-serif">Last 12 months</text>

        <text x="52%" y="28%" fontSize="2.8"
          fill="white" fontFamily="Inter,sans-serif" fontWeight="800">$2.4M</text>
        <text x="52%" y="31.5%" fontSize="1.7"
          fill="#22D3EE" fontFamily="Inter,sans-serif">↑ 55% vs last year</text>

        {/* ── Right bottom: Conversion funnel ── */}
        <rect x="48%" y="41%" width="50%" height="55%" rx="2"
          fill="rgba(0,0,0,0.45)" stroke="rgba(6,182,212,0.2)" strokeWidth="0.3" />
        <text x="73%" y="46.5%" textAnchor="middle" fontSize="2.2"
          fill="#06B6D4" fontFamily="Inter,sans-serif" fontWeight="700">CONVERSION FUNNEL</text>
        <line x1="50%" y1="49%" x2="96.5%" y2="49%" stroke="rgba(6,182,212,0.12)" strokeWidth="0.3" />

        {FUNNEL.map((f, i) => (
          <g key={f.label}>
            <text x="50.5%" y={`${54 + i * 11}%`} fontSize="1.8"
              fill="rgba(255,255,255,0.35)" fontFamily="Inter,sans-serif">{f.label}</text>
            <text x="96.5%" y={`${54 + i * 11}%`} textAnchor="end" fontSize="2"
              fill={f.color} fontFamily="Inter,sans-serif" fontWeight="700">{f.value}</text>
            <rect x="50.5%" y={`${56 + i * 11}%`} width="44%" height="2.5%" rx="1.25"
              fill="rgba(255,255,255,0.05)" />
            <rect x="50.5%" y={`${56 + i * 11}%`} width={`${f.pct * 0.44}%`} height="2.5%" rx="1.25"
              fill={f.color} fillOpacity="0.75"
              style={{ filter: `drop-shadow(0 0 2px ${f.color}80)` }} />
          </g>
        ))}

        {/* Bottom conversion rate badge */}
        <rect x="56%" y="90%" width="18%" height="6%" rx="1.5"
          fill="rgba(34,211,238,0.1)" stroke="#22D3EE" strokeWidth="0.3" strokeOpacity="0.5" />
        <text x="65%" y="93.8%" textAnchor="middle" fontSize="2"
          fill="#22D3EE" fontFamily="Inter,sans-serif" fontWeight="700">CVR 5.48% ↑</text>
      </svg>

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-72 h-72 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.1), transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 100%, rgba(6,182,212,0.09), transparent 70%)' }} />
    </div>
  )
}
