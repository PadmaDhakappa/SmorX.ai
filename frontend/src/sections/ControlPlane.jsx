import { motion } from 'framer-motion'
import { GitBranch, Database, Shield, Activity, Plug, Brain } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import ControlPlaneDiagram from '../components/visuals/ControlPlaneDiagram'

const NODES = [
  {
    icon: Brain,
    title: 'Orchestrator Core',
    desc: 'Central intelligence layer coordinating all agent decisions and task delegation.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.1)',
    border: 'rgba(124,58,237,0.3)',
    glow: 'rgba(124,58,237,0.15)',
    position: 'center',
  },
  {
    icon: GitBranch,
    title: 'Specialized Agents',
    desc: 'Purpose-built AI agents executing domain-specific tasks autonomously.',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
    glow: 'rgba(59,130,246,0.1)',
    position: 'top-left',
  },
  {
    icon: Database,
    title: 'Data Layer',
    desc: 'Unified data access across structured, unstructured, and streaming sources.',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.25)',
    glow: 'rgba(6,182,212,0.1)',
    position: 'top-right',
  },
  {
    icon: Shield,
    title: 'Governance Layer',
    desc: 'Policy enforcement, compliance guardrails, and audit logging built in.',
    color: '#A78BFA',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.25)',
    glow: 'rgba(167,139,250,0.1)',
    position: 'bottom-left',
  },
  {
    icon: Plug,
    title: 'API Integrations',
    desc: 'Connect enterprise systems, SaaS tools, and data pipelines seamlessly.',
    color: '#22D3EE',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.25)',
    glow: 'rgba(34,211,238,0.1)',
    position: 'bottom-right',
  },
  {
    icon: Activity,
    title: 'Monitoring & Observability',
    desc: 'Real-time telemetry, drift detection, and performance analytics across all agents.',
    color: '#60A5FA',
    bg: 'rgba(96,165,250,0.08)',
    border: 'rgba(96,165,250,0.25)',
    glow: 'rgba(96,165,250,0.1)',
    position: 'bottom-center',
  },
]

function NodeCard({ node, index }) {
  const isCentral = node.position === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative rounded-2xl p-6 flex flex-col gap-3 cursor-default"
      style={{
        background: node.bg,
        border: `1px solid ${node.border}`,
        boxShadow: isCentral ? `0 0 60px ${node.glow}, 0 8px 32px rgba(0,0,0,0.3)` : `0 4px 24px rgba(0,0,0,0.25)`,
      }}
    >
      {isCentral && (
        <div className="absolute inset-0 rounded-2xl animate-glow-pulse pointer-events-none" />
      )}

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${node.color}18`, border: `1px solid ${node.color}30` }}>
          <node.icon size={18} style={{ color: node.color }} />
        </div>
        <h3 className="font-semibold text-white text-sm">{node.title}</h3>
      </div>

      <p className="text-xs text-white/45 leading-relaxed">{node.desc}</p>

      {/* Animated connection dot */}
      <div className="flex items-center gap-1.5 mt-auto">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: node.color }} />
        <span className="text-[10px] font-medium" style={{ color: node.color }}>Connected</span>
      </div>
    </motion.div>
  )
}

export default function ControlPlane() {
  return (
    <section id="control-plane" className="relative py-28 overflow-hidden" style={{ background: '#080D18' }}>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-60" />
      <div className="glow-spot-violet absolute w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="AI Control Plane"
          title='<span style="background:linear-gradient(to right,#3B82F6,#A855F7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">S</span><span style="color:#E5E7EB">mor</span><span style="background:linear-gradient(to right,#3B82F6,#A855F7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">X</span> <span class="gradient-text">AI Control Plane</span>'
          subtitle="Coordinate agents, workflows, data, governance, and enterprise systems through one intelligent orchestration layer."
          className="mb-16"
        />

        {/* Live animated diagram */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <ControlPlaneDiagram className="w-full shadow-[0_0_60px_rgba(124,58,237,0.12)]" />
        </motion.div>

        {/* Node capability cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {NODES.map((node, i) => (
            <NodeCard key={node.title} node={node} index={i} />
          ))}
        </div>

        {/* Architecture label */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="glass rounded-2xl px-8 py-5 flex flex-wrap justify-center gap-6 border border-white/[0.06]">
            {['Multi-Model Routing', 'Real-Time Orchestration', 'Audit-Ready', 'Zero-Trust Security', 'Scalable to Billions'].map((tag, i) => (
              <div key={tag} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: ['#7C3AED','#3B82F6','#06B6D4','#A78BFA','#60A5FA'][i] }} />
                <span className="text-xs text-white/50 font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
