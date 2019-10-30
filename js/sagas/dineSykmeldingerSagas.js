import {
    call,
    put,
    fork,
    takeEvery,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from '../actions/dineSykmeldinger_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentDineSykmeldinger() {
    yield put(actions.henterDineSykmeldinger());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger`);
        yield put(actions.setDineSykmeldinger(data));
    } catch (e) {
        log(e);
        yield put(actions.hentDineSykmeldingerFeilet());
    }
}

function* watchHentDineSykmeldinger() {
    yield takeEvery([
        actiontyper.HENT_DINE_SYKMELDINGER_FORESPURT,
    ], hentDineSykmeldinger);
}

export default function* dineSykmeldingerSagas() {
    yield fork(watchHentDineSykmeldinger);
}
