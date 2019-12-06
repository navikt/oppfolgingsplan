import React from 'react';
import PropTypes from 'prop-types';
import {
    gyldighetstidspunktPt,
    oppfolgingsplanPt,
} from '../../../propTypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../utils/datoUtils';
import BildeTekstLinje from '../../app/BildeTekstLinje';

const GodkjennPlanTidspunkt = ({ rootUrl, gyldighetstidspunkt }) => {
    return (gyldighetstidspunkt &&
        <React.Fragment>
            <BildeTekstLinje
                imgUrl={`${rootUrl}/img/svg/calendar.svg`}
                alt="calendar"
                tekst={`Planens varighet: ${toDateMedMaanedNavn(gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(gyldighetstidspunkt.tom)}`}
            />
            <BildeTekstLinje
                imgUrl={`${rootUrl}/img/svg/bubble.svg`}
                alt="bubble"
                tekst={`Planen evalueres: ${toDateMedMaanedNavn(gyldighetstidspunkt.evalueres)}`}
            />
        </React.Fragment>
    );
};

GodkjennPlanTidspunkt.propTypes = {
    rootUrl: PropTypes.string,
    gyldighetstidspunkt: gyldighetstidspunktPt,
    avvisDialog: PropTypes.func,
    oppfolgingsdialog: oppfolgingsplanPt,
};

export default GodkjennPlanTidspunkt;
