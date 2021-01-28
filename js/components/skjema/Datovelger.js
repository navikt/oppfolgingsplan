import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Datepicker } from 'nav-datovelger';
import {toDatePrettyPrint} from '@navikt/digisyfo-npm';
import Feilmelding from './Feilmelding';
export const DATOVELGERFELT_SKJEMA = 'DATOVELGERFELT_SKJEMA';

export class DatoField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dato: props.dato ? props.dato : '',
        };
    }

    setDate(newDate) {
        this.setState({ dato: newDate });
    }

    render() {
        const { meta, input, id, tidligsteFom, senesteTom } = this.props;
        const inputProps = { name: id };
        const datepickerReduxInput = Object.assign({}, input, {
            value: this.state.dato,
            onChange: (newDate) => {
                    const prettyDate = toDatePrettyPrint(newDate);
                    this.setDate(prettyDate);
                    input.onChange(prettyDate);
            }
        });

        return (<div className="datovelger">
            <Datepicker
                inputId={id}
                inputProps={inputProps}
                minDate={tidligsteFom}
                maxDate={senesteTom}
                {...datepickerReduxInput}
            />
            <Feilmelding {...meta} />
        </div>);
    }
}

const Datovelger = (props) => {
    return (<Field
        component={DatoField}
        skjemanavn={DATOVELGERFELT_SKJEMA}
        validate={props.isFormSubmitted ? props.validateDato : undefined}
        {...props}
    />);
};

Datovelger.propTypes = {
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
    initialize: PropTypes.func,
};

export default Datovelger;