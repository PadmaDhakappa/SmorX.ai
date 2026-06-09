import { Link } from 'react-router-dom'
import { Home, ArrowRight, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <div style={{ background: '#060A12', minHeight: '100vh' }}>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to SmorX.ai to explore our enterprise AI automation platform."
        canonical="/404"
      />
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 max-w-lg"
        >
          <span
            className="font-bold gradient-text"
            style={{ fontSize: 'clamp(5rem, 15vw, 9rem)', lineHeight: 1 }}
          >
            404
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Page Not Found
          </h1>

          <p className="text-white/40 text-base leading-relaxed max-w-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link
              to="/"
              className="btn-primary px-6 py-3 text-sm inline-flex items-center justify-center gap-2"
            >
              <Home size={16} />
              Back to Home
            </Link>
            <Link
              to="/#contact"
              className="btn-outline px-6 py-3 text-sm inline-flex items-center justify-center gap-2"
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 text-sm text-white/30">
            <p className="flex items-center gap-1.5">
              <FileText size={13} />
              Explore our latest insights:
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link
                to="/blog/multi-agent-systems"
                className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                Multi-Agent Systems
              </Link>
              <Link
                to="/blog/autonomous-workflows"
                className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                Autonomous Workflows
              </Link>
              <Link
                to="/blog/ai-control-planes"
                className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                AI Control Planes
              </Link>
              <Link
                to="/blog/agents-vs-software"
                className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                AI Agents vs Software
              </Link>
              <Link
                to="/blog/secure-agents"
                className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                Secure AI Agents
              </Link>
              <Link
                to="/blog/agent-economics"
                className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                Agent Economics
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
