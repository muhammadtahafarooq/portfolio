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
          DEFAULT: '#D6A85F',
          hover: '#f4c377',
          container: '#D6A85F',
        },
        background: {
          DEFAULT: '#0B0A09',
          secondary: '#141210',
          primary: '#0B0A09',
        },
        surface: {
          DEFAULT: '#141312',
          hover: '#1d1b1a',
          container: '#211f1e',
        },
        'text-primary': '#F1EDE5',
        'text-secondary': '#B8B0A4',
        'text-muted': '#756E64',
        text: {
          DEFAULT: '#F1EDE5',
        },
        border: {
          DEFAULT: '#302B25',
          hover: '#51483D',
          base: '#302B25',
        },
        success: '#6FA37A',
        warning: '#C9964B',
        error: '#C96B62',
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
        'h1': '88px',
        'h2': '64px',
        'h3': '48px',
        'h4': 'clamp(1.5rem, 2.5vw, 2rem)',
        'body-lg': '18px',
        'body': '16px',
        'small': 'clamp(0.8125rem, 0.9vw, 0.875rem)',
        'technical-sm': '11px',
        'technical-md': '13px',
        'button': '0.875rem',
      },
      lineHeight: {
        'h1': '1.0',
        'h2': '1.1',
        'h3': '1.2',
        'h4': '1.1',
        'body': '1.6',
      },
      letterSpacing: {
        'h1': '-0.04em',
        'h2': '-0.02em',
        'h3': '-0.01em',
        'h4': '-0.02em',
        'technical': '0.02em',
      },
      maxWidth: {
        'container': '1440px',
        'content': '68ch',
      },
      spacing: {
        'gutter': '24px',
        'section-v-space-lg': '160px',
        'section-v-space-sm': '96px',
        'margin-desktop': '64px',
        'margin-mobile': '20px',
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
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
        'glow': '0 0 20px rgba(214, 168, 95, 0.15)',
        'glow-lg': '0 0 40px rgba(214, 168, 95, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
