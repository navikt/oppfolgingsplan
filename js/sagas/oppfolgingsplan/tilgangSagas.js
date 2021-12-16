import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from '@/api/axios';
import { API_NAVN, hentSyfoapiUrl } from '@/api/apiUtils';
import * as actions from '../../actions/oppfolgingsplan/sjekkTilgang_actions';

export function* sjekkerTilgang() {
  try {
    yield put(actions.sjekkerTilgang());
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/tilgang`;
    const data = yield call(get, url);
    yield put(actions.sjekketTilgang(data));
  } catch (e) {
    if (e.code === 403) {
      yield put(actions.sjekkTilgang403());
      return;
    }
    yield put(actions.sjekkTilgangFeilet());
  }
}

export default function* tilgangSagas() {
  yield takeEvery(actions.SJEKK_TILGANG_FORESPURT, sjekkerTilgang);
}
