/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PERFECT DARK THEME WITH BEIGE ACCENTS (EXACTLY LIKE LOVABLE BUT BETTER!)
        background: '#0a0a0a',
        foreground: '#ffffff',
        card: '#111111',
        'card-foreground': '#ffffff',
        popover: '#111111',
        'popover-foreground': '#ffffff',
        primary: {
          DEFAULT: '#C48A64', // EXACT BEIGE COLOR YOU WANTED!
          foreground: '#000000',
          50: '#FDF8F3',
          100: '#F9EFE3',
          200: '#F2DCC1',
          300: '#E8C49B',
          400: '#DCA973',
          500: '#C48A64', // MAIN BEIGE
          600: '#B8795A',
          700: '#A67A4A',
          800: '#8A6640',
          900: '#715437',
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1a1a1a',
          foreground: '#888888',
        },
        accent: {
          DEFAULT: '#C48A64',
          foreground: '#000000',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#2a2a2a',
        input: '#1a1a1a',
        ring: '#C48A64',
        // Custom colors for our BEAST theme
        dark: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        beige: {
          50: '#FDF8F3',
          100: '#F9EFE3',
          200: '#F2DCC1',
          300: '#E8C49B',
          400: '#DCA973',
          500: '#C48A64', // PERFECT BEIGE
          600: '#B8795A',
          700: '#A67A4A',
          800: '#8A6640',
          900: '#715437',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        // LIGHTNING FAST SMOOTH ANIMATIONS
        'fade-in': 'fadeIn 0.1s ease-out forwards',
        'slide-up': 'slideUp 0.1s ease-out forwards',
        'scale-in': 'scaleIn 0.1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'card-hover': 'cardHover 0.1s ease-out forwards',
        'text-shimmer': 'textShimmer 2s ease-in-out infinite',
        'interactive-bounce': 'interactiveBounce 0.1s ease-out',
        'smooth-scale': 'smoothScale 0.1s ease-out',
        'ultra-smooth': 'ultraSmooth 0.1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(196, 138, 100, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(196, 138, 100, 0.6)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        cardHover: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-8px) scale(1.02)' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        interactiveBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        smoothScale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        ultraSmooth: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-2px) scale(1.01)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'beige-gradient': 'linear-gradient(135deg, #C48A64 0%, #DCA973 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'shimmer': 'linear-gradient(90deg, rgba(196, 138, 100, 0.3), rgba(196, 138, 100, 1), rgba(196, 138, 100, 0.3))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(196, 138, 100, 0.3)',
        'glow-lg': '0 0 40px rgba(196, 138, 100, 0.4)',
        'dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 40px rgba(196, 138, 100, 0.2)',
        'interactive': '0 4px 20px rgba(196, 138, 100, 0.15)',
      },
      borderWidth: {
        '3': '3px',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      transitionDuration: {
        '100': '100ms', // ULTRA SMOOTH TRANSITIONS
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};