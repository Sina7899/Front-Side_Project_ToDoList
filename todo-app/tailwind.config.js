/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image": "url('/src/assets/background_picture.jpg')",
      },
    },
  },
  plugins: [],
};
