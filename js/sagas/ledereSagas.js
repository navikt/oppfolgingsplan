import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { get, post, log } from '@navikt/digisyfo-npm';
import * as actions from '../actions/ledere_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentLedere() {
  yield put(actions.henterLedere());
  try {
    const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/naermesteledere`);
    yield put(actions.ledereHentet(data));
  } catch (e) {
    log(e);
    yield put(actions.hentLedereFeilet());
  }
}

function* watchHentLedere() {
  yield takeEvery(actiontyper.HENT_LEDERE_FORESPURT, hentLedere);
}

export default function* ledereSagas() {
  yield fork(watchHentLedere);
}
