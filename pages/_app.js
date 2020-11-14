import * as React from "react";
import "../styles/tailwind.css";
import theme from "../styles/theme";
import { ThemeProvider, jsx, Styled } from "theme-ui";
// import { appWithTranslation } from "../i18n";
import { I18nProvider } from "next-localization";
import { useRouter } from "next/router";

import PublicLayout from "@components/Layouts/PublicLayout";

const MyApp = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout || ((page) => <PublicLayout children={page} />);

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

//export default appWithTranslation(MyApp);
export default MyApp;
