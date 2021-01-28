import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Panel } from 'nav-frontend-paneler';
import {
    STATUS_TILTAK,
    tekstfeltRegex,
} from '../../../konstanter';
import {
    erGyldigDato,
    erGyldigDatoformat,
    restdatoTildato,
    sluttDatoSenereEnnStartDato,
} from '../../../utils/datoUtils';
import {
    konvertDatoTiltak,
    konvertDatoTiltakMedPunkt,
} from '../../../utils/tiltakUtils';
import {
    tiltakPt,
    tiltakReducerPt,
} from '../../../propTypes/opproptypes';
import TekstFelt from '../../skjema/TekstFelt';
import TekstOmrade from '../../skjema/TekstOmrade';
import TiltakDatovelger from './TiltakDatovelger';
import TiltakKnapper from './TiltakKnapper';
import TiltakForeslaattAv from './TiltakForeslaattAv';
import TiltakInfoVarsel from './TiltakInfoVarsel';
import TiltakVarselFeil from './TiltakVarselFeil';
import { tiltakSkjemaFeltPt } from '../../../propTypes/tiltakproptypes';
import { Feiloppsummering } from "nav-frontend-skjema";

export const OPPRETT_TILTAK_NY = 'OPPRETT_TILTAK_NY';

const texts = {
    felter: {
        tiltaknavn: 'Lag en overskrift',
        beskrivelseLabel: 'BESKRIVELSE',
        beskrivelse: 'Beskriv hva som skal skje',
        beskrivelsePersonvern: `Husk at arbeidsgiveren din kan se det du skriver her.
                                Derfor må du ikke gi sensitive opplysninger, som for eksempel sykdomsdiagnose.
                                Du må ikke si mer enn det som er helt nødvendig for at arbeidsgiveren din og NAV kan følge deg opp`,
        startdato: 'Startdato',
        sluttdato: 'Sluttdato',
    },
};

export const FELTER = {
    tiltaknavn: {
        navn: 'tiltaknavn',
        id: 'tiltaknavn-input',
        tekst: texts.felter.tiltaknavn,
    },
    beskrivelse: {
        navn: 'beskrivelse',
        id: 'beskrivelse-input',
        tekst: texts.felter.beskrivelse,
    },
    startdato: {
        navn: 'fom',
        id: 'fom',
        tekst: texts.felter.startdato,
    },
    sluttdato: {
        navn: 'tom',
        id: 'tom',
        tekst: texts.felter.sluttdato,
    },
};

export const aktoerHarOpprettetElement = (fnr, tiltak) => {
    return fnr === tiltak.opprettetAv.fnr;
};

export const TiltakNavn = ({ felt, isFormSubmitted, validate }) => {
    return (<div className="lagretiltakskjema__inputgruppe">
        <label
            className="skjemaelement__label"
            id={felt.navn}
            htmlFor={`${felt.id}`}>
            <b>{felt.tekst}</b>
        </label>
        <Field
            className="input--fullbredde"
            name={felt.navn}
            id={`${felt.id}`}
            aria-labelledby={felt.navn}
            component={TekstFelt}
            placeholder="Skriv her"
            validate={isFormSubmitted ? validate : undefined}
        />
    </div>);
};

TiltakNavn.propTypes = {
    felt: tiltakSkjemaFeltPt,
    isFormSubmitted: PropTypes.bool,
};

export const TiltakBeskrivelse = (
    {
        felt,
        tiltak,
        fnr,
        isFormSubmitted,
        validate,
    }) => {
    return (tiltak && tiltak.opprettetAv && !aktoerHarOpprettetElement(fnr, tiltak) ?
        <div className="lagretiltakskjema__inputgruppe">
            { tiltak && tiltak.beskrivelse &&
            [
                <label key={`tiltak-besk-label-${tiltak.tiltakId}`} className="tiltaktabell--beskrivelse">
                    {texts.felter.beskrivelseLabel}
                </label>,
                <p key={`tiltak-besk-p-${tiltak.tiltakId}`} >{tiltak.beskrivelse}</p>,
            ]
            }
        </div>
        :
        <div className="lagretiltakskjema__inputgruppe">
            <label className="skjemaelement__label" id={felt.navn} htmlFor={`${felt.navn}-input`}>
                <b>{felt.tekst}</b>
            </label>
            <Field
                className="input__tiltak--beskrivelse"
                name={felt.navn}
                id={`${felt.navn}-input`}
                aria-labelledby={felt.navn}
                component={TekstOmrade}
                placeholder="Skriv her"
                validate={isFormSubmitted ? validate : undefined}
            />
            <TiltakInfoVarsel
                tekst={texts.felter.beskrivelsePersonvern}
            />
        </div>);
};

TiltakBeskrivelse.propTypes = {
    felt: tiltakSkjemaFeltPt,
    tiltak: tiltakPt,
    fnr: PropTypes.string,
    isFormSubmitted: PropTypes.bool,
};

export class TiltakSkjemaKomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: STATUS_TILTAK.FORSLAG,
            visLagringFeiletNyTiltak: false,
            varselTekst: '',
            validationFieldsValues: {},
            errorList: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.hentSkjemaClassName = this.hentSkjemaClassName.bind(this);
        this.visFeiletTiltak = this.visFeiletTiltak.bind(this);
        this.avbryt = this.avbryt.bind(this);
    }

    componentDidMount() {
        this.handleInitialize();
    }

    setStatus(nyStatus) {
        this.setState({
            status: nyStatus,
        });
    }

    visFeiletTiltak() {
        return ((!this.props.tiltakReducer.tiltakId && !this.props.tiltak && this.props.tiltakReducer.tiltak) ||
            (this.props.tiltakReducer.tiltak && this.props.tiltak &&
            this.props.tiltakReducer.tiltakId && this.props.tiltak.tiltakId === this.props.tiltakReducer.tiltakId));
    }

    handleInitialize() {
        const tiltak = this.visFeiletTiltak() ? this.props.tiltakReducer.tiltak : this.props.tiltak;
        const initData = {};
        if (tiltak) {
            initData.tiltaknavn = tiltak.tiltaknavn;
            initData.beskrivelse = tiltak.beskrivelse;
            initData.gjennomfoering = tiltak.gjennomfoering;
            initData.beskrivelseIkkeAktuelt = tiltak.beskrivelseIkkeAktuelt;
            initData.status = tiltak.status;
            initData.fom = tiltak.fom ? restdatoTildato(tiltak.fom) : null;
            initData.tom = tiltak.tom ? restdatoTildato(tiltak.tom) : null;
            initData.opprettetAv = this.props.tiltak ? this.props.tiltak.opprettetAv : null;
        } else {
            initData.status = this.state.status;
        }
        this.setStatus(initData.status);
        this.setState({
            isFormSubmitted: false,
        })
        this.props.initialize(initData);
    }

    hentSkjemaClassName() {
        return this.props.tiltak ? 'tiltaktabell__rad__utvidbar' : 'tiltakSkjema';
    }

    handleSubmit(values) {
        let errorObject = {
            tiltaknavn: "",
            beskrivelse: "",
            tom: "",
            fom: "",
            _error: 'Validering av tiltakskjema feilet'
        }
        let errorList = [];
        const feilmeldingerObject = this.validate(values)

        if (feilmeldingerObject.tiltaknavn) {
            errorObject.tiltaknavn = feilmeldingerObject.tiltaknavn;
            errorList.push({skjemaelementId: FELTER.tiltaknavn.id, feilmelding: feilmeldingerObject.tiltaknavn})
        }

        if (feilmeldingerObject.beskrivelse) {
            errorObject.beskrivelse = feilmeldingerObject.beskrivelse;
            errorList.push({skjemaelementId: FELTER.beskrivelse.id, feilmelding: feilmeldingerObject.beskrivelse})
        }

        if (feilmeldingerObject.fom) {
            errorObject.fom = feilmeldingerObject.fom;
            errorList.push({skjemaelementId: FELTER.startdato.id, feilmelding: feilmeldingerObject.fom})
        }

        if (feilmeldingerObject.tom) {
            errorObject.tom = feilmeldingerObject.tom;
            errorList.push({skjemaelementId: FELTER.sluttdato.id, feilmelding: feilmeldingerObject.tom})
        }

        if (feilmeldingerObject.arbeidsoppgavenavn || feilmeldingerObject.beskrivelse || feilmeldingerObject.fom || feilmeldingerObject.tom ) {
         this.setState({
             errorList: errorList,
             isFormSubmitted: true,
         });

         throw new SubmissionError(errorObject)
     }

     this.setState({
         errorList: [],
     });

     const nyeVerdier = Object.assign(values);

     if (this.props.tiltak) {
         nyeVerdier.tiltakId = this.props.tiltak.tiltakId;
     }
     nyeVerdier.fom = values.tom && konvertDatoTiltak(values.fom);
     nyeVerdier.tom = values.fom && konvertDatoTiltak(values.tom);

     this.props.sendLagre(nyeVerdier);
    }

    avbryt() {
        this.props.tiltakReducer.tiltak = null;
        this.props.avbryt();
    }

    errorIsPresentInErrorList = (errorList, skjemaelementId) => {
            return  (errorList.find(el => el.skjemaelementId === skjemaelementId)) !== undefined
    }

    validateTiltaknavnFelt = (value) => {
        const errorList = this.state.errorList
        const errorIsPresent = this.errorIsPresentInErrorList(errorList, FELTER.tiltaknavn.id)

        if (!value || value.trim().length === 0) {
            const feilmelding = 'Fyll inn tiltak'
            if (!errorIsPresent) {
                const error = {skjemaelementId: FELTER.tiltaknavn.id, feilmelding: feilmelding}

                this.setState({
                    errorList: [...this.state.errorList, error]
                })
            }
            return feilmelding
        } else if (value.match(tekstfeltRegex)) {
            const feilmelding = 'Ugyldig spesialtegn er oppgitt'

            if (!errorIsPresent) {
                const error = {skjemaelementId: FELTER.tiltaknavn.id, feilmelding: feilmelding}

                this.setState({
                    errorList: [...this.state.errorList, error]
                })
            }
            return feilmelding
        }

        const navnLengde = value ? value.length : 0;
        const navnMaksLengde = 100;

        if (navnLengde > navnMaksLengde) {
            const feilmelding = `Maks ${navnMaksLengde} tegn tillatt`
            if (!errorIsPresent) {
                const error = {skjemaelementId: FELTER.tiltaknavn.id, feilmelding: feilmelding}

                this.setState({
                    errorList: [...this.state.errorList, error]
                })
            }
            return feilmelding;
        }
        if (errorIsPresent) {
            const removeIndex = errorList.map(el => el.skjemaelementId)
                .indexOf(FELTER.tiltaknavn.id);

            errorList.splice(removeIndex, 1)
            this.setState({
                errorList: errorList
            })
        }
        return undefined
    }

    validateBeskrivelseFelt = (value) => {
        const errorList = this.state.errorList
        const errorIsPresent = this.errorIsPresentInErrorList(errorList, FELTER.beskrivelse.id)

        if (!value || value.trim().length === 0) {
            const feilmelding = 'Fyll inn beskrivelse';
            if (!errorIsPresent) {
                const error = {skjemaelementId: FELTER.beskrivelse.id, feilmelding: feilmelding}
                this.setState({
                    errorList: [...this.state.errorList, error]
                })
            }
            return feilmelding
        } else if (value.match(tekstfeltRegex)) {
            const feilmelding = 'Ugyldig spesialtegn er oppgitt'
            if (!errorIsPresent) {
                const error = {skjemaelementId: FELTER.beskrivelse.id, feilmelding: feilmelding}
                this.setState({
                    errorList: [...this.state.errorList, error]
                })
            }
            return feilmelding
        }

        const beskrivelseLengde = value ? value.length : 0;
        const beskrivelseMaksLengde = 2000;

        if (beskrivelseLengde > beskrivelseMaksLengde) {
            const feilmelding = `Maks ${beskrivelseMaksLengde} tegn tillatt`
            if (!errorIsPresent) {
                const error = {skjemaelementId: FELTER.beskrivelse.id, feilmelding: feilmelding}
                this.setState({
                    errorList: [...this.state.errorList, error]
                })
            }
            return feilmelding
        }
        if (errorIsPresent) {
            const removeIndex = errorList.map(el => el.skjemaelementId)
                .indexOf(FELTER.beskrivelse.id)

            errorList.splice(removeIndex, 1)
            this.setState({
                errorList: errorList
            })
        }
        return undefined
    }

    validateDatoFelt = (value, id) => {
        const errorList = this.state.errorList
        const errorIsPresent = this.errorIsPresentInErrorList(errorList, id)

        if (!value || value.trim().length === 0) {
            const feilmelding = 'Du må oppgi en dato'
            if (!errorIsPresent) {
                const error = {skjemaelementId: id, feilmelding: feilmelding}
                this.state.errorList =  [... this.state.errorList, error]
            }
            return feilmelding
        } else if (!erGyldigDatoformat(value)) {
            const feilmelding = 'Datoen må være på formatet dd.mm.åååå'
            if (!errorIsPresent) {
                const error = {skjemaelementId: id, feilmelding: feilmelding}
                this.state.errorList =  [... this.state.errorList, error]
            }
            return feilmelding
        } else if (!erGyldigDato(value)) {
            const feilmelding = 'Datoen er ikke gyldig'
            if (!errorIsPresent) {
                const error = {skjemaelementId: id, feilmelding: feilmelding}
                this.state.errorList =  [... this.state.errorList, error]
            }
            return feilmelding
        }
        if (errorIsPresent) {
            const removeIndex = errorList.map(el => el.skjemaelementId)
                .indexOf(id)

            errorList.splice(removeIndex, 1)
            this.setState({
                errorList: errorList
            })
        }
        return undefined
    };

    validateStartDato = (value) => {
        this.state.validationFieldsValues = {...this.state.validationFieldsValues, fom: value}
        return this.validateDatoFelt(value, FELTER.startdato.id)
    }

    validateSluttDato = (value) => {
        const sluttdatoFeilmelding = this.validateDatoFelt(value, FELTER.sluttdato.id)
        const errorList = this.state.errorList
        const sluttdatoErrorIsPresent = this.errorIsPresentInErrorList(errorList, FELTER.sluttdato.id)
        const startdatoErrorIsPresent = this.errorIsPresentInErrorList(errorList, FELTER.startdato.id)

        if (sluttdatoFeilmelding === undefined && !startdatoErrorIsPresent) {
            if (!sluttDatoSenereEnnStartDato(konvertDatoTiltakMedPunkt(this.state.validationFieldsValues.fom), konvertDatoTiltakMedPunkt(value))) {
                const feilmelding = 'Sluttdato må være etter startdato'
                if (!sluttdatoErrorIsPresent) {
                    const error = {skjemaelementId: FELTER.sluttdato.id, feilmelding: feilmelding}
                    this.setState({
                        errorList: [...this.state.errorList, error]
                    })
                }
                return feilmelding
            }
            if (sluttdatoErrorIsPresent) {
                const removeIndex = errorList.map(el => el.skjemaelementId)
                    .indexOf(FELTER.sluttdato.id)

                errorList.splice(removeIndex, 1)
                this.setState({
                    errorList: errorList
                })
            }
            return undefined
        }
        return sluttdatoFeilmelding
    }

    validate = (values) => {
        const tiltaknavnValue = values.tiltaknavn
        const beskrivelseValue = values.beskrivelse
        const fomValue = values.fom
        const tomValue = values.tom

        return {
            tiltaknavn: this.validateTiltaknavnFelt(tiltaknavnValue),
            beskrivelse: this.validateBeskrivelseFelt(beskrivelseValue),
            fom: this.validateStartDato(fomValue),
            tom: this.validateSluttDato(tomValue),
        }
    }

    render() {
        const {
            tiltak,
            handleSubmit,
            fnr,
            oppdateringFeilet,
            varselTekst,
            visFeilMelding,
            tiltakReducer,
        } = this.props;
        return (
            <Panel border>
                <div className="utvidbar__innholdContainer">
                    <form onSubmit={handleSubmit(this.handleSubmit)} className={this.hentSkjemaClassName()} >

                        { (!tiltak || !tiltak.opprettetAv || aktoerHarOpprettetElement(fnr, tiltak)) &&
                        <TiltakNavn
                            felt={FELTER.tiltaknavn}
                            validate={this.validateTiltaknavnFelt}
                            isFormSubmitted={this.state.isFormSubmitted}
                        />
                        }
                        <TiltakBeskrivelse
                            felt={FELTER.beskrivelse}
                            tiltak={tiltak}
                            fnr={fnr}
                            validate={this.validateBeskrivelseFelt}
                            isFormSubmitted={this.state.isFormSubmitted}
                        />

                        <TiltakForeslaattAv
                            tiltak={tiltak}
                        />

                        { this.state.status !== STATUS_TILTAK.IKKE_AKTUELT &&
                        <TiltakDatovelger
                            felter={FELTER}
                            tiltak={this.visFeiletTiltak() ? tiltakReducer.tiltak : tiltak}
                            validateStartdato={this.validateStartDato}
                            validateSluttdato={this.validateSluttDato}
                            isFormSubmitted={this.state.isFormSubmitted}
                        />
                        }

                        { oppdateringFeilet &&
                        <TiltakVarselFeil
                            tekst={varselTekst}
                        />
                        }

                        { this.state.errorList.length > 0 &&
                            <Feiloppsummering
                                tittel="For å gå videre må du rette opp følgende:"
                                feil={this.state.errorList}
                            />
                        }

                        <TiltakKnapper
                            avbryt={this.avbryt}
                            tiltak={tiltak}
                            visFeilMelding={visFeilMelding}
                            tiltakReducer={tiltakReducer}
                        />
                    </form>
                </div>
            </Panel>);
    }
}

TiltakSkjemaKomponent.propTypes = {
    tiltak: tiltakPt,
    handleSubmit: PropTypes.func,
    sendLagre: PropTypes.func,
    avbryt: PropTypes.func,
    initialize: PropTypes.func,
    fnr: PropTypes.string,
    oppdateringFeilet: PropTypes.bool,
    varselTekst: PropTypes.string,
    visFeilMelding: PropTypes.func,
    tiltakReducer: tiltakReducerPt,
};

const ReduxSkjema = reduxForm({
    form: OPPRETT_TILTAK_NY,
})(TiltakSkjemaKomponent);

export default ReduxSkjema;