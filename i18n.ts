// import NextI18Next from "next-i18next";

// const language = new NextI18Next({
//   defaultLanguage: "en",
//   otherLanguages: ["ae"],
//   defaultNS: "common",
//   localeSubpaths: {
//     ae: "ae",
//   },
//   localePath: "public/locales",
// });

// module.exports = {
//   appWithTranslation: language.appWithTranslation,
//   withTranslation: language.withTranslation,
// };

const NextI18Next = require("next-i18next").default;
const { localeSubpaths } = require("next/config").default().publicRuntimeConfig;
const path = require("path");

module.exports = new NextI18Next({
  defaultLanguage: "en",
  defaultNS: "common",
  otherLanguages: ["en", "ae"],
  localeSubpaths,
  localePath: path.resolve("public/locales"),
});
