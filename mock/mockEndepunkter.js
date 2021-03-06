const path = require('path');
const fs = require('fs');
const express = require('express');

const mockOppfolgingsplan = require('./oppfolgingsplan/mockOppfolgingsplan');
const dateUtil = require('./util/dateUtil');

const mockData = {};
const ARBEIDSGIVERE = 'arbeidsgivere';
const METADATA = 'metadata';
const NAERMESTELEDERE = 'naermesteledere';
const SYFOUNLEASH = 'syfounleash';
const SYKMELDINGER = 'sykmeldinger';
const VEDLIKEHOLD = 'vedlikehold';
const TILGANG = 'tilgang';
const ARBEIDSFORHOLD = 'arbeidsforhold';
const KONTAKTINFO = 'kontaktinfo';
const NAERMESTELEDER = 'naermesteleder';
const PERSON = 'person';
const VIRKSOMHET = 'virksomhet';

const lastFilTilMinne = (filnavn) => {
  fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
    if (err) throw err;
    mockData[filnavn] = JSON.parse(data.toString());
  });
};

lastFilTilMinne(ARBEIDSGIVERE);
lastFilTilMinne(METADATA);
lastFilTilMinne(NAERMESTELEDERE);
lastFilTilMinne(SYFOUNLEASH);
lastFilTilMinne(SYKMELDINGER);
lastFilTilMinne(VEDLIKEHOLD);
lastFilTilMinne(TILGANG);
lastFilTilMinne(ARBEIDSFORHOLD);
lastFilTilMinne(KONTAKTINFO);
lastFilTilMinne(NAERMESTELEDER);
lastFilTilMinne(PERSON);
lastFilTilMinne(VIRKSOMHET);

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
      sykmeldingsperioder: [
        ...sykmelding.sykmeldingsperioder,
        {
          ...sykmelding.sykmeldingsperioder[0],
          fom: dateUtil.leggTilDagerPaDato(today, type.fomUke * 7).toJSON(),
          tom: dateUtil.leggTilDagerPaDato(today, type.tomUke * 7).toJSON(),
        },
      ],
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

  server.post('/syfooppfolgingsplanservice/api/oppfolgingsplan/actions/:id/avvis', (req, res) => {
    res.send();
  });
}

function mockForOpplaeringsmiljo(server) {
  server.use(express.json());
  server.use(express.urlencoded());

  server.get('/syfooppfolgingsplanservice/api/arbeidstaker/sykmeldinger', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getSykmeldinger(SYKMELDING_TYPE.SYKMELDING_AKTIV)));
  });

  server.get('/syfooprest/api/narmesteledere/:fodselsnummer', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[NAERMESTELEDERE]));
  });

  server.get('/syfooppfolgingsplanservice/api/arbeidstaker/oppfolgingsplaner', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(mockOppfolgingsplan.getOppfolgingsplaner(mockOppfolgingsplan.TYPE_DEFAULT));
  });

  //TODO: Ser ut som om vi mangler mock for oppretting av OP: POST mot '/syfooppfolgingsplanservice/api/arbeidstaker/oppfolgingsplaner'

  server.get('/syfooppfolgingsplanservice/api/tilgang', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[TILGANG]));
  });

  server.get('/syfooprest/api/virksomhet/:virksomhetsnummer', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[VIRKSOMHET]));
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

  server.get('/esso/logout', (req, res) => {
    // noinspection HtmlUnknownTarget
    res.send('<p>Du har blitt sendt til utlogging.</p><p><a href="/sykefravaer">Gå til Ditt sykefravær</a></p>');
  });

  server.get('/dittnav', (req, res) => {
    // noinspection HtmlUnknownTarget
    res.send(
      '<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Ditt sykefravær.</p><p><a href="/sykefravaer">Gå til Ditt sykefravær</a></p>'
    );
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
