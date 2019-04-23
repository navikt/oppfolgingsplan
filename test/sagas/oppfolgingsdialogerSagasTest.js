import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { post } from 'digisyfo-npm';
import {
    get,
    post as postApiGateway,
    hentSyfoapiUrl,
    API_NAVN,
} from '../../js/gateway-api/gatewayApi';
import {
    avvisDialogSaga,
    hentSykmeldtOppfolginger,
    opprettOppfolgingsdialog,
    godkjennDialogSaga,
} from '../../js/sagas/oppfolgingsplan/oppfolgingsdialogerSagas';
import * as actions from '../../js/actions/oppfolgingsplan/oppfolgingsdialog_actions';

describe('oppfolgingsdialogerSagas', () => {
    let apiUrlBase;

    beforeEach(() => {
        apiUrlBase = hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE);
        process.env = {
            REACT_APP_OPPFOELGINGSDIALOGREST_ROOT: '/restoppfoelgingsdialog/api',
        };
    });

    describe('hentArbeidsgiversOppfolginger', () => {
        const generator = hentSykmeldtOppfolginger();

        it(`Skal dispatche ${actions.HENTER_OPPFOLGINGSDIALOGER}`, () => {
            const nextPut = put({
                type: actions.HENTER_OPPFOLGINGSDIALOGER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const url = `${apiUrlBase}/arbeidstaker/oppfolgingsplaner`;
            const nextCall = call(get, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette oppfolgingsdialoger henter', () => {
            const nextPut = put({
                type: actions.OPPFOLGINGSDIALOGER_HENTET,
                data: [],
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('opprettOppfolgingsdialog', () => {
        const virksomhetsnummer = '123';

        const generator = opprettOppfolgingsdialog({
            virksomhetsnummer,
        });

        it(`Skal dispatche ${actions.OPPRETTER_OPPFOLGINGSDIALOG}`, () => {
            const nextPut = put({
                type: actions.OPPRETTER_OPPFOLGINGSDIALOG,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${apiUrlBase}/arbeidstaker/oppfolgingsplaner`;
            const nextCall = call(postApiGateway, url, {
                virksomhetsnummer,
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dispatche ${actions.OPPFOLGINGSDIALOG_OPPRETTET}`, () => {
            const data = 1;
            const nextPut = put({
                type: actions.OPPFOLGINGSDIALOG_OPPRETTET,
                data,
            });
            expect(generator.next(data).value).to.deep.equal(nextPut);
        });
    });

    describe('godkjennOppfolgingsdialog', () => {
        const action = {
            id: '12345678',
            gyldighetstidspunkt: {},
            status: 'TRUE',
        };

        const generator = godkjennDialogSaga(action);

        it(`Skal dispatche ${actions.GODKJENNER_DIALOG}`, () => {
            const nextPut = put({
                type: actions.GODKJENNER_DIALOG,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/oppfoelgingsdialoger/actions/${action.id}/godkjenn?status=${action.status}&aktoer=arbeidstaker`;
            const nextCall = call(post, url, action.gyldighetstidspunkt);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dispatche ${actions.DIALOG_GODKJENT}`, () => {
            const nextPut = put({
                type: actions.DIALOG_GODKJENT,
                id: action.id,
                status: action.status,
                gyldighetstidspunkt: {},
            });
            expect(generator.next({}).value).to.deep.equal(nextPut);
        });
    });

    describe('avvisDialogSaga', () => {
        const action = {
            id: '12345678',
        };

        const generator = avvisDialogSaga(action);

        it(`Skal dispatche ${actions.AVVISER_DIALOG}`, () => {
            const nextPut = put({
                type: actions.AVVISER_DIALOG,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sende postcall', () => {
            const url = `${apiUrlBase}/oppfolgingsplan/actions/${action.id}/avvis`;
            const nextCall = call(post, url);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dispatche ${actions.DIALOG_AVVIST}`, () => {
            const nextPut = put({
                type: actions.DIALOG_AVVIST,
                id: action.id,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
