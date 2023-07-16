/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      width: {
        '128': '36rem',
      },
      margin: {
        '1.6': '0.47rem'
      },
      height: {
        '124': '34rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

