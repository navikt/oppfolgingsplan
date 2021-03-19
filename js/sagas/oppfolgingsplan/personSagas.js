import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get } from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/person_actions';
import { HOST_NAMES } from '../../konstanter';
import { fullNaisUrl } from '../../utils/urlUtils';

export function* hentPersonSaga(action) {
  yield put(actions.henterPerson(action.fnr));
  try {
    const host = HOST_NAMES.SYFOOPREST;
    const path = `${process.env.REACT_APP_SYFOOPREST_ROOT}/person/${action.fnr}`;
    const url = fullNaisUrl(host, path);
    const person = yield call(get, url);

    yield put(actions.personHentet(person, action.fnr));
  } catch (e) {
    log(e);
    yield put(actions.hentPersonFeilet(action.fnr));
  }
}

function* watchHentPerson() {
  yield takeEvery(actions.HENT_PERSON_FORESPURT, hentPersonSaga);
}

export default function* personSagas() {
  yield fork(watchHentPerson);
}
