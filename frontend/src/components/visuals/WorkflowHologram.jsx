import { motion } from 'framer-motion'

const WORKFLOW_NODES = [
  { id: 'intake', label: 'Input\nIngestion', x: 10, y: 50, color: '#06B6D4' },
  { id: 'parse', label: 'Context\nParsing', x: 28, y: 50, color: '#7C3AED' },
  { id: 'reason', label: 'AI\nReasoning', x: 50, y: 50, color: '#3B82F6' },
  { id: 'action', label: 'Action\nLayer', x: 72, y: 50, color: '#A78BFA' },
  { id: 'output', label: 'Output\nDelivery', x: 90, y: 50, color: '#22D3EE' },
]

const BRANCH_NODES = [
  { label: 'Memory Store', x: 28, y: 22, color: '#60A5FA', parentX: 28, parentY: 50 },
  { label: 'Tool Calls', x: 50, y: 22, color: '#7C3AED', parentX: 50, parentY: 50 },
  { label: 'API Gateway', x: 72, y: 22, color: '#A78BFA', parentX: 72, parentY: 50 },
  { label: 'Feedback Loop', x: 50, y: 78, color: '#06B6D4', parentX: 50, parentY: 50 },
]

export default function WorkflowHologram({ className = '' }) {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg,#060A12 0%,#080D18 100%)', aspectRatio: '16/9' }}>

      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="wf-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wf-grid)" />
      </svg>

      {/* Table glow surface */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,182,212,0.04), transparent)' }} />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(6,182,212,0.4),rgba(124,58,237,0.4),transparent)', boxShadow: '0 0 20px rgba(6,182,212,0.2)' }} />

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="wf-glow">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="flow-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Main pipeline line */}
        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="url(#flow-line)" strokeWidth="0.5" strokeOpacity="0.4" />

        {/* Branch connections */}
        {BRANCH_NODES.map((b, i) => (
          <g key={i}>
            <line x1={`${b.parentX}%`} y1={`${b.parentY}%`} x2={`${b.x}%`} y2={`${b.y}%`}
              stroke={b.color} strokeWidth="0.25" strokeOpacity="0.3" strokeDasharray="1 1" />
          </g>
        ))}

        {/* Animated flow particles on main line */}
        {[0, 1, 2, 3].map(i => (
          <circle key={i} r="1" fill="#06B6D4" opacity="0">
            <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.75}s`}>
              <mpath href="#main-path" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin={`${i * 0.75}s`} />
            <animate attributeName="fill" values="#06B6D4;#7C3AED;#22D3EE" dur="3s" repeatCount="indefinite" begin={`${i * 0.75}s`} />
          </circle>
        ))}
        <path id="main-path" d="M 10 50 L 90 50" fill="none" />

        {/* Main workflow nodes */}
        {WORKFLOW_NODES.map((node, i) => (
          <g key={node.id}>
            {/* Glow */}
            <circle cx={`${node.x}%`} cy={`${node.y}%`} r="6" fill={node.color} fillOpacity="0.06">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
            {/* Hexagon-ish node */}
            <circle cx={`${node.x}%`} cy={`${node.y}%`} r="4"
              fill="#0B1020" stroke={node.color} strokeWidth="0.5"
              style={{ filter: `drop-shadow(0 0 3px ${node.color}80)` }} />
            <circle cx={`${node.x}%`} cy={`${node.y}%`} r="2" fill={node.color} fillOpacity="0.15" />
            <circle cx={`${node.x}%`} cy={`${node.y}%`} r="1" fill={node.color}>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
            {/* Label (2 lines) */}
            {node.label.split('\n').map((line, j) => (
              <text key={j} x={`${node.x}%`} y={`${node.y + 7 + j * 3.5}%`}
                textAnchor="middle" fontSize="2.2" fill="rgba(255,255,255,0.55)" fontFamily="Inter,sans-serif">
                {line}
              </text>
            ))}
          </g>
        ))}

        {/* Branch nodes */}
        {BRANCH_NODES.map((b, i) => (
          <g key={i}>
            <rect x={`${b.x - 7}%`} y={`${b.y - 3}%`} width="14%" height="6%" rx="1.5"
              fill="#0B1020" stroke={b.color} strokeWidth="0.3" strokeOpacity="0.5"
              style={{ filter: `drop-shadow(0 0 2px ${b.color}50)` }} />
            <text x={`${b.x}%`} y={`${b.y + 1.2}%`} textAnchor="middle" fontSize="2"
              fill="rgba(255,255,255,0.5)" fontFamily="Inter,sans-serif">{b.label}</text>
          </g>
        ))}

        {/* Human figure silhouette on the left */}
        <g opacity="0.3" transform="translate(2,30)">
          <circle cx="4" cy="6" r="3" fill="#06B6D4" />
          <path d="M 1 12 Q 4 9 7 12 L 8 25 Q 4 22 0 25 Z" fill="#06B6D4" />
          <line x1="0" y1="15" x2="-4" y2="22" stroke="#06B6D4" strokeWidth="1" />
          <line x1="8" y1="15" x2="12" y2="22" stroke="#06B6D4" strokeWidth="1" />
        </g>

        {/* AI figure on the right */}
        <g opacity="0.25" transform="translate(85,30)">
          <rect x="1" y="1" width="10" height="9" rx="2" fill="#7C3AED" />
          <circle cx="3.5" cy="5" r="1" fill="#A78BFA" />
          <circle cx="7.5" cy="5" r="1" fill="#A78BFA" />
          <path d="M 3 8 Q 6 10 9 8" fill="none" stroke="#A78BFA" strokeWidth="0.8" />
          <rect x="3" y="10" width="6" height="10" rx="1" fill="#7C3AED" />
        </g>

        {/* Status readout panel */}
        <rect x="3%" y="5%" width="22%" height="16%" rx="1.5" fill="rgba(0,0,0,0.4)" stroke="rgba(6,182,212,0.25)" strokeWidth="0.3" />
        <text x="14%" y="10%" textAnchor="middle" fontSize="2.2" fill="#06B6D4" fontFamily="Inter,sans-serif" fontWeight="600">WORKFLOW STATUS</text>
        {[
          { label: 'Tasks Queued', value: '142', y: 13.5 },
          { label: 'Completed', value: '98.2%', y: 16.5 },
        ].map(row => (
          <g key={row.label}>
            <text x="5%" y={`${row.y}%`} fontSize="1.8" fill="rgba(255,255,255,0.35)" fontFamily="Inter,sans-serif">{row.label}</text>
            <text x="23.5%" y={`${row.y}%`} textAnchor="end" fontSize="1.8" fill="rgba(255,255,255,0.7)" fontFamily="Inter,sans-serif" fontWeight="600">{row.value}</text>
          </g>
        ))}
      </svg>

      {/* Top corner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 0%, rgba(124,58,237,0.15), transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 100%, rgba(6,182,212,0.12), transparent 70%)' }} />
    </div>
  )
}
