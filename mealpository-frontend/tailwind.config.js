/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
      'ebe9e5': '#ebe9e5',
      '013a63': '#013a63',
      '597385': '#597385',
      'd9d9d9': '#d9d9d9',
      '4e4e4e': '#4e4e4e',
    },
      fontSize: {
        'mb-button': '1.04rem',
      },
      maxWidth: {
        'mb-home-text': '216px',
        'mb-works-text': '266px',
        'sm-works-text': '325px',
        'sm-home-text': '400px',
        'md-works-text': '550px',
        'md-home-text': '700px',
        'lg-home-text': '800px',
        'xl-home-text': '800px',
      },
      spacing: {
        '21': '5.25rem',
        '22': '5.5rem',
        '23': '5.75rem',
      },
      screens: {
        'lg-xl': '1075px',
        'xl1730': '1730px',
        'xl2100': '2100px',
      },
      fontFamily: {
        'sans': ['Istok Web', 'Helvetica'],
      }
  },
  },
  plugins: [],
}

