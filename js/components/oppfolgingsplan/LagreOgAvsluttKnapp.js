import React from 'react';
import { Link } from 'react-router';
import getContextRoot from '../../utils/getContextRoot';

const tekster = {
    knapp: 'Fortsett senere',
};

const LagreOgAvsluttKnapp = () => {
    return (
        <div className="knapperad">
            <Link className="knapperad__element knapp knapp--flat lagreOgAvslutt" to={`${getContextRoot()}/oppfolgingsplaner`}>
                {tekster.knapp}
            </Link>
        </div>
    );
};

export default LagreOgAvsluttKnapp;
