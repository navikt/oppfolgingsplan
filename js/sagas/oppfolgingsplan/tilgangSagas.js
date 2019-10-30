import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import {
    API_NAVN,
    hentSyfoapiUrl,
    get,
} from '../../gateway-api/gatewayApi';
import logger from '../../logg/logging';
import * as actions from '../../actions/oppfolgingsplan/sjekkTilgang_actions';

export function* sjekkerTilgang() {
    yield put(actions.sjekkerTilgang());
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/tilgang`;
    try {
        const data = yield call(get, url);
        yield put(actions.sjekketTilgang(data));
    } catch (e) {
        if (e.message === '403') {
            yield put(actions.sjekkTilgang403());
            return;
        }
        log(e);
        logger.error(`Kunne ikke hente tilgang for arbeidstaker. ${e.message}`);
        yield put(actions.sjekkTilgangFeilet());
    }
}

function* watchSjekkTilgang() {
    yield takeEvery(actions.SJEKK_TILGANG_FORESPURT, sjekkerTilgang);
}

export default function* tilgangSagas() {
    yield fork(watchSjekkTilgang);
}
