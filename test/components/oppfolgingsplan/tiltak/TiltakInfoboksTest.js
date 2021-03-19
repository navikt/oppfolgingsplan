import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import TiltakInfoboks, {
  tekster,
} from '../../../../js/components/oppfolgingsplan/tiltak/TiltakInfoboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TiltakInfoboks', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TiltakInfoboks />);
  });

  it('Skal vise Panel', () => {
    expect(component.find(Panel)).to.have.length(1);
  });

  it('Skal vise h3', () => {
    const tittel = component.find('h3');
    expect(tittel).to.have.length(1);
    expect(tittel.text()).to.be.equal(tekster.tittel);
  });

  it('Skal vise 1 Knapp', () => {
    const knapp = component.find(Knapp);
    expect(knapp).to.have.length(1);
  });
});
