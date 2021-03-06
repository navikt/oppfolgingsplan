import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/ledere_actions';
import * as actiontyper from '../actions/actiontyper';
import { HOST_NAMES } from '../konstanter';
import { fullNaisUrl } from '../utils/urlUtils';
import { get } from '../gateway-api';

export function* hentLedere(action) {
  yield put(actions.henterLedere());
  try {
    const path = `${process.env.REACT_APP_SYFOOPREST_ROOT}/narmesteledere/${action.fodselsnummer}`;
    const url = fullNaisUrl(HOST_NAMES.SYFOOPREST, path);
    const data = yield call(get, url);

    yield put(actions.ledereHentet(data));
  } catch (e) {
    yield put(actions.hentLedereFeilet());
  }
}

function* watchHentLedere() {
  yield takeEvery(actiontyper.HENT_LEDERE_FORESPURT, hentLedere);
}

export default function* ledereSagas() {
  yield fork(watchHentLedere);
}
