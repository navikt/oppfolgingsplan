import React from 'react';
import PropTypes from 'prop-types';
import GodkjentPlanDelKnapper from './GodkjentPlanDelKnapper';
import {
    delMedFastlegePt,
    delmednavPt,
    oppfolgingsplanPt,
} from '../../../../propTypes/opproptypes';

const InnholdboksPilDelplan = (
    {
        oppfolgingsdialog,
        delmednav,
        delMedNavFunc,
        fastlegeDeling,
        delMedFastlege,
    }) => {
    return (<GodkjentPlanDelKnapper
        className="innholdboksPil"
        oppfolgingsdialog={oppfolgingsdialog}
        delmednav={delmednav}
        delMedNavFunc={delMedNavFunc}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
    />);
};

InnholdboksPilDelplan.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    delmednav: delmednavPt,
    delMedNavFunc: PropTypes.func,
    fastlegeDeling: delMedFastlegePt,
    delMedFastlege: PropTypes.func,
};

export default InnholdboksPilDelplan;
