export default function HealthcareAI({ className = '' }) {
  const VITALS = [
    { label: 'Heart Rate', value: '72 bpm', trend: [60, 72, 68, 80, 75, 72, 78, 72], color: '#F43F5E' },
    { label: 'SpO2', value: '98%', trend: [96, 97, 98, 97, 98, 99, 98, 98], color: '#22D3EE' },
    { label: 'BP', value: '118/76', trend: [115, 118, 116, 120, 118, 119, 117, 118], color: '#A78BFA' },
  ]

  const chartLine = (pts, minV, maxV, x0, y0, w, h) => {
    const range = maxV - minV || 1
    return pts.map((v, i) => {
      const px = x0 + (i / (pts.length - 1)) * w
      const py = y0 + h - ((v - minV) / range) * h
      return `${px},${py}`
    }).join(' ')
  }

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg,#060A12 0%,#080D18 100%)', aspectRatio: '16/9' }}>

      <svg className="absolute inset-0 w-full h-full opacity-15">
        <defs>
          <pattern id="hc-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hc-grid)" />
      </svg>

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="hc-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
          </radialGradient>
          <filter id="hc-glow">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Central medical cross / AI brain */}
        <circle cx="32%" cy="50%" r="18" fill="url(#hc-center)">
          <animate attributeName="r" values="16;20;16" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="32%" cy="50%" r="10" fill="none" stroke="#F43F5E" strokeWidth="0.3" strokeOpacity="0.3" strokeDasharray="3 2">
          <animateTransform attributeName="transform" type="rotate" from="0 32 50" to="360 32 50" dur="12s" repeatCount="indefinite" />
        </circle>
        <circle cx="32%" cy="50%" r="6.5" fill="#0B1020" stroke="#F43F5E" strokeWidth="0.5"
          style={{ filter: 'drop-shadow(0 0 4px rgba(244,63,94,0.5))' }} />

        {/* Cross */}
        <rect x="30.5%" y="46.5%" width="3%" height="7%" rx="0.5" fill="#F43F5E" fillOpacity="0.8" />
        <rect x="28.5%" y="48.5%" width="7%" height="3%" rx="0.5" fill="#F43F5E" fillOpacity="0.8" />

        {/* ECG line across middle */}
        <path d="M 5 50 L 16 50 L 18 44 L 20 56 L 22 42 L 24 54 L 26 50 L 60 50"
          fill="none" stroke="#F43F5E" strokeWidth="0.6" strokeOpacity="0.7"
          style={{ filter: 'drop-shadow(0 0 2px rgba(244,63,94,0.6))' }}>
          <animate attributeName="strokeDashoffset" from="200" to="0" dur="3s" repeatCount="indefinite" />
          <animate attributeName="strokeDasharray" values="0 200;200 0" dur="3s" repeatCount="indefinite" />
        </path>

        {/* Patient info panel left */}
        <rect x="3%" y="6%" width="24%" height="32%" rx="2"
          fill="rgba(0,0,0,0.5)" stroke="rgba(244,63,94,0.2)" strokeWidth="0.3" />
        <text x="15%" y="11.5%" textAnchor="middle" fontSize="2.2" fill="#F43F5E" fontFamily="Inter,sans-serif" fontWeight="600">PATIENT INTEL</text>
        <line x1="5%" y1="13.5%" x2="25.5%" y2="13.5%" stroke="rgba(244,63,94,0.15)" strokeWidth="0.3" />
        {[
          { label: 'Patient ID', value: 'PT-2847' },
          { label: 'Risk Level', value: 'Moderate' },
          { label: 'Triage Score', value: '74 / 100' },
          { label: 'Assigned AI', value: 'Dx-Agent 4' },
        ].map((item, i) => (
          <g key={item.label}>
            <text x="5%" y={`${17.5 + i * 5}%`} fontSize="1.7" fill="rgba(255,255,255,0.3)" fontFamily="Inter,sans-serif">{item.label}</text>
            <text x="26.5%" y={`${17.5 + i * 5}%`} textAnchor="end" fontSize="1.9" fill="rgba(255,255,255,0.75)" fontFamily="Inter,sans-serif" fontWeight="600">{item.value}</text>
          </g>
        ))}

        {/* AI diagnostic panel right */}
        <rect x="55%" y="4%" width="43%" height="92%" rx="2"
          fill="rgba(0,0,0,0.5)" stroke="rgba(167,139,250,0.2)" strokeWidth="0.3" />
        <text x="76.5%" y="9.5%" textAnchor="middle" fontSize="2.2" fill="#A78BFA" fontFamily="Inter,sans-serif" fontWeight="600">AI DIAGNOSTIC INSIGHTS</text>
        <line x1="57%" y1="12%" x2="96.5%" y2="12%" stroke="rgba(167,139,250,0.15)" strokeWidth="0.3" />

        {/* Vitals charts */}
        {VITALS.map((vital, i) => {
          const vals = vital.trend
          const minV = Math.min(...vals), maxV = Math.max(...vals)
          const x0 = 57 + 2, y0 = 15 + i * 26, w = 39, h = 12
          const pts = chartLine(vals, minV, maxV, x0, y0, w, h)
          return (
            <g key={vital.label}>
              <rect x="57%" y={`${15 + i * 26}%`} width="39%" height="20%" rx="1.5"
                fill={vital.color} fillOpacity="0.04" stroke={vital.color} strokeWidth="0.2" strokeOpacity="0.25" />
              <text x="59%" y={`${18 + i * 26}%`} fontSize="1.8" fill="rgba(255,255,255,0.4)" fontFamily="Inter,sans-serif">{vital.label}</text>
              <text x="94.5%" y={`${18 + i * 26}%`} textAnchor="end" fontSize="2.2" fill={vital.color} fontFamily="Inter,sans-serif" fontWeight="700">{vital.value}</text>
              <polyline points={pts} fill="none" stroke={vital.color} strokeWidth="0.5" strokeOpacity="0.7"
                style={{ filter: `drop-shadow(0 0 1.5px ${vital.color})` }} />
              {/* Area fill */}
              <polyline points={`${x0},${y0 + h} ${pts} ${x0 + w},${y0 + h}`}
                fill={vital.color} fillOpacity="0.08" />
            </g>
          )
        })}

        {/* AI recommendation chip */}
        <rect x="57%" y="84%" width="39%" height="9%" rx="1.5"
          fill="rgba(167,139,250,0.1)" stroke="#A78BFA" strokeWidth="0.3" strokeOpacity="0.5" />
        <circle cx="60%" cy="88.5%" r="1" fill="#A78BFA">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="62%" y="87.5%" fontSize="1.7" fill="rgba(255,255,255,0.5)" fontFamily="Inter,sans-serif">AI Recommendation:</text>
        <text x="62%" y="91.5%" fontSize="1.9" fill="#A78BFA" fontFamily="Inter,sans-serif" fontWeight="600">Cardiology referral — 91% confidence</text>
      </svg>

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.07) 0%, transparent 70%)', filter: 'blur(30px)' }} />
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 0%, rgba(167,139,250,0.1), transparent 70%)' }} />
    </div>
  )
}
