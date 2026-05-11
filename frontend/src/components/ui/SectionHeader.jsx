import { motion } from 'framer-motion'

export default function SectionHeader({ label, title, subtitle, align = 'center', className = '' }) {
  const alignClass = {
    center: 'text-center items-center',
    left: 'text-left items-start',
  }[align]

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">{label}</span>
        </motion.div>
      )}
      <motion.h2
        className="section-heading text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <motion.p
          className="section-subheading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
