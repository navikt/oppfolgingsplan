import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    hentToggles,
    togglesPt,
} from 'digisyfo-npm';
import * as oppfolgingsplanProptypes from '../../propTypes/opproptypes';
import { populerPlanFraState } from '../../utils/stateUtils';
import { kopierOppfolgingsdialog } from '../../actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';
import {
    hentOppfolgingsdialoger,
    opprettOppfolgingsdialog,
} from '../../actions/oppfolgingsplan/oppfolgingsdialog_actions';
import { hentForrigeNaermesteLeder } from '../../actions/oppfolgingsplan/forrigeNaermesteLeder_actions';
import { hentNaermesteLeder } from '../../actions/oppfolgingsplan/naermesteLeder_actions';
import { bekreftNyNaermesteLeder } from '../../actions/oppfolgingsplan/nyNaermesteleder_actions';
import { hentPerson } from '../../actions/oppfolgingsplan/person_actions';
import { sjekkTilgang } from '../../actions/oppfolgingsplan/sjekkTilgang_actions';
import { hentVirksomhet } from '../../actions/oppfolgingsplan/virksomhet_actions';
import getContextRoot from '../../utils/getContextRoot';
import Side from '../../sider/Side';
import Feilmelding from '../Feilmelding';
import AppSpinner from '../AppSpinner';
import history from '../../history';
import {
    brodsmule as brodsmulePt,
    dinesykmeldingerReducerPt,
    ledereReducerPt,
} from '../../propTypes';
import {
    henterEllerHarHentetLedere,
    henterEllerHarHentetOppfolgingsplaner,
    henterEllerHarHentetTilgang,
    henterEllerHarHentetToggles,
    lederHarBlittAvkreftet,
    oppfolgingsplanHarBlittOpprettet,
} from '../../utils/reducerUtils';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { avkreftLeder, hentLedere } from '../../actions/ledere_actions';
import Oppfolgingsdialoger from './Oppfolgingsdialoger';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';

export class Container extends Component {
    componentWillMount() {
        const {
            tilgang,
            naermesteLedere,
            oppfolgingsdialogerReducer,
            toggles,
        } = this.props;
        if (!henterEllerHarHentetTilgang(tilgang)) {
            this.props.sjekkTilgang();
        }
        this.props.hentDineSykmeldinger();
        if (!henterEllerHarHentetLedere(naermesteLedere)) {
            this.props.hentLedere();
        }
        if (!henterEllerHarHentetOppfolgingsplaner(oppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsdialoger();
        }
        if (!henterEllerHarHentetToggles(toggles)) {
            this.props.hentToggles();
        }
        window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
        window.sessionStorage.removeItem('startdato');
        window.sessionStorage.removeItem('sluttdato');
        window.sessionStorage.removeItem('evalueringsdato');
    }

    componentWillReceiveProps(nextProps) {
        const {
            kopierDialogReducer,
            oppfolgingsdialogerReducer,
            naermesteLedere,
        } = this.props;
        if (lederHarBlittAvkreftet(naermesteLedere, nextProps.naermesteLedere)) {
            this.props.hentLedere();
            this.props.hentOppfolgingsdialoger();
        }
        if (oppfolgingsplanHarBlittOpprettet(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsdialoger();
        }
        if (kopierDialogReducer.sender && nextProps.kopierDialogReducer.sendt) {
            this.props.hentOppfolgingsdialoger();
        }
        if (oppfolgingsdialogerReducer.opprettet && !oppfolgingsdialogerReducer.hentet && nextProps.oppfolgingsdialogerReducer.hentet) {
            history.push(`${getContextRoot()}/oppfolgingsplaner/${nextProps.oppfolgingsdialogerReducer.opprettetId}`);
            window.location.hash = 'arbeidsoppgaver';
            window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
        }
        if (kopierDialogReducer.sendt && !oppfolgingsdialogerReducer.hentet && nextProps.oppfolgingsdialogerReducer.hentet) {
            history.push(`${getContextRoot()}/oppfolgingsplaner/${nextProps.kopierDialogReducer.data}`);
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
            tilgang,
            hentet,
            sender,
            sendingFeilet,
        } = this.props;
        return (<Side tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} brodsmuler={brodsmuler} laster={(henter || sender || !hentet) && !(sendingFeilet || hentingFeilet)}>
            {
                (() => {
                    if (henter || sender) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || sendingFeilet) {
                        return (<Feilmelding />);
                    } else if (!tilgang.data.harTilgang) {
                        return (<OppfolgingsplanInfoboks
                            svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg`}
                            svgAlt="ikkeTilgang"
                            tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                            tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst')}
                        />);
                    }
                    return (<Oppfolgingsdialoger {...this.props} />);
                })()
            }
        </Side>);
    }
}

Container.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    dinesykmeldinger: dinesykmeldingerReducerPt,
    naermesteLedere: ledereReducerPt,
    kopierDialogReducer: oppfolgingsplanProptypes.kopierPlanReducerPt,
    oppfolgingsdialogerReducer: oppfolgingsplanProptypes.oppfolgingsplanerAtPt,
    person: oppfolgingsplanProptypes.personReducerPt,
    naermesteleder: oppfolgingsplanProptypes.naermestelederReducerPt,
    forrigenaermesteleder: oppfolgingsplanProptypes.forrigenaermestelederReducerPt,
    tilgang: oppfolgingsplanProptypes.tilgangReducerPt,
    virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
    toggles: togglesPt,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    avkreftLeder: PropTypes.func,
    bekreftNyNaermesteLeder: PropTypes.func,
    hentDineSykmeldinger: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    hentLedere: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    hentPerson: PropTypes.func,
    hentToggles: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
    sjekkTilgang: PropTypes.func,
};

export const mapStateToProps = (state) => {
    const oppfolgingsdialoger = state.oppfolgingsdialoger.data
        .map((oppfolgingsdialog) => {
            return populerPlanFraState(oppfolgingsdialog, state);
        });
    return {
        henter: state.ledetekster.henter
            || state.oppfolgingsdialoger.henter
            || state.tilgang.henter
            || state.dineSykmeldinger.henter
            || state.ledere.henter,
        hentingFeilet: state.ledetekster.hentingFeilet
            || state.oppfolgingsdialoger.hentingFeilet
            || state.tilgang.hentingFeilet
            || state.dineSykmeldinger.hentingFeilet
            || state.ledere.hentingFeilet,
        hentet: state.tilgang.hentet
            || state.dineSykmeldinger.hentet
            || state.ledere.hentet
            || state.oppfolgingsdialoger.hentet
            || state.ledere.avkreftet
            || state.oppfolgingsdialoger.opprettet,
        sender: state.oppfolgingsdialoger.oppretter
            || state.kopierDialogReducer.sender
            || state.ledere.avkrefter,
        sendingFeilet: state.oppfolgingsdialoger.hentingFeilet
            || state.kopierDialogReducer.sendingFeilet
            || state.ledere.avkreftFeilet,
        avkrefterLederReducer: state.ledere,
        dinesykmeldinger: state.dineSykmeldinger,
        naermesteleder: state.naermesteleder,
        forrigenaermesteleder: state.forrigenaermesteleder,
        kopierDialogReducer: state.kopierDialogReducer,
        naermesteLedere: state.ledere,
        oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
        person: state.person,
        tilgang: state.tilgang,
        toggles: state.toggles,
        virksomhet: state.virksomhet,
        bekreftetNyNaermesteLeder: state.nyNaermesteLeder.bekreftet,
        oppfolgingsdialoger,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/sykefravaer',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel.arbeidstaker'),
            sti: '/oppfolgingsplaner',
        }],
    };
};

export default connect(mapStateToProps, {
    hentOppfolgingsdialoger,
    sjekkTilgang,
    bekreftNyNaermesteLeder,
    avkreftLeder,
    hentDineSykmeldinger,
    hentLedere,
    hentVirksomhet,
    hentPerson,
    hentForrigeNaermesteLeder,
    hentNaermesteLeder,
    hentToggles,
    kopierOppfolgingsdialog,
    opprettOppfolgingsdialog,
})(Container);
