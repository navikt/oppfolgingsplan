import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Alertstripe from 'nav-frontend-alertstriper';
import TiltakVarselVurdering from '../../../../../js/components/oppfolgingsplan/tiltak/liste/TiltakVarselVurdering';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TiltakVarselVudering', () => {
  let komponent;

  beforeEach(() => {
    komponent = shallow(
      <TiltakVarselVurdering
        tekst="TiltakVarselVurdering"
        rootUrl="/oppfolgingsplan"
      />
    );
  });

  it('Skal vise en Alertstripe', () => {
    expect(komponent.find(Alertstripe)).to.have.length(1);
  });
});
