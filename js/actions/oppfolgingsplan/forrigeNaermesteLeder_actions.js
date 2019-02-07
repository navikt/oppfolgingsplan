export const HENT_FORRIGE_NAERMESTELEDER_FORESPURT = 'HENT_FORRIGE_NAERMESTELEDER_FORESPURT';
export const HENTER_FORRIGE_NAERMESTELEDER = 'HENTER_FORRIGE_NAERMESTELEDER';
export const FORRIGE_NAERMESTELEDER_HENTET = 'FORRIGE_NAERMESTELEDER_HENTET';
export const HENT_FORRIGE_NAERMESTELEDER_FEILET = 'HENT_FORRIGE_NAERMESTELEDER_FEILET';
export const INGEN_FORRIGE_NAERMESTELEDER = 'INGEN_FORRIGE_NAERMESTELEDER';

export const hentForrigeNaermesteLeder = (fnr, virksomhetsnummer) => {
    return {
        type: HENT_FORRIGE_NAERMESTELEDER_FORESPURT,
        fnr,
        virksomhetsnummer,
    };
};

export const henterForrigeNaermesteLeder = (fnr, virksomhetsnummer) => {
    return {
        type: HENTER_FORRIGE_NAERMESTELEDER,
        fnr,
        virksomhetsnummer,
    };
};

export const forrigeNaermesteLederHentet = (forrigeNaermesteLeder, fnr, virksomhetsnummer) => {
    return {
        type: FORRIGE_NAERMESTELEDER_HENTET,
        forrigeNaermesteLeder,
        fnr,
        virksomhetsnummer,
    };
};

export const hentForrigeNaermesteLederFeilet = (fnr, virksomhetsnummer) => {
    return {
        type: HENT_FORRIGE_NAERMESTELEDER_FEILET,
        fnr,
        virksomhetsnummer,
    };
};

export const ingenForrigeNaermesteLeder = (fnr, virksomhetsnummer) => {
    return {
        type: INGEN_FORRIGE_NAERMESTELEDER,
        fnr,
        virksomhetsnummer,
    };
};
