import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import LogoText from '../components/LogoText'

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Chief Technology Officer',
    avatar: 'SC',
    avatarGradient: 'from-blue-500 to-cyan-400',
    rating: 5,
    text: "SmorX.ai's ML models reduced our fraud detection time by 87%. Their team's expertise and support throughout integration was exceptional. Truly a game changer for our operations.",
    highlight: '87% faster detection',
  },
  {
    name: 'Marcus Williams',
    role: 'VP of Engineering',
    avatar: 'MW',
    avatarGradient: 'from-purple-500 to-indigo-400',
    rating: 5,
    text: "We deployed their AI chatbot across 12 markets and saw a 3x increase in customer satisfaction scores within 60 days. The ROI has been incredible. Highly recommend.",
    highlight: '3x satisfaction increase',
  },
  {
    name: 'Priya Patel',
    role: 'Head of Data Science',
    avatar: 'PP',
    avatarGradient: 'from-orange-500 to-amber-400',
    rating: 5,
    text: "The data analytics platform SmorX.ai built for us processes 50M records daily. It's fast, accurate, and the predictive models have genuinely transformed how we make decisions.",
    highlight: '50M records/day',
  },
]

export default function Trust() {
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
      id="trust"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-dark overflow-hidden"
      aria-label="Client testimonials"
    >
      <div className="divider-x absolute top-0 inset-x-0" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="section-label bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 mb-5">
            <Star className="w-3 h-3 fill-yellow-400" aria-hidden="true" />
            Client Stories
          </div>
          <h2 className="section-heading mb-4">
            <span className="text-white">Trusted by </span>
            <span className="gradient-text">Innovative Teams</span>
          </h2>
          <p className="section-subheading">
            Join 150+ forward-thinking companies that rely on <LogoText /> to power their AI transformation.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="animate-on-scroll glass-card rounded-2xl p-6 border border-white/[0.07] hover:border-white/15 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Large quote mark */}
              <Quote
                className="absolute -top-1 right-4 w-16 h-16 text-white/[0.03] group-hover:text-white/[0.05] transition-colors"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>

                {/* Highlight pill */}
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-3">
                  {t.highlight}
                </div>

                {/* Quote */}
                <blockquote className="mb-6">
                  <p className="text-white/60 text-sm leading-relaxed">
                    "{t.text}"
                  </p>
                </blockquote>

                {/* Author */}
                <figcaption className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center text-xs font-bold text-white shrink-0`}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/35">{t.role}</div>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        {/* Rating summary */}
        <div className="mt-10 animate-on-scroll">
          <div className="glass-card rounded-2xl p-5 border border-yellow-400/[0.08]">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white tracking-tight">4.9</span>
                <span className="text-white/40 text-sm">/ 5.0</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10" aria-hidden="true" />
              <p className="text-white/40 text-sm text-center sm:text-left">
                Based on <span className="text-white/70 font-medium">50+</span> verified client reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
