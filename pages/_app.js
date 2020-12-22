/** @jsxRuntime classic */
/** @jsx jsx */

import React from "react";
import "../styles/global.css";
import theme from "../styles/theme";
import { ThemeProvider, Styled, jsx, sx } from "theme-ui";
import { I18nProvider } from "next-localization";
import { QueryClient, QueryClientProvider } from "react-query";
import { motion } from "framer-motion";
import DefaultLayout from "@components/Layouts/BlankLayout";
import useStore, { languageSelector } from "../store/index";
import classnames from "classnames";

const MyApp = ({ Component, pageProps, router }) => {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout children={page} />);
  const queryClient = new QueryClient();

  const { lngDict, ...rest } = pageProps;

  const memoizedlocalestate = useStore(React.useCallback(languageSelector, []));

  return (
    <ThemeProvider theme={theme}>
      <I18nProvider lngDict={lngDict} locale={router.locale}>
        <Styled.root>
          <QueryClientProvider client={queryClient}>
            <motion.div
              className={classnames(
                { ltr: memoizedlocalestate === "en" },
                { rtl: memoizedlocalestate === "ae" },
              )}
              sx={{
                direction: memoizedlocalestate === "en" ? "ltr" : "rtl",
              }}
              key={router.route}
              inital="initalLoad"
              animate="pageAnimate"
              variants={{
                initalLoad: {
                  opacity: 0,
                },
                pageAnimate: {
                  opacity: 1,
                  transition: {
                    delay: 2,
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {getLayout(<Component {...rest} />)}
            </motion.div>
          </QueryClientProvider>
        </Styled.root>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default MyApp;
