module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-background': '#e5e7eb',
        primary: '#651fff',
        'primary-light': '#a255ff',
        'primary-dark': '#0100ca',
        secondary: '#ff6f00',
        'secondary-light': '#ffa040',
        'secondary-dark': '#c43e00',
      },
      keyframes: {
        'fade-hide': {
            '0%': {
                opacity: '1'
            },
            '100%': {
                opacity: '0'
            },
        },
      },
      animation: {
          'fade-hide': 'hide 1s'
      }
    },
  },
  variants: {
    extend: {
      whitespace: ['hover', 'focus'],
    },
  },
  plugins: [],
}