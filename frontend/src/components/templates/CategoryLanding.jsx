import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import SEO from '../SEO'
import SectionHeader from '../ui/SectionHeader'

const CONTACT_SCROLL = () => setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 100)

// Tailwind's JIT scanner needs each utility class to appear as a complete,
// literal string in source — a template-interpolated `lg:grid-cols-${n}`
// would silently fail to generate. This lookup keeps the full class names
// present as text so the grid column count can still be data-driven.
const LG_COLS = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

function ItemCard({ item, basePath, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl p-6 flex flex-col gap-4 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${item.color}0D 0%, transparent 70%)` }} />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${item.color}40` }} />

      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${item.color}14`, border: `1px solid ${item.color}28` }}>
        <item.icon size={20} style={{ color: item.color }} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-white text-[15px] leading-snug">{item.label}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{item.gridDesc}</p>
      </div>

      <Link
        to={`${basePath}/${item.slug}`}
        className="flex items-center gap-1 text-xs font-medium hover:underline mt-auto"
        style={{ color: item.color }}
      >
        Learn More <ArrowRight size={12} />
      </Link>
    </motion.div>
  )
}

// Generic landing page for a nav "space" — hero, optional intro stat row,
// and item-card grids grouped under one or more headings. Shared by
// Platform, Capabilities, Solutions by Industry, Agent Marketplace,
// Results, and Hire Talent (SaaS keeps its own, built first / bespoke).
export default function CategoryLanding({
  seoTitle, seoDescription, canonical,
  eyebrow, headline, subhead,
  introStats,
  groups, // [{ heading, items, cols }]
  basePath,
  spaceLabel,
}) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#060A12', minHeight: '100vh' }}>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: spaceLabel, path: canonical },
        ]}
      />
      <Navbar />
      <main id="main-content">
        <section className="relative pt-40 pb-16 overflow-hidden" style={{ background: '#060A12' }}>
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
          <div className="glow-spot-violet absolute w-[600px] h-[600px] top-0 left-1/4 opacity-20" />
          <div className="glow-spot-cyan absolute w-[400px] h-[400px] bottom-0 right-1/4 opacity-15" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
            <span className="section-label">{eyebrow}</span>
            <h1 className="section-heading text-white" dangerouslySetInnerHTML={{ __html: headline }} />
            <p className="section-subheading">{subhead}</p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link to="/#contact" onClick={CONTACT_SCROLL} className="btn-primary px-8 py-3.5 text-sm">
                Discuss Your AI System <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => document.querySelector('#category-items')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline px-8 py-3.5 text-sm"
              >
                Browse All Categories <ArrowDown size={16} />
              </button>
            </div>

            {introStats && introStats.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {introStats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="metric-badge"
                  >
                    <s.icon size={12} />
                    {s.label}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div id="category-items" className="scroll-mt-20">
          {groups.map((group, gi) => (
            <section
              key={group.heading || gi}
              className="relative py-16 overflow-hidden"
              style={{ background: gi % 2 === 0 ? '#0B1020' : '#080D18' }}
            >
              <div className="bg-grid absolute inset-0 pointer-events-none opacity-30" />
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {group.heading && (
                  <SectionHeader label={group.heading} title={group.title || group.heading} align="left" className="mb-10" />
                )}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${LG_COLS[group.cols || 3]} gap-5`}>
                  {group.items.map((item, i) => (
                    <ItemCard key={item.slug} item={item} basePath={basePath} index={i} />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="relative py-24 overflow-hidden" style={{ background: '#060A12' }}>
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
          <div className="glow-spot-violet absolute w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" />
          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center flex flex-col items-center gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.08]" style={{ letterSpacing: '-0.025em' }}>
              Don't see what you need?
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              Tell us about your workflow and we'll map it to the right agents, capabilities, or team.
            </p>
            <Link to="/#contact" onClick={CONTACT_SCROLL} className="btn-primary px-8 py-3.5 text-sm">
              Talk to Us <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
