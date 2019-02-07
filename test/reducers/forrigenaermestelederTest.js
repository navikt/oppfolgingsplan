import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from '../../js/actions/oppfolgingsplan/forrigeNaermesteLeder_actions';
import forrigenaermesteleder from '../../js/reducers/forrigenaermesteleder';

describe('forrigenaermesteleder', () => {
    describe('henter', () => {
        const initialState = deepFreeze({
            henter: [],
            hentet: [],
            hentingFeilet: [],
            data: [],
        });

        it(`håndterer ${actions.HENTER_FORRIGE_NAERMESTELEDER}`, () => {
            const action = actions.henterForrigeNaermesteLeder('fnr', '123');
            const nextState = forrigenaermesteleder(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [{
                    fnr: 'fnr',
                    virksomhetsnummer: '123',
                }],
                hentet: [],
                hentingFeilet: [],
                data: [],
            });
        });

        it(`håndterer ${actions.FORRIGE_NAERMESTELEDER_HENTET}`, () => {
            const action = actions.forrigeNaermesteLederHentet({
                fnr: 'nlfnr',
                virksomhetsnummer: '123',
            }, 'fnr', '123');
            const nextState = forrigenaermesteleder(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [{
                    fnr: 'fnr',
                    virksomhetsnummer: '123',
                }],
                hentingFeilet: [],
                data: [{
                    fnr: 'fnr',
                    virksomhetsnummer: '123',
                    forrigeNaermesteLeder: {
                        fnr: 'nlfnr',
                        virksomhetsnummer: '123',
                    },
                }],
            });
        });

        it(`håndterer ${actions.HENT_FORRIGE_NAERMESTELEDER_FEILET}`, () => {
            const action = actions.hentForrigeNaermesteLederFeilet('fnr', '123');
            const nextState = forrigenaermesteleder(initialState, action);
            expect(nextState).to.deep.equal({
                henter: [],
                hentet: [],
                hentingFeilet: [{
                    fnr: 'fnr',
                    virksomhetsnummer: '123',
                }],
                data: [],
            });
        });
    });
});
