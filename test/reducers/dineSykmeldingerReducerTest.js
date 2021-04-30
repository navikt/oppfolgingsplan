import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import dineSykmeldinger from '../../js/reducers/dineSykmeldinger';
import * as actions from '../../js/actions/dineSykmeldinger_actions';

export function getSykmelding(soknad = {}) {
  return Object.assign(
    {},
    {
      id: '73970c89-1173-4d73-b1cb-e8445c2840e2',
      fnr: '12345678910',
      sykmeldingsperioder: [
        {
          fom: '2017-07-07',
          tom: '2017-07-23',
        },
      ],
      organisasjonsInformasjon: {
        orgnummer: '123456789',
        orgNavn: 'LOMMEN BARNEHAVE',
      },
    },
    soknad
  );
}

export function getParsetSykmelding(soknad = {}) {
  return Object.assign(
    {},
    {
      id: '73970c89-1173-4d73-b1cb-e8445c2840e2',
      fnr: '12345678910',
      sykmeldingsperioder: [
        {
          fom: new Date('2017-07-07'),
          tom: new Date('2017-07-23'),
        },
      ],
      organisasjonsInformasjon: {
        orgnummer: '123456789',
        orgNavn: 'LOMMEN BARNEHAVE',
      },
    },
    soknad
  );
}

describe('dineSykmeldingerReducer', () => {
  it('håndterer SET_DINE_SYKMELDINGER når man ikke har sykmeldinger fra før', () => {
    const initialState = deepFreeze({
      data: [],
    });
    const action = actions.setDineSykmeldinger([getSykmelding()]);
    const nextState = dineSykmeldinger(initialState, action);

    expect(nextState).to.deep.equal({
      data: [getParsetSykmelding()],
      henter: false,
      hentingFeilet: false,
      hentet: true,
    });
  });

  it('håndterer SET_DINE_SYKMELDINGER når datofelter er null', () => {
    const initialState = deepFreeze({
      data: [],
    });
    const action = actions.setDineSykmeldinger([getSykmelding({ identdato: null })]);
    const nextState = dineSykmeldinger(initialState, action);

    expect(nextState).to.deep.equal({
      data: [getParsetSykmelding({ identdato: null })],
      henter: false,
      hentingFeilet: false,
      hentet: true,
    });
  });

  it('håndterer SET_DINE_SYKMELDINGER når man har sykmeldinger fra før, ved å kun overskrive properties som finnes', () => {
    const initialState = deepFreeze({
      hentet: false,
      data: [getParsetSykmelding({ id: '55' }), getParsetSykmelding({ id: '44' })],
    });
    const action = actions.setDineSykmeldinger([
      getSykmelding({ id: '55', navn: 'Harald' }),
      getSykmelding({ id: '44' }),
    ]);
    const nextState = dineSykmeldinger(initialState, action);

    expect(nextState).to.deep.equal({
      data: [getParsetSykmelding({ id: '55', navn: 'Harald' }), getParsetSykmelding({ id: '44' })],
      henter: false,
      hentingFeilet: false,
      hentet: true,
    });
  });

  it('Parser datofelter', () => {
    const initialState = deepFreeze({
      hentet: false,
      data: [],
    });
    const action = actions.setDineSykmeldinger([getSykmelding()]);
    const nextState = dineSykmeldinger(initialState, action);
    expect(nextState.data).to.deep.equal([getParsetSykmelding()]);
  });

  it('Håndterer HENTER_DINE_SYKMELDINGER når man ikke har data fra før', () => {
    const initialState = deepFreeze({
      data: [],
    });
    const action = actions.henterDineSykmeldinger();
    const nextState = dineSykmeldinger(initialState, action);
    expect(nextState).to.deep.equal({
      data: [],
      henter: true,
      hentingFeilet: false,
      hentet: false,
    });
  });

  it('Håndterer HENTER_DINE_SYKMELDINGER når man har data fra før', () => {
    const initialState = deepFreeze({
      data: [
        {
          id: 77,
        },
        {
          id: 6789,
        },
      ],
    });
    const action = actions.henterDineSykmeldinger();
    const nextState = dineSykmeldinger(initialState, action);
    expect(nextState).to.deep.equal({
      data: [
        {
          id: 77,
        },
        {
          id: 6789,
        },
      ],
      henter: true,
      hentet: false,
      hentingFeilet: false,
    });
  });

  it('Håndterer HENT_DINE_SYKMELDINGER_FEILET', () => {
    const initialState = deepFreeze({
      hentet: true,
    });
    const action = actions.hentDineSykmeldingerFeilet();
    const nextState = dineSykmeldinger(initialState, action);
    expect(nextState).to.deep.equal({
      data: [],
      henter: false,
      hentingFeilet: true,
      hentet: true,
    });
  });
});
