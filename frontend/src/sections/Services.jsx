import { useEffect, useRef } from 'react'
import { Bot, Brain, BarChart3, MessageSquare, Shield, Cpu, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    icon: Cpu,
    title: 'AI Automation',
    description: 'Streamline repetitive workflows with intelligent automation that learns and adapts to your business processes.',
    gradient: 'from-blue-500/20 to-primary/20',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    hoverBorder: 'hover:border-primary/30',
    glowColor: 'hover:shadow-primary/10',
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'Custom ML models trained on your data to predict outcomes, identify patterns, and power smart decision making.',
    gradient: 'from-purple/20 to-indigo/20',
    iconColor: 'text-purple-light',
    iconBg: 'bg-purple/10',
    hoverBorder: 'hover:border-purple/30',
    glowColor: 'hover:shadow-purple/10',
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    description: 'Conversational AI that understands context, handles complex queries, and delivers human like interactions 24/7.',
    gradient: 'from-indigo/20 to-purple/20',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo/10',
    hoverBorder: 'hover:border-indigo-400/30',
    glowColor: 'hover:shadow-indigo-400/10',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with AI powered analytics dashboards and predictive reporting.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    hoverBorder: 'hover:border-emerald-400/30',
    glowColor: 'hover:shadow-emerald-400/10',
  },
  {
    icon: Shield,
    title: 'AI Security',
    description: 'Protect your systems with AI driven threat detection, anomaly detection, and real time security monitoring.',
    gradient: 'from-orange-500/20 to-accent/20',
    iconColor: 'text-accent',
    iconBg: 'bg-accent/10',
    hoverBorder: 'hover:border-accent/30',
    glowColor: 'hover:shadow-accent/10',
  },
  {
    icon: Bot,
    title: 'Intelligent Agents',
    description: 'Deploy autonomous AI agents that execute complex tasks, make decisions, and integrate seamlessly with your stack.',
    gradient: 'from-pink-500/20 to-purple/20',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-500/10',
    hoverBorder: 'hover:border-pink-400/30',
    glowColor: 'hover:shadow-pink-400/10',
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
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
      className="relative py-28 bg-dark overflow-hidden"
      aria-label="Services section"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple/10 border border-purple/20 text-purple-light text-xs font-medium mb-4">
            <span>What We Offer</span>
          </div>
          <h2 className="section-heading mb-4">
            <span className="text-white">Powerful AI </span>
            <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subheading">
            End-to-end AI solutions designed to solve real business challenges and unlock new opportunities at scale.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <article
                key={service.title}
                className={`animate-on-scroll group relative glass rounded-2xl p-6 border border-white/5 ${service.hoverBorder} card-hover cursor-pointer hover:shadow-2xl ${service.glowColor} transition-all duration-300`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${service.iconColor}`} aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/50 leading-relaxed mb-5 group-hover:text-white/70 transition-colors">
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-1 text-sm font-medium text-white/30 group-hover:text-white/80 transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-on-scroll">
          <p className="text-white/40 text-sm mb-4">Not sure which service you need?</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
            aria-label="Talk to our AI experts"
          >
            Talk to Our Experts
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
