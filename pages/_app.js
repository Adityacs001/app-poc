import "../styles/base.css";
import { ThemeProvider, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import theme from "../styles/theme";
import { Box, Flex } from "reflexbox";
import tw from "@tailwindcssinjs/macro";
import useStore from "../store/index";
import { css } from "@emotion/css";
import Sidebar from "@/components/Sidebar";

const SomeText = styled.header`
  background: ${(props) => props.theme.colors.primary};
`;

function MyApp({ Component, pageProps }) {
  const user = useStore((state) => state.user);
  const setUser = useStore((store) => store.setUser);
  return (
    <ThemeProvider theme={theme}>
      <Flex className={css(tw`h-screen overflow-hidden bg-gray-100`)}>
        <Component {...pageProps} />
      </Flex>
    </ThemeProvider>
  );
}

export default MyApp;
