import { useEffect, useRef } from 'react'
import { Cpu, BarChart3, Shield, Bot } from 'lucide-react'

const SERVICES = [
  {
    icon: Cpu,
    title: 'AI Automation',
    description:
      'Streamline repetitive workflows with intelligent automation that learns and adapts to your business processes.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    borderHover: 'hover:border-blue-500/40',
    glowHover: 'hover:shadow-blue-500/10',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description:
      'Transform raw data into actionable insights with AI powered analytics dashboards and predictive reporting.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/40',
    glowHover: 'hover:shadow-emerald-500/10',
    linkColor: 'hover:text-emerald-400',
  },
  {
    icon: Shield,
    title: 'AI Security',
    description:
      'Protect your systems with AI driven threat detection, anomaly detection, and real time security monitoring.',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    borderHover: 'hover:border-orange-500/40',
    glowHover: 'hover:shadow-orange-500/10',
    linkColor: 'hover:text-orange-400',
  },
  {
    icon: Bot,
    title: 'Intelligent Agents',
    description:
      'Deploy autonomous AI agents that execute complex tasks, make decisions, and integrate seamlessly with your stack.',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-400',
    borderHover: 'hover:border-pink-500/40',
    glowHover: 'hover:shadow-pink-500/10',
    linkColor: 'hover:text-pink-400',
  },
]

export default function AIServicesSection() {
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
      id="services"
      ref={sectionRef}
      className="relative py-14 sm:py-16 md:py-24 bg-dark overflow-hidden"
      aria-label="AI Services"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple/5 rounded-full blur-3xl" aria-hidden="true" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4">
            <span>What We Build</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Powerful AI </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            End-to-end AI solutions designed to solve real business challenges and unlock new opportunities at scale.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <article
                key={service.title}
                className={`animate-on-scroll group relative flex flex-col bg-gradient-to-br from-[#111827] to-[#1f2937] border border-white/10 ${service.borderHover} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl ${service.glowHover}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Subtle top-edge highlight on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-lg ${service.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${service.iconColor}`} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-lg mb-2 leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                  {service.description}
                </p>

              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
