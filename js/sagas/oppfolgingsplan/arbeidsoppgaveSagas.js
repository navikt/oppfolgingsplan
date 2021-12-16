import { call, put, takeEvery } from 'redux-saga/effects';
import { post } from '@/api/axios';
import { API_NAVN, hentSyfoapiUrl } from '@/api/apiUtils';
import * as actions from '../../actions/oppfolgingsplan/arbeidsoppgave_actions';
import { input2RSArbeidsoppgave } from '@/utils/arbeidsoppgaveUtils';

export function* lagreArbeidsoppgave(action) {
  const body = input2RSArbeidsoppgave(action.arbeidsoppgave);
  try {
    yield put(actions.lagrerArbeidsoppgave(action.fnr, action.arbeidsoppgave.arbeidsoppgaveId));
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/oppfolgingsplan/actions/${
      action.id
    }/lagreArbeidsoppgave`;
    const data = yield call(post, url, body);
    yield put(actions.arbeidsoppgaveLagret(action.id, data, action.arbeidsoppgave, action.fnr));
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.lagreArbeidsoppgaveFeilet(action.fnr, body));
  }
}

export function* slettArbeidsoppgave(action) {
  try {
    yield put(actions.sletterArbeidsoppgave(action.fnr));
    const url = `${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/arbeidsoppgave/actions/${
      action.arbeidsoppgaveId
    }/slett`;
    yield call(post, url);
    yield put(actions.arbeidsoppgaveSlettet(action.id, action.arbeidsoppgaveId, action.fnr));
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.slettArbeidsoppgaveFeilet(action.fnr, action.arbeidsoppgaveId));
  }
}

export default function* arbeidsoppgaveSagas() {
  yield takeEvery(actions.LAGRE_ARBEIDSOPPGAVE_FORESPURT, lagreArbeidsoppgave);
  yield takeEvery(actions.SLETT_ARBEIDSOPPGAVE_FORESPURT, slettArbeidsoppgave);
}
