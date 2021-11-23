import { call, put, takeEvery } from 'redux-saga/effects';
import { post } from '@/api/axios';
import { API_NAVN, hentSyfoapiUrl } from '@/api/apiUtils';
import * as actions from '../../actions/oppfolgingsplan/delMedFastlege_actions';

export function* delMedFastlege(action) {
  try {
    yield put(actions.delerMedFastlege(action.fnr));
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${
      action.id
    }/delmedfastlege`;
    yield call(post, url);
    yield put(actions.deltMedFastlege(action.id, action.fnr));
  } catch (e) {
    yield put(actions.delMedFastlegeFeilet(action.fnr));
  }
}

export default function* delMedFastlegeSagas() {
  yield takeEvery(actions.DEL_MED_FASTLEGE_FORESPURT, delMedFastlege);
}
