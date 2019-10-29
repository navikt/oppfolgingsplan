import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsdialogerUtenAktivSykmelding from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogerUtenAktivSykmelding';
import OppfolgingsdialogTidligereUtenSykmelding from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogTidligereUtenSykmelding';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogerUtenAktivSykmelding', () => {
    let oppfolgingslan;
    let komponent;

    beforeEach(() => {
        oppfolgingslan = getOppfolgingsdialog();
        komponent = shallow(<OppfolgingsdialogerUtenAktivSykmelding
            oppfolgingsdialoger={[oppfolgingslan]}
            tittel="tittel"
        />);
    });

    it('Viser en div', () => {
        expect(komponent.find('div.blokk--l')).to.have.length(1);
    });

    it('Viser en header', () => {
        expect(komponent.find('header.oppfolgingsdialogTeasere__header')).to.have.length(1);
        expect(komponent.find('h2').text()).to.equal('tittel');
    });

    it('Viser en div med klass js-content', () => {
        expect(komponent.find('div.js-content')).to.have.length(1);
    });

    it('Viser en OppfolgingsdialogTidligereUtenSykmelding', () => {
        expect(komponent.find(OppfolgingsdialogTidligereUtenSykmelding)).to.have.length(1);
    });
});
