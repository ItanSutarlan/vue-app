module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      colors: {
        "link-accent": "#1FB2A5",
      },
    },
  },
  daisyui: {
    themes: ["dark"],
  },
};
