import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';

const InfoVarsel = ({ tekst }) => {
    return (<Alertstripe
        className="alertstripe--notifikasjonboks"
        type="info">
        {tekst}
    </Alertstripe>);
};
InfoVarsel.propTypes = {
    tekst: PropTypes.string,
};

export default InfoVarsel;
