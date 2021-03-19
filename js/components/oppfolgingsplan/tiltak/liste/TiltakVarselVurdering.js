import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const TiltakVarselVurdering = ({ tekst }) => {
  return (
    <Alertstripe
      className="tiltakVurderingVarsel alertstripe--notifikasjonboks"
      type="info"
    >
      {tekst}
    </Alertstripe>
  );
};
TiltakVarselVurdering.propTypes = {
  tekst: PropTypes.string,
};

export default TiltakVarselVurdering;
