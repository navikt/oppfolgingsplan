import chai from 'chai';
import sinon from 'sinon';
import { leggTilDagerPaaDato } from '../testUtils';
import {
    erOppfolgingsdialogOpprettbarDirekte,
    finnAktiveOppfolgingsdialoger,
    finnNyesteTidligereOppfolgingsdialogMedVirksomhet,
    oppgaverOppfoelgingsdialoger,
    STATUS,
} from '../../js/utils/oppfolgingsdialogUtils';
import {
    hentSykmeldingIkkeGyldigForOppfoelging,
    hentSykmeldingGyldigForOppfoelging,
} from '../mock/mockSykmeldinger';
import getOppfolgingsdialog, {
    hentOppfolgingsdialogTidligere,
} from '../mock/mockOppfolgingsdialoger';

const expect = chai.expect;

describe('OppfolgingdialogUtils', () => {
    let klokke;
    const dagensDato = new Date('2017-01-02');

    beforeEach(() => {
        klokke = sinon.useFakeTimers(dagensDato.getTime());
    });

    afterEach(() => {
        klokke.restore();
    });

    describe('finnAktiveOppfolgingsdialoger', () => {
        const gyldighetstidspunktPassert = {
            tom: leggTilDagerPaaDato(dagensDato, -1),
        };
        const gyldighetstidspunktIkkePassert = {
            tom: leggTilDagerPaaDato(dagensDato, 1),
        };
        const virksomhet = {
            virksomhetsnummer: '12345678',
        };
        const sykmeldingUgyldig = {
            orgnummer: null,
        };
        const sykmeldingGyldigForOppfolging = {
            orgnummer: virksomhet.virksomhetsnummer,
        };

        it('finnAktiveOppfolgingsdialoger 1', () => {
            const dialog = [{
                godkjentPlan: null,
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt ikke er passer, om plan ikke er godkjent', () => {
            const dialog = [{
                godkjentPlan: null,
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt ikke er passert', () => {
            const dialog = [{
                godkjentPlan: {
                    gyldighetstidspunkt: gyldighetstidspunktIkkePassert,
                },
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(1);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om gyldighetstidspunkt er passert', () => {
            const dialog = [{
                godkjentPlan: {
                    gyldighetstidspunkt: gyldighetstidspunktPassert,
                },
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog)).to.have.length(0);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 1 plan, om det eksisterer en plan knyttet til gyldig sykmelding', () => {
            const sykmeldinger = [sykmeldingGyldigForOppfolging];
            const dialog = [{
                virksomhet,
                godkjentPlan: null,
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog, sykmeldinger)).to.have.length(1);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 0 planer, om det ikke eksisterer en plan knyttet til gyldig sykmelding', () => {
            const sykmeldinger = [sykmeldingUgyldig];
            const dialog = [{
                virksomhet,
                godkjentPlan: null,
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog, sykmeldinger)).to.have.length(0);
        });

        it('finnAktiveOppfolgingsdialoger skal returnere 0 planer, om det eksisterer en godkjent plan knyttet til gyldig sykmelding', () => {
            const sykmeldinger = [sykmeldingGyldigForOppfolging];
            const dialog = [{
                virksomhet,
                godkjentPlan: {
                    gyldighetstidspunkt: gyldighetstidspunktPassert,
                },
            }];
            expect(finnAktiveOppfolgingsdialoger(dialog, sykmeldinger)).to.have.length(0);
        });
    });

    describe('oppgaverOppfoelgingsdialoger', () => {
        let sykmeldingUgyldigForOppfolging;
        let sykmeldingGyldigForOppfolging;
        let oppfolgingsdialogUnderArbeid;

        beforeEach(() => {
            sykmeldingUgyldigForOppfolging = hentSykmeldingIkkeGyldigForOppfoelging(dagensDato);
            sykmeldingGyldigForOppfolging = hentSykmeldingGyldigForOppfoelging(dagensDato);
            oppfolgingsdialogUnderArbeid = {
                status: STATUS.UNDER_ARBEID,
                virksomhet: {
                    virksomhetsnummer: sykmeldingGyldigForOppfolging.orgnummer,
                },
                godkjenninger: [],
                sistEndretAv: {
                    fnr: 'arbedsgiverFnr',
                },
            };
        });

        describe('med gyldig sykmelding', () => {
            it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
                expect(oppgaverOppfoelgingsdialoger([], [sykmeldingGyldigForOppfolging])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [],
                });
            });

            it('Finner ny plan', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: null,
                    },
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldigForOppfolging])).to.deep.equal({
                    nyePlaner: [dialog],
                    avventendeGodkjenninger: [],
                });
            });

            it('Finner godkjent plan', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: new Date('2017-08-14'),
                    },
                    godkjenninger: [{
                        godkjent: true,
                        godkjentAv: {
                            fnr: 'arbedsgiverFnr',
                        },
                    }],
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldigForOppfolging])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [dialog],
                });
            });

            it('Ny og godkjent plan telles bare som en', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: null,
                    },
                    godkjenninger: [{
                        godkjent: true,
                        godkjentAv: {
                            fnr: 'arbedsgiverFnr',
                        },
                    }],
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldigForOppfolging])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [dialog],
                });
            });
        });

        describe('uten gyldig sykmelding', () => {
            it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
                expect(oppgaverOppfoelgingsdialoger([], [sykmeldingUgyldigForOppfolging])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [],
                });
            });

            it('Finner ikke ny plan', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: null,
                    },
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingUgyldigForOppfolging])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [],
                });
            });

            it('Finner ikke godkjent plan', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: new Date('2017-08-14'),
                    },
                    godkjenninger: [{
                        godkjent: true,
                        godkjentAv: {
                            fnr: 'arbedsgiverFnr',
                        },
                    }],
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingUgyldigForOppfolging])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [],
                });
            });
        });
    });

    describe('erOppfolgingsdialogOpprettbarDirekte', () => {
        let arbeidsgiver;
        let oppfolgingsdialogTidligere;
        let oppfolgingsdialogIkkeTidligere;

        beforeEach(() => {
            arbeidsgiver = {};
            oppfolgingsdialogTidligere = hentOppfolgingsdialogTidligere(dagensDato);
            oppfolgingsdialogIkkeTidligere = getOppfolgingsdialog({
                godkjentplan: null,
            });
        });

        it('Skal returneren false, om det er flere enn 1 AG og det er tidligere godkjent plan', () => {
            expect(erOppfolgingsdialogOpprettbarDirekte([arbeidsgiver, arbeidsgiver], [oppfolgingsdialogTidligere])).to.equal(false);
        });

        it('Skal returneren false, om det kun er 1 AG og det er tidligere godkjent plan', () => {
            expect(erOppfolgingsdialogOpprettbarDirekte([arbeidsgiver], [oppfolgingsdialogTidligere])).to.equal(false);
        });

        it('Skal returneren true, om det kun er 1 AG og det ikke er tidligere godkjent plan', () => {
            expect(erOppfolgingsdialogOpprettbarDirekte([arbeidsgiver], [oppfolgingsdialogIkkeTidligere])).to.equal(true);
        });
    });

    describe('finnNyesteTidligereOppfolgingsdialogMedVirksomhet', () => {
        let oppfolgingsdialogTidligere;
        let oppfolgingsdialogIkkeTidligere;
        let virksomhet;

        beforeEach(() => {
            virksomhet = { virksomhetsnummer: '12345678' };
            oppfolgingsdialogTidligere = {
                ...hentOppfolgingsdialogTidligere(dagensDato),
                virksomhet,
            };
            oppfolgingsdialogIkkeTidligere = {
                ...getOppfolgingsdialog(),
                virksomhet,
                godkjentplan: null,
            };
        });

        it('Skal ikke returnere tidligere dialog med virksomhet, om det det er plan med virksomhet som ikker er tidligere godkjent', () => {
            expect(finnNyesteTidligereOppfolgingsdialogMedVirksomhet([oppfolgingsdialogIkkeTidligere], virksomhet.virksomhetsnummer)).to.equal(undefined);
        });

        it('Skal ikke returnere tidligere dialog med virksomhet, om det det er tidligere godkjente plan med annen virksomhet', () => {
            expect(finnNyesteTidligereOppfolgingsdialogMedVirksomhet([oppfolgingsdialogTidligere], '1')).to.equal(undefined);
        });

        it('Skal returnere tidligere dialog med virksomhet, om det det er tidligere godkjente plan med virksomhet', () => {
            expect(finnNyesteTidligereOppfolgingsdialogMedVirksomhet([oppfolgingsdialogTidligere], virksomhet.virksomhetsnummer)).to.deep.equal(oppfolgingsdialogTidligere);
        });
    });
});
