import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from 'digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    get,
} from '../../gateway-api/gatewayApi';
import * as actions from '../../actions/oppfolgingsplan/person_actions';

export function* hentPersonSaga(action) {
    yield put(actions.henterPerson(action.fnr));
    try {
        const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/person/${action.fnr}`;
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

