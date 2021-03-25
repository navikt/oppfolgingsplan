import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import PlanEkspanderbar from '../../../js/components/oppfolgingsplan/godkjenn/PlanEkspanderbar';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialoger';
import ArbeidsgiverHarTvangsgodkjent from '../../../js/components/oppfolgingsplan/godkjenn/releasetplan/ArbeidsgiverHarTvangsgodkjent';
import OppfolgingsplanInnholdboks from '../../../js/components/app/OppfolgingsplanInnholdboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ArbeidsgiverHarTvangsgodkjent', () => {
  let component;
  const oppfolgingsdialog = getOppfolgingsdialog();

  it('Skal alltid vise OppfolgingsplanInnholdboks', () => {
    component = shallow(<ArbeidsgiverHarTvangsgodkjent oppfolgingsdialog={oppfolgingsdialog} />);
    expect(component.find(OppfolgingsplanInnholdboks)).to.have.length(1);
  });

  it('Skal alltid vise PlanEkspanderbar', () => {
    component = shallow(<ArbeidsgiverHarTvangsgodkjent oppfolgingsdialog={oppfolgingsdialog} />);
    expect(component.find(PlanEkspanderbar)).to.have.length(1);
  });
});
