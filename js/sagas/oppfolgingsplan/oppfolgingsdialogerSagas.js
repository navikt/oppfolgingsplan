import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { API_NAVN, hentSyfoapiUrl, get, post } from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/oppfolgingsdialog_actions';

export function* hentSykmeldtOppfolginger() {
  yield put(actions.henterOppfolgingsdialoger());

  try {
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/arbeidstaker/oppfolgingsplaner`;
    const data = yield call(get, url);
    yield put(actions.oppfolgingsdialogerHentet(data));
  } catch (e) {
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
    const data = yield call(post, url, body);
    yield put(actions.oppfolgingsdialogOpprettet(data));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    yield put(actions.opprettOppfolgingsdialogFeilet());
  }
}

export function* godkjennDialogSaga(action) {
  yield put(actions.godkjennerDialog());
  try {
    const delMedNav = `&delmednav=${action.delMedNav}`;
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${
      action.id
    }/godkjenn?status=${action.status}&aktoer=arbeidstaker${delMedNav}`;
    const data = yield call(post, url, action.gyldighetstidspunkt);
    yield put(actions.dialogGodkjent(action.id, action.status, data, action.delMedNav));
  } catch (e) {
    if (e.message === '409') {
      window.location.reload();
      return;
    }
    yield put(actions.godkjennDialogFeilet());
  }
}

export function* avvisDialogSaga(action) {
  yield put(actions.avviserDialog());
  try {
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/avvis`;
    yield call(post, url);
    yield put(actions.dialogAvvist(action.id));
  } catch (e) {
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
