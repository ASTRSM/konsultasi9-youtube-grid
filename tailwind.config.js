/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/*.html', './dist/**/*.js'],
  theme: {
    extend: {
      colors: {
        'background': '#141414',
        'gray': '#BDBDBD',
        'dark-gray': '#333333',
        'transparent-gray': 'rgba(0, 0, 0, 0.808)',
      },  
      gridTemplateColumns: {
        'auto-320': 'repeat(auto-fit, 320px)',
      },
      gap: {
        '07': '.7rem',
      }
    },
  },
  plugins: [],
}

