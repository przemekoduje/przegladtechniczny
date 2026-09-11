# Pełny Kod Projektu: Przeglądy Techniczne Budynków (przegladtechniczny)

> Wygenerowano: 2026-09-10T19:31:28.030Z
> Łączna liczba plików kodu: **149**
> Łączna liczba linii kodu: **26115**
> Przybliżony rozmiar tekstu źródłowego: **762.7 KB**

## Architektura i Stos Technologiczny

- **Frontend**: React 18, React Router v6, SCSS (Sass), Material-UI v6, Lucide React, Leaflet / MapLibre GL, Quill (Rich Text Editor)
- **Backend**: Firebase Cloud Functions (Node.js 20), Firestore, Firebase Authentication, Google Calendar API (OAuth2/Service Account), OpenAI API (gpt-4o/mini)
- **Automatyzacje**: Generator postów blogowych z AI (`blogAutomator.js`), Asystent umawiania wizyt ze skończonym automatem stanów (`stateMachine.js`, `calendarManager.js`), Integracja z mediami społecznościowymi (`facebookService.js`)
- **Pominięte pliki systemowe/binarne**: `node_modules/`, `.git/`, `.firebase/`, grafiki/video (`*.png`, `*.jpg`, `*.mp4`), fonty (`*.ttf`), logi kompilacji oraz ciężkie zbiory punktów poligonowych GeoJSON.

## Spis Treści (Struktura Plików)

### 1. Konfiguracja projektu i środowiska

- [`.firebaserc`](#file--firebaserc)
- [`.gitignore`](#file--gitignore)
- [`README.md`](#file-readme-md)
- [`firebase.json`](#file-firebase-json)
- [`jsconfig.json`](#file-jsconfig-json)
- [`package.json`](#file-package-json)

### 2. Backend – Firebase Cloud Functions & Automations

- [`functions/.gitignore`](#file-functions--gitignore)
- [`functions/backup`](#file-functions-backup)
- [`functions/blogAutomator.js`](#file-functions-blogautomator-js)
- [`functions/calendarManager.js`](#file-functions-calendarmanager-js)
- [`functions/facebookService.js`](#file-functions-facebookservice-js)
- [`functions/index.js`](#file-functions-index-js)
- [`functions/package.json`](#file-functions-package-json)
- [`functions/prompts.js`](#file-functions-prompts-js)
- [`functions/stateMachine.js`](#file-functions-statemachine-js)

### 3. Frontend – Rdzeń aplikacji React, Style & Konteksty

- [`public/404.html`](#file-public-404-html)
- [`public/index.html`](#file-public-index-html)
- [`public/robots.txt`](#file-public-robots-txt)
- [`src/App.js`](#file-src-app-js)
- [`src/contexts/AuthContext.js`](#file-src-contexts-authcontext-js)
- [`src/firebase.js`](#file-src-firebase-js)
- [`src/index.js`](#file-src-index-js)
- [`src/setupProxy.js`](#file-src-setupproxy-js)
- [`src/styles/global.scss`](#file-src-styles-global-scss)
- [`src/styles/variables.scss`](#file-src-styles-variables-scss)
- [`src/utils/analytics.js`](#file-src-utils-analytics-js)

### 4. Frontend – Widoki, Podstrony (Routes), Strony miast i Układy

- [`src/layouts/Layout.jsx`](#file-src-layouts-layout-jsx)
- [`src/layouts/layout.scss`](#file-src-layouts-layout-scss)
- [`src/pages/CityPage.js`](#file-src-pages-citypage-js)
- [`src/routes/AdminPanel/AICoPilot.jsx`](#file-src-routes-adminpanel-aicopilot-jsx)
- [`src/routes/AdminPanel/AIDraftEditor.jsx`](#file-src-routes-adminpanel-aidrafteditor-jsx)
- [`src/routes/AdminPanel/AdminPanel.jsx`](#file-src-routes-adminpanel-adminpanel-jsx)
- [`src/routes/AdminPanel/AnalyticsView.jsx`](#file-src-routes-adminpanel-analyticsview-jsx)
- [`src/routes/AdminPanel/adminPanel.scss`](#file-src-routes-adminpanel-adminpanel-scss)
- [`src/routes/AdminPanel/aiCoPilot.scss`](#file-src-routes-adminpanel-aicopilot-scss)
- [`src/routes/AdminPanel/analyticsView.scss`](#file-src-routes-adminpanel-analyticsview-scss)
- [`src/routes/AggressiveLanding/AggressiveHero/AggressiveHero.jsx`](#file-src-routes-aggressivelanding-aggressivehero-aggressivehero-jsx)
- [`src/routes/AggressiveLanding/AggressiveHero/AggressiveHero.scss`](#file-src-routes-aggressivelanding-aggressivehero-aggressivehero-scss)
- [`src/routes/AggressiveLanding/AggressiveLanding.jsx`](#file-src-routes-aggressivelanding-aggressivelanding-jsx)
- [`src/routes/AggressiveLanding/AggressiveLanding.scss`](#file-src-routes-aggressivelanding-aggressivelanding-scss)
- [`src/routes/BlogDB/BlogDB.jsx`](#file-src-routes-blogdb-blogdb-jsx)
- [`src/routes/BlogDB/blogDB.scss`](#file-src-routes-blogdb-blogdb-scss)
- [`src/routes/CityLandingPage/CityLandingPage.jsx`](#file-src-routes-citylandingpage-citylandingpage-jsx)
- [`src/routes/FormLanding/FormLanding.jsx`](#file-src-routes-formlanding-formlanding-jsx)
- [`src/routes/FormLanding/formLanding.scss`](#file-src-routes-formlanding-formlanding-scss)
- [`src/routes/Home/Home.jsx`](#file-src-routes-home-home-jsx)
- [`src/routes/Home/home.scss`](#file-src-routes-home-home-scss)
- [`src/routes/Landingi/PrzewodnikOcena/MainText/MainText.jsx`](#file-src-routes-landingi-przewodnikocena-maintext-maintext-jsx)
- [`src/routes/Landingi/PrzewodnikOcena/PrzewodnikOcena.jsx`](#file-src-routes-landingi-przewodnikocena-przewodnikocena-jsx)
- [`src/routes/Landingi/PrzewodnikOcena/przewodnikOcena.scss`](#file-src-routes-landingi-przewodnikocena-przewodnikocena-scss)
- [`src/routes/PrzegladB/PrzegladB.jsx`](#file-src-routes-przegladb-przegladb-jsx)
- [`src/routes/PrzegladB/przegladB.scss`](#file-src-routes-przegladb-przegladb-scss)
- [`src/routes/PrzegladE/PrzegladE.jsx`](#file-src-routes-przeglade-przeglade-jsx)
- [`src/routes/PrzegladE/przegladE.scss`](#file-src-routes-przeglade-przeglade-scss)
- [`src/routes/PrzegladG/PrzegladG.jsx`](#file-src-routes-przegladg-przegladg-jsx)
- [`src/routes/PrzegladG/przegladG.scss`](#file-src-routes-przegladg-przegladg-scss)
- [`src/routes/PrzegladW/PrzegladW.jsx`](#file-src-routes-przegladw-przegladw-jsx)
- [`src/routes/PrzegladW/przegladW.scss`](#file-src-routes-przegladw-przegladw-scss)
- [`src/routes/SingleBlogPost/SingleBlogPost.jsx`](#file-src-routes-singleblogpost-singleblogpost-jsx)
- [`src/routes/SingleBlogPost/singleBlogPost.scss`](#file-src-routes-singleblogpost-singleblogpost-scss)
- [`src/routes/ThankYouPage/ThankYouPage.jsx`](#file-src-routes-thankyoupage-thankyoupage-jsx)
- [`src/routes/ThankYouPage/ThankYouPage.scss`](#file-src-routes-thankyoupage-thankyoupage-scss)
- [`src/routes/UserDashboard/UserDashboard.jsx`](#file-src-routes-userdashboard-userdashboard-jsx)
- [`src/routes/UserDashboard/userDashboard.scss`](#file-src-routes-userdashboard-userdashboard-scss)
- [`src/routes/legal/PrivacyPolicy.jsx`](#file-src-routes-legal-privacypolicy-jsx)
- [`src/routes/legal/Terms.jsx`](#file-src-routes-legal-terms-jsx)
- [`src/routes/legal/legal.scss`](#file-src-routes-legal-legal-scss)

### 5. Frontend – Sekcje strony głównej i landing page

- [`src/sections/CityListBanner/CityListBanner.jsx`](#file-src-sections-citylistbanner-citylistbanner-jsx)
- [`src/sections/CityListBanner/CityListBanner.scss`](#file-src-sections-citylistbanner-citylistbanner-scss)
- [`src/sections/LocalContext/LocalContext.jsx`](#file-src-sections-localcontext-localcontext-jsx)
- [`src/sections/LocalContext/localContext.scss`](#file-src-sections-localcontext-localcontext-scss)
- [`src/sections/SilesiaMapGL/SilesiaMapGL.jsx`](#file-src-sections-silesiamapgl-silesiamapgl-jsx)
- [`src/sections/WhyImportant/WhyImportant.jsx`](#file-src-sections-whyimportant-whyimportant-jsx)
- [`src/sections/WhyImportant/WhyImportant.scss`](#file-src-sections-whyimportant-whyimportant-scss)
- [`src/sections/ctabanner/CtaBanner.jsx`](#file-src-sections-ctabanner-ctabanner-jsx)
- [`src/sections/ctabanner/ctaBanner.scss`](#file-src-sections-ctabanner-ctabanner-scss)
- [`src/sections/explanations/Explanations.jsx`](#file-src-sections-explanations-explanations-jsx)
- [`src/sections/explanations/explanations.scss`](#file-src-sections-explanations-explanations-scss)
- [`src/sections/faq/Faq.jsx`](#file-src-sections-faq-faq-jsx)
- [`src/sections/faq/faq.scss`](#file-src-sections-faq-faq-scss)
- [`src/sections/faq/faqs.jsx`](#file-src-sections-faq-faqs-jsx)
- [`src/sections/footer/Footer.jsx`](#file-src-sections-footer-footer-jsx)
- [`src/sections/footer/footer.scss`](#file-src-sections-footer-footer-scss)
- [`src/sections/goldHand/GoldHand.jsx`](#file-src-sections-goldhand-goldhand-jsx)
- [`src/sections/goldHand/goldHand.scss`](#file-src-sections-goldhand-goldhand-scss)
- [`src/sections/inspectionsForm copy/InspectionForm.jsx`](#file-src-sections-inspectionsform-copy-inspectionform-jsx)
- [`src/sections/inspectionsForm copy/inspectionForm.scss`](#file-src-sections-inspectionsform-copy-inspectionform-scss)
- [`src/sections/inspectionsForm/InspectionForm.jsx`](#file-src-sections-inspectionsform-inspectionform-jsx)
- [`src/sections/inspectionsForm/inspectionForm.scss`](#file-src-sections-inspectionsform-inspectionform-scss)
- [`src/sections/main/Main.jsx`](#file-src-sections-main-main-jsx)
- [`src/sections/main/main.scss`](#file-src-sections-main-main-scss)
- [`src/sections/process/Process.jsx`](#file-src-sections-process-process-jsx)
- [`src/sections/process/process.scss`](#file-src-sections-process-process-scss)
- [`src/sections/scope/Scope.jsx`](#file-src-sections-scope-scope-jsx)
- [`src/sections/scope/scope.scss`](#file-src-sections-scope-scope-scss)

### 6. Frontend – Komponenty interfejsu (UI Components)

- [`src/components/AdminRoute/AdminRoute.jsx`](#file-src-components-adminroute-adminroute-jsx)
- [`src/components/BlogPostDB/BlogPostDB.jsx`](#file-src-components-blogpostdb-blogpostdb-jsx)
- [`src/components/BlogPostDB/blogPostDB.scss`](#file-src-components-blogpostdb-blogpostdb-scss)
- [`src/components/BookingAgent/BookingAgent.jsx`](#file-src-components-bookingagent-bookingagent-jsx)
- [`src/components/BookingAgent/BookingAgent.scss`](#file-src-components-bookingagent-bookingagent-scss)
- [`src/components/CallButton/CallButton.jsx`](#file-src-components-callbutton-callbutton-jsx)
- [`src/components/CallButton/callButton.scss`](#file-src-components-callbutton-callbutton-scss)
- [`src/components/CustomDropdown/CustomDropdown.jsx`](#file-src-components-customdropdown-customdropdown-jsx)
- [`src/components/CustomDropdown/customDropdown.scss`](#file-src-components-customdropdown-customdropdown-scss)
- [`src/components/HeroParallaxWrapper/HeroParallaxWrapper.jsx`](#file-src-components-heroparallaxwrapper-heroparallaxwrapper-jsx)
- [`src/components/HeroParallaxWrapper/HeroParallaxWrapper.scss`](#file-src-components-heroparallaxwrapper-heroparallaxwrapper-scss)
- [`src/components/InspectionsTimeline/InspectionsTimeline.jsx`](#file-src-components-inspectionstimeline-inspectionstimeline-jsx)
- [`src/components/InspectionsTimeline/InspectionsTimeline.scss`](#file-src-components-inspectionstimeline-inspectionstimeline-scss)
- [`src/components/Login/Login.jsx`](#file-src-components-login-login-jsx)
- [`src/components/Login/login.scss`](#file-src-components-login-login-scss)
- [`src/components/MainFooter/MainFooter.jsx`](#file-src-components-mainfooter-mainfooter-jsx)
- [`src/components/MainFooter/mainFooter.scss`](#file-src-components-mainfooter-mainfooter-scss)
- [`src/components/Menu/Menu.jsx`](#file-src-components-menu-menu-jsx)
- [`src/components/Menu/menu.scss`](#file-src-components-menu-menu-scss)
- [`src/components/OrderButton/OrderButton.jsx`](#file-src-components-orderbutton-orderbutton-jsx)
- [`src/components/OrderButton/orderButton.scss`](#file-src-components-orderbutton-orderbutton-scss)
- [`src/components/PopModal/PopModal.jsx`](#file-src-components-popmodal-popmodal-jsx)
- [`src/components/PopModal/popupModal.scss`](#file-src-components-popmodal-popupmodal-scss)
- [`src/components/Post/Post.jsx`](#file-src-components-post-post-jsx)
- [`src/components/Post/post.scss`](#file-src-components-post-post-scss)
- [`src/components/SEO/CitySchema.jsx`](#file-src-components-seo-cityschema-jsx)
- [`src/components/SEO/LocalBusinessSchema.jsx`](#file-src-components-seo-localbusinessschema-jsx)
- [`src/components/SignUp/SignUp.jsx`](#file-src-components-signup-signup-jsx)
- [`src/components/SignUp/signUp.scss`](#file-src-components-signup-signup-scss)
- [`src/components/SilesiaMap3D/SilesiaMap3D.jsx`](#file-src-components-silesiamap3d-silesiamap3d-jsx)
- [`src/components/SilesiaMap3D/SilesiaMap3D.scss`](#file-src-components-silesiamap3d-silesiamap3d-scss)
- [`src/components/SilesiaMapGL/SilesiaMapGL.jsx`](#file-src-components-silesiamapgl-silesiamapgl-jsx)
- [`src/components/SilesiaMapGL/SilesiaMapGL.scss`](#file-src-components-silesiamapgl-silesiamapgl-scss)
- [`src/components/StickyOrderBar/StickyOrderBar.jsx`](#file-src-components-stickyorderbar-stickyorderbar-jsx)
- [`src/components/StickyOrderBar/StickyOrderBar.scss`](#file-src-components-stickyorderbar-stickyorderbar-scss)
- [`src/components/animations/AnimatedText.jsx`](#file-src-components-animations-animatedtext-jsx)
- [`src/components/animations/MagneticButton.jsx`](#file-src-components-animations-magneticbutton-jsx)
- [`src/components/modal/Modal.jsx`](#file-src-components-modal-modal-jsx)
- [`src/components/modal/modal.scss`](#file-src-components-modal-modal-scss)
- [`src/components/panel/Panel.jsx`](#file-src-components-panel-panel-jsx)
- [`src/components/panel/panel.scss`](#file-src-components-panel-panel-scss)
- [`src/components/quill/ButtonBlot.js`](#file-src-components-quill-buttonblot-js)
- [`src/components/singlePostPopup/SinglePostPopup.jsx`](#file-src-components-singlepostpopup-singlepostpopup-jsx)
- [`src/components/singlePostPopup/singlePostPopup.scss`](#file-src-components-singlepostpopup-singlepostpopup-scss)

### 7. Frontend – Dane statyczne, Baza wpisów i Pomocniki (Helpers)

- [`src/assets/silesia1.json`](#file-src-assets-silesia1-json)
- [`src/assets/silesia2.json`](#file-src-assets-silesia2-json)
- [`src/data/blogposts.jsx`](#file-src-data-blogposts-jsx)
- [`src/data/bytom.json`](#file-src-data-bytom-json)
- [`src/data/gliwice.json`](#file-src-data-gliwice-json)
- [`src/data/posts.jsx`](#file-src-data-posts-jsx)
- [`src/helpers/citiesData.js`](#file-src-helpers-citiesdata-js)

### 8. Skrypty pomocnicze i Narzędzia

- [`check_firestore.js`](#file-check_firestore-js)
- [`scripts/bundle-codebase.js`](#file-scripts-bundle-codebase-js)
- [`scripts/generate-sitemap.js`](#file-scripts-generate-sitemap-js)

---

## Zawartość Plików Kodu Źródłowego


# ================================================================================
# 1. KONFIGURACJA PROJEKTU I ŚRODOWISKA
# ================================================================================

## File: `.firebaserc` <a id="file--firebaserc"></a>

```text
{
  "projects": {
    "default": "przegladtechniczny-6b336"
  },
  "targets": {},
  "etags": {}
}
```

## File: `.gitignore` <a id="file--gitignore"></a>

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
firebase-debug.log*
firebase-debug.*.log*

# Firebase cache
.firebase/

# Firebase config

# Uncomment this if you'd like others to create their own Firebase project.
# For a team working on the same Firebase project(s), it is recommended to leave
# it commented so all members can deploy to the same project(s) in .firebaserc.
# .firebaserc

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# dataconnect generated files
.dataconnect

build/

functions/service-account.json
```

## File: `README.md` <a id="file-readme-md"></a>

```markdown
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
```

## File: `firebase.json` <a id="file-firebase-json"></a>

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "*.local"
      ]
    }
  ]
}
```

## File: `jsconfig.json` <a id="file-jsconfig-json"></a>

```json
{
    "compilerOptions": {
        "baseUrl": "src"
    },
    "include": [
        "src"
    ]
}
```

## File: `package.json` <a id="file-package-json"></a>

```json
{
  "name": "przegladtechniczny",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@clerk/clerk-react": "^5.15.5",
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@gsap/react": "^2.1.2",
    "@mui/icons-material": "^6.4.10",
    "@mui/material": "^6.1.6",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.13.4",
    "cors": "^2.8.6",
    "dotenv": "^17.2.3",
    "firebase": "^11.0.2",
    "firebase-functions": "^7.0.4",
    "googleapis": "^170.1.0",
    "gsap": "^3.14.2",
    "intersection-observer": "^0.12.2",
    "leaflet": "^1.9.4",
    "lodash": "^4.17.21",
    "lucide-react": "^0.563.0",
    "maplibre-gl": "^5.17.0",
    "openai": "^6.16.0",
    "quill": "^2.0.3",
    "quill-image-resize": "^3.0.9",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-grid-layout": "^1.5.0",
    "react-helmet": "^6.1.0",
    "react-helmet-async": "^2.0.5",
    "react-leaflet": "^4.2.1",
    "react-map-gl": "^8.1.0",
    "react-parallax": "^3.5.1",
    "react-router-dom": "^6.28.0",
    "react-scripts": "5.0.1",
    "recharts": "^3.7.0",
    "sass": "^1.80.6",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "bundle:code": "node scripts/bundle-codebase.js"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "react-snap": "^1.23.0"
  },
  "reactSnap": {
    "include": [
      "/",
      "/kontakt",
      "/cennik"
    ],
    "puppeteerArgs": [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  }
}
```


# ================================================================================
# 2. BACKEND – FIREBASE CLOUD FUNCTIONS & AUTOMATIONS
# ================================================================================

## File: `functions/.gitignore` <a id="file-functions--gitignore"></a>

```text
node_modules/
*.local
```

## File: `functions/backup` <a id="file-functions-backup"></a>

```text
content: `Jesteś profesjonalnym, wirtualnym asystentem inżyniera budownictwa.
            
            KONTEKST CZASOWY: Dziś jest ${today}.
            Używaj tego kontekstu, gdy klient mówi "jutro", "w poniedziałek" itp.

            ZADANIE:
            Twoim zadaniem jest wstępna kwalifikacja klienta, zebranie informacji i umówienie wizyty w kalendarzu.

            INTELIGENTNA ANALIZA (LISTA KONTROLNA):
            Twoim zadaniem jest skompletowanie poniższych informacji.
            Przeanalizuj historię rozmowy. Jeśli masz już daną informację, POMIŃ PYTANIE o nią i przejdź do następnej brakującej.
            
            1. [ ] Zgoda na rozmowę (Wstęp).
            2. [ ] Typ budynku (Dom, blok, komercyjny?).
            3. [ ] Adres (Miasto i Ulica). Uwaga: Jeśli klient podał tylko miasto, dopytaj o ulicę. Jeśli podał od razu całość - nie pytaj o nic.
            4. [ ] Rodzaj usługi (Przegląd 5-letni, roczny, inny?).
            5. [ ] Adres Email (OPCJONALNIE) - zapytaj: "Czy chcą Państwo otrzymać potwierdzenie na maila?". Jeśli nie - pomiń.

            SCENARIUSZ ROZMOWY:
            1. Prowadź rozmowę krok po kroku. Zadawaj jedno pytanie na raz.
            2. Bądź uprzejmy i nienachalny.
            
            LISTA INFORMACJI DO ZEBRANIA (W tej kolejności):
            
            ETAP 0 (Wstęp): Jeśli to początek, przywitaj się i zapytaj czy klient odpowie na kilka pytań.
            
            ETAP 1 (Typ budynku): Zapytaj o typ budynku (jednorodzinny, wielorodzinny czy komercyjny?).
            
            ETAP 2 (Adres): Zapytaj o lokalizację (Miasto, ew. ulica). Jeśli klient nie chce podać ulicy, zaakceptuj to.
            
            ETAP 3 (Typ przeglądu): Zapytaj o rodzaj usługi (przegląd 5-letni, roczny, gazowy, inny?).
            
            ETAP 4 (PODSUMOWANIE DANYCH):
            Gdy uzyskasz odpowiedzi na powyższe (Typ, Adres, Usługa), powiedz: 
            "Dziękuję. Wszystkie dane zostały pomyślnie zapisane w naszej bazie."
            I w tej samej wypowiedzi zapytaj: "Przejdźmy do terminu. Czy interesuje Państwa konkretny dzień, czy sprawdzić najbliższy wolny termin?"
            
            ETAP 5 (KALENDARZ I FINALIZACJA):
            To jest etap, w którym używasz dostępnych narzędzi (tools):
            - Jeśli klient poda datę: Użyj 'check_availability' żeby sprawdzić czy jest wolna.
              - Jeśli wolna -> Zaproponuj zapisanie.
              - Jeśli zajęta -> Poinformuj i zapytaj o inną godzinę.
            - Jeśli klient potwierdzi termin: Użyj 'book_appointment' żeby wpisać wizytę do kalendarza.
            - Jeśli klient pyta o wolne terminy: Sprawdź np. jutro rano i zaproponuj.
            
            ZASADY TECHNICZNE:
            - Mów krótko (max 2 zdania).
            - Formatuj daty dla narzędzi w formacie ISO (RRRR-MM-DDTHH:MM:SS).
            
            WAŻNE ZASADY (CZEGO NIE ROBIĆ):
            1. NIE PYTAJ o numer działki, numer księgi wieczystej ani dane geodezyjne. To jest zabronione.
            2. NIE PYTAJ o PESEL ani nr dowodu.
            3. Wystarczy zwykły adres (Miasto i Ulica).
            `
```

## File: `functions/blogAutomator.js` <a id="file-functions-blogautomator-js"></a>

```javascript
// const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onCall } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const OpenAI = require("openai");
const path = require("path");
const nodemailer = require("nodemailer");

// Load .env from the functions directory
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key_for_firebase_deploy"
});

const BOT_EMAIL = "przemek.rakotny@gmail.com";
const BOT_PASSWORD = "fjax fevs qlsb etjq";
const ADMIN_EMAIL = "przemek.rakotny@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: BOT_EMAIL, pass: BOT_PASSWORD },
});

const db = getFirestore();

/**
 * Downloads an image from a URL and uploads it to Firebase Storage
 */
async function downloadAndUploadImage(url, fileName) {
  console.log(`Downloading image from ${url}...`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const bucket = getStorage().bucket();
  const file = bucket.file(`blog-images/${fileName}`);

  console.log(`Uploading to Storage: blog-images/${fileName}...`);
  await file.save(buffer, {
    metadata: { contentType: 'image/webp' },
    public: true
  });

  return `https://storage.googleapis.com/${bucket.name}/blog-images/${fileName}`;
}

/**
 * AI Blog Generation Core Logic
 */
async function runBlogAutomation() {
  const postsSnapshot = await db.collection("posts")
    .orderBy("date", "desc")
    .limit(15)
    .get();

  const existingTitles = postsSnapshot.docs.map(doc => doc.data().title);

  const pillars = [
    "Prawo budowlane i normy techniczne",
    "Awarie, usterki i diagnostyka budynków",
    "Ubezpieczenia, finanse i koszty eksploatacji",
    "Porady dla kupujących mieszkania i domy (rynek wtórny/pierwotny)"
  ];

  const funnelStages = [
    "Edukacja ogólna (budowanie świadomości)",
    "Rozwiązywanie konkretnego problemu (edukacja ekspercka)",
    "Mocna sprzedaż i CTA (zachęta do audytu/przeglądu)"
  ];

  const imageStyles = [
    "A minimalist, hand-drawn pencil sketch on a pure white background. Key elements colored using a single, vibrant orange crayon (hex #f97316) in a loose, waxy texture.",
    "A technical architectural blueprint style. Clean white lines on a dark blue grid background. One key focal element MUST be highlighted with a vibrant orange crayon (hex #f97316) texture.",
    "A rough, conceptual engineering sketch using messy charcoal lines on white paper. Highlighted only with a vibrant orange crayon (hex #f97316) for emphasis."
  ];

  let feedbackTexts = [];
  try {
    const feedbackSnapshot = await db.collection("blog_feedback")
      .orderBy("date", "desc")
      .limit(3)
      .get();
    feedbackTexts = feedbackSnapshot.docs.map(doc => doc.data().feedbackText).filter(Boolean);
  } catch (err) {
    console.error("Error fetching feedback:", err);
  }

  let targetKeywords = [
    "przeglądy techniczne nieruchomości", "przegląd 5-letni domu", "odbiór techniczny mieszkania Śląsk",
    "koszt przeglądu budowlanego", "ubezpieczenie domu a przegląd", "inżynier budownictwa Gliwice",
    "książka obiektu budowlanego", "badanie instalacji elektrycznej", "kamera termowizyjna Śląsk"
  ];

  try {
    const keywordsDoc = await db.collection("settings").doc("blogKeywords").get();
    if (keywordsDoc.exists && keywordsDoc.data().keywords) {
      targetKeywords = keywordsDoc.data().keywords;
    }
  } catch (err) {
    console.error("Error fetching keywords:", err);
  }

  const activePillar = pillars[Math.floor(Math.random() * pillars.length)];
  const activeStage = funnelStages[Math.floor(Math.random() * funnelStages.length)];
  const activeStyle = imageStyles[Math.floor(Math.random() * imageStyles.length)];
  const selectedKeywords = [...targetKeywords].sort(() => 0.5 - Math.random()).slice(0, 3);

  const systemPrompt = "Jesteś doświadczonym inżynierem budownictwa ze Śląska...";
  const userPrompt = `Napisz artykuł... Tytuły: [ ${existingTitles.join(', ')} ]. Strategia: ${activePillar}`;

  console.log("Calling OpenAI for draft...");
  const contentCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" },
  });

  const aiResponse = JSON.parse(contentCompletion.choices[0].message.content);
  const finalImagePrompt = `illustration for '${aiResponse.title}'. Style: ${activeStyle}.`;

  let imageUrl = "https://placehold.co/1792x1024/orange/white?text=Blog+Update";
  try {
    const falResponse = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: { "Authorization": `Key ${process.env.FAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: finalImagePrompt, image_size: "landscape_16_9", num_inference_steps: 4, sync_mode: true })
    });
    const falData = await falResponse.json();
    const tempUrl = falData.images?.[0]?.url || falData.image?.url;
    if (tempUrl) {
      const safeTitle = aiResponse.title.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30);
      imageUrl = await downloadAndUploadImage(tempUrl, `${safeTitle}_${Date.now()}.webp`);
    }
  } catch (e) {
    console.error("Image failed:", e);
  }

  const draftData = {
    title: aiResponse.title,
    content: aiResponse.description,
    content2: aiResponse.content,
    categories: aiResponse.categories,
    tags: aiResponse.tags || [],
    facebookPost: aiResponse.facebookPost || "",
    imageUrl: imageUrl,
    status: "pending",
    createdAt: FieldValue.serverTimestamp(),
    type: "StandardPost"
  };

  const docRef = await db.collection("pending_posts").add(draftData);
  return { id: docRef.id, title: aiResponse.title };
}

/**
 * AI Analytics for Co-Pilot
 */
exports.getBlogAnalytics = onCall({ cors: true }, async (request) => {
  try {
    console.log("[Co-Pilot] analytical scan started...");

    // Fetch from BOTH 'posts' and 'pending_posts' to see all activity
    // Removed orderBy to ensure it works even if indexes are missing during migration
    const [postsSnapshot, pendingSnapshot] = await Promise.all([
      db.collection("posts").limit(100).get(),
      db.collection("pending_posts").limit(100).get()
    ]);

    const allDocs = [
      ...postsSnapshot.docs.map(d => ({ ...d.data(), source: 'published' })),
      ...pendingSnapshot.docs.map(d => ({ ...d.data(), source: 'pending' }))
    ];

    const titles = allDocs.map(p => p.title).filter(t => typeof t === "string" && t.trim() !== "");
    console.log(`[Co-Pilot] titles count: ${titles.length}`);

    const pillars = [
      "Prawo budowlane i normy techniczne",
      "Awarie, usterki i diagnostyka budynków",
      "Ubezpieczenia, finanse i koszty eksploatacji",
      "Porady dla kupujących mieszkania i domy (rynek wtórny/pierwotny)"
    ];

    const pillarCounts = {};
    pillars.forEach(p => pillarCounts[p] = 0);
    allDocs.forEach(post => {
      if (post.categories) {
        post.categories.forEach(cat => {
          if (pillarCounts.hasOwnProperty(cat)) pillarCounts[cat]++;
        });
      }
    });

    // --- SUPER PERMISSIVE SERIES DETECTION & AGGREGATION ---
    const detectedCyclesMap = new Map();

    titles.forEach(title => {
      // Look for (\d+ / \d+) or similar patterns anywhere. 
      const numberingRegex = /(\d+)\s*[\/z]\s*(\d+)/i;
      const match = title.match(numberingRegex);

      if (match) {
        const fullMatchText = match[0];
        const lastIndex = title.lastIndexOf(fullMatchText);
        let base = title.substring(0, lastIndex).trim();

        // Remove Polish prefixes often used: Część, Cześć, Cz., Part
        base = base.replace(/(?:\s*(?:Cz\.|Część|Cześć|Part))\s*$/i, "").trim();
        // Remove trailing punctuation or formatting
        base = base.replace(/[.,:;(\[/\s-]+$/, "").trim() || "Bez tytułu";

        const current = parseInt(match[1]);
        const total = parseInt(match[2]);

        // Create an aggressive normalized key for deduplication (strip emojis, lowerspace)
        const normalizeStr = (str) => {
          return str.toLowerCase()
            .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
            .replace(/[^a-z0-9]/gi, '')
            .trim();
        };
        const key = normalizeStr(base);

        if (!detectedCyclesMap.has(key)) {
          detectedCyclesMap.set(key, {
            name: base, // Keep original name from the first time we see it (usually the newest version)
            maxCurrent: current,
            total: total,
            existingParts: [{ title: title, current: current }]
          });
        } else {
          // Update if we find a higher part or just add to existing parts list
          const cycleData = detectedCyclesMap.get(key);
          if (current > cycleData.maxCurrent) {
            cycleData.maxCurrent = current;
          }
          cycleData.existingParts.push({ title: title, current: current });
        }
      }
    });

    const uniqueCycles = [];
    detectedCyclesMap.forEach((cycleData) => {
      if (cycleData.maxCurrent < cycleData.total) { // Only suggest if not finished
        uniqueCycles.push({
          name: cycleData.name,
          current: cycleData.maxCurrent,
          total: cycleData.total,
          suggestion: `${cycleData.name} Cz. ${cycleData.maxCurrent + 1}/${cycleData.total}`,
          existingParts: cycleData.existingParts.sort((a, b) => a.current - b.current)
        });
      }
    });

    // Suggestions
    const cycleTitles = uniqueCycles.map(c => c.suggestion);
    const analysisTargets = [...pillars, ...cycleTitles];

    let aiSuggestionsByTarget = {};
    if (analysisTargets.length > 0) {
      console.log("[Co-Pilot] Requesting suggestions for targets:", analysisTargets.length);
      const topicCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Jesteś ekspertem SEO i content helperem. Dla każdego podanego obszaru/tytułu zasugeruj 3 konkretne, profesjonalne tematy. Musisz zwrócić TYLKO poprawny obiekt JSON, gdzie kluczem jest nazwa obszaru, a wartością TABLICA 3 STRINGÓW."
          },
          {
            role: "user",
            content: `Obszary: [ ${analysisTargets.join(", ")} ]. Poprzednie tytuły: [ ${titles.slice(0, 15).join(", ")} ].
          Zwróć dokładnie taki format:
          {
            "Nazwa obszaru 1": ["Temat 1", "Temat 2", "Temat 3"],
            "Nazwa obszaru 2": ["Temat 1", "Temat 2", "Temat 3"]
          }`
          }
        ],
        response_format: { type: "json_object" }
      });
      aiSuggestionsByTarget = JSON.parse(topicCompletion.choices[0].message.content);
    }

    let targetKeywords = ["przegląd domu", "przeglądy techniczne", "Gliwice"];
    try {
      const keywordsDoc = await db.collection("settings").doc("blogKeywords").get();
      if (keywordsDoc.exists && keywordsDoc.data().keywords) targetKeywords = keywordsDoc.data().keywords;
    } catch (e) { }

    const seoSuggestions = [...targetKeywords].sort(() => 0.5 - Math.random()).slice(0, 5);

    return {
      success: true,
      data: {
        topicRadar: {
          counts: pillarCounts,
          missing: pillars.filter(p => pillarCounts[p] === 0)
        },
        topicSuggestions: aiSuggestionsByTarget,
        openCycles: uniqueCycles,
        seoSuggestions,
        allKeywords: targetKeywords,
        _debugStatus: {
          titlesFound: titles.length,
          lastDetectedCycleCount: uniqueCycles.length,
          collections: ["posts", "pending_posts"]
        }
      }
    };
  } catch (error) {
    console.error("[Co-Pilot] Critical Error:", error);
    return { success: false, error: error.message };
  }
});

exports.generateDraftManual = onCall({ cors: true }, async (request) => {
  try {
    const result = await runBlogAutomation();
    return { success: true, ...result };
  } catch (error) {
    console.error("Manual generation failed:", error);
    return { success: false, error: error.message };
  }
});

/**
 * AI Co-Pilot: Outline Generation (Step 1)
 * Accepts user instructions from the Admin Panel and returns a detailed Markdown outline.
 */
exports.generateDraftCoPilot = onCall({ cors: true }, async (request) => {
  try {
    const payload = request.data;
    console.log("[Co-Pilot] Outline generation requested with payload:", payload);

    const {
      topic,
      theses,
      selectedKeywords,
      includeBuildingLaw,
      includeAnecdote
    } = payload;

    if (!topic) {
      throw new Error("Missing required field: topic");
    }

    const systemPrompt = "Jesteś asystentem redakcyjnym i strategiem treści dla doświadczonego inżyniera budownictwa. Twoim zadaniem jest stworzenie szczegółowego konspektu artykułu na podstawie wytycznych.";

    let userPromptBuilder = `Oto wytyczne od Głównego Inżyniera:\n\n`;
    userPromptBuilder += `- Temat: ${topic}\n`;
    
    if (selectedKeywords && selectedKeywords.length > 0) {
      userPromptBuilder += `- Słowa kluczowe do wplecenia: ${selectedKeywords.join(", ")}\n`;
    }
    
    if (theses) {
      userPromptBuilder += `- Główne tezy inżyniera:\n${theses}\n`;
    }

    let constraints = [];
    if (includeBuildingLaw) constraints.push("cytat prawny (Prawo Budowlane / Normy)");
    if (includeAnecdote) constraints.push("anegdotę z budowy ze Śląska");
    
    if (constraints.length > 0) {
      userPromptBuilder += `- Uwzględnij miejsce na: ${constraints.join(" oraz ")}.\n`;
    }

    userPromptBuilder += `\nZadanie: Wygeneruj szczegółowy konspekt artykułu. Zwróć go jako rzetelnie sformatowany kod HTML.
Konspekt musi zawierać:
1. Propozycję chwytliwego Tytułu w znaczniku <h2>.
2. Nagłówki sekcji w znacznikach <h3>.
3. Pod każdym nagłówkiem krótkie wypunktowanie (<ul><li>) tego, co powinno się tam znaleźć.
4. Wyraźnie zaznacz w konspekcie [MIEJSCE NA TWOJĄ ANEGDOTĘ] lub [MIEJSCE NA CYTAT Z PRAWA] używając np. pogrubienia <strong>, abym wiedział, gdzie mam dopisać swój tekst ekspercki.

Zwróć TYLKO czysty kod HTML (nie dodawaj znaczników \`\`\`html ani \`\`\` wokół kodu). Będzie on od razu wyświetlony w edytorze.`;

    console.log("Calling OpenAI for Co-Pilot outline...");
    const contentCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPromptBuilder }
      ]
      // No JSON formatting forced here, we want standard markdown text
    });

    const markdownOutline = contentCompletion.choices[0].message.content.trim();
    
    return {
      success: true,
      outline: markdownOutline
    };

  } catch (error) {
    console.error("[Co-Pilot] Error generating outline:", error);
    return { success: false, error: error.message };
  }
});

// Krok 2: Generowanie pełnego artykułu na podstawie zedytowanego konspektu HTML
exports.generateDraftFromOutline = onCall(async (request) => {
  try {
    const { outlineHtml, topic, selectedKeywords, isSeries, seriesName } = request.data;
    if (!outlineHtml || !topic) {
      throw new Error("Missing required fields: outlineHtml or topic");
    }

    const systemPrompt = `Jesteś doświadczonym Inżynierem Przemkiem, autorem bloga o prawie budowlanym i przeglądach domów.
Twoim zadaniem jest napisanie WYCZERPUJĄCEGO, merytorycznego i eksperckiego artykułu (min. 800 słów) na podstawie dostarczonego konspektu HTML.

ZASADY:
1. ZIGNORUJ fragmenty konspektu, które są przekreślone (zawarte w znaczniku <strike> lub <span style="text-decoration: line-through;">).
2. SZCZEGÓLNIE ROZWIŃ I PODKREŚL fragmenty, które są zaznaczone żółtym tłem (zawarte w znanczniku ze stylem background-color, np. <span style="background-color: rgb(254, 240, 138);">).
3. Artykuł MUSI być zwrócony w czystym formacie HTML (używaj <h2>, <h3>, <ul>, <li>, <p>).
4. Słowa kluczowe do naturalnego wplecenia: ${selectedKeywords ? selectedKeywords.join(", ") : "Brak"}.
5. Jeśli artykuł jest z cyklu, wpleć informację o cyklu do tytułu.
6. Zwracasz obiekt JSON z następującymi kluczami:
   - "title": proponowany finalny tytuł artykułu. Jeśli to kontynuacja cyklu, musi zawierać nazwę cyklu.
   - "content": Krótki lead (max 2 zdania), tzw. SEO description (czysty tekst, zero HTML).
   - "content2": Właściwa treść. Długi, pełny artykuł w HTML (bez tagu title i body wewnątrz).
   - "categories": tablica max 2 kategorii (np. ["Prawo budowlane", "Porady"]).
   - "tags": tablica 4-6 tagów SEO (np. ["odbiór techniczny", "usterki"]).
   - "facebookPost": Klikalny, chwytliwy post na Facebooka promujący ten artykuł z odpowiednimi emotikonami i wezwaniem do akcji (bez HTML).
   - "imagePrompt": Krótki prompt graficzny po angielsku do FLUX opisujący zdjęcie (bez tekstu na obrazku).`;

    const userMessage = `Napisz gotowy artykuł na ten temat: ${topic} \n${isSeries ? `(To jest kontynuacja cyklu: ${seriesName} - wymuś kontynuację w tytule!)` : ""}\n\nOto zatwierdzony i zedytowany konspekt HTML:\n\n${outlineHtml}`;

    console.log("Calling OpenAI (gpt-4o) for full article from outline...");
    const contentCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ]
    });

    const aiContentData = JSON.parse(contentCompletion.choices[0].message.content);
    
    console.log("Generating image with fal.ai Flux Schnell for Co-Pilot...");
    const finalImagePrompt = aiContentData.imagePrompt + ", bright, minimalist, high quality, highly detailed, photorealistic, 4k, no text";
    let imageUrl = "https://via.placeholder.com/800x450.png?text=Brak+obrazu";
    
    if (process.env.FAL_KEY) {
      try {
        const imgResponse = await fetch("https://queue.fal.run/fal-ai/flux/schnell", {
          method: "POST",
          headers: {
            "Authorization": `Key ${process.env.FAL_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: finalImagePrompt,
            image_size: { width: 1024, height: 576 }, // 16:9 ratio
            num_images: 1,
            num_inference_steps: 4
          })
        });

        const imgData = await imgResponse.json();
        if (imgData && imgData.images && imgData.images.length > 0) {
           const tempUrl = imgData.images[0].url;
           console.log("Fal.ai successful, downloading and uploading to Firebase Storage...");
           imageUrl = await downloadAndUploadImage(tempUrl);
        } else {
           console.warn("Fal.ai didn't return images:", imgData);
        }
      } catch (e) {
        console.error("Error calling Fal.ai for Co-Pilot:", e);
      }
    } else {
      console.warn("FAL_KEY is missing. Using generic placeholder.");
    }

    const docId = db.collection("pending_posts").doc().id;
    const now = FieldValue.serverTimestamp();

    const draftData = {
      title: aiContentData.title,
      content: aiContentData.content,
      content2: aiContentData.content2,
      categories: aiContentData.categories || ["Porady ekspertów"],
      tags: aiContentData.tags || [],
      facebookPost: aiContentData.facebookPost || "",
      imageUrl: imageUrl,
      imagePrompt: finalImagePrompt,
      createdAt: now,
      status: "AI_DRAFT",
      keywords: selectedKeywords || [],
      isSeries: isSeries || false,
      seriesName: seriesName || "",
      strategyLog: {
        source: "AI Co-Pilot (Outline Flow)",
        model: "gpt-4o"
      }
    };

    await db.collection("pending_posts").doc(docId).set(draftData);

    return {
      success: true,
      pendingPostId: docId
    };

  } catch (error) {
    console.error("[Co-Pilot] Error passing from outline to draft:", error);
    return { success: false, error: error.message };
  }
});
```

## File: `functions/calendarManager.js` <a id="file-functions-calendarmanager-js"></a>

```javascript
const { google } = require("googleapis");
const path = require("path");
const nodemailer = require("nodemailer");

const KEY_PATH = path.join(__dirname, "service-account.json");
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});
const calendar = google.calendar({ version: "v3", auth });

const CALENDAR_ID = "przemek.rakotny@gmail.com";
const BOT_EMAIL = "przemek.rakotny@gmail.com";
const BOT_PASSWORD = "fjax fevs qlsb etjq";
const ADMIN_EMAIL = "przemek.rakotny@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: BOT_EMAIL, pass: BOT_PASSWORD },
});

// Helper: Dodaje 1h do daty
function addHourToIsoString(dateStr) {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + 1);
  return date.toISOString().split(".")[0];
}

async function checkAvailability(dateStart) {
  let cleanDateStart = dateStart.replace("Z", "").slice(0, 19);
  const myStart = new Date(cleanDateStart + "+01:00").getTime();
  const myEnd = myStart + 60 * 60 * 1000;

  const checkDate = new Date(cleanDateStart);
  const day = checkDate.getDay();
  const hour = checkDate.getHours();

  if (day === 0 || day === 6) return { available: false, reason: "Weekend" };
  if (hour < 8 || hour >= 17)
    return { available: false, reason: "Poza godzinami pracy (8-17)" };

  const dayStartStr = cleanDateStart.split("T")[0] + "T00:00:00Z";
  const dayEndStr = cleanDateStart.split("T")[0] + "T23:59:59Z";

  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: dayStartStr,
      timeMax: dayEndStr,
      timeZone: "Europe/Warsaw",
      singleEvents: true,
    });

    const items = response.data.items || [];
    const conflict = items.find((event) => {
      if (!event.start.dateTime) return false;
      const existingStart = new Date(event.start.dateTime).getTime();
      const existingEnd = new Date(event.end.dateTime).getTime();

      console.log(
        `Sprawdzam: ${cleanDateStart} vs Zajęte: ${event.start.dateTime}`
      );

      return myStart < existingEnd && myEnd > existingStart;
    });

    if (conflict) {
      console.log("⚠️ KONFLIKT WYKRYTY! Uruchamiam szukanie sugestii...");
      const suggestions = [];
      const baseDateIso = cleanDateStart.split("T")[0]; // np. "2026-02-02"

      for (let h = 8; h <= 16; h++) {
        const hourString = h < 10 ? `0${h}` : `${h}`;
        const slotStartMs = new Date(
          `${baseDateIso}T${hourString}:00:00`
        ).getTime();
        const slotEndMs = slotStartMs + 60 * 60 * 1000; // +1h

        // Sprawdzamy, czy ten slot koliduje z listą 'items', którą już mamy pobraną
        const isSlotBusy = items.find((event) => {
          if (!event.start.dateTime) return false;
          const existingStart = new Date(event.start.dateTime).getTime();
          const existingEnd = new Date(event.end.dateTime).getTime();
          return slotStartMs < existingEnd && slotEndMs > existingStart;
        });

        if (!isSlotBusy) {
          suggestions.push(`${hourString}:00`);
        }
      }

      console.log("Znalezione sugestie:", suggestions); // <--- DODAJ TO

      // Budujemy odpowiedź dla AI z listą sugestii
      let reasonMsg = "Wybrany termin jest zajęty.";
      if (suggestions.length > 0) {
        reasonMsg += ` Dostępne godziny tego dnia to: ${suggestions.join(
          ", "
        )}. Zaproponuj jedną z nich.`;
      } else {
        reasonMsg +=
          " Brak wolnych terminów w tym dniu. Zaproponuj inny dzień.";
      }

      return {
        available: false,
        reason:
          "Ten termin jest niestety zajęty. Proszę zaproponować inną godzinę lub dzień.",
      };
    }
    return { available: true };
  } catch (e) {
    throw e;
  }
}

async function bookEvent(eventDetails) {
  const { summary, description, dateStart, clientEmail } = eventDetails;

  const avail = await checkAvailability(dateStart);
  if (!avail.available) return { success: false, error: avail.reason };

  const cleanStart = dateStart.replace("Z", "").slice(0, 19);
  const cleanEnd = addHourToIsoString(cleanStart);

  try {
    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: {
        summary,
        description: `${description}\nEmail: ${clientEmail}`,
        start: { dateTime: cleanStart, timeZone: "Europe/Warsaw" },
        end: { dateTime: cleanEnd, timeZone: "Europe/Warsaw" },
      },
    });

    if (clientEmail && clientEmail.includes("@")) {
      const projectId = "przegladtechniczny-6b336";
      const confirmLink = `http://127.0.0.1:5001/${projectId}/us-central1/confirmVisit?email=${encodeURIComponent(
        clientEmail
      )}&date=${encodeURIComponent(cleanStart)}&service=${encodeURIComponent(
        summary
      )}&address=${encodeURIComponent(description)}`;

      // === TUTAJ JEST PRZYWRÓCONY BOGATY HTML ===
      await transporter.sendMail({
        from: BOT_EMAIL,
        to: clientEmail,
        subject: "Potwierdzenie Wizyty - WYMAGANA AKCJA",
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
                    <h2 style="color: #2c3e50;">Wstępna Rezerwacja Wizyty</h2>
                    <p>Aby wizyta doszła do skutku, prosimy o zaakceptowanie poniższych warunków technicznych.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin-bottom: 20px;">
                        <p style="margin: 5px 0;">📅 <strong>Data:</strong> ${cleanStart.replace(
                          "T",
                          " godz. "
                        )}</p>
                        <p style="margin: 5px 0;">📍 <strong>Adres:</strong> ${description}</p>
                        <p style="margin: 5px 0;">📋 <strong>Usługa:</strong> ${summary}</p>
                    </div>

                    <h3 style="color: #c0392b;">WARUNKI REALIZACJI USŁUGI:</h3>
                    <ol style="line-height: 1.5; padding-left: 20px;">
                        <li style="margin-bottom: 10px;"><strong>Dokumentacja:</strong> Zleceniodawca zobowiązany jest przygotować <u>Książkę Obiektu Budowlanego (KOB)</u> oraz protokoły z poprzednich przeglądów.</li>
                        <li style="margin-bottom: 10px;"><strong>Dostęp:</strong> Prosimy o zapewnienie bezpiecznego dostępu do wszystkich elementów budynku (piwnice, kotłownia, strych, wyłaz na dach).</li>
                        <li style="margin-bottom: 10px;"><strong>Zakres usługi:</strong> Usługa obejmuje <u>przegląd wizualny</u> stanu technicznego. Nie obejmuje odkrywek ani ekspertyz.</li>
                        <li style="margin-bottom: 10px;"><strong>Oświadczenie:</strong> Potwierdzenie wizyty jest równoznaczne z oświadczeniem o posiadaniu tytułu prawnego do lokalu.</li>
                    </ol>

                    <div style="background: #fff3cd; padding: 20px; border: 1px solid #ffeeba; margin-top: 25px; text-align: center;">
                        <p style="margin-top: 0; font-weight: bold;">KROK KOŃCOWY:</p>
                        <p>Klikając poniższy przycisk potwierdzają Państwo zapoznanie się i akceptację powyższych punktów.</p>
                        
                        <a href="${confirmLink}" 
                           style="background-color: #28a745; color: white; padding: 15px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; margin-top: 10px; font-size: 14px;">
                           ZAPOZNAŁEM SIĘ, ZGADZAM I ZATWIERDZAM
                        </a>
                    </div>
                </div>
            `,
      });
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

async function sendAlertEmail(desc) {
  await transporter.sendMail({
    from: BOT_EMAIL,
    to: ADMIN_EMAIL,
    subject: "ALERT",
    text: desc,
  });
}

async function notifyAdminAboutConfirmation(
  clientEmail,
  date,
  service,
  address
) {
  await transporter.sendMail({
    from: BOT_EMAIL,
    to: ADMIN_EMAIL,
    subject: "✅ ZATWIERDZONO",
    html: `<p>Klient: ${clientEmail}</p><p>Status: OK</p>`,
  });
}

module.exports = {
  checkAvailability,
  bookEvent,
  sendAlertEmail,
  notifyAdminAboutConfirmation,
};
```

## File: `functions/facebookService.js` <a id="file-functions-facebookservice-js"></a>

```javascript
/**
 * facebookService.js
 * Handles communication with the Meta Graph API to post content to a Facebook Page.
 */

/**
 * Posts a message and a link to a Facebook Page feed.
 * @param {string} pageId - The ID of the Facebook Page.
 * @param {string} pageAccessToken - A long-lived Page Access Token.
 * @param {string} message - The caption for the post.
 * @param {string} link - The URL to share.
 * @returns {Promise<Object>} - The JSON response from Meta Graph API.
 */
async function postToPage(pageId, pageAccessToken, message, link) {
  const url = `https://graph.facebook.com/v21.0/${pageId}/feed`;
  
  console.log(`Posting to Facebook Page: ${pageId}...`);
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      link: link,
      access_token: pageAccessToken,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error("Facebook API error:", data);
    throw new Error(`Facebook API error: ${data.error?.message || "Unknown error"}`);
  }

  console.log("Successfully posted to Facebook:", data.id);
  return data;
}

module.exports = {
  postToPage,
};
```

## File: `functions/index.js` <a id="file-functions-index-js"></a>

```javascript
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const functions = require("firebase-functions");
const functionsV1 = require("firebase-functions/v1");
const cors = require("cors")({ origin: true });
const OpenAI = require("openai");
const path = require("path");
const axios = require("axios");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const nodemailer = require("nodemailer");

const BOT_EMAIL = "przemek.rakotny@gmail.com";
const BOT_PASSWORD = "fjax fevs qlsb etjq";
const ADMIN_EMAIL = "przemek.rakotny@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: BOT_EMAIL, pass: BOT_PASSWORD },
});

const { determineNextAction, STATES } = require("./stateMachine");
const {
  checkAvailability,
  bookEvent,
  sendAlertEmail,
  notifyAdminAboutConfirmation,
} = require("./calendarManager");
const { generateDraftManual, getBlogAnalytics, generateDraftCoPilot, generateDraftFromOutline } = require("./blogAutomator");
const { postToPage } = require("./facebookService");
const { onCall } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "dummy_key_for_firebase_deploy" });

// NARZĘDZIA
const tool_Book = {
  type: "function",
  function: {
    name: "book_appointment",
    description: "Zapisz wizytę.",
    parameters: {
      type: "object",
      properties: {
        summary: { type: "string" },
        dateStart: { type: "string" },
        clientEmail: { type: "string" },
      },
      required: ["summary", "dateStart", "clientEmail"],
    },
  },
};

const tool_Check = {
  type: "function",
  function: {
    name: "check_availability",
    description: "Sprawdź dostępność.",
    parameters: {
      type: "object",
      properties: { dateStart: { type: "string" } },
      required: ["dateStart"],
    },
  },
};

const tool_Emergency = {
  type: "function",
  function: {
    name: "report_emergency",
    description: "Zgłoś zagrożenie.",
    parameters: {
      type: "object",
      properties: { description: { type: "string" } },
      required: ["description"],
    },
  },
};

function getCalendarCheatSheet() {
  const polishDays = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];
  const days = [];

  // TO JEST KLUCZOWE: Wymuszamy czas warszawski, niezależnie od ustawień serwera
  const nowInPoland = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Warsaw" })
  );

  // --- DODAJ TĘ LINIJKĘ ---
  console.log(
    ">>> [DEBUG CZASU] Czas w Polsce (start kalendarza):",
    nowInPoland.toString()
  );
  // ------------------------

  for (let i = 0; i < 7; i++) {
    const d = new Date(nowInPoland);
    d.setDate(nowInPoland.getDate() + i);

    const dayName = polishDays[d.getDay()];
    // Ręczne formatowanie YYYY-MM-DD (bezpieczniejsze niż ISO)
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    days.push(`${dayName} = ${year}-${month}-${day}`);
  }
  return days.join("\n");
}

// --- ANALITYK (Ulepszony Snajper) ---
async function extractContext(messages, cheatSheet) {
  const userMsgs = messages.filter((m) => m.role === "user");
  const assistantMsgs = messages.filter((m) => m.role === "assistant");

  const lastUserMsg =
    userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].content : "";
  const lastAssistantMsg =
    assistantMsgs.length > 0
      ? assistantMsgs[assistantMsgs.length - 1].content
      : "";

  const extractionPrompt = `
  Jesteś analitykiem.
  KALENDARZ (Polska):
  ${cheatSheet}
  
  OSTATNIA WIADOMOŚĆ KLIENTA: "${lastUserMsg}"
  
  ZASADY DATY (KRYTYCZNE):
  1. Czy klient wskazał konkretny dzień/godzinę w TEJ wiadomości?
     - TAK -> Oblicz datę (YYYY-MM-DDTHH:mm:ss) używając kalendarza. NIE ZMIENIAJ GODZINY NA UTC.
     - NIE -> Wstaw NULL. Nie wpisuj daty "domyślnej" ani "dzisiejszej".
  
  ZASADY EMAIL:
  - Czy jest znak '@'? TAK -> Zapisz. NIE -> NULL.
  
  ZASADY POTWIERDZENIA (isDateConfirmed):
  - Ustaw TRUE TYLKO I WYŁĄCZNIE, gdy Asystent w OSTATNIEJ wiadomości napisał wyraźnie: "Termin jest wolny" lub "Rezerwuję termin".
  - Jeśli Klient dopiero podaje datę (np. "To może wtorek?"), isDateConfirmed MUSI być FALSE.
  - Jeśli Klient zmienia datę na inną, isDateConfirmed MUSI być FALSE.

  Zwróć JSON:
  - city, street, type, service
  - priceAccepted (bool)
  - date (string ISO/null)
  - email (string/null)
  - isDateConfirmed (bool)
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: extractionPrompt }, ...messages],
      response_format: { type: "json_object" },
      temperature: 0,
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (e) {
    return {
      city: null,
      street: null,
      type: null,
      service: null,
      priceAccepted: false,
      date: null,
      email: null,
      isDateConfirmed: false,
    };
  }
}

exports.chatAgent = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST")
      return res.status(405).send("Method Not Allowed");
    const { messages } = req.body;

    const calendarCheatSheet = getCalendarCheatSheet();

    try {
      // 1. Ekstrakcja
      const currentContext = await extractContext(messages, calendarCheatSheet);
      console.log("[CONTEXT]:", currentContext);

      // 2. Stan
      const nextAction = determineNextAction(currentContext);
      console.log("[STATE]:", nextAction.state);

      // 3. Narzędzia
      let activeTools = [tool_Emergency];
      if (nextAction.state === STATES.SCHEDULING) activeTools.push(tool_Check);
      else if (nextAction.state === STATES.CONFIRMATION)
        activeTools.push(tool_Book);

      // 4. Prompt
      const dynamicSystemPrompt = `
      Jesteś SYSTEMEM REZERWACJI.
      Działasz 24/7. Ignoruj weekendy.
      
      KALENDARZ:
      ${calendarCheatSheet}
      
      ZADANIE:
      ${nextAction.instruction}
      
      ZASADY:
      1. Wykonuj TYLKO instrukcję.
      2. Korzystaj z kalendarza powyżej.
      3. BEZWZGLĘDNY ZAKAZ wypowiadania prośby o email na głos.
         - Jeśli potrzebujesz emaila, Twój jedyny komunikat to: "Proszę wpisać adres e-mail w formularzu."
         - Nigdy nie pytaj "Czy może Pan podać email?".
         - Nigdy nie proś o podyktowanie.
         - Jeśli klient już podał email wcześniej, NIE pytaj o niego ponownie. Przejdź do potwierdzenia.
         - Jedyny dozwolony komunikat to: "Proszę wpisać adres e-mail w formularzu." (tylko jeśli emaila brakuje).

      `;

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: dynamicSystemPrompt },
          ...messages.filter((m) => m.role !== "system"),
        ],
        model: "gpt-4o-mini",
        temperature: 0.6,
        tools: activeTools.length > 0 ? activeTools : undefined,
        tool_choice: "auto",
      });

      const message = completion.choices[0].message;

      // 5. Narzędzia
      if (message.tool_calls && message.tool_calls.length > 0) {
        const toolCall = message.tool_calls[0];
        const fnName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        let aiResult = "";

        if (fnName === "check_availability") {
          const result = await checkAvailability(args.dateStart);
          if (result.available) {

            // === ZMIANA: WYMUSZENIE STANU EMAIL ===
            // Skoro termin jest wolny, manualnie przestawiamy stan, 
            // aby frontend wiedział, że ma otworzyć formularz.
            nextAction.state = STATES.EMAIL;

            // Nowa instrukcja warunkowa dla AI
            aiResult = `STATUS: WOLNE. 
              Sprawdź w historii czy masz już email klienta.
              - JEŚLI MASZ EMAIL: Powiedz "Termin jest dostępny. Potwierdzam rezerwację na ten adres email."
              - JEŚLI BRAK EMAILA: Powiedz "Termin dostępny. Proszę wpisać email w formularzu."`;
          } else {
            aiResult = `STATUS: ZAJĘTE. Powód: ${result.reason}. Zaproponuj inny termin.`;
          }
        } else if (fnName === "book_appointment") {
          const fullAddress = `${currentContext.city || ""}, ${currentContext.street || ""
            }`;
          const bookingData = {
            summary: args.summary,
            dateStart: args.dateStart,
            clientEmail: args.clientEmail,
            description: fullAddress,
          };
          const result = await bookEvent(bookingData);
          aiResult = result.success
            ? "SUCCESS: Zapisano."
            : `ERROR: ${result.error}`;
        } else if (fnName === "report_emergency") {
          await sendAlertEmail(args.description);
          aiResult = "ALERT_SENT";
        }

        const secondResponse = await openai.chat.completions.create({
          messages: [
            { role: "system", content: dynamicSystemPrompt },
            ...messages,
            message,
            { role: "tool", tool_call_id: toolCall.id, content: aiResult },
          ],
          model: "gpt-4o-mini",
        });

        res.json({
          response: secondResponse.choices[0].message.content,
          state: nextAction.state,
        });
      } else {
        res.json({ response: message.content, state: nextAction.state });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
});

exports.confirmVisit = functions.https.onRequest(async (req, res) => {
  const { email, date, service, address } = req.query;
  if (!email) {
    res.status(400).send("Brak danych.");
    return;
  }
  await notifyAdminAboutConfirmation(
    email,
    date,
    service,
    address || "Brak adresu"
  );
  res.status(200).send("Potwierdzono.");
});
exports.speakEleven = functions.https.onRequest((req, res) => {
  res.status(200).send("OK");
});

exports.onUserCartCreated = functionsV1.firestore
  .document("userCarts/{docId}")
  .onCreate(async (snap, context) => {
    if (!snap) return null;
    const data = snap.data();
    const docId = context.params.docId;

    // Sprawdzamy, czy s\u0105 dane
    if (!data || !data.property) {
      console.log("Brak wymaganych danych w u\u017cytkowniku koszyku, docId:", docId);
      return null;
    }

    const clientEmail = data.userEmail;
    const clientPhone = (data.contact && data.contact.phone && data.contact.phone.trim() !== "") ? data.contact.phone : "Brak telefonu";
    const clientName = (data.contact && data.contact.name && data.contact.name.trim() !== "") ? data.contact.name : "Klient";

    const propertyType = data.property.propertyType || "Nieruchomo\u015b\u0107";
    const propertyAddress = data.property.propertyAddress || "Brak adresu";

    try {
      // 1. Email do Admina
      await transporter.sendMail({
        from: BOT_EMAIL,
        to: ADMIN_EMAIL,
        subject: `[Nowe Zg\u0142oszenie] ${propertyType} - ${propertyAddress}`,
        html: `
          <h3>Otrzymano nowe zg\u0142oszenie z formularza!</h3>
          <p><strong>Imi\u0119 i nazwisko:</strong> ${clientName}</p>
          <p><strong>Email klienta:</strong> ${clientEmail}</p>
          <p><strong>Telefon:</strong> ${clientPhone}</p>
          <p><strong>Obiekt:</strong> ${propertyType}, ${propertyAddress}</p>
          <br>
          <p>Zaloguj si\u0119 do panelu admina, aby zobaczy\u0107 szczeg\u0142\u00f3\u0142y i zareagowa\u0107.</p>
        `,
      });

      // 2. Email do Klienta (Powitanie i informacja)
      if (clientEmail && clientEmail.includes("@")) {
        await transporter.sendMail({
          from: BOT_EMAIL,
          to: clientEmail,
          subject: "Zg\u0142oszenie przyj\u0119te - Przegl\u0105d Techniczny",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
                <h2 style="color: #2c3e50;">Witaj ${clientName}!</h2>
                <p>Otrzymali\u015bmy Twoje zapytanie dotycz\u0105ce obiektu: <strong>${propertyType} (${propertyAddress})</strong>.</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
                    <p style="margin: 0;">Nasz specjalista analizuje aktualnie zg\u0142oszenie. W nied\u0142ugim czasie prze\u015blemy dedykowan\u0105 ofert\u0119 drog\u0105 elektroniczn\u0105.</p>
                </div>
                <p>Oczekuj na wiadomo\u015b\u0107 e-mail z ofert\u0105 oraz przypomnienie poprzez SMS na numer: ${clientPhone}.</p>
                <br/>
                <p>Pozdrawiamy,</p>
                <p><strong>Zesp\u00f3\u0142 Przegl\u0105d Techniczny</strong></p>
            </div>
          `,
        });
      }

      // 3. MOCK: Wywo\u0142anie zewn\u0119trznego SMS API
      console.log("==== START API SMS MOCK ====");
      console.log(`[SMS do Admina] Na numer: Admin -> "Nowe zg\u0142oszenie: ${propertyType}, ${propertyAddress}. Sprawd\u017a Firebase."`);

      if (clientPhone !== "Brak telefonu") {
        console.log(`[SMS do Klienta] Na numer: ${clientPhone} -> "Czesc ${clientName}! Otrzymalismy zgloszenie dot. ${propertyType}. WKrotce wyslemy Ci oferte na maila. Zespol Przeglad Techniczny"`);
      }
      console.log("==== END API SMS MOCK ====");
    } catch (error) {
      console.error("B\u0142\u0105d podczas wysy\u0142ania powiadomie\u0144 Email/SMS:", error);
    }

    return null;
  });

exports.generateDraftManual = generateDraftManual;
// exports.generateDailyPost = generateDailyPost; (Removed for Co-Pilot)
exports.getBlogAnalytics = getBlogAnalytics;
exports.generateDraftCoPilot = generateDraftCoPilot;
exports.generateDraftFromOutline = generateDraftFromOutline;

/**
 * Publishes a pending post to the main posts collection.
 */
exports.publishPendingPost = onCall({ cors: true }, async (request) => {
  const { draftId } = request.data;
  if (!draftId) {
    throw new Error("Missing draftId");
  }

  const db = getFirestore();
  const draftRef = db.collection("pending_posts").doc(draftId);
  const draftDoc = await draftRef.get();

  if (!draftDoc.exists) {
    throw new Error("Draft not found");
  }

  const draftData = draftDoc.data();

  // 1. Copy to 'posts'
  const newPost = {
    ...draftData,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    status: "published",
    publishedAt: FieldValue.serverTimestamp(),
  };

  // Remove pending-specific fields if any
  delete newPost.createdAt;

  const docRef = await db.collection("posts").add(newPost);

  // 2. Facebook Integration
  const pageId = process.env.FB_PAGE_ID;
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

  if (pageId && pageAccessToken && draftData.facebookPost) {
    try {
      // Create slug for the URL (matches SingleBlogPost.jsx logic)
      const slug = draftData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove polish accents (simple deburr)
        .replace(/[^a-z0-9\s]/gi, "")
        .replace(/\s+/g, "-");

      const postUrl = `https://przeglady-domu.com/blogDB/${slug}`;

      console.log("Triggering Facebook post...");
      await postToPage(pageId, pageAccessToken, draftData.facebookPost, postUrl);
    } catch (fbError) {
      console.error("Facebook posting failed, but blog post was published:", fbError);
      // We don't throw here to ensure the blog remains published even if FB fails
    }
  } else {
    console.log("Facebook posting skipped (missing credentials or caption).");
  }

  // 3. Delete from 'pending_posts'
  await draftRef.delete();

  return { success: true };
});

/**
 * Toggles the automation gate for the next AI generation cycle.
 */
exports.setAutomationGate = onCall({ cors: true }, async (request) => {
  const { isEnabled } = request.data;
  const db = getFirestore();

  await db.collection("settings").doc("blogAutomator").set({
    isNextCycleEnabled: !!isEnabled,
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });

  return { success: true };
});

/**
 * Triggered when a new lead is created in the "leads" collection.
 * Sends an SMS notification to the lead's phone number via SMSAPI.pl
 */
exports.onLeadCreated = functionsV1.firestore
  .document("leads/{leadId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const leadId = context.params.leadId;
    
    // Ustawienie numeru (bramka SMSAPI przyjmuje telefony bez plusów np 48500xxx)
    let phone = data.phone || "";
    phone = phone.replace(/[^0-9]/g, ""); // usuń spaje, myślniki
    
    if (phone.length === 9) {
      phone = "48" + phone; // Dodaj polski prefiks w razie braku
    }

    if (!phone) {
      console.log(`Brak numeru telefonu dla leada ${leadId}. Pomijam SMS.`);
      return snap.ref.update({ smsStatus: "failed_no_phone" });
    }

    const name = data.name || "Klient";
    // Nie używamy polskich znaków, żeby SMS był tańszy (wiadomość ECO) i 100% dostarczalny
    const message = `Czesc ${name}, tu Inz. Przemek Rakotny. Potwierdzam wplyw zapytania o darmowa wycene. Odezwe sie zeby ustalic metraz i szczegoly. Pozdrawiam!`;
    const smsApiToken = process.env.SMSAPI_TOKEN; // Pobieramy z env
    
    if (!smsApiToken) {
        console.error("BRAK SMSAPI_TOKEN w environment variables (.env). SMS nie wysłany.");
        return snap.ref.update({ smsStatus: "failed_missing_token" });
    }

    try {
      console.log(`Próba wysłania SMS do: ${phone}`);
      
      const response = await axios.post(
        "https://api.smsapi.pl/sms.do",
        null,
        {
          params: {
            to: phone,
            message: message,
            format: "json",
            from: "Test" // Od kogo (musi być zarejestrowane pole nadawcy w panelu SMSAPI.pl - domyślnie "Test" dla testów)
          },
          headers: {
            "Authorization": `Bearer ${smsApiToken}`
          }
        }
      );

      console.log("Odpowiedź z SMSAPI:", response.data);
      
      return snap.ref.update({ smsStatus: "sent" });
    } catch (error) {
      console.error("Błąd podczas wysyłania SMS przez SMSAPI:", error?.response?.data || error.message);
      return snap.ref.update({ smsStatus: "failed_api_error" });
    }
});
```

## File: `functions/package.json` <a id="file-functions-package-json"></a>

```json
{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "22"
  },
  "main": "index.js",
  "dependencies": {
    "axios": "^1.13.6",
    "cors": "^2.8.6",
    "dotenv": "^17.2.3",
    "firebase-admin": "^12.6.0",
    "firebase-functions": "^7.0.5",
    "googleapis": "^170.1.0",
    "nodemailer": "^7.0.13",
    "openai": "^6.16.0"
  },
  "devDependencies": {
    "firebase-functions-test": "^3.1.0"
  },
  "private": true
}
```

## File: `functions/prompts.js` <a id="file-functions-prompts-js"></a>

```javascript
// exports.getSystemPrompt = (today) => {
//   return `
//   Jesteś Wirtualnym Asystentem Inżyniera Budownictwa.
//   Dziś jest: ${today}. WAŻNE: Używaj tej daty i dnia tygodnia do precyzyjnego obliczania terminów.
  
//   BAZA WIEDZY:
//   - Godziny pracy: Pn-Pt 08:00 - 17:00. Sobota 8:00 - 14:00
//   - Kontakt: 690 029 414.
//   - Cennik (NETTO):
//       * Przeglad budowlany budynek wielorodzinny - wycena indywidualna
//       * Przeglad budowlany Dom (5-letni): ok. 350 zł.
//       * przeglad gazowy 300 zł
//       * przeglad elektryczny (raz na 5 lat) 400 zł

//   MODUŁ BEZPIECZEŃSTWA (PRIORYTET 0):
//   Słowa kluczowe: "pęknięcie", "gaz", "tąpnięcie", "zawalenie".
//   Reakcja: STOP -> 'report_emergency' -> Odeślij na 112.

//   Zasady:
//   ZASADA JEDNEGO PYTANIA: Absolutny zakaz zadawania pytań w grupach. Nigdy nie pytaj: "Jaki to budynek i w jakim mieście?". 
//   Zadaj JEDNO pytanie, poczekaj na odpowiedź, przetwórz ją i dopiero zadaj kolejne.
//   ADRES MUSI BYĆ PEŁNY: Nie akceptuj samego miasta. Musisz uzyskać Ulicę i Numer domu.
//   ZAKAZ PRZEDWCZESNEGO KALENDARZA: Nie wolno Ci używać narzędzia 'check_availability' w Kroku 1, 2 ani 3. Użyj go DOPIERO w Kroku 4, gdy klient poda konkretną datę.

//   SCENARIUSZ ROZMOWY:

//   1. OTWARCIE:
//      - "Dzień dobry. Jestem asystentem AI. W czym mogę pomóc?" (Wspomnij o błędach i numerze tel).

//   2. KWALIFIKACJA I WYCENA:
//      - Zbierz: Typ, Miasto, Usługę.
//       - Jeśli nie znasz Typu budynku -> Zapytaj o typ. Czekaj na odpowiedź.
//       - Jeśli nie znasz Pełnego Adresu (Miasto + Ulica i Numer) -> Zapytaj o miasto. Czekaj na odpowiedź.
//       - Jeśli nie znasz Usługi -> Zapytaj o rodzaj usługi. Czekaj na odpowiedź.
//       (Dopiero gdy masz wszystkie 3 elementy, przejdź do KROKU 2).
//      - Podaj cenę. Zapytaj: "Czy akceptują Państwo ten koszt?"

//   3. OSTRZEŻENIE (BEZPIECZNIK):
//      - Po akceptacji ceny powiedz: "Świetnie. Informuję, że transkrypcja ustaleń trafi na Państwa adres mailowy."
//      - (UWAGA: Tutaj NIE proś jeszcze o wpisywanie maila, tylko informuj).

//   4. TERMIN:
//   - Zapytaj: "Jaki termin Państwu pasuje?"
//      - Ustal datę. Sprawdź 'check_availability'.
//      - Jeśli zajęte/zamknięte -> Negocjuj.

//   5. EMAIL (TRIGGER):
//      - Dopiero gdy data jest ustalona i wolna, powiedz DOKŁADNIE:
//      - "Aby potwierdzić wizytę, proszę teraz wpisać adres e-mail w okienku."
//      - (Słowo "okienku" uruchomi formularz u klienta).

//   6. FINALIZACJA:
//      - Jeśli klient wpisał maila -> 'book_appointment'.
//      - Jeśli klient kliknął Rezygnuj -> Zapytaj czy na pewno rezygnuje, bo potwierdzenie jest wymagane.

//   ZAKAZY:
//   - Nie czytaj linków URL.
//   - Nie pytaj o PESEL.
//   `;
// };
```

## File: `functions/stateMachine.js` <a id="file-functions-statemachine-js"></a>

```javascript
const STATES = {
    WELCOME: "WELCOME",
    QUALIFICATION: "QUALIFICATION",
    PRICING: "PRICING",
    SCHEDULING: "SCHEDULING",
    EMAIL: "EMAIL",
    CONFIRMATION: "CONFIRMATION"
};

function determineNextAction(context) {
    
    // 0. START
    if (!context.type && !context.city && !context.street && !context.service) {
        return { state: STATES.WELCOME, instruction: `Przywitaj się.` };
    }

    // 1. DANE
    if (!context.type) return { state: STATES.QUALIFICATION, instruction: `Zapytaj o rodzaj budynku.` };
    if (!context.city) return { state: STATES.QUALIFICATION, instruction: `Zapytaj o miasto.` };
    if (!context.street) return { state: STATES.QUALIFICATION, instruction: `Zapytaj o ulicę i numer.` };
    if (!context.service) return { state: STATES.QUALIFICATION, instruction: `Zapytaj o rodzaj usługi.` };

    // 2. CENA
    if (!context.priceAccepted) {
        return { state: STATES.PRICING, instruction: `Podaj cenę (350zł). Zapytaj o akceptację.` };
    }

    // 3. DATA
    if (!context.date) {
        return { state: STATES.SCHEDULING, instruction: `Zapytaj: "Jaki termin wizyty Panu pasuje?".` };
    }

    // 3b. SPRAWDZANIE
    if (context.date && !context.isDateConfirmed) {
        return {
            state: STATES.SCHEDULING,
            instruction: `Data: ${context.date}. Użyj 'check_availability'.`
        };
    }

    // 4. EMAIL - INPUT TRIGGER
    // Ponieważ Analityk w index.js teraz patrzy tylko na ostatnią wiadomość
    // To jeśli użytkownik nie wpisał maila PRZED CHWILĄ, context.email będzie null.
    // I ten warunek ZADZIAŁA.
    if (!context.email || !context.email.includes('@')) {
        return {
            state: STATES.EMAIL,
            instruction: `
                Termin jest wolny i zarezerwowany wstępnie.
                POWIEDZ TYLKO: "Potrzebuję jeszcze adresu e-mail. Proszę go wpisać w formularzu, który się teraz pojawi."
                Nie zadawaj pytań. Czekaj na wpisanie danych.
            `
        };
    }

    // 5. ZAPIS
    return {
        state: STATES.CONFIRMATION,
        instruction: `Mamy komplet (Email: ${context.email}). Użyj 'book_appointment'.`
    };
}

module.exports = { determineNextAction, STATES };
```


# ================================================================================
# 3. FRONTEND – RDZEŃ APLIKACJI REACT, STYLE & KONTEKSTY
# ================================================================================

## File: `public/404.html` <a id="file-public-404-html"></a>

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page Not Found</title>

    <style media="screen">
      body { background: #ECEFF1; color: rgba(0,0,0,0.87); font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; }
      #message { background: white; max-width: 360px; margin: 100px auto 16px; padding: 32px 24px 16px; border-radius: 3px; }
      #message h3 { color: #888; font-weight: normal; font-size: 16px; margin: 16px 0 12px; }
      #message h2 { color: #ffa100; font-weight: bold; font-size: 16px; margin: 0 0 8px; }
      #message h1 { font-size: 22px; font-weight: 300; color: rgba(0,0,0,0.6); margin: 0 0 16px;}
      #message p { line-height: 140%; margin: 16px 0 24px; font-size: 14px; }
      #message a { display: block; text-align: center; background: #039be5; text-transform: uppercase; text-decoration: none; color: white; padding: 16px; border-radius: 4px; }
      #message, #message a { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
      #load { color: rgba(0,0,0,0.4); text-align: center; font-size: 13px; }
      @media (max-width: 600px) {
        body, #message { margin-top: 0; background: white; box-shadow: none; }
        body { border-top: 16px solid #ffa100; }
      }
    </style>
  </head>
  <body>
    <div id="message">
      <h2>404</h2>
      <h1>Page Not Found</h1>
      <p>The specified file was not found on this website. Please check the URL for mistakes and try again.</p>
      <h3>Why am I seeing this?</h3>
      <p>This page was generated by the Firebase Command-Line Interface. To modify it, edit the <code>404.html</code> file in your project's configured <code>public</code> directory.</p>
    </div>
  </body>
</html>
```

## File: `public/index.html` <a id="file-public-index-html"></a>

```html
<!DOCTYPE html>
<html lang="pl">
  <head>
    <!-- Google tag (gtag.js) -->
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-032BEY0YZ9"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-032BEY0YZ9");
    </script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0f172a" />
    <meta
      name="robots"
      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    />

    <!-- Geo-targeting Śląsk / Gliwice / Aglomeracja Katowicka -->
    <meta name="geo.region" content="PL-24" />
    <meta name="geo.placename" content="Gliwice, Katowice, Śląsk" />
    <meta name="geo.position" content="50.2945;18.6714" />
    <meta name="ICBM" content="50.2945, 18.6714" />

    <!-- Typography Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700;800&display=swap"
      rel="stylesheet"
    />

    <!-- Google Site Verification -->
    <meta
      name="google-site-verification"
      content="dQXaa-Zu8-w6Im8ACz1toPVcroyKlmI_duHOMnSqk2k"
    />

    <!-- Meta Description & Title -->
    <title>Przeglądy Techniczne Nieruchomości Gliwice & Śląsk | Inżynier Przemysław Rakotny</title>
    <meta
      name="description"
      content="Profesjonalne przeglądy techniczne nieruchomości w Gliwicach, Katowicach i na całym Śląsku. Kontrole roczne i 5-letnie budynków, instalacji gazowych, elektrycznych i wentylacji. Uprawnienia budowlane."
    />
    <link rel="canonical" href="https://przeglady-domu.com/" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:site_name" content="Przeglądy Techniczne Nieruchomości Śląsk" />
    <meta property="og:url" content="https://przeglady-domu.com/" />
    <meta property="og:title" content="Przeglądy Techniczne Nieruchomości Gliwice & Śląsk | Inżynier z Uprawnieniami" />
    <meta
      property="og:description"
      content="Kompleksowe okresowe przeglądy budowlane (1-roczne i 5-letnie), gazowe i elektryczne. Działamy w Gliwicach, Katowicach i całej aglomeracji śląskiej. Zamów kontrolę inżynierską."
    />
    <meta property="og:image" content="https://przeglady-domu.com/images/v2/hh_desktop6.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Przegląd Techniczny Budynku na Śląsku" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Przeglądy Techniczne Nieruchomości Gliwice & Śląsk" />
    <meta
      name="twitter:description"
      content="Profesjonalne przeglądy budowlane 5-letnie i roczne. Uprawnienia budowlane SLK/2122/OWOK/08. Gliwice, Katowice, Zabrze, Śląsk."
    />
    <meta name="twitter:image" content="https://przeglady-domu.com/images/v2/hh_desktop6.png" />
  </head>
  <body>
    <noscript>
      <div style="padding: 20px; font-family: sans-serif; text-align: center;">
        <h1>Przeglądy Techniczne Nieruchomości – Gliwice, Katowice i Śląsk</h1>
        <p>
          Świadczymy usługi okresowych przeglądów technicznych budynków (rocznych i 5-letnich),
          instalacji gazowych, elektrycznych oraz wentylacji. Skontaktuj się z inżynierem:
          <strong>tel. 690 029 414</strong>, e-mail: kontakt@przeglady-domu.com.
        </p>
      </div>
    </noscript>
    <div id="root"></div>
  </body>
</html>
```

## File: `public/robots.txt` <a id="file-public-robots-txt"></a>

```text
User-agent: *
Allow: /

Sitemap: https://przeglady-domu.com/sitemap.xml
```

## File: `src/App.js` <a id="file-src-app-js"></a>

```javascript
import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// --- IMPORTY STRON I KOMPONENTÓW ---
import Home from "./routes/Home/Home";
import Login from "./components/Login/Login";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import SignUp from "./components/SignUp/SignUp";
import PrzewodnikOcena from "./routes/Landingi/PrzewodnikOcena/PrzewodnikOcena";
import BlogDB from "./routes/BlogDB/BlogDB";
import AdminPanel from "./routes/AdminPanel/AdminPanel";
import UserDashboard from "./routes/UserDashboard/UserDashboard";
import PrzegladB from "./routes/PrzegladB/PrzegladB";
import PrzegladG from "./routes/PrzegladG/PrzegladG";
import PrzegladE from "./routes/PrzegladE/PrzegladE";
import PrzegladW from "./routes/PrzegladW/PrzegladW";
import Layout from "./layouts/Layout";
import FormLanding from "./routes/FormLanding/FormLanding";
import Terms from "./routes/legal/Terms.jsx";
import PrivacyPolicy from "./routes/legal/PrivacyPolicy.jsx";
import SingleBlogPost from "./routes/SingleBlogPost/SingleBlogPost";
import ThankYouPage from "./routes/ThankYouPage/ThankYouPage";

// --- NOWE IMPORTY DLA MIAST I LANDINGÓW ---
import CityLandingPage from "./routes/CityLandingPage/CityLandingPage"; // Twój nowy komponent
import { citiesData } from "./helpers/citiesData"; // Dane miast do generowania ścieżek
import AggressiveLanding from "./routes/AggressiveLanding/AggressiveLanding"; // Sprzedażowy landing page

function AppContent() {
  const { currentUser: user } = useAuth();
  // const [user, setUser] = useState(null); // Managed by AuthProvider
  // const [loadingUser, setLoadingUser] = useState(true); // Managed by AuthProvider
  // const [isPanelOpen, setIsPanelOpen] = useState(false); // Jeśli nieużywane w App.js, można usunąć
  // const [showFlyout, setShowFlyout] = useState(false);

  const location = useLocation();

  useEffect(() => {
    import('./utils/analytics').then(({ trackPageView }) => {
      trackPageView();
    });
  }, [location.pathname]);

  const isFullWidthPage = [
    "/login",
    "/signUp",
    "/adminLogin",
    "/przewodnik",
  ].includes(location.pathname);

  // --- EFEKTY (Flyout, Scroll) ---
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShowFlyout(true);
  //     setTimeout(() => setShowFlyout(false), 4000);
  //   }, Math.random() * 20000 + 10000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const locationState = location.state;
    const isScrollTarget = locationState?.scrollTo === "inspectionForm";
    const isAllowedPath = ["/", "/form"].includes(location.pathname);

    if (isScrollTarget && isAllowedPath) {
      const inspectionFormElement = document.querySelector(".inspection-form");
      if (inspectionFormElement) {
        inspectionFormElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state, location.pathname]);

  return (
    <div className={`App ${isFullWidthPage ? "full-width" : ""}`}>
      <Routes>
        {/* --- STRONA GŁÓWNA --- */}
        <Route
          path="/"
          element={
            <Layout user={user}>
              <Home user={user} />
            </Layout>
          }
        />

        {/* --- AUTH & ADMIN --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <UserDashboard user={user} />
          }
        />


        {/* --- LANDINGI SPECJALNE --- */}
        <Route path="/przewodnik" element={<PrzewodnikOcena />} />
        {/* <Route path="/fach" element={<Fachowiec user={user} />} /> */}
        {/* <Route path="/hero" element={<HeroSnapScroller user={user} />} /> */}
        <Route path="/landing" element={<Layout user={user}><AggressiveLanding /></Layout>} />
        <Route path="/dziekuje" element={<Layout user={user}><ThankYouPage /></Layout>} />

        {/* --- BLOG --- */}
        <Route
          path="/blog"
          element={
            <Layout user={user}>
              <BlogDB />
            </Layout>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Layout user={user}>
              <SingleBlogPost />
            </Layout>
          }
        />
        <Route
          path="/blogDB"
          element={
            <Layout user={user}>
              <BlogDB />
            </Layout>
          }
        />
        <Route
          path="/blogDB/:slug"
          element={
            <Layout user={user}>
              <SingleBlogPost />
            </Layout>
          }
        />

        {/* --- USŁUGI GŁÓWNE --- */}
        <Route
          path="/przeglad-budowlany"
          element={
            <Layout user={user}>
              <PrzegladB />
            </Layout>
          }
        />
        <Route
          path="/przeglad-gazowy"
          element={
            <Layout user={user}>
              <PrzegladG />
            </Layout>
          }
        />
        <Route
          path="/przeglad-wentylacyjny"
          element={
            <Layout user={user}>
              <PrzegladW />
            </Layout>
          }
        />
        <Route
          path="/przeglad-elektryczny"
          element={
            <Layout user={user}>
              <PrzegladE />
            </Layout>
          }
        />

        {/* --- NOWOŚĆ: DYNAMICZNE LANDINGI DLA MIAST --- */}
        {citiesData.map((city) => (
          <Route
            key={city.slug}
            path={`/przeglad-budowlany-${city.slug}`}
            element={
              <Layout user={user}>
                <CityLandingPage />
              </Layout>
            }
          />
        ))}

        {/* --- FORMULARZ & LEGAL --- */}
        <Route
          path="/form"
          element={
            <Layout user={user}>
              <FormLanding user={user} />
            </Layout>
          }
        />
        <Route path="/kontakt" element={<Navigate to="/form" replace />} />
        <Route path="/cennik" element={<Navigate to="/#scope" replace />} />
        <Route path="/regulamin" element={<Terms />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />

        {/* --- FALLBACK 404 --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
```

## File: `src/contexts/AuthContext.js` <a id="file-src-contexts-authcontext-js"></a>

```javascript
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const adminsRef = collection(db, "admins");
          const q = query(adminsRef, where("email", "==", user.email), where("isActive", "==", true));
          const querySnapshot = await getDocs(q);
          setIsAdmin(!querySnapshot.empty);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
```

## File: `src/firebase.js` <a id="file-src-firebase-js"></a>

```javascript
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth,signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyC079iqi5vJd18ilZe3ZcBTKwOBl5JsztU",
    authDomain: "przegladtechniczny-6b336.firebaseapp.com",
    projectId: "przegladtechniczny-6b336",
    storageBucket: "przegladtechniczny-6b336.firebasestorage.app",
    messagingSenderId: "390111216383",
    appId: "1:390111216383:web:7adf0275431877706042ca"
  };

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);

export { auth, signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, functions };
export const db = getFirestore(app);
export const storage = getStorage(app);
console.log("Firestore zainicjowany:", db);
```

## File: `src/index.js` <a id="file-src-index-js"></a>

```javascript
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // 1. Import biblioteki
import App from './App';
import "./styles/global.scss";

const container = document.getElementById("root");

// Przygotowujemy aplikację owiniętą w HelmetProvider
// (żeby nie powtarzać kodu w dwóch miejscach)
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Sprawdzamy, czy w środku już coś jest (czy react-snap wygenerował HTML)
if (container.hasChildNodes()) {
  // TAK: Używamy hydrateRoot (dla gotowego HTML z SEO)
  hydrateRoot(container, app);
} else {
  // NIE: Używamy createRoot (standardowy render, np. podczas pisania kodu)
  createRoot(container).render(app);
}
```

## File: `src/setupProxy.js` <a id="file-src-setupproxy-js"></a>

```javascript
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
    res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
    next();
  });
};
```

## File: `src/styles/global.scss` <a id="file-src-styles-global-scss"></a>

```scss
@import "variables";

// Fonts
@font-face {
  font-family: 'ProductSans';
  src: url('../assets/fonts/ProductSans-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'ProductSans';
  src: url('../assets/fonts/ProductSans-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'ProductSans';
  src: url('../assets/fonts/ProductSans-Light.ttf') format('truetype');
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: 'ProductSans';
  src: url('../assets/fonts/ProductSans-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scrollbar-gutter: stable; // Keeps layout stable and centered regardless of scrollbar presence
}

body {
  position: relative;
  font-family: $font-primary;
  background-color: transparent;
  overflow-x: hidden;
  width: 100%;
  margin: 0;

  // Blueprint Grid Effect
  background-image:
    linear-gradient($color-border-subtle 1px, transparent 1px),
    linear-gradient(90deg, $color-border-subtle 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center center;

  .menu-tooltip {
    z-index: 9999;
    background-color: $color-white;
    border: 1px solid $color-grey-light;
    box-shadow: $shadow-hover;
    padding: 10px;
    display: flex;
    flex-direction: column;
    opacity: 1;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(5px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .tooltip-option {
      display: block;
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      padding: 8px 12px;
      font-size: 16px;
      color: $color-text-dark;
      cursor: pointer;

      &:hover {
        background-color: $color-grey-lighter;
      }
    }
  }

  .main_button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 35px;
    color: $color-white;
    padding: 10px 10px 10px 25px;
    background: $color-primary;
    border-radius: 35px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: $color-primary-hover;
      color: $color-black;
    }

    span {
      color: $color-text-light;
      letter-spacing: 2px;
      font-family: $font-primary;
      font-weight: 300;
      font-style: normal;
      font-size: 22px;
    }

    .btn-icon {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
}

// Basic scrollbar if needed, but no hiding

// App Styles
.App {
  max-width: 1440px;
  margin: 0 auto;
  background-color: transparent; // Changed from $color-white to show body grid
  position: relative;
  overflow: clip; // Fix for centering illusion (prevents internal elements from bleeding into margins) while preserving sticky context

  &.full-width {
    max-width: none;
    width: 100%;
    margin: 0;
  }

  .main_button_2 {
    display: flex;
    width: 300px;
    margin-top: 35px;
    padding: 20px 45px;
    background-color: $color-white;
    border-radius: 35px;
    cursor: pointer;
    border: none;
    box-shadow: $shadow-default;
    font-size: 18px;
    text-transform: uppercase;
    font-family: $font-secondary;
    font-weight: 300;
    font-style: normal;
    transition: box-shadow 1s ease;

    &:hover {
      background-color: $color-bg-light;
    }

    &:active {
      background-color: $color-white;
      box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
  }

  .main_button_3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    margin-top: 35px;
    padding: 10px 5px 10px 45px;
    background-color: $color-white;
    border-radius: 45px;
    cursor: pointer;
    border: none;
    box-shadow: $shadow-default;
    font-size: 18px;
    text-transform: uppercase;
    font-family: $font-secondary;
    font-weight: 300;
    font-style: normal;
    transition: box-shadow 1s ease;

    span {
      color: rgb(0, 0, 0); // Consider variable?
      letter-spacing: 1px;
      font-family: $font-secondary;
      font-weight: 300;
      font-style: normal;
      font-size: 20px;
    }

    .btn-icon {
      width: 45px;
      height: 45px;
      background-color: $color-grey;
      border: none;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      background-color: $color-bg-light;
    }

    &:active {
      background-color: $color-white;
      box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
  }

  .sche_button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 20px;
    background-color: $color-accent;
    border-radius: 35px;
    cursor: pointer;
    border: none;
    box-shadow: $shadow-default;
    font-family: $font-primary;
    color: white;

    font-weight: 300;
    font-style: normal;
    font-size: 18px;

    &:hover {
      background-color: $color-accent-hover;
    }

    &:active {
      background-color: transparent; // inconsistent with others?
      box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
  }
}
```

## File: `src/styles/variables.scss` <a id="file-src-styles-variables-scss"></a>

```scss
// Colors
$color-white: #ffffff;
$color-black: #000000;
$color-text-dark: #1a1a1b; // Deep Anthracite
$color-text-light: #f9f9f9; // Paper White
$color-grey: #cacaca;
$color-grey-light: #ddd;
$color-grey-lighter: #f5f5f5;
$color-bg-light: #f9f9f9; // Paper White
$color-sunny-yellow: #ffda63;
$color-ashy-ash: #d3d3d3;

$color-primary: #ff5f1f; // Signal Orange
$color-primary-hover: lighten(#ff5f1f, 10%);

// Industrial Safety Palette
$color-anthracite: #1a1a1b;
$color-signal-orange: #ff5f1f;
$color-paper-white: #f9f9f9;

// UI Colors
$color-text-main: $color-anthracite;
$color-border-subtle: rgba(26, 26, 27, 0.1);
$color-border-input: #cacaca;

$color-accent: $color-signal-orange;
$color-accent-hover: lighten($color-signal-orange, 10%);

// Shadows
$shadow-default: 0px 4px 10px rgba(0, 0, 0, 0.25);
$shadow-hover: 0px 4px 16px rgba(0, 0, 0, 0.1);

// Fonts
$font-primary: 'Inter Tight', sans-serif;
$font-family-primary: $font-primary;
$font-secondary: 'JetBrains Mono', monospace;

// Aliases for Blog
$color-background: $color-paper-white;
$color-text-primary: $color-text-main;
$color-text-secondary: #555555;
```

## File: `src/utils/analytics.js` <a id="file-src-utils-analytics-js"></a>

```javascript
import { useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, updateDoc, setDoc, increment, getDoc } from "firebase/firestore";

// Helper to get today's date in YYYY-MM-DD format based on local timezone
const getTodayDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

let isCheckingIp = null; // Prevent concurrent checks

export const checkIsIpIgnored = async () => {
  const cachedStatus = sessionStorage.getItem("is_ip_ignored");
  if (cachedStatus !== null) {
    const isIgnored = cachedStatus === 'true';
    if (isIgnored) {
      window['ga-disable-G-032BEY0YZ9'] = true;
    }
    return isIgnored;
  }

  if (isCheckingIp) return isCheckingIp;

  if (window.location.hostname === "localhost") {
    return true; // Zawsze ignoruj wejścia z localhost
  }

  isCheckingIp = (async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      const currentIp = data.ip;
      sessionStorage.setItem("current_ip", currentIp);

      const settingsDocRef = doc(db, "settings", "analytics");
      const settingsDoc = await getDoc(settingsDocRef);
      let ignoredIps = [];
      if (settingsDoc.exists()) {
        ignoredIps = settingsDoc.data().ignoredIps || [];
      }

      const isIgnored = ignoredIps.includes(currentIp);
      sessionStorage.setItem("is_ip_ignored", isIgnored.toString());

      // Blokowanie Google Analytics (gtag) jeśli IP jest ignorowane
      if (isIgnored) {
        window['ga-disable-G-032BEY0YZ9'] = true;
      }

      return isIgnored;
    } catch (error) {
      console.warn("Could not check IP exclusion status.", error.message);
      return false; // Default to not ignoring if error occurs (e.g. permission denied)
    } finally {
      isCheckingIp = null;
    }
  })();

  return isCheckingIp;
};

/**
 * Tracks a page view for the current day.
 * Uses sessionStorage to prevent counting multiple views in the same browser session.
 */
export const trackPageView = async () => {
  const isIgnored = await checkIsIpIgnored();
  if (isIgnored) return;

  try {
    const sessionKey = "has_visited_today";
    const today = getTodayDateString();

    // Check if we already tracked this session today
    const lastVisitDate = sessionStorage.getItem(sessionKey);
    if (lastVisitDate === today) {
      return; // Already logged for this session today
    }

    const docRef = doc(db, "page_views", today);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        count: increment(1)
      });
    } else {
      await setDoc(docRef, {
        date: today,
        count: 1
      });
    }

    sessionStorage.setItem(sessionKey, today);
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
};

/**
 * Tracks time spent on a specific section and saves it to Firestore.
 * Adds the elapsed time (in seconds) to the daily total for that section.
 * @param {string} sectionId - The unique name/id of the section (e.g., 'hero', 'faq')
 */
export const trackSectionTime = async (sectionId, timeInSeconds) => {
  if (timeInSeconds < 1) return; // Ignore very short glimpses

  const isIgnored = await checkIsIpIgnored();
  if (isIgnored) return;

  try {
    const today = getTodayDateString();
    const docRef = doc(db, "section_time", today);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [sectionId]: increment(timeInSeconds)
      });
    } else {
      await setDoc(docRef, {
        date: today,
        [sectionId]: timeInSeconds
      });
    }
  } catch (error) {
    console.error(`Failed to track section time for ${sectionId}:`, error);
  }
};

/**
 * React Hook to track how long an element is visible in the viewport.
 * @param {string} sectionId - The identifier for the section.
 * @returns {React.MutableRefObject} - Ref to attach to the target DOM element.
 */
export const useSectionTracker = (sectionId) => {
  const elementRef = useRef(null);
  const startTimeRef = useRef(null);
  const accumulatedTimeRef = useRef(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Started viewing
          startTimeRef.current = Date.now();
        } else {
          // Stopped viewing
          if (startTimeRef.current) {
            const timeSpent = (Date.now() - startTimeRef.current) / 1000;
            accumulatedTimeRef.current += timeSpent;
            startTimeRef.current = null;
          }
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    observer.observe(element);

    // Cleanup: when component unmounts, log any remaining accumulated time
    return () => {
      observer.disconnect();
      if (startTimeRef.current) {
        const timeSpent = (Date.now() - startTimeRef.current) / 1000;
        accumulatedTimeRef.current += timeSpent;
      }

      const roundedTime = Math.round(accumulatedTimeRef.current);
      if (roundedTime > 0) {
        trackSectionTime(sectionId, roundedTime);
      }
    };
  }, [sectionId]);

  return elementRef;
};
```


# ================================================================================
# 4. FRONTEND – WIDOKI, PODSTRONY (ROUTES), STRONY MIAST I UKŁADY
# ================================================================================

## File: `src/layouts/Layout.jsx` <a id="file-src-layouts-layout-jsx"></a>

```jsx
import React, { useState, useEffect } from "react";
import Menu from "../components/Menu/Menu";
import "./layout.scss";
// import BookingAgent from '../components/BookingAgent/BookingAgent'

export default function Layout({ children, user }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 1. Czy jesteśmy na samej górze?
    setIsTop(scrollTop < 50);

    // 2. Smart Hide (chowanie przy scrollu w dół)
    // Na stronie głównej pozwalamy menu zostać dłużej ze względu na efekt parallax
    const isHome = window.location.pathname === "/";
    const parallaxThreshold = isHome ? 1500 : 100;

    if (scrollTop > lastScrollTop && scrollTop > parallaxThreshold) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  // Blokada scrolla strony gdy panel boczny otwarty
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isPanelOpen]);

  return (
    <>
      <nav
        className={`navbar-fixed 
          ${isVisible ? "nav-visible" : "nav-hidden"} 
          ${isTop ? "nav-transparent" : "nav-solid"}
        `}
      >
        {/* Menu to teraz tylko zawartość. 
             Layout decyduje gdzie ta zawartość wisi. */}
        <Menu
          isPanelOpen={isPanelOpen}
          setIsPanelOpen={setIsPanelOpen}
          isTransparent={isTop}
        />
      </nav>

      <main>
        {React.cloneElement(children, { user, isPanelOpen, setIsPanelOpen })}
      </main>

      {/* <BookingAgent/> */}
    </>
  );
}
```

## File: `src/layouts/layout.scss` <a id="file-src-layouts-layout-scss"></a>

```scss
/* layout.scss */

.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  height: 100px;
  z-index: 999;
  box-sizing: border-box;

  /* Centrowanie zawartości (Menu) */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Animacje */
  transition: transform 0.3s ease-in-out,
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    height 0.3s ease;
}

/* --- WIDOCZNOŚĆ (Smart Hide) --- */
.nav-visible {
  transform: translateY(0);
}

.nav-hidden {
  transform: translateY(-100%);
}

/* --- STYLE TŁA --- */

/* Stan 1: Na samej górze (Przezroczyste) */
.nav-transparent {
  background-color: transparent;
  box-shadow: none;
  /* Możesz tu zwiększyć wysokość dla efektu "oddechu" na start */
  height: 100px;
}

/* Stan 2: Podczas scrollowania (Szkło / Solidne) */
.nav-solid {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 80px;
}

/* Mobile & Tablet Navbar */
@media (max-width: 768px) {
  .navbar-fixed {
    height: 64px !important;

    &.nav-transparent {
      height: 64px !important;
      background-color: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(226, 232, 240, 0.6);
    }

    &.nav-solid {
      height: 60px !important;
      background-color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }
  }
}
```

## File: `src/pages/CityPage.js` <a id="file-src-pages-citypage-js"></a>

```javascript
// src/pages/CityPage.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { citiesData } from "../helpers/citiesData"; // Import bazy danych
import LocalContext from "../components/LocalContext/LocalContext";
// Import innych sekcji (Navbar, Footer, Hero itp.)

const CityPage = () => {
  // 1. Pobieramy slug z URL (to co jest po "przeglad-budowlany-")
  const { citySlug } = useParams();
  const navigate = useNavigate();

  // 2. Szukamy miasta w naszej bazie
  const currentCityData = citiesData.find((city) => city.slug === citySlug);

  // Zabezpieczenie: Jeśli ktoś wpisze zły adres (np. /przeglad-budowlany-warszawa),
  // a Warszawy nie ma w bazie -> przekieruj na główną lub pokaż 404.
  useEffect(() => {
    if (!currentCityData) {
      console.warn("Nie znaleziono miasta:", citySlug);
      navigate("/"); // Przekierowanie na stronę główną
    }
  }, [currentCityData, citySlug, navigate]);

  if (!currentCityData) return null; // Zwracamy null na ułamek sekundy przed przekierowaniem

  return (
    <div className="city-page">
      {/* Navbar, Hero itp... */}

      {/* 3. Przekazujemy dane dynamicznie do LocalContext */}
      <LocalContext 
        city={currentCityData.name}
        description={currentCityData.localDescription}
        risks={currentCityData.risks}
        // Możesz też przekazać np. wideo, jeśli jest w bazie:
        // videoSrc={`/videos/${currentCityData.slug}.mp4`} 
      />

      {/* Footer itp... */}
    </div>
  );
};

export default CityPage;
```

## File: `src/routes/AdminPanel/AICoPilot.jsx` <a id="file-src-routes-adminpanel-aicopilot-jsx"></a>

```jsx
import React, { useState, useEffect, useRef } from "react";
import { Sparkles, FileText, Tag, ChevronRight, Zap, Quote, MessageCircle, Info, Search, X, Layers, RotateCcw } from "lucide-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";

export default function AICoPilot({ keywords: dbKeywords }) {
    const [analytics, setAnalytics] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedOutline, setGeneratedOutline] = useState("");

    const [formData, setFormData] = useState({
        topic: "",

        selectedKeywords: [],
        isSeries: false,
        seriesName: "",
        theses: "",
        includeBuildingLaw: true,
        includeAnecdote: true
    });

    const [activeRadarItem, setActiveRadarItem] = useState(null); // Key for suggestions mapping (Pillar name or Cycle suggestion string)
    const [keywordSearch, setKeywordSearch] = useState("");
    const [showKeywordList, setShowKeywordList] = useState(false);
    const keywordRef = useRef(null);

    useEffect(() => {
        fetchAnalytics();

        const handleClickOutside = (event) => {
            if (keywordRef.current && !keywordRef.current.contains(event.target)) {
                setShowKeywordList(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchAnalytics = async () => {
        setIsLoading(true);
        try {
            const getAnalytics = httpsCallable(functions, "getBlogAnalytics");
            const result = await getAnalytics();
            if (result.data.success) {
                setAnalytics(result.data.data);
            } else {
                console.error("Backend error:", result.data.error);
                setAnalytics(null);
            }
        } catch (error) {
            console.error("Function call failed:", error);
            setAnalytics(null);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleKeyword = (kw) => {
        setFormData(prev => ({
            ...prev,
            selectedKeywords: prev.selectedKeywords.includes(kw)
                ? prev.selectedKeywords.filter(k => k !== kw)
                : [...prev.selectedKeywords, kw]
        }));
    };

    const availableKeywords = (analytics?.allKeywords || dbKeywords || [])
        .filter(kw => kw.toLowerCase().includes(keywordSearch.toLowerCase()))
        .filter(kw => !formData.selectedKeywords.includes(kw));

    const selectSuggestion = (radarKey, suggestionText) => {
        const cycle = analytics?.openCycles?.find(c => c.suggestion === radarKey);

        if (cycle) {
            const combined = `${radarKey} - ${suggestionText}`;
            setFormData(prev => ({
                ...prev,
                topic: combined,
                isSeries: true,
                seriesName: cycle.name
            }));
        } else {
            const combined = `${radarKey} - ${suggestionText}`;
            setFormData(prev => ({ ...prev, topic: combined, isSeries: false }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (generatedOutline) {
            // STEP 2: Generuj finalny tekst na podstawie poprawionego konspektu HTML
            setIsGenerating(true);
            try {
                const draftFromOutline = httpsCallable(functions, "generateDraftFromOutline");
                const result = await draftFromOutline({
                    outlineHtml: generatedOutline,
                    topic: formData.topic,
                    selectedKeywords: formData.selectedKeywords,
                    isSeries: formData.isSeries,
                    seriesName: formData.seriesName
                });

                if (result.data.success) {
                    alert("Szkic wygenerowany! Sprawdź zakładkę 'Moje Szkice', aby go opublikować.");
                    // Reset formularza
                    setGeneratedOutline("");
                    setFormData({
                        topic: "",
                        selectedKeywords: [],
                        isSeries: false,
                        seriesName: "",
                        theses: "",
                        includeBuildingLaw: true,
                        includeAnecdote: true
                    });
                } else {
                    alert("Błąd podczas generowania finalnego tekstu: " + result.data.error);
                }
            } catch (error) {
                console.error(error);
                alert("Błąd połączenia z serwerem podczas Kroku 2.");
            } finally {
                setIsGenerating(false);
            }
            return;
        }

        const submission = { ...formData };

        setIsGenerating(true);
        try {
            const generateOutline = httpsCallable(functions, "generateDraftCoPilot");
            const result = await generateOutline(submission);

            if (result.data.success) {
                setGeneratedOutline(result.data.outline);
            } else {
                alert("Błąd podczas generowania konspektu: " + result.data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Błąd połączenia z serwerem.");
        } finally {
            setIsGenerating(false);
        }
    };

    const pillars = [
        "Prawo budowlane i normy techniczne",
        "Awarie, usterki i diagnostyka budynków",
        "Ubezpieczenia, finanse i koszty eksploatacji",
        "Porady dla kupujących mieszkania i domy (rynek wtórny/pierwotny)"
    ];

    return (
        <div className="ai-copilot-panel">
            <section className="analytics-hints">
                <div className="section-header">
                    <Sparkles size={20} className="text-orange" />
                    <h3>Analityka i Sugestie</h3>
                </div>

                {isLoading ? (
                    <div className="loading-state">Pobieranie analityki...</div>
                ) : analytics ? (
                    <div className="hints-grid">
                        {/* COLUMN 1: TOPIC RADAR (Unified List) */}
                        <div className="hint-card topic-radar">
                            <h4><Zap size={16} /> Radar Tematów</h4>
                            <div className="topic-radar-content">
                                <div className="unified-radar-list">
                                    <p className="label">Obszary i aktywne cykle:</p>
                                    <ul>
                                        {pillars.map((topic, i) => (
                                            <li
                                                key={`p-${i}`}
                                                className={activeRadarItem === topic ? "active" : ""}
                                                onClick={() => setActiveRadarItem(topic)}
                                            >
                                                <span className="dot" style={{ backgroundColor: analytics.topicRadar.missing.includes(topic) ? "#f97316" : "#cbd5e0" }}></span>
                                                <span className="text-truncate">{topic}</span>
                                                <ChevronRight size={14} />
                                            </li>
                                        ))}
                                        {analytics.openCycles?.map((cycle, i) => (
                                            <li
                                                key={`c-${i}`}
                                                className={`cycle-radar-item group relative ${activeRadarItem === cycle.suggestion ? "active" : ""}`}
                                                onClick={() => setActiveRadarItem(cycle.suggestion)}
                                            >
                                                <RotateCcw size={14} className="text-orange" />
                                                <span className="text-truncate">Kontynuacja: {cycle.name} ({cycle.current}/{cycle.total})</span>
                                                <ChevronRight size={14} />

                                                {/* Tooltip on Hover */}
                                                <div className="absolute left-0 bottom-[100%] mb-2 z-50 hidden group-hover:block w-96 bg-white rounded-lg shadow-xl border border-gray-100 p-3 tooltip-cycle">
                                                    <h6 className="text-sm font-semibold text-gray-800 mb-2 border-b pb-1">Istniejące wpisy w cyklu:</h6>
                                                    <ul className="text-xs text-gray-600 space-y-1">
                                                        {cycle.existingParts?.map((part, idx) => (
                                                            <li key={idx} className="flex gap-2">
                                                                <span className="text-orange font-bold">Cz.{part.current}</span>
                                                                <span className="full-title">{part.title}</span>
                                                            </li>
                                                        ))}
                                                        {(!cycle.existingParts || cycle.existingParts.length === 0) && (
                                                            <li>Brak danych historycznych.</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* COLUMN 2: DYNAMIC SUGGESTIONS */}
                        <div className="hint-card topic-suggestions">
                            <h4><Sparkles size={16} /> Nowe Pomysły od AI</h4>
                            <div className="dynamic-suggestions-container">
                                {!activeRadarItem ? (
                                    <div className="empty-selection-prompt">
                                        <Info size={40} />
                                        <p>Wybierz obszar lub cykl z Radaru po lewej, aby zobaczyć konkretne pomysły.</p>
                                    </div>
                                ) : (
                                    <div className="suggestion-group">
                                        <h5 className="pillar-name">
                                            {analytics.openCycles?.some(c => c.suggestion === activeRadarItem) ? "Rozwinięcie dla kolejnej części cyklu" : activeRadarItem}
                                        </h5>
                                        <ul>
                                            {Array.isArray(analytics.topicSuggestions[activeRadarItem]) ? (
                                                analytics.topicSuggestions[activeRadarItem].map((s, i) => (
                                                    <li key={i} onClick={() => selectSuggestion(activeRadarItem, s)}>
                                                        {s} <ChevronRight size={14} />
                                                    </li>
                                                ))
                                            ) : (
                                                !analytics.topicSuggestions[activeRadarItem] ? (
                                                    <div className="no-suggestions">AI przygotowuje pomysły... (Spróbuj odświeżyć jeśli to trwa zbyt długo)</div>
                                                ) : (
                                                    <div className="no-suggestions text-red-500">Błąd formatu danych od AI.</div>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* COLUMN 3: SEO */}
                        <div className="hint-card seo-suggestions">
                            <h4><Tag size={16} /> Sugestie SEO</h4>
                            <div className="tag-cloud">
                                {analytics.seoSuggestions?.map((kw, i) => (
                                    <span key={i} className="hint-tag" onClick={() => toggleKeyword(kw)}>
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="error-state">
                        <Info size={16} />
                        Nie udało się pobrać podpowiedzi. Sprawdź połączenie z Firebase.
                    </div>
                )}
            </section>

            {/* SECTION: EDITORIAL FORM */}
            <section className="editorial-form-container">
                <div className="section-header">
                    <FileText size={20} className="text-orange" />
                    <h3>Formularz Startowy Redaktora</h3>
                </div>

                <form onSubmit={handleSubmit} className="co-pilot-form">
                    <div className="form-group mb-6">
                        <label>Wybrany temat do konspektu</label>
                        <input
                            type="text"
                            placeholder="Kliknij w powyzszą sugestię AI, lub wpisz własny tytuł..."
                            value={formData.topic}
                            onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value, isSeries: false, seriesName: "" }))}
                            className="w-full"
                            required
                        />
                        {formData.isSeries && (
                            <div className="series-badge">
                                <Layers size={14} /> Kontynuacja cyklu: <strong>{formData.seriesName}</strong>
                            </div>
                        )}
                    </div>

                    <div className="form-group" ref={keywordRef}>
                        <label>Słowa kluczowe (Searchable Multi-Select)</label>
                        <div className="keyword-selector-wrapper">
                            <div className="selected-tags-box" onClick={() => setShowKeywordList(true)}>
                                {formData.selectedKeywords.map((kw, i) => (
                                    <span key={i} className="tag">
                                        {kw} <X size={12} onClick={(e) => { e.stopPropagation(); toggleKeyword(kw); }} />
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    placeholder={formData.selectedKeywords.length === 0 ? "Wyszukaj lub wybierz z bazy..." : ""}
                                    value={keywordSearch}
                                    onChange={(e) => { setKeywordSearch(e.target.value); setShowKeywordList(true); }}
                                    onFocus={() => setShowKeywordList(true)}
                                />
                            </div>

                            {showKeywordList && (
                                <div className="keyword-dropdown">
                                    {availableKeywords.length > 0 ? (
                                        availableKeywords.map((kw, i) => (
                                            <div key={i} className="dropdown-item" onClick={() => { toggleKeyword(kw); setKeywordSearch(""); }}>
                                                {kw}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-results">Brak pasujących słów.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Moje tezy / Szkic (Wytyczne dla AI)</label>
                        <textarea
                            placeholder="O czym ma być tekst? Twoje główne myśli, konkretne przypadki z budowy, ważne wnioski..."
                            value={formData.theses}
                            onChange={(e) => setFormData(prev => ({ ...prev, theses: e.target.value }))}
                            rows={5}
                        />
                    </div>

                    <div className="form-toggles">
                        <div className="toggle-group">
                            <label className="switch-label">
                                <input
                                    type="checkbox"
                                    checked={formData.includeBuildingLaw}
                                    onChange={(e) => setFormData(prev => ({ ...prev, includeBuildingLaw: e.target.checked }))}
                                />
                                <Quote size={16} /> Cytat z Prawa Budowlanego
                            </label>
                        </div>
                        <div className="toggle-group">
                            <label className="switch-label">
                                <input
                                    type="checkbox"
                                    checked={formData.includeAnecdote}
                                    onChange={(e) => setFormData(prev => ({ ...prev, includeAnecdote: e.target.checked }))}
                                />
                                <MessageCircle size={16} /> Anegdota / przykład z życia
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        {generatedOutline ? (
                            <div className="outline-review-container mt-6 p-6 bg-gray-100 rounded-xl border border-gray-200 shadow-inner">
                                <label className="outline-label flex items-center gap-2 font-bold text-gray-800 mb-4 text-lg">
                                    <FileText size={22} className="text-orange-500" />
                                    Konspekt Artykułu (Edytor)
                                </label>

                                <div className="editor-google-docs-style bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden mb-6">
                                    {/* Toolbar */}
                                    <div className="toolbar flex flex-wrap gap-2 p-3 bg-gray-50 border-b border-gray-200">
                                        <button
                                            type="button"
                                            onMouseDown={(e) => { e.preventDefault(); document.execCommand('strikeThrough', false, null); }}
                                            className="px-3 py-1.5 bg-red-50 text-red-700 rounded border border-red-200 hover:bg-red-100 text-sm font-semibold flex items-center gap-2 transition-colors focus:outline-none"
                                            title="Zaznacz tekst i kliknij, aby go usunąć ze szkicu"
                                        >
                                            <span className="line-through block">Usuń</span> <span className="text-xs font-normal opacity-75">(Skreśl)</span>
                                        </button>
                                        <button
                                            type="button"
                                            onMouseDown={(e) => { e.preventDefault(); if (!document.execCommand('hiliteColor', false, '#fef08a')) document.execCommand('backColor', false, '#fef08a'); }}
                                            className="px-3 py-1.5 bg-yellow-50 text-yellow-800 rounded border border-yellow-200 hover:bg-yellow-100 text-sm font-semibold flex items-center gap-2 transition-colors focus:outline-none"
                                            title="Zaznacz dopisany przez siebie tekst"
                                        >
                                            <span className="bg-yellow-300 px-1 rounded block">Dodaj</span> <span className="text-xs font-normal opacity-75">(Wyróżnij)</span>
                                        </button>
                                        <button
                                            type="button"
                                            onMouseDown={(e) => { e.preventDefault(); document.execCommand('bold', false, null); }}
                                            className="px-3 py-1.5 bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-100 text-sm font-semibold flex items-center gap-2 transition-colors focus:outline-none"
                                            title="Pogrub fragmenty"
                                        >
                                            <strong className="block">Ważne</strong> <span className="text-xs font-normal opacity-75">(Bold)</span>
                                        </button>
                                    </div>

                                    {/* Editable Area (The "Page") */}
                                    <div className="editor-page-wrapper p-8 bg-white" style={{ minHeight: "500px", maxHeight: "65vh", overflowY: "auto" }}>
                                        <div
                                            className="outline-editable-div w-full min-h-full text-gray-900 outline-none style-prose"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) => setGeneratedOutline(e.currentTarget.innerHTML)}
                                            dangerouslySetInnerHTML={{ __html: generatedOutline }}
                                            style={{
                                                lineHeight: "1.8",
                                                fontSize: "16px",
                                                fontFamily: "system-ui, -apple-system, sans-serif"
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button type="submit" disabled={isGenerating} className="btn-generate-draft w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Sparkles size={24} className={isGenerating ? "animate-pulse" : ""} />
                                    <span>{isGenerating ? "Pisanie artykułu przez AI (to może zająć chwilę)..." : "Krok 2/3: Zatwierdź Konspekt i Poproś AI o finalny tekst"}</span>
                                </button>
                            </div>
                        ) : (
                            <button type="submit" className="btn-generate-draft" disabled={isGenerating}>
                                <Sparkles size={18} />
                                {isGenerating ? "Generowanie Konspektu (Proszę czekać...)" : "Krok 1: Generuj Konspekt"}
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </div>
    );
}
```

## File: `src/routes/AdminPanel/AIDraftEditor.jsx` <a id="file-src-routes-adminpanel-aidrafteditor-jsx"></a>

```jsx
import React, { useState } from "react";
import { X, Save, Type, FileText, Grid, Image as ImageIcon, Tag } from "lucide-react";

/**
 * AIDraftEditor - Simplified modal component to edit AI-generated blog drafts using raw HTML.
 */
export default function AIDraftEditor({ draft, onClose, onSave }) {
    const [form, setForm] = useState({
        title: draft.title || "",
        content: draft.content || "", // Lead
        content2: draft.content2 || "", // Body (Raw HTML)
        categories: Array.isArray(draft.categories) ? draft.categories.join(", ") : "",
        tags: Array.isArray(draft.tags) ? draft.tags.join(", ") : "",
        facebookPost: draft.facebookPost || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const categoriesArray = form.categories.split(",").map(c => c.trim()).filter(Boolean);
        const tagsArray = form.tags.split(",").map(t => t.trim()).filter(Boolean);
        onSave(draft.id, {
            ...form,
            categories: categoriesArray,
            tags: tagsArray,
        });
    };

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal-card">
                <header className="modal-header">
                    <div className="title-area">
                        <div className="icon-circle">
                            <ImageIcon size={20} />
                        </div>
                        <div>
                            <h3>Edytuj Szkic (Format HTML)</h3>
                            <p>Podgląd i edycja surowego kodu wygenerowanego przez AI</p>
                        </div>
                    </div>
                    <button className="btn-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-body">
                        <div className="form-group">
                            <label><Type size={16} /> Tytuł</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label><FileText size={16} /> Krótki opis (Lead)</label>
                            <textarea
                                value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                                rows={3}
                                style={{ fontFamily: "monospace", fontSize: "13px" }}
                            />
                        </div>

                        <div className="form-group">
                            <label><FileText size={16} /> Treść artykułu (Kod HTML)</label>
                            <textarea
                                value={form.content2}
                                onChange={(e) => setForm({ ...form, content2: e.target.value })}
                                rows={15}
                                style={{ fontFamily: "monospace", fontSize: "13px", lineHeight: "1.6" }}
                                placeholder="Wklej lub edytuj kod HTML tutaj..."
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label><Grid size={16} /> Kategorie</label>
                                <input
                                    type="text"
                                    value={form.categories}
                                    onChange={(e) => setForm({ ...form, categories: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label><Tag size={16} /> Tagi SEO</label>
                                <input
                                    type="text"
                                    value={form.tags}
                                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label><ImageIcon size={16} /> Post na Facebooka</label>
                            <textarea
                                value={form.facebookPost}
                                onChange={(e) => setForm({ ...form, facebookPost: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="image-preview">
                            <label>Wygenerowana grafika:</label>
                            {draft.src ? (
                                <img src={draft.src} alt="Draft preview" style={{ borderRadius: "8px", marginTop: "10px" }} />
                            ) : (
                                <div className="no-image">Brak obrazka</div>
                            )}
                        </div>
                    </div>

                    <footer className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Anuluj
                        </button>
                        <button type="submit" className="btn-save">
                            <Save size={18} /> Zapisz zmiany w HTML
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
```

## File: `src/routes/AdminPanel/AdminPanel.jsx` <a id="file-src-routes-adminpanel-adminpanel-jsx"></a>

```jsx
// routes/AdminPanel/AdminPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import "./adminPanel.scss";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import {
  LogOut,
  Plus,
  Trash2,
  ChevronRight,
  Send,
  Calendar,
  Layers,
  BarChart3,
  Users,
  MessageSquare,
  FileEdit,
  X,
  PlusCircle,
  Clock,
  ExternalLink,
  Sparkles,
  Zap,
  Layout,
  Inbox,
  FileText,
  BarChart,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  MapPin,
  Mail,
  User,
  Phone,
  Edit3,
  Type,
  Grid,
  Save,
  Tag,
  Check
} from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { httpsCallable } from "firebase/functions";
import { db, storage, auth, functions } from "../../firebase";
import { signOut } from "firebase/auth";
import ButtonBlot from "../../components/quill/ButtonBlot.js";
import AnalyticsView from "./AnalyticsView";
import AIDraftEditor from "./AIDraftEditor";
import AICoPilot from "./AICoPilot";
import "./aiCoPilot.scss";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);
Quill.register("formats/button", ButtonBlot);

export default function AdminPanel() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [clientRequests, setClientRequests] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [activeTab, setActiveTab] = useState("requests"); // "list" | "form" | "analytics" | "requests" | "ai-drafts" | "keywords"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingDraft, setEditingDraft] = useState(null); // For AI Draft Editor
  const [feedback, setFeedback] = useState(null);
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(false); // Safeguard status

  // Draft Actions with Feedback (Phase 7)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [modalFeedback, setModalFeedback] = useState("");
  const [draftToProcess, setDraftToProcess] = useState(null);
  const [currentActionType, setCurrentActionType] = useState(null); // "publish" | "reject"

  // Appointment scheduling
  const [editRequestId, setEditRequestId] = useState(null);
  const [proposedDate, setProposedDate] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    content2: "",
    categories: "",
    tags: "",
    src: null,
    type: "StandardPost",
    w: 1,
    h: 1,
    buttonLabel: "",
    buttonClass: "",
    buttonOnClick: ""
  });
  const [editingPost, setEditingPost] = useState(null);

  const formatDateTime = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const startEditing = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content,
      content2: post.content2 || "",
      categories: Array.isArray(post.categories) ? post.categories.join(", ") : "",
      type: post.type,
      src: post.src || null,
      w: post.w,
      h: post.h,
      buttonLabel: post.buttonLabel || "",
      buttonClass: post.buttonClass || "",
      buttonOnClick: post.buttonOnClick || "",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : ""
    });
    setActiveTab("form");

    // Quill needs a small delay to be available if tab just switched
    setTimeout(() => {
      if (quillRef.current) {
        quillRef.current.root.innerHTML = post.content2 || "";
      }
    }, 100);
  };

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      content2: "",
      categories: "",
      src: null,
      type: "StandardPost",
      w: 1,
      h: 1,
      buttonLabel: "",
      buttonClass: "",
      buttonOnClick: "",
      tags: ""
    });
    setEditingPost(null);
    if (quillRef.current) {
      quillRef.current.root.innerHTML = "";
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          categories: Array.isArray(doc.data().categories) ? doc.data().categories : [],
        }));
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userCarts"));
        const reqArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClientRequests(reqArray);
      } catch (error) {
        console.error("Błąd podczas pobierania zgłoszeń:", error);
      }
    };

    fetchPosts();
    fetchRequests();

    // Real-time listener for pending posts
    const q = query(collection(db, "pending_posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const drafts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingPosts(drafts);
    });

    // Listener for automation settings
    const unsubSettings = onSnapshot(doc(db, "settings", "blogAutomator"), (docSnap) => {
      if (docSnap.exists()) {
        setIsAutomationEnabled(docSnap.data().isNextCycleEnabled);
      } else {
        setIsAutomationEnabled(false);
      }
    });

    // Listener for keywords (Phase 8)
    const unsubKeywords = onSnapshot(doc(db, "settings", "blogKeywords"), (docSnap) => {
      if (docSnap.exists()) {
        setKeywords(docSnap.data().keywords || []);
      } else {
        setKeywords([]);
      }
    });

    return () => {
      unsubscribe();
      unsubSettings();
      unsubKeywords();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Błąd wylogowania:", error);
      showFeedback("error", "Nie udało się wylogować.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten post?")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      showFeedback("success", "Wpis został usunięty.");
    } catch (error) {
      showFeedback("error", "Błąd podczas usuwania wpisu.");
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to ZGŁOSZENIE (przepadnie)?")) return;
    try {
      await deleteDoc(doc(db, "userCarts", id));
      setClientRequests((prev) => prev.filter((req) => req.id !== id));
      showFeedback("success", "Zgłoszenie zostało usunięte z bazy.");
    } catch (error) {
      showFeedback("error", "Błąd podczas usuwania zgłoszenia.");
    }
  };

  const handleProposeDate = async (id) => {
    if (!proposedDate) {
      alert("Wybierz datę przed zapisaniem.");
      return;
    }

    try {
      const itemRef = doc(db, "userCarts", id);
      await updateDoc(itemRef, {
        scheduledDate: proposedDate,
        status: "OCZEKUJE NA AKCEPTACJĘ"
      });

      setClientRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, scheduledDate: proposedDate, status: "OCZEKUJE NA AKCEPTACJĘ" } : req
        )
      );

      setEditRequestId(null);
      setProposedDate("");
      showFeedback("success", "Zaproponowano termin klientowi.");
    } catch (error) {
      showFeedback("error", "Błąd podczas zapisu terminu.");
    }
  };

  const handleAcceptClientDate = async (id) => {
    try {
      const itemRef = doc(db, "userCarts", id);
      await updateDoc(itemRef, { status: "ZATWIERDZONY" });
      setClientRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: "ZATWIERDZONY" } : req
        )
      );
      showFeedback("success", "Termin zaproponowany przez klienta został zatwierdzony.");
    } catch (error) {
      console.error("Error accepting client date:", error);
      showFeedback("error", "Nie udało się zatwierdzić terminu.");
    }
  };

  const handlePublishDraft = (draft) => {
    setDraftToProcess(draft);
    setModalFeedback("");
    setCurrentActionType("publish");
    setShowFeedbackModal(true);
  };

  const handleDeleteDraft = (draft) => {
    setDraftToProcess(draft);
    setModalFeedback("");
    setCurrentActionType("reject");
    setShowFeedbackModal(true);
  };

  const confirmDraftAction = async () => {
    if (!draftToProcess || !currentActionType) return;
    setIsSubmitting(true);
    try {
      // 1. Save feedback if provided (or just log the action for the AI loop)
      const { serverTimestamp } = await import("firebase/firestore");
      await addDoc(collection(db, "blog_feedback"), {
        feedbackText: modalFeedback.trim() || (currentActionType === "publish" ? "Opublikowano bez dodatkowych uwag." : "Odrzucono bez szczegółowego powodu."),
        date: serverTimestamp(),
        draftTitle: draftToProcess.title,
        action: currentActionType // "publish" or "reject"
      });
      console.log(`Feedback for ${currentActionType} saved.`);

      if (currentActionType === "publish") {
        // PUBLISH LOGIC
        const updatedData = {
          ...draftToProcess,
          status: "published",
          publishedAt: serverTimestamp(),
          date: serverTimestamp(),
        };
        const { id, ...saveData } = updatedData;
        await addDoc(collection(db, "posts"), saveData);
        await deleteDoc(doc(db, "pending_posts", id));
        showFeedback("success", "Artykuł opublikowany!");
      } else {
        // REJECT LOGIC
        await deleteDoc(doc(db, "pending_posts", draftToProcess.id));
        showFeedback("success", "Szkic odrzucony.");
      }

      setShowFeedbackModal(false);
      setDraftToProcess(null);
      setCurrentActionType(null);
    } catch (error) {
      console.error(`Error during ${currentActionType}:`, error);
      showFeedback("error", `Błąd podczas akcji ${currentActionType}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPreferredDateLabel = (val) => {
    if (val === "pilne") return "jak najszybciej";
    if (val === "miesiac") return "w przyszłym miesiącu";
    if (val === "inny") return "w innym terminie";
    return val || "brak sugestii";
  };

  const getInspectionsList = (inspections) => {
    if (!inspections) return "brak";
    return Object.entries(inspections)
      .filter(([_, checked]) => checked)
      .map(([key]) => {
        switch (key) {
          case "specjalista": return "odbiór techniczny";
          case "budowlany": return "przegląd budowlany";
          case "gaz": return "instalacja gazowa";
          case "elektryka": return "instalacja elektryczna";
          case "wentylacja": return "wentylacja";
          default: return key;
        }
      })
      .join(", ") || "brak";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = form.src;
      if (form.src && typeof form.src !== "string") {
        const imageRef = ref(storage, `images/${form.src.name}`);
        const snapshot = await uploadBytes(imageRef, form.src);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const postData = {
        title: form.title,
        content: form.content,
        content2: form.content2,
        categories: form.categories ? form.categories.split(",").map((cat) => cat.trim()) : [],
        tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : [],
        type: form.type,
        src: imageUrl,
        w: form.w,
        h: form.h,
      };

      if (editingPost) {
        const postRef = doc(db, "posts", editingPost.id);
        await updateDoc(postRef, postData);
        setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...postData } : p));
        showFeedback("success", "Wpis zaktualizowany!");
      } else {
        const docRef = await addDoc(collection(db, "posts"), postData);
        setPosts(prev => [...prev, { id: docRef.id, ...postData }]);
        showFeedback("success", "Nowy wpis dodany!");
      }

      resetForm();
      setActiveTab("list");
    } catch (error) {
      showFeedback("error", "Błąd zapisu danych.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateDraft = async (id, updatedData) => {
    try {
      const draftRef = doc(db, "pending_posts", id);
      await updateDoc(draftRef, updatedData);
      showFeedback("success", "Szkic został zaktualizowany.");
      setEditingDraft(null);
    } catch (error) {
      showFeedback("error", "Błąd podczas aktualizacji szkicu.");
    }
  };

  const handleManualGeneration = async () => {
    setIsSubmitting(true);
    try {
      const genFunc = httpsCallable(functions, "generateDraftManual");
      showFeedback("success", "Rozpoczęto generowanie szkicu AI. Może to potrwać około 30-60 sekund...");
      const result = await genFunc();

      if (result.data.success) {
        showFeedback("success", "Nowy szkic AI został pomyślnie wygenerowany!");
      } else {
        showFeedback("error", `Błąd generowania: ${result.data.error || 'Nieznany błąd'}`);
      }
    } catch (error) {
      console.error("Error manual generation:", error);
      showFeedback("error", `Błąd generowania: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleAutomation = async () => {
    setIsSubmitting(true);
    try {
      const toggleFunc = httpsCallable(functions, "setAutomationGate");
      await toggleFunc({ isEnabled: !isAutomationEnabled });
      showFeedback("success", isAutomationEnabled ? "Automatyzacja została wstrzymana." : "Autoryzowano kolejny automatyczny wpis!");
    } catch (error) {
      console.error("Error toggling automation:", error);
      showFeedback("error", "Błąd zmiany ustawień automatyzacji.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddKeyword = async (e) => {
    e.preventDefault();
    const newKeyword = e.target.keyword.value.trim();
    if (!newKeyword) return;
    if (keywords.includes(newKeyword)) {
      showFeedback("error", "To słowo kluczowe już istnieje.");
      return;
    }

    try {
      const updatedKeywords = [...keywords, newKeyword];
      await updateDoc(doc(db, "settings", "blogKeywords"), { keywords: updatedKeywords });
      e.target.reset();
      showFeedback("success", "Dodano słowo kluczowe.");
    } catch (error) {
      // If doc doesn't exist, create it
      try {
        await addDoc(collection(db, "settings"), { keywords: [newKeyword] }); // This is wrong, should be doc.set
      } catch (inner) {
        const adminRef = doc(db, "settings", "blogKeywords");
        await updateDoc(adminRef, { keywords: [newKeyword] }).catch(async () => {
          const { setDoc } = await import("firebase/firestore");
          // Actually, I can just use setDoc elsewhere or handle it properly
        });
      }
      showFeedback("error", "Błąd podczas dodawania słowa kluczowego.");
    }
  };

  // Improved add keyword with proper setDoc handling if needed
  const handleAddKeywordFixed = async (newKeyword) => {
    if (!newKeyword) return;
    try {
      const { setDoc } = await import("firebase/firestore");
      const ref = doc(db, "settings", "blogKeywords");
      await setDoc(ref, { keywords: [...keywords, newKeyword] }, { merge: true });
      showFeedback("success", "Dodano słowo kluczowe.");
    } catch (error) {
      showFeedback("error", "Błąd zapisu słowa.");
    }
  };

  const handleDeleteKeyword = async (kw) => {
    if (!window.confirm(`Czy na pewno usunąć "${kw}"?`)) return;
    try {
      const updatedKeywords = keywords.filter(item => item !== kw);
      await updateDoc(doc(db, "settings", "blogKeywords"), { keywords: updatedKeywords });
      showFeedback("success", "Usunięto słowo kluczowe.");
    } catch (error) {
      showFeedback("error", "Błąd podczas usuwania.");
    }
  };

  useEffect(() => {
    if (activeTab === "form" && editorRef.current && !quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ["blockquote", "code-block"],
              ["link", "image", "video", "button"],
              ["clean"],
            ],
            handlers: {
              button: function () {
                const cursorPosition = this.quill.getSelection()?.index || 0;
                const html = `<button class="main_button quill-button"><span>Kliknij mnie</span></button>`;
                this.quill.clipboard.dangerouslyPasteHTML(cursorPosition, html);
                this.quill.setSelection(cursorPosition + 1);
              },
            },
          },
          imageResize: { displaySize: true },
        },
      });
      quillRef.current = quill;
      quill.on("text-change", () => {
        setForm((prev) => ({ ...prev, content2: quill.root.innerHTML }));
      });
    }
    // Cleanup if switching away from form
    if (activeTab !== "form") {
      quillRef.current = null;
    }
  }, [activeTab]);

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Layout size={24} />
          <span>Panel Admina</span>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeTab === "requests" ? "active" : ""}
            onClick={() => setActiveTab("requests")}
          >
            <Inbox size={18} /> Zgłoszenia użytkowników
          </button>
          <button
            className={activeTab === "list" ? "active" : ""}
            onClick={() => setActiveTab("list")}
          >
            <FileText size={18} /> Wszystkie wpisy
          </button>
          <button
            className={activeTab === "form" ? "active" : ""}
            onClick={() => { resetForm(); setActiveTab("form"); }}
          >
            <Plus size={18} /> Nowy wpis
          </button>
          <button
            className={activeTab === "analytics" ? "active" : ""}
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart size={18} /> Analityka
          </button>

          <button
            className={activeTab === "ai-drafts" ? "active" : ""}
            onClick={() => setActiveTab("ai-drafts")}
          >
            <Sparkles size={18} /> Szkice AI
            {pendingPosts.length > 0 && <span className="nav-badge">{pendingPosts.length}</span>}
          </button>

          <button
            className={activeTab === "keywords" ? "active" : ""}
            onClick={() => setActiveTab("keywords")}
          >
            <Tag size={18} /> Słowa kluczowe
          </button>

          <button
            className={activeTab === "ai-co-pilot" ? "active" : ""}
            onClick={() => setActiveTab("ai-co-pilot")}
          >
            <Zap size={18} color="#f97316" /> AI Co-Pilot
          </button>

          <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
            <button onClick={handleLogout} style={{ color: "#f56565", width: "100%" }}>
              <LogOut size={18} /> Wyloguj się
            </button>
          </div>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-title">
            <h2>
              {activeTab === "requests" ? "Zgłoszenia Użytkowników" :
                activeTab === "list" ? "Baza wpisów blogowych" :
                  activeTab === "analytics" ? "Analityka i Statystyki" :
                    activeTab === "ai-drafts" ? "Szkice AI (Blog Automator)" :
                      activeTab === "keywords" ? "Zarządzanie Słowami Kluczowymi" :
                        activeTab === "ai-co-pilot" ? "AI Co-Pilot (Etap 1: Analityka)" :
                          editingPost ? "Edycja wpisu" : "Nowy wpis"}
            </h2>
            <p>
              {activeTab === "requests" ? `Liczba rezerwacji w systemie: ${clientRequests.length}` :
                activeTab === "list" ? `W systemie znajduje się ${posts.length} wpisów` :
                  activeTab === "analytics" ? "Przeglądaj dane o ruchu na Twojej stronie" :
                    activeTab === "ai-drafts" ? `AI wygenerowało ${pendingPosts.length} szkiców oczekujących na zatwierdzenie` :
                      activeTab === "keywords" ? `W bazie znajduje się ${keywords.length} słów kluczowych` :
                        activeTab === "ai-co-pilot" ? "Przygotuj wytyczne dla AI, aby wygenerować idealny szkic artykułu" :
                          "Wypełnij pola poniżej, aby opublikować wpis"}
            </p>
          </div>
          {activeTab === "form" && (
            <button className="btn-back" onClick={() => setActiveTab("list")}>
              <ChevronLeft size={18} /> Powrót do listy
            </button>
          )}
        </header>

        {feedback && (
          <div className={`admin-alert ${feedback.type}`}>
            {feedback.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {feedback.message}
          </div>
        )}

        <div className="admin-content">
          {activeTab === "analytics" ? (
            <AnalyticsView />
          ) : activeTab === "ai-drafts" ? (
            <section className="drafts-container">
              <header className="drafts-section-header">
                <div className="header-info">
                  <h3>Oczekujące szkice</h3>
                  <div className={`automation-status ${isAutomationEnabled ? 'status-active' : 'status-locked'}`}>
                    <div className="status-dot"></div>
                    <span>{isAutomationEnabled ? 'Automatyzacja: GOTOWA' : 'Automatyzacja: WSTRZYMANA'}</span>
                  </div>
                </div>

                <div className="header-actions">
                  {!isAutomationEnabled && (
                    <button
                      className="btn-enable-automation"
                      onClick={handleToggleAutomation}
                      disabled={isSubmitting}
                    >
                      <Zap size={16} /> Autoryzuj kolejny wpis
                    </button>
                  )}
                  <button
                    className="btn-trigger-ai"
                    onClick={handleManualGeneration}
                    disabled={isSubmitting}
                  >
                    <Sparkles size={16} />
                    {isSubmitting ? "Generowanie..." : "Generuj ręcznie teraz"}
                  </button>
                </div>
              </header>

              {pendingPosts.length === 0 ? (
                <div className="empty-state">Brak nowych szkiców AI. Sprawdź ponownie rano!</div>
              ) : (
                <div className="drafts-grid">
                  {pendingPosts.map((draft) => (
                    <div key={draft.id} className="draft-card">
                      <div className="draft-image">
                        {draft.src ? <img src={draft.src} alt="" /> : <ImageIcon size={32} />}
                      </div>
                      <div className="draft-content">
                        <h3>{draft.title}</h3>
                        <div
                          className="draft-description"
                          dangerouslySetInnerHTML={{ __html: draft.content }}
                        />
                        {draft.content2 && (
                          <div
                            className="draft-body-preview"
                            style={{ fontSize: "0.85rem", color: "#718096", marginTop: "0.5rem", maxHeight: "60px", overflow: "hidden" }}
                            dangerouslySetInnerHTML={{ __html: draft.content2.substring(0, 150) + "..." }}
                          />
                        )}
                        <div className="draft-meta">
                          {draft.categories?.map((cat, i) => <span key={i} className="mini-badge">{cat}</span>)}
                          <span className="date-badge">
                            {draft.createdAt ? new Date(draft.createdAt.seconds * 1000).toLocaleDateString() : 'Nowy'}
                          </span>
                        </div>
                      </div>
                      <div className="draft-actions">
                        <button className="btn-edit" onClick={() => setEditingDraft(draft)}>
                          <FileEdit size={16} /> Edytuj
                        </button>
                        <button className="btn-reject" onClick={() => handleDeleteDraft(draft)}>
                          <X size={16} /> Odrzuć
                        </button>
                        <button className="btn-publish" onClick={() => handlePublishDraft(draft)} disabled={isSubmitting}>
                          <Check size={16} /> Publikuj
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : activeTab === "ai-co-pilot" ? (
            <AICoPilot keywords={keywords} />
          ) : activeTab === "requests" ? (
            <section className="requests-container">
              {clientRequests.length === 0 ? (
                <div className="empty-state">Brak aktualnych zgłoszeń systemowych.</div>
              ) : (
                <div className="requests-grid">
                  {clientRequests.map((req) => (
                    <div key={req.id} className={`request-card ${req.status === "DO ZMIANY" ? "needs-attention" : ""}`}>
                      <div className="req-header">
                        <span className={`status-pill ${req.status === "ZATWIERDZONY" ? "confirmed" :
                          req.status === "OCZEKUJE NA AKCEPTACJĘ" ? "pending-user" :
                            req.status === "KLIENT PROPONUJE TERMIN" ? "pending-action" :
                              req.status === "DO ZMIANY" ? "needs-attention" : "pending"
                          }`}>
                          {req.status || (req.scheduledDate ? "ZATWIERDZONO (stare)" : "NOWE ZGŁOSZENIE")}
                        </span>
                        <div className="req-actions">
                          <button onClick={() => handleDeleteRequest(req.id)} className="action-delete" title="Usuń zgłoszenie">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="req-body">
                        <div className="req-row">
                          <strong><Calendar size={16} /> Termin:</strong>{" "}
                          {editRequestId === req.id ? (
                            <div className="date-propose-row">
                              <input
                                type="datetime-local"
                                value={proposedDate}
                                onChange={(e) => setProposedDate(e.target.value)}
                                className="date-input"
                              />
                              <button onClick={() => handleProposeDate(req.id)} className="btn-save-sm">Zapisz</button>
                              <button onClick={() => setEditRequestId(null)} className="btn-cancel-sm">Anuluj</button>
                            </div>
                          ) : (
                            <>
                              <span style={{ marginRight: '10px' }}>{formatDateTime(req.scheduledDate) || "Brak / nieustalony"}</span>
                              {req.status === "KLIENT PROPONUJE TERMIN" && (
                                <button onClick={() => handleAcceptClientDate(req.id)} className="btn-accept" style={{ marginRight: '10px' }}>
                                  Zatwierdź
                                </button>
                              )}
                              {req.status !== "ZATWIERDZONY" && (
                                <button onClick={() => { setEditRequestId(req.id); setProposedDate(req.scheduledDate || ""); }} className="btn-propose">
                                  {req.scheduledDate ? "Zmień / Zaproponuj nowy" : "Zaproponuj termin"}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        <div className="req-row"><strong><MapPin size={16} /> Adres:</strong> {req.property?.propertyAddress || "Brak"}, {req.property?.nearestCity}</div>
                        <div className="req-row"><strong><Layout size={16} /> Typ budynku:</strong> {req.property?.propertyType}</div>
                        <div className="req-row"><strong><FileText size={16} /> Zakres prac:</strong> {getInspectionsList(req.property?.inspections)}</div>
                        <div className="req-row"><strong><Clock size={16} /> Preferowany czas:</strong> {getPreferredDateLabel(req.property?.preferredDate)}</div>
                        <div className="req-row"><strong><Mail size={16} /> Email klienta:</strong> {req.userEmail || req.contact?.email || "Brak"}</div>
                        {req.contact?.name && <div className="req-row"><strong><User size={16} /> Imię:</strong> {req.contact.name}</div>}
                        {req.contact?.phone && <div className="req-row"><strong><Phone size={16} /> Telefon:</strong> {req.contact.phone}</div>}
                        <div className="req-row"><strong><Clock size={16} /> Utworzono:</strong> {req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleString() : "Brak danych o czasie"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : activeTab === "list" ? (
            <section className="posts-container">
              {posts.map((post) => (
                <div key={post.id} className="post-row-card">
                  <div className="post-info">
                    <div className="post-image-mini">
                      {post.src ? <img src={post.src} alt="" /> : <ImageIcon size={20} />}
                    </div>
                    <div>
                      <h3>{post.title}</h3>
                      <div className="post-tags">
                        {post.categories.map((c, i) => <span key={i} className="tag">{c}</span>)}
                        <span className="type-badge">{post.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="post-actions">
                    <button className="action-edit" onClick={() => startEditing(post)} title="Edytuj">
                      <Edit3 size={18} />
                    </button>
                    <button className="action-delete" onClick={() => handleDelete(post.id)} title="Usuń">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <div className="empty-state">Brak wpisów w bazie. Dodaj pierwszy post!</div>}
            </section>
          ) : activeTab === "keywords" ? (
            <section className="keywords-manager">
              <div className="keywords-form-box">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddKeywordFixed(e.target.keyword.value.trim());
                  e.target.reset();
                }}>
                  <input name="keyword" type="text" placeholder="Dodaj nowe słowo kluczowe..." required />
                  <button type="submit" className="btn-add-keyword">
                    <PlusCircle size={18} /> Dodaj
                  </button>
                </form>
              </div>

              <div className="keywords-list">
                {keywords.length === 0 ? (
                  <p className="empty-state">Brak zdefiniowanych słów kluczowych.</p>
                ) : (
                  <div className="kw-tags-grid">
                    {keywords.map((kw, i) => (
                      <div key={i} className="kw-tag-item">
                        <span>{kw}</span>
                        <button onClick={() => handleDeleteKeyword(kw)} className="btn-del-kw">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section className="form-container">
              <form onSubmit={handleSubmit} className="modern-form">
                <div className="form-grid">
                  <div className="form-group full">
                    <label><Type size={16} /> Tytuł wpisu</label>
                    <input
                      type="text"
                      required
                      placeholder="Wprowadź chwytliwy tytuł..."
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group full">
                    <label>Krótki nagłówek (Lead)</label>
                    <textarea
                      placeholder="Krótki opis widoczny na kafelku..."
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                    />
                  </div>

                  <div className="form-group half">
                    <label><Grid size={16} /> Wymiary (W x H)</label>
                    <div className="input-row">
                      <input type="number" value={form.w} onChange={(e) => setForm({ ...form, w: parseInt(e.target.value, 10) || 1 })} />
                      <span>x</span>
                      <input type="number" value={form.h} onChange={(e) => setForm({ ...form, h: parseInt(e.target.value, 10) || 1 })} />
                    </div>
                  </div>

                  <div className="form-group half">
                    <label>Kategorie (po przecinku)</label>
                    <input
                      type="text"
                      placeholder="np. Remont, Prawo, Porady"
                      value={form.categories}
                      onChange={(e) => setForm({ ...form, categories: e.target.value })}
                    />
                  </div>

                  <div className="form-group half">
                    <label>Zdjęcie wyróżniające</label>
                    <div className="file-input-wrapper">
                      <input type="file" onChange={(e) => setForm({ ...form, src: e.target.files[0] })} />
                      <div className="file-info">{form.src ? (typeof form.src === 'string' ? 'Podmieniasz obecne' : form.src.name) : 'Wybierz plik...'}</div>
                    </div>
                  </div>

                  <div className="form-group half">
                    <label>Typ wpisu</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      <option value="StandardPost">Standardowy (StandardPost)</option>
                      <option value="TextPost">Tylko tekst (TextPost)</option>
                      <option value="CategoriesPost">Kategoria (CategoriesPost)</option>
                    </select>
                  </div>

                  <div className="form-group full">
                    <label>Tagi (po przecinku, np. #bezpieczeństwo, #inspekcja)</label>
                    <input
                      type="text"
                      placeholder="np. dach, kontrola, prawo"
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    />
                  </div>
                </div>

                <div className="editor-section">
                  <label>Treść główna artykułu</label>
                  <div className="quill-wrapper">
                    <div id="editor" ref={editorRef}></div>
                  </div>
                </div>

                <div className="form-footer">
                  <button type="submit" className="btn-save" disabled={isSubmitting}>
                    {isSubmitting ? "Zapisywanie..." : <><Save size={18} /> {editingPost ? "Zapisz zmiany" : "Opublikuj wpis"}</>}
                  </button>
                  <button type="button" className="btn-cancel" onClick={() => setActiveTab("list")}>
                    Anuluj
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Unified Feedback Modal (Phase 7) */}
          {showFeedbackModal && (
            <div className="admin-modal-overlay">
              <div className="admin-modal">
                <div className="modal-header">
                  <h3>{currentActionType === "publish" ? "Publikacja artykułu" : "Odrzucenie szkicu"}</h3>
                  <button onClick={() => setShowFeedbackModal(false)}><X size={20} /></button>
                </div>
                <div className="modal-body">
                  <p>
                    {currentActionType === "publish"
                      ? "Gratulacje! Zanim opublikujesz, możesz dodać uwagi dla AI, co najbardziej podobało Ci się w tym tekście lub co warto utrzymać w przyszłości."
                      : "Podaj powód odrzucenia. Twoje uwagi zostaną wzięte pod uwagę przez AI przy generowaniu kolejnego tekstu."}
                  </p>
                  <textarea
                    placeholder={currentActionType === "publish"
                      ? "np. Świetny ton, bardzo dobre wypunktowanie instalacji..."
                      : "np. Zbyt oficjalny język, brak konkretów o dachach, popraw dane o art. 62..."}
                    value={modalFeedback}
                    onChange={(e) => setModalFeedback(e.target.value)}
                    style={{ width: "100%", minHeight: "120px", padding: "12px", borderRadius: "8px", border: "1px solid #edf2f7", marginTop: "1rem" }}
                  />
                </div>
                <div className="modal-footer" style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                  <button
                    className="btn-cancel"
                    onClick={() => setShowFeedbackModal(false)}
                    style={{ padding: "10px 20px" }}
                  >
                    Anuluj
                  </button>
                  <button
                    className="btn-publish"
                    onClick={confirmDraftAction}
                    disabled={isSubmitting}
                    style={{ background: currentActionType === "publish" ? "#10b981" : "#f56565", padding: "10px 20px" }}
                  >
                    {isSubmitting ? "Przetwarzanie..." : (currentActionType === "publish" ? "Publikuj i zapisz uwagi" : "Odrzuć i zapisz uwagi")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div> {/* admin-content */}
      </main>

      {editingDraft && (
        <AIDraftEditor
          draft={editingDraft}
          onClose={() => setEditingDraft(null)}
          onSave={handleUpdateDraft}
        />
      )}
    </div>
  );
}

```

## File: `src/routes/AdminPanel/AnalyticsView.jsx` <a id="file-src-routes-adminpanel-analyticsview-jsx"></a>

```jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';
import {
    LineChart,
    Line,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Activity, Clock, Users, Calendar, Shield, Trash2, Plus } from 'lucide-react';
import './analyticsView.scss';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ef4444'];
const SECTION_NAMES = {
    hero_section: "Sekcja Główna (Hero)",
    scope_section: "Co robimy (Scope)",
    why_important_section: "Dlaczego warto",
    inspection_form_section: "Formularz Wyceny",
    timeline_section: "Jak działamy (Timeline)",
    faq_section: "FAQ"
};

export default function AnalyticsView() {
    const [pageViews, setPageViews] = useState([]);
    const [sectionTime, setSectionTime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDateInterval, setCurrentDateInterval] = useState('7 dni');

    const [ignoredIps, setIgnoredIps] = useState([]);
    const [currentIp, setCurrentIp] = useState("");
    const [newIp, setNewIp] = useState("");

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            setLoading(true);
            try {
                // Fetch Page Views (sort by date desc, limit to last 30 days)
                const pvQuery = query(collection(db, 'page_views'), orderBy('date', 'desc'), limit(30));
                const pvSnapshot = await getDocs(pvQuery);

                let pViews = [];
                pvSnapshot.forEach((doc) => {
                    pViews.push({ date: doc.id, ...doc.data() });
                });

                // Reverse so chronological order left to right on chart
                pViews.reverse();
                setPageViews(pViews);

                // Fetch Section Time
                const stQuery = query(collection(db, 'section_time'), orderBy('date', 'desc'), limit(30));
                const stSnapshot = await getDocs(stQuery);

                let sTimes = [];
                stSnapshot.forEach((doc) => {
                    sTimes.push({ date: doc.id, ...doc.data() });
                });
                setSectionTime(sTimes);

            } catch (error) {
                console.error('Błąd pobierania analityki:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchSettings = async () => {
            try {
                const settingsDoc = await getDoc(doc(db, "settings", "analytics"));
                if (settingsDoc.exists()) {
                    setIgnoredIps(settingsDoc.data().ignoredIps || []);
                }

                const cachedIp = sessionStorage.getItem("current_ip");
                if (cachedIp) {
                    setCurrentIp(cachedIp);
                } else {
                    const response = await fetch("https://api.ipify.org?format=json");
                    const data = await response.json();
                    setCurrentIp(data.ip);
                    sessionStorage.setItem("current_ip", data.ip);
                }
            } catch (error) {
                console.error("Błąd pobierania ustawień analityki:", error);
            }
        };

        fetchAnalyticsData();
        fetchSettings();
    }, []);

    const handleAddIp = async (ipToAdd) => {
        if (!ipToAdd.trim()) return;
        try {
            const docRef = doc(db, "settings", "analytics");
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, { ignoredIps: [ipToAdd] });
            } else {
                await updateDoc(docRef, {
                    ignoredIps: arrayUnion(ipToAdd)
                });
            }
            setIgnoredIps(prev => [...new Set([...prev, ipToAdd])]);
            setNewIp("");
            if (ipToAdd === currentIp) {
                sessionStorage.setItem("is_ip_ignored", "true");
            }
        } catch (error) {
            console.error("Błąd dodawania IP:", error);
            alert("Wystąpił błąd podczas dodawania IP. Sprawdź logi by poznać szczegóły.");
        }
    };

    const handleRemoveIp = async (ipToRemove) => {
        try {
            const docRef = doc(db, "settings", "analytics");
            await updateDoc(docRef, {
                ignoredIps: arrayRemove(ipToRemove)
            });
            setIgnoredIps(prev => prev.filter(ip => ip !== ipToRemove));
            if (ipToRemove === currentIp) {
                sessionStorage.setItem("is_ip_ignored", "false");
            }
        } catch (error) {
            console.error("Błąd usuwania IP:", error);
            alert("Wystąpił błąd podczas usuwania IP.");
        }
    };

    // Aggregate Section Time Data for Chart
    const getAggregatedSectionTime = () => {
        const totals = {};
        let totalTimeAllSections = 0;

        sectionTime.forEach(dayRecord => {
            Object.keys(dayRecord).forEach(key => {
                if (key !== 'date') {
                    totals[key] = (totals[key] || 0) + dayRecord[key];
                    totalTimeAllSections += dayRecord[key];
                }
            });
        });

        const chartData = Object.keys(totals).map(key => ({
            name: SECTION_NAMES[key] || key,
            value: totals[key], // w sekundach
            totalPercentage: totalTimeAllSections > 0 ? ((totals[key] / totalTimeAllSections) * 100).toFixed(1) : 0
        }));

        return chartData.sort((a, b) => b.value - a.value); // Malejąco po czasie
    };

    const sectionChartData = getAggregatedSectionTime();

    const getTotalViews = () => pageViews.reduce((acc, curr) => acc + (curr.count || 0), 0);

    if (loading) {
        return <div className="analytics-loading">Ładowanie danych analitycznych...</div>;
    }

    return (
        <div className="analytics-view">
            <div className="analytics-overview-cards">
                <div className="stat-card">
                    <div className="stat-icon"><Users size={24} /></div>
                    <div className="stat-info">
                        <p>Odsłony łącznie (ostatnie {pageViews.length} dni)</p>
                        <h3>{getTotalViews()}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Clock size={24} /></div>
                    <div className="stat-info">
                        <p>Najdłużej oglądana sekcja</p>
                        <h3 className="small-text">{sectionChartData[0]?.name || 'Brak danych'}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Activity size={24} /></div>
                    <div className="stat-info">
                        <p>Odsłony dzisiaj ({pageViews.length > 0 ? pageViews[pageViews.length - 1].date : 'Brak danych'})</p>
                        <h3>{pageViews.length > 0 ? pageViews[pageViews.length - 1].count : 0}</h3>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-container full-width">
                    <h3><Calendar size={18} /> Wizyty na stronie w ostatnich dniach</h3>
                    <p className="chart-desc">Liczba unikalnych odsłon sesyjnych z podziałem na dni z ostatnich 30 dni wejść.</p>
                    <div className="chart-wrapper line-chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={pageViews} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="date" stroke="#64748B" fontSize={12} tickMargin={10} />
                                <YAxis stroke="#64748B" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    labelStyle={{ fontWeight: 'bold', color: '#1E293B' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                                <Line type="monotone" dataKey="count" name="Odsłony" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-container half-width">
                    <h3><Clock size={18} /> Czas spędzony na sekcjach (łączny czas)</h3>
                    <p className="chart-desc">W których częściach witryny użytkownicy zatrzymują się na dłużej?</p>

                    <div className="chart-wrapper bar-chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sectionChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    formatter={(value) => [`${Math.round(value / 60)} min ${value % 60} sek`, 'Czas']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="value" name="Czas (s)" radius={[0, 4, 4, 0]} barSize={24}>
                                    {sectionChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-container half-width">
                    <h3>Podział zaangażowania (%)</h3>
                    <div className="chart-wrapper pie-chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sectionChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {sectionChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`${Math.round(value / 60)} min`, 'Łącznie']}
                                />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            <div className="ip-filtering-section-wrapper">
                <h3><Shield size={18} /> Filtrowanie ruchu (Wykluczenia IP)</h3>
                <p className="section-desc">Ruch z poniższych adresów IP nie będzie wliczany do statystyk analitycznych.</p>

                <div className="ip-controls">
                    <div className="ip-box current-ip-box">
                        <p className="ip-box-title">Twój obecny adres IP:</p>
                        <strong className="ip-value">{currentIp || "Ładowanie..."}</strong>
                        {currentIp && !ignoredIps.includes(currentIp) && (
                            <button onClick={() => handleAddIp(currentIp)} className="btn-add-ip">
                                Wyklucz mój IP
                            </button>
                        )}
                        {currentIp && ignoredIps.includes(currentIp) && (
                            <div className="ip-status-badge">Odporny na śledzenie</div>
                        )}
                    </div>

                    <div className="ip-box manual-ip-box">
                        <p className="ip-box-title">Dodaj inny adres IP:</p>
                        <div className="ip-input-group">
                            <input
                                type="text"
                                placeholder="Np. 192.168.1.1"
                                value={newIp}
                                onChange={(e) => setNewIp(e.target.value)}
                            />
                            <button onClick={() => handleAddIp(newIp)} disabled={!newIp.trim()}>
                                <Plus size={16} /> Dodaj
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ignored-ips-list">
                    <h4>Zignorowane adresy ({ignoredIps.length})</h4>
                    {ignoredIps.length === 0 ? (
                        <p className="empty-text">Brak wykluczonych adresów IP.</p>
                    ) : (
                        <ul>
                            {ignoredIps.map(ip => (
                                <li key={ip}>
                                    <span>{ip} {ip === currentIp && <span className="current-tag">(Twój IP)</span>}</span>
                                    <button onClick={() => handleRemoveIp(ip)} title="Usuń wykluczenie" className="btn-remove">
                                        <Trash2 size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

```

## File: `src/routes/AdminPanel/adminPanel.scss` <a id="file-src-routes-adminpanel-adminpanel-scss"></a>

```scss
@import "../../styles/variables.scss";

// Nowe zmienne lokalne dla panelu (pobrane z variables.scss)
$sidebar-width: 260px;
$sidebar-bg: #1a1c1e; // Ciemniejszy antracyt dla kontrastu
$accent-green: $color-signal-orange;
$bg-main: #f8f9fa;
$card-bg: #ffffff;
$border-light: #edf2f7;
$text-sub: #718096;

.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: $bg-main;
  font-family: "ProductSans", sans-serif;
  color: $color-text-main;

  /* SIDEBAR */
  .admin-sidebar {
    width: $sidebar-width;
    background-color: $sidebar-bg;
    color: white;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 100;

    .sidebar-header {
      padding: 2rem;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.2rem;
      font-weight: 700;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: $accent-green;
    }

    .sidebar-nav {
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 8px;

      button {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        font-size: 15px;

        &:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        &.active {
          background: $accent-green;
          color: white;
          font-weight: 600;
        }

        .nav-badge {
          margin-left: auto;
          background: #f97316; // Orange for AI alerts
          color: white;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
        }
      }
    }
  }

  /* MAIN CONTENT */
  .admin-main {
    flex: 1;
    margin-left: $sidebar-width;
    padding: 2.5rem;
    max-width: 1400px;

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2.5rem;

      .header-title {
        h2 {
          font-size: 28px;
          margin: 0 0 4px 0;
          font-weight: 700;
        }

        p {
          color: $text-sub;
          font-size: 14px;
        }
      }

      .btn-back {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: white;
        border: 1px solid $border-light;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s ease;

        &:hover {
          background: $bg-main;
        }
      }
    }
  }

  /* LIST VIEW */
  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .post-row-card {
      background: white;
      padding: 1.25rem 1.5rem;
      border-radius: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      border: 1px solid white;
      transition: border-color 0.2s ease;

      &:hover {
        border-color: rgba($accent-green, 0.3);
      }

      .post-info {
        display: flex;
        align-items: center;
        gap: 20px;

        .post-image-mini {
          width: 60px;
          height: 60px;
          background: $bg-main;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          color: $text-sub;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        h3 {
          font-size: 17px;
          margin: 0 0 6px 0;
        }

        .post-tags {
          display: flex;
          gap: 8px;
          align-items: center;

          .tag {
            font-size: 11px;
            background: #edf2f7;
            padding: 2px 8px;
            border-radius: 6px;
            color: #4a5568;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.5px;
          }

          .type-badge {
            font-size: 11px;
            color: $accent-green;
            font-weight: 600;
          }
        }
      }

      .post-actions {
        display: flex;
        gap: 12px;

        button {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;

          &.action-edit {
            background: rgba($accent-green, 0.1);
            color: $accent-green;

            &:hover {
              background: $accent-green;
              color: white;
            }
          }

          &.action-delete {
            background: #fff5f5;
            color: #f56565;

            &:hover {
              background: #f56565;
              color: white;
            }
          }
        }
      }
    }
  }

  /* REQUESTS VIEW (User Submissions) */
  .requests-container {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .requests-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 20px;

      .request-card {
        background: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
        border: 1px solid $border-light;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        display: flex;
        flex-direction: column;
        gap: 15px;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border-color: rgba($accent-green, 0.3);
        }

        .req-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid $border-light;
          padding-bottom: 15px;

          .status-pill {
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.5px;

            &.pending {
              background: #fff3cd;
              color: #856404;
            }

            &.pending-user {
              background: #feebc8; // orange-100
              color: #dd6b20; // orange-500
            }

            &.needs-attention {
              background: #fed7d7; // red-100
              color: #e53e3e; // red-600
            }

            &.confirmed {
              background: #d4edda;
              color: #155724;
            }
          }

          .req-actions {
            button {
              background: transparent;
              border: none;
              cursor: pointer;
              color: #a0aec0;
              transition: 0.2s;
              padding: 5px;

              &:hover {
                color: #f56565;
                transform: scale(1.1);
              }
            }
          }
        }

        .req-body {
          display: flex;
          flex-direction: column;
          gap: 12px;

          .req-row {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 14px;
            color: #4a5568;
            line-height: 1.4;

            strong {
              display: flex;
              align-items: center;
              gap: 6px;
              color: #2d3748;
              min-width: 140px;
              font-weight: 600;

              svg {
                color: $accent-green;
              }
            }

            .btn-propose {
              background: rgba($accent-green, 0.1);
              color: $accent-green;
              border: 1px solid rgba($accent-green, 0.3);
              padding: 4px 10px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 700;
              cursor: pointer;
              transition: 0.2s;

              &:hover {
                background: $accent-green;
                color: white;
              }
            }

            .btn-accept {
              background: $accent-green;
              color: white;
              border: 1px solid $accent-green;
              padding: 4px 10px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 700;
              cursor: pointer;
              transition: 0.2s;

              &:hover {
                background: darken($accent-green, 5%);
              }
            }

            .date-propose-row {
              display: flex;
              align-items: center;
              gap: 8px;

              .date-input {
                padding: 4px 8px;
                border: 1px solid $border-light;
                border-radius: 6px;
                font-family: inherit;
                font-size: 13px;
                outline: none;

                &:focus {
                  border-color: $accent-green;
                }
              }

              .btn-save-sm {
                background: $accent-green;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                  background: darken($accent-green, 5%);
                }
              }

              .btn-cancel-sm {
                background: transparent;
                color: #718096;
                border: 1px solid #cbd5e0;
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                  background: #f7fafc;
                  color: #4a5568;
                }
              }
            }
          }
        }
      }
    }
  }

  /* FORM VIEW */
  .modern-form {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 32px;

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;

        &.full {
          grid-column: span 2;
        }

        label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
        }

        input,
        textarea,
        select {
          padding: 12px 16px;
          border: 1px solid $border-light;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s ease;

          &:focus {
            border-color: $accent-green;
          }
        }

        textarea {
          height: 100px;
          resize: vertical;
        }

        .input-row {
          display: flex;
          align-items: center;
          gap: 12px;

          input {
            width: 80px;
            text-align: center;
          }

          span {
            color: $text-sub;
            font-size: 12px;
            font-weight: 700;
          }
        }
      }
    }

    .editor-section {
      margin-bottom: 32px;

      label {
        display: block;
        margin-bottom: 12px;
        font-weight: 600;
        color: #4a5568;
      }

      .quill-wrapper {
        border: 1px solid $border-light;
        border-radius: 12px;
        overflow: hidden;

        .ql-toolbar {
          border: none;
          border-bottom: 1px solid $border-light;
          background: #f8fafc;
        }

        .ql-container {
          border: none;
          min-height: 400px;
          font-family: inherit;
          font-size: 16px;
        }
      }
    }

    .form-footer {
      display: flex;
      gap: 16px;
      padding-top: 24px;
      border-top: 1px solid $border-light;

      .btn-save {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 32px;
        background: $accent-green;
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba($accent-green, 0.3);
        }

        &:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      }

      .btn-cancel {
        padding: 14px 24px;
        background: transparent;
        border: 1px solid $border-light;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          background: #f8fafc;
        }
      }
    }
  }

  /* ALERTS */
  .admin-alert {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    font-weight: 600;
    font-size: 14px;

    &.success {
      background: #f0fff4;
      color: #2f855a;
      border: 1px solid #c6f6d5;
    }

    &.error {
      background: #fff5f5;
      color: #c53030;
      border: 1px solid #fed7d7;
    }
  }

  .empty-state {
    text-align: center;
    padding: 4rem;
    background: white;
    border-radius: 20px;
    color: $text-sub;
    border: 2px dashed $border-light;
  }

  /* KEYWORDS MANAGER (Phase 8) */
  .keywords-manager {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);

    .keywords-form-box {
      margin-bottom: 2.5rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid $border-light;

      form {
        display: flex;
        gap: 12px;
        max-width: 600px;

        input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid $border-light;
          border-radius: 10px;
          font-size: 15px;
          outline: none;

          &:focus {
            border-color: $accent-green;
          }
        }

        .btn-add-keyword {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: $accent-green;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba($accent-green, 0.3);
          }
        }
      }
    }

    .keywords-list {
      .kw-tags-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

        .kw-tag-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          background: #f7fafc;
          border: 1px solid #edf2f7;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
          transition: all 0.2s ease;

          &:hover {
            border-color: $accent-green;
            background: rgba($accent-green, 0.05);
          }

          .btn-del-kw {
            background: transparent;
            border: none;
            color: #a0aec0;
            cursor: pointer;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;

            &:hover {
              color: #f56565;
            }
          }
        }
      }
    }
  }

  /* DRAFTS VIEW */
  .drafts-container {
    .drafts-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      .header-info {
        display: flex;
        flex-direction: column;
        gap: 8px;

        h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: $color-text-main;
        }

        .automation-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          width: fit-content;

          .status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }

          &.status-active {
            background: rgba(34, 197, 94, 0.1);
            color: #22c55e;

            .status-dot {
              background: #22c55e;
              box-shadow: 0 0 8px #22c55e;
            }
          }

          &.status-locked {
            background: rgba(100, 116, 139, 0.1);
            color: #64748b;

            .status-dot {
              background: #64748b;
            }
          }
        }
      }

      .header-actions {
        display: flex;
        gap: 12px;
      }

      .btn-enable-automation {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: $color-text-main;
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: darken($color-text-main, 10%);
          transform: translateY(-2px);
        }
      }

      .btn-trigger-ai {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: #f97316; // Orange for AI actions
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);

        &:hover {
          background: darken(#f97316, 5%);
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(249, 115, 22, 0.3);
        }

        &:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      }
    }

    .drafts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 24px;
    }

    .draft-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid $border-light;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        border-color: rgba($accent-green, 0.3);
      }

      .draft-image {
        height: 180px;
        background: #f7fafc;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #cbd5e0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .draft-content {
        padding: 1.5rem;
        flex: 1;

        h3 {
          font-size: 18px;
          margin: 0 0 10px 0;
          font-weight: 700;
          line-height: 1.3;
        }

        .draft-description,
        .draft-body-preview {
          font-size: 14px;
          color: $text-sub;
          line-height: 1.5;
          margin-bottom: 1rem;

          ul,
          ol {
            padding-left: 1.25rem;
            margin: 0.5rem 0;
            list-style-type: disc !important;

            li {
              margin-bottom: 0.25rem;
              display: list-item;
              list-style-type: disc !important;
            }
          }
        }

        .draft-description {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 1.5rem;
        }

        .draft-body-preview {
          opacity: 0.8;
          font-size: 13px;
          border-top: 1px dashed $border-light;
          padding-top: 1rem;
        }

        .draft-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .mini-badge {
            background: rgba($accent-green, 0.1);
            color: $accent-green;
            font-size: 10px;
            font-weight: 800;
            padding: 3px 8px;
            border-radius: 4px;
            text-transform: uppercase;
          }

          .date-badge {
            font-size: 12px;
            color: #a0aec0;
          }
        }
      }

      .draft-actions {
        display: grid;
        grid-template-columns: 1fr 1fr 1.5fr;
        border-top: 1px solid $border-light;

        button {
          padding: 12px 0;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: 0.2s;

          &:not(:last-child) {
            border-right: 1px solid $border-light;
          }

          &.btn-edit {
            color: #4a5568;

            &:hover {
              background: #f7fafc;
            }
          }

          &.btn-reject {
            color: #e53e3e;

            &:hover {
              background: #fff5f5;
            }
          }

          &.btn-publish {
            background: $accent-green;
            color: white;

            &:hover {
              background: darken($accent-green, 5%);
            }

            &:disabled {
              background: #cbd5e0;
              cursor: wait;
            }
          }
        }
      }
    }
  }
}

/* FILE INPUT HACK */
.file-input-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;

  input[type=file] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .file-info {
    padding: 12px 16px;
    border: 1px solid $border-light;
    border-radius: 10px;
    background: #f8fafc;
    font-size: 14px;
    color: $text-sub;
  }
}

@media (max-width: 992px) {
  .admin-dashboard {
    .admin-sidebar {
      width: 80px;

      .sidebar-header span,
      .sidebar-nav button span {
        display: none;
      }
    }

    .admin-main {
      margin-left: 80px;
    }
  }
}

/* MODAL STYLES */
.admin-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;

  .admin-modal-card {
    background: white;
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: modalSlideUp 0.3s ease-out;

    .modal-header {
      padding: 1.5rem 2rem;
      border-bottom: 1px solid $border-light;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title-area {
        display: flex;
        align-items: center;
        gap: 16px;

        .icon-circle {
          width: 44px;
          height: 44px;
          background: rgba($accent-green, 0.1);
          color: $accent-green;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
        }

        p {
          margin: 2px 0 0 0;
          font-size: 13px;
          color: $text-sub;
        }
      }

      .btn-close {
        background: transparent;
        border: none;
        color: #a0aec0;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          color: #f56565;
        }
      }
    }

    .modal-form {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;

      .form-body {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;

          label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 600;
            color: #4a5568;
          }

          input,
          textarea {
            padding: 12px 16px;
            border: 1px solid $border-light;
            border-radius: 10px;
            font-size: 15px;
            outline: none;
            transition: border-color 0.2s;

            &:focus {
              border-color: $accent-green;
            }
          }

          .content-textarea {
            font-family: monospace;
            font-size: 13px;
            line-height: 1.6;
            background: #f8fafc;
          }
        }

        .image-preview {
          margin-top: 10px;

          label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: #4a5568;
            font-size: 14px;
          }

          img {
            width: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 12px;
            border: 1px solid $border-light;
          }

          .no-image {
            padding: 40px;
            background: #f7fafc;
            border-radius: 12px;
            text-align: center;
            color: #a0aec0;
            border: 1px dashed $border-light;
          }
        }
      }

      .modal-footer {
        padding: 1.5rem 2rem;
        border-top: 1px solid $border-light;
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        background: #f8fafc;

        button {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
          border: none;
        }

        .btn-cancel {
          background: transparent;
          border: 1px solid #cbd5e0;
          color: #4a5568;

          &:hover {
            background: white;
          }
        }

        .btn-save {
          background: $accent-green;
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba($accent-green, 0.2);
          }
        }
      }

      .modal-body {

        /* This was originally inside .modal-form, but the provided edit places it outside. Re-nesting it here. */
        p {
          color: $text-sub;
          font-size: 14px;
          line-height: 1.6;
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## File: `src/routes/AdminPanel/aiCoPilot.scss` <a id="file-src-routes-adminpanel-aicopilot-scss"></a>

```scss
.ai-copilot-panel {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    animation: fadeIn 0.4s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .section-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 0.75rem;

        h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #2d3748;
            margin: 0;
        }

        .text-orange {
            color: #f97316;
        }
    }

    /* HINTS SECTION */
    .hints-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .hint-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
            border: 1px solid #f1f5f9;
            transition: box-shadow 0.2s, transform 0.2s;

            &:hover {
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
                transform: translateY(-2px);
            }

            h4 {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 1rem;
                font-weight: 600;
                color: #1e293b;
                margin-top: 0;
                margin-bottom: 1.25rem;

                svg {
                    color: #f97316;
                }
            }

            .grouped-suggestions-container {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;

                .suggestion-group {
                    h5.pillar-name {
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        color: #64748b;
                        margin-bottom: 0.75rem;
                        padding-left: 0;
                    }
                }
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0;

                li {
                    padding: 0.75rem 1rem;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 12px;
                    margin-bottom: 0.25rem;
                    font-size: 0.9rem;
                    color: #334155;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    .dot {
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        margin-right: 0.75rem;
                    }

                    &:hover {
                        background: #f8fafc;
                        color: #0f172a;
                    }

                    &.active {
                        background: #fff7ed;
                        color: #ea580c;
                        font-weight: 500;

                        svg {
                            opacity: 1;
                            transform: translateX(4px);
                            color: #ea580c;
                        }
                    }

                    &.cycle-radar-item {
                        border-left: 3px solid #fbd38d;
                        background: transparent;

                        &.active {
                            background: #fff7ed;
                            border-left-color: #f97316;
                            color: #ea580c;
                        }

                        svg.text-orange {
                            color: #f97316;
                        }

                        .tooltip-cycle {
                            display: none;
                            position: absolute;
                            z-index: 50;
                            width: max-content;
                            max-width: 350px;
                            background: #ffffff;
                            border-radius: 12px;
                            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                            border: 1px solid #f1f5f9;
                            padding: 16px;

                            h6 {
                                font-size: 0.85rem;
                                font-weight: 600;
                                color: #1e293b;
                                margin-bottom: 12px;
                                border-bottom: 1px solid #f1f5f9;
                                padding-bottom: 8px;
                            }

                            ul {
                                list-style: none;
                                padding: 0;
                                margin: 0;
                                display: flex;
                                flex-direction: column;
                                gap: 6px;

                                li {
                                    padding: 0;
                                    margin: 0;
                                    background: transparent;
                                    border: none;
                                    font-size: 0.8rem;
                                    color: #475569;
                                    display: flex;
                                    align-items: flex-start;
                                    gap: 8px;

                                    .text-orange {
                                        color: #ea580c;
                                        font-weight: 600;
                                    }

                                    .full-title {
                                        white-space: normal;
                                        word-wrap: break-word;
                                        line-height: 1.4;
                                    }
                                }
                            }
                        }

                        &:hover {
                            background: #fff7ed;

                            .tooltip-cycle {
                                display: block;
                            }
                        }
                    }

                    svg {
                        opacity: 0.3;
                        transition: transform 0.2s, opacity 0.2s;
                    }
                }
            }

            .unified-radar-list {
                ul {
                    li {
                        .text-truncate {
                            flex: 1;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            margin-right: 0.5rem;
                        }
                    }
                }
            }

            .dynamic-suggestions-container {
                min-height: 200px;
                display: flex;
                flex-direction: column;

                .empty-selection-prompt {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    color: #94a3b8;
                    text-align: center;
                    padding: 2rem;

                    p {
                        font-size: 0.9rem;
                        max-width: 200px;
                    }

                    svg {
                        opacity: 0.2;
                    }
                }
            }

            .tag-cloud {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;

                .hint-tag {
                    padding: 0.5rem 1rem;
                    background: #f8fafc;
                    color: #475569;
                    border: 1px solid transparent;
                    border-radius: 9999px; // Pill shape
                    font-size: 0.85rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;

                    &:hover {
                        background: #f1f5f9;
                        color: #0f172a;
                    }
                }
            }

            .empty-hint {
                font-size: 0.85rem;
                color: #94a3b8;
                font-style: italic;
            }
        }
    }


    /* FORM SECTION */
    .editorial-form-container {
        background: #ffffff;
        border-radius: 24px;
        padding: 2.5rem;
        box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
        border: 1px solid #f1f5f9;

        .co-pilot-form {
            display: flex;
            flex-direction: column;
            gap: 2rem;

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;

                label {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #1e293b;
                }

                .selected-topic-preview {
                    margin-top: 0.5rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    color: #334155;

                    .series-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.4rem;
                        background: #fff7ed;
                        color: #ea580c;
                        padding: 0.25rem 0.75rem;
                        border-radius: 9999px;
                        font-size: 0.8rem;
                        font-weight: 500;
                    }

                    .label {
                        font-weight: 700;
                        color: #0f172a;
                    }
                }

                .smart-select {
                    padding: 1rem 1.25rem;
                    border: 1px solid transparent;
                    border-radius: 12px;
                    font-size: 1rem;
                    background-color: #f8fafc;
                    cursor: pointer;
                    transition: all 0.2s;

                    &:focus {
                        background-color: #ffffff;
                        border-color: #e2e8f0;
                        box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
                        outline: none;
                    }
                }

                input[type="text"],
                textarea {
                    padding: 1rem 1.25rem;
                    border: 1px solid transparent;
                    border-radius: 12px;
                    font-size: 1.05rem;
                    background-color: #f8fafc;
                    transition: all 0.2s ease;
                    color: #0f172a;

                    &::placeholder {
                        color: #94a3b8;
                    }

                    &:focus {
                        outline: none;
                        background-color: #ffffff;
                        border-color: #e2e8f0;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 0 0 4px rgba(249, 115, 22, 0.1);
                    }
                }

                .keyword-selector-wrapper {
                    position: relative;

                    .selected-tags-box {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                        padding: 0.75rem 1rem;
                        border: 1px solid transparent;
                        border-radius: 12px;
                        background-color: #f8fafc;
                        min-height: 56px;
                        cursor: text;
                        transition: all 0.2s ease;

                        &:focus-within {
                            background-color: #ffffff;
                            border-color: #e2e8f0;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 0 0 4px rgba(249, 115, 22, 0.1);
                        }

                        input {
                            border: none;
                            outline: none;
                            background: transparent;
                            padding: 0;
                            margin: 0;
                            min-width: 150px;
                            flex: 1;
                            font-size: 1rem;
                            color: #0f172a;
                        }

                        .tag {
                            background: #f1f5f9;
                            color: #334155;
                            padding: 0.3rem 0.75rem;
                            border-radius: 9999px;
                            font-size: 0.85rem;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            font-weight: 500;

                            svg {
                                cursor: pointer;
                                color: #94a3b8;

                                &:hover {
                                    color: #ef4444;
                                }
                            }
                        }
                    }

                    .keyword-dropdown {
                        position: absolute;
                        top: calc(100% + 8px);
                        left: 0;
                        right: 0;
                        background: white;
                        border: 1px solid #f1f5f9;
                        border-radius: 12px;
                        max-height: 250px;
                        overflow-y: auto;
                        z-index: 100;
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

                        .dropdown-item {
                            padding: 0.85rem 1.25rem;
                            font-size: 0.95rem;
                            cursor: pointer;
                            transition: background 0.2s;
                            color: #334155;

                            &:hover {
                                background: #f8fafc;
                                color: #ea580c;
                            }
                        }

                        .no-results {
                            padding: 1.5rem;
                            color: #94a3b8;
                            text-align: center;
                            font-size: 0.95rem;
                        }
                    }
                }
            }

            .form-toggles {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
                background: #f8fafc;
                padding: 1.5rem;
                border-radius: 16px;
                border: none;

                .switch-label {
                    display: flex;
                    align-items: center;
                    gap: 0.85rem;
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: #475569;
                    cursor: pointer;

                    input {
                        accent-color: #f97316;
                        width: 20px;
                        height: 20px;
                    }

                    svg {
                        color: #94a3b8;
                    }

                    &:hover svg {
                        color: #64748b;
                    }
                }
            }

            .form-actions {
                margin-top: 1rem;

                .btn-generate-draft {
                    width: 100%;
                    padding: 1.2rem;
                    background: #1e293b;
                    color: white;
                    border: none;
                    border-radius: 16px;
                    font-size: 1.15rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:hover {
                        background: #0f172a;
                        transform: translateY(-2px);
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    }

                    &:disabled {
                        background: #cbd5e0;
                        cursor: not-allowed;
                        transform: none;
                        box-shadow: none;
                    }
                }
            }
        }
    }

    .mt-2 {
        margin-top: 0.5rem;
    }

    .flex-1 {
        flex: 1;
    }

    .loading-state,
    .error-state {
        padding: 2rem;
        text-align: center;
        background: #f8fafc;
        border-radius: 12px;
        color: #4a5568;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .error-state {
        color: #e53e3e;
        background: #fff5f5;
        border: 1px solid #feb2b2;
    }
}
```

## File: `src/routes/AdminPanel/analyticsView.scss` <a id="file-src-routes-adminpanel-analyticsview-scss"></a>

```scss
@import "../../styles/variables";

.analytics-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.4s ease-out;

  .analytics-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-size: 1.1rem;
    color: $color-text-secondary;
  }

  .analytics-overview-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.05);

      .stat-icon {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        background: rgba($color-primary, 0.1);
        color: $color-primary;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-info {
        p {
          font-size: 0.85rem;
          color: $color-text-secondary;
          margin-bottom: 4px;
          font-weight: 500;
        }

        h3 {
          font-size: 1.7rem;
          color: $color-text-primary;
          font-family: $font-family-primary;
          font-weight: 700;
          margin: 0;

          &.small-text {
            font-size: 1.1rem;
          }
        }
      }
    }
  }

  .charts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
    }

    .chart-container {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
      border: 1px solid rgba(0, 0, 0, 0.03);

      &.full-width {
        grid-column: 1 / -1;
      }

      h3 {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.15rem;
        color: $color-text-primary;
        margin-top: 0;
        margin-bottom: 8px;
        font-family: $font-family-primary;
      }

      .chart-desc {
        font-size: 0.9rem;
        color: $color-text-secondary;
        margin-bottom: 24px;
      }

      .chart-wrapper {
        width: 100%;

        &.line-chart-wrapper {
          height: 350px;
        }

        &.bar-chart-wrapper {
          height: 300px;
        }

        &.pie-chart-wrapper {
          height: 300px;
        }
      }
    }
  }

  .ip-filtering-section-wrapper {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.03);
    margin-top: 8px;

    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.15rem;
      color: $color-text-primary;
      margin-top: 0;
      margin-bottom: 8px;
      font-family: $font-family-primary;
    }

    .section-desc {
      font-size: 0.9rem;
      color: $color-text-secondary;
      margin-bottom: 24px;
    }

    .ip-controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 24px;

      .ip-box {
        background: $color-bg-light;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.05);

        .ip-box-title {
          font-size: 0.85rem;
          color: $color-text-secondary;
          margin-bottom: 8px;
          margin-top: 0;
        }

        .ip-value {
          display: block;
          font-size: 1.4rem;
          color: $color-text-primary;
          margin-bottom: 16px;
          font-family: monospace;
        }

        .btn-add-ip {
          background: white;
          border: 1px solid $color-primary;
          color: $color-primary;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;

          &:hover {
            background: $color-primary;
            color: white;
          }
        }

        .ip-status-badge {
          display: inline-block;
          background: rgba(#10b981, 0.1);
          color: #10b981;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(#10b981, 0.2);
        }

        .ip-input-group {
          display: flex;
          gap: 12px;

          input {
            flex: 1;
            padding: 10px 14px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            font-size: 0.95rem;
            outline: none;

            &:focus {
              border-color: $color-primary;
            }
          }

          button {
            display: flex;
            align-items: center;
            gap: 6px;
            background: $color-primary;
            color: white;
            border: none;
            padding: 0 16px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: opacity 0.2s;

            &:hover {
              opacity: 0.9;
            }

            &:disabled {
              background: #cbd5e1;
              cursor: not-allowed;
            }
          }
        }
      }
    }

    .ignored-ips-list {
      h4 {
        margin: 0 0 16px 0;
        color: $color-text-primary;
        font-size: 1rem;
      }

      .empty-text {
        color: $color-text-secondary;
        font-style: italic;
        font-size: 0.9rem;
        margin: 0;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: $color-bg-light;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.05);

          span {
            font-family: monospace;
            font-size: 1rem;
            color: $color-text-primary;

            .current-tag {
              font-family: inherit;
              font-size: 0.85rem;
              color: $color-primary;
              margin-left: 8px;
              font-weight: 600;
            }
          }

          .btn-remove {
            background: rgba(#ef4444, 0.1);
            color: #ef4444;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background: #ef4444;
              color: white;
            }
          }
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## File: `src/routes/AggressiveLanding/AggressiveHero/AggressiveHero.jsx` <a id="file-src-routes-aggressivelanding-aggressivehero-aggressivehero-jsx"></a>

```jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./AggressiveHero.scss";

// Icons
import ShieldIcon from '@mui/icons-material/Shield';
import CloudIcon from '@mui/icons-material/Cloud';
import EngineeringIcon from "@mui/icons-material/Engineering";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EventNoteIcon from '@mui/icons-material/EventNote';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PolicyIcon from '@mui/icons-material/Policy';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ArticleIcon from '@mui/icons-material/Article';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import avatarImg from '../../../assets/avatar.jpg';

const AggressiveHero = () => {
    const heroRef = useRef(null);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!consent) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "leads"), {
                name,
                phone,
                city,
                consentType: "Ogólna zgoda na kontakt w celu ofertowym",
                consentGrantedAt: Timestamp.now(),
                source: "AggressiveHero Landing Page"
            });

            navigate("/dziekuje");
        } catch (error) {
            console.error("Błąd podczas zapisywania leada: ", error);
            alert("Wystąpił błąd, spróbuj ponownie.");
            setIsSubmitting(false);
        }
    };

    return (
        <section className="aggressive-hero-section" ref={heroRef}>
            {/* Background pattern */}
            <div className="bg-grid-pattern"></div>

            {/* Background houses top */}
            <div className="bg-houses top-houses">
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-1 logo-watermark" />
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-2 logo-watermark" />
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-3 logo-watermark" />
            </div>

            <div className="container aggressive-hero-container">

                {/* 1. Nagłówek */}
                <h1 className="aggressive-title">
                    POLISA NA DOM<br />
                    TO ZA MAŁO.<br />
                    <span className="text-green">CHROŃ DOROBEK ŻYCIA.</span>
                </h1>

                {/* 2. Process Flow */}
                <div className="process-flow">

                    {/* Krok 1 */}
                    <div className="step-card card-blue">
                        <div className="step-content">
                            <h3>Żywioł Niszczy Twój Dom!</h3>
                            <p>Ogień lub wiatr obracają w popiół dorobek całego życia. Wszystko znika w mgnieniu oka.</p>
                        </div>
                        <div className="step-badge badge-blue">1</div>
                        <div className="step-icon">
                            <CloudIcon style={{ fontSize: '60px', color: '#475569' }} />
                        </div>
                    </div>

                    <div className="flow-arrow">↓</div>

                    {/* Krok 2 */}
                    <div className="step-card card-green">
                        <div className="step-content">
                            <h3>Rzeczoznawca ubezpieczalni bada sprawę</h3>
                            <p>Rzeczoznawca wynajęty przez ubezpieczyciela szuka technicznych zaniedbań, by uniknąć wypłaty.</p>
                        </div>
                        <div className="step-badge badge-green">2</div>
                        <div className="step-icon">
                            <SearchIcon style={{ fontSize: '60px', color: '#334155' }} />
                        </div>
                    </div>

                    <div className="flow-arrow flow-arrow-green">↓</div>

                    {/* Krok 3 */}
                    <div className="step-card card-yellow">
                        <div className="step-content">
                            <h3>Brak OBOWIĄZKOWEGO Protokółu Kontroli 5-letniej</h3>
                            <p>Twoje badania techniczne wygasły lub nie istnieją, unieważniając polisę.</p>
                            <span className="no-stamp">BRAK</span>
                        </div>
                        <div className="step-badge badge-yellow">3</div>
                        <div className="step-icon">
                            <EventNoteIcon style={{ fontSize: '60px', color: '#b45309' }} />
                        </div>
                    </div>

                    <div className="flow-arrow flow-arrow-red">↓</div>

                    {/* Krok 4 */}
                    <div className="step-card card-red">
                        <div className="step-content">
                            <h3>Formalna Odmowa Wypłaty Odszkodowania (0 zł)</h3>
                            <p>Ubezpieczyciel legalnie odmawia wypłaty powołując się na rażące niedbalstwo (brak przeglądu).</p>
                            <svg viewBox="0 0 200 200" className="policy-stamp grunge-stamp">
                                <defs>
                                    <path id="topCurve" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
                                    <path id="bottomCurve" d="M 170,100 A 70,70 0 0,1 30,100" fill="none" />
                                    <filter id="grunge" x="0%" y="0%" width="100%" height="100%">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
                                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -1.5" in="noise" result="coloredNoise" />
                                        <feComposite operator="in" in="SourceGraphic" in2="coloredNoise" result="composite" />
                                    </filter>
                                </defs>
                                <g filter="url(#grunge)">
                                    <circle cx="100" cy="100" r="90" fill="none" stroke="#b91c1c" strokeWidth="8" />
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="#b91c1c" strokeWidth="2" />
                                    <circle cx="100" cy="100" r="45" fill="none" stroke="#b91c1c" strokeWidth="3" />

                                    <text fontFamily="'Courier New', monospace" fontWeight="900" fontSize="20" fill="#b91c1c" letterSpacing="1">
                                        <textPath href="#topCurve" startOffset="50%" textAnchor="middle">DECYZJA OSTATECZNA</textPath>
                                    </text>
                                    <text fontFamily="'Courier New', monospace" fontWeight="900" fontSize="16" fill="#b91c1c" letterSpacing="4">
                                        <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">* 0 ZŁOTYCH *</textPath>
                                    </text>

                                    <text x="100" y="95" fontFamily="'Courier New', monospace" fontWeight="900" fontSize="32" textAnchor="middle" fill="#b91c1c" transform="scale(1, 1.2) translate(0, -15)">ODMOWA</text>
                                    <text x="100" y="125" fontFamily="'Courier New', monospace" fontWeight="900" fontSize="16" textAnchor="middle" fill="#b91c1c">ODSZKODOWANIA</text>
                                </g>
                            </svg>
                        </div>
                        <div className="step-badge badge-red">4</div>
                        {/* <div className="step-icon">
                            <ShieldIcon style={{ fontSize: '60px', color: '#334155' }} />
                        </div> */}
                    </div>

                </div>

                {/* 3. Bottom Grid: Services & Form */}
                <div className="bottom-split-section">

                    {/* Left: Services */}
                    <div className="services-panel">
                        <h3>Kompleksowy Przegląd 5-Letni na Śląsku (Budowlany + Elektryczny + Gazowy)   </h3>
                        <p className="subtitle">Jeden audyt = Komplet dokumentów. 100% pewności przed ubezpieczycielem i Nadzorem Budowlanym.</p>

                        <ul className="services-list">
                            <li>
                                <GppGoodIcon className="list-icon" />
                                <span>Otrzymujesz rzetelny protokół, którego nie podważy żaden rzeczoznawca w przypadku zgłoszenia szkody.</span>
                            </li>
                            <li>
                                <HomeWorkIcon className="list-icon" />
                                <span>Fachowa ocena dachu, fundamentów i ścian. Wykrywamy usterki, zanim zamienią się w kosztowną awarię.</span>
                            </li>
                            <li>
                                <ArticleIcon className="list-icon" />
                                <span>Przygotowujemy wymagane prawem dokumenty oraz dokonujemy wpisu do Książki Obiektu Budowlanego (KOB).</span>
                            </li>
                            <li>
                                <ContentPasteGoIcon className="list-icon" />
                                <span>Zgodnie z wymogami polskiego prawabadamy instalację elektryczną  i gazu.</span>
                            </li>
                            <li>
                                <EngineeringIcon className="list-icon" />
                                <span>Eliminujemy ryzyko porażenia prądem czy pożaru. Ty śpisz spokojnie przez kolejne 5 lat.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right: Form */}
                    <div className="form-panel action-form-section">
                        <form className="simple-quote-form" onSubmit={handleFormSubmit}>
                            <h3 className="form-header">Otrzymaj darmową wycenę przeglądu</h3>

                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Imię"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="tel"
                                    placeholder="Numer telefonu"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Miejscowość"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="input-group text-area-group">
                                <textarea
                                    placeholder="Wiadomość (opcjonalnie)"
                                    rows="3"
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>

                            <label className="rodo-checkbox">
                                <input
                                    type="checkbox"
                                    required
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    disabled={isSubmitting}
                                />
                                <span>
                                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przedstawienia oferty. Wiem, że mogę tę zgodę cofnąć w każdej chwili.
                                </span>
                            </label>

                            <button type="submit" className="green-btn" disabled={isSubmitting}>
                                ODBIERZ DARMOWĄ WYCENĘ
                            </button>
                        </form>
                    </div>

                </div>

                {/* 4. Engineer Biz Card */}
                <div className="engineer-card">
                    <img src={avatarImg} alt="Inżynier Przemysław Rakotny" className="avatar" />
                    <div className="info">
                        <h4>mgr inż. Przemysław Rakotny</h4>
                        <span className="badge">
                            <VerifiedUserIcon fontSize="small" /> Uprawniony Inżynier Budownictwa
                        </span>
                        <p>Gwarancja rzetelnego raportu do Ubezpieczalni.</p>
                    </div>
                </div>

            </div>

            {/* Background houses bottom */}
            <div className="bg-houses bottom-houses">
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-1 logo-watermark" />
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-2 logo-watermark" />
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-3 logo-watermark" />
            </div>

        </section>
    );
};

export default AggressiveHero;
```

## File: `src/routes/AggressiveLanding/AggressiveHero/AggressiveHero.scss` <a id="file-src-routes-aggressivelanding-aggressivehero-aggressivehero-scss"></a>

```scss
@import "../../../styles/variables";

.aggressive-hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding: 10rem 1rem 4rem; // Zwiększony górny padding z 6rem na 10rem dla przestrzeni pod przywróconym Menu
    background-color: #f0fdf4; // Very light pastel green base
    background-image:
        linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
    font-family: $font-primary;
    color: #1f2937;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    .bg-houses {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-around;
        opacity: 0.1;
        z-index: 0;

        img.logo-watermark {
            width: 300px;
            height: auto;
            object-fit: contain;
            position: absolute;
            color: $color-anthracite;
            opacity: 0.8;
            filter: grayscale(100%) brightness(5) drop-shadow(0 0 20px rgba(0, 0, 0, 0.1));

            &.house-1 {
                top: 0px;
                left: -5%;
                transform: rotate(-15deg);
                width: 350px;
            }

            &.house-2 {
                top: 50px;
                right: 10%;
                transform: rotate(10deg);
                width: 250px;
            }

            &.house-3 {
                top: 200px;
                left: 20%;
                transform: rotate(5deg);
                width: 200px;
                opacity: 0.5;
            }
        }

        &.top-houses {
            top: 50px;
        }

        &.bottom-houses {
            bottom: 10px;
        }
    }

    .aggressive-hero-container {
        position: relative;
        z-index: 2;
        max-width: 800px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.5rem;

        .aggressive-title {
            text-align: center;
            font-family: $font-primary;
            font-size: clamp(4rem, 5vw, 4rem);
            font-weight: 900;
            line-height: 1.1;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: -0.5px;
            color: #111827;

            .text-green {
                color: #166534;
                display: block;
                margin-top: 5px;
            }
        }

        .process-flow {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 500px;
            gap: 0;

            .step-card {
                position: relative;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1.5rem;
                border: 2px solid #334155;
                border-radius: 12px;
                background-color: #fff;
                box-shadow: 4px 4px 0 #334155;
                margin: 0.5rem 0;

                &.card-blue {
                    background-color: #e0f2fe;
                }

                &.card-green {
                    background-color: #dcfce7;
                }

                &.card-yellow {
                    background-color: #fef3c7;
                }

                &.card-red {
                    background-color: #ffe4e6;
                }

                .step-content {
                    flex: 1;
                    padding-right: 1.5rem;

                    h3 {
                        font-family: $font-primary;
                        font-weight: 800;
                        font-size: 1.1rem;
                        margin: 0 0 0.5rem 0;
                        color: #0f172a;
                    }

                    p {
                        font-family: $font-secondary;
                        font-size: 0.85rem;
                        margin: 0;
                        color: #334155;
                        line-height: 1.3;
                    }

                    .no-stamp {
                        display: inline-block;
                        margin-top: 10px;
                        border: 3px solid #b91c1c;
                        color: #b91c1c;
                        font-weight: 900;
                        font-size: 1.6rem;
                        padding: 2px 8px;
                        transform: rotate(-15deg);
                        border-radius: 4px;
                        letter-spacing: 1px;
                    }

                    .policy-stamp {
                        position: absolute;
                        bottom: 10px;
                        left: 20px;
                        color: #b91c1c; // Zmiana z łagodnego czerwonego na mocny, krwisty z palety Tailwind (red-700)
                        opacity: 0.9; // Zwiększona widoczność
                        transform: rotate(-10deg);

                        &.grunge-stamp {
                            position: absolute;
                            bottom: -15px;
                            right: 15px; // Przeniesienie na prawo dla naturalnego układu urzędowego stempla
                            left: auto;
                            width: 150px;
                            height: 150px;
                            transform: rotate(-15deg);
                            pointer-events: none; // Zapobiega zasłanianiu całej karty przez box SVG
                            mix-blend-mode: multiply; // KRYTYCZNE: Efekt wtapiania "tuszu" w tło pod spodem
                            filter: drop-shadow(0 0 5px rgba(185, 28, 28, 0.2));
                        }
                    }
                }

                .step-badge {
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translate(-50%, 0);
                    /* Środek karty */
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 900;
                    color: white;
                    border: 2px solid #334155;
                    font-size: 1rem;
                    z-index: 3;

                    &.badge-blue {
                        background-color: #0369a1;
                    }

                    &.badge-green {
                        background-color: #16a34a;
                    }

                    &.badge-yellow {
                        background-color: #b45309;
                    }

                    &.badge-red {
                        background-color: #b91c1c;
                    }
                }

                .step-icon {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.9;
                }
            }

            .flow-arrow {
                height: 30px;
                width: 2px;
                background-color: #334155;
                position: relative;
                color: transparent; // chowa symbol strzalki w kodzie

                &::after {
                    content: "↓";
                    position: absolute;
                    bottom: -10px;
                    left: -6px;
                    color: #334155;
                    font-weight: 900;
                    font-size: 1.2rem;
                }

                &.flow-arrow-green {
                    background-color: #16a34a;

                    &::after {
                        color: #16a34a;
                    }
                }

                &.flow-arrow-red {
                    background-color: #b91c1c;

                    &::after {
                        color: #b91c1c;
                    }
                }
            }
        }

        .bottom-split-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            width: 100%;
            margin-top: 1rem;

            @media (max-width: 768px) {
                grid-template-columns: 1fr;
            }

            .services-panel {
                background: #fff;
                border: 2px solid #334155;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 4px 4px 0 #334155;

                h3 {
                    font-family: $font-primary;
                    font-weight: 800;
                    font-size: 1.1rem;
                    margin-top: 0;
                    margin-bottom: 0.5rem;
                }

                .subtitle {
                    font-size: 0.8rem;
                    color: #64748b;
                    margin-bottom: 1.5rem;
                }

                .services-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;

                    li {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 0.85rem;
                        font-weight: 600;
                        color: #334155;

                        .list-icon {
                            color: #64748b;
                            font-size: 1.2rem;
                        }
                    }
                }
            }

            .form-panel {
                background: #fff;
                border: 2px solid #334155;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 4px 4px 0 #334155;

                .form-header {
                    font-family: $font-primary;
                    font-weight: 800;
                    font-size: 1.1rem;
                    margin-top: 0;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .input-group {
                    margin-bottom: 15px;

                    input,
                    textarea {
                        width: 100%;
                        padding: 0.8rem 1rem;
                        border: 2px solid #cbd5e1;
                        border-radius: 6px;
                        font-family: $font-secondary;
                        font-size: 0.9rem;
                        outline: none;
                        transition: border-color 0.2s;

                        &:focus {
                            border-color: #16a34a;
                        }

                        &::placeholder {
                            color: #94a3b8;
                        }
                    }
                }

                .rodo-checkbox {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    margin-bottom: 15px;
                    cursor: pointer;

                    input[type="checkbox"] {
                        margin-top: 4px;
                        accent-color: #16a34a;
                    }

                    span {
                        font-size: 0.7rem;
                        color: #64748b;
                        line-height: 1.3;
                    }
                }

                .green-btn {
                    width: 100%;
                    background-color: #166534;
                    color: white;
                    border: none;
                    padding: 1rem;
                    border-radius: 8px;
                    font-family: $font-primary;
                    font-weight: 800;
                    font-size: 1rem;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 10px rgba(22, 101, 52, 0.3);

                    &:hover:not(:disabled) {
                        background-color: #14532d;
                        transform: translateY(-2px);
                    }

                    &:active:not(:disabled) {
                        transform: translateY(0);
                    }

                    &:disabled {
                        opacity: 0.7;
                        cursor: not-allowed;
                    }
                }
            }
        }

        .engineer-card {
            background: #fff;
            border: 2px solid #e2e8f0; // Subtle border
            border-radius: 12px;
            padding: 1.5rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

            @media (max-width: 500px) {
                flex-direction: column;
                text-align: center;
            }

            .avatar {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #166534;
            }

            .info {
                h4 {
                    margin: 0 0 0.25rem 0;
                    font-family: $font-primary;
                    font-weight: 800;
                    font-size: 1.2rem;
                    color: #0f172a;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    color: #16a34a;
                    font-weight: 700;
                    font-size: 0.85rem;
                    margin-bottom: 0.5rem;
                }

                p {
                    margin: 0;
                    font-size: 0.85rem;
                    color: #475569;
                    font-family: $font-secondary;
                }
            }
        }
    }
}
```

## File: `src/routes/AggressiveLanding/AggressiveLanding.jsx` <a id="file-src-routes-aggressivelanding-aggressivelanding-jsx"></a>

```jsx
import React, { useEffect } from "react";
import "./AggressiveLanding.scss";
import { Helmet } from "react-helmet-async";
import AggressiveHero from "./AggressiveHero/AggressiveHero";
import InspectionsTimeline from "../../components/InspectionsTimeline/InspectionsTimeline";
import InspectionForm from "../../sections/inspectionsForm/InspectionForm"; // <--- Zaktualizowany path
import CityListBanner from "../../sections/CityListBanner/CityListBanner";
import Faq from "../../sections/faq/Faq"; // <--- Zaktualizowana wielkość liter
import StickyOrderBar from "../../components/StickyOrderBar/StickyOrderBar";

const AggressiveLanding = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="aggressive-landing-page">
            <Helmet>
                <title>Zagrożenie Kary PINB i Odmowa Z OC | Przegląd Techniczny</title>
                <meta
                    name="description"
                    content="Brak ważnego przeglądu budynku to podstawa do odrzucenia odszkodowania po pożarze i kary od PINB. Zabezpiecz swój majątek już teraz."
                />
                <meta name="robots" content="noindex, nofollow" /> {/* Landingi typowo adsowe można ukryć przed SEO bazowym */}
            </Helmet>

            {/* 1. Nowy agresywny "Hook" sprzedażowy */}
            <AggressiveHero />

            {/* 2. Przebieg procesu (budowanie zaufania po mocnym uderzeniu) */}
            <div className="section-divider">
                <InspectionsTimeline />
            </div>

            {/* 3. Formularz docelowy (Action) */}
            <div id="inspection-form" className="section-divider bg-light">
                <InspectionForm />
            </div>

            {/* 4. Dowód działalności lokalnej (Trust) */}
            {/* <div className="section-divider">
                <CityListBanner />
            </div> */}

            {/* 5. Rozwiewanie obiekcji */}
            <div className="section-divider bg-light pb-large">
                <Faq />
            </div>

            {/* 6. Pływający pasek zamówienia dla konwersji scrollujących */}
            <StickyOrderBar />
        </div>
    );
};

export default AggressiveLanding;
```

## File: `src/routes/AggressiveLanding/AggressiveLanding.scss` <a id="file-src-routes-aggressivelanding-aggressivelanding-scss"></a>

```scss
.aggressive-landing-page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    .section-divider {
        padding: 4rem 0;
        width: 100%;

        &.bg-light {
            background-color: #f9fafb;
        }

        &.pb-large {
            padding-bottom: 8rem; // Miejsce na Sticky Order Bar
        }
    }
}
```

## File: `src/routes/BlogDB/BlogDB.jsx` <a id="file-src-routes-blogdb-blogdb-jsx"></a>

```jsx
// Aktualizacja pliku BlogDB.jsx na Firebase
import React, { useEffect, useMemo, useState } from "react";
import "./blogDB.scss";
import BlogPostDB from "../../components/BlogPostDB/BlogPostDB";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import deburr from "lodash/deburr";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CachedIcon from '@mui/icons-material/Cached'; // For spinner

// Helper to preload an array of image URLs
const preloadImages = (srcArray) => {
  const promises = srcArray.map((src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = resolve; // Resolve even on error to not block everything
    });
  });

  // Adding a timeout so we don't wait forever if a server is very slow
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 8000));

  return Promise.race([Promise.all(promises), timeoutPromise]);
};

export default function BlogDB() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get priority category from URL (e.g., ?cat=elektryka)
  const priorityCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("cat");
  }, [location.search]);

  const createSlug = (title) =>
    deburr(title)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, "")
      .replace(/\s+/g, "-");

  // Fetch posts from Firebase & Preload Images
  useEffect(() => {
    const fetchDataAndImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);

        // Preload images
        const imageUrls = postsArray
          .map(p => p.src || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600")
          .filter(Boolean); // Filter out empty just in case

        if (imageUrls.length > 0) {
          await preloadImages(imageUrls);
        }

      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setImagesLoaded(true); // Always reveal content, even if error
      }
    };
    fetchDataAndImages();
  }, []);

  const openPost = (post) => {
    navigate(`/blogDB/${createSlug(post.title)}`);
  };

  // Categories logic
  const uniqueCategories = useMemo(() => {
    const all = posts.flatMap(p => p.categories || []);
    return ["Wszystkie", ...new Set(all)];
  }, [posts]);

  // Filter and Sort
  const filteredPosts = useMemo(() => {
    let result = posts;
    if (selectedCategory !== "Wszystkie") {
      result = posts.filter(p => p.categories?.includes(selectedCategory));
    }

    return [...result].sort((a, b) => {
      // 1. Priority by category from URL (only if viewing "Wszystkie")
      if (selectedCategory === "Wszystkie" && priorityCategory) {
        const aHasPriority = a.categories?.includes(priorityCategory);
        const bHasPriority = b.categories?.includes(priorityCategory);
        if (aHasPriority && !bHasPriority) return -1;
        if (!aHasPriority && bHasPriority) return 1;
      }

      // 2. Default: Sort by date
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      return dateB - dateA;
    });
  }, [selectedCategory, posts, priorityCategory]);

  // Hero Post (First valid one)
  const validHeroIndex = filteredPosts.findIndex(p => p.src && p.title && p.content);
  const heroPost = validHeroIndex !== -1 ? filteredPosts[validHeroIndex] : null;

  // Grid Posts (Everything else, excluding the hero)
  const gridPosts = filteredPosts.filter((_, index) => index !== validHeroIndex);

  return (
    <div className="blog-db-container">
      <Helmet>
        <title>Przeglądy Techniczne Nieruchomości – Wiedza i Porady | Inżynier Przemysław Rakotny</title>
        <meta name="description" content="Ekspercka baza wiedzy o przeglądach technicznych nieruchomości. Poznaj przepisy, dowiedz się jak dbać o budynek i przygotuj się do kontroli technicznej na Śląsku." />
        <link rel="canonical" href="https://przeglady-domu.com/blogDB" />
      </Helmet>

      {/* SEO H1 - Hidden or subtly integrated if not visual */}
      <h1 className="visually-hidden">Przeglądy Techniczne Nieruchomości - Baza Wiedzy</h1>

      {/* Breadcrumbs */}
      <nav className="blog-breadcrumbs">
        <Link to="/">Strona Główna</Link>
        <span className="separator">/</span>
        <span className="current">Poradniki</span>
      </nav>

      {/* Category Filter Bar */}
      <div className="category-filter-bar">
        <div className="filter-scroll">
          {uniqueCategories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {!imagesLoaded ? (
        <div className="blog-preloader">
          <CachedIcon className="spinner-icon" />
          <p>Przygotowujemy artykuły...</p>
        </div>
      ) : (
        <div className="blog-content">
          {/* Hero Section */}
          {heroPost && (
            <section className="hero-post-section" onClick={() => openPost(heroPost)}>
              <div className="hero-image-wrapper">
                <img
                  src={heroPost.src || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"}
                  alt={heroPost.title}
                />
                <div className="hero-overlay">
                  <div className="hero-content-blog">
                    <div className="hero-tags">
                      {heroPost.categories?.map(c => <span key={c} className="tag">{c}</span>)}
                    </div>
                    <h1>{heroPost.title}</h1>
                    <p>{heroPost.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 200)}...</p>
                    <button className="read-more-btn">
                      Czytaj dalej <ArrowForwardIcon />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Grid Section */}
          <section className="posts-grid">
            {gridPosts.map((post) => (
              <div key={post.id} className="grid-post-card" onClick={() => openPost(post)}>
                <div className="card-image">
                  <img
                    src={post.src || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600"}
                    alt={post.title}
                    loading="lazy"
                  />
                  <div className="card-tags">
                    {post.categories?.slice(0, 2).map(c => <span key={c} className="mini-tag">{c}</span>)}
                  </div>
                </div>
                <div className="card-content">
                  <h3>{post.title}</h3>
                  <p>{post.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 100)}...</p>
                  <span className="read-link">Czytaj więcej</span>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
```

## File: `src/routes/BlogDB/blogDB.scss` <a id="file-src-routes-blogdb-blogdb-scss"></a>

```scss
@import "../../styles/variables";

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.blog-db-container {
  background-color: $color-background;
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 80px;

  .blog-breadcrumbs {
    max-width: 1400px;
    margin: 0 auto 20px auto;
    padding: 0 40px;
    font-family: $font-secondary;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.5);

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: $color-primary;
      }
    }

    .separator {
      margin: 0 10px;
      opacity: 0.5;
    }

    .current {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
    }

    @media (max-width: 768px) {
      padding: 0 20px;
      font-size: 0.85rem;
    }
  }

  .category-filter-bar {
    background: rgba($color-background, 0.95);
    backdrop-filter: blur(10px);
    z-index: 99;
    padding: 20px 0;
    margin-bottom: 40px; // Więcej "oddechu" od dołu
    // border-bottom: 1px solid rgba(0,0,0,0.05);

    .filter-scroll {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      .filter-btn {
        padding: 8px 16px;
        border-radius: 20px;
        border: 1px solid rgba($color-primary, 0.2);
        background: transparent;
        color: $color-text-secondary;
        font-family: $font-family-primary;
        font-size: 14px;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.2s;

        &:hover,
        &.active {
          background: $color-primary;
          color: white;
          border-color: $color-primary;
        }
      }
    }
  }

  .blog-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  // Hero Section
  .hero-post-section {
    cursor: pointer;
    margin-bottom: 60px;

    .hero-image-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

      img {
        width: 100%;
        height: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .hero-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
        padding: 40px;
        color: white;

        @media (max-width: 768px) {
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .hero-content-blog {
          max-width: 800px;

          .hero-tags {
            margin-bottom: 15px;

            .tag {
              background: $color-accent;
              color: $color-text-primary;
              padding: 4px 12px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 700;
              margin-right: 10px;
              text-transform: uppercase;
            }
          }

          h1 {
            font-size: 3rem;
            margin-bottom: 15px;
            font-family: $font-family-primary;
            line-height: 1.1;

            @media (max-width: 768px) {
              font-size: 1.25rem;
              margin-bottom: 8px;
            }
          }

          p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: 20px;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;

            @media (max-width: 768px) {
              font-size: 0.9rem;
              margin-bottom: 10px;
              -webkit-line-clamp: 2;
            }

            @media (max-width: 480px) {
              display: none; // Hide description on very small mobiles to save space
            }
          }

          .read-more-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 24px;
            background: white;
            color: $color-text-primary;
            border: none;
            border-radius: 30px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
            }
          }
        }
      }

      &:hover img {
        transform: scale(1.05);
      }
    }
  }

  // Grid Section
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    .grid-post-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }

      .card-image {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .card-tags {
          position: absolute;
          top: 15px;
          left: 15px;
          display: flex;
          gap: 8px;

          .mini-tag {
            background: rgba(255, 255, 255, 0.9);
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 700;
            color: $color-text-primary;
            text-transform: uppercase;
          }
        }
      }

      .card-content {
        padding: 24px;
        flex: 1;
        display: flex;
        flex-direction: column;

        h3 {
          font-size: 1.25rem;
          margin-bottom: 12px;
          color: $color-text-primary;
          line-height: 1.4;
          font-family: $font-family-primary;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        p {
          font-size: 0.95rem;
          color: $color-text-secondary;
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .read-link {
          font-weight: 600;
          color: $color-primary;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }

      &:hover .card-image img {
        transform: scale(1.05);
      }
    }
  }

  // Preloader Section
  .blog-preloader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    width: 100%;

    .spinner-icon {
      font-size: 3rem;
      color: $color-primary;
      animation: spin 1.5s linear infinite;
      margin-bottom: 16px;
    }

    p {
      color: $color-text-secondary;
      font-family: $font-family-primary;
      font-size: 1.1rem;
    }

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
```

## File: `src/routes/CityLandingPage/CityLandingPage.jsx` <a id="file-src-routes-citylandingpage-citylandingpage-jsx"></a>

```jsx
import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { citiesData } from '../../helpers/citiesData';
import { useAuth } from '../../contexts/AuthContext';
import CitySchema from '../../components/SEO/CitySchema';

// Importy Twoich sekcji
import Main from "../../sections/main/Main";
import LocalContext from "../../sections/LocalContext/LocalContext";
import InspectionForm from "../../sections/inspectionsForm/InspectionForm";
import Footer from "../../sections/footer/Footer";
import Scope from "../../sections/scope/Scope";
import WhyImportant from "../../sections/WhyImportant/WhyImportant";
import CtaBanner from "../../sections/ctabanner/CtaBanner";
import Faq from "../../sections/faq/Faq";
import InspectionsTimeline from "../../components/InspectionsTimeline/InspectionsTimeline";
import GoldHand from "../../sections/goldHand/GoldHand";

const CityLandingPage = () => {
  const { currentUser: user } = useAuth();
  const location = useLocation();

  // 1. Wyciągamy slug ręcznie z URL-a
  const citySlug = location.pathname.replace('/przeglad-budowlany-', '').replace('/', '');

  // 2. Szukamy danych miasta
  const cityData = citiesData.find(c => c.slug === citySlug);

  // 3. Scroll to top przy zmianie miasta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [citySlug]);

  // 4. Jeśli ktoś wpisał błędny URL (miasto spoza bazy), przekieruj na Home
  if (!cityData) {
    return <Navigate to="/" replace />;
  }

  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pageTitle = cityData.seoTitle || `Przeglądy Budowlane ${cityData.name} - Inżynier z Uprawnieniami`;
  const pageDesc = cityData.seoDescription || `Profesjonalne okresowe przeglądy budowlane w mieście ${cityData.name} i na Śląsku. Roczne, 5-letnie, kontrole gazowe i elektryczne.`;
  const pageUrl = `https://przeglady-domu.com/przeglad-budowlany-${citySlug}`;

  // 5. Renderowanie
  return (
    <div className="city-landing-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Przeglądy Techniczne Nieruchomości" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://przeglady-domu.com/images/v2/hh_desktop6.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
      </Helmet>

      <CitySchema cityData={cityData} />

      <Main customCity={cityData.name} user={user} />

      <LocalContext
        city={cityData.name}
        description={cityData.localDescription}
        risks={cityData.risks}
      />

      <Scope user={user} />

      <InspectionForm />

      <CtaBanner />

      <WhyImportant />

      <InspectionsTimeline
        user={user}
        onOrderClick={scrollToInspectionForm}
      />

      {(citySlug === "gliwice" || citySlug === "zabrze") && <GoldHand />}

      <Faq />

      <Footer />
    </div>
  );
};

export default CityLandingPage;
```

## File: `src/routes/FormLanding/FormLanding.jsx` <a id="file-src-routes-formlanding-formlanding-jsx"></a>

```jsx
import React from "react";
import InspectionForm from "../../sections/inspectionsForm/InspectionForm";

export default function FormLanding({ user }) {
  return (
    <div className="form-landing-page">
      <InspectionForm user={user} />
    </div>
  );
}
```

## File: `src/routes/FormLanding/formLanding.scss` <a id="file-src-routes-formlanding-formlanding-scss"></a>

```scss

```

## File: `src/routes/Home/Home.jsx` <a id="file-src-routes-home-home-jsx"></a>

```jsx
import React, { useEffect, useState } from "react";
import "./home.scss";
import Main from "../../sections/main/Main";
import GoldHand from "../../sections/goldHand/GoldHand";
import Faq from "../../sections/faq/Faq";
import Footer from "../../sections/footer/Footer";
import InspectionFormSlide from "../../sections/inspectionsForm/InspectionForm";
import { useLocation } from "react-router-dom";
import Scope from "../../sections/scope/Scope";
import CtaBanner from "../../sections/ctabanner/CtaBanner";
import WhyImportant from "../../sections/WhyImportant/WhyImportant";
import CityListBanner from "../../sections/CityListBanner/CityListBanner";
import Process from "../../sections/process/Process";
import InspectionsTimeline from "../../components/InspectionsTimeline/InspectionsTimeline";
import HeroParallaxWrapper from "../../components/HeroParallaxWrapper/HeroParallaxWrapper";
import { useSectionTracker } from "../../utils/analytics";
import CachedIcon from '@mui/icons-material/Cached'; // Stylized loading spinner
import { Helmet } from "react-helmet-async";
import LocalBusinessSchema from "../../components/SEO/LocalBusinessSchema";
import StickyOrderBar from "../../components/StickyOrderBar/StickyOrderBar";

// Helper to preload a single critical image
const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = resolve; // Resolve even on error so we don't break the page
  });
};

export default function Home({ user }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  // Analityka - Śledzenie czasu na sekcjach
  const heroRef = useSectionTracker("hero_section");
  const scopeRef = useSectionTracker("scope_section");
  const importantRef = useSectionTracker("why_important_section");
  const formRef = useSectionTracker("inspection_form_section");
  const timelineRef = useSectionTracker("timeline_section");
  const faqRef = useSectionTracker("faq_section");

  const location = useLocation();

  // Hero Image Preloader
  useEffect(() => {
    const loadHeroContent = async () => {
      // Obraz tła zdefiniowany w main.scss (.hero-bg-image) to:
      // ../../../public/images/v2/hh_desktop6.png -> /images/v2/hh_desktop6.png jako public root URL.
      const heroImageUrl = "/images/v2/hh_desktop6.png";

      try {
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 8000));
        await Promise.race([preloadImage(heroImageUrl), timeoutPromise]);
      } catch (error) {
        console.error("Failed to preload hero image:", error);
      } finally {
        setIsHeroLoaded(true);
      }
    };

    loadHeroContent();
  }, []);

  useEffect(() => {
    // Only attempt scrolling after hero is loaded so layout is complete
    if (isHeroLoaded) {
      if (location.hash) {
        // Small delay to allow layout to stabilize
        setTimeout(() => {
          const id = location.hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 800);
      } else if (!location.state?.scrollTo) {
        window.scrollTo(0, 0);
      }
    }
  }, [location.hash, isHeroLoaded]);

  useEffect(() => {
    if (isHeroLoaded) {
      const scrollToId = location.state?.scrollTo;
      if (scrollToId) {
        const el = document.getElementById(scrollToId);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
        }
      }
    }
  }, [location.state, isHeroLoaded]);

  // Usuwamy lokalny stan user, bo dostajemy go z props (App.js)

  // Blokowanie przewijania, gdy panel jest otwarty
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Przywróć przewijanie przy odmontowaniu
    };
  }, [isPanelOpen]);

  return (
    <div className="home">
      {!isHeroLoaded && (
        <div className="home-preloader-overlay" aria-hidden="true">
          <CachedIcon className="spinner-icon" />
          <p>Inicjowanie aplikacji...</p>
        </div>
      )}

      <Helmet>
        <title>Przeglądy Techniczne Nieruchomości Gliwice & Śląsk | Inżynier Przemysław Rakotny</title>
        <meta name="description" content="Profesjonalne przeglądy techniczne nieruchomości w Gliwicach i na Śląsku. Przeglądy budowlane, gazowe, elektryczne i wentylacyjne. Zamów rzetelną kontrolę budynku już teraz!" />
        <link rel="canonical" href="https://przeglady-domu.com/" />
        <meta property="og:title" content="Przeglądy Techniczne Nieruchomości Gliwice & Śląsk" />
        <meta property="og:description" content="Skorzystaj z usług inżyniera. Wykonujemy pełny zakres przeglądów technicznych nieruchomości na Śląsku. Szybkie terminy i rzetelne protokoły." />
        <meta property="og:url" content="https://przeglady-domu.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <LocalBusinessSchema />

      {/* SEKCJA 1 i 2 połączone efektem Parallax */}
      <div ref={heroRef}>
        <HeroParallaxWrapper>
          <Main
            user={user}
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
          />
          <CityListBanner />
        </HeroParallaxWrapper>
      </div>

      <div ref={scopeRef}>
        <Scope user={user} />
      </div>

      <CtaBanner />

      <div ref={importantRef}>
        <WhyImportant />
      </div>

      <div ref={formRef}>
        <InspectionFormSlide />
      </div>

      <div ref={timelineRef}>
        <InspectionsTimeline />
        <Process />
      </div>

      <GoldHand />

      <div ref={faqRef}>
        <Faq />
      </div>

      <Footer />
      <StickyOrderBar />
    </div>
  );
}
```

## File: `src/routes/Home/home.scss` <a id="file-src-routes-home-home-scss"></a>

```scss
.home {
  // position: relative;
  width: 100%;


}

// Preloader Section
.home-preloader,
.home-preloader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
  pointer-events: auto;

  .spinner-icon {
    font-size: 3rem;
    color: #f97316;
    animation: spin 1.5s linear infinite;
    margin-bottom: 16px;
  }

  p {
    color: #555555;
    font-family: sans-serif;
    font-size: 1.1rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
}
```

## File: `src/routes/Landingi/PrzewodnikOcena/MainText/MainText.jsx` <a id="file-src-routes-landingi-przewodnikocena-maintext-maintext-jsx"></a>

```jsx
import React from "react";

const MainText = ({ content }) => {
  return (
    <div className="main-text">
      {content.map((element, index) => {
        if (element.type === "h2") {
          // Znajdź odpowiadający element "ul" dla tego "h2"
          const nextUl = content[index + 1];
          if (nextUl && nextUl.type === "ul") {
            return (
              <div className="grupa" key={index}>
                <h2>{element.content}</h2>
                <ul>
                  {nextUl.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          } else {
            return (
              <div className="grupa" key={index}>
                <h2>{element.content}</h2>
              </div>
            );
          }
        }
        return null; // Pomijamy "ul", bo obsługujemy je wewnątrz "h2"
      })}
    </div>
  );
};

export default MainText;
```

## File: `src/routes/Landingi/PrzewodnikOcena/PrzewodnikOcena.jsx` <a id="file-src-routes-landingi-przewodnikocena-przewodnikocena-jsx"></a>

```jsx
import React, { useEffect, useState } from "react";
import "./przewodnikOcena.scss";
import { Parallax } from "react-parallax";
import "intersection-observer";
import MainText from "./MainText/MainText";
import Menu from "../../../components/Menu/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";


export default function PrzewodnikOcena() {
  const [visibleTextIndexes, setVisibleTextIndexes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleTextIndexes((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.4 } // Wyzwalaj, gdy 20% elementu jest widoczne
    );

    const elements = document.querySelectorAll(".text-item");
    if (elements.length > 0) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect(); // Sprzątanie po odmontowaniu
  }, [visibleTextIndexes]);

  //   useEffect(() => {
  //     const updateScale = () => {
  //       const bgImage = document.querySelector(".react-parallax-bgimage");
  //       if (bgImage) {
  //         const currentTransform = bgImage.style.transform || "";
  //         if (!currentTransform.includes("scale")) {
  //           bgImage.style.transform = `${currentTransform} scale(1)`.trim();

  //         }
  //       }
  //     };

  //     // Wywołaj na początku
  //     updateScale();

  //     // Ustaw nasłuchiwanie, aby w razie potrzeby aktualizować
  //     const observer = new MutationObserver(updateScale);
  //     const bgImage = document.querySelector(".react-parallax-bgimage");
  //     if (bgImage) {
  //       observer.observe(bgImage, {
  //         attributes: true,
  //         attributeFilter: ["style"],
  //       });
  //     }

  //     return () => observer.disconnect();
  //   }, []);

  const handleButtonClick = () => {
    window.location.href = "/#inspection-form";
  };

  const sectionsData = [
    {
      id: 1,
      bgColor: "#E8E2C5",
      bgImage: "/images/pdfs/background03_scale2.png",
      pgnr: "1",
      szyld: (
        <>
          Elewacja <br />
          <span className="szyld-bold">& fundamenty</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Pęknięcia w ścianach lub fundamentach.",
            "Odpadający tynk, zacieki, wykwity solne na powierzchni ścian.",
            "Oznaki wilgoci w dolnej części budynku.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Zwróć uwagę na wielkość i kierunek pęknięć. Pęknięcia pionowe mogą być mniej groźne niż ukośne, które mogą wskazywać na osiadanie fundamentów.",
            "Sprawdź, czy woda opadowa jest skutecznie odprowadzana, np. przez rynny i drenaż.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Jeśli zauważysz poważne pęknięcia lub wilgoć, skontaktuj się z ekspertem budowlanym.",
          ],
        },
      ],
      ciekawostka:
        "Czy wiesz, że największe szkody fundamentów powoduje zamarzająca woda? Regularne sprawdzanie drenażu może zapobiec problemom.",
    },
    {
      id: 2,
      bgColor: "#F2E8CE",
      bgImage: "/images/pdfs/background04_scale.png",
      pgnr: "2",
      szyld: "Dach",
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Uszkodzone, brakujące lub przesunięte dachówki.",
            "Zacieki na poddaszu, szczególnie po intensywnych opadach.",
            "Korozja na elementach metalowych (np. rynnach, okuciach).",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Dokładnie obejrzyj dach z zewnątrz za pomocą lornetki lub drona.",
            "Sprawdź stan pokrycia dachowego i szczelność połączeń wokół kominów i okien dachowych.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Uszkodzone elementy powinny zostać jak najszybciej naprawione, aby zapobiec przeciekom.",
          ],
        },
      ],
      ciekawostka:
        "Tradycyjne dachówki ceramiczne mogą wytrzymać nawet 100 lat, pod warunkiem regularnej konserwacji.",
    },
    {
      id: 3,
      bgColor: "#E8F0F2",
      bgImage: "/images/pdfs/background05_scale.png",
      pgnr: "3",
      szyld: (
        <>
          Instalacje <br />
          <span className="szyld-bold">gazowe</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Nieszczelności (można wyczuć zapach gazu).",
            "Korozja rur lub uszkodzone połączenia.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Jeśli wyczujesz zapach gazu, natychmiast wywietrz pomieszczenie i zamknij zawór gazu.",
            "Sprawdź, czy przewody są odpowiednio zamocowane i nie są uszkodzone.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "W przypadku podejrzenia nieszczelności skontaktuj się z gazownią lub licencjonowanym specjalistą.",
          ],
        },
      ],
      ciekawostka:
        "W niektórych krajach dodaje się do gazu zapachowy związek chemiczny, aby nieszczelności były łatwiej wykrywalne przez ludzi.",
    },
    {
      id: 4,
      bgColor: "#F2E8F0",
      bgImage: "/images/pdfs/background06_scale.png",
      pgnr: "4",
      szyld: (
        <>
          Instalacje <br />
          <span className="szyld-bold">elektryczne</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Przegrzewające się gniazdka i przełączniki.",
            "Widoczne iskrzenie przy włączaniu urządzeń.",
            "Luźne przewody lub uszkodzone izolacje.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Użyj miernika napięcia, aby sprawdzić podstawowe parametry instalacji.",
            "Skontroluj tablicę rozdzielczą i poszukaj śladów korozji lub przepaleń.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Wszelkie problemy z instalacją elektryczną powinny zostać natychmiast zbadane przez elektryka.",
          ],
        },
      ],
      ciekawostka:
        "Współczesne instalacje elektryczne wyposażone są w wyłączniki różnicowoprądowe, które automatycznie odcinają prąd w przypadku zagrożenia.",
    },
    {
      id: 5,
      bgColor: "#E8E2F0",
      bgImage: "/images/pdfs/background07_scale.png",
      pgnr: "5",
      szyld: (
        <>
          Okna <br />
          <span className="szyld-bold">& Drzwi</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Uszczelki, które nie przylegają, przeciągi w okolicach okien i drzwi.",
            "Uszkodzone zawiasy lub mechanizmy zamykające.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Zamknij okna i drzwi i sprawdź, czy nie przepuszczają powietrza.",
            "Upewnij się, że mechanizmy działają płynnie i bez oporu.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Wymień uszczelki, a w przypadku większych uszkodzeń rozważ wymianę okien lub drzwi.",
          ],
        },
      ],
      ciekawostka:
        "Energooszczędne okna z potrójnymi szybami mogą zmniejszyć straty ciepła nawet o 40% w porównaniu z tradycyjnymi.",
    },
    {
      id: 6,
      bgColor: "#E8F0E2",
      bgImage: "/images/pdfs/background08_scale.png",
      pgnr: "6",
      szyld: (
        <>
          Instalacje <br />
          <span className="szyld-bold">wod - kan</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Wycieki pod zlewami lub w łazience.",
            "Spadki ciśnienia w kranach.",
            "Nieszczelności na rurach.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Otwórz krany i sprawdź siłę strumienia wody.",
            "Poszukaj oznak wilgoci w okolicach rur, szczególnie w piwnicach i podłogach.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Wszelkie wycieki powinny zostać jak najszybciej naprawione, aby zapobiec poważniejszym uszkodzeniom.",
          ],
        },
      ],
      ciekawostka:
        "Pierwsze systemy kanalizacyjne powstały ponad 4 tysiące lat temu w starożytnych cywilizacjach Doliny Indusu.",
    },
    {
      id: 7,
      bgColor: "#F0E8E2",
      bgImage: "/images/pdfs/background09_scale.png",
      pgnr: "7",
      szyld: "Wentylacja",
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Niedrożne kratki wentylacyjne.",
            "Nadmiar wilgoci w pomieszczeniach (np. parowanie szyb, pleśń).",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Sprawdź, czy kratki wentylacyjne są czyste i czy nie ma przeszkód utrudniających przepływ powietrza.",
            "Zwróć uwagę na zapachy stęchlizny, co może wskazywać na problemy z wentylacją.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Wyczyść kratki i zainwestuj w systemy wspomagające wentylację, np. rekuperatory.",
          ],
        },
      ],
      ciekawostka:
        "Dobrze zaprojektowana wentylacja może zmniejszyć koszty ogrzewania nawet o 30%, ponieważ zapobiega utracie ciepła.",
    },
    {
      id: 8,
      bgColor: "#F0E8E2",
      bgImage: "/images/pdfs/background10_scale.png",
      pgnr: "",
      szyld: "",
      mainText: [],
      layout: "cta", // Nowy typ układu
      cta: {
        headline: "Czujesz jednak, że to zadanie zbyt skomplikowane?",
        buttonText: "Skontaktuj się z nami",
        phoneNumber:
          " <span span style='font-size: 16px; font-weight: 200;'>lub </span> <br/> <br/> +48 690 029 414",
        info: "Pamiętaj, że przeglądy gazowe i wentylacji są obowiązkowe co rok, a elektryczne – co pięć lat. Co więcej, firmy ubezpieczeniowe mogą zażądać aktualnych przeglądów budowlanych, zanim wypłacą odszkodowanie.",
      },
    },
  ];

  return (
    <div className="przewodnikOcena">
      <div className="close_przewodnik" onClick={() => navigate("/")}>
        <CloseIcon />
      </div>

      {/* Sekcja okładki */}

      <div className="okladka">
        <div className="rect-back01"></div>
        <div className="okladka-background">
          <img
            src="/images/pdfs/background02crop.png"
            alt=""
            className="fullscreen-image"
          />
        </div>
        <div className="okladka-text">
          <p>
            Oto prosty{" "}
            <span className="okladka-text-bold">
              przewodnik do samodzielnej oceny stanu technicznego budynku
            </span>
            , który pomoże Ci zidentyfikować potencjalne problemy i podjąć
            odpowiednie kroki zanim wezwiesz specjalistę.
          </p>
        </div>
      </div>

      {/* Sekcja z paralaksą */}
      {sectionsData.map((section) => {
        if (section.layout === "cta") {
          // Specjalne renderowanie dla ostatniej sekcji
          return (
            <Parallax
              key={section.id}
              bgImage={section.bgImage}
              strength={400}
              bgImageStyle={{
                objectFit: "cover",
                objectPosition: "right center",
                height: "100%",
                width: "100%",
                transform: "scale(0.7)",
              }}
            >
              <div
                className="cta-section"
              // style={{ backgroundColor: section.bgColor || "transparent" }}
              >
                <div className="cta-content">
                  <h1 className="headline">{section.cta?.headline}</h1>
                  <button className="main_button_2" onClick={handleButtonClick}>
                    {section.cta?.buttonText}
                  </button>
                  <div
                    className="cta-phone"
                    dangerouslySetInnerHTML={{
                      __html: section.cta?.phoneNumber,
                    }}
                  ></div>

                  <p className="cta-info">{section.cta?.info}</p>
                </div>
              </div>
            </Parallax>
          );
        }

        // Domyślne renderowanie dla powtarzalnej sekcji
        return (
          <>
            <Parallax
              key={section.id}
              bgImage={section.bgImage}
              strength={400}
              bgImageStyle={
                {
                  //   objectFit: "cover",
                  //   height: "100%",
                  //   width: "100%",
                }
              }
            >
              <div className="parallax-section">
                <div className="parallax-content">
                  <div className="page-number">{section.pgnr}</div>
                  <div className="szyld">{section.szyld}</div>

                  <MainText content={section.mainText} />
                </div>
              </div>
            </Parallax>
          </>
        );
      })}
    </div>
  );
}
```

## File: `src/routes/Landingi/PrzewodnikOcena/przewodnikOcena.scss` <a id="file-src-routes-landingi-przewodnikocena-przewodnikocena-scss"></a>

```scss
.przewodnikOcena {
  
  width: 100%;
  height: 900vh;
  scroll-snap-type: y mandatory; /* Włącza snap scrolling w osi Y */
  overflow-y: scroll; /* Włącza przewijanie w pionie */
  scroll-behavior: smooth;

  .close_przewodnik{
    position: fixed;
    right: 40px;
    top: 30px;
    z-index: 1000;
    cursor: pointer;
  }

  .okladka {
    scroll-snap-align: start;
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 400px; /* Wysokość gradientu */
      background: linear-gradient(
        to bottom,
        rgba(245, 245, 245, 0) 0%,
        #ffffff 100%
      );
      pointer-events: none; /* Ignoruj kliknięcia */
      z-index: 3; /* Upewnij się, że gradient jest nad tłem */
    }

    .rect-back01 {
      position: absolute;
      flex: 60%;
      left: 20px;
      top: 0;
      min-width: 450px;
      width: 50%;
      height: 100%;
      background-color: white;
      z-index: 1;
    }

    .okladka-background {
      position: absolute;
      right: 0;
      top: 0;
      flex: 60%;
      height: 100%;
      z-index: 2;

      .fullscreen-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* Dopasowuje obraz, zachowując proporcje */
        object-position: center;
      }
    }

    .okladka-text {
      position: absolute;
      left: 158px;
      bottom: 170px;
      width: 50%;
      font-family: "Inter", serif;
      font-weight: 200;
      font-size: 36px;
      position: absolute;
      z-index: 3;
      line-height: 64px;

      .okladka-text-bold {
        font-weight: 600;
        font-size: 68px;
      }
    }
  }
  //   .react-parallax-bgimage {
  //     transform: scale(0.8) !important; /* Skalowanie obrazu */
  //     transform-origin: center center; /* Punkt odniesienia */
  //     object-fit: cover; /* Dopasowanie obrazu */
  //   }
  .cta-section {
    scroll-snap-align: start;

    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;

    .cta-content {
      max-width: 800px;
      background: rgba(255, 255, 255, 0.8);
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;

      .headline {
        font-family: "Merriweather", serif;
        font-size: 56px;
        font-weight: 300;
        margin-bottom: 20px;
      }

      .main_button_2 {
        cursor: pointer;
        transition: background-color 0.3s;
        margin-bottom: 20px;

        &:hover {
          background-color: #e64a19;
          color: white;
        }
      }

      .cta-phone {
        font-family: "Inter", serif;

        font-size: 32px;
        font-weight: 300;
      }

      .cta-info {
        margin-top: 90px;
        font-family: "Inter", serif;
        font-style: italic;
        font-size: 20px;
        font-weight: 300;
        line-height: 28px;
        color: #666;
      }
    }
  }

  .react-parallax {
    scroll-snap-align: start;

    .react-parallax-bgimage {
      object-fit: cover;
      object-position: right bottom;
      width: 100%;
      height: 100% !important;

      @media (max-width: 425px) {
        position: absolute;
        width: 150% !important; /* Skalowanie dla małych ekranów */
        height: 100% !important;
        object-fit: contain;
        bottom: 0;
        opacity: 0.5;
      }
      @media (max-width: 768px) {
        position: absolute;
        width: 150% !important; /* Skalowanie dla małych ekranów */
        height: 100% !important;
        object-fit: contain;
        bottom: 0;
        opacity: 0.5;
      }
    }

    .react-parallax-content {
      .parallax-section {
        position: relative;
        height: 100vh;
        // background-attachment: fixed;
        // background-position: center;
        // background-size: cover;

        .parallax-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          padding: 100px 0 100px 80px;
          z-index: 2;

          .page-number {
            position: absolute;
            right: -50px;
            top: 80px;
            font-family: "Merriweather", serif;
            color: #b3b3b324;
            font-weight: 500;
            font-size: 500px;
            line-height: 140px;
            // display: none;
          }

          .szyld {
            position: absolute;
            right: 20px;
            top: 150px;
            font-family: "Merriweather", serif;
            font-weight: 300;
            font-size: 48px;
            line-height: 80px;
            transform: rotate(90deg) translateX(100%);

            transform-origin: right top;
          }
          .szyld-bold {
            font-size: 76px;
          }

          .main-text {
            max-width: 500px;
            height: 100%;
            font-family: "Inter", serif;
            font-weight: 200;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .grupa {
              display: flex;
              flex-direction: column;
              gap: 20px;

              h2 {
                font-size: 36px;
              }

              ul {
                font-size: 22px;
                li {
                  margin-bottom: 15px;
                  margin-left: 5px;
                  list-style: none;
                }
              }
            }
          }
        }
      }
    }
  }
}

/* Mobile */
@media (max-width: 425px) {
  .przewodnikOcena .okladka {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    &::after {
      content: "";
      background: transparent;
    }
  }
  .rect-back01 {
    display: none;
  }
  .przewodnikOcena .okladka .okladka-background {
    position: absolute;
    right: 0;
    top: 0;
    flex: 70%;
    width: 100%;
    height: 50%;
    z-index: 2;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 150px; /* Wysokość gradientu */
      background: linear-gradient(
        to bottom,
        rgba(245, 245, 245, 0) 0%,
        #ffffff 100%
      );
      pointer-events: none; /* Ignoruj kliknięcia */
      z-index: 3; /* Upewnij się, że gradient jest nad tłem */
    }
  }

  .przewodnikOcena .okladka .okladka-text {
    font-size: 20px;
    line-height: 36px;
    left: 0px;
    bottom: 0%;
    width: 100%;
    padding: 30px 50px 50px 50px;

    .okladka-text-bold {
      font-weight: 600;
      font-size: 40px;
      line-height: 46px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(255, 255, 255, 0.5); /* Półprzezroczyste tło */
      border-radius: 10px; /* Zaokrąglenie rogów, jeśli potrzebne */
      z-index: -1; /* Umieszczenie tła za tekstem */
    }
  }

  .przewodnikOcena .react-parallax .react-parallax-content .cta-section {
    scroll-snap-align: start;

    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;

    .cta-content {
      max-width: 380px;
      padding: 40px;

      .headline {
        font-family: "Merriweather", serif;
        font-size: 36px;
        font-weight: 300;
        margin-bottom: 10px;
      }

      .main_button_2 {
        cursor: pointer;
        transition: background-color 0.3s;
        margin-bottom: 10px;

        &:hover {
          background-color: #e64a19;
          color: white;
        }
      }

      .cta-phone {
        font-family: "Inter", serif;

        font-size: 28px;
        font-weight: 300;
      }

      .cta-info {
        margin-top: 30px;
        font-size: 16px;
      }
    }
  }

  .przewodnikOcena
    .react-parallax
    .react-parallax-content
    .parallax-section
    .parallax-content {
    padding: 200px 20px 100px 20px;
    .szyld {
      position: absolute;
      right: 20px;
      top: 50px;
      font-family: "Merriweather", serif;
      font-weight: 300;
      font-size: 28px;
      line-height: 38px;
      transform: rotate(90deg) translateX(100%);
      transform-origin: right top;

      .szyld-bold {
        font-size: 36px;
      }
    }
    .main-text {
      font-weight: 200;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .grupa {
        display: flex;
        flex-direction: column;
        gap: 15px;

        h2 {
          font-size: 26px;
        }

        ul {
          font-size: 18px;
          li {
            margin-bottom: 10px;
            margin-left: 5px;
            list-style: none;
          }
        }
      }
    }
  }
}

/* Tablet */
@media (min-width: 426px) and (max-width: 768px) {
  /* Styl dla tabletów */

  .przewodnikOcena .okladka {
    flex-direction: column;
    background-color: white;

    &::after {
      display: none;
    }
    .rect-back01 {
        display: none;
      }
      
    .okladka-background {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 70%;
      background-color: white;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px; /* Wysokość gradientu */
        background: linear-gradient(
          to bottom,
          rgba(245, 245, 245, 0) 0%,
          #ffffff 100%
        );
        pointer-events: none; /* Ignoruj kliknięcia */
        z-index: 3; /* Upewnij się, że gradient jest nad tłem */
      }
    }
    .rect-back01 {
      display: none;
    }

    .okladka-text {
      font-size: 18px;
      line-height: 36px;
      left: 0px;
      bottom: 0%;
      width: 100%;
      height: 40%;
      padding: 30px 60px 20px 60px;

      .okladka-text-bold {
        font-weight: 600;
        font-size: 36px;
        line-height: 46px;
      }

      &::before {
        display: none;
      }
    }
  }
  .react-parallax {
    .react-parallax-bgimage{

    }
  }
}

/* Small Desktop */
@media (min-width: 769px) and (max-width: 1024px) {
  /* Styl dla mniejszych desktopów lub dużych tabletów w trybie poziomym */
  .przewodnikOcena .okladka {
    background-color: white;
    &::after {
      display: none;
    }
    .okladka-background {
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px; /* Wysokość gradientu */
        background: linear-gradient(
          to bottom,
          rgba(245, 245, 245, 0) 0%,
          #ffffff 100%
        );
        pointer-events: none; /* Ignoruj kliknięcia */
        z-index: 3; /* Upewnij się, że gradient jest nad tłem */
      }
    }
    .rect-back01 {
      display: none;
    }

    .okladka-text {
      font-size: 18px;
      line-height: 36px;
      left: 0px;
      bottom: 0%;
      width: 70%;
      height: 40%;
      padding: 30px 100px 20px 100px;

      .okladka-text-bold {
        font-weight: 600;
        font-size: 36px;
        line-height: 46px;
      }

      &::before {
        display: none;
      }
    }
  }
}

/* Medium Desktop */
@media (min-width: 1025px) and (max-width: 1440px) {
  /* Styl dla średnich desktopów */
  .przewodnikOcena .okladka {
    background-color: white;
    &::after {
      display: none;
    }
    .okladka-background {
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px; /* Wysokość gradientu */
        background: linear-gradient(
          to bottom,
          rgba(245, 245, 245, 0) 0%,
          #ffffff 100%
        );
        pointer-events: none; /* Ignoruj kliknięcia */
        z-index: 3; /* Upewnij się, że gradient jest nad tłem */
      }
    }
    .rect-back01 {
      display: none;
    }

    .okladka-text {
      font-size: 36px;
      line-height: 46px;
      left: 0px;
      bottom: 0%;
      width: 70%;
      height: 50%;
      padding: 30px 100px 20px 100px;

      .okladka-text-bold {
        font-weight: 600;
        font-size: 56px;
        line-height: 60px;
      }

      &::before {
        display: none;
      }
    }
  }
}

/* Large Desktop */
@media (min-width: 1441px) {
  /* Styl dla dużych monitorów */
}
```

## File: `src/routes/PrzegladB/PrzegladB.jsx` <a id="file-src-routes-przegladb-przegladb-jsx"></a>

```jsx
import React, { useEffect, useState } from "react";
import "./przegladB.scss"; // stylizacja w osobnym pliku
import Menu from "../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PrzegladB = ({ user }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();

  const scrollToSection = (id) => {

    setTimeout(() => {
      navigate("/", { state: { scrollTo: id } });
    }, 300);
  };

  useEffect(() => {
    if (user) {
      setUserPhoto(user.photoURL || "images/user-50.png");
    } else {
      setUserPhoto("images/user-50.png");
    }
  }, [user]);
  return (
    <>
      <Helmet>
        <title>Przegląd Budowlany Gliwice & Śląsk | Roczne i 5-letnie kontrole</title>
        <meta name="description" content="Szukasz eksperta do przeglądu budowlanego w Gliwicach? Wykonujemy okresowe kontrole budynków zgodnie z art. 62 Prawa Budowlanego. Atrakcyjne ceny i szybkie terminy." />
        <link rel="canonical" href="https://przeglady-domu.com/przeglad-budowlany" />
      </Helmet>
      <section className="przeglad-budowlany">
        <div className="container_info">
          <h1>Przegląd budowlany</h1>
          <div className="textsAndButton">
            <div className="left">
              <p className="description">
                Zgodnie z art. 62 ustawy Prawo budowlane, okresowy przegląd
                budowlany nieruchomości jest obowiązkowy. Skorzystaj z naszej
                kompleksowej usługi przeglądów i nie ryzykuj problemów z wypłatą
                odszkodowania przez ubezpieczyciela.
              </p>

              <button className="main_button"
                onClick={() => scrollToSection("inspection-form")}
              >
                <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
                <div className="btn-icon">
                  <img src={userPhoto} alt="Profil" />
                </div>
              </button>
            </div>
            <div className="right">
              <div className="steps">
                <p>Cały proces w kilku prostych krokach:</p>
                <ul>
                  <li>
                    Wypełnij prosty formularz i wyślij zapytanie bezpośrednio do
                    naszych specjalistów. Masz wątpliwości lub pytania? Nasza
                    asystentka chętnie pomoże.
                  </li>
                  <li>
                    Najczęściej otrzymasz odpowiedź już w ciągu kilku godzin.
                  </li>
                  <li>
                    Wybierz dogodną ofertę i wspólnie ustalcie termin wykonania
                    przeglądu.
                  </li>
                  <li>
                    Po wykonaniu usługi otrzymasz protokół, na podstawie którego
                    łatwo rozliczysz się z wykonawcą.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container_faq">
          <div className="faq faq_one">
            <p>Czym dokładnie jest przegląd techniczny nieruchomości?</p>
            <span>
              Przegląd techniczny nieruchomości to obowiązkowa kontrola stanu
              technicznego budynku, obejmująca jego konstrukcję, instalacje
              (gazową, elektryczną) oraz elementy narażone na działanie
              czynników atmosferycznych i instalacje kominowe. Celem przeglądu
              jest zapewnienie bezpieczeństwa użytkowników budynku oraz zgodność
              obiektu z wymogami prawa budowlanego.
            </span>
            <button className="main_button"
              onClick={() => scrollToSection("inspection-form")}>
              <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
              <div className="btn-icon">
                <img src={userPhoto} alt="Profil" />
              </div>
            </button>
          </div>
          <div className="faq faq_two">
            <p>
              Jakie przeglądy techniczne nieruchomości należy przeprowadzać i
              jak często?
            </p>
            <span>
              Roczne przeglądy: Obejmują elementy budynku narażone na wpływy
              atmosferyczne (np. dach, rynny), instalacje ochrony środowiska
              oraz instalacje kominowe – dymowe, spalinowe i wentylacyjne.
              Przegląd kominiarski jest wymagany co najmniej raz w roku i ma na
              celu sprawdzenie drożności oraz bezpieczeństwa przewodów
              kominowych, co minimalizuje ryzyko pożaru i zapewnia odpowiednią
              wentylację. Pięcioletnie przeglądy: Przeprowadzane co pięć lat,
              obejmują kompleksową ocenę stanu technicznego i przydatności
              budynku do użytkowania. Przegląd pięcioletni obejmuje również
              instalacje elektryczne i piorunochronne, sprawdzenie estetyki
              budynku oraz ocenę innych kluczowych elementów konstrukcji.
            </span>
          </div>
          <div className="faq faq_three">
            <p>
              Czy brak przeglądów technicznych może mieć wpływ na wypłatę
              odszkodowania z polisy ubezpieczeniowej?
            </p>
            <span>
              Tak, zdecydowanie. W przypadku szkody, wielu ubezpieczycieli może
              odmówić wypłaty odszkodowania, jeśli nieruchomość nie miała
              przeprowadzonych wymaganych przeglądów technicznych, takich jak
              przegląd instalacji elektrycznej, gazowej czy ogólny przegląd
              budynku. Brak tych przeglądów może być traktowany jako zaniedbanie
              obowiązków właściciela lub zarządcy budynku, co z kolei daje
              ubezpieczycielowi podstawy do ograniczenia lub całkowitego
              odmówienia wypłaty odszkodowania.
            </span>
          </div>
        </div>

        <div className="container_warning">
          <h2>DLACZEGO NIE WARTO RYZYKOWAĆ?</h2>
          <p>
            Czy masz świadomość, że brak aktualnych przeglądów technicznych może
            spowodować problemy przy uzyskaniu odszkodowania od ubezpieczyciela?
            Towarystwa ubezpieczeniowe często stosują zapis w Ogólnych Warunkach
            Ubezpieczenia, zgodnie z którym właściciel nieruchomości ma
            obowiązek użytkować budynek oraz jego instalacje w sposób zgodny z
            wymaganiami określonymi w Prawie budowlanym. Regularne przeglądy
            techniczne to Twoje zabezpieczenie na wypadek szkody i gwarancja
            pełnej ochrony ubezpieczeniowej.
          </p>
        </div>
        <div className="container_blog">
          <div className="blog blog_one">
            <div className="blog_left">
              <img src="/images/blog01.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>Na czym polega przegląd budowlany?</h3>
              <p>
                Regularny przegląd budowlany to gwarancja bezpieczeństwa i
                długowieczności Twojej nieruchomości. Dowiedz się, jak przebiega
                taka kontrola i dlaczego warto ją przeprowadzać zgodnie z
                obowiązującymi przepisami.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>
          <div className="blog blog_two">
            <div className="blog_left">
              <img src="/images/blog02.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Przepisy dotyczące modernizacji instalacji gazowej w Polsce
              </h3>
              <p>
                Prawo budowlane pozostawia duże pole do indywidualnej
                interpretacji, szczególnie jeśli chodzi o instalacje budowlane.
                Wprowadzono rozróżnienie na remont, przebudowę i instalację
                nową, co oznacza, że każdy rodzaj pracy może podlegać innym
                wymaganiom formalnym i technicznym.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>

          <div className="blog blog_three">
            <div className="blog_left">
              <img src="/images/went4.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Zmiany w przepisach prawa dotyczących montażu nawiewników
                okiennych, szczególnie w kuchniach z kuchenką gazową
              </h3>
              <p>
                Montaż nawiewników okiennych stał się kluczowym elementem
                przepisów dotyczących prawidłowej wentylacji budynków
                mieszkalnych. Jest to szczególnie istotne w kuchniach
                wyposażonych w urządzenia gazowe, gdzie odpowiedni dopływ
                świeżego powietrza warunkuje prawidłowe i bezpieczne spalanie
                gazu.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrzegladB;
```

## File: `src/routes/PrzegladB/przegladB.scss` <a id="file-src-routes-przegladb-przegladb-scss"></a>

```scss
.przeglad-budowlany {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 80px 0 0 0;

  background-color: #ffffff;
  font-family: "ProductSans";

  .container_info {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;

    h1 {
      width: 100%;
      text-align: center;
      font-family: "ProductSans";
      font-weight: 100;
      font-size: 128px;

      color: #333;
      margin-bottom: 20px;
    }

    .textsAndButton {
      display: flex;
      .left {
        flex: 3;
        padding: 0 30px;

        .description {
          font-size: 32px;
          line-height: 1.5;
          font-weight: 100;
          color: #555;
          margin-bottom: 80px;
        }

        .cta {
          background-color: #506446;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 14px 26px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #c3d4b4;
            color: #506446;
          }
        }
      }
    }

    .right {
      flex: 2;
      padding: 0 30px;
      font-family: "ProductSans";
      font-weight: 100;

      .steps {
        font-size: 22px;
        color: #666;

        p {
          font-weight: 400;
          margin-bottom: 10px;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 12px;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .container_faq {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 80px;
    align-items: center;

    .faq_one,
    .faq_two,
    .faq_three {
      max-width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
      margin-bottom: 50px;

      p {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 10px;
        text-align: center;
      }
      span {
        font-size: 24px;
        font-weight: 100;
        margin-bottom: 10px;
      }
      .cta {
        background-color: #506446;
        color: white;
        border: none;
        border-radius: 30px;
        padding: 14px 26px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: background-color 0.3s ease;
        max-width: 400px;
        margin-top: 40px;

        &:hover {
          background-color: #c3d4b4;
          color: #506446;
        }
      }
    }
  }

  .container_warning {
    background-color: #bcd7ff;
    width: 100%;
    margin-left: calc(-50vw + 50%);
    padding: 60px 120px;

    h2 {
      font-size: 64px;
      font-family: "ProductSans";
      font-weight: 400;
      margin-bottom: 40px;
    }
    p {
      font-size: 32px;
      max-width: 1000px;
      font-family: "ProductSans";
      font-weight: 100;
    }
  }
  .container_blog {
    display: flex;
    flex-direction: column;
    padding: 100px 40px;
    gap: 40px;
    .blog {
      display: flex;
      gap: 30px;
      .blog_left {
        display: flex;
        img {
          width: 300px;
          height: auto;
        }
      }

      .blog_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h3 {
          font-family: "ProductSans";
          font-weight: 400;
          font-size: 26px;
        }
        p {
          font-family: "ProductSans";
          font-weight: 100;
          font-size: 16px;
        }
        button {
          background-color: #bcd7ff;
          border: none;
          margin: 0 0 0 auto;
          padding: 8px 45px;
          border-radius: 20px;
        }
      }
    }
  }
}

@media (max-width: 960px) {
  .przeglad-budowlany {
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;

    .container_info {
      padding: 80px 0px;
      gap: 20px;

      h1 {
        font-size: 64px;
        margin-bottom: 10px;
      }

      .textsAndButton {
        flex-direction: column;
        align-items: center;

        .left {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 0;

          .description {
            font-size: 24px;
            margin-bottom: 40px;
            text-align: left;
          }
          .cta {
            // align-self: flex-end;
          }
        }
        .right {
          padding: 0;
          // text-align: center;
          margin-top: 50px;

          .steps {
            font-size: 18px;
            text-align: left;
          }
        }
      }
    }

    .container_faq {
      margin-top: 0px;
    }

    .container_warning {
      padding: 60px 40px;
      margin-left: 0;
      h2 {
        font-size: 42px;
      }
      p {
        font-size: 22px;
      }
    }

    .container_blog {
      .blog {
        flex-direction: column;
        gap: 30px;
        .blog_left {
          img {
            width: 100%;
            height: auto;
          }
        }
        .blog_right {
          gap: 10px;

          h3 {
            font-size: 22px;
          }
        }
      }
    }
  }
}
```

## File: `src/routes/PrzegladE/PrzegladE.jsx` <a id="file-src-routes-przeglade-przeglade-jsx"></a>

```jsx
import React, { useEffect, useState } from "react";
import "./przegladE.scss";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PrzegladE = ({ user, isPanelOpen, setIsPanelOpen }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();

  const scrollToSection = (id) => {

    setTimeout(() => {
      navigate("/", { state: { scrollTo: id } });
    }, 300);
  };

  useEffect(() => {
    if (user) {
      setUserPhoto(user.photoURL || "images/user-50.png");
    } else {
      setUserPhoto("images/user-50.png");
    }
  }, [user]);
  return (
    <>
      <Helmet>
        <title>Przegląd Elektryczny Gliwice & Śląsk | Pomiary i Protokół</title>
        <meta name="description" content="Okresowe pomiary i przeglądy instalacji elektrycznej w Gliwicach. Protokół do ubezpieczenia i gwarancja bezpieczeństwa. Uprawnienia SEP i szybkie terminy na Śląsku." />
        <link rel="canonical" href="https://przeglady-domu.com/przeglad-elektryczny" />
      </Helmet>
      <section className="przeglad-elektryczny">
        <div className="container_info">
          <h1>Przegląd instalacji elektrycznej</h1>

          <div className="textsAndButton">
            <div className="left">
              <p className="description">
                Przegląd instalacji elektrycznej to obowiązek wynikający z
                przepisów prawa budowlanego, ale także gwarancja Twojego
                bezpieczeństwa. Zleć go naszym specjalistom, by mieć pewność, że
                instalacja działa sprawnie i bezpiecznie.
              </p>

              <button className="main_button"
                onClick={() => scrollToSection("inspection-form")}>
                <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
                <div className="btn-icon">
                  <img src={userPhoto} alt="Profil" />
                </div>
              </button>
            </div>
            <div className="right">
              <div className="steps">
                <p>Cały proces w kilku prostych krokach:</p>
                <ul>
                  <li>
                    Wypełnij prosty formularz i wyślij zapytanie bezpośrednio do
                    naszych specjalistów. Masz wątpliwości lub pytania? Nasza
                    asystentka chętnie pomoże.
                  </li>
                  <li>
                    Najczęściej otrzymasz odpowiedź już w ciągu kilku godzin.
                  </li>
                  <li>
                    Wybierz dogodną ofertę i wspólnie ustalcie termin wykonania
                    przeglądu.
                  </li>
                  <li>
                    Po wykonaniu usługi otrzymasz protokół, na podstawie którego
                    łatwo rozliczysz się z wykonawcą.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container_faq">
          <div className="faq faq_one">
            <p>Czym dokładnie jest przegląd techniczny nieruchomości?</p>
            <span>
              Przegląd techniczny nieruchomości to obowiązkowa kontrola stanu
              technicznego budynku, obejmująca jego konstrukcję, instalacje
              (gazową, elektryczną) oraz elementy narażone na działanie
              czynników atmosferycznych i instalacje kominowe. Celem przeglądu
              jest zapewnienie bezpieczeństwa użytkowników budynku oraz zgodność
              obiektu z wymogami prawa budowlanego.
            </span>
            <button className="main_button"
              onClick={() => scrollToSection("inspection-form")}>
              <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
              <div className="btn-icon">
                <img src={userPhoto} alt="Profil" />
              </div>
            </button>
          </div>
          <div className="faq faq_two">
            <p>
              Jakie przeglądy techniczne nieruchomości należy przeprowadzać i
              jak często?
            </p>
            <span>
              Roczne przeglądy: Obejmują elementy budynku narażone na wpływy
              atmosferyczne (np. dach, rynny), instalacje ochrony środowiska
              oraz instalacje kominowe – dymowe, spalinowe i wentylacyjne.
              Przegląd kominiarski jest wymagany co najmniej raz w roku i ma na
              celu sprawdzenie drożności oraz bezpieczeństwa przewodów
              kominowych, co minimalizuje ryzyko pożaru i zapewnia odpowiednią
              wentylację. Pięcioletnie przeglądy: Przeprowadzane co pięć lat,
              obejmują kompleksową ocenę stanu technicznego i przydatności
              budynku do użytkowania. Przegląd pięcioletni obejmuje również
              instalacje elektryczne i piorunochronne, sprawdzenie estetyki
              budynku oraz ocenę innych kluczowych elementów konstrukcji.
            </span>
          </div>
          <div className="faq faq_three">
            <p>
              Czy brak przeglądów technicznych może mieć wpływ na wypłatę
              odszkodowania z polisy ubezpieczeniowej?
            </p>
            <span>
              Tak, zdecydowanie. W przypadku szkody, wielu ubezpieczycieli może
              odmówić wypłaty odszkodowania, jeśli nieruchomość nie miała
              przeprowadzonych wymaganych przeglądów technicznych, takich jak
              przegląd instalacji elektrycznej, gazowej czy ogólny przegląd
              budynku. Brak tych przeglądów może być traktowany jako zaniedbanie
              obowiązków właściciela lub zarządcy budynku, co z kolei daje
              ubezpieczycielowi podstawy do ograniczenia lub całkowitego
              odmówienia wypłaty odszkodowania.
            </span>
          </div>
        </div>
        <div className="container_warning">
          <h2>DLACZEGO NIE WARTO RYZYKOWAĆ?</h2>
          <p>
            Czy masz świadomość, że brak aktualnych przeglądów technicznych może
            spowodować problemy przy uzyskaniu odszkodowania od ubezpieczyciela?
            Towarystwa ubezpieczeniowe często stosują zapis w Ogólnych Warunkach
            Ubezpieczenia, zgodnie z którym właściciel nieruchomości ma
            obowiązek użytkować budynek oraz jego instalacje w sposób zgodny z
            wymaganiami określonymi w Prawie budowlanym. Regularne przeglądy
            techniczne to Twoje zabezpieczenie na wypadek szkody i gwarancja
            pełnej ochrony ubezpieczeniowej.
          </p>
        </div>
        <div className="container_blog">
          <div className="blog blog_one">
            <div className="blog_left">
              <img src="/images/blog01.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>Na czym polega przegląd budowlany?</h3>
              <p>
                Regularny przegląd budowlany to gwarancja bezpieczeństwa i
                długowieczności Twojej nieruchomości. Dowiedz się, jak przebiega
                taka kontrola i dlaczego warto ją przeprowadzać zgodnie z
                obowiązującymi przepisami.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>
          <div className="blog blog_two">
            <div className="blog_left">
              <img src="/images/blog02.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Przepisy dotyczące modernizacji instalacji gazowej w Polsce
              </h3>
              <p>
                Prawo budowlane pozostawia duże pole do indywidualnej
                interpretacji, szczególnie jeśli chodzi o instalacje budowlane.
                Wprowadzono rozróżnienie na remont, przebudowę i instalację
                nową, co oznacza, że każdy rodzaj pracy może podlegać innym
                wymaganiom formalnym i technicznym.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>

          <div className="blog blog_three">
            <div className="blog_left">
              <img src="/images/went4.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Zmiany w przepisach prawa dotyczących montażu nawiewników
                okiennych, szczególnie w kuchniach z kuchenką gazową
              </h3>
              <p>
                Montaż nawiewników okiennych stał się kluczowym elementem
                przepisów dotyczących prawidłowej wentylacji budynków
                mieszkalnych. Jest to szczególnie istotne w kuchniach
                wyposażonych w urządzenia gazowe, gdzie odpowiedni dopływ
                świeżego powietrza warunkuje prawidłowe i bezpieczne spalanie
                gazu.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrzegladE;
```

## File: `src/routes/PrzegladE/przegladE.scss` <a id="file-src-routes-przeglade-przeglade-scss"></a>

```scss
.przeglad-elektryczny {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 80px 0 0 0;

  background-color: #ffffff;
  font-family: "ProductSans";

  .container_info {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;

    h1 {
      width: 100%;
      text-align: center;
      font-family: "ProductSans";
      font-weight: 100;
      font-size: 128px;

      color: #333;
      margin-bottom: 20px;
    }

    .textsAndButton {
      display: flex;
      .left {
        flex: 3;
        padding: 0 30px;

        .description {
          font-size: 32px;
          line-height: 1.5;
          font-weight: 100;
          color: #555;
          margin-bottom: 80px;
        }

        .cta {
          background-color: #506446;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 14px 26px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #c3d4b4;
            color: #506446;
          }
        }
      }
    }

    .right {
      flex: 2;
      padding: 0 30px;
      font-family: "ProductSans";
      font-weight: 100;

      .steps {
        font-size: 22px;
        color: #666;

        p {
          font-weight: 400;
          margin-bottom: 10px;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 12px;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .container_faq {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 80px;
    align-items: center;

    .faq_one,
    .faq_two,
    .faq_three {
      max-width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
      margin-bottom: 50px;

      p {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 10px;
        text-align: center;
      }
      span {
        font-size: 24px;
        font-weight: 100;
        margin-bottom: 10px;
      }
      .cta {
        background-color: #506446;
        color: white;
        border: none;
        border-radius: 30px;
        padding: 14px 26px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: background-color 0.3s ease;
        max-width: 400px;
        margin-top: 40px;

        &:hover {
          background-color: #c3d4b4;
          color: #506446;
        }
      }
    }
  }

  .container_warning {
    background-color: #bcd7ff;
    width: 100%;
    margin-left: calc(-50vw + 50%);
    padding: 60px 120px;

    h2 {
      font-size: 64px;
      font-family: "ProductSans";
      font-weight: 400;
      margin-bottom: 40px;
    }
    p {
      font-size: 32px;
      max-width: 1000px;
      font-family: "ProductSans";
      font-weight: 100;
    }
  }
  .container_blog {
    display: flex;
    flex-direction: column;
    padding: 100px 40px;
    gap: 40px;
    .blog {
      display: flex;
      gap: 30px;
      .blog_left {
        display: flex;
        img {
          width: 300px;
          height: auto;
        }
      }

      .blog_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h3 {
          font-family: "ProductSans";
          font-weight: 400;
          font-size: 26px;
        }
        p {
          font-family: "ProductSans";
          font-weight: 100;
          font-size: 16px;
        }
        button {
          background-color: #bcd7ff;
          border: none;
          margin: 0 0 0 auto;
          padding: 8px 45px;
          border-radius: 20px;
        }
      }
    }
  }
}

@media (max-width: 960px) {
  .przeglad-budowlany {
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;

    .container_info {
      padding: 80px 0px;
      gap: 20px;

      h1 {
        font-size: 64px;
        margin-bottom: 10px;
      }

      .textsAndButton {
        flex-direction: column;
        align-items: center;

        .left {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 0;

          .description {
            font-size: 24px;
            margin-bottom: 40px;
            text-align: left;
          }
          .cta {
            // align-self: flex-end;
          }
        }
        .right {
          padding: 0;
          // text-align: center;
          margin-top: 50px;

          .steps {
            font-size: 18px;
            text-align: left;
          }
        }
      }
    }

    .container_faq {
      margin-top: 0px;
    }

    .container_warning {
      padding: 60px 40px;
      margin-left: 0;
      h2 {
        font-size: 42px;
      }
      p {
        font-size: 22px;
      }
    }

    .container_blog {
      .blog {
        flex-direction: column;
        gap: 30px;
        .blog_left {
          img {
            width: 100%;
            height: auto;
          }
        }
        .blog_right {
          gap: 10px;

          h3 {
            font-size: 22px;
          }
        }
      }
    }
  }
}
```

## File: `src/routes/PrzegladG/PrzegladG.jsx` <a id="file-src-routes-przegladg-przegladg-jsx"></a>

```jsx
import React, { useEffect, useState } from "react";
import "./przegladG.scss"; // Używamy ten sam SCSS
import PersonIcon from "@mui/icons-material/Person";
import Menu from "../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PrzegladG = ({ user, isPanelOpen, setIsPanelOpen }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    setTimeout(() => {
      navigate("/", { state: { scrollTo: id } });
    }, 300);
  };

  useEffect(() => {
    if (user) {
      setUserPhoto(user.photoURL || "images/user-50.png");
    } else {
      setUserPhoto("images/user-50.png");
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Przegląd Instalacji Gazowej Gliwice & Śląsk | Szczelność i Bezpieczeństwo</title>
        <meta name="description" content="Obowiązkowy roczny przegląd gazowy w Gliwicach? Zadbaj o bezpieczeństwo swojej rodziny. Wykonujemy profesjonalne próby szczelności instalacji gazowych na całym Śląsku." />
        <link rel="canonical" href="https://przeglady-domu.com/przeglad-gazowy" />
      </Helmet>
      <section className="przeglad-gazowy">
        <div className="container_info">
          <h1>Przegląd instalacji gazowej</h1>

          <div className="textsAndButton">
            <div className="left">
              <p className="description">
                Zgodnie z art. 62 ustawy Prawo budowlane regularny przegląd
                instalacji gazowej jest obowiązkiem każdego właściciela
                nieruchomości. Skorzystaj z naszego kompleksowego przeglądu
                instalacji gazowej i zadbaj o bezpieczeństwo swoje oraz
                bliskich.
              </p>

              <button
                className="main_button"
                onClick={() => scrollToSection("inspection-form")}
              >
                <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
                <div className="btn-icon">
                  <img src={userPhoto} alt="Profil" />
                </div>
              </button>
            </div>
            <div className="right">
              <div className="steps">
                <p>Cały proces w kilku prostych krokach:</p>
                <ul>
                  <li>
                    Wypełnij prosty formularz i wyślij zapytanie bezpośrednio do
                    naszych specjalistów. Masz wątpliwości lub pytania? Nasza
                    asystentka chętnie pomoże.
                  </li>
                  <li>
                    Najczęściej otrzymasz odpowiedź już w ciągu kilku godzin.
                  </li>
                  <li>
                    Wybierz dogodną ofertę i wspólnie ustalcie termin wykonania
                    przeglądu.
                  </li>
                  <li>
                    Po wykonaniu usługi otrzymasz protokół, na podstawie którego
                    łatwo rozliczysz się z wykonawcą.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container_faq">
          <div className="faq faq_one">
            <p>
              Dlaczego przegląd instalacji gazowej jest tak istotny i jak często
              należy go przeprowadzać?
            </p>
            <span>
              Przegląd instalacji gazowej jest obowiązkowy i należy
              przeprowadzać go co najmniej raz w roku (art. 62 ust. 1 pkt 1 lit.
              c ustawy Prawo budowlane). Ma to na celu wykrycie potencjalnych
              nieszczelności oraz innych usterek, które mogą prowadzić do
              wycieków gazu i stanowić zagrożenie dla zdrowia i życia
              użytkowników budynku.
            </span>
            <button
              className="main_button"
              onClick={() => scrollToSection("inspection-form")}
            >
              <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
              <div className="btn-icon">
                <img src={userPhoto} alt="Profil" />
              </div>
            </button>
          </div>
          <div className="faq faq_two">
            <p>
              Jakie przeglądy techniczne nieruchomości należy przeprowadzać i
              jak często?
            </p>
            <span>
              Roczne przeglądy: Obejmują elementy budynku narażone na wpływy
              atmosferyczne (np. dach, rynny), instalacje ochrony środowiska
              oraz instalacje kominowe – dymowe, spalinowe i wentylacyjne.
              Przegląd kominiarski jest wymagany co najmniej raz w roku i ma na
              celu sprawdzenie drożności oraz bezpieczeństwa przewodów
              kominowych, co minimalizuje ryzyko pożaru i zapewnia odpowiednią
              wentylację. Pięcioletnie przeglądy: Przeprowadzane co pięć lat,
              obejmują kompleksową ocenę stanu technicznego i przydatności
              budynku do użytkowania. Przegląd pięcioletni obejmuje również
              instalacje elektryczne i piorunochronne, sprawdzenie estetyki
              budynku oraz ocenę innych kluczowych elementów konstrukcji.
            </span>
          </div>
          <div className="faq faq_three">
            <p>
              Czy brak przeglądów technicznych może mieć wpływ na wypłatę
              odszkodowania z polisy ubezpieczeniowej?
            </p>
            <span>
              Tak, zdecydowanie. W przypadku szkody, wielu ubezpieczycieli może
              odmówić wypłaty odszkodowania, jeśli nieruchomość nie miała
              przeprowadzonych wymaganych przeglądów technicznych, takich jak
              przegląd instalacji elektrycznej, gazowej czy ogólny przegląd
              budynku. Brak tych przeglądów może być traktowany jako zaniedbanie
              obowiązków właściciela lub zarządcy budynku, co z kolei daje
              ubezpieczycielowi podstawy do ograniczenia lub całkowitego
              odmówienia wypłaty odszkodowania.
            </span>
          </div>
        </div>
        <div className="container_warning">
          <h2>DLACZEGO NIE WARTO RYZYKOWAĆ?</h2>
          <p>
            Czy masz świadomość, że brak aktualnych przeglądów technicznych może
            spowodować problemy przy uzyskaniu odszkodowania od ubezpieczyciela?
            Towarystwa ubezpieczeniowe często stosują zapis w Ogólnych Warunkach
            Ubezpieczenia, zgodnie z którym właściciel nieruchomości ma
            obowiązek użytkować budynek oraz jego instalacje w sposób zgodny z
            wymaganiami określonymi w Prawie budowlanym. Regularne przeglądy
            techniczne to Twoje zabezpieczenie na wypadek szkody i gwarancja
            pełnej ochrony ubezpieczeniowej.
          </p>
        </div>
        <div className="container_blog">
          <div className="blog blog_one">
            <div className="blog_left">
              <img src="/images/blog01.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Przeglądy techniczne: instalacja gazowa – obowiązki ustawowe
                właściciela
              </h3>
              <p>
                Ten poradnik ma na celu szczegółowe wyjaśnienie obowiązków
                ustawowych właściciela domu w zakresie przeglądów instalacji
                gazowej, abyś mógł świadomie i odpowiedzialnie zarządzać
                bezpieczeństwem swojego domu.
              </p>
              <a
                href="https://przeglady-domu.com/blogDB?openPost=2SRu4Riow0NAGtObFULo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="blog_button">Przeczytaj całość</button>
              </a>
            </div>
          </div>
          <div className="blog blog_two">
            <div className="blog_left">
              <img src="/images/blog02.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Przepisy dotyczące modernizacji instalacji gazowej w Polsce
              </h3>
              <p>
                Prawo budowlane pozostawia duże pole do indywidualnej
                interpretacji, szczególnie jeśli chodzi o instalacje budowlane.
                Wprowadzono rozróżnienie na remont, przebudowę i instalację
                nową, co oznacza, że każdy rodzaj pracy może podlegać innym
                wymaganiom formalnym i technicznym.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>

          <div className="blog blog_three">
            <div className="blog_left">
              <img src="/images/went4.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Zmiany w przepisach prawa dotyczących montażu nawiewników
                okiennych, szczególnie w kuchniach z kuchenką gazową
              </h3>
              <p>
                Montaż nawiewników okiennych stał się kluczowym elementem
                przepisów dotyczących prawidłowej wentylacji budynków
                mieszkalnych. Jest to szczególnie istotne w kuchniach
                wyposażonych w urządzenia gazowe, gdzie odpowiedni dopływ
                świeżego powietrza warunkuje prawidłowe i bezpieczne spalanie
                gazu.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrzegladG;
```

## File: `src/routes/PrzegladG/przegladG.scss` <a id="file-src-routes-przegladg-przegladg-scss"></a>

```scss
.przeglad-gazowy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 80px 0 0 0;

  background-color: #ffffff;
  font-family: "ProductSans";

  .container_info {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;

    h1 {
      width: 100%;
      text-align: center;
      font-family: "ProductSans";
      font-weight: 100;
      font-size: 128px;

      color: #333;
      margin-bottom: 20px;
    }

    .textsAndButton {
      display: flex;
      .left {
        flex: 3;
        padding: 0 30px;

        .description {
          font-size: 32px;
          line-height: 1.5;
          font-weight: 100;
          color: #555;
          margin-bottom: 80px;
        }

        .cta {
          background-color: #506446;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 14px 26px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #c3d4b4;
            color: #506446;
          }
        }
      }
    }

    .right {
      flex: 2;
      padding: 0 30px;
      font-family: "ProductSans";
      font-weight: 100;

      .steps {
        font-size: 22px;
        color: #666;

        p {
          font-weight: 400;
          margin-bottom: 10px;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 12px;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .container_faq {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 80px;
    align-items: center;

    .faq_one,
    .faq_two,
    .faq_three {
      max-width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
      margin-bottom: 50px;

      p {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 10px;
        text-align: center;
      }
      span {
        font-size: 24px;
        font-weight: 100;
        margin-bottom: 10px;
      }
      .cta {
        background-color: #506446;
        color: white;
        border: none;
        border-radius: 30px;
        padding: 14px 26px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: background-color 0.3s ease;
        max-width: 400px;
        margin-top: 40px;

        &:hover {
          background-color: #c3d4b4;
          color: #506446;
        }
      }
    }
  }

  .container_warning {
    background-color: #bcd7ff;
    width: 100%;
    margin-left: calc(-50vw + 50%);
    padding: 60px 120px;

    h2 {
      font-size: 64px;
      font-family: "ProductSans";
      font-weight: 400;
      margin-bottom: 40px;
    }
    p {
      font-size: 32px;
      max-width: 1000px;
      font-family: "ProductSans";
      font-weight: 100;
    }
  }
  .container_blog {
    display: flex;
    flex-direction: column;
    padding: 100px 40px;
    gap: 40px;
    .blog {
      display: flex;
      gap: 30px;
      .blog_left {
        display: flex;
        img {
          width: 300px;
          height: auto;
        }
      }

      .blog_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h3 {
          font-family: "ProductSans";
          font-weight: 400;
          font-size: 26px;
        }
        p {
          font-family: "ProductSans";
          font-weight: 100;
          font-size: 16px;
        }
        button {
          background-color: #bcd7ff;
          border: none;
          margin: 0 0 0 auto;
          padding: 8px 45px;
          border-radius: 20px;
        }
      }
    }
  }
}

@media (max-width: 960px) {
  .przeglad-budowlany {
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;

    .container_info {
      padding: 80px 0px;
      gap: 20px;

      h1 {
        font-size: 64px;
        margin-bottom: 10px;
      }

      .textsAndButton {
        flex-direction: column;
        align-items: center;

        .left {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 0;

          .description {
            font-size: 24px;
            margin-bottom: 40px;
            text-align: left;
          }
          .cta {
            // align-self: flex-end;
          }
        }
        .right {
          padding: 0;
          // text-align: center;
          margin-top: 50px;

          .steps {
            font-size: 18px;
            text-align: left;
          }
        }
      }
    }

    .container_faq {
      margin-top: 0px;
    }

    .container_warning {
      padding: 60px 40px;
      margin-left: 0;
      h2 {
        font-size: 42px;
      }
      p {
        font-size: 22px;
      }
    }

    .container_blog {
      .blog {
        flex-direction: column;
        gap: 30px;
        .blog_left {
          img {
            width: 100%;
            height: auto;
          }
        }
        .blog_right {
          gap: 10px;

          h3 {
            font-size: 22px;
          }
        }
      }
    }
  }
}
```

## File: `src/routes/PrzegladW/PrzegladW.jsx` <a id="file-src-routes-przegladw-przegladw-jsx"></a>

```jsx
import React, { useEffect, useState } from "react";
import "./przegladW.scss";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PrzegladW = ({ user, isPanelOpen, setIsPanelOpen }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    setTimeout(() => {
      navigate("/", { state: { scrollTo: id } });
    }, 300);
  };

  useEffect(() => {
    if (user) {
      setUserPhoto(user.photoURL || "images/user-50.png");
    } else {
      setUserPhoto("images/user-50.png");
    }
  }, [user]);
  return (
    <>
      <Helmet>
        <title>Przegląd Wentylacyjny Gliwice & Śląsk | Drożność Kominów</title>
        <meta name="description" content="Profesjonalne przeglądy instalacji wentylacyjnej i kominowej w Gliwicach. Zadbaj o zdrowie i prawidłową cyrkulację powietrza w swoim domu. Śląskie uprawnienia i rzetelność." />
        <link rel="canonical" href="https://przeglady-domu.com/przeglad-wentylacyjny" />
      </Helmet>
      <section className="przeglad-wentylacyjny">
        <div className="container_info">
          <h1>Przegląd instalacji wentylacyjnej</h1>

          <div className="textsAndButton">
            <div className="left">
              <p className="description">
                Sprawna wentylacja to nie tylko komfort, ale przede wszystkim
                zdrowie domowników. Zgodnie z przepisami należy wykonywać
                regularne przeglądy instalacji wentylacyjnej – zadbaj o to z
                naszą pomocą.
              </p>

              <button className="main_button"
                onClick={() => scrollToSection("inspection-form")}>
                <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
                <div className="btn-icon">
                  <img src={userPhoto} alt="Profil" />
                </div>
              </button>
            </div>
            <div className="right">
              <div className="steps">
                <p>Cały proces w kilku prostych krokach:</p>
                <ul>
                  <li>
                    Wypełnij prosty formularz i wyślij zapytanie bezpośrednio do
                    naszych specjalistów. Masz wątpliwości lub pytania? Nasza
                    asystentka chętnie pomoże.
                  </li>
                  <li>
                    Najczęściej otrzymasz odpowiedź już w ciągu kilku godzin.
                  </li>
                  <li>
                    Wybierz dogodną ofertę i wspólnie ustalcie termin wykonania
                    przeglądu.
                  </li>
                  <li>
                    Po wykonaniu usługi otrzymasz protokół, na podstawie którego
                    łatwo rozliczysz się z wykonawcą.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container_faq">
          <div className="faq faq_one">
            <p>Czym dokładnie jest przegląd techniczny nieruchomości?</p>
            <span>
              Przegląd techniczny nieruchomości to obowiązkowa kontrola stanu
              technicznego budynku, obejmująca jego konstrukcję, instalacje
              (gazową, elektryczną) oraz elementy narażone na działanie
              czynników atmosferycznych i instalacje kominowe. Celem przeglądu
              jest zapewnienie bezpieczeństwa użytkowników budynku oraz zgodność
              obiektu z wymogami prawa budowlanego.
            </span>
            <button className="main_button"
              onClick={() => scrollToSection("inspection-form")}>
              <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
              <div className="btn-icon">
                <img src={userPhoto} alt="Profil" />
              </div>
            </button>
          </div>
          <div className="faq faq_two">
            <p>
              Jakie przeglądy techniczne nieruchomości należy przeprowadzać i
              jak często?
            </p>
            <span>
              Roczne przeglądy: Obejmują elementy budynku narażone na wpływy
              atmosferyczne (np. dach, rynny), instalacje ochrony środowiska
              oraz instalacje kominowe – dymowe, spalinowe i wentylacyjne.
              Przegląd kominiarski jest wymagany co najmniej raz w roku i ma na
              celu sprawdzenie drożności oraz bezpieczeństwa przewodów
              kominowych, co minimalizuje ryzyko pożaru i zapewnia odpowiednią
              wentylację. Pięcioletnie przeglądy: Przeprowadzane co pięć lat,
              obejmują kompleksową ocenę stanu technicznego i przydatności
              budynku do użytkowania. Przegląd pięcioletni obejmuje również
              instalacje elektryczne i piorunochronne, sprawdzenie estetyki
              budynku oraz ocenę innych kluczowych elementów konstrukcji.
            </span>
          </div>
          <div className="faq faq_three">
            <p>
              Czy brak przeglądów technicznych może mieć wpływ na wypłatę
              odszkodowania z polisy ubezpieczeniowej?
            </p>
            <span>
              Tak, zdecydowanie. W przypadku szkody, wielu ubezpieczycieli może
              odmówić wypłaty odszkodowania, jeśli nieruchomość nie miała
              przeprowadzonych wymaganych przeglądów technicznych, takich jak
              przegląd instalacji elektrycznej, gazowej czy ogólny przegląd
              budynku. Brak tych przeglądów może być traktowany jako zaniedbanie
              obowiązków właściciela lub zarządcy budynku, co z kolei daje
              ubezpieczycielowi podstawy do ograniczenia lub całkowitego
              odmówienia wypłaty odszkodowania.
            </span>
          </div>
        </div>
        <div className="container_warning">
          <h2>DLACZEGO NIE WARTO RYZYKOWAĆ?</h2>
          <p>
            Czy masz świadomość, że brak aktualnych przeglądów technicznych może
            spowodować problemy przy uzyskaniu odszkodowania od ubezpieczyciela?
            Towarystwa ubezpieczeniowe często stosują zapis w Ogólnych Warunkach
            Ubezpieczenia, zgodnie z którym właściciel nieruchomości ma
            obowiązek użytkować budynek oraz jego instalacje w sposób zgodny z
            wymaganiami określonymi w Prawie budowlanym. Regularne przeglądy
            techniczne to Twoje zabezpieczenie na wypadek szkody i gwarancja
            pełnej ochrony ubezpieczeniowej.
          </p>
        </div>
        <div className="container_blog">
          <div className="blog blog_one">
            <div className="blog_left">
              <img src="/images/blog01.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>Na czym polega przegląd budowlany?</h3>
              <p>
                Regularny przegląd budowlany to gwarancja bezpieczeństwa i
                długowieczności Twojej nieruchomości. Dowiedz się, jak przebiega
                taka kontrola i dlaczego warto ją przeprowadzać zgodnie z
                obowiązującymi przepisami.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>
          <div className="blog blog_two">
            <div className="blog_left">
              <img src="/images/blog02.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Przepisy dotyczące modernizacji instalacji gazowej w Polsce
              </h3>
              <p>
                Prawo budowlane pozostawia duże pole do indywidualnej
                interpretacji, szczególnie jeśli chodzi o instalacje budowlane.
                Wprowadzono rozróżnienie na remont, przebudowę i instalację
                nową, co oznacza, że każdy rodzaj pracy może podlegać innym
                wymaganiom formalnym i technicznym.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>

          <div className="blog blog_three">
            <div className="blog_left">
              <img src="/images/went4.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Zmiany w przepisach prawa dotyczących montażu nawiewników
                okiennych, szczególnie w kuchniach z kuchenką gazową
              </h3>
              <p>
                Montaż nawiewników okiennych stał się kluczowym elementem
                przepisów dotyczących prawidłowej wentylacji budynków
                mieszkalnych. Jest to szczególnie istotne w kuchniach
                wyposażonych w urządzenia gazowe, gdzie odpowiedni dopływ
                świeżego powietrza warunkuje prawidłowe i bezpieczne spalanie
                gazu.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrzegladW;
```

## File: `src/routes/PrzegladW/przegladW.scss` <a id="file-src-routes-przegladw-przegladw-scss"></a>

```scss
.przeglad-wentylacyjny {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 80px 0 0 0;

  background-color: #ffffff;
  font-family: "ProductSans";

  .container_info {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;

    h1 {
      width: 100%;
      text-align: center;
      font-family: "ProductSans";
      font-weight: 100;
      font-size: 128px;

      color: #333;
      margin-bottom: 20px;
    }

    .textsAndButton {
      display: flex;
      .left {
        flex: 3;
        padding: 0 30px;

        .description {
          font-size: 32px;
          line-height: 1.5;
          font-weight: 100;
          color: #555;
          margin-bottom: 80px;
        }

        .cta {
          background-color: #506446;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 14px 26px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #c3d4b4;
            color: #506446;
          }
        }
      }
    }

    .right {
      flex: 2;
      padding: 0 30px;
      font-family: "ProductSans";
      font-weight: 100;

      .steps {
        font-size: 22px;
        color: #666;

        p {
          font-weight: 400;
          margin-bottom: 10px;
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 12px;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .container_faq {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 80px;
    align-items: center;

    .faq_one,
    .faq_two,
    .faq_three {
      max-width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
      margin-bottom: 50px;

      p {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 10px;
        text-align: center;
      }
      span {
        font-size: 24px;
        font-weight: 100;
        margin-bottom: 10px;
      }
      .cta {
        background-color: #506446;
        color: white;
        border: none;
        border-radius: 30px;
        padding: 14px 26px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: background-color 0.3s ease;
        max-width: 400px;
        margin-top: 40px;

        &:hover {
          background-color: #c3d4b4;
          color: #506446;
        }
      }
    }
  }

  .container_warning {
    background-color: #bcd7ff;
    width: 100%;
    margin-left: calc(-50vw + 50%);
    padding: 60px 120px;

    h2 {
      font-size: 64px;
      font-family: "ProductSans";
      font-weight: 400;
      margin-bottom: 40px;
    }
    p {
      font-size: 32px;
      max-width: 1000px;
      font-family: "ProductSans";
      font-weight: 100;
    }
  }
  .container_blog {
    display: flex;
    flex-direction: column;
    padding: 100px 40px;
    gap: 40px;
    .blog {
      display: flex;
      gap: 30px;
      .blog_left {
        display: flex;
        img {
          width: 300px;
          height: auto;
        }
      }

      .blog_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h3 {
          font-family: "ProductSans";
          font-weight: 400;
          font-size: 26px;
        }
        p {
          font-family: "ProductSans";
          font-weight: 100;
          font-size: 16px;
        }
        button {
          background-color: #bcd7ff;
          border: none;
          margin: 0 0 0 auto;
          padding: 8px 45px;
          border-radius: 20px;
        }
      }
    }
  }
}

@media (max-width: 960px) {
  .przeglad-budowlany {
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;

    .container_info {
      padding: 80px 0px;
      gap: 20px;

      h1 {
        font-size: 64px;
        margin-bottom: 10px;
      }

      .textsAndButton {
        flex-direction: column;
        align-items: center;

        .left {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 0;

          .description {
            font-size: 24px;
            margin-bottom: 40px;
            text-align: left;
          }
          .cta {
            // align-self: flex-end;
          }
        }
        .right {
          padding: 0;
          // text-align: center;
          margin-top: 50px;

          .steps {
            font-size: 18px;
            text-align: left;
          }
        }
      }
    }

    .container_faq {
      margin-top: 0px;
    }

    .container_warning {
      padding: 60px 40px;
      margin-left: 0;
      h2 {
        font-size: 42px;
      }
      p {
        font-size: 22px;
      }
    }

    .container_blog {
      .blog {
        flex-direction: column;
        gap: 30px;
        .blog_left {
          img {
            width: 100%;
            height: auto;
          }
        }
        .blog_right {
          gap: 10px;

          h3 {
            font-size: 22px;
          }
        }
      }
    }
  }
}
```

## File: `src/routes/SingleBlogPost/SingleBlogPost.jsx` <a id="file-src-routes-singleblogpost-singleblogpost-jsx"></a>

```jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import deburr from "lodash/deburr";
import "./singleBlogPost.scss";

export default function SingleBlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [allPosts, setAllPosts] = useState([]);

    // Comments state
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Helper to create slug (ensure consistency)
    const createSlug = (title) =>
        deburr(title)
            .toLowerCase()
            .replace(/[^a-z0-9\s]/gi, "")
            .replace(/\s+/g, "-");

    // Helper to safely parse any date format (Phase 7 fix)
    const safeGetDate = (dateVal) => {
        if (!dateVal) return null;
        // Handle Firestore Timestamp
        if (dateVal && typeof dateVal.toDate === "function") {
            return dateVal.toDate();
        }
        if (dateVal && dateVal.seconds !== undefined) {
            return new Date(dateVal.seconds * 1000);
        }
        // Handle string or JS Date
        const d = new Date(dateVal);
        return isNaN(d.getTime()) ? null : d;
    };

    // Auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Scroll to top when post changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                const postsArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllPosts(postsArray);

                // Find current post
                const foundPost = postsArray.find(p => createSlug(p.title) === slug);
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    // Handle 404 or redirect
                    console.log("Post not found");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [slug]);

    // Fetch comments
    useEffect(() => {
        if (!post?.id) return;
        const commentsRef = collection(db, "posts", post.id, "comments");
        const q = query(commentsRef, orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedComments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(fetchedComments);
        });
        return () => unsubscribe();
    }, [post?.id]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate(`/login?redirect=blogPost&postSlug=${slug}&afterLogin=1`);
            return;
        }
        if (!newComment.trim()) return;
        try {
            const commentsRef = collection(db, "posts", post.id, "comments");
            await addDoc(commentsRef, {
                content: newComment,
                userEmail: user.email,
                userId: user.uid,
                timestamp: serverTimestamp(),
            });
            setNewComment("");
        } catch (error) {
            console.error("Błąd przy dodawaniu komentarza:", error);
        }
    };

    if (loading) return <div className="blog-loader">Ładowanie...</div>;
    if (!post) return <div className="blog-error">Nie znaleziono wpisu.</div>;

    const validDate = safeGetDate(post.date);
    const dateStr = validDate ? validDate.toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }) : "";

    const isoDate = validDate ? validDate.toISOString() : new Date().toISOString();

    return (
        <div className="single-blog-post-page">
            <nav className="post-breadcrumbs">
                <Link to="/">Główna</Link>
                <span className="separator">/</span>
                <Link to="/blogDB">Poradniki</Link>
                <span className="separator">/</span>
                <span className="current">{post.title}</span>
            </nav>
            <Helmet>
                <title>{post.title} | Przeglądy Techniczne Nieruchomości</title>
                <meta name="description" content={post.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 160)} />
                <link rel="canonical" href={`https://przeglady-domu.com/blogDB/${slug}`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://przeglady-domu.com/blogDB/${slug}`} />
                <meta property="og:title" content={`${post.title} | Przeglądy Techniczne Nieruchomości`} />
                <meta property="og:description" content={post.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 160)} />
                <meta property="og:image" content={post.src} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://przeglady-domu.com/blogDB/${slug}`} />
                <meta property="twitter:title" content={`${post.title} | Przeglądy Techniczne Nieruchomości`} />
                <meta property="twitter:description" content={post.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 160)} />
                <meta property="twitter:image" content={post.src} />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": "${post.title}",
                            "image": [
                                "${post.src}"
                            ],
                            "datePublished": "${isoDate}",
                            "dateModified": "${isoDate}",
                            "author": [{
                                "@type": "Person",
                                "name": "Przemek Rakotny",
                                "url": "https://przeglady-domu.com/o-mnie"
                            }]
                        }
                    `}
                </script>
            </Helmet>

            <header className="post-header">
                <div className="header-content">
                    <div className="categories">
                        {post.categories?.map((cat) => (
                            <span key={cat} className="category-tag">{cat}</span>
                        ))}
                    </div>
                    <h1>{post.title}</h1>
                    <div className="post-meta">
                        <span className="date">{dateStr}</span>
                        <span className="author">Autor: Przemek Rakotny</span>
                    </div>
                </div>
                <div className="header-image-container">
                    <img
                        src={post.src || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"}
                        alt={post.title}
                        className="header-image"
                    />
                </div>
            </header>

            <main className="post-content-wrapper">
                <article className="post-content">
                    {post.content && (
                        <div className="post-lead" dangerouslySetInnerHTML={{ __html: post.content }} />
                    )}
                    <div dangerouslySetInnerHTML={{ __html: post.content2 || "" }} />

                    {post.tags && post.tags.length > 0 && (
                        <div className="post-tags-section">
                            {post.tags.map((tag) => (
                                <span key={tag} className="post-tag">#{tag}</span>
                            ))}
                        </div>
                    )}

                    <div className="seo-expert-block">
                        <div className="expert-badge">Inżynier Radzi</div>
                        <h4>Przeglądy techniczne nieruchomości a bezpieczeństwo</h4>
                        <p>
                            Jako inżynier z wieloletnim doświadczeniem przypominam, że regularne <strong>przeglądy techniczne nieruchomości</strong> są nie tylko wymogiem prawnym, ale przede wszystkim gwarancją bezpieczeństwa Twojej rodziny. Nie zwlekaj z kontrolą do wystąpienia awarii.
                        </p>
                    </div>

                    <div className="post-cta">
                        <h3>Potrzebujesz przeglądu technicznego nieruchomości?</h3>
                        <p>Skontaktuj się ze mną, aby umówić profesjonalny przegląd Twojego domu lub mieszkania.</p>
                        <Link to="/#scope-container" className="btn-cta">Zobacz Ofertę</Link>
                    </div>
                </article>

                <div className="comments-section-wrapper" id="commentsSection">
                    <h3>Komentarze ({comments.length})</h3>

                    {comments.length === 0 ? (
                        <p className="no-comments">Brak komentarzy. Bądź pierwszy!</p>
                    ) : (
                        <ul className="comments-list">
                            {comments.map((comment) => {
                                const emailPrefix = comment.userEmail?.split("@")[0] || "Anonim";
                                return (
                                    <li key={comment.id} className="comment-item">
                                        <div className="comment-header">
                                            <strong>{emailPrefix}</strong>
                                            <span>
                                                {comment.timestamp?.toDate().toLocaleString("pl-PL") || ""}
                                            </span>
                                        </div>
                                        <div className="comment-content">{comment.content}</div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <div className="comment-form">
                        {user ? (
                            <form onSubmit={handleAddComment}>
                                <textarea
                                    placeholder="Napisz komentarz..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button type="submit" className="btn-submit-comment">Dodaj komentarz</button>
                            </form>
                        ) : (
                            <div className="login-prompt">
                                <p>
                                    Musisz być zalogowany, aby dodać komentarz.{" "}
                                    <Link
                                        to={`/login?redirect=blogPost&postSlug=${slug}&afterLogin=1`}
                                    >
                                        Zaloguj się
                                    </Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <div className="read-next">
                <h3>Zobacz także</h3>
                <div className="read-next-grid">
                    {allPosts
                        .filter(p => p.id !== post.id && p.type !== 'CategoriesPost')
                        .sort((a, b) => {
                            // Boost posts with shared categories
                            const aShared = a.categories?.filter(c => post.categories?.includes(c)).length || 0;
                            const bShared = b.categories?.filter(c => post.categories?.includes(c)).length || 0;
                            return bShared - aShared;
                        })
                        .slice(0, 3)
                        .map(p => (
                            <div key={p.id} className="read-next-card" onClick={() => navigate(`/blogDB/${createSlug(p.title)}`)}>
                                <img src={p.src} alt={p.title} />
                                <h4>{p.title}</h4>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
```

## File: `src/routes/SingleBlogPost/singleBlogPost.scss` <a id="file-src-routes-singleblogpost-singleblogpost-scss"></a>

```scss
@import "../../styles/variables";

.single-blog-post-page {
  animation: fadeIn 0.5s ease;
  background-color: $color-background;
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 80px;

  .post-breadcrumbs {
    max-width: 1200px;
    margin: 0 auto 10px auto;
    padding: 0 40px;
    font-family: $font-secondary;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.5);

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: $color-primary;
      }
    }

    .separator {
      margin: 0 8px;
      opacity: 0.4;
    }

    .current {
      color: rgba(0, 0, 0, 0.8);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      max-width: 200px;
      vertical-align: bottom;
    }

    @media (max-width: 768px) {
      padding: 0 20px;

      .current {
        max-width: 150px;
      }
    }
  }

  .post-header {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
    text-align: center;

    .categories {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-bottom: 20px;

      .category-tag {
        background-color: rgba($color-primary, 0.1);
        color: $color-primary;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    h1 {
      font-family: $font-family-primary;
      font-size: 3rem;
      color: $color-text-primary;
      margin-bottom: 20px;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }
    }

    .post-meta {
      color: $color-text-secondary;
      font-size: 16px;
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-bottom: 40px;

      @media (max-width: 768px) {
        font-size: 14px;
        margin-bottom: 20px;
        gap: 10px;
      }
    }
  }

  .header-image-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.post-content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;

  .post-content {
    font-size: 18px;
    line-height: 1.8;
    color: $color-text-primary;
    margin-bottom: 60px;

    .post-lead {
      font-size: 1.25rem;
      font-weight: 500;
      color: $color-text-primary;
      margin-bottom: 40px;
      line-height: 1.6;
      border-left: 4px solid $color-primary;
      padding-left: 20px;
      font-style: italic;
    }

    p {
      margin-bottom: 24px;
    }

    h2,
    h3 {
      margin-top: 40px;
      margin-bottom: 20px;
      color: $color-text-primary;
    }

    img {
      max-width: 100%;
      border-radius: 12px;
      margin: 20px 0;
    }

    ul,
    ol {
      margin-bottom: 24px;
      padding-left: 20px;
    }

    .post-tags-section {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);

      .post-tag {
        background-color: rgba($color-primary, 0.05);
        color: $color-primary;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        cursor: default;
        transition: all 0.2s;

        &:hover {
          background-color: rgba($color-primary, 0.1);
          transform: translateY(-1px);
        }
      }
    }
  }
}

.comments-section-wrapper {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
    color: $color-text-primary;
  }

  .no-comments {
    color: $color-text-secondary;
    font-style: italic;
    margin-bottom: 30px;
  }

  .comments-list {
    list-style: none;
    padding: 0;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .comment-item {
      background: #ffffff;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
      border: 1px solid rgba(0, 0, 0, 0.05);

      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        strong {
          font-weight: 700;
          color: $color-text-primary;
          font-size: 15px;
        }

        span {
          color: $color-text-secondary;
          font-size: 13px;
        }
      }

      .comment-content {
        font-size: 15px;
        line-height: 1.6;
        color: $color-text-primary;
      }
    }
  }

  .comment-form {
    background: rgba($color-primary, 0.03);
    padding: 30px;
    border-radius: 20px;
    margin-top: 40px;

    textarea {
      width: 100%;
      height: 120px;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      font-family: inherit;
      font-size: 15px;
      margin-bottom: 16px;
      resize: none;
      background: white;
      transition: border-color 0.2s, box-shadow 0.2s;

      &:focus {
        outline: none;
        border-color: $color-primary;
        box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
      }
    }

    .btn-submit-comment {
      padding: 12px 28px;
      background: $color-primary;
      color: white;
      border: none;
      border-radius: 100px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 15px;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba($color-primary, 0.25);
        background: lighten($color-primary, 5%);
      }
    }

    .login-prompt {
      color: $color-text-secondary;
      font-size: 15px;
      text-align: center;
      padding: 20px 0;

      a {
        color: $color-primary;
        font-weight: 700;
        text-decoration: none;
        margin-left: 5px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.seo-expert-block {
  background: white;
  padding: 30px;
  border-radius: 20px;
  border-left: 6px solid $color-primary;
  margin-top: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;

  &::after {
    content: '"';
    position: absolute;
    top: -10px;
    right: 20px;
    font-size: 120px;
    color: rgba($color-primary, 0.05);
    font-family: serif;
  }

  .expert-badge {
    display: inline-block;
    background: $color-primary;
    color: white;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 20px;
    color: $color-text-primary;
  }

  p {
    margin-bottom: 0;
    font-size: 16px;
    color: $color-text-secondary;
    line-height: 1.6;

    strong {
      color: $color-text-primary;
    }
  }
}

.read-next {
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 0 20px;

  h3 {
    font-size: 24px;
    margin-bottom: 30px;
    text-align: center;
  }

  .read-next-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .read-next-card {
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-5px);
      }

      img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 16px;
        margin-bottom: 12px;
      }

      h4 {
        font-size: 18px;
        font-weight: 600;
        color: $color-text-primary;
      }
    }
  }
}

.post-cta {
  background: $color-paper-white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  margin: 60px auto 0;
  max-width: 800px;
  border: 2px solid $color-anthracite;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: $color-anthracite;
    font-family: $font-family-primary;
    font-size: 26px;
    font-weight: 700;
  }

  p {
    margin-bottom: 25px;
    color: $color-anthracite;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
  }

  .btn-cta {
    display: inline-block;
    padding: 16px 36px;
    background: $color-anthracite;
    color: $color-white;
    text-decoration: none;
    font-weight: 700;
    border-radius: 100px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      background: darken($color-anthracite, 5%);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
```

## File: `src/routes/ThankYouPage/ThankYouPage.jsx` <a id="file-src-routes-thankyoupage-thankyoupage-jsx"></a>

```jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./ThankYouPage.scss";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <CheckCircleOutlineIcon className="success-icon" />
        <h1>Dziękuję za zapytanie!</h1>
        <p className="highlight-text">Twój numer jest u mnie.</p>
        <p className="details-text">
          Będę dzwonił w ciągu najbliższych 24 godzin z numeru <strong>500-XXX-XXX</strong>. 
          Przygotuj proszę informację o metrażu domu.
        </p>
        <button onClick={() => navigate("/")} className="back-btn">
          Wróć do strony głównej
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
```

## File: `src/routes/ThankYouPage/ThankYouPage.scss` <a id="file-src-routes-thankyoupage-thankyoupage-scss"></a>

```scss
@import "../../styles/variables.scss";

.thank-you-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f9fc;
  padding: 20px;
  font-family: inherit; // or $font-primary if defined

  .thank-you-content {
    background: #ffffff;
    padding: 60px 40px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    text-align: center;
    max-width: 600px;
    width: 100%;

    .success-icon {
      font-size: 80px;
      color: #4CAF50;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 32px;
      color: #1f2937;
      margin-bottom: 15px;
      font-weight: 700;
    }

    .highlight-text {
      font-size: 20px;
      color: #f97316;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .details-text {
      font-size: 18px;
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 30px;

      strong {
        color: #ef4444;
      }
    }

    .back-btn {
      background-color: #f3f4f6;
      color: #374151;
      border: none;
      padding: 12px 30px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: #e5e7eb;
      }
    }
  }
}

@media (max-width: 768px) {
  .thank-you-page {
    .thank-you-content {
      padding: 40px 20px;
      
      h1 {
        font-size: 26px;
      }
      .details-text {
        font-size: 16px;
      }
    }
  }
}
```

## File: `src/routes/UserDashboard/UserDashboard.jsx` <a id="file-src-routes-userdashboard-userdashboard-jsx"></a>

```jsx
// UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import "./userDashboard.scss";

export default function UserDashboard({ user }) {
  const [cart, setCart] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  // States for Date Change Modal
  const [editingItemId, setEditingItemId] = useState(null);
  const [newDate, setNewDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const userCartRef = collection(db, "userCarts");
      const snapshot = await getDocs(
        query(userCartRef, where("userId", "==", user.uid))
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCart(data);
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userToken");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Czy chcesz usunąć to zgłoszenie?")) {
      await deleteDoc(doc(db, "userCarts", id));
      setCart((prev) => prev.filter((item) => item.id !== id));
      setActiveMenu(null);
    }
  };

  // --- Otwiera okienko edycji daty ---
  const handleOpenDateChange = (item) => {
    setEditingItemId(item.id);
    // Ustawiamy domyślną wartość inputa na to, co już było (lub pustą, żeby wybrać nową)
    if (item.scheduledDate) {
      const d = new Date(item.scheduledDate);
      if (!isNaN(d)) {
        const localDateTime = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        setNewDate(localDateTime);
      } else {
        setNewDate(item.scheduledDate);
      }
    } else {
      setNewDate("");
    }
    setActiveMenu(null); // Zamykamy małe menu z opcjami ("Usuń", "Zmień termin")
  };

  // --- Zapisuje wybraną datę do bazy ---
  const saveNewDate = async () => {
    if (!newDate) {
      alert("Proszę wybrać poprawną datę.");
      return;
    }
    try {
      const itemRef = doc(db, "userCarts", editingItemId);
      await updateDoc(itemRef, {
        scheduledDate: newDate,
        status: "KLIENT PROPONUJE TERMIN"
      });

      // Aktualizujemy lokalny stan, by UI natychmiast wychwyciło zmianę
      setCart((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? { ...item, scheduledDate: newDate, status: "KLIENT PROPONUJE TERMIN" }
            : item
        )
      );

      setEditingItemId(null); // Zamyka modal
    } catch (error) {
      console.error("Błąd podczas aktualizacji daty:", error);
      alert("Nie udało się zaktualizować terminu. Spróbuj ponownie.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const getStatus = (item) => {
    if (item.status) return item.status;
    return item.scheduledDate ? "Termin ustalony" : "W trakcie ustaleń";
  };

  const handleAcceptDate = async (id) => {
    try {
      const itemRef = doc(db, "userCarts", id);
      await updateDoc(itemRef, { status: "ZATWIERDZONY" });
      setCart((prev) => prev.map((item) => item.id === id ? { ...item, status: "ZATWIERDZONY" } : item));
    } catch (error) {
      console.error("Error accepting date:", error);
      alert("Nie udało się zaakceptować terminu.");
    }
  };

  const handleRejectDate = async (id) => {
    try {
      const itemRef = doc(db, "userCarts", id);
      await updateDoc(itemRef, { status: "DO ZMIANY" });
      setCart((prev) => prev.map((item) => item.id === id ? { ...item, status: "DO ZMIANY" } : item));
    } catch (error) {
      console.error("Error rejecting date:", error);
      alert("Nie udało się odrzucić terminu.");
    }
  };

  const getPreferredDateLabel = (val) => {
    if (val === "pilne") return "jak najszybciej";
    if (val === "miesiac") return "w przyszłym miesiącu";
    if (val === "inny") return "w innym terminie";
    return val || "brak sugestii";
  };

  const getInspectionsList = (inspections) => {
    if (!inspections) return "brak";
    return Object.entries(inspections)
      .filter(([_, checked]) => checked)
      .map(([key]) => {
        switch (key) {
          case "specjalista": return "odbiór techniczny";
          case "budowlany": return "przegląd budowlany";
          case "gaz": return "instalacja gazowa";
          case "elektryka": return "instalacja elektryczna";
          case "wentylacja": return "wentylacja";
          default: return key;
        }
      })
      .join(", ") || "brak";
  };

  return (
    <div className="user-dashboard-wrapper">
      <div className="user-dashboard">
        {user ? (
          <>
            <header className="header">
              <div className="header-titles">
                <h2>Twoje zgłoszenia</h2>
                <p className="user-email">Zalogowano jako: <strong>{user.email}</strong></p>
              </div>
              <div className="header-actions">
                <button className="btn-home" onClick={handleGoHome}>
                  Wróć na stronę główną
                </button>
                <button className="btn-logout" onClick={handleLogout}>
                  Wyloguj się
                </button>
              </div>
            </header>

            {cart.length === 0 ? (
              <div className="empty-state">
                <p>Brak zgłoszeń. Wypełnij formularz, aby rozpocząć współpracę.</p>
                <button className="btn-cta" onClick={() => navigate("/", { state: { scrollTo: "inspection-form" } })}>
                  Zamów przegląd
                </button>
              </div>
            ) : (
              <div className="submissions">
                {cart.map((item) => (
                  <div key={item.id} className="submission">
                    <div className="submission-info">
                      <strong>
                        {item.property?.propertyType || "Typ nieruchomości"}
                      </strong>
                      <p>
                        Adres: {item.property?.propertyAddress},{" "}
                        {item.property?.nearestCity}
                      </p>
                      <p>
                        Zakres prac: {getInspectionsList(item.property?.inspections)}
                      </p>
                      <p>
                        Preferowany czas (sugestia): {getPreferredDateLabel(item.property?.preferredDate)}
                      </p>

                      <p className={`status-badge ${item.status === "ZATWIERDZONY" ? "confirmed" :
                        item.status === "OCZEKUJE NA AKCEPTACJĘ" ? "pending-action" :
                          item.status === "KLIENT PROPONUJE TERMIN" ? "pending" :
                            item.status === "DO ZMIANY" ? "needs-attention" :
                              item.scheduledDate ? "confirmed" : "pending"
                        }`}>
                        Status: {getStatus(item)}
                      </p>

                      {item.scheduledDate ? (
                        <div className="scheduled-date-container">
                          <p className="scheduled-date">Termin: <strong>{formatDate(item.scheduledDate)}</strong></p>
                          {item.status !== "ZATWIERDZONY" && (
                            <button className="btn-propose-inline" onClick={() => handleOpenDateChange(item)}>
                              ✏️ Zmień termin
                            </button>
                          )}

                          {item.status === "OCZEKUJE NA AKCEPTACJĘ" && (
                            <div className="date-approval-actions">
                              <button className="btn-accept" onClick={() => handleAcceptDate(item.id)}>✓ Akceptuj termin</button>
                              <button className="btn-reject" onClick={() => handleRejectDate(item.id)}>✕ Odrzuć</button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="scheduled-date-container">
                          <div className="offer-notification" style={{ backgroundColor: '#e9f5ff', borderLeft: '4px solid #007bff', padding: '10px', marginBottom: '15px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '1.2rem' }}>📩</span>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#0056b3', lineHeight: '1.4' }}>
                              Mamy to! Trwa analiza Twojego zgłoszenia.<br />
                              <strong>Niebawem wyślemy do Ciebie maila i SMS z przygotowaną ofertą.</strong>
                            </p>
                          </div>
                          <button className="btn-propose-inline" onClick={() => handleOpenDateChange(item)}>
                            📅 Zaproponuj termin
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="submission-actions">
                      <button onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}>
                        <MoreVertIcon />
                      </button>
                      {activeMenu === item.id && (
                        <div className="submission-menu">
                          <button onClick={() => handleDelete(item.id)} className="danger">
                            🗑️ Usuń zgłoszenie
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MODAL DO ZMIANY DATY */}
            {editingItemId && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Zmień termin realizacji</h3>
                    <CloseIcon
                      className="close-icon"
                      onClick={() => setEditingItemId(null)}
                    />
                  </div>
                  <p className="modal-desc">Wybierz nową datę wizyty naszego fachowca poniżej. Zmiana zostanie zapisana w systemie i zaktualizuje Twój wniosek.</p>
                  <input
                    type="datetime-local"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="date-picker-input"
                  />
                  <div className="modal-buttons">
                    <button className="btn-cancel" onClick={() => setEditingItemId(null)}>
                      Anuluj
                    </button>
                    <button className="btn-save" onClick={saveNewDate}>
                      Zapisz nową datę
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Widok wylogowany / logowanie */}
            <h3>
              <span style={{ fontSize: "30px" }}>
                panel użytkownika <br />
              </span>
              <span style={{ fontSize: "16px", color: "#666" }}>
                Zarządzaj swoimi zleceniami przeglądów budowlanych w jednym miejscu.
              </span>
            </h3>
            <button className="main_button" onClick={() => navigate("/login")}>
              Zaloguj się
            </button>
            <button className="secondary_button" onClick={handleGoHome} style={{ marginTop: '15px' }}>
              Wróć na stronę główną
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

## File: `src/routes/UserDashboard/userDashboard.scss` <a id="file-src-routes-userdashboard-userdashboard-scss"></a>

```scss
.user-dashboard-wrapper {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
}

.user-dashboard {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'ProductSans', sans-serif;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eaeaea;

    .header-titles {
      display: flex;
      flex-direction: column;
      gap: 4px;

      h2 {
        font-family: 'Domine', serif;
        font-weight: 700;
        font-size: 28px;
        color: #333;
        margin: 0;
      }

      .user-email {
        margin: 0;
        font-size: 15px;
        color: #666;

        strong {
          font-weight: 600;
          color: #222;
        }
      }
    }

    .header-actions {
      display: flex;
      gap: 15px;

      button {
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.3s ease;
        border: none;
      }

      .btn-home {
        background-color: transparent;
        color: #b11919;
        border: 1px solid #b11919;

        &:hover {
          background-color: #fcf1f1;
        }
      }

      .btn-logout {
        background-color: #b11919;
        color: #fff;

        &:hover {
          background-color: #8c1212;
          box-shadow: 0 2px 8px rgba(177, 25, 25, 0.3);
        }
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 50px 20px;
    background: #fdfdfd;
    border: 1px dashed #ccc;
    border-radius: 10px;

    p {
      font-size: 18px;
      color: #666;
      margin-bottom: 25px;
    }

    .btn-cta {
      background-color: #b11919;
      color: #fff;
      padding: 12px 30px;
      border: none;
      border-radius: 30px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background-color: #8c1212;
        transform: translateY(-2px);
      }
    }
  }

  .submissions {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .submission {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 25px;
      border-radius: 12px;
      background-color: #ffffff;
      border: 1px solid #eee;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
      position: relative;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      }

      .submission-info {
        flex: 1;
        color: #444;

        strong {
          font-size: 18px;
          color: #222;
          display: block;
          margin-bottom: 8px;
        }

        p {
          margin: 5px 0;
          font-size: 15px;
          color: #666;
        }

        .status-badge {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
          margin-top: 10px;

          &.pending {
            background-color: #fff3cd;
            color: #856404;
            border: 1px solid #ffeeba;
          }

          &.pending-action {
            background-color: #feebc8; // orange-100
            color: #dd6b20; // orange-500
            border: 1px solid #fbd38d; // orange-200
            animation: pulse-border 2s infinite;
          }

          &.needs-attention {
            background-color: #fed7d7; // red-100
            color: #e53e3e; // red-600
            border: 1px solid #feb2b2; // red-300
          }

          &.confirmed {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
          }
        }

        .scheduled-date-container {
          margin-top: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #eaeaea;

          .btn-propose-inline {
            margin-top: 10px;
            background: none;
            border: 1px dashed #506446;
            color: #506446;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;

            &:hover {
              background-color: #f6f8f6;
              border-style: solid;
            }
          }

          .scheduled-date {
            margin-top: 0;
            margin-bottom: 12px;
            font-size: 15px;
            color: #333;

            strong {
              display: inline;
              color: #b11919;
              font-size: 16px;
            }
          }

          .date-approval-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;

            button {
              padding: 8px 16px;
              border-radius: 6px;
              font-size: 13px;
              font-weight: bold;
              cursor: pointer;
              transition: 0.2s ease-in-out;
              display: flex;
              align-items: center;
              gap: 6px;

              &.btn-accept {
                background-color: #38a169; // green
                color: white;
                border: 1px solid #2f855a;

                &:hover {
                  background-color: #2f855a;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 10px rgba(56, 161, 105, 0.3);
                }
              }

              &.btn-reject {
                background-color: transparent;
                color: #e53e3e; // red
                border: 1px solid #e53e3e;

                &:hover {
                  background-color: #fff5f5;
                  transform: translateY(-2px);
                }
              }
            }
          }
        }
      }

      .submission-actions {
        position: relative;

        button {
          background: none;
          border: none;
          cursor: pointer;
          color: #777;
          padding: 5px;
          border-radius: 50%;
          transition: background 0.2s;

          &:hover {
            background-color: #f0f0f0;
            color: #333;
          }
        }

        .submission-menu {
          position: absolute;
          top: 40px;
          right: 0;
          background-color: #fff;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 10;
          min-width: 200px;
          overflow: hidden;

          button {
            width: 100%;
            padding: 12px 15px;
            text-align: left;
            font-size: 14px;
            color: #333;
            border-radius: 0;

            &:hover {
              background-color: #f8f9fa;
            }

            &.danger {
              color: #dc3545;

              &:hover {
                background-color: #fdf1f2;
              }
            }
          }
        }
      }
    }
  }

  // Logged Out State
  h3 {
    text-align: center;

    span.title {
      font-family: 'Domine', serif;
    }
  }

  .main_button {
    display: block;
    margin: 20px auto 0;
    padding: 12px 30px;
    background-color: #b11919;
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #8c1212;
    }
  }

  .secondary_button {
    display: block;
    margin: 15px auto 0;
    padding: 12px 30px;
    background-color: transparent;
    color: #666;
    border: 1px solid #ccc;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
      color: #333;
    }
  }
}

/* MODAL OVERLAY */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: modalFadeIn 0.3s ease;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      h3 {
        margin: 0;
        font-family: 'Domine', serif;
        font-size: 22px;
      }

      .close-icon {
        cursor: pointer;
        color: #888;
        transition: 0.2s;

        &:hover {
          color: #333;
        }
      }
    }

    .modal-desc {
      font-size: 14px;
      color: #666;
      margin-bottom: 25px;
      line-height: 1.5;
      text-align: left;
    }

    .date-picker-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 16px;
      margin-bottom: 25px;
      box-sizing: border-box;
      font-family: 'ProductSans', sans-serif;

      &:focus {
        outline: none;
        border-color: #b11919;
        box-shadow: 0 0 0 2px rgba(177, 25, 25, 0.1);
      }
    }

    .modal-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 12px;

      button {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: 0.2s;
      }

      .btn-cancel {
        background-color: #f1f1f1;
        color: #555;

        &:hover {
          background-color: #e4e4e4;
        }
      }

      .btn-save {
        background-color: #b11919;
        color: white;

        &:hover {
          background-color: #8c1212;
        }
      }
    }
  }
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0 0 rgba(221, 107, 32, 0.4);
  }

  70% {
    box-shadow: 0 0 0 6px rgba(221, 107, 32, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(221, 107, 32, 0);
  }
}

@media (max-width: 680px) {
  .user-dashboard-wrapper {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .user-dashboard {
    margin: 10px;
    padding: 20px;

    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;

      .header-actions {
        width: 100%;
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }

    .submission {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;

      .submission-actions {
        align-self: flex-end;
      }
    }
  }
}
```

## File: `src/routes/legal/PrivacyPolicy.jsx` <a id="file-src-routes-legal-privacypolicy-jsx"></a>

```jsx
// src/routes/legal/PrivacyPolicy.jsx
import React from "react";
import "./legal.scss";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <h1>Polityka Prywatności</h1>

      <p>
        Niniejsza polityka prywatności określa zasady przetwarzania danych
        osobowych użytkowników serwisu przeglady-domu.com.
      </p>

      <h2>1. Administrator danych</h2>
      <p>
        Administratorem danych jest Przemysław Rakotny. Kontakt:
        przemek.rakotny@gmail.com.
      </p>
      <p>
        Administrator przetwarza dane zgodnie z obowiązującymi przepisami prawa,
        w szczególności z Rozporządzeniem Parlamentu Europejskiego i Rady (UE)
        2016/679 (RODO).
      </p>

      <h2>2. Zakres zbieranych danych</h2>
      <p>
        W ramach działania serwisu mogą być zbierane następujące dane
        użytkownika: imię i nazwisko (opcjonalnie), adres e-mail, numer telefonu
        (opcjonalnie), informacje o nieruchomości (adres, typ budynku, dane
        techniczne), dane techniczne przesyłane automatycznie: adres IP,
        informacje o przeglądarce, systemie operacyjnym.
      </p>

      <h2>3. Cel przetwarzania danych</h2>
      <p>
        Dane są przetwarzane w celu:
        <ul>
          <li>realizacji zapytania ofertowego,</li>
          <li>kontaktu z wykonawcami,</li>
          <li>prowadzenia komunikacji marketingowej (jeśli wyrażono zgodę).</li>
          <li>cele analityczne i statystyczne, bezpieczeństwo serwisu.</li>
        </ul>
      </p>
      <p>
        Podstawą prawną przetwarzania danych jest art. 6 ust. 1 lit. b, c oraz f
        RODO.
      </p>

      <h2>4. Odbiorcy danych</h2>
      <p>Dane osobowe mogą być udostępniane: </p>
      <ul>
        <li>
          współpracującym wykonawcom przeglądów technicznych, jeśli użytkownik
          wyraził taką wolę,
        </li>
        <li>
          podmiotom świadczącym usługi hostingowe i obsługujące systemy IT (np.
          Google Firebase),
        </li>
        <li>
          upoważnionym organom publicznym – wyłącznie w przypadkach
          przewidzianych przepisami prawa.
        </li>
      </ul>

      <h2>5. Prawa użytkownika</h2>
      <p>
        Użytkownik ma prawo do: dostępu do swoich danych osobowych, ich
        sprostowania, żądania usunięcia („prawo do bycia zapomnianym”),
        ograniczenia przetwarzania, wniesienia sprzeciwu wobec przetwarzania,
        przenoszenia danych, wniesienia skargi do Prezesa Urzędu Ochrony Danych
        Osobowych (PUODO).
      </p>

      <h2>6. Pliki cookies</h2>
      <p>
        Serwis wykorzystuje pliki cookies w celu: zapewnienia prawidłowego
        działania formularza, analityki (np. Google Analytics), zapamiętywania
        sesji użytkownika. Użytkownik może zarządzać plikami cookies w
        ustawieniach przeglądarki.
      </p>

      <h2>7. Kontakt</h2>
      <p>
        W sprawach związanych z danymi osobowymi prosimy pisać na:
        przemek.rakotny@gmail.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
```

## File: `src/routes/legal/Terms.jsx` <a id="file-src-routes-legal-terms-jsx"></a>

```jsx
// src/routes/legal/Terms.jsx
import React from "react";
import "./legal.scss";

const Terms = () => {
  return (
    <div className="legal-page">
      <h1>Regulamin Serwisu</h1>

      <h2>1. Postanowienia ogólne</h2>
      <p>
        Korzystanie z serwisu przeglady-domu.com oznacza akceptację
        niniejszego regulaminu.
      </p>
      <p>
        Niniejszy Regulamin określa zasady korzystania z serwisu
        przeglady-domu.com, w tym składania zapytań dotyczących przeglądów
        technicznych nieruchomości. Właścicielem i administratorem serwisu jest:
        Przemysław Rakotny, e-mail: przemek.rakotny@gmail.com
      </p>

      <h2>2. Zakres usług</h2>
      <ol>
        <li>
          Serwis umożliwia użytkownikom: złożenie zapytania o wycenę przeglądów
          technicznych (m.in. budowlanych, gazowych, elektrycznych,
          wentylacyjnych), przekazanie zapytania do odpowiednich wykonawców,
          otrzymanie ofert od specjalistów i kontakt z nimi, dostęp do
          materiałów informacyjnych (np. blog, przewodnik).{" "}
        </li>
        <li>
          Serwis nie jest wykonawcą przeglądów – pośredniczy w kontakcie między
          użytkownikiem a specjalistą.
        </li>
      </ol>

      <h2>3. Warunki korzystania</h2>
      <ol>
        <li>Złożenie zapytania odbywa się poprzez wypełnienie formularza.</li>
        <li>
          Użytkownik zobowiązany jest do podania prawdziwych i kompletnych
          danych.
        </li>
        <li>
          Podanie danych kontaktowych oznacza zgodę na przekazanie ich wybranym
          wykonawcom, w celu przygotowania oferty.
        </li>
        <li>
          Formularz może być złożony bez rejestracji, jednak dostęp do panelu
          użytkownika możliwy jest tylko po zalogowaniu.
        </li>
      </ol>

      <h2>4. Odpowiedzialność</h2>
      <ol>
        <li>Administrator nie ponosi odpowiedzialności za działania wykonawców,
        którzy realizują przeglądy techniczne. </li>
        <li>Administrator dokłada wszelkich
        starań, by współpracować wyłącznie ze sprawdzonymi i kompetentnymi
        specjalistami. </li>
        <li>Użytkownik zobowiązany jest do samodzielnego wyboru
        oferty i zawarcia umowy bezpośrednio z wykonawcą. </li>
        <li>Administrator nie
        bierze udziału w rozliczeniach między użytkownikiem a wykonawcą.</li>
      </ol>

      <h2>5. Dane osobowe</h2>
      <p>
        Dane przetwarzane są zgodnie z{" "}
        <a href="/polityka-prywatnosci">Polityką Prywatności</a>.
      </p>

      <h2>6. Zmiany Regulaminu</h2>
      <p>
        Administrator zastrzega sobie prawo do zmian w regulaminie. Aktualna
        wersja jest publikowana na stronie.
      </p>
    </div>
  );
};

export default Terms;
```

## File: `src/routes/legal/legal.scss` <a id="file-src-routes-legal-legal-scss"></a>

```scss
// legal.scss
.legal-page {
    max-width: 800px;
    margin: 100px auto;
    padding: 40px;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    line-height: 1.7;
    color: #333;
  
    h1 {
      font-size: 40px;
      margin-bottom: 30px;
      color: #506446;
    }
  
    h2 {
      margin-top: 30px;
      font-size: 24px;
      color: #4a4a4a;
    }
  
    ul {
      padding-left: 20px;
      margin-top: 10px;
      li {
        list-style-type: disc;
      }
    }
  
    a {
      color: #395840;
      text-decoration: underline;
    }
  }
  
```


# ================================================================================
# 5. FRONTEND – SEKCJE STRONY GŁÓWNEJ I LANDING PAGE
# ================================================================================

## File: `src/sections/CityListBanner/CityListBanner.jsx` <a id="file-src-sections-citylistbanner-citylistbanner-jsx"></a>

```jsx
import React, { useState } from "react";
import "./CityListBanner.scss";
import SilesiaMapGL from "../SilesiaMapGL/SilesiaMapGL";
import { useNavigate, Link } from "react-router-dom";
import { citiesData } from "../../helpers/citiesData";

const CityListBanner = () => {
  const citiesLeft = [
    "Gliwice",
    "Zabrze",
    "Katowice",
    "Bytom",
    "Ruda Śląska",
    "Chorzów",
    "Tarnowskie Góry",
    "Mikołów",
    "Tychy",
    "Dąbrowa Górnicza",
    "Jaworzno",
    "Sosnowiec",
    "Piekary Śląskie",
    "Pyskowice",
    "Rybnik",
  ];

  const [hoveredCity, setHoveredCity] = useState(null);
  const navigate = useNavigate();

  const handleCityClick = (slug) => {
    if (slug) {
      navigate(`/przeglad-budowlany-${slug}`);
      window.scrollTo(0, 0);
    }
  };

  const renderCityItem = (cityName, index) => {
    const cityData = citiesData.find((c) => c.name === cityName);
    const slug = cityData ? cityData.slug : null;
    const isActive = hoveredCity === cityName;

    return (
      <li
        key={index}
        className={isActive ? "active-city" : ""}
        onMouseEnter={() => setHoveredCity(cityName)}
        onMouseLeave={() => setHoveredCity(null)}
      >
        {slug ? (
          <Link
            to={`/przeglad-budowlany-${slug}`}
            className="city-nav-link"
            title={`Przegląd Budowlany ${cityName} – Inżynier z Uprawnieniami`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className={`dot ${isActive ? "active-dot" : ""}`}></span>
            {cityName}
          </Link>
        ) : (
          <span className="city-nav-link">
            <span className={`dot ${isActive ? "active-dot" : ""}`}></span>
            {cityName}
          </span>
        )}
      </li>
    );
  };

  return (
    <section className="city-list-panel">
      <div className="city-content-container">
        {/* LEWA STRONA: Tekst */}
        <div className="city-info-side">
          <div className="header-group">
            <h3>Działamy na terenie całej Aglomeracji Górnośląskiej.</h3>
            <p></p>
          </div>
        </div>
        <div className="two-columns">
          <div className="cities-columns">
            {/* TUTAJ BYŁ BŁĄD - Teraz używamy renderCityItem */}
            <ul>{citiesLeft.map((city, i) => renderCityItem(city, i))}</ul>
            {/* <ul>{citiesRight.map((city, i) => renderCityItem(city, i))}</ul> */}
          </div>

          {/* PRAWA STRONA: Mapa 3D */}
          <div className="city-map-side">
            <SilesiaMapGL
              hoveredCity={hoveredCity}
              onCityHover={setHoveredCity}
              onCityClick={handleCityClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityListBanner;
```

## File: `src/sections/CityListBanner/CityListBanner.scss` <a id="file-src-sections-citylistbanner-citylistbanner-scss"></a>

```scss
@import "../../styles/variables.scss";

/* CityListBanner.scss */

.city-list-panel {
  width: 100%;
  height: 100%;
  /* Wypełnia kontener rodzica we wrapperze (np. 90vh) */
  background-color: transparent;
  display: flex;
  align-items: center;
  /* Ważne: zawartość na dole panelu */
  box-shadow: none !important;
}

.city-content-container {
  position: relative;
  width: 70%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  border-radius: 40px 40px 0 0;
  /* Zaokrąglona tylko góra dla efektu "nasuwania" */
  box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.15);
  padding: 30px 2% 20px 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Centrujemy zawartość wewnątrz białego panelu */
  gap: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 28px 28px 0 0;
    padding: 20px 14px 16px 14px;
    justify-content: flex-start;
    gap: 14px;
    overflow-y: auto;
  }
}

.city-info-side {
  text-align: center;
  width: 100%;


  h3 {
    font-family: $font-primary;
    font-size: 26px;
    font-weight: 300;
    line-height: 1.3;
    color: #1f2937;

    @media (max-width: 768px) {
      font-size: 19px;
    }
  }
}

.two-columns {
  width: auto;
  flex: 1;
  display: flex;
  // align-items: stretch;
  /* Map height matches list height better */
  justify-content: center;
  gap: 20px;
  /* Zmniejszono odstęp między listą a mapą */

  .cities-columns {
    position: absolute;
    right: 5%;
    top: 15%;
    flex: 1;
    display: flex;
    z-index: 100;
    gap: 20px;

    ul {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
      gap: 10px;
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;


    }

    li {
      font-family: $font-secondary;
      font-size: 12px;
      font-weight: 300;
      color: #374151;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      padding: 5px 14px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.2s ease;

      .city-nav-link {
        color: inherit;
        text-decoration: none;
        display: flex;
        align-items: center;
        width: 100%;
      }

      @media (max-width: 1420px) {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        font-size: 0.75rem;
      }

        &:hover {
          background-color: #f1f5f9;
          color: #ef4444;
        }

        &.active-city {
          color: #ef4444;
          background-color: #fef2f2;
          font-weight: 500;
        }
      }
    }
  .city-map-side {
    flex: 2;
    aspect-ratio: 16 / 10;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #fdfdfd;
    border-radius: 20px;
    padding: 0;
    /* Usunięto wewnętrzny padding 10px, żeby mapa mogła zająć całą ramkę */
    overflow: hidden;
    /* Ucięcie mapy do zaokrąglonych rogów */
    z-index: 99;


    >* {
      width: 100% !important;
      height: 100% !important;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 16px;

    .cities-columns {
      position: relative;
      right: auto;
      top: auto;
      width: 100%;
      z-index: 10;
      justify-content: center;

      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px 8px;
        max-height: 130px;
        overflow-y: auto;
        padding: 4px;
        width: 100%;

        li {
          padding: 4px 10px;
          font-size: 11px;
          border-radius: 20px;
          background: #f8fafc;

          .city-nav-link {
            font-size: 11px;
          }
        }
      }
    }

    .city-map-side {
      width: 100%;
      min-height: 200px;
      max-height: 250px;
      aspect-ratio: auto;
    }
  }
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #cbd5e1;
  border-radius: 50%;
  margin-right: 8px;

  @media (max-width: 1420px) {
    // display: none;
  }
}
```

## File: `src/sections/LocalContext/LocalContext.jsx` <a id="file-src-sections-localcontext-localcontext-jsx"></a>

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import iconMining from "../../assets/mining-risk-icon.png";
import iconStarowka from "../../assets/risk-icon-starówka.png";
import iconZielone from "../../assets/risk-icon-zielone.png";
import "./localContext.scss";
import SilesiaMapGL from "../SilesiaMapGL/SilesiaMapGL";

// WAŻNE:
// 1. Umieść swój film (np. gliwice_drone.mp4) w folderze: public/videos/
// 2. Podmień ścieżkę w parametrze videoSrc poniżej.

const LocalContext = ({
  city = "Gliwice",

  description = "Gliwice to poligon budowlany o dwóch twarzach. Z jednej strony historyczne Zatorze i Śródmieście z wymagającymi drewnianymi stropami. Z drugiej – dynamiczne nowe osiedla, gdzie pośpiech deweloperów często odbija się na izolacji. Znamy specyfikę każdej dzielnicy.",

  risks = [
    {
      icon: iconStarowka,
      title: "Poniemieckie Kamienice",
      description:
        "Specjalizujemy się w ocenie drewnianych stropów i zawilgoconych piwnic in budynkach z cegły (Zatorze, Centrum).",
    },
    {
      icon: iconMining,
      title: "Szkody Górnicze",
      description:
        "Mimo zamknięcia wielu kopalń, dzielnice jak Sośnica czy Łabędy wciąż wymagają weryfikacji wychyleń budynku.",
    },
    {
      icon: iconZielone,
      title: "Wilgoć i Drenaż",
      description:
        "Gliwice leżą na ciężkich gruntach gliniastych. Sprawdzamy czy deweloper wykonał poprawny drenaż opaskowy.",
    },
  ],

  // Zmień ten link na ścieżkę do Twojego pliku, np. "/videos/gliwice-intro.mp4"
  // Na razie zostawiłem placeholder, żebyś widział efekt:
}) => {
  const navigate = useNavigate();
  const [hoveredCityMap, setHoveredCityMap] = useState(null);

  const handleCityClick = (slug) => {
    if (slug) {
      navigate(`/przeglad-budowlany-${slug}`);
      window.scrollTo(0, 0); // Przewiń do góry po zmianie strony
    }
  };

  return (
    <section className="local-context-section">
      <div className="local-container">
        {/* GÓRA: OPIS + WIDEO */}
        <div className="local-header-wrapper">
          <div className="local-text-content">
            <div className="local-label">
              <MapPin size={18} />
              <span>Lokalny Ekspert</span>
            </div>
            <h2 className="local-title">
              {city} <span className="light">okiem inżyniera</span>
            </h2>
            <p className="local-description">{description}</p>
          </div>

          <div className="local-map-visual">
            <SilesiaMapGL
              hoveredCity={hoveredCityMap || city} // Podświetlamy hover, a jak brak to obecne miasto
              onCityHover={setHoveredCityMap}
              onCityClick={handleCityClick}
              interactive={true} // Włączamy interakcję (klik, hover)
              initialViewState={{
                longitude: 18.90, // Lekko przesunięte, żeby pasowało do układu
                latitude: 50.28,
                zoom: 8.5,
                pitch: 45,
                bearing: 0
              }}
            />
          </div>
        </div>

        {/* DÓŁ: KARTY ZAGROŻEŃ */}
        <div className="local-risks-grid">
          {risks.map((risk, index) => (
            <div key={index} className="risk-card">
              <div className="risk-icon-wrapper">
                {typeof risk.icon === 'string' ? (
                  <img src={risk.icon} alt={risk.title} className="risk-icon-img" />
                ) : (
                  risk.icon
                )}
              </div>
              <h3 className="risk-title">{risk.title}</h3>
              <p className="risk-desc">{risk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalContext;
```

## File: `src/sections/LocalContext/localContext.scss` <a id="file-src-sections-localcontext-localcontext-scss"></a>

```scss
/* localContext.scss - Styl spójny z Scope/Why */

/* --- ZMIENNE --- */
$primary-orange: #f97316;
$bg-light-orange: #fff7ed; // Tło pod ikonami
$border-color: #e5e7eb;
$text-dark: #505050; // Zgodne z Scope
$text-gray: #6b7280; // Zgodne z Scope

.local-context-section {
  background-color: #ffffff;
  padding: 4rem 1rem; // Mobile padding
  font-family: 'ProductSans', sans-serif;
  // Opcjonalnie border-bottom, jeśli oddzielasz sekcje
  // border-bottom: 1px solid $border-color; 
}

.local-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* --- GÓRA (TEKST + MAPA) --- */
.local-header-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: center; // Centrowanie na mobile
}

.local-text-content {
  width: 100%;
  text-align: center; // Centrowanie tekstu na mobile
}

.local-label {
  display: inline-flex;
  align-items: center;
  justify-content: center; // Centrowanie na mobile
  gap: 8px;
  color: $primary-orange; // Kolor wiodący
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 1rem;

  svg {
    color: $primary-orange;
  }
}

.local-title {
  font-size: 32px; // Rozmiar mobile
  font-weight: 700; // Pogrubiony element (miasto)
  color: $text-dark;
  margin-bottom: 1rem;
  line-height: 1.2;

  .light {
    display: block; // Na mobile w nowej linii (opcjonalnie) lub inline
    font-weight: 300; // Cieńsza waga dla reszty zdania
    color: $text-dark;
  }

  @media (min-width: 768px) {
    .light {
      display: inline;
    }
  }
}

.local-description {
  font-size: 20px; // Zgodne z .description w Scope
  line-height: 1.6;
  color: $text-gray;
  max-width: 600px;
  margin: 0 auto; // Wycentrowanie bloku tekstu
}

/* --- KONTENER MAPY --- */
.local-map-visual {
  width: 100%;
  height: 300px; // Wysokość na mobile
  border-radius: 12px; // Zaokrąglenie zgodne z kartami
  overflow: hidden;
  border: 1px solid $border-color; // Ramka zamiast cienia
  position: relative;

  /* Tu przyjdzie Twój komponent mapy */
  background-color: #f9f9f9; // Placeholder tła
}

/* --- DOLNY GRID (KARTY ZAGROŻEŃ) --- */
.local-risks-grid {
  display: grid;
  grid-template-columns: 1fr; // Mobile: 1 kolumna
  gap: 2rem;
}

/* KARTA - STYL 'SCOPE' / 'WHY' */
.risk-card {
  background: #ffffff;
  border: 1px solid $border-color;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Wyrównanie do lewej wewnątrz karty
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  /* Efekt Hover identyczny jak w Scope */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: rgba($primary-orange, 0.5); // Opcjonalnie subtelny kolor ramki
  }
}

.risk-icon-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  .risk-icon-img {
    height: 64px;
    width: 64px;
    object-fit: contain;
    display: block;
  }

  svg {
    width: 28px;
    height: 28px;
    color: $primary-orange;
  }
}

.risk-title {
  font-size: 1.35rem; // Zbliżone do H3 w Scope
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 0.75rem;
}

.risk-desc {
  font-size: 1rem; // ~16px
  color: $text-gray;
  line-height: 1.5;
}

/* --- MEDIA QUERY: DESKTOP (>= 992px) --- */
@media (min-width: 992px) {
  .local-context-section {
    padding: 6rem 2rem; // Desktop padding
  }

  .local-header-wrapper {
    flex-direction: row; // Obok siebie
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
    text-align: left;
  }

  .local-text-content {
    flex: 1;
    text-align: left; // Resetowanie centrowania
    max-width: 500px;
  }

  .local-label {
    justify-content: flex-start; // Reset centrowania
  }

  .local-title {
    font-size: 48px; // Rozmiar Desktop
    margin-bottom: 1.5rem;
  }

  .local-description {
    margin: 0; // Reset marginesu auto
    font-size: 20px;
  }

  .local-map-visual {
    flex: 1.2; // Mapa szersza niż tekst
    height: 400px; // Wyższa na desktopie
  }

  .local-risks-grid {
    grid-template-columns: repeat(3, 1fr); // 3 kolumny
  }
}
```

## File: `src/sections/SilesiaMapGL/SilesiaMapGL.jsx` <a id="file-src-sections-silesiamapgl-silesiamapgl-jsx"></a>

```jsx
import React, { useMemo, useRef } from 'react';
import Map, { Source, Layer, Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { citiesData } from '../../helpers/citiesData';
import '../../components/SilesiaMapGL/SilesiaMapGL.scss';

// IMPORT PLIKÓW
import silesiaOutlineData from '../../assets/silesia1.json';
import silesiaCitiesData from '../../assets/silesia2.json';

const SilesiaMapGL = ({ hoveredCity, onCityHover, onCityClick }) => {
    const mapRef = useRef(null);

    // 1. Styl "Pusty" (Przezroczyste tło)
    const emptyMapStyle = useMemo(() => ({
        version: 8,
        name: "Blank",
        sources: {},
        layers: [
            {
                id: 'background',
                type: 'background',
                paint: { 'background-color': 'rgba(0,0,0,0)' }
            }
        ]
    }), []);

    // ----------------------------------------------------
    // STYLIZACJA WARSTW - EFEKT 3D
    // ----------------------------------------------------

    // A. WARSTWA CIENIA (Klucz do efektu 3D)
    // Rysujemy obrys jako czarną, rozmytą i przesuniętą plamę
    const shadowLayerStyle = {
        id: 'gzm-shadow',
        type: 'fill', // WAŻNE: Fill, nie Line
        paint: {
            'fill-color': '#000000',     // Czarny cień
            'fill-opacity': 0.4,         // Półprzezroczysty
            'fill-translate': [15, 20],  // Przesunięcie cienia (w dół i w prawo)
            'fill-blur': 2               // Lekkie rozmycie krawędzi
            // Uwaga: blur działa najlepiej, gdy polygon jest prosty. 
            // Jeśli cień jest "ostry", można zwiększyć translate.
        }
    };

    // B. Warstwa Wypełnienia Miast (Kolorowa mapa)
    const citiesFillLayerStyle = useMemo(() => {
        return {
            id: 'gzm-cities-fill',
            type: 'fill',
            paint: {
                'fill-color': [
                    'case',
                    ['==', ['get', 'name'], hoveredCity || ''],
                    '#B94E48', // Aktywny
                    '#f3f4f6'  // Nieaktywny (Bardzo jasny szary/biały dla kontrastu)
                ],
                'fill-opacity': 1, // Pełne krycie, żeby przykryć cień pod spodem
                'fill-outline-color': '#ffffff',
                'fill-color-transition': { duration: 300 }
            }
        };
    }, [hoveredCity]);

    // C. Warstwa Granic Miast (Białe linie)
    const citiesBorderLayerStyle = {
        id: 'gzm-cities-borders',
        type: 'line',
        paint: {
            'line-color': '#ffffff',
            'line-width': 1.5,
            'line-opacity': 0.8
        }
    };

    return (
        <div className="map-gl-wrapper">
            <Map
                ref={mapRef}
                mapLib={maplibregl}
                initialViewState={{
                    longitude: 19.02,
                    latitude: 50.30,
                    zoom: 8.2,
                    pitch: 0, // Nachylenie dla efektu 3D!
                    bearing: 0
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle={emptyMapStyle}
                scrollZoom={false}
                dragPan={true}
                doubleClickZoom={false}
                onLoad={(e) => e.target.resize()}
            >
                {/* 1. ŹRÓDŁO OBRYSU (CIEŃ POD SPODEM) */}
                <Source id="source-outline" type="geojson" data={silesiaOutlineData}>
                    <Layer {...shadowLayerStyle} />
                </Source>

                {/* 2. ŹRÓDŁO MIAST (MAPA WŁAŚCIWA NA WIERZCHU) */}
                <Source id="source-cities" type="geojson" data={silesiaCitiesData}>
                    <Layer {...citiesFillLayerStyle} />
                    <Layer {...citiesBorderLayerStyle} />
                </Source>

                {/* 3. MARKERY */}
                {citiesData.map((city, index) => {
                    const isActive = hoveredCity === city.name;
                    return (
                        <Marker
                            key={index}
                            longitude={city.lng}
                            latitude={city.lat}
                            anchor="center"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                onCityClick(city.slug);
                            }}
                        >
                            <div
                                className={`gl-marker ${isActive ? 'active' : ''}`}
                                onMouseEnter={() => onCityHover(city.name)}
                                onMouseLeave={() => onCityHover(null)}
                            >
                                <div className="dot"></div>
                                <div className="pulse-wave"></div>
                                {/* Tooltip tylko dla aktywnych, żeby nie zasłaniać mapy */}
                                {isActive && <div className="gl-tooltip">{city.name}</div>}
                            </div>
                        </Marker>
                    );
                })}
            </Map>
        </div>
    );
};

export default SilesiaMapGL;
```

## File: `src/sections/WhyImportant/WhyImportant.jsx` <a id="file-src-sections-whyimportant-whyimportant-jsx"></a>

```jsx
import React from 'react';
import { Info } from 'lucide-react';
import './WhyImportant.scss';
import insuranceIcon from '../../assets/why-insurance.png';
import lawIcon from '../../assets/why-law.png';

const WhyImportant = ({ customCity }) => {
  return (
    <section className="why-important-section">
      <div className="why-container">

        {/* Nagłówek sekcji */}
        <div className="why-header">
          <h2 className="why-title">Dlaczego przegląd{customCity ? ` w ${customCity}` : ""} jest <span className="highlight">kluczowy?</span></h2>
          <p className="why-subtitle">
            To nie tylko formalność. To bezpieczeństwo Twoich finansów i spełnienie wymogu prawnego.
          </p>
        </div>

        <div className="why-grid">

          {/* KARTA 1: UBEZPIECZENIE (Pieniądze) */}
          <div className="why-card insurance-card">
            <div className="icon-wrapper alert">
              <img src={insuranceIcon} alt="Ubezpieczenie" className="why-icon-img" />
            </div>
            <h3>Polisa Ubezpieczeniowa</h3>
            <p className="main-text">
              Czy wiesz, że Towarzystwo Ubezpieczeń może <strong>odmówić wypłaty odszkodowania</strong> lub drastycznie je obniżyć, jeśli szkoda (np. pożar, zalanie) powstała w wyniku wadliwej instalacji, a Ty nie masz ważnego przeglądu?
            </p>

            <div className="legal-quote">
              <Info size={16} className="quote-icon" />
              <div>
                <span className="quote-label">Typowy zapis w OWU:</span>
                <p>"Ubezpieczony obowiązany jest do utrzymania i użytkowania budynku zgodnie z przepisami Prawa Budowlanego."</p>
              </div>
            </div>
          </div>

          {/* KARTA 2: PRAWO (Art. 62) */}
          <div className="why-card law-card">
            <div className="icon-wrapper legal">
              <img src={lawIcon} alt="prawo" className="why-icon-img" />
            </div>
            <h3>Art. 62 Prawa Budowlanego</h3>
            <p className="main-text">
              Obowiązek wykonywania przeglądów okresowych wynika wprost z ustawy. Dotyczy on <strong>każdego</strong> właściciela domu jednorodzinnego, a nie tylko firm czy spółdzielni.
            </p>

            <ul className="legal-list">
              <li>
                <strong>Co roku:</strong> Kontrola instalacji gazowej i przewodów kominowych (wentylacja, dymowe, spalinowe).
              </li>
              <li>
                <strong>Co 5 lat:</strong> Kompleksowe sprawdzenie stanu technicznego i przydatności do użytkowania całego obiektu oraz instalacji elektrycznej.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyImportant;
```

## File: `src/sections/WhyImportant/WhyImportant.scss` <a id="file-src-sections-whyimportant-whyimportant-scss"></a>

```scss
@import "../../styles/variables.scss";
/* --- ZMIENNE (Dopasowane do Scope) --- */
$primary-orange: #f97316;
// Kolory tekstów dopasowane do tych z Scope
$text-dark: #505050; // Odpowiednik var(--text-dark)
$text-gray: #6b7280; // Odpowiednik var(--text-gray)
$border-color: #e5e7eb; // Odpowiednik var(--border-color)

$bg-alert: #fff1f2;
$alert-color: #e11d48;

/* GŁÓWNA SEKCJA */
.why-important-section {
  background-color: white;
  padding: 5rem 1rem;
  font-family: 'Product Sans', sans-serif;
  /* Opcjonalnie: Jeśli chcesz oddzielić sekcje linią, odkomentuj: */
  /* border-bottom: 1px solid $border-color; */
}

.why-container {
  /* Dopasowano szerokość do scope-container */
  max-width: 1200px;
  margin: 0 auto;
}

/* NAGŁÓWEK (Identyczny styl jak w Scope) */
.why-header {
  text-align: center;
  margin-bottom: 3.5rem;

  .why-title {
    font-family: $font-primary;
    font-size: clamp(1.75rem, 5vw, 48px);
    font-weight: 300; // Zmiana wagi na lżejszą (300) jak w Scope
    color: $text-dark;
    margin-bottom: 1rem;

    .highlight {
      color: $primary-orange;
      // Usunięto podkreślenie, aby pasowało do czystszego stylu Scope
    }
  }

  .why-subtitle {
    font-family: $font-secondary;

    font-size: clamp(0.95rem, 2.5vw, 22px);
    color: $text-gray;
    max-width: 600px;
    margin: 0 auto;
  }
}

/* GRID KART */
.why-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

/* WSPÓLNE STYLE KART (Skopiowane z .scope-card) */
.why-card {
  background: #ffffff;
  /* Styl ramki identyczny jak w Scope */
  border: 1px solid $border-color;
  border-radius: 12px;
  padding: 2.5rem;
  /* Zachowałem nieco większy padding z oryginalnego Why, dla oddechu */
  display: flex;
  flex-direction: column;
  /* Usunięto początkowy box-shadow i kolorowe border-top */
  box-shadow: none;
  // border-top: none !important; /* Wymuszenie braku górnej ramki */

  /* Identyczny efekt hover jak w Scope */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: $primary-orange; // Opcjonalnie: zmiana koloru ramki przy hover

  }

  /* Styl nagłówków wewnątrz karty */
  h3 {
    font-family: $font-primary;
    font-size: 1.45rem; // Dopasowano rozmiar do Scope h3
    font-weight: 700;
    color: $text-dark;
    margin: 0 0 0.75rem 0;
  }

  /* Główny tekst w karcie */
  .main-text {
    font-family: $font-secondary;

    font-size: 18px; // Dopasowano do .description w Scope
    color: $text-gray;
    line-height: 1.5;
    margin-bottom: 1.5rem;

    strong {
      color: $text-dark;
      font-weight: 600;
    }
  }
}

/* Styl ikon */
.icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  .why-icon-img {
    width: 42px;
    height: 42px;
    object-fit: contain;
  }

  /* Zachowano kolory tła ikon dla rozróżnienia kart */
  &.alert {
    // background-color: $bg-alert;
    color: $alert-color;
  }

  &.legal {
    color: $primary-orange;
  }
}

/* DOSTOSOWANIE TREŚCI WEWNĘTRZNYCH DO NOWEGO STYLU KARTY */

/* Karta Ubezpieczenia - Cytat Prawny */
.insurance-card {
  /* Usunięto border-top */

  .legal-quote {
    /* Zmieniono styl na lżejszy, pasujący do płaskiej karty */
    background-color: transparent; // Usunięto tło
    border-left: none; // Usunięto lewą ramkę
    border-top: 1px solid $border-color; // Dodano subtelną linię oddzielającą u góry
    padding: 1.5rem 0 0 0; // Padding tylko z góry
    border-radius: 0;
    display: flex;
    flex-direction: column; // Zmiana na kolumnę dla lepszego układu
    gap: 0.5rem;
    margin-top: auto; // Wypycha sekcję na dół karty

    .quote-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0.5rem;
    }

    .quote-icon {
      color: $alert-color; // Zmiana koloru ikony na ostrzegawczy
      font-size: 1.2rem;
    }

    .quote-label {
      font-family: $font-primary;
      display: block;
      font-size: 0.85rem;
      text-transform: uppercase;
      font-weight: 700;
      color: $text-dark;
      letter-spacing: 0.5px;
    }

    p {
      font-family: $font-secondary;
      font-style: italic;
      font-size: 0.95rem;
      color: $text-gray; // Kolor tekstu szary
      margin: 0;
      line-height: 1.5;
      padding-left: 0; // Usunięto wcięcie
    }
  }
}

/* Karta Prawa - Lista Punktowana */
.law-card {
  /* Usunięto border-top */

  .legal-list {
    /* Stylizowana na wzór .features-list ze Scope */
    list-style: none;
    padding: 0;
    margin: 1.5rem 0 0 0;
    padding-top: 1.5rem;
    border-top: 1px solid $border-color; // Subtelna linia oddzielająca

    li {
      display: flex;
      align-items: flex-start;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
      color: $text-gray;
      font-family: $font-secondary;
      line-height: 1.5;
      padding-left: 0; // Usunięto stare wcięcie

      // Użycie ikony jako punktora
      &::before {
        content: '•'; // Można tu użyć ikony z fontu, np. '\f058' dla checkmarka
        color: $primary-orange;
        font-weight: bold;
        font-size: 1.5rem; // Większy punktor
        line-height: 1rem;
        margin-right: 0.75rem;
        position: static; // Reset pozycji
      }

      strong {
        color: $text-dark;
        font-weight: 600;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .why-important-section {
    padding: 3.5rem 1rem;
  }

  .why-header {
    margin-bottom: 2rem;
  }

  .why-card {
    padding: 1.5rem 1.25rem;

    h3 {
      font-size: 1.25rem;
    }

    .main-text {
      font-size: 0.95rem;
    }
  }
}
```

## File: `src/sections/ctabanner/CtaBanner.jsx` <a id="file-src-sections-ctabanner-ctabanner-jsx"></a>

```jsx
import React from "react";
import "./ctaBanner.scss";
import CallButton from "../../components/CallButton/CallButton";
import OrderButton from "../../components/OrderButton/OrderButton";

const CtaBanner = ({ customCity }) => {
  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Potrzebujesz przeglądu budowlanego{customCity ? ` w ${customCity}` : ""}?</h2>

        <p className="cta-subtitle">
          Skontaktuj się z nami i otrzymaj bezpłatną wycenę w 3 minuty
        </p>

        <div className="cta-buttons-wrapper">
          {/* Przycisk telefonu */}
          <CallButton phoneNumber="690029414" />

          <OrderButton
            showIcon={false}
            text="Umów przegląd"
            onClick={scrollToInspectionForm}
          />
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
```

## File: `src/sections/ctabanner/ctaBanner.scss` <a id="file-src-sections-ctabanner-ctabanner-scss"></a>

```scss
@import "../../styles/variables.scss";

.cta-section {
  background-color: var(--primary-orange, #f97316);
  /* Używamy rem dla paddingów - skalują się z tekstem */
  padding: 4rem 1.5rem;
  text-align: center;
  /* Dobra praktyka: dodanie standardowych fontów systemowych jako fallback */
  font-family: "ProductSans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.cta-container {
  width: 100%;
  /* Konwersja 800px -> 50rem. Elastyczna szerokość maksymalna. */
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Typografia */
.cta-title {
  font-family: $font-primary;
  color: #ffffff;
  font-size: clamp(1.5rem, 5vw, 2.375rem);
  font-weight: 300;
  margin: 0 0 1rem 0;
  line-height: 1.25;
}

.cta-subtitle {
  font-family: $font-secondary;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.95rem, 2.5vw, 1.125rem);
  margin: 0 0 2rem 0;
  font-weight: 300;
}

/* Kontener na przyciski */
.cta-buttons-wrapper {
  display: flex;
  flex-direction: row;
  /* W jednym wierszu domyślnie */
  justify-content: center;
  align-items: stretch;
  /* Wymuś identyczną wysokość przycisków */
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
  z-index: 50;

  /* Wymuszamy szerokość przycisków wewnątrz */
  &>* {
    width: 280px;
    flex: 0 0 280px;
    /* Zapobiega zmianie rozmiaru */
  }

  /* Tylko w mobile < 480 mają być w jednej kolumnie i na pełną szerokość */
  @media (max-width: 580px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    &>* {
      width: 100%;
      flex: 1 1 auto;
    }
  }
}

/* Wspólne style przycisków */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 2px solid transparent;
  height: 100%;
  /* Pozwól kontenerowi stretch kontrolować wysokość */
  box-sizing: border-box;
}

/* Przycisk biały (Telefon) */
.btn-white {
  background-color: #ffffff;
  color: var(--primary-orange, #f97316);
  border-color: #ffffff;
}

.btn-white:hover {
  background-color: #f3f4f6;
  border-color: #f3f4f6;
}

/* Przycisk ciemny (Formularz) */
.btn-dark {
  background-color: #111827;
  color: #ffffff;
  border-color: #111827;
}

.btn-dark:hover {
  background-color: #1f2937;
  border-color: #1f2937;
}

/* Ikona w przycisku */
.icon-placeholder {
  margin-right: 10px;
  font-size: 1.25rem;
  line-height: 1;
}

/* Wersja na Tablet i Desktop (>= 768px) */
@media (min-width: 48rem) {
  /* 48rem = 768px */

  .cta-section {
    padding: 6rem 2rem;
  }

  .cta-title {
    font-size: 48px;
  }

  .cta-subtitle {
    font-size: 22px;
  }

  /* Usunięto nadmiarowe style .cta-buttons-wrapper i .btn z miedia query, 
     ponieważ są obsłużone wyżej lub nie wymagają zmian w tym punkcie przerwania */
}
```

## File: `src/sections/explanations/Explanations.jsx` <a id="file-src-sections-explanations-explanations-jsx"></a>

```jsx
import React from "react";
import "./explanations.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Explanations() {
  return (
    <div className="explanations">
      <h1>Na co komu ten cały kłopot?</h1>
      
      <span className="exp1">
        No właśnie, po co się fatygować z tymi wszystkimi przeglądami
        technicznymi? Przecież budynek stoi, prąd jest, gaz płynie, a rachunki –
        no cóż, same się nie zapłacą. Ale, żeby nie było tak łatwo, przepisy
        wymagają, żeby o budynek jednak zadbać. A oto dlaczego:
      </span>
      <span className="exp2">
        <span style={{ fontWeight: "bold" }}>
          Odbiór techniczny nieruchomości – weź fachowca, zanim podpiszesz!
        </span>{" "}
        Kupujesz dom lub mieszkanie? Zanim złożysz podpis, warto sprawdzić, co
        naprawdę kupujesz. Krzywe ściany, nieszczelne okna, błędy wykonawcze –
        to wszystko może wyjść dopiero po odbiorze. Z nami zrobisz go
        profesjonalnie, z protokołem i konkretnymi wskazówkami. To Twoja szansa,
        by uniknąć problemów lub... wynegocjować lepszą cenę. Nie kupuj kota
        w worku – my wiemy, gdzie zajrzeć.
      </span>
      <span className="exp3">
        <span style={{ fontWeight: "bold" }}>
          Przegląd budowlany nieruchomości – co roku i co pięć lat.
        </span>{" "}
        <br /> Zgodnie z Prawem budowlanym właściciele i zarządcy muszą co roku
        sprawdzić, czy dach nie przecieka, rynny nie odpadają, a elewacja nadal
        ma się dobrze. Ale to jeszcze nic – co pięć lat dochodzi pełna inspekcja
        budynku, od fundamentów po przewody piorunochronne. Taka kontrola to nie
        tylko spokój ducha, ale też oszczędność – lepiej wykryć problem
        wcześniej niż czekać, aż narobi poważnych szkód!
      </span>
      <span className="exp4">
        <span style={{ fontWeight: "bold" }}>
          Przegląd instalacji gazowej – na wszelki wypadek.
        </span>{" "}
        <br /> Z gazem nie ma żartów. Prawo nakazuje coroczny przegląd
        instalacji gazowej i przewodów kominowych. Brzmi jak formalność? A
        jednak – ten jeden raz może uratować budynek (i Twój portfel) przed
        wyciekiem gazu czy nagłym odcięciem dostaw. Bezpieczeństwo i spokój są
        bezcenne.
      </span>
      <span className="exp5">
        <span style={{ fontWeight: "bold" }}>
          Przegląd instalacji elektrycznej – raz na pięć lat.
        </span>{" "}
        <br /> Instalacja elektryczna też wymaga miłości, a przynajmniej raz na
        pięć lat. Sprawdzamy wtedy, czy kable są na miejscu, zabezpieczenia
        trzymają, a gniazdka nie chcą wysłać nas na elektryczną wycieczkę.
        Bezpieczny prąd to szczęśliwy prąd – i szczęśliwy właściciel
        nieruchomości.
      </span>

      {/* <img src="/images/exp2.png" alt="" /> */}
      <span className="exp6">
        <span style={{ fontWeight: "bold" }}>
          Świadectwo charakterystyki energetycznej – nowość, która się przyda.{" "}
        </span>{" "}
        <br /> Od niedawna, przy sprzedaży lub wynajmie budynku, trzeba mieć
        świadectwo energetyczne. To taki dokument, który zdradza, ile energii
        pożera Twoja nieruchomość. Dzięki niemu wiesz, na co się szykować przy
        rachunkach – a i wartość budynku z porządnym świadectwem może skoczyć w
        górę.
      </span>
      <span className="exp7">
        W skrócie? Te wszystkie przeglądy i świadectwa to inwestycja w
        bezpieczeństwo i spokój. Z nami nie musisz o nich pamiętać –
        przypomnimy, załatwimy i sprawimy, że nie będą żadnym „kłopotem” – tylko
        korzyścią!
      </span>

      <div className="exp-footer">
        <div className="display2">
          <h2>
            Przegląd na czas, <br /> spokój na zawsze...
          </h2>
        </div>
        <div className="zatem">
          <span>zatem</span>
          <ExpandMoreIcon />
        </div>
      </div>
    </div>
  );
}
```

## File: `src/sections/explanations/explanations.scss` <a id="file-src-sections-explanations-explanations-scss"></a>

```scss
.explanations {
  position: relative;
  font-family: 'ProductSans';
  font-size: 24px;
  font-weight: 300;
  font-style: normal;
  margin-top: 50px;
  padding-bottom: 2400px;
  h1 {
    position: absolute;
    font-family: 'ProductSans';
    font-size: 128px;
    font-weight: 300;
    font-style: normal;
    margin-bottom: 45px;
    width: 674px;
    left: 152px;
    top: 0px;
  }
  .exp1 {
    position: absolute;
    top: 140px;
    left: 977px;
    width: 450px;
    line-height: 32px;
  }
  .exp2 {
    position: absolute;
    top: 470px;
    left: 735px;
    width: 520px;
    line-height: 32px;
  }
  .exp3 {
    position: absolute;
    top: 900px;
    left: 145px;
    width: 580px;
    line-height: 32px;
  }
  .exp4 {
    position: absolute;
    top: 1000px;
    left: 845px;
    width: 546px;
    line-height: 32px;
  }
  .exp5 {
    position: absolute;
    top: 1270px;
    left: 845px;
    width: 546px;
    line-height: 32px;
  }
  .exp6 {
    position: absolute;
    top: 1600px;
    left: 152px;
    line-height: 32px;
  }
  // img {
  //   position: absolute;
  //   width: 400px;
  //   height: 400px;
  //   top: 1335px;
  //   left: 272px;
  // }

  .exp7 {
    position: absolute;
    top: 1800px;
    left: 152px;
    line-height: 32px;
  }

  .exp-footer {
    position: absolute;
    top: 1900px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 450px;
    background-color: #bcd7ff;
    padding: 40px 40px;
    margin-top: 50px;
    

    h2 {
      font-family: 'ProductSans';
      font-size: 96px;
      font-weight: 300;
      color: rgb(61, 61, 61);
    }
    .zatem {
      align-self: flex-end;
    }
  }
}

@media (max-width: 1440px) and (min-width: 1051px) {
  .explanations {
    position: relative;
    font-family: 'ProductSans';
    font-size: 24px;
    font-weight: 300;
    font-style: normal;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    padding: 0 40px;

    h1 {
      position: relative;
      font-family: 'ProductSans';
      font-size: 64px;
      font-weight: 300;
      font-style: normal;
      margin-bottom: 45px;
      width: auto;
      left: 0;
      top: 0;
      transition: top 0.5s ease, left 0.5s ease, font-size 0.5s ease;
    }

    .exp1,
    .exp2,
    .exp3,
    .exp4,
    .exp5,
    .exp6,
    .exp7,
    .exp-footer {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      // margin-bottom: 15px;
      transition: top 0.5s ease, left 0.5s ease, width 0.5s ease,
        height 0.5s ease;
    }
    img {
      display: none;
    }

    .exp-footer {
      height: 430px;
      padding: 40px 40px;
    }
  }
}

@media (max-width: 1050px) and (min-width: 686px)  {
  .explanations {
    position: relative;
    font-family: "Lato", serif;
    font-size: 24px;
    font-weight: 300;
    font-style: normal;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    padding: 0 ;

    h1 {
      position: relative;
      padding: 0 40px;
      font-family: 'ProductSans';
      font-size: 64px;
      font-weight: 300;
      font-style: normal;
      margin-bottom: 45px;
      width: auto;
      left: 0;
      top: 0;
      transition: top 0.5s ease, left 0.5s ease, font-size 0.5s ease;
    }

    .exp1,
    .exp2,
    .exp3,
    .exp4,
    .exp5,
    .exp6,
    .exp7,
    .exp-footer {
      position: relative;
      padding: 0 40px;
      top: 0;
      left: 0;
      width: 100%;
      // margin-bottom: 15px;
      transition: top 0.5s ease, left 0.5s ease, width 0.5s ease,
        height 0.5s ease;
    }
    img {
      display: none;
    }
    .exp-footer {
      height: 300px;
      width: 100%;
      padding: 40px 40px;
      .display2 {
        h2 {
          font-family: 'ProductSans', serif;
          font-size: 60px;
          font-weight: 300;
          
        }
      }
    }
  }
}
@media (max-width: 768px) and (min-width: 520px) {
  .explanations {
    position: relative;
    font-family: 'ProductSans', serif;
    font-size: 24px;
    font-weight: 300;
    font-style: normal;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    padding: 0;

    h1 {
      position: relative;
      padding: 0 40px;
      font-family: 'ProductSans', serif;
      font-size: 64px;
      font-weight: 300;
      font-style: normal;
      margin-bottom: 45px;
      width: auto;
      left: 0;
      top: 0;
      transition: top 0.5s ease, left 0.5s ease, font-size 0.5s ease;
    }

    .exp1,
    .exp2,
    .exp3,
    .exp4,
    .exp5,
    .exp6,
    .exp7,
    .exp-footer {
      position: relative;
      padding: 0 40px;
      top: 0;
      left: 0;
      width: 100%;
      // margin-bottom: 15px;
      transition: top 0.5s ease, left 0.5s ease, width 0.5s ease,
        height 0.5s ease;
    }
    img {
      display: none;
    }
    .exp-footer {
      height: 250px;
      width: 100%;
      padding: 40px 40px;
      .display2 {
        h2 {
          font-family: 'ProductSans';
          font-size: 42px;
          font-weight: 300;
        }
      }
    }
  }
}

@media (max-width: 520px) {
  .explanations {
    position: relative;
    font-family: 'ProductSans', sans-serif;
    font-size: 20px;
    font-weight: 100;
    font-style: normal;
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    padding: 0;

    h1 {
      position: relative;
      padding: 0 20px;
      font-family: 'ProductSans';
      font-size: 64px;
      font-weight: 300;
      font-style: normal;
      margin-bottom: 30px;
      width: auto;
      left: 0;
      top: 0;
      transition: top 0.5s ease, left 0.5s ease, font-size 0.5s ease;
    }

    .exp1,
    .exp2,
    .exp3,
    .exp4,
    .exp5,
    .exp6,
    .exp7,
    .exp-footer {
      position: relative;
      margin-top: 15px;
      padding: 0 20px;
      top: 0;
      left: 0;
      width: 100%;
      // margin-bottom: 15px;
      transition: top 0.5s ease, left 0.5s ease, width 0.5s ease,
        height 0.5s ease;
    }
    img {
      display: none;
    }
    .exp-footer {
      height: 250px;
      width: 100%;
      padding: 40px 40px;
      .display2 {
        h2 {
          font-family: 'ProductSans';
          font-size: 36px;
          font-weight: 300;
        }
      }
    }
  }
}



```

## File: `src/sections/faq/Faq.jsx` <a id="file-src-sections-faq-faq-jsx"></a>

```jsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./faq.scss";
import { faqs } from "./faqs";

const QAItem = ({ faq, index, isSmallScreen }) => {
  const [isOpen, setIsOpen] = useState(!isSmallScreen);

  useEffect(() => {
    setIsOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const renderAnswer = (answer) => {
    return answer.map((item, idx) => {
      if (item.type === "text") {
        return (
          <div
            key={idx}
            className="faq-answer-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        );
      } else if (item.type === "list") {
        return (
          <ul key={idx}>
            {item.content.map((listItem, listIdx) => (
              <li
                key={listIdx}
                dangerouslySetInnerHTML={{ __html: listItem }}
              />
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  const toggleAnswer = () => {
    if (isSmallScreen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={toggleAnswer}>
        {faq.question}
      </div>
      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
        {renderAnswer(faq.answer)}
      </div>
    </div>
  );
};

export default function Faq({ customCity }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 680);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => {
      const answerText = faq.answer
        .map((item) => {
          if (item.type === "text") return item.content;
          if (item.type === "list") return item.content.join(" ");
          return "";
        })
        .join(" ");

      return {
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answerText.replace(/<[^>]*>/g, ""),
        },
      };
    }),
  };

  return (
    <div className="h5-QA" id="h5-QA">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <h2>Najczęściej Zadawane Pytania (FAQ) – Przeglądy Budowlane {customCity || "Śląsk"}</h2>
      <div className="faq-list lato-regular">
        {faqs.map((faq, index) => (
          <QAItem
            key={index}
            faq={faq}
            index={index}
            isSmallScreen={isSmallScreen}
          />
        ))}
      </div>
    </div>
  );
}
```

## File: `src/sections/faq/faq.scss` <a id="file-src-sections-faq-faq-scss"></a>

```scss
@import "../../styles/variables.scss";

.h5-QA {
  // Domyślne style dla najmniejszych ekranów (mobile)
  width: 100%;
  padding: 40px 20px; // Mniejszy padding na start
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-family: $font-primary;
    font-weight: 300;
    font-style: normal;
    font-size: 32px; // Mniejszy rozmiar czcionki na start
    color: rgb(80, 80, 80);
    letter-spacing: normal; // Standardowy letter-spacing na mobile
    text-align: center; // Centrowanie nagłówka
  }

  .faq-list {
    color: #4a4a4a;
    margin-top: 20px; // Mniejszy margines na start
    width: 100%; // Pełna szerokość listy

    .faq-item {
      margin-bottom: 20px; // Mniejszy odstęp między elementami
      display: flex;
      flex-direction: column;
      align-items: flex-start; // Wyrównanie do lewej na mobile
      width: 100%; // Pełna szerokość elementu

      .faq-question {
        font-family: $font-secondary;

        text-align: left; // Wyrównanie do lewej na mobile
        cursor: pointer;
        margin-bottom: 15px;
        font-size: 20px; // Większa czcionka pytania na mobile
        font-weight: 200; // Lżejsza waga na mobile
        padding: 10px 0; // Mniejszy padding, bez tła
        font-style: normal;
        width: 100%; // Pełna szerokość pytania
        background-color: transparent; // Przezroczyste tło na start
        transition: background-color 0.3s ease, color 0.3s ease; // Dodano płynną zmianę koloru

        // Opcjonalnie: hover na mobile (może być mniej widoczny)
        // &:hover { ... }
      }

      .faq-answer {
        font-family: $font-secondary;
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.8s ease, opacity 0.8s ease;
        padding-left: 0; // Brak wcięcia na mobile
        margin-left: 15px; // Lekkie wcięcie odpowiedzi na mobile
        font-weight: 300;
        font-style: normal;
        font-size: 18px; // Mniejsza czcionka odpowiedzi na mobile
        width: calc(100% - 15px); // Szerokość pomniejszona o margines

        &.open {
          max-height: 1500px;
          opacity: 1;
          // Usunięto position: relative i width: 900px z wersji desktopowej
          // oraz style pseudo-elementu ::before (tło)
        }

        .faq-answer-content {
          line-height: 24px; // Mniejsza interlinia na mobile
        }

        p {
          line-height: 24px; // Spójna interlinia
          margin-bottom: 1em; // Odstęp między akapitami
        }

        ul {
          padding-left: 20px; // Mniejsze wcięcie listy na mobile
          margin: 1em 0;

          li {
            line-height: 24px; // Spójna interlinia
            margin-bottom: 0.5em;
          }
        }
      }

      // Usunięto style dla .faq-answer.open::before (tło) - niepotrzebne na mobile
    }
  }
}

// --- Breakpoints dla większych ekranów ---

// Tablet i małe laptopy (np. od 768px)
@media (min-width: 768px) {
  .h5-QA {
    padding: 60px 30px; // Zwiększony padding

    h2 {
      font-size: 48px; // Większy nagłówek
    }

    .faq-list {
      .faq-item {
        .faq-question {
          font-size: 22px; // Trochę większe pytanie
        }

        .faq-answer {
          font-size: 20px; // Trochę większa odpowiedź
          margin-left: 20px;
          width: calc(100% - 20px);

          .faq-answer-content,
          p,
          ul li {
            line-height: 28px; // Większa interlinia
          }
        }
      }
    }
  }
}

// Desktop (np. od 1024px) - przywracamy oryginalny wygląd desktopowy
@media (min-width: 1024px) {
  .h5-QA {
    padding: 80px 40px; // Oryginalny padding

    h2 {
      font-size: 48px; // Oryginalny rozmiar
      letter-spacing: 5px; // Oryginalny letter-spacing
    }

    .faq-list {
      margin-top: 40px; // Oryginalny margines
      align-items: center; // Wycentrowanie listy na desktopie

      .faq-item {
        margin-bottom: 40px; // Oryginalny odstęp
        align-items: center; // Wycentrowanie elementów pytania/odpowiedzi
        width: auto; // Szerokość zależna od zawartości (lub ustalona max-width)

        .faq-question {
          font-family: $font-primary;

          text-align: center; // Wycentrowanie pytania
          font-size: 28px; // Oryginalny rozmiar (mniejszy niż na mobile/tablet?)
          font-weight: 600; // Oryginalna waga
          padding: 15px 15px; // Oryginalny padding
          // background-color: #f7f7f7; // Opcjonalne tło z oryginalnego kodu
          width: auto; // Szerokość zależna od tekstu
        }

        .faq-answer {
          font-family: $font-secondary;

          padding-left: 20px; // Oryginalne wcięcie
          margin-left: 0; // Reset marginesu z mobile
          font-size: 22px; // Oryginalny rozmiar
          width: auto; // Reset szerokości

          &.open {
            position: relative; // Przywracamy pozycjonowanie dla tła
            width: 900px; // Oryginalna stała szerokość
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .faq-answer-content {
            line-height: 35px; // Oryginalna interlinia
          }

          p,
          ul li {
            line-height: 35px; // Spójna oryginalna interlinia
          }

          ul {
            padding-left: 30px; // Oryginalne wcięcie listy
          }

          // Przywracamy tło (pseudo-element ::before) tylko na desktopie
          &.open::before {
            content: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // background-image: url('../../../public/images/faq-back.png'); // Odkomentuj jeśli używasz
            background-color: #f0f0f0; // Tymczasowe tło dla testów
            background-size: cover;
            background-position: center;
            z-index: -1;
            transform: rotate(1deg);
            transform-origin: center;
            transition: transform 0.3s ease;
            border-radius: 10px; // Opcjonalnie: zaokrąglenie tła
          }

          &:not(.open)::before {
            transform: rotate(0deg);
          }
        }
      }
    }
  }
}
```

## File: `src/sections/faq/faqs.jsx` <a id="file-src-sections-faq-faqs-jsx"></a>

```jsx
export const faqs = [
  {
    question: "Czy przegląd techniczny domu jednorodzinnego jest obowiązkowy?",
    answer: [
      {
        type: "text",
        content:
          "Tak. Zgodnie z art. 62 ustawy Prawo budowlane, właściciel domu jednorodzinnego ma obowiązek dbać o stan techniczny budynku. Choć domy jednorodzinne są zwolnione z prowadzenia Książki Obiektu Budowlanego (KOB), to nie zwalnia to właściciela z obowiązku przeprowadzania okresowych kontroli (szczególnie przeglądu 5-letniego oraz corocznych przeglądów kominiarskich i gazowych).",
      },
    ],
  },
  {
    question:
      "Jakie przeglądy techniczne nieruchomości należy przeprowadzać i jak często?",
    answer: [
      {
        type: "text",
        content: "Zgodnie z art. 62 ust. 1i 2 ustawy Prawo budowlane, dla domu jednorodzinnego kluczowe są dwa cykle::",
      },
      {
        type: "list",
        content: [
          "Co 1 rok: Przegląd instalacji gazowej (jeśli jest) oraz przewodów kominowych (dymowych, spalinowych i wentylacyjnych). Przeprowadza je kominiarz i osoba z uprawnieniami gazowymi.",

        ],
      },
      {
        type: "list",
        content: [
          "Co 5 lat (tzw. Wielki Przegląd): Kompleksowe badanie stanu technicznego całego budynku, przydatności do użytkowania oraz estetyki obiektu i jego otoczenia. W jego skład wchodzi również obowiązkowy przegląd instalacji elektrycznej i piorunochronnej (pomiary).",

        ],
      },
    ],
  },
  {
    question: "Czy brak przeglądu 5-letniego oznacza utratę ubezpieczenia po pożarze?",
    answer: [
      {
        type: "text",
        content:
          "W 90% przypadków – tak. Większość Ogólnych Warunków Ubezpieczenia (OWU) zawiera klauzulę o 'rażącym niedbalstwie' lub wymogu przestrzegania Prawa budowlanego. Jeśli dojdzie do pożaru (np. od zwarcia) lub zerwania dachu, rzeczoznawca ubezpieczyciela niemal na pewno poprosi o protokół z ważnego przeglądu elektrycznego i budowlanego. Jego brak to legalna podstawa do drastycznego zaniżenia lub całkowitej odmowy wypłaty odszkodowania.",
      },
    ],
  },
  {
    question:
      "Kto może przeprowadzić taki przegląd 5-letni?",
    answer: [
      {
        type: "text",
        content: "Tylko osoba posiadająca uprawnienia budowlane w odpowiedniej specjalności (np. konstrukcyjno-budowlanej). Pomiary elektryczne musi wykonać osoba z ważnymi uprawnieniami SEP (Świadectwo Kwalifikacyjne D). Zlecając usługę inżynierowi, upewnij się, że ma prawo do wystawienia ważnego prawnie protokołu.",
      },

    ],
  },
  {
    question: "Co dokładnie sprawdza inżynier podczas przeglądu 5-letniego?",
    answer: [
      {
        type: "text",
        content:
          "Podczas kontroli sprawdzana jest struktura nośna budynku (fundamenty, ściany, stropy), stan więźby dachowej i pokrycia, elewacja, stolarka okienna, a także schody i balkony. Równolegle wykonywane są fizyczne pomiary instalacji elektrycznej (m.in. rezystancja izolacji, pętla zwarcia) oraz badanie uziemień i piorunochronu.",
      },
    ],
  },
  {
    question: "Co otrzymuję po wykonaniu przeglądu??",
    answer: [
      {
        type: "text",
        content:
          "Otrzymujesz oficjalny Protokół z okresowej kontroli stanu technicznego budynku. To twardy, prawny dokument, który potwierdza, że dom jest bezpieczny. Zawiera on opis usterek (jeśli występują) oraz zalecenia naprawcze. To ten dokument okazujesz Nadzorowi Budowlanemu lub ubezpieczycielowi w razie szkody.",
      },
    ],
  },
  {
    question: "Czy muszę prowadzić elektroniczną Książkę Obiektu Budowlanego (c-KOB)?",
    answer: [
      {
        type: "text",
        content:
          "Nie. Przepisy, które weszły w życie w 2024 roku (i w pełni od 2027) dotyczące obowiązkowej cyfrowej książki (c-KOB) dotyczą dużych obiektów, bloków i budynków usługowych. Właściciele typowych domów jednorodzinnych są z tego obowiązku zwolnieni. Musisz jednak fizycznie przechowywać u siebie protokoły z przeglądów (np. w teczce domowej).",
      },
    ],
  },
  {
    question: "Kupiłem dom z rynku wtórnego. Kiedy muszę zrobić pierwszy przegląd?",
    answer: [
      {
        type: "text",
        content:
          "Jeżeli poprzedni właściciel nie przekazał Ci aktualnego protokołu z przeglądu 5-letniego, powinieneś zlecić go natychmiast po zakupie. Nigdy nie polegaj tylko na słowie sprzedającego, zwłaszcza jeśli zaraz po zakupie ubezpieczasz nieruchomość. Brak ciągłości w papierach to ryzyko ubezpieczeniowe.",
      },
    ],
  },

  {
    question: "Czy istnieją korzyści wynikające z przeprowadzania przeglądów technicznych poza obowiązkami prawnymi?",
    answer: [
      {
        type: "text",
        content:
          "Tak! Regularne przeglądy techniczne to nie tylko obowiązek prawny, ale także sposób na utrzymanie nieruchomości w dobrym stanie, zmniejszenie kosztów napraw oraz zwiększenie bezpieczeństwa użytkowników. Mogą również podnieść wartość budynku i uczynić go bardziej atrakcyjnym dla potencjalnych najemców lub kupców.",
      },
    ],
  },


];
```

## File: `src/sections/footer/Footer.jsx` <a id="file-src-sections-footer-footer-jsx"></a>

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { citiesData } from '../../helpers/citiesData';
import "./footer.scss";

export default function Footer() {
  const topCities = [
    "Gliwice", "Katowice", "Zabrze", "Bytom", "Ruda Śląska",
    "Chorzów", "Tarnowskie Góry", "Mikołów", "Tychy",
    "Dąbrowa Górnicza", "Jaworzno", "Sosnowiec", "Piekary Śląskie",
    "Pyskowice", "Rybnik"
  ];

  return (
    <footer className='footer' role="contentinfo">
      <div className="texts">
        <div className="footer-header">
          <span className="footer-logo">przeglady-domu.com</span>
          <p className="footer-tagline">
            Inżynierskie przeglądy techniczne nieruchomości – Gliwice, Katowice i cała Aglomeracja Śląska
          </p>
        </div>

        <div className="footer-links-grid">
          {/* USŁUGI */}
          <div className="footer-col">
            <h4 className="footer-col-title">Usługi Inżynierskie</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/przeglad-budowlany">Przegląd Budowlany (Roczny i 5-letni)</Link>
              </li>
              <li>
                <Link to="/przeglad-gazowy">Przegląd Instalacji Gazowej</Link>
              </li>
              <li>
                <Link to="/przeglad-elektryczny">Przegląd Instalacji Elektrycznej</Link>
              </li>
              <li>
                <Link to="/przeglad-wentylacyjny">Kontrola Wentylacji i Kominów</Link>
              </li>
              <li>
                <Link to="/blogDB">Baza Wiedzy i Blog Inżyniera</Link>
              </li>
              <li>
                <Link to="/form">Formularz Zamówienia Przeglądu</Link>
              </li>
            </ul>
          </div>

          {/* LOKALIZACJE - AGLOMERACJA ŚLĄSKA */}
          <div className="footer-col footer-col-wide">
            <h4 className="footer-col-title">Obszar Działania (Województwo Śląskie)</h4>
            <ul className="footer-cities-grid">
              {topCities.map((cityName) => {
                const city = citiesData.find((c) => c.name === cityName);
                const slug = city ? city.slug : cityName.toLowerCase().replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e').replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o').replace(/ś/g, 's').replace(/ź/g, 'z').replace(/ż/g, 'z');
                return (
                  <li key={cityName}>
                    <Link
                      to={`/przeglad-budowlany-${slug}`}
                      title={`Przegląd budowlany w mieście ${cityName}`}
                    >
                      {cityName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* UPRAWNIENIA & KONTAKT */}
          <div className="footer-col">
            <h4 className="footer-col-title">Kadra Inżynierska & Uprawnienia</h4>
            <div className="audytors">
              <div className="audytor_prze">
                <p className="audytor-name"><strong>Przemysław Rakotny</strong></p>
                <p className="audytor-contact">tel. <a href="tel:+48690029414">690 029 414</a></p>
                <p className="audytor-license">Uprawnienia budowlane: <strong>SLK/2122/OWOK/08</strong></p>
                <p className="audytor-register">Wpis do rejestru świadectw energetycznych: <strong>nr 38909</strong></p>
              </div>

              <div className="audytor_mar">
                <p className="audytor-name"><strong>Marcin Wróbel</strong></p>
                <p className="audytor-contact">tel. <a href="tel:+48502212512">502 212 512</a></p>
                <p className="audytor-license">Uprawnienia elektryczne SEP: <strong>E-1/1276/691/22, D-1/1277/691/22</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Przeglądy Techniczne Nieruchomości. Wszelkie prawa zastrzeżone.
          </p>
          <div className="legal-links">
            <Link to="/regulamin">Regulamin</Link>
            <span className="separator">|</span>
            <Link to="/polityka-prywatnosci">Polityka Prywatności</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

## File: `src/sections/footer/footer.scss` <a id="file-src-sections-footer-footer-scss"></a>

```scss
@import "../../styles/variables.scss";

.footer {
  position: relative;
  width: 100%;
  padding: 60px 40px 180px;
  background-image: url("../../../public/images/design_footer.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #1e293b;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: inherit;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
    transition: filter 0.3s ease;
  }

  .texts {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 1280px;
    margin: 0 auto;
    font-family: $font-primary;

    .footer-header {
      .footer-logo {
        font-size: 32px;
        font-weight: 700;
        letter-spacing: -0.5px;
        color: #0f172a;
        display: inline-block;
        margin-bottom: 8px;
      }

      .footer-tagline {
        font-size: 16px;
        color: #475569;
        font-weight: 400;
        max-width: 600px;
        line-height: 1.5;
      }
    }

    .footer-links-grid {
      display: grid;
      grid-template-columns: 1fr 1.6fr 1.2fr;
      gap: 36px;
      padding-top: 10px;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }

    .footer-col {
      .footer-col-title {
        font-size: 17px;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 2px solid #f97316;
        display: inline-block;
        padding-bottom: 4px;
      }

      .footer-nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;

        li a {
          color: #334155;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;

          &:hover {
            color: #f97316;
            transform: translateX(4px);
          }
        }
      }

      .footer-cities-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px 12px;

        @media (max-width: 640px) {
          grid-template-columns: repeat(2, 1fr);
        }

        li a {
          color: #334155;
          text-decoration: none;
          font-size: 14px;
          display: block;
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 6px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.2s ease;

          &:hover {
            color: #f97316;
            background: #ffffff;
            border-color: #f97316;
            box-shadow: 0 2px 6px rgba(249, 115, 22, 0.15);
          }
        }
      }
    }

    .audytors {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .audytor_prze,
      .audytor_mar {
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .audytor-name {
          font-size: 16px;
          color: #0f172a;
        }

        .audytor-contact {
          font-size: 14px;
          color: #334155;

          a {
            color: #f97316;
            text-decoration: none;
            font-weight: 600;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        .audytor-license,
        .audytor-register {
          font-size: 13px;
          color: #64748b;
          line-height: 1.4;

          strong {
            color: #1e293b;
          }
        }
      }
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      padding-top: 24px;
      border-top: 1px solid rgba(226, 232, 240, 0.8);
      font-size: 14px;
      color: #64748b;

      .copyright {
        margin: 0;
      }

      .legal-links {
        display: flex;
        align-items: center;
        gap: 12px;

        a {
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s ease;

          &:hover {
            color: #0f172a;
          }
        }

        .separator {
          color: #cbd5e1;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 160px;

    &::before {
      filter: blur(5px);
    }
  }
}

```

## File: `src/sections/goldHand/GoldHand.jsx` <a id="file-src-sections-goldhand-goldhand-jsx"></a>

```jsx
import React from 'react'
import "./goldHand.scss"
import CallButton from '../../components/CallButton/CallButton'

export default function GoldHand() {
  return (
    <div className='goldHand'>
      <div className="goldHand-inner">
        <h2>Fachowiec – Pomoc i Drobne Naprawy</h2>
        <p>Świadczymy całodobową pomoc w zakresie awarii instalacji elektrycznych, wodno-kanalizacyjnych i centralnego ogrzewania, dbając o szybkie usuwanie usterek i konserwację części wspólnych. Nasze usługi obejmują również drobne naprawy i konserwacje, takie jak wymiana zamków, regulacja drzwi, przegląd instalacji i naprawa oświetlenia. Działamy na indywidualne zlecenie mieszkańców, zapewniając bezpieczeństwo i komfort w każdej sytuacji.</p>
        <div className="buttons">
          <CallButton phoneNumber="690029414" />
        </div>
      </div>
    </div>

  )
}
```

## File: `src/sections/goldHand/goldHand.scss` <a id="file-src-sections-goldhand-goldhand-scss"></a>

```scss
@import "../../styles/variables.scss";

.goldHand {
  width: 100%;
  background-color: #e8f0fe;
  padding: 60px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .goldHand-inner {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }

  h2 {
    font-family: $font-primary;
    font-weight: 400;
    font-style: normal;
    margin-bottom: 20px;
    color: #1e293b;
    font-size: clamp(1.75rem, 4.5vw, 2.5rem);
    line-height: 1.25;
  }

  p {
    font-family: $font-secondary;
    font-weight: 400;
    font-style: normal;
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.6;
    color: #475569;
    max-width: 750px;
    margin: 0 auto;
  }

  .buttons {
    margin-top: 28px;
    display: flex;
    justify-content: center;

    a {
      text-decoration: none;
      color: inherit;
    }

    .call_button {
      background: #ffffff;
      color: $color-text-main;
      border: 1px solid rgba($color-signal-orange, 0.3);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);

      .btn-icon {
        color: $color-signal-orange;
      }

      &:hover {
        background: rgba($color-signal-orange, 0.08);
        border-color: $color-signal-orange;
      }
    }
  }
}

@media (max-width: 768px) {
  .goldHand {
    padding: 40px 16px;

    p {
      line-height: 1.5;
    }
  }
}
```

## File: `src/sections/inspectionsForm copy/InspectionForm.jsx` <a id="file-src-sections-inspectionsform-copy-inspectionform-jsx"></a>

```jsx
import React, { useEffect, useState } from "react";
import "./inspectionForm.scss";
import CustomDropdown from "../../components/custonDropdown/CustomDropdown";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";


const InspectionForm = () => {
  const [formData, setFormData] = useState({
    propertyType: "",
    numberOfBlocks: "",
    propertyAddress: "",
    area: "",
    volume: "",
    floors: "",
    inspections: {
      construction: false,
      gas: false,
      electrical: false,
      energy: false,
    },
    preferredDate: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [localCart, setLocalCart] = useState([]); // Dane przechowywane lokalnie
  const location = useLocation();

  const saveLocalCartToStorage = (cart) => {
    localStorage.setItem("localCart", JSON.stringify(cart));
  };

  const loadLocalCartFromStorage = () => {
    const storedCart = localStorage.getItem("localCart");
    return storedCart ? JSON.parse(storedCart) : [];
  };
  useEffect(() => {
    const storedCart = loadLocalCartFromStorage();
    setLocalCart(storedCart);
  }, []);

  // Funkcja do obsługi zmiany wartości w formularzu
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        inspections: {
          ...prevData.inspections,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Funkcja do dodawania nieruchomości do koszyka
  const handleAddToCart = () => {
    const newProperty = {
      type: formData.propertyType,
      klatki: formData.numberOfBlocks,
      address: formData.propertyAddress,
      area: formData.area,
      zakres: formData.inspections,
      termin: formData.preferredDate,
    };

    if (newProperty.type && newProperty.address) {
      const updatedCart = [...localCart, newProperty];
      setLocalCart(updatedCart); // Aktualizacja localCart
      saveLocalCartToStorage(updatedCart); // Zapis do localStorage

      // Resetowanie formularza
      setFormData({
        propertyType: "",
        numberOfBlocks: "",
        propertyAddress: "",
        area: "",
        volume: "",
        floors: "",
        inspections: {
          construction: false,
          gas: false,
          electrical: false,
          energy: false,
        },
        preferredDate: "",
        contactName: "",
        contactEmail: "",
      });
      setSelectedType(null);
      setSelectedDate(null);
    } else {
      alert("Proszę wypełnić wszystkie wymagane pola.");
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (auth.currentUser) {
        const userCartRef = collection(db, "userCarts");
        const snapshot = await getDocs(
          query(userCartRef, where("userId", "==", auth.currentUser.uid))
        );

        const userCart = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (userCart) {
          // Jeśli userCart jest tablicą
          setCart(userCart);
          setShowCart(userCart.length > 0);
        } else {
          setCart([]); // Gdy brak danych
        }
      }
    };

    fetchCart();
  }, [auth.currentUser]);





  // Funkcja logowania użytkownika
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Użytkownik zalogowany:", auth.currentUser);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  // Funkcja wysyłania formularza
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault(); // Upewnij się, że `e` istnieje, zanim go użyjesz
    }

    let user = auth.currentUser;


    // Jeśli użytkownik nie jest zalogowany
    if (!user) {
      // Przekierowanie na stronę logowania, jeśli użytkownik nie jest zalogowany
      alert("Musisz się zalogować, aby wysłać dane.");
      navigate("/login", { state: { from: "/" } }); // Przekazanie miejsca powrotu
      return;
    }

    try {
      const userCartRef = collection(db, "userCarts");

      // Iteracja przez dane w `localCart` i zapisanie każdego wpisu jako osobny dokument
      const savePromises = localCart.map(async (item) => {
        const docRef = await addDoc(userCartRef, {
          userId: user.uid,
          email: user.email, // Dodaj email użytkownika
          phone: formData.contactPhone || null, // Dodaj numer telefonu, jeśli istnieje
          type: item.type,
          address: item.address,
          klatki: item.klatki || null,
          floors: item.floors || null,
          area: item.area || null,
          termin: item.termin || null,
          zakres: {
            construction: item.zakres?.construction || false,
            gas: item.zakres?.gas || false,
            electrical: item.zakres?.electrical || false,
            energy: item.zakres?.energy || false,
          },
          timestamp: new Date(),
        });
        console.log("Dodano dokument z id:", docRef.id);
        return docRef.id;
      });

      await Promise.all(savePromises);

      alert("Wszystkie dane zostały zapisane w bazie danych.");
      setLocalCart([]); // Czyszczenie lokalnego koszyka
      saveLocalCartToStorage([]); // Czyszczenie localStorage
      setShowCart(false);
    } catch (error) {
      console.error("Błąd podczas zapisywania danych:", error);
      alert("Nie udało się zapisać danych.");
    }
  };

  useEffect(() => {
    // Zmien kolor pierwszej opcji w każdym <select>
    const selects = document.querySelectorAll("select");
    selects.forEach((select) => {
      select.style.color = select.value === "" ? "#888" : "#000";
      select.addEventListener("change", () => {
        select.style.color = select.value === "" ? "#888" : "#000";
      });
    });
  }, []);

  const options = [
    { value: "dom jednorodzinny", label: "dom jednorodzinny" },
    { value: "budynek wielorodzinny", label: "budynek wielorodzinny" },
    { value: "nieruchomość komercyjna", label: "nieruchomość komercyjna" },
  ];
  const options2 = [
    { value: "szybko", label: "jak najszybciej" },
    { value: "miesiac", label: "w przyszłym miesiącu" },
    { value: "termin", label: "w innym terminie" },
  ];

  // // Funkcja do obsługi wyboru opcji w CustomDropdown
  // const handleSelect = (option) => {
  //   setFormData({ ...formData, propertyType: option });
  // };
  // Sprawdzamy, czy wybrano opcję "budynek wielorodzinny"
  const isMultiFamilyBuilding = formData.propertyType === "budynek wielorodzinny";

  useEffect(() => {
    const locationState = location.state;
    if (locationState?.scrollTo === "inspectionForm") {
      const inspectionFormElement = document.querySelector(".inspection-form");
      if (inspectionFormElement) {
        inspectionFormElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);


  return (
    <>
      <form className="inspection-form" id="inspection-form">
        <h2>Złóż zapytanie o przegląd</h2>
        <p>
          Każdą nieruchomość przedstaw oddzielnie a następnie dodaj ją do
          koszyka i wyślij
        </p>

        {/* Typ nieruchomości */}
        <div className="typ">
          <div>
            <label>Jaki typ nieruchomości chcesz zgłosić do przeglądu?</label>
            <CustomDropdown
              options={options}
              placeholder="Wybierz typ nieruchomości"
              onSelect={(option) => {
                setFormData({ ...formData, propertyType: option.value });
                setSelectedType(option.value);
              }}
              selectedValue={selectedType}
            />
          </div>

          {/* Liczba klatek */}

          <div
            className={`klatkiCounter ${isMultiFamilyBuilding ? "visible" : ""
              }`}
          >
            <label>Liczba klatek</label>
            <input
              className="klatki"
              type="number"
              name="numberOfBlocks"
              value={formData.numberOfBlocks}
              onChange={handleChange}
              placeholder="wpisz dane"
            />
          </div>
        </div>

        {/* Adres nieruchomości */}
        <div className="adres-box">
          <label>Adres nieruchomości</label>
          <input
            className="adres"
            type="text"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleChange}
            placeholder="Miasto, ulica, nr "
          />
        </div>

        {/* Powierzchnia, kubatura i liczba kondygnacji */}
        <div className="pow_kond">
          <label>Ilość kondygnacji</label>
          <div className="danes">
            {/* <input
              className="dane"
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="pow. [m2]"
            /> */}

            <input
              className="dane"
              type="text"
              name="floors"
              value={formData.floors}
              onChange={handleChange}
              placeholder="kond. [szt]"
            />
          </div>

        </div>

        {/* Zakres przeglądu */}
        <div className="zakres">
          <label className="opis">Określ zakres przeglądu</label>
          <div className="checkbox custom-checkbox">
            <input
              type="checkbox"
              name="construction"
              id="construction"
              checked={formData.inspections.construction}
              onChange={handleChange}
            />
            <label for="construction">przegląd budowlany</label>
          </div>
          <div className="checkbox custom-checkbox">
            <input
              type="checkbox"
              name="gas"
              id="gas"
              checked={formData.inspections.gas}
              onChange={handleChange}
            />
            <label for="gas">przegląd instalacji gazowej</label>
          </div>
          <div className="checkbox custom-checkbox">
            <input
              type="checkbox"
              name="electrical"
              id="electrical"
              checked={formData.inspections.electrical}
              onChange={handleChange}
            />
            <label for="electrical">przegląd instalacji elektrycznej</label>
          </div>
          <div className="checkbox custom-checkbox">
            <input
              type="checkbox"
              name="energy"
              id="energy"
              checked={formData.inspections.energy}
              onChange={handleChange}
            />
            <label for="energy">świadectwo charakterystyki energetycznej</label>
          </div>
        </div>

        {/* Termin przeglądu */}
        <div className="termin">
          <label>W jakim terminie najlepiej przeprowadzić przegląd?</label>
          <CustomDropdown
            options={options2}
            placeholder="dokonaj wyboru"
            onSelect={(option) => {
              setFormData({ ...formData, preferredDate: option.value });
              setSelectedDate(option.value); // Zapisuje wybraną opcję w stanie
            }}
            selectedValue={selectedDate}
          />
        </div>

        {/* Przycisk dodaj do koszyka */}
        <button
          type="button"
          className="main_button"
          onClick={handleAddToCart}
        >
          Dodaj do koszyka
        </button>


        {/* Sekcja koszyka */}
        {localCart.length > 0 && (
          <div className="cart-section">


            <ul>
              {localCart.map((item, index) => (
                <li key={index}>
                  {item.type} - {item.address}
                </li>
              ))}
            </ul>
            <div>
              <label>Podaj numer telefonu do kontaktu w tej sprawie (opcjonalnie):</label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone || ""}
                onChange={handleChange}
                placeholder="Wpisz numer telefonu"
              />
            </div>

            <button type="submit" className="main_button" onClick={handleSubmit}>
              {auth.currentUser ? "Wyślij" : "Zaloguj i wyślij"}
            </button>
          </div>

        )}
      </form>
    </>
  );
};

export default InspectionForm;
```

## File: `src/sections/inspectionsForm copy/inspectionForm.scss` <a id="file-src-sections-inspectionsform-copy-inspectionform-scss"></a>

```scss
.inspection-form {
  padding: 80px 40px;
  font-family: "Lato", serif;
  font-size: 20px;
  font-weight: 300;
  font-style: normal;

  label {
    display: block;
    margin: 45px 0 5px 0;
  }

  input,
  select {
    font-family: "Lato", serif;
    font-size: 16px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid black;
    
    font-size: 16px;

  }

  input::placeholder {
    color: #dadada;
    font-size: 16px;
    /* Zmien kolor na dowolny */
    opacity: 1;
    /* Ustawienie pełnej przezroczystości */
  }

  h2 {
    
    font-size: 98px;
    color: rgb(80, 80, 80);
    font-family: "Merriweather", serif;
    
    font-weight: 300;
    font-style: normal;
  }

  p {
    margin-top: 10px;
    font-size: 16px;
  }

  .typ {
    display: flex;
    flex-direction: column;
    align-items: left;
  


    .prop {
      width: 400px;

      option {
        color: rgb(19, 19, 19);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        max-height: 0;
      }

      to {
        opacity: 1;
        max-height: 200px;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        max-height: 200px;
      }

      to {
        opacity: 0;
        max-height: 0;
      }
    }

    .klatkiCounter {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    .klatkiCounter.visible {
      animation-name: fadeIn;
    }

    .klatkiCounter:not(.visible) {
      animation-name: fadeOut;
    }

    .klatki {
      width: 100px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid black;
    }
  }

  .adres-box {

    display: flex;
    flex-direction: column;

    .adres {
      width: 300px;
    }
  }


  .dane {
    width: 300px;
    margin-right: 25px;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 15px;
  }

  .zakres {

    label {
      margin-top: 0;
      margin-bottom: 0;
    }

    .opis {
      margin: 25px 0;
    }
  }




  .checkbox {
    display: flex;
    align-items: center;
    
    margin-bottom: 30px;
  }

  /* Kontener dla checkboxa */
  .custom-checkbox {
    position: relative;
    display: flex;
    align-items: center;
    
    /* Odstęp między checkboxem a tekstem */
  }

  /* Ukryj standardowy checkbox */
  .custom-checkbox input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Styl niestandardowego checkboxa */
  .custom-checkbox label {
    position: relative;
    padding-left: 45px;
    /* Odstęp na ikonę checkboxa */
    cursor: pointer;
    font-size: 18px;
    // line-height: 20px;
    color: #000000;
  }

  /* Dodaj kwadrat jako checkbox */
  .custom-checkbox label::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    /* Rozmiar kwadratu */
    height: 20px;
    background-color: #fff;
    border: 2px solid #979797;
    /* Kolor ramki */
    border-radius: 4px;
    /* Zaokrąglone rogi (jeśli chcesz) */
    transition: all 0.2s ease;
  }

  /* Po zaznaczeniu dodaj tło i ikonę */
  .custom-checkbox input[type="checkbox"]:checked+label::before {
    background-color: #000000;
    /* Kolor tła po zaznaczeniu */
    border-color: #677c59;
  }

  .custom-checkbox input[type="checkbox"]:checked+label::after {
    content: "";
    /* Ikona zaznaczenia */
    position: absolute;
    left: 7px;
    top: -7px;
    // transform: translateY(-50%);
    font-size: 25px;
    color: #040404;
    /* Kolor zaznaczenia */
  }

  /* Opcjonalnie: efekt hover */
  .custom-checkbox label:hover::before {
    border-color: #000000;
    /* Kolor ramki w hover */
  }

  .main_button{
    width: 300px;
    margin-top: 30px;
  }
  .add-to-cart-btn,
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #677c59;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    margin-top: 30px;
    color: white;
    width: 250px;
    padding: 15px 25px;

    font-family: "Lato", serif;
    font-size: 16px;
    font-weight: 300;
    font-style: normal;
  }

  .termin {
    margin-top: 25px;
  }

  .cart-section {
    display: flex;
    flex-direction: column;
    gap: 15px;

    ul {
      margin-top: 40px;
      list-style-type: none;

    }
  }
}
@media (max-width: 1440px) {

  .inspection-form{
   
    
  h2{
    font-size: 64px;
  }
}
}



@media (max-width: 680px) {
  

  .inspection-form{
    padding: 80px 15px;
    h2 {
      font-family: "Merriweather", serif;
      font-size: 25px;
      font-weight: 300;
      font-style: normal;
      margin-bottom: 10px;
    }

    .custom-dropdown{
      width: 100%;
    }
    .pow_kond{
      
      .danes{
        display: flex;
        gap: 25px;
        .dane{
          width: 50%;
          margin-right: 0;
  
        }
      }

      
    }

    .adres-box{
      .adres {
        width: 100%;
      }
    }
    
  }
  
}
```

## File: `src/sections/inspectionsForm/InspectionForm.jsx` <a id="file-src-sections-inspectionsform-inspectionform-jsx"></a>

```jsx
import React, { useState, useEffect } from "react";
import "./inspectionForm.scss";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// import { auth } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import PopupModal from "../../components/PopModal/PopModal";
import InfoIcon from "@mui/icons-material/Info";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HouseIcon from "@mui/icons-material/House";

const InspectionFormSlide = () => {
  const [submittedProperties, setSubmittedProperties] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { currentUser } = useAuth();
  // const [currentUser, setCurrentUser] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  const [formData, setFormData] = useState({
    propertyType: "",
    numberOfBlocks: "",
    propertyAddress: "",
    nearestCity: "",
    area: "",
    volume: "",
    floors: "",
    inspections: {
      gas: false,
      construction: false,
      electrical: false,
      chimney: false,
      energy: false,
    },
    preferredDate: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    selectAll: false,
    remindMe: false,
    acceptPrivacy: false,
    acceptTerms: false,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("firebaseUser"));
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        contactEmail: user.email,
      }));
    }
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //     }
  //   });
  //
  //   return () => unsubscribe();
  // }, []);

  // 1. Odczyt danych po powrocie z logowania
  useEffect(() => {
    const savedProps = localStorage.getItem("pendingProperties");
    const savedContact = localStorage.getItem("pendingContact");

    if (savedProps) {
      setSubmittedProperties(JSON.parse(savedProps));
      setShowSummary(true);
      localStorage.removeItem("pendingProperties");
    }

    if (savedContact) {
      const contact = JSON.parse(savedContact);
      setFormData((prev) => ({
        ...prev,
        contactName: contact.name,
        contactEmail: contact.email,
        contactPhone: contact.phone,
        remindMe: contact.remindMe,
        acceptPrivacy: contact.acceptPrivacy,
        acceptTerms: contact.acceptTerms,
      }));
      localStorage.removeItem("pendingContact");
    }

    // 2. Przewiń do #inspectionForm
    // const hash = window.location.hash;
    // if (hash === "#inspectionForm") {
    //   const section = document.querySelector(hash);
    //   if (section) {
    //     setTimeout(() => section.scrollIntoView({ behavior: "smooth" }), 300);
    //   }
    // }
  }, []);




  const options = [
    { value: "dom jednorodzinny", label: "Dom jednorodzinny" },
    { value: "budynek wielorodzinny", label: "Budynek wielorodzinny" },
    { value: "nieruchomość komercyjna", label: "Nieruchomość komercyjna" },
  ];
  const optionsTime = [
    { value: "pilne", label: "jak najszybciej" },
    { value: "miesiac", label: "w przyszłym miesiącu" },
    { value: "inny", label: "w innym terminie" },
  ];

  const isCurrentStepValid = () => {
    const step = filteredSteps[currentStep];

    if (step.title === "Wybierz rodzaj nieruchomości") {
      return formData.propertyType !== "";
    }

    if (step.title === "Podaj liczbę klatek") {
      return formData.numberOfBlocks !== "";
    }

    if (step.title === "Wybierz zakres przeglądów") {
      return Object.values(formData.inspections).some((v) => v === true);
    }

    if (step.title === "Adres nieruchomości") {
      return (
        formData.propertyAddress.trim() !== "" &&
        formData.nearestCity.trim() !== ""
      );
    }

    if (step.title === "Jak pilne jest przeprowadzenie przeglądu?") {
      return formData.preferredDate !== "";
    }

    return true;
  };

  const next = () => {
    if (!isCurrentStepValid()) {
      alert("Uzupełnij wymagane dane przed przejściem dalej.");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitProperty = () => {
    const newEntry = {
      propertyType: formData.propertyType,
      numberOfBlocks: formData.numberOfBlocks,
      propertyAddress: formData.propertyAddress,
      nearestCity: formData.nearestCity,
      area: formData.area,
      volume: formData.volume,
      floors: formData.floors,
      inspections: formData.inspections,
      preferredDate: formData.preferredDate,
      contact: {
        name: formData.contactName,
        email: formData.contactEmail,
        phone: formData.contactPhone,
      },
    };

    setSubmittedProperties((prev) => [...prev, newEntry]);
    setShowList(true);
    setShowSummary(false);
    setCurrentStep(0);
    setFormData((prev) => ({
      ...prev,
      propertyType: "",
      numberOfBlocks: "",
      propertyAddress: "",
      nearestCity: "",
      area: "",
      volume: "",
      floors: "",
      inspections: {
        gas: false,
        construction: false,
        electrical: false,
        chimney: false,
        energy: false,
      },
      preferredDate: "",
    }));
    setSelectedType(null);
  };

  const handleSendAndShowSummary = () => {
    if (formData.propertyAddress || formData.nearestCity) {
      handleSubmitProperty(); // tylko jeśli mamy coś wpisane
    }

    setShowList(false);
    setShowSummary(true);
  };

  const handleFinalSubmit = async () => {
    if (!formData.acceptPrivacy || !formData.acceptTerms) {
      alert("Musisz zaakceptować wymagane zgody.");
      return;
    }

    const isLoggedIn = !!currentUser;

    if (!isLoggedIn) {
      setPopupMessage(
        "Aby wysłać zapytanie, musisz być zalogowany. Zostaniesz teraz przekierowany."
      );

      localStorage.setItem(
        "pendingProperties",
        JSON.stringify(submittedProperties)
      );
      localStorage.setItem(
        "pendingContact",
        JSON.stringify({
          name: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone,
          remindMe: formData.remindMe,
          acceptPrivacy: formData.acceptPrivacy,
          acceptTerms: formData.acceptTerms,
        })
      );
      localStorage.setItem("redirectAfterLogin", "/#inspection-form");

      return;
    }

    try {
      if (!currentUser) {
        alert("Nie rozpoznano zalogowanego użytkownika.");
        return;
      }

      const userId = currentUser.uid;
      const userEmail = currentUser.email;

      for (const property of submittedProperties) {
        await addDoc(collection(db, "userCarts"), {
          userId,
          userEmail,
          createdAt: Timestamp.now(),
          property, // jedna nieruchomość na wpis
          contact: {
            name: formData.contactName,
            email: formData.contactEmail,
            phone: formData.contactPhone,
          },
          zgody: {
            remindMe: formData.remindMe,
            acceptPrivacy: formData.acceptPrivacy,
            acceptTerms: formData.acceptTerms,
          },
          status: "Zgłoszenie przyjęte",
        });
      }
      setPopupMessage(
        <>
          <p>Zgłoszenie zostało zapisane i wysłane do wykonawcy.</p>
          <p>
            Szczegóły Twojego zgłoszenia znajdziesz w&nbsp;
            <a
              href="/dashboard"
              style={{ color: "#506446", textDecoration: "underline" }}
            >
              panelu klienta
            </a>
            .
          </p>
        </>
      );

      // alert("Wszystkie zgłoszenia zostały zapisane i wysłane do wykonawcy!");
      setSubmittedProperties([]);
      setShowSummary(false);
    } catch (error) {
      console.error("Błąd zapisu do bazy:", error);
      alert("Wystąpił błąd podczas zapisu. Spróbuj ponownie później.");
    }
  };

  const getStepIcon = () => {
    if (step.title === " ") {
      return <InfoIcon style={{ color: "#395840", fontSize: 40 }} />;
    }

    if (step.isFinalStep) {
      return <HouseIcon style={{ color: "#395840", fontSize: 40 }} />;
    }

    return <EventNoteIcon style={{ color: "#395840", fontSize: 40 }} />;
  };

  const steps = [
    {
      title: " ",
      noValidation: true, // brak walidacji
      content: (
        <div className="form-steps">
          <div className="info-content">
            <h2>
              Umów certyfikowany przegląd w 3 minuty
            </h2>
            <ul>
              <li>
                <span>1</span>
                Wybierz co i gdzie mamy sprawdzić.
              </li>
              <li>
                <span>2</span>Otrzymasz wycenę błyskawicznie na maila/telefon.
              </li>
              <li>
                <span>3</span>
                Ty wybierasz dogodny termin. My dopasowujemy się do Ciebie.
              </li>
              <li>
                <span>4</span>Gotowe! Płacisz dopiero po otrzymaniu kompletu dokumentów.
              </li>
            </ul>
            {/* <button className="start-button" onClick={next}>Zaczynamy!</button> */}
          </div>
        </div>
      ),
    },
    {
      title: "Wybierz rodzaj nieruchomości",
      content: (
        <div className="form-steps">
          <CustomDropdown
            className="slide-version"
            options={options}
            placeholder="Wybierz typ nieruchomości"
            onSelect={(option) => {
              setFormData((prev) => ({ ...prev, propertyType: option.value }));
              setSelectedType(option.value);
            }}
            selectedValue={selectedType}
          />
        </div>
      ),
    },
    {
      title: "Podaj liczbę klatek",
      condition: formData.propertyType === "budynek wielorodzinny",
      content: (
        <input
          type="number"
          name="numberOfBlocks"
          value={formData.numberOfBlocks}
          onChange={handleChange}
          placeholder="np. 3"
        />
      ),
    },
    {
      title: "Wybierz zakres przeglądów",
      content: (
        <div className="inspection-checklist">
          {(formData.propertyType === "dom jednorodzinny" ? [
            {
              key: "specjalista",
              title: "Odbiór techniczny nieruchomości",
              desc: " ",
              newPrice: "od 500 zł",
            },
            {
              key: "budowlany",
              title: "Przegląd budowlany",
              desc: " (raz na 5 lat)",
              newPrice: "od 400 zł",
            },
            {
              key: "gaz",
              title: "Przegląd instalacji gazowej",
              desc: " (co 1 rok)",
              newPrice: "od 250 zł",
            },
            {
              key: "elektryka",
              title: "Przegląd instalacji elektrycznej",
              desc: " ",
              newPrice: "od 400 zł",
            },
            {
              key: "wentylacja",
              title: "Przegląd wentylacji grawitacyjnej",
              desc: " (co 1 rok)",
              newPrice: "od 200 zł",
            },
            {
              key: "kompletny",
              title: "Kompletny przegląd 5-cio letni",
              desc: " ",
              newPrice: "900 zł",
            },
          ] : [
            {
              key: "specjalista",
              title: "Odbiór techniczny nieruchomości",
              desc: " ",
              newPrice: "od 500 zł",
            },
            {
              key: "budowlany_5lat",
              title: "Przegląd budowlany",
              desc: " (raz na 5 lat)",
              newPrice: "wyc. ind.",
            },
            {
              key: "budowlany_roczny",
              title: "Przegląd budowlany",
              desc: " (co 1 rok)",
              newPrice: "wyc. ind.",
            },
            {
              key: "gaz",
              title: "Przegląd instalacji gazowej",
              desc: " (co 1 rok)",
              newPrice: "wyc. ind.",
            },
            {
              key: "elektryka",
              title: "Przegląd instalacji elektrycznej",
              desc: " ",
              newPrice: "wyc. ind.",
            },
            {
              key: "kompletny",
              title: "Kompletny przegląd 5-cio letni",
              desc: " ",
              newPrice: "wyc. ind.",
            },
          ]).map((item) => (
            <label key={item.key} className="inspection-option">
              <input
                type="checkbox"
                name={item.key}
                checked={formData.inspections[item.key] || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inspections: {
                      ...prev.inspections,
                      [item.key]: e.target.checked,
                    },
                  }))
                }
              />
              <div className="label-texts">
                <span className="title">{item.title}</span>
                <span className="desc">{item.desc}</span>
              </div>
              <div className="price">
                <span className="new">{item.newPrice}</span>
              </div>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Adres nieruchomości",
      content: (
        <div className="contact-form">
          <input
            type="text"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleChange}
            placeholder="Adres budynku/ulica *"
            required
          />
          <input
            type="text"
            name="nearestCity"
            value={formData.nearestCity || ""}
            onChange={handleChange}
            placeholder="Miasto *"
            required
          />
        </div>
      ),
    },
    {
      title: "Jak pilne jest przeprowadzenie przeglądu?",
      isFinalStep: true,
      content: (
        <CustomDropdown
          className="slide-version"
          options={optionsTime}
          placeholder="Wybierz termin"
          onSelect={(option) => {
            setFormData((prev) => ({ ...prev, preferredDate: option.value }));
          }}
          selectedValue={formData.preferredDate}
        />
      ),
    },
    {
      title: "Co dalej?",
      isDecisionStep: true,
      content: (
        <div className="form-steps">
          <p>
            W następnym kroku podsumujemy wprowadzone dane nieruchomości.
            <br />
            Jeśli chcesz zgłosić kolejną nieruchomość, kliknij odpowiedni
            przycisk.
          </p>
        </div>
      ),
    },
  ];

  const filteredSteps = steps.filter((step) => step.condition !== false);
  const step = filteredSteps[currentStep];


  // Usunięto IntersectionObserver, który blokował przewijanie do sekcji poniżej formularza (np. do FAQ)

  useEffect(() => {
    if (currentStep <= 1) return; // nie przewijaj przy pierwszym kroku
    const section = document.getElementById("inspection-form");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isFullyVisible) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);




  return (
    <div className="inspection-form-wrapper" id="inspection-form">
      {!showSummary && (
        <div className="inspection-form-slide">
          <div className="icon-wrapper">{getStepIcon()}</div>

          {step.title.trim() !== "" ? <h3>{step.title}</h3> : null}
          <div className="form-content">{step.content}</div>

          <div className="form-navigation">
            {currentStep > 0 && !step.isDecisionStep && (
              <button className="prev" onClick={prev}>
                Wstecz
              </button>
            )}
            <div className="spacer" />
            {step.isDecisionStep ? (
              <>
                <button
                  className="prev"
                  onClick={() => {
                    handleSubmitProperty();
                    setCurrentStep(1); // pomijamy step 0 (intro)
                  }}
                >
                  Dodaj nieruchomość
                </button>
                <div className="spacer" />
                <button className="next" onClick={handleSendAndShowSummary}>
                  Dalej
                </button>
              </>
            ) : (
              <button
                className={`next ${!isCurrentStepValid() ? "disabled" : ""}`}
                onClick={next}
                disabled={!isCurrentStepValid()}
              >
                Dalej
              </button>
            )}
          </div>
        </div> // zamknięcie inspection-form-slide
      )}
      {showList && (
        <div className="summary-section">
          <h3>Dodane nieruchomości:</h3>
          <ul className="property-list">
            {submittedProperties.map((property, index) => (
              <li key={index} className="property-item">
                <strong>{property.propertyType}</strong> –{" "}
                {property.propertyAddress}, {property.nearestCity}
                <br />
                <small>
                  Zakres:{" "}
                  {Object.entries(property.inspections)
                    .filter(([_, checked]) => checked)
                    .map(([key]) => {
                      switch (key) {
                        case "gas":
                          return "gaz";
                        case "construction":
                          return "budowlany";
                        case "electrical":
                          return "elektryczny";
                        case "chimney":
                          return "wentylacja";
                        case "energy":
                          return "energetyczny";
                        default:
                          return key;
                      }
                    })
                    .join(", ") || "brak"}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSummary && (
        <>
          <div className="summary-section">
            <h3>Dodane nieruchomości:</h3>
            <ul className="property-list">
              {submittedProperties.map((property, index) => (
                <li key={index} className="property-item">
                  <strong>{property.propertyType}</strong> –{" "}
                  {property.propertyAddress}, {property.nearestCity}
                  <br />
                  <small>
                    Zakres:{" "}
                    {Object.entries(property.inspections)
                      .filter(([_, checked]) => checked)
                      .map(([key]) => {
                        switch (key) {
                          case "gas":
                            return "gaz";
                          case "construction":
                            return "budowlany";
                          case "electrical":
                            return "elektryczny";
                          case "chimney":
                            return "wentylacja";
                          case "energy":
                            return "energetyczny";
                          default:
                            return key;
                        }
                      })
                      .join(", ") || "brak"}
                  </small>
                </li>
              ))}
            </ul>
          </div>

          <div className="consents">
            <label>
              <input
                type="checkbox"
                checked={formData.selectAll}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFormData((prev) => ({
                    ...prev,
                    selectAll: checked,
                    remindMe: checked,
                    acceptPrivacy: checked,
                    acceptTerms: checked,
                  }));
                }}
              />{" "}
              Zaznacz wszystkie
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.remindMe}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    remindMe: e.target.checked,
                  }))
                }
              />{" "}
              Przypomnij mi o dacie kolejnego przeglądu
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.acceptPrivacy}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    acceptPrivacy: e.target.checked,
                  }))
                }
              />{" "}
              Zgadzam się na przekazanie danych zgodnie z{" "}
              <a
                href="/polityka-prywatnosci"
                target="_blank"
                rel="noopener noreferrer"
              >
                polityką prywatności
              </a>{" "}
              (wymagane)
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    acceptTerms: e.target.checked,
                  }))
                }
              />{" "}
              Akceptuję{" "}
              <a href="/regulamin" target="_blank" rel="noopener noreferrer">
                regulamin
              </a>{" "}
              serwisu (wymagane)
            </label>

            <div className="contactData">
              <h4>Pozostaw swoje dane do dalszego kontaktu</h4>
              <div className="contactData-name">
                <label>
                  <input
                    type="name"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Twoje imię(opcjonalnie)"
                  />
                </label>
              </div>
              <div className="contactData-phone">
                <label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="Numer telefonu (opcjonalnie)"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-navigation">
            <button className="next" onClick={handleFinalSubmit}>
              Wyślij zapytanie do Wykonawcy
            </button>
          </div>
        </>
      )}
      {popupMessage && (
        <PopupModal
          message={popupMessage}
          onClose={() => {
            setPopupMessage(null);
            if (currentUser) {
              window.location.href = "/";
            } else {
              window.location.href = "/login";
            }
          }}
        />
      )}
    </div>
  );
};

export default InspectionFormSlide;
```

## File: `src/sections/inspectionsForm/inspectionForm.scss` <a id="file-src-sections-inspectionsform-inspectionform-scss"></a>

```scss
@import "../../styles/variables.scss";

.inspection-form-wrapper {
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: $font-primary;
  color: $color-text-main;
  background-color: transparent;
  padding-top: 80px;
  padding-bottom: 120px;


  .inspection-form-slide {
    width: 100%;
    max-width: 700px;
    background-color: #ffffff;
    border-radius: 32px;
    padding: 60px 50px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
    font-family: $font-primary;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid rgba(0, 0, 0, 0.03);


    .icon-wrapper {
      background-color: rgba($color-signal-orange, 0.08);
      /* Very soft green */
      height: 80px;
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      /* Circle looks more modern */
      margin-bottom: 40px;
      color: $color-signal-orange;
    }

    h3 {
      font-size: 38px;
      font-weight: 300;
      margin-bottom: 40px;
      color: $color-text-main;
      text-align: left;
      /* Left align for cleaner reading on cards */
      line-height: 1.2;
    }

    .form-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;

      input {
        border: 2px solid transparent;
        /* No hard border by default */
        background-color: #f5f6f8;
        /* Soft inset background */
        border-radius: 16px;
        /* Pill-like inputs */
        padding: 16px 20px;
        font-size: 16px;
        color: $color-text-main;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

        &::placeholder {
          color: #a0a0a0;
          font-size: 16px;
        }

        &:hover {
          background-color: #eeeeef;
        }

        &:focus {
          outline: none;
          background-color: #ffffff;
          border-color: rgba($color-signal-orange, 0.4);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03), 0 0 0 4px rgba($color-signal-orange, 0.1);
        }
      }

      .form-steps {

        p {
          font-family: $font-primary;
          font-size: 18px;
        }

        .info-content {
          h2 {
            font-family: $font-primary;
            margin-bottom: 35px;
            font-size: 48px;
            font-weight: 300;
          }

          ul {
            display: flex;
            flex-direction: column;
            gap: 20px;

            li {
              font-family: $font-primary;
              font-size: 18px;
              background-color: $color-paper-white;
              list-style: none;
              width: 100%;
              padding: 25px 20px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              gap: 15px;
              border-radius: 10px;

              span {

                width: 28px;
                height: 28px;
                border-radius: 100px;
                background-color: $color-anthracite;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                font-weight: 200;
                flex-shrink: 0;
              }
            }
          }
        }
      }

      .inspection-checklist {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .inspection-option {
        display: grid;
        grid-template-columns: 32px 1fr auto;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        border-radius: 16px;
        background-color: #f9f9fb;
        border: 1px solid rgba(0, 0, 0, 0.02);
        transition: all 0.2s ease;
        cursor: pointer;

        &:hover {
          background-color: #f1f1f4;
          transform: translateY(-1px);
        }
      }

      /* Stylizacja tekstów */
      .inspection-option .label-texts {
        font-size: 16px;
        line-height: 1.4;
        color: $color-text-main;
        /* Zadbaj o kontrast */
      }

      /* Stylizacja ceny - kluczowa naprawa */
      .inspection-option .price {
        font-weight: bold;
        text-align: right;
        /* Cena wyrównana do prawej w swojej kolumnie */
        white-space: nowrap;
        /* ZABRANIA łamania ceny do nowej linii */
        color: #555;
      }

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }


  .summary-section {
    font-family: $font-primary;
    width: 100%;
    max-width: 700px;
    margin: 40px auto;

    h3 {
      margin-bottom: 20px;
      font-size: 32px;
    }

    .property-list {
      list-style: none;
      padding: 0;

      .property-item {
        font-family: $font-primary;
        font-size: 18px;
        padding: 10px 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;

        strong {
          color: $color-signal-orange;
        }

        small {
          color: #777;
        }
      }
    }
  }

  .consents {
    width: 100%;
    /* Zmieniamy z 700px na 100% */
    max-width: 700px;
    /* ...ale nie szersze niż 700px */
    margin: 0 auto;
    /* Wyśrodkowanie całego kontenera */
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* Odstępy między wierszami zgód */

    /* Stylizacja każdego wiersza ze zgodą (label) */
    label {
      display: flex;
      /* Flexbox układa checkbox obok tekstu */
      align-items: flex-start;
      /* KLUCZOWE: Wyrównuje do GÓRY (gdy tekst ma 2 linie) */
      gap: 15px;
      /* Odstęp między checkboxem a tekstem */
      cursor: pointer;
      /* Łapka po najechaniu */
      font-family: $font-primary;
      color: $color-text-main;
      line-height: 1.5;
      /* Lepsza czytelność tekstu */

      /* Stylizacja samego kwadracika checkboxa */
      input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        min-width: 24px;
        width: 24px;
        height: 24px;
        border: 2px solid #e1e3e6;
        border-radius: 6px;
        display: grid;
        place-content: center;
        margin-top: 2px;
        background-color: #fff;
        transition: all 0.2s ease;
        cursor: pointer;

        /* Co się dzieje po zaznaczeniu */
        &:checked {
          background-color: $color-signal-orange;
          border-color: $color-signal-orange;
          box-shadow: 0 4px 10px rgba($color-signal-orange, 0.2);
        }

        /* "Ptaszek" w środku */
        &:checked::before {
          content: "";
          width: 14px;
          height: 14px;
          box-shadow: inset 1em 1em white;
          transform-origin: center;
          clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }

        &:focus {
          box-shadow: 0 0 0 3px rgba($color-signal-orange, 0.2);
          outline: none;
        }
      }

      /* Styl dla linków wewnątrz zgód */
      a {
        color: $color-signal-orange;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid rgba($color-signal-orange, 0.3);
        transition: border-color 0.2s;

        &:hover {
          border-bottom-color: $color-signal-orange;
        }
      }
    }

    /* Sekcja z polami tekstowymi (Imię, Telefon) */
    .contactData {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      input {
        width: 100%;
        border: 2px solid transparent;
        border-radius: 16px;
        padding: 16px 20px;
        font-size: 16px;
        font-family: $font-primary;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        background-color: #f5f6f8;
        color: $color-text-main;

        &::placeholder {
          color: #a0a0a0;
        }

        &:hover {
          background-color: #eeeeef;
        }

        &:focus {
          outline: none;
          background-color: #ffffff;
          border-color: rgba($color-signal-orange, 0.4);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03), 0 0 0 4px rgba($color-signal-orange, 0.1);
        }
      }
    }
  }

  .form-navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 40px;
    min-height: 60px;

    .spacer {
      flex: 1;
    }

    button {
      padding: 16px 32px;
      font-size: 18px;
      font-weight: 500;
      background-color: $color-signal-orange;
      color: #fff;
      border: none;
      border-radius: 32px;
      /* Pill shape */
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 8px 20px rgba($color-signal-orange, 0.25);

      &:hover {
        background-color: darken($color-signal-orange, 5%);
        transform: translateY(-2px);
        box-shadow: 0 12px 25px rgba($color-signal-orange, 0.35);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 4px 10px rgba($color-signal-orange, 0.2);
      }

      &.next {
        margin-left: 15px;
      }

      &.prev {
        background-color: #f0f1f4;
        color: #555;
        box-shadow: none;
        margin-right: auto;

        &:hover {
          background-color: #e4e5e8;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }
      }

      &.disabled {
        background-color: #e5e7eb;
        color: #9ca3af;
        cursor: not-allowed;
        box-shadow: none;
        pointer-events: none;
      }
    }
  }
}

@media (min-width: 769px) and (max-width: 1440px) {
  .inspection-form-wrapper {
    width: 100%;
    display: flex;

    align-items: center;


    .inspection-form-slide {
      max-width: 650px;
    }
  }
}

@media (max-width: 768px) {
  .inspection-form-wrapper {
    width: 100%;
    background-color: transparent;
    padding: 60px 16px 40px 16px;

    .inspection-form-slide {
      width: 100%;
      height: auto;
      padding: 36px 20px;
      border-radius: 24px;

      .icon-wrapper {
        margin-bottom: 20px;
        height: 64px;
        width: 64px;
        border-radius: 16px;

        svg {
          font-size: 36px;
        }
      }

      h3 {
        font-size: clamp(1.4rem, 5vw, 2rem);
        margin-bottom: 24px;
      }

      .form-content {
        height: auto;
        width: 100%;
        padding: 0;

        .form-steps {
          .info-content {
            width: 100%;

            h2 {
              padding: 0;
              margin-bottom: 16px;
              font-size: clamp(1.25rem, 4.5vw, 1.75rem);
            }

            ul {
              gap: 12px;

              li {
                font-size: 15px;
                padding: 14px 16px;
                min-height: auto;
                border-radius: 12px;
              }
            }
          }
        }
      }
    }

    .summary-section {
      width: 100%;
      margin: 40px auto 30px auto;
      padding: 0;

      h3 {
        font-family: $font-primary;
        font-weight: 500;
        margin-bottom: 20px;
        font-size: 22px;
      }

      ul {
        li {
          font-family: $font-primary;
          font-weight: 400;

          strong {
            font-weight: 700;
          }
        }
      }
    }

    .consents {
      width: 100%;
      font-family: $font-primary;
      font-weight: 400;
      padding: 10px 0;

      label {
        font-size: 13px;
        line-height: 1.5;

        input {
          margin-right: 10px;
        }
      }

      .contactData {
        font-family: $font-primary;

        .contactData-name,
        .contactData-phone {
          label {
            input {
              border: 1px solid #cbd5e1;
              border-radius: 12px;
              padding: 12px 16px;
            }
          }
        }
      }
    }

    .form-navigation {
      margin-top: 24px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }
  }
}
```

## File: `src/sections/main/Main.jsx` <a id="file-src-sections-main-main-jsx"></a>

```jsx
import React, { useEffect, useRef } from "react";
import "./main.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OrderButton from "../../components/OrderButton/OrderButton";
import MainFooter from "../../components/MainFooter/MainFooter";
import AnimatedText from "../../components/animations/AnimatedText";
import MagneticButton from "../../components/animations/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Main({ user, customCity }) {
  const sectionRef = useRef(null);
  const scannerLineRef = useRef(null);
  const maskLayerRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger for scanner effect
    const ctx = gsap.context(() => {
      // Animate mask revealing the "blueprint" image and the laser line moving down
      gsap.to(maskLayerRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(scannerLineRef.current, {
        top: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-section" ref={sectionRef}>
      {/* Background Layer (Normal Image) */}
      <div className="hero-bg-normal"></div>

      {/* Masked Blueprint Layer & Scanner Line */}
      <div className="hero-bg-blueprint" ref={maskLayerRef}>
        <div className="blueprint-overlay"></div>
      </div>

      <div className="scanner-line" ref={scannerLineRef}>
        <div className="scanner-flare"></div>
      </div>

      <div className="hero-content">
        <div className="hero-header-group">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text-full">Przeglądy Budowlane & Techniczne</span>
            <span className="badge-text-short">Przeglądy Techniczne</span>
          </div>

          <h1 className="hero-title-container">
            <AnimatedText
              text={customCity ? `${customCity} & Śląsk` : "Gliwice & Śląsk"}
              tag="span"
              className="city-name"
              delay={0.3}
            />
          </h1>

          <p className="hero-subtitle">
            <span className="subtitle-line">Roczne i 5-letnie kontrole budowlane domów oraz instalacji.</span>
            <span className="subtitle-line subtitle-credentials">Inżynier z uprawnieniami SLK/2122/OWOK/08</span>
          </p>

          <div className="order-button-wrapper">
            <MagneticButton>
              <OrderButton
                text="Umów przegląd"
                userAvatar={user?.photoURL}
                onClick={scrollToInspectionForm}
              />
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="main-footer">
        <MainFooter />
      </div>
    </div>
  );
}
```

## File: `src/sections/main/main.scss` <a id="file-src-sections-main-main-scss"></a>

```scss
@import "../../styles/variables.scss";

.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: $color-paper-white;

  // 1. BASE BACKGROUND IMAGE (NORMAL)
  .hero-bg-normal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/heading_pic.png");
    background-size: auto 80%;
    background-position: right -50px bottom; // Zmień -50px, aby regulować przesunięcie
    background-repeat: no-repeat;
    z-index: 1;
    filter: grayscale(50%) contrast(1.1);
  }

  // 2. BLUEPRINT / SCANNED LAYER
  .hero-bg-blueprint {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/heading_pic.png");
    background-size: auto 80%;
    background-position: right -50px bottom; // Ta sama wartość co wyżej
    background-repeat: no-repeat;
    z-index: 2;
    clip-path: inset(0% 0% 100% 0%); // Starts fully hidden from bottom

    // We create a blueprint wireframe simulation using CSS filters
    filter: contrast(150%) brightness(50%) sepia(100%) hue-rotate(180deg) saturate(200%);

    .blueprint-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient($color-border-subtle 1px, transparent 1px),
        linear-gradient(90deg, $color-border-subtle 1px, transparent 1px);
      background-size: 50px 50px;
      mix-blend-mode: overlay;
      opacity: 0.6;
    }
  }

  // 3. SCANNER LASER LINE
  .scanner-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: $color-signal-orange;
    z-index: 3;
    box-shadow: 0 0 15px $color-signal-orange, 0 0 30px $color-signal-orange;

    .scanner-flare {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 4px;
      background: radial-gradient(ellipse at center, lighten($color-signal-orange, 20%) 0%, transparent 70%);
      opacity: 0.8;
    }
  }

  // 4. GŁÓWNA TREŚĆ
  .hero-content {
    position: absolute;
    bottom: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 100%;
    padding: 0 8% 110px;
    align-items: flex-start;
    pointer-events: none; // Let events pass to magnetic button

    .hero-header-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.25rem;
      pointer-events: auto;
      max-width: 850px;

      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        background: rgba($color-signal-orange, 0.08);
        border: 1px solid rgba($color-signal-orange, 0.25);
        border-radius: 30px;
        font-family: $font-primary;
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: $color-signal-orange;

        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: $color-signal-orange;
          box-shadow: 0 0 8px rgba($color-signal-orange, 0.9);
        }

        .badge-text-short {
          display: none;
        }
      }
    }

    .hero-title-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: $color-anthracite;
      margin: 0;

      .city-name {
        font-family: $font-primary;
        font-size: clamp(2.8rem, 6vw, 6.2rem);
        font-weight: 800;
        letter-spacing: -2px;
        line-height: 1.05;
        text-transform: uppercase;
        color: #0f172a;
        display: block;
        margin: 0;
      }
    }

    .hero-subtitle {
      font-family: $font-primary;
      font-size: clamp(1rem, 1.3vw, 1.25rem);
      font-weight: 400;
      color: #334155;
      max-width: 620px;
      line-height: 1.6;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .subtitle-line {
        display: block;
      }

      .subtitle-credentials {
        font-size: 0.9em;
        color: #64748b;
        font-weight: 500;
      }
    }

    .magnetic-wrapper {
      pointer-events: auto;
    }

    .order-button-wrapper {
      margin-top: 0.5rem;
      pointer-events: auto;
    }
  }

  // 5. STOPKA SEKCJI
  .main-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 5;
    padding: 0 5%;
  }
}

/* --- RESPONSYWNOŚĆ --- */

/* 1. TABLETY I ŚREDNIE EKRANY (max-width: 1024px) */
@media (max-width: 1024px) {
  .hero-section {
    .hero-bg-normal,
    .hero-bg-blueprint {
      background-size: auto 70%;
      background-position: right -40px bottom;
    }

    .hero-content {
      padding: 0 40px 80px;
      gap: 2rem;

      .hero-title-container {
        .city-name {
          font-size: clamp(2.4rem, 5vw, 4rem);
        }
      }
    }
  }
}

/* 2. SMARTFONY I MAŁE TABLETY (max-width: 768px) */
@media (max-width: 768px) {
  .hero-section {
    height: 100vh;
    height: 100dvh;
    min-height: 560px;
    position: relative;
    overflow: hidden;

    // Zdjęcie inżyniera z narzędziami z dużą ilością przestrzeni nad głową
    .hero-bg-normal,
    .hero-bg-blueprint {
      background-size: auto 44%;
      background-position: right -15px bottom;
      filter: contrast(1.05);
    }

    .hero-content {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      text-align: center;
      padding: calc(64px + 18px) 18px 20px 18px;
      box-sizing: border-box;
      gap: 0;
      pointer-events: none;

      .hero-header-group {
        width: 100%;
        max-width: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 10px;
        pointer-events: auto;

        .hero-badge {
          padding: 5px 14px;
          font-size: 0.72rem;
          letter-spacing: 1px;
          margin-bottom: 2px;
          background: rgba($color-signal-orange, 0.08);
          border: 1px solid rgba($color-signal-orange, 0.25);

          .badge-text-full {
            display: none;
          }
          .badge-text-short {
            display: inline;
          }
        }

        .hero-title-container {
          align-items: center;
          text-align: center;
          width: 100%;
          margin: 0;

          .city-name {
            font-size: clamp(2rem, 7.5vw, 2.5rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.5px;
            text-transform: uppercase;
            color: #0f172a;
            margin: 0;
            display: block;
          }
        }

        .hero-subtitle {
          font-size: 0.88rem;
          line-height: 1.5;
          color: #475569;
          max-width: 310px;
          margin: 2px auto 6px auto;
          text-align: center;
          gap: 3px;

          .subtitle-line {
            display: block;
          }

          .subtitle-credentials {
            font-size: 0.8rem;
            color: #64748b;
            font-weight: 500;
          }
        }

        .order-button-wrapper {
          margin-top: 10px;
          width: 100%;
          display: flex;
          justify-content: center;
          z-index: 25;
          pointer-events: auto;

          .order-button {
            min-height: 48px;
            width: 240px;
            font-size: 15px;
            padding: 4px 8px 4px 18px !important;
            box-shadow: 0 4px 16px rgba(250, 189, 0, 0.35);
          }
        }
      }
    }
  }
}

/* 3. BARDZO MAŁE EKRANY (max-width: 380px np. iPhone SE) */
@media (max-width: 380px) {
  .hero-section {
    .hero-bg-normal,
    .hero-bg-blueprint {
      background-size: auto 40%;
      background-position: right -15px bottom;
    }

    .hero-content {
      padding: calc(64px + 10px) 12px 14px 12px;

      .hero-header-group {
        gap: 8px;

        .hero-badge {
          padding: 4px 10px;
          font-size: 0.68rem;
        }

        .hero-title-container {
          .city-name {
            font-size: 1.8rem;
          }
        }

        .hero-subtitle {
          font-size: 0.8rem;
          max-width: 270px;
        }

        .order-button-wrapper .order-button {
          min-height: 46px;
          width: 220px;
          font-size: 14px;
        }
      }
    }
  }
}
```

## File: `src/sections/process/Process.jsx` <a id="file-src-sections-process-process-jsx"></a>

```jsx
import React from 'react';
import './process.scss';

const processSteps = [
    {
        id: "01",
        title: "Rozpoznanie i analiza",
        desc: "Przegląd budowlany rozpoczynamy od fachowej analizy dokumentacji projektowej i weryfikacji wpisów w Książce Obiektu Budowlanego (KOB). Przeprowadzamy szczegółowy wywiad inżynieryjny i planujemy precyzyjny zakres audytu technicznego.",
        data: [
            { label: "STATUS", value: "INICJACJA" },
            { label: "WYMAGANIA", value: "KOB, RZUTY" },
            { label: "CZAS", value: "24H" }
        ]
    },
    {
        id: "02",
        title: "Wizja lokalna i pomiary",
        desc: "Ekspercka inżynieryjna inspekcja oraz odbiór techniczny nieruchomości. Podczas diagnozowania uszkodzeń wykorzystujemy m.in. profesjonalne kamery termowizyjne, drony i zaawansowane mierniki do oceny stanu faktycznego nośności, szczelności oraz instalacji.",
        data: [
            { label: "STATUS", value: "W TOKU" },
            { label: "SPRZĘT", value: "DRON, FLIR, SONEL" },
            { label: "CZAS", value: "1-5H" }
        ]
    },
    {
        id: "03",
        title: "Analiza wad i usterek",
        desc: "Rzetelna inżynieryjna identyfikacja wad oraz usterek technicznych budynków jednorodzinnych i komercyjnych. Zapewniamy klasyfikację stopnia uszkodzeń pod względem bezpośredniego zagrożenia dla konstrukcji, wymagań bezpieczeństwa ubezpieczyciela oraz zgodności z Prawem Budowlanym.",
        data: [
            { label: "STATUS", value: "EWALUACJA" },
            { label: "NORMA", value: "PN-EN 1990" },
            { label: "CZAS", value: "48H" }
        ]
    },
    {
        id: "04",
        title: "Protokół i Certyfikat bezpieczeństwa",
        desc: "Zwieńczeniem procesu jest prawomocny protokół z wykonanego przeglądu rocznego lub 5-letniego opatrzony pieczęcią inżyniera z uprawnieniami konstrukcyjno-budowlanymi i instalacyjnymi. Dokument w pełni honorowany m.in. przez PINB czy Nadzór Budowlany (zgodnie z Art. 62 PB) oraz ubezpieczyciela.",
        data: [
            { label: "STATUS", value: "ZAKOŃCZONO" },
            { label: "MOC PRAWNA", value: "ART. 62 PB" },
            { label: "CZAS", value: "NATYCHMIAST" }
        ]
    }
];

export default function Process() {
    return (
        <section className="process-section" id="process">
            <div className="process-header">
                <h2>Procedura Audytowa</h2>
                <p>Proces inżynieryjny krok po kroku. Eliminujemy ryzyko na każdym etapie.</p>
            </div>

            <div className="process-stack-container">
                {processSteps.map((step, index) => (
                    <div
                        key={step.id}
                        className="process-card"
                        style={{
                            top: `calc(120px + ${index * 40}px)`,
                            zIndex: index, // Ensure stacking order
                        }}
                    >
                        <div className="noise-overlay"></div>
                        <div className="card-top-bar">
                            <span className="step-id">KROK_{step.id}</span>
                            <span className="step-dots">
                                {[0, 1, 2, 3].map((dotIndex) => (
                                    <span key={dotIndex} className={`dot ${dotIndex <= index ? 'active' : ''}`}></span>
                                ))}
                            </span>
                        </div>

                        <div className="card-content">
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>

                        <div className="card-footer-data">
                            {step.data.map((d, i) => (
                                <div className="data-block" key={i}>
                                    <span className="data-label">{d.label}</span>
                                    <span className="data-value">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
```

## File: `src/sections/process/process.scss` <a id="file-src-sections-process-process-scss"></a>

```scss
@import "../../styles/variables.scss";

.process-section {
    padding: 8rem 2rem 4rem; // Adjusted padding instead of min-height
    background-color: $color-anthracite;
    position: relative;

    // Background pattern for industrial feel
    background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
}

.process-header {
    text-align: center;
    margin-bottom: 6rem;
    color: $color-paper-white;

    h2 {
        font-family: $font-primary;

        font-size: 48px;
        font-weight: 300;
        letter-spacing: 1px;
        margin-bottom: 1rem;
        color: $color-white;
    }

    p {
        font-family: $font-secondary;
        color: rgba(255, 255, 255, 0.7);
        max-width: 600px;
        margin: 0 auto;
        font-size: 22px;
    }
}

.process-stack-container {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 20vh; // Reduced from 100vh to remove the huge tail
}

.process-card {
    position: sticky;
    background-color: $color-paper-white;
    border-radius: 12px;
    padding: 3rem;
    margin-bottom: 100px; // Spacing between cards when scrolling
    box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease;
    overflow: hidden;

    // The Noise overlay effect
    .noise-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.05;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        z-index: 1;
    }

    // Inside layout
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border: 1px solid $color-border-subtle;
    position: sticky;

    .card-top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid $color-anthracite;
        padding-bottom: 1rem;
        position: relative;
        z-index: 2;

        .step-id {
            font-family: $font-secondary;
            font-size: 1.2rem;
            font-weight: 700;
            color: $color-signal-orange;
        }

        .step-dots {
            display: flex;
            gap: 6px;

            .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: lighten($color-anthracite, 60%);

                &.active {
                    background-color: $color-signal-orange;
                    animation: pulse 2s infinite;
                }
            }
        }
    }

    .card-content {
        position: relative;
        z-index: 2;

        h3 {
            font-size: clamp(2rem, 3.5vw, 3rem);
            font-weight: 800;
            color: $color-anthracite;
            margin-bottom: 1.5rem;
            line-height: 1.1;
            letter-spacing: -1px;
        }

        p {
            font-size: 1.2rem;
            color: lighten($color-anthracite, 20%);
            line-height: 1.6;
            max-width: 800px;
        }
    }

    .card-footer-data {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 2rem;
        position: relative;
        z-index: 2;

        .data-block {
            background-color: lighten($color-paper-white, 5%);
            border: 1px solid $color-border-subtle;
            padding: 1rem;
            border-radius: 6px;
            display: flex;
            flex-direction: column;

            .data-label {
                font-family: $font-secondary;
                font-size: 0.8rem;
                color: lighten($color-anthracite, 40%);
                margin-bottom: 0.5rem;
            }

            .data-value {
                font-family: $font-secondary;
                font-size: 1.1rem;
                font-weight: 700;
                color: $color-anthracite;
            }
        }
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.5);
        opacity: 0.5;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .process-section {
        display: none;
    }
}
```

## File: `src/sections/scope/Scope.jsx` <a id="file-src-sections-scope-scope-jsx"></a>

```jsx
import React, { useState } from 'react';
import './scope.scss';
import OrderButton from '../../components/OrderButton/OrderButton';
import CallButton from '../../components/CallButton/CallButton';

const Scope = ({ user }) => {
  const [activeServiceHover, setActiveServiceHover] = useState(null);
  const [activeServiceClick, setActiveServiceClick] = useState(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const handleServiceClick = (id) => {
    setActiveServiceClick(id);
    if (window.innerWidth < 1024) {
      setIsMobileModalOpen(true);
    }
  };

  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
  };

  const scrollToInspectionForm = () => {
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      id: 'b2b',
      title: "Przeglądy roczne (B2B)",
      description: "Dla zarządców wspólnot, budynków biurowych, przemysłowych i wielkopowierzchniowych",
      features: ["Wymagane Art. 62 Prawa Budowlanego", "Kontrola instalacji i konstrukcji", "Wpis do KOB"],
      price: "Wycena indywidualna",
      backContent: "Nasze przeglądy roczne dla sektora B2B to gwarancja spełnienia wszystkich wymogów prawnych dla dużych obiektów."
    },
    {
      id: 'walls',
      title: "Przeglądy 5-letnie domu",
      description: "Kompleksowy przegląd konstrukcyjno-elektryczny wymagany przez ubezpieczycieli",
      features: ["Wymagany do wypłaty odszkodowania", "Pomiary elektryczne w cenie", "Sprawdzenie stanu technicznego domu"],
      price: "od 300 zł",
      backContent: "Przegląd 5-letni domu to nie tylko formalność dla ubezpieczyciela, ale przede wszystkim spokój o bezpieczeństwo twoich bliskich."
    },
    {
      id: 'pipes',
      title: "Instalacje: Gaz i Prąd",
      description: "Okresowa kontrola bezpieczeństwa instalacji w Twoim budynku",
      features: ["Kontrola szczelności instalacji gazowej", "Pomiary elektryczne", "Protokoły dla gazowni/elektrowni"],
      price: "od 300 zł",
      backContent: "Nieszczelna instalacja gazowa lub przestarzała elektryka mogą stanowić bezpośrednie zagrożenie."
    },
    {
      id: 'foundation',
      title: "Doradztwo i Nadzory",
      description: "Wsparcie inżyniera przy zakupie, budowie lub problemach technicznych",
      features: ["Przegląd przed zakupem", "Opinie techniczne i ekspertyzy", "Kierownik budowy / Inspektor nadzoru"],
      price: "Wycena indywidualna",
      backContent: "Jako niezależni Inżynierowie stajemy po stronie Inwestora. Sprawdzimy usterki deweloperskie, poprowadzimy nadzór."
    },
    {
      id: 'roof',
      title: "Termowizja i Dron",
      description: "Nowoczesna diagnostyka budynków i instalacji fotowoltaicznych",
      features: ["Termowizja paneli PV", "Dane do audytów energetycznych", "Fotogrametria i inspekcje dachów"],
      price: "Wycena indywidualna",
      backContent: "Dzięki zaawansowanym dronom docieramy tam, gdzie wzrok nie sięga. Szybko ocenimy stan połaci dachowej."
    },
    {
      id: 'energy',
      title: "Energetyka (ŚCHE)",
      description: "Dokumentacja energetyczna wymagana przy sprzedaży, wynajmie lub dotacjach",
      features: ["Świadectwa Charakterystyki Energetycznej", "Audyty energetyczne", "Optymalizacja kosztów ogrzewania"],
      price: "Wycena indywidualna",
      backContent: "Sprzedajesz lub wynajmujesz nieruchomość? Potrzebujesz Świadectwa Charakterystyki Energetycznej (ŚCHE)."
    }
  ];

  const activeServiceId = activeServiceClick || activeServiceHover || 'walls'; // default to walls
  const activeService = services.find(s => s.id === activeServiceId);

  return (
    <section className="scope-section" id="scope">
      <div className="scope-container-blueprint">

        <div className="scope-header-blueprint">
          <h2>Interaktywny Audyt Budowlany</h2>
          <p>Najedź na elementy budynku, aby poznać szczegóły naszych usług inżynieryjnych.</p>
        </div>

        <div className="audit-layout">

          <div className="audit-svg-container" style={{ background: '#fff' }}>
            <svg viewBox="0 0 1024 1024" className="interactive-house-svg" preserveAspectRatio="xMidYMid meet">

              {/* Background Image - Charcoal Sketch */}
              <image href={require("../../assets/blueprint-schematic.png")} x="0" y="0" width="1024" height="1024" />

              {/* 1. Walls / Przeglądy 5-letnie domu (Main house walls and rooms) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'walls' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('walls')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('walls')}
              >
                <polygon points="120,320 528,320 528,780 120,780" className="svg-hotspot" />
              </g>

              {/* 2. B2B / Przeglądy roczne (Commercial Right Wing) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'b2b' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('b2b')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('b2b')}
              >
                <polygon points="528,340 910,340 910,780 528,780" className="svg-hotspot" />
              </g>

              {/* 3. Pipes / Instalacje Gaz i Prąd (Piping lines inside walls and kitchen area) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'pipes' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('pipes')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('pipes')}
              >
                {/* Specific inner hotspots marking "Electrical" and "Plumbing" zones from the sketch */}
                <rect x="238" y="325" width="280" height="300" className="svg-hotspot" />
                <rect x="135" y="635" width="375" height="145" className="svg-hotspot" />
              </g>

              {/* 4. Roof / Termowizja i Dron (Attic & Roof) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'roof' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('roof')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('roof')}
              >
                <polygon points="325,145 100,320 550,320" className="svg-hotspot" />
                <rect x="290" y="70" width="70" height="85" className="svg-hotspot" /> {/* Chimney */}
              </g>

              {/* 5. Foundation / Doradztwo i Nadzory (Ground and Piers) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'foundation' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('foundation')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('foundation')}
              >
                <rect x="0" y="780" width="1024" height="150" className="svg-hotspot" />
              </g>

              {/* 6. Energy / ŚCHE (Thermal Envelope) */}
              <g
                className={`svg-group hover-zone ${activeServiceId === 'energy' ? 'active' : ''}`}
                onMouseEnter={() => setActiveServiceHover('energy')}
                onMouseLeave={() => setActiveServiceHover(null)}
                onClick={() => handleServiceClick('energy')}
              >
                {/* A glowing envelope tracing the full exterior boundary of both structures */}
                <path d="M 0 780
                         L 0 514
                         L 100 440
                         L 100 320
                         L 326 142
                         L 556 320
                         L 556 339
                         L 910 339
                         L 910 780
                         Z"
                  className="svg-hotspot-envelope" />
              </g>

            </svg>
          </div>

          {/* RIGHT/MODAL: Active Service Details Panel */}
          <div className={`audit-details-panel ${isMobileModalOpen ? 'mobile-modal-open' : ''}`}>
            {activeService && (
              <div className="blueprint-card" key={activeService.id}>

                {/* Mobile Close Button */}
                <button className="mobile-close-btn" onClick={closeMobileModal} aria-label="Zamknij popup">
                  &times;
                </button>

                <div className="card-header-tech">
                  <span className="tech-id">DOC-{activeService.id.toUpperCase()}-01</span>
                  <h3>{activeService.title}</h3>
                </div>

                <p className="tech-desc">{activeService.description}</p>

                <div className="tech-specs">
                  <h4>SPECYFIKACJA AUDYTU</h4>
                  <ul>
                    {activeService.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="bracket">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tech-footer">
                  <div className="price-tag-tech">ESTYMACJA KOSZTÓW:<br /><span>{activeService.price}</span></div>

                  <div className="action-buttons">
                    {['b2b', 'walls', 'pipes'].includes(activeService.id) ? (
                      <OrderButton
                        text="Umów przegląd"
                        onClick={scrollToInspectionForm}
                        showIcon={false}
                      />
                    ) : (
                      <CallButton />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Scope;
```

## File: `src/sections/scope/scope.scss` <a id="file-src-sections-scope-scope-scss"></a>

```scss
@import "../../styles/variables.scss";

.scope-section {
  padding: 8rem 2rem;
  background-color: $color-paper-white;
  font-family: $font-primary;
  border-top: 1px solid $color-border-subtle;
  position: relative;

  // Subtle blueprint background continuation
  background-image: linear-gradient($color-border-subtle 1px, transparent 1px),
    linear-gradient(90deg, $color-border-subtle 1px, transparent 1px);
  background-size: 50px 50px;
}

.scope-container-blueprint {
  max-width: 1400px;
  margin: 0 auto;
}

.scope-header-blueprint {
  text-align: left;
  margin-bottom: 4rem;
  padding-left: 1.5rem;

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400;
    color: $color-anthracite;
    margin-bottom: 0.5rem;
    letter-spacing: -1px;
  }

  p {
    font-family: $font-secondary;
    font-size: 22px;
    color: lighten($color-anthracite, 30%);
    max-width: 600px;
  }
}

.audit-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

// ----------------------------------------
// LEFT: SVG INTERACTIVE HOUSE
// ----------------------------------------
.audit-svg-container {
  flex: 1 1 60%;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid $color-border-subtle;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.02);
  min-height: 400px;

  .interactive-house-svg {
    width: 100%;
    height: 100%;
    max-height: 500px;
    cursor: crosshair;
  }

  // SVG Stylings for Hover Zones over Background
  .svg-group {
    transition: all 0.3s ease;
    cursor: pointer;

    .svg-hotspot,
    .svg-hotspot-line,
    .svg-hotspot-envelope {
      fill: transparent;
      stroke: transparent;
      transition: all 0.3s ease;
      stroke-linejoin: round;
    }

    .svg-hotspot {
      stroke-width: 4;
    }

    .svg-hotspot-line {
      stroke-width: 4;
    }

    .svg-hotspot-envelope {
      stroke-width: 40;
      pointer-events: stroke; // Tylko gruby obrys reaguje na kliknięcia i najechanie
    }

    // Hover & Active States
    &:hover,
    &.active {
      .svg-hotspot {
        fill: rgba(255, 95, 31, 0.35); // Semi-transparent brand color
        stroke: $color-signal-orange;
      }

      .svg-hotspot-line {
        stroke: $color-signal-orange;
        stroke-width: 8;
      }

      .svg-hotspot-envelope {
        stroke: $color-signal-orange;
        stroke-width: 40;
        filter: drop-shadow(0 0 12px rgba(255, 95, 31, 0.9)); // Glowing aura for Energy/ŚCHE
      }
    }
  }
}

// ----------------------------------------
// RIGHT/MODAL: ACTIVE DETAILS PANEL
// ----------------------------------------
.audit-details-panel {
  flex: 1 1 40%;
  position: sticky;
  top: 100px; // sticks to screen while scrolling Left side

  // MOBILE: Hide by default or behave as a modal off-screen
  @media (max-width: 1023px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background-color: rgba(30, 30, 30, 0.85); // dark backdrop
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    // Default hidden state
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    // When opened
    &.mobile-modal-open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }

  .blueprint-card {
    background: $color-anthracite;
    color: $color-paper-white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    animation: fadeInSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    position: relative; // For the close button

    @media (max-width: 1023px) {
      width: 100%;
      max-width: 500px;
      padding: 1.5rem;
      max-height: 90vh;
      overflow-y: auto;

      // Prevent double animation on mobile since panel handles it
      animation: none;
    }

    // Mobile Close Button
    .mobile-close-btn {
      display: none;

      @media (max-width: 1023px) {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 15px;
        right: 15px;
        width: 35px;
        height: 35px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        color: $color-paper-white;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        line-height: 1;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          color: $color-signal-orange;
        }
      }
    }

    .card-header-tech {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 1rem;
      margin-bottom: 1.5rem;

      .tech-id {
        font-family: $font-secondary;
        font-size: 0.8rem;
        color: $color-signal-orange;
        letter-spacing: 2px;
      }

      h3 {
        font-size: 1.8rem;
        font-weight: 700;
        margin-top: 0.5rem;
      }
    }

    .tech-desc {
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
    }

    .tech-specs {
      margin-bottom: 2rem;

      h4 {
        font-family: $font-secondary;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: 1rem;
        letter-spacing: 1px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          font-family: $font-secondary;
          font-size: 0.95rem;
          margin-bottom: 0.8rem;
          color: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: flex-start;

          .bracket {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            background-color: $color-signal-orange;
            color: $color-paper-white;
            border-radius: 4px;
            margin-right: 12px;
            font-size: 14px;
            font-weight: 900;
            flex-shrink: 0;
            margin-top: 2px; // slightly adjust for typical line-height
          }
        }
      }
    }

    .tech-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1.5rem;

      .price-tag-tech {
        font-family: $font-secondary;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.5);
        align-self: flex-start;

        span {
          font-family: $font-primary;
          font-size: 1.5rem;
          font-weight: 700;
          color: $color-white;
          display: block;
          margin-top: 0.2rem;
        }
      }

      .action-buttons {

        .order-button,
        .sche_button,
        .main_button {
          justify-content: center;
        }
      }
    }
  }
}

@keyframes fadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .scope-section {
    padding: 3.5rem 1rem;
  }

  .scope-header-blueprint {
    margin-bottom: 2rem;
    padding-left: 0;
    text-align: center;

    h2 {
      font-size: clamp(1.75rem, 6vw, 2.3rem);
    }

    p {
      font-size: 1rem;
      margin: 0 auto;
    }
  }

  .audit-svg-container {
    padding: 1rem 0.5rem;
    min-height: 280px;
    border-radius: 8px;

    .interactive-house-svg {
      max-height: 340px;
    }
  }
}
```


# ================================================================================
# 6. FRONTEND – KOMPONENTY INTERFEJSU (UI COMPONENTS)
# ================================================================================

## File: `src/components/AdminRoute/AdminRoute.jsx` <a id="file-src-components-adminroute-adminroute-jsx"></a>

```jsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const { currentUser, isAdmin } = useAuth();

    if (!currentUser) {
        // Nie zalogowany? Wyślij na główny login z dopiskiem (żeby wrócić tu po zalogowaniu)
        return <Navigate to="/login?redirect=admin" replace />;
    }

    if (!isAdmin) {
        // Zalogowany, ale brak uprawnień admina? Wyślij gołych userów na dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
```

## File: `src/components/BlogPostDB/BlogPostDB.jsx` <a id="file-src-components-blogpostdb-blogpostdb-jsx"></a>

```jsx
// Aktualizacja pliku BlogPostDB.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./blogPostDB.scss";
import { useNavigate } from "react-router-dom";

const BlogPostDB = ({
  id,
  src = "",
  title,
  content = "",
  type,
  categories = [],
  borderRadius = "24px",
  specialCorner = false,
  onCategoryClick,
  onTitleClick,
}) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  // Placeholder image when Firestore/Firebase fails
  const fallbackSrc = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800";

  const handleTitleClick = (event) => {
    navigate(`/blogDB?openPost=${id}`);
    event.stopPropagation();
    event.preventDefault();
    if (onTitleClick) {
      onTitleClick();
    }
  };

  const borderRadiusStyle =
    typeof borderRadius === "string" ? { borderRadius } : borderRadius;

  if (type === "StandardPost") {
    return (
      <div className="post standard-post" style={borderRadiusStyle}>
        <img
          src={imgError || !src ? fallbackSrc : src}
          alt={title}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="wrapper">
          <div className="post-content">
            <div className="cat">
              {categories.map((cat, i) => (
                <span className="cat-item" key={i}>{cat}</span>
              ))}
            </div>
            <h2 className="postTitle" onClick={handleTitleClick}>
              {title}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (type === "TextPost") {
    return (
      <div className="post text-post" style={borderRadiusStyle}>
        <div className="post-content">
          <h2 className="postTitle" onClick={handleTitleClick}>
            {title}
          </h2>
          <p>{content?.replace(/(<([^>]+)>)/gi, "")}</p>
        </div>
        {specialCorner && (
          <div className="corner-wrapper">
            <button
              className="corner-btn-large"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleTitleClick(e);
              }}
            >
              <span className="corner-icon">+</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (type === "CategoriesPost") {
    return (
      <div className="post categories-post" style={borderRadiusStyle}>
        <div className="categories-buttons">
          {categories.slice(0, 10).map((category, index) => (
            <button
              key={index}
              className="category-button"
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="post standard-post" style={borderRadiusStyle}>
      <div className="post-content" style={{ padding: '20px' }}>
        <h2 className="postTitle" onClick={handleTitleClick} style={{ color: '#333' }}>
          {title}
        </h2>
      </div>
    </div>
  );
};

BlogPostDB.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  type: PropTypes.oneOf(["StandardPost", "TextPost", "CategoriesPost"]),
  categories: PropTypes.arrayOf(PropTypes.string),
  borderRadius: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      borderTopLeftRadius: PropTypes.string,
      borderTopRightRadius: PropTypes.string,
      borderBottomLeftRadius: PropTypes.string,
      borderBottomRightRadius: PropTypes.string,
    }),
  ]),
  specialCorner: PropTypes.bool,
  onCategoryClick: PropTypes.func,
  onTitleClick: PropTypes.func,
};

export default BlogPostDB;
```

## File: `src/components/BlogPostDB/blogPostDB.scss` <a id="file-src-components-blogpostdb-blogpostdb-scss"></a>

```scss
@import "../../styles/variables.scss";

$card-bg: #ffffff;
$shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
$shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
$accent-green: $color-signal-orange;

.post {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: $card-bg;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: $shadow-sm;
  font-family: "ProductSans", sans-serif;

  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-md;
  }
}

/* STANDARD POST */
.standard-post {
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    display: flex;
    align-items: flex-end;
    padding: 24px;
    box-sizing: border-box;
  }

  .post-content {
    color: white;
    z-index: 2;

    .cat {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;

      .cat-item {
        font-size: 11px;
        text-transform: uppercase;
        font-weight: 700;
        background: $accent-green;
        padding: 4px 10px;
        border-radius: 100px;
        letter-spacing: 0.5px;
      }
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
      line-height: 1.3;
      cursor: pointer;
      
      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

/* TEXT POST */
.text-post {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #edf2f7;

  .post-content {
    h2 {
      font-size: 1.4rem;
      font-weight: 700;
      color: $color-text-main;
      margin-bottom: 16px;
      cursor: pointer;
      &:hover { color: $accent-green; }
    }

    p {
      font-size: 15px;
      color: #718096;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}

/* CATEGORIES POST (The formerly pink filter box) */
.categories-post {
  background: white;
  border: 2px dashed rgba($accent-green, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .categories-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
    justify-content: center;

    .category-button {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 10px 18px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: $accent-green;
        color: white;
        border-color: $accent-green;
        transform: scale(1.05);
      }
    }
  }
}

/* CORNER BUTTON */
.corner-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  z-index: 10;

  .corner-square {
    display: none; // Hiding the old school cut-out
  }

  .corner-btn-large {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: rotate(90deg) scale(1.1);
      background: $accent-green;
      color: white;
    }

    .corner-icon {
      font-size: 1.5rem;
      color: #4a5568;
    }
    
    &:hover .corner-icon {
      color: white;
    }
  }
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .standard-post .post-content h2 {
    font-size: 1.1rem;
  }
}
```

## File: `src/components/BookingAgent/BookingAgent.jsx` <a id="file-src-components-bookingagent-bookingagent-jsx"></a>

```jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './BookingAgent.scss';


const BookingAgent = () => {
  const [status, setStatus] = useState("idle"); 
  const [messages, setMessages] = useState([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const messagesRef = useRef([]);
  const recognitionRef = useRef(null);
  const sessionActiveRef = useRef(false);
  const API_URL = "http://127.0.0.1:5001/przegladtechniczny-6b336/us-central1/chatAgent"; 

  // --- MOWA ---
  const speak = (text, shouldOpenInput = false) => {
    if (!text) return;
    setStatus("speaking");
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL'; 
    const voices = window.speechSynthesis.getVoices();
    const plVoice = voices.find(v => v.lang.includes("pl")) || voices[0];
    if (plVoice) utterance.voice = plVoice;

    utterance.onend = () => {
      // TU JEST NOWA LOGIKA:
      // Jeśli backend kazał otworzyć input (shouldOpenInput === true), to otwieramy i NIE słuchamy.
      if (shouldOpenInput) {
          console.log("📝 Stan EMAIL wykryty -> Otwieram input.");
          setShowEmailInput(true);
          setStatus("idle"); 
      } else {
          startListening();
      }
    };

    utterance.onerror = () => setStatus("idle");
    window.speechSynthesis.speak(utterance);
  };

  // --- SŁUCHANIE ---
  const startListening = () => {
    if (showEmailInput) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (recognitionRef.current) recognitionRef.current.abort();

    const recognition = new SpeechRecognition();
    recognition.lang = 'pl-PL';
    recognition.interimResults = false;

    recognition.onstart = () => setStatus("listening");
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (!transcript.trim()) return;
      const newHistory = [...messagesRef.current, { role: "user", content: transcript }];
      updateMessages(newHistory);
      handleAIResponse(newHistory);
    };
    recognition.onerror = (ev) => { if (ev.error !== 'no-speech') setStatus("idle"); };
    recognitionRef.current = recognition;
    recognition.start();
  };

  // --- KOMUNIKACJA ---
  const handleAIResponse = async (history) => {
    setStatus("processing");
    try {
      const res = await axios.post(API_URL, { messages: history });
      const { response, state } = res.data; // Pobieramy tekst I stan
      
      const updatedHistory = [...history, { role: "assistant", content: response }];
      updateMessages(updatedHistory);
      
      // Decyzja sterowana backendem: Czy to jest krok pobierania maila?
      const isEmailStep = (state === "EMAIL");
      
      speak(response, isEmailStep);

    } catch (error) { setStatus("idle"); }
  };

  const updateMessages = (newMessages) => {
    setMessages(newMessages);
    messagesRef.current = newMessages;
  };

  const handleManualStart = () => {
    setIsSessionActive(true);
    
    // --- DODAJ TĘ LINIJKĘ PONIŻEJ: ---
    sessionActiveRef.current = true; 
    
    setShowEmailInput(false);
    updateMessages([]);
    handleAIResponse([]); 
  };

  const resetSession = () => {
    console.log("⚡ RESET - Wznawiam mikrofon");
    
    // 1. Uciszamy bota
    window.speechSynthesis.cancel();
    
    // 2. Resetujemy stany blokujące
    if (recognitionRef.current) recognitionRef.current.abort();
    setStatus("idle");
    setShowEmailInput(false);
    
    // 3. Automatyczny restart nasłuchiwania (Rozruch na popych)
    // Dajemy 300ms na wyczyszczenie, żeby przeglądarka nie zgłupiała
    setTimeout(() => {
        if (sessionActiveRef.current) {
            startListening();
        }
    }, 300);
  };

  const handleSendEmail = (e) => {
      e.preventDefault(); 
      if (!emailValue.trim()) return;
      const content = `Mój email to: ${emailValue}`;
      setShowEmailInput(false);
      setEmailValue("");
      const newHistory = [...messagesRef.current, { role: "user", content: content }];
      updateMessages(newHistory);
      handleAIResponse(newHistory);
  };

  const handleCancelEmail = () => setShowEmailInput(false);
  useEffect(() => { return () => resetSession(); }, []);

  return (
    <div className={`agent-wrapper ${isSessionActive ? 'active-session' : ''}`}>
      <div className={`avatar-container ${status}`}>
        <div className="avatar-face">{status === 'speaking' ? '🗣️' : status === 'listening' ? '👂' : '🤖'}</div>
      </div>
      <div className="status-text">
        {showEmailInput ? "Wpisz email poniżej 👇" : (status === 'listening' ? "Słucham..." : (status === 'speaking' ? "Mówię..." : "Gotowy"))}
      </div>

      {showEmailInput && (
        <div className="email-container">
            <form className="email-form" onSubmit={handleSendEmail}>
                <input type="email" placeholder="jan@kowalski.pl" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} autoFocus />
                <div className="form-buttons">
                    <button type="submit" className="btn-send">Wyślij</button>
                    <button type="button" className="btn-cancel" onClick={handleCancelEmail}>Anuluj</button>
                </div>
            </form>
        </div>
      )}

      {!showEmailInput && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button className="talk-btn" onClick={handleManualStart}>{isSessionActive ? 'Restart' : 'Start'}</button>
            <button onClick={resetSession} className="reset-btn">⚡</button>
        </div>
      )}
      <div className="transcript-box">
          {messages.length > 0 && messages[messages.length - 1].role === 'assistant' ? messages[messages.length - 1].content : "..."}
      </div>
    </div>
  );
};

export default BookingAgent;
```

## File: `src/components/BookingAgent/BookingAgent.scss` <a id="file-src-components-bookingagent-bookingagent-scss"></a>

```scss
.agent-wrapper {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    padding: 15px;
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 9999;
    width: 160px;
    transition: all 0.3s ease;
  
    &.active-session {
      transform: scale(1.05);
      box-shadow: 0 15px 50px rgba(37, 99, 235, 0.2);
    }
  }
  
  .avatar-container {
    width: 70px;
    height: 70px;
    background: #f3f4f6;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    transition: all 0.3s;
    border: 4px solid transparent;
  
    /* STATUSY - KOLORY */
    &.listening { 
      border-color: #22c55e; /* ZIELONY - Mów teraz! */
      box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
      animation: pulseListen 1.5s infinite;
    }
    
    &.processing { 
      border-color: #eab308; /* ŻÓŁTY - Myśli */
      animation: spin 2s infinite linear;
    }
    
    &.speaking {
      border-color: #ef4444; /* CZERWONY - Cicho, bot mówi */
      transform: scale(1.1);
    }
  }
  
  .status-text {
    font-size: 13px;
    margin: 12px 0;
    color: #4b5563;
    text-align: center;
    min-height: 20px;
  }
  
  .talk-btn {
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  
    &.btn-start {
      background: #1f2937;
      color: white;
      &:hover { background: #374151; }
    }
  
    &.btn-stop {
      background: #fee2e2;
      color: #ef4444;
      font-size: 14px;
      font-weight: bold;
      &:hover { background: #fecaca; }
    }
  
    &:disabled { opacity: 0.5; cursor: wait; }
  }
  
  .live-captions {
      margin-top: 10px;
      font-size: 11px;
      color: #666;
      background: #f9fafb;
      padding: 5px;
      border-radius: 4px;
      width: 100%;
      text-align: center;
      max-height: 60px;
      overflow: hidden;
      font-style: italic;
  }
  
  @keyframes pulseListen {
    0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
    100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
  }
  
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }

  .email-form {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    width: 100%;
    max-width: 300px;
    animation: fadeIn 0.3s ease;
  
    input {
      flex: 1;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      outline: none;
  
      &:focus {
        border-color: #3b82f6;
      }
    }
  
    button {
      padding: 0 20px;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
  
      &:hover {
        background-color: #2563eb;
      }
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
```

## File: `src/components/CallButton/CallButton.jsx` <a id="file-src-components-callbutton-callbutton-jsx"></a>

```jsx
import React from "react";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import "./callButton.scss"


export default function CallButton({ phoneNumber }) {
  return (
    <a href={`tel:${phoneNumber}`} className="call_button">
      <div className="btn-icon">
        <PhoneInTalkIcon />
      </div>
      <span>690 029 414</span>
    </a>
  );
}
```

## File: `src/components/CallButton/callButton.scss` <a id="file-src-components-callbutton-callbutton-scss"></a>

```scss
@import "../../styles/variables.scss";

.call_button {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba($color-signal-orange, 0.85); // Zwiększono przezroczystość/opacity do 0.85
  border: 1px solid $color-signal-orange;
  padding: 8px 18px;
  border-radius: 50px;
  color: $color-paper-white; // Zmieniono na biały, aby kontrastował z jasnopomarańczowym tłem
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 280px;
  min-height: 60px;

  span {
    text-decoration: none;
    color: inherit;
    font-family: $font-primary;
    font-weight: 700;
    font-size: 18px;
  }

  .btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit; // Dziedziczy z nadrzędnego call_button (biały)
    font-size: 20px;
    order: -1; // Ikona przed tekstem jak w panelu klienta

    svg {
      font-size: inherit;
    }
  }

  &:hover {
    background: $color-signal-orange; // Pełen kolor na hoverze
    border-color: $color-signal-orange;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 95, 31, 0.3);
  }
}

/* --- RESPONSYWNOŚĆ --- */

@media (max-width: 768px) {
  .call_button {
    background: rgba($color-signal-orange, 0.85); // Utrzymujemy wyższą opacity tła dla mobile
    border: 1px solid $color-signal-orange;
    padding: 12px 25px;
    font-size: 1.1rem;

    span {
      font-size: 1.1rem;
    }

    .btn-icon {
      font-size: 24px;
    }
  }
}

@media (max-width: 480px) {
  .call_button {
    padding: 10px 20px;
    font-size: 1rem;

    span {
      font-size: 1rem;
    }

    .btn-icon {
      font-size: 22px;
    }
  }
}
```

## File: `src/components/CustomDropdown/CustomDropdown.jsx` <a id="file-src-components-customdropdown-customdropdown-jsx"></a>

```jsx
import React, { useEffect, useState } from "react";
import "./customDropdown.scss";

const CustomDropdown = ({ options, placeholder, onSelect, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Synchronizacja lokalnego stanu z props `selectedValue`
  useEffect(() => {
    if (selectedValue === null || selectedValue === "") {
      setSelected(null);
    } else {
      const matchingOption = options.find(
        (option) => option.value === selectedValue
      );
      setSelected(matchingOption || null);
    }
  }, [selectedValue, options]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option); // Przekazujemy cały obiekt opcji
  };

  return (
    <div className="custom-dropdown">
      <div
        className={`dropdown-header ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected.label : placeholder}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
            key={index}
            className={`dropdown-item ${
              selected && selected.value === option.value ? "selected" : ""
            }`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
```

## File: `src/components/CustomDropdown/customDropdown.scss` <a id="file-src-components-customdropdown-customdropdown-scss"></a>

```scss
.custom-dropdown {
  position: relative;
  font-family: "ProductSans";
  font-size: 18px;
  margin: 0;
  color: black;
}

.dropdown-header {
  padding: 10px;
  // border-bottom: 1px solid #000000;
  border: 0.5px solid black;
  border-radius: 25px;
  background-color: #fff;
  cursor: pointer;
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  margin: 0;
  font-size: 16px;
}

.dropdown-header.open {
  color: #000;
}

.dropdown-list {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.dropdown-item:active {
  background-color: #e0e0e0;
}
```

## File: `src/components/HeroParallaxWrapper/HeroParallaxWrapper.jsx` <a id="file-src-components-heroparallaxwrapper-heroparallaxwrapper-jsx"></a>

```jsx
import React from 'react';
import './HeroParallaxWrapper.scss';

const HeroParallaxWrapper = ({ children }) => {
  // Zakładamy, że children[0] to Hero, a children[1] to CityList
  const heroComponent = children[0];
  const cityListComponent = children[1];

  return (
    <div className="parallax-wrapper">
      
      {/* Warstwa 1: Hero (Sticky) */}
      <div className="parallax-hero-container">
        {heroComponent}
      </div>

      {/* Warstwa 2: Lista Miast (Overlay) */}
      <div className="parallax-city-overlay">
        {cityListComponent}
      </div>
      
    </div>
  );
};

export default HeroParallaxWrapper;
```

## File: `src/components/HeroParallaxWrapper/HeroParallaxWrapper.scss` <a id="file-src-components-heroparallaxwrapper-heroparallaxwrapper-scss"></a>

```scss
/* HeroParallaxWrapper.scss */

.parallax-wrapper {
  position: relative;
  width: 100%;
  height: 300vh;
  background-color: transparent;
  overflow: visible;

  @media (max-width: 768px) {
    height: 200vh;
  }
}

.parallax-hero-container {
  /* STRONA STARTOWA ZASTYGA NIERUCHOMO */
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  z-index: 1;
  /* Pod mapą */

  display: flex;
  flex-direction: column;
}

.parallax-city-overlay {
  /* MAPA WYSUWA SIĘ I ZASTYGA */
  position: sticky;
  top: 40vh;
  width: 100%;
  height: 60vh;
  z-index: 20;
  background-color: transparent !important;
  pointer-events: none;

  /* Estetyczne zaokrąglenie calej sekcji nasuwającej się */
  &>* {
    pointer-events: auto;
    border-radius: 40px 40px 0 0;
    box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    top: 12vh;
    height: 88vh;
    height: 88dvh;

    &>* {
      border-radius: 28px 28px 0 0;
      box-shadow: 0 -12px 35px rgba(0, 0, 0, 0.18);
    }
  }
}

/* Upewnienie się, że Home nie ma overflow: hidden który psuje sticky */
.home {
  overflow: visible !important;
}
```

## File: `src/components/InspectionsTimeline/InspectionsTimeline.jsx` <a id="file-src-components-inspectionstimeline-inspectionstimeline-jsx"></a>

```jsx
import React, { useState } from 'react';
import './InspectionsTimeline.scss';
import OrderButton from '../OrderButton/OrderButton';

const timelineData = [
  {
    period: "CO 1 ROK",
    items: [
      {
        id: 1,
        title: "Przegląd instalacji gazowej",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3a1 1 0 0 1 .4.2 8 8 0 0 0 2.5 2.6z"></path></svg>
        ),
        details: {
          why: "Wymagane przez Towarzystwa Ubezpieczeń oraz Nadzór Budowlany np. w sytuacji pożaru lub wybuchu gazu.",
          responsible: "Właściciel domu jednorodzinnego.",
          executor: "Osoby posiadające kwalifikacje wymagane przy wykonywaniu dozoru nad eksploatacją sieci gazowych.",
          legal: "Art. 62. Prawo Budowlane, pkt 1.1.c"
        }
      },
      {
        id: 2,
        title: "Przegląd kominiarski (Wentylacja)",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path><path d="M10 12h4"></path><path d="M12 4v16"></path><path d="M16 4h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"></path></svg>
        ),
        details: {
          why: "Ryzyko zatrucia czadem i pożaru sadzy. Brak przeglądu to częsta podstawa do odmowy wypłaty odszkodowania.",
          responsible: "Właściciel domu jednorodzinnego.",
          executor: "Mistrz kominiarski.",
          legal: "Art. 62. Prawo Budowlane, pkt 1.1.c"
        }
      }
    ]
  },
  {
    period: "CO 5 LAT",
    items: [
      {
        id: 3,
        title: "Pomiary elektryczne i piorunochronne",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        ),
        details: {
          why: "Zwarcie instalacji to jedna z najczęstszych przyczyn pożarów. Niezbędne do polisy ubezpieczeniowej.",
          responsible: "Właściciel nieruchomości.",
          executor: "Elektryk z uprawnieniami pomiarowymi.",
          legal: "Art. 62. Prawo Budowlane, pkt 1.2"
        }
      },
      {
        id: 4,
        title: "Generalny przegląd budowlany",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l8-4 8 4v14"></path><path d="M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5"></path></svg>
        ),
        details: {
          why: "Ocena stanu technicznego elementów konstrukcyjnych, dachu i elewacji. Pozwala uniknąć drogich awarii.",
          responsible: "Właściciel lub zarządca.",
          executor: "Inżynier z uprawnieniami budowlanymi.",
          legal: "Art. 62. Prawo Budowlane, pkt 1.2"
        }
      }
    ]
  }
];

const InspectionsTimeline = ({ user, onOrderClick }) => {
  const [activeId, setActiveId] = useState(null);

  const toggleItem = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="timeline-section">
      <div className="timeline-header">
        <h2>Zapamiętaj te terminy!</h2>
        <p>Lista obowiązkowych przeglądów wymaganych do ubezpieczenia domu.</p>
      </div>

      <div className="timeline-container">
        {/* Linia pionowa */}
        <div className="timeline-line-center"></div>

        {timelineData.map((group, groupIndex) => (
          <div key={groupIndex} className="timeline-group">
            {/* Znacznik czasu (np. CO 1 ROK) */}
            <div className="timeline-period-marker">
              <span>{group.period}</span>
            </div>

            <div className="timeline-items-wrapper">
              {group.items.map((item, index) => {
                const isActive = activeId === item.id;
                // Logika: nieparzyste na lewo, parzyste na prawo (w CSS)
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={item.id}
                    className={`timeline-item ${isLeft ? 'left' : 'right'} ${isActive ? 'active' : ''}`}
                  >
                    <div className="timeline-card" onClick={() => toggleItem(item.id)}>
                      <div className="card-header">
                        <div className="icon-box">
                          {item.icon}
                        </div>
                        <h3>{item.title}</h3>
                        <div className={`arrow-icon ${isActive ? 'rotated' : ''}`}>
                          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>

                      <div className={`card-body ${isActive ? 'open' : ''}`}>
                        <div className="card-content">
                          <div className="info-block">
                            <strong>Dlaczego to ważne?</strong>
                            <p>{item.details.why}</p>
                          </div>
                          <div className="info-block">
                            <strong>Kto odpowiada?</strong>
                            <p>{item.details.responsible}</p>
                          </div>
                          <div className="info-block">
                            <strong>Kto wykonuje?</strong>
                            <p>{item.details.executor}</p>
                          </div>
                          <div className="info-block legal">
                            <strong>Podstawa prawna:</strong>
                            <p>{item.details.legal}</p>
                          </div>

                          <div className="timeline-card-order-button">
                            <OrderButton
                              text="Umów przegląd"
                              showIcon={false}
                              onClick={(e) => {
                                e.stopPropagation(); // Zapobiega zamknięciu karty
                                const formSection = document.getElementById("inspection-form");
                                if (formSection) {
                                  formSection.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              padding="10px 24px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Kropka łącząca z linią */}
                    <div className="timeline-dot"></div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InspectionsTimeline;
```

## File: `src/components/InspectionsTimeline/InspectionsTimeline.scss` <a id="file-src-components-inspectionstimeline-inspectionstimeline-scss"></a>

```scss
/* Timeline.scss - Spójny styl */

@import "../../styles/variables.scss";

/* --- ZMIENNE (Dopasowane do projektu) --- */
$primary-orange: #f97316; // Główny kolor projektu
$bg-light: #f9f9f9;
$text-dark: #505050; // Zgodne z Scope
$text-gray: #6b7280; // Zgodne z Scope
$border-color: #e5e7eb; // Zgodne z Scope
$timeline-line-color: #e5e7eb; // Jasnoszary dla linii

.timeline-section {
  background-color: #ffffff;
  padding: 5rem 1rem; // Standardowy padding sekcji
  position: relative;
  overflow: hidden;
  font-family: 'Product Sans', sans-serif;
  // border-bottom: 1px solid $border-color; // Opcjonalne oddzielenie
}

/* Nagłówek sekcji - spójny z Scope/WhyImportant */
.timeline-header {
  text-align: center;
  margin-bottom: 3.5rem;

  h2 {
    font-family: $font-primary;
    font-size: 48px; // Standaryzowany rozmiar H2
    font-weight: 300; // Standaryzowana waga (lżejsza)
    color: $text-dark;
    margin-bottom: 1rem;
  }

  p {
    font-family: $font-secondary;

    font-size: 22px; // Standaryzowany rozmiar podtytułu
    color: $text-gray;
    max-width: 600px;
    margin: 0 auto;
  }
}

/* Kontener osi */
.timeline-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

/* Główna pionowa linia */
.timeline-line-center {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: $timeline-line-color;
  transform: translateX(-50%);
  z-index: 0;
}

/* Grupa (Znacznik czasu + Karty) */
.timeline-group {
  position: relative;
  margin-bottom: 60px;
  z-index: 1;
}

/* Znacznik czasu (Pastylka) */
.timeline-period-marker {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;

  span {
    background-color: $primary-orange; // Użycie głównego koloru
    color: white;
    padding: 8px 24px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 1px;
    // Opcjonalnie: usunięcie cienia lub zmiana na bardziej subtelny
    box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.3);
  }
}

.timeline-items-wrapper {
  position: relative;
  width: 100%;
}

/* Pojedynczy element (Wrapper na kartę) */
.timeline-item {
  width: 50%;
  margin-bottom: 30px;
  position: relative;
  padding: 0 40px;
  /* Odstęp od linii środkowej */
  box-sizing: border-box;

  /* Kropka na osi */
  .timeline-dot {
    position: absolute;
    top: 24px;
    /* Dopasuj do środka nagłówka karty */
    width: 14px; // Nieco większa kropka
    height: 14px;
    background-color: white;
    border: 3px solid $primary-orange; // Kolor obramowania kropki
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 0 0 2px white; // Dodatkowy biały obrys dla lepszego kontrastu z linią
  }

  /* Logika Lewo / Prawo */
  &.left {
    left: 0;

    // text-align: right; // Wyrównanie tekstu wewnątrz wrapper'a (opcjonalne)
    .timeline-dot {
      right: -7px; // Połowa szerokości kropki (14px / 2)
    }
  }

  &.right {
    left: 50%;
    text-align: left;

    .timeline-dot {
      left: -7px;
    }
  }
}

/* Karta - spójny styl z scope-card */
.timeline-card {
  background: white;
  border-radius: 12px; // Zaokrąglenie zgodne z Scope
  border: 1px solid $border-color; // Płaska ramka zamiast cienia
  box-shadow: none; // Usunięcie domyślnego cienia
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  overflow: hidden;
  text-align: left;
  /* Resetujemy wyrównanie wewnątrz karty */
  position: relative;

  /* Efekt Hover - spójny z scope-card */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: $primary-orange; // Opcjonalnie: zmiana koloru ramki przy hover
  }
}

/* Nagłówek Karty */
.card-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;

  .icon-box {
    color: $primary-orange; // Główny kolor ikony
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #fff7ed; // Bardzo jasny pomarańczowy tła
    border-radius: 8px;
    flex-shrink: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  h3 {
    font-family: $font-primary;
    flex-grow: 1;
    font-size: 1.15rem; // Nieco większy rozmiar
    font-weight: 700; // Waga zgodna z nagłówkami kart w Scope
    margin: 0;
    color: $text-dark;
  }

  .arrow-icon {
    color: $text-gray;
    transition: transform 0.3s ease;

    &.rotated {
      transform: rotate(180deg);
      color: $primary-orange;
    }
  }
}

/* Rozwijana treść */
.card-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-out;
  background-color: #ffffff; // Tło białe, spójne z kartą

  &.open {
    max-height: 600px;
    /* Zwiększony limit */
    border-top: 1px solid $border-color;
  }
}

.card-content {
  padding: 20px;
  font-size: 0.95rem;
  color: #4b5563; // Spójny kolor tekstu (odpowiednik $text-gray)
  line-height: 1.6;
}

.info-block {
  margin-bottom: 16px;
  font-family: $font-secondary;

  strong {
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: $text-gray;
    margin-bottom: 6px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  p {
    margin: 0;
    color: $text-dark; // Ciemniejszy kolor dla głównej treści
  }

  &.legal p {
    font-family: monospace;
    background: #f3f4f6; // Jasnoszary tło
    padding: 6px 10px;
    border-radius: 6px;
    display: inline-block;
    font-size: 0.85rem;
    border: 1px solid #e5e7eb;
  }
}

// Styl kontenera przycisku wewnątrz karty
.timeline-card-order-button {
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: flex-start;

  /* Nadpisanie stylu przycisku dla tego konkretnego kontekstu jeśli trzeba */
  .order-button {
    width: 100%;
    justify-content: space-between;
  }
}

/* --- RESPANSYWNOŚĆ (Mobile) --- */
@media (max-width: 768px) {
  .timeline-section {
    padding: 4rem 1rem; // Mniejszy padding na mobile
  }

  .timeline-header {
    margin-bottom: 2.5rem;

    h2 {
      font-size: 32px; // Mniejszy nagłówek na mobile
    }

    p {
      font-size: 18px;
    }
  }

  .timeline-line-center {
    left: 20px;
    /* Przesuwamy linię na lewo */
    transform: none;
  }

  .timeline-period-marker {
    text-align: left;
    margin-left: 0;
    /* Wyrównanie do linii */
    padding-left: 40px; // Miejsce na linię
    margin-bottom: 30px;
  }

  .timeline-item {
    width: 100%;
    /* Karta na całą szerokość */
    padding-left: 50px;
    /* Miejsce na linię z lewej */
    padding-right: 0;
    margin-bottom: 20px;

    /* Resetujemy pozycjonowanie dla "right" i "left" */
    &.left,
    &.right {
      left: 0;
      text-align: left;

      /* Przesuwamy kropkę na linię po lewej */
      .timeline-dot {
        left: 13px;
        /* Dopasowanie do środka linii (20px) - połowa kropki */
        right: auto;
      }
    }
  }

  .card-header h3 {
    font-size: 1.1rem;
  }
}
```

## File: `src/components/Login/Login.jsx` <a id="file-src-components-login-login-jsx"></a>

```jsx
import React from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "./login.scss";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const checkAdminAndRedirect = async (user, redirect, postId, afterLogin, defaultRoute) => {
    let userIsAdmin = false;
    if (user && user.email) {
      try {
        const adminsRef = collection(db, "admins");
        const q = query(adminsRef, where("email", "==", user.email), where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        userIsAdmin = !querySnapshot.empty;
      } catch (error) {
        console.error("Error checking admin statuse:", error);
      }
    }

    if (userIsAdmin || redirect === "admin") {
      navigate("/admin");
    } else if (redirect === "blogPost" && postId) {
      navigate(`/BlogDB?openPost=${postId}${afterLogin ? `&afterLogin=${afterLogin}` : ""}`);
    } else {
      const savedRedirect = localStorage.getItem("redirectAfterLogin");
      if (savedRedirect) {
        localStorage.removeItem("redirectAfterLogin");
        // Use window.location.href for hash links to ensure jumping to the element
        window.location.href = savedRedirect;
      } else {
        navigate(defaultRoute);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("userToken", "true");

      const user = result.user;
      if (user) {
        localStorage.setItem(
          "firebaseUser",
          JSON.stringify({
            email: user.email,
            name: user.displayName || "",
          })
        );
      }

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const postId = params.get("postId");
      const afterLogin = params.get("afterLogin");

      await checkAdminAndRedirect(user, redirect, postId, afterLogin, "/dashboard");

    } catch (error) {
      alert("Błąd logowania przez Google: " + error.message);
    }
  };

  // analogicznie w handleFacebookLogin

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("isLoggedIn", "true");

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const postId = params.get("postId");
      const afterLogin = params.get("afterLogin");

      await checkAdminAndRedirect(result.user, redirect, postId, afterLogin, "/dashboard");

    } catch (error) {
      alert("Błąd logowania przez Facebook: " + error.message);
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const postId = params.get("postId");
      const afterLogin = params.get("afterLogin");

      await checkAdminAndRedirect(result.user, redirect, postId, afterLogin, "/dashboard");

    } catch (error) {
      alert("Błąd logowania: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="arrowBack" onClick={() => navigate("/")}>
          <ArrowBackIcon style={{ fontSize: "36px" }} />
        </div>
        <h2>Zaloguj się</h2>

        <div className="login-email">
          <input type="email" placeholder="Email" id="email" />
          <input type="password" placeholder="Hasło" id="password" />
          <div
            className="main_button"
            onClick={() =>
              handleEmailLogin(
                document.getElementById("email").value,
                document.getElementById("password").value
              )
            }
          >
            Logowanie przez email
          </div>
          <p>lub </p>
        </div>
        <div className="login-social">
          <button onClick={handleGoogleLogin}>
            <GoogleIcon />
          </button>
          <button onClick={handleFacebookLogin}>
            <FacebookIcon />
          </button>
        </div>

        <p className="login-signup">
          Nie masz konta?{" "}
          <button onClick={() => navigate("/signUp")}>Zarejestruj się</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
```

## File: `src/components/Login/login.scss` <a id="file-src-components-login-login-scss"></a>

```scss
.login-wrapper {
  width: 100%;
  height: 100vh;
  padding: 40px;
  display: flex;

  .login-page {
    position: relative;
    display: flex;
    flex-direction: column;

    flex: 1;
    align-items: center;
    justify-content: center;

    .arrowBack {
      position: absolute;
      top: 40px;
      left: 40px;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }


    h2 {
      font-family: "Merriweather", serif;
      font-weight: 400;
      font-style: normal;
      font-size: 36px;
    }

    .login-email {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin-bottom: 25px;
      margin-top: 45px;

      .main_button {
        width: 300px;
      }

      input {
        width: 300px;
        padding: 15px 20px;

        border: none;
        border-bottom: 1px solid rgb(161, 161, 161);
        font-family: "Lato", serif;
        font-weight: 300;
        font-style: normal;
        font-size: 16px;
      }

      p {
        font-family: "Lato", serif;
        font-weight: 300;
        font-style: normal;
        font-size: 14px;
      }
    }

    .login-social {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 50%;

        border: 0.1px solid black;
        color: rgb(0, 0, 0);
        background-color: rgb(255, 255, 255);
      }
    }

    .login-signup {
      margin-top: 50px;
      font-family: "Lato", serif;
      font-weight: 300;
      font-style: normal;
      font-size: 16px;

      button {
        border: none;
        background-color: transparent;
        margin-left: 10px;
        color: rgb(108, 189, 107);
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 680px) {
  .login-wrapper {
    width: 100%;
    padding: 20px;

    .login-page {
      .arrowBack {
        top: 0;
        left: 0;
      }
    }
  }
}
```

## File: `src/components/MainFooter/MainFooter.jsx` <a id="file-src-components-mainfooter-mainfooter-jsx"></a>

```jsx
import React from "react";
import "./mainFooter.scss";

export default function MainFooter() {
  return (
    <div className="mainfooter">
      <div className="greenscreamlogo">

        {/* <img src="/images/logo.png"alt="" /> */}
      </div>
    </div>
  );
}
```

## File: `src/components/MainFooter/mainFooter.scss` <a id="file-src-components-mainfooter-mainfooter-scss"></a>

```scss
.mainfooter {
  width: 100%;
  height: 180px;
  display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding: 0 40px 0 40px;
  background-color: transparent;
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

  .greenscreamlogo {
    width: 100%;
    display: flex;

    align-items: center;
    justify-content: flex-end;
    gap: 20px;

    span {
      font-family: "ProductSans";
    }
    .greenscreamlogo_up {
      font-size: 36px;
      font-weight: 100;
      font-style: normal;
      color: white;
    }
    .greenscreamlogo_down {
      font-style: normal;
      font-size: 56px;
      font-weight: 400;
    }
  }
}

@media (max-width: 768px) {
  .mainfooter {
    display: none; // Kompletnie wyłączamy stopkę (z greenscreamlogo) na mobile, by upewnić się, że nie zajmuje pustej przestrzeni.
  }
}

@media (max-width: 425px) {
  .mainfooter {
    display: none; // Również ukrywamy na bardzo małych telefonach
  }
}
```

## File: `src/components/Menu/Menu.jsx` <a id="file-src-components-menu-menu-jsx"></a>

```jsx
import React from "react";
import "./menu.scss";
import Panel from "../panel/Panel";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CallButton from "../CallButton/CallButton";

export default function Menu({ isPanelOpen, setIsPanelOpen, isTransparent }) {
  const { currentUser: user, isAdmin } = useAuth();
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // --- BRAKUJĄCA FUNKCJA ---
  // const location = useLocation(); // Already imported in line 6

  const scrollToSection = (e, id) => {
    e.stopPropagation();
    // 1. Spróbuj znaleźć element na obecnej stronie
    const element = document.getElementById(id);

    if (element) {
      // Jeśli jest, przewiń do niego
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`); // Aktualizuj hash w URL
      setIsPanelOpen(false); // Zamknij panel
    } else {
      // Jeśli elementu nie ma (np. jesteś na innej podstronie),
      // przekieruj na stronę główną z informacją o scrollu
      navigate("/", { state: { scrollTo: id } });
      setIsPanelOpen(false);
    }
  };
  // -------------------------

  const handleBlogClick = (e) => {
    e.stopPropagation();
    navigate("/blogDB");
    setIsPanelOpen(false);
  };

  const handleDashboardClick = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
    } else if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
    setIsPanelOpen(false);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <>
      <Panel
        isOpen={isPanelOpen}
        setIsOpen={setIsPanelOpen}
        user={user}
      >
        <div className="mobile-menu-content">
          {/* LINKI MOBILE */}
          <span onClick={(e) => scrollToSection(e, "scope-container")}>co robimy</span>
          <span onClick={(e) => scrollToSection(e, "h5-QA")}>warto wiedzieć</span>
          <span onClick={handleBlogClick}>poradniki</span>
          <span className="client-panel-link" onClick={handleDashboardClick}>
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="User" className="panel-icon-img avatar" />
            ) : (
              <AccountCircleIcon className="panel-icon-img" />
            )}
            {user ? "panel klienta" : "zaloguj"}
          </span>

          <div className="mobile-btn-wrapper">
            <CallButton phoneNumber="690029414" />
          </div>
        </div>
      </Panel>

      {/* Kontener menu - szerokość i układ */}
      <div className="menu-container">
        <div className="logo" onClick={() => navigate("/")}>
          <img
            src="/images/v2/logo_check.png?v=3"
            alt="Logo"
            style={{ width: "60px" }}
          />

          {/* LINKI DESKTOP */}
          <div className="sitemenu">
            <span onClick={(e) => scrollToSection(e, "scope-container")}>co robimy</span>
            <span onClick={(e) => scrollToSection(e, "h5-QA")}>warto wiedzieć</span>
            <span onClick={handleBlogClick}>poradniki</span>
            <div className="call-wrapper" onClick={(e) => e.stopPropagation()}>
              <CallButton phoneNumber="690029414" />
            </div>


          </div>

        </div>

        <span className="client-panel-link" onClick={handleDashboardClick}>
          {user && user.photoURL ? (
            <img src={user.photoURL} alt="User" className="panel-icon-img avatar" />
          ) : (
            <AccountCircleIcon className="panel-icon-img" />
          )}
        </span>


        {/* BURGER MOBILE */}
        <div className="menu-burger" onClick={togglePanel}>
          <MenuIcon style={{ width: "40px", height: "40px", color: "#333" }} />
        </div>
      </div>
    </>
  );
}
```

## File: `src/components/Menu/menu.scss` <a id="file-src-components-menu-menu-scss"></a>

```scss
/* menu.scss */
@import "../../styles/variables.scss";

.menu-container {
  width: 100%;
  // max-width: 1200px; /* Szerokość contentu */
  height: 100%;
  padding: 0 100px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Logo i nawigacja po lewej */
  .logo {
    width: 100%;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    // gap: 105px;
    // flex: 1;
    cursor: pointer;
    gap: 40px;

    /* SITEMENU (Desktop) */
    .sitemenu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;

      span {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: $font-secondary;
        font-weight: 300;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;

        &:hover {
          color: $color-signal-orange;
        }


      }

      .call-wrapper {
        flex: 0 1 210px; // Identyczna szerokość bazowa co panel klienta
        display: flex;
        justify-content: center;
        align-items: center;

        .call_button {
          width: 100%; // Wypełnia wrapper
          min-width: 280px;
          justify-content: center; // Centruje zawartość
          white-space: nowrap;
          background: rgba($color-signal-orange, 0.05);
          color: $color-text-main;

          .btn-icon {
            color: $color-signal-orange;
          }

          &:hover {
            background: rgba($color-signal-orange, 0.1);
            color: $color-text-main; // Utrzymujemy kontrast na hoverze
          }
        }
      }
    }
  }

  .client-panel-link {
    display: flex;
    justify-content: center; // Centrowanie zawartości
    align-self: center;
    border-radius: 50%;
    background: rgba($color-signal-orange, 0.05);
    border: 1px solid rgba($color-signal-orange, 0.2);
    padding: 8px 8px;
    color: $color-text-main;
    font-weight: 500;
    font-size: 1.2rem;
    white-space: nowrap; // Zapobiegamy zawijaniu tekstu

    .panel-icon-img {
      width: 28px;
      height: 28px;
      object-fit: contain;

      &.avatar {
        border-radius: 50%;
        object-fit: cover;
        // border: 1px solid rgba($color-signal-orange, 0.3);
      }
    }

    &:hover {
      background: rgba($color-signal-orange, 0.1);
      border-color: $color-signal-orange;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  }

  /* BURGER (Desktop - ukryty) */
  .menu-burger {
    display: none;
    cursor: pointer;
    z-index: 101;
  }
}



/* --- MEDIA QUERIES --- */

@media (min-width: 769px) and (max-width: 1024px) {
  .menu-container {
    padding: 0 40px;

    .logo {
      gap: 30px;
    }
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .menu-container {
    padding: 0 40px;

    .logo {

      /* UKRYWAMY linki na mobile */
      .sitemenu {
        display: none;
      }
    }

    .client-panel-link {
      display: none;
    }

    /* POKAZUJEMY Burgera na mobile */
    .menu-burger {
      display: block;
      color: $color-text-main;
    }
  }
}

@media (max-width: 768px) {
  .menu-container {
    padding: 0 16px;
    height: 100%;

    .logo {
      width: auto !important;
      flex: 0 0 auto;

      .sitemenu {
        display: none;
      }

      img {
        width: 44px !important;
        height: auto;
      }
    }

    .client-panel-link {
      display: none;
    }

    .menu-burger {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-text-main;

      svg {
        width: 32px !important;
        height: 32px !important;
      }
    }
  }
}

/* Styl dla zawartości panelu bocznego (mobile) */
.mobile-menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  span {
    white-space: nowrap;
    font-family: $font-secondary;
    font-weight: 300;
    font-size: 28px;
    color: $color-text-main;
    cursor: pointer;
    transition: color 0.2s, transform 0.2s;

    &:hover {
      color: $color-signal-orange;
      transform: scale(1.05);
    }

    &.client-panel-link {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba($color-signal-orange, 0.1);
      border: 1px solid rgba($color-signal-orange, 0.3);
      padding: 15px 30px;
      border-radius: 50px;
      font-weight: 500;
      font-size: 24px;

      .panel-icon-img {
        width: 40px;
        height: 40px;
        object-fit: contain;

        &.avatar {
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba($color-signal-orange, 0.3);
        }
      }
    }
  }

  .mobile-btn-wrapper {
    margin-top: 20px;
    transform: scale(1.2);
  }
}
```

## File: `src/components/OrderButton/OrderButton.jsx` <a id="file-src-components-orderbutton-orderbutton-jsx"></a>

```jsx
import React from 'react';
import './orderButton.scss';

const OrderButton = ({
  text = "ZAMÓW PRZEGLĄD", // Domyślny tekst
  userAvatar = null,       // URL do zdjęcia (np. "https://lh3.google...")
  showIcon = true,         // Czy w ogóle pokazywać ikonę/zdjęcie?
  onClick,                  // Funkcja obsługująca kliknięcie
  padding,
  className = ""
}) => {
  const defaultPadding = showIcon ? "6px 6px 6px 32px" : "16px 32px";
  const finalPadding = padding || defaultPadding;

  return (
    <button className={`order-button ${className}`.trim()} onClick={onClick} style={{ padding: finalPadding }}>
      <span className="order-button-text">{text}</span>

      {showIcon && (
        <div className="order-button-icon-wrapper">
          {userAvatar ? (
            /* Wariant 1: Użytkownik zalogowany (Zdjęcie) */
            <img
              src={userAvatar}
              alt="Profil użytkownika"
              className="user-avatar"
            />
          ) : (
            /* Wariant 2: Domyślna ikona (Ludzika) */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="default-icon"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
      )}
    </button>
  );
};

export default OrderButton;
```

## File: `src/components/OrderButton/orderButton.scss` <a id="file-src-components-orderbutton-orderbutton-scss"></a>

```scss
@import "../../styles/variables.scss";

.order-button {
  /* Zmienne dla łatwej edycji koloru */
  --btn-color: #{$color-sunny-yellow};
  --btn-hover: #{$color-primary-hover};
  --text-color: #{$color-text-main};

  width: 280px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  background-color: var(--btn-color);
  color: var(--text-color);

  border-radius: 50px;
  border: none;

  font-family: $font-primary;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;

  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: $shadow-default;

  &:hover {
    background-color: var(--btn-hover);
    transform: translateY(-2px);
    box-shadow: $shadow-hover;
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 480px) {
    padding: 4px 6px 4px 18px !important;
    font-size: 15px;
    min-height: 48px;
    width: 240px;
  }
}

.order-button-text {
  flex-grow: 1;
  text-align: center;
}

.order-button-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;

    .default-icon {
      width: 18px;
      height: 18px;
    }
  }
}

.default-icon {
  width: 24px;
  height: 24px;
  stroke: var(--text-color);
}

.user-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}
```

## File: `src/components/PopModal/PopModal.jsx` <a id="file-src-components-popmodal-popmodal-jsx"></a>

```jsx
import React from "react";
import "./popupModal.scss";

const PopupModal = ({ message, onClose }) => {
  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default PopupModal;
```

## File: `src/components/PopModal/popupModal.scss` <a id="file-src-components-popmodal-popupmodal-scss"></a>

```scss
.popup-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .popup-container {
    background: #fff;
    padding: 30px 40px;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 90%;
  
    p {
      font-size: 18px;
      margin-bottom: 20px;
      color: #333;
    }
  
    button {
      background-color: #506446;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      font-size: 16px;
  
      &:hover {
        background-color: #3d5134;
      }
    }
  }
  
```

## File: `src/components/Post/Post.jsx` <a id="file-src-components-post-post-jsx"></a>

```jsx
// src/components/Masonry1/Post.jsx
import React from "react";
import PropTypes from "prop-types";
import "./post.scss";

const pastelColors = [
  "#FEFAE0",
  "#FAEDCD",
  "#E9EDC9",
  "#DDB58F",
  "#CCD5AE",
  "#D4A373",
];

const Post = ({
  id,
  src,
  title,
  content,
  type,
  categories,
  borderRadius,
  specialCorner,
  onCategoryClick,
  hasSvg
}) => {


  // Funkcja do przypisywania pastelowego koloru na podstawie ID
  const getPastelColor = (id) => {
    const index = parseInt(id, 10) % pastelColors.length;
    return pastelColors[index];
  };

  let postBgColor;
  if (type === "TextPost") {
    postBgColor = getPastelColor(id);
  }

  // Definiowanie stylów dla zaokrągleń
  const borderRadiusStyle =
    typeof borderRadius === "string" ? { borderRadius } : borderRadius;

  // Renderowanie różnych layoutów w zależności od typu posta
  if (type === "StandardPost") {
    return (
      <div
        className="post standard-post"
        style={borderRadiusStyle}>
        <img src={src} alt={title} loading="lazy" />
        <div className="wrapper"
        style={{
          background: hasSvg
            ? 'url("/images/Subtract.svg") no-repeat bottom left / contain'
            : 'none'
        }}>
          <div className="post-content">
            <span className="cat">
              {categories.map((cat, i) => (
                <span key={i}>{cat}</span>
              ))}
            </span>
            <h2>{title}</h2>
          </div>
        </div>
      </div>
    );
  }

  if (type === "TextPost") {
    const backgroundColor = getPastelColor(id);
    return (
      <div
        className="post text-post"
        style={{ backgroundColor, ...borderRadiusStyle }}
      >
        {specialCorner && (
          <div className="corner-wrapper">
            <div className="corner-square"></div>
            <div className="quarter-circle1"></div>
            <div className="quarter-circle2"></div>
            <button
              className="corner-btn-large"
              style={{ backgroundColor: postBgColor }}
            >
              <span className="corner-icon">+</span>
            </button>
          </div>
        )}
        <div className="post-content">
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    );
  }

  if (type === "CategoriesPost") {
    return (
      <div className="post categories-post" style={borderRadiusStyle}>
        <div className="categories-buttons">
          {categories.slice(0, 10).map((category, index) => (
            <button
              key={index}
              className="category-button"
              onClick={() => onCategoryClick(category)} >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Domyślne renderowanie, jeśli typ jest nieznany
  return (
    <div className="post standard-post" style={borderRadiusStyle}>
      <img src={src} alt={title} loading="lazy" />
      <div className="post-content">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  type: PropTypes.oneOf(["StandardPost", "TextPost", "CategoriesPost"])
    .isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  borderRadius: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      borderTopLeftRadius: PropTypes.string,
      borderTopRightRadius: PropTypes.string,
      borderBottomLeftRadius: PropTypes.string,
      borderBottomRightRadius: PropTypes.string,
    }),
  ]),
  specialCorner: PropTypes.bool,
  onCategoryClick: PropTypes.func,
};

Post.defaultProps = {
  src: "",
  content: "",
  categories: [],
  borderRadius: "18px",
  specialCorner: false,
};

export default Post;
```

## File: `src/components/Post/post.scss` <a id="file-src-components-post-post-scss"></a>

```scss
// /* src/components/Masonry1/Post.scss */

// .post {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
// }


// /* Stylizacja dla StandardPost */
// .standard-post img {
//   width: 100%;
//   height: 100%;
//   /* Zachowuje proporcje layoutu */
//   object-fit: cover;
// }

// .wrapper{
//   position: absolute;
//   bottom: -1px;
//   width: 350px;
//   height: 150px;
//   // background: url("../../../public/images/Subtract.svg") no-repeat bottom left;
//   // background-size:contain;
// }

// .standard-post .post-content {
//   position: absolute;
//   bottom: 20px;
//   left: 20px;
//   width: 70%;
//   display: flex;
//   flex-direction: column;
  

//   .cat{
//     font-family: "Quicksand", serif;
//     font-weight: 200;
//     font-size: 16px;
//     display: flex;
//     gap: 15px;
    
//   }
// }

// .standard-post h2 {
//   font-size: 22px;
//   color: #e8a1eb;
//   margin: 0;
//   font-family: "Quicksand", serif;
//   font-weight: 300;

// }

// /* Stylizacja dla TextPost */
// .text-post {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 0;
//   height: 100%;
//   /* Cały dostępny obszar jest zajęty przez tło i zawartość */
// }

// .text-post .post-content {
//   position: absolute;
//   bottom: 0px;
//   left: 0px;
//   padding: 20px;

// }

// .text-post h2 {
//   width: 100%;
//   font-size: 2.5rem;
//   color: #000000;
//   font-family: "Quicksand", serif;
//   font-weight: 200;

// }

// .text-post p {
//   font-size: 22px;
//   font-family: "Quicksand", serif;
//   font-weight: 200;
//   color: #000000;
// }

// /* Stylizacja dla CategoriesPost */
// .categories-post {
//   background-color: #ffc0cd;
//   /* Delikatne tło dla listy kategorii */
//   height: 100%;
//   display: flex;

// }



// .categories-buttons {
//   display: flex;

//   padding: 20px;
//   flex-wrap: wrap;
//   justify-content: flex-start;
// }

// .category-button {
//   background-color: #ddfbc7;
//   border: none;
//   border-radius: 15px;
//   padding: 15px 22px;
//   margin: 5px;
//   font-size: 1.2rem;
//   color: #555;
//   cursor: pointer;
//   transition: background-color 0.3s ease, color 0.3s ease;
// }

// .category-button:hover {
//   background-color: #d5d5d5;
//   color: #333;
// }

// /* Opcjonalne dodatkowe style */
// .category-button:focus {
//   outline: none;
//   box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
// }

// .corner-wrapper {
//   position: absolute;
//   top: 0px;
//   right: 0px;

//   /* transform: translate(50%, -50%); */
// }

// .corner-square {
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   width: 80px;
//   height: 80px;
//   background-color: #ffffff;
//   border-bottom-left-radius: 60px;
//   transform: translate(-100%);

//   z-index: 1;
// }

// .quarter-circle1 {
//   position: absolute;
//   top: -20px;
//   right: 60px;
//   /* wielkość kwadratu */
//   width: 30px;
//   height: 30px;

//   /* grube obramowanie */
//   border: 20px solid rgb(255, 255, 255);

//   /* pełny łuk w lewym górnym rogu */
//   border-top-right-radius: 100%;

//   border-left: none;
//   border-bottom: none;
//   background: transparent;

// }

// .quarter-circle2 {
//   position: absolute;
//   top: 60px;
//   right: -20px;
//   /* wielkość kwadratu */
//   width: 30px;
//   height: 30px;

//   /* grube obramowanie */
//   border: 20px solid rgb(255, 255, 255);

//   /* pełny łuk w lewym górnym rogu */
//   border-top-right-radius: 100%;

//   /* usuwamy obramowanie pozostałych krawędzi (prawa i dół),
//        by została tylko pionowa, pozioma i łuk */
//   border-left: none;
//   border-bottom: none;

//   /* tło przezroczyste lub jakie chcesz */
//   background: transparent;

//   /* przykładowe wyrównanie, jeśli to w jakimś kontenerze */
//   display: block;
// }

// .corner-btn-large {
//   position: absolute;
//   top: 0px;
//   /* w samym rogu */
//   right: 0px;
//   /* w samym rogu */
//   // transform: translate(-100%, 100%); 

//   width: 60px;
//   height: 60px;

//   border-radius: 50%;
//   border: none;
//   background-color: #FFFFBA;
//   /* wypełnienie */

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   z-index: 2;
// }

// .corner-btn-large .corner-icon {
//   /* styl ikonki, np. +, pędzel, itp. */
//   font-size: 2rem;
//   color: #666;
// }
```

## File: `src/components/SEO/CitySchema.jsx` <a id="file-src-components-seo-cityschema-jsx"></a>

```jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const CitySchema = ({ cityData }) => {
  if (!cityData) return null;

  const pageUrl = `https://przeglady-domu.com/przeglad-budowlany-${cityData.slug}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${pageUrl}#business`,
        "name": `Przeglądy Budowlane ${cityData.name} – Inżynier Przemysław Rakotny`,
        "url": pageUrl,
        "telephone": "+48690029414",
        "priceRange": "$$",
        "image": "https://przeglady-domu.com/images/v2/hh_desktop6.png",
        "description": cityData.seoDescription || `Inżynierskie przeglądy techniczne i budowlane w mieście ${cityData.name}. Uprawnienia budowlane SLK/2122/OWOK/08.`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityData.name,
          "addressRegion": "Śląskie",
          "addressCountry": "PL"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": cityData.lat || 50.2945,
          "longitude": cityData.lng || 18.6714
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": cityData.name
          },
          {
            "@type": "AdministrativeArea",
            "name": "Górnośląsko-Zagłębiowska Metropolia"
          },
          {
            "@type": "State",
            "name": "Województwo Śląskie"
          }
        ],
        "founder": {
          "@type": "Person",
          "name": "Przemysław Rakotny",
          "jobTitle": "Inżynier Budownictwa / Audytor Energetyczny",
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "degree",
              "name": "Uprawnienia budowlane do kierowania i kontroli robót budowlanych",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Śląska Okręgowa Izba Inżynierów Budownictwa"
              }
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "license",
              "name": "Centralny Rejestr Charakterystyki Energetycznej Budynków nr 38909"
            }
          ]
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `Usługi kontroli technicznej – ${cityData.name}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Przegląd 5-letni budynku ${cityData.name}`,
                "description": "Kompleksowa kontrola stanu technicznego i przydatności do użytkowania obiektu budowlanego zgodnie z art. 62 Prawa Budowlanego."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Przegląd roczny budynku ${cityData.name}`,
                "description": "Okresowa kontrola elementów narażonych na szkodliwe wpływy atmosferyczne i niszczące działania czynników występujących podczas użytkowania."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Przegląd instalacji gazowej i wentylacji ${cityData.name}`,
                "description": "Próba szczelności instalacji gazowej oraz pomiary skuteczności wentylacji grawitacyjnej i mechanicznej."
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Strona Główna",
            "item": "https://przeglady-domu.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Przeglądy Budowlane",
            "item": "https://przeglady-domu.com/przeglad-budowlany"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `Przegląd Budowlany ${cityData.name}`,
            "item": pageUrl
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default CitySchema;
```

## File: `src/components/SEO/LocalBusinessSchema.jsx` <a id="file-src-components-seo-localbusinessschema-jsx"></a>

```jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const LocalBusinessSchema = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["ProfessionalService", "LocalBusiness"],
                "@id": "https://przeglady-domu.com/#business",
                "name": "Przeglądy Techniczne Nieruchomości – Inżynier Przemysław Rakotny",
                "image": "https://przeglady-domu.com/images/v2/hh_desktop6.png",
                "url": "https://przeglady-domu.com/",
                "telephone": "+48690029414",
                "email": "kontakt@przeglady-domu.com",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Pukowca 2",
                    "addressLocality": "Gliwice",
                    "postalCode": "44-100",
                    "addressRegion": "Śląskie",
                    "addressCountry": "PL"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 50.2945,
                    "longitude": 18.6714
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ],
                    "opens": "08:00",
                    "closes": "18:00"
                },
                "sameAs": [
                    "https://www.facebook.com/przegladtechniczny"
                ],
                "description": "Profesjonalne przeglądy budowlane (1-roczne i 5-letnie), kontrole instalacji gazowych, elektrycznych i wentylacji na terenie Gliwic, Katowic i całej Aglomeracji Śląskiej.",
                "areaServed": [
                    "Gliwice", "Katowice", "Zabrze", "Bytom", "Ruda Śląska",
                    "Chorzów", "Tychy", "Sosnowiec", "Dąbrowa Górnicza",
                    "Tarnowskie Góry", "Mikołów", "Jaworzno", "Piekary Śląskie",
                    "Pyskowice", "Rybnik", "Górnośląsko-Zagłębiowska Metropolia"
                ].map(city => ({
                    "@type": "City",
                    "name": city
                })),
                "founder": {
                    "@type": "Person",
                    "name": "Przemysław Rakotny",
                    "jobTitle": "Inżynier Budownictwa / Kontroler Obiektów Budowlanych",
                    "hasCredential": [
                        {
                            "@type": "EducationalOccupationalCredential",
                            "credentialCategory": "degree",
                            "name": "Uprawnienia budowlane nr SLK/2122/OWOK/08",
                            "recognizedBy": {
                                "@type": "Organization",
                                "name": "Polska Izba Inżynierów Budownictwa"
                            }
                        },
                        {
                            "@type": "EducationalOccupationalCredential",
                            "credentialCategory": "license",
                            "name": "Centralny Rejestr Charakterystyki Energetycznej Budynków nr 38909"
                        }
                    ]
                },
                "employee": {
                    "@type": "Person",
                    "name": "Marcin Wróbel",
                    "jobTitle": "Inżynier Elektryk / Pomiary Instalacji",
                    "hasCredential": {
                        "@type": "EducationalOccupationalCredential",
                        "name": "Uprawnienia elektryczne SEP E-1/1276/691/22, D-1/1277/691/22"
                    }
                }
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default LocalBusinessSchema;

```

## File: `src/components/SignUp/SignUp.jsx` <a id="file-src-components-signup-signup-jsx"></a>

```jsx
import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signUp.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Hasła nie są zgodne.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
      navigate("/login");
    } catch (error) {
      alert("Błąd rejestracji: " + error.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="img-left">
        <img src="/images/login_background.png" alt="" />
      </div>
      <div className="sign-up-page">
      <div className="arrowBack" onClick={() => navigate("/")}>
          <ArrowBackIcon style={{ fontSize: "36px" }} />
        </div>
        <h2>Zarejestruj się </h2>

        <div className="signup-email">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Potwierdź hasło"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button 
          className="main_button"
          onClick={handleSignUp}>Zarejestruj się</button>
        </div>

        <p className="signup-login">
          Masz już konto?{" "}
          <button onClick={() => navigate("/login")}>Zaloguj się</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
```

## File: `src/components/SignUp/signUp.scss` <a id="file-src-components-signup-signup-scss"></a>

```scss
.signup-wrapper {
  width: 100%;
  height: 100vh;
  padding: 40px;
  display: flex;

  .img-left {
    width: 70%;
    height: 100%;
    border-radius: 50px;
    box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.2);
    
    img {
      width: 100%;
      height: 100%;
      
      object-fit: cover; /* Skaluje obraz, aby wypełnić kontener */
      object-position: left; /* Ustawia pozycję obrazu na lewo */
      background-repeat: no-repeat;
    }
  }

  .sign-up-page {
    position: relative;
    display: flex;
    flex-direction: column;
    
    width: 35%;
    align-items: center;
    justify-content: center;

    .arrowBack{
      position: absolute;
      top: 40px;
      left: 40px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      
    }

    h2 {
      font-family: "Merriweather", serif;
      font-weight: 400;
      font-style: normal;
      font-size: 36px;
    }

    .signup-email {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin-bottom: 25px;
      margin-top: 45px;

      .main_button {
        width: 300px;
      }

      input
       {
        width: 300px;
        padding: 15px 20px;
        
        border: none;
        border-bottom: 1px solid rgb(161, 161, 161);
        font-family: "Lato", serif;
        font-weight: 300;
        font-style: normal;
        font-size: 16px;
      }
      
    }
    .signup-login {
        margin-top: 50px;
        font-family: "Lato", serif;
        font-weight: 300;
        font-style: normal;
        font-size: 16px;
        button {
          border: none;
          background-color: transparent;
          margin-left: 10px;
          color: rgb(108, 189, 107);
          cursor: pointer;
        }
      }
  }
}

@media (max-width: 680px) {
  .signup-wrapper {
    width: 100%;
    .img-left {
      display: none;
    }
    .sign-up-page{
      width: 100%;

      .arrowBack{
        top: -20px;
        left: 0;
      }
    }
  }
}
```

## File: `src/components/SilesiaMap3D/SilesiaMap3D.jsx` <a id="file-src-components-silesiamap3d-silesiamap3d-jsx"></a>

```jsx
import React from 'react';
import './SilesiaMap3D.scss';

const SilesiaMap3D = () => {
  // Lista punktów (miast) na mapie - pozycje procentowe (top, left)
  // Możesz je precyzyjnie dostosować przesuwając wartości
  const cities = [
    { name: "Gliwice", top: "55%", left: "20%", main: true },
    { name: "Katowice", top: "50%", left: "60%", main: true },
    { name: "Bytom", top: "35%", left: "45%" },
    { name: "Zabrze", top: "48%", left: "35%" },
    { name: "Sosnowiec", top: "45%", left: "75%" },
    { name: "Tychy", top: "75%", left: "55%" },
    { name: "Ruda Śląska", top: "52%", left: "45%" },
    { name: "Tarnowskie Góry", top: "20%", left: "40%" },
  ];

  return (
    <div className="map-3d-container">
      <div className="map-plane">
        {/* SVG Obrysu Mapy */}
        <svg 
          viewBox="0 0 200 150" 
          className="silesia-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cień pod mapą (dla efektu 3D) */}
          <path 
            className="map-shadow"
            d="M20,60 Q50,10 90,30 T150,40 T180,80 T140,130 T80,140 T30,110 Z" 
          />
          {/* Właściwa mapa */}
          <path 
            className="map-shape"
            d="M20,60 Q50,10 90,30 T150,40 T180,80 T140,130 T80,140 T30,110 Z" 
          />
        </svg>

        {/* Pinezki Miast */}
        {cities.map((city, index) => (
          <div 
            key={index} 
            className={`map-pin ${city.main ? 'main-pin' : ''}`}
            style={{ top: city.top, left: city.left }}
          >
            <div className="pin-pulse"></div>
            <div className="pin-dot"></div>
            {/* Opcjonalnie: nazwa miasta na mapie */}
            {/* <span className="pin-label">{city.name}</span> */}
          </div>
        ))}

        {/* Główna Pinezka 3D (np. na środku lub w Gliwicach) */}
        <div className="big-marker" style={{ top: "40%", left: "50%" }}>
           <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
           </svg>
           <div className="marker-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default SilesiaMap3D;
```

## File: `src/components/SilesiaMap3D/SilesiaMap3D.scss` <a id="file-src-components-silesiamap3d-silesiamap3d-scss"></a>

```scss
.map-3d-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Perspektywa jest kluczowa dla efektu 3D */
    perspective: 1000px;
  }
  
  .map-plane {
    position: relative;
    width: 300px; /* Bazowa szerokość */
    height: 250px;
    
    /* TO TWORZY EFEKT IZOMETRYCZNY / QUASI-3D */
    transform: rotateX(50deg) rotateZ(-20deg) skewY(5deg);
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
  }
  
  /* Interakcja - lekkie wyprostowanie po najechaniu */
  .map-3d-container:hover .map-plane {
    transform: rotateX(45deg) rotateZ(-15deg) skewY(5deg) scale(1.05);
  }
  
  /* Obrys Mapy SVG */
  .silesia-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  
  .map-shape {
    fill: #F3F4F6; /* Jasnoszary kolor mapy */
    stroke: #FFFFFF;
    stroke-width: 2px;
    /* Cień rzucany przez "blok" mapy */
    filter: drop-shadow(0px 15px 10px rgba(0,0,0,0.15));
  }
  
  .map-shadow {
    fill: #D1D5DB; /* Ciemniejszy bok (imituje grubość) */
    transform: translate(0, 10px); /* Przesunięcie w dół */
    z-index: -1;
  }
  
  /* Pinezki (Kropki) */
  .map-pin {
    position: absolute;
    transform: translate(-50%, -50%) rotateZ(20deg) rotateX(-50deg); /* Kontra-rotacja, żeby kropki leżały płasko lub stały */
    width: 12px;
    height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pin-dot {
    width: 8px;
    height: 8px;
    background-color: #B94E48; /* Twój kolor ceglasty */
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .main-pin .pin-dot {
    width: 12px;
    height: 12px;
    background-color: #B94E48;
    border: 2px solid white;
  }
  
  /* Animacja pulsowania */
  .pin-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(185, 78, 72, 0.4);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(3); opacity: 0; }
  }
  
  /* Duży Marker (Pinezka Google style) */
  .big-marker {
    position: absolute;
    width: 40px;
    height: 40px;
    color: #B94E48;
    /* Ważne: Kontra-rotacja, żeby pinezka stała pionowo na pochylonej mapie! */
    transform: translate(-50%, -100%) rotateZ(20deg) rotateX(-50deg);
    filter: drop-shadow(0 5px 5px rgba(0,0,0,0.3));
    z-index: 10;
    animation: float 3s ease-in-out infinite;
  }
  
  .marker-shadow {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 15px;
    height: 4px;
    background: rgba(0,0,0,0.2);
    border-radius: 50%;
    filter: blur(2px);
  }
  
  @keyframes float {
    0%, 100% { transform: translate(-50%, -100%) rotateZ(20deg) rotateX(-50deg) translateY(0); }
    50% { transform: translate(-50%, -100%) rotateZ(20deg) rotateX(-50deg) translateY(-10px); }
  }
```

## File: `src/components/SilesiaMapGL/SilesiaMapGL.jsx` <a id="file-src-components-silesiamapgl-silesiamapgl-jsx"></a>

```jsx
import React, { useMemo, useRef, useId, useEffect } from 'react';
import Map, { Source, Layer, Marker } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { citiesData } from '../../helpers/citiesData';
import './SilesiaMapGL.scss';

// IMPORT PLIKÓW GEOJSON
import silesiaOutlineData from '../../assets/silesia1.json';
import silesiaCitiesData from '../../assets/silesia2.json';

const SilesiaMapGL = ({
    hoveredCity,
    onCityHover,
    onCityClick,
    initialViewState = null,
    interactive = false
}) => {
    const mapRef = useRef(null);
    const mapId = useId();

    // Styl "Pusty"
    const emptyMapStyle = useMemo(() => ({
        version: 8,
        name: "Blank",
        sources: {},
        layers: [
            {
                id: `background-${mapId}`,
                type: 'background',
                paint: { 'background-color': 'rgba(0,0,0,0)' } // Przezroczyste
            }
        ]
    }), [mapId]);

    // OBLICZANIE IDEALNEGO DOPASOWANIA MAPY (FIT BBOX)
    useEffect(() => {
        if (!mapRef.current) return;

        let resizeObserver;
        const map = mapRef.current.getMap();

        // Bounding box obejmujący DOKŁADNIE granice GZM (z pliku silesia2.json)
        // [MIN_LNG, MIN_LAT], [MAX_LNG, MAX_LAT]
        const bbox = [
            [18.3648765, 50.0170556], // Southwestern corner
            [19.4877330, 50.5310127]  // Northeastern corner
        ];

        const fitMap = () => {
            if (mapRef.current && map) {
                // Dynamically fit map using Mapbox native calculation
                map.fitBounds(bbox, {
                    padding: 15, // Płaski, równy margines 15px by mapa wypełniła okno do brzegu
                    duration: 0  // Natychmiastowe dociągnięcie
                });
            }
        };

        // Kiedy mapa zostanie poprawnie wczytana: dopasuj raz.
        map.on('load', fitMap);

        // Kiedy kontener HTML fizycznie zmienia wymiary - dopasuj precyzyjniej
        // To niezawodnie zapobiega problemom na różnych ekranach.
        const container = map.getContainer();
        if (container) {
            resizeObserver = new ResizeObserver(() => {
                fitMap();
            });
            resizeObserver.observe(container);
        }

        return () => {
            if (resizeObserver && container) resizeObserver.disconnect();
            map.off('load', fitMap);
        };
    }, []);

    // --- STYLIZACJA WARSTW (KOLORY I CIEŃ 3D) ---

    // A. Cień (Wzmocniony efekt 3D)
    const shadowLayerStyle = {
        id: `gzm-shadow-${mapId}`,
        type: 'fill',
        paint: {
            'fill-color': '#000000',      // Czarny
            'fill-opacity': 0.25,         // Zwiększona widoczność cienia (było 0.1)
            'fill-translate': [15, 15],   // Większe przesunięcie (było 8, 8) dla lepszego efektu głębi
        }
    };

    // B. Wypełnienie (Jasnoczerwone)
    const citiesFillLayerStyle = useMemo(() => {
        return {
            id: `gzm-cities-fill-${mapId}`,
            type: 'fill',
            paint: {
                'fill-color': [
                    'case',
                    ['==', ['get', 'name'], hoveredCity || ''],
                    '#ef4444', // AKTYWNY
                    '#fee2e2'  // NIEAKTYWNY
                ],
                'fill-opacity': 1,
                'fill-color-transition': { duration: 300 }
            }
        };
    }, [hoveredCity, mapId]);

    // C. Granice
    const citiesBorderLayerStyle = {
        id: `gzm-cities-borders-${mapId}`,
        type: 'line',
        paint: {
            'line-color': '#991b1b',
            'line-width': 1,
            'line-opacity': 0.1
        }
    };

    return (
        <div className="map-gl-wrapper">
            <Map
                id={`map-${mapId}`}
                ref={mapRef}
                mapLib={maplibregl}
                initialViewState={initialViewState || {
                    // CENTROWANIE - dobrane eksperymentalnie dla GZM
                    longitude: 19.00,
                    latitude: 50.25,

                    // ZOOM - Zwiększony, aby mapa lepiej wypełniała kontener i miała mniejsze marginesy
                    zoom: 8.2,

                    pitch: 45,
                    bearing: 0
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle={emptyMapStyle}
                scrollZoom={false}       // Zablokuj scrollowanie
                dragPan={false}          // Zablokuj przesuwanie (mapa ma być statyczna w kadrze)
                doubleClickZoom={false}
                interactive={interactive}      // Wyłącza wszelkie interakcje z mapą (tylko markery działają)
                onLoad={(e) => e.target.resize()}
            >
                <Source id={`source-outline-${mapId}`} type="geojson" data={silesiaOutlineData}>
                    <Layer {...shadowLayerStyle} />
                </Source>

                <Source id={`source-cities-${mapId}`} type="geojson" data={silesiaCitiesData}>
                    <Layer {...citiesFillLayerStyle} />
                    <Layer {...citiesBorderLayerStyle} />
                </Source>

                {citiesData.map((city, index) => {
                    const isActive = hoveredCity === city.name;
                    return (
                        <Marker
                            key={index}
                            longitude={city.lng}
                            latitude={city.lat}
                            anchor="center"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                onCityClick(city.slug);
                            }}
                            style={{ cursor: 'pointer' }} // Wymuszenie kursora rączki
                        >
                            <div
                                className={`gl-marker ${isActive ? 'active' : ''}`}
                                onMouseEnter={() => onCityHover(city.name)}
                                onMouseLeave={() => onCityHover(null)}
                            >
                                <div className="dot"></div>
                                <div className="pulse-wave"></div>
                                {isActive && <div className="gl-tooltip">{city.name}</div>}
                            </div>
                        </Marker>
                    );
                })}
            </Map>
        </div>
    );
};

export default SilesiaMapGL;
```

## File: `src/components/SilesiaMapGL/SilesiaMapGL.scss` <a id="file-src-components-silesiamapgl-silesiamapgl-scss"></a>

```scss
.map-gl-wrapper {
  width: 100%;
  height: 100%;
  // Kluczowe dla trzymania canvasu w ryzach:
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: transparent;
  overflow: hidden;
  border-radius: inherit; // Dziedziczy zaokrąglenia od rodzica
}

/* Fix dla MapLibre, żeby canvas wypełniał wrapper i NIE WYCHODZIŁ POZA NIEGO */
.maplibregl-map {
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
}

.maplibregl-canvas-container,
.maplibregl-canvas {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

/* --- MARKERY --- */
.gl-marker {
  width: 26px;
  /* Troszkę mniejsze kropki, żeby pasowały do mniejszej mapy */
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;
}

.gl-marker .dot {
  width: 6px;
  height: 6px;
  background-color: #ef4444;
  /* Czerwona kropka */
  border-radius: 50%;
  z-index: 2;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border: 1px solid white;
}

.gl-marker .pulse-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(239, 68, 68, 0.4);
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  transform: scale(1);
}

/* Tooltip */
.gl-marker .gl-tooltip {
  position: absolute;
  bottom: 20px;
  background-color: #fff;
  color: #1f2937;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(5px);
  pointer-events: none;
  transition: all 0.2s;
  border: 1px solid #f3f4f6;
}

/* --- STAN AKTYWNY --- */
.gl-marker:hover,
.gl-marker.active {
  z-index: 10;
  transform: scale(1.3);
}

.gl-marker.active .dot {
  background-color: #b91c1c;
  /* Ciemnoczerwony aktywny */
  width: 8px;
  height: 8px;
}

.gl-marker.active .pulse-wave {
  background-color: rgba(185, 28, 28, 0.3);
  animation: markerPulse 2s infinite;
  opacity: 1;
}

.gl-marker.active .gl-tooltip {
  opacity: 1;
  transform: translateY(0);
}

@keyframes markerPulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  100% {
    transform: scale(3);
    opacity: 0;
  }
}
```

## File: `src/components/StickyOrderBar/StickyOrderBar.jsx` <a id="file-src-components-stickyorderbar-stickyorderbar-jsx"></a>

```jsx
import React, { useState, useEffect } from 'react';
import './StickyOrderBar.scss';
import OrderButton from '../OrderButton/OrderButton';

export default function StickyOrderBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);

    // Show the bar only after scrolling past the Hero section
    useEffect(() => {
        const handleScroll = () => {
            // Wartość 1.5 * innerHeight odpowiada orientacyjnie momentowi,
            // w którym kończy się przypięty u góry efekt HeroParallaxWrapper.
            const threshold = window.innerHeight * 1.5;

            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOrderClick = () => {
        setIsGenerating(true);
        setProgress(0);

        // Simulate "Generating Request" progress bar
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Wait a moment then scroll to form and reset
                    setTimeout(() => {
                        const formSection = document.getElementById("inspection-form");
                        if (formSection) {
                            formSection.scrollIntoView({ behavior: "smooth" });
                        }
                        setIsGenerating(false);
                        setProgress(0);
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 50);
    };

    return (
        <div className={`sticky-order-bar ${isVisible ? 'visible' : ''}`}>
            <div className="sticky-bar-content">
                <div className="bar-info">
                    <span className="info-title">SZYBKI KONTAKT</span>
                    <span className="info-subtitle">Zarezerwuj termin przeglądu online</span>
                </div>

                <div className="bar-action">
                    {isGenerating ? (
                        <div className="progress-container">
                            <div className="progress-text">GENEROWANIE ZAPYTANIA... {progress}%</div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    ) : (
                        <OrderButton
                            className="pulse"
                            showIcon={false}
                            text="UMÓW PRZEGLĄD"
                            onClick={handleOrderClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
```

## File: `src/components/StickyOrderBar/StickyOrderBar.scss` <a id="file-src-components-stickyorderbar-stickyorderbar-scss"></a>

```scss
@import "../../styles/variables.scss";

$bar-height: 80px;

.sticky-order-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(26, 26, 27, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1000;
    height: $bar-height;
    display: flex;
    align-items: center;

    &.visible {
        transform: translateY(0);
    }

    .sticky-bar-content {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bar-info {
            display: flex;
            flex-direction: column;

            .info-title {
                font-family: $font-secondary;
                font-size: 0.8rem;
                color: $color-signal-orange;
                letter-spacing: 2px;
            }

            .info-subtitle {
                font-size: 1.1rem;
                font-weight: 600;
                color: $color-paper-white;
            }
        }

        .bar-action {
            width: 300px;
            display: flex;
            justify-content: flex-end;

            .magnetic-cta {
                background-color: $color-signal-orange;
                color: $color-white;
                border: none;
                padding: 12px 30px;
                border-radius: 4px;
                font-family: $font-secondary;
                font-weight: 700;
                font-size: 1rem;
                letter-spacing: 1px;
                cursor: pointer;
                transition: background-color 0.3s;

                &:hover {
                    background-color: lighten($color-signal-orange, 5%);
                }

                &.pulse {
                    animation: pulseShadow 2s infinite;
                }
            }

            .progress-container {
                width: 100%;
                background: rgba(255, 255, 255, 0.05);
                padding: 10px 15px;
                border-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.1);

                .progress-text {
                    font-family: $font-secondary;
                    font-size: 0.75rem;
                    color: $color-paper-white;
                    margin-bottom: 6px;
                    text-align: right;
                }

                .progress-bar {
                    width: 100%;
                    height: 6px;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 3px;
                    overflow: hidden;

                    .progress-fill {
                        height: 100%;
                        background-color: $color-signal-orange;
                        transition: width 0.05s linear;
                    }
                }
            }
        }
    }
}

@keyframes pulseShadow {
    0% {
        box-shadow: 0 0 0 0 rgba(255, 95, 31, 0.4);
    }

    70% {
        box-shadow: 0 0 0 15px rgba(255, 95, 31, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(255, 95, 31, 0);
    }
}

@media (max-width: 768px) {
    .sticky-order-bar {
        height: calc(64px + env(safe-area-inset-bottom, 0px));
        padding-bottom: env(safe-area-inset-bottom, 0px);

        .sticky-bar-content {
            padding: 0 1rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0;

            .bar-info {
                display: none; // hide text on mobile to save space
            }

            .bar-action {
                width: 100%;
                justify-content: center;

                .magnetic-cta {
                    width: 100%;
                    max-width: 340px;
                    padding: 10px 20px;
                    font-size: 0.95rem;
                    border-radius: 25px;
                }
            }
        }
    }
}
```

## File: `src/components/animations/AnimatedText.jsx` <a id="file-src-components-animations-animatedtext-jsx"></a>

```jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({
    text,
    className = '',
    tag: Tag = 'h2',
    delay = 0
}) {
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        // Split text into words to prevent unnatural line breaks mid-word
        const words = el.innerText.split(' ');
        el.innerHTML = '';

        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            // We can animate character by character inside the word wrapper
            const chars = word.split('');
            chars.forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.innerText = char;
                charSpan.style.opacity = 0;
                charSpan.style.transform = 'translateY(10px)';
                charSpan.style.display = 'inline-block';
                wordSpan.appendChild(charSpan);
            });

            el.appendChild(wordSpan);

            // Add standard space between words for natural browser wrapping
            if (index < words.length - 1) {
                el.appendChild(document.createTextNode(' '));
            }
        });

        // Select the individual character spans for animation
        const spans = el.querySelectorAll('span > span');

        gsap.to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
            delay: delay,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        }
    }, [text, delay]);

    return (
        <Tag ref={textRef} className={className}>
            {text}
        </Tag>
    );
}
```

## File: `src/components/animations/MagneticButton.jsx` <a id="file-src-components-animations-magneticbutton-jsx"></a>

```jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick }) {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    // We use a relatively weak magnetic pull to keep it subtle
    const magnetize = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const reset = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', magnetize);
    el.addEventListener('mouseleave', reset);

    return () => {
      el.removeEventListener('mousemove', magnetize);
      el.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <div 
      ref={magneticRef} 
      className={`magnetic-wrapper ${className}`} 
      onClick={onClick}
      style={{ display: 'inline-block', cursor: 'pointer' }}
    >
      {children}
    </div>
  );
}
```

## File: `src/components/modal/Modal.jsx` <a id="file-src-components-modal-modal-jsx"></a>

```jsx
import React from "react";
import "./modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

```

## File: `src/components/modal/modal.scss` <a id="file-src-components-modal-modal-scss"></a>

```scss
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    width: 90%;
    max-width: 400px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  
```

## File: `src/components/panel/Panel.jsx` <a id="file-src-components-panel-panel-jsx"></a>

```jsx
import React from "react";
import "./panel.scss";
// Jeśli masz zainstalowane MUI icons, odkomentuj linię poniżej. 
// Jeśli nie, użyjemy "X" tekstowego w CSS.
import CloseIcon from "@mui/icons-material/Close"; 

export default function Panel({ isOpen, setIsOpen, children }) {
  
  return (
    <div className={`panel ${isOpen ? "open" : ""}`}>
      {/* Przycisk zamknięcia wewnątrz panelu */}
      <div className="panel-header">
         <div className="close-btn" onClick={() => setIsOpen(false)}>
            {/* Jeśli masz MUI: <CloseIcon sx={{ fontSize: 40 }} /> */}
            {/* Jeśli nie masz, zostaw sam tekst lub SVG: */}
            <CloseIcon style={{ width: "40px", height: "40px", color: "#333" }} />
         </div>
      </div>

      {/* Wyświetlanie zawartości przekazanej z Menu.js */}
      <div className="panel-content">
        {children}
      </div>
    </div>
  );
}
```

## File: `src/components/panel/panel.scss` <a id="file-src-components-panel-panel-scss"></a>

```scss
/* panel.scss */
@import "../../styles/variables.scss";

.panel {
  position: fixed;
  /* Zmieniono na fixed, żeby przykrywał wszystko */
  top: -100vh;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.98);
  /* Prawie nieprzezroczyste tło */
  backdrop-filter: blur(10px);
  z-index: 998;
  /* Poniżej paska nawigacji (999), ale... */

  /* Jeśli chcesz, żeby panel zakrywał też pasek nawigacji, daj tu z-index: 1000 
     i w Panel.js przenieś go poza strukturę Menu */

  transition: top 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  flex-direction: column;

  &.open {
    top: 0;
  }

  /* Nagłówek panelu z przyciskiem zamknięcia */
  .panel-header {
    width: 100%;
    height: 100px;
    /* Taka sama wysokość jak navbar */
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* X po prawej */
    padding: 0 40px;
    /* Padding zgodny z Menu container */

    @media (max-width: 430px) {
      padding: 0 20px;
    }

    .close-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-text-main;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
        color: $color-signal-orange;
      }
    }
  }

  /* Główna zawartość panelu */
  .panel-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Wycentrowanie pionowe */
    width: 100%;
    padding-bottom: 100px;
    /* Opcjonalnie, żeby nie było za nisko */
  }
}
```

## File: `src/components/quill/ButtonBlot.js` <a id="file-src-components-quill-buttonblot-js"></a>

```javascript
import Quill from 'quill';
const Inline = Quill.import('blots/inline');

class ButtonBlot extends Inline {
  static create(value) {
    const node = super.create();

    // Obsługa klasy CSS
    if (value.class) {
      node.setAttribute('class', value.class);
    } else {
      node.setAttribute('class', 'quill-button'); // domyślna klasa
    }

    // Obsługa onclick
    if (value.onclick) {
      node.setAttribute('onclick', value.onclick);
    }

    // Treść przycisku
    node.innerText = value.label ;

    return node;
  }

  static value(node) {
    return {
      class: node.getAttribute('class'),
      onclick: node.getAttribute('onclick'),
      label: node.innerText,
    };
  }
}

ButtonBlot.blotName = 'button';
ButtonBlot.tagName = 'button';

export default ButtonBlot;
```

## File: `src/components/singlePostPopup/SinglePostPopup.jsx` <a id="file-src-components-singlepostpopup-singlepostpopup-jsx"></a>

```jsx
// Aktualizacja pliku SinglePostPopup.jsx na potrzeby Firebase
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./singlePostPopup.scss";
import { db } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import CloseIcon from "@mui/icons-material/Close";

export default function SinglePostPopup({
  post,
  onClose,
  user,
  scrollToComments,
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [imgError, setImgError] = useState(false);

  const navigate = useNavigate();
  const prevUserRef = useRef(user);
  const scrolledOnLoginRef = useRef(false);

  const fallbackSrc = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  useEffect(() => {
    if (!post?.id) return;
    const commentsRef = collection(db, "posts", post.id, "comments");
    const q = query(commentsRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });
    return () => unsubscribe();
  }, [post?.id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate(`/login?redirect=blogPost&postId=${post.id}&afterLogin=1`);
      return;
    }
    if (!newComment.trim()) return;
    try {
      const commentsRef = collection(db, "posts", post.id, "comments");
      await addDoc(commentsRef, {
        content: newComment,
        userEmail: user.email,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Błąd przy dodawaniu komentarza:", error);
    }
  };

  useEffect(() => {
    if (prevUserRef.current === null && user != null && !scrolledOnLoginRef.current) {
      const commentsSectionEl = document.getElementById("commentsSection");
      if (commentsSectionEl) {
        commentsSectionEl.scrollIntoView({ behavior: "smooth" });
        scrolledOnLoginRef.current = true;
      }
    }
    prevUserRef.current = user;
  }, [user]);

  useEffect(() => {
    if (scrollToComments) {
      const commentsSectionEl = document.getElementById("commentsSection");
      if (commentsSectionEl) {
        commentsSectionEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [scrollToComments]);

  return (
    <div
      className={`popup-overlay ${isClosing ? "popup-hide" : ""}`}
      onClick={(e) => {
        if (e.target.classList.contains("popup-overlay")) {
          handleClose();
        }
      }}
    >
      <div className="popup-cont" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>
          <CloseIcon />
        </button>

        <img
          src={imgError || !post.src ? fallbackSrc : post.src}
          alt={post.title}
          className="popup-image"
          onError={() => setImgError(true)}
        />

        <div className="popup-body">
          <h1 className="popup-title">{post.title}</h1>

          {post.categories && (
            <div className="post-categories">
              {post.categories.map((category, index) => (
                <span key={index} className="category">
                  {category}
                </span>
              ))}
            </div>
          )}

          {post.content && (
            <div
              className="popup-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {post.content2 && (
            <div
              className="popup-content2"
              dangerouslySetInnerHTML={{ __html: post.content2 }}
            />
          )}

          <div className="comments-section" id="commentsSection">
            <h2>Komentarze ({comments.length})</h2>
            {comments.length === 0 ? (
              <p style={{ color: '#718096' }}>Brak komentarzy. Bądź pierwszy!</p>
            ) : (
              <ul className="comments-list">
                {comments.map((comment) => {
                  const emailPrefix = comment.userEmail?.split("@")[0] || "Anonim";
                  return (
                    <li key={comment.id} className="comment-item">
                      <div className="comment-header">
                        <strong>{emailPrefix}</strong>
                        <span>
                          {comment.timestamp?.toDate().toLocaleString("pl-PL") || ""}
                        </span>
                      </div>
                      <div className="comment-content">{comment.content}</div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="comment-form">
            {user ? (
              <form onSubmit={handleAddComment}>
                <textarea
                  placeholder="Napisz komentarz..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Dodaj komentarz</button>
              </form>
            ) : (
              <p style={{ color: "#718096", fontSize: '15px' }}>
                Musisz być zalogowany, aby dodać komentarz.{" "}
                <Link
                  to={`/login?redirect=blogPost&postId=${post.id}&afterLogin=1`}
                  style={{ color: "#38b2ac", fontWeight: '700' }}
                >
                  Zaloguj się
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: `src/components/singlePostPopup/singlePostPopup.scss` <a id="file-src-components-singlepostpopup-singlepostpopup-scss"></a>

```scss
@import "../../styles/variables.scss";

$popup-bg: #ffffff;
$accent-green: $color-signal-orange;
$text-sub: #718096;
$border-color: #edf2f7;

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
  padding: 20px;
  box-sizing: border-box;
}

.popup-cont {
  background: $popup-bg;
  border-radius: 28px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow-y: auto;
  animation: popup-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: "ProductSans", sans-serif;

  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 10px; }

  .close-button {
    position: sticky;
    top: 20px;
    float: right;
    margin-right: 20px;
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 100;
    transition: transform 0.2s;
    &:hover { transform: rotate(90deg) scale(1.1); }
  }

  .short-background { display: none; } // Removing the old background hack

  .popup-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 0;
  }

  .popup-body {
    padding: 40px 60px;
    
    @media (max-width: 768px) {
      padding: 30px 20px;
    }
  }

  .popup-title {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
    color: $color-text-main;

    @media (max-width: 768px) {
      font-size: 28px;
    }
  }

  .post-categories {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    
    .category {
      background: rgba($accent-green, 0.1);
      color: $accent-green;
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .popup-content, .popup-content2 {
    font-size: 18px;
    line-height: 1.7;
    color: #2d3748;
    margin-bottom: 40px;

    h2, h3 { 
      margin: 40px 0 20px; 
      font-weight: 700;
      color: $color-text-main;
    }
    
    p { margin-bottom: 20px; }
    
    ul, ol {
      margin-left: 20px;
      margin-bottom: 25px;
      li { margin-bottom: 12px; }
    }

    img {
      border-radius: 16px;
      width: 100%;
      height: auto;
      margin: 30px 0;
    }
  }

  /* COMMENTS SECTION */
  .comments-section {
    border-top: 1px solid $border-color;
    padding-top: 40px;
    margin-top: 40px;

    h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 25px;
    }

    .comments-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 40px;

      .comment-item {
        background: #f8fafc;
        padding: 20px;
        border-radius: 16px;
        border: 1px solid $border-color;

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          
          strong { font-weight: 700; color: $color-text-main; font-size: 15px; }
          span { color: $text-sub; font-size: 12px; }
        }

        .comment-content {
          font-size: 15px;
          line-height: 1.5;
          color: #4a5568;
        }
      }
    }
  }

  /* COMMENT FORM */
  .comment-form {
    background: #f1f5f9;
    padding: 30px;
    border-radius: 20px;
    
    textarea {
      width: 100%;
      height: 120px;
      padding: 15px;
      border-radius: 12px;
      border: 1px solid $border-color;
      font-family: inherit;
      font-size: 15px;
      margin-bottom: 15px;
      resize: none;
      &:focus { outline: none; border-color: $accent-green; box-shadow: 0 0 0 3px rgba($accent-green, 0.1); }
    }

    button {
      padding: 12px 24px;
      background: $accent-green;
      color: white;
      border: none;
      border-radius: 100px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba($accent-green, 0.3); }
    }
  }
}

@keyframes popup-bounce {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.popup-hide {
  animation: popup-hide 0.3s ease-out forwards;
}

@keyframes popup-hide {
  to { transform: scale(0.9); opacity: 0; }
}
```


# ================================================================================
# 7. FRONTEND – DANE STATYCZNE, BAZA WPISÓW I POMOCNIKI (HELPERS)
# ================================================================================

## File: `src/assets/silesia1.json` <a id="file-src-assets-silesia1-json"></a>

> [!NOTE]
> Plik GeoJSON z punktami węzłowymi gmin/miast (rozmiar ~43 KB, dane współrzędnych geograficznych pominięte dla zwięzłości).

## File: `src/assets/silesia2.json` <a id="file-src-assets-silesia2-json"></a>

> [!NOTE]
> Plik GeoJSON z poligonami granic województwa śląskiego (rozmiar ~8.1 MB, współrzędne geograficzne pominięte w celu oszczędności kontekstu).

## File: `src/data/blogposts.jsx` <a id="file-src-data-blogposts-jsx"></a>

```jsx
// src/data/posts.js

const initialPosts = [
  {
    id: "1",
    src: "images/21.png",
    w: 2,
    h: 2,
    title: "Magiczne Poranki: Jak Zacząć Dzień Pełen Energii",
    type: "StandardPost",
    hasSvg: true,
    categories: ["Styl", "Zdrowie"],
    date: "2024-12-11",
    borderRadius: "25px",
  },
  {
    id: "2",
    src: "images/2.jpg",
    w: 2,
    h: 2,
    title: "Zdrowe Przepisy: Śniadanie, Które Zmieni Twój Dzień",
    content: `
    Śniadanie to najważniejszy posiłek dnia. Przygotowaliśmy dla Ciebie kilka zdrowych i smacznych przepisów, które dostarczą Ci energii na cały dzień.
    `,

    content2: ` 
    <h2>Śniadanie – najważniejszy posiłek dnia</h2>
    <p>Śniadanie jest nie tylko pierwszym posiłkiem dnia, ale także kluczowym momentem, który determinuje nasze samopoczucie, poziom energii i koncentrację na kolejne godziny. To właśnie od śniadania zależy, czy nasz organizm będzie w stanie sprostać wyzwaniom codzienności. Niestety, wiele osób pomija ten posiłek, tłumacząc się brakiem czasu, brakiem apetytu rano lub przekonaniem, że poranny posiłek nie jest konieczny. W rzeczywistości regularne spożywanie śniadania ma ogromne korzyści zdrowotne i odgrywa kluczową rolę w utrzymaniu zdrowego stylu życia.</p>
    
    Dlaczego śniadanie jest takie ważne?
    Podczas snu nasz organizm odpoczywa i regeneruje się, zużywając zapasy energii zgromadzonej poprzedniego dnia. Rano, po przebudzeniu, poziom cukru we krwi jest niski, a nasze ciało potrzebuje paliwa, aby uruchomić metabolizm i rozpocząć dzień z energią. Pominięcie śniadania może prowadzić do:
    
    Obniżonego poziomu koncentracji i energii – Mózg, aby pracować efektywnie, potrzebuje glukozy. Jej brak może skutkować trudnościami w skupieniu i uczuciem zmęczenia.
    Zwiększonego apetytu w ciągu dnia – Osoby, które nie jedzą śniadań, mają tendencję do podjadania niezdrowych przekąsek i spożywania większych porcji podczas kolejnych posiłków.
    Zaburzeń metabolizmu – Regularne pomijanie śniadania może wpłynąć negatywnie na funkcjonowanie metabolizmu, prowadząc do nadwagi i problemów zdrowotnych.
    Zdrowe i smaczne śniadania – klucz do sukcesu
    Przygotowanie zdrowego śniadania nie musi być skomplikowane ani czasochłonne. Kluczem jest wybór odpowiednich składników, które dostarczą organizmowi niezbędnych wartości odżywczych, takich jak białko, węglowodany złożone, zdrowe tłuszcze, błonnik oraz witaminy i minerały. Oto kilka inspiracji na pełnowartościowe śniadania, które dodadzą Ci energii na cały dzień.
    
    1. Owsianka z owocami i orzechami
    Owsianka to klasyk wśród zdrowych śniadań. Jest bogata w błonnik, który wspiera trawienie i pomaga utrzymać uczucie sytości na dłużej.
    
    Przepis:
    
    1/2 szklanki płatków owsianych
    1 szklanka mleka lub napoju roślinnego (np. migdałowego, owsianego)
    Garść świeżych owoców (np. borówek, truskawek, banana)
    1 łyżeczka miodu
    Garść orzechów lub migdałów
    Przygotowanie:
    Płatki owsiane zagotuj z mlekiem, mieszając do uzyskania kremowej konsystencji. Dodaj owoce, miód i posyp orzechami.
    
    2. Kanapki z awokado i jajkiem
    Kanapki z pełnoziarnistego pieczywa to świetny wybór na szybkie, a jednocześnie wartościowe śniadanie.
    
    Przepis:
    
    2 kromki pełnoziarnistego chleba
    1 dojrzałe awokado
    1 ugotowane na miękko jajko
    Szczypta soli, pieprzu i papryki wędzonej
    Kilka listków rukoli lub szpinaku
    Przygotowanie:
    Rozgnieć awokado widelcem i rozsmaruj na chlebie. Na wierzch połóż plasterki jajka, dopraw i dodaj zieleninę.
    
    3. Koktajl białkowy z owocami
    Idealny dla osób, które rano mają niewiele czasu lub wolą coś lekkiego.
    
    Przepis:
    
    1 banan
    1/2 szklanki mrożonych owoców (np. malin, truskawek)
    1 szklanka mleka lub jogurtu naturalnego
    1 łyżka masła orzechowego
    1 miarka białka w proszku (opcjonalnie)
    Przygotowanie:
    Wszystkie składniki zmiksuj na gładką konsystencję i od razu podawaj.
    
    4. Jajecznica z warzywami i serem feta
    Jajka są doskonałym źródłem białka i zdrowych tłuszczów.
    
    Przepis:
    
    2-3 jajka
    Garść pokrojonych warzyw (np. papryki, cukinii, szpinaku)
    30 g sera feta
    1 łyżeczka oliwy z oliwek
    Przygotowanie:
    Na patelni podsmaż warzywa na oliwie, a następnie wlej roztrzepane jajka. Dodaj fetę i smaż do momentu, aż jajka się zetną.
    
    5. Chia pudding z mlekiem kokosowym
    Chia pudding to nie tylko pyszny, ale także pełen wartości odżywczych deser, który można przygotować wieczorem.
    
    Przepis:
    
    3 łyżki nasion chia
    1 szklanka mleka kokosowego
    1 łyżka syropu klonowego
    Owoce do dekoracji (np. mango, kiwi, maliny)
    Przygotowanie:
    Wymieszaj nasiona chia z mlekiem kokosowym i syropem klonowym. Odstaw na noc do lodówki. Rano udekoruj owocami.
    
    Korzyści z regularnego spożywania śniadań
    Regularne jedzenie zdrowych śniadań może przynieść wiele korzyści:
    
    Lepsza koncentracja i produktywność – Badania pokazują, że osoby jedzące śniadania lepiej radzą sobie w pracy i szkole.
    Utrzymanie zdrowej wagi – Śniadania wspierają metabolizm i pomagają uniknąć napadów głodu.
    Wspieranie zdrowia serca – Śniadania bogate w błonnik mogą obniżać poziom cholesterolu.
    Podsumowanie
    Śniadanie to coś więcej niż tylko posiłek – to inwestycja w zdrowie i dobre samopoczucie. Dzięki różnorodnym przepisom można dostosować śniadanie do własnych preferencji, potrzeb i trybu życia. Czy to owsianka, kanapka, koktajl, czy jajecznica – każdy znajdzie coś dla siebie. Pamiętaj, aby nie pomijać tego kluczowego posiłku i czerpać radość z jego przygotowywania. Twoje ciało i umysł na pewno Ci za to podziękują! `,
    type: "TextPost",
    categories: ["Jedzenie", "Zdrowie"],
    date: "2024-10-18",
    borderRadius: "25px",
    specialCorner: true,
  },
  {
    id: "3",
    src: "images/3.jpg",
    w: 1,
    h: 2,
    title: "Podróże Marzeń: Najpiękniejsze Miejsca na Świecie",
    content:
      "Marzysz o podróżach? Poznaj najpiękniejsze miejsca na świecie, które warto odwiedzić przynajmniej raz w życiu. Od malowniczych plaż po majestatyczne góry – odkryj świat na nowo.",
    type: "TextPost",
    categories: ["Podróże", "Styl życia"],
    date: "2024-12-10",
    borderRadius: "25px",
    specialCorner: true,
  },
  {
    id: "4",
    src: "images/4.jpg",
    w: 1,
    h: 1,
    title: "Minimalizm w Życiu Codziennym",
    content:
      "Minimalizm to nie tylko trend, ale styl życia, który może przynieść wiele korzyści. Dowiedz się, jak wprowadzić minimalizm do swojej codzienności i czerpać z tego pełnię szczęścia.",
    type: "StandardPost",
    categories: ["Styl życia", "Edukacja", "Podróże", "Zdrowie", "Ekologia"],
    date: "2024-08-08",
    borderRadius: "25px",
  },
  {
    id: "5",
    w: 1,
    h: 1,
    type: "CategoriesPost",
    categories: [
      "Technologia",
      "Styl życia",
      "Edukacja",
      "Podróże",
      "Zdrowie",
      "Ekologia",
    ],
    date: "2024-04-031",
    borderRadius: "25px",
  },
  {
    id: "6",
    src: "images/6.jpg",
    w: 1,
    h: 2,
    title: "Sztuka Relaksu: Jak Znaleźć Spokój w Zgiełku Miasta",
    content:
      "Życie w mieście potrafi być stresujące. Oto kilka sprawdzonych metod, które pomogą Ci znaleźć spokój i zrelaksować się nawet w najbardziej zabieganym otoczeniu.",
    type: "StandardPost",
    categories: ["Zdrowie", "Styl życia"],
    date: "2024-01-10",
    borderRadius: "25px",
  },
  {
    id: "7",
    src: "images/7.jpg",
    w: 1,
    h: 1,
    title: "Ekologia na Co Dzień: Proste Kroki dla Środowiska",
    content:
      "Dbając o środowisko, możemy zrobić wiele dobrego. Dowiedz się, jakie proste zmiany możesz wprowadzić do swojego życia, aby przyczynić się do ochrony naszej planety.",
    type: "StandardPost",
    categories: ["Ekologia", "Styl życia"],
    date: "2024-08-05",
    borderRadius: "25px",
  },
  {
    id: "8",
    src: "images/8.jpg",
    w: 1,
    h: 1,
    title: "Rozwój Osobisty: Jak Osiągnąć Swoje Cele",
    content:
      "Chcesz osiągnąć swoje cele, ale nie wiesz, od czego zacząć? Oto kilka skutecznych strategii, które pomogą Ci w drodze do sukcesu.",
    type: "TextPost",
    categories: ["Edukacja", "Finanse"],
    date: "2024-10-03",
    borderRadius: "25px",
    specialCorner: true,
  },
  {
    id: "9",
    src: "images/9.jpg",
    w: 2,
    h: 2,
    title: "Fitness dla Każdego: Treningi, Które Możesz Zrobić w Domu",
    content:
      "Nie masz czasu na siłownię? Oto zestaw treningów, które możesz wykonać w domu, aby utrzymać formę i zdrowie bez wychodzenia z domu.",
    content2: `
    Dlaczego warto ćwiczyć w domu?
    Treningi w domu to wygodny sposób na utrzymanie dobrej kondycji fizycznej bez potrzeby wychodzenia na siłownię. Możesz dostosować ćwiczenia do własnych potrzeb i harmonogramu, oszczędzając czas i pieniądze.
    
    Przykładowe ćwiczenia do wykonania w domu:
    - Pompki: Wzmocnij mięśnie klatki piersiowej, ramion i tricepsów.
    - Przysiady: Popraw kondycję mięśni nóg i pośladków.
    - Plank: Wzmocnij mięśnie brzucha i pleców.
    - Wykroki: Dopracuj mięśnie nóg i równowagę.
    - Skakanka: Popraw wydolność serca i spalenie kalorii.
    
    Jak zacząć?
    Przygotuj miejsce do ćwiczeń, zaopatrz się w matę i zacznij od krótkich sesji 10-15 minut dziennie. Stopniowo zwiększaj intensywność i czas treningów, pamiętając o rozgrzewce i rozciąganiu po treningu.
    
    Podsumowanie:
    Ćwiczenia w domu to świetny sposób na poprawę zdrowia i samopoczucia. Wystarczy trochę motywacji i regularności, aby osiągnąć zauważalne efekty.
  `,
    type: "StandardPost",
    categories: ["Zdrowie", "Sport"],
    date: "2024-07-17",
    borderRadius: "25px",
  },
  {
    id: "10",
    src: "images/10.jpg",
    w: 1,
    h: 2,
    title: "Kreatywność w Pracy: Jak Być Twórczym w Środowisku Zawodowym",
    content:
      "Kreatywność to klucz do sukcesu w wielu zawodach. Dowiedz się, jak rozwijać swoją kreatywność i wprowadzać innowacje w miejscu pracy.",
    type: "TextPost",
    categories: ["Edukacja", "Technologia"],
    date: "2024-03-19",
    borderRadius: "25px",
  },
  {
    id: "11",
    src: "images/11.jpg",
    w: 1,
    h: 1,
    title: "Moda na Minimalizm: Styl, Który Trwa",
    content:
      "Minimalistyczny styl to połączenie elegancji i funkcjonalności. Poznaj zasady minimalizmu w modzie i odkryj, jak stworzyć garderobę pełną ponadczasowych ubrań.",
    type: "StandardPost",
    categories: ["Moda", "Styl życia"],
    date: "2024-04-11",
    borderRadius: "25px",
  },
  {
    id: "12",
    src: "images/12.jpg",
    w: 1,
    h: 2,
    title: "Zdrowie Psychiczne: Jak Zadbać o Swoje Umysł",
    content:
      "Zdrowie psychiczne jest równie ważne jak fizyczne. Oto kilka praktycznych wskazówek, które pomogą Ci zadbać o swój umysł i emocje.",
    type: "StandardPost",
    categories: ["Zdrowie", "Styl życia"],
    date: "2024-05-22",
    borderRadius: "25px",
  },
  {
    id: "13",
    src: "images/13.jpg",
    w: 1,
    h: 1,
    title: "Kuchnia Świata: Smaki, Które Musisz Spróbować",
    content:
      "Podróże kulinarne to doskonały sposób na odkrywanie nowych kultur. Przedstawiamy przepisy na dania z różnych zakątków świata, które warto wypróbować.",
    type: "TextPost",
    categories: ["Jedzenie", "Podróże"],
    date: "2024-09-30",
    borderRadius: "25px",
  },
  {
    id: "14",
    src: "images/14.jpg",
    w: 1,
    h: 1,
    title: "Techniki Medytacji: Jak Zacząć Praktykę Medytacji",
    content:
      "Medytacja to skuteczny sposób na redukcję stresu i poprawę koncentracji. Dowiedz się, jak rozpocząć swoją przygodę z medytacją i czerpać z niej pełne korzyści.",
    type: "StandardPost",
    categories: ["Zdrowie", "Edukacja"],
    date: "2024-06-02",
    borderRadius: "25px",
  },
  {
    id: "15",
    src: "images/15.jpg",
    w: 1,
    h: 2,
    title: "Praca Zdalna: Jak Być Produktywnym w Domowym Biurze",
    content:
      "Praca zdalna staje się coraz bardziej popularna. Oto kilka wskazówek, które pomogą Ci zachować produktywność i równowagę między życiem zawodowym a prywatnym.",
    type: "StandardPost",
    categories: ["Finanse", "Edukacja"],
    date: "2024-06-03",
    borderRadius: "25px",
  },
  {
    id: "16",
    src: "images/16.jpg",
    w: 1,
    h: 2,
    title: "DIY: Kreatywne Projekty na Weekend",
    content:
      "Lubisz tworzyć coś własnymi rękami? Przygotowaliśmy dla Ciebie kilka inspirujących projektów DIY, które możesz wykonać w weekend.",
    type: "StandardPost",
    categories: ["DIY", "Styl życia"],
    date: "2024-02-11",
    borderRadius: "25px",
  },
  {
    id: "17",
    src: "images/17.jpg",
    w: 1,
    h: 2,
    title: "Zarządzanie Czasem: Jak Efektywnie Planować Swój Dzień",
    content:
      "Zarządzanie czasem to klucz do sukcesu zarówno w życiu zawodowym, jak i prywatnym. Poznaj techniki, które pomogą Ci lepiej planować i wykorzystać każdą godzinę.",
    type: "TextPost",
    categories: ["Edukacja", "Finanse"],
    date: "2024-03-17",
    borderRadius: "25px",
  },
  {
    id: "18",
    src: "images/18.jpg",
    w: 1,
    h: 2,
    title: "Eko-życie: Jak Żyć Bardziej Świadomie i Odpowiedzialnie",
    content:
      "Świadome życie to styl życia, który uwzględnia wpływ naszych działań na środowisko. Oto kilka prostych kroków, które możesz podjąć, aby żyć bardziej ekologicznie.",
    type: "StandardPost",
    categories: ["Ekologia", "Styl życia"],
    date: "2024-05-28",
    borderRadius: "25px",
  },
  {
    id: "19",
    src: "images/19.jpg",
    w: 1,
    h: 1,
    title: "Sztuka Organizacji: Jak Utrzymać Porządek w Domu",
    content:
      "Utrzymanie porządku w domu może być wyzwaniem. Poznaj sprawdzone metody organizacji przestrzeni, które pomogą Ci stworzyć harmonijną i uporządkowaną przestrzeń życiową.",
    type: "StandardPost",
    categories: ["Organizacja", "Styl życia"],
    date: "2024-12-23",
    borderRadius: "25px",
  },
  {
    id: "20",
    src: "images/20.jpg",
    w: 2,
    h: 2,
    title: "Inspiracje Literackie: Książki, Które Musisz Przeczytać",
    content:
      "Miłośnicy literatury, ten wpis jest dla Was! Przedstawiamy listę książek, które warto przeczytać, aby poszerzyć swoje horyzonty i czerpać inspirację z różnych gatunków.",
    type: "TextPost",
    categories: ["Edukacja", "Rozrywka"],
    date: "2024-12-18",
    borderRadius: "25px",
  },
];

export default initialPosts;
```

## File: `src/data/bytom.json` <a id="file-src-data-bytom-json"></a>

```json
{
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [18.863, 50.334],
              [18.882, 50.315],
              [18.924, 50.318],
              [18.948, 50.331],
              [18.965, 50.355],
              [18.950, 50.380],
              [18.910, 50.395],
              [18.875, 50.385],
              [18.850, 50.360],
              [18.863, 50.334]
            ]
          ]
        }
      }
    ]
  }
```

## File: `src/data/gliwice.json` <a id="file-src-data-gliwice-json"></a>

```json
{
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [18.600, 50.310], [18.620, 50.280], [18.650, 50.270], 
          [18.680, 50.260], [18.720, 50.275], [18.750, 50.280], 
          [18.760, 50.300], [18.740, 50.320], [18.720, 50.340], 
          [18.690, 50.350], [18.660, 50.345], [18.630, 50.330], 
          [18.600, 50.310]
        ]
      ]
    }
  }
```

## File: `src/data/posts.jsx` <a id="file-src-data-posts-jsx"></a>

```jsx
// src/data/posts.js

const initialPosts = [
  {
    id: "1",
    src: "images/1.jpg",
    w: 2,
    h: 1,
    title: "Magiczne Poranki: Jak Zacząć Dzień Pełen Energii",
    type: "StandardPost",
    hasSvg: true,
    categories: ["Styl", "Zdrowie"],
    date: "2024-12-11",
    borderRadius: "25px",
  },
  {
    id: "2",
    src: "images/2.jpg",
    w: 2,
    h: 2,
    title: "Zdrowe Przepisy: Śniadanie, Które Zmieni Twój Dzień",
    content:
      "Śniadanie to najważniejszy posiłek dnia. Przygotowaliśmy dla Ciebie kilka zdrowych i smacznych przepisów, które dostarczą Ci energii na cały dzień.",
    type: "TextPost",
    categories: ["Jedzenie", "Zdrowie"],
    date: "2024-10-18",
    borderRadius: "25px",
    specialCorner: true
    
  },
  {
    id: "3",
    src: "images/3.jpg",
    w: 1,
    h: 2,
    title: "Podróże Marzeń: Najpiękniejsze Miejsca na Świecie",
    content:
      "Marzysz o podróżach? Poznaj najpiękniejsze miejsca na świecie, które warto odwiedzić przynajmniej raz w życiu. Od malowniczych plaż po majestatyczne góry – odkryj świat na nowo.",
    type: "TextPost",
    categories: ["Podróże", "Styl życia"],
    date: "2024-12-10",
    borderRadius: "25px",
    specialCorner: true
  },
  {
    id: "4",
    src: "images/4.jpg",
    w: 1,
    h: 1,
    title: "Minimalizm w Życiu Codziennym",
    content:
      "Minimalizm to nie tylko trend, ale styl życia, który może przynieść wiele korzyści. Dowiedz się, jak wprowadzić minimalizm do swojej codzienności i czerpać z tego pełnię szczęścia.",
    type: "StandardPost",
    categories: ["Styl życia", "Edukacja", "Podróże", "Zdrowie","Ekologia" ],
    date: "2024-08-08",
    borderRadius: "25px",
  },
  {
    id: "5",
    w: 1,
    h: 1,
    type: "CategoriesPost",
    categories: ["Technologia", "Styl życia", "Edukacja", "Podróże", "Zdrowie","Ekologia"],
    date: "2024-04-031",
    borderRadius: "25px",
  },
  {
    id: "6",
    src: "images/6.jpg",
    w: 1,
    h: 2,
    title: "Sztuka Relaksu: Jak Znaleźć Spokój w Zgiełku Miasta",
    content:
      "Życie w mieście potrafi być stresujące. Oto kilka sprawdzonych metod, które pomogą Ci znaleźć spokój i zrelaksować się nawet w najbardziej zabieganym otoczeniu.",
    type: "StandardPost",
    categories: ["Zdrowie", "Styl życia"],
    date: "2024-01-10",
    borderRadius: "25px",
  },
  {
    id: "7",
    src: "images/7.jpg",
    w: 1,
    h: 1,
    title: "Ekologia na Co Dzień: Proste Kroki dla Środowiska",
    content:
      "Dbając o środowisko, możemy zrobić wiele dobrego. Dowiedz się, jakie proste zmiany możesz wprowadzić do swojego życia, aby przyczynić się do ochrony naszej planety.",
    type: "StandardPost",
    categories: ["Ekologia", "Styl życia"],
    date: "2024-08-05",
    borderRadius: "25px",
    
  },
  {
    id: "8",
    src: "images/8.jpg",
    w: 1,
    h: 1,
    title: "Rozwój Osobisty: Jak Osiągnąć Swoje Cele",
    content:
      "Chcesz osiągnąć swoje cele, ale nie wiesz, od czego zacząć? Oto kilka skutecznych strategii, które pomogą Ci w drodze do sukcesu.",
    type: "TextPost",
    categories: ["Edukacja", "Finanse"],
    date: "2024-10-03",
    borderRadius: "25px",
    specialCorner: true
  },
  {
    id: "9",
    src: "images/9.jpg",
    w: 2,
    h: 2,
    title: "Fitness dla Każdego: Treningi, Które Możesz Zrobić w Domu",
    content:
      "Nie masz czasu na siłownię? Oto zestaw treningów, które możesz wykonać w domu, aby utrzymać formę i zdrowie bez wychodzenia z domu.",
    type: "StandardPost",
    categories: ["Zdrowie", "Sport"],
    date: "2024-07-17",
    borderRadius: "25px",
  },
  {
    id: "10",
    src: "images/10.jpg",
    w: 1,
    h: 2,
    title: "Kreatywność w Pracy: Jak Być Twórczym w Środowisku Zawodowym",
    content:
      "Kreatywność to klucz do sukcesu w wielu zawodach. Dowiedz się, jak rozwijać swoją kreatywność i wprowadzać innowacje w miejscu pracy.",
    type: "TextPost",
    categories: ["Edukacja", "Technologia"],
    date: "2024-03-19",
    borderRadius: "25px",
  },
  {
    id: "11",
    src: "images/11.jpg",
    w: 1,
    h: 1,
    title: "Moda na Minimalizm: Styl, Który Trwa",
    content:
      "Minimalistyczny styl to połączenie elegancji i funkcjonalności. Poznaj zasady minimalizmu w modzie i odkryj, jak stworzyć garderobę pełną ponadczasowych ubrań.",
    type: "StandardPost",
    categories: ["Moda", "Styl życia"],
    date: "2024-04-11",
    borderRadius: "25px",
  },
  {
    id: "12",
    src: "images/12.jpg",
    w: 1,
    h: 2,
    title: "Zdrowie Psychiczne: Jak Zadbać o Swoje Umysł",
    content:
      "Zdrowie psychiczne jest równie ważne jak fizyczne. Oto kilka praktycznych wskazówek, które pomogą Ci zadbać o swój umysł i emocje.",
    type: "StandardPost",
    categories: ["Zdrowie", "Styl życia"],
    date: "2024-05-22",
    borderRadius: "25px",
  },
  {
    id: "13",
    src: "images/13.jpg",
    w: 1,
    h: 1,
    title: "Kuchnia Świata: Smaki, Które Musisz Spróbować",
    content:
      "Podróże kulinarne to doskonały sposób na odkrywanie nowych kultur. Przedstawiamy przepisy na dania z różnych zakątków świata, które warto wypróbować.",
    type: "TextPost",
    categories: ["Jedzenie", "Podróże"],
    date: "2024-09-30",
    borderRadius: "25px",
  },
  {
    id: "14",
    src: "images/14.jpg",
    w: 1,
    h: 1,
    title: "Techniki Medytacji: Jak Zacząć Praktykę Medytacji",
    content:
      "Medytacja to skuteczny sposób na redukcję stresu i poprawę koncentracji. Dowiedz się, jak rozpocząć swoją przygodę z medytacją i czerpać z niej pełne korzyści.",
    type: "StandardPost",
    categories: ["Zdrowie", "Edukacja"],
    date: "2024-06-02",
    borderRadius: "25px",
  },
  {
    id: "15",
    src: "images/15.jpg",
    w: 1,
    h: 2,
    title: "Praca Zdalna: Jak Być Produktywnym w Domowym Biurze",
    content:
      "Praca zdalna staje się coraz bardziej popularna. Oto kilka wskazówek, które pomogą Ci zachować produktywność i równowagę między życiem zawodowym a prywatnym.",
    type: "StandardPost",
    categories: ["Finanse", "Edukacja"],
    date: "2024-06-03",
    borderRadius: "25px",
  },
  {
    id: "16",
    src: "images/16.jpg",
    w: 1,
    h: 2,
    title: "DIY: Kreatywne Projekty na Weekend",
    content:
      "Lubisz tworzyć coś własnymi rękami? Przygotowaliśmy dla Ciebie kilka inspirujących projektów DIY, które możesz wykonać w weekend.",
    type: "StandardPost",
    categories: ["DIY", "Styl życia"],
    date: "2024-02-11",
    borderRadius: "25px",
  },
  {
    id: "17",
    src: "images/17.jpg",
    w: 1,
    h: 2,
    title: "Zarządzanie Czasem: Jak Efektywnie Planować Swój Dzień",
    content:
      "Zarządzanie czasem to klucz do sukcesu zarówno w życiu zawodowym, jak i prywatnym. Poznaj techniki, które pomogą Ci lepiej planować i wykorzystać każdą godzinę.",
    type: "TextPost",
    categories: ["Edukacja", "Finanse"],
    date: "2024-03-17",
    borderRadius: "25px",
  },
  {
    id: "18",
    src: "images/18.jpg",
    w: 1,
    h: 2,
    title: "Eko-życie: Jak Żyć Bardziej Świadomie i Odpowiedzialnie",
    content:
      "Świadome życie to styl życia, który uwzględnia wpływ naszych działań na środowisko. Oto kilka prostych kroków, które możesz podjąć, aby żyć bardziej ekologicznie.",
    type: "StandardPost",
    categories: ["Ekologia", "Styl życia"],
    date: "2024-05-28",
    borderRadius: "25px",
  },
  {
    id: "19",
    src: "images/19.jpg",
    w: 1,
    h: 1,
    title: "Sztuka Organizacji: Jak Utrzymać Porządek w Domu",
    content:
      "Utrzymanie porządku w domu może być wyzwaniem. Poznaj sprawdzone metody organizacji przestrzeni, które pomogą Ci stworzyć harmonijną i uporządkowaną przestrzeń życiową.",
    type: "StandardPost",
    categories: ["Organizacja", "Styl życia"],
    date: "2024-12-23",
    borderRadius: "25px",
  },
  {
    id: "20",
    src: "images/20.jpg",
    w: 2,
    h: 2,
    title: "Inspiracje Literackie: Książki, Które Musisz Przeczytać",
    content:
      "Miłośnicy literatury, ten wpis jest dla Was! Przedstawiamy listę książek, które warto przeczytać, aby poszerzyć swoje horyzonty i czerpać inspirację z różnych gatunków.",
    type: "TextPost",
    categories: ["Edukacja", "Rozrywka"],
    date: "2024-12-18",
    borderRadius: "25px",
  },
];

export default initialPosts;
```

## File: `src/helpers/citiesData.js` <a id="file-src-helpers-citiesdata-js"></a>

```javascript
// --- IMPORT IKON 3D (Premium) ---
import iconB2B from '../assets/roczny-scope-card-icon.png';
import iconHouse from '../assets/5-scope-card-icon.png';
import iconGas from '../assets/instal-scope-card-icon.png';
import iconEngineer from '../assets/doradztwo-scope-card-icon.png';
import iconEnergy from '../assets/energ-scope-card-icon.png';




const iconMining = require("../assets/mining-risk-icon.png");
const iconAudyt = require("../assets/risk-icon-audyt.png");
const iconDewelop = require("../assets/risk-icon-dewelop.png");
const iconFamiloki = require("../assets/risk-icon-familoki.png");
const iconInstal = require("../assets/risk-icon-instal.png");
const iconKolej = require("../assets/risk-icon-kolej.png");
const iconLogistyka = require("../assets/risk-icon-logistyka.png");
const iconPłyta = require("../assets/risk-icon-płyta.png");
const iconStarowka = require("../assets/risk-icon-starówka.png");
const iconTermoDron = require("../assets/risk-icon-termo-dron.png");
const iconWoda = require("../assets/risk-icon-woda.png");
const iconZabytki = require("../assets/risk-icon-zabytki.png");
const iconZielone = require("../assets/risk-icon-zielone.png");

export const citiesData = [
  // --- CZĘŚĆ CENTRALNA I ZACHODNIA ---

  {
    name: "Katowice",
    lat: 50.264,
    lng: 19.023,
    slug: "katowice",
    seoTitle: "Przeglądy Budowlane Katowice | Ekspertyzy i Odbiory Mieszkań",
    seoDescription: "Inżynier budownictwa w Katowicach. Wykonuję przeglądy 5-letnie, opinie techniczne oraz odbiory deweloperskie w Śródmieściu, Ligocie i na nowych osiedlach.",
    localDescription: "Katowice to miasto kontrastów – od zabytkowych kamienic i modernistycznej architektury po nowoczesne wieżowce. Jako inżynierowie zwracamy tu szczególną uwagę na szkody górnicze w południowych dzielnicach oraz stan techniczny wielkiej płyty.",
    risks: [
      {
        icon: iconFamiloki,
        title: "Szkody Górnicze",
        description: "Dzielnice takie jak Murcki, Kostuchna czy Panewniki wciąż narażone są na osiadanie gruntu i wstrząsy."
      },
      {
        icon: iconZabytki,
        title: "Modernizm i Tarasy",
        description: "Katowicka moderna to piękne budynki, ale często borykające się z problemami szczelności płaskich dachów i tarasów."
      },
      {
        icon: iconPłyta,
        title: "Termomodernizacja",
        description: "Weryfikujemy jakość dociepleń v budynkach z wielkiej płyty (Osiedle Tysiąclecia, Paderewskiego)."
      }
    ]
  },

  {
    name: "Gliwice",
    lat: 50.294,
    lng: 18.6657,
    slug: "gliwice",
    seoTitle: "Przeglądy Budowlane Gliwice - 5-letnie i Roczne | Inżynier Budownictwa",
    seoDescription: "Szukasz inżyniera w Gliwicach? Wykonuję okresowe przeglądy budowlane, odbiory mieszkań i audyty energetyczne na terenie Gliwic i powiatu.",
    localDescription: "Gliwice to poligon budowlany o dwóch twarzach. Z jednej strony historyczne Zatorze i Śródmieście z wymagającymi drewnianymi stropami. Z drugiej – dynamiczne nowe osiedla, gdzie pośpiech deweloperów często odbija się na izolacji.",
    risks: [
      {
        icon: iconStarowka,
        title: "Poniemieckie Kamienice",
        description: "Specjalizujemy się w ocenie drewnianych stropów i zawilgoconych piwnic w budynkach z cegły."
      },
      {
        icon: iconZabytki,
        title: "Tereny Górnicze",
        description: "Mimo zamknięcia kopalń, dzielnice jak Sośnica czy Łabędy wciąż wymagają weryfikacji wychyleń budynku."
      },
      {
        icon: iconZielone,
        title: "Grunty Gliniaste",
        description: "Specyfika gruntu w Gliwicach wymaga sprawnego drenażu opaskowego. Weryfikujemy jego drożność."
      }
    ]
  },

  {
    name: "Zabrze",
    lat: 50.3086,
    lng: 18.787,
    slug: "zabrze",
    seoTitle: "Przegląd Budowlany Zabrze | Szkody Górnicze i Odbiory",
    seoDescription: "Kompleksowe przeglądy budynków w Zabrzu. Specjalizacja w obiektach na terenach górniczych oraz starych familokach. Szybkie terminy.",
    localDescription: "Zabrze to miasto o wyjątkowej, ale trudnej strukturze geologicznej. Intensywna eksploatacja górnicza w przeszłości wymusiła stosowanie zabezpieczeń (kotwienie), których stan techniczny jest kluczowy dla bezpieczeństwa.",
    risks: [
      {
        icon: iconZabytki,
        title: "Kategoria Terenu",
        description: "Weryfikujemy zabezpieczenia budynków na terenach III i IV kategorii szkód górniczych (np. Makoszowy, Kończyce)."
      },
      {
        icon: iconAudyt,
        title: "Pęknięcia Ścian",
        description: "Analizujemy czy rysy na elewacji są stabilne, czy wynikają z aktywnej pracy górotworu."
      },
      {
        icon: iconFamiloki,
        title: "Familoki",
        description: "Przeglądy techniczne historycznych osiedli robotniczych – stan więźby dachowej i instalacji."
      }
    ]
  },

  {
    name: "Bytom",
    lat: 50.347,
    lng: 18.9232,
    slug: "bytom",
    seoTitle: "Przeglądy Techniczne Bytom | Ekspertyzy Budowlane",
    seoDescription: "Rzetelne przeglądy okresowe w Bytomiu. Sprawdzamy stan techniczny kamienic i budynków narażonych na osiadanie terenu.",
    localDescription: "Bytom posiada piękną architekturę secesyjną, która niestety mocno ucierpiała przez szkody górnicze. Nasze przeglądy w Bytomiu skupiają się na statyce budynków i szczelności instalacji gazowych.",
    risks: [
      {
        icon: iconStarowka,
        title: "Osiadanie Terenu",
        description: "Szczegółowa kontrola pionowości ścian i poziomów stropów v dzielnicach takich jak Karb czy Bobrek."
      },
      {
        icon: iconWoda,
        title: "Wilgoć Kapilarna",
        description: "Problem podciągania wilgoci w starych murach ceglanych bez izolacji poziomej."
      },
      {
        icon: iconZabytki,
        title: "Stan Elewacji",
        description: "Kontrola gzymsów i balkonów zagrażających przechodniom w ścisłym centrum."
      }
    ]
  },

  {
    name: "Ruda Śląska",
    lat: 50.2858,
    lng: 18.8748,
    slug: "ruda-slaska",
    seoTitle: "Przeglądy Budowlane Ruda Śląska | Inżynier z Uprawnieniami",
    seoDescription: "Przeglądy roczne i 5-letnie w Rudzie Śląskiej. Obsługa wspólnot mieszkaniowych i domów jednorodzinnych. Halemba, Wirek, Bielszowice.",
    localDescription: "Ruda Śląska to aglomeracja wielu dzielnic o zróżnicowanym charakterze. Od szkód górniczych w Halembie po starą zabudowę Wirku. Skupiamy się tu na fundamentach i dylatacjach.",
    risks: [
      {
        icon: iconZabytki,
        title: "Wstrząsy Górnicze",
        description: "Regularne monitorowanie wpływu wstrząsów na konstrukcję nośną budynków."
      },
      {
        icon: iconInstal,
        title: "Instalacje",
        description: "Weryfikacja szczelności instalacji w budynkach narażonych na ruchy górotworu."
      },
      {
        icon: iconDewelop,
        title: "Domy Jednorodzinne",
        description: "Odbiory techniczne nowych domów v dynamicznie rozwijających się częściach miasta."
      }
    ]
  },

  {
    name: "Chorzów",
    lat: 50.297,
    lng: 18.954,
    slug: "chorzow",
    seoTitle: "Przegląd Budynku Chorzów | Kontrole Okresowe KOB",
    seoDescription: "Prowadzenie Książki Obiektu Budowlanego w Chorzowie. Przeglądy instalacji i konstrukcji. Skontaktuj się z inżynierem.",
    localDescription: "Chorzów łączy starą tkankę miejską z terenami parkowymi. Głównym wyzwaniem inżynierskim jest tu wiek budynków oraz adaptacja starych konstrukcji do nowych norm energetycznych.",
    risks: [
      {
        icon: iconFamiloki,
        title: "Stropy Kleina",
        description: "Ocena stanu technicznego stalowo-ceramicznych stropów w kamienicach z przełomu wieków."
      },
      {
        icon: iconWoda,
        title: "Kanalizacja",
        description: "Inspekcja starych przyłączy kanalizacyjnych i deszczowych."
      },
      {
        icon: iconTermoDron,
        title: "Audyty Energetyczne",
        description: "Przygotowanie dokumentacji dla programu Czyste Powietrze dla starszych domów."
      }
    ]
  },

  {
    name: "Świętochłowice",
    lat: 50.2906,
    lng: 18.9195,
    slug: "swietochlowice",
    seoTitle: "Przeglądy Budowlane Świętochłowice",
    seoDescription: "Inżynier budownictwa Świętochłowice. Przeglądy, opinie techniczne, odbiory.",
    localDescription: "Świętochłowice to miasto o gęstej zabudowie historycznej. Skupiamy się tutaj na ocenie stanu technicznego murów oraz bezpieczeństwie pożarowym (kominy, instalacje).",
    risks: [
      {
        icon: iconFamiloki,
        title: "Stara Zabudowa",
        description: "Weryfikacja stanu technicznego lipin i chropaczowskich familoków."
      },
      {
        icon: iconInstal,
        title: "Kominy",
        description: "Kontrola przewodów kominowych i wentylacyjnych w starszych budynkach."
      },
      {
        icon: iconWoda,
        title: "Piwnice",
        description: "Ocena zawilgocenia przyziemia i izolacji fundamentów."
      }
    ]
  },

  {
    name: "Siemianowice Śl.",
    lat: 50.308,
    lng: 19.03,
    slug: "siemianowice-slaskie",
    seoTitle: "Inżynier Budowlany Siemianowice Śląskie",
    seoDescription: "Przeglądy techniczne i odbiory mieszkań Siemianowice. Bytków, Michałkowice, Centrum.",
    localDescription: "Siemianowice to dynamicznie rozwijające się osiedla (np. Bytków) sąsiadujące z postindustrialną historią. Wykonujemy tu dużo odbiorów deweloperskich.",
    risks: [
      {
        icon: iconDewelop,
        title: "Odbiory Deweloperskie",
        description: "Sprawdzanie tynków, wylewek i stolarki okiennej w nowych inwestycjach."
      },
      {
        icon: iconPłyta,
        title: "Wielka Płyta",
        description: "Kontrola łączeń płyt elewacyjnych na osiedlach wysokościowców."
      },
      {
        icon: iconZielone,
        title: "Tereny Zielone",
        description: "Weryfikacja drenażu na osiedlach budowanych w sąsiedztwie terenów parkowych."
      }
    ]
  },

  {
    name: "Piekary Śląskie",
    lat: 50.384,
    lng: 18.9456,
    slug: "piekary-slaskie",
    seoTitle: "Przeglądy Budowlane Piekary Śląskie",
    seoDescription: "Fachowe przeglądy domów i budynków w Piekarach Śląskich. Zadzwoń i umów termin.",
    localDescription: "W Piekarach Śląskich dominują domy jednorodzinne oraz osiedla z lat 70-tych. Nasza praca skupia się na audytach energetycznych i kontroli stanu dachów.",
    risks: [
      {
        icon: iconTermoDron,
        title: "Termowizja",
        description: "Badanie ucieczki ciepła w domach jednorodzinnych - mostki termiczne."
      },
      {
        icon: iconStarowka,
        title: "Dachy Skośne",
        description: "Sprawdzanie stanu więźby dachowej i pokrycia w zabudowie jednorodzinnej."
      },
      {
        icon: iconZabytki,
        title: "Szkody",
        description: "Monitorowanie ewentualnych wpływów eksploatacji górniczej."
      }
    ]
  },

  {
    name: "Tychy",
    lat: 50.1144,
    lng: 18.9966,
    slug: "tychy",
    seoTitle: "Przegląd Budowlany Tychy | Audytora Energetyczny",
    seoDescription: "Tychy: Przeglądy 5-letnie, Świadectwa Energetyczne, Odbiory mieszkań. Sprawdź ofertę inżyniera.",
    localDescription: "Tychy to przykład dobrze zaplanowanego miasta modernistycznego, jednak upływ czasu dotyka tutejsze budynki. Skupiamy się na problemach 'wielkiej płyty' oraz termomodernizacji.",
    risks: [
      {
        icon: iconPłyta,
        title: "Systemy Prefabrykowane",
        description: "Ocena stanu złącz i korozji betonu w systemach wielkopłytowych."
      },
      {
        icon: iconTermoDron,
        title: "Termomodernizacja",
        description: "Nadzór nad dociepleniami budynków i wymianą stolarki okiennej."
      },
      {
        icon: iconWoda,
        title: "Dachy Płaskie",
        description: "Weryfikacja szczelności pokryć dachowych z papy termozgrzewalnej."
      }
    ]
  },

  {
    name: "Mysłowice",
    lat: 50.2446,
    lng: 19.1391,
    slug: "myslowice",
    seoTitle: "Przeglądy Budynków Mysłowice",
    seoDescription: "Mysłowice - przeglądy techniczne, opinie, ekspertyzy. Obsługa firm i klientów indywidualnych.",
    localDescription: "Mysłowice to miasto o zróżnicowanej zabudowie, często narażone na podtopienia i szkody górnicze. Wymaga to kompleksowego podejścia do izolacji i konstrukcji.",
    risks: [
      {
        icon: iconWoda,
        title: "Wody Gruntowe",
        description: "Ocena ryzyka podtopień piwnic i skuteczności izolacji pionowych."
      },
      {
        icon: iconZabytki,
        title: "Szkody Górnicze",
        description: "Weryfikacja wychyleń i pęknięć w dzielnicach górniczych (Wesoła, Brzezinka)."
      },
      {
        icon: iconAudyt,
        title: "Stan Techniczny",
        description: "Ogólna ocena zużycia technicznego budynków przed zakupem."
      }
    ]
  },

  // --- ZAGŁĘBIE ---

  {
    name: "Sosnowiec",
    lat: 50.2781,
    lng: 19.1343,
    slug: "sosnowiec",
    seoTitle: "Przeglądy Budowlane Sosnowiec | Inżynier Zagłębie",
    seoDescription: "Profesjonalne przeglądy budowlane w Sosnowcu. Mieszkania, domy, hale przemysłowe.",
    localDescription: "Sosnowiec jako stolica Zagłębia posiada wiele terenów poprzemysłowych oraz starą zabudowę czynszową. Problemy często dotyczą osiadania gruntów nasypowych i wilgoci.",
    risks: [
      {
        icon: iconLogistyka,
        title: "Grunty Nasypowe",
        description: "Badanie stabilności podłoża na terenach rekultywowanych."
      },
      {
        icon: iconZabytki,
        title: "Kamienice",
        description: "Ocena stanu technicznego elewacji i balkonów w centrum miasta."
      },
      {
        icon: iconWoda,
        title: "Wilgoć",
        description: "Problemy z izolacją przeciwwilgociową w starszym budownictwie."
      }
    ]
  },

  {
    name: "Dąbrowa Górnicza",
    lat: 50.3309,
    lng: 19.2079,
    slug: "dabrowa-gornicza",
    seoTitle: "Inżynier Budownictwa Dąbrowa Górnicza",
    seoDescription: "Przeglądy techniczne i odbiory Dąbrowa Górnicza. Gołonóg, Centrum, Ząbkowice.",
    localDescription: "Dąbrowa to miasto przestrzenne, z dużą ilością terenów zielonych i jezior, ale też przemysłu. Weryfikujemy tu często wpływ wód gruntowych na piwnice.",
    risks: [
      {
        icon: iconWoda,
        title: "Poziom Wód",
        description: "Weryfikacja szczelności piwnic v rejonach blisko zbiorników wodnych."
      },
      {
        icon: iconLogistyka,
        title: "Hale Przemysłowe",
        description: "Przeglądy okresowe obiektów wielkopowierzchniowych i magazynowych."
      },
      {
        icon: iconDewelop,
        title: "Odbiory",
        description: "Pomoc przy odbiorze mieszkań od deweloperów w nowych inwestycjach."
      }
    ]
  },

  {
    name: "Czeladź",
    lat: 50.3185,
    lng: 19.0737,
    slug: "czeladz",
    seoTitle: "Przeglądy Budowlane Czeladź",
    seoDescription: "Usługi inżynierskie w Czeladzi. Przeglądy roczne i 5-letnie, opinie techniczne.",
    localDescription: "Czeladź, najstarsze miasto Zagłębia, wymaga dbałości o historyczną substancję przy jednoczesnym rozwoju stref logistycznych.",
    risks: [
      {
        icon: iconStarowka,
        title: "Stare Miasto",
        description: "Nadzór nad stanem technicznym budynków w zabytkowym układzie urbanistycznym."
      },
      {
        icon: iconLogistyka,
        title: "Obiekty Logistyczne",
        description: "Przeglądy wielkopowierzchniowe (dachy, instalacje ppoż)."
      },
      {
        icon: iconTermoDron,
        title: "Ocieplenia",
        description: "Weryfikacja poprawności wykonania termomodernizacji."
      }
    ]
  },

  {
    name: "Orzesze",
    lat: 50.1439,
    lng: 18.7756,
    slug: "orzesze",
    seoTitle: "Przeglądy Domów Orzesze",
    seoDescription: "Przeglądy budowlane Orzesze i okolice. Sprawdź stan techniczny swojego domu.",
    localDescription: "Orzesze to dominujaąca zabudowa jednorodzinna. Skupiamy się tu na przeglądach okresowych domów prywatnych oraz audytach Czyste Powietrze.",
    risks: [
      {
        icon: iconAudyt,
        title: "Domy Prywatne",
        description: "Kompleksowe przeglądy 5-letnie wymagane przez ubezpieczycieli."
      },
      {
        icon: iconInstal,
        title: "Piece i Kotły",
        description: "Doradztwo przy wymianie źródeł ciepła i termomodernizacji."
      },
      {
        icon: iconZielone,
        title: "Otoczenie",
        description: "Wpływ drzewostanu i wód opadowych na fundamenty budynku."
      }
    ]
  },

  {
    name: "Jaworzno",
    lat: 50.2034,
    lng: 19.2722,
    slug: "jaworzno",
    seoTitle: "Przeglądy Budowlane Jaworzno",
    seoDescription: "Inżynier Jaworzno. Przeglądy, odbiory, opinie techniczne. Szybki dojazd.",
    localDescription: "Jaworzno to miasto o dużej powierzchni i zróżnicowanym terenie. Wykonujemy tu przeglądy zarówno w centrum, jak i w dzielnicach podmiejskich.",
    risks: [
      {
        icon: iconZabytki,
        title: "Geologia",
        description: "Miejscowe zapadliska i pustki poeksploatacyjne (płytkie górnictwo)."
      },
      {
        icon: iconDewelop,
        title: "Nowe Domy",
        description: "Kontrola jakości budowy domów w systemie gospodarczym."
      },
      {
        icon: iconAudyt,
        title: "Pomiary",
        description: "Inwentaryzacje budowlane i pomiary powierzchni użytkowej."
      }
    ]
  },

  // --- POŁUDNIE I POŁUDNIOWY WSCHÓD ---

  {
    name: "Mikołów",
    lat: 50.1692,
    lng: 18.9044,
    slug: "mikolow",
    seoTitle: "Przeglądy Techniczne Mikołów",
    seoDescription: "Ekspertyzy i przeglądy budowlane w Mikołowie. Kamionka, Centrum, Borowa Wieś.",
    localDescription: "Mikołów to popularne miejsce do życia z dużą ilością nowych inwestycji deweloperskich, które wymagają wnikliwej kontroli przy odbiorze.",
    risks: [
      {
        icon: iconDewelop,
        title: "Jakość Deweloperska",
        description: "Weryfikacja kątów ścian, tynków i wylewek w nowych apartamentach."
      },
      {
        icon: iconZielone,
        title: "Wody Opadowe",
        description: "Problemy z zagospodarowaniem deszczówki na nowych osiedlach."
      },
      {
        icon: iconAudyt,
        title: "Domy Szeregowe",
        description: "Kontrola dylatacji i akustyki w zabudowie szeregowej."
      }
    ]
  },

  // --- PÓŁNOC I ZACHÓD ---

  {
    name: "Tarnowskie Góry",
    lat: 50.4445,
    lng: 18.8555,
    slug: "tarnowskie-gory",
    seoTitle: "Przeglądy Budowlane Tarnowskie Góry",
    seoDescription: "Inżynier Tarnowskie Góry. Zabytki, domy jednorodzinne, obiekty handlowe.",
    localDescription: "Miasto Gwarków to specyficzny grunt (dolomit) i historyczne podziemia. Budownictwo tutaj wymaga uwzględnienia stabilności podłoża.",
    risks: [
      {
        icon: iconZabytki,
        title: "Pustki Podziemne",
        description: "Analiza ryzyka związanego z historycznym górnictwem kruszcowym."
      },
      {
        icon: iconStarowka,
        title: "Zabytki",
        description: "Nadzór nad remontami budynków objętych ochroną konserwatorską."
      },
      {
        icon: iconWoda,
        title: "Wilgoć",
        description: "Ochrona przed wilgocią w starych piwnicach i przyziemiach."
      }
    ]
  },

  {
    name: "Pyskowice",
    lat: 50.3981,
    lng: 18.6277,
    slug: "pyskowice",
    seoTitle: "Przegląd Budowlany Pyskowice - Audyty i Odbiory Domów",
    seoDescription: "Profesjonalne przeglądy techniczne budynków w Pyskowicach. Dojazd w cenie usługi. Sprawdź stan swojego domu przed zakupem lub ubezpieczeniem.",
    localDescription: "Obsługujemy zarówno zabytkowe kamienice w centrum Pyskowic, jak i nową zabudowę jednorodzinną. Gwarantujemy terminy w ciągu 48h dla mieszkańców powiatu gliwickiego.",
    risks: [
      {
        icon: iconStarowka,
        title: "Stare Miasto",
        description: "Ocena stanu więźby dachowej i stropów w zabudowie rynkowej."
      },
      {
        icon: iconTermoDron,
        title: "Czyste Powietrze",
        description: "Audyty energetyczne dla domów jednorodzinnych."
      },
      {
        icon: iconKolej,
        title: "Kolej",
        description: "Wpływ drgań od węzła kolejowego na konstrukcję pobliskich budynków."
      }
    ]
  },

  {
    name: "Rybnik",
    lat: 50.0956,
    lng: 18.542,
    slug: "Rybnik",
    seoTitle: "Przeglądy Budowlane Rybnik | Inżynier",
    seoDescription: "Usługi inżynierskie w Rybniku. Przeglądy okresowe, opinie techniczne, odbiory domów.",
    localDescription: "Rybnik to miasto, które mocno stawia na walkę ze smogiem. Nasze usługi tutaj często dotyczą termomodernizacji i wymiany źródeł ciepła.",
    risks: [
      {
        icon: iconTermoDron,
        title: "Smog i Termo",
        description: "Audyty kompleksowe budynków w celu zmniejszenia niskiej emisji."
      },
      {
        icon: iconZabytki,
        title: "Szkody",
        description: "Weryfikacja wpływu eksploatacji węgla w dzielnicach południowych."
      },
      {
        icon: iconWoda,
        title: "Kanalizacja",
        description: "Sprawdzanie poprawności podłączeń do nowych sieci kanalizacyjnych."
      }
    ]
  }
];
```


# ================================================================================
# 8. SKRYPTY POMOCNICZE I NARZĘDZIA
# ================================================================================

## File: `check_firestore.js` <a id="file-check_firestore-js"></a>

```javascript
const admin = require("firebase-admin");
const serviceAccount = require("./functions/service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function check() {
  const snapshot = await db.collection("userCarts").orderBy("createdAt", "desc").limit(1).get();
  snapshot.forEach(doc => {
    console.log("Found doc:", doc.id);
    console.log("Data:", JSON.stringify(doc.data(), null, 2));
  });
}

check().catch(console.error);
```

## File: `scripts/bundle-codebase.js` <a id="file-scripts-bundle-codebase-js"></a>

```javascript
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_FILE = path.join(ROOT_DIR, "FULL_CODEBASE.md");

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  ".firebase",
  "dist",
  "build",
  ".system_generated"
]);

const IGNORED_FILES = new Set([
  ".DS_Store",
  "package-lock.json",
  "firebase-debug.log",
  "FULL_CODEBASE.md"
]);

const BINARY_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".ico", ".webp",
  ".ttf", ".otf", ".woff", ".woff2", ".eot",
  ".mp4", ".mov", ".webm", ".avi",
  ".pdf", ".zip", ".tar", ".gz",
  ".svg", ".xml"
]);

// Special handling for large binary or pseudo-text files
const OMIT_OR_SUMMARIZE_FILES = {
  "src/assets/silesia2.json": "Plik GeoJSON z poligonami granic województwa śląskiego (rozmiar ~8.1 MB, współrzędne geograficzne pominięte w celu oszczędności kontekstu).",
  "src/assets/silesia1.json": "Plik GeoJSON z punktami węzłowymi gmin/miast (rozmiar ~43 KB, dane współrzędnych geograficznych pominięte dla zwięzłości)."
};

function getLanguage(ext) {
  switch (ext) {
    case ".js":
    case ".mjs":
    case ".cjs":
      return "javascript";
    case ".jsx":
      return "jsx";
    case ".ts":
      return "typescript";
    case ".tsx":
      return "tsx";
    case ".json":
      return "json";
    case ".scss":
      return "scss";
    case ".css":
      return "css";
    case ".html":
      return "html";
    case ".md":
      return "markdown";
    case ".txt":
    default:
      return "text";
  }
}

function getSafeFence(content, lang) {
  let count = 3;
  while (content.includes("`".repeat(count))) {
    count++;
  }
  return "`".repeat(count) + lang;
}

function scanDir(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    if (IGNORED_FILES.has(entry.name)) continue;
    if (entry.name.startsWith("build_") && entry.name.endsWith(".txt")) continue;

    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath);

    if (entry.isDirectory()) {
      results = results.concat(scanDir(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (BINARY_EXTENSIONS.has(ext)) continue;
      results.push(relPath);
    }
  }
  return results;
}

function categorize(filePath) {
  if (filePath.startsWith("functions/")) {
    return "02_Backend_Cloud_Functions";
  }
  if (
    filePath === "package.json" ||
    filePath === "firebase.json" ||
    filePath === "jsconfig.json" ||
    filePath === "README.md" ||
    filePath === ".firebaserc" ||
    filePath === ".gitignore"
  ) {
    return "01_Configuration_and_Config";
  }
  if (
    filePath.startsWith("public/") ||
    filePath === "src/index.js" ||
    filePath === "src/App.js" ||
    filePath === "src/firebase.js" ||
    filePath === "src/setupProxy.js" ||
    filePath.startsWith("src/contexts/") ||
    filePath.startsWith("src/styles/") ||
    filePath.startsWith("src/utils/")
  ) {
    return "03_Frontend_Core_and_Config";
  }
  if (
    filePath.startsWith("src/layouts/") ||
    filePath.startsWith("src/routes/") ||
    filePath.startsWith("src/pages/")
  ) {
    return "04_Frontend_Routes_Pages_and_Layouts";
  }
  if (filePath.startsWith("src/sections/")) {
    return "05_Frontend_Sections";
  }
  if (filePath.startsWith("src/components/")) {
    return "06_Frontend_Components";
  }
  if (filePath.startsWith("src/helpers/") || filePath.startsWith("src/data/") || filePath.startsWith("src/assets/")) {
    return "07_Frontend_Data_and_Helpers";
  }
  return "08_Scripts_and_Tools";
}

const CATEGORY_NAMES = {
  "01_Configuration_and_Config": "1. Konfiguracja projektu i środowiska",
  "02_Backend_Cloud_Functions": "2. Backend – Firebase Cloud Functions & Automations",
  "03_Frontend_Core_and_Config": "3. Frontend – Rdzeń aplikacji React, Style & Konteksty",
  "04_Frontend_Routes_Pages_and_Layouts": "4. Frontend – Widoki, Podstrony (Routes), Strony miast i Układy",
  "05_Frontend_Sections": "5. Frontend – Sekcje strony głównej i landing page",
  "06_Frontend_Components": "6. Frontend – Komponenty interfejsu (UI Components)",
  "07_Frontend_Data_and_Helpers": "7. Frontend – Dane statyczne, Baza wpisów i Pomocniki (Helpers)",
  "08_Scripts_and_Tools": "8. Skrypty pomocnicze i Narzędzia"
};

function main() {
  console.log("Skanowanie plików projektu...");
  const allFiles = scanDir(ROOT_DIR);
  allFiles.sort();

  const categories = {};
  Object.keys(CATEGORY_NAMES).forEach(cat => {
    categories[cat] = [];
  });

  allFiles.forEach(f => {
    const cat = categorize(f);
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(f);
  });

  let totalLines = 0;
  let totalBytes = 0;
  const validFiles = [];

  allFiles.forEach(f => {
    if (OMIT_OR_SUMMARIZE_FILES[f]) return;
    try {
      const content = fs.readFileSync(path.join(ROOT_DIR, f), "utf8");
      totalLines += content.split("\n").length;
      totalBytes += Buffer.byteLength(content, "utf8");
      validFiles.push(f);
    } catch (e) {
      console.warn("Błąd odczytu pliku:", f, e.message);
    }
  });

  console.log(`Znaleziono ${allFiles.length} istotnych plików kodu (${totalLines} linii kodu, ${(totalBytes / 1024).toFixed(1)} KB tekstu).`);

  let out = "";
  out += `# Pełny Kod Projektu: Przeglądy Techniczne Budynków (przegladtechniczny)\n\n`;
  out += `> Wygenerowano: ${new Date().toISOString()}\n`;
  out += `> Łączna liczba plików kodu: **${allFiles.length}**\n`;
  out += `> Łączna liczba linii kodu: **${totalLines}**\n`;
  out += `> Przybliżony rozmiar tekstu źródłowego: **${(totalBytes / 1024).toFixed(1)} KB**\n\n`;

  out += `## Architektura i Stos Technologiczny\n\n`;
  out += `- **Frontend**: React 18, React Router v6, SCSS (Sass), Material-UI v6, Lucide React, Leaflet / MapLibre GL, Quill (Rich Text Editor)\n`;
  out += `- **Backend**: Firebase Cloud Functions (Node.js 20), Firestore, Firebase Authentication, Google Calendar API (OAuth2/Service Account), OpenAI API (gpt-4o/mini)\n`;
  out += `- **Automatyzacje**: Generator postów blogowych z AI (\`blogAutomator.js\`), Asystent umawiania wizyt ze skończonym automatem stanów (\`stateMachine.js\`, \`calendarManager.js\`), Integracja z mediami społecznościowymi (\`facebookService.js\`)\n`;
  out += `- **Pominięte pliki systemowe/binarne**: \`node_modules/\`, \`.git/\`, \`.firebase/\`, grafiki/video (\`*.png\`, \`*.jpg\`, \`*.mp4\`), fonty (\`*.ttf\`), logi kompilacji oraz ciężkie zbiory punktów poligonowych GeoJSON.\n\n`;

  out += `## Spis Treści (Struktura Plików)\n\n`;

  for (const [catKey, catName] of Object.entries(CATEGORY_NAMES)) {
    const filesInCat = categories[catKey] || [];
    if (filesInCat.length === 0) continue;
    out += `### ${catName}\n\n`;
    filesInCat.forEach(f => {
      const anchor = f.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
      out += `- [\`${f}\`](#file-${anchor})\n`;
    });
    out += `\n`;
  }

  out += `---\n\n`;
  out += `## Zawartość Plików Kodu Źródłowego\n\n`;

  for (const [catKey, catName] of Object.entries(CATEGORY_NAMES)) {
    const filesInCat = categories[catKey] || [];
    if (filesInCat.length === 0) continue;

    out += `\n# ================================================================================\n`;
    out += `# ${catName.toUpperCase()}\n`;
    out += `# ================================================================================\n\n`;

    for (const f of filesInCat) {
      const anchor = f.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
      out += `## File: \`${f}\` <a id="file-${anchor}"></a>\n\n`;

      if (OMIT_OR_SUMMARIZE_FILES[f]) {
        out += `> [!NOTE]\n> ${OMIT_OR_SUMMARIZE_FILES[f]}\n\n`;
        continue;
      }

      try {
        const content = fs.readFileSync(path.join(ROOT_DIR, f), "utf8");
        const ext = path.extname(f).toLowerCase();
        const lang = getLanguage(ext);
        const fenceOpen = getSafeFence(content, lang);
        const fenceClose = "`".repeat(fenceOpen.length - lang.length);

        out += `${fenceOpen}\n`;
        out += content;
        if (!content.endsWith("\n")) out += "\n";
        out += `${fenceClose}\n\n`;
      } catch (err) {
        out += `*Błąd odczytu pliku: ${err.message}*\n\n`;
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, out, "utf8");
  console.log(`Wygenerowano pomyślnie: ${OUTPUT_FILE}`);
  console.log(`Rozmiar wyjściowego pliku: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1)} KB`);
}

main();
```

## File: `scripts/generate-sitemap.js` <a id="file-scripts-generate-sitemap-js"></a>

```javascript
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://przeglady-domu.com';
const CITIES_DATA_PATH = path.join(__dirname, '../src/helpers/citiesData.js');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

// Static routes
const routes = [
  '/',
  '/przewodnik',
  '/przeglad-budowlany',
  '/przeglad-gazowy',
  '/przeglad-elektryczny',
  '/przeglad-wentylacyjny',
  '/blog',
  '/kontakt',
  '/cennik',
  '/form',
  '/regulamin',
  '/polityka-prywatnosci'
];

// Read citiesData.js and extract slugs
try {
  const fileContent = fs.readFileSync(CITIES_DATA_PATH, 'utf8');
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let match;
  
  while ((match = slugRegex.exec(fileContent)) !== null) {
    routes.push(`/przeglad-budowlany-${match[1]}`);
  }

  console.log(`Found ${routes.length} routes.`);

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemapContent);
  console.log(`Sitemap generated at ${SITEMAP_PATH}`);

} catch (err) {
  console.error('Error generating sitemap:', err);
}
```

