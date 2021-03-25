import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as ledereActions from '../../js/actions/ledere_actions';
import * as actiontyper from '../../js/actions/actiontyper';

import ledere from '../../js/reducers/ledere';

describe('ledere', () => {
  it('Returnerer { data: [] } ved initializering', () => {
    const nextState = ledere();
    expect(nextState).to.deep.equal({ data: [] });
  });

  it('håndterer LEDERE_HENTET', () => {
    const initialState = deepFreeze({});
    const action = {
      type: actiontyper.LEDERE_HENTET,
      data: [
        {
          navn: 'Kurt Nilsen',
        },
        {
          navn: 'Hans Hansen',
        },
        {
          navn: 'Nina Knutsen',
        },
      ],
    };
    const nextState = ledere(initialState, action);

    expect(nextState).to.deep.equal({
      henter: false,
      hentingFeilet: false,
      hentet: true,
      data: [
        {
          navn: 'Kurt Nilsen',
        },
        {
          navn: 'Hans Hansen',
        },
        {
          navn: 'Nina Knutsen',
        },
      ],
    });
  });

  it('håndterer HENTER_LEDERE', () => {
    const initialState = deepFreeze({
      henter: false,
    });
    const action = {
      type: actiontyper.HENTER_LEDERE,
    };
    const nextState = ledere(initialState, action);
    expect(nextState).to.deep.equal({
      data: [],
      henter: true,
      hentet: false,
      hentingFeilet: false,
    });
  });

  it('håndterer HENT_LEDERE_FEILET', () => {
    const initialState = deepFreeze({
      henter: false,
    });
    const action = {
      type: actiontyper.HENT_LEDERE_FEILET,
    };
    const nextState = ledere(initialState, action);
    expect(nextState).to.deep.equal({
      henter: false,
      hentingFeilet: true,
      hentet: true,
      data: [],
    });
  });
});
