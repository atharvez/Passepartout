module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hackerBg: "#000000",
        hackerText: "#00FF41",
        hackerAccent: "#00BFFF",
        hackerWhite: "#FFFFFF",
      },
      fontFamily: {
        hacker: ["'Courier New'", "monospace"],
      },
    },
  },
  plugins: [],
};
