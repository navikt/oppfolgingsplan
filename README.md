# Oppfolgingsplan
Frontend for digitalisering av sykefraværsoppfølging (DigiSYFO) http://tjenester.nav.no/oppfolgingsplan/oppfolgingsplaner

## TL;DR
React-app for oppfølgingsplanen på Ditt Sykefravær.

## Kjøre lokalt
Applikasjonen har en mock som kan brukes lokalt. Her mockes diverse endepunkter, dog ikke alle. 

Du må ha Node installert.

* For å kjøre koden lokalt: 
    - `$ npm install`
    - `$ npm run dev`
    - I et annet vindu `$ npm run start-local`
    - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
    - Sjekk at appen kjører på http://localhost:8081/oppfolgingsplan/oppfolgingsplaner
* Kjør tester med `npm test` eller `npm test:watch`
* Lint JS-kode med `npm run lint` eller `npm run lint:fix`

## Deploy mock app til Heroku
Installer heroku, på mac kan du bruke brew: `$ brew tap heroku/brew && brew install heroku`.

For å kunne deploye til Heroku må du først logge inn: 
* `$ heroku login`
* `$ heroku container:login` 

Deploy til heroku ved å kjøre deployscript: `$ sh deploy-heroku.sh`.
