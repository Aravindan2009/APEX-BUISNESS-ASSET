/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A1220',      // Deep navy-black (logo shadow/background tone)
          card: '#0F1C2E',      // Dark steel-blue card background
          navy: '#1A3A5C',      // Deep blue from logo "A" structure
          primary: '#2D5F8A',   // Steel blue — main "A" outer frame
          orange: '#F47B20',    // Vibrant orange — logo bar chart columns
          green: '#2DB84B',     // Bright green — logo growth arrow
          light: '#F0F6FF',     // Slight blue-tinted white
          muted: '#7A95B0',     // Muted blue-grey for body text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue':   '0 0 25px rgba(45, 95, 138, 0.5)',
        'glow-orange': '0 0 25px rgba(244, 123, 32, 0.5)',
        'glow-green':  '0 0 25px rgba(45, 184, 75, 0.5)',
        'glass':       '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':      'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
