import { expect } from 'chai';

import * as actions from '../../js/actions/ledere_actions';
import * as actiontyper from '../../js/actions/actiontyper';

describe('ledere_actions', () => {
    it('Har en hentLedere()-funksjon', () => {
        const res = actions.hentLedere();
        expect(res).to.deep.equal({
            type: actiontyper.HENT_LEDERE_FORESPURT,
        });
    });
});
