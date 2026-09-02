import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, TrendingUp } from 'lucide-react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import SEO from '../SEO'

const CONTACT_SCROLL = () => setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 100)

// Generic per-item detail page, shared by every catalog space (Platform,
// Capabilities, Solutions by Industry, Agent Marketplace, Results, Hire
// Talent, SaaS). Mirrors the structure of the original /saas/:slug page.
export default function CategoryDetail({ items, basePath, spaceLabel, spaceHref, seoSuffix = '' }) {
  const { slug } = useParams()
  const item = items.find(i => i.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!item) return <Navigate to={spaceHref} replace />

  const { label, icon: Icon, color, tagline, overview, bullets, useCase, impactStat, ctaLabel } = item

  const otherItems = items.filter(i => i.slug !== item.slug).slice(0, 3)

  return (
    <div style={{ background: '#060A12', minHeight: '100vh' }}>
      <SEO
        title={`${label}${seoSuffix ? ` — ${seoSuffix}` : ''}`}
        description={item.gridDesc || overview}
        canonical={`${basePath}/${item.slug}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: spaceLabel, path: spaceHref },
          { name: label, path: `${basePath}/${item.slug}` },
        ]}
      />
      <Navbar />
      <main id="main-content">
        {/* Header */}
        <section className="relative pt-40 pb-16 overflow-hidden" style={{ background: '#060A12' }}>
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
          <div className="glow-spot-violet absolute w-[600px] h-[600px] top-0 left-1/4 opacity-20" style={{ background: `radial-gradient(circle, ${color}26 0%, transparent 70%)` }} />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-5">
            <Link to={spaceHref} className="text-xs font-medium text-white/55 hover:text-white/80 transition-colors duration-200">
              ← Back to {spaceLabel}
            </Link>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
              <Icon size={26} style={{ color }} />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1]" style={{ letterSpacing: '-0.025em' }}>
              {label}
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">{tagline}</p>
          </div>
        </section>

        {/* Overview + feature bullets */}
        <section className="relative py-16 overflow-hidden" style={{ background: '#0B1020' }}>
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-30" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg text-white/60 leading-relaxed"
            >
              {overview}
            </motion.p>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Where the Agent Layer Fits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bullets.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{ background: `${color}0C`, border: `1px solid ${color}20` }}
                  >
                    <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color }} />
                    <span className="text-sm text-white/70 leading-relaxed">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use case + impact */}
        <section className="relative py-16 overflow-hidden" style={{ background: '#080D18' }}>
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-30" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">Use Case</div>
              <p className="text-sm text-white/70 leading-relaxed">{useCase}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: `${color}0C`, border: `1px solid ${color}25` }}
            >
              <div className="flex items-center gap-2 text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                <TrendingUp size={12} style={{ color }} /> Impact
              </div>
              <p className="text-sm font-semibold leading-relaxed" style={{ color }}>{impactStat}</p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 overflow-hidden" style={{ background: '#060A12' }}>
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
          <div className="glow-spot-violet absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" />
          <div className="relative z-10 max-w-xl mx-auto px-4 text-center flex flex-col items-center gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-[1.1]" style={{ letterSpacing: '-0.025em' }}>
              Ready to talk about {label}?
            </h2>
            <Link to="/#contact" onClick={CONTACT_SCROLL} className="btn-primary px-8 py-3.5 text-sm">
              {ctaLabel} <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Other items in this space */}
        {otherItems.length > 0 && (
          <section className="relative py-16 overflow-hidden" style={{ background: '#0B1020' }}>
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-5">Explore More in {spaceLabel}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherItems.map(i => (
                  <Link
                    key={i.slug}
                    to={`${basePath}/${i.slug}`}
                    className="flex items-center gap-3 rounded-xl p-4 hover:bg-white/[0.04] transition-colors duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${i.color}14`, border: `1px solid ${i.color}28` }}>
                      <i.icon size={16} style={{ color: i.color }} />
                    </div>
                    <span className="text-sm text-white/70 leading-snug">{i.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
