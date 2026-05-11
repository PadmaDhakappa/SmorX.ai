import { motion } from 'framer-motion'
import { GitBranch, Bot, BarChart3, Code2, Shield, Sparkles, ArrowRight } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'

const SERVICES = [
  {
    icon: GitBranch,
    title: 'Agentic Workflow Automation',
    desc: 'Replace fragile manual processes with intelligent agents that orchestrate end-to-end enterprise workflows autonomously.',
    color: '#7C3AED',
    tags: ['Process Automation', 'Multi-step Orchestration'],
  },
  {
    icon: Bot,
    title: 'Multi-Agent Systems',
    desc: 'Deploy networks of specialized AI agents that collaborate, delegate, and adapt in real time to achieve complex business goals.',
    color: '#3B82F6',
    tags: ['Agent Coordination', 'Autonomous Decisions'],
  },
  {
    icon: BarChart3,
    title: 'AI-Powered Data Intelligence',
    desc: 'Transform raw enterprise data into predictive insights, automated reporting, and actionable intelligence at scale.',
    color: '#06B6D4',
    tags: ['Predictive Analytics', 'Real-time Insights'],
  },
  {
    icon: Code2,
    title: 'Autonomous Software Engineering',
    desc: 'AI-native SDLC acceleration — from code generation and testing to deployment and monitoring without manual bottlenecks.',
    color: '#A78BFA',
    tags: ['Code Generation', 'AI-Driven QA'],
  },
  {
    icon: Shield,
    title: 'AI Security & Monitoring',
    desc: 'Continuous threat detection, anomaly recognition, and compliance enforcement powered by real-time AI models.',
    color: '#22D3EE',
    tags: ['Threat Detection', 'Compliance Automation'],
  },
  {
    icon: Sparkles,
    title: 'Custom AI Agent Development',
    desc: 'Bespoke agents built to your domain, data, and operational context — deployed in days, not quarters.',
    color: '#60A5FA',
    tags: ['Domain-Specific', 'Rapid Deployment'],
  },
]

export default function AIServicesSection() {
  return (
    <section id="services" className="relative py-28 overflow-hidden" style={{ background: '#060A12' }}>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="glow-spot-blue absolute w-[500px] h-[500px] bottom-0 right-0 opacity-20" />
      <div className="glow-spot-violet absolute w-[400px] h-[400px] top-1/2 left-0 opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Enterprise AI Capabilities"
          title='Capabilities Built for <span class="gradient-text">Real Enterprise Complexity</span>'
          subtitle="Every capability is designed to integrate with your existing systems, scale with your operations, and deliver measurable ROI."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl p-6 flex flex-col gap-4 cursor-default overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 20% 20%, ${svc.color}0D 0%, transparent 70%)` }} />

              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${svc.color}40` }} />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${svc.color}14`, border: `1px solid ${svc.color}28` }}>
                <svc.icon size={20} style={{ color: svc.color }} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-white text-[15px] leading-snug">{svc.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{svc.desc}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {svc.tags.map(tag => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>

              {/* Explore link */}
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-1 text-xs font-medium transition-all duration-200 mt-1"
                style={{ color: `${svc.color}99` }}
                onMouseEnter={e => e.currentTarget.style.color = svc.color}
                onMouseLeave={e => e.currentTarget.style.color = `${svc.color}99`}
              >
                Explore <ArrowRight size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
