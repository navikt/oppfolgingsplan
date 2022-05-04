export const getLedere = [
  {
    navn: 'Navn-Navnolini Navnesen',
    epost: 'epost@epost.no',
    mobil: '99988777',
    virksomhetsnummer: '123456789',
    organisasjonsnavn: 'Arbeidsgiver AS',
    erAktiv: true,
    aktivTom: null,
  },
  {
    navn: 'Navn Navnesen',
    epost: 'epost@epost.no',
    mobil: '99988777',
    virksomhetsnummer: '123456788',
    organisasjonsnavn: 'Arbeidsgiver',
    erAktiv: true,
    aktivTom: null,
  },
];

const naermesteLeder = {
  navn: 'Navn-Navnolini Navnesen',
  epost: 'epost@epost.no',
  mobil: '99988777',
  virksomhetsnummer: '123456789',
  organisasjonsnavn: 'Arbeidsgiver AS',
  aktivTom: null,
};

const getLeder = (leder = {}) => {
  return Object.assign({}, naermesteLeder, leder);
};

export default getLeder;
