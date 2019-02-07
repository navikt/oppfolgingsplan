import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as oppfolgingsdialogActions from '../../js/actions/oppfolgingsplan/oppfolgingsdialog_actions';
import * as nullstillGodkjenningAction from '../../js/actions/oppfolgingsplan/nullstillGodkjenning_actions';
import * as samtykkeAction from '../../js/actions/oppfolgingsplan/samtykke_actions';
import * as arbeidsoppgaveAction from '../../js/actions/oppfolgingsplan/arbeidsoppgave_actions';
import * as tiltakAction from '../../js/actions/oppfolgingsplan/tiltak_actions';
import oppfolgingsdialoger from '../../js/reducers/oppfolgingsdialog';
import getOppfolgingsdialog from '../mock/mockOppfolgingsdialog';

describe('oppfolgingsdialoger', () => {
    const mockdata = {
        oppfolgingsdialoger: [getOppfolgingsdialog()],
    };

    describe('henter', () => {
        let initialState = deepFreeze({
            data: [],
            henter: false,
            hentet: false,
            hentingFeilet: false,
        });

        it('håndterer NULLSTILT_GODKJENNING', () => {
            const action = nullstillGodkjenningAction.nullstiltGodkjenning(mockdata.oppfolgingsdialoger);
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                hentet: false,
                hentingFeilet: false,
            });
        });

        it('håndterer AVVIS_DIALOG_FEILET', () => {
            const action = oppfolgingsdialogActions.avvisDialogFeilet();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                godkjenner: false,
                avvist: false,
                avvisFeilet: true,
                henter: false,
                hentet: false,
                hentingFeilet: false,
            });
        });

        it('håndterer SAMTYKKE_GITT', () => {
            const action = samtykkeAction.samtykkeGitt(1, true);
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                hentet: false,
                hentingFeilet: false,
            });
        });

        it('håndterer SAMTYKKE_GITT forskjell ID', () => {
            const initialStateMedData = deepFreeze({
                data: mockdata.oppfolgingsdialoger,
                henter: false,
                hentet: false,
                hentingFeilet: false,
            });
            const action = samtykkeAction.samtykkeGitt(2, true);
            const nextState = oppfolgingsdialoger(initialStateMedData, action);
            expect(nextState).to.deep.equal({
                data: [mockdata.oppfolgingsdialoger[0]],
                henter: false,
                hentet: false,
                hentingFeilet: false,
            });
        });

        it('håndterer DIALOG_AVVIST endret Id', () => {
            const initialStateMedData = deepFreeze({
                data: mockdata.oppfolgingsdialoger,
                henter: false,
                hentet: false,
                hentingFeilet: false,
            });
            const action = oppfolgingsdialogActions.dialogAvvist(2, true);
            const nextState = oppfolgingsdialoger(initialStateMedData, action);
            expect(nextState).to.deep.equal({
                data: [mockdata.oppfolgingsdialoger[0]],
                henter: false,
                hentet: false,
                hentingFeilet: false,
                avvisFeilet: false,
                avvist: true,
                avviser: false,
            });
        });

        it('håndterer AVVISER_DIALOG', () => {
            const action = oppfolgingsdialogActions.avviserDialog();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                hentet: false,
                hentingFeilet: false,
                avviser: true,
                avvist: false,
                avvisFeilet: false,
            });
        });

        it('håndterer GODKJENN_DIALOG_FEILET', () => {
            const action = oppfolgingsdialogActions.godkjennDialogFeilet();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                hentet: false,
                hentingFeilet: false,
                godkjenner: false,
                godkjenningFeilet: true,
            });
        });

        it('håndterer GODKJENNER_DIALOG', () => {
            const action = oppfolgingsdialogActions.godkjennerDialog();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                hentet: false,
                hentingFeilet: false,
                godkjenner: true,
                godkjenningFeilet: false,
                godkjent: false,
            });
        });

        it('håndterer OPPFOLGINGSDIALOGER_HENTET', () => {
            const action = oppfolgingsdialogActions.oppfolgingsdialogerHentet(mockdata.oppfolgingsdialoger);
            const nextState = oppfolgingsdialoger(initialState, action);

            expect(nextState).to.deep.equal({
                data: mockdata.oppfolgingsdialoger,
                henter: false,
                hentet: true,
                hentingFeilet: false,
            });
        });

        it('håndterer HENTER_OPPFOLGINGSDIALOGER', () => {
            const action = oppfolgingsdialogActions.henterOppfolgingsdialoger();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: true,
                hentet: false,
                hentingFeilet: false,
            });
        });


        it('håndterer HENT_OPPFOLGINGSDIALOGER_FEILET', () => {
            initialState = deepFreeze({
                data: [],
                henter: false,
                hentet: false,
                hentingFeilet: false,
            });

            const action = oppfolgingsdialogActions.hentOppfolgingsdialogerFeilet();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: false,
                hentet: false,
                hentingFeilet: true,
            });
        });
    });

    describe('oppretter', () => {
        const initialState = deepFreeze({
            oppretter: false,
            opprettet: false,
            opprettingFeilet: false,
            opprettetId: 0,
        });

        it('håndterer OPPRETTER_OPPFOLGINGSDIALOG', () => {
            const action = oppfolgingsdialogActions.oppretterOppfolgingsdialog();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                oppretter: true,
                opprettet: false,
                opprettingFeilet: false,
                opprettetId: 0,
            });
        });

        it('håndterer OPPFOLGINGSDIALOG_OPPRETTET', () => {
            const action = oppfolgingsdialogActions.oppfolgingsdialogOpprettet(1);
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                oppretter: false,
                opprettet: true,
                opprettingFeilet: false,
                opprettetId: 1,
            });
        });

        it('håndterer OPPRETT_OPPFOLGINGSDIALOG_FEILET', () => {
            const action = oppfolgingsdialogActions.opprettOppfolgingsdialogFeilet();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                oppretter: false,
                opprettet: false,
                opprettingFeilet: true,
                opprettetId: 0,
            });
        });
    });

    describe('godkjenner', () => {
        const initialState = deepFreeze({
            godkjenner: false,
            godkjent: false,
            godkjenningFeilet: false,
            data: [],
        });

        it('håndterer GODKJENNER_OPPFOLGINGSDIALOG', () => {
            const action = oppfolgingsdialogActions.godkjennerDialog();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                godkjenner: true,
                godkjent: false,
                godkjenningFeilet: false,
                data: [],
            });
        });


        it('håndterer OPPFOLGINGSDIALOG_GODKJENT', () => {
            const action = oppfolgingsdialogActions.dialogGodkjent();
            const nextState = oppfolgingsdialoger(initialState, action);

            expect(nextState).to.deep.equal({
                godkjenner: false,
                godkjent: true,
                godkjenningFeilet: false,
                data: [],
            });
        });

        it('håndterer DIALOG_GODKJENT med data', () => {
            const initialStateMedData = deepFreeze({
                data: mockdata.oppfolgingsdialoger,
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
            });

            const action = oppfolgingsdialogActions.dialogGodkjent(2, 'tvungenGodkjenning', new Date());
            const nextState = oppfolgingsdialoger(initialStateMedData, action);
            expect(nextState).to.deep.equal({
                godkjenner: false,
                godkjent: true,
                godkjenningFeilet: false,
                data: [mockdata.oppfolgingsdialoger[0]],
            });
        });

        it('håndterer TILTAK_SLETTET endret ID', () => {
            const initialStateMedData = deepFreeze({
                data: mockdata.oppfolgingsdialoger,
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
            });
            const action = tiltakAction.tiltakSlettet(2, 1);
            const nextState = oppfolgingsdialoger(initialStateMedData, action);
            expect(nextState).to.deep.equal({
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
                data: [mockdata.oppfolgingsdialoger[0]],
            });
        });

        it('håndterer TILTAK_LAGRET endret ID', () => {
            const initialStateMedData = deepFreeze({
                data: mockdata.oppfolgingsdialoger,
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
            });
            const action = tiltakAction.tiltakLagret(2, mockdata.oppfolgingsdialoger, mockdata.oppfolgingsdialoger[0].tiltakListe);
            const nextState = oppfolgingsdialoger(initialStateMedData, action);
            expect(nextState).to.deep.equal({
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
                data: [mockdata.oppfolgingsdialoger[0]],
            });
        });

        it('håndterer ARBEIDSOPPGAVE_SLETTET', () => {
            const oppdatertMock = [{
                ...mockdata.oppfolgingsdialoger[0],
                sistEndretAv: {
                    fnr: '1000028253764',
                },
            }];
            const initialStateMedData = deepFreeze({
                data: oppdatertMock,
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
            });
            const action = arbeidsoppgaveAction.arbeidsoppgaveSlettet(1, 1);
            const nextState = oppfolgingsdialoger(initialStateMedData, action);
            expect(nextState).to.deep.equal({
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
                data: [oppdatertMock[0]],
            });
        });

        it('håndterer TILTAK_SLETTET', () => {
            const oppdatertMock = [{
                ...mockdata.oppfolgingsdialoger[0],
                sistEndretAv: {
                    fnr: '1000028253764',
                },
            }];
            const initialStateMedData = deepFreeze({
                data: oppdatertMock,
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
            });
            const action = tiltakAction.tiltakSlettet(1, 1);
            const nextState = oppfolgingsdialoger(initialStateMedData, action);
            expect(nextState).to.deep.equal({
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
                data: [oppdatertMock[0]],
            });
        });

        it('håndterer TILTAK_LAGRET', () => {
            const action = tiltakAction.tiltakLagret(1, mockdata.oppfolgingsdialoger, mockdata.oppfolgingsdialoger[0].tiltakListe);
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
                data: [],
            });
        });

        it('håndterer ARBEIDSOPPGAVE_LAGRET', () => {
            const action = arbeidsoppgaveAction.arbeidsoppgaveLagret(1, mockdata.oppfolgingsdialoger, mockdata.oppfolgingsdialoger[0].arbeidsoppgaveListe);
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: false,
                data: [],
            });
        });

        it('håndterer GODKJENN_OPPFOLGINGSDIALOG_FEILET', () => {
            const action = oppfolgingsdialogActions.godkjennDialogFeilet();
            const nextState = oppfolgingsdialoger(initialState, action);
            expect(nextState).to.deep.equal({
                godkjenner: false,
                godkjent: false,
                godkjenningFeilet: true,
                data: [],
            });
        });
    });
});
