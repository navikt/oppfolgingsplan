import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import GodkjennPlanMottatt from './GodkjennPlanMottatt';
import GodkjennPlanAvslaatt from './GodkjennPlanAvslaatt';
import GodkjennPlanAvslaattOgGodkjent from './GodkjennPlanAvslaattOgGodkjent';

const harMangeGodkjenninger = (godkjenninger) => {
    return godkjenninger.length > 1;
};

const MottattGodkjenninger = ({ oppfolgingsdialog, godkjennPlan, nullstillGodkjenning, avvisDialog, rootUrl, rootUrlPlaner }) => {
    if (harMangeGodkjenninger(oppfolgingsdialog.godkjenninger)) {
        return (<GodkjennPlanAvslaattOgGodkjent
            avvisDialog={avvisDialog}
            godkjennPlan={godkjennPlan}
            oppfolgingsplan={oppfolgingsdialog}
            rootUrl={rootUrl}
        />);
    }

    const godkjenning = oppfolgingsdialog.godkjenninger[0];
    if (godkjenning.godkjent) {
        return (<GodkjennPlanMottatt
            avvisDialog={avvisDialog}
            godkjennPlan={godkjennPlan}
            oppfolgingsdialog={oppfolgingsdialog}
            rootUrl={rootUrl}
            rootUrlPlaner={rootUrlPlaner}
        />);
    }
    return (<GodkjennPlanAvslaatt
        nullstillGodkjenning={nullstillGodkjenning}
        oppfolgingsdialog={oppfolgingsdialog}
        rootUrl={rootUrl}
    />);
};

MottattGodkjenninger.propTypes = {
    oppfolgingsdialog: oppfolgingsplanPt,
    godkjennPlan: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    avvisDialog: PropTypes.func,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
};

export default MottattGodkjenninger;
