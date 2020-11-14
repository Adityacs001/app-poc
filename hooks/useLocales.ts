import React from "react";
import { useRouter } from "next/router";
import { useI18n } from "next-localization";

export default function useLocales() {
  const router = useRouter();
  const translations = useI18n();

  React.useEffect(() => {
    async function changeLocale() {
      if (router.locale === "en") {
        translations.set("en", await import("../locales/en/common.json"));
        translations.locale("en");
      } else if (router.locale === "ae") {
        translations.set("ae", await import("../locales/ae/common.json"));
        translations.locale("ae");
      }
    }
    changeLocale();
  }, [router.locale]);

  return { translations };
}
