import { useEffect, useRef } from 'react'

const PI2 = Math.PI * 2
const lerp = (a, b, t) => a + (b - a) * t
const bezierPt = (p0, cp, p1, t) => {
  const s = 1 - t
  return { x: s*s*p0.x + 2*s*t*cp.x + t*t*p1.x, y: s*s*p0.y + 2*s*t*cp.y + t*t*p1.y }
}

export default function AutonomousWorkflow({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId, t0 = null, tPrev = null
    const dpr = () => window.devicePixelRatio || 1
    const resize = () => {
      const d = dpr(), rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * d
      canvas.height = rect.height * d
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const W = () => canvas.width / dpr()
    const H = () => canvas.height / dpr()
    const np = (n, w, h) => ({ x: n.rx * w, y: n.ry * h })

    // LEFT: linear pipeline nodes
    const LN = [
      { rx: 0.07, ry: 0.50, r: 8 },
      { rx: 0.17, ry: 0.50, r: 8 },
      { rx: 0.27, ry: 0.50, r: 8 },
      { rx: 0.37, ry: 0.50, r: 8 },
      { rx: 0.46, ry: 0.50, r: 8 },
    ]
    const LE = [[0,1],[1,2],[2,3],[3,4]]

    // RIGHT: autonomous mesh nodes
    const RN = [
      { rx:0.57, ry:0.50, r:16, col:'#06B6D4', rgb:[6,182,212],  hub:true },
      { rx:0.65, ry:0.29, r:10, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.71, ry:0.43, r: 9, col:'#22D3EE', rgb:[34,211,238]  },
      { rx:0.71, ry:0.57, r: 9, col:'#0EA5E9', rgb:[14,165,233]  },
      { rx:0.65, ry:0.71, r:10, col:'#06B6D4', rgb:[6,182,212]   },
      { rx:0.79, ry:0.22, r: 7, col:'#7C3AED', rgb:[124,58,237]  },
      { rx:0.82, ry:0.37, r: 8, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.84, ry:0.50, r: 9, col:'#22D3EE', rgb:[34,211,238]  },
      { rx:0.82, ry:0.63, r: 8, col:'#0EA5E9', rgb:[14,165,233]  },
      { rx:0.79, ry:0.78, r: 7, col:'#06B6D4', rgb:[6,182,212]   },
      { rx:0.91, ry:0.32, r: 5, col:'#22D3EE', rgb:[34,211,238]  },
      { rx:0.93, ry:0.50, r: 6, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.91, ry:0.68, r: 5, col:'#22D3EE', rgb:[34,211,238]  },
    ]
    const RE = [
      [0,1],[0,2],[0,3],[0,4],
      [1,5],[1,6],[2,6],[2,7],[3,7],[3,8],[4,8],[4,9],
      [5,10],[6,10],[6,11],[7,11],[8,11],[8,12],[9,12],
    ]

    // Feedback arcs
    const FB = [
      { from:10, to:0, cy:-0.27 },
      { from:12, to:0, cy:+0.27 },
    ]

    // Glows
    const GLOWS = [
      { rx:0.22, ry:0.50, col:[29,78,216],  r:0.14, a:0.22, ph:0   },
      { rx:0.57, ry:0.50, col:[6,182,212],  r:0.20, a:0.16, ph:0.3 },
      { rx:0.82, ry:0.38, col:[59,130,246], r:0.14, a:0.13, ph:0.6 },
      { rx:0.82, ry:0.62, col:[34,211,238], r:0.14, a:0.11, ph:0.9 },
      { rx:0.47, ry:0.50, col:[6,182,212],  r:0.09, a:0.13, ph:0.5 },
    ]

    // Particles
    const lp = Array.from({ length: 10 }, () => ({
      edge: Math.floor(Math.random() * LE.length),
      t: Math.random(), spd: 0.00055 + Math.random() * 0.0003, trail: []
    }))
    const rp = [
      ...RE.map((_, i) => ({ edge: i, t: Math.random(), spd: 0.00045 + Math.random() * 0.0004, trail: [] })),
      ...Array.from({ length: 7 }, () => ({ edge: Math.floor(Math.random() * RE.length), t: Math.random(), spd: 0.00045 + Math.random() * 0.0004, trail: [] }))
    ]
    const bp = Array.from({ length: 4 }, () => ({ t: Math.random(), spd: 0.00055 + Math.random() * 0.0003, trail: [] }))
    const fp = [
      { arc: 0, t: 0.10, spd: 0.00038, trail: [] },
      { arc: 0, t: 0.60, spd: 0.00042, trail: [] },
      { arc: 1, t: 0.25, spd: 0.00036, trail: [] },
      { arc: 1, t: 0.75, spd: 0.00040, trail: [] },
    ]

    function drawStream(trail, hx, hy, r, g, b) {
      for (let i = 1; i < trail.length; i++) {
        const a = (i / trail.length) * 0.88
        ctx.beginPath()
        ctx.moveTo(trail[i-1].x, trail[i-1].y)
        ctx.lineTo(trail[i].x, trail[i].y)
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
        ctx.lineWidth = 1.7 * (i / trail.length)
        ctx.stroke()
      }
      if (trail.length > 0) {
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 5.5)
        hg.addColorStop(0, `rgba(${r},${g},${b},1)`)
        hg.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath(); ctx.arc(hx, hy, 5.5, 0, PI2)
        ctx.fillStyle = hg; ctx.fill()
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
      bg.addColorStop(0, '#04070F'); bg.addColorStop(1, '#080D18')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h)

      // Left-side subtle grid
      ctx.save()
      ctx.globalAlpha = 0.045
      ctx.strokeStyle = '#3B82F6'; ctx.lineWidth = 0.5
      const gs = w * 0.055
      for (let xi = 0; xi < w * 0.52; xi += gs) {
        ctx.beginPath(); ctx.moveTo(xi, 0); ctx.lineTo(xi, h); ctx.stroke()
      }
      for (let yi = 0; yi < h; yi += gs) {
        ctx.beginPath(); ctx.moveTo(0, yi); ctx.lineTo(w * 0.52, yi); ctx.stroke()
      }
      ctx.restore()

      // Ambient glows
      for (const g of GLOWS) {
        const pulse = 0.75 + 0.25 * Math.sin(loopT * PI2 * 2 + g.ph * PI2)
        const gg = ctx.createRadialGradient(g.rx*w, g.ry*h, 0, g.rx*w, g.ry*h, g.r*w)
        const [r2, g2, b2] = g.col
        gg.addColorStop(0, `rgba(${r2},${g2},${b2},${g.a * pulse})`)
        gg.addColorStop(1, 'transparent')
        ctx.fillStyle = gg; ctx.fillRect(0, 0, w, h)
      }

      // Left edges
      for (const [ai, bi] of LE) {
        const pa = np(LN[ai], w, h), pb = np(LN[bi], w, h)
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = 'rgba(37,99,235,0.40)'; ctx.lineWidth = 1; ctx.stroke()
      }

      // Transition connector
      {
        const pl = np(LN[4], w, h), po = np(RN[0], w, h)
        const cg = ctx.createLinearGradient(pl.x, pl.y, po.x, po.y)
        cg.addColorStop(0, 'rgba(37,99,235,0.28)'); cg.addColorStop(1, 'rgba(6,182,212,0.45)')
        ctx.beginPath(); ctx.moveTo(pl.x, pl.y); ctx.lineTo(po.x, po.y)
        ctx.strokeStyle = cg; ctx.lineWidth = 1; ctx.stroke()
      }

      // Right edges
      for (const [ai, bi] of RE) {
        const pa = np(RN[ai], w, h), pb = np(RN[bi], w, h)
        const eg = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y)
        eg.addColorStop(0, RN[ai].col + '30'); eg.addColorStop(1, RN[bi].col + '22')
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = eg; ctx.lineWidth = 0.7; ctx.stroke()
      }

      // Feedback arcs
      for (const fb of FB) {
        const pf = np(RN[fb.from], w, h), pt2 = np(RN[fb.to], w, h)
        const mx = (pf.x + pt2.x) / 2, my = (pf.y + pt2.y) / 2 + fb.cy * h
        ctx.beginPath(); ctx.moveTo(pf.x, pf.y)
        ctx.quadraticCurveTo(mx, my, pt2.x, pt2.y)
        ctx.strokeStyle = 'rgba(124,58,237,0.22)'
        ctx.lineWidth = 0.8; ctx.setLineDash([3, 5]); ctx.stroke(); ctx.setLineDash([])
      }

      // Left particles (chain through pipeline)
      for (const p of lp) {
        p.t += p.spd * dt
        if (p.t >= 1) { p.t = 0; p.trail = []; p.edge = (p.edge + 1) % LE.length }
        const [ai, bi] = LE[p.edge]
        const pa = np(LN[ai], w, h), pb = np(LN[bi], w, h)
        const x = lerp(pa.x, pb.x, p.t), y = lerp(pa.y, pb.y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 14) p.trail.shift()
        drawStream(p.trail, x, y, 96, 165, 250)
      }

      // Bridge particles (last left node → orchestrator)
      for (const p of bp) {
        p.t += p.spd * dt
        if (p.t >= 1) { p.t = 0; p.trail = [] }
        const pl = np(LN[4], w, h), po = np(RN[0], w, h)
        const x = lerp(pl.x, po.x, p.t), y = lerp(pl.y, po.y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 12) p.trail.shift()
        const r2 = Math.round(lerp(96, 6, p.t))
        const g2 = Math.round(lerp(165, 182, p.t))
        const b2 = Math.round(lerp(250, 212, p.t))
        drawStream(p.trail, x, y, r2, g2, b2)
      }

      // Right mesh particles
      for (const p of rp) {
        p.t += p.spd * dt
        if (p.t >= 1) { p.t = 0; p.trail = [] }
        const [ai, bi] = RE[p.edge]
        const pa = np(RN[ai], w, h), pb = np(RN[bi], w, h)
        const x = lerp(pa.x, pb.x, p.t), y = lerp(pa.y, pb.y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 12) p.trail.shift()
        const [r2, g2, b2] = RN[ai].rgb
        drawStream(p.trail, x, y, r2, g2, b2)
      }

      // Feedback particles (violet arcs looping back)
      for (const p of fp) {
        p.t += p.spd * dt
        if (p.t >= 1) { p.t = 0; p.trail = [] }
        const fb = FB[p.arc]
        const pf = np(RN[fb.from], w, h), pt2 = np(RN[fb.to], w, h)
        const mx = (pf.x + pt2.x) / 2, my = (pf.y + pt2.y) / 2 + fb.cy * h
        const pos = bezierPt(pf, { x: mx, y: my }, pt2, p.t)
        p.trail.push({ x: pos.x, y: pos.y }); if (p.trail.length > 10) p.trail.shift()
        drawStream(p.trail, pos.x, pos.y, 167, 139, 250)
      }

      // Draw left nodes (mechanical, blue)
      for (const n of LN) {
        const { x, y } = np(n, w, h)
        const pulse = 0.88 + 0.12 * Math.sin(loopT * PI2 * 2.5 + n.rx * 15)
        const r = n.r * pulse
        const og = ctx.createRadialGradient(x, y, 0, x, y, r * 3.5)
        og.addColorStop(0, 'rgba(37,99,235,0.22)'); og.addColorStop(1, 'transparent')
        ctx.fillStyle = og; ctx.beginPath(); ctx.arc(x, y, r * 3.5, 0, PI2); ctx.fill()
        const ng = ctx.createRadialGradient(x, y, 0, x, y, r)
        ng.addColorStop(0, '#93C5FD'); ng.addColorStop(0.55, '#2563EB'); ng.addColorStop(1, 'rgba(37,99,235,0.15)')
        ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(x, y, r, 0, PI2); ctx.fill()
        ctx.strokeStyle = 'rgba(59,130,246,0.55)'; ctx.lineWidth = 0.8; ctx.stroke()
        // Cross marker (mechanical feel)
        ctx.strokeStyle = 'rgba(147,197,253,0.4)'; ctx.lineWidth = 0.6
        ctx.beginPath(); ctx.moveTo(x - r * 0.5, y); ctx.lineTo(x + r * 0.5, y); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(x, y - r * 0.5); ctx.lineTo(x, y + r * 0.5); ctx.stroke()
      }

      // Draw right nodes (organic, cyan)
      for (const n of RN) {
        const { x, y } = np(n, w, h)
        const pulse = 0.9 + 0.1 * Math.sin(loopT * PI2 * 2 + n.rx * 10)
        const r = n.r * pulse
        const [r2, g2, b2] = n.rgb

        if (n.hub) {
          for (let ring = 0; ring < 3; ring++) {
            const angle = loopT * PI2 * (ring % 2 === 0 ? 1 : -1.4) + ring * (PI2 / 3)
            const rr = n.r * (2.0 + ring * 0.75)
            ctx.beginPath(); ctx.arc(x, y, rr, angle, angle + Math.PI * 0.9)
            ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.38)`
            ctx.lineWidth = 1.0; ctx.stroke()
          }
        }

        const og = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2)
        og.addColorStop(0, `rgba(${r2},${g2},${b2},0.28)`); og.addColorStop(1, 'transparent')
        ctx.fillStyle = og; ctx.beginPath(); ctx.arc(x, y, r * 3.2, 0, PI2); ctx.fill()

        const ng = ctx.createRadialGradient(x, y, 0, x, y, r)
        ng.addColorStop(0, n.col)
        ng.addColorStop(0.55, `rgba(${r2},${g2},${b2},0.8)`)
        ng.addColorStop(1, `rgba(${r2},${g2},${b2},0.15)`)
        ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(x, y, r, 0, PI2); ctx.fill()
        ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.5)`; ctx.lineWidth = 0.8; ctx.stroke()
      }

      // Mode labels
      const labelSize = Math.max(10, Math.min(13, w * 0.022))
      ctx.font = `600 ${labelSize}px Inter, sans-serif`
      ctx.textBaseline = 'top'

      // "Automation" — top-left, blue
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(96,165,250,0.55)'
      ctx.fillText('Automation', w * 0.04, h * 0.07)

      // "Autonomy" — top-right area, cyan
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(6,182,212,0.55)'
      ctx.fillText('Autonomy', w * 0.56, h * 0.07)

      // Horizontal scan sweep
      const sx = (loopT * w * 1.4) % (w * 1.2) - w * 0.1
      const sG = ctx.createLinearGradient(sx - 40, 0, sx + 40, 0)
      sG.addColorStop(0, 'transparent'); sG.addColorStop(0.5, 'rgba(6,182,212,0.04)'); sG.addColorStop(1, 'transparent')
      ctx.fillStyle = sG; ctx.fillRect(0, 0, w, h)

      // Vignette
      const vg = ctx.createRadialGradient(w/2, h/2, h * 0.18, w/2, h/2, h * 0.92)
      vg.addColorStop(0, 'transparent'); vg.addColorStop(1, 'rgba(2,4,10,0.65)')
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
      style={{ aspectRatio: '16/9', background: '#04070F' }}
    />
  )
}
