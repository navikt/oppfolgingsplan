import { call, put, takeEvery } from 'redux-saga/effects';
import { post } from '@/api/axios';
import { API_NAVN, hentSyfoapiUrl } from '@/api/apiUtils';
import * as actions from '../../actions/oppfolgingsplan/avbrytdialog_actions';

export function* avbrytDialog(action) {
  try {
    yield put(actions.avbryterDialog(action.fnr));
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${action.id}/avbryt`;
    yield call(post, url);
    yield put(actions.dialogAvbrutt(action.id, action.fnr));
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.avbrytDialogFeilet(action.fnr));
  }
}

export default function* avbrytdialogSagas() {
  yield takeEvery(actions.AVBRYT_DIALOG_FORESPURT, avbrytDialog);
}
