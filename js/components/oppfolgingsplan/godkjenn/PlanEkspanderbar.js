import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import GodkjennPlanOversiktInformasjon from './godkjenn/GodkjennPlanOversiktInformasjon';
import getContextRoot from '../../../utils/getContextRoot';
import { oppfolgingsplanPt } from '../../../propTypes/opproptypes';

const PlanEkspanderbar = ({ oppfolgingsplan }) => {
  const texts = {
    plan: {
      title: 'Se planen',
    },
  };

  return (
    <Ekspanderbartpanel border tittel={texts.plan.title}>
      <GodkjennPlanOversiktInformasjon
        oppfolgingsdialog={oppfolgingsplan}
        rootUrl={getContextRoot()}
      />
    </Ekspanderbartpanel>
  );
};
PlanEkspanderbar.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
};

export default PlanEkspanderbar;
