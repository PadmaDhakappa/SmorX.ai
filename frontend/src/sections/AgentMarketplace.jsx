import { motion } from 'framer-motion'
import { Mic, Server, TrendingUp, Heart, BarChart2, Shield, Check } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import VoiceAIAgent from '../components/visuals/VoiceAIAgent'
import SDLCPipeline from '../components/visuals/SDLCPipeline'
import WorkflowHologram from '../components/visuals/WorkflowHologram'

const AGENTS = [
  {
    icon: Mic,
    title: 'Voice AI Agent',
    desc: 'Automated voice interactions for lead qualification, customer support, and CRM updates.',
    color: '#7C3AED',
    Visual: VoiceAIAgent,
    workflows: ['Lead qualification calls', 'Automated voice outreach', 'CRM record updates', 'Conversation intelligence & transcription'],
  },
  {
    icon: Server,
    title: 'IT Operations Agent',
    desc: 'Autonomous IT monitoring, incident triage, and remediation without human intervention.',
    color: '#3B82F6',
    Visual: SDLCPipeline,
    workflows: ['Incident detection & triage', 'Auto-remediation workflows', 'Infrastructure health monitoring', 'Alert de-duplication & routing'],
  },
  {
    icon: TrendingUp,
    title: 'Sales Intelligence Agent',
    desc: 'AI agent that researches prospects, personalizes outreach, and forecasts pipeline health.',
    color: '#06B6D4',
    Visual: WorkflowHologram,
    workflows: ['Prospect research & scoring', 'Personalized email generation', 'Pipeline forecasting', 'Win/loss pattern analysis'],
  },
  {
    icon: Heart,
    title: 'Healthcare Support Agent',
    desc: 'Clinical workflow intelligence for patient intake, triage, and documentation automation.',
    color: '#F43F5E',
    Visual: null,
    workflows: ['Patient intake automation', 'Triage decision support', 'Clinical notes summarization', 'Appointment scheduling AI'],
  },
  {
    icon: BarChart2,
    title: 'Data Analyst Agent',
    desc: 'Natural-language analytics agent that queries, visualizes, and explains enterprise data.',
    color: '#A78BFA',
    Visual: null,
    workflows: ['NL-to-SQL query execution', 'Automated report generation', 'Anomaly detection alerts', 'Data quality monitoring'],
  },
  {
    icon: Shield,
    title: 'Security Monitoring Agent',
    desc: 'Continuous threat detection, incident response initiation, and compliance enforcement.',
    color: '#22D3EE',
    Visual: null,
    workflows: ['24/7 threat detection', 'Automated SIEM correlation', 'Compliance posture reporting', 'Incident response playbooks'],
  },
]

export default function AgentMarketplace() {
  return (
    <section id="agents" className="relative py-28 overflow-hidden" style={{ background: '#060A12' }}>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="glow-spot-violet absolute w-[600px] h-[600px] top-0 left-1/4 opacity-20" />
      <div className="glow-spot-cyan absolute w-[400px] h-[400px] bottom-0 right-1/4 opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Agent Marketplace"
          title='Pre-Built AI Agents for <span class="gradient-text">Enterprise Workflows</span>'
          subtitle="Deploy purpose-built agents in days, not months. Each agent is pre-trained on domain knowledge and integrates with your existing stack."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl overflow-hidden flex flex-col cursor-default"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Header: live visual or gradient fallback */}
              <div className="relative overflow-hidden flex-shrink-0">
                {agent.Visual ? (
                  <>
                    <agent.Visual className="w-full rounded-none" />
                    <div className="absolute top-2 left-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${agent.color}22`, border: `1px solid ${agent.color}45`, backdropFilter: 'blur(8px)' }}>
                        <agent.icon size={14} style={{ color: agent.color }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-36 relative">
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${agent.color}18, ${agent.color}06, transparent)` }} />
                    <div className="absolute inset-0 bg-grid-sm opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: `${agent.color}18`, border: `1px solid ${agent.color}35` }}>
                        <agent.icon size={24} style={{ color: agent.color }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="font-semibold text-white text-[15px] mb-1.5">{agent.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{agent.desc}</p>
                </div>

                <ul className="flex flex-col gap-2 flex-1">
                  {agent.workflows.map(w => (
                    <li key={w} className="flex items-start gap-2.5 text-xs text-white/50">
                      <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: agent.color }} />
                      {w}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-2 w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
                  style={{
                    background: `${agent.color}14`,
                    border: `1px solid ${agent.color}28`,
                    color: agent.color,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${agent.color}22`; e.currentTarget.style.borderColor = `${agent.color}50` }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${agent.color}14`; e.currentTarget.style.borderColor = `${agent.color}28` }}
                >
                  Deploy This Agent
                </button>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${agent.color}40` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
