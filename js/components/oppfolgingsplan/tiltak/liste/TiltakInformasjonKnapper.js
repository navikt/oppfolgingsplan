import React from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { tiltakPt } from '../../../../propTypes/opproptypes';
import { skalVurdereTiltak } from '../../../../utils/tiltakUtils';

const texts = {
    buttonComment: 'Kommenter',
    buttonDelete: 'Slett',
    buttonEdit: 'Endre',
};

const TiltakInformasjonKnapper = (
    {
        element,
        fnr,
        visLagreSkjema,
        sendSlett,
        lagreKommentarSkjema,
        visLagreKommentarSkjema,
    }) => {
    const aktoerHarOpprettetElement = fnr === (element.opprettetAv && element.opprettetAv.fnr);
    return (
        <div className="knapperad__tiltak knapperad--justervenstre">
            { !lagreKommentarSkjema &&
            <div className="knapperad__element">
                <Knapp
                    mini
                    autoFocus={!skalVurdereTiltak(element, fnr)}
                    onClick={visLagreKommentarSkjema}>
                    {texts.buttonComment}
                </Knapp>
            </div>
            }
            { aktoerHarOpprettetElement &&
            <div className="knapperad__element">
                <button
                    className="knapp--endre knapp--tiltak--endre"
                    type="button"
                    onClick={visLagreSkjema}>
                    {texts.buttonEdit}
                </button>
            </div>
            }
            { aktoerHarOpprettetElement &&
            <div className="knapperad__element">
                <button
                    className="knapp--slett"
                    type="button"
                    onClick={() => {
                        sendSlett(element.tiltakId);
                    }}
                    aria-pressed={visLagreSkjema}>
                    {texts.buttonDelete}
                </button>
            </div>
            }
        </div>
    );
};
TiltakInformasjonKnapper.propTypes = {
    element: tiltakPt,
    fnr: PropTypes.string,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
    lagreKommentarSkjema: PropTypes.bool,
    visLagreKommentarSkjema: PropTypes.func,
};

export default TiltakInformasjonKnapper;
