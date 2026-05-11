export default function ManufacturingAI({ className = '' }) {
  const ANOMALY_POINTS = [
    { x: 32, y: 55 }, { x: 58, y: 42 }, { x: 74, y: 60 },
  ]

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(160deg,#060A12 0%,#080D18 60%,#0A0F1C 100%)', aspectRatio: '16/9' }}>

      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="mfg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mfg-grid)" />
      </svg>

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="arm-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="mfg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          <filter id="mfg-blur">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        {/* Floor line */}
        <line x1="0%" y1="78%" x2="100%" y2="78%" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />

        {/* Robotic arm 1 */}
        <g>
          <rect x="10%" y="65%" width="3%" height="13%" rx="0.5" fill="url(#arm-grad)" />
          <rect x="7%" y="63%" width="9%" height="3%" rx="1" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="0.3" strokeOpacity="0.5" />
          <line x1="13%" y1="65%" x2="22%" y2="55%" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
          <line x1="22%" y1="55%" x2="26%" y2="60%" stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
          <circle cx="22%" cy="55%" r="1.5" fill="#060A12" stroke="#3B82F6" strokeWidth="0.5" />
          <circle cx="26%" cy="60%" r="1" fill="#3B82F6">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Arm motion animation */}
          <animateTransform attributeName="transform" type="rotate"
            values="-5 11.5 78; 5 11.5 78; -5 11.5 78" dur="4s" repeatCount="indefinite" />
        </g>

        {/* Robotic arm 2 */}
        <g>
          <rect x="40%" y="62%" width="3%" height="16%" rx="0.5" fill="url(#arm-grad)" />
          <rect x="37%" y="60%" width="9%" height="3%" rx="1" fill="#1E3A8A" stroke="#7C3AED" strokeWidth="0.3" strokeOpacity="0.5" />
          <line x1="43%" y1="62%" x2="50%" y2="48%" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
          <line x1="50%" y1="48%" x2="56%" y2="54%" stroke="#7C3AED" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
          <circle cx="50%" cy="48%" r="1.5" fill="#060A12" stroke="#7C3AED" strokeWidth="0.5" />
          <circle cx="56%" cy="54%" r="1.2" fill="#7C3AED">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <animateTransform attributeName="transform" type="rotate"
            values="5 41.5 78; -8 41.5 78; 5 41.5 78" dur="5s" repeatCount="indefinite" />
        </g>

        {/* Robotic arm 3 */}
        <g>
          <rect x="72%" y="63%" width="3%" height="15%" rx="0.5" fill="url(#arm-grad)" />
          <rect x="69%" y="61%" width="9%" height="3%" rx="1" fill="#1E3A8A" stroke="#06B6D4" strokeWidth="0.3" strokeOpacity="0.5" />
          <line x1="75%" y1="63%" x2="68%" y2="50%" stroke="#06B6D4" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
          <line x1="68%" y1="50%" x2="62%" y2="57%" stroke="#06B6D4" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
          <circle cx="68%" cy="50%" r="1.5" fill="#060A12" stroke="#06B6D4" strokeWidth="0.5" />
          <circle cx="62%" cy="57%" r="1" fill="#06B6D4">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" begin="1s" />
          </circle>
          <animateTransform attributeName="transform" type="rotate"
            values="3 73.5 78; -4 73.5 78; 3 73.5 78" dur="3.5s" repeatCount="indefinite" />
        </g>

        {/* Production line conveyor */}
        <rect x="5%" y="75%" width="90%" height="3%" rx="1" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.3" />
        {[15, 30, 45, 60, 75, 88].map((x, i) => (
          <rect key={i} x={`${x}%`} y="75.5%" width="4%" height="2%" rx="0.5"
            fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.2">
            <animateTransform attributeName="transform" type="translate"
              values="0 0; 15 0; 15 0" dur="6s" repeatCount="indefinite" begin={`${i * 1}s`} />
          </rect>
        ))}

        {/* Analytics overlay - top right */}
        <rect x="62%" y="4%" width="36%" height="40%" rx="2"
          fill="rgba(0,0,0,0.55)" stroke="rgba(59,130,246,0.25)" strokeWidth="0.3" />
        <text x="80%" y="9.5%" textAnchor="middle" fontSize="2.2" fill="#3B82F6" fontFamily="Inter,sans-serif" fontWeight="600">PREDICTIVE ANALYTICS</text>
        <line x1="64%" y1="12%" x2="96%" y2="12%" stroke="rgba(59,130,246,0.2)" strokeWidth="0.3" />

        {/* Analytics chart */}
        <polyline
          points="66,20 70,18 74,22 78,15 82,17 86,13 90,16 94,12"
          fill="none" stroke="#3B82F6" strokeWidth="0.6" strokeOpacity="0.7"
          style={{ filter: 'drop-shadow(0 0 2px #3B82F6)' }}
        />
        <polyline
          points="66,24 70,23 74,25 78,20 82,22 86,19 90,21 94,17"
          fill="none" stroke="#06B6D4" strokeWidth="0.5" strokeOpacity="0.5"
          strokeDasharray="1 0.5"
        />

        {/* Anomaly detection markers */}
        {ANOMALY_POINTS.map((pt, i) => (
          <g key={i}>
            <circle cx={`${pt.x}%`} cy={`${pt.y}%`} r="3" fill="none" stroke="#F59E0B" strokeWidth="0.4" strokeOpacity="0.7">
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" begin={`${i * 0.6}s`} />
              <animate attributeName="strokeOpacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" begin={`${i * 0.6}s`} />
            </circle>
            <circle cx={`${pt.x}%`} cy={`${pt.y}%`} r="1" fill="#F59E0B" fillOpacity="0.8" />
            <text x={`${pt.x + 3}%`} y={`${pt.y + 1}%`} fontSize="1.8" fill="#F59E0B" fontFamily="Inter,sans-serif">ANOMALY</text>
          </g>
        ))}

        {/* Metric cards left */}
        <rect x="3%" y="4%" width="28%" height="32%" rx="2"
          fill="rgba(0,0,0,0.5)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.3" />
        <text x="17%" y="9.5%" textAnchor="middle" fontSize="2.2" fill="#A78BFA" fontFamily="Inter,sans-serif" fontWeight="600">PRODUCTION KPIs</text>
        <line x1="5%" y1="12%" x2="29%" y2="12%" stroke="rgba(124,58,237,0.2)" strokeWidth="0.3" />
        {[
          { label: 'Throughput', value: '2,847 u/hr', color: '#A78BFA' },
          { label: 'Defect Rate', value: '0.3%', color: '#22D3EE' },
          { label: 'OEE Score', value: '94.7%', color: '#3B82F6' },
          { label: 'Downtime', value: '0.2 hrs', color: '#F59E0B' },
        ].map((m, i) => (
          <g key={m.label}>
            <text x="5%" y={`${16 + i * 5}%`} fontSize="1.8" fill="rgba(255,255,255,0.3)" fontFamily="Inter,sans-serif">{m.label}</text>
            <text x="29.5%" y={`${16 + i * 5}%`} textAnchor="end" fontSize="2" fill={m.color} fontFamily="Inter,sans-serif" fontWeight="700">{m.value}</text>
          </g>
        ))}
      </svg>

      {/* Ambient FX */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(59,130,246,0.05), transparent)' }} />
      <div className="absolute top-0 right-1/4 w-96 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(20px)' }} />
    </div>
  )
}
