import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { post } from 'digisyfo-npm';
import {
    post as postGatewayApi,
    hentSyfoapiUrl,
    API_NAVN,
} from '../../js/gateway-api/gatewayApi';
import { lagreArbeidsoppgave, slettArbeidsoppgave } from '../../js/sagas/oppfolgingsplan/arbeidsoppgaveSagas';
import * as actions from '../../js/actions/oppfolgingsplan/arbeidsoppgave_actions';

describe('arbeidsoppgaveSagas', () => {
    let apiUrlBase;
    const fnr = '12345678';
    const arbeidsoppgaveId = 1;

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('lagreArbeidsoppgave', () => {
        const generator = lagreArbeidsoppgave({
            arbeidsoppgave: {
                arbeidsoppgavenavn: 'navn',
                arbeidsoppgaveId: 1,
            },
            id: '123',
            fnr: '12345678',
            arbeidsoppgaveId: 1,
        });

        it('Skal dispatche LAGRER_ARBEIDSOPPGAVE', () => {
            const nextPut = put({
                type: actions.LAGRER_ARBEIDSOPPGAVE,
                fnr,
                arbeidsoppgaveId,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/123/lagreArbeidsoppgave`;
            const nextCall = call(post, url, {
                arbeidsoppgavenavn: 'navn',
                arbeidsoppgaveId: 1,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette arbeidsoppgave lagret', () => {
            const nextPut = put({
                type: actions.ARBEIDSOPPGAVE_LAGRET,
                data: 1,
                id: '123',
                arbeidsoppgave: {
                    arbeidsoppgavenavn: 'navn',
                    arbeidsoppgaveId: 1,
                },
                fnr: '12345678',
            });
            expect(generator.next(1).value).to.deep.equal(nextPut);
        });
    });

    describe('slettArbeidsoppgave', () => {
        const generator = slettArbeidsoppgave({
            arbeidsoppgaveId: '123',
            id: '1',
            fnr,
        });

        it('Skal dispatche SLETTER_ARBEIDSOPPGAVE', () => {
            const nextPut = put({
                type: actions.SLETTER_ARBEIDSOPPGAVE,
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${apiUrlBase}/arbeidsoppgave/actions/123/slett`;
            const nextCall = call(postGatewayApi, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette arbeidsoppgave til slettet', () => {
            const nextPut = put({
                type: actions.ARBEIDSOPPGAVE_SLETTET,
                arbeidsoppgaveId: '123',
                id: '1',
                fnr,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});