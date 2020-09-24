const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    fontFamily: ["responsive", "hover", "focus"],
    fontSize: ["responsive", "hover", "focus"],
    backgroundColor: ["responsive", "odd", "even", "hover", "focus", "active"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
    borderColor: ["responsive", "hover", "focus", "focus-within"],
    translate: ["responsive", "hover", "focus", "motion-safe", "motion-reduce"],
    opacity: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar",
    }),
  ],
};
