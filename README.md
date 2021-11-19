# Oppfolgingsplan
Frontend for digitalisering av sykefraværsoppfølging (DigiSYFO)

## TL;DR
React-app for oppfølgingsplanen på Ditt Sykefravær.

## Kjøre lokalt
Applikasjonen har en mock som kan brukes lokalt. Her mockes diverse endepunkter, dog ikke alle. 

Du må ha Node installert.

* For å kjøre koden lokalt: 
    - `$ npm install`
    - `$ npm start`
    - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
    - Sjekk at appen kjører på http://localhost:8080/syk/oppfolgingsplan/oppfolgingsplaner
* Kjør tester med `npm test` eller `npm test:watch`
* Lint JS-kode med `npm run lint` eller `npm run lint:fix`

## Deploy mock app til Heroku
Installer heroku, på mac kan du bruke brew: `$ brew tap heroku/brew && brew install heroku`.

For å kunne deploye til Heroku må du først logge inn: 
* `$ heroku login`
* `$ heroku container:login` 

Deploy til heroku ved å kjøre deployscript: `$ sh deploy-heroku.sh`.
