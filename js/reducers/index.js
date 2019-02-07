import { ledetekster, sykeforlopsPerioder, timeout, toggles } from 'digisyfo-npm';
import { reducer as formReducer } from 'redux-form';
import arbeidsoppgaver from './arbeidsoppgaver';
import arbeidsforhold from './arbeidsforhold';
import avbrytdialogReducer from './avbrytdialog';
import delmednav from './delmednav';
import dokument from './dokument';
import fastlegeDeling from './fastlegeDeling';
import forespoerselRevidering from './forespoerselRevidering';
import forrigenaermesteleder from './forrigenaermesteleder';
import kommentar from './kommentar';
import kontaktinfo from './kontaktinfo';
import kopierDialogReducer from './kopierOppfolgingsdialog';
import oppfolgingsdialoger from './oppfolgingsdialog';
import navigasjontoggles from './navigasjontoggles';
import naermesteleder from './naermesteleder';
import nullstill from './nullstillGodkjenning';
import person from './person';
import nyNaermesteLeder from './nyNaermesteLeder';
import samtykke from './samtykke';
import tilgang from './tilgang';
import tiltak from './tiltak';
import virksomhet from './virksomhet';

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
