import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    dinesykmeldingerReducerPt,
    ledereReducerPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import {
    erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    isEmpty,
} from '../../utils/oppfolgingsdialogUtils';
import { sykmeldtHarGyldigSykmelding } from '../../utils/sykmeldingUtils';
import IngenledereInfoboks from './IngenledereInfoboks';
import OppfolgingsdialogerVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from './OppfolgingsdialogerInfoPersonvern';
import * as oppfolgingsplanProptypes from '../../propTypes/opproptypes';
import {
    finnOgHentNaermesteLedereSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentVirksomheterSomMangler,
} from '../../utils/reducerUtils';
import NotifikasjonBoksAdvarsel from './NotifikasjonBoksAdvarsel';
import OppfolgingsdialogUtenSykmelding from './OppfolgingsdialogUtenSykmelding';
import OppfolgingsdialogerUtenAktivSykmelding from './OppfolgingsdialogerUtenAktivSykmelding';

const texts = {
    pageTitle: 'Oppfølgingsplaner',
    noActiveSykmelding: {
        titleTidligerePlaner: 'Tidligere oppfølgingsplaner',
    },
    alertstripeDelMedNAVInfo: 'Det er for tiden ikke mulig å dele oppfølgingsplaner med fastlegen ' +
        'på grunn av endringer i registre utenfor NAV som ikke er varslet. Vi jobber med å tilpasse våre systemer.',
};

const textAlertstripeCancelledPlan = (counterPart) => {
    return `${counterPart} har startet en ny oppfølgingsplan. Den gamle er arkivert.`;
};

const alertstripeTexts = (cancelledPlaner) => {
    const alertTexts = [];

    alertTexts.push(texts.alertstripeDelMedNAVInfo);

    if (cancelledPlaner.length > 0) {
        alertTexts.push(textAlertstripeCancelledPlan(cancelledPlaner[0].arbeidstaker.navn));
    }

    return alertTexts;
};

class Oppfolgingsdialoger extends Component {
    componentWillMount() {
        const {
            oppfolgingsdialoger,
            virksomhet,
            person,
            naermesteleder,
            hentPerson,
            hentVirksomhet,
            hentNaermesteLeder,
        } = this.props;
        finnOgHentVirksomheterSomMangler(oppfolgingsdialoger, virksomhet, hentVirksomhet);
        finnOgHentPersonerSomMangler(oppfolgingsdialoger, person, hentPerson);
        finnOgHentNaermesteLedereSomMangler(oppfolgingsdialoger, naermesteleder, hentNaermesteLeder);

        window.sessionStorage.removeItem('hash');
    }

    render() {
        const {
            oppfolgingsdialoger = [],
            kopierOppfolgingsdialog,
            opprettOppfolgingsdialog,
            dinesykmeldinger,
            naermesteLedere,
        } = this.props;
        let panel;
        const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger);
        const allAlertstripeTexts = alertstripeTexts(dialogerAvbruttAvMotpartSidenSistInnlogging);
        if (erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(oppfolgingsdialoger, dinesykmeldinger.data, naermesteLedere.data)) {
            panel = (<IngenledereInfoboks />);
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
            { allAlertstripeTexts.length > 0 && <NotifikasjonBoksAdvarsel
                texts={allAlertstripeTexts}
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
    naermesteLedere: ledereReducerPt,
    person: oppfolgingsplanProptypes.personReducerPt,
    virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
    hentVirksomhet: PropTypes.func,
    hentPerson: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
};

export default Oppfolgingsdialoger;
