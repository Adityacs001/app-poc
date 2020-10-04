/** @jsx jsx */
import "../styles/tailwind.css";
import theme from "../styles/theme";
import { ThemeProvider, jsx, Styled } from "theme-ui";

import PublicLayout from "@/components/Layouts/PublicLayout";

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <PublicLayout children={page} />);

  return (
    <ThemeProvider theme={theme}>
      <Styled.root>{getLayout(<Component {...pageProps} />)}</Styled.root>
    </ThemeProvider>
  );
}

export default MyApp;
