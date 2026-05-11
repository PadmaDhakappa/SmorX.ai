import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, delay = 0, glowColor = 'violet' }) {
  const glowMap = {
    violet: 'hover:shadow-[0_12px_48px_rgba(0,0,0,0.4),0_0_30px_rgba(124,58,237,0.12)]',
    blue: 'hover:shadow-[0_12px_48px_rgba(0,0,0,0.4),0_0_30px_rgba(59,130,246,0.12)]',
    cyan: 'hover:shadow-[0_12px_48px_rgba(0,0,0,0.4),0_0_30px_rgba(6,182,212,0.12)]',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -4 } : undefined}
      className={`neon-card rounded-2xl ${glowMap[glowColor]} ${className}`}
    >
      {children}
    </motion.div>
  )
}
