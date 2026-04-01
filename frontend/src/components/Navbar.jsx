import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Sector Expertise', href: '#industries' },
  { label: 'Projects', href: '#success-stories' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'industries', 'success-stories', 'trust', 'contact']
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const reversed = [...sections].reverse()
      for (const id of reversed) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0B0F1A]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl shadow-black/30'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center shrink-0"
              aria-label="SmorX.ai — Home"
            >
              <img
                src="/smorx-logo.png"
                alt="SmorX.ai Logo"
                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </a>

            {/* Desktop Links */}
            <ul className="hidden lg:flex items-center" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.replace('#', '')
                const isActive = activeSection === id
                return (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={`relative px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-white/50 hover:text-white/90'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-gradient-to-r from-primary to-purple rounded-full" />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="hidden sm:inline-flex btn-accent text-xs py-2 px-4 gap-1.5"
                aria-label="Get Started"
              >
                Get Started
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </a>
              <button
                className="lg:hidden p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className="bg-[#0B0F1A]/98 backdrop-blur-2xl border-b border-white/[0.06] px-4 pt-1 pb-5 space-y-0.5">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="flex items-center px-3 py-3.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.06] transition-all min-h-[44px]"
              >
                {label}
              </a>
            ))}
            <div className="pt-3 px-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-accent w-full text-sm justify-center py-3"
              >
                Get Started
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
