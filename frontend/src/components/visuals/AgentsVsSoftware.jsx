import { useEffect, useRef } from 'react'

const PI2 = Math.PI * 2
const lerp = (a, b, t) => a + (b - a) * t
const bezierPt = (p0, cp, p1, t) => {
  const s = 1 - t
  return { x: s*s*p0.x + 2*s*t*cp.x + t*t*p1.x, y: s*s*p0.y + 2*s*t*cp.y + t*t*p1.y }
}

export default function AgentsVsSoftware({ className = '' }) {
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

    // === LEFT: Traditional Software — rigid 3×4 grid ===
    const LN = [
      { rx:0.07, ry:0.25, r:9 }, { rx:0.18, ry:0.25, r:9 }, { rx:0.29, ry:0.25, r:9 }, { rx:0.40, ry:0.25, r:7 },
      { rx:0.07, ry:0.50, r:9 }, { rx:0.18, ry:0.50, r:9 }, { rx:0.29, ry:0.50, r:9 }, { rx:0.40, ry:0.50, r:7 },
      { rx:0.07, ry:0.75, r:9 }, { rx:0.18, ry:0.75, r:9 }, { rx:0.29, ry:0.75, r:9 }, { rx:0.40, ry:0.75, r:7 },
    ]
    const LE = [
      [0,1],[1,2],[2,3],   // row 0 horizontal
      [4,5],[5,6],[6,7],   // row 1 horizontal
      [8,9],[9,10],[10,11],// row 2 horizontal
      [0,4],[4,8],         // col 0 vertical
      [1,5],[5,9],         // col 1 vertical
      [2,6],[6,10],        // col 2 vertical
      [3,7],[7,11],        // col 3 vertical
    ]

    // === RIGHT: AI Agents — organic cluster ===
    const RN = [
      { rx:0.77, ry:0.50, r:16, col:'#8B5CF6', rgb:[139,92,246], hub:true },
      { rx:0.63, ry:0.28, r:10, col:'#7C3AED', rgb:[124,58,237]  },
      { rx:0.73, ry:0.34, r: 8, col:'#A78BFA', rgb:[167,139,250] },
      { rx:0.88, ry:0.28, r:10, col:'#6D28D9', rgb:[109,40,217]  },
      { rx:0.60, ry:0.50, r: 8, col:'#8B5CF6', rgb:[139,92,246]  },
      { rx:0.93, ry:0.47, r: 9, col:'#7C3AED', rgb:[124,58,237]  },
      { rx:0.62, ry:0.70, r:10, col:'#8B5CF6', rgb:[139,92,246]  },
      { rx:0.74, ry:0.75, r: 8, col:'#A78BFA', rgb:[167,139,250] },
      { rx:0.88, ry:0.70, r:10, col:'#7C3AED', rgb:[124,58,237]  },
      { rx:0.96, ry:0.58, r: 7, col:'#6D28D9', rgb:[109,40,217]  },
    ]
    const RE = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
      [1,2],[2,3],[3,5],[5,9],[8,9],
      [1,4],[4,6],[6,7],[7,8],
      [1,8],[3,6],
    ]
    const FB = [
      { from:3, to:6, cpx:0.97, cpy:0.50 },
      { from:1, to:8, cpx:0.56, cpy:0.48 },
    ]

    // === PARTICLES ===
    const lP = [
      ...LE.map((_, i) => ({ edge:i, t:Math.random(), spd:0.00050+Math.random()*0.0003, trail:[] })),
      ...Array.from({length:6}, () => ({ edge:Math.floor(Math.random()*LE.length), t:Math.random(), spd:0.00050+Math.random()*0.0003, trail:[] })),
    ]
    const rP = [
      ...RE.map((_, i) => ({ edge:i, t:Math.random(), spd:0.00052+Math.random()*0.0004, trail:[] })),
      ...Array.from({length:8}, () => ({ edge:Math.floor(Math.random()*RE.length), t:Math.random(), spd:0.00052+Math.random()*0.0004, trail:[] })),
    ]
    const fbP = [
      { arc:0, t:0.15, spd:0.00038, trail:[] },
      { arc:0, t:0.65, spd:0.00042, trail:[] },
      { arc:1, t:0.30, spd:0.00040, trail:[] },
      { arc:1, t:0.80, spd:0.00036, trail:[] },
    ]

    // Rounded-rect path helper (centered at x,y, side length s, corner radius r)
    function roundedRect(x, y, s, r) {
      const hs = s / 2
      ctx.beginPath()
      ctx.moveTo(x - hs + r, y - hs)
      ctx.lineTo(x + hs - r, y - hs)
      ctx.quadraticCurveTo(x + hs, y - hs, x + hs, y - hs + r)
      ctx.lineTo(x + hs, y + hs - r)
      ctx.quadraticCurveTo(x + hs, y + hs, x + hs - r, y + hs)
      ctx.lineTo(x - hs + r, y + hs)
      ctx.quadraticCurveTo(x - hs, y + hs, x - hs, y + hs - r)
      ctx.lineTo(x - hs, y - hs + r)
      ctx.quadraticCurveTo(x - hs, y - hs, x - hs + r, y - hs)
      ctx.closePath()
    }

    function drawStream(trail, hx, hy, r, g, b, sz = 5) {
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
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, sz)
        hg.addColorStop(0, `rgba(${r},${g},${b},1)`)
        hg.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath(); ctx.arc(hx, hy, sz, 0, PI2)
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
      ctx.fillStyle = '#050810'; ctx.fillRect(0, 0, w, h)

      // Left: subtle code-grid overlay
      ctx.save()
      ctx.globalAlpha = 0.042
      ctx.strokeStyle = '#3B82F6'; ctx.lineWidth = 0.5
      const gs = w * 0.055
      for (let xi = 0; xi < w * 0.505; xi += gs) {
        ctx.beginPath(); ctx.moveTo(xi, 0); ctx.lineTo(xi, h); ctx.stroke()
      }
      for (let yi = 0; yi < h; yi += gs) {
        ctx.beginPath(); ctx.moveTo(0, yi); ctx.lineTo(w * 0.505, yi); ctx.stroke()
      }
      ctx.restore()

      // Left ambient glow
      const lgA = ctx.createRadialGradient(w*0.22, h*0.50, 0, w*0.22, h*0.50, w*0.26)
      lgA.addColorStop(0, 'rgba(29,78,216,0.14)'); lgA.addColorStop(1, 'transparent')
      ctx.fillStyle = lgA; ctx.fillRect(0, 0, w, h)

      // Right ambient glow
      const pulse = 0.72 + 0.28 * Math.sin(loopT * PI2 * 2)
      const rgA = ctx.createRadialGradient(w*0.77, h*0.50, 0, w*0.77, h*0.50, w*0.30)
      rgA.addColorStop(0, `rgba(124,58,237,${0.18 * pulse})`); rgA.addColorStop(1, 'transparent')
      ctx.fillStyle = rgA; ctx.fillRect(0, 0, w, h)

      // Center divider
      {
        const cx = w * 0.505
        const cg = ctx.createLinearGradient(cx - 65, 0, cx + 65, 0)
        cg.addColorStop(0, 'transparent')
        cg.addColorStop(0.35, 'rgba(59,130,246,0.05)')
        cg.addColorStop(0.50, 'rgba(139,92,246,0.09)')
        cg.addColorStop(0.65, 'rgba(139,92,246,0.05)')
        cg.addColorStop(1, 'transparent')
        ctx.fillStyle = cg; ctx.fillRect(0, 0, w, h)

        const lPulse = 0.58 + 0.42 * Math.sin(loopT * PI2 * 1.5)
        const lineG = ctx.createLinearGradient(0, 0, 0, h)
        lineG.addColorStop(0, 'transparent')
        lineG.addColorStop(0.18, `rgba(59,130,246,${0.38 * lPulse})`)
        lineG.addColorStop(0.50, `rgba(139,92,246,${0.50 * lPulse})`)
        lineG.addColorStop(0.82, `rgba(124,58,237,${0.38 * lPulse})`)
        lineG.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h)
        ctx.strokeStyle = lineG; ctx.lineWidth = 1.5; ctx.stroke()
      }

      // Left edges (strictly straight)
      ctx.lineWidth = 0.8
      for (const [ai, bi] of LE) {
        const pa = { x: LN[ai].rx * w, y: LN[ai].ry * h }
        const pb = { x: LN[bi].rx * w, y: LN[bi].ry * h }
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = 'rgba(37,99,235,0.32)'; ctx.stroke()
      }

      // Right edges (organic bezier curves)
      ctx.lineWidth = 0.7
      for (const [ai, bi] of RE) {
        const pa = { x: RN[ai].rx * w, y: RN[ai].ry * h }
        const pb = { x: RN[bi].rx * w, y: RN[bi].ry * h }
        const dx = pb.x - pa.x, dy = pb.y - pa.y
        const len = Math.sqrt(dx*dx + dy*dy) || 1
        const perp = len * 0.12
        const cpx = (pa.x+pb.x)/2 - dy/len*perp
        const cpy = (pa.y+pb.y)/2 + dx/len*perp
        const eg = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y)
        eg.addColorStop(0, RN[ai].col + '32'); eg.addColorStop(1, RN[bi].col + '22')
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.quadraticCurveTo(cpx, cpy, pb.x, pb.y)
        ctx.strokeStyle = eg; ctx.stroke()
      }

      // Feedback arcs (dashed)
      ctx.lineWidth = 0.8
      for (const fb of FB) {
        const pf = { x: RN[fb.from].rx * w, y: RN[fb.from].ry * h }
        const pt = { x: RN[fb.to].rx * w, y: RN[fb.to].ry * h }
        const cp = { x: fb.cpx * w, y: fb.cpy * h }
        ctx.beginPath(); ctx.moveTo(pf.x, pf.y); ctx.quadraticCurveTo(cp.x, cp.y, pt.x, pt.y)
        ctx.strokeStyle = 'rgba(196,181,253,0.22)'; ctx.setLineDash([3,5]); ctx.stroke(); ctx.setLineDash([])
      }

      // Left particles (linear interpolation along straight edges)
      for (const p of lP) {
        p.t += p.spd * dt
        if (p.t >= 1) { p.t = 0; p.trail = [] }
        const [ai, bi] = LE[p.edge]
        const x = lerp(LN[ai].rx * w, LN[bi].rx * w, p.t)
        const y = lerp(LN[ai].ry * h, LN[bi].ry * h, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 13) p.trail.shift()
        drawStream(p.trail, x, y, 96, 165, 250, 4.5)
      }

      // Right particles (bezier interpolation along curved edges)
      for (const p of rP) {
        p.t += p.spd * dt
        if (p.t >= 1) { p.t = 0; p.trail = [] }
        const [ai, bi] = RE[p.edge]
        const pa = { x: RN[ai].rx * w, y: RN[ai].ry * h }
        const pb = { x: RN[bi].rx * w, y: RN[bi].ry * h }
        const dx = pb.x - pa.x, dy = pb.y - pa.y
        const len = Math.sqrt(dx*dx + dy*dy) || 1
        const perp = len * 0.12
        const cp = { x: (pa.x+pb.x)/2 - dy/len*perp, y: (pa.y+pb.y)/2 + dx/len*perp }
        const pos = bezierPt(pa, cp, pb, p.t)
        p.trail.push({ x: pos.x, y: pos.y }); if (p.trail.length > 12) p.trail.shift()
        const [r2, g2, b2] = RN[ai].rgb
        drawStream(p.trail, pos.x, pos.y, r2, g2, b2, 4.5)
      }

      // Feedback arc particles (lavender)
      for (const p of fbP) {
        p.t += p.spd * dt
        if (p.t >= 1) { p.t = 0; p.trail = [] }
        const fb = FB[p.arc]
        const pf = { x: RN[fb.from].rx * w, y: RN[fb.from].ry * h }
        const pt = { x: RN[fb.to].rx * w, y: RN[fb.to].ry * h }
        const cp = { x: fb.cpx * w, y: fb.cpy * h }
        const pos = bezierPt(pf, cp, pt, p.t)
        p.trail.push({ x: pos.x, y: pos.y }); if (p.trail.length > 10) p.trail.shift()
        drawStream(p.trail, pos.x, pos.y, 196, 181, 253, 4)
      }

      // Draw LEFT nodes — rounded squares with crosshair
      for (const n of LN) {
        const x = n.rx * w, y = n.ry * h
        const pulse = 0.88 + 0.12 * Math.sin(loopT * PI2 * 2.5 + n.rx * 15)
        const s = n.r * 2 * pulse
        const cr = s * 0.28

        const og = ctx.createRadialGradient(x, y, 0, x, y, s * 2.2)
        og.addColorStop(0, 'rgba(37,99,235,0.20)'); og.addColorStop(1, 'transparent')
        ctx.fillStyle = og; ctx.beginPath(); ctx.arc(x, y, s * 2.2, 0, PI2); ctx.fill()

        roundedRect(x, y, s, cr)
        const ng = ctx.createLinearGradient(x - s/2, y - s/2, x + s/2, y + s/2)
        ng.addColorStop(0, 'rgba(96,165,250,0.82)'); ng.addColorStop(1, 'rgba(37,99,235,0.38)')
        ctx.fillStyle = ng; ctx.fill()
        ctx.strokeStyle = 'rgba(59,130,246,0.68)'; ctx.lineWidth = 0.8; ctx.stroke()

        ctx.strokeStyle = 'rgba(147,197,253,0.40)'; ctx.lineWidth = 0.55
        ctx.beginPath(); ctx.moveTo(x - s*0.28, y); ctx.lineTo(x + s*0.28, y); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(x, y - s*0.28); ctx.lineTo(x, y + s*0.28); ctx.stroke()
      }

      // Draw RIGHT nodes — circles with glow and orbital indicators
      for (const n of RN) {
        const x = n.rx * w, y = n.ry * h
        const pulse = 0.90 + 0.10 * Math.sin(loopT * PI2 * 2 + n.rx * 10)
        const r = n.r * pulse
        const [r2, g2, b2] = n.rgb

        if (n.hub) {
          for (let ring = 0; ring < 3; ring++) {
            const angle = loopT * PI2 * (ring % 2 === 0 ? 1 : -1.3) + ring * (PI2 / 3)
            const rr = n.r * (2.1 + ring * 0.75)
            ctx.beginPath(); ctx.arc(x, y, rr, angle, angle + Math.PI * 0.9)
            ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.44)`
            ctx.lineWidth = 1.0; ctx.stroke()
          }
        } else {
          // Single slow orbit arc — "thinking" indicator
          const angle = loopT * PI2 * 0.5 + n.rx * 6
          ctx.beginPath(); ctx.arc(x, y, n.r * 1.85, angle, angle + Math.PI * 0.55)
          ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.30)`
          ctx.lineWidth = 0.7; ctx.stroke()
        }

        const og = ctx.createRadialGradient(x, y, 0, x, y, r * 3.5)
        og.addColorStop(0, `rgba(${r2},${g2},${b2},0.28)`); og.addColorStop(1, 'transparent')
        ctx.fillStyle = og; ctx.beginPath(); ctx.arc(x, y, r * 3.5, 0, PI2); ctx.fill()

        const ng = ctx.createRadialGradient(x, y, 0, x, y, r)
        ng.addColorStop(0, n.col)
        ng.addColorStop(0.55, `rgba(${r2},${g2},${b2},0.85)`)
        ng.addColorStop(1, `rgba(${r2},${g2},${b2},0.10)`)
        ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(x, y, r, 0, PI2); ctx.fill()
        ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.58)`; ctx.lineWidth = 0.8; ctx.stroke()
      }

      // ── Labels ───────────────────────────────────────────────────────────────
      const lsz  = Math.max(9, Math.min(12, w * 0.019))
      const lszS = Math.max(7, Math.min(10, w * 0.015))
      ctx.textBaseline = 'middle'

      // Section headers
      ctx.font = `600 ${lsz}px Inter, sans-serif`
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(96,165,250,0.60)'
      ctx.fillText('Traditional Software', w * 0.035, h * 0.075)

      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(139,92,246,0.60)'
      ctx.fillText('AI Agents', w * 0.575, h * 0.075)

      // Left grid — row labels (far left, vertically centred on each row)
      ctx.font = `500 ${lszS}px Inter, sans-serif`
      ctx.textAlign = 'left'
      const rowLabels = [
        { ry: 0.25, label: 'Input',  col: 'rgba(96,165,250,0.45)'  },
        { ry: 0.50, label: 'Logic',  col: 'rgba(96,165,250,0.45)'  },
        { ry: 0.75, label: 'Output', col: 'rgba(96,165,250,0.45)'  },
      ]
      for (const rl of rowLabels) {
        ctx.fillStyle = rl.col
        ctx.fillText(rl.label, w * 0.007, rl.ry * h)
      }

      // Right cluster — per-node labels
      const nodeLabels = [
        { rx: 0.77, ry: 0.50, label: 'Agent Core', offX:  0,      offY: -26, align: 'center', col: 'rgba(167,139,250,0.75)' },
        { rx: 0.63, ry: 0.28, label: 'Planner',    offX: -2,      offY: -18, align: 'center', col: 'rgba(167,139,250,0.60)' },
        { rx: 0.88, ry: 0.28, label: 'Memory',     offX:  0,      offY: -18, align: 'center', col: 'rgba(167,139,250,0.60)' },
        { rx: 0.93, ry: 0.47, label: 'Tools',      offX:  16,     offY:   0, align: 'left',   col: 'rgba(167,139,250,0.55)' },
        { rx: 0.62, ry: 0.70, label: 'Executor',   offX: -2,      offY:  18, align: 'center', col: 'rgba(167,139,250,0.55)' },
        { rx: 0.88, ry: 0.70, label: 'Feedback',   offX:  0,      offY:  18, align: 'center', col: 'rgba(167,139,250,0.55)' },
      ]
      ctx.font = `500 ${lszS}px Inter, sans-serif`
      for (const nl of nodeLabels) {
        ctx.textAlign = nl.align
        ctx.fillStyle = nl.col
        ctx.fillText(nl.label, nl.rx * w + nl.offX, nl.ry * h + nl.offY)
      }

      // Horizontal scan sweep
      const sx = (loopT * w * 1.4) % (w * 1.2) - w * 0.1
      const sG = ctx.createLinearGradient(sx - 48, 0, sx + 48, 0)
      sG.addColorStop(0, 'transparent'); sG.addColorStop(0.5, 'rgba(139,92,246,0.042)'); sG.addColorStop(1, 'transparent')
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
      style={{ aspectRatio: '16/9', background: '#050810' }}
    />
  )
}
