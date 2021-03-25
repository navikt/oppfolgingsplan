import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
  LagreArbeidsoppgaveSkjemaComponent,
  ArbeidsoppgaveGjennomfoeringSvar,
  ArbeidsoppgaveTilrettelegging,
  ArbeidsoppgaveBeskrivelse,
} from '../../../../js/components/oppfolgingsplan/arbeidsoppgaver/LagreArbeidsoppgaveSkjema';
import ArbeidsoppgaveKnapper from '../../../../js/components/oppfolgingsplan/arbeidsoppgaver/ArbeidsoppgaveKnapper';
import { KANGJENNOMFOERES } from '../../../../js/components/oppfolgingsplan/arbeidsoppgaver/arbeidsoppgavesvar';
import InfoVarsel from '../../../../js/components/oppfolgingsplan/arbeidsoppgaver/InfoVarsel';
import getArbeidsoppgave from '../../../mock/mockArbeidsoppgave';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('LagreArbeidsoppgaveSkjema', () => {
  let komponent;
  let arbeidsoppgave;
  let handleSubmit;
  let initialize;

  beforeEach(() => {
    handleSubmit = sinon.spy();
    initialize = sinon.spy();
    arbeidsoppgave = getArbeidsoppgave();
    komponent = shallow(
      <LagreArbeidsoppgaveSkjemaComponent
        initialize={initialize}
        handleSubmit={handleSubmit}
        arbeidsoppgaverReducer={arbeidsoppgave}
      />
    );
  });

  it('Skal vise en form', () => {
    expect(komponent.find('form')).to.have.length(1);
  });

  it('Skal vise en ArbeidsoppgaveGjennomfoeringSvar', () => {
    expect(komponent.find(ArbeidsoppgaveGjennomfoeringSvar)).to.have.length(1);
  });

  it('Skal vise en ArbeidsoppgaveTilrettelegging naar det er KANGJENNOMFOERES.TILRETTELEGGING', () => {
    komponent.setState({ gjennomfoeringSvarValgt: KANGJENNOMFOERES.TILRETTELEGGING });
    expect(komponent.find(ArbeidsoppgaveTilrettelegging)).to.have.length(1);
  });

  it('Skal vise en ArbeidsoppgaveBeskrivelse naar det er ikke KANGJENNOMFOERES.KAN', () => {
    komponent.setState({ gjennomfoeringSvarValgt: KANGJENNOMFOERES.TILRETTELEGGING });
    expect(komponent.find(ArbeidsoppgaveBeskrivelse)).to.have.length(1);
  });

  it('Skal vise en Alertstripe naar gjennomfoeringSvarValgt !== KANGJENNOMFOERES.KAN', () => {
    komponent.setState({ gjennomfoeringSvarValgt: KANGJENNOMFOERES.TILRETTELEGGING });
    expect(komponent.find(InfoVarsel)).to.have.length(1);
  });

  it('Skal vise en ArbeidsoppgaveKnapper', () => {
    expect(komponent.find(ArbeidsoppgaveKnapper)).to.have.length(1);
  });
});
