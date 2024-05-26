/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"], // Include TypeScript files (.ts) along with HTML files
  theme: {
    extend: {
      width: {
        50: "600px",
        100: "500px",
      },
      height: {
        50: "300px",
        100: "500px",
      },
    },
  },
  plugins: [],
};
