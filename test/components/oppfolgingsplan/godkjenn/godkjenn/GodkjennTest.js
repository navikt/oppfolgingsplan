import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Godkjenn from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/Godkjenn';
import GodkjennPlanOversiktInformasjon from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanOversiktInformasjon';
import GodkjennPlanLightboks from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanLightboks';

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
    const komponentDefault = shallow(<Godkjenn />);

    it('Skal vise en GodkjennPlanOversikt', () => {
        expect(komponentDefault.find('div.godkjennPlanOversikt')).to.have.length(1);
    });

    it('Skal vise en GodkjennPlanOversiktInformasjon', () => {
        expect(komponentDefault.find(GodkjennPlanOversiktInformasjon)).to.have.length(1);
    });

    it('Skal vise et GodkjennPlanLightboks, dersom visGodkjenPlanSkjema er true', () => {
        const komponent = shallow(<Godkjenn />);
        komponent.setState({
            visGodkjenPlanSkjema: true,
        });
        expect(komponent.find(GodkjennPlanLightboks)).to.have.length(1);
    });
});