import { motion } from 'framer-motion'
import { Heart, Factory, Building2, Truck, Zap, Car, Shield, ShoppingBag } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'

const INDUSTRIES = [
  {
    icon: Heart,
    label: 'Healthcare',
    color: '#F43F5E',
    useCases: ['Clinical workflow automation', 'Diagnostic AI support', 'Patient triage intelligence'],
    metric: '35% faster diagnosis',
  },
  {
    icon: Factory,
    label: 'Manufacturing',
    color: '#8B5CF6',
    useCases: ['Predictive maintenance', 'Quality control AI', 'Supply chain optimization'],
    metric: '40% fewer defects',
  },
  {
    icon: Building2,
    label: 'Financial Services',
    color: '#3B82F6',
    useCases: ['Risk scoring AI', 'Fraud detection', 'Portfolio intelligence'],
    metric: '30% loss reduction',
  },
  {
    icon: Truck,
    label: 'Logistics',
    color: '#06B6D4',
    useCases: ['Route optimization AI', 'Fleet intelligence', 'Delivery prediction'],
    metric: '28% cost reduction',
  },
  {
    icon: Zap,
    label: 'Energy & Utilities',
    color: '#EAB308',
    useCases: ['Grid anomaly detection', 'Consumption forecasting', 'Outage prevention AI'],
    metric: '32% energy savings',
  },
  {
    icon: Car,
    label: 'Automotive',
    color: '#10B981',
    useCases: ['Autonomous systems AI', 'Quality inspection', 'Dealer intelligence'],
    metric: '99.9% safety uptime',
  },
  {
    icon: Shield,
    label: 'Security & Defense',
    color: '#818CF8', // indigo-400 — base #6366F1 fails 4.5:1 as badge text on dark bg (4.35:1)
    useCases: ['Threat intelligence AI', 'Surveillance automation', 'Anomaly detection'],
    metric: '60% faster response',
  },
  {
    icon: ShoppingBag,
    label: 'Retail',
    color: '#5B9DFF',
    useCases: ['Demand forecasting AI', 'Inventory optimization', 'Personalized recommendations'],
    metric: '25% fewer stockouts',
  },
]

export default function IndustriesSection() {
  return (
    <section id="industries" className="relative py-28 overflow-hidden" style={{ background: '#080D18' }}>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="glow-spot-cyan absolute w-[500px] h-[500px] top-0 right-0 opacity-20" />
      <div className="glow-spot-violet absolute w-[500px] h-[500px] bottom-0 left-0 opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Industry Focus"
          title='AI Systems Built for <span class="gradient-text">Industry-Specific Complexity</span>'
          subtitle="We understand that every industry has unique data, compliance, and operational constraints. Our AI systems are built for yours."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl p-5 flex flex-col gap-4 overflow-hidden cursor-default"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.055)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 0% 0%, ${ind.color}10 0%, transparent 70%)` }} />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${ind.color}35` }} />

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${ind.color}14`, border: `1px solid ${ind.color}28` }}>
                <ind.icon size={18} style={{ color: ind.color }} />
              </div>

              {/* Label */}
              <h3 className="font-semibold text-white text-sm">{ind.label}</h3>

              {/* Use cases */}
              <ul className="flex flex-col gap-1.5">
                {ind.useCases.map(uc => (
                  <li key={uc} className="flex items-start gap-2 text-xs text-white/55">
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: ind.color, opacity: 0.6 }} />
                    {uc}
                  </li>
                ))}
              </ul>

              {/* Metric */}
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                  style={{ background: `${ind.color}12`, border: `1px solid ${ind.color}25`, color: ind.color, boxShadow: `0 0 14px ${ind.color}30` }}>
                  ↑ {ind.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
