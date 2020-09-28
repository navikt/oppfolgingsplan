import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Utvidbar } from '@navikt/digisyfo-npm';
import AlertStripe from 'nav-frontend-alertstriper';
import GodkjennPlanSendt, {
    GodkjennPlanSendtInfoTekst,
    GodkjennPlanSendtUtvidbar,
} from '../../../../js/components/oppfolgingsplan/godkjenn/godkjenninger/GodkjennPlanSendt';
import OppfolgingsplanInnholdboks from '../../../../js/components/app/OppfolgingsplanInnholdboks';
import GodkjennPlanOversiktInformasjon from '../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanOversiktInformasjon';
import getOppfolgingsdialog from '../../../mock/mockOppfolgingsdialog';
import GodkjennPlanVenterInfo from '../../../../js/components/oppfolgingsplan/godkjenn/godkjenn/GodkjennPlanVenterInfo';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanVenterInfo', () => {
    const komponent = shallow(<GodkjennPlanVenterInfo />);

    it('Skal vise en GodkjennPlanVenterInfo med overskrift og tekst', () => {
        expect(komponent.find(AlertStripe)).to.have.length(1);
        expect(komponent.find('h3')).to.have.length(1);
    });
});
