import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Godkjenn from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/Godkjenn';
import GodkjennPlanOversiktInformasjon from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanOversiktInformasjon';
import GodkjennPlanLightboks from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanLightboks';
import ReviderEllerGodkjennPlan from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/ReviderEllerGodkjennPlan';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Godkjenn', () => {
    function storageMock() {
        const storage = {};

        return {
            setItem: (key, value) => {
                storage[key] = value || '';
            },
            getItem: (key) => {
                return key in storage ? storage[key] : null;
            },
            removeItem: (key) => {
                delete storage[key];
            },
            get length() {
                return Object.keys(storage).length;
            },
            key: (i) => {
                const keys = Object.keys(storage);
                return keys[i] || null;
            },
        };
    }

    window.sessionStorage = storageMock();

    const komponentDefault = shallow(<Godkjenn />, { disableLifecycleMethods: true });

    it('Skal vise en GodkjennPlanOversikt', () => {
        expect(komponentDefault.find('div.godkjennPlanOversikt')).to.have.length(1);
    });

    it('Skal vise en GodkjennPlanOversiktInformasjon', () => {
        expect(komponentDefault.find(GodkjennPlanOversiktInformasjon)).to.have.length(1);
    });

    it('Skal vise ReviderEllerGodkjennPlan, om visGodkjenPlanSkjema er false', () => {
        const komponent = shallow(<Godkjenn />, { disableLifecycleMethods: true });
        komponent.setState({
            visGodkjenPlanSkjema: false,
        });
        expect(komponent.find(ReviderEllerGodkjennPlan)).to.have.length(1);
    });

    it('Skal ikke vise ReviderEllerGodkjennPlan, om visGodkjenPlanSkjema er true', () => {
        const komponent = shallow(<Godkjenn />, { disableLifecycleMethods: true });
        komponent.setState({
            visGodkjenPlanSkjema: true,
        });
        expect(komponent.find(ReviderEllerGodkjennPlan)).to.have.length(0);
    });

    it('Skal vise GodkjennPlanLightboks, om visGodkjenPlanSkjema er true', () => {
        const komponent = shallow(<Godkjenn />, { disableLifecycleMethods: true });
        komponent.setState({
            visGodkjenPlanSkjema: true,
        });
        expect(komponent.find(GodkjennPlanLightboks)).to.have.length(1);
    });

    it('Skal ikke vise GodkjennPlanLightboks, om visGodkjenPlanSkjema er false', () => {
        const komponent = shallow(<Godkjenn />, { disableLifecycleMethods: true });
        komponent.setState({
            visGodkjenPlanSkjema: false,
        });
        expect(komponent.find(GodkjennPlanLightboks)).to.have.length(0);
    });
});
