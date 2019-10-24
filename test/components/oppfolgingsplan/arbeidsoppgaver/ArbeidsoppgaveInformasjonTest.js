import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ArbeidsoppgaveInformasjon, {
    ArbeidsoppgaveInformasjonInnhold,
    ArbeidsoppgaveInformasjonKnapper,
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

    it('Skal vise ArbeidsoppgaveInformasjonKnapper', () => {
        expect(komponent.find(ArbeidsoppgaveInformasjonKnapper)).to.have.length(1);
    });
});

describe('ArbeidsoppgaveInformasjonKnapper', () => {
    let komponent;
    let arbeidsoppgave;

    beforeEach(() => {
        arbeidsoppgave = {
            arbeidsoppgaveId: 1,
        };
    });

    it('Skal vise knapperad', () => {
        komponent = shallow(<ArbeidsoppgaveInformasjonKnapper
            element={arbeidsoppgave}
        />);
        expect(komponent.find('div.arbeidsoppgaveInformasjonKnapper.knapperad')).to.have.length(1);
    });
});
