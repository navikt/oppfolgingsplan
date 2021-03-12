import {
    call,
    put,
    fork,
    takeEvery,
    all,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from '../actions/ledere_actions';
import * as actiontyper from '../actions/actiontyper';
import { HOST_NAMES } from '../konstanter';
import { fullNaisUrl } from '../utils/urlUtils';

export function* hentLedere(action) {
    console.log('action', action)
    yield put(actions.henterLedere(action.fodselsnummer));
    try {
        const path = `${process.env.REACT_APP_SYFOOPREST_ROOT}/nermesteledere/${action.fodselsnummer}`;
        const url = fullNaisUrl(HOST_NAMES.SYFOOPREST, path);
        const data = yield call(get, url);

        yield put(actions.ledereHentet(data, action.fodselsnummer));
    } catch (e) {
        log(e);
        yield put(actions.hentLedereFeilet(action.fodselsnummer));
    }
}

function* watchHentLedere() {
    yield takeEvery(actiontyper.HENT_LEDERE_FORESPURT, hentLedere);
}


export default function* ledereSagas() {
    yield fork(watchHentLedere);
}
