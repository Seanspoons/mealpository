/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
      'ebe9e5': '#ebe9e5',
      '013a63': '#013a63',
    },
      fontSize: {
        'mb-button': '1.04rem',
      },
      maxWidth: {
        'mb-home-text': '216px',
        'sm-home-text': '400px',
        'md-home-text': '700px',
        'lg-home-text': '800px',
        'xl-home-text': '800px',
      },
      spacing: {
        '21': '5.25rem',
        '22': '5.5rem',
        '23': '5.75rem',
      }
  },
  },
  plugins: [],
}

