import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ArbeidsoppgaveInformasjon, {
    ArbeidsoppgaveInformasjonInnhold,
} from '../../../../js/components/oppfolgingsplan/arbeidsoppgaver/ArbeidsoppgaveInformasjon';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ArbeidsoppgaveInformasjon', () => {
    let komponent;
    const element = {};

    beforeEach(() => {
        komponent = shallow(<ArbeidsoppgaveInformasjon
            element={element}
        />);
    });

    it('Skal vise ArbeidsoppgaveInformasjonInnhold', () => {
        expect(komponent.find(ArbeidsoppgaveInformasjonInnhold)).to.have.length(1);
    });
});
