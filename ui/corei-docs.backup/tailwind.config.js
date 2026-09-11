/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#cea96f',
        'bg-primary': '#0b0e11',
        'bg-secondary': '#13171e',
        'bg-tertiary': '#181d26',
        'bg-card': '#1a1f28',
        'border-color': '#2a2e36',
        'text-primary': '#f0f2f5',
        'text-secondary': '#d7dce2',
        'text-muted': '#6a7280',
      },
    },
  },
  plugins: [],
};
