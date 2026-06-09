import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BrandName from './BrandName'

const FOOTER_LINKS = {
  Company: [
    { label: 'About SmorX', href: '#home', scroll: true },
    { label: 'Our Mission', href: '#home', scroll: true },
    { label: 'Careers', href: '#contact', scroll: true },
    { label: 'Blog', href: '#blog', scroll: true },
  ],
  Solutions: [
    { label: 'Agentic Workflows', href: '#services', scroll: true },
    { label: 'Multi-Agent Systems', href: '#services', scroll: true },
    { label: 'AI Control Plane', href: '#control-plane', scroll: true },
    { label: 'Agent Marketplace', href: '#agents', scroll: true },
    { label: 'Data Intelligence', href: '#services', scroll: true },
  ],
  Industries: [
    { label: 'Healthcare', href: '#industries', scroll: true },
    { label: 'Financial Services', href: '#industries', scroll: true },
    { label: 'Manufacturing', href: '#industries', scroll: true },
    { label: 'Retail & E-commerce', href: '#industries', scroll: true },
    { label: 'Logistics', href: '#industries', scroll: true },
    { label: 'SaaS', href: '#industries', scroll: true },
  ],
  Insights: [
    { label: 'Multi-Agent Systems', href: '/blog/multi-agent-systems', scroll: false },
    { label: 'Autonomous Workflows', href: '/blog/autonomous-workflows', scroll: false },
    { label: 'AI Control Planes', href: '/blog/ai-control-planes', scroll: false },
    { label: 'AI Agents vs Software', href: '/blog/agents-vs-software', scroll: false },
    { label: 'Secure AI Agents', href: '/blog/secure-agents', scroll: false },
  ],
}

const SOCIAL = [
  { icon: Twitter, label: 'Follow SmorX.ai on X (Twitter)', href: 'https://twitter.com/smorxai' },
  { icon: Linkedin, label: 'Connect with SmorX.ai on LinkedIn', href: 'https://www.linkedin.com/company/smorxai' },
  { icon: Github, label: 'SmorX.ai on GitHub', href: 'https://github.com/smorxai' },
  { icon: Mail, label: 'Email SmorX.ai', href: 'mailto:outreach@smorx.ai' },
]

export default function Footer() {
  const scrollTo = (href) => {
    if (href.startsWith('mailto')) { window.location.href = href; return }
    if (href === '#') return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer aria-label="Site footer" style={{ background: '#04070F', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Pre-footer CTA */}
      <div className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(59,130,246,0.04) 50%, rgba(6,182,212,0.04) 100%)' }}>
        <div className="bg-grid absolute inset-0 pointer-events-none opacity-30" />
        <div className="glow-spot-violet absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label mb-4 inline-block">Ready to build?</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.08] mb-4" style={{ letterSpacing: '-0.025em' }}>
              Your AI operating layer<br />
              <span className="gradient-text">starts here.</span>
            </h2>
            <p className="text-white/45 text-base max-w-xl mx-auto">
              Join 50+ enterprises that have transformed their operations with <BrandName /> AI systems. First agent live in 3 weeks.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="btn-primary px-8 py-3.5 text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Book a strategy call with SmorX.ai"
            >
              Book Strategy Call <ArrowRight size={16} />
            </motion.button>
            <motion.button
              onClick={() => scrollTo('#agents')}
              className="btn-outline px-8 py-3.5 text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Browse the AI agent marketplace"
            >
              Browse AI Agents
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" aria-label="SmorX.ai home" className="w-fit">
              <img
                src="/smorx-logo.png"
                alt="SmorX.ai — Enterprise AI Automation Platform"
                className="h-20 w-auto object-contain"
                width="160"
                height="80"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Autonomous AI systems, multi-agent workflows, and intelligent decision infrastructure for enterprise teams.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] transition-all duration-200 border border-white/[0.06] hover:border-white/15"
                >
                  <s.icon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="text-xs text-white/30">All systems operational</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <nav key={section} aria-label={`${section} links`} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">{section}</h3>
              <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                {links.map(link => (
                  <li key={link.label}>
                    {link.scroll ? (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-sm text-white/30 hover:text-white/70 transition-colors duration-150 text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-white/30 hover:text-white/70 transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">© 2025 <BrandName suffix=".ai" />. All rights reserved. Transforming Vision into Intelligent Systems.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <button key={t} className="text-xs text-white/20 hover:text-white/40 transition-colors">{t}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
