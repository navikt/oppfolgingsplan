import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { API_NAVN, hentSyfoapiUrl, post } from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';

export function* kopierOppfolgingsdialog(action) {
  yield put(actions.kopiererOppfolgingsdialog());
  try {
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/kopier`;
    const data = yield call(post, url);
    yield put(actions.oppfolgingsdialogKopiert(data));
  } catch (e) {
    yield put(actions.kopierOppfolgingsdialogFeilet());
  }
}

function* watchKopierOppfolgingsdialog() {
  yield takeEvery(actions.KOPIER_OPPFOLGINGSDIALOG_FORESPURT, kopierOppfolgingsdialog);
}

export default function* kopierOppfolgingsdialogSagas() {
  yield fork(watchKopierOppfolgingsdialog);
}
