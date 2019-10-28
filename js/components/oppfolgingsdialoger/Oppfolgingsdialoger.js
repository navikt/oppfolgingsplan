import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import {
    getLedetekst,
    keyValue,
    togglesPt,
} from 'digisyfo-npm';
import {
    BRUKERTYPE,
    harTidligereOppfolgingsdialoger,
    AvbruttPlanNotifikasjonBoksAdvarsel,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    NyNaermestelederInfoboks,
    OppfolgingsdialogUtenSykmelding,
    OppfolgingsdialogerUtenAktivSykmelding,
} from 'oppfolgingsdialog-npm';
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
            ledetekster,
            avkreftLeder,
            bekreftetNyNaermesteLeder,
            bekreftNyNaermesteLeder,
            kopierOppfolgingsdialog,
            opprettOppfolgingsdialog,
            dinesykmeldinger,
            naermesteLedere,
            toggles,
        } = this.props;
        let panel;
        const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger, BRUKERTYPE.ARBEIDSTAKER);
        const oppfolgingsdialogMedNyNaermesteLeder = finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder(oppfolgingsdialoger);
        if (erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(oppfolgingsdialoger, dinesykmeldinger.data, naermesteLedere.data)) {
            panel = (<IngenledereInfoboks />);
        } else if (!bekreftetNyNaermesteLeder && oppfolgingsdialogMedNyNaermesteLeder) {
            panel = (<NyNaermestelederInfoboks
                ledetekster={ledetekster}
                oppfolgingsdialog={oppfolgingsdialogMedNyNaermesteLeder}
                avkreftNyNaermesteleder={avkreftLeder}
                bekreftNyNaermesteLeder={bekreftNyNaermesteLeder}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrlImg={getContextRoot()}
            />);
        } else if (!sykmeldtHarGyldigSykmelding(dinesykmeldinger.data)) {
            panel = (
                <div>
                    <div className="blokk--l">
                        <OppfolgingsdialogUtenSykmelding
                            ledetekster={ledetekster}
                            rootUrl={getContextRoot()}
                        />
                    </div>

                    {!isEmpty(oppfolgingsdialoger) && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
                    <OppfolgingsdialogerUtenAktivSykmelding
                        oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
                        tittel={getLedetekst('oppfolgingsdialoger.tidligereplaner.tittel')}
                        rootUrl={getContextRoot()}
                    />
                    }
                </div>);
        } else {
            panel = (
                <OppfolgingsdialogerVisning
                    ledetekster={ledetekster}
                    oppfolgingsdialoger={oppfolgingsdialoger}
                    dinesykmeldinger={dinesykmeldinger}
                    naermesteLedere={naermesteLedere}
                    kopierOppfolgingsdialog={kopierOppfolgingsdialog}
                    opprettOppfolgingsdialog={opprettOppfolgingsdialog}
                />
            );
        }
        return (<div>
            { toggles.data['syfotoggles.send.oppfoelgingsdialog.fastlege'] === 'false' &&
            <Alertstripe
                className="alertstripe--notifikasjonboks"
                type="info"
                solid
            >
                {getLedetekst('oppfolgingsdialog.oppfolgingsdialoger.notifikasjonboks.generell-info')}
            </Alertstripe>
            }

            { dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 &&
            <AvbruttPlanNotifikasjonBoksAdvarsel
                ledetekster={ledetekster}
                motpartnavn={dialogerAvbruttAvMotpartSidenSistInnlogging[0].sistEndretAv.navn}
                rootUrl={getContextRoot()}
            />
            }
            <Sidetopp
                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')}
            />
            <OppfolgingsdialogerInfoPersonvern
                ledetekster={ledetekster}
            />

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
    ledetekster: keyValue,
    toggles: togglesPt,
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
