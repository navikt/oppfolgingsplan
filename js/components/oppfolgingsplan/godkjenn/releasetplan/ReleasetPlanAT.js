import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { togglesPt } from '@navikt/digisyfo-npm';
import getContextRoot from '../../../../utils/getContextRoot';
import {
    delMedFastlegePt,
    delmednavPt,
    dokumentReducerPt,
    oppfolgingsplanPt,
} from '../../../../propTypes/opproptypes';
import ArbeidsgiverHarTvangsgodkjent from './ArbeidsgiverHarTvangsgodkjent';
import ReleasetPlan from './ReleasetPlan';

const foersteInnloggingSidenGodkjenning = (oppfolgingsdialog) => {
    return new Date(oppfolgingsdialog.arbeidstaker.sistInnlogget) < new Date(oppfolgingsdialog.godkjentPlan.opprettetTidspunkt);
};

const planBleTvangsgodkjent = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjentPlan.tvungenGodkjenning;
};

class ReleasetPlanAT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settTvungenGodkjenning: false,
        };
        this.markerMottattTvungenGodkjenning = this.markerMottattTvungenGodkjenning.bind(this);
    }

    markerMottattTvungenGodkjenning() {
        this.setState({ settTvungenGodkjenning: true });
    }

    render() {
        const {
            oppfolgingsdialog,
            hentPdfurler,
            dokument,
            giSamtykke,
            avbrytDialog,
            toggles,
            fastlegeDeling,
            delMedFastlege,
            delMedNavFunc,
            delmednav,
            oppfolgingsdialoger,
        } = this.props;
        if (!this.state.settTvungenGodkjenning && foersteInnloggingSidenGodkjenning(oppfolgingsdialog) && planBleTvangsgodkjent(oppfolgingsdialog)) {
            return (<ArbeidsgiverHarTvangsgodkjent
                oppfolgingsdialog={oppfolgingsdialog}
                hentPdfurler={hentPdfurler}
                dokument={dokument}
                markerMottattTvungenGodkjenning={this.markerMottattTvungenGodkjenning}
            />);
        }
        return (<ReleasetPlan
            toggles={toggles}
            oppfolgingsdialog={oppfolgingsdialog}
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            giSamtykke={giSamtykke}
            avbrytDialog={avbrytDialog}
            fastlegeDeling={fastlegeDeling}
            delMedFastlege={delMedFastlege}
            delMedNavFunc={delMedNavFunc}
            delmednav={delmednav}
            oppfolgingsdialoger={oppfolgingsdialoger}
            rootUrl={`${getContextRoot()}`}
            rootUrlPlaner={`${getContextRoot()}`}
        />);
    }
}

ReleasetPlanAT.propTypes = {
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    avbrytDialog: PropTypes.func,
    delMedFastlege: PropTypes.func,
    delMedNavFunc: PropTypes.func,
    dokument: dokumentReducerPt,
    oppfolgingsdialog: oppfolgingsplanPt,
    toggles: togglesPt,
    delmednav: delmednavPt,
    fastlegeDeling: delMedFastlegePt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
};

export default ReleasetPlanAT;

