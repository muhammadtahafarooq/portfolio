import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          hover: '#A78BFA',
        },
        background: {
          DEFAULT: '#080808',
          secondary: '#111111',
        },
        surface: {
          DEFAULT: '#171717',
          hover: '#1D1D1D',
        },
        text: {
          DEFAULT: '#F5F5F5',
          secondary: '#A3A3A3',
          muted: '#666666',
        },
        border: {
          DEFAULT: '#262626',
          hover: '#404040',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'var(--font-jetbrains)',
          'JetBrains Mono',
          'SFMono-Regular',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        'h1': 'clamp(3rem, 7vw, 5.5rem)',
        'h2': 'clamp(2.5rem, 5vw, 4rem)',
        'h3': 'clamp(2rem, 3.5vw, 3rem)',
        'h4': 'clamp(1.5rem, 2.5vw, 2rem)',
        'body-lg': 'clamp(1.125rem, 1.5vw, 1.25rem)',
        'body': '1rem',
        'small': 'clamp(0.8125rem, 0.9vw, 0.875rem)',
        'technical': 'clamp(0.75rem, 0.8vw, 0.8125rem)',
        'button': '0.875rem',
      },
      lineHeight: {
        'h1': '0.95',
        'h2': '1',
        'h3': '1.05',
        'h4': '1.1',
        'body': '1.6',
      },
      letterSpacing: {
        'h1': '-0.045em',
        'h2': '-0.04em',
        'h3': '-0.03em',
        'h4': '-0.02em',
        'technical': '0.05em',
      },
      maxWidth: {
        'container': '1440px',
        'content': '68ch',
      },
      spacing: {
        'container': '32px',
        'section': '120px',
        'gap': '24px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '6px',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'smooth': '500ms',
        'cinematic': '800ms',
        'slow': '1200ms',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
