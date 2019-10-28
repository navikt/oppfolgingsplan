import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue, togglesPt, sykeforlopsPerioderReducerPt } from 'digisyfo-npm';
import {
    SideOverskrift,
    NavigasjonsTopp,
    BRUKERTYPE,
    Godkjenn,
    Godkjenninger,
    Samtykke,
    AvbruttGodkjentPlanVarsel,
    finnOgHentVirksomheterSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentKontaktinfoSomMangler,
    finnOgHentNaermesteLedereSomMangler,
    finnOgHentForrigeNaermesteLedereSomMangler,
    finnOgHentArbeidsforholdSomMangler,
    finnOgHentSykeforlopsPerioderSomMangler,
} from 'oppfolgingsdialog-npm';
import * as oppfolgingsplanProptypes from '../../propTypes/opproptypes';
import {
    harNaermesteLeder,
    inneholderGodkjenninger,
    inneholderGodkjenningerAvArbeidstaker,
    inneholderGodkjentPlan,
    utenSamtykke,
} from '../../utils/oppfolgingsdialogUtils';
import getContextRoot from '../../utils/getContextRoot';
import Arbeidsoppgaver from './arbeidsoppgaver/Arbeidsoppgaver';
import NavigasjonsBunn from './NavigasjonsBunn';
import ReleasetPlanAT from './godkjenn/releasetplan/ReleasetPlanAT';
import IngenlederInfoboks from '../oppfolgingsdialoger/IngenlederInfoboks';
import Tiltak from './tiltak/Tiltak';

const skalViseSamtykke = (oppfolgingsdialog) => {
    return harNaermesteLeder(oppfolgingsdialog)
        && utenSamtykke(oppfolgingsdialog)
        && (inneholderGodkjentPlan(oppfolgingsdialog) || inneholderGodkjenningerAvArbeidstaker(oppfolgingsdialog));
};

export const erAvvistAvArbeidstaker = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length === 1 && !oppfolgingsdialog.godkjenninger[0].godkjent &&
        oppfolgingsdialog.arbeidstaker.fnr === oppfolgingsdialog.godkjenninger[0].godkjentAv.fnr;
};

class Oppfolgingsdialog extends Component {
    componentWillMount() {
        const { oppfolgingsdialog, virksomhet, person, kontaktinfo, forrigenaermesteleder, naermesteleder,
            hentForrigeNaermesteLeder, hentVirksomhet, hentPerson, hentNaermesteLeder, hentKontaktinfo,
            arbeidsforhold, hentArbeidsforhold, sykeforlopsPerioderReducer, hentSykeforlopsPerioder } = this.props;
        this.props.settDialog(oppfolgingsdialog.id);
        finnOgHentVirksomheterSomMangler([oppfolgingsdialog], virksomhet, hentVirksomhet);
        finnOgHentPersonerSomMangler([oppfolgingsdialog], person, hentPerson);
        finnOgHentForrigeNaermesteLedereSomMangler([oppfolgingsdialog], forrigenaermesteleder, hentForrigeNaermesteLeder);
        finnOgHentNaermesteLedereSomMangler([oppfolgingsdialog], naermesteleder, hentNaermesteLeder);
        finnOgHentKontaktinfoSomMangler([oppfolgingsdialog], kontaktinfo, hentKontaktinfo);
        finnOgHentArbeidsforholdSomMangler([oppfolgingsdialog], arbeidsforhold, hentArbeidsforhold);
        finnOgHentSykeforlopsPerioderSomMangler([oppfolgingsdialog], sykeforlopsPerioderReducer, hentSykeforlopsPerioder);
    }

    render() {
        const {
            arbeidsoppgaver,
            tiltak,
            lagreKommentar,
            slettKommentar,
            oppfolgingsdialog,
            ledetekster,
            settAktivtSteg,
            avvisDialog,
            dokument,
            godkjennDialog,
            hentPdfurler,
            giSamtykke,
            navigasjontoggles,
            nullstillGodkjenning,
            avbrytDialog,
            lagreTiltak,
            slettTiltak,
            lagreArbeidsoppgave,
            slettArbeidsoppgave,
            toggles,
            delMedNavFunc,
            delmednav,
            fastlegeDeling,
            delMedFastlege,
            forespoerselRevidering,
            forespoerRevidering,
            oppfolgingsdialoger,
        } = this.props;
        const oppfolgingsdialogAvbruttOgNyOpprettet = this.props.avbrytdialogReducer.sendt
            && (this.props.avbrytdialogReducer.nyPlanId === oppfolgingsdialog.id)
            && !inneholderGodkjenninger(oppfolgingsdialog);
        let panel;
        let disableNavigation = false;
        if (skalViseSamtykke(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<Samtykke
                sendSamtykke={giSamtykke}
                oppfolgingsdialog={oppfolgingsdialog}
                ledetekster={ledetekster}
                rootUrl={`${getContextRoot()}`}
            />);
        } else if (harNaermesteLeder(oppfolgingsdialog) && inneholderGodkjenninger(oppfolgingsdialog) && !erAvvistAvArbeidstaker(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<Godkjenninger
                avvisDialog={avvisDialog}
                oppfolgingsdialog={oppfolgingsdialog}
                godkjennPlan={godkjennDialog}
                ledetekster={ledetekster}
                nullstillGodkjenning={nullstillGodkjenning}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrl={`${getContextRoot()}`}
                rootUrlPlaner={`${getContextRoot()}`}
            />);
        } else if (harNaermesteLeder(oppfolgingsdialog) && inneholderGodkjentPlan(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<ReleasetPlanAT
                ledetekster={ledetekster}
                toggles={toggles}
                oppfolgingsdialog={oppfolgingsdialog}
                hentPdfurler={hentPdfurler}
                dokument={dokument}
                giSamtykke={giSamtykke}
                avbrytDialog={avbrytDialog}
                delMedNavFunc={delMedNavFunc}
                delmednav={delmednav}
                fastlegeDeling={fastlegeDeling}
                delMedFastlege={delMedFastlege}
                oppfolgingsdialoger={oppfolgingsdialoger}
            />);
        } else {
            (() => {
                if (navigasjontoggles.steg === 1) {
                    panel = (<Arbeidsoppgaver
                        arbeidsoppgaver={arbeidsoppgaver}
                        oppfolgingsdialog={oppfolgingsdialog}
                        lagreArbeidsoppgave={lagreArbeidsoppgave}
                        slettArbeidsoppgave={slettArbeidsoppgave}
                    />);
                } else if (navigasjontoggles.steg === 2) {
                    panel = (<Tiltak
                        tiltak={tiltak}
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        lagreTiltak={lagreTiltak}
                        slettTiltak={slettTiltak}
                        lagreKommentar={lagreKommentar}
                        slettKommentar={slettKommentar}
                    />);
                } else if (!harNaermesteLeder(oppfolgingsdialog)) {
                    panel = (<IngenlederInfoboks />);
                } else {
                    panel = (<Godkjenn
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        forespoerselRevidering={forespoerselRevidering}
                        forespoerRevidering={forespoerRevidering}
                        settAktivtSteg={settAktivtSteg}
                        godkjennPlan={godkjennDialog}
                        brukerType={BRUKERTYPE.ARBEIDSTAKER}
                        rootUrl={`${getContextRoot()}`}
                    />);
                }
            })();
        }

        return (<div className="oppfolgingsdialog">
            { oppfolgingsdialogAvbruttOgNyOpprettet &&
            <AvbruttGodkjentPlanVarsel
                tekst={getLedetekst('oppfolgingdialog.avbruttGodkjentPlanVarsel.opprettet-plan')}
                rootUrl={`${getContextRoot()}`}
            />
            }
            <SideOverskrift
                tittel={oppfolgingsdialog.virksomhet.navn}
            />
            { !disableNavigation && <NavigasjonsTopp
                ledetekster={ledetekster}
                disabled={disableNavigation}
                navn={oppfolgingsdialog.virksomhet.navn}
                settAktivtSteg={settAktivtSteg}
                steg={navigasjontoggles.steg}
            />
            }
            <div id="oppfolgingsdialogpanel">
                { panel }
            </div>
            <NavigasjonsBunn
                ledetekster={ledetekster}
                disabled={disableNavigation}
                settAktivtSteg={settAktivtSteg}
                steg={navigasjontoggles.steg}
                rootUrlPlaner={getContextRoot()}
            />
        </div>);
    }
}

Oppfolgingsdialog.propTypes = {
    ledetekster: keyValue,
    avbrytdialogReducer: oppfolgingsplanProptypes.avbrytplanReducerPt,
    arbeidsoppgaver: oppfolgingsplanProptypes.arbeidsoppgaverReducerPt,
    tiltak: oppfolgingsplanProptypes.tiltakReducerPt,
    oppfolgingsdialog: oppfolgingsplanProptypes.oppfolgingsplanPt,
    navigasjontoggles: oppfolgingsplanProptypes.navigasjonstogglesReducerPt,
    dokument: oppfolgingsplanProptypes.dokumentReducerPt,
    virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
    person: oppfolgingsplanProptypes.personReducerPt,
    forespoerselRevidering: oppfolgingsplanProptypes.forespoerselRevideringPt,
    forrigenaermesteleder: oppfolgingsplanProptypes.forrigenaermestelederReducerPt,
    naermesteleder: oppfolgingsplanProptypes.naermestelederReducerPt,
    kontaktinfo: oppfolgingsplanProptypes.kontaktinfoReducerPt,
    arbeidsforhold: oppfolgingsplanProptypes.arbeidsforholdReducerPt,
    sykeforlopsPerioderReducer: sykeforlopsPerioderReducerPt,
    fastlegeDeling: oppfolgingsplanProptypes.delMedFastlegePt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
    delmednav: oppfolgingsplanProptypes.delmednavPt,
    toggles: togglesPt,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
    delMedFastlege: PropTypes.func,
    delMedNavFunc: PropTypes.func,
    forespoerRevidering: PropTypes.func,
    godkjennDialog: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    avvisDialog: PropTypes.func,
    avbrytDialog: PropTypes.func,
    settDialog: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentKontaktinfo: PropTypes.func,
    hentPerson: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentArbeidsforhold: PropTypes.func,
    hentSykeforlopsPerioder: PropTypes.func,
};

export default Oppfolgingsdialog;
