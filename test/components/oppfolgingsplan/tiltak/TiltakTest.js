import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import Tiltak from '../../../../js/components/oppfolgingsplan/tiltak/Tiltak';
import TiltakListe from '../../../../js/components/oppfolgingsplan/tiltak/liste/TiltakListe';
import TiltakSkjema from '../../../../js/components/oppfolgingsplan/tiltak/TiltakSkjema';
import getOppfolgingsdialog from '../../../mock/mockOppfolgingsdialoger';
import OppfolgingsplanInfoboks from '../../../../js/components/app/OppfolgingsplanInfoboks';
import LeggTilElementKnapper from '../../../../js/components/oppfolgingsplan/LeggTilElementKnapper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Tiltak', () => {
    let component;
    let arbeidsgiver;
    let arbeidstaker;
    let lagreTiltak;
    let slettTiltak;
    let tiltak;
    const oppfolgingsdialog = getOppfolgingsdialog();
    function storageMock() {
        const storage = {};

        return {
            setItem(key, value) {
                storage[key] = value || '';
            },
            getItem(key) {
                return key in storage ? storage[key] : null;
            },
            removeItem(key) {
                delete storage[key];
            },
            get length() {
                return Object.keys(storage).length;
            },
            key(i) {
                const keys = Object.keys(storage);
                return keys[i] || null;
            },
        };
    }
    beforeEach(() => {
        lagreTiltak = sinon.spy();
        slettTiltak = sinon.spy();
        tiltak = {};
        window.sessionStorage = storageMock();
        arbeidsgiver = {
            naermesteLeder: {
                navn: 'Arbeidsgiver',
                fnr: '1234567891000',
            },
        };
        arbeidstaker = {
            navn: 'Arbeidstaker',
            fnr: '1234567891000',
            sistInnlogget: '2017-01-01T00:00:00.000',
        };
    });

    it('Skal vise feilmelding dersom lagring av ny tiltak feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            tiltak={{
                lagringFeilet: false,
            }}
        />);
        component.setProps({ tiltak: { lagringFeilet: true } });
        expect(component.state().varselTekst).to.equal('En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.');
    });

    it('Skal ikke vise feilmelding dersom lagring av ny tiltak ikke feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            tiltak={{
                lagringFeilet: false,
                feiletTiltakId: 5,
            }}
        />);
        component.setProps({ tiltak: { lagringFeilet: true, feiletTiltakId: 5 } });
        expect(component.state().varselTekst).to.equal('');
    });

    describe('Oppfolgingsdialog uten Tiltak', () => {
        let oppfolgingsdialogUtenTiltak;
        let componentUtenTiltak;
        beforeEach(() => {
            oppfolgingsdialogUtenTiltak = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                tiltakListe: [],
            });
            componentUtenTiltak = shallow(<Tiltak
                tiltak={tiltak}
                oppfolgingsdialog={oppfolgingsdialogUtenTiltak}
                oppfolgingsdialogerHentet
                lagreTiltak={lagreTiltak}
                slettTiltak={slettTiltak}
            />);
        });
        it('Skal vise OppfolgingsplanInfoboks, om det ikke er tiltak', () => {
            expect(componentUtenTiltak.find(OppfolgingsplanInfoboks)).to.have.length(1);
        });

        it('Skal vise LeggTilElementKnapper, om det ikke er tiltak', () => {
            expect(componentUtenTiltak.find(LeggTilElementKnapper)).to.have.length(1);
        });

        it('Skal vise TiltakSkjema, om det ikke er tiltak og visTiltakSkjema er true', () => {
            componentUtenTiltak.setState({
                visTiltakSkjema: true,
            });
            expect(componentUtenTiltak.find(TiltakSkjema)).to.have.length(1);
        });
    });

    describe('Oppfolgingsdialog med Tiltak', () => {
        let componentMedTiltak;
        beforeEach(() => {
            componentMedTiltak = shallow(<Tiltak
                oppfolgingsdialog={oppfolgingsdialog}
                oppfolgingsdialogerHentet
                lagreTiltak={lagreTiltak}
                slettTiltak={slettTiltak}
                tiltak={{ lagret: true }}
            />);
        });

        it('Skal vise TiltakListe, om det er tiltak', () => {
            expect(componentMedTiltak.find(TiltakListe)).to.have.length(1);
        });

        it('Skal vise TiltakListe, om det er tiltak og visTiltakSkjema er true', () => {
            componentMedTiltak.setState({
                visTiltakSkjema: true,
            });
            expect(componentMedTiltak.find(TiltakListe)).to.have.length(1);
        });

        it('Skal vise TiltakListe, om det er tiltak og visTiltakSkjema er false', () => {
            expect(componentMedTiltak.find(TiltakListe)).to.have.length(1);
        });
    });
});
