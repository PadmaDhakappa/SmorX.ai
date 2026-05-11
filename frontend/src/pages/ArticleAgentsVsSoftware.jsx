import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import AgentsVsSoftware from '../components/visuals/AgentsVsSoftware'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    heading: 'What Traditional Software Actually Is',
    body: [
      `Traditional software is a deterministic machine. Given the same inputs under the same conditions, it produces the same outputs every time. This is not a limitation; it is the design. Software engineers have spent seventy years building systems around this property because determinism is what makes software testable, auditable, and trustworthy in production.`,
      `The architecture reflects this. A traditional application takes inputs, passes them through a defined processing layer governed by explicit rules, and produces outputs. The logic layer does not interpret; it executes. If a rule is missing, the behavior is undefined. If an input falls outside the expected range, the system either errors or returns a wrong answer silently. The code does exactly what it was told to do, no more and no less.`,
      `At its best, this is a feature. A payroll system that calculates salaries differently depending on context would be a compliance nightmare. A database that interprets queries rather than executing them would be unpredictable and dangerous. Determinism is the right property for systems where correctness means exactness.`,
    ],
  },
  {
    heading: 'What AI Agents Actually Are',
    body: [
      `AI agents are reasoning systems. They do not execute a specification; they interpret a goal and determine how to pursue it given current context. The same agent given the same objective on two different days may produce different outputs because the context has changed, and the agent's response to context is part of its design, not a bug.`,
      `The architecture is fundamentally different. At the center sits a reasoning core: the model that interprets inputs, maintains context, and decides what to do next. Around it are specialized components: a planner that decomposes goals into steps, a memory system that provides relevant context from past interactions, a tools layer that connects the agent to external systems, and an executor that carries out decisions. Feedback arcs return the results of actions back to the reasoning core, closing the loop and enabling the agent to adapt its approach based on what it observes.`,
      `The critical distinction is that none of these components are hard-coded to a specific sequence. The agent decides at runtime which tools to call, in what order, and whether to revise its plan based on intermediate results. Two agents given the same task may take completely different paths and arrive at the same correct answer.`,
    ],
  },
  {
    heading: 'The Five Architectural Differences',
    body: [
      `The contrast between a rigid processing grid and an adaptive reasoning cluster maps to five concrete architectural differences that every engineering team needs to understand before building with agents.`,
      `First: state management. Traditional software maintains state in databases and caches that are explicitly read and written by application code. Agents maintain working memory that evolves during task execution, long-term memory that persists across sessions, and shared context that can be accessed by other agents in the same network. These are different storage semantics with different consistency requirements.`,
      `Second: control flow. In traditional software, control flow is determined at compile time by the developer. In agent systems, control flow is determined at runtime by the agent's reasoning. An agent can decide to call a tool it was not explicitly instructed to call if doing so advances the goal. This makes agent behavior harder to predict and harder to test exhaustively.`,
      `Third: failure modes. Traditional software fails loudly and specifically. An unhandled exception, a null pointer, a constraint violation: these are precise signals that point to the exact location of the problem. Agents fail softly and ambiguously. An agent that produces a plausible but wrong answer is harder to detect than an application that throws a stack trace. Monitoring for agent correctness requires different instrumentation than monitoring for application uptime.`,
      `Fourth: improvement cycles. Traditional software improves through code changes deployed by engineers. Agents improve through a combination of code changes, prompt refinement, retrieval context updates, and fine-tuning on logged interactions. The improvement loop for agents is shorter but involves more stakeholders and more variables.`,
      `Fifth: composability. Traditional software components are composed through APIs with typed contracts. Agent components are composed through natural language interfaces and structured handoffs that are more flexible but harder to validate. The seams between agents are more powerful and more fragile than the seams between traditional services.`,
    ],
  },
  {
    heading: 'What Changes in How You Build',
    body: [
      `Building agent systems requires different design instincts from building traditional software. The most important shift is from specifying behavior to shaping behavior. You cannot enumerate every case an agent will encounter; you define the boundaries within which it is allowed to reason and the outcomes you expect it to optimize for.`,
      `Testing changes fundamentally. Unit tests for a specific input-output pair are insufficient when the agent may take multiple valid paths to the correct answer. Evaluation requires test sets of scenarios assessed against quality criteria, not just exact-match assertions. You are testing reasoning quality, not execution accuracy.`,
      `Prompt engineering becomes an architectural concern, not just a tuning detail. The instructions given to an agent define its behavior as concretely as code defines the behavior of a traditional service. Changes to prompts need to go through the same review and rollback infrastructure as changes to application code.`,
    ],
  },
  {
    heading: 'What Changes in How You Operate',
    body: [
      `Observability for agent systems requires a different mental model. Traditional application monitoring answers: is the service up? Is it slow? Are errors increasing? Agent monitoring must answer: is the agent making correct decisions? Is its reasoning consistent with policy? Is it using the tools it should be using, in the right order, for the right reasons?`,
      `This requires decision traces, not just request logs. Every agent action should be logged with the evidence it was based on, the alternatives it considered, and the confidence level of its conclusion. This trace is simultaneously the audit log for compliance, the debugging tool for engineers, and the training data for the next model iteration.`,
      `Rollback is also different. Rolling back a traditional deployment means reverting to the previous code version. Rolling back an agent deployment may mean reverting the model, reverting the prompt, reverting the retrieval index, or reverting tool configurations, and these components can change on different schedules. Version control for agent systems needs to track all of these dimensions simultaneously.`,
    ],
  },
  {
    heading: 'The Integration Reality',
    body: [
      `No enterprise in 2026 is running purely on traditional software or purely on AI agents. The realistic picture is a hybrid: agent networks layered on top of existing deterministic systems, with the agents handling the reasoning-intensive, variable-input work and the traditional software handling the exact, rule-governed work.`,
      `The seam between these two worlds is the most important design decision in modern enterprise architecture. Agents that call traditional APIs need to handle the strict type contracts those APIs enforce. Traditional systems that receive outputs from agents need to validate those outputs before passing them downstream, because agent outputs cannot be assumed to be correctly typed or within expected ranges.`,
      `The companies building this integration well are treating the boundary as a first-class architectural concern, not an afterthought. They define explicit handoff protocols, validate agent outputs at system boundaries, and build monitoring that tracks the behavior of both the deterministic and reasoning layers independently. The goal is not to replace traditional software with agents; it is to put each type of system in the role it is best suited for, and to make the boundary between them reliable enough that the whole system can be trusted.`,
      `That is what changes in 2026. Not the elimination of traditional software, but the emergence of a new architectural pattern that combines the predictability of deterministic systems with the adaptability of reasoning agents. Engineering teams that understand the differences between these two models, and design for both deliberately, are the ones building the systems that will matter.`,
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] } }),
}

export default function ArticleAgentsVsSoftware() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#060A12', minHeight: '100vh' }}>
      <Navbar />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-28 pt-32">

        {/* Back link */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/40 hover:text-white/80 transition-colors duration-200"
          >
            <ArrowLeft size={13} /> Back to home
          </Link>
        </motion.div>

        {/* Meta */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="flex items-center gap-4 mb-5"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: '#A78BFA' }}>
            <Tag size={10} /> Comparison
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-white/40">
            <Clock size={10} /> 8 min read
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="font-bold text-white leading-tight mb-5"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)' }}
        >
          AI Agents vs Traditional Software: What Changes in 2026
        </motion.h1>

        {/* Lead */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="text-base leading-relaxed mb-12"
          style={{ color: 'rgba(255,255,255,0.52)', borderLeft: '2px solid #A78BFA', paddingLeft: '1.25rem' }}
        >
          Traditional software executes instructions. AI agents reason, adapt, and improve.
          The implications for software architecture are profound.
        </motion.p>

        <motion.hr
          variants={fadeUp} initial="hidden" animate="show" custom={4}
          className="mb-12" style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        />

        {/* Sections 0–1 */}
        {SECTIONS.slice(0, 2).map((s, si) => (
          <motion.div
            key={s.heading}
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={si}
            className="mb-12"
          >
            <h2 className="font-semibold text-white mb-4" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)' }}>
              {s.heading}
            </h2>
            {s.body.map((para, pi) => (
              <p key={pi} className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.52)' }}>
                {para}
              </p>
            ))}
          </motion.div>
        ))}

        {/* Visual */}
        <motion.figure
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
          className="mb-12 -mx-4 sm:-mx-6 lg:-mx-16"
        >
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <AgentsVsSoftware className="w-full" style={{ aspectRatio: '16/7' }} />
          </div>
          <figcaption className="mt-3 px-4 sm:px-6 lg:px-16 text-[11px] text-white/30 text-center tracking-wide">
            Left: traditional software as a deterministic grid — fixed inputs, rigid logic, defined outputs. Right: an AI agent cluster with a reasoning core, planner, memory, tools, executor, and feedback arcs that close the loop.
          </figcaption>
        </motion.figure>

        {/* Sections 2–end */}
        {SECTIONS.slice(2).map((s, si) => (
          <motion.div
            key={s.heading}
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={si}
            className="mb-12"
          >
            <h2 className="font-semibold text-white mb-4" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)' }}>
              {s.heading}
            </h2>
            {s.body.map((para, pi) => (
              <p key={pi} className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.52)' }}>
                {para}
              </p>
            ))}
          </motion.div>
        ))}

        {/* Footer CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
          className="rounded-2xl p-8 mt-8 text-center"
          style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.18)' }}
        >
          <p className="text-sm text-white/50 mb-4 leading-relaxed max-w-md mx-auto">
            Ready to architect systems that reason, not just execute?
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
            onClick={() => setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
          >
            Talk to us
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
