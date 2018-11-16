import {
    oppfolgingsdialogerAt as oppfolgingsdialoger,
    arbeidsoppgaver,
    forespoerselRevidering,
    kommentar,
    kopierDialog as kopierDialogReducer,
    dokument,
    samtykke,
    tilgangAt as tilgang,
    tiltak,
    navigasjontoggles,
    nullstill,
    avbrytdialogReducer,
    arbeidsforhold,
    nyNaermesteLeder,
    delmednav,
    fastlegeDeling,
    person,
    virksomhet,
    kontaktinfo,
    forrigenaermesteleder,
    naermesteleder,
} from 'oppfolgingsdialog-npm';
import { ledetekster, sykeforlopsPerioder, timeout, toggles } from 'digisyfo-npm';
import { reducer as formReducer } from 'redux-form';
import dineSykmeldinger from './dineSykmeldinger';
import sykeforloep from './sykeforloep';
import ledere from './ledere';
import brukerinfo from './brukerinfo';
import history from '../history';

const reducers = {
    arbeidsforhold,
    arbeidsoppgaver,
    avbrytdialogReducer,
    dineSykmeldinger,
    history,
    dokument,
    forespoerselRevidering,
    kommentar,
    kopierDialogReducer,
    ledetekster,
    navigasjontoggles,
    nullstill,
    nyNaermesteLeder,
    oppfolgingsdialoger,
    samtykke,
    toggles,
    fastlegeDeling,
    delmednav,
    tilgang,
    tiltak,
    person,
    virksomhet,
    kontaktinfo,
    sykeforlopsPerioder,
    forrigenaermesteleder,
    naermesteleder,
    timeout,
    form: formReducer,
    sykeforloep,
    ledere,
    brukerinfo,
};

export default reducers;
