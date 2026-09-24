/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F8FA',
        surface: '#FFFFFF',
        navy: {
          50: '#F0F5FA',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#102A43',
          950: '#081726',
        },
        emergency: {
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          900: '#7A271A',
        },
        amber: {
          50: '#FEF0C7',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
        },
        green: {
          50: '#ECFDF3',
          100: '#D1FADF',
          500: '#12B76A',
          600: '#039855',
          700: '#027A48',
        },
        charcoal: {
          900: '#101828',
          800: '#1D2939',
          700: '#344054',
          600: '#475467',
          500: '#667085',
          400: '#98A2B3',
          300: '#D0D5DD',
          200: '#E4E7EC',
          100: '#F2F4F7',
          50: '#F9FAFB',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 24, 40, 0.05), 0 1px 2px -1px rgba(16, 24, 40, 0.05)',
        'card': '0 4px 6px -1px rgba(16, 24, 40, 0.04), 0 2px 4px -2px rgba(16, 24, 40, 0.04)',
        'elevated': '0 12px 24px -4px rgba(16, 24, 40, 0.08), 0 4px 8px -4px rgba(16, 24, 40, 0.04)',
        'float': '0 20px 30px -6px rgba(16, 42, 67, 0.12), 0 8px 12px -4px rgba(16, 42, 67, 0.06)',
      },
    },
  },
  plugins: [],
}
