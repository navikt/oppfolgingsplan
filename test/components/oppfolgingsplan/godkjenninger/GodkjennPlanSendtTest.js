import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import GodkjennPlanSendt from '../../../../js/components/oppfolgingsplan/godkjenn/godkjenninger/GodkjennPlanSendt';
import OppfolgingsplanInnholdboks from '../../../../js/components/app/OppfolgingsplanInnholdboks';
import getOppfolgingsdialog from '../../../mock/mockOppfolgingsdialog';
import GodkjennPlanVenterInfo from '../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanVenterInfo';
import PlanEkspanderbar from '../../../../js/components/oppfolgingsplan/godkjenn/PlanEkspanderbar';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanSendt', () => {
  const oppfolgingsdialog = getOppfolgingsdialog({
    godkjenninger: [
      {
        godkjent: false,
        beskrivelse: 'Ikke godkjent fordi...',
        godkjentAv: {
          fnr: '1000000000000',
        },
      },
    ],
    arbeidsgiver: {
      naermesteLeder: {
        navn: 'Test Testesen',
      },
    },
    arbeidstaker: {
      navn: 'Test Testesen',
    },
  });
  const komponentDefault = shallow(
    <GodkjennPlanSendt oppfolgingsdialog={oppfolgingsdialog} />
  );

  it('Skal vise en GodkjentPlan', () => {
    expect(komponentDefault.find(OppfolgingsplanInnholdboks)).to.have.length(1);
  });

  it('Skal vise en innholdstekst', () => {
    expect(komponentDefault.find('p')).to.have.length(1);
  });

  it('Skal vise en PlanEkspanderbar ', () => {
    expect(komponentDefault.find(PlanEkspanderbar)).to.have.length(1);
  });

  it('Skal vise en knapp for aa trekke tilbake sendt godkjenning', () => {
    expect(komponentDefault.find('button.lenke')).to.have.length(1);
  });

  it('Skal vise GodkjennPlanVenterInfo', () => {
    expect(komponentDefault.find(GodkjennPlanVenterInfo)).to.have.length(1);
  });
});
