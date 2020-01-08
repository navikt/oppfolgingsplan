import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { arbeidsoppgavePt } from '../../../propTypes/opproptypes';

const texts = {
    buttonDelete: 'Slett',
    buttonEdit: 'Endre',
    buttonVurdering: 'Gi din vurdering',
};

const ArbeidsoppgaveInformasjonKnapperStyled = styled.div`
    padding-top: 1em;
    text-align: left;
    
    button {
        display: inline-block;
        margin-right: 1em;
    }
`;

const ArbeidsoppgaveInformasjonKnapper = (
    {
        arbeidsoppgave,
        fnr,
        visLagreSkjema,
        sendSlett,
    }) => {
    const elementId = arbeidsoppgave.arbeidsoppgaveId;
    const aktoerHarOpprettetElement = fnr === (arbeidsoppgave.opprettetAv && arbeidsoppgave.opprettetAv.fnr);
    return (
        <ArbeidsoppgaveInformasjonKnapperStyled className="arbeidsoppgaveInformasjonKnapper">
            <button
                type="button"
                className={`${arbeidsoppgave.gjennomfoering ? 'knapp--endre' : 'knapp knapp--standard'}`}
                aria-pressed={visLagreSkjema}
                onClick={visLagreSkjema}>
                {arbeidsoppgave.gjennomfoering
                    ? texts.buttonEdit
                    : texts.buttonVurdering
                }
            </button>
            { aktoerHarOpprettetElement &&
            <button
                type="button"
                onClick={(event) => { sendSlett(event, elementId); }}
                className="knapperad__element knapp--slett">
                {texts.buttonDelete}
            </button>
            }
        </ArbeidsoppgaveInformasjonKnapperStyled>);
};
ArbeidsoppgaveInformasjonKnapper.propTypes = {
    arbeidsoppgave: arbeidsoppgavePt,
    fnr: PropTypes.string,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
};

export default ArbeidsoppgaveInformasjonKnapper;
