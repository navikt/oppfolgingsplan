import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
    STATUS_TILTAK,
    tekstfeltRegex,
} from '../../../konstanter';
import {
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
        tekst: texts.felter.tiltaknavn,
    },
    beskrivelse: {
        navn: 'beskrivelse',
        tekst: texts.felter.beskrivelse,
    },
    startdato: {
        navn: 'fom',
        tekst: texts.felter.startdato,
    },
    sluttdato: {
        navn: 'tom',
        tekst: texts.felter.sluttdato,
    },
};

export const aktoerHarOpprettetElement = (fnr, tiltak) => {
    return fnr === tiltak.opprettetAv.fnr;
};

export const TiltakNavn = ({ felt }) => {
    return (<div className="lagretiltakskjema__inputgruppe">
        <label
            className="skjemaelement__label"
            id={felt.navn}
            htmlFor={`${felt.navn}-input`}>
            <b>{felt.tekst}</b>
        </label>
        <Field
            className="input--fullbredde"
            name={felt.navn}
            id={`${felt.navn}-input`}
            aria-labelledby={felt.navn}
            component={TekstFelt}
            placeholder="Skriv her"
        />
    </div>);
};

TiltakNavn.propTypes = {
    felt: tiltakSkjemaFeltPt,
};

export const TiltakBeskrivelse = (
    {
        felt,
        tiltak,
        fnr,
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
};

export class TiltakSkjemaKomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: STATUS_TILTAK.FORSLAG,
            visLagringFeiletNyTiltak: false,
            varselTekst: '',
        };
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
        this.props.initialize(initData);
    }

    hentSkjemaClassName() {
        return this.props.tiltak ? 'tiltaktabell__rad__utvidbar' : 'tiltakSkjema';
    }
    handleSubmit(values) {
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
            <div className="utvidbar__innholdContainer">
                <form onSubmit={handleSubmit(this.handleSubmit)} className={this.hentSkjemaClassName()} >

                    { (!tiltak || !tiltak.opprettetAv || aktoerHarOpprettetElement(fnr, tiltak)) &&
                    <TiltakNavn
                        felt={FELTER.tiltaknavn}
                    />
                    }
                    <TiltakBeskrivelse
                        felt={FELTER.beskrivelse}
                        tiltak={tiltak}
                        fnr={fnr}
                    />

                    <TiltakForeslaattAv
                        tiltak={tiltak}
                    />

                    { this.state.status !== STATUS_TILTAK.IKKE_AKTUELT &&
                    <TiltakDatovelger
                        felter={FELTER}
                        tiltak={this.visFeiletTiltak() ? tiltakReducer.tiltak : tiltak}
                    />
                    }

                    { oppdateringFeilet &&
                    <TiltakVarselFeil
                        tekst={varselTekst}
                    />
                    }

                    <TiltakKnapper
                        avbryt={this.avbryt}
                        tiltak={tiltak}
                        visFeilMelding={visFeilMelding}
                        tiltakReducer={tiltakReducer}
                    />
                </form>
            </div>);
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

const validate = (values) => {
    const feilmeldinger = {};
    if (!values.tiltaknavn || values.tiltaknavn.trim().length === 0) {
        feilmeldinger.tiltaknavn = 'Fyll inn tiltak';
    } else if (values.tiltaknavn.match(tekstfeltRegex)) {
        feilmeldinger.tiltaknavn = 'Ugyldig spesialtegn er oppgitt';
    }
    const navnLengde = values.tiltaknavn ? values.tiltaknavn.length : 0;
    const navnMaksLengde = 100;
    if (navnLengde > navnMaksLengde) {
        feilmeldinger.tiltaknavn = `Maks ${navnMaksLengde} tegn tillatt`;
    }
    if (!values.beskrivelse || values.beskrivelse.trim().length === 0) {
        feilmeldinger.beskrivelse = 'Fyll inn beskrivelse';
    } else if (values.beskrivelse.match(tekstfeltRegex)) {
        feilmeldinger.beskrivelse = 'Ugyldig spesialtegn er oppgitt';
    }
    const beskrivelseLengde = values.beskrivelse ? values.beskrivelse.length : 0;
    const beskrivelseMaksLengde = 2000;
    if (beskrivelseLengde > beskrivelseMaksLengde) {
        feilmeldinger.beskrivelse = `Maks ${beskrivelseMaksLengde} tegn tillatt`;
    }

    if (values.fom && values.tom && !sluttDatoSenereEnnStartDato(konvertDatoTiltakMedPunkt(values.fom), konvertDatoTiltakMedPunkt(values.tom))) {
        feilmeldinger.tom = 'Sluttdato må være etter startdato';
    }

    return feilmeldinger;
};

const ReduxSkjema = reduxForm({
    form: OPPRETT_TILTAK_NY,
    validate,
})(TiltakSkjemaKomponent);

export default ReduxSkjema;
