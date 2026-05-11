import { useEffect, useRef } from 'react'

/**
 * MultiAgentOrgLayer
 * Cinematic canvas illustration: coordinated AI agent network
 * mirroring a human enterprise organizational structure.
 * 16:9 · 60fps · seamless loop · zero assets
 */

const PI2 = Math.PI * 2
const lerp = (a, b, t) => a + (b - a) * t
const rand = (min, max) => Math.random() * (max - min) + min
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  violet:     [124, 58,  237],
  blue:       [59,  130, 246],
  cyan:       [6,   182, 212],
  indigo:     [99,  102, 241],
  brightCyan: [34,  211, 238],
  lavender:   [167, 139, 250],
}
const rgba = ([r,g,b], a) => `rgba(${r},${g},${b},${a})`

// ── Architecture definition ───────────────────────────────────────────────────
// All positions are in normalised [0..1] space (x, y)
const ARCH = {
  // Central master orchestrator
  core: { bx: 0.50, by: 0.50, r: 0.048, color: C.violet, tier: 0 },

  // Department hubs (tier 1)
  hubs: [
    { id: 'finance',    label: 'Finance',    bx: 0.50, by: 0.16, r: 0.030, color: C.blue },
    { id: 'ops',        label: 'Ops',        bx: 0.82, by: 0.50, r: 0.030, color: C.cyan },
    { id: 'analytics',  label: 'Analytics',  bx: 0.50, by: 0.84, r: 0.030, color: C.indigo },
    { id: 'support',    label: 'Support',    bx: 0.18, by: 0.50, r: 0.030, color: C.lavender },
  ],

  // Specialist agents per department (tier 2)
  agents: [
    // Finance cluster
    { hub: 'finance', bx: 0.32, by: 0.09, r: 0.018, color: C.blue },
    { hub: 'finance', bx: 0.50, by: 0.05, r: 0.016, color: C.blue },
    { hub: 'finance', bx: 0.68, by: 0.09, r: 0.018, color: C.blue },
    // Ops cluster
    { hub: 'ops',     bx: 0.90, by: 0.34, r: 0.016, color: C.cyan },
    { hub: 'ops',     bx: 0.94, by: 0.50, r: 0.018, color: C.cyan },
    { hub: 'ops',     bx: 0.90, by: 0.66, r: 0.016, color: C.cyan },
    // Analytics cluster
    { hub: 'analytics', bx: 0.32, by: 0.91, r: 0.016, color: C.indigo },
    { hub: 'analytics', bx: 0.50, by: 0.95, r: 0.018, color: C.indigo },
    { hub: 'analytics', bx: 0.68, by: 0.91, r: 0.016, color: C.indigo },
    // Support cluster
    { hub: 'support', bx: 0.10, by: 0.34, r: 0.016, color: C.lavender },
    { hub: 'support', bx: 0.06, by: 0.50, r: 0.018, color: C.lavender },
    { hub: 'support', bx: 0.10, by: 0.66, r: 0.016, color: C.lavender },
  ],

  // Cross-department data highways (hub-to-hub)
  highways: [
    ['finance', 'ops'],
    ['ops', 'analytics'],
    ['analytics', 'support'],
    ['support', 'finance'],
    ['finance', 'analytics'],
    ['ops', 'support'],
  ],
}

export default function MultiAgentOrgLayer({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ── Build full node list ──────────────────────────────────────────────────
    const hubMap = {}
    ARCH.hubs.forEach(h => { hubMap[h.id] = h })

    // Particles: core→hub, hub→agents, hub→hub highways
    const streams = []

    const addStream = (ax, ay, bx, by, color, speed, size) => {
      const count = Math.ceil(rand(2, 4))
      for (let i = 0; i < count; i++) {
        streams.push({
          ax, ay, bx, by, color,
          t: rand(0, 1),
          speed: speed + rand(-0.0006, 0.0006),
          size: size + rand(-0.3, 0.3),
          reverse: Math.random() > 0.5,
          opacity: rand(0.5, 1),
        })
      }
    }

    // core → each hub
    ARCH.hubs.forEach(h => {
      addStream(ARCH.core.bx, ARCH.core.by, h.bx, h.by, h.color, 0.0025, 2.2)
    })
    // hub → agents
    ARCH.agents.forEach(a => {
      const h = hubMap[a.hub]
      addStream(h.bx, h.by, a.bx, a.by, a.color, 0.004, 1.5)
    })
    // highways
    ARCH.highways.forEach(([aid, bid]) => {
      const a = hubMap[aid], b = hubMap[bid]
      addStream(a.bx, a.by, b.bx, b.by, a.color, 0.0018, 1.8)
    })

    // Pulse offsets per node
    const allNodes = [ARCH.core, ...ARCH.hubs, ...ARCH.agents]
    const pulseOff = allNodes.map(() => rand(0, PI2))

    // Ambient orbs
    const orbs = [
      { bx: 0.20, by: 0.20, rFactor: 0.30, color: C.violet,  phase: 0.0 },
      { bx: 0.80, by: 0.20, rFactor: 0.25, color: C.blue,    phase: 1.6 },
      { bx: 0.80, by: 0.80, rFactor: 0.28, color: C.cyan,    phase: 3.2 },
      { bx: 0.20, by: 0.80, rFactor: 0.22, color: C.indigo,  phase: 4.8 },
      { bx: 0.50, by: 0.50, rFactor: 0.35, color: C.violet,  phase: 0.8 },
    ]

    let animId
    const LOOP = 7000 // ms
    let t0 = null

    const draw = (ts) => {
      if (!t0) t0 = ts
      const elapsed = ts - t0
      const loopT   = (elapsed % LOOP) / LOOP          // [0..1] each cycle
      const breathe = Math.sin(loopT * PI2)             // [-1..1]

      // Resize
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const W = canvas.offsetWidth, H = canvas.offsetHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)

      // ── Slow camera drift ──────────────────────────────────────────────────
      const camScale = 1 + 0.025 * (Math.sin(loopT * PI2 * 0.5) * 0.5 + 0.5)
      const camDx    =  0.012 * Math.sin(loopT * PI2) * W
      const camDy    =  0.008 * Math.cos(loopT * PI2) * H
      ctx.save()
      ctx.translate(W / 2 + camDx, H / 2 + camDy)
      ctx.scale(camScale, camScale)
      ctx.translate(-W / 2, -H / 2)

      // ── Background ────────────────────────────────────────────────────────
      ctx.fillStyle = '#050810'
      ctx.fillRect(0, 0, W, H)

      // ── Grid ──────────────────────────────────────────────────────────────
      const GRID = 38
      const gAlpha = 0.032 + 0.008 * breathe
      ctx.strokeStyle = `rgba(255,255,255,${gAlpha})`
      ctx.lineWidth = 0.5
      for (let x = 0; x < W + GRID; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H + GRID; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // ── Ambient glow orbs ─────────────────────────────────────────────────
      orbs.forEach(o => {
        const ox = o.bx * W + Math.sin(elapsed * 0.0003 + o.phase) * W * 0.03
        const oy = o.by * H + Math.cos(elapsed * 0.0003 + o.phase) * H * 0.025
        const or = o.rFactor * Math.min(W, H) * (0.92 + 0.08 * breathe)
        const g  = ctx.createRadialGradient(ox, oy, 0, ox, oy, or)
        g.addColorStop(0,   rgba(o.color, 0.09 + 0.03 * breathe))
        g.addColorStop(0.5, rgba(o.color, 0.03))
        g.addColorStop(1,   'transparent')
        ctx.beginPath(); ctx.arc(ox, oy, or, 0, PI2)
        ctx.fillStyle = g; ctx.fill()
      })

      // ── Resolve node screen positions ──────────────────────────────────────
      const resolve = n => ({
        ...n,
        px: n.bx * W,
        py: n.by * H,
        pr: n.r  * Math.min(W, H),
      })
      const coreN   = resolve(ARCH.core)
      const hubsN   = ARCH.hubs.map(resolve)
      const agentsN = ARCH.agents.map(resolve)
      const hubIdx  = {}
      hubsN.forEach(h => { hubIdx[h.id] = h })

      // ── Draw edges ────────────────────────────────────────────────────────
      const drawEdge = (ax, ay, bx, by, cA, cB, alpha) => {
        const g = ctx.createLinearGradient(ax, ay, bx, by)
        g.addColorStop(0,   rgba(cA, alpha))
        g.addColorStop(0.5, rgba(cB, alpha * 1.3))
        g.addColorStop(1,   rgba(cB, alpha))
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by)
        ctx.strokeStyle = g; ctx.lineWidth = 0.6; ctx.stroke()
      }

      const baseAlpha = 0.13 + 0.05 * breathe
      // core → hubs
      hubsN.forEach(h => drawEdge(coreN.px, coreN.py, h.px, h.py, coreN.color, h.color, baseAlpha))
      // hubs → agents
      agentsN.forEach(a => {
        const h = hubIdx[a.hub]
        drawEdge(h.px, h.py, a.px, a.py, h.color, a.color, baseAlpha * 0.8)
      })
      // highways
      ARCH.highways.forEach(([aid, bid]) => {
        const a = hubIdx[aid], b = hubIdx[bid]
        drawEdge(a.px, a.py, b.px, b.py, a.color, b.color, baseAlpha * 0.55)
      })

      // ── Animate stream particles ───────────────────────────────────────────
      streams.forEach(s => {
        s.t += s.speed * (s.reverse ? -1 : 1)
        if (s.t > 1) s.t = 0
        if (s.t < 0) s.t = 1
        const px = lerp(s.ax * W, s.bx * W, s.t)
        const py = lerp(s.ay * H, s.by * H, s.t)

        // Trail
        for (let ti = 1; ti <= 5; ti++) {
          const tt = clamp(s.t - (s.reverse ? -1 : 1) * s.speed * ti * 10, 0, 1)
          const tx = lerp(s.ax * W, s.bx * W, tt)
          const ty = lerp(s.ay * H, s.by * H, tt)
          ctx.beginPath()
          ctx.arc(tx, ty, s.size * (1 - ti / 5.5), 0, PI2)
          ctx.fillStyle = rgba(s.color, s.opacity * (1 - ti / 6) * 0.45)
          ctx.fill()
        }
        // Head
        ctx.beginPath(); ctx.arc(px, py, s.size, 0, PI2)
        ctx.fillStyle   = rgba(s.color, s.opacity)
        ctx.shadowBlur  = 10
        ctx.shadowColor = rgba(s.color, 0.9)
        ctx.fill()
        ctx.shadowBlur  = 0
      })

      // ── Draw nodes ────────────────────────────────────────────────────────
      const drawNode = (n, i, rings = false) => {
        const pulse = 0.82 + 0.18 * Math.sin(elapsed * 0.0024 + pulseOff[i])

        // Halo
        const hr = n.pr * 3.2 * pulse
        const hg = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, hr)
        hg.addColorStop(0,   rgba(n.color, 0.20 * pulse))
        hg.addColorStop(0.5, rgba(n.color, 0.06))
        hg.addColorStop(1,   'transparent')
        ctx.beginPath(); ctx.arc(n.px, n.py, hr, 0, PI2)
        ctx.fillStyle = hg; ctx.fill()

        // Orbiting rings (core only)
        if (rings) {
          ;[1.55, 2.10, 2.75].forEach((m, ri) => {
            const rr  = n.pr * m
            const dir = ri % 2 === 0 ? 1 : -1
            const rot = elapsed * 0.00045 * dir + ri * Math.PI / 3
            ctx.save()
            ctx.translate(n.px, n.py)
            ctx.rotate(rot)
            ctx.beginPath(); ctx.arc(0, 0, rr, 0, PI2)
            ctx.strokeStyle = rgba(n.color, 0.18 + ri * 0.04)
            ctx.lineWidth   = 0.5
            ctx.setLineDash(ri === 1 ? [5, 4] : [3, 3])
            ctx.stroke()
            ctx.setLineDash([])
            ctx.restore()
          })
        }

        // Body
        ctx.beginPath(); ctx.arc(n.px, n.py, n.pr, 0, PI2)
        ctx.fillStyle   = '#050810'
        ctx.shadowBlur  = 20
        ctx.shadowColor = rgba(n.color, 0.75)
        ctx.fill(); ctx.shadowBlur = 0

        // Border
        ctx.beginPath(); ctx.arc(n.px, n.py, n.pr, 0, PI2)
        ctx.strokeStyle = rgba(n.color, 0.75 * pulse)
        ctx.lineWidth   = rings ? 1.5 : 0.9
        ctx.stroke()

        // Inner fill
        const ig = ctx.createRadialGradient(n.px - n.pr * 0.25, n.py - n.pr * 0.25, 0, n.px, n.py, n.pr)
        ig.addColorStop(0, rgba(n.color, 0.22))
        ig.addColorStop(1, rgba(n.color, 0.04))
        ctx.beginPath(); ctx.arc(n.px, n.py, n.pr, 0, PI2)
        ctx.fillStyle = ig; ctx.fill()

        // Centre dot
        ctx.beginPath(); ctx.arc(n.px, n.py, n.pr * (rings ? 0.20 : 0.28), 0, PI2)
        ctx.fillStyle   = rgba(n.color, 0.95 * pulse)
        ctx.shadowBlur  = 8
        ctx.shadowColor = rgba(n.color, 1)
        ctx.fill(); ctx.shadowBlur = 0
      }

      // Agents (tier 2, drawn first so hubs render on top)
      agentsN.forEach((a, i) => drawNode(a, ARCH.hubs.length + 1 + i))
      // Hubs (tier 1)
      hubsN.forEach((h, i) => drawNode(h, 1 + i))
      // Core orchestrator
      drawNode(coreN, 0, true)

      // ── Department label halos ─────────────────────────────────────────────
      hubsN.forEach(h => {
        ctx.font        = `600 ${clamp(h.pr * 1.1, 9, 14)}px Inter, sans-serif`
        ctx.fillStyle   = rgba(h.color, 0.55)
        ctx.textAlign   = 'center'
        ctx.textBaseline = 'middle'
        const lx = lerp(h.px, W / 2, -0.22) // push label away from centre
        const ly = lerp(h.py, H / 2, -0.22)
        ctx.fillText(h.label, lx, ly)
      })

      // ── Scan sweep ────────────────────────────────────────────────────────
      const sy   = (loopT * H * 1.5) - H * 0.25
      const sweepG = ctx.createLinearGradient(0, sy - 70, 0, sy + 5)
      sweepG.addColorStop(0, 'transparent')
      sweepG.addColorStop(1, rgba(C.cyan, 0.035))
      ctx.fillStyle = sweepG
      ctx.fillRect(0, sy - 70, W, 75)

      // ── Vignette ──────────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.28, W/2, H/2, H*0.88)
      vig.addColorStop(0, 'transparent')
      vig.addColorStop(1, 'rgba(3,5,12,0.72)')
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H)

      ctx.restore()
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${className}`}
      style={{ aspectRatio: '16/9', background: '#050810' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
    </div>
  )
}
