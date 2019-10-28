import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    getHtmlLedetekst,
} from 'digisyfo-npm';
import {
    Fareknapp,
    Hovedknapp,
} from 'nav-frontend-knapper';
import { oppfolgingsplanPt } from '../../propTypes/opproptypes';
import getContextRoot from '../../utils/getContextRoot';
import Lightbox from '../app/Lightbox';
import OppfolgingsplanInnholdboks from '../app/OppfolgingsplanInnholdboks';

export const AvkreftNyNaermestelederBekreftelse = ({ oppfolgingsdialog, fjernNaermesteLederKobling, lukk }) => {
    const tittel = getLedetekst('oppfolgingsdialog.nyNaermestelederInfoboks.arbeidstaker.bekreftelse.tittel');
    const tekst = getHtmlLedetekst('oppfolgingsdialog.nyNaermestelederInfoboks.arbeidstaker.bekreftelse.tekst', {
        '%NAERMESTELEDER%': oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn,
        '%VIRKSOMHET%': oppfolgingsdialog.virksomhet.navn,
    });
    return (<Lightbox lukkLightbox={lukk}>
        <div>
            <h3>{tittel}</h3>
            <p dangerouslySetInnerHTML={tekst} />
            <div className="knapperad" onClick={fjernNaermesteLederKobling} role="button" tabIndex={0}>
                <Fareknapp>
                    {getLedetekst('oppfolgingsdialog.knapp.sikker')}
                </Fareknapp>
            </div>
        </div>
    </Lightbox>);
};
AvkreftNyNaermestelederBekreftelse.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    fjernNaermesteLederKobling: PropTypes.func,
    lukk: PropTypes.func,
};

class NyNaermestelederInfoboks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visBekreftelse: false,
        };
        this.apneBekreftelse = this.apneBekreftelse.bind(this);
        this.lukkBekreftelse = this.lukkBekreftelse.bind(this);
        this.fjernNaermesteLederKobling = this.fjernNaermesteLederKobling.bind(this);
    }

    apneBekreftelse() {
        this.setState({ visBekreftelse: true });
    }

    lukkBekreftelse() {
        this.setState({ visBekreftelse: false });
    }

    fjernNaermesteLederKobling() {
        const oppfolgingsdialog = this.props.oppfolgingsdialog;
        this.props.avkreftNyNaermesteleder(oppfolgingsdialog.virksomhet.virksomhetsnummer);
    }

    render() {
        const {
            oppfolgingsdialog,
            bekreftNyNaermesteLeder,
        } = this.props;
        const tittel = getLedetekst('oppfolgingsdialog.nyNaermestelederInfoboks.arbeidstaker.tittel');
        const tekst = getHtmlLedetekst('oppfolgingsdialog.nyNaermestelederInfoboks.arbeidstaker.tekst', {
            '%FORRIGENAERMESTELEDER%': oppfolgingsdialog.arbeidsgiver.forrigeNaermesteLeder.navn,
            '%NYNAERMESTELEDER%': oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn,
        });
        const bekreftKnappTekst = getLedetekst('oppfolgingsdialog.knapp.stemmer');
        return (<div className="nyNaermestelederInfoboks">
            { this.state.visBekreftelse &&
            <AvkreftNyNaermestelederBekreftelse
                oppfolgingsdialog={oppfolgingsdialog}
                fjernNaermesteLederKobling={this.fjernNaermesteLederKobling}
                lukk={this.lukkBekreftelse}
            />
            }
            <OppfolgingsplanInnholdboks
                tittel={tittel}
                svgUrl={`${getContextRoot()}/img/svg/ny-naermesteleder.svg`}
                svgAlt="Ny nærmeste leder"
            >
                <p dangerouslySetInnerHTML={tekst} />
                <div className="knapperad">
                    <div className="knapperad__element">
                        <Hovedknapp onClick={() => { bekreftNyNaermesteLeder(); }}>
                            {bekreftKnappTekst}
                        </Hovedknapp>
                    </div>
                    <div className="knapperad__element">
                        <button
                            className="lenke"
                            onClick={() => { this.apneBekreftelse(); }}>
                            {getLedetekst('oppfolgingsdialog.knapp.meld-feil')}
                        </button>
                    </div>
                </div>
            </OppfolgingsplanInnholdboks>
        </div>);
    }
}

NyNaermestelederInfoboks.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    avkreftNyNaermesteleder: PropTypes.func,
    bekreftNyNaermesteLeder: PropTypes.func,
};

export default NyNaermestelederInfoboks;
