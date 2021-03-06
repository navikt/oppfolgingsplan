import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/kontaktinfo_actions';
import { get } from '../../gateway-api';
import { HOST_NAMES } from '../../konstanter';
import { fullNaisUrl } from '../../utils/urlUtils';

export function* hentKontaktinfoSaga(action) {
  yield put(actions.henterKontaktinfo(action.fnr));
  try {
    const host = HOST_NAMES.SYFOOPREST;
    const path = `${process.env.REACT_APP_SYFOOPREST_ROOT}/kontaktinfo/${action.fnr}`;
    const url = fullNaisUrl(host, path);
    const kontaktinfo = yield call(get, url);
    yield put(actions.kontaktinfoHentet(kontaktinfo, action.fnr));
  } catch (e) {
    yield put(actions.hentKontaktinfoFeilet(action.fnr));
  }
}

function* watchHentKontaktinfo() {
  yield takeEvery(actions.HENT_KONTAKTINFO_FORESPURT, hentKontaktinfoSaga);
}

export default function* kontaktinfoSagas() {
  yield fork(watchHentKontaktinfo);
}
