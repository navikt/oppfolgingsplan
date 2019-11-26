import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { Field } from 'redux-form';
import { Hovedknapp } from 'nav-frontend-knapper';
import { GodkjennPlanLightboksComponent } from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanLightboks';
import GodkjennPlanSkjemaDatovelger from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanSkjemaDatovelger';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanLightboks', () => {
    let komponent;
    let handleSubmit;
    let initialize;

    beforeEach(() => {
        initialize = sinon.spy();
        handleSubmit = sinon.spy();
        komponent = shallow(<GodkjennPlanLightboksComponent
            oppfolgingsdialog={getOppfolgingsdialog()}
            handleSubmit={handleSubmit}
            initialize={initialize}
        />);
    });

    it('Skal vise panel', () => {
        expect(komponent.find('div.panel')).to.have.length(1);
    });

    it('Skal vise et godkjennPlanSkjema', () => {
        expect(komponent.find('form.godkjennPlanSkjema')).to.have.length(1);
    });

    it('Skal vise overskrifter og tekster', () => {
        expect(komponent.find('h2')).to.have.length(1);
        expect(komponent.find('h3')).to.have.length(1);
        expect(komponent.find('p')).to.have.length(1);
    });

    it('Skal vise GodkjennPlanSkjemaDatovelger', () => {
        expect(komponent.find(GodkjennPlanSkjemaDatovelger)).to.have.length(1);
    });

    it('Skal vise et Field for godkjenning and delMedNav', () => {
        expect(komponent.find(Field)).to.have.length(2);
    });

    it('Skal vise en submit knapp', () => {
        expect(komponent.find(Hovedknapp)).to.have.length(1);
    });
});
