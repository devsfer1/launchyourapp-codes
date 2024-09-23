/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Includes all files in the 'app' directory
    "./components/**/*.{js,jsx,ts,tsx}", // Includes all files in the 'components' directory
    "./constants/**/*.{js,jsx,ts,tsx}", // Includes all files in the 'constants' directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

