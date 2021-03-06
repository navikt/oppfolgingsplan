import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import ReleasetPlanAT from '../../../../../js/components/oppfolgingsplan/godkjenn/releasetplan/ReleasetPlanAT';
import ArbeidsgiverHarTvangsgodkjent from '../../../../../js/components/oppfolgingsplan/godkjenn/releasetplan/ArbeidsgiverHarTvangsgodkjent';
import ReleasetPlan from '../../../../../js/components/oppfolgingsplan/godkjenn/releasetplan/ReleasetPlan';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ReleasetPlanAT', () => {
  let component;
  let giSamtykke;
  let avbrytDialog;
  let delMedNavFunc;

  beforeEach(() => {
    giSamtykke = sinon.spy();
    avbrytDialog = sinon.spy();
    delMedNavFunc = sinon.spy();
  });

  describe('Ikke tvangsgodkjent', () => {
    const oppfolgingsdialog = getOppfolgingsdialog();
    beforeEach(() => {
      component = shallow(
        <ReleasetPlanAT
          giSamtykke={giSamtykke}
          avbrytDialog={avbrytDialog}
          delmednav={delMedNavFunc}
          oppfolgingsdialog={oppfolgingsdialog}
        />
      );
    });

    it('Skal vise ReleasetPlanAT', () => {
      expect(component.find(ReleasetPlan)).to.have.length(1);
    });
  });

  describe('Tvangsgodkjent', () => {
    const oppfolgingsdialogTvangsgodkjent = Object.assign({}, getOppfolgingsdialog(), {
      godkjentPlan: {
        tvungenGodkjenning: true,
        opprettetTidspunkt: '2017-01-02T00:00:00.000',
      },
      arbeidstaker: {
        navn: 'Arbeidstaker',
        fnr: '1234567891000',
        sistInnlogget: '2017-01-01T00:00:00.000',
      },
    });
    beforeEach(() => {
      component = shallow(
        <ReleasetPlanAT
          giSamtykke={giSamtykke}
          avbrytDialog={avbrytDialog}
          delmednav={delMedNavFunc}
          oppfolgingsdialog={oppfolgingsdialogTvangsgodkjent}
        />
      );
    });

    it('Skal vise ArbeidsgiverHarTvangsgodkjent, om arbeidsgiver har tvangsgodkjent og arbeidstaker ikke har sett dette', () => {
      component.setState({
        settTvungenGodkjenning: false,
      });
      expect(component.find(ArbeidsgiverHarTvangsgodkjent)).to.have.length(1);
    });

    it('Skal ikke vise ArbeidsgiverHarTvangsgodkjent, om arbeidsgiver har tvangsgodkjent og arbeidstaker ikke har sett dette', () => {
      component.setState({
        settTvungenGodkjenning: true,
      });
      expect(component.find(ArbeidsgiverHarTvangsgodkjent)).to.have.length(0);
    });
  });
});
