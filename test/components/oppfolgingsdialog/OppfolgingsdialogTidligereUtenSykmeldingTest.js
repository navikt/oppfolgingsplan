import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import OppfolgingsdialogTidligereUtenSykmelding from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogTidligereUtenSykmelding';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogTidligereUtenSykmelding', () => {
    let oppfolgingslan;
    let komponent;

    beforeEach(() => {
        oppfolgingslan = getOppfolgingsdialog();
        komponent = shallow(<OppfolgingsdialogTidligereUtenSykmelding
            oppfolgingsdialog={oppfolgingslan}
        />);
    });

    it('Viser Lenkepanel', () => {
        expect(komponent.find(LenkepanelBase)).to.have.length(1);
    });

    it('Viser en span', () => {
        expect(komponent.find('span.oppfolgingsplanInnhold__ikon')).to.have.length(1);
    });

    it('Viser en div', () => {
        expect(komponent.find('div.inngangspanel__innhold')).to.have.length(1);
    });

    it('Viser en header', () => {
        expect(komponent.find('header.inngangspanel__header')).to.have.length(1);
    });

    it('Viser en h3', () => {
        expect(komponent.find('h3')).to.have.length(1);
    });

    it('Viser en span', () => {
        expect(komponent.find('span.inngangspanel__tittel')).to.have.length(1);
        expect(komponent.find('span.inngangspanel__tittel').text()).to.equal(oppfolgingslan.virksomhet.navn);
    });
});
