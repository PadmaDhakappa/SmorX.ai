import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { NAV_GROUPS } from '../../data/navigation'
import { scrollToSection } from '../../utils/scrollToSection'
import { COLORS } from '../../theme/colors'

const group = NAV_GROUPS.find(g => g.id === 'capabilities')
const picks = ['Agentic Workflow Automation', 'Multi-Agent Systems', 'AI-Powered Data Intelligence']
const items = group.items.filter(i => picks.includes(i.label))
const ACCENT = COLORS.primary

export default function CapabilitiesTeaser() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl px-5 py-4"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="flex items-center gap-3 sm:w-56 flex-shrink-0">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}20`, border: `1px solid ${ACCENT}40` }}>
          <group.icon size={16} style={{ color: ACCENT }} />
        </div>
        <h3 className="text-sm font-semibold text-white">Capabilities at a Glance</h3>
      </div>

      <div className="flex flex-wrap gap-2 flex-1">
        {items.map(item => (
          <span key={item.label} className="tag-chip flex items-center gap-1.5">
            <item.icon size={12} />
            {item.label}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToSection('#services')}
        className="flex items-center gap-1 text-xs font-medium flex-shrink-0 transition-colors"
        style={{ color: `${ACCENT}CC` }}
        onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
        onMouseLeave={e => (e.currentTarget.style.color = `${ACCENT}CC`)}
      >
        See all capabilities <ArrowRight size={12} />
      </button>
    </motion.div>
  )
}
