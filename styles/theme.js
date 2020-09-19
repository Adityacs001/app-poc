export default {
  fonts: {
    body: "aa,Inter var,system-ui, sans-serif",
    heading: 'Inter var,"Avenir Next", sans-serif',
    monospace: "monospace",
  },
  colors: {
    text: "#fff",
    background: "#fff",
    primary: "#33e",
    primary: "#008060",
    primarydark: "#004c3f",
    primarylight: "#fbf7ed",
    secondary: "#161038",
    secondarydark: "#161138",
    tertiary: "#faa317",
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "text",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
      "&:hover": {
        bg: "tertiary",
      },
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      color: "primary",
    },
    pre: {
      background: "primary",
      color: "primary",
      p: [3, 4, 5],
      borderRadius: 4,
    },
  },
};
