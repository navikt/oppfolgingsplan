import React from 'react';
import PropTypes from 'prop-types';
import BildeTekstLinje from '../../../app/BildeTekstLinje';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';

const TextForcedApprovedOppfolgingsplan = ({ rootUrl, text, oppfolgingsplan }) => {
    return (
        <BildeTekstLinje
            imgUrl={`${rootUrl}/img/svg/report-problem-circle.svg`}
            imgAlt=""
            tekst={text}
        />
    );
};

TextForcedApprovedOppfolgingsplan.propTypes = {
    rootUrl: PropTypes.string,
    oppfolgingsplan: oppfolgingsplanPt,
};

export default TextForcedApprovedOppfolgingsplan;