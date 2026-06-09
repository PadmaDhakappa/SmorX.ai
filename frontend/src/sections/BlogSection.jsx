import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import MultiAgentOrgLayer from '../components/visuals/MultiAgentOrgLayer'
import AutonomousWorkflow from '../components/visuals/AutonomousWorkflow'
import ControlPlaneRise from '../components/visuals/ControlPlaneRise'
import AgentsVsSoftware from '../components/visuals/AgentsVsSoftware'
import SecureAgentNetwork from '../components/visuals/SecureAgentNetwork'
import AgentEconomics from '../components/visuals/AgentEconomics'

const POSTS = [
  {
    tag: 'Architecture',
    title: 'Why Multi-Agent Systems Are the New Business Operating Layer',
    excerpt: 'Single-model AI is table stakes. The companies pulling ahead are building coordinated agent networks that mirror human organizational structures.',
    readTime: '6 min read',
    color: '#7C3AED',
    image: null,
  },
  {
    tag: 'Strategy',
    title: 'From AI Automation to Autonomous Enterprise Workflows',
    excerpt: 'Automation replaces tasks. Autonomy replaces processes. Here\'s the architectural shift enterprise teams need to understand.',
    readTime: '5 min read',
    color: '#3B82F6',
    image: null,
  },
  {
    tag: 'Platform',
    title: 'The Rise of AI Control Planes in Modern Companies',
    excerpt: 'Just as cloud infrastructure needed control planes, AI deployments need orchestration layers. This is what they look like at scale.',
    readTime: '7 min read',
    color: '#06B6D4',
    image: null,
  },
  {
    tag: 'Comparison',
    title: 'AI Agents vs Traditional Software: What Changes in 2026',
    excerpt: 'Traditional software executes instructions. AI agents reason, adapt, and improve. The implications for software architecture are profound.',
    readTime: '8 min read',
    color: '#A78BFA',
    image: null,
  },
  {
    tag: 'Security',
    title: 'Building Secure and Governed Agentic AI Systems',
    excerpt: 'Autonomous systems without guardrails are liabilities, not assets. Here\'s how to build enterprise AI with trust baked in.',
    readTime: '9 min read',
    color: '#22D3EE',
    image: null,
  },
  {
    tag: 'Economics',
    title: 'The Economics of AI Agents: Cost, ROI, and Scale',
    excerpt: 'Most AI ROI calculations are incomplete. A practical framework for measuring the true value of autonomous agent deployments.',
    readTime: '6 min read',
    color: '#60A5FA',
    image: null,
  },
]

const POST_LINKS = [
  '/blog/multi-agent-systems',
  '/blog/autonomous-workflows',
  '/blog/ai-control-planes',
  '/blog/agents-vs-software',
  '/blog/secure-agents',
  '/blog/agent-economics',
]

export default function BlogSection() {
  return (
    <section id="blog" className="relative py-28 overflow-hidden" style={{ background: '#060A12' }}>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="glow-spot-violet absolute w-[500px] h-[500px] top-0 right-1/4 opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Insights"
          title='Insights That Define the <span class="gradient-text">Future of Enterprise AI</span>'
          subtitle="Perspectives from practitioners building real AI systems — not theoretical takes, but lessons from the field."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Image / gradient header */}
              <div className="h-40 relative overflow-hidden flex-shrink-0">
                {i === 0 ? (
                  <MultiAgentOrgLayer className="w-full h-full" />
                ) : i === 1 ? (
                  <AutonomousWorkflow className="w-full h-full" />
                ) : i === 2 ? (
                  <ControlPlaneRise className="w-full h-full" />
                ) : i === 3 ? (
                  <AgentsVsSoftware className="w-full h-full" />
                ) : i === 4 ? (
                  <SecureAgentNetwork className="w-full h-full" />
                ) : i === 5 ? (
                  <AgentEconomics className="w-full h-full" />
                ) : (
                  <>
                    <div className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${post.color}18, ${post.color}06, transparent)` }} />
                    <div className="absolute inset-0 bg-grid-sm opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: `${post.color}14`, border: `1px solid ${post.color}28` }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: post.color }} />
                      </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 100%, ${post.color}15, transparent 70%)` }} />
                  </>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="tag-chip">{post.tag}</span>
                  <div className="flex items-center gap-1 text-[10px] text-white/30">
                    <Clock size={10} />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="font-semibold text-white text-sm leading-snug">
                  {POST_LINKS[i] ? (
                    <Link to={POST_LINKS[i]} className="hover:text-violet-300 transition-colors duration-200">
                      {post.title}
                    </Link>
                  ) : post.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed flex-1">{post.excerpt}</p>

                {POST_LINKS[i] ? (
                  <Link
                    to={POST_LINKS[i]}
                    className="flex items-center gap-1 text-xs font-medium transition-colors duration-200 mt-1"
                    style={{ color: `${post.color}70` }}
                    onMouseEnter={e => e.currentTarget.style.color = post.color}
                    onMouseLeave={e => e.currentTarget.style.color = `${post.color}70`}
                    aria-label={`Read article: ${post.title}`}
                  >
                    Read Article <ArrowUpRight size={12} aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-medium mt-1" style={{ color: `${post.color}70` }}>
                    Read Article <ArrowUpRight size={12} aria-hidden="true" />
                  </span>
                )}
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${post.color}35` }} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
