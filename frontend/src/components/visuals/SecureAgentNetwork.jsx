import { useEffect, useRef } from 'react'

const PI2 = Math.PI * 2
const lerp = (a, b, t) => a + (b - a) * t
const bezierPt = (p0, cp, p1, t) => {
  const s = 1 - t
  return { x: s*s*p0.x + 2*s*t*cp.x + t*t*p1.x, y: s*s*p0.y + 2*s*t*cp.y + t*t*p1.y }
}

// Node definitions (rx, ry in normalised [0..1] space)
const POLICY   = { rx:0.50, ry:0.10, r:14, col:'#06B6D4', rgb:[6,182,212],   label:'Policy Engine' }
const ORCH     = { rx:0.50, ry:0.50, r:16, col:'#7C3AED', rgb:[124,58,237],  label:'Orchestrator', hub:true }
const AGENTS   = [
  { rx:0.35, ry:0.40, r:10, col:'#6366F1', rgb:[99,102,241],  label:'Finance'   },
  { rx:0.65, ry:0.40, r:10, col:'#3B82F6', rgb:[59,130,246],  label:'Ops'       },
  { rx:0.35, ry:0.60, r:10, col:'#8B5CF6', rgb:[139,92,246],  label:'Analytics' },
  { rx:0.65, ry:0.60, r:10, col:'#6366F1', rgb:[99,102,241],  label:'Support'   },
]
const GATES = [
  { rx:0.50, ry:0.27, r:8, col:'#10B981', rgb:[16,185,129],  label:'Gate' }, // North
  { rx:0.19, ry:0.50, r:8, col:'#10B981', rgb:[16,185,129],  label:'Gate' }, // West
  { rx:0.81, ry:0.50, r:8, col:'#10B981', rgb:[16,185,129],  label:'Gate' }, // East
  { rx:0.50, ry:0.75, r:8, col:'#10B981', rgb:[16,185,129],  label:'Gate' }, // South
]
const AUDIT = { rx:0.50, ry:0.91, r:12, col:'#F59E0B', rgb:[245,158,11], label:'Audit Log' }

// Trust boundary ellipse (normalised)
const TB = { cx:0.50, cy:0.50, rx:0.295, ry:0.30 }

export default function SecureAgentNetwork({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId, t0 = null, tPrev = null
    const dpr = () => window.devicePixelRatio || 1
    const resize = () => {
      const d = dpr(), rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * d; canvas.height = rect.height * d
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const W = () => canvas.width / dpr()
    const H = () => canvas.height / dpr()
    const px = (n, w, h) => ({ x: n.rx * w, y: n.ry * h })

    // ── Particle factory ──────────────────────────────────────────────────────
    const mkP = (count, spd) =>
      Array.from({ length: count }, () => ({ t: Math.random(), spd: spd + Math.random() * 0.0003, trail: [] }))

    // Policy engine → North gate → Orchestrator (cyan)
    const policyP = mkP(5, 0.00042)
    // North gate → Orchestrator leg
    const northP  = mkP(4, 0.00050)
    // Orchestrator ↔ each agent (violet, bidirectional)
    const innerP  = AGENTS.flatMap((_, i) => [
      { idx:i, t:Math.random(), spd:0.00055+Math.random()*0.0004, trail:[], rev:false },
      { idx:i, t:Math.random(), spd:0.00050+Math.random()*0.0003, trail:[], rev:true  },
    ])
    // Agents → South gate (amber telemetry)
    const agAuditP = AGENTS.map((_, i) => ({ idx:i, t:Math.random(), spd:0.00048+Math.random()*0.0003, trail:[] }))
    // South gate → Audit log
    const southP  = mkP(4, 0.00053)
    // West/East gate → flank agents (green)
    const westP   = mkP(3, 0.00045)
    const eastP   = mkP(3, 0.00045)
    // Feedback arc: Audit log → Policy engine (lavender, slow)
    const feedP   = [
      { t:0.10, spd:0.00030, trail:[] },
      { t:0.55, spd:0.00028, trail:[] },
    ]

    function drawStream(trail, hx, hy, r, g, b, sz = 4.5) {
      for (let i = 1; i < trail.length; i++) {
        const a = (i / trail.length) * 0.85
        ctx.beginPath()
        ctx.moveTo(trail[i-1].x, trail[i-1].y)
        ctx.lineTo(trail[i].x, trail[i].y)
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
        ctx.lineWidth = 1.6 * (i / trail.length)
        ctx.stroke()
      }
      if (trail.length) {
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, sz)
        hg.addColorStop(0, `rgba(${r},${g},${b},1)`)
        hg.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath(); ctx.arc(hx, hy, sz, 0, PI2)
        ctx.fillStyle = hg; ctx.fill()
      }
    }

    function drawEdge(ax, ay, bx, by, ca, cb, alpha = 0.28, width = 0.8) {
      const g = ctx.createLinearGradient(ax, ay, bx, by)
      g.addColorStop(0, ca + Math.round(alpha * 255).toString(16).padStart(2,'0'))
      g.addColorStop(1, cb + Math.round(alpha * 255 * 0.7).toString(16).padStart(2,'0'))
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by)
      ctx.strokeStyle = g; ctx.lineWidth = width; ctx.stroke()
    }

    function drawNode(n, w, h, loopT, glowMult = 1, rings = false) {
      const { x, y } = px(n, w, h)
      const pulse = 0.88 + 0.12 * Math.sin(loopT * PI2 * 2 + n.rx * 12)
      const r = n.r * pulse
      const [r2, g2, b2] = n.rgb

      if (rings) {
        for (let ri = 0; ri < 3; ri++) {
          const angle = loopT * PI2 * (ri % 2 === 0 ? 0.9 : -1.2) + ri * (PI2 / 3)
          const rr = n.r * (2.1 + ri * 0.8)
          ctx.beginPath(); ctx.arc(x, y, rr, angle, angle + Math.PI * 0.85)
          ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.40)`
          ctx.lineWidth = 1.0; ctx.stroke()
        }
      }

      const og = ctx.createRadialGradient(x, y, 0, x, y, r * 3.4)
      og.addColorStop(0, `rgba(${r2},${g2},${b2},${0.26 * glowMult * pulse})`)
      og.addColorStop(1, 'transparent')
      ctx.fillStyle = og; ctx.beginPath(); ctx.arc(x, y, r * 3.4, 0, PI2); ctx.fill()

      const ng = ctx.createRadialGradient(x, y, 0, x, y, r)
      ng.addColorStop(0, n.col)
      ng.addColorStop(0.55, `rgba(${r2},${g2},${b2},0.80)`)
      ng.addColorStop(1,   `rgba(${r2},${g2},${b2},0.10)`)
      ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(x, y, r, 0, PI2); ctx.fill()
      ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.55)`; ctx.lineWidth = 0.9; ctx.stroke()
    }

    function drawGateNode(n, w, h, loopT) {
      const { x, y } = px(n, w, h)
      const pulse = 0.85 + 0.15 * Math.sin(loopT * PI2 * 3 + n.rx * 8)
      const r = n.r * pulse
      const [r2, g2, b2] = n.rgb

      // Shield hexagon shape
      const og = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2)
      og.addColorStop(0, `rgba(${r2},${g2},${b2},${0.22 * pulse})`)
      og.addColorStop(1, 'transparent')
      ctx.fillStyle = og; ctx.beginPath(); ctx.arc(x, y, r * 3.2, 0, PI2); ctx.fill()

      // Diamond marker
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(Math.PI / 4 + loopT * PI2 * 0.4)
      const s = r * 0.95
      ctx.beginPath()
      ctx.moveTo(0, -s); ctx.lineTo(s, 0); ctx.lineTo(0, s); ctx.lineTo(-s, 0)
      ctx.closePath()
      const ng = ctx.createRadialGradient(0, 0, 0, 0, 0, s)
      ng.addColorStop(0, n.col)
      ng.addColorStop(1, `rgba(${r2},${g2},${b2},0.20)`)
      ctx.fillStyle = ng; ctx.fill()
      ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.60)`; ctx.lineWidth = 0.9; ctx.stroke()
      ctx.restore()
    }

    function frame(now) {
      if (!t0) t0 = now
      if (!tPrev) tPrev = now
      const dt = Math.min(now - tPrev, 50); tPrev = now
      const loopT = ((now - t0) % 7000) / 7000
      const w = W(), h = H()

      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Background
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, '#030609'); bg.addColorStop(1, '#060A14')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h)

      // Ambient glows
      const glows = [
        { rx:0.50, ry:0.10, col:[6,182,212],   r:0.18, a:0.18 },
        { rx:0.50, ry:0.50, col:[124,58,237],  r:0.26, a:0.10 },
        { rx:0.50, ry:0.91, col:[245,158,11],  r:0.16, a:0.14 },
        { rx:0.19, ry:0.50, col:[16,185,129],  r:0.10, a:0.10 },
        { rx:0.81, ry:0.50, col:[16,185,129],  r:0.10, a:0.10 },
      ]
      for (const g of glows) {
        const pulse = 0.72 + 0.28 * Math.sin(loopT * PI2 * 1.8 + g.rx * 4)
        const gg = ctx.createRadialGradient(g.rx*w, g.ry*h, 0, g.rx*w, g.ry*h, g.r*w)
        const [r2, g2, b2] = g.col
        gg.addColorStop(0, `rgba(${r2},${g2},${b2},${g.a * pulse})`)
        gg.addColorStop(1, 'transparent')
        ctx.fillStyle = gg; ctx.fillRect(0, 0, w, h)
      }

      // ── Trust boundary ellipse (dashed) ──────────────────────────────────
      {
        const pulse = 0.55 + 0.45 * Math.sin(loopT * PI2 * 1.2)
        ctx.save()
        ctx.translate(TB.cx * w, TB.cy * h)
        ctx.beginPath()
        ctx.ellipse(0, 0, TB.rx * w, TB.ry * h, 0, 0, PI2)
        ctx.strokeStyle = `rgba(16,185,129,${0.22 * pulse})`
        ctx.lineWidth = 1.2
        ctx.setLineDash([6, 6])
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()
      }

      // ── Edges ─────────────────────────────────────────────────────────────
      const po = px(POLICY, w, h), or = px(ORCH, w, h)
      const au = px(AUDIT,  w, h)
      const ga = GATES.map(g => px(g, w, h))
      const ag = AGENTS.map(a => px(a, w, h))

      // Policy → North gate
      drawEdge(po.x, po.y, ga[0].x, ga[0].y, '#06B6D4', '#10B981', 0.30)
      // North gate → Orchestrator
      drawEdge(ga[0].x, ga[0].y, or.x, or.y, '#10B981', '#7C3AED', 0.28)
      // West gate ↔ Finance + Analytics
      drawEdge(ga[1].x, ga[1].y, ag[0].x, ag[0].y, '#10B981', '#6366F1', 0.22)
      drawEdge(ga[1].x, ga[1].y, ag[2].x, ag[2].y, '#10B981', '#8B5CF6', 0.22)
      // East gate ↔ Ops + Support
      drawEdge(ga[2].x, ga[2].y, ag[1].x, ag[1].y, '#10B981', '#3B82F6', 0.22)
      drawEdge(ga[2].x, ga[2].y, ag[3].x, ag[3].y, '#10B981', '#6366F1', 0.22)
      // Orchestrator ↔ Agents
      for (const a of ag) drawEdge(or.x, or.y, a.x, a.y, '#7C3AED', '#6366F1', 0.24)
      // Agents → South gate
      for (const a of ag) drawEdge(a.x, a.y, ga[3].x, ga[3].y, '#6366F1', '#10B981', 0.20)
      // South gate → Audit log
      drawEdge(ga[3].x, ga[3].y, au.x, au.y, '#10B981', '#F59E0B', 0.28)

      // Feedback arc — Audit log back to Policy engine (dashed, lavender)
      {
        const mx = w * 0.92, my = (po.y + au.y) / 2
        ctx.beginPath()
        ctx.moveTo(au.x, au.y)
        ctx.quadraticCurveTo(mx, my, po.x, po.y)
        ctx.strokeStyle = 'rgba(196,181,253,0.18)'
        ctx.lineWidth = 0.9; ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([])
      }

      // ── Particles ─────────────────────────────────────────────────────────

      // Policy Engine → North Gate (cyan)
      for (const p of policyP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const x = lerp(po.x, ga[0].x, p.t), y = lerp(po.y, ga[0].y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 12) p.trail.shift()
        drawStream(p.trail, x, y, 6, 182, 212)
      }
      // North Gate → Orchestrator (cyan)
      for (const p of northP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const x = lerp(ga[0].x, or.x, p.t), y = lerp(ga[0].y, or.y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 12) p.trail.shift()
        drawStream(p.trail, x, y, 16, 185, 129)
      }
      // Orchestrator ↔ Agents (violet)
      for (const p of innerP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const src = p.rev ? ag[p.idx] : or, dst = p.rev ? or : ag[p.idx]
        const x = lerp(src.x, dst.x, p.t), y = lerp(src.y, dst.y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 11) p.trail.shift()
        const [r2, g2, b2] = AGENTS[p.idx].rgb
        drawStream(p.trail, x, y, r2, g2, b2, 4)
      }
      // Agents → South Gate (amber telemetry)
      for (const p of agAuditP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const x = lerp(ag[p.idx].x, ga[3].x, p.t), y = lerp(ag[p.idx].y, ga[3].y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 11) p.trail.shift()
        drawStream(p.trail, x, y, 245, 158, 11, 3.5)
      }
      // South Gate → Audit Log (amber)
      for (const p of southP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const x = lerp(ga[3].x, au.x, p.t), y = lerp(ga[3].y, au.y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 12) p.trail.shift()
        drawStream(p.trail, x, y, 245, 158, 11)
      }
      // West gate ↔ Finance (green)
      for (const p of westP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const idx = Math.floor(p.t >= 0 ? 0 : 2)
        const x = lerp(ga[1].x, ag[idx].x, p.t), y = lerp(ga[1].y, ag[idx].y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 10) p.trail.shift()
        drawStream(p.trail, x, y, 16, 185, 129, 3.5)
      }
      // East gate ↔ Ops (green)
      for (const p of eastP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const x = lerp(ga[2].x, ag[1].x, p.t), y = lerp(ga[2].y, ag[1].y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 10) p.trail.shift()
        drawStream(p.trail, x, y, 16, 185, 129, 3.5)
      }
      // Feedback arc: Audit log → Policy engine (lavender)
      for (const p of feedP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const mx = w * 0.92, my = (po.y + au.y) / 2
        const pos = bezierPt(au, { x: mx, y: my }, po, p.t)
        p.trail.push({ x: pos.x, y: pos.y }); if (p.trail.length > 10) p.trail.shift()
        drawStream(p.trail, pos.x, pos.y, 196, 181, 253, 3.5)
      }

      // ── Nodes ─────────────────────────────────────────────────────────────
      // Draw gates first (lowest z)
      for (const g of GATES) drawGateNode(g, w, h, loopT)
      // Agents
      for (const a of AGENTS) drawNode(a, w, h, loopT, 0.85)
      // Audit log
      drawNode(AUDIT, w, h, loopT, 1.0)
      // Policy engine
      drawNode(POLICY, w, h, loopT, 1.1)
      // Orchestrator (top, rings)
      drawNode(ORCH, w, h, loopT, 1.0, true)

      // ── Labels ────────────────────────────────────────────────────────────
      const lsz  = Math.max(9, Math.min(12, w * 0.018))
      const lszS = Math.max(7, Math.min(10, w * 0.014))
      ctx.textBaseline = 'middle'

      // Policy Engine — above node
      ctx.font = `600 ${lsz}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(6,182,212,0.70)'
      ctx.fillText('Policy Engine', po.x, po.y - POLICY.r * 1.9)

      // Orchestrator — below node
      ctx.fillStyle = 'rgba(167,139,250,0.70)'
      ctx.fillText('Orchestrator', or.x, or.y + ORCH.r * 2.2)

      // Audit Log — below node
      ctx.fillStyle = 'rgba(245,158,11,0.70)'
      ctx.fillText('Audit Log', au.x, au.y + AUDIT.r * 2.1)

      // Agents — outside their node
      const agentOffsets = [
        { dx: -14, dy: -16, align: 'right' },   // Finance  (top-left)
        { dx:  14, dy: -16, align: 'left'  },   // Ops      (top-right)
        { dx: -14, dy:  16, align: 'right' },   // Analytics(bottom-left)
        { dx:  14, dy:  16, align: 'left'  },   // Support  (bottom-right)
      ]
      ctx.font = `500 ${lszS}px Inter, sans-serif`
      AGENTS.forEach((a, i) => {
        const { x, y } = ag[i]
        const off = agentOffsets[i]
        ctx.textAlign = off.align
        ctx.fillStyle = `rgba(${a.rgb[0]},${a.rgb[1]},${a.rgb[2]},0.65)`
        ctx.fillText(a.label, x + off.dx, y + off.dy)
      })

      // Gate labels — Permission Gate × 4
      const gateOffsets = [
        { dx:  0,   dy: -17, align: 'center' }, // North
        { dx: -16,  dy:   0, align: 'right'  }, // West
        { dx:  16,  dy:   0, align: 'left'   }, // East
        { dx:  0,   dy:  17, align: 'center' }, // South
      ]
      GATES.forEach((g, i) => {
        const { x, y } = ga[i]
        const off = gateOffsets[i]
        ctx.textAlign = off.align
        ctx.fillStyle = 'rgba(16,185,129,0.60)'
        ctx.fillText('Permission Gate', x + off.dx, y + off.dy)
      })

      // Trust Boundary label (right side of ellipse)
      ctx.font = `500 ${lszS}px Inter, sans-serif`
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(16,185,129,0.45)'
      ctx.fillText('Trust Boundary', (TB.cx + TB.rx) * w + 6, TB.cy * h)

      // Scan sweep
      const sx = (loopT * w * 1.4) % (w * 1.2) - w * 0.1
      const sG = ctx.createLinearGradient(sx - 45, 0, sx + 45, 0)
      sG.addColorStop(0, 'transparent')
      sG.addColorStop(0.5, 'rgba(16,185,129,0.03)')
      sG.addColorStop(1, 'transparent')
      ctx.fillStyle = sG; ctx.fillRect(0, 0, w, h)

      // Vignette
      const vg = ctx.createRadialGradient(w/2, h/2, h * 0.16, w/2, h/2, h * 0.94)
      vg.addColorStop(0, 'transparent'); vg.addColorStop(1, 'rgba(1,3,8,0.72)')
      ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h)

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(rafId); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full rounded-2xl ${className}`}
      style={{ aspectRatio: '16/9', background: '#030609' }}
    />
  )
}
