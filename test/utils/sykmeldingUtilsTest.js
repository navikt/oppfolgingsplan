import sinon from 'sinon';
import chai from 'chai';
import { MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING } from 'oppfolgingsdialog-npm';
import {
    finnArbeidsgivereForGyldigeSykmeldinger,
    sykmeldtHarManglendeNaermesteLeder,
    sykmeldtHarNaermestelederHosArbeidsgivere,
} from '../../js/utils/sykmeldingUtils';
import getSykmelding, {
    getArbeidsgivere,
    getArbeidsgiver,
} from '../mock/mockSykmeldinger';
import { getLedere } from '../mock/mockLedere';

const expect = chai.expect;

const MILLISEKUNDER_PER_DAG = 86400000;

export const trekkDagerFraDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() - (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const leggTilDagerPaaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const trekkMnderFraDato = (dato, mnder) => {
    const nyDato = new Date(dato);
    nyDato.setMonth(nyDato.getMonth() - mnder);
    return new Date(nyDato);
};

export const trekkMnderOgDagerFraDato = (dato, mnder, dager) => {
    let nyDato = new Date(dato);
    nyDato = trekkMnderFraDato(nyDato, mnder);
    nyDato = trekkDagerFraDato(nyDato, dager);
    return new Date(nyDato);
};

export const hentsykmeldingUgyldig = (dagensDato) => {
    return getSykmelding({
        orgnummer: null,
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 3).toISOString(),
                    tom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2).toISOString(),
                },
                {
                    fom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1).toISOString(),
                    tom: trekkMnderOgDagerFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, 1).toISOString(),
                },
            ],
        },
    });
};

export const hentSykmeldingUtgaatt = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 3).toISOString(),
                    tom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2).toISOString(),
                },
                {
                    fom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1).toISOString(),
                    tom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING).toISOString(),
                },
            ],
        },
    });
};

export const hentSykmeldingAktiv = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkDagerFraDato(dagensDato, 35).toISOString(),
                    tom: trekkDagerFraDato(dagensDato, 5).toISOString(),
                },
                {
                    fom: trekkDagerFraDato(dagensDato, 5).toISOString(),
                    tom: leggTilDagerPaaDato(dagensDato, 35).toISOString(),
                },
            ],
        },
    });
};

describe('sykmeldingUtils', () => {
    let clock;
    const today = new Date('2017-01-01');
    today.setHours(0, 0, 0, 0);

    beforeEach(() => {
        clock = sinon.useFakeTimers(today.getTime());
    });

    afterEach(() => {
        clock.restore();
    });
    const naermesteLedere = getLedere;
    const arbeidsgivereUtenNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: false,
    });
    const arbeidsgivereMedNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: true,
    });

    describe('finnArbeidsgivereForGyldigeSykmeldinger', () => {
        it('skal returnere 2 arbeidsgivere, når 2 sykmeldinger er aktive', () => {
            expect(finnArbeidsgivereForGyldigeSykmeldinger(naermesteLedere)).to.have.length(2);
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
