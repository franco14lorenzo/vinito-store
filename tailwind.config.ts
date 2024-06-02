import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['var(--font-raleway)'],
        kalnia: ['var(--font-kalnia)']
      },
      colors: {
        pearl: {
          '50': '#faf3eb',
          '100': '#f7ebdd',
          '200': '#edd5bb',
          '300': '#e2b78f',
          '400': '#d59362',
          '500': '#cc7843',
          '600': '#be6338',
          '700': '#9e4e30',
          '800': '#7f402d',
          '900': '#673627',
          '950': '#371a13'
        }
      }
    }
  },
  plugins: []
}
export default config
