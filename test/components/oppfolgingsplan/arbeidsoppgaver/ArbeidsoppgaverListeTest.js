import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import getArbeidsoppgave from '../../../mock/mockArbeidsoppgave';
import ArbeidsoppgaverListe from '../../../../js/components/oppfolgingsplan/arbeidsoppgaver/ArbeidsoppgaverListe';
import Arbeidsoppgave from '../../../../js/components/oppfolgingsplan/arbeidsoppgaver/Arbeidsoppgave';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ArbeidsoppgaverListe', () => {
  let komponent;
  let liste;
  let sendLagre;
  let sendSlett;

  beforeEach(() => {
    liste = [getArbeidsoppgave()];
    sendLagre = sinon.spy();
    sendSlett = sinon.spy();
    komponent = shallow(<ArbeidsoppgaverListe liste={liste} sendLagre={sendLagre} sendSlett={sendSlett} />);
  });

  it('Skal vise antall TabellRadUtvidbar lik antall arbeidsoppgaver', () => {
    expect(komponent.find(Arbeidsoppgave)).to.have.length(liste.length);
  });
});
