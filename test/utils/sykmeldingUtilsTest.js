import sinon from 'sinon';
import chai from 'chai';
import {
    finnArbeidsgivereForGyldigeSykmeldinger,
    sykmeldtHarManglendeNaermesteLeder,
    sykmeldtHarNaermestelederHosArbeidsgiver,
    sykmeldtHarNaermestelederHosArbeidsgivere,
    finnSykmeldtSinNaermestelederNavnHosArbeidsgiver,
    sykmeldtHarInnsendtSykmelding,
} from '../../js/utils/sykmeldingUtils';
import {
    getSykmeldinger,
    getArbeidsgivere,
    getArbeidsgiver,
    hentSykmeldingIkkeGyldigForOppfoelging,
    hentSykmeldingGyldigForOppfoelging,
} from '../mock/mockSykmeldinger';
import { getLedere } from '../mock/mockLedere';

const expect = chai.expect;

describe('sykmeldingUtils', () => {
    let klokke;
    let sykmeldinger;
    let sykmeldingUgyldigForOppfolging;
    let sykmeldingGyldigForOppfolging;
    const dagensDato = new Date('2017-01-01');
    dagensDato.setHours(0, 0, 0, 0);

    beforeEach(() => {
        sykmeldinger = getSykmeldinger;
        klokke = sinon.useFakeTimers(dagensDato.getTime());
        sykmeldingUgyldigForOppfolging = hentSykmeldingIkkeGyldigForOppfoelging(dagensDato);
        sykmeldingGyldigForOppfolging = hentSykmeldingGyldigForOppfoelging(dagensDato);
    });

    afterEach(() => {
        klokke.restore();
    });
    const naermesteLedere = getLedere;
    const arbeidsgivereUtenNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: false,
    });
    const arbeidsgivereMedNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: true,
    });

    describe('sykmeldtHarInnsendtSykmelding', () => {
        it('skal returnere false med 1 sykmelding som er ugyldig for oppfolging)', () => {
            sykmeldinger = [sykmeldingUgyldigForOppfolging];
            expect(sykmeldtHarInnsendtSykmelding(sykmeldinger)).to.equal(false);
        });

        it('skal returnere true med 1 sykmelding som er gyldig for oppfolging)', () => {
            sykmeldinger = [sykmeldingGyldigForOppfolging];
            expect(sykmeldtHarInnsendtSykmelding(sykmeldinger)).to.equal(true);
        });
    });

    describe('finnArbeidsgivereForGyldigeSykmeldinger', () => {
        it('skal ikke returnere arbeidsgivere, naar sykmelding ikke er gyldig for oppfolging', () => {
            sykmeldinger = [sykmeldingUgyldigForOppfolging];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(0);
        });

        it('skal returnere 1 arbeidsgiver, når 1 sykmelding er ugyldig for oppfolging og 1 er gyldig', () => {
            sykmeldinger = [sykmeldingUgyldigForOppfolging, sykmeldingGyldigForOppfolging];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it('skal returnere 2 arbeidsgivere, når 2 sykmeldinger er gyldige for oppfolging', () => {
            sykmeldinger = [
                {
                    ...sykmeldingGyldigForOppfolging,
                    orgnummer: naermesteLedere[0].orgnummer,
                },
                {
                    ...sykmeldingGyldigForOppfolging,
                    orgnummer: naermesteLedere[1].orgnummer,
                },
            ];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(2);
        });

        it('skal returnere 1 arbeidsgiver, når det er duplikat av arbeidsgiver', () => {
            sykmeldinger = [sykmeldingGyldigForOppfolging, sykmeldingGyldigForOppfolging];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });
    });

    describe('sykmeldtHarNaermestelederHosArbeidsgiver', () => {
        let virksomhetsnummer;

        it('skal returnerere false', () => {
            virksomhetsnummer = '123456781';
            expect(sykmeldtHarNaermestelederHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal(false);
        });

        it('skal returnerere true', () => {
            virksomhetsnummer = '123456788';
            expect(sykmeldtHarNaermestelederHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal(true);
        });
    });

    describe('finnSykmeldtSinNaermestelederNavnHosArbeidsgiver', () => {
        let virksomhetsnummer;

        it('skal ikke returnerere en naermeste leder', () => {
            virksomhetsnummer = '123456781';
            expect(finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal(undefined);
        });

        it('skal returnerere en naermeste leder', () => {
            virksomhetsnummer = '123456789';
            expect(finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal('Navn-Navnolini Navnesen');
        });
    });

    describe('sykmeldtHarManglendeNaermesteLeder', () => {
        it('skal returnerere false', () => {
            const arbeidsgivere = [arbeidsgivereMedNaermesteLeder];
            expect(sykmeldtHarManglendeNaermesteLeder(arbeidsgivere)).to.equal(false);
        });

        it('skal returnerere true', () => {
            expect(sykmeldtHarManglendeNaermesteLeder(getArbeidsgivere)).to.equal(true);
        });
    });

    describe('sykmeldtHarNaermestelederHosArbeidsgivere', () => {
        it('skal returnerere false', () => {
            const arbeidsgivere = [arbeidsgivereUtenNaermesteLeder];
            expect(sykmeldtHarNaermestelederHosArbeidsgivere(arbeidsgivere)).to.equal(false);
        });

        it('skal returnerere true', () => {
            expect(sykmeldtHarNaermestelederHosArbeidsgivere(getArbeidsgivere)).to.equal(true);
        });
    });
});
