/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(10deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(8deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        ping: {
          '75%': {
            transform: 'scale(1.1)',
            opacity: 10
          },
          '100%': {
            transform: 'scale(0.9)',
            opacity: 20
          }
        }
      },
      animation: {
        'wave1': 'wave 3s linear infinite',
        'wave3': 'wave 5s linear infinite',
        'ping1': 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}