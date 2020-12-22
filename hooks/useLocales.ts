import React from "react";
import { useRouter } from "next/router";
import { useI18n } from "next-localization";
import useStore from "../store/index";

export default function useLocales() {
  const router = useRouter();
  const translations = useI18n();
  const changelocalestate = useStore((state) => state.changelocale);

  React.useEffect(() => {
    async function changeLocale() {
      if (router.locale === "en") {
        translations.set("en", await import("../locales/en/common.json"));
        translations.locale("en");
        changelocalestate(0);
      } else if (router.locale === "ae") {
        translations.set("ae", await import("../locales/ae/common.json"));
        translations.locale("ae");
        changelocalestate(1);
      }
    }
    changeLocale();
  }, [router.locale]);

  return { translations };
}
