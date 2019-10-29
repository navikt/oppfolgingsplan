import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsdialogTeaser from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogTeaser';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogTeasere', () => {
    const oppdialoger = getOppfolgingsdialog();
    const komponent = shallow(<OppfolgingsdialogTeaser
        oppfolgingsdialog={oppdialoger}
    />);

    it('Viser en article', () => {
        expect(komponent.find('article')).to.have.length(1);
    });
});
