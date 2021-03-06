import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Oppfolgingsdialog, {
  erAvvistAvArbeidstaker,
  LagreAdvarselstripe,
  tekster,
} from '../../../js/components/oppfolgingsplan/Oppfolgingsdialog';
import IngenlederInfoboks from '../../../js/components/oppfolgingsdialoger/IngenlederInfoboks';
import Arbeidsoppgaver from '../../../js/components/oppfolgingsplan/arbeidsoppgaver/Arbeidsoppgaver';
import AvbruttGodkjentPlanVarsel from '../../../js/components/oppfolgingsplan/AvbruttGodkjentPlanVarsel';
import Godkjenn from '../../../js/components/oppfolgingsplan/godkjenn/godkjenn/Godkjenn';
import Godkjenninger from '../../../js/components/oppfolgingsplan/godkjenn/godkjenninger/Godkjenninger';
import NavigasjonsBunn from '../../../js/components/oppfolgingsplan/NavigasjonsBunn';
import NavigasjonsTopp from '../../../js/components/oppfolgingsplan/NavigasjonsTopp';
import Samtykke from '../../../js/components/oppfolgingsplan/godkjenn/samtykke/Samtykke';
import SideOverskrift from '../../../js/components/oppfolgingsplan/SideOverskrift';
import Tiltak from '../../../js/components/oppfolgingsplan/tiltak/Tiltak';
import ReleasetPlanAT from '../../../js/components/oppfolgingsplan/godkjenn/releasetplan/ReleasetPlanAT';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppfolgingsdialog', () => {
  let component;
  let settDialog;
  let settAktivtSteg;
  let navigasjontoggles;

  let hentVirksomhet;
  let hentPerson;
  let hentNaermesteLeder;
  let hentKontaktinfo;
  let hentArbeidsforhold;
  let avbrytdialogReducer;
  const data = {
    henter: [],
    hentet: [],
    hentingFeilet: [],
    data: [],
  };
  const virksomhet = data;
  const person = data;
  const kontaktinfo = data;
  const naermesteleder = data;
  const arbeidsforhold = data;

  let oppfolgingsdialog;
  let alleInputFormer;
  beforeEach(() => {
    settAktivtSteg = sinon.spy();
    navigasjontoggles = { steg: 1 };
    avbrytdialogReducer = {};
    oppfolgingsdialog = getOppfolgingsdialog();
    settDialog = sinon.spy();
    hentArbeidsforhold = sinon.spy();
    hentPerson = sinon.spy();
    hentNaermesteLeder = sinon.spy();
    hentKontaktinfo = sinon.spy();
    hentVirksomhet = sinon.spy();
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentNaermesteLeder={hentNaermesteLeder}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        virksomhet={virksomhet}
        naermesteleder={naermesteleder}
        person={person}
        kontaktinfo={kontaktinfo}
        navigasjontoggles={navigasjontoggles}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
  });

  it('Skal vise SideOverskrift', () => {
    expect(component.find(SideOverskrift)).to.have.length(1);
  });

  it('Skal ikke vise NavigasjonsTopp, dersom dialog ikke er under arbeid(disabledNavigation er true)', () => {
    expect(component.find(NavigasjonsTopp)).to.have.length(0);
  });

  it('Skal ikke vise NavigasjonsTopp, dersom dialog er under arbeid(disabledNavigation er false)', () => {
    const oppfolgingsdialogUnderArbeid = Object.assign({}, getOppfolgingsdialog(), {
      godkjentPlan: null,
      godkjenninger: [],
    });
    const componentUnderArbeid = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialogUnderArbeid}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentNaermesteLeder={hentNaermesteLeder}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        virksomhet={virksomhet}
        naermesteleder={naermesteleder}
        person={person}
        kontaktinfo={kontaktinfo}
        navigasjontoggles={navigasjontoggles}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
    expect(componentUnderArbeid.find(NavigasjonsTopp)).to.have.length(1);
  });

  it('Skal vise NavigasjonsBunn', () => {
    expect(component.find(NavigasjonsBunn)).to.have.length(1);
  });

  it('Skal ikke vise AvbruttGodkjentPlanVarsel, om oppfolgingsdialogAvbrutt er false', () => {
    expect(component.find(AvbruttGodkjentPlanVarsel)).to.have.length(0);
  });

  it('Skal vise AvbruttGodkjentPlanVarsel, om oppfolgingsdialogAvbrutt er true', () => {
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={{ sendt: true, nyPlanId: oppfolgingsdialog.id }}
        settAktivtSteg={settAktivtSteg}
        settDialog={settDialog}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        hentVirksomhet={hentVirksomhet}
        hentNaermesteLeder={hentNaermesteLeder}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        virksomhet={virksomhet}
        naermesteleder={naermesteleder}
        person={person}
        kontaktinfo={kontaktinfo}
        oppfolgingsdialogAvbrutt
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
    expect(component.find(AvbruttGodkjentPlanVarsel)).to.have.length(1);
  });

  it('Skal vise Samtykke, om arbeidstaker ikke har svart paa samtykke og visSamtykke er true', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      arbeidstaker: {
        samtykke: null,
      },
    });
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
    expect(component.find(Samtykke)).to.have.length(1);
  });

  it('Skal vise Godkjenninger, om oppfolgingsdialoger inneholder Godkjenninger og ikke er avvist av arbeidstaker', () => {
    const sykmeldtFnr = '123456789';
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      godkjenninger: [
        {
          godkjent: true,
          godkjentAv: {
            fnr: sykmeldtFnr,
          },
        },
      ],
      arbeidstaker: {
        fnr: sykmeldtFnr,
      },
    });
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
    expect(component.find(Godkjenninger)).to.have.length(1);
  });

  it('Skal vise ReleasetPlanAT, om oppfolgingsdialoger inneholder GodkjentPlan og ikke er avvist av arbeidstaker', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      godkjentPlan: {},
    });
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
    expect(component.find(ReleasetPlanAT)).to.have.length(1);
  });

  it('Skal vise Arbeidsoppgaver, om steg er 1 ', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      godkjentPlan: null,
      godkjenninger: [],
      avbruttPlanListe: [],
    });
    navigasjontoggles = { steg: 1 };
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
    expect(component.find(Arbeidsoppgaver)).to.have.length(1);
  });

  it('Skal vise Tiltak, om steg er 3 ', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      godkjentPlan: null,
      godkjenninger: [],
      avbruttPlanListe: [],
    });
    navigasjontoggles = { steg: 2 };
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
    expect(component.find(Tiltak)).to.have.length(1);
  });

  it('Skal vise IngenlederInfoboks, om det ikke er en naermesteLeder og steg er 3 ', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      arbeidsgiver: {
        naermesteLeder: {},
        forrigeNaermesteLeder: {
          fnr: '1234567891000',
          navn: 'Arbeidsgiver navn',
        },
      },
    });
    navigasjontoggles = { steg: 3 };
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
    expect(component.find(IngenlederInfoboks)).to.have.length(1);
  });

  it('Skal vise Godkjenn, om steg er 3 ', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      godkjentPlan: null,
      godkjenninger: [],
      avbruttPlanListe: [],
    });
    navigasjontoggles = { steg: 3 };
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
      />
    );
    expect(component.find(Godkjenn)).to.have.length(1);
  });

  it('Skal vise advarsel om at åpen arbeidsoppgave ikke er lagret', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      godkjentPlan: null,
      godkjenninger: [],
      avbruttPlanListe: [],
    });
    alleInputFormer = { lagretArbeidsgiver: {} };
    navigasjontoggles = { steg: 1 };
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        alleInputFormer={alleInputFormer}
      />
    );
    expect(component.find(LagreAdvarselstripe)).to.contain.html(tekster.lagreOppgaveAdvarselTekst);
  });

  it('Skal vise advarsel om at åpent tiltak ikke er lagret', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      godkjentPlan: null,
      godkjenninger: [],
      avbruttPlanListe: [],
    });
    alleInputFormer = { OPPRETT_TILTAK_NY: {} };
    navigasjontoggles = { steg: 2 };
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        alleInputFormer={alleInputFormer}
      />
    );
    expect(component.find(LagreAdvarselstripe)).to.contain.html(tekster.lagreTiltakAdvarselTekst);
  });

  it('Skal ikke vise advarsel dersom ingen oppgaver er åpne', () => {
    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
      godkjentPlan: null,
      godkjenninger: [],
      avbruttPlanListe: [],
    });
    alleInputFormer = {};
    navigasjontoggles = { steg: 1 };
    component = shallow(
      <Oppfolgingsdialog
        avbrytdialogReducer={avbrytdialogReducer}
        settAktivtSteg={settAktivtSteg}
        oppfolgingsdialog={oppfolgingsdialog}
        navigasjontoggles={navigasjontoggles}
        settDialog={settDialog}
        hentVirksomhet={hentVirksomhet}
        hentPerson={hentPerson}
        hentKontaktinfo={hentKontaktinfo}
        hentNaermesteLeder={hentNaermesteLeder}
        naermesteleder={naermesteleder}
        virksomhet={virksomhet}
        person={person}
        kontaktinfo={kontaktinfo}
        arbeidsforhold={arbeidsforhold}
        hentArbeidsforhold={hentArbeidsforhold}
        alleInputFormer={alleInputFormer}
      />
    );
    expect(component.find(LagreAdvarselstripe)).to.have.length(0);
  });

  describe('erAvvistAvArbeidstaker', () => {
    const arbeidstaker = { fnr: '123456789' };
    const naermesteLeder = { fnr: '123456788' };
    it('Skal returnere false, om plan er avvist og saa godkjent', () => {
      oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
        godkjenninger: [
          {
            godkjent: true,
            godkjentAv: {
              fnr: naermesteLeder.fnr,
            },
          },
          {
            godkjent: false,
            godkjentAv: {
              fnr: arbeidstaker.fnr,
            },
          },
        ],
        arbeidstaker,
      });
      expect(erAvvistAvArbeidstaker(oppfolgingsdialog)).to.equal(false);
    });
    it('Skal returnere false, om plan er godkjent', () => {
      oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
        godkjenninger: [
          {
            godkjent: true,
            godkjentAv: {
              fnr: arbeidstaker.fnr,
            },
          },
        ],
        arbeidstaker,
      });
      expect(erAvvistAvArbeidstaker(oppfolgingsdialog)).to.equal(false);
    });

    it('Skal returnere false, om plan er avvist av en annen enn Arbeidstaker', () => {
      oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
        godkjenninger: [
          {
            godkjent: false,
            godkjentAv: {
              fnr: naermesteLeder.fnr,
            },
          },
        ],
        arbeidstaker,
      });
      expect(erAvvistAvArbeidstaker(oppfolgingsdialog)).to.equal(false);
    });

    it('Skal returnere true, om plan er avvist av Arbeidstaker', () => {
      oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
        godkjenninger: [
          {
            godkjent: false,
            godkjentAv: {
              fnr: arbeidstaker.fnr,
            },
          },
        ],
        arbeidstaker,
      });
      expect(erAvvistAvArbeidstaker(oppfolgingsdialog)).to.equal(true);
    });
  });
});
