import React from 'react';
import { Link } from 'react-router';
import getContextRoot from '../../utils/getContextRoot';

const tekster = {
    knapp: 'Lagre og avslutt',
};

const LagreOgAvslutt = () => {
    return (
        <div className="knapperad">
            <Link className="knapperad__element knapp knapp--flat" to={`${getContextRoot()}/oppfolgingsplaner`}>
                {tekster.knapp}
            </Link>
        </div>
    );
};

export default LagreOgAvslutt;
