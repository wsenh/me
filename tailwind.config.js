module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      maxHeight: {
        144: "36rem",
        192: "48rem",
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      colors: {
        "accent-100": "#FAFAFA",
        "accent-200": "#EAEAEA",
        "accent-700": "#333",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [],
};
