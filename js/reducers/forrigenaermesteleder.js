import {
    HENTER_FORRIGE_NAERMESTELEDER,
    FORRIGE_NAERMESTELEDER_HENTET,
    INGEN_FORRIGE_NAERMESTELEDER,
    HENT_FORRIGE_NAERMESTELEDER_FEILET,
} from '../actions/oppfolgingsplan/forrigeNaermesteLeder_actions';
import { HENTER_OPPFOLGINGSDIALOGER } from '../actions/oppfolgingsplan/oppfolgingsdialog_actions';

const initiellState = {
    henter: [],
    hentet: [],
    hentingFeilet: [],
    data: [],
};

const forrigenaermesteleder = (state = initiellState, action = {}) => {
    switch (action.type) {
        case HENTER_FORRIGE_NAERMESTELEDER: {
            return Object.assign({}, state, {
                henter: state.henter.concat({
                    fnr: action.fnr,
                    virksomhetsnummer: action.virksomhetsnummer,
                }),
                hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
                    return hentingFeilet.fnr !== action.fnr && hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer;
                }),
            });
        }
        case FORRIGE_NAERMESTELEDER_HENTET: {
            return Object.assign({}, state, {
                henter: state.hentingFeilet.filter((henter) => {
                    return henter.fnr !== action.fnr && henter.virksomhetsnummer !== action.virksomhetsnummer;
                }),
                hentet: state.hentet.concat({
                    fnr: action.fnr,
                    virksomhetsnummer: action.virksomhetsnummer,
                }),
                hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
                    return hentingFeilet.fnr !== action.fnr && hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer;
                }),
                data: state.data.concat({ fnr: action.fnr, virksomhetsnummer: action.virksomhetsnummer, forrigeNaermesteLeder: action.forrigeNaermesteLeder }),
            });
        }
        case INGEN_FORRIGE_NAERMESTELEDER: {
            return Object.assign({}, state, {
                henter: state.henter.filter((henter) => {
                    return henter.fnr !== action.fnr && henter.virksomhetsnummer !== action.virksomhetsnummer;
                }),
                hentet: state.hentet.concat({
                    fnr: action.fnr,
                    virksomhetsnummer: action.virksomhetsnummer,
                }),
                hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
                    return hentingFeilet.fnr !== action.fnr && hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer;
                }),
            });
        }
        case HENT_FORRIGE_NAERMESTELEDER_FEILET: {
            return Object.assign({}, state, {
                henter: state.henter.filter((henter) => {
                    return henter.fnr !== action.fnr && henter.virksomhetsnummer !== action.virksomhetsnummer;
                }),
                hentingFeilet: state.hentingFeilet.concat({ fnr: action.fnr, virksomhetsnummer: action.virksomhetsnummer }),
            });
        }
        case HENTER_OPPFOLGINGSDIALOGER:
            return initiellState;
        default:
            return state;
    }
};

export default forrigenaermesteleder;
