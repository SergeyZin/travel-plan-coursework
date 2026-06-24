import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D9488',
        'primary-dark': '#0F766E',
        'primary-light': '#5EEAD4',
        accent: '#FB7185',
        'accent-dark': '#E11D48',
        sand: '#FEF3C7',
        ocean: '#0EA5E9',
        sunset: '#F97316',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D9488 0%, #0EA5E9 50%, #0F766E 100%)',
      },
    },
  },
  plugins: [],
}
export default config
