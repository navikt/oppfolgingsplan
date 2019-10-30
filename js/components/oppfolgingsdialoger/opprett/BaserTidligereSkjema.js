import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Radioknapper from '../../skjema/Radioknapper';

export const BaserTidligereSkjemaComponent = (
    {
        handleSubmit,
    }) => {
    return (
        <form onSubmit={handleSubmit} className="baserTidligereSkjema">
            <label className="skjemaelement__label">
                {getLedetekst('oppfolgingsdialog.baserTidligereSkjema.spoersmaal')}
            </label>
            <Field
                name="baserPaaTidligerePlan"
                component={Radioknapper}>
                <input
                    value
                    label={getLedetekst('oppfolgingsdialog.baserTidligereSkjema.svar.ja')}
                    aria-labelledby="baserPaaTidligerePlan-overskrift"
                />
                <input
                    value={false}
                    label={getLedetekst('oppfolgingsdialog.baserTidligereSkjema.svar.nei')}
                    aria-labelledby="baserPaaTidligerePlan-overskrift"
                />
            </Field>
            <div className="knapperad">
                <Hovedknapp>
                    {getLedetekst('oppfolgingsdialog.baserTidligereSkjema.knapp.send')}
                </Hovedknapp>
            </div>
        </form>);
};

BaserTidligereSkjemaComponent.propTypes = {
    handleSubmit: PropTypes.func,
};

function validate(values) {
    const feilmeldinger = {};
    if (!values.baserPaaTidligerePlan) {
        feilmeldinger.baserPaaTidligerePlan = 'Velg alternativ';
    }

    return feilmeldinger;
}
const ReduxSkjema = reduxForm({
    form: 'BASER_PAA_TIDLIGERE_PLAN',
    validate,
})(BaserTidligereSkjemaComponent);

export default ReduxSkjema;
