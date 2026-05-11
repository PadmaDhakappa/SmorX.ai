export default function FinancialRisk({ className = '' }) {
  const RISK_DATA = [42, 38, 55, 32, 48, 28, 65, 35, 30, 72, 28, 45, 33, 38, 27]
  const PORTFOLIO = [20, 35, 28, 42, 38, 55, 45, 60, 52, 68, 58, 72, 65, 80, 75]

  const linePoints = (data, x0, y0, w, h) => {
    const min = Math.min(...data), max = Math.max(...data)
    return data.map((v, i) => {
      const px = x0 + (i / (data.length - 1)) * w
      const py = y0 + h - ((v - min) / (max - min)) * h
      return `${px},${py}`
    }).join(' ')
  }

  const ANOMALIES = [{ i: 6, label: 'HIGH RISK' }, { i: 9, label: 'SPIKE' }]

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg,#060A12 0%,#080D18 100%)', aspectRatio: '16/9' }}>

      <svg className="absolute inset-0 w-full h-full opacity-15">
        <defs>
          <pattern id="fin-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fin-grid)" />
      </svg>

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="risk-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="port-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main chart area */}
        <rect x="3%" y="8%" width="65%" height="62%" rx="2"
          fill="rgba(0,0,0,0.4)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.3" />

        {/* Chart title */}
        <text x="5%" y="13%" fontSize="2.2" fill="#3B82F6" fontFamily="Inter,sans-serif" fontWeight="600">RISK INTELLIGENCE DASHBOARD</text>
        <line x1="5%" y1="15%" x2="66%" y2="15%" stroke="rgba(59,130,246,0.15)" strokeWidth="0.3" />

        {/* Horizontal grid lines */}
        {[20, 30, 40, 50, 60].map((y, i) => (
          <g key={y}>
            <line x1="5%" y1={`${y}%`} x2="66%" y2={`${y}%`} stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
            <text x="4.5%" y={`${y + 0.8}%`} textAnchor="end" fontSize="1.5" fill="rgba(255,255,255,0.2)" fontFamily="Inter,sans-serif">
              {[80, 60, 40, 20, 0][i]}
            </text>
          </g>
        ))}

        {/* Risk score line */}
        {(() => {
          const pts = linePoints(RISK_DATA, 5, 18, 60, 48)
          const areaBottom = `5,66 ${pts} 65,66`
          return (
            <g>
              <polyline points={areaBottom} fill="url(#risk-fill)" />
              <polyline points={pts} fill="none" stroke="#3B82F6" strokeWidth="0.7" strokeOpacity="0.85"
                style={{ filter: 'drop-shadow(0 0 2px rgba(59,130,246,0.7))' }} />
            </g>
          )
        })()}

        {/* Portfolio performance line */}
        {(() => {
          const pts = linePoints(PORTFOLIO, 5, 18, 60, 48)
          const areaBottom = `5,66 ${pts} 65,66`
          return (
            <g>
              <polyline points={areaBottom} fill="url(#port-fill)" />
              <polyline points={pts} fill="none" stroke="#7C3AED" strokeWidth="0.6" strokeOpacity="0.7"
                strokeDasharray="2 1"
                style={{ filter: 'drop-shadow(0 0 2px rgba(124,58,237,0.5))' }} />
            </g>
          )
        })()}

        {/* Anomaly markers on risk line */}
        {ANOMALIES.map(({ i: idx, label }) => {
          const min = Math.min(...RISK_DATA), max = Math.max(...RISK_DATA)
          const px = 5 + (idx / (RISK_DATA.length - 1)) * 60
          const py = 18 + 48 - ((RISK_DATA[idx] - min) / (max - min)) * 48
          return (
            <g key={label}>
              <circle cx={`${px}%`} cy={`${py}%`} r="2" fill="none" stroke="#F59E0B" strokeWidth="0.4">
                <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={`${px}%`} cy={`${py}%`} r="0.8" fill="#F59E0B" />
              <line x1={`${px}%`} y1={`${py - 2}%`} x2={`${px}%`} y2="18%" stroke="#F59E0B" strokeWidth="0.25" strokeOpacity="0.4" strokeDasharray="1 0.5" />
              <rect x={`${px - 5}%`} y="14.5%" width="10%" height="4%" rx="1"
                fill="rgba(245,158,11,0.15)" stroke="#F59E0B" strokeWidth="0.25" strokeOpacity="0.6" />
              <text x={`${px}%`} y="17.2%" textAnchor="middle" fontSize="1.6" fill="#F59E0B" fontFamily="Inter,sans-serif" fontWeight="600">{label}</text>
            </g>
          )
        })}

        {/* Legend */}
        <circle cx="8%" cy="69.5%" r="0.8" fill="#3B82F6" />
        <text x="9.5%" y="70.2%" fontSize="1.7" fill="rgba(255,255,255,0.4)" fontFamily="Inter,sans-serif">Risk Score</text>
        <circle cx="22%" cy="69.5%" r="0.8" fill="#7C3AED" />
        <text x="23.5%" y="70.2%" fontSize="1.7" fill="rgba(255,255,255,0.4)" fontFamily="Inter,sans-serif">Portfolio</text>

        {/* Right KPI panel */}
        <rect x="70%" y="8%" width="28%" height="62%" rx="2"
          fill="rgba(0,0,0,0.5)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.3" />
        <text x="84%" y="13.5%" textAnchor="middle" fontSize="2.2" fill="#A78BFA" fontFamily="Inter,sans-serif" fontWeight="600">RISK METRICS</text>
        <line x1="72%" y1="15.5%" x2="96.5%" y2="15.5%" stroke="rgba(124,58,237,0.15)" strokeWidth="0.3" />

        {[
          { label: 'Portfolio Value', value: '$2.4B', change: '+14.2%', up: true, color: '#22D3EE' },
          { label: 'Risk Score', value: '34/100', change: 'LOW', up: true, color: '#3B82F6' },
          { label: 'VaR (95%)', value: '-$8.2M', change: 'Within limit', up: true, color: '#A78BFA' },
          { label: 'Sharpe Ratio', value: '2.41', change: '+0.3 vs avg', up: true, color: '#7C3AED' },
          { label: 'Anomalies', value: '2 Detected', change: 'Under review', up: false, color: '#F59E0B' },
        ].map((m, i) => (
          <g key={m.label}>
            <rect x="72%" y={`${20 + i * 11}%`} width="24%" height="9%" rx="1.5"
              fill={m.color} fillOpacity="0.05" stroke={m.color} strokeWidth="0.2" strokeOpacity="0.2" />
            <text x="74%" y={`${23 + i * 11}%`} fontSize="1.7" fill="rgba(255,255,255,0.35)" fontFamily="Inter,sans-serif">{m.label}</text>
            <text x="74%" y={`${27 + i * 11}%`} fontSize="2.3" fill={m.color} fontFamily="Inter,sans-serif" fontWeight="700">{m.value}</text>
            <text x="95.5%" y={`${27 + i * 11}%`} textAnchor="end" fontSize="1.5" fill={m.up ? '#22D3EE' : '#F59E0B'} fontFamily="Inter,sans-serif">{m.change}</text>
          </g>
        ))}

        {/* Bottom bar */}
        <rect x="3%" y="76%" width="95%" height="18%" rx="2"
          fill="rgba(0,0,0,0.4)" stroke="rgba(59,130,246,0.1)" strokeWidth="0.3" />
        <text x="5%" y="81%" fontSize="1.8" fill="rgba(255,255,255,0.3)" fontFamily="Inter,sans-serif">AI PREDICTION ENGINE</text>
        {[
          { label: 'Records Processed', value: '50M / day', color: '#3B82F6' },
          { label: 'Models Running', value: '12 Active', color: '#7C3AED' },
          { label: 'Forecast Accuracy', value: '96.8%', color: '#22D3EE' },
          { label: 'Latency', value: '< 180ms', color: '#A78BFA' },
        ].map((m, i) => (
          <g key={m.label}>
            <text x={`${7 + i * 24}%`} y="88%" fontSize="1.6" fill="rgba(255,255,255,0.25)" fontFamily="Inter,sans-serif">{m.label}</text>
            <text x={`${7 + i * 24}%`} y="92%" fontSize="2.2" fill={m.color} fontFamily="Inter,sans-serif" fontWeight="700">{m.value}</text>
          </g>
        ))}
      </svg>

      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 0%, rgba(124,58,237,0.1), transparent 70%)' }} />
      <div className="absolute bottom-0 left-1/4 w-96 h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(20px)' }} />
    </div>
  )
}
