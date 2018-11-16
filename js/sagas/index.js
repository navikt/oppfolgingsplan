import {
    ledeteksterSagas,
    togglesSagas,
    sykeforlopsPerioderSagas,
} from 'digisyfo-npm';
import {
    oppfolgingsdialogerAtSagas as oppfolgingsdialogerSagas,
    arbeidsoppgaveSagas,
    arbeidsforholdSagas,
    dokumentSagas,
    forespoerRevideringSagas,
    samtykkeSagas,
    nullstillGodkjenningSagas,
    tilgangAtSagas as tilgangSagas,
    tiltakSagas,
    settDialogSagas,
    avbrytdialogSagas,
    delMedFastlegeSagas,
    delMedNavSagas,
    virksomhetSagas,
    personSagas,
    kontaktinfoSagas,
    forrigeNaermesteLederSagas,
    naermesteLederSagas,
    kommentarSagas,
    kopierOppfolgingsdialogSagas,
} from 'oppfolgingsdialog-npm';
import dineSykmeldingerSagas from './dineSykmeldingerSagas';
import sykeforloepSagas from './sykeforloepSagas';
import ledereSagas from './ledereSagas';

export default function* rootSaga() {
    yield [
        arbeidsforholdSagas(),
        dineSykmeldingerSagas(),
        ledeteksterSagas(),
        samtykkeSagas(),
        avbrytdialogSagas(),
        oppfolgingsdialogerSagas(),
        delMedFastlegeSagas(),
        delMedNavSagas(),
        forespoerRevideringSagas(),
        nullstillGodkjenningSagas(),
        arbeidsoppgaveSagas(),
        dokumentSagas(),
        kommentarSagas(),
        kopierOppfolgingsdialogSagas(),
        tilgangSagas(),
        tiltakSagas(),
        togglesSagas(),
        settDialogSagas(),
        virksomhetSagas(),
        personSagas(),
        kontaktinfoSagas(),
        forrigeNaermesteLederSagas(),
        naermesteLederSagas(),
        sykeforlopsPerioderSagas(),
        sykeforloepSagas(),
        ledereSagas(),
    ];
}
