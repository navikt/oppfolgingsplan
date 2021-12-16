import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import OppfolgingsdialogerSide from '../components/oppfolgingsdialoger/OppfolgingsdialogerSide';
import OppfolgingsdialogSide from '../components/oppfolgingsplan/OppfolgingsdialogSide';

const appendToBase = (path) => {
  return process.env.REACT_APP_CONTEXT_ROOT + path;
};

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={appendToBase('/oppfolgingsplaner')} component={OppfolgingsdialogerSide} />
      <Route path={appendToBase('/oppfolgingsplaner/:oppfolgingsdialogId')} component={OppfolgingsdialogSide} />
      <Route path="*" component={OppfolgingsdialogerSide} />
    </Router>
  );
};

AppRouter.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default AppRouter;
