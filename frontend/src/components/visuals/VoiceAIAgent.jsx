import { useEffect, useRef } from 'react'

const CRM_ROWS = [
  { name: 'Sarah Mitchell', status: 'Qualified', score: 92, color: '#22D3EE' },
  { name: 'Marcus Chen', status: 'Nurturing', score: 74, color: '#A78BFA' },
  { name: 'Elena Rossi', status: 'Hot Lead', score: 98, color: '#7C3AED' },
  { name: 'David Park', status: 'Contacted', score: 61, color: '#60A5FA' },
]

export default function VoiceAIAgent({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0
    let animId

    const draw = () => {
      frame++
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const W = canvas.width, H = canvas.height
      const cx = W * 0.32, cy = H * 0.46

      ctx.clearRect(0, 0, W, H)

      // Waveform bars
      const barCount = 48
      const barW = (W * 0.55) / barCount
      const baseX = W * 0.04
      const baseY = H * 0.46

      for (let i = 0; i < barCount; i++) {
        const t = frame * 0.04 + i * 0.35
        const amp = Math.sin(t) * 0.5 + Math.sin(t * 1.7) * 0.3 + Math.sin(t * 0.5) * 0.2
        const h = Math.abs(amp) * H * 0.28 + H * 0.02
        const progress = i / barCount
        const r = Math.round(6 + (124 - 6) * progress)
        const g = Math.round(182 + (58 - 182) * progress)
        const b = Math.round(212 + (237 - 212) * progress)
        const alpha = 0.5 + Math.abs(amp) * 0.5

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`

        // Shadow glow
        ctx.shadowBlur = 6
        ctx.shadowColor = `rgba(${r},${g},${b},0.6)`
        ctx.fillRect(baseX + i * barW, baseY - h / 2, barW * 0.65, h)
        ctx.shadowBlur = 0
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg,#060A12 0%,#080D18 100%)', aspectRatio: '16/9' }}>

      <svg className="absolute inset-0 w-full h-full opacity-15">
        <defs>
          <pattern id="va-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#va-grid)" />
      </svg>

      {/* Canvas waveform */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ left: 0, top: 0 }} />

      {/* SVG UI overlay */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="va-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central AI voice orb */}
        <circle cx="32%" cy="46%" r="14" fill="url(#va-center)">
          <animate attributeName="r" values="12;16;12" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="32%" cy="46%" r="8" fill="none" stroke="#7C3AED" strokeWidth="0.4" strokeOpacity="0.5" strokeDasharray="3 1.5">
          <animateTransform attributeName="transform" type="rotate" from="0 32 46" to="360 32 46" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="32%" cy="46%" r="5" fill="none" stroke="#A78BFA" strokeWidth="0.3" strokeOpacity="0.6" strokeDasharray="1 2">
          <animateTransform attributeName="transform" type="rotate" from="360 32 46" to="0 32 46" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="32%" cy="46%" r="3" fill="#0B1020" stroke="#7C3AED" strokeWidth="0.5"
          style={{ filter: 'drop-shadow(0 0 3px #7C3AED)' }} />
        <text x="32%" y="45%" textAnchor="middle" fontSize="1.8" fill="#A78BFA" fontFamily="Inter,sans-serif" fontWeight="600">VOICE</text>
        <text x="32%" y="48%" textAnchor="middle" fontSize="1.5" fill="rgba(255,255,255,0.4)" fontFamily="Inter,sans-serif">AI Agent</text>

        {/* Status pill */}
        <rect x="26%" y="57%" width="12%" height="5%" rx="2.5" fill="rgba(124,58,237,0.2)" stroke="#7C3AED" strokeWidth="0.3" strokeOpacity="0.6" />
        <circle cx="28.5%" cy="59.5%" r="0.8" fill="#22D3EE">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="32%" y="60.2%" textAnchor="middle" fontSize="2" fill="rgba(255,255,255,0.7)" fontFamily="Inter,sans-serif">LIVE CALL</text>

        {/* CRM panel right side */}
        <rect x="60%" y="8%" width="38%" height="84%" rx="2"
          fill="rgba(0,0,0,0.45)" stroke="rgba(6,182,212,0.2)" strokeWidth="0.3" />
        <text x="79%" y="14%" textAnchor="middle" fontSize="2.2" fill="#06B6D4" fontFamily="Inter,sans-serif" fontWeight="600">CRM AUTOMATION</text>
        <line x1="62%" y1="17%" x2="96%" y2="17%" stroke="rgba(6,182,212,0.2)" strokeWidth="0.3" />

        {CRM_ROWS.map((row, i) => (
          <g key={row.name}>
            <rect x="62%" y={`${20 + i * 17}%`} width="34%" height="13%" rx="1.5"
              fill="rgba(255,255,255,0.02)" stroke={row.color} strokeWidth="0.2" strokeOpacity="0.3" />
            <circle cx="65%" cy={`${26 + i * 17}%`} r="1" fill={row.color}>
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
            <text x="67%" y={`${24.5 + i * 17}%`} fontSize="2" fill="white" fontFamily="Inter,sans-serif" fontWeight="500">{row.name}</text>
            <text x="67%" y={`${28 + i * 17}%`} fontSize="1.7" fill="rgba(255,255,255,0.35)" fontFamily="Inter,sans-serif">{row.status}</text>
            {/* Score bar */}
            <rect x="83%" y={`${24 + i * 17}%`} width="11%" height="1.5%" rx="0.75"
              fill="rgba(255,255,255,0.06)" />
            <rect x="83%" y={`${24 + i * 17}%`} width={`${row.score * 0.11}%`} height="1.5%" rx="0.75"
              fill={row.color} fillOpacity="0.8" />
            <text x="94.5%" y={`${25.5 + i * 17}%`} fontSize="1.6" fill={row.color} fontFamily="Inter,sans-serif">{row.score}</text>
          </g>
        ))}

        {/* Call metrics left top */}
        <rect x="3%" y="5%" width="24%" height="24%" rx="2"
          fill="rgba(0,0,0,0.4)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.3" />
        <text x="15%" y="11%" textAnchor="middle" fontSize="1.9" fill="rgba(255,255,255,0.4)" fontFamily="Inter,sans-serif">CALL INTELLIGENCE</text>
        {[
          { label: 'Duration', value: '4m 32s' },
          { label: 'Sentiment', value: '+0.87' },
          { label: 'Intent Score', value: '94%' },
        ].map((m, i) => (
          <g key={m.label}>
            <text x="5%" y={`${16 + i * 4.5}%`} fontSize="1.7" fill="rgba(255,255,255,0.3)" fontFamily="Inter,sans-serif">{m.label}</text>
            <text x="26.5%" y={`${16 + i * 4.5}%`} textAnchor="end" fontSize="1.8" fill="rgba(255,255,255,0.75)" fontFamily="Inter,sans-serif" fontWeight="600">{m.value}</text>
          </g>
        ))}
      </svg>

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }} />
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 100% 0%, rgba(6,182,212,0.1), transparent 70%)' }} />
    </div>
  )
}
