import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';

const OppfolgingsdialogPlanInfoboks = () => {
    const infoboksTittel = 'oppfolgingsdialog.arbeidstaker.hvaskjernaa.tittel';

    const infoboksTekst = 'oppfolgingsdialog.arbeidstaker.hvaskjernaa.tekst';

    return (
        <div className="panel">
            <h3 className="panel__tittel">{getLedetekst(infoboksTittel)}</h3>
            <p dangerouslySetInnerHTML={{ __html: getLedetekst(infoboksTekst) }} />
        </div>);
};

export default OppfolgingsdialogPlanInfoboks;
