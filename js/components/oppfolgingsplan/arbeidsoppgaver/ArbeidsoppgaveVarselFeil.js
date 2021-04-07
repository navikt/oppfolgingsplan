import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Alertstripe from 'nav-frontend-alertstriper';
import { erHerokuApp } from '../../../utils/urlUtils';

const AlertstripeStyled = styled(Alertstripe)`
  margin-top: 1em;
`;

const ArbeidsoppgaveVarselFeil = ({ tekst }) => {
  return (
    <div className="arbeidsoppgave__opprettet--feilmelding">
      <AlertstripeStyled className="alertstripe--notifikasjonboks" type="advarsel">
        {erHerokuApp() ? 'Denne funksjonen virker ikke på testsiden' : tekst}
      </AlertstripeStyled>
    </div>
  );
};
ArbeidsoppgaveVarselFeil.propTypes = {
  tekst: PropTypes.string,
};

export default ArbeidsoppgaveVarselFeil;
