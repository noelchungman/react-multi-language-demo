# react-multi-language-demo
npx create-react-app localization --template clean-cra

"code localization" then in that new open window:

https://react.i18next.com/
Click "Getting started" copy the command:
npm install react-i18next i18next   
(no need the " --save")

put the the sample code in webpage to src/index.js(and App.js -- you may remove this to put to index.js)

the interpolation part in samle code no need

Google "i18next browser language detection"

Run: 
npm install i18next-browser-languagedetector

comment "lng" option in i18n
Copy the related sample code to index.js:
import LanguageDetector from 'i18next-browser-languagedetector';
    .use(LanguageDetector)
    detection: {
      // order and from where user language should be detected
      order: ['cookie','htmlTag', 'localStorage', 'path', 'subdomain'],
      // cache user language on
      caches: ['cookie']
      supportedLngs: ['en', 'hk','ar']
    }

Google "i18next-http-backend"
npm install i18next-http-backend

In public folder, right click new file "assets\locales\en\translation.json"
and "assets\locales\hk\translation.json"

remove "resources" property
put the value to the relevant file in json key

import HttpApi from 'i18next-http-backend';

add:
.use(HttpApi)

,
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: { useSuspense: false }

go https://getbootstrap.com/
copy the command, e.g.: npm i bootstrap@5.3.2

import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'

add back i18n propty
supportedLngs: ['en','hk','ar']

example of variable in the translation,json
,
    "days_since_release": "it's been {{number_of_days}} days since this video was released"
    "days_since_release": "自該影片發布以來已過去 {{number_of_days}} 天"
    "days_since_release": "لقد مر {{number_of_days}} يوم منذ إصدار هذا الفيديو"

App.js
  const number_of_days = 1;
          <p>{t('days_since_release', { number_of_days })}</p>

or 
   <p>{t('days_since_release', { number_of_days: 99 })}</p>

Back to getbootstrap.com find document, find dropdown, copy button dropdown sample code
Under container, have div class below, and in it paste the dropdown code:
      <div className="d-flex justify-content-end mt-1">

remember the sample code "class" change to "className"

Optional to add flags, see the classname in the docs: npm install flag-icon-css

Optional:
If you want globe icon, back to getbootstrap.com again, find the "Icons"

----------------------------------------------------------------
If we refresh the page, we will see the key name instead of the original text first e.g. "welcome_to_react" instead of "Welcome to react", to avoid that:
1. index.js i18n property remove "react: { useSuspense: false }"
2. index.js "import React from 'react';" change to "import React, { Suspense } from 'react';"
3. index.js in ReactDOM.render wrap by "<Suspense fallback={loadingMarkup}>" and add:
const loadingMarkup = (
  <h1 className="d-flex justify-content-center mt-5">Loading...</h1>
)
----------------------------------------------------------------
to arabic right to left:
1. public index.html body tag add " dir="ltr"" which means left to right direction
2. npm install js-cookie     <= to access the cookies of the language
3. App.js languages variable just arabian add "    direction: "rtl""
4. import cookies from 'js-cookie';
5.   const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find(({ code }) => code === currentLanguageCode);

    // every time the currentLanguage changes, the direction change as well
    useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
  }, [currentLanguage])

----------------------------------------------------------------
Optional: disable the currect selected language selection to show what language you have selected in button tag
                  disabled={code === currentLanguageCode}

----------------------------------------------------------------
To chagne the page title change the previous useEffect function, add like below:
useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr';
    document.title = t('app_title');
  }, [currentLanguage])

----------------------------------------------------------------
to allow the language in the path to change the language, e.g "http://localhost:3000/hk" will be chinese instead of previous selected language: 
index.js original:
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
change to:
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],