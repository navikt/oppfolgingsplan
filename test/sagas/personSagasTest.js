import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    API_NAVN,
    hentSyfoapiUrl,
    get,
} from '../../js/gateway-api/gatewayApi';
import { hentPersonSaga } from '../../js/sagas/oppfolgingsplan/personSagas';
import * as actions from '../../js/actions/oppfolgingsplan/person_actions';

describe('personSagas', () => {
    let apiUrlBase;
    const fnr = '10101010101';

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('hentPersonSaga', () => {
        const action = {
            fnr,
        };
        const generator = hentPersonSaga(action);

        it(`Skal dispatche ${actions.HENTER_PERSON}`, () => {
            const nextPut = put({
                type: actions.HENTER_PERSON,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle endepunkt', () => {
            const url = `${apiUrlBase}/person/${action.fnr}`;
            const nextCall = call(get, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.PERSON_HENTET}`, () => {
            const nextPut = put({
                type: actions.PERSON_HENTET,
                person: {},
                fnr,
            });
            expect(generator.next({}).value).to.deep.equal(nextPut);
        });
    });
});
