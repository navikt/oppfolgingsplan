import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsplanInnholdboks from '../../../js/components/app/OppfolgingsplanInnholdboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsplanInnholdboks', () => {
  const tittel = 'tittel';
  const komponent = shallow(<OppfolgingsplanInnholdboks tittel={tittel} />);

  it('Viser en div', () => {
    expect(komponent.find('div.panel')).to.have.length(1);
  });
});
