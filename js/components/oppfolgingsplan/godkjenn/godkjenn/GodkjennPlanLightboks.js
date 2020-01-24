import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    fraInputdatoTilJSDato,
    sluttDatoSenereEnnStartDato,
} from '../../../../utils/datoUtils';
import { erIkkeOppfolgingsdialogUtfylt } from '../../../../utils/oppfolgingsdialogUtils';
import CheckboxSelvstendig from '../../../skjema/CheckboxSelvstendig';
import GodkjennPlanSkjemaDatovelger from './GodkjennPlanSkjemaDatovelger';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import {
    getEndDateFromTiltakListe,
    getStartDateFromTiltakListe,
} from '../../../../utils/tiltakUtils';

const texts = {
    title: 'Send til lederen din for godkjenning',
    approvalInfo: `
        Når du har sendt planen, kan lederen din enten godkjenne den eller gjøre endringer og sende den tilbake til deg for ny godkjenning.
    `,
    titleDatovelger: 'Hvor lenge skal planen vare?',
    checkboxLabel: 'Jeg er enig i denne oppfølgingsplanen',
    buttonSend: 'Send til godkjenning',
    buttonCancel: 'Avbryt',
};

export const textDelMedNav = (leaderName) => {
    return <span>Jeg ønsker å dele planen med NAV når {leaderName} har godkjent planen</span>;
};
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
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.props.initialize({
            opprettplan: 'true',
        });
        this.handleInitialize(this.props.oppfolgingsdialog);
        window.scrollTo(0, this.formRef.current.offsetTop);
    }

    handleInitialize(oppfolgingsplan) {
        const initData = {};
        initData.startdato = getStartDateFromTiltakListe(oppfolgingsplan.tiltakListe) || window.sessionStorage.getItem('startdato');
        initData.sluttdato = getEndDateFromTiltakListe(oppfolgingsplan.tiltakListe) || window.sessionStorage.getItem('sluttdato');
        initData.evalueringsdato = window.sessionStorage.getItem('evalueringsdato');
        initData.opprettplan = true;
        initData.delMedNav = false;
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
            this.props.godkjennPlan(gyldighetstidspunkt, this.state.opprettplan, values.delMedNav);
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
            oppfolgingsdialog,
        } = this.props;
        return (<div ref={this.formRef} className="panel godkjennPlanLightboks">
            <form onSubmit={handleSubmit(this.godkjennPlan)} className="godkjennPlanSkjema">
                <h2>{texts.title}</h2>

                <p>{texts.approvalInfo}</p>

                <hr />

                <h3>{texts.titleDatovelger}</h3>

                <GodkjennPlanSkjemaDatovelger
                    oppfolgingsplan={oppfolgingsdialog}
                />

                <hr />

                <div className="inputgruppe">
                    <div className="skjema__input">
                        <Field
                            className="checkboks"
                            id="godkjennInput"
                            name="godkjennInput"
                            component={CheckboxSelvstendig}
                            label={texts.checkboxLabel}
                        />
                        <Field
                            className="checkboks"
                            id="delMedNav"
                            name="delMedNav"
                            component={CheckboxSelvstendig}
                            label={textDelMedNav(oppfolgingsdialog.arbeidsgiver.naermesteLeder.navn)}
                        />
                    </div>
                </div>

                <div className="knapperad">
                    <div className="knapperad__element">
                        <Hovedknapp htmlType="submit">
                            {texts.buttonSend}
                        </Hovedknapp>
                    </div>
                    <div className="knapperad__element">
                        <button
                            type="button"
                            className="lenke"
                            onClick={() => {
                                avbryt();
                            }}>
                            {texts.buttonCancel}
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
