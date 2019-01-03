export const sykmeldtHarNaermestelederHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
    return naermesteLedere.filter((leder) => {
        return virksomhetsnummer === leder.orgnummer;
    }).length > 0;
};

export const finnSykmeldtSinNaermestelederNavnHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
    const naermesteLeder = naermesteLedere.filter((leder) => {
        return virksomhetsnummer === leder.orgnummer;
    })[0];
    return naermesteLeder ? naermesteLeder.navn : undefined;
};

export const sykmeldtHarInnsendtSykmelding = (sykmeldinger) => {
    return sykmeldinger.filter((sykmelding) => {
        return sykmelding.orgnummer && sykmelding.orgnummer !== null;
    }).length > 0;
};

export const finnArbeidsgivereForGyldigeSykmeldinger = (sykmeldinger, naermesteLedere) => {
    return sykmeldinger.map((sykmelding) => {
        return {
            virksomhetsnummer: sykmelding.orgnummer,
            navn: sykmelding.arbeidsgiver,
            harNaermesteLeder: sykmeldtHarNaermestelederHosArbeidsgiver(sykmelding.orgnummer, naermesteLedere),
            naermesteLeder: finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(sykmelding.orgnummer, naermesteLedere),
        };
    }).filter((sykmelding, idx, self) => {
        return self.findIndex((t) => {
            return t.virksomhetsnummer === sykmelding.virksomhetsnummer && sykmelding.virksomhetsnummer !== null;
        }) === idx;
    });
};

export const sykmeldtHarManglendeNaermesteLeder = (arbeidsgivere) => {
    return arbeidsgivere.filter((arbeidsgiver) => {
        return !arbeidsgiver.harNaermesteLeder;
    }).length > 0;
};

export const sykmeldtHarNaermestelederHosArbeidsgivere = (arbeidsgivere) => {
    return arbeidsgivere.filter((arbeidsgiver) => {
        return arbeidsgiver.harNaermesteLeder;
    }).length > 0;
};

