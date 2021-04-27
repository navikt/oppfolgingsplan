import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentDineSykmeldinger } from '../../js/sagas/dineSykmeldingerSagas';
import * as actiontyper from '../../js/actions/actiontyper';
import { get } from '../../js/gateway-api';
import { API_NAVN, hentSyfoapiUrl } from '../../js/gateway-api';

describe('dineSykmeldingerSagas', () => {
  const generator = hentDineSykmeldinger();
  let apiUrlBase;

  beforeEach(() => {
    apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
  });

  it('Skal dispatche HENTER_DINE_SYKMELDINGER', () => {
    const nextPut = put({ type: actiontyper.HENTER_DINE_SYKMELDINGER });
    expect(generator.next().value).to.deep.equal(nextPut);
  });

  it('Skal dernest hente dine sykmeldinger', () => {
    const nextCall = call(get, `${apiUrlBase}/sykmeldinger`);
    expect(generator.next().value).to.deep.equal(nextCall);
  });

  it('Skal dernest sette dine sykmeldinger', () => {
    const sykmeldinger = [
      {
        id: 1,
        sykmeldingsperioder: [
          {
            fom: new Date('2017-04-15'),
            tom: new Date('2017-04-25'),
          },
        ],
      },
    ];
    const nextPut = put({
      type: actiontyper.SET_DINE_SYKMELDINGER,
      sykmeldinger,
    });
    expect(generator.next(sykmeldinger).value).to.deep.equal(nextPut);
  });
});
