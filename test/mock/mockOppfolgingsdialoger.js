import { leggTilDagerPaaDato } from '../testUtils';

export const getOppfolgingsdialoger = [
  {
    opprettetDato: '2017-06-12',
    sistEndretAv: {
      fnr: '1234567891000',
    },
    sistEndretDato: '2017-06-13',
    virksomhet: {
      navn: 'Fant ikke navn',
      virksomhetsnummer: '123456789',
    },
    id: 163,
    godkjentPlan: {
      gyldighetstidspunkt: {
        fom: '2017-01-03',
        tom: '2017-02-03',
      },
    },
    godkjenninger: [],
    avbruttPlanListe: [],
    status: 'UNDER_ARBEID',
    arbeidsoppgaveListe: [
      {
        arbeidsoppgaveId: 1084,
        arbeidsoppgavenavn: 'Arbeidsopgave1',
        delAvArbeidsuke: null,
        godkjentAvArbeidsgiver: false,
        godkjentAvArbeidstaker: false,
        erVurdertAvSykmeldt: true,
        gjennomfoering: {
          kanGjennomfoeres: 'TILRETTELEGGING',
          paaAnnetSted: true,
          medMerTid: true,
          medHjelp: true,
          kanBeskrivelse: 'Lorem ipsum',
          kanIkkeGjennomfoeresFoer: null,
          tilretteleggingArbeidsgiver: null,
          kanIkkeBeskrivelse: null,
        },
        opprettetDato: '2017-06-12',
        sistEndretAv: {
          fnr: '1234567891000',
        },
        sistEndretDato: '2017-06-13',
        opprettetAv: {
          navn: 'Test Testesen',
          fnr: '1234567891000',
          samtykke: null,
          godkjent: null,
        },
      },
      {
        arbeidsoppgaveId: 1090,
        arbeidsoppgavenavn: 'Arbeidsoppgave2',
        delAvArbeidsuke: null,
        godkjentAvArbeidsgiver: false,
        godkjentAvArbeidstaker: false,
        erVurdertAvSykmeldt: true,
        gjennomfoering: {
          kanGjennomfoeres: 'KAN',
          paaAnnetSted: null,
          medMerTid: null,
          medHjelp: null,
          kanBeskrivelse: null,
          kanIkkeGjennomfoeresFoer: null,
          tilretteleggingArbeidsgiver: null,
          kanIkkeBeskrivelse: null,
        },
        opprettetDato: '2017-06-12',
        sistEndretAv: {
          fnr: '1234567891000',
        },
        sistEndretDato: '2017-06-12',
        opprettetAv: {
          navn: 'Test Testesen',
          fnr: '1234567891000',
          samtykke: null,
          godkjent: null,
        },
      },
      {
        arbeidsoppgaveId: 1128,
        arbeidsoppgavenavn: 'Arbeidsoppgave3',
        delAvArbeidsuke: null,
        godkjentAvArbeidsgiver: false,
        godkjentAvArbeidstaker: false,
        erVurdertAvSykmeldt: true,
        gjennomfoering: {
          kanGjennomfoeres: 'TILRETTELEGGING',
          paaAnnetSted: true,
          medMerTid: true,
          medHjelp: true,
          kanBeskrivelse: 'Arbeidsoppgave3',
          kanIkkeGjennomfoeresFoer: null,
          tilretteleggingArbeidsgiver: null,
          kanIkkeBeskrivelse: null,
        },
        opprettetDato: '2017-06-13',
        sistEndretAv: {
          fnr: '1234567891000',
        },
        sistEndretDato: '2017-06-13',
        opprettetAv: {
          navn: 'Test Testesen',
          fnr: '1234567891000',
          samtykke: null,
          godkjent: null,
        },
      },
    ],
    tiltakListe: [],
    arbeidsgiver: {
      naermesteLeder: {
        navn: 'Test Testesen',
        fnr: '1234567891000',
        sistInnlogget: '2017-01-01T00:00:00.000',
        samtykke: null,
        godkjent: null,
        aktivFom: '2017-01-01T00:00:00.000',
      },
      forrigeNaermesteLeder: {},
    },
    arbeidstaker: {
      navn: 'Test Testesen',
      fnr: '1234567891000',
      sistInnlogget: '2017-01-01T00:00:00.000',
      samtykke: true,
      godkjent: null,
    },
  },
  {
    opprettetAv: {
      fnr: '1234567891000',
    },
    opprettetDato: '2017-06-12',
    sistEndretAv: {
      fnr: '1234567891000',
    },
    sistEndretDato: '2017-06-12',
    virksomhet: {
      navn: 'Fant ikke navn',
      virksomhetsnummer: '123456789',
    },
    id: 164,
    godkjentPlan: {
      gyldighetstidspunkt: {
        fom: '2017-01-03',
        tom: '2017-02-03',
      },
    },
    status: 'OPPRETTET',
    arbeidsoppgaveListe: [],
    godkjenninger: [],
    tiltakListe: [],
    avbruttPlanListe: [],
    arbeidsgiver: {
      naermesteLeder: {
        navn: 'Test Testesen',
        fnr: '1234567891000',
        sistInnlogget: '2017-01-01T00:00:00.000',
        samtykke: null,
        godkjent: null,
        aktivFom: '2017-01-01T00:00:00.000',
      },
      forrigeNaermesteLeder: null,
    },
    arbeidstaker: {
      navn: 'Test Testesen',
      fnr: '1234567891000',
      sistInnlogget: '2017-01-01T00:00:00.000',
      samtykke: null,
      godkjent: null,
    },
  },
  {
    opprettetAv: {
      fnr: '1234567891000',
    },
    opprettetDato: '2017-06-12',
    sistEndretAv: {
      fnr: '1234567891000',
    },
    sistEndretDato: '2017-06-12',
    virksomhet: {
      navn: 'Fant ikke navn',
      virksomhetsnummer: '123456789',
    },
    id: 162,
    godkjentPlan: {
      gyldighetstidspunkt: {
        fom: '2017-01-03',
        tom: '2017-02-03',
      },
    },
    godkjenninger: [],
    avbruttPlanListe: [],
    status: 'UNDER_ARBEID',
    arbeidsoppgaveListe: [],
    tiltakListe: [],
    arbeidsgiver: {
      naermesteLeder: {
        navn: 'Test Testesen',
        fnr: '1234567891000',
        sistInnlogget: '2017-01-01T00:00:00.000',
        samtykke: null,
        godkjent: null,
        aktivFom: '2017-01-01T00:00:00.000',
      },
      forrigeNaermesteLeder: null,
    },
    arbeidstaker: {
      navn: 'Test Testesen',
      fnr: '1234567891000',
      sistInnlogget: '2017-01-01T00:00:00.000',
      samtykke: null,
      godkjent: null,
    },
  },
];

const oppfolgingsdialog = {
  opprettetAv: {
    fnr: '1234567891000',
  },
  opprettetDato: '2017-06-12',
  sistEndretAv: {
    fnr: '1234567891000',
  },
  sistEndretDato: '2017-06-13',
  virksomhet: {
    navn: 'Fant ikke navn',
    virksomhetsnummer: '123456781',
  },
  id: 163,
  godkjentPlan: {
    gyldighetstidspunkt: {
      fom: '2017-01-03',
      tom: '2017-02-03',
    },
  },
  godkjenninger: [],
  avbruttPlanListe: [],
  status: 'UNDER_ARBEID',
  arbeidsoppgaveListe: [
    {
      arbeidsoppgaveId: 1458,
      arbeidsoppgavenavn: 'Arbeidsoppave',
      delAvArbeidsuke: null,
      godkjentAvArbeidsgiver: false,
      godkjentAvArbeidstaker: false,
      erVurdertAvSykmeldt: true,
      gjennomfoering: {
        kanGjennomfoeres: 'KAN',
        paaAnnetSted: null,
        medMerTid: null,
        medHjelp: null,
        kanBeskrivelse: null,
        kanIkkeGjennomfoeresFoer: null,
        tilretteleggingArbeidsgiver: null,
        kanIkkeBeskrivelse: null,
      },
      opprettetDato: '2017-06-21',
      sistEndretAv: {
        fnr: '1234567891000',
      },
      sistEndretDato: '2017-06-21',
      opprettetAv: {
        navn: 'Test Testesen',
        fnr: '1234567891000',
        samtykke: null,
        godkjent: null,
      },
    },
  ],
  tiltakListe: [
    {
      tiltakId: 1461,
      tiltaknavn: 'Tiltak',
      knyttetTilArbeidsoppgaveId: null,
      fom: null,
      tom: null,
      beskrivelse: 'Dette er et tiltak',
      ansvarlig: null,
      maal: null,
      godkjentAvArbeidsgiver: false,
      godkjentAvArbeidstaker: false,
      opprettetDato: '2017-06-21',
      sistEndretAv: {
        fnr: '1234567891000',
      },
      sistEndretDato: '2017-06-21',
      opprettetAv: {
        navn: 'Test Testesen',
        fnr: '1234567891000',
        samtykke: null,
        godkjent: null,
      },
    },
  ],
  arbeidsgiver: {
    naermesteLeder: {
      navn: 'Test Testesen',
      fnr: '1234567891000',
      samtykke: null,
      sistInnlogget: '2017-01-01T00:00:00.000',
      godkjent: null,
      aktivFom: '2017-01-01T00:00:00.000',
    },
    forrigeNaermesteLeder: {},
  },
  arbeidstaker: {
    navn: 'Test Testesen',
    fnr: '1234567891000',
    sistInnlogget: '2017-01-01T00:00:00.000',
    samtykke: true,
    godkjent: null,
  },
};

export const hentOppfolgingsdialogTidligere = (dagensDato) => {
  return Object.assign({}, oppfolgingsdialog, {
    godkjentPlan: {
      gyldighetstidspunkt: {
        fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
        tom: leggTilDagerPaaDato(dagensDato, -1).toISOString(),
      },
    },
    naermesteLeder: {
      navn: 'Test Testesen',
      fnr: '1234567891000',
      samtykke: null,
      sistInnlogget: leggTilDagerPaaDato(dagensDato, -1).toISOString(),
      godkjent: null,
      aktivFom: leggTilDagerPaaDato(dagensDato, -10).toISOString(),
    },
  });
};

export const hentOppfolgingsdialogAktiv = (dagensDato) => {
  return Object.assign({}, hentOppfolgingsdialogTidligere(dagensDato), {
    godkjentPlan: null,
  });
};

const getOppfolgingsdialog = (id = {}) => {
  return Object.assign({}, oppfolgingsdialog, id);
};

export default getOppfolgingsdialog;
