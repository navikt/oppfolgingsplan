import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Bjorn } from '@navikt/digisyfo-npm';
import ReviderEllerGodkjennPlan, {
    ReviderEllerGodkjennPlanKnapperad,
} from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/ReviderEllerGodkjennPlan';
import IkkeUtfyltPlanFeilmelding from '../../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/IkkeUtfyltPlanFeilmelding';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ReviderEllerGodkjennPlan', () => {
    let komponent;
    let settAktivtSteg;
    const oppfolgingsplan = getOppfolgingsdialog();

    describe('Standard visning', () => {
        beforeEach(() => {
            settAktivtSteg = sinon.spy();
            komponent = shallow(<ReviderEllerGodkjennPlan
                settAktivtSteg={settAktivtSteg}
                oppfolgingsdialog={{
                    ...oppfolgingsplan,
                    arbeidstaker: {
                        ...oppfolgingsplan.arbeidstaker,
                        fnr: `${oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr}1`,
                    },
                }}
            />);
        });

        it('Skal vise Bjorn', () => {
            expect(komponent.find(Bjorn)).to.have.length(1);
        });

        it('Skal vise ReviderEllerGodkjennPlanKnapperad', () => {
            expect(komponent.find(ReviderEllerGodkjennPlanKnapperad)).to.have.length(1);
        });

        it('Skal ikke vise IkkeUtfyltPlanFeilmelding, om visIkkeUtfyltFeilmelding er false', () => {
            expect(komponent.find(IkkeUtfyltPlanFeilmelding)).to.have.length(0);
        });

        it('Skal vise IkkeUtfyltPlanFeilmelding, om visIkkeUtfyltFeilmelding er true', () => {
            komponent.setState({
                visIkkeUtfyltFeilmelding: true,
            });
            expect(komponent.find(IkkeUtfyltPlanFeilmelding)).to.have.length(1);
        });
    });

    describe('Visning for arbeidstaker som er egen leder', () => {
        beforeEach(() => {
            settAktivtSteg = sinon.spy();
            komponent = shallow(<ReviderEllerGodkjennPlan
                oppfolgingsdialog={{
                    ...oppfolgingsplan,
                    arbeidstaker: {
                        ...oppfolgingsplan.arbeidstaker,
                        fnr: `${oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr}`,
                    },
                }}
                settAktivtSteg={settAktivtSteg}
            />);
        });

        it('Skal vise Alertstripe', () => {
            expect(komponent.find(Alertstripe)).to.have.length(1);
        });
    });

    describe('ReviderEllerGodkjennPlanKnapperad', () => {
        const komponentSub = shallow(<ReviderEllerGodkjennPlanKnapperad />);
        it('Skal vise 1 Hovedknapp', () => {
            expect(komponentSub.find(Hovedknapp)).to.have.length(1);
        });
    });
});
