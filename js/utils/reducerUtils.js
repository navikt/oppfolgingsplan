export const henterEllerHarHentetLedere = (ledere) => {
    return ledere.henter || ledere.hentet;
};

export const lederHarBlittAvkreftet = (ledere, nesteLedere) => {
    return ledere.avkrefter && nesteLedere.avkreftet;
};

export const henterEllerHarHentetToggles = (toggles) => {
    return toggles.henter || toggles.hentet;
};

export const henterEllerHarHentetTilgang = (tilgang) => {
    return tilgang.henter || tilgang.hentet || tilgang.hentingFeilet;
};

export const henterEllerHarHentetOppfolgingsplaner = (oppfolgingsplaner) => {
    return oppfolgingsplaner.henter || oppfolgingsplaner.hentet || oppfolgingsplaner.hentingFeilet;
};

export const oppfolgingsplanHarBlittAvbrutt = (avbrytplan, nesteAvbrytplan) => {
    return avbrytplan.sender && nesteAvbrytplan.sendt;
};

export const oppfolgingsplanHarBlittOpprettet = (oppfolgingsplaner, nesteOppfolgingsplaner) => {
    return oppfolgingsplaner.oppretter && nesteOppfolgingsplaner.opprettet;
};

