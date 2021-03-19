import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as actions from '../../js/actions/oppfolgingsplan/sjekkTilgang_actions';
import tilgang from '../../js/reducers/tilgang';

describe('tilgang', () => {
  describe('henter', () => {
    let initialState = deepFreeze({
      data: {},
      henter: false,
      hentet: false,
      hentingFeilet: false,
    });

    it('håndterer SJEKKER_TILGANG', () => {
      const action = actions.sjekkerTilgang();
      const nextState = tilgang(initialState, action);
      expect(nextState).to.deep.equal({
        henter: true,
        hentet: false,
        hentingFeilet: false,
        data: {},
      });
    });

    it('håndterer SJEKKET_TILGANG', () => {
      const action = actions.sjekketTilgang({ tilgang: 'tilgang' });
      const nextState = tilgang(initialState, action);

      expect(nextState).to.deep.equal({
        henter: false,
        hentet: true,
        hentingFeilet: false,
        data: { tilgang: 'tilgang' },
      });
    });

    it('håndterer SJEKK_TILGANG_FEILET', () => {
      initialState = deepFreeze({
        henter: false,
        hentet: false,
        hentingFeilet: true,
        data: {},
      });

      const action = actions.sjekkTilgangFeilet();
      const nextState = tilgang(initialState, action);
      expect(nextState).to.deep.equal({
        henter: false,
        hentet: false,
        hentingFeilet: true,
        data: {},
      });
    });
  });
});
