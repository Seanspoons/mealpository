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
        'md-home-text': '600px',
        'lg-home-text': '216px',
      },
      spacing: {
        '22': '5.5rem',
      }
  },
  },
  plugins: [],
}

