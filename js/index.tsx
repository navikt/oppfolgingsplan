import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import AppRouter from './routers/AppRouter';
import { hentVedlikehold } from './actions/vedlikehold_actions';
import history from './history';
import '../styles/styles.less';
import { forlengInnloggetSesjon, sjekkInnloggingssesjon } from './timeout/timeout_actions';
import store from './store';

Sentry.init({
  dsn: 'https://0a85ce6fefed42a49d44a727614d6b97@sentry.gc.nav.no/25',
  environment: window.location.hostname,
});

// <OBS>: Minimer antall kall som gjøres her!
store.dispatch(hentVedlikehold());
store.dispatch(forlengInnloggetSesjon());
// </OBS>

setInterval(() => {
  store.dispatch(sjekkInnloggingssesjon());
}, 5000);

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('maincontent')
);

export { history };
