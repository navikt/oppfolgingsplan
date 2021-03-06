import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Alertstripe from 'nav-frontend-alertstriper';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';
import GodkjentPlanDelKnapper from '../../../../../js/components/oppfolgingsplan/godkjenn/releasetplan/GodkjentPlanDelKnapper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjentPlanDelKnapper', () => {
  let komponent;
  let oppfolgingsplan;
  let delmednav;
  let delMedNavFunc;
  let fastlegeDeling;
  let delMedFastlege;

  beforeEach(() => {
    oppfolgingsplan = getOppfolgingsdialog({});
    delmednav = {
      sender: false,
      sendingFeilet: false,
    };
    fastlegeDeling = {
      sender: false,
      sendt: false,
      sendingFeilet: false,
    };
    delMedNavFunc = sinon.spy();
    delMedFastlege = sinon.spy();

    komponent = shallow(
      <GodkjentPlanDelKnapper
        oppfolgingsplan={oppfolgingsplan}
        delmednav={delmednav}
        delMedNavFunc={delMedNavFunc}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
      />
    );
  });

  it('Skal vise Alertstripe dersom delmednav sendingFeilet er true', () => {
    const delmednavFeilet = Object.assign({}, delmednav, {
      sendingFeilet: true,
    });
    komponent = shallow(
      <GodkjentPlanDelKnapper
        oppfolgingsplan={oppfolgingsplan}
        delmednav={delmednavFeilet}
        delMedNavFunc={delMedNavFunc}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
      />
    );
    expect(komponent.find(Alertstripe)).to.have.length(1);
  });

  it('Skal vise Alertstripe dersom fastlegeDeling sendingFeilet er true', () => {
    const fastlegeDelingFeilet = Object.assign({}, fastlegeDeling, {
      sendingFeilet: true,
    });
    komponent = shallow(
      <GodkjentPlanDelKnapper
        oppfolgingsplan={oppfolgingsplan}
        delmednav={delmednav}
        delMedNavFunc={delMedNavFunc}
        fastlegeDeling={fastlegeDelingFeilet}
        delMedFastlege={delMedFastlege}
      />
    );
    expect(komponent.find(Alertstripe)).to.have.length(1);
  });

  it('Skal vise 2 knapper dersom godkjent plan ikke er delt med NAV eller fastlege', () => {
    const oppfolgingsplanIkkeDeltMedNavEllerFastlege = Object.assign({}, oppfolgingsplan, {
      godkjentPlan: {
        deltMedNAV: false,
        deltMedNAVTidspunkt: null,
        deltMedFastlege: false,
        deltMedFastlegeTidspunkt: null,
      },
    });
    komponent = shallow(
      <GodkjentPlanDelKnapper
        oppfolgingsplan={oppfolgingsplanIkkeDeltMedNavEllerFastlege}
        delmednav={delmednav}
        delMedNavFunc={delMedNavFunc}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
      />
    );
    expect(komponent.find('.buttonElement')).to.have.length(2);
  });

  it('Skal vise 1 knapp dersom godkjent plan er delt med NAV, men ikke fastlege', () => {
    const oppfolgingsplanIkkeDeltMedFastlege = Object.assign({}, oppfolgingsplan, {
      godkjentPlan: {
        deltMedNAV: true,
        deltMedNAVTidspunkt: null,
        deltMedFastlege: false,
        deltMedFastlegeTidspunkt: null,
      },
    });
    komponent = shallow(
      <GodkjentPlanDelKnapper
        oppfolgingsplan={oppfolgingsplanIkkeDeltMedFastlege}
        delmednav={delmednav}
        delMedNavFunc={delMedNavFunc}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
      />
    );
    expect(komponent.find('.buttonElement')).to.have.length(1);
  });

  it('Skal vise 1 knapp dersom godkjent plan er delt med fastlege, men ikke NAV', () => {
    const oppfolgingsplanIkkeDeltMedFastlege = Object.assign({}, oppfolgingsplan, {
      godkjentPlan: {
        deltMedNAV: false,
        deltMedNAVTidspunkt: null,
        deltMedFastlege: true,
        deltMedFastlegeTidspunkt: null,
      },
    });
    komponent = shallow(
      <GodkjentPlanDelKnapper
        oppfolgingsplan={oppfolgingsplanIkkeDeltMedFastlege}
        delmednav={delmednav}
        delMedNavFunc={delMedNavFunc}
        fastlegeDeling={fastlegeDeling}
        delMedFastlege={delMedFastlege}
      />
    );
    expect(komponent.find('.buttonElement')).to.have.length(1);
  });
});
