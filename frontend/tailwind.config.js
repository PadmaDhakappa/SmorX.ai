/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#060A12',
          100: '#080D18',
          200: '#0B1020',
          300: '#0F1628',
          400: '#141C32',
          500: '#1A2440',
        },
        primary: {
          DEFAULT: '#2F7FF6',
          dark: '#2563EB',
          light: '#5B9DFF',
        },
        violet: {
          DEFAULT: '#7C3AED',
          light: '#8B5CF6',
          bright: '#A78BFA',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
          bright: '#67E8F9',
        },
        purple: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
          light: '#A78BFA',
        },
        indigo: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
        },
        cta: {
          DEFAULT: '#1F51FF',
          dark: '#133199',
          light: '#7997FF',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        // Deprecated alias — kept only so any stray bg-accent/text-accent
        // class (only in unrouted Services.jsx/About.jsx) doesn't break.
        accent: {
          DEFAULT: '#1F51FF',
          dark: '#133199',
          light: '#7997FF',
        },
        neon: {
          blue: '#00D4FF',
          violet: '#7B2FFF',
          cyan: '#00FFD4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-up-slow': 'fadeUp 1.2s cubic-bezier(0.16,1,0.3,1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'glow-pulse-cyan': 'glowPulseCyan 3s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'particle-drift': 'particleDrift 20s linear infinite',
        'counter': 'counter 2s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'node-pulse': 'nodePulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3), 0 0 60px rgba(124, 58, 237, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.6), 0 0 80px rgba(124, 58, 237, 0.2)' },
        },
        glowPulseCyan: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(59, 130, 246, 0.3)' },
          '50%': { borderColor: 'rgba(139, 92, 246, 0.6)' },
        },
        particleDrift: {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) translateX(30px)', opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        nodePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.3)', opacity: '1' },
        },
      },
      backgroundSize: {
        '300%': '300%',
        '200%': '200%',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(59, 130, 246, 0.3)',
        'glow-violet': '0 0 40px rgba(124, 58, 237, 0.3)',
        'glow-cyan': '0 0 40px rgba(6, 182, 212, 0.3)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.2)',
        'neon-violet': '0 0 20px rgba(124, 58, 237, 0.5), 0 0 60px rgba(124, 58, 237, 0.2)',
        'glow-cta': '0 0 40px rgba(31, 81, 255, 0.35)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover': '0 12px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
