/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#FFFFFF',      // Crisp White — primary background
          ghost: '#F8FAFC',      // Ghost White — secondary background sections
          ash: '#E2E8F0',        // Light Ash — borders, separators, UI elements
          slate: '#64748B',      // Slate Gray — body text, subdued icons
          midnight: '#0A192F',   // Midnight Blue — headings, dark accents
          indigo: '#4F46E5',     // Electric Indigo — primary brand color
          cyan: '#06B6D4',       // Vibrant Cyan — secondary accent, hovers
          coral: '#F43F5E',      // Coral Pink — CTA buttons, highlights
          orange: '#F47B20',     // Vibrant Orange — for the logo and specific accents
        }
      },
      fontFamily: {
        sans: ['Basier Circle', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Basier Circle', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-indigo': '0 0 30px rgba(79, 70, 229, 0.25)',
        'glow-cyan':   '0 0 30px rgba(6, 182, 212, 0.25)',
        'glow-coral':  '0 0 30px rgba(244, 63, 94, 0.30)',
        'glow-orange': '0 0 30px rgba(244, 123, 32, 0.30)',
        'card':        '0 4px 24px 0 rgba(10, 25, 47, 0.08)',
        'card-hover':  '0 8px 40px 0 rgba(10, 25, 47, 0.14)',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':      'float 6s ease-in-out infinite',
        'shimmer':    'shimmer 3s linear infinite',
      }
    },
  },
  plugins: [],
}
