import React from 'react';
import PropTypes from 'prop-types';
import { delMedFastlegePt, delmednavPt, oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import GodkjentPlan from './GodkjentPlan';
import GodkjentPlanAvbrutt from './GodkjentPlanAvbrutt';
import Samtykke from '../samtykke/Samtykke';
import OppfolgingsdialogPlanInfoboks from './OppfolgingsdialogPlanInfoboks';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';

const manglerSamtykke = (oppfolgingsdialog) => {
  return oppfolgingsdialog.arbeidstaker.samtykke === null;
};

const ReleasetPlan = ({
  oppfolgingsdialog,
  giSamtykke,
  avbrytDialog,
  rootUrl,
  rootUrlPlaner,
  delMedNavFunc,
  delmednav,
  fastlegeDeling,
  delMedFastlege,
  oppfolgingsdialoger,
}) => {
  if (manglerSamtykke(oppfolgingsdialog)) {
    return <Samtykke sendSamtykke={giSamtykke} oppfolgingsdialog={oppfolgingsdialog} rootUrl={rootUrl} />;
  } else if (oppfolgingsdialog.godkjentPlan && oppfolgingsdialog.godkjentPlan.avbruttPlan) {
    return (
      <GodkjentPlanAvbrutt
        oppfolgingsdialog={oppfolgingsdialog}
        oppfolgingsdialoger={oppfolgingsdialoger}
        delMedNavFunc={delMedNavFunc}
        delmednav={delmednav}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
        rootUrl={rootUrl}
        rootUrlPlaner={rootUrlPlaner}
      />
    );
  }
  return (
    <div>
      <GodkjentPlan
        oppfolgingsdialog={oppfolgingsdialog}
        avbrytDialog={avbrytDialog}
        delMedNavFunc={delMedNavFunc}
        delmednav={delmednav}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
        rootUrl={rootUrl}
        rootUrlPlaner={rootUrlPlaner}
      />
      <OppfolgingsdialogPlanInfoboks />
      <TidligereAvbruttePlaner oppfolgingsdialog={oppfolgingsdialog} rootUrlPlaner={rootUrlPlaner} />
    </div>
  );
};

ReleasetPlan.propTypes = {
  delmednav: delmednavPt,
  oppfolgingsdialog: oppfolgingsplanPt,
  fastlegeDeling: delMedFastlegePt,
  delMedNavFunc: PropTypes.func,
  giSamtykke: PropTypes.func,
  avbrytDialog: PropTypes.func,
  delMedFastlege: PropTypes.func,
  rootUrl: PropTypes.string,
  rootUrlPlaner: PropTypes.string,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
};

export default ReleasetPlan;
