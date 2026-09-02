export function scrollToSection(id, options) {
  const target = id.startsWith('#') ? id : `#${id}`
  const el = document.querySelector(target)
  if (!el) return false
  el.scrollIntoView({ behavior: 'smooth', ...options })
  return true
}
