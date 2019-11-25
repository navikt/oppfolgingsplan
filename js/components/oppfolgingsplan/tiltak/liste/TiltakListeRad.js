import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_TILTAK } from '../../../../konstanter';
import { tiltakPt } from '../../../../propTypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../../utils/datoUtils';

const texts = {
    status: {
        avtalt: 'Avtalt',
        ikkAktuelt: 'Ikke aktuelt',
        foreslatt: 'Foreslått',
    },
};

const TiltakListeRad = (
    {
        tiltak,
        erApen,
    }) => {
    let klasse = '';
    let status = '';

    switch (tiltak.status) {
        case STATUS_TILTAK.AVTALT:
            klasse = 'etikett--suksess';
            status = texts.status.avtalt;
            break;
        case STATUS_TILTAK.IKKE_AKTUELT:
            klasse = 'etikett--advarsel';
            status = texts.status.ikkAktuelt;
            break;
        default:
            klasse = 'etikett--fokus';
            status = texts.status.foreslatt;
            break;
    }

    return (
        <div className="tiltaktabell__rad__celle">
            { tiltak.fom && tiltak.tom && tiltak.status !== STATUS_TILTAK.IKKE_AKTUELT &&
            <p className="tiltaktabell__meta">{toDateMedMaanedNavn(tiltak.fom)} - {toDateMedMaanedNavn(tiltak.tom)}</p>
            }
            <div className="tiltaktabell__rad__navn">
                <span className="tiltak__rad__navn--tittel">
                    {tiltak.tiltaknavn}
                </span>
                <i className={`nav-frontend-chevron ${erApen ? 'chevron--opp' : 'chevron--ned'} chevron--stor`} />
            </div>
            { tiltak.status &&
            <div className={`tiltaktabell__rad__status etikett ${klasse}`} >
                <span className="typo-normal">
                    {status}
                </span>
            </div>
            }
        </div>);
};

TiltakListeRad.propTypes = {
    tiltak: tiltakPt,
    erApen: PropTypes.bool,
};

export default TiltakListeRad;
