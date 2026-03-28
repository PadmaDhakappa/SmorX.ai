import { useEffect, useRef } from 'react'
import { Car, Plane, Factory, Heart, Users, ShoppingCart, Zap, Shield } from 'lucide-react'

const INDUSTRIES = [
  {
    icon: Car,
    title: 'Automotive',
    description: 'Autonomous systems, predictive maintenance, and quality control',
    gradient: 'from-blue-500/20 to-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Plane,
    title: 'Aviation',
    description: 'Flight optimization, safety systems, and maintenance scheduling',
    gradient: 'from-sky-500/20 to-blue-400/10',
    iconColor: 'text-sky-400',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Smart factories, supply chain optimization, and quality assurance',
    gradient: 'from-purple/20 to-indigo/10',
    iconColor: 'text-purple-light',
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Medical imaging, diagnosis assistance, and patient care optimization',
    gradient: 'from-rose-500/20 to-pink-400/10',
    iconColor: 'text-rose-400',
  },
  {
    icon: Users,
    title: 'Staffing & Workforce Solutions',
    description: 'AI driven talent intelligence, workforce optimization, and recruitment automation to help organizations identify, deploy, and manage talent more efficiently at scale.',
    gradient: 'from-emerald-500/20 to-green-400/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: ShoppingCart,
    title: 'Retail & E commerce',
    description: 'Personalization, inventory management, and customer insights',
    gradient: 'from-orange-500/20 to-accent/10',
    iconColor: 'text-accent',
  },
  {
    icon: Zap,
    title: 'Energy & Utilities',
    description: 'Smart grid management, consumption optimization, and renewable energy',
    gradient: 'from-yellow-500/20 to-amber-400/10',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Shield,
    title: 'Security & Defense',
    description: 'Threat detection, surveillance systems, and cybersecurity solutions',
    gradient: 'from-indigo/20 to-purple/10',
    iconColor: 'text-indigo-400',
  },
]

export default function IndustriesSection() {
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
      id="industries"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-dark-100 overflow-hidden"
      aria-label="Industries we serve"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" aria-hidden="true" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo/10 border border-indigo/20 text-indigo-400 text-xs font-medium mb-4">
            <span>Sector Expertise</span>
          </div>
          <h2 className="section-heading mb-4">
            <span className="text-white">Industries </span>
            <span className="gradient-text">We Serve</span>
          </h2>
          <p className="section-subheading">
            Specialized AI solutions across diverse sectors — built for the unique challenges of each industry.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon
            return (
              <article
                key={industry.title}
                className="animate-on-scroll group relative rounded-2xl p-6 border border-white/10 backdrop-blur-lg bg-gradient-to-br from-[#111827] to-[#1f2937] hover:border-purple-500/50 hover:scale-105 transition-all duration-300 cursor-default"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    <Icon
                      className={`w-8 h-8 ${industry.iconColor}`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-lg mb-2 leading-snug">
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
