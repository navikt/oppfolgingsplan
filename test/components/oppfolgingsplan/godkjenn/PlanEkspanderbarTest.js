import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PlanEkspanderbar from '../../../../js/components/oppfolgingsplan/godkjenn/PlanEkspanderbar';
import GodkjennPlanOversiktInformasjon from '../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanOversiktInformasjon';
import getOppfolgingsdialog from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('PlanEkspanderbar', () => {
  const oppfolgingsdialog = getOppfolgingsdialog({
    arbeidsgiver: {
      naermesteLeder: {
        navn: 'Test Testesen',
      },
    },
    arbeidstaker: {
      navn: 'Test Testesen',
    },
  });
  const komponent = shallow(
    <PlanEkspanderbar oppfolgingsdialog={oppfolgingsdialog} />
  );

  it('Skal vise et Ekspanderbartpanel', () => {
    expect(komponent.find(Ekspanderbartpanel)).to.have.length(1);
  });

  it('Skal vise en GodkjennPlanOversiktInformasjon', () => {
    expect(komponent.find(GodkjennPlanOversiktInformasjon)).to.have.length(1);
  });
});
