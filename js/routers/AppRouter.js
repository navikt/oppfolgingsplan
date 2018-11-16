import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import OppfolgingsdialogerSide from '../sider/OppfolgingsdialogerSide';
import OppfolgingsdialogSide from '../sider/OppfolgingsdialogSide';

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
