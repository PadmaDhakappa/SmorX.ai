import { motion } from 'framer-motion'

export default function GradientButton({ children, variant = 'primary', onClick, href, className = '', icon }) {
  const cls = variant === 'primary' ? 'btn-primary' : 'btn-outline'

  const inner = (
    <>
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${cls} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${cls} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  )
}
