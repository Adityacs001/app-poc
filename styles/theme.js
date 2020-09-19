const breakpoints = ["360px", "768px", "1024px", "1280px", "1600px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
breakpoints.xxl = breakpoints[4];

const theme = {
  colors: {
    primary: "#008060",
    primarydark: "#004c3f",
    primarylight: "#fbf7ed",
    secondary: "#161038",
    secondarydark: "#161138",
    tertiary: "#faa317",
  },
  variants: {
    nav: {
      active: {
        color: "#fff",
        backgroundcolor: "#362f78",
      },
      normal: {
        color: "#362f78",
      },
    },
  },
  breakpoints,
};

export default theme;
