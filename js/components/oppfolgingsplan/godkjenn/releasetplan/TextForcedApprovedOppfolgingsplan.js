import React from 'react';
import PropTypes from 'prop-types';
import BildeTekstLinje from '../../../app/BildeTekstLinje';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';

const texts = {
    tvungenGodkjenning: 'Planen er laget av arbeidsgiveren din. Er du uenig i innholdet, må du snakke med',
}

const TextForcedApprovedOppfolgingsplan = ({ rootUrl, oppfolgingsplan }) => {
    return (
        <BildeTekstLinje
            imgUrl={`${rootUrl}/img/svg/report-problem-circle.svg`}
            imgAlt=""
            tekst={`${texts.tvungenGodkjenning} ${oppfolgingsplan.arbeidsgiver.naermesteLeder.navn}.`}
        />
    );
};

TextForcedApprovedOppfolgingsplan.propTypes = {
    rootUrl: PropTypes.string,
    oppfolgingsplan: oppfolgingsplanPt,
};

export default TextForcedApprovedOppfolgingsplan;