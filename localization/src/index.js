import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'hk', 'ar'],
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    // resources: {
    //   en: {
    //     translation: {
    //       "Welcome to React": "Welcome to React and react-i18next"
    //     }
    //   },
    //   hk: {
    //     translation: {
    //       "Welcome to React": "歡迎來香港"
    //     }
    //   }
    // },
    // lng: document.querySelector('html').lang,// "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    detection: {
      // order and from where user language should be detected
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      // cache user language on
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    }
    // ,react: { useSuspense: false }
  });

const loadingMarkup = (
  <h1 className="d-flex justify-content-center mt-5">Loading...</h1>
)

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
