import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/dineSykmeldinger_actions';
import * as actiontyper from '../actions/actiontyper';
import { get } from '../gateway-api';
import { API_NAVN, hentSyfoapiUrl } from '../gateway-api';

export function* hentDineSykmeldinger() {
  yield put(actions.henterDineSykmeldinger());
  try {
    const data = yield call(get, `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/arbeidstaker/sykmeldinger`);
    yield put(actions.setDineSykmeldinger(data));
  } catch (e) {
    yield put(actions.hentDineSykmeldingerFeilet());
  }
}

function* watchHentDineSykmeldinger() {
  yield takeEvery([actiontyper.HENT_DINE_SYKMELDINGER_FORESPURT], hentDineSykmeldinger);
}

export default function* dineSykmeldingerSagas() {
  yield fork(watchHentDineSykmeldinger);
}
