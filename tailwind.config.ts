/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate'

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './store/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Explicit border radius values
    'rounded-[4px]',
    'rounded-[6px]',
    'rounded-[8px]',
    'rounded-[9.15px]',
    'rounded-[12px]',
    'rounded-[12.6px]',
    'rounded-[14px]',
    'rounded-[16px]',
    'rounded-[12px_0_12px_0]',
    // Duration values - escaped to avoid ambiguity warnings
    'duration-&lsqb;34ms&rsqb;',
    'duration-&lsqb;250ms&rsqb;',
    'duration-&lsqb;600ms&rsqb;',
    // Ease values - escaped to avoid ambiguity warnings
    'ease-&lsqb;cubic-bezier(0.3,0.7,0.4,1)&rsqb;',
    'ease-&lsqb;cubic-bezier(0.3,0.7,0.4,1.5)&rsqb;',
    // Group hover duration values - escaped to avoid ambiguity warnings
    'group-hover:duration-&lsqb;250ms&rsqb;',
    'group-hover:ease-&lsqb;cubic-bezier(0.3,0.7,0.4,1.5)&rsqb;',
    // Group active duration values - escaped to avoid ambiguity warnings
    'group-active:duration-&lsqb;34ms&rsqb;',
    // Common responsive utilities
    'sm:hidden',
    'sm:block',
    'sm:flex',
    'sm:grid',
    'md:hidden',
    'md:block',
    'md:flex',
    'md:grid',
    'lg:hidden',
    'lg:block',
    'lg:flex',
    'lg:grid',
    'xl:hidden',
    'xl:block',
    'xl:flex',
    'xl:grid',
    'sm:text-xs',
    'sm:text-sm',
    'sm:text-base',
    'sm:text-lg',
    'md:text-xs',
    'md:text-sm',
    'md:text-base',
    'md:text-lg',
    'lg:text-xs',
    'lg:text-sm',
    'lg:text-base',
    'lg:text-lg',
    'xl:text-xs',
    'xl:text-sm',
    'xl:text-base',
    'xl:text-lg',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },

        // Bull Player App Colors - Using CSS Variables
        'dodger-blue': 'var(--dodger-blue)',
        'cornflower-blue': 'var(--cornflower-blue)',
        casper: 'var(--casper)',
        mirage: 'var(--mirage)',
        'mirage-8a': 'var(--mirage-8a)',
        gallery: 'var(--gallery)',
        'yellow-orange': 'var(--yellow-orange)',
        'blue-bayoux': 'var(--blue-bayoux)',
        crimson: 'var(--crimson)',
        'french-rose': 'var(--french-rose)',
        malachite: 'var(--malachite)',
        'polo-blue': 'var(--polo-blue)',
        'ebony-clay': 'var(--ebony-clay)',
        'white-4': 'var(--white-4)',
        'white-8': 'var(--white-8)',
        'white-13': 'var(--white-13)',
        'white-16': 'var(--white-16)',
        'white-21': 'var(--white-21)',
        'white-14': 'rgba(255, 255, 255, 0.14)',
        'white-33': 'var(--white-33)',
        // Additional colors used in TabButton
        'mirage-4': 'rgba(17, 25, 35, 0.04)',
        'mirage-2': 'rgba(17, 25, 35, 0.2)',

        // Additional hardcoded colors found in project
        'deep-blue': 'var(--deep-blue)',
        'navy-dark': 'var(--navy-dark)',
        'gray-600': 'var(--gray-600)',
        'gray-700': 'var(--gray-700)',
        'gray-800': 'var(--gray-800)',
        'gray-900': 'var(--gray-900)',
        'slate-600': 'var(--slate-600)',
        'light-gray': 'var(--light-gray)',
        'white-pure': 'var(--white-pure)',
        'blue-500': 'var(--blue-500)',
        'gradient-start': 'var(--gradient-start)',
        'gradient-end': 'var(--gradient-end)',
        'text-light': 'var(--text-light)',
        'border-light': 'var(--border-light)',
        'border-dark': 'var(--border-dark)',
        'white-29': 'var(--white-29)',
        'white-25': 'var(--white-25)',
        'white-0a': 'var(--white-4)',
        'crimson-80': 'var(--crimson-80)',
        'mirage-73': 'var(--mirage-73)',
        'mirage-54': 'var(--mirage-54)',

        // Poker Chip Colors
        'chip-blue': 'var(--chip-blue)',
        'chip-purple': 'var(--chip-purple)',
        'chip-green': 'var(--chip-green)',
        'chip-navy': 'var(--chip-navy)',
        'chip-red': 'var(--chip-red)',
        'chip-orange': 'var(--chip-orange)',
        'chip-gold': 'var(--chip-gold)',
        'chip-brown': 'var(--chip-brown)',
        'chip-lightblue': 'var(--chip-lightblue)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
  // Enable arbitrary values for all properties
  experimental: {
    arbitraryValues: true,
  },
}
