/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#060a12',
          900: '#0b1120',
          850: '#0f172a',
          800: '#141f36',
          700: '#1e2e4f',
          600: '#2c3f66',
          cyan: '#00f5d4',
          'cyan-bright': '#38fdf1',
          'cyan-dim': '#009e89',
          green: '#10b981',
          'green-bright': '#34d399',
          emerald: '#059669',
          amber: '#f59e0b',
          rose: '#f43f5e',
          purple: '#a855f7',
          blue: '#3b82f6',
        },
        voxel: {
          dark: '#0a0e17',
          surface: '#121a29',
          panel: '#182236',
          card: '#1e2942',
          border: '#2a3b5c',
          highlight: '#3d527a',
          bevelLight: '#476394',
          bevelDark: '#0d131f'
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['"Chakra Petch"', 'sans-serif'],
        code: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'voxel': '3px 3px 0px 0px rgba(0, 0, 0, 0.7), inset 1px 1px 0px 0px rgba(255, 255, 255, 0.15)',
        'voxel-lg': '5px 5px 0px 0px rgba(0, 0, 0, 0.8), inset 2px 2px 0px 0px rgba(255, 255, 255, 0.2)',
        'voxel-cyan': '0 0 15px rgba(0, 245, 212, 0.35), 3px 3px 0px 0px #005c50',
        'voxel-green': '0 0 15px rgba(16, 185, 129, 0.35), 3px 3px 0px 0px #064e3b',
        'voxel-rose': '0 0 15px rgba(244, 63, 94, 0.35), 3px 3px 0px 0px #881337',
        'neon-cyan': '0 0 10px #00f5d4, 0 0 20px rgba(0, 245, 212, 0.5)',
        'neon-green': '0 0 10px #10b981, 0 0 20px rgba(16, 185, 129, 0.5)',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'block-bounce': 'blockBounce 0.4s ease-out',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 8px rgba(0, 245, 212, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 18px rgba(0, 245, 212, 0.85))' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        blockBounce: {
          '0%': { transform: 'scale(0.92)' },
          '50%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
};
