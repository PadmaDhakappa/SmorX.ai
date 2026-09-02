import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import SectionHeader from '../components/ui/SectionHeader'
import { HIRE_ROLE_GROUPS, ENGAGEMENT_MODELS } from '../data/hireTalent'

const CONTACT_SCROLL = () => setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 100)

function RoleCard({ role, index }) {
  return (
    <motion.div
      id={role.slug}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl p-6 flex flex-col gap-4 cursor-default overflow-hidden scroll-mt-28"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${role.color}0D 0%, transparent 70%)` }} />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${role.color}40` }} />

      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${role.color}14`, border: `1px solid ${role.color}28` }}>
        <role.icon size={20} style={{ color: role.color }} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-white text-[15px] leading-snug">{role.label}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{role.description}</p>
      </div>

      <ul className="flex flex-col gap-1.5 mt-auto">
        {role.useCases.map(uc => (
          <li key={uc} className="flex items-start gap-2 text-xs text-white/55">
            <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: role.color }} />
            {uc}
          </li>
        ))}
      </ul>

      <Link
        to="/#contact"
        onClick={CONTACT_SCROLL}
        className="flex items-center gap-1 text-xs font-medium hover:underline mt-1"
        style={{ color: role.color }}
      >
        Request Talent <ArrowRight size={12} />
      </Link>
    </motion.div>
  )
}

export default function HireTalent() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <div style={{ background: '#060A12', minHeight: '100vh' }}>
      <SEO
        title="Hire AI Developers & Engineering Talent"
        description="Hire AI/agent developers, ML engineers, full-stack and mobile talent, or bring in SmorX for staff augmentation and AI consulting — built for teams shipping agentic systems."
        canonical="/hire-talent"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Hire Talent', path: '/hire-talent' },
        ]}
      />
      <Navbar />
      <main id="main-content">
        <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: '#060A12' }}>
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
          <div className="glow-spot-violet absolute w-[600px] h-[600px] top-0 left-1/4 opacity-20" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-5">
            <span className="section-label">Staff Augmentation & Consulting</span>
            <h1 className="section-heading text-white">
              Hire Talent Built for <span className="gradient-text">Agentic Systems</span>
            </h1>
            <p className="section-subheading">
              Not generalist contractors — engineers who've shipped autonomous agents, orchestration layers, and the
              products they run inside of. Add one specialist or a full dedicated team.
            </p>
          </div>
        </section>

        {HIRE_ROLE_GROUPS.map((group, gi) => (
          <section
            key={group.heading}
            className="relative py-16 overflow-hidden"
            style={{ background: gi % 2 === 0 ? '#0B1020' : '#080D18' }}
          >
            <div className="bg-grid absolute inset-0 pointer-events-none opacity-30" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeader label={group.heading} title={group.sectionTitle} align="left" className="mb-10" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.roles.map((role, i) => (
                  <RoleCard key={role.slug} role={role} index={i} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section id="engagement-models" className="relative py-24 overflow-hidden scroll-mt-24" style={{ background: '#060A12' }}>
          <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />
          <div className="glow-spot-cyan absolute w-[500px] h-[500px] bottom-0 right-0 opacity-15" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              label="Engagement Models"
              title='Choose How You <span class="gradient-text">Bring Us In</span>'
              subtitle="No fixed package — the engagement shapes itself around what you actually need."
              className="mb-14"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {ENGAGEMENT_MODELS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-7 flex flex-col gap-4"
                  style={{ background: `${m.color}0C`, border: `1px solid ${m.color}20` }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${m.color}18`, border: `1px solid ${m.color}30` }}>
                    <m.icon size={20} style={{ color: m.color }} />
                  </div>
                  <h3 className="font-semibold text-white text-lg">{m.label}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{m.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                to="/#contact"
                onClick={CONTACT_SCROLL}
                className="btn-primary px-8 py-3.5 text-sm"
              >
                Talk to Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
