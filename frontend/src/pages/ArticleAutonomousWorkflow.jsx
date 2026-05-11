import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import AutonomousWorkflow from '../components/visuals/AutonomousWorkflow'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    heading: 'The Automation Era Is Not Over. It Is Just Not Enough.',
    body: [
      `Over the past decade, enterprise automation delivered genuine value. Robotic process automation eliminated repetitive data entry. Scheduled jobs moved nightly reports without anyone staying late. Workflow tools stitched together forms, approvals, and notifications into reliable pipelines. The ROI was measurable, the implementation was understood, and the case was easy to make.`,
      `None of that is going away. But the organizations that have optimized their automation stack to within an inch of its life are now running into the same ceiling: automation can only do what you told it to do. When the input changes, the rule breaks. When the exception arrives, a human has to step in. When the process needs to adapt, the pipeline needs to be rebuilt.`,
      `The ceiling is not a technology problem. It is a design problem. Automation was designed for predictability. The work that remains, the work that still requires a human, is unpredictable almost by definition.`,
    ],
  },
  {
    heading: 'What Autonomy Actually Means',
    body: [
      `Autonomy is not smarter automation. The distinction is more fundamental than that.`,
      `Automation replaces tasks: discrete, well-defined units of work with clear inputs and outputs. Fill this field. Move this file. Send this email at 9am. These are instructions, and automation executes instructions reliably at scale.`,
      `Autonomy replaces processes: sequences of judgment calls, context-dependent decisions, and adaptive responses to variable inputs. Evaluate this vendor's risk profile given current market conditions. Draft a response to this customer complaint that accounts for their contract tier, previous support history, and our current capacity. Decide whether this invoice exception needs escalation or can be resolved within policy.`,
      `Processes cannot be specified in advance because they involve reasoning about context that was not known when the process was designed. That is why they still require humans. An autonomous system does not execute a specification; it reasons toward an outcome.`,
    ],
  },
  {
    heading: 'The Architectural Shift',
    body: [
      `The visual difference between an automation pipeline and an autonomous workflow is stark. A pipeline is linear: each step hands off to the next in a fixed sequence. Every node does exactly one thing. The path from start to finish is deterministic.`,
      `An autonomous workflow is a mesh. There is still an orchestrating layer that coordinates the overall process, but each node in the network can reason, branch, query other nodes, and loop back. When a procurement agent evaluates a supplier, it may pull from a risk database, check contract templates, verify compliance flags, consult a pricing agent, and then either proceed or escalate, depending on what it finds. That branching logic is not scripted. It emerges from the agent's reasoning about the specific situation.`,
      `The feedback arcs are the most important structural difference. In a pipeline, output flows forward and never returns. In an autonomous workflow, downstream nodes can signal upstream nodes when something changes. A fulfillment agent that detects a delay can trigger the customer communications agent to send a proactive update and simultaneously notify the finance agent to model the penalty exposure. No one wrote a rule for this specific sequence. The network reasoned to it.`,
    ],
  },
  {
    heading: 'What This Looks Like in Practice',
    body: [
      `Consider a finance close process. In an automated version, scheduled jobs pull data from source systems, run reconciliation scripts, flag exceptions to a spreadsheet, and email a report. A human reviews the exceptions and decides what to do. The automation handled the data movement; the judgment was outsourced to the human.`,
      `In an autonomous version, an orchestrating finance agent receives the close objective, dispatches sub-agents to pull and validate source data, runs reconciliation, and then reasons about each exception independently. A duplicate invoice gets resolved within policy and logged. A currency mismatch above threshold gets escalated with a draft memo explaining the discrepancy and recommending three resolution paths. The process adapted to the specific exceptions it encountered, not to a predetermined script.`,
      `The same pattern applies to customer success workflows, procurement reviews, IT incident response, and HR case management. In each case, the autonomous version does not just move faster; it handles variation that the automated version would have dropped into a human queue.`,
    ],
  },
  {
    heading: 'What Enterprise Teams Need to Understand',
    body: [
      `The transition from automation to autonomy is not an upgrade path. You cannot add an LLM to an existing automation stack and call it autonomous. The processes need to be redesigned, not patched.`,
      `The starting point is identifying where automation currently fails. Every manual exception queue is a signal. Every process that requires a human to interpret context before deciding is a candidate. These are not edge cases to be cleaned up; they are the core of what autonomous systems are built for.`,
      `The second requirement is instrumentation. Autonomous systems make judgment calls, and those calls need to be traceable. Not just for compliance, though that matters too. Traceability is how the system improves. When an agent makes a wrong call, the trace shows exactly what evidence it was working from and where the reasoning diverged from the correct outcome. That is the training signal for the next iteration.`,
      `The third requirement is honest escalation design. Autonomous workflows are not infallible. They need well-defined uncertainty thresholds and clean escalation paths to human reviewers. An autonomous system that fails silently is worse than an automation pipeline that fails loudly. The goal is not to remove humans from the loop entirely; it is to move humans to the decisions that actually require human judgment, and let the system handle everything else.`,
      `The architectural shift from automation to autonomy is not a future state to plan toward. For the enterprises building it now, it is the present competitive advantage. The question is not whether your workflows will become autonomous. It is whether you design that transition deliberately or discover it through the failures of systems that were not built for the work they are being asked to do.`,
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] } }),
}

export default function ArticleAutonomousWorkflow() {
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
            style={{ color: '#3B82F6' }}>
            <Tag size={10} /> Strategy
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-white/40">
            <Clock size={10} /> 5 min read
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="font-bold text-white leading-tight mb-5"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)' }}
        >
          From AI Automation to Autonomous Enterprise Workflows
        </motion.h1>

        {/* Lead */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="text-base leading-relaxed mb-12"
          style={{ color: 'rgba(255,255,255,0.52)', borderLeft: '2px solid #3B82F6', paddingLeft: '1.25rem' }}
        >
          Automation replaces tasks. Autonomy replaces processes. Here's the architectural shift enterprise
          teams need to understand.
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
            <AutonomousWorkflow className="w-full" style={{ aspectRatio: '16/7' }} />
          </div>
          <figcaption className="mt-3 px-4 sm:px-6 lg:px-16 text-[11px] text-white/30 text-center tracking-wide">
            Left: a rigid linear automation pipeline. Right: an autonomous mesh with reasoning nodes, adaptive branching, and feedback arcs that loop outcomes back into the process.
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
          style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.18)' }}
        >
          <p className="text-sm text-white/50 mb-4 leading-relaxed max-w-md mx-auto">
            Ready to move beyond automation and build workflows that reason?
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}
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
