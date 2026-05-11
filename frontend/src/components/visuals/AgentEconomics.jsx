import { useEffect, useRef } from 'react'

const PI2 = Math.PI * 2
const lerp = (a, b, t) => a + (b - a) * t

// ── Node definitions ─────────────────────────────────────────────────────────
const COSTS = [
  { rx:0.09, ry:0.22, r:9,  col:'#F97316', rgb:[249,115, 22], label:'Infrastructure'  },
  { rx:0.09, ry:0.40, r:9,  col:'#EF4444', rgb:[239, 68, 68], label:'Model Inference' },
  { rx:0.09, ry:0.60, r:9,  col:'#F59E0B', rgb:[245,158, 11], label:'Human Oversight' },
  { rx:0.09, ry:0.78, r:9,  col:'#FB923C', rgb:[251,146, 60], label:'Development'     },
]
const COST_AGG = { rx:0.30, ry:0.50, r:11, col:'#FB923C', rgb:[251,146,60], label:'Cost Layer'  }
const HUB      = { rx:0.50, ry:0.50, r:18, col:'#7C3AED', rgb:[124, 58,237], label:'Agent Network', hub:true }
const VAL_GEN  = { rx:0.70, ry:0.50, r:11, col:'#10B981', rgb:[ 16,185,129], label:'Value Layer' }
const VALUES   = [
  { rx:0.91, ry:0.22, r:9,  col:'#10B981', rgb:[ 16,185,129], label:'Throughput ×10'  },
  { rx:0.91, ry:0.40, r:9,  col:'#22C55E', rgb:[ 34,197, 94], label:'Error Rate −80%' },
  { rx:0.91, ry:0.60, r:9,  col:'#10B981', rgb:[ 16,185,129], label:'Scale ×100'      },
  { rx:0.91, ry:0.78, r:9,  col:'#34D399', rgb:[ 52,211,153], label:'Revenue Impact'  },
]

const mkP = (n, spd) =>
  Array.from({ length: n }, () => ({ t: Math.random(), spd: spd + Math.random() * 0.0003, trail: [] }))

export default function AgentEconomics({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId, t0 = null, tPrev = null
    const dpr = () => window.devicePixelRatio || 1
    const resize = () => {
      const d = dpr(), r = canvas.getBoundingClientRect()
      canvas.width = r.width * d; canvas.height = r.height * d
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const W = () => canvas.width / dpr()
    const H = () => canvas.height / dpr()
    const px = (n, w, h) => ({ x: n.rx * w, y: n.ry * h })

    // Particles: costs → cost aggregator (4 streams, one per cost node)
    const costP = COSTS.map(() => mkP(3, 0.00042))
    // Cost aggregator → hub (denser)
    const aggP  = mkP(5, 0.00048)
    // Hub → value generator (brighter, more dense)
    const hubP  = mkP(7, 0.00052)
    // Value generator → value outputs (4 streams, each 2× density of cost streams)
    const valP  = VALUES.map(() => mkP(6, 0.00055))

    function drawStream(trail, hx, hy, r, g, b, sz = 4) {
      for (let i = 1; i < trail.length; i++) {
        const a = (i / trail.length) * 0.85
        ctx.beginPath()
        ctx.moveTo(trail[i-1].x, trail[i-1].y)
        ctx.lineTo(trail[i].x,   trail[i].y)
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
        ctx.lineWidth = 1.5 * (i / trail.length)
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

    function drawEdge(ax, ay, bx, by, colA, colB, alpha = 0.22) {
      const g = ctx.createLinearGradient(ax, ay, bx, by)
      g.addColorStop(0, colA + Math.round(alpha * 255).toString(16).padStart(2,'0'))
      g.addColorStop(1, colB + Math.round(alpha * 255 * 0.65).toString(16).padStart(2,'0'))
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by)
      ctx.strokeStyle = g; ctx.lineWidth = 0.7; ctx.stroke()
    }

    function drawNode(n, w, h, loopT, glowMult = 1, rings = false) {
      const { x, y } = px(n, w, h)
      const pulse = 0.88 + 0.12 * Math.sin(loopT * PI2 * 2 + n.rx * 14)
      const r = n.r * pulse
      const [r2, g2, b2] = n.rgb

      if (rings) {
        for (let ri = 0; ri < 3; ri++) {
          const angle = loopT * PI2 * (ri % 2 === 0 ? 0.9 : -1.1) + ri * (PI2 / 3)
          const rr = n.r * (2.0 + ri * 0.8)
          ctx.beginPath(); ctx.arc(x, y, rr, angle, angle + Math.PI * 0.85)
          ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.38)`
          ctx.lineWidth = 1.0; ctx.stroke()
        }
      }

      const og = ctx.createRadialGradient(x, y, 0, x, y, r * 3.5)
      og.addColorStop(0, `rgba(${r2},${g2},${b2},${0.24 * glowMult * pulse})`)
      og.addColorStop(1, 'transparent')
      ctx.fillStyle = og; ctx.beginPath(); ctx.arc(x, y, r * 3.5, 0, PI2); ctx.fill()

      if (!rings) {
        const ng = ctx.createRadialGradient(x, y, 0, x, y, r)
        ng.addColorStop(0, n.col)
        ng.addColorStop(0.55, `rgba(${r2},${g2},${b2},0.80)`)
        ng.addColorStop(1,   `rgba(${r2},${g2},${b2},0.08)`)
        ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(x, y, r, 0, PI2); ctx.fill()
        ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.52)`; ctx.lineWidth = 0.85; ctx.stroke()
      }
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
      const bg = ctx.createLinearGradient(0, 0, w, h)
      bg.addColorStop(0, '#04060E'); bg.addColorStop(1, '#07090F')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h)

      // Left ambient glow (costs — orange)
      const lp = 0.65 + 0.35 * Math.sin(loopT * PI2 * 1.5)
      const lg = ctx.createRadialGradient(w*0.09, h*0.50, 0, w*0.09, h*0.50, w*0.22)
      lg.addColorStop(0, `rgba(249,115,22,${0.12 * lp})`); lg.addColorStop(1, 'transparent')
      ctx.fillStyle = lg; ctx.fillRect(0, 0, w, h)

      // Center glow (hub — violet)
      const cp = 0.75 + 0.25 * Math.sin(loopT * PI2 * 2)
      const cg = ctx.createRadialGradient(w*0.50, h*0.50, 0, w*0.50, h*0.50, w*0.28)
      cg.addColorStop(0, `rgba(124,58,237,${0.16 * cp})`); cg.addColorStop(1, 'transparent')
      ctx.fillStyle = cg; ctx.fillRect(0, 0, w, h)

      // Right ambient glow (value — green, brighter)
      const rp = 0.65 + 0.35 * Math.sin(loopT * PI2 * 1.5 + 1.0)
      const rg = ctx.createRadialGradient(w*0.91, h*0.50, 0, w*0.91, h*0.50, w*0.22)
      rg.addColorStop(0, `rgba(16,185,129,${0.18 * rp})`); rg.addColorStop(1, 'transparent')
      ctx.fillStyle = rg; ctx.fillRect(0, 0, w, h)

      const caP = px(COST_AGG, w, h)
      const huP = px(HUB,      w, h)
      const vaP = px(VAL_GEN,  w, h)
      const cosP = COSTS.map(c => px(c, w, h))
      const valPs = VALUES.map(v => px(v, w, h))

      // ── Break-even divider (subtle dashed vertical through hub) ──────────
      {
        const pulse = 0.30 + 0.20 * Math.sin(loopT * PI2 * 1.8)
        ctx.save()
        ctx.beginPath(); ctx.moveTo(huP.x, h * 0.08); ctx.lineTo(huP.x, h * 0.92)
        ctx.strokeStyle = `rgba(124,58,237,${pulse})`
        ctx.lineWidth = 0.8; ctx.setLineDash([4, 7]); ctx.stroke(); ctx.setLineDash([])
        ctx.restore()
      }

      // ── Edges ─────────────────────────────────────────────────────────────
      for (const cp2 of cosP) drawEdge(cp2.x, cp2.y, caP.x, caP.y, '#F97316', '#F97316')
      drawEdge(caP.x, caP.y, huP.x, huP.y, '#FB923C', '#7C3AED', 0.26)
      drawEdge(huP.x, huP.y, vaP.x, vaP.y, '#7C3AED', '#10B981', 0.26)
      for (const vp of valPs) drawEdge(vaP.x, vaP.y, vp.x, vp.y, '#10B981', '#34D399')

      // ── Particles ─────────────────────────────────────────────────────────
      // Costs → Cost Aggregator
      COSTS.forEach((c, ci) => {
        const src = cosP[ci]
        for (const p of costP[ci]) {
          p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
          const x = lerp(src.x, caP.x, p.t), y = lerp(src.y, caP.y, p.t)
          p.trail.push({ x, y }); if (p.trail.length > 11) p.trail.shift()
          const [r2, g2, b2] = c.rgb
          drawStream(p.trail, x, y, r2, g2, b2, 3.5)
        }
      })
      // Cost Aggregator → Hub
      for (const p of aggP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const x = lerp(caP.x, huP.x, p.t), y = lerp(caP.y, huP.y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 12) p.trail.shift()
        drawStream(p.trail, x, y, 251, 146, 60, 4)
      }
      // Hub → Value Generator (violet → green, brighter)
      for (const p of hubP) {
        p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
        const x = lerp(huP.x, vaP.x, p.t), y = lerp(huP.y, vaP.y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 12) p.trail.shift()
        const r2 = Math.round(lerp(124,  16, p.t))
        const g2 = Math.round(lerp( 58, 185, p.t))
        const b2 = Math.round(lerp(237, 129, p.t))
        drawStream(p.trail, x, y, r2, g2, b2, 4.5)
      }
      // Value Generator → Values (denser than cost streams)
      VALUES.forEach((v, vi) => {
        const dst = valPs[vi]
        for (const p of valP[vi]) {
          p.t += p.spd * dt; if (p.t >= 1) { p.t = 0; p.trail = [] }
          const x = lerp(vaP.x, dst.x, p.t), y = lerp(vaP.y, dst.y, p.t)
          p.trail.push({ x, y }); if (p.trail.length > 12) p.trail.shift()
          const [r2, g2, b2] = v.rgb
          drawStream(p.trail, x, y, r2, g2, b2, 4)
        }
      })

      // ── Draw nodes ────────────────────────────────────────────────────────
      for (const c of COSTS)  drawNode(c,       w, h, loopT, 0.80)
      drawNode(COST_AGG,       w, h, loopT, 0.90)
      for (const v of VALUES) drawNode(v,       w, h, loopT, 0.95)
      drawNode(VAL_GEN,        w, h, loopT, 1.00)
      drawNode(HUB,            w, h, loopT, 1.10, true)

      // ── Labels ────────────────────────────────────────────────────────────
      const lsz  = Math.max(9, Math.min(12, w * 0.018))
      const lszS = Math.max(7, Math.min(10, w * 0.014))
      ctx.textBaseline = 'middle'

      // Section headers
      ctx.font = `600 ${lsz}px Inter, sans-serif`
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(249,115,22,0.60)'
      ctx.fillText('Cost Inputs', w * 0.02, h * 0.07)

      ctx.textAlign = 'right'
      ctx.fillStyle = 'rgba(16,185,129,0.65)'
      ctx.fillText('Value Outputs', w * 0.98, h * 0.07)

      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(167,139,250,0.60)'
      ctx.fillText('ROI Engine', huP.x, h * 0.07)

      // Cost node labels (right of each node)
      ctx.font = `500 ${lszS}px Inter, sans-serif`
      ctx.textAlign = 'left'
      for (const c of COSTS) {
        const { x, y } = px(c, w, h)
        ctx.fillStyle = `rgba(${c.rgb[0]},${c.rgb[1]},${c.rgb[2]},0.65)`
        ctx.fillText(c.label, x + c.r + 5, y)
      }

      // Value node labels (left of each node)
      ctx.textAlign = 'right'
      for (const v of VALUES) {
        const { x, y } = px(v, w, h)
        ctx.fillStyle = `rgba(${v.rgb[0]},${v.rgb[1]},${v.rgb[2]},0.68)`
        ctx.fillText(v.label, x - v.r - 5, y)
      }

      // Intermediate node labels
      ctx.font = `500 ${lszS}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(251,146,60,0.55)'
      ctx.fillText(COST_AGG.label, caP.x, caP.y - COST_AGG.r * 2.1)
      ctx.fillStyle = 'rgba(16,185,129,0.55)'
      ctx.fillText(VAL_GEN.label,  vaP.x, vaP.y - VAL_GEN.r  * 2.1)

      // Hub label — above rings
      ctx.font = `600 ${lsz}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = 'rgba(255,255,255,0.90)'
      ctx.fillText(HUB.label, huP.x, huP.y - HUB.r * 2.8)

      // Break-even label
      ctx.font = `500 ${lszS}px Inter, sans-serif`
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(124,58,237,0.40)'
      ctx.fillText('Break-Even', huP.x + 5, h * 0.10)

      // Scan sweep
      const sx = (loopT * w * 1.4) % (w * 1.2) - w * 0.1
      const sG = ctx.createLinearGradient(sx - 45, 0, sx + 45, 0)
      sG.addColorStop(0, 'transparent')
      sG.addColorStop(0.5, 'rgba(16,185,129,0.028)')
      sG.addColorStop(1, 'transparent')
      ctx.fillStyle = sG; ctx.fillRect(0, 0, w, h)

      // Vignette
      const vg = ctx.createRadialGradient(w/2, h/2, h * 0.15, w/2, h/2, h * 0.95)
      vg.addColorStop(0, 'transparent'); vg.addColorStop(1, 'rgba(2,3,8,0.70)')
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
      style={{ aspectRatio: '16/9', background: '#04060E' }}
    />
  )
}
