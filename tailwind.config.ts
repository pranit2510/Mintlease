import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          emerald: '#047857',
          'emerald-light': '#10b981',
          'emerald-dark': '#065f46',
        },
        gold: {
          primary: '#f59e0b',
          secondary: '#fbbf24',
          light: '#fef3c7',
        },
        neutral: {
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
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #10b981 0%, #047857 50%, #065f46 100%)',
        'gradient-radial': 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        'gradient-3d': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.8) 50%, rgba(220,220,220,0.9) 100%)',
        'gradient-3d-invert': 'linear-gradient(145deg, rgba(220,220,220,0.9) 0%, rgba(240,240,240,0.8) 50%, rgba(255,255,255,0.9) 100%)',
        'gradient-depth': 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.9) 30%, rgba(245,245,245,0.8) 70%, rgba(240,240,240,0.95) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        luxury: ['Source Serif Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'hover': '0 35px 60px -12px rgba(0, 0, 0, 0.35)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        '3d-sm': `
          0 2px 4px -1px rgba(0, 0, 0, 0.15),
          0 4px 8px -2px rgba(0, 0, 0, 0.1),
          0 1px 3px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        '3d': `
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 8px 16px -4px rgba(0, 0, 0, 0.15),
          0 16px 24px -8px rgba(0, 0, 0, 0.1),
          0 2px 4px rgba(0, 0, 0, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          inset 0 -1px 0 rgba(0, 0, 0, 0.05)
        `,
        '3d-lg': `
          0 8px 16px -4px rgba(0, 0, 0, 0.15),
          0 20px 40px -8px rgba(0, 0, 0, 0.2),
          0 40px 64px -16px rgba(0, 0, 0, 0.15),
          0 4px 8px rgba(0, 0, 0, 0.08),
          inset 0 2px 0 rgba(255, 255, 255, 0.2),
          inset 0 -2px 0 rgba(0, 0, 0, 0.05)
        `,
        '3d-xl': `
          0 16px 32px -8px rgba(0, 0, 0, 0.2),
          0 32px 64px -16px rgba(0, 0, 0, 0.25),
          0 64px 128px -32px rgba(0, 0, 0, 0.2),
          0 8px 16px rgba(0, 0, 0, 0.1),
          inset 0 3px 0 rgba(255, 255, 255, 0.25),
          inset 0 -3px 0 rgba(0, 0, 0, 0.08)
        `,
        '3d-emerald': `
          0 8px 16px -4px rgba(4, 120, 87, 0.25),
          0 20px 40px -8px rgba(4, 120, 87, 0.15),
          0 40px 64px -16px rgba(0, 0, 0, 0.1),
          0 4px 8px rgba(4, 120, 87, 0.1),
          inset 0 2px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(4, 120, 87, 0.1)
        `,
        '3d-gold': `
          0 8px 16px -4px rgba(245, 158, 11, 0.25),
          0 20px 40px -8px rgba(245, 158, 11, 0.15),
          0 40px 64px -16px rgba(0, 0, 0, 0.1),
          0 4px 8px rgba(245, 158, 11, 0.1),
          inset 0 2px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(245, 158, 11, 0.1)
        `,
        '3d-inset': `
          inset 0 2px 8px rgba(0, 0, 0, 0.15),
          inset 0 4px 16px rgba(0, 0, 0, 0.1),
          inset 0 1px 4px rgba(0, 0, 0, 0.1)
        `,
        '3d-hover': `
          0 12px 24px -8px rgba(0, 0, 0, 0.2),
          0 24px 48px -12px rgba(0, 0, 0, 0.25),
          0 48px 80px -24px rgba(0, 0, 0, 0.2),
          0 6px 12px rgba(0, 0, 0, 0.1),
          inset 0 2px 0 rgba(255, 255, 255, 0.25),
          inset 0 -2px 0 rgba(0, 0, 0, 0.05)
        `,
        '3d-soft': `
          0 2px 8px rgba(0, 0, 0, 0.08),
          0 8px 24px rgba(0, 0, 0, 0.12),
          0 16px 32px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        '3d-float': 'float3d 4s ease-in-out infinite',
        '3d-pulse': 'pulse3d 3s ease-in-out infinite',
        'depth-glow': 'depthGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          'from': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
          'to': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { transform: 'translateY(30px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          'from': { backgroundPosition: '0 0' },
          'to': { backgroundPosition: '-200% 0' },
        },
        float3d: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateZ(0px)',
            boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.15), 0 20px 40px -8px rgba(0, 0, 0, 0.2)'
          },
          '50%': { 
            transform: 'translateY(-12px) translateZ(20px)',
            boxShadow: '0 20px 32px -8px rgba(0, 0, 0, 0.2), 0 40px 64px -16px rgba(0, 0, 0, 0.25)'
          },
        },
        pulse3d: {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.15)'
          },
          '50%': { 
            transform: 'scale(1.02)',
            boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.2)'
          },
        },
        depthGlow: {
          'from': { 
            boxShadow: '0 8px 16px -4px rgba(4, 120, 87, 0.15), 0 20px 40px -8px rgba(4, 120, 87, 0.1)' 
          },
          'to': { 
            boxShadow: '0 16px 32px -8px rgba(4, 120, 87, 0.25), 0 32px 64px -16px rgba(4, 120, 87, 0.15)' 
          },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        '3d': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        '3d-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '20px',
        'xl': '40px',
      },
      screens: {
        'xs': '375px',      // iPhone SE, small phones
        'sm': '640px',      // Default Tailwind sm
        'md': '768px',      // Default Tailwind md
        'lg': '1024px',     // Default Tailwind lg
        'xl': '1280px',     // Default Tailwind xl  
        '2xl': '1536px',    // Default Tailwind 2xl
        '3xl': '1680px',    // Ultra-wide monitors
        '4xl': '2048px',    // 4K displays
        // Mobile-specific breakpoints
        'mobile-xs': '320px',   // Very small phones
        'mobile-sm': '375px',   // iPhone SE, iPhone 12 mini
        'mobile-md': '390px',   // iPhone 12/13/14
        'mobile-lg': '414px',   // iPhone Plus models
        'mobile-xl': '428px',   // iPhone Pro Max models
        'tablet-sm': '768px',   // iPad Mini
        'tablet-lg': '1024px',  // iPad Pro
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
        '2000': '2000px',
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.08)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.12)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'premium': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'luxury-subtle': '0 1px 2px rgba(4, 120, 87, 0.08), 0 2px 4px rgba(0, 0, 0, 0.03)',
        'gold-subtle': '0 1px 2px rgba(245, 158, 11, 0.08), 0 2px 4px rgba(0, 0, 0, 0.03)',
        'depth-minimal': '0 1px 0 rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.04)',
        'refined': '0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'elegant': '0 2px 6px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)',
        'none': 'none',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function({ addUtilities }: any) {
      const textShadowUtilities: Record<string, any> = {}
      
      // Generate refined text-shadow utilities
      const shadows = {
        'text-shadow-sm': { textShadow: '0 1px 2px rgba(0, 0, 0, 0.08)' },
        'text-shadow': { textShadow: '0 2px 4px rgba(0, 0, 0, 0.12)' },
        'text-shadow-lg': { textShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' },
        'text-shadow-none': { textShadow: 'none' },
        'text-shadow-subtle': { textShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' },
        'text-shadow-premium': { textShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' },
        'text-shadow-luxury-subtle': { textShadow: '0 1px 2px rgba(4, 120, 87, 0.08), 0 2px 4px rgba(0, 0, 0, 0.03)' },
        'text-shadow-gold-subtle': { textShadow: '0 1px 2px rgba(245, 158, 11, 0.08), 0 2px 4px rgba(0, 0, 0, 0.03)' },
        'text-shadow-depth-minimal': { textShadow: '0 1px 0 rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.04)' },
        'text-shadow-refined': { textShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)' },
        'text-shadow-elegant': { textShadow: '0 2px 6px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)' },
      }
      
      addUtilities(shadows)
    },
  ],
};

module.exports = config; 