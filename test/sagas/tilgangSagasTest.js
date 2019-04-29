import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import {
    get,
    hentSyfoapiUrl,
    API_NAVN,
} from '../../js/gateway-api/gatewayApi';
import { sjekkerTilgang } from '../../js/sagas/oppfolgingsplan/tilgangSagas';
import * as actions from '../../js/actions/oppfolgingsplan/sjekkTilgang_actions';

describe('tilgangSagas', () => {
    let apiUrlBase;

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
    });

    describe('sjekkerTilgang', () => {
        const generator = sjekkerTilgang({});

        it(`Skal dispatche ${actions.SJEKKER_TILGANG}`, () => {
            const nextPut = put({
                type: actions.SJEKKER_TILGANG,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/tilgang`;
            const nextCall = call(get, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${actions.SJEKKET_TILGANG}`, () => {
            const nextPut = put({
                type: actions.SJEKKET_TILGANG,
                data: {
                    noedata: 'noedata',
                },
            });
            expect(generator.next({
                noedata: 'noedata',
            }).value).to.deep.equal(nextPut);
        });
    });
});
