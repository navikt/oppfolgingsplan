import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { arbeidsoppgavePt } from '../../../propTypes/opproptypes';

const texts = {
    buttonDelete: 'Slett',
    buttonEdit: 'Endre',
    buttonVurdering: 'Gi din vurdering',
};

const ArbeidsoppgaveButtonsRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 3fr;
    padding-top: 1em;
`;

const ArbeidsoppgaveInformasjonKnapper = (
    {
        arbeidsoppgave,
        fnr,
        lagreSkjema,
        visLagreSkjema,
        sendSlett,
    }) => {
    const elementId = arbeidsoppgave.arbeidsoppgaveId;
    const aktoerHarOpprettetElement = fnr === (arbeidsoppgave.opprettetAv && arbeidsoppgave.opprettetAv.fnr);
    return (
        <ArbeidsoppgaveButtonsRow>
            <div>
                {!lagreSkjema &&
                <button
                    type="button"
                    className={`${arbeidsoppgave.gjennomfoering ? 'knapp--endre' : 'knapp knapp--standard knapp--mini'}`}
                    aria-pressed={visLagreSkjema}
                    onClick={(event) => {
                        visLagreSkjema(event);
                    }}>
                    {arbeidsoppgave.gjennomfoering
                        ? texts.buttonEdit
                        : texts.buttonVurdering
                    }
                </button>
                }
            </div>
            <div>
                {aktoerHarOpprettetElement &&
                <button
                    type="button"
                    onClick={(event) => {
                        sendSlett(event, elementId);
                    }}
                    className="knapperad__element knapp--slett">
                    {texts.buttonDelete}
                </button>
                }
            </div>
        </ArbeidsoppgaveButtonsRow>);
};
ArbeidsoppgaveInformasjonKnapper.propTypes = {
    arbeidsoppgave: arbeidsoppgavePt,
    fnr: PropTypes.string,
    lagreSkjema: PropTypes.bool,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
};

export default ArbeidsoppgaveInformasjonKnapper;
