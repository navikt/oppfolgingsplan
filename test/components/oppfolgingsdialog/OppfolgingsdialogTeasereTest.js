import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsdialogTeasere from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogTeasere';
import OppfolgingsdialogTeaser from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogTeaser';
import { getOppfolgingsdialoger } from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogTeasere', () => {
  const oppdialoger = getOppfolgingsdialoger;
  const tittel = 'tittel';
  const komponent = shallow(
    <OppfolgingsdialogTeasere
      oppfolgingsdialoger={oppdialoger}
      tittel={tittel}
    />
  );

  it('Viser en header', () => {
    expect(komponent.find('header')).to.have.length(1);
    expect(komponent.find('header').text()).to.contain(tittel);
  });

  it('Viser en OppfolgingsdialogTeasere per Oppfolgingsdialog', () => {
    expect(komponent.find(OppfolgingsdialogTeaser)).to.have.length(
      oppdialoger.length
    );
  });
});
