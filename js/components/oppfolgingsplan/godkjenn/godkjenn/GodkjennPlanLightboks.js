import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import {
    fraInputdatoTilJSDato,
    sluttDatoSenereEnnStartDato,
} from '../../../../utils/datoUtils';
import { erIkkeOppfolgingsdialogUtfylt } from '../../../../utils/oppfolgingsdialogUtils';
import CheckboxSelvstendig from '../../../skjema/CheckboxSelvstendig';
import GodkjennPlanSkjemaDatovelger from './GodkjennPlanSkjemaDatovelger';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';

export const GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN = 'GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN';

export class GodkjennPlanLightboksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visIkkeUtfyltFeilmelding: false,
            opprettplan: 'true',
        };
        this.godkjennPlan = this.godkjennPlan.bind(this);
        this.handledChange = this.handledChange.bind(this);
    }

    componentDidMount() {
        this.props.initialize({
            opprettplan: 'true',
        });
        this.handleInitialize();
    }

    handleInitialize() {
        const initData = {};
        initData.startdato = window.sessionStorage.getItem('startdato');
        initData.sluttdato = window.sessionStorage.getItem('sluttdato');
        initData.evalueringsdato = window.sessionStorage.getItem('evalueringsdato');
        initData.opprettplan = true;
        this.props.initialize(initData);
    }

    godkjennPlan(values) {
        const { oppfolgingsdialog } = this.props;
        if (erIkkeOppfolgingsdialogUtfylt(oppfolgingsdialog)) {
            this.setState({
                visIkkeUtfyltFeilmelding: true,
            });
        } else {
            const gyldighetstidspunkt = {
                fom: new Date(fraInputdatoTilJSDato(values.startdato)),
                tom: new Date(fraInputdatoTilJSDato(values.sluttdato)),
                evalueres: new Date(fraInputdatoTilJSDato(values.evalueringsdato)),
            };
            this.props.godkjennPlan(gyldighetstidspunkt, this.state.opprettplan, oppfolgingsdialog.arbeidstaker.fnr);
        }
    }

    handledChange(e) {
        this.setState({
            opprettplan: e.target.value,
            visIkkeUtfyltFeilmelding: false,
        });
    }

    render() {
        const {
            avbryt,
            handleSubmit,
        } = this.props;
        return (<div className="panel godkjennPlanLightboks">
            <form onSubmit={handleSubmit(this.godkjennPlan)} className="godkjennPlanSkjema">
                <h2>{getLedetekst('oppfolgingsdialog.godkjennPlanLightboksAT.tittel')}</h2>

                <p>{getLedetekst('oppfolgingsdialog.godkjennPlanLightboksAT.tekst')}</p>

                <hr />

                <h3>{getLedetekst('oppfolgingsdialog.godkjennPlanLightboksAT.datovelger.tittel')}</h3>

                <GodkjennPlanSkjemaDatovelger />

                <hr />

                <div className="inputgruppe">
                    <div className="skjema__input">
                        <Field
                            className="checkboks"
                            id="godkjennInput"
                            name="godkjennInput"
                            component={CheckboxSelvstendig}
                            label={getLedetekst('oppfolgingsdialog.godkjennPlanLightboksAT.checkbox')}
                        />
                    </div>
                </div>

                <div className="knapperad">
                    <div className="knapperad__element">
                        <Hovedknapp htmlType="submit">
                            {getLedetekst('oppfolgingsdialog.knapp.send-godkjenning')}
                        </Hovedknapp>
                    </div>
                    <div className="knapperad__element">
                        <button
                            type="button"
                            className="lenke"
                            onClick={() => {
                                avbryt();
                            }}>
                            {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
                        </button>
                    </div>
                </div>
            </form>
        </div>);
    }
}

GodkjennPlanLightboksComponent.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    avbryt: PropTypes.func,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
    godkjennPlan: PropTypes.func,
};

const validate = (values) => {
    const feilmeldinger = {};

    if (values.startdato && values.sluttdato && !sluttDatoSenereEnnStartDato(values.startdato, values.sluttdato)) {
        feilmeldinger.sluttdato = 'Sluttdato må være etter startdato';
    }
    if (values.startdato && values.evalueringsdato && !sluttDatoSenereEnnStartDato(values.startdato, values.evalueringsdato)) {
        feilmeldinger.evalueringsdato = 'Evalueringsdato må være etter startdato';
    }
    if (!values.godkjennInput === true) {
        feilmeldinger.godkjennInput = 'Du må godkjenne planen for å komme videre';
    }
    return feilmeldinger;
};

export default reduxForm({
    form: GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN,
    validate,
})(GodkjennPlanLightboksComponent);
