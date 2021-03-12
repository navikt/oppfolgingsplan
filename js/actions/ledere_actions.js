import * as actiontyper from './actiontyper';

export const hentLedere = (fodselsnummer) => {
    return {
        type: actiontyper.HENT_LEDERE_FORESPURT,
        fodselsnummer,
    };
};

export const henterLedere = () => {
    return {
        type: actiontyper.HENTER_LEDERE,
    };
};

export const ledereHentet = (data, fodselsnummer) => {
    return {
        type: actiontyper.LEDERE_HENTET,
        data,
        fodselsnummer,
    };
};

export const hentLedereFeilet = (fodselsnummer) => {
    return {
        type: actiontyper.HENT_LEDERE_FEILET,
        fodselsnummer,
    };
};
