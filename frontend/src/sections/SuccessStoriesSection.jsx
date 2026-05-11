import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Factory, Heart, Building2, ShoppingBag, ArrowUpRight } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import ManufacturingAI from '../components/visuals/ManufacturingAI'
import HealthcareAI from '../components/visuals/HealthcareAI'
import FinancialRisk from '../components/visuals/FinancialRisk'
import EcommerceAI from '../components/visuals/EcommerceAI'

const STORIES = [
  {
    icon: Factory,
    industry: 'Manufacturing',
    title: 'Smart Manufacturing Intelligence',
    problem: 'Manual quality checks and fragmented production data slowed decision-making across 14 plants.',
    solution: 'AI quality-control system with anomaly detection and predictive maintenance across the full production chain.',
    metrics: [
      { value: '40%', label: 'Fewer Defects' },
      { value: '25%', label: 'Production Efficiency' },
      { value: '30%', label: 'Faster Issue Detection' },
    ],
    Visual: ManufacturingAI,
    color: '#8B5CF6',
  },
  {
    icon: Heart,
    industry: 'Healthcare',
    title: 'Healthcare Diagnostic Automation',
    problem: 'Delayed diagnosis workflows and high manual review burden reduced care quality and physician throughput.',
    solution: 'AI diagnostic support system with structured triage, clinical insights, and automated documentation.',
    metrics: [
      { value: '35%', label: 'Accuracy Improvement' },
      { value: '60%', label: 'Faster Diagnosis' },
      { value: '50%', label: 'Workload Reduction' },
    ],
    Visual: HealthcareAI,
    color: '#F43F5E',
  },
  {
    icon: Building2,
    industry: 'Financial Services',
    title: 'Financial Risk Intelligence',
    problem: 'Manual risk scoring created approval delays and introduced inconsistency across lending and portfolio teams.',
    solution: 'Predictive AI models for real-time risk analysis, anomaly detection, and regulatory reporting automation.',
    metrics: [
      { value: '30%', label: 'Loss Reduction' },
      { value: '2.4×', label: 'Portfolio Performance' },
      { value: '50M', label: 'Records Processed Daily' },
    ],
    Visual: FinancialRisk,
    color: '#3B82F6',
  },
  {
    icon: ShoppingBag,
    industry: 'Multi-Agent Platform',
    title: 'E-commerce Personalization Engine',
    problem: 'Low conversion rates and inconsistent customer experiences across channels impacted growth.',
    solution: 'Multi-agent recommendation and customer intelligence network delivering real-time personalization at scale.',
    metrics: [
      { value: '55%', label: 'Conversion Increase' },
      { value: '40%', label: 'Customer Satisfaction' },
      { value: '3×', label: 'Repeat Engagement' },
    ],
    Visual: EcommerceAI,
    color: '#F97316',
  },
]

export default function SuccessStoriesSection() {
  return (
    <section id="case-studies" className="relative py-28 overflow-hidden" style={{ background: '#080D18' }}>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="glow-spot-blue absolute w-[600px] h-[600px] top-0 right-0 opacity-20" />
      <div className="glow-spot-violet absolute w-[600px] h-[600px] bottom-0 left-0 opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Case Studies"
          title='Real-World AI <span class="gradient-text">Transformation Stories</span>'
          subtitle="Four industries. Four teams. One common outcome — measurable, documented business impact within weeks of deployment."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {STORIES.map((story, i) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden flex flex-col cursor-default"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Animated visual header */}
              <div className="relative overflow-hidden flex-shrink-0">
                <story.Visual className="w-full rounded-none" />
                {/* Industry label overlay */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg glass border border-white/[0.08]">
                    <story.icon size={12} style={{ color: story.color }} />
                    <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">{story.industry}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-5 flex-1">
                <h3 className="font-bold text-white text-base leading-snug">{story.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">Problem</div>
                    <p className="text-xs text-white/50 leading-relaxed">{story.problem}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">Solution</div>
                    <p className="text-xs text-white/50 leading-relaxed">{story.solution}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mt-auto">
                  {story.metrics.map(m => (
                    <div key={m.label} className="rounded-xl p-3 text-center"
                      style={{ background: `${story.color}0C`, border: `1px solid ${story.color}20` }}>
                      <div className="text-xl font-bold mb-0.5" style={{ color: story.color }}>{m.value}</div>
                      <div className="text-[10px] text-white/35 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 mt-1"
                  style={{ color: `${story.color}80` }}
                  onMouseEnter={e => e.currentTarget.style.color = story.color}
                  onMouseLeave={e => e.currentTarget.style.color = `${story.color}80`}
                >
                  Get a similar outcome <ArrowUpRight size={12} />
                </button>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${story.color}40` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
