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
        lagreSkjema,
        visLagreSkjema,
        sendSlett,
        lagreKommentarSkjema,
        visLagreKommentarSkjema,
    }) => {
    const aktoerHarOpprettetElement = fnr === (element.opprettetAv && element.opprettetAv.fnr);
    return (
        <div className="knapperad__tiltak knapperad--justervenstre">
            { !lagreSkjema && aktoerHarOpprettetElement &&
            <div className="knapperad__element">
                <button
                    className="knapp--endre knapp--tiltak--endre"
                    type="button"
                    onClick={(event) => { visLagreSkjema(event); }}>
                    {texts.buttonEdit}
                </button>
            </div>
            }
            { aktoerHarOpprettetElement &&
            <div className="knapperad__element">
                <button
                    className="knapp--slett"
                    type="button"
                    onClick={(event) => { sendSlett(event, element.tiltakId); }}
                    aria-pressed={visLagreSkjema}>
                    {texts.buttonDelete}
                </button>
            </div>
            }
            { !lagreKommentarSkjema &&
            <div className="knapperad__element">
                <Knapp
                    mini
                    autoFocus={!skalVurdereTiltak(element, fnr)}
                    onClick={(event) => { visLagreKommentarSkjema(event); }}>
                    {texts.buttonComment}
                </Knapp>
            </div>
            }
        </div>
    );
};
TiltakInformasjonKnapper.propTypes = {
    element: tiltakPt,
    fnr: PropTypes.string,
    lagreSkjema: PropTypes.bool,
    visLagreSkjema: PropTypes.func,
    sendSlett: PropTypes.func,
    lagreKommentarSkjema: PropTypes.bool,
    visLagreKommentarSkjema: PropTypes.func,
};

export default TiltakInformasjonKnapper;
