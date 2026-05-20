import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Phone, Loader2, ArrowRight, Calendar } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import BrandName from '../components/BrandName'

const INITIAL_FORM = { name: '', email: '', phone: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.message.trim()) errors.message = 'Message is required'
  else if (form.message.trim().length < 10) errors.message = 'At least 10 characters'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      const res = await fetch('https://smorx-backend.onrender.com/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.message || 'Submission failed')
      }
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 transition-all duration-200 outline-none bg-white/[0.04] border ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-500/70'
        : 'border-white/[0.08] focus:border-violet-500/50 focus:bg-white/[0.06]'
    }`

  return (
    <section id="contact" className="relative py-28 overflow-hidden" style={{ background: '#060A12' }}>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-40" />

      {/* Animated glow behind CTA */}
      <div className="glow-spot-violet absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 animate-glow-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Get Started"
          title='Start Building Your <span class="gradient-text">AI Operating Layer</span>'
          subtitle={<>Tell us about your workflow, and <BrandName suffix=".ai" /> will help you design the right AI system, agent, or automation architecture.</>}
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Info */}
          <div className="flex flex-col gap-8">
            {/* CTA cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Calendar,
                  title: 'Book Strategy Call',
                  desc: '30-minute call with an AI architect. We map your workflow and suggest the right solution.',
                  color: '#7C3AED',
                  action: 'Schedule Now',
                },
                {
                  icon: Send,
                  title: 'Send a Brief',
                  desc: 'Describe your challenge. We\'ll respond within 4 hours with a preliminary recommendation.',
                  color: '#06B6D4',
                  action: 'Send Brief',
                },
              ].map(card => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{ background: `${card.color}0C`, border: `1px solid ${card.color}20` }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${card.color}18`, border: `1px solid ${card.color}30` }}>
                    <card.icon size={16} style={{ color: card.color }} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-1">{card.title}</div>
                    <p className="text-xs text-white/40 leading-relaxed">{card.desc}</p>
                  </div>
                  <button
                    className="flex items-center gap-1 text-xs font-semibold mt-1 transition-opacity duration-200 hover:opacity-80"
                    style={{ color: card.color }}
                  >
                    {card.action} <ArrowRight size={12} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 flex flex-col gap-4 glass border border-white/[0.07]"
            >
              {[
                { icon: Mail, label: 'Email', value: 'outreach@smorx.ai', note: 'Responds within 4 hours' },
                { icon: Phone, label: 'Phone', value: '+91 8147681616', note: 'Mon–Fri, 9am–6pm IST' },
                { icon: MapPin, label: 'Office', value: 'Bangalore, India', note: 'Remote-first, global delivery' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)' }}>
                    <item.icon size={14} className="text-violet-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 mb-0.5">{item.label}</div>
                    <div className="text-sm text-white font-medium">{item.value}</div>
                    <div className="text-[11px] text-white/30 mt-0.5">{item.note}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-8 glass-card border border-white/[0.08]"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Received</h3>
                  <p className="text-sm text-white/45">We'll respond within 4 hours with a tailored recommendation.</p>
                </div>
                <button onClick={() => { setStatus('idle'); setForm(INITIAL_FORM) }} className="btn-outline text-sm px-6 py-2.5">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/45 mb-1.5 font-medium">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Jane Smith" className={inputCls('name')} aria-required />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-white/45 mb-1.5 font-medium">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="jane@company.com" className={inputCls('email')} aria-required />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/45 mb-1.5 font-medium">Company / Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Acme Corp or +1 555 000 0000" className={inputCls('phone')} />
                </div>

                <div>
                  <label className="block text-xs text-white/45 mb-1.5 font-medium">Tell us about your workflow *</label>
                  <textarea name="message" rows={5} value={form.message} onChange={handleChange}
                    placeholder="Describe the process you'd like to automate or the AI system you're looking to build..."
                    className={`${inputCls('message')} resize-none`} aria-required />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle size={15} />
                    {errorMsg}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center py-3.5 text-sm rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                >
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </motion.button>

                <p className="text-[11px] text-white/25 text-center">
                  No spam. We respond with a tailored recommendation, not a sales deck.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
