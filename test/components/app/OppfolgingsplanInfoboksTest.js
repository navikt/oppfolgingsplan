import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import { Panel } from 'nav-frontend-paneler';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsplanInfoboks from '../../../js/components/app/OppfolgingsplanInfoboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsplanInfoboks', () => {
    const tittel = 'tittel';
    const komponent = shallow(<OppfolgingsplanInfoboks
        tittel={tittel}
    />);

    it('Viser et Panel', () => {
        expect(komponent.find(Panel)).to.have.length(1);
    });
});
