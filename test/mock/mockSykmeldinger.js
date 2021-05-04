import { MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING } from '../../js/konstanter';

const MILLISEKUNDER_PER_DAG = 86400000;

export const leggTilDagerPaaDato = (dato, dager) => {
  const nyDato = new Date(dato);
  nyDato.setTime(nyDato.getTime() + dager * MILLISEKUNDER_PER_DAG);
  return new Date(nyDato);
};

export const leggTilMnderPaaDato = (dato, mnder) => {
  const nyDato = new Date(dato);
  nyDato.setMonth(nyDato.getMonth() + mnder);
  return new Date(nyDato);
};

export const leggTilMnderOgDagerPaaDato = (dato, mnder, dager) => {
  let nyDato = leggTilMnderPaaDato(dato, mnder);
  nyDato = leggTilDagerPaaDato(nyDato, dager);
  return new Date(nyDato);
};

/* eslint-disable max-len */

export const getArbeidsgivere = [
  {
    virksomhetsnummer: '123456788',
    navn: 'Hogwarts School of Witchcraft and Wizardry',
    harNaermesteLeder: false,
  },
  {
    virksomhetsnummer: '123456789',
    navn: 'Skogen Barnehave',
    harNaermesteLeder: true,
  },
];

const arbeidsgiver = {
  virksomhetsnummer: '123456789',
  navn: 'Hogwarts School of Witchcraft and Wizardry',
  harNaermesteLeder: false,
};

export const getArbeidsgiver = (ag) => {
  return Object.assign({}, arbeidsgiver, ag);
};

export const getSykmeldinger = [
  {
    id: 'b341e1af-6a0d-4740-b8d9-eb3c5551fbc2',
    fnr: '12345678910',
    sykmeldingsperioder: [
      {
        fom: new Date('2017-04-15'),
        tom: new Date('2017-04-25'),
      },
    ],
    organisasjonsinformasjon: {
      orgnummer: '123456781',
      orgNavn: 'Hogwarts School of Witchcraft and Wizardry',
    },
  },
  {
    id: '31ac2ac8-aa31-4f5f-8bda-fd199aa7d8f4',
    fnr: '12345678910',
    sykmeldingsperioder: [
      {
        fom: new Date('2017-04-15'),
        tom: new Date('2017-04-25'),
      },
    ],
    organisasjonsinformasjon: {
      orgnummer: '123456789',
      orgNavn: 'Skogen Barnehave',
    },
  },
];

const sykmelding = {
  id: '3456789',
  fnr: '12345678910',
  sykmeldingsperioder: [
    {
      fom: new Date('2015-12-31'),
      tom: new Date('2016-01-06'),
    },
  ],
  organisasjonsinformasjon: {
    orgnummer: '123456781',
    orgNavn: 'Selskapet AS',
  },
};

const getSykmelding = (skmld = {}) => {
  return Object.assign({}, sykmelding, skmld);
};

export const hentSykmeldingIkkeGyldigForOppfoelging = (dagensDato) => {
  return getSykmelding({
    sykmeldingsperioder: [
      {
        fom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 3)).toISOString(),
        tom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2)).toISOString(),
      },
      {
        fom: leggTilMnderPaaDato(dagensDato, -(MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1)).toISOString(),
        tom: leggTilMnderOgDagerPaaDato(dagensDato, -MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, -1).toISOString(),
      },
    ],
  });
};

export const hentSykmeldingGyldigForOppfoelging = (dagensDato) => {
  return getSykmelding({
    sykmeldingsperioder: [
      {
        fom: leggTilDagerPaaDato(dagensDato, -35).toISOString(),
        tom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
      },
      {
        fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
        tom: leggTilDagerPaaDato(dagensDato, 35).toISOString(),
      },
    ],
  });
};

export default getSykmelding;
/* eslint-disable max-len */
