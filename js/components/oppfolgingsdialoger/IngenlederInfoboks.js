import React, { Component } from 'react';
import { Link } from 'react-router';
import getContextRoot from '../../utils/getContextRoot';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';

const texts = {
    infoboks: {
        title: 'Ser ut som du er alene her inne',
        info: `
            Vi må vite hvem som er lederen din før du kan sende oppfølgingsplanen til godkjenning.
            I mellomtiden kan du likevel gjøre endringer i planen. Ta kontakt med lederen din og be om at riktig leder blir registrert i Altinn.
        `,
    },
    buttonBack: 'Tilbake til oversikten',
};

class IngenledereInfoboks extends Component {
    componentWillMount() {
        window.location.hash = 'godkjenn';
    }

    render() {
        return (<div>
            <OppfolgingsplanInfoboks
                svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialog-ingenleder.svg`}
                svgAlt="Ingen Leder"
                tittel={texts.infoboks.title}
                tekst={texts.infoboks.info}
            />
            <div className="knapperad">
                <Link className="knapp" to={`${getContextRoot()}/oppfolgingsplaner`}>
                    {texts.buttonBack}
                </Link>
            </div>
        </div>);
    }
}

export default IngenledereInfoboks;
