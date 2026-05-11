import { useEffect, useRef } from 'react'

/**
 * CinematicBackground
 *
 * A fully code-driven, 60fps canvas animation that simulates a premium
 * AI control room: glowing orchestration nodes, flowing data streams,
 * a subtle slow-push camera simulation, and ambient neon light pulses.
 *
 * Seamlessly looping. No video file. Zero bandwidth. Infinite resolution.
 * LOOP_DURATION controls the animation cycle (default: 6000ms).
 */

const LOOP_DURATION = 6000 // ms — exact "6-second loop" as requested
const NODE_COUNT = 14
const STREAM_COUNT = 60
const ACCENT = {
  violet: [124, 58, 237],
  blue: [59, 130, 246],
  cyan: [6, 182, 212],
  brightCyan: [34, 211, 238],
}

function lerp(a, b, t) { return a + (b - a) * t }
function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function rand(min, max) { return Math.random() * (max - min) + min }
function rgba([r, g, b], a) { return `rgba(${r},${g},${b},${a})` }

// Seeded layout so nodes don't move on resize
const NODES_DEF = (() => {
  const n = []
  // Central orchestrator
  n.push({ id: 0, bx: 0.50, by: 0.50, r: 18, color: ACCENT.violet, ring: true, label: 'ORCH', tier: 0 })
  // Primary ring
  const primary = [
    { bx: 0.50, by: 0.14, color: ACCENT.blue },
    { bx: 0.78, by: 0.26, color: ACCENT.cyan },
    { bx: 0.82, by: 0.60, color: ACCENT.violet },
    { bx: 0.62, by: 0.84, color: ACCENT.blue },
    { bx: 0.38, by: 0.84, color: ACCENT.cyan },
    { bx: 0.18, by: 0.60, color: ACCENT.brightCyan },
    { bx: 0.22, by: 0.26, color: ACCENT.violet },
  ]
  primary.forEach((p, i) => n.push({ id: i + 1, ...p, r: 10, ring: false, tier: 1 }))
  // Secondary ring
  const secondary = [
    { bx: 0.66, by: 0.12, color: ACCENT.cyan },
    { bx: 0.88, by: 0.40, color: ACCENT.blue },
    { bx: 0.74, by: 0.74, color: ACCENT.violet },
    { bx: 0.30, by: 0.16, color: ACCENT.brightCyan },
    { bx: 0.10, by: 0.42, color: ACCENT.violet },
    { bx: 0.24, by: 0.74, color: ACCENT.blue },
  ]
  secondary.forEach((p, i) => n.push({ id: i + 8, ...p, r: 7, ring: false, tier: 2 }))
  return n
})()

const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,1],
  [1,8],[2,9],[3,10],[7,11],[6,12],[5,13],
  [8,9],[9,10],[11,12],[12,13],
  [0,8],[0,11],
]

export default function CinematicBackground({ className = '' }) {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ── Initialise stream particles ──────────────────────────────────────────
    const streams = EDGES.map((edge, ei) => {
      const count = 2 + Math.floor(Math.random() * 3)
      return Array.from({ length: count }, (_, pi) => ({
        edge,
        t: (pi / count) + Math.random() * 0.1,
        speed: 0.0018 + Math.random() * 0.0022,
        size: rand(1.2, 2.4),
        reverse: Math.random() > 0.5,
        opacity: rand(0.5, 1),
      }))
    }).flat()

    // ── Node pulse offsets ───────────────────────────────────────────────────
    const pulseOffsets = NODES_DEF.map(() => Math.random() * Math.PI * 2)

    let animId
    let startTime = null

    // ── Ambient glow orbs (large, slow) ─────────────────────────────────────
    const glowOrbs = [
      { bx: 0.25, by: 0.30, radius: 0.28, color: ACCENT.violet, phase: 0 },
      { bx: 0.75, by: 0.25, radius: 0.22, color: ACCENT.blue, phase: 1.0 },
      { bx: 0.70, by: 0.75, radius: 0.24, color: ACCENT.cyan, phase: 2.0 },
      { bx: 0.20, by: 0.70, radius: 0.20, color: ACCENT.violet, phase: 3.2 },
    ]

    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // 6-second loop progress [0..1]
      const loopT = (elapsed % LOOP_DURATION) / LOOP_DURATION
      // Sub-eased for smooth oscillation
      const breathe = Math.sin(loopT * Math.PI * 2)
      const breatheSlow = Math.sin(loopT * Math.PI * 2 * 0.5)

      // Camera push-in: subtly scale [1.0 → 1.04] and back over the loop
      const cameraScale = 1 + 0.03 * easeInOut(Math.sin(loopT * Math.PI) * 0.5 + 0.5)
      const cameraShiftX = 0.012 * Math.sin(loopT * Math.PI * 2)
      const cameraShiftY = 0.008 * Math.cos(loopT * Math.PI * 2)

      // Resize canvas to actual pixel size
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)

      // ── Camera transform ─────────────────────────────────────────────────
      ctx.save()
      ctx.translate(W / 2, H / 2)
      ctx.scale(cameraScale, cameraScale)
      ctx.translate(
        -W / 2 + cameraShiftX * W,
        -H / 2 + cameraShiftY * H,
      )

      // ── Base fill ────────────────────────────────────────────────────────
      ctx.fillStyle = '#060A12'
      ctx.fillRect(-W, -H, W * 3, H * 3)

      // ── Grid ─────────────────────────────────────────────────────────────
      const gridSize = 44
      const gridAlpha = 0.04 + 0.012 * breatheSlow
      ctx.strokeStyle = `rgba(255,255,255,${gridAlpha})`
      ctx.lineWidth = 0.5
      for (let x = 0; x < W + gridSize; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H + gridSize; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // ── Ambient glow orbs ────────────────────────────────────────────────
      glowOrbs.forEach(orb => {
        const ox = orb.bx * W + Math.sin(loopT * Math.PI * 2 + orb.phase) * W * 0.025
        const oy = orb.by * H + Math.cos(loopT * Math.PI * 2 + orb.phase) * H * 0.02
        const or = orb.radius * Math.min(W, H) * (0.9 + 0.1 * breathe)
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, or)
        grad.addColorStop(0, rgba(orb.color, 0.10 + 0.04 * breathe))
        grad.addColorStop(0.5, rgba(orb.color, 0.04))
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(ox, oy, or, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      // ── Compute node screen positions ────────────────────────────────────
      const nodePos = NODES_DEF.map((n, i) => ({
        ...n,
        px: n.bx * W,
        py: n.by * H,
        pr: (n.r / 100) * Math.min(W, H) * 1.6,
        pulse: 0.8 + 0.2 * Math.sin(elapsed * 0.0025 + pulseOffsets[i]),
      }))

      // ── Edges (connection lines) ─────────────────────────────────────────
      EDGES.forEach(([ai, bi]) => {
        const a = nodePos[ai], b = nodePos[bi]
        const edgeAlpha = 0.12 + 0.06 * breathe
        const grad = ctx.createLinearGradient(a.px, a.py, b.px, b.py)
        grad.addColorStop(0, rgba(a.color, edgeAlpha))
        grad.addColorStop(0.5, rgba(b.color, edgeAlpha * 1.4))
        grad.addColorStop(1, rgba(b.color, edgeAlpha))
        ctx.beginPath()
        ctx.moveTo(a.px, a.py)
        ctx.lineTo(b.px, b.py)
        ctx.strokeStyle = grad
        ctx.lineWidth = 0.7
        ctx.stroke()
      })

      // ── Stream particles ─────────────────────────────────────────────────
      streams.forEach(p => {
        p.t += p.speed * (p.reverse ? -1 : 1)
        if (p.t > 1) p.t = 0
        if (p.t < 0) p.t = 1

        const [ai, bi] = p.edge
        const a = nodePos[ai], b = nodePos[bi]
        const x = lerp(a.px, b.px, p.t)
        const y = lerp(a.py, b.py, p.t)
        const col = p.t < 0.5 ? a.color : b.color

        // Trail
        for (let ti = 0; ti < 4; ti++) {
          const trailT = p.t - (p.reverse ? -1 : 1) * p.speed * ti * 8
          const clampedT = Math.max(0, Math.min(1, trailT))
          const tx = lerp(a.px, b.px, clampedT)
          const ty = lerp(a.py, b.py, clampedT)
          const trailAlpha = p.opacity * (1 - ti / 4) * 0.5
          ctx.beginPath()
          ctx.arc(tx, ty, p.size * (1 - ti * 0.15), 0, Math.PI * 2)
          ctx.fillStyle = rgba(col, trailAlpha)
          ctx.fill()
        }

        // Main dot
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = rgba(col, p.opacity)
        ctx.shadowBlur = 8
        ctx.shadowColor = rgba(col, 0.8)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // ── Nodes ────────────────────────────────────────────────────────────
      nodePos.forEach((n, i) => {
        const { px, py, pr, pulse, color, ring } = n

        // Outer halo
        const haloR = pr * 2.8 * pulse
        const halo = ctx.createRadialGradient(px, py, 0, px, py, haloR)
        halo.addColorStop(0, rgba(color, 0.18 * pulse))
        halo.addColorStop(0.5, rgba(color, 0.06))
        halo.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(px, py, haloR, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        // Rotating dash ring (central node only)
        if (ring) {
          ;[1.5, 2.1, 2.7].forEach((mult, ri) => {
            const rr = pr * mult
            const dir = ri % 2 === 0 ? 1 : -1
            const rot = (elapsed * 0.0004 * dir) + (ri * Math.PI / 3)
            ctx.save()
            ctx.translate(px, py)
            ctx.rotate(rot)
            ctx.beginPath()
            ctx.arc(0, 0, rr, 0, Math.PI * 2)
            ctx.strokeStyle = rgba(color, 0.15 + 0.05 * ri)
            ctx.lineWidth = 0.6
            ctx.setLineDash([ri === 1 ? 6 : 4, 4])
            ctx.stroke()
            ctx.setLineDash([])
            ctx.restore()
          })
        }

        // Node body
        ctx.beginPath()
        ctx.arc(px, py, pr, 0, Math.PI * 2)
        ctx.fillStyle = '#060A12'
        ctx.shadowBlur = 18
        ctx.shadowColor = rgba(color, 0.7)
        ctx.fill()
        ctx.shadowBlur = 0

        // Border
        ctx.beginPath()
        ctx.arc(px, py, pr, 0, Math.PI * 2)
        ctx.strokeStyle = rgba(color, 0.7 * pulse)
        ctx.lineWidth = ring ? 1.4 : 0.9
        ctx.stroke()

        // Inner fill gradient
        const inner = ctx.createRadialGradient(px - pr * 0.2, py - pr * 0.2, 0, px, py, pr)
        inner.addColorStop(0, rgba(color, 0.18))
        inner.addColorStop(1, rgba(color, 0.04))
        ctx.beginPath()
        ctx.arc(px, py, pr, 0, Math.PI * 2)
        ctx.fillStyle = inner
        ctx.fill()

        // Center dot — only for non-core nodes
        if (!ring) {
          ctx.beginPath()
          ctx.arc(px, py, pr * 0.28, 0, Math.PI * 2)
          ctx.fillStyle = rgba(color, 0.9 * pulse)
          ctx.shadowBlur = 6
          ctx.shadowColor = rgba(color, 1)
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Label for central node
        if (ring) {
          ctx.font = `bold ${Math.max(9, pr * 0.55)}px Inter, sans-serif`
          ctx.fillStyle = rgba(color, 0.9)
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('AI', px, py - pr * 0.12)
          ctx.font = `${Math.max(7, pr * 0.38)}px Inter, sans-serif`
          ctx.fillStyle = rgba(color, 0.45)
          ctx.fillText('CORE', px, py + pr * 0.32)
        }
      })

      // ── Scan line (horizontal sweep) ─────────────────────────────────────
      const scanY = (loopT * H * 1.4) - H * 0.2
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 4)
      scanGrad.addColorStop(0, 'transparent')
      scanGrad.addColorStop(1, rgba(ACCENT.cyan, 0.04))
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 60, W, 64)

      // ── Vignette ─────────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9)
      vig.addColorStop(0, 'transparent')
      vig.addColorStop(1, 'rgba(4,6,14,0.65)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      ctx.restore() // camera transform

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
