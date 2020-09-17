import "../styles/base.css";
import { ThemeProvider, useTheme, css } from "@emotion/react";
import styled from "@emotion/styled";
import theme from "../styles/theme";
import { Box, Flex } from "reflexbox";

import useStore from "../store/index";

const SomeText = styled.header`
  background: ${(props) => props.theme.colors.primary};
`;

function MyApp({ Component, pageProps }) {
  const user = useStore((state) => state.user);
  return (
    <ThemeProvider theme={theme}>
      <SomeText>{user.name}</SomeText>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
