// MUST stay in sync with theme.extend.colors in tailwind.config.js by hand —
// Tailwind's config is build-time-only and can't be imported into inline-style
// JS at runtime, so this duplication is intentional, not an oversight. If you
// change a hex here, change it there in the same commit (and vice versa).

export const COLORS = {
  // primary — electric blue (dominant brand hue)
  primary: '#2F7FF6',
  primaryDark: '#2563EB',
  primaryLight: '#5B9DFF',

  // secondary accent family — data viz / stats / orchestration diagrams
  violet: '#7C3AED',
  violetLight: '#8B5CF6',
  violetBright: '#A78BFA',
  cyan: '#06B6D4',
  cyanLight: '#22D3EE',
  cyanBright: '#67E8F9',
  purple: '#8B5CF6',
  indigo: '#6366F1',
  indigoDark: '#4F46E5',

  // cta — exclusive to primary action buttons, never used elsewhere
  cta: '#1F51FF',
  ctaDark: '#133199',
  ctaLight: '#7997FF', // glow/tint use only — do not pair with white text

  // success — positive/status states only (uptime, "Connected", growth stats)
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',

  // warning/live — urgency micro-accents only, visually distinct from cta
  warning: '#F59E0B',
  warningDark: '#D97706',
}

export default COLORS
