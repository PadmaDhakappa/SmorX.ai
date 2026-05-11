import { useEffect, useRef } from 'react'

const PI2 = Math.PI * 2
const lerp = (a, b, t) => a + (b - a) * t

export default function ControlPlaneRise({ className = '' }) {
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

    // === TIER 0: Control Plane ===
    const CP = [
      { rx:0.50, ry:0.17, r:20, col:'#06B6D4', rgb:[6,182,212],  hub:true },
      { rx:0.31, ry:0.21, r:11, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.69, ry:0.21, r:11, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.16, ry:0.26, r: 8, col:'#0EA5E9', rgb:[14,165,233]  },
      { rx:0.84, ry:0.26, r: 8, col:'#0EA5E9', rgb:[14,165,233]  },
    ]
    const CPE = [[0,1],[0,2],[1,2],[1,3],[2,4]]

    // === TIER 1: Orchestration ===
    const OT = [
      { rx:0.27, ry:0.42, r:10, col:'#22D3EE', rgb:[34,211,238]  },
      { rx:0.41, ry:0.42, r: 9, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.59, ry:0.42, r: 9, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.73, ry:0.42, r:10, col:'#22D3EE', rgb:[34,211,238]  },
    ]
    const OTE = [[0,1],[1,2],[2,3]] // intra-tier mesh
    const CPOT = [
      [0,0],[0,1],[0,2],[0,3],
      [1,0],[1,1],[2,2],[2,3],[3,0],[4,3],
    ]

    // === TIER 2: Service Mesh ===
    const SM = [
      { rx:0.11, ry:0.61, r: 7, col:'#0EA5E9', rgb:[14,165,233]  },
      { rx:0.24, ry:0.61, r: 8, col:'#22D3EE', rgb:[34,211,238]  },
      { rx:0.36, ry:0.61, r: 7, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.50, ry:0.61, r: 8, col:'#06B6D4', rgb:[6,182,212]   },
      { rx:0.64, ry:0.61, r: 7, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.76, ry:0.61, r: 8, col:'#22D3EE', rgb:[34,211,238]  },
      { rx:0.89, ry:0.61, r: 7, col:'#0EA5E9', rgb:[14,165,233]  },
    ]
    const SME = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]
    const OTSM = [
      [0,0],[0,1],[0,2],
      [1,2],[1,3],
      [2,3],[2,4],
      [3,4],[3,5],[3,6],
    ]

    // === TIER 3: Infrastructure ===
    const IT = [
      { rx:0.06, ry:0.80, r: 5, col:'#2563EB', rgb:[37,99,235]   },
      { rx:0.16, ry:0.80, r: 5, col:'#2563EB', rgb:[37,99,235]   },
      { rx:0.26, ry:0.80, r: 6, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.37, ry:0.80, r: 5, col:'#2563EB', rgb:[37,99,235]   },
      { rx:0.46, ry:0.80, r: 6, col:'#0EA5E9', rgb:[14,165,233]  },
      { rx:0.54, ry:0.80, r: 6, col:'#0EA5E9', rgb:[14,165,233]  },
      { rx:0.63, ry:0.80, r: 5, col:'#2563EB', rgb:[37,99,235]   },
      { rx:0.74, ry:0.80, r: 6, col:'#3B82F6', rgb:[59,130,246]  },
      { rx:0.84, ry:0.80, r: 5, col:'#2563EB', rgb:[37,99,235]   },
      { rx:0.94, ry:0.80, r: 5, col:'#2563EB', rgb:[37,99,235]   },
    ]
    const SMIT = [
      [0,0],[0,1],
      [1,1],[1,2],
      [2,2],[2,3],
      [3,3],[3,4],[3,5],
      [4,5],[4,6],
      [5,6],[5,7],
      [6,7],[6,8],[6,9],
    ]

    // === PARTICLES ===
    const mkEdgeParticles = (edges, count, baseSpd) =>
      Array.from({ length: count }, (_, i) => ({
        edge: i % edges.length,
        t: Math.random(),
        spd: baseSpd + Math.random() * 0.0003,
        trail: [],
      }))

    const cpotP = mkEdgeParticles(CPOT, CPOT.length + 6, 0.00048)
    const otsmP = mkEdgeParticles(OTSM, OTSM.length + 5, 0.00053)
    const smitP = mkEdgeParticles(SMIT, SMIT.length + 7, 0.00058)
    // Upward feedback (telemetry, violet)
    const upP = mkEdgeParticles(SMIT, 8, 0.00032)

    const GLOWS = [
      { rx:0.50, ry:0.17, col:[6,182,212],   r:0.22, a:0.20, ph:0.0 },
      { rx:0.50, ry:0.50, col:[29,78,216],   r:0.32, a:0.07, ph:0.5 },
      { rx:0.27, ry:0.42, col:[34,211,238],  r:0.10, a:0.10, ph:0.2 },
      { rx:0.73, ry:0.42, col:[34,211,238],  r:0.10, a:0.10, ph:0.7 },
      { rx:0.50, ry:0.61, col:[14,165,233],  r:0.13, a:0.08, ph:0.4 },
    ]

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

    function drawEdges(edges, fromTier, toTier, alpha0, alpha1) {
      for (const [ai, bi] of edges) {
        const pa = np(fromTier[ai], W(), H()), pb = np(toTier[bi], W(), H())
        const eg = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y)
        eg.addColorStop(0, fromTier[ai].col + alpha0)
        eg.addColorStop(1, toTier[bi].col + alpha1)
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = eg; ctx.stroke()
      }
    }

    function drawNode(n, r, loopT, phase, glowMult = 1) {
      const { x, y } = np(n, W(), H())
      const pulse = 0.88 + 0.12 * Math.sin(loopT * PI2 * 2 + phase)
      const nr = r * pulse
      const [r2, g2, b2] = n.rgb

      if (n.hub) {
        for (let ring = 0; ring < 3; ring++) {
          const angle = loopT * PI2 * (ring % 2 === 0 ? 0.8 : -1.1) + ring * (PI2 / 3)
          const rr = r * (2.2 + ring * 0.8)
          ctx.beginPath(); ctx.arc(x, y, rr, angle, angle + Math.PI * 0.85)
          ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.42)`
          ctx.lineWidth = 1.0; ctx.stroke()
        }
      }

      const og = ctx.createRadialGradient(x, y, 0, x, y, nr * 3.2)
      og.addColorStop(0, `rgba(${r2},${g2},${b2},${0.28 * glowMult})`)
      og.addColorStop(1, 'transparent')
      ctx.fillStyle = og; ctx.beginPath(); ctx.arc(x, y, nr * 3.2, 0, PI2); ctx.fill()

      const ng = ctx.createRadialGradient(x, y, 0, x, y, nr)
      ng.addColorStop(0, n.col)
      ng.addColorStop(0.55, `rgba(${r2},${g2},${b2},0.82)`)
      ng.addColorStop(1, `rgba(${r2},${g2},${b2},0.10)`)
      ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(x, y, nr, 0, PI2); ctx.fill()
      ctx.strokeStyle = `rgba(${r2},${g2},${b2},0.50)`
      ctx.lineWidth = 0.8; ctx.stroke()
    }

    function advanceParticles(particles, edgeDef, fromTier, toTier, dt, r, g, b, sz, reversed = false) {
      for (const p of particles) {
        p.t += p.spd * dt
        if (p.t >= 1) { p.t = 0; p.trail = [] }
        const [ai, bi] = edgeDef[p.edge]
        const pa = np(reversed ? toTier[bi] : fromTier[ai], W(), H())
        const pb = np(reversed ? fromTier[ai] : toTier[bi], W(), H())
        const x = lerp(pa.x, pb.x, p.t), y = lerp(pa.y, pb.y, p.t)
        p.trail.push({ x, y }); if (p.trail.length > 13) p.trail.shift()
        const srcNode = reversed ? toTier[bi] : fromTier[ai]
        const pr = r ?? srcNode.rgb[0], pg2 = g ?? srcNode.rgb[1], pb2 = b ?? srcNode.rgb[2]
        drawStream(p.trail, x, y, pr, pg2, pb2, sz)
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

      // Deep navy background with vertical depth
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, '#020509')
      bg.addColorStop(0.35, '#03060E')
      bg.addColorStop(1, '#060A14')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h)

      // Control plane platform glow — wide horizontal ellipse
      {
        const cpY = CP[0].ry * h
        const pulse = 0.68 + 0.32 * Math.sin(loopT * PI2 * 1.8)
        const pg = ctx.createRadialGradient(w/2, cpY, 0, w/2, cpY, w * 0.56)
        pg.addColorStop(0, `rgba(6,182,212,${0.12 * pulse})`)
        pg.addColorStop(0.45, `rgba(59,130,246,${0.06 * pulse})`)
        pg.addColorStop(1, 'transparent')
        ctx.fillStyle = pg; ctx.fillRect(0, 0, w, h)

        // Glowing platform bar
        const barG = ctx.createLinearGradient(0, cpY, w, cpY)
        barG.addColorStop(0, 'transparent')
        barG.addColorStop(0.12, `rgba(6,182,212,${0.22 * pulse})`)
        barG.addColorStop(0.50, `rgba(6,182,212,${0.30 * pulse})`)
        barG.addColorStop(0.88, `rgba(6,182,212,${0.22 * pulse})`)
        barG.addColorStop(1, 'transparent')
        ctx.fillStyle = barG; ctx.fillRect(0, cpY - 1, w, 2)

        // Ellipse ring outline
        ctx.beginPath()
        ctx.ellipse(w/2, cpY, w * 0.47, h * 0.065, 0, 0, PI2)
        ctx.strokeStyle = `rgba(6,182,212,${0.14 * pulse})`
        ctx.lineWidth = 0.8; ctx.stroke()

        // Vertical light beam from control plane hub downward
        const bG = ctx.createLinearGradient(w/2, cpY, w/2, h)
        bG.addColorStop(0, `rgba(6,182,212,${0.14 * pulse})`)
        bG.addColorStop(0.45, `rgba(6,182,212,${0.05 * pulse})`)
        bG.addColorStop(1, 'transparent')
        ctx.fillStyle = bG; ctx.fillRect(w/2 - 2, cpY, 4, h - cpY)
      }

      // Ambient glows
      for (const g of GLOWS) {
        const pulse = 0.75 + 0.25 * Math.sin(loopT * PI2 * 2 + g.ph * PI2)
        const gg = ctx.createRadialGradient(g.rx*w, g.ry*h, 0, g.rx*w, g.ry*h, g.r*w)
        const [r2, g2, b2] = g.col
        gg.addColorStop(0, `rgba(${r2},${g2},${b2},${g.a * pulse})`); gg.addColorStop(1, 'transparent')
        ctx.fillStyle = gg; ctx.fillRect(0, 0, w, h)
      }

      // CP internal edges
      ctx.lineWidth = 0.8
      drawEdges(CPE, CP, CP, '35', '28')

      // CP → OT
      ctx.lineWidth = 0.7
      drawEdges(CPOT, CP, OT, '30', '22')

      // OT intra-tier
      ctx.lineWidth = 0.6
      drawEdges(OTE, OT, OT, '28', '22')

      // OT → SM
      ctx.lineWidth = 0.6
      drawEdges(OTSM, OT, SM, '25', '1C')

      // SM intra-tier
      ctx.lineWidth = 0.5
      drawEdges(SME, SM, SM, '22', '1A')

      // SM → IT
      ctx.lineWidth = 0.5
      drawEdges(SMIT, SM, IT, '1E', '16')

      // CP → OT downward command particles (cyan)
      advanceParticles(cpotP, CPOT, CP, OT, dt, null, null, null, 5.5)

      // OT → SM command particles
      advanceParticles(otsmP, OTSM, OT, SM, dt, null, null, null, 4.5)

      // SM → IT deployment particles
      advanceParticles(smitP, SMIT, SM, IT, dt, null, null, null, 4)

      // Upward telemetry (IT → SM, violet)
      advanceParticles(upP, SMIT, SM, IT, dt, 124, 58, 237, 3.5, true)

      // Draw all nodes — order matters for correct z-layering (bottom to top)
      // Infrastructure (smallest, dimmest)
      ctx.lineWidth = 0.6
      for (const n of IT) drawNode(n, n.r, loopT, n.rx * 20, 0.55)

      // Service mesh
      ctx.lineWidth = 0.7
      for (const n of SM) drawNode(n, n.r, loopT, n.rx * 15, 0.72)

      // Orchestration
      ctx.lineWidth = 0.8
      for (const n of OT) drawNode(n, n.r, loopT, n.rx * 12, 0.88)

      // Control plane (top, brightest)
      ctx.lineWidth = 0.8
      for (const n of CP) drawNode(n, n.r, loopT, n.rx * 10, 1.0)

      // Tier labels — right-aligned, each pinned to its tier's y-position
      const labelSz = Math.max(9, Math.min(12, w * 0.018))
      ctx.font = `500 ${labelSz}px Inter, sans-serif`
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      const TIER_LABELS = [
        { label: 'Control Plane',  ry: 0.17, col: 'rgba(6,182,212,0.65)'  },
        { label: 'Orchestration',  ry: 0.42, col: 'rgba(34,211,238,0.55)' },
        { label: 'Service Mesh',   ry: 0.61, col: 'rgba(59,130,246,0.50)' },
        { label: 'Infrastructure', ry: 0.80, col: 'rgba(37,99,235,0.45)'  },
      ]
      for (const tl of TIER_LABELS) {
        const ty = tl.ry * h
        const lx = w * 0.975
        // Tick line
        ctx.beginPath()
        ctx.moveTo(lx - ctx.measureText(tl.label).width - 8, ty)
        ctx.lineTo(lx - ctx.measureText(tl.label).width - 14, ty)
        ctx.strokeStyle = tl.col
        ctx.lineWidth = 0.8
        ctx.stroke()
        // Text
        ctx.fillStyle = tl.col
        ctx.fillText(tl.label, lx, ty)
      }

      // Scan sweep
      const sx = (loopT * w * 1.5) % (w * 1.3) - w * 0.15
      const sG = ctx.createLinearGradient(sx - 50, 0, sx + 50, 0)
      sG.addColorStop(0, 'transparent'); sG.addColorStop(0.5, 'rgba(6,182,212,0.04)'); sG.addColorStop(1, 'transparent')
      ctx.fillStyle = sG; ctx.fillRect(0, 0, w, h)

      // Vignette
      const vg = ctx.createRadialGradient(w/2, h/2, h * 0.14, w/2, h/2, h * 0.96)
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
      style={{ aspectRatio: '16/9', background: '#020509' }}
    />
  )
}
