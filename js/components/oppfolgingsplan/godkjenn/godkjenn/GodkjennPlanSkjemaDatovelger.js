import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { datovelgerFeltPt } from '../../../../propTypes/tiltakproptypes';
import Datovelger from '../../../skjema/Datovelger';

export const FELTER = {
    fom: {
        navn: 'startdato',
        tekst: 'oppfolgingsdialog.godkjennplanskjema.datovelger.fom',
    },
    tom: {
        navn: 'sluttdato',
        tekst: 'oppfolgingsdialog.godkjennplanskjema.datovelger.tom',
    },
    evalueringinnen: {
        navn: 'evalueringsdato',
        tekst: 'oppfolgingsdialog.godkjennplanskjema.datovelger.evalueringInnen',
    },
};

export const GodkjennPlanSkjemaDatovelgerFelt = ({ felt }) => {
    return (
        <div className="skjemaelement godkjennPlanSkjema__datovelger__felt">
            <label
                className="skjemaelement__label"
                htmlFor={felt.navn}>
                {getLedetekst(felt.tekst)}
            </label>
            <Datovelger
                name={felt.navn}
                id={felt.navn}
                tidligsteFom={null}
                dato={window.sessionStorage.getItem(felt.navn)}
            />
        </div>
    );
};
GodkjennPlanSkjemaDatovelgerFelt.propTypes = {
    felt: datovelgerFeltPt,
};

const GodkjennPlanSkjemaDatovelger = () => {
    return (
        <div>
            <div className="godkjennPlanSkjema__datovelger__rad">
                <GodkjennPlanSkjemaDatovelgerFelt
                    felt={FELTER.fom}
                />

                <GodkjennPlanSkjemaDatovelgerFelt
                    felt={FELTER.tom}
                />

                <GodkjennPlanSkjemaDatovelgerFelt
                    felt={FELTER.evalueringinnen}
                />
            </div>
        </div>
    );
};

export default GodkjennPlanSkjemaDatovelger;