import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Platform', href: '#control-plane' },
  { label: 'Solutions', href: '#services', sub: [
    { label: 'Agentic Workflows', href: '#services' },
    { label: 'Multi-Agent Systems', href: '#services' },
    { label: 'AI Data Intelligence', href: '#services' },
    { label: 'Agent Marketplace', href: '#agents' },
  ]},
  { label: 'Industries', href: '#industries' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Insights', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    setOpenDropdown(null)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center"
            >
              <img
                src="/smorx-logo.png"
                alt="SmorX.ai"
                className="h-20 w-auto object-contain"
              />
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                    onClick={() => handleNav(link.href)}
                    onMouseEnter={() => link.sub && setOpenDropdown(link.label)}
                    onMouseLeave={() => link.sub && setOpenDropdown(null)}
                  >
                    {link.label}
                    {link.sub && (
                      <ChevronDown size={12} className={`transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {link.sub && openDropdown === link.label && (
                    <div
                      className="absolute top-full left-0 mt-1 w-52 glass-strong rounded-xl border border-white/[0.08] shadow-card py-1.5 z-50"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.sub.map(s => (
                        <button
                          key={s.label}
                          onClick={() => handleNav(s.href)}
                          className="w-full text-left px-4 py-2.5 text-sm text-white/55 hover:text-white hover:bg-white/[0.04] transition-all duration-150"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                onClick={() => handleNav('#contact')}
                className="btn-outline text-sm px-4 py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Book a Call
              </motion.button>
              <motion.button
                onClick={() => handleNav('#contact')}
                className="btn-primary text-sm px-4 py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.05] transition"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-white/[0.06]"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/[0.05] transition"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 pb-1 flex flex-col gap-2">
                <button onClick={() => handleNav('#contact')} className="btn-outline w-full justify-center">Book a Call</button>
                <button onClick={() => handleNav('#contact')} className="btn-primary w-full justify-center">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
