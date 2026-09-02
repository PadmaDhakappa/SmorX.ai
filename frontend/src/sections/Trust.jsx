import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import BrandName from '../components/BrandName'

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Chief Technology Officer',
    company: 'FinTech Scale-up',
    quote: <><BrandName /> deployed a fraud detection agent that reduced our false positives by 73% within the first month. The speed of delivery was unlike any vendor engagement we&apos;ve had.</>,
    metric: '87% faster detection',
    metricColor: '#A78BFA', // violet-bright — base #7C3AED fails 4.5:1 as text on dark bg (3.48:1)
    initials: 'SC',
    gradient: 'from-violet-500 to-blue-500',
    stars: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'VP of Engineering',
    company: 'Enterprise SaaS',
    quote: <>We replaced a 12-person support tier with a <BrandName /> multi-agent system. Customer satisfaction tripled. The agents handle edge cases our old chatbot couldn&apos;t touch.</>,
    metric: '3× satisfaction increase',
    metricColor: '#06B6D4',
    initials: 'MW',
    gradient: 'from-cyan-500 to-blue-600',
    stars: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Head of Data Science',
    company: 'Retail Enterprise',
    quote: <>The AI data intelligence layer <BrandName /> built processes 50M records daily and surfaces actionable insights before my team even starts their day. Game-changing operational leverage.</>,
    metric: '50M records/day',
    metricColor: '#3B82F6',
    initials: 'PP',
    gradient: 'from-blue-500 to-violet-500',
    stars: 5,
  },
]

export default function Trust() {
  return (
    <section id="trust" className="relative py-28 overflow-hidden" style={{ background: '#0B1020' }}>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="glow-spot-violet absolute w-[600px] h-[600px] top-0 left-0 opacity-15" />
      <div className="glow-spot-cyan absolute w-[500px] h-[500px] bottom-0 right-0 opacity-12" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Testimonials"
          title='Trusted by Teams <span class="gradient-text">Building the Future</span>'
          subtitle="What the people actually deploying these systems say — no marketing language, just outcomes."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl p-6 flex flex-col gap-5 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Quote watermark */}
              <Quote size={40} className="absolute top-4 right-4 opacity-[0.04] text-white" />

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} size={13} fill="#EAB308" color="#EAB308" />
                ))}
              </div>

              {/* Metric badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit"
                style={{ background: `${t.metricColor}12`, border: `1px solid ${t.metricColor}28`, color: t.metricColor, boxShadow: `0 0 14px ${t.metricColor}30` }}>
                ↑ {t.metric}
              </span>

              {/* Quote */}
              <p className="text-sm text-white/55 leading-relaxed flex-1 italic">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${t.gradient} flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/50">{t.role}, {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass rounded-2xl px-8 py-4 flex items-center gap-6 border border-white/[0.07]">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#EAB308" color="#EAB308" />)}
              <span className="ml-1.5 text-white font-semibold text-sm">4.9</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-white/55 text-sm">Rated by 50+ enterprise teams</span>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-white/55 text-sm">Avg. deployment: 7 weeks</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
