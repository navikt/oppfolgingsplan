import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
    getLedetekst,
    scrollTo,
} from 'digisyfo-npm';
import {
    arbeidsoppgaverReducerPt,
    oppfolgingsplanPt,
} from '../../../propTypes/opproptypes';
import getContextRoot from '../../../utils/getContextRoot';
import { capitalizeFirstLetter } from '../../../utils/textUtils';
import { isEmpty } from '../../../utils/oppfolgingsdialogUtils';
import { sorterArbeidsoppgaverEtterOpprettet } from '../../../utils/arbeidsoppgaveUtils';
import OppfolgingsplanInfoboks from '../../app/OppfolgingsplanInfoboks';
import ArbeidsoppgaverInfoboks from './ArbeidsoppgaverInfoboks';
import NotifikasjonBoksVurderingOppgave from './NotifikasjonBoksVurderingOppgave';
import LeggTilElementKnapper from '../LeggTilElementKnapper';
import LagreArbeidsoppgaveSkjema from './LagreArbeidsoppgaveSkjema';
import ArbeidsoppgaverListe from './ArbeidsoppgaverListe';

class Arbeidsoppgaver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nyArbeidsoppgave: false,
            oppdatertArbeidsoppgave: false,
            visArbeidsoppgaveSkjema: false,
            lagreNyOppgaveFeilet: false,
            varselTekst: '',
            oppdaterOppgaveFeilet: false,
        };
        this.sendLagreArbeidsoppgave = this.sendLagreArbeidsoppgave.bind(this);
        this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
        this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
        this.scrollToForm = this.scrollToForm.bind(this);
        this.visFeilMelding = this.visFeilMelding.bind(this);
        this.skjulSkjema = this.skjulSkjema.bind(this);
    }
    componentWillMount() {
        window.location.hash = 'arbeidsoppgaver';
        window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
    }

    componentDidMount() {
        if (this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.arbeidsoppgaver.feiletOppgaveId
            && nextProps.arbeidsoppgaver.lagringFeilet
            && this.props.arbeidsoppgaver.lagringFeilet !== nextProps.arbeidsoppgaver.lagringFeilet) {
            this.setState({
                lagreNyOppgaveFeilet: true,
                visArbeidsoppgaveSkjema: true,
                varselTekst: getLedetekst('oppfolgingsdialog.oppdatering.feilmelding'),
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
            this.scrollToForm();
        }
    }

    visFeilMelding(feilet) {
        this.setState({
            oppdaterOppgaveFeilet: feilet,
            lagreNyOppgaveFeilet: false,
        });
    }

    sendLagreArbeidsoppgave(values) {
        if (!values.arbeidsoppgaveId) {
            this.state.nyArbeidsoppgave = true;
            this.state.oppdatertArbeidsoppgave = false;
        } else {
            this.state.nyArbeidsoppgave = false;
            this.state.oppdatertArbeidsoppgave = true;
        }
        const nyeValues = {
            ...values,
            arbeidsoppgavenavn: capitalizeFirstLetter(values.arbeidsoppgavenavn),
        };
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialog.id, nyeValues, this.props.oppfolgingsdialog.arbeidstaker.fnr);
        this.setState({
            visArbeidsoppgaveSkjema: false,
        });
    }

    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        this.props.slettArbeidsoppgave(this.props.oppfolgingsdialog.id, arbeidsoppgaveId);
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
        });
    }

    scrollToForm() {
        const form = findDOMNode(this.lagreSkjema);
        scrollTo(form, 300);
    }

    skjulSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: false,
            lagreNyOppgaveFeilet: false,
        });
    }

    render() {
        const {
            oppfolgingsdialog,
            arbeidsoppgaver,
        } = this.props;
        const antallIkkeVurdererteArbOppgaver = oppfolgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
            return !arbeidsoppgave.gjennomfoering;
        }).length;
        return (
            (() => {
                return isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ?
                    <div>
                        { this.state.visArbeidsoppgaveSkjema &&
                        <ArbeidsoppgaverInfoboks
                            tittel={getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.tittel.arbeidstaker')}
                            visSkjema={this.state.visArbeidsoppgaveSkjema}
                            toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                        >
                            { oppfolgingsdialog.arbeidstaker.stillinger.length > 0 &&
                            <div>
                                { oppfolgingsdialog.arbeidstaker.stillinger.map((stilling, idx) => {
                                    return (<p key={idx}>
                                        {getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.arbeidstaker.stilling', {
                                            '%YRKE%': stilling.yrke.toLowerCase(),
                                            '%PROSENT%': stilling.prosent,
                                        })}
                                    </p>);
                                })
                                }
                            </div>
                            }
                        </ArbeidsoppgaverInfoboks>
                        }
                        {
                            !this.state.visArbeidsoppgaveSkjema ?
                                <OppfolgingsplanInfoboks
                                    svgUrl={`${getContextRoot()}/img/svg/arbeidsoppgave-onboarding.svg`}
                                    svgAlt="nyArbeidsoppgave"
                                    tittel={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tittel')}
                                    tekst={getLedetekst('oppfolgingsdialog.arbeidstaker.onboarding.arbeidsoppgave.tekst')}
                                >
                                    <LeggTilElementKnapper
                                        visSkjema={this.state.visArbeidsoppgaveSkjema}
                                        toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                                    />
                                </OppfolgingsplanInfoboks> :
                                <LagreArbeidsoppgaveSkjema
                                    varselTekst={this.state.varselTekst}
                                    oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                                    sendLagre={this.sendLagreArbeidsoppgave}
                                    avbryt={this.skjulSkjema}
                                    arbeidsoppgaverReducer={arbeidsoppgaver}
                                    rootUrlImg={getContextRoot()}
                                />
                        }
                    </div>
                    :
                    <div>
                        {
                            antallIkkeVurdererteArbOppgaver > 0 && <NotifikasjonBoksVurderingOppgave
                                antallIkkeVurderte={antallIkkeVurdererteArbOppgaver}
                                rootUrl={getContextRoot()}
                                tekst="oppfolgingsdialog.notifikasjonBoksVurderingOppgave.arbeidstaker.tekst"
                            />
                        }
                        <ArbeidsoppgaverInfoboks
                            tittel={getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.tittel.arbeidstaker')}
                            visSkjema={this.state.visArbeidsoppgaveSkjema}
                            toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                        >
                            { oppfolgingsdialog.arbeidstaker.stillinger.length > 0 &&
                            <div>
                                { oppfolgingsdialog.arbeidstaker.stillinger.map((stilling, idx) => {
                                    return (<p key={idx}>
                                        {getLedetekst('oppfolgingsdialog.arbeidsoppgaverInfoboks.arbeidstaker.stilling', {
                                            '%YRKE%': stilling.yrke.toLowerCase(),
                                            '%PROSENT%': stilling.prosent,
                                        })}
                                    </p>);
                                })
                                }
                            </div>
                            }
                        </ArbeidsoppgaverInfoboks>
                        {
                            this.state.visArbeidsoppgaveSkjema && <LagreArbeidsoppgaveSkjema
                                sendLagre={this.sendLagreArbeidsoppgave}
                                avbryt={this.skjulSkjema}
                                ref={(lagreSkjema) => {
                                    this.lagreSkjema = lagreSkjema;
                                }}
                                varselTekst={this.state.varselTekst}
                                oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                                arbeidsoppgaverReducer={arbeidsoppgaver}
                                rootUrlImg={getContextRoot()}
                            />
                        }
                        <ArbeidsoppgaverListe
                            liste={sorterArbeidsoppgaverEtterOpprettet(oppfolgingsdialog.arbeidsoppgaveListe)}
                            sendLagre={this.sendLagreArbeidsoppgave}
                            sendSlett={this.sendSlettArbeidsoppgave}
                            fnr={oppfolgingsdialog.arbeidstaker.fnr}
                            rootUrlImg={getContextRoot()}
                            visFeilMelding={this.visFeilMelding}
                            feilMelding={this.state.oppdaterOppgaveFeilet}
                        />
                    </div>;
            })()
        );
    }
}

Arbeidsoppgaver.propTypes = {
    arbeidsoppgaver: arbeidsoppgaverReducerPt,
    oppfolgingsdialog: oppfolgingsplanPt,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
};

export default Arbeidsoppgaver;
