import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Hovedknapp } from 'nav-frontend-knapper';
import OppfolgingsplanInnholdboks from '../../../../js/components/app/OppfolgingsplanInnholdboks';
import GodkjennPlanMottatt, {
  GodkjennPlanMottattKnapper,
} from '../../../../js/components/oppfolgingsplan/godkjenn/godkjenninger/GodkjennPlanMottatt';
import GodkjennPlanTilAltinnTekst from '../../../../js/components/oppfolgingsplan/godkjenn/godkjenninger/GodkjennPlanTilAltinnTekst';
import getOppfolgingsdialog from '../../../mock/mockOppfolgingsdialog';
import PlanEkspanderbar from '../../../../js/components/oppfolgingsplan/godkjenn/PlanEkspanderbar';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanMottatt', () => {
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
    <GodkjennPlanMottatt oppfolgingsdialog={oppfolgingsdialog} />
  );

  it('Skal vise en GodkjennPlanMottatt', () => {
    expect(komponentDefault.find(OppfolgingsplanInnholdboks)).to.have.length(1);
  });

  it('Skal vise en innholdstekst', () => {
    expect(komponentDefault.find('p')).to.have.length(1);
  });

  it('Skal vise GodkjennPlanTilAltinnTekst', () => {
    expect(komponentDefault.find(GodkjennPlanTilAltinnTekst)).to.have.length(1);
  });

  it('Skal vise en PlanEkspanderbar ', () => {
    expect(komponentDefault.find(PlanEkspanderbar)).to.have.length(1);
  });

  it('Skal vise et GodkjennPlanMottattKnapper', () => {
    expect(komponentDefault.find(GodkjennPlanMottattKnapper)).to.have.length(1);
  });

  describe('GodkjennPlanMottattKnapper', () => {
    const komponent = shallow(
      <GodkjennPlanMottattKnapper oppfolgingsdialog={oppfolgingsdialog} />
    );

    it('Skal vise en submit knapp', () => {
      expect(komponent.find(Hovedknapp)).to.have.length(1);
    });
  });
});
