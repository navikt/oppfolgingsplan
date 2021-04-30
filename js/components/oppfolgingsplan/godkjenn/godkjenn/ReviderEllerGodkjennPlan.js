import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';
import { erArbeidstakerEgenLeder, erIkkeOppfolgingsdialogUtfylt } from '../../../../utils/oppfolgingsdialogUtils';
import IkkeUtfyltPlanFeilmelding from './IkkeUtfyltPlanFeilmelding';
import VeilederAvatar from '../../../app/VeilederAvatar';

const texts = {
  veileder: 'Er du ferdig med denne planen og ønsker å sende den til arbeidsgiveren din for godkjenning?',
  buttonGodkjenn: 'Jeg er ferdig',
  arbeidstakerLeaderSamePerson: {
    info: 'Fordi du er din egen leder, må du logge inn som arbeidsgiver for å fullføre planen.',
  },
};

export const ReviderEllerGodkjennPlanKnapperad = ({ godkjennPlan }) => {
  return (
    <div className="knapperad">
      <div className="knapperad__element">
        <Hovedknapp mini onClick={godkjennPlan}>
          {texts.buttonGodkjenn}
        </Hovedknapp>
      </div>
    </div>
  );
};
ReviderEllerGodkjennPlanKnapperad.propTypes = {
  godkjennPlan: PropTypes.func,
};

class ReviderEllerGodkjennPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visIkkeUtfyltFeilmelding: false,
    };
    this.godkjennPlan = this.godkjennPlan.bind(this);
  }

  godkjennPlan() {
    if (erIkkeOppfolgingsdialogUtfylt(this.props.oppfolgingsdialog)) {
      this.setState({
        visIkkeUtfyltFeilmelding: true,
      });
    } else {
      this.props.visSendTilGodkjenning();
    }
  }

  render() {
    const { oppfolgingsdialog, settAktivtSteg } = this.props;
    const visEgenLederVisning = erArbeidstakerEgenLeder(oppfolgingsdialog);
    return (
      <div className="godkjennPlanOversiktInformasjon">
        <div className="panel godkjennPlanOversiktInformasjon__panel">
          {visEgenLederVisning ? (
            <Alertstripe className="alertstripe--notifikasjonboks" type="info">
              {texts.arbeidstakerLeaderSamePerson.info}
            </Alertstripe>
          ) : (
            <React.Fragment>
              <Veilederpanel svg={<VeilederAvatar />}>{texts.veileder}</Veilederpanel>
              {this.state.visIkkeUtfyltFeilmelding && (
                <IkkeUtfyltPlanFeilmelding oppfolgingsdialog={oppfolgingsdialog} settAktivtSteg={settAktivtSteg} />
              )}
              <ReviderEllerGodkjennPlanKnapperad godkjennPlan={this.godkjennPlan} />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

ReviderEllerGodkjennPlan.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  settAktivtSteg: PropTypes.func,
  visSendTilGodkjenning: PropTypes.func,
};

export default ReviderEllerGodkjennPlan;
