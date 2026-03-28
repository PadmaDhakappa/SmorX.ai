/**
 * LogoText — canonical SmorX.ai brand name renderer.
 *
 * Usage:
 *   <LogoText />
 *   <LogoText className="text-2xl" />
 *
 * Props:
 *   className  — extra Tailwind classes (e.g. text size, font weight)
 */
export default function LogoText({ className = '' }) {
  return (
    <span className={`inline-flex items-baseline font-bold tracking-tight ${className}`}>
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">S</span><span className="text-gray-200">mor</span>
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        X
      </span>
      <span className="text-cyan-400">.ai</span>
    </span>
  )
}
