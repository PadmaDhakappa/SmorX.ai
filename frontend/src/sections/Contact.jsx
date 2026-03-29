import { useState, useRef, useEffect } from 'react'
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Phone, Loader2, ArrowRight } from 'lucide-react'
import axios from 'axios'

const INITIAL_FORM = { name: '', email: '', phone: '', message: '' }

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email',
    detail: 'outreach@smorx.ai',
    sub: 'We reply within 24 hours',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'group-hover:border-primary/25',
    href: 'mailto:outreach@smorx.ai',
  },
  {
    icon: Phone,
    title: 'Phone',
    detail: '+91 80812 59071',
    sub: 'Mon–Fri, 9am–6pm IST',
    color: 'text-purple-400',
    bg: 'bg-purple/10',
    border: 'group-hover:border-purple/25',
    href: 'tel:+918081259071',
  },
  {
    icon: MapPin,
    title: 'Office',
    detail: '12/A 8th Main 14th Cross',
    sub: 'Off HAL Airport Road',
    sub2: 'Bangalore 560017',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'group-hover:border-accent/25',
    href: null,
  },
]

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const els = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address'
    if (!form.message.trim()) errs.message = 'Message is required'
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('loading')
    try {
      await axios.post('/api/contact/', form)
      setStatus('success')
      setForm(INITIAL_FORM)
      setErrors({})
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.response?.data?.detail || err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  const inputClass = (field) =>
    `w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm placeholder-white/20
     transition-all duration-200 outline-none
     focus:ring-1 focus:ring-primary/40 focus:border-primary/50
     ${errors[field]
      ? 'border-red-400/40 bg-red-400/[0.03]'
      : 'border-white/[0.08] hover:border-white/15'
    }`

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-[#0D1120] overflow-hidden"
      aria-label="Contact section"
    >
      <div className="divider-x absolute top-0 inset-x-0" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="section-label bg-accent/10 border border-accent/20 text-accent mb-5">
            <Mail className="w-3 h-3" aria-hidden="true" />
            Get In Touch
          </div>
          <h2 className="section-heading mb-4">
            <span className="text-white">Start Your AI </span>
            <span className="gradient-text">Journey Today</span>
          </h2>
          <p className="section-subheading">
            Tell us about your project and we'll respond within 24 hours with a tailored solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Contact Info */}
          <aside className="lg:col-span-2 space-y-3 animate-on-scroll" aria-label="Contact information">
            {CONTACT_INFO.map(({ icon: Icon, title, detail, sub, sub2, color, bg, border, href }) => (
              <div
                key={title}
                className={`glass-card rounded-2xl p-5 border border-white/[0.07] ${border} flex items-start gap-4 group transition-all duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-4.5 h-4.5 ${color}`} style={{ width: '18px', height: '18px' }} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white/35 uppercase tracking-wider mb-0.5">{title}</div>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-white hover:text-white/80 transition-colors">
                      {detail}
                    </a>
                  ) : (
                    <div className="text-sm font-semibold text-white">{detail}</div>
                  )}
                  <div className="text-xs text-white/35 mt-0.5">{sub}</div>
                  {sub2 && <div className="text-xs text-white/35">{sub2}</div>}
                </div>
              </div>
            ))}

            {/* Response badge */}
            <div className="glass-card rounded-2xl p-4 border border-emerald-400/[0.1] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" aria-hidden="true" />
              <p className="text-sm text-white/50">
                Avg. response: <span className="text-emerald-400 font-semibold">under 4 hours</span>
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3 animate-on-scroll animation-delay-200">
            <div className="glass-card rounded-2xl p-5 sm:p-8 border border-white/[0.07]">

              {status === 'success' ? (
                <div className="text-center py-10" role="alert" aria-live="polite">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-7 h-7 text-emerald-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Message Sent Successfully</h3>
                  <p className="text-white/45 text-sm mb-6 leading-relaxed">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button onClick={() => { setStatus('idle'); setErrorMsg('') }} className="btn-outline text-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                        Full Name <span className="text-accent" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name" name="name" type="text"
                        value={form.name} onChange={handleChange}
                        placeholder="John Smith"
                        autoComplete="name"
                        aria-required="true" aria-invalid={!!errors.name}
                        className={inputClass('name')}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                        Email Address <span className="text-accent" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email" name="email" type="email"
                        value={form.email} onChange={handleChange}
                        placeholder="john@company.com"
                        autoComplete="email"
                        aria-required="true" aria-invalid={!!errors.email}
                        className={inputClass('email')}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1" role="alert">
                          <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-white/25 normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      className={inputClass('phone')}
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-5">
                    <label htmlFor="message" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                      Message <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message" name="message" rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Tell us about your project, goals, and how we can help..."
                      aria-required="true" aria-invalid={!!errors.message}
                      className={`${inputClass('message')} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Server error */}
                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-400/[0.07] border border-red-400/20 mb-4" role="alert">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-red-400">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full btn-accent py-3.5 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {status === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</>
                    ) : (
                      <><Send className="w-4 h-4" aria-hidden="true" /> Send Message
                        <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
