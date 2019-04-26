import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    get,
    post as postApiGateway,
} from '../../gateway-api/gatewayApi';
import logger from '../../logg/logging';
import * as actions from '../../actions/oppfolgingsplan/oppfolgingsdialog_actions';

export function* hentSykmeldtOppfolginger() {
    yield put(actions.henterOppfolgingsdialoger());

    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/arbeidstaker/oppfolgingsplaner`;
        const data = yield call(get, url);
        yield put(actions.oppfolgingsdialogerHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente oppfolgingsdialoger for arbeidstaker. ${e.message}`);
        yield put(actions.hentOppfolgingsdialogerFeilet());
    }
}

export function* opprettOppfolgingsdialog(action) {
    yield put(actions.oppretterOppfolgingsdialog());
    const body = {
        virksomhetsnummer: action.virksomhetsnummer,
    };
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/arbeidstaker/oppfolgingsplaner`;
        const data = yield call(postApiGateway, url, body);
        yield put(actions.oppfolgingsdialogOpprettet(data));
    } catch (e) {
        log(e);
        yield put(actions.opprettOppfolgingsdialogFeilet());
    }
}

export function* godkjennDialogSaga(action) {
    yield put(actions.godkjennerDialog());
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/godkjenn?status=${action.status}&aktoer=arbeidstaker`;
        const data = yield call(post, url, action.gyldighetstidspunkt);
        yield put(actions.dialogGodkjent(action.id, action.status, data));
    } catch (e) {
        if (e.message === '409') {
            window.location.reload();
            return;
        }
        log(e);
        yield put(actions.godkjennDialogFeilet());
    }
}

export function* avvisDialogSaga(action) {
    yield put(actions.avviserDialog());
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/avvis`;
        yield call(postApiGateway, url);
        yield put(actions.dialogAvvist(action.id));
    } catch (e) {
        log(e);
        yield put(actions.avvisDialogFeilet());
    }
}

function* watchGodkjennDialog() {
    yield takeEvery(actions.GODKJENN_DIALOG_FORESPURT, godkjennDialogSaga);
}

function* watchAvvisDialog() {
    yield takeEvery(actions.AVVIS_DIALOG_FORESPURT, avvisDialogSaga);
}

function* watchHentOppfolgingsdialoger() {
    yield takeEvery(actions.HENT_OPPFOLGINGSDIALOGER_FORESPURT, hentSykmeldtOppfolginger);
}

function* watchOpprettOppfolgingsdialog() {
    yield takeEvery(actions.OPPRETT_OPPFOLGINGSDIALOG_FORESPURT, opprettOppfolgingsdialog);
}

export default function* oppfolgingsdialogerSagas() {
    yield all([
        fork(watchHentOppfolgingsdialoger),
        fork(watchOpprettOppfolgingsdialog),
        fork(watchGodkjennDialog),
        fork(watchAvvisDialog),
    ]);
}
