import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { NAV_GROUPS } from '../data/navigation'
import { scrollToSection } from '../utils/scrollToSection'
import MegaMenu from './MegaMenu'

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openMobileGroup, setOpenMobileGroup] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape-to-close + click-outside-to-close for the desktop mega-menus
  useEffect(() => {
    if (!openDropdown) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        navRef.current?.querySelector(`button[aria-expanded="true"]`)?.focus()
      }
    }
    const onMouseDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [openDropdown])

  const closeAll = () => {
    setMobileOpen(false)
    setOpenDropdown(null)
    setOpenMobileGroup(null)
  }

  const handleNav = (href) => {
    closeAll()
    scrollToSection(href)
  }

  const goToHref = (href) => {
    closeAll()
    if (href.startsWith('/')) {
      navigate(href)
    } else {
      scrollToSection(href)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        role="banner"
      >
        <nav
          ref={navRef}
          aria-label="Main navigation"
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'glass-strong border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[var(--nav-height)]">
              {/* Logo — proper link to homepage. Sized to sit inside the nav row
                  (not overflow it) so it shares the same vertical center line as
                  the nav links and buttons. */}
              <Link
                to="/"
                aria-label="SmorX.ai — Enterprise AI Automation Platform — home"
                className="flex items-center flex-shrink-0"
              >
                <img
                  src="/smorx-logo.png"
                  alt="SmorX.ai logo"
                  className="h-14 w-auto object-contain"
                  width="195"
                  height="80"
                />
              </Link>

              {/* Right cluster: nav links + divider + buttons share one fixed
                  gap rhythm here, independent of the logo↔cluster gap (which
                  flexes with justify-between) — this is what keeps inter-item
                  spacing constant while still pinning the logo to the left. */}
              <div className="hidden lg:flex items-center gap-[var(--nav-cluster-gap)]">
                <ul className="flex items-center gap-[var(--nav-item-gap)] list-none m-0 p-0" role="list">
                  {NAV_GROUPS.map((group) => (
                    (group.items || group.groups) ? (
                      <MegaMenu
                        key={group.id}
                        group={group}
                        open={openDropdown === group.id}
                        onMouseEnter={() => setOpenDropdown(group.id)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onToggle={() => setOpenDropdown(openDropdown === group.id ? null : group.id)}
                        onNavigate={closeAll}
                      />
                    ) : (
                      <li key={group.id}>
                        <button
                          className="nav-trigger"
                          onClick={() => handleNav(group.href)}
                        >
                          {group.label}
                        </button>
                      </li>
                    )
                  ))}
                </ul>

                {/* Visual break between the nav-links cluster and the action buttons */}
                <div className="w-px h-5 bg-white/10 flex-shrink-0" aria-hidden="true" />

                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => handleNav('#contact')}
                    className="btn-outline text-sm px-4 py-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Book a strategy call"
                  >
                    Connect
                  </motion.button>
                  <motion.button
                    onClick={() => handleNav('#contact')}
                    className="btn-primary text-sm px-4 py-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Get started with SmorX.ai"
                  >
                    Begin
                  </motion.button>
                </div>
              </div>

              {/* Mobile/tablet hamburger — full row collapses here rather than
                  letting 9 items + 2 buttons shrink, wrap, or compress. */}
              <button
                className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.05] transition"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu — accordion */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 bottom-0 z-40 glass-solid border-b border-white/[0.06] overflow-y-auto"
          >
            <nav aria-label="Mobile navigation">
              <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1 list-none m-0 p-4">
                {NAV_GROUPS.map(group => (
                  <li key={group.id}>
                    {(group.items || group.groups) ? (
                      <>
                        <button
                          onClick={() => setOpenMobileGroup(openMobileGroup === group.id ? null : group.id)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition"
                          aria-expanded={openMobileGroup === group.id}
                        >
                          <span className="flex items-center gap-2">
                            <group.icon size={15} />
                            {group.label}
                          </span>
                          <ChevronDown size={14} className={`transition-transform duration-200 ${openMobileGroup === group.id ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {openMobileGroup === group.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              {group.groups ? (
                                group.groups.map(sub => (
                                  <div key={sub.heading} className="pl-4 pr-1 py-1">
                                    <div className="text-[10px] font-semibold text-white/50 uppercase tracking-wider px-4 mb-0.5">{sub.heading}</div>
                                    <ul className="flex flex-col gap-0.5 list-none m-0">
                                      {sub.items.map(item => (
                                        <li key={item.label}>
                                          <Link
                                            to={item.href}
                                            onClick={closeAll}
                                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/[0.05] transition"
                                          >
                                            {item.icon && <item.icon size={13} />}
                                            <span className="leading-snug">{item.label}</span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))
                              ) : (
                                <ul className="flex flex-col gap-0.5 pl-4 pr-1 py-1 list-none m-0">
                                  {group.items.map(item => (
                                    <li key={item.label}>
                                      {item.href.startsWith('/') ? (
                                        <Link
                                          to={item.href}
                                          onClick={closeAll}
                                          className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/[0.05] transition"
                                        >
                                          {item.icon && <item.icon size={13} />}
                                          <span className="leading-snug">{item.label}</span>
                                        </Link>
                                      ) : (
                                        <button
                                          onClick={() => handleNav(item.href)}
                                          className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/[0.05] transition"
                                        >
                                          {item.icon && <item.icon size={13} />}
                                          <span className="leading-snug">{item.label}</span>
                                        </button>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {group.featured && (
                                <button
                                  onClick={() => goToHref(group.featured.ctaHref)}
                                  className="btn-primary w-full justify-center text-xs mt-1 mb-2"
                                >
                                  {group.featured.ctaLabel}
                                </button>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button
                        onClick={() => handleNav(group.href)}
                        className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition"
                      >
                        <group.icon size={15} />
                        {group.label}
                      </button>
                    )}
                  </li>
                ))}
                <li className="pt-3 pb-1 flex flex-col gap-2">
                  <button onClick={() => handleNav('#contact')} className="btn-outline w-full justify-center">Connect</button>
                  <button onClick={() => handleNav('#contact')} className="btn-primary w-full justify-center">Begin</button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
