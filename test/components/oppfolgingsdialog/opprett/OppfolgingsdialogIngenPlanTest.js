import React from 'react';
import chai from 'chai';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import OppfolgingsdialogerIngenplan, {
  OppfolgingsdialogerIngenplanKnapper,
} from '../../../../js/components/oppfolgingsdialoger/opprett/OppfolgingsdialogerIngenplan';
import getOppfolgingsdialog, {
  hentOppfolgingsdialogTidligere,
} from '../../../mock/mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogerIngenplan', () => {
  let klokke;
  const dagensDato = new Date('2017-01-01');

  let komponent;
  let opprett;
  let visOppfolgingsdialogOpprett;
  let arbeidsgivere;
  let arbeidsgiver;

  beforeEach(() => {
    klokke = sinon.useFakeTimers(dagensDato.getTime());
    opprett = sinon.spy();
    visOppfolgingsdialogOpprett = sinon.spy();
    arbeidsgivere = [];
    arbeidsgiver = {
      virksomhetsnummer: '12345678',
    };
    komponent = mount(
      <OppfolgingsdialogerIngenplan
        opprett={opprett}
        oppfolgingsplaner={[]}
        visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
        arbeidsgivere={arbeidsgivere}
        rootUrl=""
      />
    );
  });

  afterEach(() => {
    klokke.restore();
  });

  it('Skal vise OppfolgingsdialogerIngenplanKnapper', () => {
    expect(komponent.find(OppfolgingsdialogerIngenplan)).to.have.length(1);
  });

  it('Skal vise OppfolgingsdialogerIngenplanKnapper', () => {
    expect(komponent.find(OppfolgingsdialogerIngenplanKnapper)).to.have.length(
      1
    );
  });

  describe('OppfolgingsdialogerIngenplanKnapper', () => {
    let oppfolgingsdialogTidligere;
    let oppfolgingsdialogIkkeTidligere;
    let virksomhet;

    beforeEach(() => {
      virksomhet = { virksomhetsnummer: arbeidsgiver.virksomhetsnummer };
      oppfolgingsdialogTidligere = {
        ...hentOppfolgingsdialogTidligere(dagensDato),
        virksomhet,
      };
      oppfolgingsdialogIkkeTidligere = {
        ...getOppfolgingsdialog(),
        virksomhet,
        godkjentplan: null,
      };
    });

    it('Skal vise knapp for aa opprett ny dialog', () => {
      expect(komponent.find('button')).to.have.length(1);
    });

    it('Skal vise knapp som kaller opprett, om oppfolgingsdialog er opprettbar direkte uten ekstra utfylling', () => {
      komponent = mount(
        <OppfolgingsdialogerIngenplan
          opprett={opprett}
          visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
          arbeidsgivere={[arbeidsgiver]}
          oppfolgingsplaner={[oppfolgingsdialogIkkeTidligere]}
          rootUrl=""
        />
      );
      komponent.find('button').simulate('click');
      expect(opprett.calledOnce).to.equal(true);
    });

    it('Skal vise knapp som kaller visOppfolgingsdialogOpprett, om AT har flere arbeidsgivere', () => {
      komponent = mount(
        <OppfolgingsdialogerIngenplan
          opprett={opprett}
          visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
          arbeidsgivere={[arbeidsgiver, arbeidsgiver]}
          oppfolgingsplaner={[oppfolgingsdialogIkkeTidligere]}
          rootUrl=""
        />
      );
      komponent.find('button').simulate('click');
      expect(visOppfolgingsdialogOpprett.calledOnce).to.equal(true);
    });

    it('Skal vise knapp som kaller visOppfolgingsdialogOpprett, om AT har tidligere godkjent oppfolgingsdialog med virksomhet', () => {
      komponent = mount(
        <OppfolgingsdialogerIngenplan
          opprett={opprett}
          visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
          arbeidsgivere={[arbeidsgiver]}
          oppfolgingsplaner={[oppfolgingsdialogTidligere]}
          rootUrl=""
        />
      );
      komponent.find('button').simulate('click');
      expect(visOppfolgingsdialogOpprett.calledOnce).to.equal(true);
    });
  });
});
