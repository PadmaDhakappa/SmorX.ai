import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingDown, TrendingUp, Clock, MessageSquare, DollarSign } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import { COLORS } from '../theme/colors'

const METRICS = [
  { icon: TrendingDown, value: 35, suffix: '%', label: 'Reduce Operational Costs', sublabel: 'average across enterprise deployments', color: '#7C3AED' },
  { icon: TrendingUp, value: 40, suffix: '%', label: 'Improve Workforce Productivity', sublabel: 'through intelligent automation', color: '#3B82F6' },
  { icon: Clock, value: 7, suffix: ' Wks', label: 'Go Live Timeline', sublabel: 'from scoping to production', color: '#06B6D4' },
  { icon: MessageSquare, value: 60, suffix: '%', label: 'Faster Customer Response', sublabel: 'with AI-first support workflows', color: '#A78BFA' },
  { icon: DollarSign, value: 50, suffix: '%', label: 'Increase Revenue Opportunities', sublabel: 'through intelligent recommendations', color: '#22D3EE' },
]

const TIMELINE = [
  { week: 'Week 0', label: 'AI Opportunity Mapping', desc: 'We audit your processes, data, and tech stack to identify highest-ROI automation targets.' },
  { week: 'Week 3', label: 'MVP Agent Deployment', desc: 'First working agents deployed in your environment — real tasks, real data, measurable output.' },
  { week: 'Week 7', label: 'Production Launch', desc: 'Full system live, monitored, and optimized. Your team is trained. Governance is in place.' },
]

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function ImpactSection() {
  return (
    <section id="impact" className="relative py-28 overflow-hidden" style={{ background: '#0B1020' }}>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="glow-spot-violet absolute w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Measurable Impact"
          title='Measurable Business Impact with <span style="background:linear-gradient(to right,#3B82F6,#A855F7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">S</span><span style="color:#E5E7EB">mor</span><span style="background:linear-gradient(to right,#3B82F6,#A855F7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">X</span><span class="gradient-text"> AI Systems</span>'
          subtitle="Every deployment is tied to business outcomes. These are real numbers from real enterprise deployments."
          className="mb-16"
        />

        {/* Metric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-6 flex flex-col gap-3 text-center"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${m.color}0C 0%, rgba(255,255,255,0.025) 100%)`,
                border: `1px solid ${m.color}25`,
              }}
            >
              <div className="mx-auto w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${m.color}14`, border: `1px solid ${m.color}28` }}>
                <m.icon size={18} style={{ color: m.color }} />
              </div>
              <div
                className="text-3xl lg:text-4xl font-bold"
                style={{ color: COLORS.cyanLight, textShadow: `0 0 24px ${COLORS.cyanLight}59` }}
              >
                up to <CountUp target={m.value} suffix={m.suffix} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white leading-snug">{m.label}</div>
                <div className="text-xs text-white/50 mt-1">{m.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div id="impact-timeline" className="relative">
          <div className="text-center mb-10">
            <span className="section-label">Deployment Timeline</span>
          </div>

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-0">
            {/* Connector line */}
            <div className="hidden lg:block absolute left-0 right-0 top-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(6,182,212,0.4), transparent)' }} />

            {TIMELINE.map((step, i) => (
              <motion.div
                key={step.week}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex-1 flex flex-col items-center text-center gap-4 px-6 py-2"
              >
                {/* Node */}
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: i === 2 ? 'linear-gradient(135deg,#3B82F6,#7C3AED)' : 'rgba(124,58,237,0.15)',
                    border: `2px solid ${i === 2 ? 'transparent' : 'rgba(124,58,237,0.35)'}`,
                    boxShadow: i === 2 ? '0 0 30px rgba(124,58,237,0.4)' : 'none',
                  }}>
                  <span className="text-sm font-bold text-white">{step.week.split(' ')[1]}</span>
                </div>

                <div>
                  <div className="text-xs font-semibold text-white/55 mb-1">{step.week}</div>
                  <div className="font-semibold text-white text-sm mb-2">{step.label}</div>
                  <p className="text-xs text-white/55 leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
