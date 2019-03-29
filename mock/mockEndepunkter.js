const path = require('path');
const fs = require('fs');
const request = require('request');
const express = require('express');

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const mockData = {};
const ARBEIDSGIVERS_SYKMELDINGER = 'arbeidsgiversSykmeldinger';
const NY_SOKNAD_UTLAND = 'nySoknadUtland';
const ARBEIDSGIVERE = 'arbeidsgivere';
const METADATA = 'metadata';
const NAERMESTELEDERE = 'naermesteledere';
const FORRIGE_LEDER = 'forrigeLeder';
const OPPFOELGINGSDIALOGER = 'oppfoelgingsdialoger';
const SOKNADER = 'soknader';
const SYFOUNLEASH = 'syfounleash';
const SYKEFORLOEAP = 'sykeforloep';
const SYKEPENGESOKNADER = 'sykepengesoknader';
const SYKMELDINGER = 'sykmeldinger';
const TEKSTER = 'tekster';
const VARSLER = 'varsler';
const VEDLIKEHOLD = 'vedlikehold';
const TILGANG = 'tilgang';
const TOGGLES = 'toggles';
const ARBEIDSFORHOLD = 'arbeidsforhold';
const KONTAKTINFO = 'kontaktinfo';
const NAERMESTELEDER = 'naermesteleder';
const PERIODER = 'perioder';
const PERSON = 'person';
const PERSONVIRKSOMHETSNUMMER = 'personVirksomhetsnummer';
const VIRKSOMHET = 'virksomhet';
const SISTE = 'siste';

const lastFilTilMinne = (filnavn) => {
    fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
        if (err) throw err;
        mockData[filnavn] = JSON.parse(data.toString());
    });
};

lastFilTilMinne(ARBEIDSGIVERS_SYKMELDINGER);
lastFilTilMinne(NY_SOKNAD_UTLAND);
lastFilTilMinne(ARBEIDSGIVERE);
lastFilTilMinne(METADATA);
lastFilTilMinne(NAERMESTELEDERE);
lastFilTilMinne(OPPFOELGINGSDIALOGER);
lastFilTilMinne(SOKNADER);
lastFilTilMinne(SYFOUNLEASH);
lastFilTilMinne(SYKEFORLOEAP);
lastFilTilMinne(SYKEPENGESOKNADER);
lastFilTilMinne(SYKMELDINGER);
lastFilTilMinne(TEKSTER);
lastFilTilMinne(VARSLER);
lastFilTilMinne(VEDLIKEHOLD);
lastFilTilMinne(TILGANG);
lastFilTilMinne(TOGGLES);
lastFilTilMinne(ARBEIDSFORHOLD);
lastFilTilMinne(KONTAKTINFO);
lastFilTilMinne(NAERMESTELEDER);
lastFilTilMinne(PERIODER);
lastFilTilMinne(PERSON);
lastFilTilMinne(PERSONVIRKSOMHETSNUMMER);
lastFilTilMinne(VIRKSOMHET);
lastFilTilMinne(FORRIGE_LEDER);
lastFilTilMinne(SISTE);

let teksterFraProd;

function hentTeksterFraProd() {
    const TEKSTER_URL = 'https://syfoapi.nav.no/syfotekster/api/tekster';
    request(TEKSTER_URL, function (error, response, body) {
        if (error) {
            console.log('Kunne ikke hente tekster fra prod', error);
        } else {
            teksterFraProd = JSON.parse(body);
            console.log('Tekster hentet fra prod');
        }
    });
}

function mockTekster(server) {
    const HVERT_FEMTE_MINUTT = 1000 * 60 * 5;
    hentTeksterFraProd();
    setInterval(hentTeksterFraProd, HVERT_FEMTE_MINUTT);

    server.get('/syfotekster/api/tekster', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(teksterFraProd || mockData[TEKSTER]));
    });
}

function mockOpprettetIdResultat(res) {
    mockOpprettetIdResultat.rollingCounter += 1;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockOpprettetIdResultat.rollingCounter));
}
mockOpprettetIdResultat.rollingCounter = 100;

function mockForLokaltMiljo(server) {
    server.use(express.json());
    server.use(express.urlencoded());

    server.post('/restoppfoelgingsdialog/api/tiltak/actions/:response/lagreKommentar', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/restoppfoelgingsdialog/api/kommentar/actions/:response/slett', (req, res) => {
        res.send();
    });

    server.post('/syfooppfolgingsplanservice/api/arbeidsoppgave/actions/:id/slett', (req, res) => {
        res.send();
    });

    server.post('/syfooppfolgingsplanservice/api/tiltak/actions/:id/slett', (req, res) => {
        res.send();
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/lagreArbeidsoppgave', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/lagreTiltak', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/godkjenn', (req, res) => {
        res.send({
            fom: req.body.fom,
            tom: req.body.tom,
            evalueres: req.body.evalueres,
        });
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/samtykke', (req, res) => {
        res.send();
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/nullstillGodkjenning', (req, res) => {
        res.send();
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/forespoerRevidering', (req, res) => {
        res.send();
    });
}

function mockForOpplaeringsmiljo(server) {
    mockTekster(server);

    server.use(express.json());
    server.use(express.urlencoded());

    server.get('/syforest/sykmeldinger?type=arbeidsgiver', (req, res) => {
        res.send(JSON.stringify(mockData[ARBEIDSGIVERS_SYKMELDINGER]));
    });

    server.get('/syforest/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SYKMELDINGER]));
    });

    server.post('/syforest/sykmeldinger/:id/actions/erUtenforVentetid', (req, res) => {
        res.send(JSON.stringify({
            erUtenforVentetid: false,
        }));
    });

    server.get('/syforest/naermesteledere', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[NAERMESTELEDERE]));
    });

    server.get('/restoppfoelgingsdialog/api/sykmeldt/oppfoelgingsdialoger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[OPPFOELGINGSDIALOGER]));
    });

    server.get('/restoppfoelgingsdialog/api/tilgang', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[TILGANG]));
    });

    server.get('/restoppfoelgingsdialog/api/virksomhet/:virksomhetsnummer', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[VIRKSOMHET]));
    });

    server.get('/restoppfoelgingsdialog/api/naermesteleder/:fnr/forrige', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[FORRIGE_LEDER]));
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/sett', (req, res) => {
        res.send();
    });

    server.get('/restoppfoelgingsdialog/api/arbeidsforhold', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[ARBEIDSFORHOLD]));
    });


    server.get('/restoppfoelgingsdialog/api/person/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSON]));
    });

    server.get('/restoppfoelgingsdialog/api/kontaktinfo/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[KONTAKTINFO]));
    });

    server.get('/restoppfoelgingsdialog/api/naermesteleder/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[NAERMESTELEDER]));
    });

    server.get('/restoppfoelgingsdialog/api/person/:fnr?virksomhetsnummer=:vnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSONVIRKSOMHETSNUMMER]));
    });

    server.get('/syforest/sykeforloep/siste/perioder', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERIODER]));
    });

    server.get('/syforest/sykeforloep', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SYKEFORLOEAP]));
    });

    server.get('/syforest/sykeforloep/metadata', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[METADATA]));
    });

    server.post('/syforest/logging', (req, res) => {
        console.log(req.body);
        res.send(JSON.stringify({}));
    });

    server.get('/syforest/informasjon/hendelser', (req, res) => {
        res.send(JSON.stringify([]));
    });

    server.get('/syforest/informasjon/arbeidsgivere', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[ARBEIDSGIVERE]));
    });

    server.get('/syforest/informasjon/vedlikehold', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[VEDLIKEHOLD]));
    });

    server.get('/syforest/informasjon/bruker', (req, res) => {
        res.send(JSON.stringify({
            strengtFortroligAdresse: false,
        }));
    });

    server.get('/syforest/informasjon/toggles', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[TOGGLES]));
    });

    server.get('/esso/logout', (req, res) => {
        res.send('<p>Du har blitt sendt til utlogging.</p><p><a href="/sykefravaer">Gå til Ditt sykefravær</a></p>');
    });

    server.get('/dittnav', (req, res) => {
        res.send('<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Ditt sykefravær.</p><p><a href="/sykefravaer">Gå til Ditt sykefravær</a></p>');
    });
}

function mockUnleashOpplaeringsmiljo(server) {
    server.post('/syfounleash/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SYFOUNLEASH]));
    });
}

function mockUnleashLokal(server) {
    server.post('/syfounleash/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const toggles = req.body.reduce((acc, cur) => {
            return Object.assign({}, acc, {
                [cur]: true,
            });
        }, {});
        res.send(JSON.stringify(toggles));
    });
}

module.exports = {
    mockForLokaltMiljo,
    mockForOpplaeringsmiljo,
    mockUnleashOpplaeringsmiljo,
    mockUnleashLokal,
};
