import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    forespoerselRevideringPt,
    oppfolgingsplanPt,
} from '../../../../propTypes/opproptypes';
import GodkjennPlanOversiktInformasjon from './GodkjennPlanOversiktInformasjon';
import ReviderEllerGodkjennPlan from './ReviderEllerGodkjennPlan';
import GodkjennPlanLightboks from './GodkjennPlanLightboks';

class Godkjenn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visBekreftelse: false,
            visGodkjenPlanSkjema: false,
        };
        this.sendGodkjennPlan = this.sendGodkjennPlan.bind(this);
        this.visGodkjenPlanSkjema = this.visGodkjenPlanSkjema.bind(this);
        this.lukkGodkjenPlanSkjema = this.lukkGodkjenPlanSkjema.bind(this);
    }

    componentWillMount() {
        window.location.hash = 'godkjenn';
        window.sessionStorage.setItem('hash', 'godkjenn');
    }

    visGodkjenPlanSkjema() {
        this.setState({
            visGodkjenPlanSkjema: true,
        });
    }

    lukkGodkjenPlanSkjema() {
        this.setState({
            visGodkjenPlanSkjema: false,
        });
    }

    sendGodkjennPlan(gyldighetstidspunkt, status) {
        const { oppfolgingsdialog } = this.props;
        this.props.godkjennPlan(oppfolgingsdialog.id, gyldighetstidspunkt, status, oppfolgingsdialog.arbeidstaker.fnr);
    }

    render() {
        const {
            oppfolgingsdialog,
            forespoerselRevidering,
            forespoerRevidering,
            settAktivtSteg,
            rootUrl,
        } = this.props;
        return (<div>
            {
                (() => {
                    if (this.state.visGodkjenPlanSkjema) {
                        return (<GodkjennPlanLightboks
                            avbryt={this.lukkGodkjenPlanSkjema}
                            rootUrl={rootUrl}
                            oppfolgingsdialog={oppfolgingsdialog}
                            godkjennPlan={this.sendGodkjennPlan}
                        />);
                    }
                    return (<div className="godkjennPlanOversikt">
                        <GodkjennPlanOversiktInformasjon
                            oppfolgingsdialog={oppfolgingsdialog}
                            rootUrl={rootUrl}
                        />

                        <ReviderEllerGodkjennPlan
                            oppfolgingsdialog={oppfolgingsdialog}
                            rootUrl={rootUrl}
                            settAktivtSteg={settAktivtSteg}
                            visSendTilGodkjenning={this.visGodkjenPlanSkjema}
                            forespoerselRevidering={forespoerselRevidering}
                            forespoerRevidering={forespoerRevidering}
                        />
                    </div>);
                })()
            }
        </div>);
    }
}
Godkjenn.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    forespoerselRevidering: forespoerselRevideringPt,
    forespoerRevidering: PropTypes.func,
    godkjennPlan: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    rootUrl: PropTypes.string,
};

export default Godkjenn;