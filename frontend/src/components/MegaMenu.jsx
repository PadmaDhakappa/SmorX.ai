import { ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

function MenuItem({ item, onNavigate }) {
  const isRoute = item.href.startsWith('/')

  const content = (
    <>
      {item.icon && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/[0.04] border border-white/[0.06] group-hover/item:border-violet-400/30 transition-colors">
          <item.icon size={14} className="text-white/60 group-hover/item:text-white transition-colors" />
        </div>
      )}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm text-white/70 group-hover/item:text-white transition-colors leading-snug">
          {item.label}
        </span>
        {item.desc && (
          <span className="text-xs text-white/50 leading-snug">{item.desc}</span>
        )}
        {item.tag && (
          <span className="flex items-center gap-2 text-[11px] text-white/50">
            <span className="tag-chip py-0.5">{item.tag}</span>
            {item.readTime && <span>{item.readTime}</span>}
          </span>
        )}
      </div>
    </>
  )

  const className = 'group/item w-full flex items-start gap-3 text-left px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors duration-150'

  if (isRoute) {
    return (
      <li role="none">
        <Link role="menuitem" to={item.href} className={className} onClick={onNavigate}>
          {content}
        </Link>
      </li>
    )
  }

  return (
    <li role="none">
      <button
        role="menuitem"
        type="button"
        className={className}
        onClick={() => {
          scrollToSection(item.href)
          onNavigate?.()
        }}
      >
        {content}
      </button>
    </li>
  )
}

export default function MegaMenu({ group, open, onMouseEnter, onMouseLeave, onToggle, onNavigate, triggerRef }) {
  const navigate = useNavigate()

  const goToFeaturedCta = () => {
    onNavigate?.()
    if (group.featured.ctaHref.startsWith('/')) {
      navigate(group.featured.ctaHref)
    } else {
      scrollToSection(group.featured.ctaHref)
    }
  }

  return (
    <li className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        ref={triggerRef}
        type="button"
        className={`nav-trigger ${open ? 'nav-trigger-active' : ''}`}
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {group.label}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={`${group.label} menu`}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 glass-solid rounded-2xl border border-white/[0.08] shadow-card z-50 overflow-hidden"
          style={{ width: group.width ?? (group.panelCols >= 4 ? 640 : group.panelCols === 1 ? 340 : 520) }}
        >
          {group.groups ? (
            <div className={group.groupsLayout === 'row' ? 'p-4 grid grid-cols-2 gap-x-6 gap-y-4' : 'p-3 flex flex-col gap-4'}>
              {group.groups.map(sub => (
                <div key={sub.heading}>
                  <div className="text-[10px] font-semibold text-white/50 uppercase tracking-wider px-3 mb-1.5">{sub.heading}</div>
                  <ul
                    className="grid gap-1 list-none m-0"
                    style={{ gridTemplateColumns: `repeat(${sub.cols || 2}, minmax(0, 1fr))` }}
                  >
                    {sub.items.map(item => (
                      <MenuItem key={item.label} item={item} onNavigate={onNavigate} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul
              className="p-3 grid gap-1 list-none m-0"
              style={{ gridTemplateColumns: `repeat(${group.panelCols}, minmax(0, 1fr))` }}
            >
              {group.items.map(item => (
                <MenuItem key={item.label} item={item} onNavigate={onNavigate} />
              ))}
            </ul>
          )}

          {group.featured && (
            <div className="px-5 py-4 border-t border-white/[0.06] bg-white/[0.015] flex flex-col gap-3">
              {group.featured.panelItems && (
                <div className="grid grid-cols-3 gap-3">
                  {group.featured.panelItems.map(p => (
                    <div
                      key={p.label}
                      className="rounded-xl p-3"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="text-xs font-semibold text-white mb-1">{p.label}</div>
                      <div className="text-[11px] text-white/50 leading-snug">{p.desc}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between gap-4">
                {group.featured.subtitle ? (
                  <div className="flex flex-col gap-0.5 max-w-[320px]">
                    <p className="text-sm font-semibold text-white leading-snug">{group.featured.title}</p>
                    <p className="text-xs text-white/50 leading-snug">{group.featured.subtitle}</p>
                  </div>
                ) : (
                  <p className="text-xs text-white/50 leading-snug max-w-[280px]">{group.featured.title}</p>
                )}
                <button
                  type="button"
                  onClick={goToFeaturedCta}
                  className="btn-primary text-xs px-4 py-2 flex-shrink-0"
                >
                  {group.featured.ctaLabel}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  )
}
