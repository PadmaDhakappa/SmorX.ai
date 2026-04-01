import { Twitter, Linkedin, Github, Mail, ArrowUpRight, ArrowRight } from 'lucide-react'

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
    <footer className="relative overflow-hidden" style={{ background: 'radial-gradient(circle at 20% 20%, #0A0F1E 0%, #070B16 60%, #050812 100%)', borderTop: '1px solid rgba(255,255,255,0.04)' }} role="contentinfo">

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-10 items-start">

            {/* Brand */}
            <div className="lg:col-span-2 flex flex-col items-start">
              <div className="flex flex-col items-center w-full max-w-[260px]">
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="inline-block w-fit">
                  <img
                    src="/smorx-logo.png"
                    alt="SmorX.ai Logo"
                    className="h-24 sm:h-32 w-auto object-contain block"
                  />
                </a>
                <div className="flex justify-center gap-3 mt-4 w-full">
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section} className="flex flex-col items-start gap-3">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
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
