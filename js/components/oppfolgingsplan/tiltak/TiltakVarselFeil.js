import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { isLabs } from '@/utils/urlUtils';

const TiltakVarselFeil = ({ tekst }) => {
  return (
    <Alertstripe className="tiltakVarselFeil alertstripe--notifikasjonboks" type="advarsel">
      {isLabs() ? 'Denne funksjonen virker ikke på testsiden' : tekst}
    </Alertstripe>
  );
};
TiltakVarselFeil.propTypes = {
  tekst: PropTypes.string,
};

export default TiltakVarselFeil;
