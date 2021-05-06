import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsdialogUtenGyldigSykmelding from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogUtenGyldigSykmelding';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogUtenGyldigSykmelding', () => {
  let komponent;

  beforeEach(() => {
    const isIngenSykmeldinger = false;
    komponent = shallow(
      <OppfolgingsdialogUtenGyldigSykmelding sykmeldtHarIngenSendteSykmeldinger={isIngenSykmeldinger} />
    );
  });

  it('Viser en div', () => {
    expect(komponent.find('div.oppfolgingsdialogUtenAktivSykmelding')).to.have.length(1);
  });

  it('Viser en header', () => {
    expect(komponent.find('header.oppfolgingsdialogUtenAktivSykmelding__header')).to.have.length(1);
  });

  it('Viser en div med klass blokk', () => {
    expect(komponent.find('div.oppfolgingsdialogUtenAktivSykmelding__blokk')).to.have.length(1);
  });

  it('Viser en img', () => {
    expect(komponent.find('img')).to.have.length(1);
  });

  it('Viser en div med klass innhold', () => {
    expect(komponent.find('div.inngangspanel__innhold')).to.have.length(1);
  });

  it('Viser en p', () => {
    expect(komponent.find('p.oppfolgingsdialoger__start_tekst')).to.have.length(1);
  });

  it('Viser text om at den sykmeldte ikke er sykmeldt nå', () => {
    const text = komponent.find('p.oppfolgingsdialoger__start_tekst');
    expect(text.text()).to.equal('Du kan ikke lage en ny oppfølgingsplan fordi du ikke er sykmeldt nå.');
  });
});

describe('OppfolgingsdialogUtenGyldigSykmelding', () => {
  let komponent;
  beforeEach(() => {
    const isIngenSykmeldinger = true;
    komponent = shallow(
      <OppfolgingsdialogUtenGyldigSykmelding sykmeldtHarIngenSendteSykmeldinger={isIngenSykmeldinger} />
    );
  });

  it('Viser text om at den sykmeldte ikke har sendt inn sykmeldingen sin', () => {
    const text = komponent.find('p.oppfolgingsdialoger__start_tekst');
    expect(text.text()).to.equal(
      'Du kan ikke lage en ny oppfølgingsplan fordi du ikke har sendt inn sykmeldingen din.'
    );
  });
});
