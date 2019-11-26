import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Fareknapp,
    Hovedknapp,
} from 'nav-frontend-knapper';
import { oppfolgingsplanPt } from '../../propTypes/opproptypes';
import getContextRoot from '../../utils/getContextRoot';
import Lightbox from '../app/Lightbox';
import OppfolgingsplanInnholdboks from '../app/OppfolgingsplanInnholdboks';

const texts = {
    avkreftNyNaermestelederBekreftelse: {
        title: 'Endre nærmeste leder',
        buttonConfirm: 'Ja, jeg er sikker',
    },
    nyNaermestelederInfoboks: {
        title: 'Du har fått ny leder',
        buttonConfirm: 'Dette stemmer',
        buttonWrongLeader: 'Meld feil',
    },
};

const TextWrongLeader = ({ oppfolgingsplan }) => {
    return (
        <React.Fragment>
            Er du sikker på at du vil fjerne <b>{oppfolgingsplan.arbeidsgiver.naermesteLeder.navn}</b> som din nærmeste leder i <b>{oppfolgingsplan.virksomhet.navn}</b>?
        </React.Fragment>
    );
};

TextWrongLeader.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
};

const TextConfimation = ({ oppfolgingsplan }) => {
    return (
        <React.Fragment>
            {
                `Din nye leder vil få tilgang til de planene du har laget tidligere.
                Lederen har mulighet til å skrive i planer som fortsatt gjelder. Det som skrives vil da bli merket med lederens navn.`
            }
            <br />
            <br />
            <b>Din forrige leder var: {oppfolgingsplan.arbeidsgiver.forrigeNaermesteLeder.navn}</b>
            <br />
            <b>Din nye leder er: {oppfolgingsplan.arbeidsgiver.naermesteLeder.navn}</b>
        </React.Fragment>
    );
};
TextConfimation.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
};


export const AvkreftNyNaermestelederBekreftelse = ({ oppfolgingsplan, fjernNaermesteLederKobling, lukk }) => {
    const tittel = texts.avkreftNyNaermestelederBekreftelse.title;
    return (<Lightbox lukkLightbox={lukk}>
        <div>
            <h3>{tittel}</h3>
            <p>
                <TextWrongLeader
                    oppfolgingsplan={oppfolgingsplan}
                />
            </p>
            <div className="knapperad" onClick={fjernNaermesteLederKobling} role="button" tabIndex={0}>
                <Fareknapp>
                    {texts.avkreftNyNaermestelederBekreftelse.buttonConfirm}
                </Fareknapp>
            </div>
        </div>
    </Lightbox>);
};
AvkreftNyNaermestelederBekreftelse.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
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
        const oppfolgingsplan = this.props.oppfolgingsplan;
        this.props.avkreftNyNaermesteleder(oppfolgingsplan.virksomhet.virksomhetsnummer);
    }

    render() {
        const {
            oppfolgingsplan,
            bekreftNyNaermesteLeder,
        } = this.props;
        return (<div className="nyNaermestelederInfoboks">
            { this.state.visBekreftelse &&
            <AvkreftNyNaermestelederBekreftelse
                oppfolgingsplan={oppfolgingsplan}
                fjernNaermesteLederKobling={this.fjernNaermesteLederKobling}
                lukk={this.lukkBekreftelse}
            />
            }
            <OppfolgingsplanInnholdboks
                tittel={texts.nyNaermestelederInfoboks.title}
                svgUrl={`${getContextRoot()}/img/svg/ny-naermesteleder.svg`}
                svgAlt="Ny nærmeste leder"
            >
                <p>
                    <TextConfimation oppfolgingsplan={oppfolgingsplan} />
                </p>
                <div className="knapperad">
                    <div className="knapperad__element">
                        <Hovedknapp onClick={() => { bekreftNyNaermesteLeder(); }}>
                            {texts.nyNaermestelederInfoboks.buttonConfirm}
                        </Hovedknapp>
                    </div>
                    <div className="knapperad__element">
                        <button
                            className="lenke"
                            onClick={() => { this.apneBekreftelse(); }}>
                            {texts.nyNaermestelederInfoboks.buttonWrongLeader}
                        </button>
                    </div>
                </div>
            </OppfolgingsplanInnholdboks>
        </div>);
    }
}

NyNaermestelederInfoboks.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    avkreftNyNaermesteleder: PropTypes.func,
    bekreftNyNaermesteLeder: PropTypes.func,
};

export default NyNaermestelederInfoboks;
