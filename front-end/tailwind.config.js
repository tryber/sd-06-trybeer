module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-background': '#e5e7eb',
        primary: '#00caf9',
        'primary-light': '#6afdff',
        'primary-dark': '#0099c6',
        secondary: '#00f98a',
        'secondary-light': '#6bffbb',
        'secondary-dark': '#00c55b',
      },
    },
  },
  variants: {
    extend: {
      whitespace: ['hover', 'focus'],
      opacity: ['disabled'],
    },
  },
  plugins: [
    function ({ addComponents }) {
      const scrollbars = {
        '.scrollbar::-webkit-scrollbar': {
          width: '10px',
        },
        '.scrollbar::-webkit-scrollbar-track': {
          backgroundColor: '#F2F2F2',
          borderRadius: '10px',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: '#E0E0E0',
          borderRadius: '10px',
        },
        '.scrollbar::-webkit-scrollbar-button': {
          display: 'none',
        },
      };
      addComponents(scrollbars);
    },
  ],
};
