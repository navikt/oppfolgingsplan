import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { setLedetekster } from 'digisyfo-npm';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsdialogUtenSykmelding from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogUtenSykmelding';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogUtenSykmelding', () => {
    let oppdialoger;
    let komponent;
    let ledetekster;

    beforeEach(() => {
        oppdialoger = getOppfolgingsdialog();
        ledetekster = {
            'oppfolgingsdialoger.oppfolgingsdialoger.header.tittel': 'tittel',
            'oppfolgingsdialog.arbeidstaker.ingenledereInfoboks.tekst': 'tekst',
        };
        setLedetekster(ledetekster);
        komponent = shallow(<OppfolgingsdialogUtenSykmelding
            oppfolgingsdialog={oppdialoger}
        />);
    });

    it('Viser en div', () => {
        expect(komponent.find('div.oppfolgingsdialogUtenAktivSykmelding')).to.have.length(1);
    });

    it('Viser en header', () => {
        expect(komponent.find('header.oppfolgingsdialogUtenAktivSykmelding__header')).to.have.length(1);
        expect(komponent.find('h2').text()).to.equal('tittel');
    });

    it('Viser en div med klass blokk', () => {
        expect(komponent.find('div.oppfolgingsdialogUtenAktivSykmelding__blokk')).to.have.length(1);
    });

    it('Viser en img', () => {
        expect(komponent.find('img')).to.have.length(1);
    });

    it('Viser en div med klass innhold', () => {
        expect(komponent.find('div.inngangspanel__innhold')).to.have.length(1);
    });

    it('Viser en p', () => {
        expect(komponent.find('p.oppfolgingsdialoger__start_tekst')).to.have.length(1);
        expect(komponent.find('p.oppfolgingsdialoger__start_tekst').text()).to.equal('tekst');
    });
});

