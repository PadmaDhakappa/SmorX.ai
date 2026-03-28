import { useEffect, useRef } from 'react'
import { Target, Eye, Zap, Users, Globe } from 'lucide-react'
import LogoText from '../components/LogoText'

const STATS = [
  { icon: Users, value: '50+', label: 'Clients', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Globe, value: '10+', label: 'Countries', color: 'text-purple-400', bg: 'bg-purple/10' },
]

const PILLARS = [
  {
    icon: Target,
    title: 'Our Mission',
    body: 'To make transformative AI accessible and practical for every organization — turning complex models into tangible business outcomes that drive growth, efficiency, and innovation.',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    hoverBorder: 'hover:border-primary/25',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    body: 'A world where intelligent systems augment human potential — empowering individuals and organizations to achieve what was previously impossible through responsible, human centered AI.',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple/10',
    hoverBorder: 'hover:border-purple/25',
  },
  {
    icon: Zap,
    title: 'Our Approach',
    body: 'We combine state of the art research with pragmatic engineering — building AI solutions that are fast, reliable, explainable, and deeply integrated with your existing workflows.',
    iconColor: 'text-accent',
    iconBg: 'bg-accent/10',
    hoverBorder: 'hover:border-accent/25',
  },
]

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="relative py-28 bg-[#0D1120] overflow-hidden"
      aria-label="About section"
    >
      <div className="divider-x absolute top-0 inset-x-0" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-18 animate-on-scroll" style={{ marginBottom: '4.5rem' }}>
          <div className="section-label bg-primary/10 border border-primary/20 text-primary mb-5">
            Who We Are
          </div>
          <h2 className="section-heading mb-4">
            <span className="text-white">About </span>
            <LogoText />
          </h2>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left */}
          <div className="animate-on-scroll space-y-5">
            <p className="text-white/80 text-lg leading-relaxed font-medium">
              Founded in 2025, <LogoText /> is a pioneering AI company on a mission to democratize artificial intelligence for businesses of all sizes.
            </p>
            <p className="text-white/50 leading-relaxed">
              We combine deep research expertise with production-grade engineering to deliver AI systems that are not only powerful but reliable, explainable, and built for scale. Our team of 30+ AI researchers, engineers, and domain experts works at the frontier of what's possible.
            </p>
            <p className="text-white/50 leading-relaxed">
              From Fortune 500 enterprises to fast-growing startups, our clients trust <LogoText /> to be their strategic AI partner, accelerating innovation and creating lasting competitive advantages.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Work With Us
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                Our Services
              </button>
            </div>
          </div>

          {/* Right — Pillars */}
          <div className="space-y-3 animate-on-scroll animation-delay-200">
            {PILLARS.map(({ icon: Icon, title, body, iconColor, iconBg, hoverBorder }) => (
              <div
                key={title}
                className={`glass-card rounded-2xl p-5 border border-white/[0.07] ${hoverBorder} transition-all duration-300 group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-4.5 h-4.5 ${iconColor}`} style={{ width: '18px', height: '18px' }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1.5 text-sm">{title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto w-full animate-on-scroll animation-delay-300">
          {STATS.map(({ icon: Icon, value, label, color, bg }) => (
            <div
              key={label}
              className="glass-card rounded-2xl p-6 border border-white/[0.07] hover:border-white/15 text-center group transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform`}>
                <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
              </div>
              <div className={`text-3xl font-bold ${color} mb-1 tracking-tight`}>{value}</div>
              <div className="text-white/35 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
