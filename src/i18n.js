import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import translationEN from './locales/en/translation.json';
import translationOR from './locales/or/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  or: {
    translation: translationOR
  }
};

i18n
  .use(LanguageDetector) // Detects user's browser language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Use English if the detected language is not available
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;