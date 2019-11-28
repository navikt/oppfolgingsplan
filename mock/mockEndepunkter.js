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
const ARBEIDSGIVERE = 'arbeidsgivere';
const METADATA = 'metadata';
const NAERMESTELEDERE = 'naermesteledere';
const FORRIGE_LEDER = 'forrigeLeder';
const OPPFOELGINGSDIALOGER = 'oppfoelgingsdialoger';
const SOKNADER = 'soknader';
const SYFOUNLEASH = 'syfounleash';
const SYKEFORLOEAP = 'sykeforloep';
const SYKMELDINGER = 'sykmeldinger';
const VARSLER = 'varsler';
const VEDLIKEHOLD = 'vedlikehold';
const TILGANG = 'tilgang';
const ARBEIDSFORHOLD = 'arbeidsforhold';
const KONTAKTINFO = 'kontaktinfo';
const NAERMESTELEDER = 'naermesteleder';
const PERIODER = 'perioder';
const PERSON = 'person';
const VIRKSOMHET = 'virksomhet';
const SISTE = 'siste';

const lastFilTilMinne = (filnavn) => {
    fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
        if (err) throw err;
        mockData[filnavn] = JSON.parse(data.toString());
    });
};

lastFilTilMinne(ARBEIDSGIVERS_SYKMELDINGER);
lastFilTilMinne(ARBEIDSGIVERE);
lastFilTilMinne(METADATA);
lastFilTilMinne(NAERMESTELEDERE);
lastFilTilMinne(OPPFOELGINGSDIALOGER);
lastFilTilMinne(SOKNADER);
lastFilTilMinne(SYFOUNLEASH);
lastFilTilMinne(SYKEFORLOEAP);
lastFilTilMinne(SYKMELDINGER);
lastFilTilMinne(VARSLER);
lastFilTilMinne(VEDLIKEHOLD);
lastFilTilMinne(TILGANG);
lastFilTilMinne(ARBEIDSFORHOLD);
lastFilTilMinne(KONTAKTINFO);
lastFilTilMinne(NAERMESTELEDER);
lastFilTilMinne(PERIODER);
lastFilTilMinne(PERSON);
lastFilTilMinne(VIRKSOMHET);
lastFilTilMinne(FORRIGE_LEDER);
lastFilTilMinne(SISTE);

const MILLISEKUNDER_PER_DAG = 86400000;
const leggTilDagerPaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

const SYKMELDING_TYPE = {
    SYKMELDING_INAKTIV: {
        fomUke: -20,
        tomUke: -18,
    },
    SYKMELDING_AKTIV: {
        fomUke: -16,
        tomUke: 2,
    },
};

const getSykmeldinger = (type) => {
    const today = new Date();
    const sykmeldinger = mockData[SYKMELDINGER];
    const sykmelding = sykmeldinger[0];
    return [
        {
            ...sykmelding,
            mulighetForArbeid: {
                ...sykmelding.mulighetForArbeid,
                perioder: [{
                    ...sykmelding.mulighetForArbeid.perioder[0],
                    fom: leggTilDagerPaDato(today, (type.fomUke * 7)).toJSON(),
                    tom: leggTilDagerPaDato(today, (type.tomUke * 7)).toJSON(),
                }],
            },
        },
    ];
};

function mockOpprettetIdResultat(res) {
    mockOpprettetIdResultat.rollingCounter += 1;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockOpprettetIdResultat.rollingCounter));
}
mockOpprettetIdResultat.rollingCounter = 100;

function mockForLokaltMiljo(server) {
    server.use(express.json());
    server.use(express.urlencoded());

    server.post('/syfooppfolgingsplanservice/api/tiltak/actions/:response/lagreKommentar', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/syfooppfolgingsplanservice/api/kommentar/actions/:response/slett', (req, res) => {
        res.send();
    });

    server.post('/syfooppfolgingsplanservice/api/arbeidsoppgave/actions/:id/slett', (req, res) => {
        res.send();
    });

    server.post('/syfooppfolgingsplanservice/api/tiltak/actions/:id/slett', (req, res) => {
        res.send();
    });

    server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/lagreArbeidsoppgave', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/lagreTiltak', (req, res) => {
        mockOpprettetIdResultat(res);
    });

    server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/godkjenn', (req, res) => {
        res.send({
            fom: req.body.fom,
            tom: req.body.tom,
            evalueres: req.body.evalueres,
        });
    });

    server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/samtykk', (req, res) => {
        res.send();
    });

    server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/nullstillGodkjenning', (req, res) => {
        res.send();
    });

    server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/foresporRevidering', (req, res) => {
        res.send();
    });
}

function mockForOpplaeringsmiljo(server) {
    server.use(express.json());
    server.use(express.urlencoded());

    server.get('/syforest/sykmeldinger?type=arbeidsgiver', (req, res) => {
        res.send(JSON.stringify(mockData[ARBEIDSGIVERS_SYKMELDINGER]));
    });

    server.get('/syforest/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(getSykmeldinger(SYKMELDING_TYPE.SYKMELDING_AKTIV)));
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

    server.get('/syfooppfolgingsplanservice/api/arbeidstaker/oppfolgingsplaner', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[OPPFOELGINGSDIALOGER]));
    });

    server.get('/syfooppfolgingsplanservice/api/tilgang', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[TILGANG]));
    });

    server.get('/syfooprest/api/virksomhet/:virksomhetsnummer', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[VIRKSOMHET]));
    });

    server.get('/syfooprest/api/naermesteleder/:fnr/forrige', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[FORRIGE_LEDER]));
    });

    server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/sett', (req, res) => {
        res.send();
    });

    server.get('/syfooprest/api/arbeidsforhold', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[ARBEIDSFORHOLD]));
    });


    server.get('/syfooprest/api/person/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSON]));
    });

    server.get('/syfooprest/api/kontaktinfo/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[KONTAKTINFO]));
    });

    server.get('/syfooprest/api/naermesteleder/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[NAERMESTELEDER]));
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
