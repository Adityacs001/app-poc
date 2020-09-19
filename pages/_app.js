/** @jsx jsx */
import "../styles/tailwind.css";
import theme from "../styles/theme";
import { ThemeProvider, jsx, Styled, Button } from "theme-ui";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Styled.root>
        <pre>Some code here</pre>
        <Button variant="secondary">Go</Button>
        <Component {...pageProps} />
      </Styled.root>
    </ThemeProvider>
  );
}

export default MyApp;
