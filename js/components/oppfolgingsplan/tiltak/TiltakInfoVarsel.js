import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const TiltakInfoVarsel = ({ tekst }) => {
  return (
    <Alertstripe type="info" className="alertstripe--notifikasjonboks  alertstripe--notifikasjonboks--top-padded">
      {tekst}
    </Alertstripe>
  );
};
TiltakInfoVarsel.propTypes = {
  tekst: PropTypes.string,
};

export default TiltakInfoVarsel;
