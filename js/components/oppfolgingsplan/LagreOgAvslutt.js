import React from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import history from '../../history';
import getContextRoot from '../../utils/getContextRoot';

const tekster = {
    knapp: 'Lagre og avslutt',
};

const sendTilLandingsside = () => {
    history.push(`${getContextRoot()}/oppfolgingsplaner`);
};

const handleKeyPress = (lagreOgAvslutt, e) => {
    e.preventDefault();
    if (e.nativeEvent.keyCode === 13) {
        lagreOgAvslutt();
    }
};

const LagreOgAvslutt = () => {
    return (
        <nav className="lagreOgAvslutt">
            <Flatknapp
                onKeyPress={(e) => { handleKeyPress(sendTilLandingsside, e); }}
                onMouseDown={() => { sendTilLandingsside(); }}>
                {tekster.knapp}
            </Flatknapp>
        </nav>
    );
};

export default LagreOgAvslutt;
