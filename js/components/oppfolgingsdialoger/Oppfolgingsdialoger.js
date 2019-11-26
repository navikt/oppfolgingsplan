import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    dinesykmeldingerReducerPt,
    ledereReducerPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import {
    harForrigeNaermesteLeder,
    harNaermesteLeder,
    isEmpty,
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
    finnTidligereOppfolgingsdialoger,
    finnBrukersSisteInnlogging,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    harTidligereOppfolgingsdialoger,
} from '../../utils/oppfolgingsdialogUtils';
import { sykmeldtHarGyldigSykmelding } from '../../utils/sykmeldingUtils';
import IngenledereInfoboks from './IngenledereInfoboks';
import getContextRoot from '../../utils/getContextRoot';
import OppfolgingsdialogerVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from './OppfolgingsdialogerInfoPersonvern';
import * as oppfolgingsplanProptypes from '../../propTypes/opproptypes';
import {
    finnOgHentForrigeNaermesteLedereSomMangler,
    finnOgHentNaermesteLedereSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentVirksomheterSomMangler,
} from '../../utils/reducerUtils';
import NyNaermestelederInfoboks from './NyNaermestelederInfoboks';
import AvbruttPlanNotifikasjonBoksAdvarsel from './AvbruttPlanNotifikasjonBoksAdvarsel';
import OppfolgingsdialogUtenSykmelding from './OppfolgingsdialogUtenSykmelding';
import OppfolgingsdialogerUtenAktivSykmelding from './OppfolgingsdialogerUtenAktivSykmelding';

const texts = {
    pageTitle: 'Oppfølgingsplaner',
    noActiveSykmelding: {
        titleTidligerePlaner: 'Tidligere oppfølgingsplaner',
    },
};

const finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder = (oppfolgingsdialoger) => {
    const sisteInnlogging = finnBrukersSisteInnlogging(oppfolgingsdialoger);
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return harForrigeNaermesteLeder(oppfolgingsdialog) &&
            harNaermesteLeder(oppfolgingsdialog) &&
            new Date(sisteInnlogging).toISOString().split('T')[0] <= new Date(oppfolgingsdialog.arbeidsgiver.naermesteLeder.aktivFom).toISOString().split('T')[0];
    })[0];
};

class Oppfolgingsdialoger extends Component {
    componentWillMount() {
        const {
            oppfolgingsdialoger,
            virksomhet,
            person,
            forrigenaermesteleder,
            naermesteleder,
            hentPerson,
            hentVirksomhet,
            hentNaermesteLeder,
            hentForrigeNaermesteLeder,
        } = this.props;
        finnOgHentVirksomheterSomMangler(oppfolgingsdialoger, virksomhet, hentVirksomhet);
        finnOgHentPersonerSomMangler(oppfolgingsdialoger, person, hentPerson);
        finnOgHentNaermesteLedereSomMangler(oppfolgingsdialoger, naermesteleder, hentNaermesteLeder);
        finnOgHentForrigeNaermesteLedereSomMangler(oppfolgingsdialoger, forrigenaermesteleder, hentForrigeNaermesteLeder);

        window.sessionStorage.removeItem('hash');
    }

    render() {
        const {
            oppfolgingsdialoger = [],
            avkreftLeder,
            bekreftetNyNaermesteLeder,
            bekreftNyNaermesteLeder,
            kopierOppfolgingsdialog,
            opprettOppfolgingsdialog,
            dinesykmeldinger,
            naermesteLedere,
        } = this.props;
        let panel;
        const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger);
        const oppfolgingsdialogMedNyNaermesteLeder = finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder(oppfolgingsdialoger);
        if (erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(oppfolgingsdialoger, dinesykmeldinger.data, naermesteLedere.data)) {
            panel = (<IngenledereInfoboks />);
        } else if (!bekreftetNyNaermesteLeder && oppfolgingsdialogMedNyNaermesteLeder) {
            panel = (<NyNaermestelederInfoboks
                oppfolgingsplan={oppfolgingsdialogMedNyNaermesteLeder}
                avkreftNyNaermesteleder={avkreftLeder}
                bekreftNyNaermesteLeder={bekreftNyNaermesteLeder}
            />);
        } else if (!sykmeldtHarGyldigSykmelding(dinesykmeldinger.data)) {
            panel = (
                <div>
                    <div className="blokk--l">
                        <OppfolgingsdialogUtenSykmelding />
                    </div>

                    {!isEmpty(oppfolgingsdialoger) && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
                    <OppfolgingsdialogerUtenAktivSykmelding
                        oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
                        tittel={texts.noActiveSykmelding.titleTidligerePlaner}
                    />
                    }
                </div>);
        } else {
            panel = (
                <OppfolgingsdialogerVisning
                    oppfolgingsdialoger={oppfolgingsdialoger}
                    dinesykmeldinger={dinesykmeldinger}
                    naermesteLedere={naermesteLedere}
                    kopierOppfolgingsdialog={kopierOppfolgingsdialog}
                    opprettOppfolgingsdialog={opprettOppfolgingsdialog}
                />
            );
        }
        return (<div>
            { dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 &&
            <AvbruttPlanNotifikasjonBoksAdvarsel
                motpartnavn={dialogerAvbruttAvMotpartSidenSistInnlogging[0].sistEndretAv.navn}
                rootUrl={getContextRoot()}
            />
            }
            <Sidetopp
                tittel={texts.pageTitle}
            />
            <OppfolgingsdialogerInfoPersonvern />

            {panel}
        </div>);
    }
}
Oppfolgingsdialoger.propTypes = {
    dinesykmeldinger: dinesykmeldingerReducerPt,
    naermesteleder: oppfolgingsplanProptypes.naermestelederReducerPt,
    forrigenaermesteleder: oppfolgingsplanProptypes.forrigenaermestelederReducerPt,
    naermesteLedere: ledereReducerPt,
    person: oppfolgingsplanProptypes.personReducerPt,
    virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
    bekreftetNyNaermesteLeder: PropTypes.bool,
    bekreftNyNaermesteLeder: PropTypes.func,
    avkreftLeder: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentPerson: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
};

export default Oppfolgingsdialoger;
