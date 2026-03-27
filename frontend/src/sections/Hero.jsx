import { useState, useEffect } from 'react'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'

const ANIMATED_WORDS = ['Intelligent', 'Innovative', 'Transformative', 'Autonomous', 'Next-Gen']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ANIMATED_WORDS.length)
        setVisible(true)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-mesh" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.4) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-16 sm:pb-20 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-purple/25 text-xs sm:text-sm text-purple-300 mb-6 sm:mb-7">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
          <span className="font-medium">Powered by Advanced AI Technology</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-heading leading-[1.1] mb-5 sm:mb-6 text-balance">
          <span className="block text-white">Next-Generation</span>
          <span className="block mt-1 sm:mt-1.5">
            <span
              className={`gradient-text transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
              aria-live="polite"
              aria-atomic="true"
            >
              {ANIMATED_WORDS[wordIndex]}
            </span>
          </span>
          <span className="block text-white mt-1 sm:mt-1.5">AI Solutions</span>
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-white/55 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          Transforming industries through cutting-edge AI, machine learning, and automation.
          We build intelligent systems that drive measurable, real-world results.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-16">
          <button
            onClick={() => handleScroll('services')}
            className="btn-primary w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 group"
            aria-label="Explore our services"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </button>
          <button
            onClick={() => handleScroll('contact')}
            className="btn-outline w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5"
            aria-label="Get in touch"
          >
            Get in Touch
          </button>
        </div>

        {/* Stats strip */}
        <div className="flex items-center justify-center">
          {[
            { value: '500+', label: 'AI Models' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '150+', label: 'Clients' },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center">
              <div className="px-4 sm:px-6 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{value}</div>
                <div className="text-[10px] sm:text-xs text-white/40 mt-0.5">{label}</div>
              </div>
              {i < 2 && <div className="h-7 w-px bg-white/10" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll('about')}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 hover:text-white/50 transition-colors duration-300"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
