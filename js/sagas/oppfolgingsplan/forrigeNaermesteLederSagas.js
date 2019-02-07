import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../../actions/oppfolgingsplan/forrigeNaermesteLeder_actions';

export function* hentForrigeNaermesteLederSaga(action) {
    yield put(actions.henterForrigeNaermesteLeder(action.fnr, action.virksomhetsnummer));
    try {
        const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/naermesteleder/${action.fnr}/forrige?virksomhetsnummer=${action.virksomhetsnummer}`;
        const forrigeNaermesteLeder = yield call(get, url);
        yield put(actions.forrigeNaermesteLederHentet(forrigeNaermesteLeder, action.fnr, action.virksomhetsnummer));
    } catch (e) {
        if (e.message === '404') {
            yield put(actions.ingenForrigeNaermesteLeder(action.fnr, action.virksomhetsnummer));
            return;
        }
        log(e);
        yield put(actions.hentForrigeNaermesteLederFeilet(action.fnr, action.virksomhetsnummer));
    }
}

function* watchHentForrigeNaermesteLeder() {
    yield takeEvery(actions.HENT_FORRIGE_NAERMESTELEDER_FORESPURT, hentForrigeNaermesteLederSaga);
}

export default function* forrigeNaermesteLederSagas() {
    yield fork(watchHentForrigeNaermesteLeder);
}

