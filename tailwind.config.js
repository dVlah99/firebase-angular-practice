/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"], // Include TypeScript files (.ts) along with HTML files
  theme: {
    extend: {
      width: {
        50: "600px",
      },
      height: {
        50: "300px",
      },
    },
  },
  plugins: [],
};
