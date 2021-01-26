import React from 'react';
import PropTypes from 'prop-types';
import Datovelger from '../../skjema/Datovelger';
import { restdatoTildato } from '../../../utils/datoUtils';
import { tiltakPt } from '../../../propTypes/opproptypes';
import {
    tiltakSkjemaFelterPt,
    tiltakSkjemaFeltPt,
} from '../../../propTypes/tiltakproptypes';

export const TiltakDatovelgerFelt = (
    {
        felt,
        dato,
    }) => {
    return (
        <div className="tiltakSkjema__datovelger__felt">
            <label htmlFor={felt.navn}>{felt.tekst}</label>
            <Datovelger
                id={felt.navn}
                dato={dato ? restdatoTildato(dato) : null}
            />
        </div>
    );
};
TiltakDatovelgerFelt.propTypes = {
    felt: tiltakSkjemaFeltPt,
    dato: PropTypes.string,
};

const TiltakDatovelger = (
    {
        tiltak,
        felter,
    }) => {
    return (
        <div className="tiltakSkjema__datovelger">
            <div className="tiltakSkjema__datovelger__rad">
                <TiltakDatovelgerFelt
                    felt={felter.startdato}
                    dato={tiltak && tiltak.fom ? tiltak.fom : null}
                />

                <TiltakDatovelgerFelt
                    felt={felter.sluttdato}
                    dato={tiltak && tiltak.tom ? tiltak.tom : null}
                />
            </div>
        </div>
    );
};
TiltakDatovelger.propTypes = {
    felter: tiltakSkjemaFelterPt,
    tiltak: tiltakPt,
};

export default TiltakDatovelger;

