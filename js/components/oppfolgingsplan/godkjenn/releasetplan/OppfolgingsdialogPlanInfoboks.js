import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';

const texts = {
  title: 'Hva skjer nå?',
  info: {
    paragraph1: `
            Innen fire uker skal fastlegen din få se planen. Du og lederen din kan dele den med både legen og NAV når dere er blitt enige.
        `,
    paragraph2: 'OBS: NAV kan ikke se planen før dere har delt den.',
  },
};

const OppfolgingsdialogPlanInfoboks = () => {
  return (
    <AlertStripe type="info" className="alertstripe--notifikasjonboks">
      <h3 className="panel__tittel">{texts.title}</h3>
      <p>
        {texts.info.paragraph1}
        <br />
        <br />
        {texts.info.paragraph2}
      </p>
    </AlertStripe>
  );
};

export default OppfolgingsdialogPlanInfoboks;
