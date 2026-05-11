import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Zap, Shield, Activity, Users } from 'lucide-react'
import AnimatedGridBackground from '../components/ui/AnimatedGridBackground'
import CinematicBackground from '../components/visuals/CinematicBackground'
import BrandName from '../components/BrandName'

const METRICS = [
  { icon: Zap, label: '100+ AI Models Deployed', color: 'violet' },
  { icon: Shield, label: '99.9% Uptime SLA', color: 'cyan' },
  { icon: Activity, label: '50+ Enterprise Workflows', color: 'blue' },
  { icon: Users, label: '24/7 Intelligent Operations', color: 'violet' },
]

const WORDS = ['Autonomous', 'Intelligent', 'Agentic', 'Enterprise-Grade']

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false)
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setFade(true) }, 300)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: '#060A12' }}>
      {/* ── Cinematic animated background (replaces video) ── */}
      <CinematicBackground />

      {/* Overlay to darken canvas so text reads clearly */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(6,10,18,0.55) 0%, rgba(6,10,18,0.35) 40%, rgba(6,10,18,0.65) 100%)' }} />

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(6,10,18,0.6) 100%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex flex-col items-center text-center gap-8">

          {/* Label */}
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Next-Generation AI Infrastructure
          </motion.span>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] text-balance max-w-5xl"
            style={{ letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.3s', display: 'inline-block' }}
              className="gradient-text"
            >
              {WORDS[wordIdx]}
            </span>{' '}
            <span className="text-white">AI Systems</span>
            <br className="hidden sm:block" />
            <span style={{ fontSize: '0.78em', display: 'block', marginTop: '0.35em' }}>
              <span className="text-white">for the Next </span>
              <span className="gradient-text-cyan">Enterprise Era</span>
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-white/50 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <BrandName suffix=".ai" /> designs intelligent agents, workflow automation, and AI decision
            infrastructure that turn complex business operations into measurable outcomes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="btn-primary px-8 py-4 text-base rounded-xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Build My AI System
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              onClick={() => scrollTo('#services')}
              className="btn-outline px-8 py-4 text-base rounded-xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Solutions
            </motion.button>
          </motion.div>

          {/* Metric badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/[0.07] text-xs font-medium text-white/65 hover:border-violet-500/30 hover:text-white/80 transition-all duration-300"
              >
                <m.icon size={12} className={
                  m.color === 'cyan' ? 'text-cyan-400' : m.color === 'blue' ? 'text-blue-400' : 'text-violet-400'
                } />
                {m.label}
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#control-plane')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={15} />
      </motion.button>
    </section>
  )
}
