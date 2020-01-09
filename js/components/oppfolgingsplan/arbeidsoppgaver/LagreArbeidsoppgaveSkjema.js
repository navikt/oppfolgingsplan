import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { tekstfeltRegex } from '../../../konstanter';
import InfoVarsel from './InfoVarsel';
import Checkbox from '../../skjema/Checkbox';
import Tekstfelt from '../../skjema/TekstFelt';
import Tekstomraade from '../../skjema/TekstOmrade';
import Radioknapper from '../../skjema/Radioknapper';
import {
    KANGJENNOMFOERES,
    TILRETTELEGGING,
} from './arbeidsoppgavesvar';
import {
    arbeidsoppgaverReducerPt,
    arbeidsoppgavePt,
} from '../../../propTypes/opproptypes';
import ArbeidsoppgaveKnapper from './ArbeidsoppgaveKnapper';
import ArbeidsoppgaveVarselFeil from './ArbeidsoppgaveVarselFeil';

const texts = {
    infoVarsel: `
        Husk at arbeidsgiveren din kan se det du skriver her.
        Derfor må du ikke gi sensitive opplysninger, som for eksempel sykdomsdiagnose.
        Du må ikke si mer enn det som er helt nødvendig for at arbeidsgiveren din og NAV kan følge deg opp
    `,
    felter: {
        arbeidsoppgavenavn: {
            question: 'Navn på arbeidsoppgave',
        },
        kanGjennomfoeres: {
            question: 'Kan denne arbeidsoppgaven gjennomføres i sykeperioden?',
            answer: {
                kan: 'Ja, den kan gjennomføres som normalt',
                medTilrettelegging: 'Ja, den kan gjennomføres med tilrettelegging',
                kanIkke: 'Nei, den kan ikke gjennomføres',
            },
        },
        tilrettelegging: {
            question: 'Hva skal til for å gjennomføre denne arbeidsoppgaven?',
            answer: {
                annetSted: 'Arbeide fra annet sted',
                merTid: 'Mer gitt tid',
                medHjelp: 'Med hjelp/hjelpemidler',
            },
        },
        beskrivelse: {
            question: {
                tilrettelegging: 'Beskrivelse:',
                kanIkke: 'Hva står i veien for å kunne gjennomføre denne arbeidsoppgaven?',
            },
        },
    },
};

export const skjemaFeltPt = PropTypes.shape({
    navn: PropTypes.string,
    spoersmaal: PropTypes.string,
});

export const skjemaFeltBeskrivelsePt = PropTypes.shape({
    navn: PropTypes.string,
    spoersmaal: PropTypes.shape({
        tilrettelegging: PropTypes.string,
        kanikke: PropTypes.string,
    }),
});

const MAX_LENGTH = 1000;

const LAGRE_ARBEIDSOPPGAVE_SKJEMANAVN = 'lagreArbeidsgiver';

export const FELTER = {
    arbeidsoppgavenavn: {
        navn: 'arbeidsoppgavenavn',
        spoersmaal: texts.felter.arbeidsoppgavenavn.question,
    },
    kanGjennomfoeres: {
        navn: 'gjennomfoeringSvar',
        spoersmaal: texts.felter.kanGjennomfoeres.question,
        svar: [
            {
                tekst: texts.felter.kanGjennomfoeres.answer.kan,
                verdi: KANGJENNOMFOERES.KAN,
            },
            {
                tekst: texts.felter.kanGjennomfoeres.answer.medTilrettelegging,
                verdi: KANGJENNOMFOERES.TILRETTELEGGING,
            },
            {
                tekst: texts.felter.kanGjennomfoeres.answer.kanIkke,
                verdi: KANGJENNOMFOERES.KAN_IKKE,
            },
        ],
    },
    tilrettelegging: {
        navn: 'tilrettelegging',
        spoersmaal: texts.felter.tilrettelegging.question,
        svar: [
            {
                tekst: texts.felter.tilrettelegging.answer.annetSted,
                navn: TILRETTELEGGING.PAA_ANNET_STED,
            },
            {
                tekst: texts.felter.tilrettelegging.answer.merTid,
                navn: TILRETTELEGGING.MED_MER_TID,
            },
            {
                tekst: texts.felter.tilrettelegging.answer.medHjelp,
                navn: TILRETTELEGGING.MED_HJELP,
            },
        ],
    },
    beskrivelse: {
        navn: 'beskrivelse',
        spoersmaal: {
            tilrettelegging: texts.felter.beskrivelse.question.tilrettelegging,
            kanikke: texts.felter.beskrivelse.question.kanIkke,
        },
    },
};

export const ArbeidsoppgaveNavn = ({ felt }) => {
    return (
        <div className="skjemaelement lagrearbeidsoppgaveskjema__inputgruppe">
            <label className="skjemaelement__label" id={felt.navn} htmlFor={`${felt.navn}-input`}>
                {felt.spoersmaal}
            </label>
            <Field
                className="input--fullbredde"
                name={felt.navn}
                id={`${felt.navn}-input`}
                aria-labelledby={felt.navn}
                component={Tekstfelt}
                placeholder="Skriv inn tekst"
                autoFocus
            />
        </div>
    );
};
ArbeidsoppgaveNavn.propTypes = {
    felt: skjemaFeltPt,
};

export const ArbeidsoppgaveBeskrivelse = ({ felt, gjennomfoeringSvarValgt }) => {
    const spoersmaal = gjennomfoeringSvarValgt === KANGJENNOMFOERES.KAN_IKKE
        ? felt.spoersmaal.kanikke
        : felt.spoersmaal.tilrettelegging;
    return (
        <div className="skjemaelement lagrearbeidsoppgaveskjema__inputgruppe">
            <label className="skjemaelement__label" id={felt.navn} htmlFor={`${felt.navn}-input`}>
                {spoersmaal}
            </label>
            <Field
                className="input--fullbredde"
                name={felt.navn}
                id={`${felt.navn}-input`}
                aria-labelledby={felt.navn}
                maxLength={MAX_LENGTH}
                component={Tekstomraade}
                placeholder="Skriv inn tekst"
                rows="5"
            />
        </div>
    );
};
ArbeidsoppgaveBeskrivelse.propTypes = {
    felt: skjemaFeltBeskrivelsePt,
    gjennomfoeringSvarValgt: PropTypes.string,
};

export const ArbeidsoppgaveGjennomfoeringSvar = ({ handleOptionChange, arbeidsoppgave }) => {
    const feltId = arbeidsoppgave ? `kanGjennomfoeres-${arbeidsoppgave.arbeidsoppgaveId}` : 'kanGjennomfoeres';

    return (
        <div className="skjemaelement lagrearbeidsoppgaveskjema__inputgruppe">
            <label className="skjemaelement__label" id={FELTER.kanGjennomfoeres.navn}>
                {FELTER.kanGjennomfoeres.spoersmaal}
            </label>
            <Field
                autoFocus
                id={FELTER.kanGjennomfoeres.navn}
                name={FELTER.kanGjennomfoeres.navn}
                component={Radioknapper}
                onChange={handleOptionChange}>
                {
                    FELTER.kanGjennomfoeres.svar.map((svar, index) => {
                        return (
                            <input
                                key={`kanGjennomfoeres-${index}`}
                                value={svar.verdi}
                                label={svar.tekst}
                                id={`${feltId}-${index}`}
                                aria-labelledby={FELTER.kanGjennomfoeres.navn}
                            />
                        );
                    })
                }
            </Field>
        </div>
    );
};
ArbeidsoppgaveGjennomfoeringSvar.propTypes = {
    handleOptionChange: PropTypes.func,
    arbeidsoppgave: arbeidsoppgavePt,
};

export const ArbeidsoppgaveTilrettelegging = ({ toggleCheckbox, arbeidsoppgave }) => {
    const feltId = arbeidsoppgave ? `tilrettelegging-${arbeidsoppgave.arbeidsoppgaveId}` : 'tilrettelegging';

    return (
        <div className="skjemaelement lagrearbeidsoppgaveskjema__inputgruppe">
            <label className="skjemaelement__label" id={FELTER.tilrettelegging.navn}>
                {FELTER.tilrettelegging.spoersmaal}
            </label>
            {
                FELTER.tilrettelegging.svar.map((svar, index) => {
                    return (
                        <Field
                            key={`tilrettelegging-${index}`}
                            name={svar.navn}
                            component={Checkbox}
                            label={svar.tekst}
                            id={`${feltId}-${index}`}
                            aria-labelledby={FELTER.tilrettelegging.navn}
                            value={svar.tekst}
                            onChange={toggleCheckbox}
                        />
                    );
                })
            }
        </div>
    );
};
ArbeidsoppgaveTilrettelegging.propTypes = {
    toggleCheckbox: PropTypes.func,
    arbeidsoppgave: arbeidsoppgavePt,
};

export class LagreArbeidsoppgaveSkjemaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gjennomfoeringSvarValgt: KANGJENNOMFOERES.KAN,
            tilretteleggingerValgt: new Set(),
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.avbryt = this.avbryt.bind(this);
    }
    componentDidMount() {
        this.handleInitialize();
    }

    visFeiletOppgave() {
        return ((!this.props.arbeidsoppgave && this.props.arbeidsoppgaverReducer.arbeidsoppgave && !this.props.arbeidsoppgaverReducer.arbeidsoppgave.arbeidsoppgaveId)
            || (this.props.arbeidsoppgaverReducer.arbeidsoppgave
                && this.props.arbeidsoppgave && this.props.arbeidsoppgaverReducer.arbeidsoppgave.arbeidsoppgaveId &&
                this.props.arbeidsoppgave.arbeidsoppgaveId === this.props.arbeidsoppgaverReducer.arbeidsoppgave.arbeidsoppgaveId));
    }

    handleInitialize() {
        const arbeidsoppgave = this.visFeiletOppgave() ? this.props.arbeidsoppgaverReducer.arbeidsoppgave : this.props.arbeidsoppgave;
        const initData = {};
        if (arbeidsoppgave && arbeidsoppgave.gjennomfoering) {
            initData.gjennomfoeringSvar = arbeidsoppgave.gjennomfoering.kanGjennomfoeres;
            initData.arbeidsoppgavenavn = arbeidsoppgave ? arbeidsoppgave.arbeidsoppgavenavn : null;

            switch (arbeidsoppgave.gjennomfoering.kanGjennomfoeres) {
                case KANGJENNOMFOERES.TILRETTELEGGING: {
                    const set = new Set();
                    if (arbeidsoppgave.gjennomfoering.paaAnnetSted) {
                        initData.PAA_ANNET_STED = arbeidsoppgave.gjennomfoering.paaAnnetSted;
                        set.add(TILRETTELEGGING.PAA_ANNET_STED);
                    }
                    if (arbeidsoppgave.gjennomfoering.medMerTid) {
                        initData.MED_MER_TID = arbeidsoppgave.gjennomfoering.medMerTid;
                        set.add(TILRETTELEGGING.MED_MER_TID);
                    }
                    if (arbeidsoppgave.gjennomfoering.medHjelp) {
                        initData.MED_HJELP = arbeidsoppgave.gjennomfoering.medHjelp;
                        set.add(TILRETTELEGGING.MED_HJELP);
                    }
                    initData.beskrivelse = arbeidsoppgave.gjennomfoering.kanBeskrivelse;
                    this.setState({
                        gjennomfoeringSvarValgt: KANGJENNOMFOERES.TILRETTELEGGING,
                        tilretteleggingerValgt: set,
                    });
                    break;
                }
                case KANGJENNOMFOERES.KAN_IKKE: {
                    initData.beskrivelse = arbeidsoppgave.gjennomfoering.kanIkkeBeskrivelse;
                    this.setState({
                        gjennomfoeringSvarValgt: KANGJENNOMFOERES.KAN_IKKE,
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        } else {
            initData.gjennomfoeringSvar = KANGJENNOMFOERES.KAN;
            initData.arbeidsoppgavenavn = arbeidsoppgave ? arbeidsoppgave.arbeidsoppgavenavn : null;
        }
        this.props.initialize(initData);
    }

    handleOptionChange(e) {
        this.setState({
            gjennomfoeringSvarValgt: e.target.value,
        });
    }

    toggleCheckbox(e) {
        const set = new Set(this.state.tilretteleggingerValgt);
        if (set.has(e.target.name)) {
            set.delete(e.target.name);
        } else {
            set.add(e.target.name);
        }
        this.setState({
            tilretteleggingerValgt: set,
        });
    }

    hentSkjemaClassName() {
        return this.props.arbeidsoppgave ? 'oppfolgingsdialogtabell__rad__utvidbar' : 'panel';
    }

    handleSubmit(values) {
        const nyeVerdier = Object.assign(values);
        if (this.props.arbeidsoppgave) {
            nyeVerdier.arbeidsoppgavenavn = this.props.arbeidsoppgave.arbeidsoppgavenavn;
            nyeVerdier.arbeidsoppgaveId = this.props.arbeidsoppgave.arbeidsoppgaveId;
        }
        this.props.sendLagre(nyeVerdier);
    }

    avbryt() {
        this.props.arbeidsoppgaverReducer.arbeidsoppgave = null;
        this.props.avbryt();
    }

    render() {
        const {
            arbeidsoppgave,
            handleSubmit,
            varselTekst,
            oppdateringFeilet,
            arbeidsoppgaverReducer,
            rootUrlImg,
        } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleSubmit)} className={this.hentSkjemaClassName()}>

                {
                    (!arbeidsoppgave || (arbeidsoppgaverReducer.arbeidsoppgave && !arbeidsoppgaverReducer)) && <ArbeidsoppgaveNavn
                        felt={FELTER.arbeidsoppgavenavn}
                        arbeidsoppgave={arbeidsoppgave} />
                }

                <ArbeidsoppgaveGjennomfoeringSvar
                    handleOptionChange={this.handleOptionChange}
                    gjennomfoeringSvarValgt={this.state.gjennomfoeringSvarValgt}
                    arbeidsoppgave={arbeidsoppgave}
                />

                {
                    this.state.gjennomfoeringSvarValgt === KANGJENNOMFOERES.TILRETTELEGGING &&
                    <ArbeidsoppgaveTilrettelegging
                        toggleCheckbox={this.toggleCheckbox}
                        arbeidsoppgave={arbeidsoppgave}
                    />
                }

                {
                    this.state.gjennomfoeringSvarValgt !== KANGJENNOMFOERES.KAN &&
                    <ArbeidsoppgaveBeskrivelse
                        felt={FELTER.beskrivelse}
                        gjennomfoeringSvarValgt={this.state.gjennomfoeringSvarValgt}
                    />
                }

                {this.state.gjennomfoeringSvarValgt !== KANGJENNOMFOERES.KAN &&
                <InfoVarsel
                    rootUrlImg={rootUrlImg}
                    tekst={texts.infoVarsel} />
                }

                { oppdateringFeilet &&
                <ArbeidsoppgaveVarselFeil
                    tekst={varselTekst}
                />
                }

                <ArbeidsoppgaveKnapper
                    avbryt={this.avbryt}
                    arbeidsoppgave={arbeidsoppgave}
                    arbeidsoppgaverReducer={arbeidsoppgaverReducer}
                />
            </form>
        );
    }
}

LagreArbeidsoppgaveSkjemaComponent.propTypes = {
    arbeidsoppgave: arbeidsoppgavePt,
    handleSubmit: PropTypes.func,
    sendLagre: PropTypes.func,
    avbryt: PropTypes.func,
    initialize: PropTypes.func,
    oppdateringFeilet: PropTypes.bool,
    varselTekst: PropTypes.string,
    rootUrlImg: PropTypes.string,
    arbeidsoppgaverReducer: arbeidsoppgaverReducerPt,
};

const validate = (values) => {
    const feilmeldinger = {};

    if (!values.arbeidsoppgavenavn || values.arbeidsoppgavenavn.trim().length === 0) {
        feilmeldinger.arbeidsoppgavenavn = 'Fyll inn arbeidsoppgave';
    } else if (values.arbeidsoppgavenavn.match(tekstfeltRegex)) {
        feilmeldinger.arbeidsoppgavenavn = 'Ugyldig spesialtegn er oppgitt';
    }
    const navnLengde = values.arbeidsoppgavenavn ? values.arbeidsoppgavenavn.length : 0;
    const navnMaksLengde = 100;
    if (navnLengde > navnMaksLengde) {
        feilmeldinger.arbeidsoppgavenavn = `Maks ${navnMaksLengde} tegn tillatt`;
    }
    if (!values.beskrivelse || values.beskrivelse.trim().length === 0) {
        feilmeldinger.beskrivelse = 'Fyll inn beskrivelse';
    } else if (values.beskrivelse.match(tekstfeltRegex)) {
        feilmeldinger.beskrivelse = 'Ugyldig spesialtegn er oppgitt';
    }
    const beskrivelseLengde = values.beskrivelse ? values.beskrivelse.length : 0;

    if (beskrivelseLengde > MAX_LENGTH) {
        feilmeldinger.beskrivelse = `Maks ${MAX_LENGTH} tegn tillatt`;
    }
    return feilmeldinger;
};

const ReduxSkjema = reduxForm({
    form: LAGRE_ARBEIDSOPPGAVE_SKJEMANAVN,
    validate,
})(LagreArbeidsoppgaveSkjemaComponent);

export default ReduxSkjema;
