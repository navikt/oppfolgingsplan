import { erSykmeldingGyldigForOppfolgingMedGrensedato } from './oppfolgingsdialogUtils';

export const sykmeldtHarNaermestelederHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
  return (
    naermesteLedere.filter((leder) => {
      return virksomhetsnummer === leder.virksomhetsnummer;
    }).length > 0
  );
};

export const finnSykmeldtSinNaermestelederNavnHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
  const naermesteLeder = naermesteLedere.filter((leder) => {
    return virksomhetsnummer === leder.virksomhetsnummer;
  })[0];
  return naermesteLeder ? naermesteLeder.navn : undefined;
};

export const sykmeldtHarIngenSykmeldinger = (sykmeldinger) => {
  return sykmeldinger.length === 0;
};

export const sykmeldtHarGyldigSykmelding = (sykmeldinger) => {
  const tomGrenseDato = new Date();
  if (sykmeldinger.length > 0) {
    return (
      sykmeldinger
        .filter((sykmelding) => {
          return sykmelding.orgnummer && sykmelding.orgnummer !== null;
        })
        .filter((sykmelding) => {
          return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, tomGrenseDato);
        }).length > 0
    );
  }
  return sykmeldtHarIngenSykmeldinger(sykmeldinger);
};

export const finnArbeidsgivereForGyldigeSykmeldinger = (sykmeldinger, naermesteLedere) => {
  const dagensDato = new Date();
  return sykmeldinger
    .filter((sykmelding) => {
      return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato);
    })
    .map((sykmelding) => {
      return {
        virksomhetsnummer: sykmelding.orgnummer,
        navn: sykmelding.arbeidsgiver,
        harNaermesteLeder: sykmeldtHarNaermestelederHosArbeidsgiver(sykmelding.orgnummer, naermesteLedere),
        naermesteLeder: finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(sykmelding.orgnummer, naermesteLedere),
      };
    })
    .filter((sykmelding, idx, self) => {
      return (
        self.findIndex((t) => {
          return t.virksomhetsnummer === sykmelding.virksomhetsnummer && sykmelding.virksomhetsnummer !== null;
        }) === idx
      );
    });
};

export const skalViseOppfoelgingsdialogLenke = (sykmeldinger, oppfolgingsdialoger) => {
  return sykmeldtHarGyldigSykmelding(sykmeldinger) || oppfolgingsdialoger.data.length > 0;
};

export const sykmeldtHarManglendeNaermesteLeder = (arbeidsgivere) => {
  return (
    arbeidsgivere.filter((arbeidsgiver) => {
      return !arbeidsgiver.harNaermesteLeder;
    }).length > 0
  );
};

export const sykmeldtHarNaermestelederHosArbeidsgivere = (arbeidsgivere) => {
  return (
    arbeidsgivere.filter((arbeidsgiver) => {
      return arbeidsgiver.harNaermesteLeder;
    }).length > 0
  );
};
