import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_zh from "./zh.json";

const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,  //国际化的文件
    lng: "zh",  //默认语言
    interpolation: {
      escapeValue: false, //css注入,react已经做了,不需要了
    },
  });

export default i18n;
