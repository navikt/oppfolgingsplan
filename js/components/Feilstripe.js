import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { isLabs } from '@/utils/urlUtils';

const Feilstripe = ({ vis, className }) => {
  const tekst = !isLabs()
    ? 'Beklager, det oppstod en feil! Vennligst prøv igjen senere.'
    : 'Denne funksjonen virker ikke på testsiden';
  return (
    <div aria-live="polite" role="alert">
      {vis ? (
        <Alertstripe type="advarsel" className={className}>
          <p className="sist">{tekst}</p>
        </Alertstripe>
      ) : null}
    </div>
  );
};

Feilstripe.propTypes = {
  vis: PropTypes.bool,
  className: PropTypes.string,
};

export default Feilstripe;
