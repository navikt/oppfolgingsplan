import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/sjekkTilgang_actions';

describe('tilgang_actions', () => {
  it('Skal ha en sjekkTilgang()-funksjon som returnerer riktig action', () => {
    expect(actions.sjekkTilgang()).to.deep.equal({
      type: actions.SJEKK_TILGANG_FORESPURT,
    });
  });

  it('Skal ha en sjekkerTilgang()-funksjon som returnerer riktig action', () => {
    expect(actions.sjekkerTilgang()).to.deep.equal({
      type: actions.SJEKKER_TILGANG,
    });
  });

  it('har en sjekketTilgang()-funksjon som returnerer riktig action', () => {
    expect(actions.sjekketTilgang([{ tilgang: 'tilgang' }])).to.deep.equal({
      type: actions.SJEKKET_TILGANG,
      data: [{ tilgang: 'tilgang' }],
    });
  });

  it('Skal ha en sjekkTilgangFeilet()-funksjon som returnerer riktig action', () => {
    expect(actions.sjekkTilgangFeilet()).to.deep.equal({
      type: actions.SJEKK_TILGANG_FEILET,
    });
  });
});
