import { motion } from 'framer-motion'

const STAGES = [
  {
    id: 'plan', label: 'Plan', x: 13, color: '#7C3AED',
    items: ['Spec Analysis', 'Task Graph', 'Dependency Map'],
    icon: 'M 6 10 L 10 6 L 14 10 M 10 6 L 10 18 M 6 15 L 14 15',
  },
  {
    id: 'code', label: 'Code', x: 38, color: '#3B82F6',
    items: ['AI Generation', 'PR Creation', 'Review Agent'],
    icon: 'M 7 8 L 13 14 M 7 14 L 13 8',
  },
  {
    id: 'test', label: 'Test', x: 63, color: '#06B6D4',
    items: ['Unit Tests', 'Integration', 'Coverage Gate'],
    icon: 'M 8 14 L 10 16 L 14 10',
  },
  {
    id: 'deploy', label: 'Deploy', x: 88, color: '#22D3EE',
    items: ['Build Pack', 'Canary Roll', 'Live Monitor'],
    icon: 'M 10 6 L 10 18 M 6 14 L 10 18 L 14 14',
  },
]

export default function SDLCPipeline({ className = '' }) {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg,#060A12 0%,#080D18 100%)', aspectRatio: '16/9' }}>

      <svg className="absolute inset-0 w-full h-full opacity-15">
        <defs>
          <pattern id="sdlc-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sdlc-grid)" />
      </svg>

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="33%" stopColor="#3B82F6" />
            <stop offset="66%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <filter id="sdlc-glow">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Pipeline connector */}
        <line x1="13%" y1="40%" x2="88%" y2="40%" stroke="url(#pipe-grad)" strokeWidth="0.6" strokeOpacity="0.4" />

        {/* Animated dots along pipeline */}
        {[0, 1, 2].map(i => (
          <circle key={i} r="1.2" opacity="0" style={{ filter: 'drop-shadow(0 0 3px #3B82F6)' }}>
            <animateMotion dur="4s" repeatCount="indefinite" begin={`${i * 1.3}s`}>
              <mpath href="#pipe-path" />
            </animateMotion>
            <animate attributeName="opacity" values="0;0.9;0.9;0" dur="4s" repeatCount="indefinite" begin={`${i * 1.3}s`} />
            <animate attributeName="fill" values="#7C3AED;#3B82F6;#06B6D4;#22D3EE" dur="4s" repeatCount="indefinite" begin={`${i * 1.3}s`} />
          </circle>
        ))}
        <path id="pipe-path" d="M 13 40 L 88 40" fill="none" />

        {/* Stage cards */}
        {STAGES.map((stage, i) => (
          <g key={stage.id}>
            {/* Card body */}
            <rect x={`${stage.x - 11}%`} y="20%" width="22%" height="45%" rx="2"
              fill="#060A12" stroke={stage.color} strokeWidth="0.4" strokeOpacity="0.5"
              style={{ filter: `drop-shadow(0 0 4px ${stage.color}30)` }} />

            {/* Header bar */}
            <rect x={`${stage.x - 11}%`} y="20%" width="22%" height="8%" rx="2"
              fill={stage.color} fillOpacity="0.12" />

            {/* Stage icon area */}
            <circle cx={`${stage.x}%`} cy="28.5%" r="3"
              fill={stage.color} fillOpacity="0.1" stroke={stage.color} strokeWidth="0.3" strokeOpacity="0.4" />
            <text x={`${stage.x}%`} y="29.5%" textAnchor="middle" fontSize="2.5" fill={stage.color} fontFamily="monospace">
              {['◈', '⊞', '✓', '⇪'][i]}
            </text>

            {/* Label */}
            <text x={`${stage.x}%`} y="34.5%" textAnchor="middle" fontSize="2.8"
              fill="white" fontFamily="Inter,sans-serif" fontWeight="700">{stage.label}</text>

            {/* Status indicator */}
            <circle cx={`${stage.x + 9}%`} cy="22.5%" r="1" fill={stage.color}>
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
            </circle>

            {/* Items list */}
            {stage.items.map((item, j) => (
              <g key={item}>
                <rect x={`${stage.x - 9}%`} y={`${38 + j * 8}%`} width="18%" height="6%" rx="1"
                  fill={stage.color} fillOpacity="0.07" stroke={stage.color} strokeWidth="0.2" strokeOpacity="0.25" />
                <circle cx={`${stage.x - 7}%`} cy={`${41 + j * 8}%`} r="0.7" fill={stage.color} fillOpacity="0.7" />
                <text x={`${stage.x - 5.5}%`} y={`${41.8 + j * 8}%`} fontSize="1.9"
                  fill="rgba(255,255,255,0.5)" fontFamily="Inter,sans-serif">{item}</text>
              </g>
            ))}
          </g>
        ))}

        {/* Bottom metrics strip */}
        <rect x="3%" y="72%" width="94%" height="14%" rx="2"
          fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
        {[
          { label: 'Commits/day', value: '84', x: 15 },
          { label: 'Test Coverage', value: '96.2%', x: 35 },
          { label: 'Deploy Freq', value: '12×/day', x: 55 },
          { label: 'MTTR', value: '< 4 min', x: 75 },
          { label: 'Defect Rate', value: '0.3%', x: 92 },
        ].map(m => (
          <g key={m.label}>
            <text x={`${m.x}%`} y="77.5%" textAnchor="middle" fontSize="1.6" fill="rgba(255,255,255,0.3)" fontFamily="Inter,sans-serif">{m.label}</text>
            <text x={`${m.x}%`} y="81.5%" textAnchor="middle" fontSize="2.4" fill="white" fontFamily="Inter,sans-serif" fontWeight="700">{m.value}</text>
          </g>
        ))}
      </svg>

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />
      <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 0%, rgba(124,58,237,0.12), transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 100%, rgba(34,211,238,0.1), transparent 70%)' }} />
    </div>
  )
}
