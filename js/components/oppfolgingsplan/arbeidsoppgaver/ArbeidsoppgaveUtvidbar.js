import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { erSynligIViewport } from '@navikt/digisyfo-npm';
import {
    arbeidsoppgavePt,
    arbeidsoppgaverReducerPt,
} from '../../../propTypes/opproptypes';
import ArbeidsoppgaveInformasjon from './ArbeidsoppgaveInformasjon';
import ArbeidsoppgaveUtvidbarOverskrift from './ArbeidsoppgaveUtvidbarOverskrift';
import LagreArbeidsoppgaveSkjema from './LagreArbeidsoppgaveSkjema';
import ArbeidsoppgaveVarselFeil from './ArbeidsoppgaveVarselFeil';

const texts = {
    updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
};

const ArbeidsoppgaveVarselFeilStyled = styled.div`
    padding: 0 1em;
`;

class ArbeidsoppgaveUtvidbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: props.erApen,
            containerClassName: '',
            hindreToggle: false,
            hoyde: !props.erApen ? '0' : 'auto',
            visInnhold: props.erApen,
            harTransisjon: false,
            visLagreSkjema: false,
            visLagringFeilet: false,
            visSlettingFeilet: false,
            varselTekst: '',
        };
        this.setRef = this.setRef.bind(this);
        this.visLagreSkjema = this.visLagreSkjema.bind(this);
        this.visElementInformasjon = this.visElementInformasjon.bind(this);
        this.scrollTilElement = this.scrollTilElement.bind(this);
        this.erUtvidbarApenStorreEnnSkjerm = this.erUtvidbarApenStorreEnnSkjerm.bind(this);
        this.visFeil = this.visFeil.bind(this);
        this.sendSlett = this.sendSlett.bind(this);
        this.sendLagre = this.sendLagre.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.element.arbeidsoppgaveId === nextProps.arbeidsoppgaverReducer.feiletOppgaveId) {
            if (((nextProps.arbeidsoppgaverReducer.lagringFeilet && nextProps.arbeidsoppgaverReducer.lagringFeilet !== this.props.arbeidsoppgaverReducer.lagringFeilet) ||
                (nextProps.arbeidsoppgaverReducer.slettingFeilet && nextProps.arbeidsoppgaverReducer.slettingFeilet !== this.props.arbeidsoppgaverReducer.slettingFeilet))
                && nextProps.arbeidsoppgaverReducer.feiletOppgaveId > 0) {
                if (nextProps.arbeidsoppgaverReducer.slettingFeilet) {
                    this.props.visFeilMelding(true);
                    this.visFeil(false, true, texts.updateError);
                } else if (nextProps.arbeidsoppgaverReducer.lagringFeilet) {
                    this.props.visFeilMelding(true);
                    this.visFeil(true, false, texts.updateError);
                    this.setState({
                        visLagreSkjema: true,
                    });
                    if (!this.state.erApen) {
                        this.apne();
                    }
                } else if (!nextProps.arbeidsoppgaverReducer.lagringFeilet && !nextProps.arbeidsoppgaverReducer.slettingFeilet) {
                    this.visFeil(false, false, '');
                }
            } else if (!nextProps.arbeidsoppgaverReducer.lagringFeilet && !nextProps.arbeidsoppgaverReducer.slettingFeilet) {
                this.visFeil(false, false, '');
            }
        } else if (!nextProps.arbeidsoppgaverReducer.lagringFeilet && !nextProps.arbeidsoppgaverReducer.slettingFeilet) {
            this.visFeil(false, false, '');
        }
    }

    onTransitionEnd() {
        if (this.state.harTransisjon) {
            // Forhindrer scrolling til utenforliggnede
            // Utvidbar dersom flere er nøstet inni hverandre
            this.setState({
                harTransisjon: false,
            });
            if (this.state.erApen) {
                this.scrollTilElement(this.utvidbar);
                this.setState({
                    hindreToggle: false,
                });
                this.setAutoHoyde();
            } else {
                this.setState({
                    hindreToggle: false,
                    visInnhold: false,
                });
                if (!erSynligIViewport(this.utvidbar)) {
                    this.scrollTilElement(this.utvidbar);
                }
            }
        }
    }

    setRef(ref) {
        this.setRef = ref;
    }

    setAutoHoyde() {
        /* Fjerner animasjonsklassen slik at Safari ikke
         tegner komponenten på nytt når høyde settes til 'auto': */
        this.setState({
            containerClassName: '',
        });
        // Setter høyde til auto:
        setTimeout(() => {
            this.setState({
                hoyde: 'auto',
                containerClassName: '',
            });
        }, 0);
    }

    visFeil(lagringFeilet, slettingFeilet, tekst) {
        this.setState({
            visLagringFeilet: lagringFeilet,
            visSlettingFeilet: slettingFeilet,
            varselTekst: tekst,
        });
    }

    apne() {
        this.setState({
            hoyde: '0',
            hindreToggle: true,
            containerClassName: ' utvidbar__innholdContainer--medAnimasjon',
            visInnhold: true,
            harTransisjon: true,
        });
        setTimeout(() => {
            const hoyde = this.innhold.offsetHeight;
            this.setState({
                erApen: true,
                hoyde,
            });
        }, 0);
    }

    lukk() {
        const hoyde = this.innhold.offsetHeight;
        this.setState({
            hoyde,
            hindreToggle: true,
            harTransisjon: true,
        });
        setTimeout(() => {
            this.setState({
                containerClassName: ' utvidbar__innholdContainer--medAnimasjon',
                hoyde: '0',
                erApen: false,
            });
        }, 0);
    }

    erUtvidbarApenStorreEnnSkjerm(utvidbar) {
        const utvidbarTopp = utvidbar.getBoundingClientRect().top;
        const utvidbarHoyde = this.jstoggle.offsetHeight;
        const sideHoyde = window.innerHeight;
        return (utvidbarTopp + utvidbarHoyde) > sideHoyde;
    }

    scrollTilElement(element) {
        if (this.state.erApen) {
            const utvidbar = findDOMNode(element);
            if (utvidbar && this.erUtvidbarApenStorreEnnSkjerm(utvidbar)) {
                utvidbar.scrollIntoView({ block: 'start', behavior: 'smooth' });
                window.scrollBy(0, -200); // Justere visning.
            }
        }
    }

    toggle(e) {
        e.preventDefault();
        if (!this.state.hindreToggle) {
            /* hindreToggle for å hindre dobbelklikk,
             eller at noen klikker mens animasjonen pågår.
             Dobbelklikk vil skape kluss med logikken. */
            if (this.state.erApen) {
                this.lukk();
            } else {
                this.apne();
            }
        }
    }

    visLagreSkjema(event) {
        event.stopPropagation();
        this.setState({
            visLagreSkjema: true,
        });
        this.props.visFeilMelding(false);
        if (!this.state.erApen) {
            this.apne();
        }
    }

    visElementInformasjon() {
        this.setState({
            visLagreSkjema: false,
        });
        this.props.visFeilMelding(false);
    }

    sendSlett(event, id) {
        event.stopPropagation();
        this.props.sendSlett(id);
    }

    sendLagre(nyeVerdier) {
        this.props.sendLagre(nyeVerdier);
        this.setState({
            visLagreSkjema: false,
        });
    }

    render() {
        const {
            element,
            fnr,
            arbeidsoppgaverReducer,
            rootUrlImg,
            feilMelding,
        } = this.props;
        return (
            (() => {
                return (
                    <article
                        className="arbeidsoppgaverListe__rad arbeidsoppgaverListe__rad--element"
                        ref={(ref) => { this.jstoggle = ref; }}
                        aria-label={element.arbeidsoppgavenavn}>
                        <button
                            aria-expanded={this.state.erApen}
                            ref={(ref) => { this.utvidbarToggle = ref; }}
                            className="utvidbar__toggle arbeidsoppgaverListe__toggle"
                            onClick={(event) => { this.toggle(event); }}
                        >
                            <div ref={(ref) => { this.utvidbar = ref; }} className="arbeidsoppgaverListe__utvidbarrad">
                                <ArbeidsoppgaveUtvidbarOverskrift
                                    erApen={this.state.erApen}
                                    fnr={fnr}
                                    arbeidsoppgave={element}
                                    lagreSkjema={this.state.visLagreSkjema}
                                    visLagreSkjema={this.visLagreSkjema}
                                    sendSlett={this.sendSlett}
                                    rootUrlImg={rootUrlImg}
                                />
                            </div>
                        </button>
                        <div
                            style={{ height: this.state.hoyde }}
                            className={`utvidbar__innholdContainer${this.state.containerClassName}`}
                            onTransitionEnd={() => {
                                this.onTransitionEnd();
                            }}
                        >
                            <div ref={(ref) => { this.innhold = ref; }}>
                                { this.state.visInnhold && !this.state.visLagreSkjema &&
                                <ArbeidsoppgaveInformasjon
                                    element={element}
                                />
                                }
                                { this.state.visLagreSkjema &&
                                <LagreArbeidsoppgaveSkjema
                                    sendLagre={this.sendLagre}
                                    arbeidsoppgave={element}
                                    form={element.arbeidsoppgaveId.toString()}
                                    avbryt={this.visElementInformasjon}
                                    oppdateringFeilet={this.state.visLagringFeilet && feilMelding}
                                    varselTekst={this.state.varselTekst}
                                    arbeidsoppgaverReducer={arbeidsoppgaverReducer}
                                    rootUrlImg={rootUrlImg}
                                />
                                }
                            </div>
                        </div>
                        { this.state.visSlettingFeilet && feilMelding &&
                        <ArbeidsoppgaveVarselFeilStyled>
                            <ArbeidsoppgaveVarselFeil
                                tekst={texts.updateError}
                            />
                        </ArbeidsoppgaveVarselFeilStyled>
                        }
                    </article>
                );
            })()
        );
    }
}

ArbeidsoppgaveUtvidbar.propTypes = {
    element: arbeidsoppgavePt,
    fnr: PropTypes.string,
    sendSlett: PropTypes.func,
    sendLagre: PropTypes.func,
    erApen: PropTypes.bool.isRequired,
    rootUrlImg: PropTypes.string,
    visFeilMelding: PropTypes.func,
    feilMelding: PropTypes.bool,
    arbeidsoppgaverReducer: arbeidsoppgaverReducerPt,
};

ArbeidsoppgaveUtvidbar.defaultProps = {
    erApen: false,
    Overskrift: 'H3',
};

export const mapStateToProps = (state) => {
    return {
        arbeidsoppgaverReducer: state.arbeidsoppgaver,
    };
};

const ArbeidsoppgaveUtvidbarContainer = connect(mapStateToProps)(ArbeidsoppgaveUtvidbar);

export default ArbeidsoppgaveUtvidbarContainer;
