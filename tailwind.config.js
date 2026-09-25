/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        success: {
          DEFAULT: '#16A34A',
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        accent: {
          DEFAULT: '#0EA5E9',
          50: '#F0F9FF',
          100: '#E0F2FE',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        surface: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
        },
        mota: {
          gold: '#D97706',
          amber: '#F59E0B',
          saffron: '#FF9933',
          green: '#138808',
          navy: '#000080',
        }
      },
      borderRadius: {
        'card': '24px',
        'inner': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'soft': '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
        'soft-lg': '0 20px 35px -10px rgba(15, 23, 42, 0.09), 0 10px 15px -5px rgba(15, 23, 42, 0.04)',
        'glow-primary': '0 0 20px rgba(37, 99, 235, 0.25)',
        'glow-success': '0 0 20px rgba(22, 163, 74, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
