import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';
import { post } from '@/api/axios';
import { API_NAVN, hentSyfoapiUrl } from '@/api/apiUtils';

export function* kopierOppfolgingsdialog(action) {
  try {
    yield put(actions.kopiererOppfolgingsdialog());
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/kopier`;
    const data = yield call(post, url);
    yield put(actions.oppfolgingsdialogKopiert(data));
  } catch (e) {
    yield put(actions.kopierOppfolgingsdialogFeilet());
  }
}

export default function* kopierOppfolgingsdialogSagas() {
  yield takeEvery(actions.KOPIER_OPPFOLGINGSDIALOG_FORESPURT, kopierOppfolgingsdialog);
}
