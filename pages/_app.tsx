import "../styles/globals.css";
import * as React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { I18nProvider } from "next-localization";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";
import tw, { styled } from "twin.macro";
import {
  MantineProvider,
  GlobalStyles,
  useStylesCleanup,
  SsrProvider,
} from "@mantine/core";

function MyApp({ Component, pageProps, router }: AppProps) {
  const { lngDict, ...rest } = pageProps;

  const PageWrapper = styled.div((props: any & { locale: string }) => [
    props?.locale == "en" ? tw`direction[ltr]` : tw`direction[rtl]`,
    tw`antialiased`,
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  return (
    <React.Fragment>
      <Head>
        <title>HRA - Employement Opportunities</title>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`Author : Aditya Kumar ,HRA, Human Resources Authority Training portal for Abu Dhabi Nationals,Human Resources Authority provides all support and cooperation to jobseekers to help them carrer goals.`}
        ></meta>
        <meta name="copyright" content="Human Resources Authority"></meta>
        <meta
          name="keywords"
          content={`Author : Aditya Kumar ,HRA, Human Resources Authority Training portal for Abu Dhabi Nationals,Human Resources Authority provides all support and cooperation to jobseekers to help them carrer goals.`}
        ></meta>
        <meta name="robot" content="index,follow"></meta>
        <meta name="og:url" content="https://training.hra.gov.ae/"></meta>
        <meta
          property="og:title"
          content={`Author : Aditya Kumar ,HRA, Human Resources Authority Training portal for Abu Dhabi Nationals,Human Resources Authority provides all support and cooperation to jobseekers to help them carrer goals.`}
        ></meta>
        <meta
          property="og:description"
          content={`Author : Aditya Kumar ,HRA,Human Resources Authority Training portal for Abu Dhabi Nationals,Human Resources Authority provides all support and cooperation to jobseekers to help them carrer goals.`}
        ></meta>
        <link rel="icon" href="/images/favicon.ico"></link>
      </Head>
      <I18nProvider
        lngDict={lngDict}
        locale={
          router.locale || (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string)
        }
      >
        <SsrProvider>
          <MantineProvider
            theme={{
              colorScheme: "light",
            }}
          >
            <GlobalStyles />
            <PageWrapper locale={router.locale}>
              <QueryClientProvider client={queryClient}>
                <AnimatePresence exitBeforeEnter={true}>
                  <Component {...pageProps} />
                </AnimatePresence>
              </QueryClientProvider>
            </PageWrapper>
          </MantineProvider>
        </SsrProvider>
      </I18nProvider>
    </React.Fragment>
  );
}
export default MyApp;
