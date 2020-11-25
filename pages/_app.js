/** @jsxRuntime classic */
/** @jsx jsx */

import * as React from "react";
import "../styles/tailwind.css";
import theme from "../styles/theme";
import { ThemeProvider, Styled, jsx } from "theme-ui";
import { I18nProvider } from "next-localization";
import { useRouter } from "next/router";

import DefaultLayout from "@components/Layouts/BlankLayout";

const MyApp = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout children={page} />);

  const router = useRouter();
  const { lngDict, ...rest } = pageProps;

  return (
    <ThemeProvider theme={theme}>
      <I18nProvider lngDict={lngDict} locale={router.locale}>
        <Styled.root>{getLayout(<Component {...rest} />)}</Styled.root>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default MyApp;
