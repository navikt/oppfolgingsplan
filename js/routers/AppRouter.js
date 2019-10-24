import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import OppfolgingsdialogerSide from '../components/oppfolgingsdialoger/OppfolgingsdialogerSide';
import OppfolgingsdialogSide from '../components/oppfolgingsplan/OppfolgingsdialogSide';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/oppfolgingsplan/oppfolgingsplaner" component={OppfolgingsdialogerSide} />
        <Route path="/oppfolgingsplan/oppfolgingsplaner/:oppfolgingsdialogId" component={OppfolgingsdialogSide} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.shape({
        replace: PropTypes.func,
        push: PropTypes.func,
    }),
};

export default AppRouter;
