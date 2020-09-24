import React from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';

const tekster = {
    knapp: '+ Legg til ny arbeidsoppgave',
};

const ArbeidsoppgaverInfoboks = (
    {
        children,
        tittel,
        visSkjema,
        toggleSkjema,
    }) => {
    return (<Panel className="arbeidsoppgaverInfoboks" border>
        <h3>{tittel}</h3>
        { children }
        {!visSkjema && <Knapp
            mini
            onClick={() => {
                toggleSkjema();
            }}
        >
            {tekster.knapp}
        </Knapp>
        }
    </Panel>);
};

ArbeidsoppgaverInfoboks.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    tittel: PropTypes.string,
    visSkjema: PropTypes.bool,
    toggleSkjema: PropTypes.func,
};

export default ArbeidsoppgaverInfoboks;
