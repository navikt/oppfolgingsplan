export const finnArbeidsgivereForGyldigeSykmeldinger = (naermesteLedere) => {
    return naermesteLedere.map((leder) => {
        return {
            virksomhetsnummer: leder.orgnummer,
            navn: leder.organisasjonsnavn,
            harNaermesteLeder: true,
            naermesteLeder: leder,
        };
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

