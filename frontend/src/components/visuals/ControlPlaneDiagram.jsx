import { motion } from 'framer-motion'

const AGENTS = [
  { id: 1, label: 'Data Agent', x: 50, y: 8, color: '#06B6D4', delay: 0 },
  { id: 2, label: 'Risk Agent', x: 88, y: 30, color: '#7C3AED', delay: 0.15 },
  { id: 3, label: 'NLP Agent', x: 80, y: 72, color: '#3B82F6', delay: 0.3 },
  { id: 4, label: 'Vision Agent', x: 50, y: 88, color: '#A78BFA', delay: 0.45 },
  { id: 5, label: 'API Agent', x: 12, y: 72, color: '#22D3EE', delay: 0.6 },
  { id: 6, label: 'ML Agent', x: 8, y: 30, color: '#60A5FA', delay: 0.75 },
]

const CENTER = { x: 50, y: 50 }

function Particle({ x1, y1, x2, y2, color, delay }) {
  return (
    <motion.circle
      r={2.5}
      fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      initial={{ offsetDistance: '0%', opacity: 0 }}
    >
      <animateMotion
        dur={`${1.8 + delay}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      >
        <mpath>
          <path d={`M${x1},${y1} L${x2},${y2}`} />
        </mpath>
      </animateMotion>
      <animate attributeName="opacity" values="0;1;1;0" dur={`${1.8 + delay}s`} repeatCount="indefinite" begin={`${delay}s`} />
    </motion.circle>
  )
}

export default function ControlPlaneDiagram({ className = '' }) {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg,#060A12 0%,#080D18 100%)', aspectRatio: '16/9' }}>

      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cp-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cp-grid)" />
      </svg>

      {/* Main SVG diagram */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          {AGENTS.map(a => (
            <radialGradient key={`rg-${a.id}`} id={`ag-${a.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={a.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={a.color} stopOpacity="0" />
            </radialGradient>
          ))}
          <radialGradient id="cg-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Connection lines + particles */}
        {AGENTS.map(a => (
          <g key={`conn-${a.id}`}>
            {/* Static line */}
            <line
              x1={`${CENTER.x}%`} y1={`${CENTER.y}%`}
              x2={`${a.x}%`} y2={`${a.y}%`}
              stroke={a.color} strokeWidth="0.3" strokeOpacity="0.25"
              strokeDasharray="1 1.5"
            />
            {/* Animated travel dots */}
            <circle r="1" fill={a.color} opacity="0.9" style={{ filter: `drop-shadow(0 0 2px ${a.color})` }}>
              <animateMotion dur={`${2 + a.delay * 0.5}s`} repeatCount="indefinite" begin={`${a.delay}s`}>
                <mpath href={`#path-${a.id}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + a.delay * 0.5}s`} repeatCount="indefinite" begin={`${a.delay}s`} />
            </circle>
            {/* Reverse dot */}
            <circle r="0.8" fill={a.color} opacity="0.6" style={{ filter: `drop-shadow(0 0 2px ${a.color})` }}>
              <animateMotion dur={`${2.5 + a.delay * 0.5}s`} repeatCount="indefinite" begin={`${a.delay + 1}s`} keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath href={`#path-${a.id}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.7;0.7;0" dur={`${2.5 + a.delay * 0.5}s`} repeatCount="indefinite" begin={`${a.delay + 1}s`} />
            </circle>
            <path id={`path-${a.id}`} d={`M ${CENTER.x} ${CENTER.y} L ${a.x} ${a.y}`} fill="none" />
          </g>
        ))}

        {/* Agent nodes */}
        {AGENTS.map(a => (
          <g key={`node-${a.id}`}>
            {/* Glow halo */}
            <circle cx={`${a.x}%`} cy={`${a.y}%`} r="6" fill={`url(#ag-${a.id})`}>
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" begin={`${a.delay}s`} />
            </circle>
            {/* Outer ring */}
            <circle cx={`${a.x}%`} cy={`${a.y}%`} r="3.5" fill="none" stroke={a.color} strokeWidth="0.4" strokeOpacity="0.5">
              <animate attributeName="r" values="3.2;4;3.2" dur="3s" repeatCount="indefinite" begin={`${a.delay}s`} />
              <animate attributeName="strokeOpacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin={`${a.delay}s`} />
            </circle>
            {/* Inner circle */}
            <circle cx={`${a.x}%`} cy={`${a.y}%`} r="2.2"
              fill="#060A12" stroke={a.color} strokeWidth="0.5"
              style={{ filter: `drop-shadow(0 0 3px ${a.color})` }} />
            {/* Dot center */}
            <circle cx={`${a.x}%`} cy={`${a.y}%`} r="0.8" fill={a.color} />
            {/* Label */}
            <text x={`${a.x}%`} y={`${a.y + 6}%`}
              textAnchor="middle" fontSize="3" fill="rgba(255,255,255,0.5)" fontFamily="Inter,sans-serif">
              {a.label}
            </text>
          </g>
        ))}

        {/* Central orchestrator */}
        <g>
          <circle cx="50%" cy="50%" r="12" fill="url(#cg-center)">
            <animate attributeName="r" values="10;14;10" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="50%" cy="50%" r="7" fill="none" stroke="#7C3AED" strokeWidth="0.3" strokeOpacity="0.4" strokeDasharray="2 1">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
          </circle>
          <circle cx="50%" cy="50%" r="5" fill="none" stroke="#A78BFA" strokeWidth="0.3" strokeOpacity="0.6" strokeDasharray="1 2">
            <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle cx="50%" cy="50%" r="3.5" fill="#0B1020" stroke="#7C3AED" strokeWidth="0.6"
            style={{ filter: 'drop-shadow(0 0 4px #7C3AED)' }} />
          <text x="50%" y="49.5%" textAnchor="middle" fontSize="2.2" fill="#A78BFA" fontFamily="Inter,sans-serif" fontWeight="600">CORE</text>
          <text x="50%" y="52.5%" textAnchor="middle" fontSize="1.8" fill="rgba(255,255,255,0.35)" fontFamily="Inter,sans-serif">Orchestrator</text>
        </g>

      </svg>

      {/* Overlay gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />
    </div>
  )
}
