import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const hentTekst = (antallTiltak) => {
    const tekst = antallTiltak > 1 ? 'arbeidsoppgaver' : 'arbeidsoppgave';
    return `Lederen din ønsker en vurdering av ${antallTiltak} ${tekst}`;
};

const NotifikasjonBoksVurderingOppgave = (
    {
        antallIkkeVurderte,
    }) => {
    return (<Alertstripe
        className="alertstripe--notifikasjonboks"
        type="advarsel">
        {hentTekst(antallIkkeVurderte)}
    </Alertstripe>);
};
NotifikasjonBoksVurderingOppgave.propTypes = {
    antallIkkeVurderte: PropTypes.number,
};

export default NotifikasjonBoksVurderingOppgave;

