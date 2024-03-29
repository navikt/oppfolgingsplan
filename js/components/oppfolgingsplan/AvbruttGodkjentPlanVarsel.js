import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';

const tekster = {
  varsel:
    'Du har åpnet oppfølgingsplanen for å endre den. Når du har gjort endringene, må du sende den til ny godkjenning hos den andre.',
};

const AvbruttGodkjentPlanVarsel = () => {
  return (
    <Alertstripe className="alertstripe--notifikasjonboks" type="info">
      {tekster.varsel}
    </Alertstripe>
  );
};

export default AvbruttGodkjentPlanVarsel;
