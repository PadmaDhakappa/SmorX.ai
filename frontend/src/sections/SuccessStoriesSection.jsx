import { useEffect, useRef } from 'react'
import { ExternalLink, Factory, Heart, TrendingUp, Car, Building2, ShoppingBag } from 'lucide-react'

const STORIES = [
  {
    title: 'Smart Manufacturing',
    description:
      'Implemented AI-driven quality control system resulting in 40% reduction in defects and 25% increase in production efficiency.',
    category: 'Manufacturing',
    categoryColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    Icon: Factory,
    gradientFrom: '#1e3a5f',
    gradientTo: '#0f2027',
    iconColor: 'text-blue-400',
    glowColor: 'rgba(59,130,246,0.15)',
    stats: [
      { value: '40%', label: 'Fewer defects' },
      { value: '25%', label: 'More efficient' },
    ],
  },
  {
    title: 'Healthcare Diagnostics',
    description:
      'Developed AI-powered diagnostic system that improved accuracy by 35% and reduced diagnosis time by 60%.',
    category: 'Healthcare',
    categoryColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    Icon: Heart,
    gradientFrom: '#3b1f2b',
    gradientTo: '#1a0f14',
    iconColor: 'text-rose-400',
    glowColor: 'rgba(251,113,133,0.15)',
    stats: [
      { value: '35%', label: 'More accurate' },
      { value: '60%', label: 'Faster diagnosis' },
    ],
  },
  {
    title: 'Financial Analytics',
    description:
      'Built predictive models for risk assessment that reduced losses by 30% and improved portfolio performance.',
    category: 'Finance',
    categoryColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    Icon: TrendingUp,
    gradientFrom: '#1a3329',
    gradientTo: '#0d1f18',
    iconColor: 'text-emerald-400',
    glowColor: 'rgba(52,211,153,0.15)',
    stats: [
      { value: '30%', label: 'Loss reduction' },
      { value: '2.4x', label: 'Portfolio gains' },
    ],
  },
  {
    title: 'Autonomous Systems',
    description:
      'Developed self-driving algorithms that achieved 99.9% safety rating in controlled test environments.',
    category: 'Automotive',
    categoryColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    Icon: Car,
    gradientFrom: '#2d1f4a',
    gradientTo: '#18102a',
    iconColor: 'text-purple-400',
    glowColor: 'rgba(167,139,250,0.15)',
    stats: [
      { value: '99.9%', label: 'Safety rating' },
      { value: '0ms', label: 'Reaction delay' },
    ],
  },
  {
    title: 'Smart City Solutions',
    description:
      'Implemented IoT and AI integration for traffic optimization, reducing congestion by 45% citywide.',
    category: 'Smart Cities',
    categoryColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    Icon: Building2,
    gradientFrom: '#1a2f45',
    gradientTo: '#0e1b28',
    iconColor: 'text-sky-400',
    glowColor: 'rgba(56,189,248,0.15)',
    stats: [
      { value: '45%', label: 'Less congestion' },
      { value: '3M+', label: 'Residents impacted' },
    ],
  },
  {
    title: 'E-commerce Optimization',
    description:
      'Created personalization engine that increased conversion rates by 55% and customer satisfaction by 40%.',
    category: 'E-commerce',
    categoryColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    Icon: ShoppingBag,
    gradientFrom: '#3b2010',
    gradientTo: '#1f1008',
    iconColor: 'text-orange-400',
    glowColor: 'rgba(251,146,60,0.15)',
    stats: [
      { value: '55%', label: 'More conversions' },
      { value: '40%', label: 'Higher satisfaction' },
    ],
  },
]

export default function SuccessStoriesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="success-stories"
      ref={sectionRef}
      className="relative py-28 bg-dark overflow-hidden"
      aria-label="Success stories"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple/10 border border-purple/20 text-purple-light text-xs font-medium mb-4">
            <span>Case Studies</span>
          </div>
          <h2 className="section-heading mb-4">
            <span className="text-white">Success </span>
            <span className="gradient-text">Stories</span>
          </h2>
          <p className="section-subheading">
            Real-world applications of our AI solutions across industries — measured impact, proven results.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.map((story, i) => {
            const Icon = story.Icon
            return (
              <article
                key={story.title}
                className="animate-on-scroll group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#1f2937] overflow-hidden hover:scale-[1.02] hover:border-purple-500/50 transition-all duration-300"
                style={{
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Image area — rich gradient with icon */}
                <div
                  className="relative h-48 w-full overflow-hidden flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${story.gradientFrom}, ${story.gradientTo})`,
                  }}
                >
                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: '30px 30px',
                    }}
                    aria-hidden="true"
                  />

                  {/* Glow blob */}
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${story.glowColor}, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-8 h-8 ${story.iconColor}`} aria-hidden="true" />
                  </div>

                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111827] to-transparent" aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-white font-semibold text-lg mb-2 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                    {story.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex gap-4 mb-5">
                    {story.stats.map(({ value, label }) => (
                      <div key={label} className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-center">
                        <div className={`text-lg font-bold ${story.iconColor}`}>{value}</div>
                        <div className="text-xs text-white/30 mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${story.categoryColor}`}>
                      {story.category}
                    </span>
                    <button
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all duration-200 group-hover:text-white/60"
                      aria-label={`View ${story.title} case study`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
