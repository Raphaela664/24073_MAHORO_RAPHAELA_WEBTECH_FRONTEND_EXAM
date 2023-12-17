module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "rgb(51,64,84)",
        customWhite: "rgb(208,207,226)",
        customBlue: "#170E7D",
        errorColor: "#EF2637"
      },
      fontFamily: {
        "work-sans": ["Work Sans", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
