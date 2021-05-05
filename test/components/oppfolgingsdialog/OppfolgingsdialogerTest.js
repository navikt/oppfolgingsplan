import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Sidetopp from '../../../js/components/Sidetopp';
import Oppfolgingsdialoger from '../../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger';
import OppfolgingsdialogerVisning from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogerInfoPersonvern';
import OppfolgingsdialogUtenGyldigSykmelding from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogUtenGyldigSykmelding';
import OppfolgingsdialogerUtenAktivSykmelding from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogerUtenAktivSykmelding';
import { getOppfolgingsdialoger } from '../../mock/mockOppfolgingsdialoger';
import {
  hentSykmeldingGyldigForOppfoelging,
  hentSykmeldingIkkeGyldigForOppfoelging,
  leggTilDagerPaaDato,
} from '../../mock/mockSykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppfolgingsdialoger', () => {
  let component;
  let dinesykmeldinger;
  let naermesteLedere;
  const oppfolgingsdialoger = getOppfolgingsdialoger;
  let hentVirksomhet;
  let hentPerson;
  let hentLedere;
  let hentKontaktinfo;
  const dagensDato = new Date('2017-01-01');
  dagensDato.setHours(0, 0, 0, 0);
  let clock;
  const virksomhet = {
    henter: [],
    hentet: [],
    hentingFeilet: [],
    data: [],
  };
  const person = {
    henter: [],
    hentet: [],
    hentingFeilet: [],
    data: [],
  };
  const kontaktinfo = {
    henter: [],
    hentet: [],
    hentingFeilet: [],
    data: [],
  };
  const naermesteleder = {
    henter: [],
    hentet: [],
    hentingFeilet: [],
    data: [],
  };

  function storageMock() {
    const storage = {};

    return {
      setItem(key, value) {
        storage[key] = value || '';
      },
      getItem(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key(i) {
        const keys = Object.keys(storage);
        return keys[i] || null;
      },
    };
  }

  beforeEach(() => {
    window.sessionStorage = storageMock();
    clock = sinon.useFakeTimers(dagensDato.getTime());
    dinesykmeldinger = {
      data: [hentSykmeldingGyldigForOppfoelging(dagensDato)],
    };
    naermesteLedere = { data: [] };
    hentPerson = sinon.spy();
    hentLedere = sinon.spy();
    hentKontaktinfo = sinon.spy();
    hentVirksomhet = sinon.spy();

    component = shallow(
      <Oppfolgingsdialoger
        oppfolgingsdialoger={[]}
        dinesykmeldinger={dinesykmeldinger}
        naermesteLedere={naermesteLedere}
        hentVirksomhet={hentVirksomhet}
        hentNaermesteLeder={sinon.spy()}
        hentPerson={hentPerson}
        hentLedere={hentLedere}
        hentKontaktinfo={hentKontaktinfo}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
      />
    );
  });

  afterEach(() => {
    clock.restore();
  });

  it('Skal vise overskrift for Oppfolgingsdialoger', () => {
    expect(component.find(Sidetopp)).to.have.length(1);
  });

  it('Skal vise OppfolgingsdialogerInfoPersonvern', () => {
    expect(component.find(OppfolgingsdialogerInfoPersonvern)).to.have.length(1);
  });

  describe('Uten gyldig sykmelding', () => {
    let component1;
    let sykmeldingListe;

    beforeEach(() => {
      sykmeldingListe = {
        data: [hentSykmeldingIkkeGyldigForOppfoelging(dagensDato)],
      };
      component1 = shallow(
        <Oppfolgingsdialoger
          oppfolgingsdialoger={oppfolgingsdialoger}
          dinesykmeldinger={sykmeldingListe}
          naermesteLedere={naermesteLedere}
          hentVirksomhet={sinon.spy()}
          hentNaermesteLeder={sinon.spy()}
          hentLedere={sinon.spy()}
          hentPerson={sinon.spy()}
          hentKontaktinfo={sinon.spy()}
          naermesteleder={naermesteleder}
          virksomhet={virksomhet}
          person={person}
          kontaktinfo={kontaktinfo}
        />
      );
    });

    it('Skal vise OppfolgingsdialogUtenGyldigSykmelding', () => {
      expect(component1.find(OppfolgingsdialogUtenGyldigSykmelding)).to.have.length(1);
    });

    it('Skal vise ikke OppfolgingsdialogerUtenAktivSykmelding, dersom det ikke er tidligere planer', () => {
      const oppfolgingsdialogListe = [
        Object.assign(oppfolgingsdialoger[0], {
          godkjentPlan: {
            gyldighetstidspunkt: {
              fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
              tom: leggTilDagerPaaDato(dagensDato, 1).toISOString(),
            },
          },
        }),
      ];
      component1 = shallow(
        <Oppfolgingsdialoger
          oppfolgingsdialoger={oppfolgingsdialogListe}
          dinesykmeldinger={sykmeldingListe}
          naermesteLedere={naermesteLedere}
          hentVirksomhet={sinon.spy()}
          hentNaermesteLeder={sinon.spy()}
          hentLedere={sinon.spy()}
          hentPerson={sinon.spy()}
          hentKontaktinfo={sinon.spy()}
          naermesteleder={naermesteleder}
          virksomhet={virksomhet}
          person={person}
          kontaktinfo={kontaktinfo}
        />
      );
      expect(component1.find(OppfolgingsdialogerUtenAktivSykmelding)).to.have.length(0);
    });

    it('Skal vise OppfolgingsdialogerUtenAktivSykmelding, dersom det er tidligere planer', () => {
      const oppfolgingsdialogListe = [
        Object.assign(oppfolgingsdialoger[0], {
          godkjentPlan: {
            gyldighetstidspunkt: {
              fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
              tom: leggTilDagerPaaDato(dagensDato, -1).toISOString(),
            },
          },
        }),
      ];
      const component2 = shallow(
        <Oppfolgingsdialoger
          oppfolgingsdialoger={oppfolgingsdialogListe}
          dinesykmeldinger={sykmeldingListe}
          naermesteLedere={naermesteLedere}
          hentVirksomhet={sinon.spy()}
          hentNaermesteLeder={sinon.spy()}
          hentLedere={sinon.spy()}
          hentPerson={sinon.spy()}
          hentKontaktinfo={sinon.spy()}
          naermesteleder={naermesteleder}
          virksomhet={virksomhet}
          person={person}
          kontaktinfo={kontaktinfo}
        />
      );
      expect(component2.find(OppfolgingsdialogerUtenAktivSykmelding)).to.have.length(1);
    });
  });

  describe('Uten sendt sykmelding', () => {
    let oppfolgingsdialogerComponent;
    let dinesykmeldingerListe;

    beforeEach(() => {
      dinesykmeldingerListe = {
        data: [],
      };

      oppfolgingsdialogerComponent = shallow(
        <Oppfolgingsdialoger
          oppfolgingsdialoger={oppfolgingsdialoger}
          dinesykmeldinger={dinesykmeldingerListe}
          naermesteLedere={naermesteLedere}
          hentVirksomhet={sinon.spy()}
          hentNaermesteLeder={sinon.spy()}
          hentLedere={sinon.spy()}
          hentPerson={sinon.spy()}
          hentKontaktinfo={sinon.spy()}
          naermesteleder={naermesteleder}
          virksomhet={virksomhet}
          person={person}
          kontaktinfo={kontaktinfo}
        />
      );
    });

    it('Skal vise OppfolgingsdialogUtenGyldigSykmelding hvis ingen sendte sykmeldinger', () => {
      expect(oppfolgingsdialogerComponent.find(OppfolgingsdialogUtenGyldigSykmelding)).to.have.length(1);
    });
  });

  describe('Standard visning', () => {
    it('Skal vise OppfolgingsdialogerVisning', () => {
      expect(component.find(OppfolgingsdialogerVisning)).to.have.length(0);
    });
  });
});
