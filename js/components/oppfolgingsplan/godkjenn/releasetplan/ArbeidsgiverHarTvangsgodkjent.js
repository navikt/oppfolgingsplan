import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import getContextRoot from '../../../../utils/getContextRoot';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import PlanEkspanderbar from '../PlanEkspanderbar';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';

const texts = {
  title: 'Lederen din har laget en oppfølgingsplan',
  paragraphInfo: 'Hvis du er uenig i innholdet, må du snakke med lederen din.',
  buttonConfirm: 'Videre',
};

class ArbeidsgiverHarTvangsgodkjent extends Component {
  render() {
    const { oppfolgingsdialog, markerMottattTvungenGodkjenning } = this.props;

    return (
      <OppfolgingsplanInnholdboks
        liteikon
        svgUrl={`${getContextRoot()}/img/svg/varseltrekant.svg`}
        svgAlt=""
        tittel={texts.title}
      >
        <div className="arbeidsgiverHarTvangsgodkjent">
          <p>{texts.paragraphInfo}</p>
          <PlanEkspanderbar oppfolgingsplan={oppfolgingsdialog} />

          <div className="knapperad">
            <div className="knapperad__element">
              <Hovedknapp onClick={markerMottattTvungenGodkjenning}>{texts.buttonConfirm}</Hovedknapp>
            </div>
          </div>
        </div>
      </OppfolgingsplanInnholdboks>
    );
  }
}

ArbeidsgiverHarTvangsgodkjent.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  markerMottattTvungenGodkjenning: PropTypes.func,
};

export default ArbeidsgiverHarTvangsgodkjent;
