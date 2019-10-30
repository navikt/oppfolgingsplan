import React from 'react';
import { getHtmlLedetekst } from '@navikt/digisyfo-npm';

const OppfolgingsdialogerInfoPersonvern = () => {
    return (<div
        className="oppfolgingsdialogerInfoPersonvern"
        dangerouslySetInnerHTML={getHtmlLedetekst('oppfolgingsdialog.oppfolgingsdialogerInfoPersonvern.at')}
    />);
};

export default OppfolgingsdialogerInfoPersonvern;
