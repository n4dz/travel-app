/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),],
}