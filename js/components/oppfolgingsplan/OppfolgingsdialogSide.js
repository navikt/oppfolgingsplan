import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getLedetekst,
    keyValue,
    hentToggles,
    togglesPt,
    sykeforlopsPerioderReducerPt,
    hentSykeforlopsPerioder,
} from 'digisyfo-npm';
import {
    dialogAvbruttOgNyOpprettet,
    finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt,
    erOppfolgingsdialogTidligere,
    erOppfolgingsdialogKnyttetTilGyldigSykmelding,
} from 'oppfolgingsdialog-npm';
import getContextRoot from '../../utils/getContextRoot';
import history from '../../history';
import Side from '../../sider/Side';
import AppSpinner from '../AppSpinner';
import Feilmelding from '../Feilmelding';
import { populerPlanFraState } from '../../utils/stateUtils';
import { getOppfolgingsdialog } from '../../utils/oppfolgingsdialogUtils';
import Oppfolgingsdialog from './Oppfolgingsdialog';
import { hentArbeidsforhold } from '../../actions/oppfolgingsplan/arbeidsforhold_actions';
import {
    lagreArbeidsoppgave,
    slettArbeidsoppgave,
} from '../../actions/oppfolgingsplan/arbeidsoppgave_actions';
import { avbrytDialog } from '../../actions/oppfolgingsplan/avbrytdialog_actions';
import { delMedFastlege } from '../../actions/oppfolgingsplan/delMedFastlege_actions';
import { delMedNav as delMedNavFunc } from '../../actions/oppfolgingsplan/delmednav_actions';
import { hentPdfurler } from '../../actions/oppfolgingsplan/dokument_actions';
import { forespoerRevidering } from '../../actions/oppfolgingsplan/forespoerRevidering_actions';
import { hentForrigeNaermesteLeder } from '../../actions/oppfolgingsplan/forrigeNaermesteLeder_actions';
import { hentKontaktinfo } from '../../actions/oppfolgingsplan/kontaktinfo_actions';
import {
    lagreKommentar,
    slettKommentar,
} from '../../actions/oppfolgingsplan/kommentar_actions';
import {
    avvisDialog,
    godkjennDialog,
    hentOppfolgingsdialoger,
} from '../../actions/oppfolgingsplan/oppfolgingsdialog_actions';
import { hentNaermesteLeder } from '../../actions/oppfolgingsplan/naermesteLeder_actions';
import { nullstillGodkjenning } from '../../actions/oppfolgingsplan/nullstillGodkjenning_actions';
import { hentPerson } from '../../actions/oppfolgingsplan/person_actions';
import { giSamtykke } from '../../actions/oppfolgingsplan/samtykke_actions';
import { settDialog } from '../../actions/oppfolgingsplan/sett_actions';
import { sjekkTilgang } from '../../actions/oppfolgingsplan/sjekkTilgang_actions';
import { lagreTiltak, slettTiltak } from '../../actions/oppfolgingsplan/tiltak_actions';
import { settAktivtSteg } from '../../actions/oppfolgingsplan/toggle_actions';
import { hentVirksomhet } from '../../actions/oppfolgingsplan/virksomhet_actions';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import {
    henterEllerHarHentetOppfolgingsplaner,
    henterEllerHarHentetTilgang,
    henterEllerHarHentetToggles,
    oppfolgingsplanHarBlittAvbrutt,
} from '../../utils/reducerUtils';
import {
    brodsmule as brodsmulePt,
    dinesykmeldingerReducerPt,
} from '../../propTypes';
import * as oppfolgingsplanProptypes from '../../propTypes/opproptypes';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';

export class Container extends Component {
    componentWillMount() {
        const { toggles, tilgang, oppfolgingsdialogerReducer } = this.props;
        if (!henterEllerHarHentetToggles(toggles)) {
            this.props.hentToggles();
        }
        if (!henterEllerHarHentetTilgang(tilgang)) {
            this.props.sjekkTilgang();
        }
        if (!henterEllerHarHentetOppfolgingsplaner(oppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsdialoger();
        }
        this.props.hentDineSykmeldinger();
    }

    componentWillReceiveProps(nextProps) {
        const { oppfolgingsdialogerReducer, avbrytdialogReducer, dialogAvbruttOgNyOpprettetConnected } = this.props;
        if (oppfolgingsplanHarBlittAvbrutt(avbrytdialogReducer, nextProps.avbrytdialogReducer)) {
            this.props.hentOppfolgingsdialoger();
        }
        if (avbrytdialogReducer.sendt && oppfolgingsdialogerReducer.henter && nextProps.oppfolgingsdialogerReducer.hentet) {
            const nyOpprettetDialog = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(nextProps.oppfolgingsdialoger, nextProps.oppfolgingsdialog.virksomhet.virksomhetsnummer);
            if (nyOpprettetDialog) {
                dialogAvbruttOgNyOpprettetConnected(nyOpprettetDialog.id);
                history.push(`${getContextRoot()}/oppfolgingsplaner/${nyOpprettetDialog.id}`);
                window.location.hash = 'arbeidsoppgaver';
            }
        }
    }

    componentDidUpdate() {
        if (window.location.hash === '' && window.sessionStorage.getItem('hash')) {
            window.location.hash = window.sessionStorage.getItem('hash');
        }

        if (window.location.hash === '#arbeidsoppgaver' && this.props.navigasjontoggles.steg !== 1) {
            this.props.settAktivtSteg(1);
        }

        if (window.location.hash === '#tiltak' && this.props.navigasjontoggles.steg !== 2) {
            this.props.settAktivtSteg(2);
        }

        if (window.location.hash === '#godkjenn' && this.props.navigasjontoggles.steg !== 3) {
            this.props.settAktivtSteg(3);
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentet,
            hentingFeilet,
            sender,
            sendingFeilet,
            tilgang,
            navigasjontoggles,
            erOppfolgingsdialogTilgjengelig,
        } = this.props;
        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler} laster={(henter || sender || !hentet) && !(sendingFeilet || hentingFeilet)}>
            { (() => {
                if (henter || sender) {
                    return <AppSpinner />;
                } else if (hentingFeilet || sendingFeilet) {
                    return (<Feilmelding />);
                } else if (!erOppfolgingsdialogTilgjengelig) {
                    return (<OppfolgingsplanInfoboks
                        svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg`}
                        svgAlt="ikkeTilgang"
                        tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                    />);
                } else if (!tilgang.data.harTilgang) {
                    return (<OppfolgingsplanInfoboks
                        svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg`}
                        svgAlt="ikkeTilgang"
                        tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                        tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst')}
                    />);
                }
                return (<Oppfolgingsdialog
                    {...this.props}
                    steg={navigasjontoggles.steg}
                />);
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
    avbrytdialogReducer: oppfolgingsplanProptypes.avbrytplanReducerPt,
    arbeidsforhold: oppfolgingsplanProptypes.arbeidsforholdReducerPt,
    arbeidsoppgaver: oppfolgingsplanProptypes.arbeidsoppgaverReducerPt,
    dineSykmeldinger: dinesykmeldingerReducerPt,
    dokument: oppfolgingsplanProptypes.dokumentReducerPt,
    forespoerselRevidering: oppfolgingsplanProptypes.forespoerselRevideringPt,
    forrigenaermesteleder: oppfolgingsplanProptypes.forrigenaermestelederReducerPt,
    navigasjontoggles: oppfolgingsplanProptypes.navigasjonstogglesReducerPt,
    naermesteleder: oppfolgingsplanProptypes.naermestelederReducerPt,
    oppfolgingsdialogerReducer: oppfolgingsplanProptypes.oppfolgingsplanerAtPt,
    person: oppfolgingsplanProptypes.personReducerPt,
    tilgang: oppfolgingsplanProptypes.tilgangReducerPt,
    tiltak: oppfolgingsplanProptypes.tiltakReducerPt,
    virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
    ledetekster: keyValue,
    oppfolgingsdialog: oppfolgingsplanProptypes.oppfolgingsplanPt,
    sykeforlopsPerioder: sykeforlopsPerioderReducerPt,
    toggles: togglesPt,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    erOppfolgingsdialogTilgjengelig: PropTypes.bool,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
    hentArbeidsforhold: PropTypes.func,
    sjekkTilgang: PropTypes.func,
    hentPdfurler: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    delMedFastlege: PropTypes.func,
    delMedNav: PropTypes.func,
    forespoerRevidering: PropTypes.func,
    godkjennDialog: PropTypes.func,
    avvisDialog: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    avbrytDialog: PropTypes.func,
    dialogAvbruttOgNyOpprettetConnected: PropTypes.func,
    settDialog: PropTypes.func,
    hentDineSykmeldinger: PropTypes.func,
    hentToggles: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentPerson: PropTypes.func,
    hentKontaktinfo: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentSykeforlopsPerioder: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const id = ownProps.params.oppfolgingsdialogId;
    let oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, id);
    oppfolgingsdialog = oppfolgingsdialog && populerPlanFraState(oppfolgingsdialog, state);
    const erOppfolgingsdialogTilgjengelig = oppfolgingsdialog
        && (erOppfolgingsdialogTidligere(oppfolgingsdialog)
        || erOppfolgingsdialogKnyttetTilGyldigSykmelding(oppfolgingsdialog, state.dineSykmeldinger.data));

    return {
        henter: state.oppfolgingsdialoger.henter
            || state.ledetekster.henter
            || state.dineSykmeldinger.henter
            || state.tilgang.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet
            || state.ledetekster.hentingFeilet
            || state.dineSykmeldinger.hentingFeilet
            || state.tilgang.hentingFeilet,
        hentet: state.oppfolgingsdialoger.hentet
            || state.ledetekster.hentet
            || state.dineSykmeldinger.hentet
            || state.tilgang.hentet
            || state.oppfolgingsdialoger.avviser
            || state.oppfolgingsdialoger.godkjent
            || state.avbrytdialogReducer.sendt
            || state.nullstill.sendt,
        sender: state.oppfolgingsdialoger.avviser
            || state.oppfolgingsdialoger.godkjenner
            || state.avbrytdialogReducer.sender
            || state.nullstill.sender
            || state.samtykke.sender,
        sendingFeilet: state.oppfolgingsdialoger.avvisFeilet
            || state.oppfolgingsdialoger.godkjenningFeilet
            || state.avbrytdialogReducer.sendingFeilet
            || state.nullstill.sendingFeilet
            || state.samtykke.sendingFeilet,
        ledetekster: state.ledetekster.data,
        arbeidsforhold: state.arbeidsforhold,
        arbeidsoppgaver: state.arbeidsoppgaver,
        avbrytdialogReducer: state.avbrytdialogReducer,
        tiltak: state.tiltak,
        delmednav: state.delmednav,
        dokument: state.dokument,
        fastlegeDeling: state.fastlegeDeling,
        forespoerselRevidering: state.forespoerselRevidering,
        forrigenaermesteleder: state.forrigenaermesteleder,
        kontaktinfo: state.kontaktinfo,
        naermesteleder: state.naermesteleder,
        navigasjontoggles: state.navigasjontoggles,
        oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
        sykeforlopsPerioderReducer: state.sykeforlopsPerioder,
        person: state.person,
        dineSykmeldinger: state.dineSykmeldinger,
        tilgang: state.tilgang,
        toggles: state.toggles,
        oppfolgingsdialog,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        virksomhet: state.virksomhet,
        erOppfolgingsdialogTilgjengelig,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/sykefravaer',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel.arbeidstaker'),
            sti: '/oppfolgingsplaner',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialog.sidetittel.arbeidstaker'),
        }],
    };
}

export default connect(mapStateToProps, {
    lagreArbeidsoppgave,
    slettArbeidsoppgave,
    lagreTiltak,
    slettTiltak,
    lagreKommentar,
    slettKommentar,
    hentOppfolgingsdialoger,
    sjekkTilgang,
    godkjennDialog,
    avvisDialog,
    nullstillGodkjenning,
    settAktivtSteg,
    hentPdfurler,
    giSamtykke,
    settDialog,
    hentArbeidsforhold,
    avbrytDialog,
    dialogAvbruttOgNyOpprettetConnected: dialogAvbruttOgNyOpprettet,
    hentDineSykmeldinger,
    hentToggles,
    hentVirksomhet,
    hentPerson,
    hentKontaktinfo,
    hentForrigeNaermesteLeder,
    hentNaermesteLeder,
    hentSykeforlopsPerioder,
    delMedFastlege,
    delMedNavFunc,
    forespoerRevidering,
})(Container);