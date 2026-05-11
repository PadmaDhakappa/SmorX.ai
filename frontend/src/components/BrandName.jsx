export default function BrandName({ suffix = null }) {
  return (
    <>
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">S</span>
      <span className="text-gray-200">mor</span>
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">X</span>
      {suffix && <span className="text-cyan-400">{suffix}</span>}
    </>
  )
}
