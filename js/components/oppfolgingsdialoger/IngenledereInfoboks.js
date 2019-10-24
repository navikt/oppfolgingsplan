import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';

const IngenledereInfoboks = () => {
    return (<OppfolgingsplanInfoboks
        svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialog-ingenleder.svg`}
        svgAlt="Ingen Leder"
        tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.ingenledereInfoboks.tittel')}
        tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.ingenledereInfoboks.tekst')}
    />);
};

export default IngenledereInfoboks;
