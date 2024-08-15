/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image": "url('/src/assets/images/background_picture.jpg')",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        IBM: ["IBM Plex Mono", "serif"],
      },
      colors: {
        Blue_B1: "#FDFEFF",
        Blue_B2: "#F3F8FF",
        Blue_B3: "#DDEDFF",
        Blue_B4: "#BEDCFF",
        Blue_B5: "#95C6FF",
        Blue_B6: "#61AAFF",
        Blue_B7: "#2388FF",
        Black_B1: "#F7F7F7",
        Black_B2: "#F2F2F2",
        Black_B3: "#EBEBEB",
        Black_B4: "#E0E0E0",
        Black_B5: "#9E9E9E",
        Black_B6: "#666666",
        Black_B7: "#212121",
        White_W1: "#F7F7F7",
        White_W2: "#FFFEFE",
        White_W3: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
