import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
 .use(Backend)
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
    fallbackLng: 'en', // Default to 'en' if no language is detected
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
 }, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
    // Check if the detected language is any variant of English
    if (i18n.languages[0].startsWith('en')) {
      // Set the language to 'English'
      i18n.changeLanguage('en');
    }
 });


export default i18n;
