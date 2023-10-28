/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'bg': 'var(--bg)',
        'bgGrey': 'var(--bgGrey)',
        'bgWhite': 'var(--bgWhite)',
        'card1': 'var(--card1)',
        'card2': 'var(--card2)',
        'card3': 'var(--card3)',
        'card4': 'var(--card4)',
        'card5': 'var(--card5)',
        'card6': 'var(--card6)',
        'blankCard': 'var(--blankCard)',
      },
      textColor: {
        'textColHd': 'var(--textColHd)',
        'textColSp': 'var(--textColSp)',
        'btnCol1': 'var(--btnCol1)',
        'btnCol2': 'var(--btnCol2)',
      },
    },
  },
  plugins: [],
}
