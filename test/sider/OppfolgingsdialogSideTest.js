import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import {
    mapStateToProps,
    Container,
} from '../../js/sider/OppfolgingsdialogSide';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import Oppfolgingsdialog from '../../js/components/oppfolgingsdialoger/Oppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Container', () => {
    describe('mapStateToProps', () => {
        let clock;
        const dagensDato = new Date('2017-01-01');
        beforeEach(() => {
            clock = sinon.useFakeTimers(dagensDato.getTime());
        });

        afterEach(() => {
            clock.restore();
        });

        const ownProps = {
            params: {
                oppfolgingsdialogId: '1',
            },
        };
        const state = {
            ledetekster: {
                data: {
                    'min.tekst': 'Dette er en test',
                },
            },
            dineSykmeldinger: {
                data: [],
            },
            oppfolgingsdialoger: {
                data: [{
                    id: ownProps.params.oppfolgingsdialogId,
                    virksomhet: {
                        virksomhetsnummer: '12345678',
                    },
                    arbeidstaker: {
                        fnr: '81549300',
                    },
                    arbeidsgiver: {
                        naermesteLeder: {},
                        forrigeNaermesteLeder: {},
                    },
                    sistEndretAv: {},
                    arbeidsoppgaveListe: [],
                    tiltakListe: [],
                    godkjenninger: [],
                }],
            },
            arbeidsforhold: {
                data: [],
            },
            forrigenaermesteleder: null,
            kontaktinfo: {
                data: [],
            },
            naermesteleder: {
                data: [],
            },
            person: {
                data: [],
            },
            virksomhet: {
                data: [],
            },
            tilgang: {
                data: {
                    harTilgang: true,
                    ikkeTilgangGrunn: null,
                },
            },
            avbrytdialogReducer: {

            },
            nullstill: {

            },
            samtykke: {

            },
            sykeforlopsPerioder: {
                data: [],
            },
        };

        it('Skal returnere props', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.henter).to.deep.equal(undefined);
        });
    });

    describe('Container', () => {
        let sjekkTilgang;
        let hentOppfolgingsdialoger;
        let settDialog;
        let hentArbeidsforhold;
        let hentDineSykmeldinger;
        let hentToggles;
        let dineSykmeldinger;
        let toggles;
        let tilgang;
        let oppfolgingsdialogerReducer;
        let navigasjontoggles;
        const harTilgang = {
            harTilgang: true,
        };
        const ikkeTilgang = {
            harTilgang: false,
        };
        beforeEach(() => {
            dineSykmeldinger = {
                henter: false,
                hentet: false,
                hentingFeilet: false,
                data: [],
            };
            toggles = {
                henter: false,
                hentet: false,
            };
            navigasjontoggles = {
                steg: 1,
            };
            tilgang = {};
            oppfolgingsdialogerReducer = {};

            sjekkTilgang = sinon.spy();
            hentOppfolgingsdialoger = sinon.spy();
            settDialog = sinon.spy();
            hentArbeidsforhold = sinon.spy();
            hentDineSykmeldinger = sinon.spy();
            hentToggles = sinon.spy();
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<Container
                tilgang={tilgang}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                henter
                hentet={false}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise spinner dersom sender', () => {
            const component = shallow(<Container
                tilgang={tilgang}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                sender
                hentet={false}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom hentingFeilet', () => {
            const component = shallow(<Container
                tilgang={tilgang}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                hentet={false}
                hentingFeilet
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom sendingFeilet', () => {
            const component = shallow(<Container
                tilgang={tilgang}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                hentet={false}
                sendingFeilet
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom sykmeldt ikke har tilgang', () => {
            const component = shallow(<Container
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: ikkeTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise Oppfolgingsdialog dersom henting er OK, og erOppfolgingsdialogTilgjengelig er true', () => {
            const component = shallow(<Container
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                dineSykmeldinger={dineSykmeldinger}
                oppfolgingsdialoger={[]}
                tilgang={{ data: harTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
                navigasjontoggles={navigasjontoggles}
                erOppfolgingsdialogTilgjengelig
            />);
            expect(component.find(Oppfolgingsdialog)).to.have.length(1);
        });
    });
});
