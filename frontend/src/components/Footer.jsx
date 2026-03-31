import { Zap, Twitter, Linkedin, Github, Mail, ArrowUpRight, ArrowRight } from 'lucide-react'
import LogoText from './LogoText'

const FOOTER_LINKS = {
  Company: [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
  Services: [
    { label: 'AI Automation', href: '#services' },
    { label: 'Machine Learning', href: '#services' },
    { label: 'AI Chatbots', href: '#services' },
    { label: 'Data Analytics', href: '#services' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

const SOCIALS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:outreach@smorx.ai' },
]

export default function Footer() {
  const handleNavClick = (e, href) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault()
      document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-[#080C15] overflow-hidden" role="contentinfo">

      {/* Pre-footer CTA */}
      <div className="relative border-t border-white/[0.06] overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-purple-400 mb-3">Ready to transform?</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-heading text-white mb-4">
            Start Building with AI Today
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Join 150+ innovative companies already accelerating their growth with SmorX.ai.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary px-7 py-3.5 group"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className="btn-outline px-7 py-3.5"
            >
              View Services
            </a>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-10">

            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 mb-4 w-fit">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple to-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <LogoText className="text-lg" />
              </a>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                Building the intelligent infrastructure of tomorrow, one model at a time.
              </p>
              <div className="flex items-center gap-2">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
                  {section}
                </h3>
                <ul className="space-y-3" role="list">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        onClick={(e) => handleNavClick(e, href)}
                        className="text-sm text-white/35 hover:text-white/80 transition-colors duration-200 flex items-center gap-1 group w-fit"
                      >
                        {label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs">
              © 2025 SmorX.ai. All rights reserved.
            </p>
            <p className="text-white/25 text-xs">
              Designed & built with precision
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
