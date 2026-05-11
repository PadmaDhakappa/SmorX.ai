import { useEffect, useRef } from 'react'

const NODES = [
  { id: 0, x: 0.50, y: 0.50, r: 14, label: 'Master\nOrchestrator', color: '#7C3AED', ring: true },
  { id: 1, x: 0.50, y: 0.15, r: 9, label: 'NLP Agent', color: '#3B82F6' },
  { id: 2, x: 0.80, y: 0.28, r: 8, label: 'Vision\nAgent', color: '#06B6D4' },
  { id: 3, x: 0.88, y: 0.62, r: 7, label: 'Risk\nAgent', color: '#A78BFA' },
  { id: 4, x: 0.65, y: 0.85, r: 9, label: 'Data\nAgent', color: '#22D3EE' },
  { id: 5, x: 0.32, y: 0.85, r: 7, label: 'API\nGateway', color: '#60A5FA' },
  { id: 6, x: 0.12, y: 0.62, r: 8, label: 'Security\nAgent', color: '#F43F5E' },
  { id: 7, x: 0.20, y: 0.28, r: 7, label: 'ML\nAgent', color: '#F59E0B' },
  { id: 8, x: 0.72, y: 0.50, r: 6, label: 'Deploy\nAgent', color: '#34D399' },
  { id: 9, x: 0.28, y: 0.50, r: 6, label: 'Monitor\nAgent', color: '#FB7185' },
]

const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,1],
  [8,3],[9,6],
]

export default function MultiAgentNetwork({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0
    let animId

    const particles = EDGES.map((e, i) => ({
      edge: e,
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      size: 1.5 + Math.random() * 1.5,
      reverse: Math.random() > 0.5,
    }))

    const draw = () => {
      frame++
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const W = canvas.width, H = canvas.height

      ctx.clearRect(0, 0, W, H)

      const nodePos = NODES.map(n => ({
        ...n,
        px: n.x * W,
        py: n.y * H,
        pr: (n.r / 100) * Math.min(W, H),
      }))

      // Draw edges
      EDGES.forEach(([a, b]) => {
        const nA = nodePos[a], nB = nodePos[b]
        const grad = ctx.createLinearGradient(nA.px, nA.py, nB.px, nB.py)
        grad.addColorStop(0, `${nA.color}30`)
        grad.addColorStop(1, `${nB.color}30`)
        ctx.beginPath()
        ctx.moveTo(nA.px, nA.py)
        ctx.lineTo(nB.px, nB.py)
        ctx.strokeStyle = grad
        ctx.lineWidth = 0.7
        ctx.stroke()
      })

      // Animate particles along edges
      particles.forEach(p => {
        p.t += p.speed * (p.reverse ? -1 : 1)
        if (p.t > 1) p.t = 0
        if (p.t < 0) p.t = 1
        const [aIdx, bIdx] = p.edge
        const nA = nodePos[aIdx], nB = nodePos[bIdx]
        const x = nA.px + (nB.px - nA.px) * p.t
        const y = nA.py + (nB.py - nA.py) * p.t
        const color = p.t < 0.5 ? nA.color : nB.color
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.shadowBlur = 8
        ctx.shadowColor = color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw nodes
      nodePos.forEach((n, i) => {
        const pulse = Math.sin(frame * 0.04 + i * 0.8) * 0.3 + 0.7

        // Outer glow
        const glow = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, n.pr * 2.5)
        glow.addColorStop(0, `${n.color}25`)
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(n.px, n.py, n.pr * 2.5 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Ring
        if (n.ring) {
          const ringR = n.pr * 1.6
          ctx.beginPath()
          ctx.arc(n.px, n.py, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = `${n.color}50`
          ctx.lineWidth = 0.8
          ctx.setLineDash([4, 3])
          ctx.stroke()
          ctx.setLineDash([])

          const ring2 = n.pr * 2.0
          ctx.beginPath()
          ctx.arc(n.px, n.py, ring2, frame * 0.01, frame * 0.01 + Math.PI * 1.5)
          ctx.strokeStyle = `${n.color}25`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(n.px, n.py, n.pr, 0, Math.PI * 2)
        ctx.fillStyle = '#060A12'
        ctx.shadowBlur = 12
        ctx.shadowColor = n.color
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.beginPath()
        ctx.arc(n.px, n.py, n.pr, 0, Math.PI * 2)
        ctx.strokeStyle = `${n.color}cc`
        ctx.lineWidth = 1
        ctx.stroke()

        // Inner dot
        ctx.beginPath()
        ctx.arc(n.px, n.py, n.pr * 0.22, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        ctx.fill()

        // Label
        const lines = n.label.split('\n')
        ctx.font = `${Math.max(8, n.pr * 2.2)}px Inter, sans-serif`
        ctx.fillStyle = 'rgba(255,255,255,0.75)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        lines.forEach((line, li) => {
          const offsetY = (li - (lines.length - 1) / 2) * (n.pr * 2.4)
          ctx.fillText(line, n.px, n.py + offsetY)
        })
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg,#060A12 0%,#080D18 100%)', aspectRatio: '16/9' }}>

      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="net-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#net-grid)" />
      </svg>

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Status overlay (bottom strip) */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
        <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between border border-white/[0.08]">
          {[
            { label: 'Active Agents', value: '10', color: '#7C3AED' },
            { label: 'Messages/sec', value: '2.4k', color: '#06B6D4' },
            { label: 'Latency', value: '< 12ms', color: '#3B82F6' },
            { label: 'Throughput', value: '99.97%', color: '#22D3EE' },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
              <span className="text-xs text-white/40">{m.label}:</span>
              <span className="text-sm font-bold" style={{ color: m.color }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />
    </div>
  )
}
